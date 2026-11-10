import React, { useState, useEffect } from 'react';
import {
  Wrench,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Server,
  Key,
  Image as ImageIcon,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import { DebugDiagnosticInfo, DebugPipelineStage } from '../types/waste';
import { checkServerDiagnostics } from '../services/wasteAnalysisService';

interface ProductionDebugPanelProps {
  currentDebugInfo?: DebugDiagnosticInfo | null;
  imageStats?: {
    originalSizeKB?: number;
    compressedSizeKB?: number;
    dimensions?: string;
    mimeType?: string;
  } | null;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const ProductionDebugPanel: React.FC<ProductionDebugPanelProps> = ({
  currentDebugInfo,
  imageStats,
  isOpen = false,
  onToggle,
}) => {
  const [serverStatus, setServerStatus] = useState<{
    status: string;
    environment: string;
    apiKeyConfigured: boolean;
    apiKeySource: string;
    model: string;
  } | null>(null);
  const [isCheckingServer, setIsCheckingServer] = useState(false);

  const fetchDiagnostics = async () => {
    setIsCheckingServer(true);
    try {
      const data = await checkServerDiagnostics();
      setServerStatus(data);
    } finally {
      setIsCheckingServer(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const getStageStatus = (stageName: DebugPipelineStage) => {
    if (!currentDebugInfo) {
      if (stageName === 'api_configuration' && serverStatus) {
        return serverStatus.apiKeyConfigured ? 'success' : 'error';
      }
      return 'idle';
    }

    if (currentDebugInfo.stage === stageName) {
      return currentDebugInfo.status;
    }

    const stagesOrder: DebugPipelineStage[] = [
      'image_upload',
      'api_configuration',
      'ai_analysis',
      'result_processing',
    ];
    const currentIndex = stagesOrder.indexOf(currentDebugInfo.stage);
    const targetIndex = stagesOrder.indexOf(stageName);

    if (currentDebugInfo.stage === 'completed') {
      return 'success';
    }

    if (currentDebugInfo.status === 'error' && targetIndex >= currentIndex) {
      return targetIndex === currentIndex ? 'error' : 'idle';
    }

    return targetIndex < currentIndex ? 'success' : 'idle';
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default:
        return <div className="w-3 h-3 rounded-full bg-slate-300 mx-1" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md overflow-hidden transition-all text-slate-800">
      {/* Header bar */}
      <div
        onClick={onToggle}
        className="px-5 py-4 bg-linear-to-r from-slate-50 via-slate-100 to-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-colors border-b border-slate-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shadow-xs">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              Chế Độ Chẩn Đoán Triển Khai (Vercel & Preview Debugger)
              {serverStatus && (
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    serverStatus.apiKeyConfigured
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                >
                  {serverStatus.apiKeyConfigured ? 'API: Sẵn Sàng' : 'API: Chưa Cấu Hình'}
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Kiểm tra 4 giai đoạn xử lý: Tải ảnh • Cấu hình API • Nhận diện Gemini • Xử lý kết quả
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fetchDiagnostics();
            }}
            disabled={isCheckingServer}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            title="Kiểm tra lại kết nối máy chủ"
          >
            <RefreshCw className={`w-4 h-4 ${isCheckingServer ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
          {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </div>

      {/* Expanded Debug Content */}
      {isOpen && (
        <div className="p-5 space-y-5 animate-fade-in text-xs">
          {/* Environment Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2.5">
              <Server className="w-4 h-4 text-slate-500 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Môi trường</span>
                <span className="font-extrabold text-slate-800">
                  {serverStatus?.environment === 'vercel_production' ? 'Vercel Production' : 'AI Studio Preview'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Key className="w-4 h-4 text-slate-500 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Khóa GEMINI_API_KEY</span>
                <span
                  className={`font-extrabold ${
                    serverStatus?.apiKeyConfigured ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {serverStatus?.apiKeyConfigured
                    ? `Đã nạp (${serverStatus.apiKeySource})`
                    : 'Chưa tìm thấy trên Vercel'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-slate-500 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Mô hình AI Thị Giác</span>
                <span className="font-extrabold text-slate-800">{serverStatus?.model || 'gemini-3.5-flash'}</span>
              </div>
            </div>
          </div>

          {/* 4 Pipeline Stages */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-slate-700 uppercase tracking-wider text-[11px]">
              Quy Trình Xử Lý 4 Bước
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Stage 1: Image Upload */}
              <div
                className={`p-3.5 rounded-2xl border transition-all ${
                  getStageStatus('image_upload') === 'error'
                    ? 'bg-red-50 border-red-200'
                    : getStageStatus('image_upload') === 'success'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    1. Tải & Tiền Xử Lý Ảnh
                  </span>
                  {renderStatusIcon(getStageStatus('image_upload'))}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {imageStats?.dimensions
                    ? `Độ phân giải: ${imageStats.dimensions} • Kích thước: ~${imageStats.compressedSizeKB} KB (chuẩn ${imageStats.mimeType || 'JPEG'})`
                    : 'Chưa có ảnh được chọn. Hỗ trợ chuẩn hóa tối đa 1024px với nền trắng để tối ưu độ chính xác.'}
                </p>
              </div>

              {/* Stage 2: API Configuration */}
              <div
                className={`p-3.5 rounded-2xl border transition-all ${
                  getStageStatus('api_configuration') === 'error'
                    ? 'bg-red-50 border-red-200'
                    : getStageStatus('api_configuration') === 'success'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-blue-600" />
                    2. Cấu Hình Khóa API
                  </span>
                  {renderStatusIcon(getStageStatus('api_configuration'))}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {serverStatus?.apiKeyConfigured
                    ? `Khóa API bảo mật máy chủ đã nạp qua biến: ${serverStatus.apiKeySource}. Không lộ ra phía trình duyệt.`
                    : 'Cảnh báo: Chưa cấu hình biến GEMINI_API_KEY trong Project Settings trên Vercel.'}
                </p>
              </div>

              {/* Stage 3: AI Inference */}
              <div
                className={`p-3.5 rounded-2xl border transition-all ${
                  getStageStatus('ai_analysis') === 'error'
                    ? 'bg-red-50 border-red-200'
                    : getStageStatus('ai_analysis') === 'success'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-purple-600" />
                    3. Phân Tích Gemini Vision ({serverStatus?.model || 'gemini-3.5-flash'})
                  </span>
                  {renderStatusIcon(getStageStatus('ai_analysis'))}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {currentDebugInfo?.durationMs
                    ? `Thời gian suy luận: ${currentDebugInfo.durationMs}ms • Mô hình: ${currentDebugInfo.modelUsed || serverStatus?.model || 'gemini-3.5-flash'}`
                    : 'Gửi ảnh nén cùng chỉ dẫn phân tích nhận diện đa vật thể & định vị khung viền chuẩn xác.'}
                </p>
              </div>

              {/* Stage 4: Result Processing */}
              <div
                className={`p-3.5 rounded-2xl border transition-all ${
                  getStageStatus('result_processing') === 'error'
                    ? 'bg-red-50 border-red-200'
                    : getStageStatus('result_processing') === 'success'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-600" />
                    4. Xử Lý Kết Quả & Khung Viền
                  </span>
                  {renderStatusIcon(getStageStatus('result_processing'))}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Kiểm tra tọa độ [0 - 1000], lọc 5 nhóm phân loại (Tái chế, Hữu cơ, Còn lại, Nguy hại, Chưa xác định) và tính độ tin cậy.
                </p>
              </div>
            </div>
          </div>

          {/* Vercel Troubleshooting Guide if Error Detected */}
          {(!serverStatus?.apiKeyConfigured || currentDebugInfo?.status === 'error') && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Hướng dẫn cấu hình khi chạy trên Vercel:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-amber-900 leading-relaxed pl-1 font-medium">
                <li>
                  Vào trang quản trị dự án trên{' '}
                  <span className="font-bold underline">Vercel Dashboard</span> ➔ chọn tab{' '}
                  <span className="font-bold">Settings</span> ➔ mục{' '}
                  <span className="font-bold">Environment Variables</span>.
                </li>
                <li>
                  Thêm biến mới: Key = <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">GEMINI_API_KEY</code>, Value = Khóa API Gemini của bạn.
                </li>
                <li>
                  Tích chọn cả 3 môi trường: <span className="font-bold">Production</span>,{' '}
                  <span className="font-bold">Preview</span>, <span className="font-bold">Development</span> ➔ Nhấn{' '}
                  <span className="font-bold">Save</span>.
                </li>
                <li>
                  Chuyển sang tab <span className="font-bold">Deployments</span> ➔ bấm menu ba chấm ➔ chọn{' '}
                  <span className="font-bold">Redeploy</span> để Vercel nạp biến môi trường mới.
                </li>
              </ol>
            </div>
          )}

          {currentDebugInfo?.troubleshootingTip && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
              <span className="font-bold">Gợi ý kỹ thuật: </span>
              {currentDebugInfo.troubleshootingTip}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
