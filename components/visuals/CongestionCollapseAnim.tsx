
import React, { useState, useEffect } from 'react';
import { Lock, RotateCcw, Trash2 } from 'lucide-react';

export const CongestionCollapseAnim: React.FC = () => {
  // 4 Memory Slots
  // Colors represent VCs: Red, Blue, Green, Yellow
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null, null]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [step, setStep] = useState(0);

  // Simulation Scenario:
  // Step 0: Empty
  // Step 1: Red arrives (Slot 0)
  // Step 2: Blue arrives (Slot 1)
  // Step 3: Green arrives (Slot 2)
  // Step 4: Yellow arrives (Slot 3) -> MEMORY FULL
  // Step 5: Need Red's partner... but link generates Yellow! -> DROP (No Space)
  // Step 6: Deadlock (Collapse)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => {
        if (s >= 6) return 6; // Stop at collapse
        return s + 1;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step === 0) { setSlots([null, null, null, null]); setIsCollapsed(false); }
    if (step === 1) setSlots(['red', null, null, null]);
    if (step === 2) setSlots(['red', 'blue', null, null]);
    if (step === 3) setSlots(['red', 'blue', 'green', null]);
    if (step === 4) setSlots(['red', 'blue', 'green', 'yellow']); // Full
    if (step === 6) setIsCollapsed(true);
  }, [step]);

  const reset = () => {
    setStep(0);
  };

  const getColor = (c: string | null) => {
    if (!c) return 'bg-slate-800';
    return {
      'red': 'bg-red-500',
      'blue': 'bg-blue-500',
      'green': 'bg-green-500',
      'yellow': 'bg-yellow-500'
    }[c];
  };

  return (
    <div className="my-8 bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg select-none flex flex-col items-center text-white">
       <h4 className="font-bold text-orange-400 mb-6">چرا ۴ مدار باعث فروپاشی می‌شوند؟</h4>
       
       <div className="relative w-full max-w-md h-48 border-2 border-slate-600 rounded-2xl flex items-center justify-center bg-slate-950 overflow-hidden">
          
          {/* Incoming Pipe */}
          <div className="absolute top-0 w-12 h-8 bg-gradient-to-b from-slate-700 to-transparent"></div>
          
          {/* Memory Grid */}
          <div className="grid grid-cols-2 gap-2 p-4 bg-slate-900 rounded-xl border border-slate-700 z-10">
             {slots.map((color, idx) => (
               <div key={idx} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${getColor(color)} border-2 border-slate-600`}>
                  {color && <span className="text-[10px] font-bold uppercase">{color[0]}</span>}
               </div>
             ))}
          </div>

          {/* Deadlock Overlay */}
          {isCollapsed && (
            <div className="absolute inset-0 bg-red-900/80 z-20 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
               <Lock size={48} className="text-white mb-2" />
               <span className="font-bold text-lg">DEADLOCK</span>
               <span className="text-xs text-red-200 px-4 text-center mt-1">حافظه پر شده و هیچ جفتی کامل نیست!</span>
            </div>
          )}

          {/* Step 5: Rejection Animation */}
          {step === 5 && (
             <div className="absolute top-4 right-4 bg-slate-800 border border-red-500 text-red-400 text-xs p-2 rounded animate-bounce shadow-lg z-20 flex items-center gap-2">
               <Trash2 size={14}/> ورودی جدید رد شد (حافظه پر)
             </div>
          )}

       </div>

       <div className="mt-6 flex justify-between items-center w-full max-w-md">
          <p className="text-xs text-slate-400 h-10 flex-1 leading-5">
             {step === 0 && "حافظه خالی است..."}
             {step >= 1 && step < 4 && "درخواست‌های مختلف وارد حافظه می‌شوند (هنوز جفتشان نیامده)..."}
             {step === 4 && "حافظه پر شد! ۴ کیوبیت از ۴ مدار مختلف، همگی منتظر جفت."}
             {step === 5 && "لینک جدیدی تولید می‌شود اما چون حافظه پر است، دور ریخته می‌شود."}
             {step === 6 && "سیستم قفل کرد. تا زمان Cutoff (انقضا) هیچ کاری انجام نمی‌شود."}
          </p>
          <button onClick={reset} className="bg-slate-800 p-2 rounded hover:bg-slate-700 transition-colors text-slate-300">
             <RotateCcw size={18} />
          </button>
       </div>
    </div>
  );
};