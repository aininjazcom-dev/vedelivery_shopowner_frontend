import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Trash2, Edit } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
  selectedItemId: string;
}

export const MenuItemDetailScreen: FC<ScreenProps> = ({ onNext, selectedItemId }) => {
  const { state, updateState } = useApp();
  const item = state.menu.find(m => m.id === selectedItemId);

  if (!item) return <div className="p-4">Item not found</div>;

  const handleToggleAvailable = async () => {
    await updateState(prev => ({
      ...prev,
      menu: prev.menu.map(m => m.id === item.id ? { ...m, isAvailable: !m.isAvailable } : m)
    }));
  };

  const handleDelete = async () => {
    await updateState(prev => ({
      ...prev,
      menu: prev.menu.filter(m => m.id !== item.id)
    }));
    onNext(14); // Back to menu list
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center gap-3 select-none shrink-0">
        <button
          onClick={() => onNext(14)}
          className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-sm font-bold text-slate-800 font-sans">Menu Item Detail</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        {/* Large Image Container */}
        <div className="h-56 bg-orange-50 border-b border-slate-100 flex flex-col items-center justify-center text-4xl font-bold relative">
          <span>{item.category === 'Biryani' ? '🍲' : item.category === 'Desserts' ? '🧁' : '🍕'}</span>
          {item.isBestseller && (
            <span className="absolute top-4 right-4 bg-brand-orange text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Content Info */}
        <div className="p-4 flex flex-col gap-4">
          {/* Name & Toggle */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800 leading-tight">{item.name}</h2>
              <div className="text-xs font-extrabold text-brand-orange mt-1.5">₹{item.price}</div>
            </div>
            
            {/* Toggle */}
            <div className="flex flex-col items-end gap-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Available</span>
              <button
                onClick={handleToggleAvailable}
                className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 ${item.isAvailable ? 'bg-brand-green' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${item.isAvailable ? 'translate-x-4' : ''}`}></div>
              </button>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/50">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Category</span>
              <span className="text-xs font-bold text-slate-700 mt-1 block">{item.category}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/50">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Type</span>
              <span className="text-xs font-bold text-slate-700 mt-1 block">Veg / Non-Veg</span>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-0.5">Description</span>
            <p className="text-xs font-semibold text-slate-600 leading-relaxed bg-slate-50/50 rounded-xl p-3 border border-slate-100">
              {item.description || "No description provided."}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-4 border-t border-slate-100 flex gap-3 select-none shrink-0">
        <button
          onClick={handleDelete}
          className="w-1/3 py-3 border border-rose-200 hover:bg-rose-50 text-rose-500 active:scale-95 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
        <button
          onClick={() => onNext(14)} // Skip actual editing for testing, return back
          className="flex-1 py-3 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10 flex items-center justify-center gap-1.5"
        >
          <Edit className="w-4 h-4" />
          Edit Item
        </button>
      </div>
    </div>
  );
};
