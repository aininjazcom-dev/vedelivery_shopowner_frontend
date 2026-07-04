import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
  selectedOrderId: string;
}

export const OrderCompletedScreen: FC<ScreenProps> = ({ onNext, selectedOrderId }) => {
  const { state } = useApp();
  const order = state.orders.find(o => o.id === selectedOrderId);

  if (!order) return <div className="p-4">Order not found</div>;

  return (
    <div className="flex-1 bg-white p-6 flex flex-col justify-between h-full">
      {/* Top Back Icon */}
      <div className="flex justify-start">
        <button
          onClick={() => onNext(9)}
          className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100"
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Success Graphic */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-emerald-50 text-brand-green border-4 border-emerald-100 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/10 mb-6 animate-fade-in">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>
        
        <h1 className="text-xl font-black text-slate-900 text-center tracking-tight leading-tight">Order Completed!</h1>
        <p className="text-xs font-bold text-slate-400 text-center uppercase tracking-wider mt-1.5">
          {order.id}
        </p>
        <p className="text-xs text-slate-500 text-center mt-1 leading-relaxed">
          Delivered at {order.deliveredAt || '10:45 AM'}
        </p>

        {/* Paid Card */}
        <div className="mt-8 bg-slate-50 border border-slate-200/50 rounded-2xl py-4 px-8 text-center min-w-56 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Paid Online</span>
          <span className="text-xl font-extrabold text-slate-800 mt-1 block">₹{order.totalAmount}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onNext(9)}
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10"
        >
          Back to Orders
        </button>
        <button
          onClick={() => onNext(10)} // Back to details (it will render view detailed style if completed)
          className="w-full py-3.5 border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-xs rounded-xl transition"
        >
          View Order Details
        </button>
      </div>
    </div>
  );
};
