import React, { useState, useEffect } from 'react';
import { RotateCw, RefreshCcw } from 'lucide-react';

export const DecoherenceDemo: React.FC = () => {
  const [fidelity, setFidelity] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isRunning && fidelity > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev + 100);
        setFidelity((prev) => Math.max(0, prev - 2)); // Decay logic
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, fidelity]);

  const reset = () => {
    setIsRunning(false);
    setFidelity(100);
    setTime(0);
  };

  const toggle = () => {
    if (fidelity <= 0) reset();
    setIsRunning(!isRunning);
  };

  // Color calculation based on fidelity
  const getColor = (val: number) => {
    if (val > 80) return 'bg-green-500';
    if (val > 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 rounded-lg p-8 text-white my-8 shadow-inner">
      <div className="mb-4 text-center">
        <h4 className="text-lg font-bold mb-2 text-primary-100">شبیه‌سازی مفهوم ناهمدوسی (Decoherence)</h4>
        <p className="text-sm text-slate-300 max-w-md">
          در حافظه کوانتومی، اطلاعات به مرور زمان در اثر برهم‌کنش با محیط از دست می‌روند.
          دکمه شروع را بزنید تا کاهش "فیدلیتی" (کیفیت حالت کوانتومی) را ببینید.
        </p>
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center mb-6">
        {/* Outer Ring representing stability */}
        <div 
          className={`absolute inset-0 rounded-full border-4 transition-all duration-300 ${fidelity > 0 ? 'border-slate-700' : 'border-red-900'}`}
        ></div>
        
        {/* The Qubit Representation */}
        <div 
          className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-200 shadow-[0_0_30px_rgba(14,165,233,0.5)] ${getColor(fidelity)}`}
          style={{ 
            opacity: Math.max(0.2, fidelity / 100),
            transform: `scale(${0.5 + (fidelity / 200)})`
          }}
        >
          <span className="text-2xl font-bold text-white drop-shadow-md">{Math.round(fidelity)}%</span>
        </div>

        {/* Particle Noise Effect (simulated visually) */}
        {isRunning && fidelity > 0 && (
          <div className="absolute inset-0 animate-ping rounded-full border border-white opacity-20"></div>
        )}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={toggle}
          className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-500 rounded-full font-bold transition-colors"
        >
          {fidelity <= 0 ? <RotateCw size={18}/> : (isRunning ? 'توقف' : 'شروع فرآیند تخریب')}
          {fidelity <= 0 && 'تلاش مجدد'}
        </button>
        
        <button 
          onClick={reset}
          className="flex items-center gap-2 px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
        >
          <RefreshCcw size={18} />
          بازنشانی
        </button>
      </div>

      <div className="mt-4 text-xs text-slate-400 font-mono">
        زمان گذشته: {time} میلی‌ثانیه
      </div>
    </div>
  );
};