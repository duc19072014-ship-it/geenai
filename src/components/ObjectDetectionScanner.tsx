import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Sparkles,
  Camera,
  RefreshCw,
  PlusCircle,
  Eye,
  EyeOff,
  Layers,
  Zap,
  AlertTriangle,
} from 'lucide-react';
import { WasteScanResponse, DetectedObject } from '../types/waste';
import { preprocessImage } from '../utils/imagePreprocessor';
import { analyzeWasteImage, checkServerDiagnostics } from '../services/wasteAnalysisService';
import { ImageUpload } from './ImageUpload';
import { CameraScanner } from './CameraScanner';
import { BoundingBoxOverlay } from './BoundingBoxOverlay';
import { WasteResultCard } from './WasteResultCard';
import { DisposalAdvice } from './DisposalAdvice';
import { ErrorHandler } from './ErrorHandler';
import { ProductionDebugPanel } from './ProductionDebugPanel';
import { DebugDiagnosticInfo } from '../types/waste';

interface ObjectDetectionScannerProps {
  onScanSuccess: (result: WasteScanResponse, imageUrl: string) => void;
}

export const ObjectDetectionScanner: React.FC<ObjectDetectionScannerProps> = ({ onScanSuccess }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [scanResult, setScanResult] = useState<WasteScanResponse | null>(null);
  const [selectedObjectId, setSelectedObjectId] = useState<number | null>(null);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  const [currentDebugInfo, setCurrentDebugInfo] = useState<DebugDiagnosticInfo | null>(null);
  const [serverApiKeyMissing, setServerApiKeyMissing] = useState(false);
  const [imageStats, setImageStats] = useState<{
    originalSizeKB?: number;
    compressedSizeKB?: number;
    dimensions?: string;
    mimeType?: string;
  } | null>(null);

  // Check server diagnostics on mount to give immediate feedback on Vercel
  useEffect(() => {
    checkServerDiagnostics().then((diag) => {
      if (!diag.apiKeyConfigured) {
        setServerApiKeyMissing(true);
      }
    });
  }, []);

  // Cached sample preset (if user selected one of the 6 test cases)
  const currentMockPresetRef = useRef<WasteScanResponse | null>(null);
  const currentSampleIdRef = useRef<string | null>(null);
  // Cache tracking to prevent analyzing the same image repeatedly
  const lastAnalyzedImageRef = useRef<string | null>(null);
  const cachedScanResultRef = useRef<WasteScanResponse | null>(null);
  const [scanStep, setScanStep] = useState<number>(1);

  // Handle image selection (file or sample dataUrl)
  const handleImageSelected = useCallback(async (source: File | string, presetMock?: WasteScanResponse, sampleId?: string) => {
    setIsCompressing(true);
    setErrorMessage(null);
    setScanResult(null);
    setSelectedObjectId(null);
    currentMockPresetRef.current = presetMock || null;
    currentSampleIdRef.current = sampleId || null;

    try {
      // 1024px with 0.85 quality ensures high clarity for labels and waste textures
      const preprocessed = await preprocessImage(source, 1024, 0.85);
      setSelectedImage(preprocessed.dataUrl);
      setImageStats({
        originalSizeKB: Math.round(preprocessed.originalSize / 1024),
        compressedSizeKB: Math.round(preprocessed.compressedSize / 1024),
        dimensions: `${preprocessed.width}x${preprocessed.height}`,
        mimeType: preprocessed.mimeType,
      });
      setCurrentDebugInfo({
        stage: 'image_upload',
        status: 'success',
        imageDimensions: `${preprocessed.width}x${preprocessed.height}`,
        imageMimeType: preprocessed.mimeType,
        imageSizeKB: Math.round(preprocessed.compressedSize / 1024),
        troubleshootingTip: 'Ảnh đã được chuẩn hóa và kiểm tra hợp lệ, sẵn sàng gửi đến máy chủ.',
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('Preprocessing error:', err);
      if (typeof source === 'string') {
        setSelectedImage(source);
      } else {
        setErrorMessage(err.message || 'Lỗi khi xử lý hình ảnh.');
      }
      setCurrentDebugInfo({
        stage: 'image_upload',
        status: 'error',
        rawErrorMessage: err.message,
        troubleshootingTip: 'Đảm bảo tệp ảnh không bị hỏng và thuộc định dạng JPG, PNG hoặc WebP.',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsCompressing(false);
    }
  }, []);

  // Primary execution: Real AI analysis with QUÉT RÁC button
  const handleExecuteScan = async (forceReanalyze: boolean = false) => {
    if (!selectedImage) {
      setErrorMessage('Vui lòng chọn hoặc chụp ảnh trước khi quét rác.');
      return;
    }

    // Prevent duplicate request if already analyzed
    if (!forceReanalyze && lastAnalyzedImageRef.current === selectedImage && cachedScanResultRef.current) {
      setScanResult(cachedScanResultRef.current);
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);
    setScanStep(1);

    // Multi-stage progress ticker for smooth student feedback
    const stageTimer1 = setTimeout(() => setScanStep(2), 2200);
    const stageTimer2 = setTimeout(() => setScanStep(3), 5500);
    const stageTimer3 = setTimeout(() => setScanStep(4), 9000);

    try {
      let result: WasteScanResponse;

      try {
        // Send real AI request to /api/scan-waste with sampleId if available
        result = await analyzeWasteImage(selectedImage, 40000, currentSampleIdRef.current || undefined);
        if (result.debug_info) {
          setCurrentDebugInfo(result.debug_info);
        }
      } catch (apiErr: any) {
        if (apiErr.debugInfo) {
          setCurrentDebugInfo(apiErr.debugInfo);
        } else {
          setCurrentDebugInfo({
            stage: 'ai_analysis',
            status: 'error',
            rawErrorMessage: apiErr.message,
            troubleshootingTip: 'Kiểm tra biến môi trường GEMINI_API_KEY trong Project Settings trên Vercel.',
            timestamp: new Date().toISOString(),
          });
        }

        // Only use preset if user explicitly clicked one of the 6 test sample buttons
        if (currentMockPresetRef.current && currentSampleIdRef.current) {
          result = currentMockPresetRef.current;
        } else {
          setIsDebugOpen(true); // Open debug panel on error so user can inspect root cause
          throw apiErr;
        }
      }

      lastAnalyzedImageRef.current = selectedImage;
      cachedScanResultRef.current = result;

      setScanResult(result);
      if (result.objects.length > 0) {
        setSelectedObjectId(result.objects[0].id);
      }
      onScanSuccess(result, selectedImage);
    } catch (err: any) {
      console.error('Scan execution error:', err);
      setErrorMessage(err.message || 'Đã xảy ra sự cố khi quét rác.');
    } finally {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearTimeout(stageTimer3);
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setScanResult(null);
    setSelectedObjectId(null);
    setErrorMessage(null);
    currentMockPresetRef.current = null;
    currentSampleIdRef.current = null;
    lastAnalyzedImageRef.current = null;
    cachedScanResultRef.current = null;
    setImageStats(null);
    setCurrentDebugInfo(null);
    setScanStep(1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Header */}
      {!scanResult && (
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-emerald-100 via-teal-100 to-blue-100 text-emerald-950 text-xs sm:text-sm font-black border border-emerald-300 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            GREEN AI 5.0 – SMART MULTI-OBJECT SCANNER
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Quét & Phân Loại Từng Món Rác Thông Minh
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Hỗ trợ ảnh một món rác hoặc đống rác sinh hoạt hỗn hợp. AI tự động định vị khung viền 5 màu chuẩn xác, nhận diện rác tái chế, hữu cơ, rác còn lại và rác nguy hại để xử lý an toàn!
          </p>
        </div>
      )}

      {/* Proactive Vercel API Key Banner if not yet configured */}
      {serverApiKeyMissing && !errorMessage && (
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-extrabold text-amber-950 block text-sm">
                Lưu ý: Chưa phát hiện biến GEMINI_API_KEY trên máy chủ Vercel
              </span>
              <p className="font-medium text-amber-900 leading-relaxed text-xs">
                Để quét ảnh thực tế trên Vercel không bị lỗi máy chủ, bạn cần thêm biến{' '}
                <code className="bg-amber-200/80 px-1 py-0.5 rounded font-mono font-bold text-amber-950">
                  GEMINI_API_KEY
                </code>{' '}
                trong <span className="font-bold">Project Settings ➔ Environment Variables</span> rồi bấm{' '}
                <span className="font-bold underline">Redeploy</span>.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDebugOpen(true)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 self-end sm:self-auto transition-transform active:scale-95 cursor-pointer"
          >
            Mở Bảng Chẩn Đoán
          </button>
        </div>
      )}

      {/* Error Banner */}
      <ErrorHandler
        error={errorMessage}
        onRetry={selectedImage ? () => handleExecuteScan(true) : undefined}
        onDismiss={() => setErrorMessage(null)}
      />

      {/* Production Diagnostic Debug Panel (STEP 7) */}
      <ProductionDebugPanel
        currentDebugInfo={currentDebugInfo}
        imageStats={imageStats}
        isOpen={isDebugOpen}
        onToggle={() => setIsDebugOpen((prev) => !prev)}
      />

      {/* SCANNING RESULTS PANEL */}
      {scanResult && selectedImage ? (
        <div className="space-y-8 animate-fade-in">
          {/* Summary & Disposal Advice Header */}
          <DisposalAdvice
            totalObjects={scanResult.total_objects}
            summary={scanResult.summary}
            imageQualityNotes={scanResult.image_quality_notes}
          />

          {/* Visual Canvas or Empty Clean State */}
          {scanResult.objects.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 shadow-md text-center max-w-xl mx-auto space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                <Sparkles className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                Không Phát Hiện Rác Thải Nào! 🌱
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {scanResult.image_quality_notes ||
                  'Ảnh không chứa rác thải hoặc khu vực rất sạch sẽ. Hãy tiếp tục giữ gìn môi trường xanh nhé!'}
              </p>
            </div>
          ) : (
            <>
              {/* Visual Canvas with Bounding Boxes */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-200 shadow-lg space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-600" />
                    Khung Nhận Diện Bounding Box (
                    {scanResult.objects.filter((o) => o.bounding_box !== null).length} vị trí)
                  </span>

                  <div className="flex items-center gap-2">
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
                          <Eye className="w-4 h-4 text-emerald-600" /> Ẩn Khung Nhận Diện
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 text-slate-500" /> Hiện Khung Nhận Diện
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <BoundingBoxOverlay
                  imageUrl={selectedImage}
                  objects={scanResult.objects}
                  selectedObjectId={selectedObjectId}
                  onSelectObject={(id) => setSelectedObjectId(id)}
                  showBoxes={showBoundingBoxes}
                />

                <p className="text-center text-xs text-slate-500 font-medium">
                  💡 Bấm vào từng khung viền trên ảnh hoặc thẻ bên dưới để xem chi tiết cách xử lý và mẹo bảo vệ môi trường.
                </p>
              </div>

              {/* Individual Object Cards List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Danh Sách Từng Món Rác ({scanResult.objects.length})
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    Phân loại độc lập từng món
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scanResult.objects.map((obj) => (
                    <WasteResultCard
                      key={obj.id}
                      object={obj}
                      isSelected={selectedObjectId === obj.id}
                      onSelect={() => setSelectedObjectId(obj.id)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Bottom Action Buttons */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleReset}
              disabled={isAnalyzing}
              className="px-6 py-3 rounded-2xl border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 font-bold text-sm flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              Quét Ảnh Khác
            </button>

            <button
              onClick={() => handleExecuteScan(true)}
              disabled={isAnalyzing}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md shadow-emerald-600/30 flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4" />
              Quét Lại Bằng AI
            </button>
          </div>
        </div>
      ) : (
        /* UPLOAD & SCAN CONTROLS */
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-emerald-200 shadow-lg shadow-emerald-500/5">
            {!selectedImage ? (
              <ImageUpload
                onImageSelected={handleImageSelected}
                onOpenCamera={() => setIsCameraOpen(true)}
                isProcessing={isCompressing}
              />
            ) : (
              <div className="space-y-6">
                {/* Image Preview with Loading Indicator */}
                <div className="relative aspect-4/3 max-h-[420px] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md flex items-center justify-center mx-auto">
                  <img
                    src={selectedImage}
                    alt="Vật phẩm rác cần quét"
                    className="w-full h-full object-contain"
                  />

                  {/* Analysis Progress Indicator */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center text-white p-6 space-y-4 animate-fade-in z-20">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin" />
                        <Sparkles className="w-6 h-6 text-yellow-300 absolute inset-0 m-auto animate-pulse" />
                      </div>
                      <div className="text-center space-y-1.5 max-w-md">
                        <p className="text-base sm:text-lg font-black text-emerald-300 transition-all">
                          {scanStep === 1 && 'Đang phân tích hình ảnh và nhận diện từng món rác...'}
                          {scanStep === 2 && 'AI đang tách biệt các vật thể độc lập và định vị khung viền...'}
                          {scanStep === 3 && 'Đang phân loại 5 nhóm chuẩn KHKT và đánh giá độ tin cậy...'}
                          {scanStep >= 4 && 'Đang tổng hợp hướng dẫn xử lý và mẹo bảo vệ môi trường...'}
                        </p>
                        <span className="text-xs text-slate-300 block">
                          Chuẩn phân loại: Xanh lá (Tái chế) • Cam (Hữu cơ) • Xám (Còn lại) • Đỏ (Nguy hại) • Vàng (Chưa rõ)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 pt-1">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              scanStep >= step ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {isCompressing && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center text-white text-sm font-semibold gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
                      Đang tối ưu dung lượng ảnh...
                    </div>
                  )}
                </div>

                {/* Controls with the required large button labeled "QUÉT RÁC" */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    disabled={isAnalyzing}
                    className="px-4 py-2.5 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold text-sm transition-colors disabled:opacity-50"
                  >
                    Chọn Ảnh Khác
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsCameraOpen(true)}
                      disabled={isAnalyzing}
                      className="px-4 py-2.5 rounded-2xl border border-emerald-200 hover:bg-emerald-50 text-emerald-800 font-semibold text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <Camera className="w-4 h-4" />
                      Chụp Lại
                    </button>

                    {/* Requirement Section 8: A large button labeled "QUÉT RÁC" */}
                    <button
                      onClick={() => handleExecuteScan(false)}
                      disabled={isAnalyzing || isCompressing}
                      className="px-8 py-3.5 rounded-2xl bg-linear-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base shadow-xl shadow-emerald-600/30 flex items-center gap-2.5 transition-transform active:scale-95 disabled:opacity-50 tracking-wider uppercase"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>ĐANG PHÂN TÍCH...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                          <span>QUÉT RÁC</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Live Camera Scanner Modal */}
      <CameraScanner
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => {
          handleImageSelected(dataUrl);
        }}
      />
    </div>
  );
};
