import { useState, type FC, type FormEvent } from 'react';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, User } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
  setPhoneData: (data: { phone: string; name: string }) => void;
}

export const LoginScreen: FC<ScreenProps> = ({ onNext, setPhoneData }) => {
  const { login } = useApp();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    const cleanUsername = emailOrPhone.trim();
    if (!cleanUsername) {
      setError('Please enter your email or phone number');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);
    try {
      setPhoneData({ phone: cleanUsername, name: "" });
      const success = await login(cleanUsername, password);
      if (success) {
        onNext(8); // Go to Dashboard
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-white p-6 flex flex-col justify-between h-full">
      {/* Top Back/Icon */}
      <div className="flex flex-col gap-5 mt-2 select-none">
        <button
          onClick={() => onNext(1)}
          className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 self-start"
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome Back! 👋</h1>
          <p className="text-xs text-slate-500 mt-1">Login to your account</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex-1 flex flex-col justify-center gap-4 my-6">
        
        {/* Error Banner */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 rounded-xl p-3 text-xs font-bold select-none animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {/* Email or Phone Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email or Phone Number</label>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 focus-within:border-brand-orange transition">
            <User className="w-4 h-4 text-slate-400 mr-2.5 select-none" />
            <input
              type="text"
              required
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter email or phone number"
              className="bg-transparent border-none outline-none flex-1 text-slate-800 text-xs font-medium"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center select-none">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
            <button type="button" className="text-2xs font-semibold text-brand-orange hover:underline">Forgot?</button>
          </div>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 focus-within:border-brand-orange transition">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-transparent border-none outline-none flex-1 text-slate-800 text-xs font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-[0.99] transition rounded-xl text-white font-bold text-xs tracking-wide shadow-md shadow-orange-500/10 mt-2 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Authenticating...' : 'Login'}
        </button>

        {/* Or Divider */}
        <div className="flex items-center gap-3 my-2 select-none">
          <div className="h-px bg-slate-100 flex-1"></div>
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-widest">or continue with</span>
          <div className="h-px bg-slate-100 flex-1"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3 select-none">
          <button
            type="button"
            onClick={() => onNext(8)}
            className="py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold transition flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => onNext(8)}
            className="py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold transition flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C3.79 16.32 4.67 9.53 9.4 9.2c1.47.1 2.3.82 3.12.82.83 0 1.95-.89 3.59-.72 1.68.17 2.92.83 3.6 1.84-3.41 2.03-2.86 6.39.46 7.71-.65 1.62-1.54 3.25-3.12 4.43zM12.03 9.07c.07-2.93 2.45-5.29 5.25-5.32.32 3.31-2.97 5.68-5.25 5.32z"/>
            </svg>
            Apple
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="text-center mb-2 select-none">
        <span className="text-xs text-slate-500">Don't have an account? </span>
        <button onClick={() => onNext(3)} className="text-xs font-bold text-brand-orange hover:underline">Sign Up</button>
      </div>
    </div>
  );
};
