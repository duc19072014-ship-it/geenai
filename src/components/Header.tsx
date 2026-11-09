import React from 'react';
import { Leaf, Sparkles, BookOpen, BrainCircuit, HelpCircle, History, Award } from 'lucide-react';

interface HeaderProps {
  activeTab: 'classifier' | 'guide' | 'quiz' | 'impact';
  setActiveTab: (tab: 'classifier' | 'guide' | 'quiz' | 'impact') => void;
  ecoPoints: number;
  historyCount: number;
  onOpenHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  ecoPoints,
  historyCount,
  onOpenHistory,
}) => {
  const getBadgeInfo = (points: number) => {
    if (points >= 150) {
      return { title: 'Đại Sứ Xanh Lớp 7', icon: '🏆' };
    }
    if (points >= 70) {
      return { title: 'Hiệp Sĩ Môi Trường', icon: '🌿' };
    }
    return { title: 'Tân Binh Xanh', icon: '🌱' };
  };

  const badge = getBadgeInfo(ecoPoints);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Slogan Banner */}
      <div className="bg-linear-to-r from-emerald-600 via-green-600 to-teal-600 py-1.5 px-4 text-center text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
        <span>Slogan: <strong className="font-extrabold text-yellow-200">Phân loại đúng hôm nay – Trái Đất xanh ngày mai.</strong></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('classifier')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <Leaf className="w-7 h-7 stroke-[2.2]" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-300 absolute -top-1 -right-1 ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl sm:text-2xl tracking-tight bg-linear-to-r from-emerald-700 via-green-600 to-teal-700 bg-clip-text text-transparent">
                  GREEN AI 5.0
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold uppercase rounded-md bg-linear-to-r from-emerald-100 to-blue-100 text-emerald-800 border border-emerald-300">
                  KHKT 2026
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-emerald-800">
                Hệ Thống Phân Loại Rác Thông Minh AI
              </p>
            </div>
          </div>

          {/* Gamification Eco-Points & History Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Eco Points Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-emerald-50 to-blue-50 border border-emerald-200/80 shadow-2xs">
              <span className="text-base sm:text-lg">{badge.icon}</span>
              <div className="flex flex-col">
                <span className="text-[11px] sm:text-xs font-extrabold text-emerald-900 leading-tight">
                  {ecoPoints} <span className="font-semibold text-emerald-600">Điểm Xanh</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-teal-700 uppercase tracking-wide">
                  {badge.title}
                </span>
              </div>
            </div>

            {/* History Button */}
            <button
              onClick={onOpenHistory}
              title="Xem nhật ký các món rác đã phân loại"
              className="relative p-2.5 rounded-xl border border-emerald-200 hover:bg-emerald-50 text-emerald-800 transition-colors"
            >
              <History className="w-5 h-5" />
              {historyCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold text-white bg-emerald-600 rounded-full border-2 border-white shadow-xs">
                  {historyCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none border-t border-emerald-50 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('classifier')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'classifier'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Phân Loại Rác AI</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Cẩm Nang 3 Nhóm Rác</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Thử Tài Phân Loại</span>
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'impact'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Ý Nghĩa Môi Trường</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
