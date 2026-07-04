import { type FC } from 'react';
import { ChevronLeft } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const ReportsScreen: FC<ScreenProps> = ({ onNext }) => {
  const topSelling = [
    { pos: 1, name: "Chicken Biryani", qty: 45 },
    { pos: 2, name: "Paneer Butter Masala", qty: 32 },
    { pos: 3, name: "Masala Dosa", qty: 28 }
  ];

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNext(8)} // Back to Dashboard
            className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-sm font-bold text-slate-800 font-sans">Reports</h1>
        </div>

        <button className="flex items-center gap-1 py-1 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-[10px] font-bold">
          This Week
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
        {/* Total Orders Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Orders</span>
            <span className="text-2xl font-black text-slate-800 mt-1 block">156</span>
            <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 py-0.5 px-2 rounded-full border border-emerald-100/50 mt-1.5 inline-block">
              + 18.5% vs last week
            </span>
          </div>
          <div className="w-12 h-12 bg-white border border-slate-200/50 rounded-xl flex items-center justify-center shadow-2xs text-slate-600 text-lg">📊</div>
        </div>

        {/* Top Selling Items */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xs font-bold text-slate-400 uppercase tracking-widest pl-1">Top Selling Items</h2>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
            {topSelling.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3.5 border-b border-slate-200/50 last:border-0 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-400 w-4">{item.pos}.</span>
                  <span className="font-bold text-slate-700">{item.name}</span>
                </div>
                <span className="font-extrabold text-slate-800">{item.qty} sales</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Order Time */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center shadow-2xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Peak Order Time</span>
            <span className="text-sm font-extrabold text-slate-800 mt-1 block">12 PM - 2 PM</span>
          </div>
          <span className="text-2xl">⚡</span>
        </div>

        {/* Detailed Report Button */}
        <button
          onClick={() => onNext(8)}
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10 mt-2 shrink-0"
        >
          View Detailed Report
        </button>
      </div>
    </div>
  );
};
