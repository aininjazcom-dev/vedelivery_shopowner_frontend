import { useState, type FC, type FormEvent } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Upload } from 'lucide-react';
import type { MenuItem } from '../data/initialDummyData';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const AddMenuItemScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state, updateState } = useApp();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(state.categories[0]?.name || 'Biryani');
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState(true);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name,
      price: parseFloat(price),
      category,
      isBestseller: false,
      isAvailable: available,
      description
    };

    await updateState(prev => {
      // Add menu item
      const updatedMenu = [...prev.menu, newItem];
      
      // Update category count
      const updatedCategories = prev.categories.map(cat => 
        cat.name === category ? { ...cat, itemCount: cat.itemCount + 1 } : cat
      );

      return {
        ...prev,
        menu: updatedMenu,
        categories: updatedCategories
      };
    });

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
        <h1 className="text-sm font-bold text-slate-800 font-sans">Add Menu Item</h1>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
        {/* Upload Image Box */}
        <div className="flex flex-col gap-1.5">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Item Image</label>
          <div className="border-2 border-dashed border-slate-200 hover:border-brand-orange transition rounded-2xl p-6 flex flex-col items-center justify-center gap-1.5 bg-slate-50 cursor-pointer">
            <Upload className="w-5 h-5 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upload Image</span>
          </div>
        </div>

        {/* Item Name */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Item Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange appearance-none animate-none"
          >
            {state.categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
            <option value="Main Course">Main Course</option>
            <option value="Starters">Starters</option>
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Price (₹)</label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange resize-none"
          />
        </div>

        {/* Available toggle */}
        <div className="flex items-center justify-between p-1 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Available</span>
          <button
            type="button"
            onClick={() => setAvailable(!available)}
            className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 ${available ? 'bg-brand-green' : 'bg-slate-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${available ? 'translate-x-4' : ''}`}></div>
          </button>
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10 mt-2 shrink-0"
        >
          Save Item
        </button>
      </form>
    </div>
  );
};
