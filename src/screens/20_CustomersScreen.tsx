import { useState, type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Search } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const CustomersScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state } = useApp();
  const [search, setSearch] = useState('');

  const getFilteredCustomers = () => {
    return state.customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center gap-3 select-none shrink-0">
        <button
          onClick={() => onNext(8)} // Back to Dashboard
          className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-sm font-bold text-slate-800 font-sans">Customers</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
        {/* Search */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 shrink-0 select-none">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="bg-transparent border-none outline-none flex-1 text-slate-700 text-xs font-medium"
          />
        </div>

        {/* List */}
        <div className="flex-1 flex flex-col gap-3">
          {getFilteredCustomers().map((c) => (
            <div
              key={c.id}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-2xs hover:border-orange-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white border border-slate-200 text-xs rounded-full flex items-center justify-center shrink-0 font-bold">👤</div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 leading-tight">{c.name}</h3>
                  <span className="text-[9px] font-semibold text-slate-400 mt-1 block">
                    {c.totalOrders} Orders • Spent ₹{c.totalSpend}
                  </span>
                </div>
              </div>
              
              <ChevronLeft className="w-4 h-4 text-slate-400 rotate-180" />
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => onNext(8)}
          className="w-full py-3.5 border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-xs rounded-xl transition"
        >
          View All Customers
        </button>
      </div>
    </div>
  );
};
