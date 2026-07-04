import { type FC } from 'react';
import { Home, ShoppingBag, Utensils, TrendingUp, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabSelect: (screenId: number) => void;
}

export const BottomNav: FC<BottomNavProps> = ({ activeTab, onTabSelect }) => {
  return (
    <div className="h-16 bg-white border-t border-slate-100 flex items-center justify-around px-4 select-none shrink-0 relative z-30 w-full md:hidden">
      <button
        onClick={() => onTabSelect(8)}
        className={`flex flex-col items-center gap-1 transition ${activeTab === 'home' ? 'text-brand-orange' : 'text-slate-400'}`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold">Home</span>
      </button>

      <button
        onClick={() => onTabSelect(9)}
        className={`flex flex-col items-center gap-1 transition relative ${activeTab === 'orders' ? 'text-brand-orange' : 'text-slate-400'}`}
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="text-[10px] font-bold">Orders</span>
      </button>

      <button
        onClick={() => onTabSelect(14)}
        className={`flex flex-col items-center gap-1 transition ${activeTab === 'menu' ? 'text-brand-orange' : 'text-slate-400'}`}
      >
        <Utensils className="w-5 h-5" />
        <span className="text-[10px] font-bold">Menu</span>
      </button>

      <button
        onClick={() => onTabSelect(17)}
        className={`flex flex-col items-center gap-1 transition ${activeTab === 'earnings' ? 'text-brand-orange' : 'text-slate-400'}`}
      >
        <TrendingUp className="w-5 h-5" />
        <span className="text-[10px] font-bold">Earnings</span>
      </button>

      <button
        onClick={() => onTabSelect(22)}
        className={`flex flex-col items-center gap-1 transition ${activeTab === 'more' ? 'text-brand-orange' : 'text-slate-400'}`}
      >
        <Settings className="w-5 h-5" />
        <span className="text-[10px] font-bold">More</span>
      </button>
    </div>
  );
};
