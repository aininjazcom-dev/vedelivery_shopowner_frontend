import { useState, type FC, type FormEvent } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Upload } from 'lucide-react';
import type { Category } from '../data/initialDummyData';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const AddCategoryScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state, updateState } = useApp();
  const [name, setName] = useState('');
  const [displayOrder, setDisplayOrder] = useState((state.categories.length + 1).toString());

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      itemCount: 0,
      iconName: '🍔',
      displayOrder: parseInt(displayOrder)
    };

    await updateState(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));

    onNext(29); // Back to categories
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center gap-3 select-none shrink-0">
        <button
          onClick={() => onNext(29)}
          className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-sm font-bold text-slate-800 font-sans">Add Category</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4 justify-center">
        {/* Upload Icon Box */}
        <div className="flex flex-col gap-1.5">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Category Icon</label>
          <div className="border-2 border-dashed border-slate-200 hover:border-brand-orange transition rounded-2xl p-6 flex flex-col items-center justify-center gap-1.5 bg-slate-50 cursor-pointer">
            <Upload className="w-5 h-5 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upload Icon</span>
          </div>
        </div>

        {/* Category Name */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Category Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Display Order */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Display Order</label>
          <input
            type="number"
            required
            value={displayOrder}
            onChange={(e) => setDisplayOrder(e.target.value)}
            placeholder="Enter display order"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
          <p className="text-[9px] text-slate-400 leading-normal pl-0.5 mt-0.5 font-medium">Category will be shown in menu in this order.</p>
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10 mt-2 shrink-0"
        >
          Save Category
        </button>
      </form>
    </div>
  );
};
