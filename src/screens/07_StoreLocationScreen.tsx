import { useState, type FC } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const StoreLocationScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state, updateState } = useApp();
  const [address, setAddress] = useState(state.storeLocation.address);

  const handleSave = async () => {
    await updateState({
      storeLocation: {
        ...state.storeLocation,
        address: address,
      }
    });
    onNext(8); // Go to Dashboard
  };

  return (
    <div className="flex-1 bg-white p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar h-full">
      {/* Top Header */}
      <div className="flex flex-col gap-4 mt-2">
        <button
          onClick={() => onNext(6)}
          className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 self-start"
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Store Location</h1>
          <p className="text-xs text-slate-500 mt-1">Select your store location</p>
        </div>
      </div>

      {/* Map Graphic Container */}
      <div className="flex-1 flex flex-col gap-4 my-5 justify-center">
        {/* Mock Map */}
        <div className="relative h-60 bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
          {/* Mock Road Grid drawing via CSS lines */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-10 left-0 right-0 h-2 bg-slate-900"></div>
            <div className="absolute top-28 left-0 right-0 h-4 bg-slate-900"></div>
            <div className="absolute top-48 left-0 right-0 h-2 bg-slate-900"></div>
            <div className="absolute top-0 bottom-0 left-12 w-2 bg-slate-900"></div>
            <div className="absolute top-0 bottom-0 left-36 w-4 bg-slate-900"></div>
            <div className="absolute top-0 bottom-0 left-72 w-2 bg-slate-900"></div>
            
            {/* Green and blue blobs mimicking water/parks */}
            <div className="absolute top-4 left-48 w-16 h-16 bg-emerald-700 rounded-full blur-xs"></div>
            <div className="absolute top-36 left-4 w-20 h-12 bg-blue-700 rounded-full blur-xs"></div>
          </div>
          
          {/* Pins */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Pulsing Aura */}
            <div className="absolute w-8 h-8 bg-orange-500 rounded-full animate-ping opacity-30 mt-1"></div>
            {/* Location marker pin */}
            <div className="w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transform transition-transform hover:scale-105 active:scale-95 cursor-pointer">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="mt-2 py-1 px-2.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg shadow-md border border-slate-700 whitespace-nowrap">
              John's Kitchen
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex gap-3.5 items-start">
          <div className="w-8 h-8 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center border border-orange-100 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex-1 flex flex-col gap-0.5">
            <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">Address</span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-xs font-semibold text-slate-800 bg-transparent border-none outline-none leading-relaxed focus:border-b focus:border-brand-orange w-full"
            />
            <button className="text-2xs font-bold text-brand-orange hover:underline text-left mt-1.5 uppercase tracking-wide">Change Location</button>
          </div>
        </div>
      </div>

      {/* Button */}
      <div>
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-[0.99] transition rounded-xl text-white font-bold text-xs tracking-wide shadow-md shadow-orange-500/10 mb-2"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};
