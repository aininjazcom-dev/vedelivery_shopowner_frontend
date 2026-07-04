import { useState, type FC } from 'react';
import { useApp } from '../context/AppContext';
import type { Order } from '../data/initialDummyData';
import { BottomNav } from '../components/BottomNav';

interface ScreenProps {
  onNext: (nextId: number) => void;
  setSelectedOrderId: (id: string) => void;
}

export const OrdersListScreen: FC<ScreenProps> = ({ onNext, setSelectedOrderId }) => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'new' | 'preparing' | 'ready' | 'completed'>('new');

  const getFilteredOrders = () => {
    return state.orders.filter(o => o.status === activeTab);
  };

  const getTabCount = (status: 'new' | 'preparing' | 'ready' | 'completed') => {
    return state.orders.filter(o => o.status === status).length;
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrderId(order.id);
    if (order.status === 'new') onNext(10);
    else if (order.status === 'preparing') onNext(11);
    else if (order.status === 'ready') onNext(12);
    else onNext(13);
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
      {/* Top Header & Tabs */}
      <div className="bg-white border-b border-slate-100 select-none shrink-0 pt-3">
        <h1 className="text-lg font-bold text-slate-800 px-4 mb-2 font-sans">Orders</h1>
        
        {/* Horizontal scrollable tabs */}
        <div className="flex border-t border-slate-100 px-2 overflow-x-auto custom-scrollbar">
          {(['new', 'preparing', 'ready', 'completed'] as const).map((tab) => {
            const count = getTabCount(tab);
            const label = tab === 'new' ? 'Now' : tab.charAt(0).toUpperCase() + tab.slice(1);
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2.5 px-4 font-bold text-xs tracking-wide shrink-0 transition border-b-2 relative ${
                  isActive
                    ? 'border-brand-orange text-brand-orange font-extrabold'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3">
        {getFilteredOrders().map((order) => (
          <div
            key={order.id}
            onClick={() => handleOrderClick(order)}
            className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs flex flex-col gap-3.5 cursor-pointer hover:border-orange-100 transition active:scale-[0.99]"
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-50 pb-2.5">
              <div>
                <span className="text-xs font-bold text-slate-800">{order.id}</span>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  {order.items.length} items • {order.distance}
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-xs font-extrabold text-slate-800">₹{order.totalAmount}</span>
                <div className="text-[9px] font-semibold text-slate-400 mt-0.5">{order.time}</div>
              </div>
            </div>

            {/* Items list */}
            <div className="flex flex-col gap-1.5 pl-1.5 border-l-2 border-slate-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[10px] font-medium text-slate-600">
                  <span>{item.quantity} x {item.name}</span>
                  <span className="text-slate-400">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Customer & Action footer */}
            <div className="flex justify-between items-center mt-1 pt-1 border-t border-slate-50">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-slate-50 text-[10px] rounded-full flex items-center justify-center shrink-0 border border-slate-100">👤</div>
                <span className="text-xs font-semibold text-slate-700">{order.customerName}</span>
              </div>
              
              <span className={`py-0.5 px-2 rounded-full text-[8px] font-extrabold tracking-wider uppercase ${
                order.status === 'new'
                  ? 'bg-orange-50 text-brand-orange border border-orange-100'
                  : order.status === 'preparing'
                  ? 'bg-blue-50 text-blue-500 border border-blue-100'
                  : order.status === 'ready'
                  ? 'bg-emerald-50 text-brand-green border border-emerald-100'
                  : 'bg-slate-50 text-slate-500 border border-slate-100'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}

        {getFilteredOrders().length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
            <span className="text-3xl">📭</span>
            <h3 className="text-xs font-bold text-slate-700 mt-3 uppercase tracking-wider">No {activeTab} orders</h3>
            <p className="text-[10px] text-slate-400 mt-1">Orders in this state will appear here.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <BottomNav activeTab="orders" onTabSelect={onNext} />
    </div>
  );
};
