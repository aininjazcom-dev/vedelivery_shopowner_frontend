import { useState, type FC, type FormEvent } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const StoreInformationScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state, updateState } = useApp();
  const [name, setName] = useState(state.storeInfo.name);
  const [type, setType] = useState(state.storeInfo.type);
  const [cuisine, setCuisine] = useState(state.storeInfo.cuisine);
  const [address, setAddress] = useState(state.storeInfo.address);
  const [phone, setPhone] = useState(state.storeInfo.contactNumber);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    await updateState({
      storeInfo: {
        ...state.storeInfo,
        name,
        type,
        cuisine,
        address,
        contactNumber: phone
      }
    });
    onNext(22); // Back to settings
  };

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
        <h1 className="text-sm font-bold text-slate-800 font-sans">Store Information</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3 justify-center">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Store Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Store Type */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Store Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange appearance-none animate-none"
          >
            <option>Restaurant</option>
            <option>Bakery</option>
            <option>Grocery</option>
            <option>Supermarket</option>
          </select>
        </div>

        {/* Cuisine */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Cuisine / Category</label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange appearance-none animate-none"
          >
            <option>Indian</option>
            <option>Chinese</option>
            <option>Italian</option>
            <option>Continental</option>
            <option>Multicuisine</option>
          </select>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange resize-none"
          />
        </div>

        {/* Contact Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Contact Number</label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10 mt-2 shrink-0"
        >
          Save Information
        </button>
      </form>
    </div>
  );
};
