import { useState, type FC } from 'react';
import { useApp } from '../context/AppContext';
import { Shield } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
  phoneData: { phone: string; name: string };
}

export const OTPVerificationScreen: FC<ScreenProps> = ({ onNext, phoneData }) => {
  const { verifyOtp } = useApp();
  const [digits, setDigits] = useState<string[]>(['1', '2', '3', '4', '5', '6']);

  const handleKeyPress = async (val: string) => {
    if (val === 'backspace') {
      const idx = digits.findIndex(d => d === '');
      const newDigits = [...digits];
      if (idx === -1) {
        newDigits[5] = '';
      } else if (idx > 0) {
        newDigits[idx - 1] = '';
      }
      setDigits(newDigits);
    } else {
      const idx = digits.findIndex(d => d === '');
      if (idx !== -1) {
        const newDigits = [...digits];
        newDigits[idx] = val;
        setDigits(newDigits);
        
        // If it's the last digit, auto-submit
        if (idx === 5) {
          const code = newDigits.join('');
          const success = await verifyOtp(phoneData.phone, code);
          if (success) {
            onNext(5); // Go to Store Setup
          }
        }
      }
    }
  };

  return (
    <div className="flex-1 bg-white p-6 flex flex-col justify-between h-full">
      {/* Top Details */}
      <div className="flex flex-col gap-4 mt-2">
        <button
          onClick={() => onNext(2)}
          className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 self-start"
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Verify Your Number</h1>
          <p className="text-xs text-slate-500 mt-2">
            Enter the 6-digit code sent to <span className="font-semibold text-slate-700">{phoneData.phone}</span>
          </p>
        </div>
      </div>

      {/* Code Inputs */}
      <div className="flex justify-between gap-1.5 my-8">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            className={`w-11 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-bold transition-all duration-200 ${
              digits[idx] !== '' ? 'border-brand-orange text-brand-orange bg-orange-50/20' : 'border-slate-200 text-slate-800'
            }`}
          >
            {digits[idx]}
          </div>
        ))}
      </div>

      {/* Timer */}
      <div className="text-center mb-6">
        <span className="text-xs text-slate-400">Resend OTP in </span>
        <span className="text-xs font-bold text-brand-orange">00:25</span>
      </div>

      {/* Numerical Custom Keyboard */}
      <div className="bg-slate-50 -mx-6 -mb-6 p-4 rounded-t-3xl border-t border-slate-100 grid grid-cols-3 gap-y-3 gap-x-6">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(val => (
          <button
            key={val}
            onClick={() => handleKeyPress(val)}
            className="py-3 bg-white hover:bg-slate-100 active:scale-95 transition border border-slate-200/50 rounded-xl text-slate-800 font-bold text-base shadow-2xs"
          >
            {val}
          </button>
        ))}
        <div className="flex items-center justify-center text-slate-400">
          <Shield className="w-4 h-4 opacity-40" />
        </div>
        <button
          onClick={() => handleKeyPress('0')}
          className="py-3 bg-white hover:bg-slate-100 active:scale-95 transition border border-slate-200/50 rounded-xl text-slate-800 font-bold text-base shadow-2xs"
        >
          0
        </button>
        <button
          onClick={() => handleKeyPress('backspace')}
          className="py-3 bg-slate-100 hover:bg-slate-200 active:scale-95 transition border border-slate-200/50 rounded-xl text-slate-700 flex items-center justify-center font-bold shadow-2xs"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.41-6.41A2 2 0 0110.83 5H20a2 2 0 012 2v10a2 2 0 01-2 2h-9.17a2 2 0 01-1.42-.59L3 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
