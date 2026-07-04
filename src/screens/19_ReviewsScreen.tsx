import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Star } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const ReviewsScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state } = useApp();
  const reviews = state.reviews;
  
  const ratingStats = [
    { star: 5, pct: "89%" },
    { star: 4, pct: "8%" },
    { star: 3, pct: "2%" },
    { star: 2, pct: "1%" },
    { star: 1, pct: "0%" }
  ];

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center gap-3 select-none shrink-0">
        <button
          onClick={() => onNext(8)} // Back to Dashboard
          className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-sm font-bold text-slate-800 font-sans">Reviews</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-5">
        {/* Rating Overview */}
        <div className="flex gap-6 items-center p-3.5 bg-slate-50 border border-slate-100 rounded-2xl shadow-2xs">
          {/* Average Rating Block */}
          <div className="text-center shrink-0 pr-4 border-r border-slate-200">
            <span className="text-3xl font-black text-slate-800 font-sans leading-none block">4.8</span>
            <div className="flex items-center gap-0.5 justify-center mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3 h-3 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-[9px] font-semibold text-slate-400 block mt-1.5">(128 Reviews)</span>
          </div>

          {/* Bar Chart list */}
          <div className="flex-1 flex flex-col gap-1 select-none">
            {ratingStats.map((item) => (
              <div key={item.star} className="flex items-center gap-2 text-[9px] font-bold text-slate-500">
                <span className="w-2.5">{item.star}★</span>
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: item.pct }}></div>
                </div>
                <span className="w-6 text-right">{item.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* List of customer reviews */}
        <div className="flex flex-col gap-3">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-white border border-slate-200 text-xs rounded-full flex items-center justify-center shrink-0 font-bold">👤</div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 leading-tight">{rev.customerName}</h3>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2.5 h-2.5 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <span className="text-[9px] font-bold text-slate-400">{rev.date}</span>
              </div>

              <p className="text-xs font-semibold text-slate-600 leading-relaxed pl-0.5">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <button
          onClick={() => onNext(8)}
          className="w-full py-3 border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-xs rounded-xl transition"
        >
          View All Reviews
        </button>
      </div>
    </div>
  );
};
