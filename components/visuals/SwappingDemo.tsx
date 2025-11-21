import React, { useState } from 'react';
import { Link2, ArrowRightLeft, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

export const SwappingDemo: React.FC = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-8 text-white my-8 shadow-2xl border border-slate-700">
      <h3 className="text-xl font-bold mb-2 text-center text-blue-300">شبیه‌سازی تعویض درهم‌تنیدگی (Entanglement Swapping)</h3>
      <p className="text-slate-400 text-sm text-center mb-8">
        چگونه دو لینک کوتاه به یک لینک بلند تبدیل می‌شوند؟ ("Stitching")
      </p>

      {/* Visualization Area */}
      <div className="relative h-40 flex items-center justify-between px-4 md:px-12 select-none">
        
        {/* Nodes */}
        <div className="z-20 flex flex-col items-center gap-2">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${step >= 3 ? 'bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]' : 'bg-slate-700'}`}>
            A
          </div>
          <span className="text-xs text-slate-500">فرستنده</span>
        </div>

        <div className="z-20 flex flex-col items-center gap-2">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-all duration-500 ${step === 2 ? 'bg-yellow-500 border-yellow-300 animate-pulse' : 'bg-slate-700 border-slate-600'}`}>
            {step === 2 ? <ArrowRightLeft className="animate-spin-slow" /> : 'B'}
          </div>
          <span className="text-xs text-slate-500">تکرارگر (Repeater)</span>
        </div>

        <div className="z-20 flex flex-col items-center gap-2">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${step >= 3 ? 'bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]' : 'bg-slate-700'}`}>
            C
          </div>
          <span className="text-xs text-slate-500">گیرنده</span>
        </div>

        {/* Link 1: A-B */}
        <div className={`absolute left-[15%] right-[50%] h-1 top-1/2 -translate-y-1/2 transition-all duration-1000 ${step >= 1 && step < 3 ? 'bg-blue-500 opacity-100' : 'bg-slate-800 opacity-30'}`}>
           {step >= 1 && step < 3 && <div className="absolute inset-0 animate-pulse bg-blue-400 blur-[2px]"></div>}
        </div>

        {/* Link 2: B-C */}
        <div className={`absolute left-[50%] right-[15%] h-1 top-1/2 -translate-y-1/2 transition-all duration-1000 ${step >= 1 && step < 3 ? 'bg-blue-500 opacity-100' : 'bg-slate-800 opacity-30'}`}>
           {step >= 1 && step < 3 && <div className="absolute inset-0 animate-pulse bg-blue-400 blur-[2px]"></div>}
        </div>

        {/* Long Link: A-C (Result) */}
        <div className={`absolute left-[15%] right-[15%] h-2 top-1/2 -translate-y-1/2 rounded-full transition-all duration-1000 ${step === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
           <div className="absolute inset-0 bg-purple-500 rounded-full"></div>
           <div className="absolute inset-0 bg-purple-400 blur-md animate-pulse"></div>
           <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white tracking-widest uppercase">
             Entangled A-C
           </div>
        </div>

      </div>

      {/* Controls & Explanation */}
      <div className="mt-8 bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
           <span className="text-sm font-bold text-slate-300">
             مرحله {step} از ۳:
             {step === 0 && ' وضعیت اولیه'}
             {step === 1 && ' تولید درهم‌تنیدگی محلی'}
             {step === 2 && ' عملیات تعویض (Swapping) در B'}
             {step === 3 && ' درهم‌تنیدگی نهایی A-C'}
           </span>
           <div className="flex gap-2">
             {step > 0 && (
                <button onClick={prevStep} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1">
                  <ChevronRight size={14} /> قبلی
                </button>
             )}
             {step < 3 ? (
               <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded-lg text-sm transition-colors flex items-center gap-2">
                 بعدی <ChevronLeft size={14} />
               </button>
             ) : (
                <button onClick={reset} className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded-lg text-sm transition-colors flex items-center gap-2">
                 تکرار <RefreshCw size={14} />
               </button>
             )}
           </div>
        </div>
        <p className="text-sm text-slate-400 min-h-[60px] leading-6 text-justify">
          {step === 0 && 'گره‌ها هیچ ارتباط کوانتومی با هم ندارند. هدف ایجاد ارتباط بین A و C است بدون ارسال مستقیم کیوبیت. این فرآیند پایه و اساس اینترنت کوانتومی است.'}
          {step === 1 && 'ابتدا لینک‌های کوتاه ایجاد می‌شوند. A با B درهم‌تنیده می‌شود و B با C. اما هنوز A و C با هم ارتباطی ندارند. کیوبیت‌ها در حافظه‌های گره‌های میانی ذخیره شده‌اند.'}
          {step === 2 && 'گره میانی (B) یک اندازه‌گیری خاص روی دو کیوبیت خود انجام می‌دهد (Bell State Measurement). این کار باعث می‌شود دو لینک مجزا "به هم دوخته شوند". دقت کنید که کیوبیت‌های گره B در این فرآیند از بین می‌روند.'}
          {step === 3 && 'نتیجه شگفت‌انگیز: حالا A و C با هم درهم‌تنیده هستند! بدون اینکه فوتونی مستقیماً تمام مسیر A تا C را طی کرده باشد. گره B از معادله خارج می‌شود و ارتباط مستقیم کوانتومی بین مبدا و مقصد شکل گرفته است.'}
        </p>
      </div>
    </div>
  );
};