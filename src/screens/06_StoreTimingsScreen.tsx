import { useState, type FC } from 'react';
import { useApp } from '../context/AppContext';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const StoreTimingsScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state, updateState } = useApp();
  const [opening, setOpening] = useState(state.storeTimings.openingTime);
  const [closing, setClosing] = useState(state.storeTimings.closingTime);
  const [allDays, setAllDays] = useState(state.storeTimings.openAllDays);
  const [selectedDays, setSelectedDays] = useState<string[]>(state.storeTimings.customDays);

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSave = async () => {
    await updateState({
      storeTimings: {
        openingTime: opening,
        closingTime: closing,
        openAllDays: allDays,
        customDays: selectedDays
      }
    });
    onNext(7); // Location
  };

  return (
    <div className="flex-1 bg-white p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar h-full">
      {/* Top Header */}
      <div className="flex flex-col gap-4 mt-2">
        <button
          onClick={() => onNext(5)}
          className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 self-start"
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Set Store Timings</h1>
          <p className="text-xs text-slate-500 mt-1">When do you accept orders?</p>
        </div>
      </div>

      {/* Options */}
      <div className="flex-1 flex flex-col gap-5 justify-center my-6">
        {/* Opening Time */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Opening Time</label>
          <select
            value={opening}
            onChange={(e) => setOpening(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          >
            <option>06:00 AM</option>
            <option>07:00 AM</option>
            <option>08:00 AM</option>
            <option>09:00 AM</option>
            <option>10:00 AM</option>
          </select>
        </div>

        {/* Closing Time */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Closing Time</label>
          <select
            value={closing}
            onChange={(e) => setClosing(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          >
            <option>09:00 PM</option>
            <option>10:00 PM</option>
            <option>11:00 PM</option>
            <option>12:00 AM</option>
            <option>01:00 AM</option>
          </select>
        </div>

        {/* Toggle Option */}
        <div className="flex items-center justify-between p-1">
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Open All Days</div>
            <div className="text-2xs text-slate-400 mt-0.5 font-medium">Accept orders every day of the week</div>
          </div>
          <button
            onClick={() => {
              setAllDays(!allDays);
              if (!allDays) setSelectedDays(daysOfWeek);
            }}
            className={`w-11 h-6 rounded-full transition-colors flex items-center p-0.5 ${allDays ? 'bg-brand-green' : 'bg-slate-200'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${allDays ? 'translate-x-5' : ''}`}></div>
          </button>
        </div>

        {/* Custom Days */}
        {!allDays && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Custom Days</label>
            <div className="flex justify-between gap-1">
              {daysOfWeek.map((day, idx) => {
                const isSelected = selectedDays.includes(day);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleDay(day)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition ${
                      isSelected
                        ? 'bg-brand-orange border-brand-orange text-white shadow-sm'
                        : 'border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Button */}
      <div>
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-[0.99] transition rounded-xl text-white font-bold text-xs tracking-wide shadow-md shadow-orange-500/10 mb-2"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};
