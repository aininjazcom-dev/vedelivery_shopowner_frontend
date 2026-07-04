import { useState, type FC, type FormEvent } from 'react';
import { useApp } from '../context/AppContext';

interface ScreenProps {
  onNext: (nextId: number) => void;
  setPhoneData: (data: { phone: string; name: string }) => void;
}

export const SignUpScreen: FC<ScreenProps> = ({ onNext, setPhoneData }) => {
  const { signup } = useApp();
  const [fullName, setFullName] = useState("John's Kitchen");
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('johnkitchen@gmail.com');
  const [password, setPassword] = useState('••••••••');

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setPhoneData({ phone, name: fullName });
    await signup(fullName, email, phone);
    onNext(4); // Go to OTP
  };

  return (
    <div className="flex-1 bg-white p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar h-full">
      {/* Top Back/Icon */}
      <div className="flex flex-col gap-4 mt-2">
        <button
          onClick={() => onNext(2)}
          className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 self-start"
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Account 🚀</h1>
          <p className="text-xs text-slate-500 mt-1">Let's get your business started</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSignUp} className="flex-1 flex flex-col justify-center gap-3.5 my-5">
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter store owner full name"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-brand-orange transition">
            <span className="text-xs font-semibold text-slate-400 mr-2 border-r border-slate-200 pr-2">🇮🇳 +91</span>
            <input
              type="text"
              value={phone.replace('+91 ', '')}
              onChange={(e) => setPhone('+91 ' + e.target.value)}
              placeholder="Enter phone number"
              className="bg-transparent border-none outline-none flex-1 text-slate-800 text-xs font-medium"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Email (Optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-2xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-[0.99] transition rounded-xl text-white font-bold text-xs tracking-wide shadow-md shadow-orange-500/10 mt-1"
        >
          Sign Up
        </button>
      </form>

      {/* Footer */}
      <div className="text-center mb-2">
        <span className="text-xs text-slate-500">Already have an account? </span>
        <button onClick={() => onNext(2)} className="text-xs font-bold text-brand-orange hover:underline">Login</button>
      </div>
    </div>
  );
};
