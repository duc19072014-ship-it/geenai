import React from 'react';
import { AlertCircle, RefreshCw, XCircle } from 'lucide-react';

interface ErrorHandlerProps {
  error: string | null;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error, onRetry, onDismiss }) => {
  if (!error) return null;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border-2 border-red-200 text-red-900 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in shadow-sm">
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
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Thử Lại
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1.5 rounded-lg text-red-400 hover:text-red-700 hover:bg-red-100 transition-colors"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
