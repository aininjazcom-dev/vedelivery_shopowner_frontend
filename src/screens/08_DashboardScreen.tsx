import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Utensils, TrendingUp, Star, Users, FileText, ChevronRight } from 'lucide-react';
import type { Order } from '../data/initialDummyData';
import { BottomNav } from '../components/BottomNav';

interface ScreenProps {
  onNext: (nextId: number) => void;
  setSelectedOrderId: (id: string) => void;
}

export const DashboardScreen: FC<ScreenProps> = ({ onNext, setSelectedOrderId }) => {
  const { state, updateState } = useApp();
  const store = state.storeInfo;

  const handleToggleStore = async () => {
    await updateState({
      storeInfo: {
        ...store,
        isOpen: !store.isOpen
      }
    });
  };

  // Find recent orders (New or Preparing)
  const recentOrders = state.orders.filter(o => o.status === 'new' || o.status === 'preparing').slice(0, 2);

  const handleOrderClick = (order: Order) => {
    setSelectedOrderId(order.id);
    if (order.status === 'new') onNext(10);
    else if (order.status === 'preparing') onNext(11);
    else if (order.status === 'ready') onNext(12);
    else onNext(13);
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between mt-1">
          <div>
            <h1 className="text-lg font-bold text-slate-800 font-sans">Hello, {store.name} 👋</h1>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Manage your shop dashboard</p>
          </div>
          
          {/* Open/Close toggle badge */}
          <button
            onClick={handleToggleStore}
            className={`py-1.5 px-3 rounded-full text-2xs font-extrabold tracking-wider uppercase transition flex items-center gap-1.5 border shadow-2xs ${
              store.isOpen
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                : 'bg-rose-50 text-rose-600 border-rose-100'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${store.isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            {store.isOpen ? 'Open' : 'Closed'}
          </button>
        </div>

        {/* Today's Overview */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xs font-bold text-slate-400 uppercase tracking-widest pl-1">Today's Overview</h2>
          <div className="grid grid-cols-3 gap-2.5">
            {/* Orders Card */}
            <button
              onClick={() => onNext(9)}
              className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col justify-between text-left shadow-2xs hover:scale-105 active:scale-95 transition"
            >
              <div className="w-7 h-7 bg-orange-50 text-brand-orange rounded-lg flex items-center justify-center border border-orange-100">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <div className="mt-4">
                <div className="text-lg font-bold text-slate-800 leading-tight">25</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Orders</div>
              </div>
            </button>

            {/* Sales Card */}
            <button
              onClick={() => onNext(17)}
              className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col justify-between text-left shadow-2xs hover:scale-105 active:scale-95 transition"
            >
              <div className="w-7 h-7 bg-emerald-50 text-brand-green rounded-lg flex items-center justify-center border border-emerald-100">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="mt-4">
                <div className="text-lg font-bold text-slate-800 leading-tight">₹8,450</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Sales</div>
              </div>
            </button>

            {/* Rating Card */}
            <button
              onClick={() => onNext(19)}
              className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col justify-between text-left shadow-2xs hover:scale-105 active:scale-95 transition"
            >
              <div className="w-7 h-7 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center border border-amber-100">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
              </div>
              <div className="mt-4">
                <div className="text-lg font-bold text-slate-800 leading-tight">4.8</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Rating</div>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Orders */}
          <button
            onClick={() => onNext(9)}
            className="bg-white hover:bg-slate-100 border border-slate-100 rounded-xl py-3.5 px-2 flex flex-col items-center justify-center gap-2 shadow-2xs transition"
          >
            <div className="w-8 h-8 bg-orange-50 text-brand-orange rounded-full flex items-center justify-center border border-orange-100">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">Orders</span>
          </button>

          {/* Menu */}
          <button
            onClick={() => onNext(14)}
            className="bg-white hover:bg-slate-100 border border-slate-100 rounded-xl py-3.5 px-2 flex flex-col items-center justify-center gap-2 shadow-2xs transition"
          >
            <div className="w-8 h-8 bg-emerald-50 text-brand-green rounded-full flex items-center justify-center border border-emerald-100">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">Menu</span>
          </button>

          {/* Earnings */}
          <button
            onClick={() => onNext(17)}
            className="bg-white hover:bg-slate-100 border border-slate-100 rounded-xl py-3.5 px-2 flex flex-col items-center justify-center gap-2 shadow-2xs transition"
          >
            <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center border border-blue-100">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">Earnings</span>
          </button>

          {/* Reviews */}
          <button
            onClick={() => onNext(19)}
            className="bg-white hover:bg-slate-100 border border-slate-100 rounded-xl py-3.5 px-2 flex flex-col items-center justify-center gap-2 shadow-2xs transition"
          >
            <div className="w-8 h-8 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center border border-amber-100">
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">Reviews</span>
          </button>

          {/* Customers */}
          <button
            onClick={() => onNext(20)}
            className="bg-white hover:bg-slate-100 border border-slate-100 rounded-xl py-3.5 px-2 flex flex-col items-center justify-center gap-2 shadow-2xs transition"
          >
            <div className="w-8 h-8 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center border border-purple-100">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">Customers</span>
          </button>

          {/* Reports */}
          <button
            onClick={() => onNext(21)}
            className="bg-white hover:bg-slate-100 border border-slate-100 rounded-xl py-3.5 px-2 flex flex-col items-center justify-center gap-2 shadow-2xs transition"
          >
            <div className="w-8 h-8 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center border border-rose-100">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">Reports</span>
          </button>
        </div>

        {/* Recent Orders List */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-2xs font-bold text-slate-400 uppercase tracking-widest">Recent Orders</h2>
            <button onClick={() => onNext(9)} className="text-2xs font-bold text-brand-orange flex items-center gap-0.5 hover:underline">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => handleOrderClick(order)}
                className="bg-white border border-slate-100 rounded-xl p-3.5 flex items-center justify-between shadow-2xs cursor-pointer hover:border-orange-100 active:scale-[0.99] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-50 text-slate-700 rounded-lg border border-slate-100 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold font-mono">📦</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{order.id}</div>
                    <div className="text-[9px] font-semibold text-slate-400 mt-0.5">
                      {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ').substring(0, 24)}...
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs font-extrabold text-slate-800">₹{order.totalAmount}</div>
                  <span className={`inline-block py-0.5 px-2 rounded-full text-[8px] font-extrabold tracking-wider uppercase mt-1 ${
                    order.status === 'new'
                      ? 'bg-orange-50 text-brand-orange border border-orange-100'
                      : 'bg-blue-50 text-blue-500 border border-blue-100'
                  }`}>
                    {order.status === 'new' ? 'New' : 'Preparing'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <BottomNav activeTab="home" onTabSelect={onNext} />
    </div>
  );
};
