
import React, { useState } from 'react';
import { ArrowRight, Mail, GitMerge, Database, Calculator, ChevronLeft, ChevronRight, Binary } from 'lucide-react';

export const LazyTrackingDemo: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "۱. وضعیت اولیه (Initial State)",
      desc: "چهار گره داریم: Head (مبدا)، دو تکرارگر (R1, R2) و Tail (مقصد). لینک‌های فیزیکی برقرار شده‌اند.",
      math: "Pauli: N/A"
    },
    {
      title: "۲. سواپ ناهنگام در R2",
      desc: "گره R2 زودتر عملیات Swap را انجام می‌دهد. نتیجه (مثلاً '11') را در جدول محلی خود ذخیره می‌کند. هیچ پیام فوری ارسال نمی‌شود.",
      math: "R2 Log: 11"
    },
    {
      title: "۳. سواپ در R1",
      desc: "گره R1 عملیات Swap را انجام می‌دهد. نتیجه (مثلاً '01') را ذخیره می‌کند. اکنون مسیر فیزیکی باز است اما وضعیت آن نامشخص است.",
      math: "R1 Log: 01"
    },
    {
      title: "۴. ارسال پیام TRACK",
      desc: "گره مبدا (Head) پیام TRACK را با وضعیت اولیه '00' (بدون خطا) ارسال می‌کند تا وضعیت نهایی را محاسبه کند.",
      math: "Msg: 00"
    },
    {
      title: "۵. رسیدن به R1",
      desc: "پیام به R1 می‌رسد. پروتکل مقدار پیام ('00') را با رکورد ذخیره شده در R1 ('01') ترکیب (XOR) می‌کند.",
      math: "00 ⊕ 01 = 01"
    },
    {
      title: "۶. رسیدن به R2",
      desc: "پیام (که حالا حاوی '01' است) به R2 می‌رسد و با رکورد R2 ('11') ترکیب می‌شود.",
      math: "01 ⊕ 11 = 10"
    },
    {
      title: "۷. تحویل به مقصد (Tail)",
      desc: "پیام نهایی '10' به مقصد می‌رسد. این یعنی گره مقصد باید عملیات Pauli Z و Pauli X را روی کیوبیت خود اعمال کند تا خطا اصلاح شود.",
      math: "Final Correction: 10"
    }
  ];

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  // Visual State Calculation
  const r2HasRecord = step >= 1;
  const r1HasRecord = step >= 2;
  
  // Message Position Logic (percentage)
  const getMsgPos = () => {
    if (step < 3) return 10; // At Head
    if (step === 3) return 15; // Just left Head
    if (step === 4) return 38; // At R1
    if (step === 5) return 64; // At R2
    if (step >= 6) return 90; // At Tail
    return 0;
  };

  const getMsgValue = () => {
      if (step < 4) return "00";
      if (step === 4) return "00"; // Arriving at R1
      if (step === 5) return "01"; // Leaving R1 / Arriving R2
      if (step >= 6) return "10"; // Leaving R2 / At Tail
      return "00";
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden my-10 shadow-2xl text-white select-none flex flex-col">
      
      {/* Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <div className="bg-blue-600/20 text-blue-400 p-2 rounded-lg border border-blue-500/30">
             <GitMerge size={20} />
           </div>
           <div>
             <h4 className="font-bold text-blue-100 text-sm md:text-base">دموی ردیابی تنبل (Lazy Tracking)</h4>
             <p className="text-[10px] text-slate-400 hidden md:block">جمع‌آوری نتایج Swap به صورت ترتیبی در مسیر</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
             Step {step} / {steps.length - 1}
           </span>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="relative h-72 bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

        {/* Main Path Line */}
        <div className="absolute left-[15%] right-[15%] top-[60%] h-1 bg-slate-700 rounded-full z-0">
            {/* Active Path segment based on message */}
            <div 
                className="absolute left-0 top-0 h-full bg-blue-500/30 transition-all duration-1000 ease-linear"
                style={{ width: step >= 3 ? `${(getMsgPos()-10) * 1.25}%` : '0%' }}
            ></div>
        </div>

        {/* Nodes Container */}
        <div className="absolute inset-0 pointer-events-none">
            {/* Node Positioning: 10% (Head), 36% (R1), 62% (R2), 88% (Tail) approx based on visually pleasing spacing */}
            
            {/* HEAD */}
            <div className="absolute left-[10%] top-[60%] -translate-y-1/2 flex flex-col items-center z-10">
               <div className="w-12 h-12 bg-slate-800 border-2 border-slate-600 rounded-lg flex items-center justify-center shadow-lg relative z-20">
                 <span className="font-bold text-xs text-slate-400">Head</span>
               </div>
            </div>

            {/* R1 */}
            <div className="absolute left-[38%] top-[60%] -translate-y-1/2 flex flex-col items-center z-10">
               {/* Swap Record Bubble */}
               <div className={`absolute -top-20 transition-all duration-500 flex flex-col items-center ${r1HasRecord ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className={`bg-slate-800 text-white text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center gap-2 mb-1 transition-all ${step === 4 ? 'scale-125 bg-purple-900' : ''}`}>
                    <Database size={12} className="text-purple-400"/> 01
                  </div>
                  <div className="w-0.5 h-4 bg-purple-500/50"></div>
               </div>

               <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-20 bg-slate-900 ${r1HasRecord ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-slate-600'}`}>
                 <span className="font-bold text-xs text-slate-300">R1</span>
               </div>
            </div>

            {/* R2 */}
            <div className="absolute left-[64%] top-[60%] -translate-y-1/2 flex flex-col items-center z-10">
               {/* Swap Record Bubble */}
               <div className={`absolute -top-20 transition-all duration-500 flex flex-col items-center ${r2HasRecord ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className={`bg-slate-800 text-white text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center gap-2 mb-1 transition-all ${step === 5 ? 'scale-125 bg-purple-900' : ''}`}>
                    <Database size={12} className="text-purple-400"/> 11
                  </div>
                  <div className="w-0.5 h-4 bg-purple-500/50"></div>
               </div>

               <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-20 bg-slate-900 ${r2HasRecord ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-slate-600'}`}>
                 <span className="font-bold text-xs text-slate-300">R2</span>
               </div>
            </div>

            {/* TAIL */}
            <div className="absolute left-[90%] top-[60%] -translate-y-1/2 flex flex-col items-center z-10">
               <div className={`w-12 h-12 bg-slate-800 border-2 rounded-lg flex items-center justify-center shadow-lg z-20 transition-all ${step >= 6 ? 'border-green-500 shadow-[0_0_20px_#22c55e]' : 'border-slate-600'}`}>
                 <span className="font-bold text-xs text-slate-400">Tail</span>
               </div>
               {step === 6 && (
                 <div className="absolute -top-16 bg-green-600 text-white px-3 py-1.5 rounded-lg shadow-lg animate-[bounceIn_0.5s_ease-out] flex items-center gap-1 text-xs font-bold whitespace-nowrap">
                    <Binary size={14}/> Correct: 10
                 </div>
               )}
            </div>
        </div>

        {/* --- TRACK Message Animation --- */}
        <div 
             className="absolute top-[60%] -translate-y-1/2 z-30 transition-all duration-1000 ease-in-out flex flex-col items-center pointer-events-none"
             style={{ left: `${getMsgPos()}%`, opacity: step >= 3 ? 1 : 0 }}
        >
             <div className="relative">
                <div className="bg-blue-500 p-2.5 rounded-full shadow-[0_0_20px_#3b82f6] text-white relative z-10 border-2 border-white">
                   <Mail size={18} />
                </div>
             </div>
             
             {/* Carried State Label */}
             <div className="mt-3 bg-slate-950 border border-blue-500/50 px-2 py-1 rounded text-[10px] font-mono text-blue-200 shadow-lg whitespace-nowrap flex items-center gap-1">
               {getMsgValue()}
             </div>
        </div>

      </div>

      {/* Control Panel */}
      <div className="bg-slate-950 p-6 border-t border-slate-800 flex flex-col md:flex-row gap-6">
         
         {/* Info Text */}
         <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
               <span className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold border border-blue-400">{step}</span>
               <h5 className="font-bold text-blue-300 text-sm md:text-base">{steps[step].title}</h5>
            </div>
            <p className="text-sm text-slate-400 leading-7 text-justify h-16">
               {steps[step].desc}
            </p>
         </div>

         {/* Math & Buttons */}
         <div className="flex flex-col gap-3 min-w-[220px]">
            
            {/* Calculation Display */}
            <div className="bg-slate-900 rounded-lg border border-slate-800 p-3 flex items-center justify-between shadow-inner">
               <div className="flex items-center gap-2 text-slate-500">
                  <Calculator size={16} />
                  <span className="text-xs font-bold">Logic:</span>
               </div>
               <span className="font-mono text-sm font-bold text-green-400 tracking-wider">
                 {steps[step].math}
               </span>
            </div>

            <div className="flex gap-2">
               <button 
                 onClick={prevStep}
                 disabled={step === 0}
                 className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-1 border border-slate-700"
               >
                 <ChevronRight size={14}/> قبلی
               </button>
               <button 
                 onClick={nextStep}
                 disabled={step === steps.length - 1}
                 className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-slate-800 text-white rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-lg shadow-blue-900/20"
               >
                 بعدی <ChevronLeft size={14}/>
               </button>
            </div>
         </div>

      </div>

      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
