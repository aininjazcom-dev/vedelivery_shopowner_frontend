import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
  selectedStaffId: string;
}

export const StaffDetailScreen: FC<ScreenProps> = ({ onNext, selectedStaffId }) => {
  const { state, updateState } = useApp();
  const staff = state.staff.find(s => s.id === selectedStaffId);

  if (!staff) return <div className="p-4">Staff member not found</div>;

  const handleRemove = async () => {
    await updateState(prev => ({
      ...prev,
      staff: prev.staff.filter(s => s.id !== staff.id)
    }));
    onNext(26); // Back to staff list
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 p-4 flex items-center gap-3 select-none shrink-0">
        <button
          onClick={() => onNext(26)}
          className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 self-start"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-sm font-bold text-slate-800 font-sans">Staff Details</h1>
      </div>

      {/* Info */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
        {/* Profile Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 shadow-2xs">
          <div className="w-12 h-12 bg-white border border-slate-200 text-sm rounded-full flex items-center justify-center shrink-0 font-bold">👤</div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 leading-tight">{staff.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-semibold text-slate-500">{staff.role}</span>
              <span className="inline-block py-0.5 px-2 bg-emerald-50 text-brand-green border border-emerald-100 text-[8px] font-extrabold rounded-full uppercase tracking-wider">
                {staff.status}
              </span>
            </div>
          </div>
        </div>

        {/* Contact info list */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-4 shadow-2xs">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Phone Number</span>
            <span className="text-xs font-bold text-slate-700 mt-1 block">{staff.phone}</span>
          </div>

          <hr className="border-slate-200/50" />

          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Email</span>
            <span className="text-xs font-bold text-slate-700 mt-1 block">{staff.email}</span>
          </div>

          <hr className="border-slate-200/50" />

          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Permissions</span>
            <div className="flex flex-wrap gap-1.5">
              {staff.permissions.map((p, idx) => (
                <span key={idx} className="py-0.5 px-2 bg-white border border-slate-200 text-[9px] font-bold text-slate-500 rounded-lg shadow-2xs">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <hr className="border-slate-200/50" />

          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Joined On</span>
            <span className="text-xs font-semibold text-slate-600 mt-1 block">{staff.joinedOn}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-4 border-t border-slate-100 flex gap-3 select-none shrink-0">
        <button
          onClick={handleRemove}
          className="w-1/2 py-3 border border-rose-200 hover:bg-rose-50 text-rose-500 active:scale-95 font-bold text-xs rounded-xl transition"
        >
          Remove
        </button>
        <button
          onClick={() => onNext(26)} // Return to list
          className="w-1/2 py-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 active:scale-95 font-bold text-xs rounded-xl transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
};
