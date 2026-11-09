import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle,
  XCircle,
  Info,
  Sparkles,
  Filter,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { WASTE_CATEGORIES_GUIDE, COMMON_WASTE_ITEMS } from '../data/wasteDictionary';
import { WasteCategory } from '../types/waste';

export const WasteGuide: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | WasteCategory>('All');
  const [activeTabCategory, setActiveTabCategory] = useState<WasteCategory>('Rác tái chế');

  // Filter dictionary items
  const filteredItems = COMMON_WASTE_ITEMS.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tip.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === 'All' || item.category === selectedFilter;

    return matchesQuery && matchesFilter;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 animate-fade-in">
      {/* Intro Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          Cẩm Nang Phân Loại Rác Chuẩn Quốc Gia
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Quy Chuẩn Phân Loại Rác Khoa Học (GREEN AI 5.0)
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Rác sinh hoạt và trường học được phân loại chuẩn xác theo các nhóm: Tái Chế, Hữu Cơ, Còn Lại và Rác Nguy Hại/Đặc Thù. Hãy cùng khám phá quy chuẩn xử lý bảo vệ môi trường nhé!
        </p>
      </div>

      {/* 4 Categories Tab Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {WASTE_CATEGORIES_GUIDE.map((cat) => {
          const isSelected = activeTabCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTabCategory(cat.id)}
              className={`p-5 rounded-3xl border-2 text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? `${cat.borderColor} bg-white shadow-xl scale-[1.02]`
                  : 'border-slate-200 bg-white/70 hover:bg-white hover:border-emerald-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{cat.binIcon}</span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      cat.badgeBg
                    }`}
                  >
                    {cat.binColorName}
                  </span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">{cat.name}</h3>
                <p className="text-xs font-semibold text-slate-500 mt-1">{cat.tagline}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-700">
                <span>Xem hướng dẫn chi tiết</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel of the selected category */}
      {(() => {
        const currentCat = WASTE_CATEGORIES_GUIDE.find((c) => c.id === activeTabCategory)!;
        return (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/80 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{currentCat.binIcon}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {currentCat.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-700">
                    Màu thùng chuẩn: {currentCat.binColorName}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 max-w-sm">
                <span className="font-bold text-slate-900 block mb-0.5">🌱 Ý nghĩa với Trái Đất:</span>
                {currentCat.whyImportant}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Examples */}
              <div className="space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Các Món Rác Thường Gặp Cần Bỏ Vào Đây:
                </h4>
                <ul className="space-y-2">
                  {currentCat.examples.map((ex, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm font-medium text-slate-700 flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/60"
                    >
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disposal Steps & Don'ts */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    Cách Học Sinh Xử Lý Chuẩn Xác:
                  </h4>
                  <div className="space-y-2">
                    {currentCat.disposalRules.map((rule, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="font-medium">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-bold text-red-700 flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    Những Điều Tuyệt Đối Tránh:
                  </h4>
                  <ul className="space-y-1.5">
                    {currentCat.notAllowed.map((not, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-red-900 bg-red-50/60 p-2 rounded-xl border border-red-200/80 flex items-start gap-2 font-medium"
                      >
                        <span className="text-red-500 font-bold shrink-0">✕</span>
                        <span>{not}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Searchable Waste Dictionary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-600" />
              Từ Điển Tra Cứu Nhanh Món Rác
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Gõ tên bất kỳ món đồ nào quanh lớp học hoặc nhà bạn để xem nên vứt thùng nào:
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(['All', 'Rác tái chế', 'Rác hữu cơ', 'Rác còn lại'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === filter
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter === 'All' ? 'Tất cả (20+)' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm: chai nhựa, vỏ chuối, bút bi, vỏ hộp sữa, túi snack, viên pin..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:bg-white text-sm font-medium text-slate-800 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Dictionary Table / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                        item.category === 'Rác tái chế'
                          ? 'bg-blue-100 text-blue-800'
                          : item.category === 'Rác hữu cơ'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {item.binColor}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                    Chất liệu: {item.material}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs font-medium text-slate-700">
                  <span className="font-bold text-emerald-700">Mẹo:</span> {item.tip}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-slate-500 text-sm">
              Không tìm thấy món rác nào khớp với từ khóa "{searchQuery}". Hãy thử tìm kiếm từ khác hoặc dùng AI Quét ảnh nhé!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
