import { WasteScanResponse, DetectedObject, BoundingBoxCoordinates, DebugDiagnosticInfo } from '../types/waste';

export class WasteAnalysisError extends Error {
  code: string;
  debugInfo?: DebugDiagnosticInfo;
  httpStatus?: number;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    debugInfo?: DebugDiagnosticInfo,
    httpStatus?: number
  ) {
    super(message);
    this.name = 'WasteAnalysisError';
    this.code = code;
    this.debugInfo = debugInfo;
    this.httpStatus = httpStatus;
  }
}

/**
 * Validates and clamps a bounding box inside [0, 1000].
 * Returns null if coordinates are not reliable or invalid.
 */
export function validateBoundingBox(box: any): BoundingBoxCoordinates | null {
  if (!box || typeof box !== 'object') return null;

  const x_min = Number(box.x_min);
  const y_min = Number(box.y_min);
  const x_max = Number(box.x_max);
  const y_max = Number(box.y_max);

  if (
    Number.isNaN(x_min) ||
    Number.isNaN(y_min) ||
    Number.isNaN(x_max) ||
    Number.isNaN(y_max)
  ) {
    return null;
  }

  // Clamp within bounds [0, 1000]
  const clampedXMin = Math.max(0, Math.min(1000, Math.round(x_min)));
  const clampedYMin = Math.max(0, Math.min(1000, Math.round(y_min)));
  const clampedXMax = Math.max(0, Math.min(1000, Math.round(x_max)));
  const clampedYMax = Math.max(0, Math.min(1000, Math.round(y_max)));

  // Minimum detectable bounding box width & height
  if (clampedXMax - clampedXMin < 15 || clampedYMax - clampedYMin < 15) {
    return null;
  }

  return {
    x_min: clampedXMin,
    y_min: clampedYMin,
    x_max: clampedXMax,
    y_max: clampedYMax,
  };
}

/**
 * Checks server diagnostics and API key readiness on Vercel or local preview.
 */
export async function checkServerDiagnostics(): Promise<{
  status: string;
  environment: string;
  apiKeyConfigured: boolean;
  apiKeySource: string;
  model: string;
}> {
  try {
    const res = await fetch('/api/debug');
    if (!res.ok) {
      return {
        status: `HTTP ${res.status}`,
        environment: 'unknown',
        apiKeyConfigured: false,
        apiKeySource: 'server_unreachable',
        model: 'gemini-3.8-flash',
      };
    }
    return await res.json();
  } catch (err: any) {
    return {
      status: 'connection_error',
      environment: 'network_failure',
      apiKeyConfigured: false,
      apiKeySource: err.message || 'error',
      model: 'gemini-3.8-flash',
    };
  }
}

/**
 * WasteAnalysisService - Performs real AI vision analysis via the server backend.
 */
export async function analyzeWasteImage(
  imageBase64: string,
  timeoutMs: number = 40000,
  sampleId?: string
): Promise<WasteScanResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let response = await fetch('/api/scan-waste', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64,
        mimeType: 'image/jpeg',
        sampleId,
      }),
      signal: controller.signal,
    });

    // Fallback to /api/analyze if /api/scan-waste is 404 (supports Vercel api/analyze.js structure)
    if (response.status === 404) {
      response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
          mimeType: 'image/jpeg',
          sampleId,
        }),
        signal: controller.signal,
      });
    }

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      const stage = errJson.debug_info?.stage || 'server_error';
      const code = stage.toUpperCase();

      throw new WasteAnalysisError(
        errJson.error || `Lỗi máy chủ (${response.status}). Vui lòng thử lại.`,
        code,
        errJson.debug_info,
        response.status
      );
    }

    const data: WasteScanResponse = await response.json();

    if (!data || typeof data !== 'object') {
      throw new WasteAnalysisError('Phản hồi từ AI không đúng cấu trúc quy định.', 'INVALID_RESPONSE');
    }

    // Sanitize and validate objects
    const sanitizedObjects: DetectedObject[] = (data.objects || []).map((obj, index) => {
      // Normalize confidence: 0.0 - 1.0
      let confidence = Number(obj.confidence) || 0.85;
      if (confidence > 1.0) {
        confidence = Math.min(1.0, confidence / 100);
      }

      // Validate bounding box
      const validBox = validateBoundingBox(obj.bounding_box);

      // Validate category
      let category = obj.category;
      if (!['recyclable', 'organic', 'residual', 'special', 'unknown'].includes(category)) {
        category = 'unknown';
      }

      return {
        id: obj.id || index + 1,
        name: obj.name || 'Vật phẩm rác',
        category,
        confidence,
        bounding_box: validBox,
        disposal_advice: obj.disposal_advice || 'Bỏ vào thùng rác phù hợp theo quy định địa phương.',
        environmental_tip: obj.environmental_tip || 'Bảo vệ môi trường bằng cách phân loại rác tại nguồn.',
        needs_review: Boolean(obj.needs_review || confidence < 0.7 || !validBox),
        material: obj.material || 'Chưa xác định rõ chất liệu',
        is_hazardous: Boolean(obj.is_hazardous || category === 'special'),
      };
    });

    // Recompute exact counts based on verified objects
    const recyclable = sanitizedObjects.filter((o) => o.category === 'recyclable').length;
    const organic = sanitizedObjects.filter((o) => o.category === 'organic').length;
    const residual = sanitizedObjects.filter((o) => o.category === 'residual').length;
    const special = sanitizedObjects.filter((o) => o.category === 'special').length;
    const unknown = sanitizedObjects.filter((o) => o.category === 'unknown').length;

    return {
      success: Boolean(data.success),
      total_objects: sanitizedObjects.length,
      objects: sanitizedObjects,
      summary: {
        recyclable,
        organic,
        residual,
        special,
        unknown,
      },
      image_quality_notes: data.image_quality_notes || null,
      debug_info: data.debug_info,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new WasteAnalysisError(
        'Thời gian phân tích vượt quá thời hạn cho phép (Timeout). Vui lòng bấm Quét lại hoặc chọn ảnh có góc chụp rõ hơn.',
        'TIMEOUT'
      );
    }

    if (err instanceof WasteAnalysisError) {
      throw err;
    }

    throw new WasteAnalysisError(
      'Không thể kết nối đến máy chủ phân tích: ' + (err.message || 'Lỗi mạng.'),
      'NETWORK_ERROR'
    );
  }
}
