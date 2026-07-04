import { useState, type FC } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Info } from 'lucide-react';

interface ScreenProps {
  onNext: (nextId: number) => void;
}

export const PrinterSettingsScreen: FC<ScreenProps> = ({ onNext }) => {
  const { state, updateState } = useApp();
  const [printer, setPrinter] = useState(state.printerSettings.selectPrinter);
  const [paper, setPaper] = useState(state.printerSettings.paperSize);
  const [autoPrint, setAutoPrint] = useState(state.printerSettings.printAutomatically);

  const handleSave = async () => {
    await updateState({
      printerSettings: {
        selectPrinter: printer,
        paperSize: paper,
        printAutomatically: autoPrint
      }
    });
    onNext(22); // Back to settings
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
        <h1 className="text-sm font-bold text-slate-800 font-sans">Printer Settings</h1>
      </div>

      {/* Form Options */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-5 justify-center">
        {/* Select Printer */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Printer</label>
          <select
            value={printer}
            onChange={(e) => setPrinter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          >
            <option>Kitchen Printer</option>
            <option>Billing Printer</option>
            <option>Bar Printer</option>
          </select>
        </div>

        {/* Paper Size */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Paper Size</label>
          <select
            value={paper}
            onChange={(e) => setPaper(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-orange"
          >
            <option>80 mm</option>
            <option>58 mm</option>
          </select>
        </div>

        {/* Print Automatically Toggle */}
        <div className="flex items-center justify-between p-1 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Print Automatically</div>
          </div>
          <button
            onClick={() => setAutoPrint(!autoPrint)}
            className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 ${autoPrint ? 'bg-brand-green' : 'bg-slate-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${autoPrint ? 'translate-x-4' : ''}`}></div>
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start">
          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-2xs text-slate-500 font-semibold leading-relaxed">
            Orders will be automatically printed when received.
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="p-4 border-t border-slate-100 select-none shrink-0">
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-brand-orange hover:bg-brand-orangeHover active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-md shadow-orange-500/10"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};
