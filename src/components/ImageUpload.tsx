import React, { useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import { SAMPLE_WASTE_ITEMS } from '../data/sampleImages';
import { SampleWasteItem } from '../types/waste';

interface ImageUploadProps {
  onImageSelected: (source: File | string, samplePreset?: any, sampleId?: string) => void;
  onOpenCamera: () => void;
  isProcessing?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelected,
  onOpenCamera,
  isProcessing = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="relative border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-3xl p-8 sm:p-12 text-center bg-linear-to-b from-emerald-50/40 via-blue-50/20 to-transparent transition-all flex flex-col items-center justify-center cursor-pointer group shadow-inner"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-emerald-100 via-teal-100 to-green-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-inner shadow-emerald-200">
          <UploadCloud className="w-10 h-10" />
        </div>

        <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
          Kéo thả ảnh rác vào đây hoặc nhấn để tải lên
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md mb-6">
          Hỗ trợ ảnh 1 món đơn lẻ, ảnh nhiều món hoặc đống rác sinh hoạt hỗn hợp (JPG, PNG, WebP)
        </p>

        {/* Buttons inside Dropzone */}
        <div
          className="flex flex-wrap items-center justify-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
          >
            <ImageIcon className="w-4 h-4" />
            Chọn Ảnh Từ Máy
          </button>

          <button
            type="button"
            disabled={isProcessing}
            onClick={onOpenCamera}
            className="px-5 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-sm shadow-md shadow-teal-700/20 flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
          >
            <Camera className="w-4 h-4" />
            Chụp Bằng Camera
          </button>
        </div>
      </div>

      {/* 6 Test Cases Grid from Section 13 */}
      <div className="bg-linear-to-br from-emerald-50/80 via-teal-50/50 to-blue-50/60 rounded-3xl p-6 border border-emerald-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="text-xl">🧪</span>
              Thử Nghiệm Nhanh Với Mẫu Chuẩn Khoa Học (1 Chạm)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Kiểm tra khả năng phân loại riêng biệt, định vị khung viền và nhận diện rác nguy hại:
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200 shrink-0 self-start sm:self-auto">
            Bộ mẫu KHKT
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {SAMPLE_WASTE_ITEMS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onImageSelected(sample.imageUrl, sample.mockResult, sample.id)}
              disabled={isProcessing}
              className="group p-2.5 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-left transition-all shadow-2xs hover:shadow-md flex flex-col items-center text-center disabled:opacity-50"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-50 mb-2 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src={sample.imageUrl}
                  alt={sample.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase bg-slate-100 text-slate-700 mb-1">
                {sample.testCaseType}
              </span>

              <span className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                {sample.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
