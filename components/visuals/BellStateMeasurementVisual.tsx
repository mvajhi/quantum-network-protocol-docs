
import React, { useState } from 'react';
import { ArrowRight, Activity, Binary, Zap, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { Latex } from '../ui/Latex';

export const BellStateMeasurementVisual: React.FC = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  // Random result generation for the final step if not already set
  const getResult = () => {
      if (result) return result;
      const outcomes = ['00', '01', '10', '11'];
      const res = outcomes[Math.floor(Math.random() * outcomes.length)];
      setResult(res);
      return res;
  }

  const currentResult = step >= 4 ? getResult() : null;

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));
  const reset = () => { setStep(0); setResult(null); };

  const getBellState = (res: string) => {
    switch(res) {
      case '00': return '\\Phi^+';
      case '01': return '\\Phi^-';
      case '10': return '\\Psi^+';
      case '11': return '\\Psi^-';
      default: return '?';
    }
  };

  const stepsInfo = [
      {
          title: "۱. ورود کیوبیت‌ها (Input)",
          desc: "دو کیوبیت از دو لینک مجزا (چپ و راست) وارد پردازنده کوانتومی گره میانی می‌شوند. این‌ها همان کیوبیت‌هایی هستند که باید به هم 'دوخته' شوند."
      },
      {
          title: "۲. گیت CNOT (Entanglement)",
          desc: "یک گیت CNOT روی آن‌ها اعمال می‌شود. کیوبیت اول (q1) نقش کنترل و کیوبیت دوم (q2) نقش هدف را دارد. این عملیات وضعیت آن‌ها را به هم گره می‌زند."
      },
      {
          title: "۳. گیت هادا مارد (Basis Change)",
          desc: "یک گیت Hadamard روی کیوبیت اول اعمال می‌شود. این کار برای تمایز بین حالت‌های فازی (Phase) و بیتی (Bit) ضروری است."
      },
      {
          title: "۴. اندازه‌گیری (Measurement)",
          desc: "هر دو کیوبیت در پایه استاندارد (Z-basis) اندازه‌گیری می‌شوند. در این لحظه ماهیت کوانتومی آن‌ها نابود شده و به بیت‌های کلاسیک تبدیل می‌شوند."
      },
      {
          title: "۵. نتیجه نهایی (Outcome)",
          desc: "خروجی ۲ بیت کلاسیک است. این بیت‌ها مشخص می‌کنند که جفت‌های درهم‌تنیده دوردست (که به این‌ها وصل بودند) اکنون در کدام یک از ۴ حالت بل قرار گرفته‌اند."
      }
  ];

  return (
    <div className="my-8 bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg select-none text-white flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <h4 className="font-bold text-purple-300 flex items-center gap-2">
           <Activity size={20}/>
           مدار اندازه‌گیری بل (BSM Circuit)
        </h4>
        <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded">Step {step + 1} / 5</span>
        </div>
      </div>

      {/* Circuit Visualization Area */}
      <div className="relative h-48 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center mb-6">
          
          {/* Grid Lines */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4ade80_1px,transparent_1px),linear-gradient(to_bottom,#4ade80_1px,transparent_1px)] [background-size:20px_20px]"></div>

          {/* Wires */}
          <div className="absolute left-10 right-10 top-16 h-0.5 bg-slate-700"></div> {/* Wire 1 */}
          <div className="absolute left-10 right-10 top-32 h-0.5 bg-slate-700"></div> {/* Wire 2 */}

          {/* Input Labels */}
          <span className="absolute left-2 top-16 -translate-y-1/2 text-[10px] font-bold text-slate-500">q1</span>
          <span className="absolute left-2 top-32 -translate-y-1/2 text-[10px] font-bold text-slate-500">q2</span>

          {/* --- GATES --- */}
          
          {/* CNOT */}
          <div className={`absolute left-[30%] top-16 bottom-16 w-0.5 bg-slate-600 transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-20'}`}></div>
          <div className={`absolute left-[30%] top-16 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${step >= 1 ? 'scale-100' : 'scale-0'}`}></div> {/* Control */}
          <div className={`absolute left-[30%] top-32 w-6 h-6 border-2 border-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-slate-900 transition-all duration-500 ${step >= 1 ? 'scale-100' : 'scale-0'}`}> {/* Target */}
             <div className="w-full h-0.5 bg-blue-500"></div>
             <div className="h-full w-0.5 bg-blue-500 absolute"></div>
          </div>

          {/* Hadamard */}
          <div className={`absolute left-[50%] top-16 w-10 h-10 bg-purple-600 text-white font-bold flex items-center justify-center border-2 border-slate-400 rounded -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ${step >= 2 ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-50'}`}>
             H
          </div>

          {/* Measurements */}
          <div className={`absolute right-[20%] top-16 w-10 h-10 bg-slate-800 border-2 border-slate-500 rounded -translate-y-1/2 flex items-center justify-center transition-all duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-20'}`}>
             <div className="w-8 h-4 border-t-2 border-white rounded-t-full flex justify-center">
                <div className={`w-0.5 h-3 bg-red-500 origin-bottom transition-transform duration-300 ${step >= 4 ? (currentResult?.[0] === '1' ? 'rotate-45' : '-rotate-45') : 'rotate-0'}`}></div>
             </div>
          </div>
          <div className={`absolute right-[20%] top-32 w-10 h-10 bg-slate-800 border-2 border-slate-500 rounded -translate-y-1/2 flex items-center justify-center transition-all duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-20'}`}>
              <div className="w-8 h-4 border-t-2 border-white rounded-t-full flex justify-center">
                <div className={`w-0.5 h-3 bg-red-500 origin-bottom transition-transform duration-300 ${step >= 4 ? (currentResult?.[1] === '1' ? 'rotate-45' : '-rotate-45') : 'rotate-0'}`}></div>
             </div>
          </div>

          {/* Qubits Moving */}
          {/* Q1 */}
          <div 
             className="absolute w-6 h-6 rounded-full bg-yellow-400 shadow-[0_0_10px_yellow] -translate-y-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out z-20 flex items-center justify-center text-[8px] text-black font-bold"
             style={{ 
                 top: '4rem', 
                 left: step === 0 ? '10%' : step === 1 ? '30%' : step === 2 ? '50%' : step === 3 ? '80%' : '95%',
                 opacity: step >= 4 ? 0 : 1
             }}
          >q1</div>
          
          {/* Q2 */}
          <div 
             className="absolute w-6 h-6 rounded-full bg-yellow-400 shadow-[0_0_10px_yellow] -translate-y-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out z-20 flex items-center justify-center text-[8px] text-black font-bold"
             style={{ 
                 top: '8rem', 
                 left: step === 0 ? '10%' : step === 1 ? '30%' : step <= 2 ? '30%' : step === 3 ? '80%' : '95%', // Q2 waits at CNOT technically or moves parallel. Let's move parallel for simplicity but logical flow.
                 opacity: step >= 4 ? 0 : 1
             }}
          >q2</div>

          {/* Classical Bits Output */}
          {step >= 4 && currentResult && (
             <>
                <div className="absolute right-4 top-16 -translate-y-1/2 text-xl font-mono font-bold text-green-400 animate-in slide-in-from-left">{currentResult[0]}</div>
                <div className="absolute right-4 top-32 -translate-y-1/2 text-xl font-mono font-bold text-green-400 animate-in slide-in-from-left">{currentResult[1]}</div>
                
                {/* Connecting Lines to Result Box */}
                <svg className="absolute inset-0 pointer-events-none">
                   <path d="M 90% 30% Q 95% 50% 50% 50%" stroke="#4ade80" strokeWidth="2" fill="none" className="opacity-50" />
                </svg>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 border-2 border-green-500 p-4 rounded-xl shadow-[0_0_30px_rgba(74,222,128,0.3)] text-center animate-in zoom-in">
                    <span className="block text-[10px] text-slate-400 mb-1">BSM Result</span>
                    <span className="block text-2xl font-mono font-bold text-white tracking-widest mb-2">{currentResult}</span>
                    <span className="block text-sm text-green-400 border-t border-slate-700 pt-2">
                       State: <Latex>{getBellState(currentResult)}</Latex>
                    </span>
                </div>
             </>
          )}

      </div>

      {/* Controls & Description */}
      <div className="flex flex-col md:flex-row gap-6">
          
          <div className="flex-1">
             <h5 className="font-bold text-white mb-2 text-sm">{stepsInfo[step].title}</h5>
             <p className="text-sm text-slate-400 leading-6 text-justify min-h-[60px]">
                {stepsInfo[step].desc}
             </p>
          </div>

          <div className="flex gap-2 items-start min-w-[140px]">
             <button 
               onClick={prevStep} disabled={step === 0}
               className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 disabled:opacity-30 border border-slate-600"
             >
               <ChevronRight size={20} />
             </button>
             
             {step < 4 ? (
                <button 
                  onClick={nextStep}
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  بعدی <ChevronLeft size={16} />
                </button>
             ) : (
                <button 
                  onClick={reset}
                  className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} /> تکرار
                </button>
             )}
          </div>

      </div>
    </div>
  );
};
