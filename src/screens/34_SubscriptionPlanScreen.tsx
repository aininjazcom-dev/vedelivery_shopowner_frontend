import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Check } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const SubscriptionPlanScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state } = useApp();
  const sub = state.subscription;

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center gap-3 select-none shrink-0">
        <button
          onClick={() => onNext(22)}
          className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-sm font-bold text-slate-800 font-sans">Subscription Plan</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-5 justify-center select-none">
        {/* Active plan status */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-lg shadow-2xs">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-slate-800">{sub.planName}</h3>
                <span className="inline-block py-0.5 px-2 bg-emerald-50 text-brand-green border border-emerald-100/50 text-[7px] font-black tracking-wider uppercase rounded-full">
                  Active
                </span>
              </div>
              <span className="text-[9px] font-semibold text-slate-400 block mt-1">Valid till {sub.validTill}</span>
            </div>
          </div>
        </div>

        {/* Benefits list */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xs font-bold text-slate-400 uppercase tracking-widest pl-1">Plan Benefits</h2>
          <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 flex flex-col gap-3.5 shadow-2xs">
            {sub.benefits.map((b, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <Check className="w-4 h-4 text-brand-green shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* View Plans Button */}
        <button
          onClick={() => onNext(22)}
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10 mt-2 shrink-0"
        >
          View Plans
        </button>
      </div>
    </div>
  );
};
