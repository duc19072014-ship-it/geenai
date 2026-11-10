import React, { useState } from 'react';
import { AlertCircle, RefreshCw, XCircle, ChevronDown, ChevronUp, KeyRound, ExternalLink } from 'lucide-react';

interface ErrorHandlerProps {
  error: string | null;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error, onRetry, onDismiss }) => {
  const [showGuide, setShowGuide] = useState(true);

  if (!error) return null;

  // Check if error is related to Vercel deployment, server, or missing API key
  const isServerOrApiKeyError =
    error.includes('500') ||
    error.includes('503') ||
    error.includes('GEMINI_API_KEY') ||
    error.includes('Vercel') ||
    error.includes('máy chủ') ||
    error.includes('khóa API') ||
    error.includes('API_KEY');

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-red-50 border-2 border-red-200 text-red-900 text-sm space-y-3 animate-fade-in shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-extrabold text-red-950 block">Thông báo lỗi:</span>
            <p className="font-medium text-red-900 leading-relaxed">{error}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Thử Lại
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1.5 rounded-lg text-red-400 hover:text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Actionable guide when deployed on Vercel without GEMINI_API_KEY */}
      {isServerOrApiKeyError && (
        <div className="mt-2 pt-3 border-t border-red-200">
          <button
            type="button"
            onClick={() => setShowGuide((prev) => !prev)}
            className="flex items-center justify-between w-full text-left font-black text-xs text-red-950 hover:text-red-800 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-red-600" />
              💡 Hướng dẫn cấu hình GEMINI_API_KEY trên Vercel để quét ảnh không bị lỗi:
            </span>
            {showGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showGuide && (
            <div className="mt-2.5 p-3.5 rounded-2xl bg-white border border-red-200 text-xs text-slate-700 space-y-2 animate-fade-in shadow-2xs">
              <p className="font-bold text-slate-800">
                Khi xuất dự án từ AI Studio sang GitHub và Vercel, bạn cần cung cấp Khóa API Gemini cho máy chủ Vercel:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 pl-1 font-medium text-slate-700 leading-relaxed">
                <li>
                  Truy cập{' '}
                  <a
                    href="https://vercel.com/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-emerald-700 underline inline-flex items-center gap-0.5"
                  >
                    Vercel Dashboard <ExternalLink className="w-3 h-3 inline" />
                  </a>{' '}
                  ➔ Bấm vào tên dự án của bạn.
                </li>
                <li>
                  Vào thẻ <span className="font-bold text-slate-900">Settings</span> ➔ chọn menu{' '}
                  <span className="font-bold text-slate-900">Environment Variables</span>.
                </li>
                <li>
                  Thêm biến mới:
                  <div className="mt-1 ml-4 p-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
                    <div>
                      <span className="text-slate-500">Key:</span>{' '}
                      <span className="font-bold text-emerald-700">GEMINI_API_KEY</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Value:</span>{' '}
                      <span className="text-slate-600 font-sans italic">
                        [Dán khóa API Gemini của bạn lấy từ Google AI Studio]
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-sans">
                      (Tích chọn đủ 3 môi trường: Production, Preview, Development)
                    </div>
                  </div>
                </li>
                <li>
                  <span className="font-bold text-amber-900 bg-amber-50 px-1 py-0.5 rounded border border-amber-200">
                    BƯỚC QUAN TRỌNG:
                  </span>{' '}
                  Chuyển sang tab <span className="font-bold text-slate-900">Deployments</span> ➔ Bấm vào nút{' '}
                  <span className="font-bold text-slate-900">[...]</span> bên cạnh bản deploy mới nhất ➔ Chọn{' '}
                  <span className="font-bold text-emerald-800 underline">Redeploy</span>.
                  <p className="text-[11px] text-slate-500 italic mt-0.5">
                    (Vercel chỉ nạp biến môi trường mới vào serverless function sau khi bạn Redeploy!)
                  </p>
                </li>
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
