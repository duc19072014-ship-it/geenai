export type StandardCategory = 'recyclable' | 'organic' | 'residual' | 'special' | 'unknown';
export type WasteCategory = 'Rác tái chế' | 'Rác hữu cơ' | 'Rác còn lại' | 'Rác nguy hại / Đặc thù' | 'Chưa xác định';

export interface BoundingBoxCoordinates {
  x_min: number; // 0 to 1000
  y_min: number; // 0 to 1000
  x_max: number; // 0 to 1000
  y_max: number; // 0 to 1000
}

export interface DetectedObject {
  id: number;
  name: string;
  category: StandardCategory;
  confidence: number; // 0.0 to 1.0 (e.g. 0.95)
  bounding_box?: BoundingBoxCoordinates | null;
  box2d?: [number, number, number, number] | null; // Compatibility alias
  disposal_advice: string;
  environmental_tip: string;
  needs_review?: boolean;
  material?: string;
  is_hazardous?: boolean;
  wasteName?: string; // Compatibility alias
}

export type DetectedWasteObject = DetectedObject;

export interface CategorySummary {
  recyclable: number;
  organic: number;
  residual: number;
  special: number;
  unknown: number;
}

export type DebugPipelineStage =
  | 'idle'
  | 'image_upload'
  | 'api_configuration'
  | 'ai_analysis'
  | 'result_processing'
  | 'completed'
  | 'error';

export interface DebugDiagnosticInfo {
  stage: DebugPipelineStage;
  status: 'idle' | 'pending' | 'success' | 'warning' | 'error';
  modelUsed?: string;
  endpointUrl?: string;
  apiKeyStatus?: 'configured' | 'missing' | 'invalid';
  apiKeySource?: string;
  environment?: 'vercel_production' | 'local_preview';
  imageDimensions?: string;
  imageMimeType?: string;
  imageSizeKB?: number;
  durationMs?: number;
  httpStatus?: number;
  rawErrorMessage?: string;
  troubleshootingTip?: string;
  timestamp?: string;
}

export interface WasteScanResponse {
  success: boolean;
  total_objects: number;
  objects: DetectedObject[];
  summary: CategorySummary;
  image_quality_notes?: string | null;
  error_message?: string | null;
  debug_info?: DebugDiagnosticInfo;
  // Compatibility properties
  isTrashDetected?: boolean;
  totalObjects?: number;
  recyclableCount?: number;
  organicCount?: number;
  residualCount?: number;
  uncertainCount?: number;
  summaryMessage?: string;
  imageAdvice?: string;
  detectedObjects?: DetectedObject[];
}

export type MultiObjectScanResult = WasteScanResponse;

export interface ClassificationResult {
  isTrash: boolean;
  wasteName: string;
  category: WasteCategory;
  confidence: number;
  confidenceLevel: string;
  isUncertain: boolean;
  uncertaintyMessage?: string;
  material: string;
  properDisposal: string;
  disposalSteps?: string[];
  environmentalAdvice: string;
  isHazardous?: boolean;
  cautionNote?: string;
  binColor: string;
}

export interface WasteHistoryItem {
  id: string;
  timestamp: number;
  imageUrl: string;
  scanResult: WasteScanResponse;
  result?: ClassificationResult;
  multiResult?: MultiObjectScanResult;
}

export interface SampleWasteItem {
  id: string;
  name: string;
  category: StandardCategory | WasteCategory;
  description: string;
  imageUrl: string;
  testCaseType?: string;
  mockResult?: WasteScanResponse;
  isMultiObject?: boolean;
  multiResult?: any;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

// Category visual helper metadata
export const CATEGORY_META = {
  recyclable: {
    key: 'recyclable',
    vietnameseName: 'Rác tái chế',
    colorHex: '#22c55e',
    borderColor: 'border-[#22c55e]',
    bgColor: 'bg-[#22c55e]',
    bgLight: 'bg-[#22c55e]/15',
    textColor: 'text-emerald-700',
    badgeClass: 'bg-emerald-600 text-white',
    pillClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    binName: 'Thùng Xanh Dương / Trắng',
    icon: '♻️',
  },
  organic: {
    key: 'organic',
    vietnameseName: 'Rác hữu cơ',
    colorHex: '#f97316',
    borderColor: 'border-[#f97316]',
    bgColor: 'bg-[#f97316]',
    bgLight: 'bg-[#f97316]/15',
    textColor: 'text-orange-700',
    badgeClass: 'bg-orange-600 text-white',
    pillClass: 'bg-orange-50 text-orange-800 border-orange-300',
    binName: 'Thùng Xanh Lá Cây',
    icon: '🍃',
  },
  residual: {
    key: 'residual',
    vietnameseName: 'Rác còn lại',
    colorHex: '#64748b',
    borderColor: 'border-[#64748b]',
    bgColor: 'bg-[#64748b]',
    bgLight: 'bg-[#64748b]/15',
    textColor: 'text-slate-700',
    badgeClass: 'bg-slate-600 text-white',
    pillClass: 'bg-slate-100 text-slate-800 border-slate-300',
    binName: 'Thùng Xám / Cam',
    icon: '🗑️',
  },
  special: {
    key: 'special',
    vietnameseName: 'Rác nguy hại / Đặc thù',
    colorHex: '#ef4444',
    borderColor: 'border-[#ef4444]',
    bgColor: 'bg-[#ef4444]',
    bgLight: 'bg-[#ef4444]/15',
    textColor: 'text-red-700',
    badgeClass: 'bg-red-600 text-white',
    pillClass: 'bg-red-50 text-red-800 border-red-300',
    binName: 'Thùng Đỏ / Điểm Thu Gom Riêng',
    icon: '⚠️',
  },
  unknown: {
    key: 'unknown',
    vietnameseName: 'Chưa xác định',
    colorHex: '#eab308',
    borderColor: 'border-[#eab308]',
    bgColor: 'bg-[#eab308]',
    bgLight: 'bg-[#eab308]/20',
    textColor: 'text-yellow-800',
    badgeClass: 'bg-yellow-500 text-slate-950 font-bold',
    pillClass: 'bg-yellow-50 text-yellow-900 border-yellow-300',
    binName: 'Cần kiểm tra thêm',
    icon: '❓',
  },
} as const;
