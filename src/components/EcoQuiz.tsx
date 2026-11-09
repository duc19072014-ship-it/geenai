import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ECO_QUIZ_QUESTIONS } from '../data/quizQuestions';

interface EcoQuizProps {
  onEarnPoints: (points: number) => void;
}

export const EcoQuiz: React.FC<EcoQuizProps> = ({ onEarnPoints }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = ECO_QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      onEarnPoints(20); // Award 20 eco-points for correct answer
    }
  };

  const handleNext = () => {
    if (currentIndex < ECO_QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  // Ranking calculation
  const getRank = (score: number) => {
    if (score === 5) {
      return {
        title: 'Bậc Thầy Phân Loại Rác 10/10',
        badge: '🏆',
        desc: 'Tuyệt đỉnh! Bạn nắm vững mọi quy tắc phân loại rác và xứng đáng là Đại Sứ Xanh Lớp 7!',
        color: 'from-amber-400 to-yellow-500',
      };
    }
    if (score >= 3) {
      return {
        title: 'Hiệp Sĩ Môi Trường Tích Cực',
        badge: '🌿',
        desc: 'Rất tốt! Bạn hiểu rõ hầu hết các nhóm rác và đang bảo vệ trường học mỗi ngày.',
        color: 'from-emerald-500 to-teal-500',
      };
    }
    return {
      title: 'Tân Binh Xanh Đang Tiến Bộ',
      badge: '🌱',
      desc: 'Cố gắng lên nào! Hãy đọc thêm Cẩm Nang 3 Nhóm Rác để trở thành cao thủ nhé!',
      color: 'from-blue-500 to-indigo-500',
    };
  };

  if (isCompleted) {
    const rank = getRank(score);
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-200 shadow-xl text-center space-y-6 animate-fade-in">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-linear-to-tr from-emerald-100 to-teal-100 flex items-center justify-center text-5xl shadow-inner shadow-emerald-200">
          {rank.badge}
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Kết Quả Trắc Nghiệm
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {rank.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
            Bạn đã trả lời đúng <strong className="text-emerald-700 font-bold">{score}/{ECO_QUIZ_QUESTIONS.length}</strong> câu hỏi.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
          {rank.desc}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4" /> Làm Lại Bài Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Quiz Progress header */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Câu {currentIndex + 1} / {ECO_QUIZ_QUESTIONS.length}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Chủ đề: {currentQ.category}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-700 mt-1">
            Thử tài nhận biết rác thải thông minh
          </h3>
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-48 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / ECO_QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/80 shadow-lg space-y-6">
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isCorrect = idx === currentQ.correctIndex;
            const isChosen = idx === selectedOption;

            let optionStyle =
              'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-slate-700';

            if (isAnswered) {
              if (isCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-100/80 text-emerald-950 font-bold';
              } else if (isChosen) {
                optionStyle = 'border-red-400 bg-red-50 text-red-900 font-bold';
              } else {
                optionStyle = 'border-slate-200 opacity-60 text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border-2 text-left text-sm sm:text-base font-medium transition-all flex items-start gap-3 ${optionStyle}`}
              >
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>

                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {isAnswered && isChosen && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Explanation */}
        {isAnswered && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-fade-in ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Giải thích chi tiết:</span>
            </div>
            <p className="font-medium">{currentQ.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md shadow-emerald-600/30 flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>{currentIndex < ECO_QUIZ_QUESTIONS.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
