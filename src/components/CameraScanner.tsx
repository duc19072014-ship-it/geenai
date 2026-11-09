import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, X, AlertCircle } from 'lucide-react';

interface CameraScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async (facing: 'environment' | 'user') => {
    setIsInitializing(true);
    setCameraError(null);
    stopStream();

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((device) => device.kind === 'videoinput');
        setHasMultipleCameras(videoInputs.length > 1);
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsInitializing(false);
    } catch (err: any) {
      console.error('Camera error:', err);
      setIsInitializing(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Bạn chưa cấp quyền truy cập Camera. Vui lòng bật quyền trên trình duyệt để chụp ảnh trực tiếp.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('Không tìm thấy thiết bị Camera trên máy này.');
      } else {
        setCameraError('Không thể khởi động camera: ' + (err.message || 'Lỗi không xác định'));
      }
    }
  }, [stopStream]);

  useEffect(() => {
    if (isOpen) {
      startCamera(facingMode);
    } else {
      stopStream();
    }

    return () => {
      stopStream();
    };
  }, [isOpen, facingMode, startCamera, stopStream]);

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const captureSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    stopStream();
    onCapture(dataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800 text-white">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="font-extrabold text-base sm:text-lg">Chụp Ảnh Đống Rác Cần Quét</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Viewport */}
        <div className="relative aspect-4/3 w-full bg-black flex items-center justify-center overflow-hidden">
          {cameraError ? (
            <div className="p-6 text-center text-red-400 max-w-sm flex flex-col items-center gap-3">
              <AlertCircle className="w-12 h-12 text-red-500" />
              <p className="text-sm font-medium">{cameraError}</p>
              <button
                onClick={() => startCamera(facingMode)}
                className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" /> Thử lại
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder Reticle Overlay */}
              <div className="absolute inset-8 border-2 border-emerald-400/70 rounded-2xl pointer-events-none flex flex-col justify-between p-2">
                <div className="flex justify-between">
                  <span className="w-4 h-4 border-t-4 border-l-4 border-emerald-400" />
                  <span className="w-4 h-4 border-t-4 border-r-4 border-emerald-400" />
                </div>
                <div className="flex justify-center">
                  <span className="bg-emerald-950/80 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/40 backdrop-blur-xs">
                    Căn chỉnh toàn bộ đống rác vào giữa khung hình
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="w-4 h-4 border-b-4 border-l-4 border-emerald-400" />
                  <span className="w-4 h-4 border-b-4 border-r-4 border-emerald-400" />
                </div>
              </div>

              {isInitializing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-emerald-400 text-sm font-medium gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" /> Đang bật camera...
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="p-5 bg-slate-900 flex items-center justify-around border-t border-slate-800">
          <button
            onClick={toggleFacingMode}
            disabled={!hasMultipleCameras || isInitializing}
            title="Đổi camera trước / sau"
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <RefreshCw className="w-6 h-6" />
          </button>

          {/* Shutter Button */}
          <button
            onClick={captureSnapshot}
            disabled={isInitializing || !!cameraError}
            className="group relative flex items-center justify-center w-18 h-18 rounded-full bg-emerald-500 hover:bg-emerald-400 p-1.5 shadow-lg shadow-emerald-500/50 disabled:opacity-40 disabled:pointer-events-none transition-transform active:scale-95"
          >
            <div className="w-full h-full rounded-full border-4 border-slate-900 flex items-center justify-center bg-white group-hover:scale-95 transition-transform">
              <Camera className="w-7 h-7 text-emerald-700" />
            </div>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-2xl text-slate-400 hover:text-white font-medium text-sm hover:bg-slate-800 transition-colors"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};
