import { useState, type FC, type FormEvent } from 'react';
import { useApp } from '../context/AppContext';
import { Upload } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const StoreSetupScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state, updateState } = useApp();
  const [storeName, setStoreName] = useState(state.storeInfo.name);
  const [storeType, setStoreType] = useState(state.storeInfo.type);
  const [cuisine, setCuisine] = useState(state.storeInfo.cuisine);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    await updateState({
      storeInfo: {
        ...state.storeInfo,
        name: storeName,
        type: storeType,
        cuisine: cuisine,
      }
    });
    onNext(6); // Timings
  };

  return (
    <div className="flex-1 bg-white p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar h-full">
      {/* Top Header */}
      <div className="flex flex-col gap-4 mt-2">
        <button
          onClick={() => onNext(4)}
          className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 self-start"
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Let's set up your store</h1>
          <p className="text-xs text-slate-500 mt-1">Tell us a few details about your business</p>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="flex-1 flex flex-col gap-4 justify-center my-6">
        {/* Store Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Store Name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Enter store name"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange focus:bg-white transition"
          />
        </div>

        {/* Store Type Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Store Type</label>
          <select
            value={storeType}
            onChange={(e) => setStoreType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange focus:bg-white transition appearance-none"
          >
            <option>Restaurant</option>
            <option>Bakery</option>
            <option>Grocery</option>
            <option>Supermarket</option>
          </select>
        </div>

        {/* Cuisine / Category Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Cuisine / Category</label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange focus:bg-white transition appearance-none"
          >
            <option>Indian</option>
            <option>Chinese</option>
            <option>Italian</option>
            <option>Continental</option>
            <option>Multicuisine</option>
          </select>
        </div>

        {/* Upload Logo Block */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Upload Logo</label>
          <div className="border-2 border-dashed border-slate-200 hover:border-brand-orange transition rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50 cursor-pointer">
            <Upload className="w-6 h-6 text-slate-400" />
            <span className="text-2xs font-bold text-slate-500 uppercase tracking-wide">Upload Logo</span>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-[0.99] transition rounded-xl text-white font-bold text-xs tracking-wide shadow-md shadow-orange-500/10 mt-2"
        >
          Continue
        </button>
      </form>
    </div>
  );
};
