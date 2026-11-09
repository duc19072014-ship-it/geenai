import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  PlusCircle,
  ShieldAlert,
  Lightbulb,
  Sparkles,
  Info,
  HelpCircle,
  MapPin,
} from 'lucide-react';
import { ClassificationResult } from '../types/waste';

interface ResultCardProps {
  result: ClassificationResult;
  imageUrl?: string;
  onReanalyze: () => void;
  onNewImage: () => void;
  isAnalyzing?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  imageUrl,
  onReanalyze,
  onNewImage,
  isAnalyzing = false,
}) => {
  // If the uploaded image was not identified as waste (e.g., photo of a face, landscape)
  if (!result.isTrash) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md flex flex-col items-center text-center max-w-xl mx-auto space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
          <Info className="w-9 h-9" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-800">
          Không phát hiện rác thải trong ảnh!
        </h3>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {result.uncertaintyMessage ||
            'AI không nhận thấy vật dụng hoặc rác thải trong hình ảnh. Bạn vui lòng chụp hoặc tải ảnh vật phẩm rác cần phân loại nhé!'}
        </p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onNewImage}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center gap-2 transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" /> Chọn Ảnh Mới
          </button>
        </div>
      </div>
    );
  }

  // Category visual styles (Green, Blue, Orange/Amber)
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Rác tái chế':
        return {
          title: '1. Rác Tái Chế',
          badgeBg: 'bg-blue-600 text-white',
          badgeLight: 'bg-blue-50 text-blue-900 border-blue-200',
          borderColor: 'border-blue-400',
          gradientBg: 'from-blue-50 via-sky-50/40 to-white',
          binColorText: 'Thùng Xanh Dương hoặc Trắng',
          binBg: 'bg-blue-600',
          icon: '♻️',
        };
      case 'Rác hữu cơ':
        return {
          title: '2. Rác Hữu Cơ',
          badgeBg: 'bg-emerald-600 text-white',
          badgeLight: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          borderColor: 'border-emerald-400',
          gradientBg: 'from-emerald-50 via-green-50/40 to-white',
          binColorText: 'Thùng Xanh Lá Cây',
          binBg: 'bg-emerald-600',
          icon: '🍃',
        };
      case 'Rác còn lại':
      default:
        return {
          title: '3. Rác Còn Lại',
          badgeBg: 'bg-amber-600 text-white',
          badgeLight: 'bg-amber-50 text-amber-900 border-amber-200',
          borderColor: 'border-amber-400',
          gradientBg: 'from-amber-50 via-orange-50/40 to-white',
          binColorText: 'Thùng Xám hoặc Cam',
          binBg: 'bg-amber-600',
          icon: '🗑️',
        };
    }
  };

  const theme = getCategoryTheme(result.category);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* 1. UNCERTAINTY WARNING (Requirement: Khi AI không chắc chắn, thông báo "Chưa đủ thông tin để phân loại chính xác") */}
      {(result.isUncertain || result.confidenceLevel === 'Chưa đủ thông tin') && (
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-amber-50 via-orange-50 to-amber-100/80 border-2 border-amber-400 p-5 sm:p-6 shadow-md shadow-amber-500/10">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="space-y-1.5 flex-1">
              <span className="inline-block px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-white">
                Cảnh Báo Độ Chính Xác
              </span>
              <h4 className="text-base sm:text-lg font-black text-amber-950">
                Chưa đủ thông tin để phân loại chính xác!
              </h4>
              <p className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
                {result.uncertaintyMessage ||
                  'Ảnh bị mờ hoặc có quá nhiều vật thể lẫn lộn chưa phân tách. Bạn vui lòng chụp lại cận cảnh và rõ nét hơn để AI xác định chính xác nhé!'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. HAZARDOUS WASTE SPECIAL ALERT (Pin, hóa chất, rác điện tử) */}
      {result.isHazardous && (
        <div className="rounded-3xl bg-linear-to-r from-red-50 to-orange-50 border-2 border-red-400 p-5 sm:p-6 shadow-md">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-500/30 font-bold text-2xl">
              ⚠️
            </div>
            <div className="space-y-1 flex-1">
              <span className="inline-block px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-red-600 text-white">
                Rác Nguy Hại – Cần Xử Lý Chuyên Dụng
              </span>
              <h4 className="text-base sm:text-lg font-black text-red-950">
                Tuyệt đối không vứt chung vào thùng rác thông thường!
              </h4>
              <p className="text-xs sm:text-sm text-red-900 font-medium leading-relaxed">
                Pin, bóng đèn huỳnh quang và rác điện tử chứa kim loại nặng độc hại (thủy ngân, chì). Hãy gom riêng vào túi kín và mang đến hộp thu gom rác nguy hại tại trường học hoặc siêu thị.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN ANALYSIS RESULT CARD */}
      <div className={`bg-white rounded-3xl border-2 ${theme.borderColor} shadow-xl overflow-hidden`}>
        {/* Header section with Category, Name, and Confidence */}
        <div className={`p-6 sm:p-8 bg-linear-to-b ${theme.gradientBg} border-b border-slate-100`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category */}
            <div className="flex items-center gap-3">
              <span className="text-4xl">{theme.icon}</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Nhóm phân loại:
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {theme.title}
                </h2>
              </div>
            </div>

            {/* Confidence Badge */}
            <div className="flex flex-col sm:items-end">
              <div
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold border ${
                  result.confidence >= 80
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : result.confidence >= 65
                    ? 'bg-teal-100 text-teal-900 border-teal-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-current" />
                Độ tin cậy: {result.confidence}% ({result.confidenceLevel})
              </div>

              {/* Progress meter */}
              <div className="w-36 sm:w-44 h-2 bg-slate-200/80 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full transition-all duration-500 ${
                    result.confidence >= 80
                      ? 'bg-emerald-500'
                      : result.confidence >= 65
                      ? 'bg-teal-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(10, result.confidence))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Waste Name & Material */}
          <div className="mt-6 pt-6 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-slate-500 block mb-1">
                Tên loại rác nhận diện:
              </span>
              <p className="text-lg font-black text-slate-900">
                {result.wasteName}
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold text-slate-500 block mb-1">
                Chất liệu & Đặc tính:
              </span>
              <p className="text-lg font-bold text-slate-800">
                {result.material}
              </p>
            </div>
          </div>
        </div>

        {/* Content body: Proper Disposal & Environmental Advice */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Target Bin Indicator */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${theme.binBg} text-white flex items-center justify-center font-bold text-lg shadow-sm`}
              >
                {theme.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 block">
                  Thùng rác quy định:
                </span>
                <span className="text-base sm:text-lg font-extrabold text-slate-900">
                  {result.binColor || theme.binColorText}
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 hidden sm:inline-block">
              Quy chuẩn học đường
            </span>
          </div>

          {/* Proper Disposal Section */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/90 space-y-3">
            <h4 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Cách Xử Lý Đúng:
            </h4>
            <p className="text-sm font-semibold text-emerald-950 leading-relaxed">
              {result.properDisposal}
            </p>

            {result.disposalSteps && result.disposalSteps.length > 0 && (
              <div className="pt-2 grid grid-cols-1 gap-2">
                {result.disposalSteps.map((step: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/90 border border-emerald-200 text-xs sm:text-sm font-medium text-slate-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Environmental Advice */}
          <div className="p-5 rounded-2xl bg-linear-to-br from-blue-50 to-teal-50 border border-blue-200 space-y-2">
            <h4 className="text-base font-extrabold text-blue-950 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Lời Khuyên Bảo Vệ Môi Trường:
            </h4>
            <p className="text-sm font-medium text-blue-950 leading-relaxed">
              {result.environmentalAdvice}
            </p>
          </div>

          {/* Important Notice regarding material nuance */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Lưu ý phân loại:</strong> Không mặc định tất cả nhựa, giấy hoặc thủy tinh đều tái chế được. Hãy luôn kiểm tra xem rác có bị dính dầu mỡ hoặc nhiễm bẩn hữu cơ nặng không trước khi bỏ vào thùng tái chế nhé!
          </div>
        </div>

        {/* Action Buttons: "Phân tích lại" and "Chọn ảnh mới" */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onNewImage}
            disabled={isAnalyzing}
            className="px-6 py-3 rounded-2xl border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 font-bold text-sm flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            Chọn Ảnh Mới
          </button>

          <button
            onClick={onReanalyze}
            disabled={isAnalyzing}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            Phân Tích Lại
          </button>
        </div>
      </div>
    </div>
  );
};
