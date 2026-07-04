import { type FC } from 'react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const SplashScreen: FC<ScreenProps> = ({ onNext }) => {
  return (
    <div className="flex-1 bg-white flex flex-col justify-between p-6 h-full">
      {/* Top Graphic */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Brand Logo Container */}
        <div className="w-24 h-24 bg-brand-orange rounded-3xl flex items-center justify-center shadow-lg shadow-orange-500/20 mb-8 animate-bounce">
          <svg className="w-14 h-14 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        
        {/* Logo Text */}
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">VE Delivery</span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1 font-sans">SHOP OWNER APP</h2>
        </div>
      </div>

      {/* Middle Text Info */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">
          Manage your food business easily
        </h1>
        <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
          Receive orders, manage menu, track earnings and grow your business.
        </p>
      </div>

      {/* Bottom Button */}
      <div className="mb-2">
        <button
          onClick={() => onNext(2)}
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-[0.99] transition rounded-xl text-white font-bold text-sm tracking-wide shadow-md shadow-orange-500/10"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
