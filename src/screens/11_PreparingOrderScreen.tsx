import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { OrderDetailsBase } from '../components/OrderDetailsBase';

interface ScreenProps {
  onNext: (nextId: number) => void;
  selectedOrderId: string;
}

export const PreparingOrderScreen: FC<ScreenProps> = ({ onNext, selectedOrderId }) => {
  const { state, updateState } = useApp();
  const order = state.orders.find(o => o.id === selectedOrderId);

  if (!order) return <div className="p-4">Order not found</div>;

  const handleReady = async () => {
    await updateState(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === order.id ? { ...o, status: 'ready' as const } : o)
    }));
    onNext(12); // Ready screen
  };

  return (
    <OrderDetailsBase
      order={order}
      onBack={() => onNext(9)}
      statusBadge={
        <span className="py-1 px-2.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase bg-amber-50 text-amber-600 border border-amber-100">
          Preparing
        </span>
      }
      actions={
        <button
          onClick={handleReady}
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10"
        >
          Mark as Ready
        </button>
      }
    />
  );
};
