import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const EarningsHistoryScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state } = useApp();

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNext(17)} // Back to Earnings Overview
            className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-sm font-bold text-slate-800 font-sans">Earnings History</h1>
        </div>

        <button className="flex items-center gap-1 py-1 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-[10px] font-bold">
          This Month
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3">
        {state.earningsHistory.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-2xs hover:border-orange-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-xs font-bold font-mono">📅</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 leading-tight">{item.date}</span>
                <span className="text-[9px] font-semibold text-slate-400 block mt-0.5">Completed Delivery</span>
              </div>
            </div>
            
            <span className="text-xs font-black text-slate-800">₹{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
