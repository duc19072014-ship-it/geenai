import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import { DetectedObject, CATEGORY_META } from '../types/waste';

interface WasteResultCardProps {
  object: DetectedObject;
  isSelected: boolean;
  onSelect: () => void;
}

export const WasteResultCard: React.FC<WasteResultCardProps> = ({
  object,
  isSelected,
  onSelect,
}) => {
  const meta = CATEGORY_META[object.category] || CATEGORY_META.unknown;
  const confidencePercent = Math.round(object.confidence * 100);

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-3xl p-5 sm:p-6 border-2 transition-all cursor-pointer flex flex-col justify-between ${
        isSelected
          ? `${meta.borderColor} shadow-xl ring-2 ring-emerald-400/60 scale-[1.01]`
          : 'border-slate-200 hover:border-emerald-300 hover:shadow-md'
      }`}
    >
      <div>
        {/* Card Header: Number Badge, Category & Confidence */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-black shadow-xs ${meta.badgeClass}`}
            >
              #{object.id}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${meta.pillClass}`}>
              {meta.icon} {meta.vietnameseName}
            </span>
          </div>

          <div className="text-right">
            <span
              className={`inline-flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded-md ${
                confidencePercent >= 80
                  ? 'bg-emerald-100 text-emerald-800'
                  : confidencePercent >= 60
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-yellow-100 text-yellow-900'
              }`}
            >
              Độ tin cậy: {confidencePercent}%
            </span>
          </div>
        </div>

        {/* Waste Name & Material */}
        <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
          {object.name}
        </h4>
        {object.material && (
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Chất liệu: <strong className="text-slate-700">{object.material}</strong>
          </p>
        )}

        {/* Hazardous Alert if applicable */}
        {object.is_hazardous && (
          <div className="mt-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span>Rác nguy hại! Đưa đến điểm thu gom pin/hóa chất chuyên dụng, không vứt bừa bãi.</span>
          </div>
        )}

        {/* Needs Review / Uncertain Note */}
        {object.needs_review && (
          <div className="mt-2.5 p-2 rounded-xl bg-yellow-50 border border-yellow-200 text-xs text-yellow-900 flex items-center gap-1.5 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
            <span>Chưa chắc chắn tuyệt đối – Khuyến khích kiểm tra ký hiệu tái chế thực tế.</span>
          </div>
        )}

        {/* Recommended Disposal Advice */}
        <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
          <span className="font-extrabold text-emerald-900 block mb-0.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Cách Xử Lý Đúng:
          </span>
          <p className="font-semibold text-emerald-950 mt-0.5">
            {object.disposal_advice}
          </p>
        </div>

        {/* Environmental Tip */}
        <div className="mt-2.5 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-blue-950 font-medium leading-relaxed">
          <span className="font-extrabold text-blue-900 flex items-center gap-1.5 mb-0.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Lời Khuyên Môi Trường:
          </span>
          <p className="font-medium text-blue-950 mt-0.5">
            {object.environmental_tip}
          </p>
        </div>
      </div>

      {/* Footer Card Status */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
        <span>
          {object.bounding_box
            ? '📍 Đã khoanh vùng trên ảnh'
            : '⚠️ Liệt kê trong danh sách (không vẽ khung do bị khuất)'}
        </span>
        {isSelected && <span className="text-emerald-700 font-extrabold">Đang xem</span>}
      </div>
    </div>
  );
};
