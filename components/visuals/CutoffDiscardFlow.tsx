
import React, { useState } from 'react';
import { Clock, Trash2, FileX, ArrowLeft, ArrowRight, AlertOctagon, RotateCcw, CheckCircle2 } from 'lucide-react';

export const CutoffDiscardFlow: React.FC = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));
  const reset = () => setStep(0);

  const steps = [
    {
      title: "۱. انتظار و انقضا (Timeout)",
      desc: "لینک چپ (L1) تولید شده و در حافظه تکرارگر منتظر لینک راست است. اما لینک راست نمی‌رسد. تایمر Cutoff به پایان می‌رسد و کیوبیت L1 کیفیت خود را از دست می‌دهد.",
    },
    {
      title: "۲. دور ریختن و ثبت (Discard & Log)",
      desc: "تکرارگر کیوبیت فاسد شده را دور می‌ریزد (حافظه آزاد می‌شود). همزمان، یک رکورد «Discard» در جدول وضعیت خود برای این شناسه درخواست ثبت می‌کند.",
    },
    {
      title: "۳. رسیدن پیام TRACK",
      desc: "مدتی بعد، پیام TRACK (که مسئول جمع‌آوری نتایج است) از سمت مبدا (Head) می‌رسد. این پیام انتظار دارد یک رکورد «Swap» ببیند.",
    },
    {
      title: "۴. کشف شکست (Discovery)",
      desc: "پیام TRACK جدول را چک می‌کند و رکورد «Discard» را می‌بیند. متوجه می‌شود که زنجیره پاره شده است. وضعیت پیام به «FAILED» تغییر می‌کند.",
    },
    {
      title: "۵. گزارش به مبدا (Notification)",
      desc: "پیام ناکامی (NACK) به سمت مبدا برمی‌گردد تا به اپلیکیشن اطلاع دهد که این تلاش شکست خورده و باید مجدداً تلاش کند (Retry).",
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden my-10 shadow-2xl text-white select-none flex flex-col">
      
      {/* Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <h4 className="font-bold text-red-300 flex items-center gap-2 text-sm md:text-base">
           <FileX size={20}/>
           روند مدیریت خطا (Discard Logic Flow)
        </h4>
        <div className="flex items-center gap-2">
           <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
             Gamp {step + 1} / 5
           </span>
        </div>
      </div>

      {/* Visualization Stage */}
      <div className="relative h-64 bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
        
        {/* Background Lines */}
        <div className="absolute left-10 right-10 top-1/2 h-0.5 bg-slate-800"></div>

        {/* Nodes */}
        {/* HEAD */}
        <div className="absolute left-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
           <div className="w-14 h-14 bg-slate-800 border-2 border-slate-600 rounded-lg flex items-center justify-center shadow-lg relative">
             <span className="font-bold text-xs text-slate-400">Head</span>
             {step === 5 && (
                <div className="absolute -top-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-bounce shadow-[0_0_15px_red]">
                   RETRY!
                </div>
             )}
           </div>
        </div>

        {/* REPEATER */}
        <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
           
           {/* Log Table (Floating above) */}
           <div className={`absolute -top-24 bg-slate-800 border border-slate-600 p-2 rounded transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-[8px] text-slate-500 uppercase font-bold mb-1 border-b border-slate-700 pb-1">Swap Table</div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                 <span className="text-slate-400">ID: #101</span>
                 {step >= 1 && (
                    <span className="text-red-400 font-bold bg-red-900/30 px-1 rounded flex items-center gap-1">
                       <Trash2 size={8}/> DISCARD
                    </span>
                 )}
              </div>
           </div>

           {/* Repeater Body */}
           <div className="w-20 h-20 bg-slate-900 border-2 border-slate-600 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden z-20">
              
              {/* Qubit L1 */}
              <div className={`absolute w-6 h-6 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] flex items-center justify-center transition-all duration-500
                 ${step === 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              `}>
                 <span className="text-[8px] font-bold">L1</span>
              </div>

              {/* Timeout Indicator */}
              {step === 0 && (
                 <div className="absolute inset-0 border-4 border-red-500/50 rounded-full animate-[spin_2s_linear_infinite_reverse]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
              )}
              
              {/* Trash Icon Animation */}
              {step === 1 && (
                 <Trash2 size={32} className="text-red-500 animate-[ping_0.5s_ease-out]" />
              )}

           </div>
           <span className="mt-2 text-xs text-slate-500 font-bold">Repeater</span>
        </div>

        {/* TAIL (Ghost) */}
        <div className="absolute right-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center opacity-30">
           <div className="w-14 h-14 bg-slate-800 border-2 border-slate-600 rounded-lg flex items-center justify-center">
             <span className="font-bold text-xs text-slate-400">Tail</span>
           </div>
        </div>

        {/* --- Links --- */}
        {/* Link 1 (Left) */}
        <div className={`absolute left-[22%] right-[50%] top-1/2 h-1 bg-blue-500/50 transition-all duration-500 ${step === 0 ? 'opacity-100' : 'opacity-0'}`}></div>


        {/* --- MESSAGES --- */}
        
        {/* TRACK Message (Blue) -> Heading to Repeater */}
        <div className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 z-30
           ${step === 2 ? 'left-[25%] opacity-100' : step > 2 ? 'left-[45%] opacity-0' : 'left-[15%] opacity-0'}
        `}>
           <div className="bg-blue-600 text-white p-2 rounded-full shadow-[0_0_15px_#2563eb] flex items-center gap-1">
              <span className="text-[9px] font-bold">TRACK</span>
              <ArrowRight size={12}/>
           </div>
        </div>

        {/* PROCESSING (At Repeater) */}
        {step === 3 && (
           <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              <div className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-xs animate-pulse shadow-lg border-2 border-white">
                 Reading Log...
              </div>
           </div>
        )}

        {/* FAILURE REPORT (Red) -> Heading Back to Head */}
        <div className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 z-30
           ${step === 4 ? 'left-[35%] opacity-100' : step === 5 ? 'left-[18%] opacity-100' : 'left-[50%] opacity-0'}
        `}>
           <div className="bg-red-600 text-white p-2 rounded-full shadow-[0_0_15px_red] flex items-center gap-1 border border-red-400">
              <ArrowLeft size={12}/>
              <span className="text-[9px] font-bold">FAILED</span>
           </div>
        </div>

      </div>

      {/* Control Footer */}
      <div className="bg-slate-950 p-6 border-t border-slate-800 flex flex-col md:flex-row gap-6">
         <div className="flex-1">
            <h5 className="font-bold text-white mb-2 text-sm flex items-center gap-2">
              <span className="bg-slate-800 text-slate-300 w-6 h-6 rounded-full flex items-center justify-center text-xs">{step + 1}</span>
              {steps[step].title}
            </h5>
            <p className="text-sm text-slate-400 leading-6 text-justify min-h-[60px]">
               {steps[step].desc}
            </p>
         </div>

         <div className="flex gap-2 items-start min-w-[140px]">
             <button 
               onClick={prevStep} disabled={step === 0}
               className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg text-slate-300 text-xs font-bold border border-slate-700 transition-colors"
             >
               قبلی
             </button>
             
             {step < 4 ? (
                <button 
                  onClick={nextStep}
                  className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-900/20 transition-colors"
                >
                  مرحله بعد
                </button>
             ) : (
                <button 
                  onClick={reset}
                  className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-red-900/20 transition-colors flex items-center justify-center gap-1"
                >
                  <RotateCcw size={12}/> شروع مجدد
                </button>
             )}
         </div>
      </div>

    </div>
  );
};
