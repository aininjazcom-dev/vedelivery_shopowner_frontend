import { useState, type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const AppPreferencesScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state, updateState } = useApp();
  const [sound, setSound] = useState(state.appPreferences.orderSound);
  const [notifSound, setNotifSound] = useState(state.appPreferences.notificationSound);
  const [vibration, setVibration] = useState(state.appPreferences.vibration);

  const handleToggle = async (key: 'sound' | 'notif' | 'vibrate') => {
    let newState = {};
    if (key === 'sound') {
      setSound(!sound);
      newState = { orderSound: !sound };
    } else if (key === 'notif') {
      setNotifSound(!notifSound);
      newState = { notificationSound: !notifSound };
    } else {
      setVibration(!vibration);
      newState = { vibration: !vibration };
    }

    await updateState(prev => ({
      ...prev,
      appPreferences: {
        ...prev.appPreferences,
        ...newState
      }
    }));
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center gap-3 select-none shrink-0">
        <button
          onClick={() => onNext(22)}
          className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-sm font-bold text-slate-800 font-sans">App Preferences</h1>
      </div>

      {/* Preferences List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4 select-none justify-center">
        {/* Order Sound */}
        <div className="flex items-center justify-between p-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Order Sound</span>
          <button
            onClick={() => handleToggle('sound')}
            className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 ${sound ? 'bg-brand-green' : 'bg-slate-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${sound ? 'translate-x-4' : ''}`}></div>
          </button>
        </div>

        {/* Notification Sound */}
        <div className="flex items-center justify-between p-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Notification Sound</span>
          <button
            onClick={() => handleToggle('notif')}
            className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 ${notifSound ? 'bg-brand-green' : 'bg-slate-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${notifSound ? 'translate-x-4' : ''}`}></div>
          </button>
        </div>

        {/* Vibration */}
        <div className="flex items-center justify-between p-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Vibration</span>
          <button
            onClick={() => handleToggle('vibrate')}
            className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 ${vibration ? 'bg-brand-green' : 'bg-slate-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${vibration ? 'translate-x-4' : ''}`}></div>
          </button>
        </div>

        {/* Language Details */}
        <div className="flex items-center justify-between p-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Language</span>
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">English <ChevronRight className="w-3.5 h-3.5" /></span>
        </div>

        {/* Theme Details */}
        <div className="flex items-center justify-between p-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Theme</span>
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">Light <ChevronRight className="w-3.5 h-3.5" /></span>
        </div>
      </div>
    </div>
  );
};
