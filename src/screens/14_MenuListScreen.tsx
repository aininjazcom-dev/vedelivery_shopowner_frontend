import { useState, type FC } from 'react';
import { useApp } from '../context/AppContext';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import type { MenuItem } from '../data/initialDummyData';
import { BottomNav } from '../components/BottomNav';

interface ScreenProps {
  onNext: (nextId: number) => void;
  setSelectedItemId: (id: string) => void;
}

export const MenuListScreen: FC<ScreenProps> = ({ onNext, setSelectedItemId }) => {
  const { state, updateState } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Bestseller' | 'Main Course' | 'Starters'>('All');

  const handleToggleItem = async (itemId: string, currentVal: boolean) => {
    await updateState(prev => ({
      ...prev,
      menu: prev.menu.map(item => item.id === itemId ? { ...item, isAvailable: !currentVal } : item)
    }));
  };

  const getFilteredItems = () => {
    return state.menu.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeCategory === 'All') return matchesSearch;
      if (activeCategory === 'Bestseller') return matchesSearch && item.isBestseller;
      return matchesSearch && item.category === activeCategory;
    });
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItemId(item.id);
    onNext(16); // Menu Item Detail
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
      {/* Top Header & Search */}
      <div className="bg-white border-b border-slate-100 p-4 select-none shrink-0 flex flex-col gap-3.5">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-slate-800 font-sans">Menu</h1>
          <button
            onClick={() => onNext(29)} // Jump to Categories List Screen
            className="text-xs font-bold text-brand-orange hover:underline uppercase tracking-wide"
          >
            Categories
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="flex items-center gap-2.5">
          <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search menu items..."
              className="bg-transparent border-none outline-none flex-1 text-slate-700 text-xs font-medium"
            />
          </div>
          <button className="w-9 h-9 border border-slate-200 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 transition shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Category filter tabs */}
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pt-1">
          {(['All', 'Bestseller', 'Main Course', 'Starters'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`py-1.5 px-3 rounded-full text-2xs font-extrabold tracking-wider transition ${
                activeCategory === tab
                  ? 'bg-brand-orange text-white'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tab === 'All' ? 'All Items' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3">
        {getFilteredItems().map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-100 rounded-2xl p-3 flex gap-3.5 shadow-2xs items-center relative hover:border-orange-100 transition"
          >
            {/* Clickable Area for details */}
            <div onClick={() => handleItemClick(item)} className="flex-1 flex gap-3 cursor-pointer">
              {/* Mock food Image */}
              <div className="w-16 h-16 bg-orange-50 rounded-xl border border-slate-100 flex items-center justify-center font-bold text-lg shrink-0 overflow-hidden relative">
                <span className="relative z-10">
                  {item.category === 'Biryani' ? '🍲' : item.category === 'Desserts' ? '🧁' : '🍕'}
                </span>
                {item.isBestseller && (
                  <div className="absolute top-0 left-0 bg-brand-orange text-white text-[7px] font-black tracking-widest px-1 py-0.5 uppercase rounded-br-md">
                    Best
                  </div>
                )}
              </div>

              {/* Name & price */}
              <div className="flex-1 flex flex-col justify-center gap-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-800 leading-tight">{item.name}</h3>
                </div>
                <div className="text-xs font-extrabold text-slate-800 mt-1">₹{item.price}</div>
              </div>
            </div>

            {/* Toggle switch */}
            <div className="flex items-center shrink-0 pr-1 select-none">
              <button
                onClick={() => handleToggleItem(item.id, item.isAvailable)}
                className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 ${item.isAvailable ? 'bg-brand-green' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${item.isAvailable ? 'translate-x-4' : ''}`}></div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Add Button */}
      <div className="p-4 bg-white border-t border-slate-100 flex flex-col shrink-0 select-none">
        <button
          onClick={() => onNext(15)} // Add Menu Item
          className="w-full py-3 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add Menu Item
        </button>
      </div>

      {/* Navigation */}
      <BottomNav activeTab="menu" onTabSelect={onNext} />
    </div>
  );
};
