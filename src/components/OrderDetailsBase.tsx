import { type FC, type ReactNode } from 'react';
import { Phone, MapPin } from 'lucide-react';
import type { Order } from '../data/initialDummyData';

interface OrderDetailsBaseProps {
  order: Order;
  onBack: () => void;
  statusBadge: ReactNode;
  actions: ReactNode;
}

export const OrderDetailsBase: FC<OrderDetailsBaseProps> = ({ order, onBack, statusBadge, actions }) => {
  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 select-none shrink-0 p-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 shrink-0 self-start"
        >
          <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 flex items-center justify-between">
          <h1 className="text-sm font-bold text-slate-800 font-sans">Order Details</h1>
          {statusBadge}
        </div>
      </div>

      {/* Details Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
        {/* Order ID & Time */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-800">{order.id}</h2>
            <div className="text-2xs font-semibold text-slate-400 mt-0.5">Time: {order.time}</div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="flex items-center justify-between bg-slate-50/70 border border-slate-100 rounded-xl p-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-slate-100 text-sm rounded-full flex items-center justify-center shrink-0 font-bold border border-slate-200">👤</div>
            <div>
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">Customer</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block">{order.customerName}</span>
            </div>
          </div>
          <button className="w-8 h-8 bg-brand-orange/10 hover:bg-brand-orange/20 active:scale-95 text-brand-orange border border-orange-100 rounded-full flex items-center justify-center transition">
            <Phone className="w-4 h-4" />
          </button>
        </div>

        {/* Delivery Address */}
        <div className="flex gap-3 bg-slate-50/70 border border-slate-100 rounded-xl p-3">
          <div className="w-8 h-8 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center border border-orange-100 shrink-0 mt-0.5">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex-1 flex flex-col gap-0.5">
            <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">Delivery Address</span>
            <p className="text-xs font-semibold text-slate-700 leading-relaxed">{order.deliveryAddress}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xs font-bold text-slate-400 uppercase tracking-wider pl-1">Order Items</h3>
          <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-2xs bg-white">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3.5 border-b border-slate-50 last:border-0 text-xs">
                <div>
                  <span className="font-bold text-slate-800">{item.name}</span>
                  <span className="text-2xs text-slate-400 block mt-0.5">Quantity: {item.quantity}</span>
                </div>
                <span className="font-semibold text-slate-700">₹{item.price * item.quantity}</span>
              </div>
            ))}
            
            {/* Breakdown */}
            <div className="bg-slate-50 p-3.5 border-t border-slate-100 flex flex-col gap-1.5">
              <div className="flex justify-between text-2xs font-semibold text-slate-500">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-2xs font-semibold text-slate-500">
                <span>Delivery Fee</span>
                <span>₹{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-2xs font-semibold text-slate-500">
                <span>Tax Amount</span>
                <span>₹{order.taxAmount}</span>
              </div>
              <div className="flex justify-between text-xs font-extrabold text-slate-800 mt-1 border-t border-slate-200/50 pt-1.5">
                <span>Total Price</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action panel at bottom */}
      <div className="p-4 border-t border-slate-100 select-none shrink-0">
        {actions}
      </div>
    </div>
  );
};
