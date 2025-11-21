
import React, { useState } from 'react';
import { Lock, Share2, GitMerge, ChevronLeft, ChevronRight, AlertOctagon, ArrowRightLeft } from 'lucide-react';

export const AggregationDiagram: React.FC = () => {
  const [mode, setMode] = useState<'dedicated' | 'aggregated'>('dedicated');
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(s => Math.min(s + 3, 3)); // Simple next/prev for now, actually lets go step by step
  const goNext = () => setStep(s => Math.min(s + 1, 3));
  const goPrev = () => setStep(s => Math.max(s - 1, 0));

  const changeMode = (m: 'dedicated' | 'aggregated') => {
    setMode(m);
    setStep(0);
  };

  // Step Descriptions
  const getStepInfo = () => {
    if (mode === 'dedicated') {
      switch (step) {
        case 0: return {
          title: "۱. ورود نامتقارن (Asymmetric Arrival)",
          desc: "لینک‌ها می‌رسند. فرض کنید لینک چپ متعلق به درخواست A (قرمز) و لینک راست متعلق به درخواست B (آبی) زودتر می‌رسند.",
          status: "Waiting"
        };
        case 1: return {
          title: "۲. انسداد منابع (Resource Blocking)",
          desc: "تکرارگر شناسه درخواست‌ها را چک می‌کند. چپ=A و راست=B. چون یکسان نیستند، نمی‌تواند Swap کند. حافظه اشغال می‌ماند و منتظر می‌گردد.",
          status: "Blocked"
        };
        case 2: return {
          title: "۳. تکمیل شدن لینک‌ها",
          desc: "لینک‌های جامانده (چپ=B و راست=A) بالاخره می‌رسند. اما زمان زیادی گذشته و لینک‌های اولیه دچار افت کیفیت شده‌اند.",
          status: "Arrived (Late)"
        };
        case 3: return {
          title: "۴. سواپ با تاخیر",
          desc: "حالا که جفت‌های متناظر پیدا شدند (A با A و B با B)، عملیات انجام می‌شود. نتیجه: تاخیر زیاد و کیفیت پایین.",
          status: "Late Swap"
        };
      }
    } else {
      switch (step) {
        case 0: return {
          title: "۱. ورود نامتقارن",
          desc: "همان شرایط: لینک چپ=A (قرمز) و لینک راست=B (آبی) زودتر می‌رسند. تکرارگر فقط می‌داند هر دو روی یک VC مشترک هستند.",
          status: "Waiting"
        };
        case 1: return {
          title: "۲. سواپ فوری (Instant Swap)",
          desc: "تکرارگر اهمیتی به شناسه نمی‌دهد! چون منابع موجود هستند، بلافاصله چپ را با راست Swap می‌کند. حافظه سریع آزاد می‌شود.",
          status: "Swapped (Mixed)"
        };
        case 2: return {
          title: "۳. ورود لینک‌های بعدی",
          desc: "لینک‌های بعدی می‌رسند و آن‌ها نیز بلافاصله با هم Swap می‌شوند.",
          status: "Arrived"
        };
        case 3: return {
          title: "۴. تفکیک در مقصد (Demux)",
          desc: "گره‌های انتهایی با دریافت پیام‌ها متوجه می‌شوند که جفت اول ترکیب A-B بوده و دومی B-A. آن‌ها مسئولیت مدیریت این وضعیت را بر عهده می‌گیرند.",
          status: "Done"
        };
      }
    }
    return { title: "", desc: "", status: "" };
  };

  const info = getStepInfo();

  return (
    <div className="my-8 select-none bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
      
      {/* Header / Mode Switcher */}
      <div className="flex border-b border-slate-100 bg-slate-50">
        <button 
          onClick={() => changeMode('dedicated')}
          className={`flex-1 py-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-colors ${mode === 'dedicated' ? 'bg-white text-red-600 shadow-[inset_0_-2px_0_#ef4444]' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <Lock size={16} />
          مدل اختصاصی (Dedicated)
        </button>
        <button 
          onClick={() => changeMode('aggregated')}
          className={`flex-1 py-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-colors ${mode === 'aggregated' ? 'bg-white text-green-600 shadow-[inset_0_-2px_0_#22c55e]' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <Share2 size={16} />
          مدل تجمعی (Aggregated)
        </button>
      </div>

      {/* Visualization Area */}
      <div className="relative p-4 md:p-8 min-h-[320px] bg-slate-50/50 flex flex-col items-center justify-center overflow-hidden">
         
         {/* Connection SVG Layer */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Dedicated Connections (A-A, B-B) */}
            {mode === 'dedicated' && step === 3 && (
              <>
                <path d="M 20% 30% C 40% 30%, 60% 30%, 80% 30%" stroke="#ef4444" strokeWidth="4" fill="none" strokeDasharray="5,5" className="animate-[dash_1s_linear_infinite]" />
                <path d="M 20% 70% C 40% 70%, 60% 70%, 80% 70%" stroke="#3b82f6" strokeWidth="4" fill="none" strokeDasharray="5,5" className="animate-[dash_1s_linear_infinite]" />
              </>
            )}

            {/* Aggregated Connections (Crossed) */}
            {mode === 'aggregated' && step >= 1 && (
              <path d="M 20% 30% C 40% 30%, 60% 70%, 80% 70%" stroke="#8b5cf6" strokeWidth="4" fill="none" className="animate-[dash_0.5s_linear_infinite]" />
            )}
            {mode === 'aggregated' && step >= 3 && (
              <path d="M 20% 70% C 40% 70%, 60% 30%, 80% 30%" stroke="#8b5cf6" strokeWidth="4" fill="none" className="animate-[dash_0.5s_linear_infinite]" />
            )}
         </svg>

         <div className="grid grid-cols-3 w-full max-w-2xl gap-4 md:gap-12 relative z-10 h-64">
            
            {/* LEFT COLUMN */}
            <div className="flex flex-col justify-around items-center">
               <span className="text-[10px] text-slate-400 font-bold absolute -top-4">Left Side</span>
               
               {/* Left A (Top) - Early */}
               <div className={`w-full h-14 rounded-lg border-2 flex items-center justify-center bg-white shadow-md transition-all duration-500 ${
                 step >= 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
               } border-red-200`}>
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-xs font-bold text-slate-600">Req A</span>
               </div>

               {/* Left B (Bottom) - Late */}
               <div className={`w-full h-14 rounded-lg border-2 flex items-center justify-center bg-white shadow-md transition-all duration-500 ${
                 step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
               } border-blue-200`}>
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-xs font-bold text-slate-600">Req B</span>
               </div>
            </div>

            {/* CENTER COLUMN (Repeater) */}
            <div className="flex items-center justify-center">
               <div className={`w-28 h-28 rounded-full bg-white border-4 flex flex-col items-center justify-center shadow-xl transition-all duration-300 z-10 ${
                 mode === 'dedicated' && step === 1 ? 'border-red-500 shadow-red-100' :
                 mode === 'aggregated' && step >= 1 ? 'border-green-500 shadow-green-100 scale-110' :
                 'border-slate-300'
               }`}>
                  {mode === 'dedicated' && step === 1 ? (
                    <AlertOctagon size={32} className="text-red-500 mb-1 animate-pulse" />
                  ) : mode === 'aggregated' && step >= 1 ? (
                    <ArrowRightLeft size={32} className="text-green-500 mb-1" />
                  ) : (
                    <GitMerge size={32} className="text-slate-400 mb-1" />
                  )}
                  
                  <span className="text-[10px] font-bold text-slate-600">Repeater</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded mt-1 ${
                    mode === 'dedicated' && step === 1 ? 'bg-red-100 text-red-700' :
                    mode === 'aggregated' && step >= 1 ? 'bg-green-100 text-green-700' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {mode === 'dedicated' && step === 1 ? 'BLOCKED' : mode === 'aggregated' && step >= 1 ? 'SWAPPING' : 'IDLE'}
                  </span>
               </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col justify-around items-center">
               <span className="text-[10px] text-slate-400 font-bold absolute -top-4">Right Side</span>

               {/* Right A (Top) - Late */}
               <div className={`w-full h-14 rounded-lg border-2 flex items-center justify-center bg-white shadow-md transition-all duration-500 ${
                 step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
               } border-red-200`}>
                  <span className="text-xs font-bold text-slate-600 mr-2">Req A</span>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
               </div>

               {/* Right B (Bottom) - Early */}
               <div className={`w-full h-14 rounded-lg border-2 flex items-center justify-center bg-white shadow-md transition-all duration-500 ${
                 step >= 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
               } border-blue-200`}>
                  <span className="text-xs font-bold text-slate-600 mr-2">Req B</span>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
               </div>
            </div>

         </div>

      </div>

      {/* Footer / Controls */}
      <div className="bg-white p-4 border-t border-slate-100 flex flex-col md:flex-row gap-4 items-center">
         
         <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${step === 1 && mode === 'dedicated' ? 'bg-red-500' : 'bg-blue-500'}`}>
                 Step {step + 1}
              </span>
              <h5 className="font-bold text-slate-800 text-sm">{info.title}</h5>
            </div>
            <p className="text-xs text-slate-500 leading-5 text-justify">
              {info.desc}
            </p>
         </div>

         <div className="flex gap-2 shrink-0 w-full md:w-auto">
            <button 
              onClick={goPrev} disabled={step === 0}
              className="flex-1 md:flex-none py-2 px-4 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <ChevronRight size={14} /> قبلی
            </button>
            <button 
              onClick={goNext} disabled={step === 3}
              className={`flex-1 md:flex-none py-2 px-4 rounded-lg text-white disabled:opacity-50 text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-sm ${
                mode === 'dedicated' ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'
              }`}
            >
              بعدی <ChevronLeft size={14} />
            </button>
         </div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>

    </div>
  );
};
