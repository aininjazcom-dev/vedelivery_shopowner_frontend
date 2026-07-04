import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const CategoriesScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state } = useApp();

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNext(14)} // Back to Menu
            className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-sm font-bold text-slate-800 font-sans">Categories</h1>
        </div>

        <button
          onClick={() => onNext(30)} // Add Category
          className="text-2xs font-extrabold text-brand-orange uppercase tracking-wider hover:underline"
        >
          + Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3">
        {state.categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:border-orange-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-slate-100 text-lg rounded-xl flex items-center justify-center shrink-0">
                {cat.iconName || '📁'}
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 leading-tight">{cat.name}</h3>
                <span className="text-[10px] font-semibold text-slate-400 mt-1 block">{cat.itemCount} Items</span>
              </div>
            </div>

            {/* Display Order or Action Dot */}
            <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-100 rounded-lg py-1 px-2.5">
              Order: {cat.displayOrder}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
