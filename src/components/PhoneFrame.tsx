import { useState, useEffect, type ReactNode } from 'react';


interface PhoneFrameProps {
  children: ReactNode;
}

export const PhoneFrame = ({ children }: PhoneFrameProps) => {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="relative mx-auto" style={{ width: '380px', height: '812px' }}>
      {/* Outer Phone Border */}
      <div className="absolute inset-0 bg-slate-900 rounded-[50px] border-[10px] border-slate-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col ring-1 ring-slate-700/50">
        
        {/* Status Bar Container */}
        <div className="h-10 bg-white relative z-50 flex items-center justify-between px-6 select-none shrink-0 border-b border-gray-100">
          {/* Time (Left) */}
          <span className="text-xs font-semibold text-gray-900 tracking-tight">{time}</span>
          
          {/* Notch (Center) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl flex items-center justify-center">
            {/* Camera & Speaker */}
            <div className="w-16 h-1 bg-slate-800 rounded-full mb-1"></div>
          </div>
          
          {/* Icons (Right) */}
          <div className="flex items-center gap-1.5 text-gray-900">
            {/* Signal */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 22h20V2z" opacity="0.3"/>
              <path d="M2 22h16V6z"/>
            </svg>
            {/* Wifi */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21l-12-14.88c.45-.37 5.67-4.12 12-4.12s11.55 3.75 12 4.12l-12 14.88z"/>
            </svg>
            {/* Battery */}
            <div className="w-5 h-2.5 border border-gray-900 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-3.5 bg-gray-900 rounded-2xs"></div>
              <div className="w-0.5 h-1 bg-gray-900 rounded-r-2xs ml-0.5"></div>
            </div>
          </div>
        </div>

        {/* Viewport for Mobile Screen */}
        <div className="flex-1 bg-brand-bg overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col relative">
          <div className="flex-1 flex flex-col phone-screen">
            {children}
          </div>
        </div>

        {/* Home Indicator (Bottom Bar) */}
        <div className="h-5 bg-white relative z-50 flex items-center justify-center select-none shrink-0">
          <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
        </div>

      </div>

      {/* Side Hardware Buttons */}
      <div className="absolute left-[-13px] top-28 w-[3px] h-10 bg-slate-700 rounded-l-md"></div>
      <div className="absolute left-[-13px] top-40 w-[3px] h-14 bg-slate-700 rounded-l-md"></div>
      <div className="absolute left-[-13px] top-58 w-[3px] h-14 bg-slate-700 rounded-l-md"></div>
      <div className="absolute right-[-13px] top-36 w-[3px] h-20 bg-slate-700 rounded-r-md"></div>
    </div>
  );
};
