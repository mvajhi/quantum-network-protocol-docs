import React, { useState } from 'react';
import { Mail, Radio, RotateCw, CheckCircle2, ChevronLeft, ChevronRight, MessageSquare, Globe } from 'lucide-react';

export const ClassicalDependency: React.FC = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const steps = [
    {
      title: "۱. اندازه‌گیری بل (Bell Measurement)",
      desc: "تکرارگر (B) عملیات Swapping را انجام می‌دهد. این یک عملیات کوانتومی است که باعث می‌شود دو لینک کوتاه از بین رفته و یک لینک بلند ایجاد شود. اما یک مشکل بزرگ وجود دارد: نتیجه این عملیات تصادفی است!",
      icon: <Radio size={20} />
    },
    {
      title: "۲. وضعیت درهم‌ریخته (Mixed State)",
      desc: "در این لحظه، گره‌های انتهایی (A و C) درهم‌تنیده شده‌اند، اما نمی‌دانند «چگونه». آن‌ها نمی‌دانند کیوبیت‌شان در کدام یک از ۴ حالت ممکن قرار دارد. بدون دانستن این موضوع، اطلاعات آن‌ها کاملاً بی‌معنی و تصادفی است (مثل نویز).",
      icon: <Globe size={20} />
    },
    {
      title: "۳. ارسال پیام کلاسیک",
      desc: "گره B نتیجه اندازه‌گیری خود را (مثلاً دو بیت '01') از طریق اینترنت معمولی (کلاسیک) برای A و C می‌فرستد. این پیام حاوی دستورالعمل اصلاح است.",
      icon: <MessageSquare size={20} />
    },
    {
      title: "۴. اصلاح و استفاده",
      desc: "گره A و C پیام را دریافت می‌کنند. بر اساس آن، یک چرخش خاص (گیت پائولی) روی کیوبیت خود اعمال می‌کنند. حالا حالت کوانتومی دقیقاً همان چیزی است که باید باشد و قابل استفاده است.",
      icon: <CheckCircle2 size={20} />
    }
  ];

  return (
    <div className="bg-white p-0 rounded-xl border border-slate-200 my-8 overflow-hidden shadow-sm">
      
      {/* Header / Progress Bar */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
        <h4 className="font-bold text-slate-800 text-sm md:text-base">وابستگی به شبکه کلاسیک</h4>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i <= step ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        
        {/* Left: Visuals */}
        <div className="flex-1 p-8 bg-slate-50/50 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

            <div className="flex justify-between w-full max-w-md relative z-10">
                {/* Node A */}
                <div className="flex flex-col items-center gap-2 transition-all duration-500" style={{ opacity: step >= 3 ? 1 : 0.7 }}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold border-2 shadow-sm bg-white ${step === 3 ? 'border-green-500 text-green-600' : 'border-slate-300 text-slate-700'}`}>
                    A
                    {step === 3 && <RotateCw size={16} className="absolute -top-2 -right-2 bg-white text-green-500 rounded-full" />}
                  </div>
                </div>

                {/* Repeater B */}
                <div className="flex flex-col items-center gap-2">
                   <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold border-4 shadow-md transition-all duration-500 ${
                     step === 0 ? 'bg-purple-100 border-purple-500 animate-pulse' : 'bg-slate-100 border-slate-300 text-slate-400'
                   }`}>
                     B
                   </div>
                   {step >= 2 && (
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-between px-14 pointer-events-none">
                        <div className="p-1 bg-blue-500 text-white rounded shadow-lg animate-[slideOut_1s_ease-out_forwards]">
                          <Mail size={12} />
                        </div>
                        <div className="p-1 bg-blue-500 text-white rounded shadow-lg animate-[slideOutRight_1s_ease-out_forwards]">
                          <Mail size={12} />
                        </div>
                     </div>
                   )}
                </div>

                {/* Node C */}
                <div className="flex flex-col items-center gap-2 transition-all duration-500" style={{ opacity: step >= 3 ? 1 : 0.7 }}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold border-2 shadow-sm bg-white ${step === 3 ? 'border-green-500 text-green-600' : 'border-slate-300 text-slate-700'}`}>
                    C
                     {step === 3 && <RotateCw size={16} className="absolute -top-2 -right-2 bg-white text-green-500 rounded-full" />}
                  </div>
                </div>
            </div>

            {/* Connection Lines */}
            <div className="absolute top-1/2 left-[15%] right-[15%] h-1 -translate-y-1/2 -z-0">
               {step === 0 && (
                 <div className="w-full h-full flex gap-2">
                   <div className="flex-1 bg-purple-300 rounded-full"></div>
                   <div className="flex-1 bg-purple-300 rounded-full"></div>
                 </div>
               )}
               {step > 0 && (
                 <div className={`w-full h-full rounded-full transition-all duration-500 ${
                   step === 3 ? 'bg-green-400 shadow-[0_0_15px_#4ade80]' : 'bg-slate-300 border-t-2 border-dashed border-slate-400'
                 }`}></div>
               )}
            </div>
        </div>

        {/* Right: Controls & Text */}
        <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-r border-slate-200 p-6 flex flex-col justify-between bg-white">
           <div>
             <div className="flex items-center gap-2 mb-4 text-blue-600">
               {steps[step].icon}
               <h5 className="font-bold text-sm">{steps[step].title}</h5>
             </div>
             <p className="text-sm text-slate-600 leading-7 text-justify">
               {steps[step].desc}
             </p>
           </div>

           <div className="flex gap-3 mt-8">
             <button 
               onClick={prevStep} disabled={step === 0}
               className="flex-1 py-2 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-600 text-sm font-bold flex items-center justify-center gap-2"
             >
               <ChevronRight size={16}/> قبلی
             </button>
             <button 
               onClick={nextStep} disabled={step === 3}
               className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
             >
               بعدی <ChevronLeft size={16}/>
             </button>
           </div>
        </div>

      </div>
      
      <style>{`
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-60px); opacity: 0; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(60px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};