
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, RefreshCcw, CheckCircle2, XCircle, Activity, Binary, ChevronLeft, ChevronRight, PlayCircle, RotateCcw } from 'lucide-react';

export const DistillationProcess: React.FC = () => {
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState<'success' | 'failure'>('success');

  const steps = [
    {
      id: 0,
      title: "۱. وضعیت اولیه (Mixed States)",
      desc: "دو جفت درهم‌تنیده داریم. جفت بالا (A) را می‌خواهیم خالص‌سازی کنیم و جفت پایین (B) را قربانی خواهیم کرد. هر دو دارای نویز هستند (به صورت هاله مات نمایش داده شده).",
    },
    {
      id: 1,
      title: "۲. اعمال گیت CNOT محلی",
      desc: "آلیس و باب هر کدام روی کیوبیت‌های خودشان عملیات CNOT را انجام می‌دهند. جفت A نقش «کنترل» (نقطه توپر) و جفت B نقش «هدف» (ضربدر) را دارد.",
    },
    {
      id: 2,
      title: "۳. اندازه‌گیری جفت قربانی",
      desc: "جفت پایین (B) در پایه Z اندازه‌گیری می‌شود. این کار ماهیت کوانتومی آن را از بین می‌برد و به بیت‌های کلاسیک (0 یا 1) تبدیل می‌کند.",
    },
    {
      id: 3,
      title: "۴. مقایسه نتایج (Compare)",
      desc: "نتایج اندازه‌گیری از طریق کانال کلاسیک مقایسه می‌شوند. آیا بیت‌های آلیس و باب یکسان هستند؟",
    },
    {
      id: 4,
      title: "۵. نتیجه نهایی (Final Outcome)",
      desc: scenario === 'success' 
        ? "نتایج یکسان بودند! این یعنی خطاهای احتمالی شناسایی و حذف شده‌اند. جفت A اکنون شفاف‌تر و خالص‌تر (Fidelity بالا) شده است."
        : "نتایج متفاوت بودند! این نشان‌دهنده وجود خطا است. عملیات شکست خورده و جفت A نیز باید دور ریخته شود."
    }
  ];

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));
  const reset = () => setStep(0);

  // Helper for Qubit Visuals
  const Qubit = ({ type, label, isNoisy, isMeasured, val, isDiscarded, isPurified }: any) => (
    <div className={`relative flex flex-col items-center transition-all duration-700 ${isDiscarded ? 'opacity-20 grayscale' : 'opacity-100'}`}>
       {/* The Orb */}
       <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-inner relative overflow-hidden transition-all duration-1000
          ${isMeasured 
            ? 'bg-slate-800 border-slate-600' 
            : type === 'A' 
              ? (isPurified ? 'bg-blue-500 border-blue-300 shadow-[0_0_25px_#3b82f6]' : 'bg-blue-600/60 border-blue-400/50') 
              : 'bg-purple-600/60 border-purple-400/50'
          }
       `}>
          {/* Internal Noise Effect */}
          {!isMeasured && !isPurified && (
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 animate-pulse"></div>
          )}
          
          {/* Purified Shine */}
          {isPurified && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/30 animate-pulse"></div>
          )}

          {/* Content */}
          {isMeasured ? (
             <span className="text-xl font-mono font-bold text-slate-200 animate-in zoom-in">{val}</span>
          ) : (
             <span className="text-xs font-bold text-white z-10">{label}</span>
          )}
       </div>

       {/* Status Badge */}
       {isPurified && <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-lg animate-bounce">PURE</div>}
       {isDiscarded && <div className="absolute inset-0 flex items-center justify-center"><XCircle className="text-red-500 w-12 h-12 opacity-80" /></div>}
    </div>
  );

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl my-10 overflow-hidden select-none" dir="rtl">
      
      {/* Controls Header */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
           <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
             <Activity size={20} />
           </div>
           <div>
             <h4 className="font-bold text-slate-200 text-sm">آزمایشگاه تقطیر درهم‌تنیدگی</h4>
             <p className="text-[10px] text-slate-500">BBPSSW Protocol Simulation</p>
           </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
           <button 
             onClick={() => { setScenario('success'); setStep(0); }}
             className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${scenario === 'success' ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' : 'text-slate-500 hover:text-slate-300'}`}
           >
             سناریو موفق (Match)
           </button>
           <button 
             onClick={() => { setScenario('failure'); setStep(0); }}
             className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${scenario === 'failure' ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-slate-500 hover:text-slate-300'}`}
           >
             سناریو شکست (Mismatch)
           </button>
        </div>
      </div>

      {/* Main Stage */}
      <div className="relative h-[350px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
         
         {/* Vertical Divider (Distance) */}
         <div className="absolute top-4 bottom-4 left-1/2 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent border-r border-dashed border-slate-800/50"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-slate-600 text-[9px] px-2 py-1 rounded border border-slate-800">
           Classical Channel
         </div>

         {/* Labels */}
         <div className="absolute top-4 right-8 text-slate-400 font-bold text-sm flex flex-col items-center">
            <span>آلیس (Alice)</span>
            <span className="text-[9px] opacity-50">Start Node</span>
         </div>
         <div className="absolute top-4 left-8 text-slate-400 font-bold text-sm flex flex-col items-center">
            <span>باب (Bob)</span>
            <span className="text-[9px] opacity-50">End Node</span>
         </div>

         {/* --- ROW 1: Target Pair (A) --- */}
         <div className="absolute top-[30%] w-full px-16 md:px-32 flex justify-between items-center z-20">
            {/* Alice A */}
            <div className="relative group">
               <Qubit 
                 type="A" label="A1" 
                 isNoisy={step < 4} 
                 isPurified={step === 4 && scenario === 'success'} 
                 isDiscarded={step === 4 && scenario === 'failure'}
               />
               {/* CNOT Control Dot */}
               {step >= 1 && step < 3 && (
                 <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_white] z-30"></div>
               )}
            </div>

            {/* Link A */}
            <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-1000 relative
               ${step === 4 && scenario === 'success' ? 'bg-blue-400 shadow-[0_0_20px_#3b82f6] h-2' : 'bg-blue-900/30'}
               ${step === 4 && scenario === 'failure' ? 'opacity-0' : 'opacity-100'}
            `}>
               {step < 4 && <div className="absolute inset-0 bg-blue-500/20 animate-pulse"></div>}
            </div>

            {/* Bob A */}
            <div className="relative group">
               <Qubit 
                 type="A" label="A2" 
                 isNoisy={step < 4} 
                 isPurified={step === 4 && scenario === 'success'}
                 isDiscarded={step === 4 && scenario === 'failure'}
               />
               {/* CNOT Control Dot */}
               {step >= 1 && step < 3 && (
                 <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_white] z-30"></div>
               )}
            </div>
         </div>

         {/* --- ROW 2: Sacrifice Pair (B) --- */}
         <div className="absolute top-[65%] w-full px-16 md:px-32 flex justify-between items-center z-20">
            {/* Alice B */}
            <div className="relative">
               <Qubit 
                 type="B" label="B1" 
                 isNoisy={true} 
                 isMeasured={step >= 2}
                 val="0"
               />
               {/* CNOT Target (X) */}
               {step >= 1 && step < 2 && (
                 <div className="absolute left-1/2 top-1/2 w-8 h-8 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30 bg-slate-900/50 backdrop-blur-sm">
                    <div className="w-full h-0.5 bg-white"></div>
                    <div className="h-full w-0.5 bg-white absolute"></div>
                 </div>
               )}
            </div>

            {/* Link B */}
            <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${step >= 2 ? 'opacity-0' : 'bg-purple-900/30'}`}></div>

            {/* Bob B */}
            <div className="relative">
               <Qubit 
                 type="B" label="B2" 
                 isNoisy={true} 
                 isMeasured={step >= 2}
                 val={scenario === 'success' ? "0" : "1"}
               />
               {/* CNOT Target (X) */}
               {step >= 1 && step < 2 && (
                 <div className="absolute left-1/2 top-1/2 w-8 h-8 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30 bg-slate-900/50 backdrop-blur-sm">
                    <div className="w-full h-0.5 bg-white"></div>
                    <div className="h-full w-0.5 bg-white absolute"></div>
                 </div>
               )}
            </div>
         </div>

         {/* --- CNOT Vertical Lines --- */}
         {step === 1 && (
           <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {/* Alice Side */}
              <line x1="15%" y1="35%" x2="15%" y2="65%" stroke="white" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
              {/* Bob Side */}
              <line x1="85%" y1="35%" x2="85%" y2="65%" stroke="white" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
              
              {/* Adjust positions based on screen size? Hardcoded for now assuming standard centered layout */}
              {/* Better to use absolute divs for responsiveness */}
           </svg>
         )}
         
         {/* Responsive Lines via Divs */}
         {step === 1 && (
            <>
              <div className="absolute right-[calc(4rem+1.5rem)] top-[calc(30%+1.5rem)] bottom-[calc(35%-1.5rem)] w-0.5 bg-gradient-to-b from-white to-white/50 md:right-[calc(8rem+1.5rem)]"></div>
              <div className="absolute left-[calc(4rem+1.5rem)] top-[calc(30%+1.5rem)] bottom-[calc(35%-1.5rem)] w-0.5 bg-gradient-to-b from-white to-white/50 md:left-[calc(8rem+1.5rem)]"></div>
            </>
         )}


         {/* --- Classical Communication (Step 3) --- */}
         {step === 3 && (
           <div className="absolute top-[75%] left-0 right-0 h-10 flex justify-center items-center">
              {/* Msg from Alice (Right) */}
              <div className="absolute right-[25%] bg-slate-800 text-white border border-slate-600 px-3 py-1 rounded-full text-xs flex items-center gap-2 animate-[moveToCenterRight_1s_ease-in-out_forwards]">
                 <Binary size={12} className="text-green-400"/> bit: 0
              </div>
              {/* Msg from Bob (Left) */}
              <div className="absolute left-[25%] bg-slate-800 text-white border border-slate-600 px-3 py-1 rounded-full text-xs flex items-center gap-2 animate-[moveToCenterLeft_1s_ease-in-out_forwards]">
                 <Binary size={12} className={scenario === 'success' ? "text-green-400" : "text-red-400"}/> bit: {scenario === 'success' ? '0' : '1'}
              </div>
           </div>
         )}

         {/* --- Result Overlay (Step 4) --- */}
         {step === 4 && (
           <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
              <div className={`bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border-2 shadow-2xl flex flex-col items-center animate-in zoom-in fade-in duration-300 ${scenario === 'success' ? 'border-green-500 shadow-green-900/20' : 'border-red-500 shadow-red-900/20'}`}>
                 {scenario === 'success' ? (
                    <>
                      <CheckCircle2 size={48} className="text-green-500 mb-2" />
                      <h3 className="text-xl font-bold text-white">موفقیت (Success)</h3>
                      <p className="text-slate-400 text-sm mt-1">فیدلیتی افزایش یافت</p>
                    </>
                 ) : (
                    <>
                      <XCircle size={48} className="text-red-500 mb-2" />
                      <h3 className="text-xl font-bold text-white">شکست (Failure)</h3>
                      <p className="text-slate-400 text-sm mt-1">هر دو جفت دور ریخته شدند</p>
                    </>
                 )}
              </div>
           </div>
         )}

      </div>

      {/* Footer / Navigation */}
      <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col gap-4">
         
         <div className="flex items-start gap-3">
            <div className="bg-slate-800 text-slate-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1 border border-slate-700">
              {step + 1}
            </div>
            <div className="flex-1">
               <h5 className="font-bold text-white text-sm mb-1">{steps[step].title}</h5>
               <p className="text-sm text-slate-400 leading-6 text-justify">{steps[step].desc}</p>
            </div>
         </div>

         <div className="flex gap-3 mt-2">
            <button 
              onClick={prevStep} disabled={step === 0}
              className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-slate-700"
            >
              <ChevronRight size={16} /> قبلی
            </button>
            
            {step < 4 ? (
               <button 
                 onClick={nextStep}
                 className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
               >
                 مرحله بعد <ChevronLeft size={16} />
               </button>
            ) : (
               <button 
                 onClick={reset}
                 className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
               >
                 <RotateCcw size={16} /> تکرار
               </button>
            )}
         </div>

      </div>

      <style>{`
        @keyframes moveToCenterRight {
           0% { right: 25%; opacity: 0; transform: scale(0.8); }
           20% { opacity: 1; }
           100% { right: 45%; opacity: 0; transform: scale(1.2); }
        }
        @keyframes moveToCenterLeft {
           0% { left: 25%; opacity: 0; transform: scale(0.8); }
           20% { opacity: 1; }
           100% { left: 45%; opacity: 0; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};
