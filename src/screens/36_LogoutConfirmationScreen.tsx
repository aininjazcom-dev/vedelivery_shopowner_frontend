import { type FC } from 'react';
import { useApp } from '../context/AppContext';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const LogoutConfirmationScreen: FC<ScreenProps> = ({ onNext }) => {
  const { logout } = useApp();

  const handleLogout = () => {
    logout();
    onNext(1); // Return back to splash screen
  };

  return (
    <div className="flex-1 bg-white p-6 flex flex-col justify-between h-full">
      {/* Top Title */}
      <h1 className="text-lg font-black text-slate-800 tracking-tight font-sans mt-1">Logout</h1>

      {/* Exit graphic / question */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Exit Door Animation/Illustration */}
        <div className="w-20 h-20 bg-orange-50 border-4 border-orange-100 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-md shadow-orange-500/5">
          🚪
        </div>

        <h2 className="text-sm font-extrabold text-slate-800 text-center leading-snug">
          Are you sure you want to logout from the app?
        </h2>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onNext(22)} // Cancel, go to settings
          className="w-full py-3.5 border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-xs rounded-xl transition"
        >
          Cancel
        </button>
        <button
          onClick={handleLogout} // Perform actual logout
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
