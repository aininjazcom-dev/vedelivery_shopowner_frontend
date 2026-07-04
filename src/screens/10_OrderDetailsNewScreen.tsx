import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { OrderDetailsBase } from '../components/OrderDetailsBase';

interface ScreenProps {
  onNext: (nextId: number) => void;
  selectedOrderId: string;
}

export const OrderDetailsNewScreen: FC<ScreenProps> = ({ onNext, selectedOrderId }) => {
  const { state, updateState } = useApp();
  const order = state.orders.find(o => o.id === selectedOrderId);

  if (!order) return <div className="p-4">Order not found</div>;

  const handleAccept = async () => {
    await updateState(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === order.id ? { ...o, status: 'preparing' as const } : o)
    }));
    onNext(11); // Transition to preparing Screen
  };

  const handleReject = async () => {
    await updateState(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === order.id ? { ...o, status: 'rejected' as const } : o)
    }));
    onNext(9); // Return to Orders list
  };

  return (
    <OrderDetailsBase
      order={order}
      onBack={() => onNext(9)}
      statusBadge={
        <span className="py-1 px-2.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase bg-orange-50 text-brand-orange border border-orange-100">
          New
        </span>
      }
      actions={
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="w-1/3 py-3 border border-rose-200 hover:bg-rose-50 text-rose-500 active:scale-95 font-bold text-xs rounded-xl transition"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 py-3 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10"
          >
            Accept
          </button>
        </div>
      }
    />
  );
};
