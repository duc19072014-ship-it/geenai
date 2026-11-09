import React from 'react';
import { X, Trash2, Calendar, Award } from 'lucide-react';
import { WasteHistoryItem, CATEGORY_META } from '../types/waste';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: WasteHistoryItem[];
  onClearHistory: () => void;
  onSelectHistoryItem: (item: WasteHistoryItem) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onSelectHistoryItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-lg text-slate-800">
                Nhật Ký Quét Rác ({history.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {history.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <Calendar className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="font-bold text-slate-700 text-base mb-1">
                  Chưa có lịch sử quét rác
                </h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Hãy tải ảnh hoặc chụp ảnh đống rác để bắt đầu quét và tích lũy Điểm Xanh nhé!
                </p>
              </div>
            ) : (
              history.map((item) => {
                const total = item.scanResult.total_objects;
                const firstObj = item.scanResult.objects[0];
                const meta = firstObj ? (CATEGORY_META[firstObj.category] || CATEGORY_META.unknown) : CATEGORY_META.unknown;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectHistoryItem(item);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all cursor-pointer flex gap-3 items-center group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 flex items-center justify-center">
                      <img
                        src={item.imageUrl}
                        alt="Lịch sử quét"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-linear-to-r from-emerald-100 to-blue-100 text-emerald-900 border border-emerald-300">
                          {total > 1 ? `Đa vật thể: ${total} món` : `1 món rác: ${meta.vietnameseName}`}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 truncate">
                        {total > 1
                          ? item.scanResult.objects.map((o) => o.name).join(', ')
                          : firstObj?.name || 'Vật phẩm rác'}
                      </h4>

                      <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                        {new Date(item.timestamp).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Clear All */}
          {history.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button
                onClick={onClearHistory}
                className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Xóa Toàn Bộ Lịch Sử
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
