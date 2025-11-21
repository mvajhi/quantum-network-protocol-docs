
import React, { useState } from 'react';
import { Play, CheckCircle2, RefreshCcw, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, MessageSquare, Zap, GitMerge, CheckSquare } from 'lucide-react';

export const ProtocolCycle: React.FC = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const stepsInfo = [
    {
      title: "۰. وضعیت آماده‌باش (Idle)",
      desc: "مدار مجازی (VC) از قبل توسط پروتکل سیگنالینگ نصب شده است. گره‌ها جداول مسیریابی خود را دریافت کرده‌اند و آماده دریافت درخواست هستند. منابع سخت‌افزاری رزرو شده‌اند اما هنوز هیچ فوتونی شلیک نشده است.",
      icon: <CheckSquare size={20} className="text-slate-400"/>
    },
    {
      title: "۱. دریافت درخواست (Trigger)",
      desc: "یک درخواست از سمت کاربر (Application) به گره ابتدایی (Head-end) می‌رسد. این درخواست شامل شناسه مقصد و پارامترهای کیفیت سرویس (QoS) مورد نیاز است.",
      icon: <Play size={20} className="text-blue-500"/>
    },
    {
      title: "۲. پیام FORWARD (شروع)",
      desc: "گره Head-end بلافاصله یک پیام کلاسیک سریع به نام FORWARD را در طول مسیر به سمت پایین‌دست می‌فرستد. این پیام حکم «شلیک شروع» مسابقه را دارد و شناسه درخواست (Request ID) را به همه گره‌ها ابلاغ می‌کند.",
      icon: <ArrowRight size={20} className="text-blue-500"/>
    },
    {
      title: "۳. تولید موازی (Link Generation)",
      desc: "نکته کلیدی QNP: گره‌ها منتظر رسیدن نوبت نمی‌مانند! به محض دریافت پیام FORWARD، تمام لینک‌های مسیر به صورت موازی (همزمان) شروع به تولید درهم‌تنیدگی می‌کنند. این کار تاخیر را به حداقل می‌رساند.",
      icon: <Zap size={20} className="text-yellow-500"/>
    },
    {
      title: "۴. عملیات سواپ (Swapping)",
      desc: "تکرارگر میانی (R1) وضعیت لینک‌های چپ و راست خود را پایش می‌کند. به محض اینکه هر دو لینک آماده شدند، عملیات Swap را انجام می‌دهد. هیچ هماهنگی اضافی با گره‌های انتهایی در این لحظه لازم نیست (تصمیم محلی).",
      icon: <GitMerge size={20} className="text-purple-500"/>
    },
    {
      title: "۵. پیام‌های TRACK (پایان)",
      desc: "نتیجه عملیات Swap (مثلاً اینکه نتیجه 01 شد یا 11) باید به اطلاع طرفین برسد. تکرارگر پیام‌های TRACK را به سمت بالا و پایین می‌فرستد. با رسیدن این پیام‌ها، اتصال End-to-End کامل و قابل استفاده می‌شود.",
      icon: <MessageSquare size={20} className="text-green-500"/>
    }
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 my-10 select-none overflow-hidden text-white shadow-2xl">
      
      {/* Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <RefreshCcw size={20} className="text-white" />
          </div>
          <div>
            <h4 className="font-bold text-base md:text-lg text-blue-100">چرخه عملیاتی پروتکل (QNP Cycle)</h4>
            <p className="text-[10px] md:text-xs text-slate-400">شبیه‌سازی گام‌به‌گام نحوه برقراری اتصال</p>
          </div>
        </div>
        <div className="text-xs font-mono bg-slate-800 px-3 py-1 rounded-full text-slate-300 border border-slate-700">
          Step {step} / 5
        </div>
      </div>

      {/* Visualization Stage */}
      <div className="relative h-60 bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden">
        
        {/* Background Grid/Line */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute left-10 right-10 h-0.5 bg-slate-700 top-1/2 -translate-y-1/2 z-0"></div>

        {/* --- Nodes --- */}
        <div className="relative w-full max-w-2xl flex justify-between px-10 z-10">
            
            {/* Head Node */}
            <div className="flex flex-col items-center gap-3 relative group">
               <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 shadow-lg transition-all duration-500 ${step >= 1 ? 'border-blue-500 bg-slate-800 text-white' : 'border-slate-600 bg-slate-900 text-slate-500'}`}>
                 <span className="font-bold">Head</span>
               </div>
               {step === 1 && <div className="absolute -top-10 bg-blue-600 text-white text-xs px-3 py-1 rounded-full animate-bounce shadow-lg">Request!</div>}
               {step === 5 && <div className="absolute -top-10 bg-green-600 text-white text-xs px-3 py-1 rounded-full animate-fade-in shadow-lg flex items-center gap-1"><CheckCircle2 size={12}/> Connected</div>}
            </div>

            {/* Repeater Node */}
            <div className="flex flex-col items-center justify-center relative">
               <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 z-20 bg-slate-900 ${step === 4 ? 'border-purple-500 scale-125 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'border-slate-600'}`}>
                 <span className="text-xs font-mono text-slate-400">R1</span>
               </div>
               {step === 4 && <span className="absolute -top-8 text-purple-400 font-bold text-xs animate-pulse whitespace-nowrap">SWAP OPERATION</span>}
            </div>

            {/* Tail Node */}
            <div className="flex flex-col items-center gap-3 relative group">
               <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 shadow-lg transition-all duration-500 ${step >= 2 ? 'border-blue-500 bg-slate-800 text-white' : 'border-slate-600 bg-slate-900 text-slate-500'}`}>
                 <span className="font-bold">Tail</span>
               </div>
               {step === 5 && <div className="absolute -top-10 bg-green-600 text-white text-xs px-3 py-1 rounded-full animate-fade-in shadow-lg flex items-center gap-1"><CheckCircle2 size={12}/> Connected</div>}
            </div>
        </div>

        {/* --- Dynamic Elements (Animations) --- */}

        {/* Step 2: FORWARD Message (Head -> Tail) */}
        <div className={`absolute top-1/2 -translate-y-1/2 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_#3b82f6] text-white z-20 transition-all duration-1000 ease-in-out ${
            step === 2 ? 'left-[80%] opacity-100' : step > 2 ? 'left-[80%] opacity-0' : 'left-[15%] opacity-0'
        }`}>
           <ArrowRight size={16} />
        </div>

        {/* Step 3: Parallel Generation Links */}
        {step >= 3 && step < 5 && (
            <>
              {/* Left Link */}
              <div className={`absolute top-1/2 -translate-y-1/2 h-1 bg-blue-500 transition-all duration-500 ${step >= 3 ? 'left-[20%] right-[50%] opacity-100 shadow-[0_0_10px_#3b82f6]' : 'left-[20%] right-[80%] opacity-0'}`}></div>
              {/* Right Link */}
              <div className={`absolute top-1/2 -translate-y-1/2 h-1 bg-blue-500 transition-all duration-500 ${step >= 3 ? 'left-[50%] right-[20%] opacity-100 shadow-[0_0_10px_#3b82f6]' : 'left-[80%] right-[20%] opacity-0'}`}></div>
            </>
        )}

        {/* Step 4: Entanglement Swapped (Purple Lines) */}
        {step >= 4 && (
           <div className="absolute top-1/2 -translate-y-1/2 left-[20%] right-[20%] h-1 bg-purple-500/50 transition-all duration-500 z-0"></div>
        )}

        {/* Step 5: TRACK Messages & Final Connection */}
        {step === 5 && (
           <>
             {/* Messages going out */}
             <div className="absolute top-1/2 -translate-y-1/2 left-[25%] animate-ping opacity-75"><MessageSquare size={16} className="text-green-500"/></div>
             <div className="absolute top-1/2 -translate-y-1/2 right-[25%] animate-ping opacity-75"><MessageSquare size={16} className="text-green-500"/></div>
             
             {/* Final Green Link */}
             <div className="absolute top-1/2 -translate-y-1/2 left-[20%] right-[20%] h-1.5 bg-green-500 shadow-[0_0_15px_#22c55e] z-10 animate-pulse"></div>
           </>
        )}

      </div>

      {/* Controls & Explanations */}
      <div className="bg-slate-900 p-6 border-t border-slate-800 flex flex-col md:flex-row gap-6">
        
        {/* Info Box */}
        <div className="flex-1">
           <div className="flex items-center gap-2 mb-3">
             {stepsInfo[step].icon}
             <h4 className="font-bold text-lg text-white">{stepsInfo[step].title}</h4>
           </div>
           <div className="h-24 md:h-20">
             <p className="text-sm text-slate-300 leading-7 text-justify border-l-2 border-slate-700 pl-4">
               {stepsInfo[step].desc}
             </p>
           </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row md:flex-col gap-3 justify-center shrink-0 min-w-[140px]">
           <button 
             onClick={nextStep} 
             disabled={step === 5}
             className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
           >
             مرحله بعد <ChevronLeft size={18} />
           </button>
           
           <button 
             onClick={prevStep} 
             disabled={step === 0}
             className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-slate-700"
           >
             <ChevronRight size={18} /> قبلی
           </button>
        </div>

      </div>
    </div>
  );
};
