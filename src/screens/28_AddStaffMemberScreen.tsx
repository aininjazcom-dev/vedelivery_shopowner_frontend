import { useState, type FC, type FormEvent } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft } from 'lucide-react';
import type { StaffMember } from '../data/initialDummyData';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const AddStaffMemberScreen: FC<ScreenProps> = ({ onNext }) => {
  const { updateState } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Chef');
  const selectedPermissions = ["Menu"];

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newStaff: StaffMember = {
      id: `staff-${Date.now()}`,
      name,
      role,
      status: 'active',
      phone,
      email,
      permissions: selectedPermissions,
      joinedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    await updateState(prev => ({
      ...prev,
      staff: [...prev.staff, newStaff]
    }));

    onNext(26); // Back to list
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
        <h1 className="text-sm font-bold text-slate-800 font-sans">Add Staff Member</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4 justify-center">
        {/* Photo box */}
        <div className="flex flex-col gap-1.5">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Photo</label>
          <div className="border-2 border-dashed border-slate-200 hover:border-brand-orange transition rounded-2xl p-5 flex flex-col items-center justify-center gap-1.5 bg-slate-50 cursor-pointer">
            <span className="text-xs font-bold text-slate-400">Upload Photo</span>
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Email (Optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange appearance-none animate-none"
          >
            <option>Manager</option>
            <option>Chef</option>
            <option>Cashier</option>
            <option>Delivery Manager</option>
          </select>
        </div>

        {/* Add Staff button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10 mt-2 shrink-0"
        >
          Add Staff Member
        </button>
      </form>
    </div>
  );
};
