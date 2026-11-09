import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ObjectDetectionScanner } from './components/ObjectDetectionScanner';
import { WasteGuide } from './components/WasteGuide';
import { EcoQuiz } from './components/EcoQuiz';
import { EnvironmentalImpact } from './components/EnvironmentalImpact';
import { HistoryDrawer } from './components/HistoryDrawer';
import { BoundingBoxOverlay } from './components/BoundingBoxOverlay';
import { WasteResultCard } from './components/WasteResultCard';
import { DisposalAdvice } from './components/DisposalAdvice';
import { WasteScanResponse, WasteHistoryItem } from './types/waste';
import { Leaf, Heart, ArrowLeft, PlusCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'classifier' | 'guide' | 'quiz' | 'impact'>('classifier');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<WasteHistoryItem | null>(null);
  const [historySelectedObjectId, setHistorySelectedObjectId] = useState<number | null>(null);
  const [historyShowBoxes, setHistoryShowBoxes] = useState(true);

  // Gamification eco points loaded from localStorage
  const [ecoPoints, setEcoPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('green_ai_eco_points');
      return saved ? parseInt(saved, 10) : 50;
    } catch {
      return 50;
    }
  });

  // History list loaded from localStorage
  const [history, setHistory] = useState<WasteHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('green_ai_history_v4');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist points
  useEffect(() => {
    try {
      localStorage.setItem('green_ai_eco_points', ecoPoints.toString());
    } catch (e) {
      console.warn('Failed to save eco points:', e);
    }
  }, [ecoPoints]);

  // Persist history
  useEffect(() => {
    try {
      localStorage.setItem('green_ai_history_v4', JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save history:', e);
    }
  }, [history]);

  const handleEarnPoints = (amount: number) => {
    setEcoPoints((prev) => prev + amount);
  };

  const handleScanSuccess = (scanResult: WasteScanResponse, imageUrl: string) => {
    // Award 5 points per detected object (min 10)
    const bonus = Math.max(10, scanResult.total_objects * 5);
    handleEarnPoints(bonus);

    const newItem: WasteHistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      imageUrl,
      scanResult,
    };

    setHistory((prev) => [newItem, ...prev.slice(0, 19)]); // Store up to 20 recent scans
  };

  const handleClearHistory = () => {
    setHistory([]);
    setSelectedHistoryItem(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#1a2e1f] flex flex-col selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setSelectedHistoryItem(null);
          setActiveTab(tab);
          scrollToTop();
        }}
        ecoPoints={ecoPoints}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {selectedHistoryItem ? (
          <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            {/* History Review Navigation */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <button
                onClick={() => setSelectedHistoryItem(null)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-700 hover:text-emerald-800"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay Lại Máy Quét
              </button>

              <span className="text-xs font-semibold text-slate-500">
                Đã quét lúc: {new Date(selectedHistoryItem.timestamp).toLocaleString('vi-VN')}
              </span>
            </div>

            {/* Review Summary Advice */}
            <DisposalAdvice
              totalObjects={selectedHistoryItem.scanResult.total_objects}
              summary={selectedHistoryItem.scanResult.summary}
              imageQualityNotes={selectedHistoryItem.scanResult.image_quality_notes}
            />

            {/* Review Canvas with Bounding Boxes */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-200 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base text-slate-900">
                  Khung Định Vị Đã Lưu ({selectedHistoryItem.scanResult.objects.filter((o) => o.bounding_box).length} vị trí)
                </span>
                <button
                  onClick={() => setHistoryShowBoxes((prev) => !prev)}
                  className="px-3 py-1.5 rounded-xl border text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  {historyShowBoxes ? 'Ẩn Khung' : 'Hiện Khung'}
                </button>
              </div>

              <BoundingBoxOverlay
                imageUrl={selectedHistoryItem.imageUrl}
                objects={selectedHistoryItem.scanResult.objects}
                selectedObjectId={historySelectedObjectId}
                onSelectObject={(id) => setHistorySelectedObjectId(id)}
                showBoxes={historyShowBoxes}
              />
            </div>

            {/* Review Detected Object Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">
                Chi Tiết Từng Món Rác ({selectedHistoryItem.scanResult.objects.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedHistoryItem.scanResult.objects.map((obj) => (
                  <WasteResultCard
                    key={obj.id}
                    object={obj}
                    isSelected={historySelectedObjectId === obj.id}
                    onSelect={() => setHistorySelectedObjectId(obj.id)}
                  />
                ))}
              </div>
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={() => setSelectedHistoryItem(null)}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
              >
                Quét Thêm Ảnh Mới
              </button>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'classifier' && (
              <ObjectDetectionScanner onScanSuccess={handleScanSuccess} />
            )}
            {activeTab === 'guide' && <WasteGuide />}
            {activeTab === 'quiz' && <EcoQuiz onEarnPoints={handleEarnPoints} />}
            {activeTab === 'impact' && <EnvironmentalImpact />}
          </>
        )}
      </main>

      {/* History Drawer Modal */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
        onSelectHistoryItem={(item) => setSelectedHistoryItem(item)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-emerald-100 bg-white/80 backdrop-blur-xs py-8 text-slate-600 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900">
                GREEN AI – SMART WASTE SCANNER (Phiên Bản 4.0)
              </p>
              <p className="text-xs text-slate-500">
                Phân loại đúng hôm nay – Trái Đất xanh ngày mai
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span>Luật BVMT Việt Nam</span>
            <span>•</span>
            <span>Quét Đa Vật Thể Bounding Box</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              Vì Hành Tinh Xanh <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
