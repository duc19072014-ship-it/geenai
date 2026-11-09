import React, { useState } from 'react';
import {
  Globe,
  TrendingDown,
  Recycle,
  Heart,
  Trees,
  Droplets,
  Zap,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const EnvironmentalImpact: React.FC = () => {
  const [pledged, setPledged] = useState(false);
  const [studentName, setStudentName] = useState('');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 animate-fade-in">
      {/* Hero header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold">
          <Globe className="w-4 h-4 text-emerald-600" />
          Hành Trình Bảo Vệ Trái Đất
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Vì Sao Học Sinh Lớp 7 Cần Phân Loại Rác?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Mỗi ngày tại Việt Nam phát sinh hơn 64.000 tấn rác thải. Nếu không phân loại, rác sẽ bị chôn lấp lẫn lộn, làm ô nhiễm nguồn nước ngầm, đất đai và không khí mà chúng ta đang hít thở.
        </p>
      </div>

      {/* Inspiring Environmental Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-emerald-200 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
            <Trees className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-700">17 Cây Xanh</h3>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Được cứu sống khi tái chế 1 tấn giấy
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Tiết kiệm 4.000 kWh điện và 30.000 lít nước sạch cho thiên nhiên.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-blue-200 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
            <Recycle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-blue-700">95% Năng Lượng</h3>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Tiết kiệm khi tái chế lon nhôm
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Một vỏ lon nhôm có thể tái sinh thành lon mới và quay lại kệ hàng chỉ trong 60 ngày.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-700">450 Năm</h3>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Thời gian một chai nhựa phân hủy
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Nếu vứt bừa bãi ra sông biển, chúng sẽ vỡ vụn thành hạt vi nhựa nguy hại cho cá và con người.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-teal-200 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-teal-700">60% Rác Thải</h3>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Là rác hữu cơ có thể làm phân bón
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Tạo thành nguồn dinh dưỡng màu mỡ cho các bồn hoa và cây xanh sân trường học.
            </p>
          </div>
        </div>
      </div>

      {/* The 3T (3R) Framework for 7th Graders */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/80 shadow-md">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Kim Chỉ Nam "Quy Tắc 3T" Dành Cho Học Sinh
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            3 hành động đơn giản mà mỗi bạn học sinh lớp 7 đều có thể thực hiện mỗi ngày:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* T1 */}
          <div className="p-6 rounded-2xl bg-linear-to-b from-emerald-50 to-emerald-100/40 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
                  1
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Reduce
                </span>
              </div>
              <h4 className="text-lg font-bold text-emerald-950 mb-2">Tiết Giảm (Reduce)</h4>
              <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed font-medium">
                Hạn chế tạo ra rác ngay từ đầu: Từ chối túi nilon khi mua quà vặt, mang theo bình nước cá nhân đến trường, không lãng phí thức ăn bán trú.
              </p>
            </div>
          </div>

          {/* T2 */}
          <div className="p-6 rounded-2xl bg-linear-to-b from-blue-50 to-blue-100/40 border border-blue-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Reuse
                </span>
              </div>
              <h4 className="text-lg font-bold text-blue-950 mb-2">Tái Sử Dụng (Reuse)</h4>
              <p className="text-xs sm:text-sm text-blue-900/90 leading-relaxed font-medium">
                Sử dụng một món đồ nhiều lần: Tận dụng chai nhựa làm chậu trồng hoa mười giờ, dùng túi vải đi thư viện, quyên góp sách giáo khoa cũ cho học sinh khóa dưới.
              </p>
            </div>
          </div>

          {/* T3 */}
          <div className="p-6 rounded-2xl bg-linear-to-b from-teal-50 to-teal-100/40 border border-teal-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-teal-600 text-white font-black text-sm flex items-center justify-center">
                  3
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Recycle
                </span>
              </div>
              <h4 className="text-lg font-bold text-teal-950 mb-2">Tái Chế (Recycle)</h4>
              <p className="text-xs sm:text-sm text-teal-900/90 leading-relaxed font-medium">
                Phân loại đúng 3 nhóm rác: Giúp các cô chú công nhân thu gom đưa phế liệu sạch về các nhà máy tái chế để biến chúng thành đồ dùng hữu ích mới.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Green Pledge Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-600 via-green-600 to-teal-700 p-6 sm:p-10 text-white shadow-xl">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold">
            <Heart className="w-3.5 h-3.5 text-red-300 fill-current" />
            Lời Hứa Hiệp Sĩ Xanh Lớp 7
          </div>

          <h3 className="text-2xl sm:text-3xl font-black leading-tight">
            Cam Kết Hành Động Vì Trường Lớp Xanh – Sạch – Đẹp
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
            "Em xin cam kết mỗi ngày sẽ phân loại rác đúng thùng, không xả rác bừa bãi nơi sân trường, hành lang lớp học và nhắc nhở bạn bè cùng chung tay giữ gìn môi trường sống."
          </p>

          {pledged ? (
            <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-yellow-300 shrink-0" />
              <div>
                <span className="font-extrabold text-base text-yellow-200 block">
                  Cảm ơn Hiệp Sĩ Xanh {studentName ? `"${studentName}"` : ''}!
                </span>
                <span className="text-xs text-white/90">
                  Bạn là niềm tự hào của lớp và là tấm gương bảo vệ môi trường!
                </span>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPledged(true);
              }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Nhập tên và lớp của bạn (VD: Minh Thư - 7A1)..."
                required
                className="px-4 py-3 rounded-2xl bg-white text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-yellow-300 flex-1"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-black text-sm shadow-md transition-transform active:scale-95 whitespace-nowrap"
              >
                Tôi Xin Cam Kết!
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
