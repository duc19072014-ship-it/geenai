import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  RotateCcw,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Layers,
  Info,
  ShieldAlert,
} from 'lucide-react';
import { DetectedObject, WasteScanResponse, CATEGORY_META } from '../types/waste';

interface MultiObjectResultViewProps {
  result: WasteScanResponse;
  imageUrl: string;
  onScanAnother: () => void;
  onReanalyze: () => void;
  isAnalyzing?: boolean;
}

export const MultiObjectResultView: React.FC<MultiObjectResultViewProps> = ({
  result,
  imageUrl,
  onScanAnother,
  onReanalyze,
  isAnalyzing = false,
}) => {
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [selectedObjectId, setSelectedObjectId] = useState<number | null>(null);

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'recyclable':
      case 'Rác tái chế':
        return {
          border: 'border-[#22c55e]',
          bgLight: 'bg-[#22c55e]/15',
          badgeBg: 'bg-[#22c55e] text-white',
          textColor: 'text-emerald-700',
          dotColor: 'bg-[#22c55e]',
          pillBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          hex: '#22c55e',
          icon: '♻️',
          name: 'Rác tái chế',
        };
      case 'organic':
      case 'Rác hữu cơ':
        return {
          border: 'border-[#f97316]',
          bgLight: 'bg-[#f97316]/15',
          badgeBg: 'bg-[#f97316] text-white',
          textColor: 'text-orange-700',
          dotColor: 'bg-[#f97316]',
          pillBg: 'bg-orange-50 text-orange-800 border-orange-300',
          hex: '#f97316',
          icon: '🍃',
          name: 'Rác hữu cơ',
        };
      case 'residual':
      case 'Rác còn lại':
        return {
          border: 'border-[#64748b]',
          bgLight: 'bg-[#64748b]/15',
          badgeBg: 'bg-[#64748b] text-white',
          textColor: 'text-slate-700',
          dotColor: 'bg-[#64748b]',
          pillBg: 'bg-slate-100 text-slate-800 border-slate-300',
          hex: '#64748b',
          icon: '🗑️',
          name: 'Rác còn lại',
        };
      case 'special':
      case 'Rác nguy hại / Đặc thù':
      case 'Rác nguy hại':
        return {
          border: 'border-[#ef4444]',
          bgLight: 'bg-[#ef4444]/15',
          badgeBg: 'bg-[#ef4444] text-white',
          textColor: 'text-red-700',
          dotColor: 'bg-[#ef4444]',
          pillBg: 'bg-red-50 text-red-800 border-red-300',
          hex: '#ef4444',
          icon: '⚠️',
          name: 'Rác nguy hại',
        };
      case 'unknown':
      case 'Chưa xác định':
      default:
        return {
          border: 'border-[#eab308]',
          bgLight: 'bg-[#eab308]/20',
          badgeBg: 'bg-[#eab308] text-slate-900',
          textColor: 'text-yellow-800',
          dotColor: 'bg-[#eab308]',
          pillBg: 'bg-yellow-50 text-yellow-900 border-yellow-300',
          hex: '#eab308',
          icon: '❓',
          name: 'Chưa xác định',
        };
    }
  };

  const objects: DetectedObject[] = result.objects || result.detectedObjects || [];
  const total = result.total_objects || result.totalObjects || objects.length;

  if (total === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-200 shadow-md text-center max-w-xl mx-auto space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mx-auto">
          <Info className="w-9 h-9" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-800">
          Không phát hiện vật phẩm rác nào!
        </h3>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {result.image_quality_notes ||
            'Ảnh có thể bị mờ, góc chụp quá xa hoặc không chứa rác thải. Bạn vui lòng chụp lại rõ nét hơn nhé!'}
        </p>
        <div className="pt-2">
          <button
            onClick={onScanAnother}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center gap-2 mx-auto transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" /> Quét Ảnh Khác
          </button>
        </div>
      </div>
    );
  }

  const objectsWithBoxes = objects.filter(
    (obj: DetectedObject) =>
      (obj.bounding_box !== null && obj.bounding_box !== undefined) ||
      (obj.box2d && obj.box2d.length === 4)
  );

  const objectsWithoutBoxes = objects.filter(
    (obj: DetectedObject) =>
      (!obj.bounding_box) && (!obj.box2d || obj.box2d.length !== 4)
  );

  const summary = result.summary || {
    recyclable: result.recyclableCount || 0,
    organic: result.organicCount || 0,
    residual: result.residualCount || 0,
    special: 0,
    unknown: result.uncertainCount || 0,
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* 1. SUMMARY STATS BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-800 via-teal-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              GREEN AI 5.0 – KẾT QUẢ QUÉT ĐA VẬT THỂ
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Đã Phát Hiện {total} Món Rác Trong Ảnh
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              GREEN AI tìm thấy {total} món rác: {summary.recyclable} tái chế, {summary.organic} hữu cơ, {summary.residual} còn lại, {summary.special || 0} nguy hại, {summary.unknown} chưa rõ.
            </p>
          </div>

          {/* Quick Counter Chips - 5 Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 shrink-0">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-400/30 text-center">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 block">
                {summary.recyclable}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-100 uppercase tracking-wide">
                Tái chế ♻️
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-orange-400/30 text-center">
              <span className="text-xl sm:text-2xl font-black text-orange-400 block">
                {summary.organic}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-orange-100 uppercase tracking-wide">
                Hữu cơ 🍃
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-slate-400/30 text-center">
              <span className="text-xl sm:text-2xl font-black text-slate-300 block">
                {summary.residual}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 uppercase tracking-wide">
                Còn lại 🗑️
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-red-400/40 text-center">
              <span className="text-xl sm:text-2xl font-black text-red-400 block">
                {summary.special || 0}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-red-200 uppercase tracking-wide">
                Nguy hại ⚠️
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-yellow-400/30 text-center col-span-2 sm:col-span-1">
              <span className="text-xl sm:text-2xl font-black text-yellow-300 block">
                {summary.unknown}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-yellow-100 uppercase tracking-wide">
                Nghi vấn ❓
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. VISUAL SCANNING VIEW WITH BOUNDING BOXES OVERLAY */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-emerald-200 shadow-lg space-y-4">
        {/* Visualizer Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Khung Nhận Diện Bounding Box ({objectsWithBoxes.length} vị trí)
          </span>

          <button
            onClick={() => setShowBoundingBoxes((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              showBoundingBoxes
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {showBoundingBoxes ? (
              <>
                <Eye className="w-4 h-4 text-emerald-600" />
                Ẩn Khung Nhận Diện
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 text-slate-500" />
                Hiện Khung Nhận Diện
              </>
            )}
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 p-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
          <span className="text-slate-500 text-[11px] uppercase tracking-wider">Màu phân loại:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
            <span>Xanh lá: Rác tái chế</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#f97316]" />
            <span>Cam: Rác hữu cơ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#64748b]" />
            <span>Xám: Rác còn lại</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#eab308]" />
            <span>Vàng: Chưa xác định</span>
          </div>
        </div>

        {/* Image Canvas Viewport */}
        <div className="relative w-full aspect-4/3 max-h-[520px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center select-none shadow-inner">
          <img
            src={imageUrl}
            alt="Đống rác đa vật thể"
            className="w-full h-full object-contain"
          />

          {/* Render Bounding Boxes Overlay */}
          {showBoundingBoxes && (
            <div className="absolute inset-0 pointer-events-none">
              {objectsWithBoxes.map((obj: DetectedObject) => {
                let top = '0%', left = '0%', width = '0%', height = '0%';
                if (obj.bounding_box) {
                  top = `${(obj.bounding_box.y_min / 1000) * 100}%`;
                  left = `${(obj.bounding_box.x_min / 1000) * 100}%`;
                  width = `${((obj.bounding_box.x_max - obj.bounding_box.x_min) / 1000) * 100}%`;
                  height = `${((obj.bounding_box.y_max - obj.bounding_box.y_min) / 1000) * 100}%`;
                } else if (obj.box2d) {
                  const [ymin, xmin, ymax, xmax] = obj.box2d;
                  top = `${(ymin / 1000) * 100}%`;
                  left = `${(xmin / 1000) * 100}%`;
                  width = `${((xmax - xmin) / 1000) * 100}%`;
                  height = `${((ymax - ymin) / 1000) * 100}%`;
                }

                const styles = getCategoryStyles(obj.category);
                const isSelected = selectedObjectId === obj.id;
                const confPercent = Math.round((obj.confidence > 1 ? obj.confidence : obj.confidence * 100));

                return (
                  <div
                    key={obj.id}
                    onClick={() => setSelectedObjectId(obj.id)}
                    style={{ top, left, width, height }}
                    className={`absolute pointer-events-auto border-3 sm:border-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      styles.border
                    } ${styles.bgLight} ${
                      isSelected
                        ? 'ring-4 ring-white shadow-2xl z-30 scale-[1.02]'
                        : 'hover:scale-[1.01] hover:shadow-lg z-10'
                    }`}
                  >
                    <div
                      className={`absolute -top-4 sm:-top-5 left-1 sm:left-2 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-black shadow-md flex items-center gap-1.5 whitespace-nowrap z-20 ${
                        styles.badgeBg
                      } ${isSelected ? 'ring-2 ring-white scale-105' : ''}`}
                    >
                      <span>#{obj.id}</span>
                      <span>{obj.name || obj.wasteName}</span>
                      <span className="opacity-90 hidden sm:inline">| {styles.name}</span>
                      <span className="bg-black/20 px-1 rounded-sm text-[10px]">
                        {confPercent}%
                      </span>
                    </div>

                    <span className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full border border-slate-500" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-slate-500" />
                    <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full border border-slate-500" />
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full border border-slate-500" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 3. INDIVIDUAL OBJECT RESULT CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>📋</span>
            Chi Tiết Từng Món Rác Đã Phát Hiện ({objects.length})
          </h3>
          <span className="text-xs font-bold text-slate-500">
            Phân loại độc lập từng món
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objects.map((obj: DetectedObject) => {
            const styles = getCategoryStyles(obj.category);
            const isSelected = selectedObjectId === obj.id;
            const confPercent = Math.round((obj.confidence > 1 ? obj.confidence : obj.confidence * 100));

            return (
              <div
                key={obj.id}
                onClick={() => setSelectedObjectId(obj.id)}
                className={`bg-white rounded-3xl p-5 sm:p-6 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${styles.border} shadow-xl ring-2 ring-emerald-400/50 scale-[1.01]`
                    : 'border-slate-200 hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${styles.badgeBg}`}
                      >
                        #{obj.id}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${styles.pillBg}`}>
                        {styles.icon} {styles.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-slate-600">
                      Độ tin cậy: {confPercent}%
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 leading-snug">
                    {obj.name || obj.wasteName}
                  </h4>
                  {obj.material && (
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Chất liệu: <strong className="text-slate-700">{obj.material}</strong>
                    </p>
                  )}

                  {obj.is_hazardous && (
                    <div className="mt-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-900 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Rác nguy hại! Phải đưa đến điểm thu gom pin/hóa chất chuyên dụng.</span>
                    </div>
                  )}

                  <div className="mt-4 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 font-medium leading-relaxed">
                    <span className="font-extrabold text-emerald-900 block mb-0.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Cách xử lý đúng:
                    </span>
                    {obj.disposal_advice || 'Phân loại đúng thùng quy định.'}
                  </div>

                  <div className="mt-2.5 p-3 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-950 font-medium leading-relaxed">
                    <span className="font-extrabold text-blue-900 flex items-center gap-1 mb-0.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      Lời khuyên môi trường:
                    </span>
                    {obj.environmental_tip}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span>
                    {obj.bounding_box || obj.box2d
                      ? '📍 Đã định vị khung trên ảnh'
                      : '⚠️ Không vẽ khung (bị che khuất)'}
                  </span>
                  {isSelected && <span className="text-emerald-700">Đang chọn</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. OBJECTS WITHOUT ACCURATE BOXES (IF ANY) */}
      {objectsWithoutBoxes.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Ghi chú về định vị:</span>
            Có {objectsWithoutBoxes.length} món rác ({objectsWithoutBoxes.map((o: DetectedObject) => o.name || o.wasteName).join(', ')}) do bị che khuất hoặc góc chụp mờ nên AI không vẽ khung để tránh sai lệch, nhưng vẫn phân loại đầy đủ ở danh sách trên!
          </div>
        </div>
      )}

      {/* 5. BOTTOM ACTIONS */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onScanAnother}
          disabled={isAnalyzing}
          className="px-6 py-3 rounded-2xl border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 font-bold text-sm flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
        >
          <PlusCircle className="w-4 h-4" />
          Quét Ảnh Khác
        </button>

        <button
          onClick={onReanalyze}
          disabled={isAnalyzing}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md shadow-emerald-600/30 flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
        >
          <RotateCcw className="w-4 h-4" />
          Phân Tích Lại Bằng AI
        </button>
      </div>
    </div>
  );
};
