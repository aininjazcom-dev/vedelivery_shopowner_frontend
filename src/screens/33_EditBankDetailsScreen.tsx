import { useState, type FC, type FormEvent } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const EditBankDetailsScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state, updateState } = useApp();
  const [holder, setHolder] = useState(state.bankDetails.accountHolderName);
  const [bank, setBank] = useState(state.bankDetails.bankName);
  const [account, setAccount] = useState(state.bankDetails.accountNumber);
  const [ifsc, setIfsc] = useState(state.bankDetails.ifscCode);
  const [upi, setUpi] = useState(state.bankDetails.upiId);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    await updateState({
      bankDetails: {
        accountHolderName: holder,
        bankName: bank,
        accountNumber: account,
        ifscCode: ifsc,
        upiId: upi
      }
    });
    onNext(23); // Back to bank view details screen
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center gap-3 select-none shrink-0">
        <button
          onClick={() => onNext(23)}
          className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-sm font-bold text-slate-800 font-sans">Edit Bank Details</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3 justify-center">
        {/* Holder */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Account Holder Name</label>
          <input
            type="text"
            required
            value={holder}
            onChange={(e) => setHolder(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Bank Name */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Bank Name</label>
          <input
            type="text"
            required
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Account Number */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Account Number</label>
          <input
            type="text"
            required
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* IFSC */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">IFSC Code</label>
          <input
            type="text"
            required
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* UPI ID */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">UPI ID</label>
          <input
            type="text"
            required
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10 mt-2 shrink-0"
        >
          Save Bank Details
        </button>
      </form>
    </div>
  );
};
