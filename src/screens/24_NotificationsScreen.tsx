import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft } from 'lucide-react';
import type { AppNotification } from '../data/initialDummyData';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const NotificationsScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state, updateState } = useApp();

  const handleMarkAllRead = async () => {
    await updateState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, isRead: true }))
    }));
  };

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'order': return '📦';
      case 'payment': return '💵';
      case 'stock': return '⚠️';
      default: return '📈';
    }
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNext(22)}
            className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-sm font-bold text-slate-800 font-sans">Notifications</h1>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="text-2xs font-extrabold text-brand-orange uppercase tracking-wider hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3">
        {state.notifications.map((n) => (
          <div
            key={n.id}
            className={`border rounded-2xl p-4 flex items-start justify-between shadow-2xs transition ${
              n.isRead ? 'bg-slate-50/50 border-slate-100' : 'bg-orange-50/10 border-orange-100'
            }`}
          >
            <div className="flex gap-3 items-start">
              <div className="w-9 h-9 bg-white border border-slate-200/50 rounded-xl flex items-center justify-center text-base shrink-0 shadow-2xs">
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-800 leading-tight">{n.title}</h3>
                  {!n.isRead && <div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div>}
                </div>
                <p className="text-[10px] font-semibold text-slate-500 mt-1 leading-normal">{n.message}</p>
              </div>
            </div>
            
            <span className="text-[8px] font-extrabold text-slate-400 shrink-0 mt-0.5">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
