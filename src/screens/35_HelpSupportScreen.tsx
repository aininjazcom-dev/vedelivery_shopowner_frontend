import { type FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const HelpSupportScreen: FC<ScreenProps> = ({ onNext }) => {
  const supportOptions = [
    { label: "FAQs" },
    { label: "Contact Support" },
    { label: "WhatsApp Support" },
    { label: "Email Support" },
    { label: "Call Support" },
    { label: "Terms & Conditions" },
    { label: "Privacy Policy" },
  ];

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
        <h1 className="text-sm font-bold text-slate-800 font-sans">Help & Support</h1>
      </div>

      {/* Options List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3.5 select-none">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
          {supportOptions.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onNext(22)}
              className="w-full flex items-center justify-between p-3.5 border-b border-slate-200/50 last:border-0 hover:bg-slate-100/50 transition text-left text-xs font-bold text-slate-700"
            >
              <span>{opt.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
