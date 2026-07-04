import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { OrderDetailsBase } from '../components/OrderDetailsBase';

interface ScreenProps {
  onNext: (nextId: number) => void;
  selectedOrderId: string;
}

export const OrderReadyScreen: FC<ScreenProps> = ({ onNext, selectedOrderId }) => {
  const { state, updateState } = useApp();
  const order = state.orders.find(o => o.id === selectedOrderId);

  if (!order) return <div className="p-4">Order not found</div>;

  const handlePickedUp = async () => {
    await updateState(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === order.id ? { ...o, status: 'completed' as const, deliveredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : o)
    }));
    onNext(13); // Completed screen
  };

  return (
    <OrderDetailsBase
      order={order}
      onBack={() => onNext(9)}
      statusBadge={
        <span className="py-1 px-2.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
          Ready
        </span>
      }
      actions={
        <button
          onClick={handlePickedUp}
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10"
        >
          Picked Up
        </button>
      }
    />
  );
};
