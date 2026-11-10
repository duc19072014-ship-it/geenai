import React from 'react';
import { CategorySummary, CATEGORY_META } from '../types/waste';
import { Sparkles, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface DisposalAdviceProps {
  totalObjects: number;
  summary: CategorySummary;
  imageQualityNotes?: string | null;
}

export const DisposalAdvice: React.FC<DisposalAdviceProps> = ({
  totalObjects,
  summary,
  imageQualityNotes,
}) => {
  return (
    <div className="space-y-4">
      {/* Summary Stat Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-800 via-teal-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              GREEN AI 5.0 – KẾT QUẢ QUÉT THÔNG MINH
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Phát Hiện {totalObjects} Món Rác Trong Khung Hình
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Tất cả các vật thể đã được định vị và phân loại độc lập theo quy chuẩn bảo vệ môi trường.
            </p>
          </div>

          {/* Counts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 shrink-0">
            {/* Recyclable */}
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-400/30 text-center">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 block">
                {summary.recyclable}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-100 uppercase tracking-wide">
                Tái Chế ♻️
              </span>
            </div>

            {/* Organic */}
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-orange-400/30 text-center">
              <span className="text-xl sm:text-2xl font-black text-orange-400 block">
                {summary.organic}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-orange-100 uppercase tracking-wide">
                Hữu Cơ 🍃
              </span>
            </div>

            {/* Residual */}
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-slate-400/30 text-center">
              <span className="text-xl sm:text-2xl font-black text-slate-300 block">
                {summary.residual}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wide">
                Còn Lại 🗑️
              </span>
            </div>

            {/* Special */}
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-red-400/40 text-center">
              <span className="text-xl sm:text-2xl font-black text-red-400 block">
                {summary.special || 0}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-red-200 uppercase tracking-wide">
                Nguy Hại ⚠️
              </span>
            </div>

            {/* Unknown */}
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-yellow-400/30 text-center col-span-2 sm:col-span-1">
              <span className="text-xl sm:text-2xl font-black text-yellow-300 block">
                {summary.unknown}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-yellow-100 uppercase tracking-wide">
                Chưa Rõ ❓
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Quality Notes if present */}
      {imageQualityNotes && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold block">Ghi chú về chất lượng hình ảnh:</span>
            <p className="mt-0.5 font-medium">{imageQualityNotes}</p>
          </div>
        </div>
      )}

      {/* Standard Bin Reference Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#22c55e]" />
          <span>Thùng Xanh Dương/Trắng: Rác Tái Chế</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#f97316]" />
          <span>Thùng Xanh Lá: Rác Hữu Cơ</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#64748b]" />
          <span>Thùng Xám/Cam: Rác Còn Lại</span>
        </div>
        <div className="flex items-center gap-2 text-red-600 font-bold">
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <span>Pin & Rác Điện Tử: Điểm Thu Gom Chuyên Dụng</span>
        </div>
      </div>
    </div>
  );
};
