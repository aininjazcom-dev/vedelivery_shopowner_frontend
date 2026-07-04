import { type FC } from 'react';
import { Store, CreditCard, Clock, Bell, Printer, Users, Sliders, Info, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const StoreSettingsScreen: FC<ScreenProps> = ({ onNext }) => {
  const settingsMenu = [
    { label: "Store Information", icon: <Store className="w-4 h-4 text-slate-500" />, screen: 32 },
    { label: "Bank Details", icon: <CreditCard className="w-4 h-4 text-slate-500" />, screen: 23 },
    { label: "Store Timings", icon: <Clock className="w-4 h-4 text-slate-500" />, screen: 6 }, // Redirects back to onboarding timings step but functions as edit!
    { label: "Notification Settings", icon: <Bell className="w-4 h-4 text-slate-500" />, screen: 24 },
    { label: "Printer Settings", icon: <Printer className="w-4 h-4 text-slate-500" />, screen: 25 },
    { label: "Manage Staff", icon: <Users className="w-4 h-4 text-slate-500" />, screen: 26 },
    { label: "App Preferences", icon: <Sliders className="w-4 h-4 text-slate-500" />, screen: 31 },
    { label: "Subscription Plan", icon: <Info className="w-4 h-4 text-slate-500" />, screen: 34 },
    { label: "Help & Support", icon: <HelpCircle className="w-4 h-4 text-slate-500" />, screen: 35 },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-slate-50">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
        {/* Header */}
        <h1 className="text-lg font-bold text-slate-800 font-sans mt-1">Store Settings</h1>

        {/* Menu list */}
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
          {settingsMenu.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onNext(item.screen)}
              className="w-full flex items-center justify-between p-3.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-slate-700">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
          
          {/* Logout Trigger button */}
          <button
            onClick={() => onNext(36)} // Logout confirmation
            className="w-full flex items-center justify-between p-3.5 hover:bg-rose-50/50 transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-rose-50 border border-rose-100 rounded-lg flex items-center justify-center shrink-0">
                <LogOut className="w-4 h-4 text-rose-500" />
              </div>
              <span className="text-xs font-bold text-rose-600">Logout</span>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <BottomNav activeTab="more" onTabSelect={onNext} />
    </div>
  );
};
