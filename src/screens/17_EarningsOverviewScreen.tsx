import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const EarningsOverviewScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state } = useApp();
  const overview = state.earningsOverview;

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center mt-1">
          <h1 className="text-lg font-bold text-slate-800 font-sans">Earnings</h1>
          <button className="flex items-center gap-1.5 py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-slate-600 text-2xs font-bold shadow-2xs">
            <Calendar className="w-3.5 h-3.5" />
            Today
          </button>
        </div>

        {/* Total Earnings Card */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Earnings</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-800">₹{overview.totalEarnings}</span>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 py-0.5 px-2 rounded-full border border-emerald-100/50">
              {overview.percentageChange}
            </span>
          </div>
        </div>

        {/* Beautiful Custom SVG Line Chart */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col gap-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-2xs font-bold text-slate-400 uppercase tracking-widest">Earnings Flow</span>
            <span className="text-[9px] font-semibold text-slate-400">12 AM - 11 PM</span>
          </div>
          
          {/* Chart SVG */}
          <div className="h-32 w-full relative mt-2 select-none">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              {/* Gradient definition */}
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="10" x2="100" y2="10" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="1,1" />
              <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="1,1" />
              <line x1="0" y1="30" x2="100" y2="30" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="1,1" />
              
              {/* Shaded Area */}
              <path
                d="M 0,38 L 0,32 Q 25,25 50,15 T 100,2 L 100,38 Z"
                fill="url(#chartGrad)"
              />
              
              {/* Curved Line */}
              <path
                d="M 0,32 Q 25,25 50,15 T 100,2"
                fill="none"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              
              {/* Dot markers */}
              <circle cx="50" cy="15" r="1.2" fill="#10B981" stroke="#ffffff" strokeWidth="0.5" />
              <circle cx="100" cy="2" r="1.2" fill="#10B981" stroke="#ffffff" strokeWidth="0.5" />
            </svg>
          </div>
          
          {/* Chart X Labels */}
          <div className="flex justify-between text-[9px] font-bold text-slate-400 px-1 border-t border-slate-50 pt-2 mt-1">
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>11 PM</span>
          </div>
        </div>

        {/* Earning Breakdown Cards */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xs font-bold text-slate-400 uppercase tracking-widest pl-1">Breakdown</h2>
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-3 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-500">Order Earnings</span>
              <span className="font-extrabold text-slate-700">₹{overview.orderEarnings}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-500">Delivery Charges</span>
              <span className="font-extrabold text-slate-700">₹{overview.deliveryCharges}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-500">Taxes</span>
              <span className="font-extrabold text-slate-700">₹{overview.taxes}</span>
            </div>
            <hr className="border-slate-50" />
            <div className="flex justify-between items-center text-xs font-black text-slate-800">
              <span>Total</span>
              <span>₹{overview.totalEarnings}</span>
            </div>
          </div>
        </div>

        {/* Earning History Trigger Card */}
        <button
          onClick={() => onNext(18)} // Earnings History Screen
          className="bg-white hover:bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center justify-between shadow-2xs transition active:scale-[0.99] select-none text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-50 text-brand-orange rounded-lg border border-orange-100 flex items-center justify-center">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <span className="text-xs font-bold text-slate-700">View Earnings History</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Navigation */}
      <BottomNav activeTab="earnings" onTabSelect={onNext} />
    </div>
  );
};
