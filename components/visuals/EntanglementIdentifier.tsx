import React, { useState } from 'react';
import { Fingerprint, ArrowDown, Network, Layers, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export const EntanglementIdentifier: React.FC = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const steps = [
    {
      title: "۱. درخواست اپلیکیشن",
      desc: "اپلیکیشن‌های A و B درخواست اتصال می‌کنند. آن‌ها از جزئیات شبکه بی‌خبرند و فقط می‌خواهند به هم وصل شوند.",
    },
    {
      title: "۲. لایه فیزیکی (تولید لینک)",
      desc: "سخت‌افزار شروع به کار می‌کند. فوتون‌ها شلیک می‌شوند و لینک‌های کوتاه درهم‌تنیده بین گره‌ها و تکرارگر ایجاد می‌شود.",
    },
    {
      title: "۳. لایه شبکه (عملیات Swap)",
      desc: "تکرارگر عملیات Swap را انجام می‌دهد. حالا اتصال فیزیکی End-to-End برقرار شده است. اما اپلیکیشن هنوز خبر ندارد.",
    },
    {
      title: "۴. لایه منطقی (تحویل شناسه)",
      desc: "پروتکل به هر دو اپلیکیشن یک شناسه (ID) یکسان تحویل می‌دهد. این شناسه به آن‌ها می‌گوید: «کیوبیت شما با کیوبیت طرف مقابل که همین شناسه را دارد، جفت است».",
    }
  ];

  return (
    <div className="my-10 select-none px-2">
      <div className="bg-slate-900 text-white rounded-2xl p-1 border border-slate-700 shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Title Bar */}
        <div className="bg-slate-800/80 px-6 py-3 border-b border-slate-700 flex justify-between items-center backdrop-blur-sm z-20 relative">
           <h4 className="font-bold text-blue-300 flex items-center gap-2 text-sm md:text-base">
             <Layers size={18} />
             انتزاع شبکه: لایه فیزیکی vs لایه منطقی
           </h4>
           <span className="text-xs font-mono text-slate-500 px-2 py-1 bg-slate-900 rounded border border-slate-700">
             Step {step + 1}/4
           </span>
        </div>

        <div className="p-6 md:p-10 relative z-10 flex flex-col gap-16">
          
          {/* --- LAYER 1: LOGICAL (Top) --- */}
          <div className={`relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl border transition-all duration-700 p-6 md:h-32 flex items-center justify-between shadow-lg ${step === 3 ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-slate-700'}`}>
             <div className="absolute -top-3 left-4 bg-blue-600 px-3 py-0.5 rounded-full text-[10px] md:text-xs text-white font-bold shadow-sm tracking-wider uppercase">
               Logical Layer (App View)
             </div>

             {/* SVG Overlay for Link */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Logical Link Line */}
                <line 
                  x1="15%" y1="50%" x2="85%" y2="50%" 
                  stroke={step === 3 ? "#3b82f6" : "#1e293b"} 
                  strokeWidth={step === 3 ? "3" : "1"}
                  strokeDasharray={step === 3 ? "0" : "5,5"}
                  className="transition-all duration-700"
                />
             </svg>

             {/* App Node A */}
             <div className="relative z-10 flex flex-col items-center gap-2 w-[20%]">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-blue-400">
                   <span className="font-bold text-sm md:text-base">App A</span>
                </div>
                <div className={`bg-slate-800 text-green-400 text-[9px] md:text-[10px] font-mono px-2 py-1 rounded border border-slate-600 transition-all duration-500 ${step === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                   ID: #8F3A
                </div>
             </div>

             {/* Logical Pair Info (Center) */}
             <div className="relative z-10 flex-1 flex justify-center h-full items-center">
                <div className={`bg-slate-900/90 border border-blue-500/50 px-4 py-2 rounded-full backdrop-blur flex items-center gap-3 transition-all duration-500 transform ${step === 3 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                   <div className="bg-blue-500/20 p-1.5 rounded-full text-blue-400">
                     <Fingerprint size={16} />
                   </div>
                   <div className="flex flex-col text-left">
                     <span className="text-[10px] text-slate-400 uppercase tracking-wider">Entanglement ID</span>
                     <span className="text-xs md:text-sm font-mono font-bold text-blue-100">#8F3A-2991</span>
                   </div>
                </div>
             </div>

             {/* App Node B */}
             <div className="relative z-10 flex flex-col items-center gap-2 w-[20%]">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-blue-400">
                   <span className="font-bold text-sm md:text-base">App B</span>
                </div>
                 <div className={`bg-slate-800 text-green-400 text-[9px] md:text-[10px] font-mono px-2 py-1 rounded border border-slate-600 transition-all duration-500 ${step === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                   ID: #8F3A
                </div>
             </div>
          </div>


          {/* --- SEPARATOR --- */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
             <div className="bg-slate-900 border border-slate-600 p-2 rounded-full shadow-xl text-slate-400">
               <ArrowDown size={20} className={step > 0 && step < 3 ? "animate-bounce" : ""} />
             </div>
          </div>


          {/* --- LAYER 2: PHYSICAL (Bottom) --- */}
          <div className={`relative bg-slate-950/50 rounded-xl border p-6 md:h-32 flex items-center justify-between shadow-inner transition-all duration-700 ${step >= 1 ? 'border-purple-900/50' : 'border-transparent'}`}>
             <div className="absolute -top-3 left-4 bg-purple-700 px-3 py-0.5 rounded-full text-[10px] md:text-xs text-white font-bold shadow-sm tracking-wider uppercase">
               Physical Layer (Hardware)
             </div>

             {/* SVG for Physical Links */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Left Link */}
                <line 
                  x1="15%" y1="50%" x2="50%" y2="50%" 
                  stroke="#a855f7" 
                  strokeWidth="2"
                  strokeOpacity={step >= 1 ? "1" : "0.1"}
                  className="transition-all duration-500"
                />
                {/* Right Link */}
                <line 
                  x1="50%" y1="50%" x2="85%" y2="50%" 
                  stroke="#a855f7" 
                  strokeWidth="2"
                  strokeOpacity={step >= 1 ? "1" : "0.1"}
                  className="transition-all duration-500"
                />
             </svg>

             {/* Node A Hardware */}
             <div className="relative z-10 flex flex-col items-center gap-2 w-[20%]">
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center">
                 <span className="text-xs font-bold text-purple-300">Node A</span>
               </div>
               {/* Qubit */}
               <div className={`w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15] transition-all duration-300 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
             </div>

             {/* Repeater Hardware */}
             <div className="relative z-10 flex flex-col items-center justify-center w-[20%]">
               <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${step === 2 ? 'bg-purple-600 border-white shadow-[0_0_20px_rgba(168,85,247,0.6)]' : 'bg-slate-900 border-purple-900 text-slate-600'}`}>
                  {step === 2 ? <Network className="animate-spin-slow" /> : <span className="text-[10px]">Repeater</span>}
               </div>
             </div>

             {/* Node B Hardware */}
             <div className="relative z-10 flex flex-col items-center gap-2 w-[20%]">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center">
                 <span className="text-xs font-bold text-purple-300">Node B</span>
               </div>
               {/* Qubit */}
               <div className={`w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15] transition-all duration-300 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
             </div>

          </div>

        </div>
        
        {/* Control Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
             <h5 className="text-blue-400 font-bold text-sm mb-1">{steps[step].title}</h5>
             <p className="text-xs text-slate-400 leading-5">{steps[step].desc}</p>
          </div>
          
          <div className="flex gap-2 shrink-0">
             <button 
               onClick={prevStep} disabled={step === 0}
               className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-lg text-white text-xs font-bold flex items-center gap-2 transition-colors"
             >
               <ChevronRight size={14} /> قبلی
             </button>
             <button 
               onClick={nextStep} disabled={step === 3}
               className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg text-white text-xs font-bold flex items-center gap-2 transition-colors"
             >
               بعدی <ChevronLeft size={14} />
             </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};