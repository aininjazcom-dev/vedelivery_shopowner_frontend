import { type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft } from 'lucide-react';
import type { StaffMember } from '../data/initialDummyData';

interface ScreenProps {
  onNext: (nextId: number) => void;
  setSelectedStaffId: (id: string) => void;
}

export const ManageStaffScreen: FC<ScreenProps> = ({ onNext, setSelectedStaffId }) => {
  const { state } = useApp();

  const handleStaffClick = (s: StaffMember) => {
    setSelectedStaffId(s.id);
    onNext(27); // Staff details
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
          <h1 className="text-sm font-bold text-slate-800 font-sans">Staff Members</h1>
        </div>

        <button
          onClick={() => onNext(28)} // Add Staff
          className="text-2xs font-extrabold text-brand-orange uppercase tracking-wider hover:underline"
        >
          + Add Staff
        </button>
      </div>

      {/* Staff List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3">
        {state.staff.map((s) => (
          <div
            key={s.id}
            onClick={() => handleStaffClick(s)}
            className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:border-orange-100 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-slate-200 text-xs rounded-full flex items-center justify-center shrink-0 font-bold">👤</div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 leading-tight">{s.name}</h3>
                <span className="text-[10px] font-semibold text-slate-400 mt-1 block">{s.role}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${s.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">{s.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
