import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const BankDetailsScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state } = useApp();
  const bank = state.bankDetails;

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
        <h1 className="text-sm font-bold text-slate-800 font-sans">Bank Details</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-4 shadow-2xs">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Account Holder Name</span>
            <span className="text-xs font-extrabold text-slate-700 mt-1 block">{bank.accountHolderName}</span>
          </div>

          <hr className="border-slate-200/50" />

          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Bank Name</span>
            <span className="text-xs font-extrabold text-slate-700 mt-1 block">{bank.bankName}</span>
          </div>

          <hr className="border-slate-200/50" />

          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Account Number</span>
            <span className="text-xs font-extrabold text-slate-700 mt-1 block">{bank.accountNumber}</span>
          </div>

          <hr className="border-slate-200/50" />

          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">IFSC Code</span>
            <span className="text-xs font-extrabold text-slate-700 mt-1 block">{bank.ifscCode}</span>
          </div>

          <hr className="border-slate-200/50" />

          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">UPI ID</span>
            <span className="text-xs font-extrabold text-slate-700 mt-1 block">{bank.upiId}</span>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => onNext(33)} // Bank edit Screen
          className="w-full py-3 border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-xs rounded-xl transition"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};
