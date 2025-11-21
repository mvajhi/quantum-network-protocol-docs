
import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export const FidelityFormulaDemo: React.FC = () => {
  const [f1, setF1] = useState(0.95);
  const [f2, setF2] = useState(0.90);

  // Formula: F' = F1*F2 + (1-F1)*(1-F2)/3
  const result = (f1 * f2) + ((1 - f1) * (1 - f2) / 3);

  // Helper for color
  const getColor = (val: number) => {
    if (val >= 0.9) return 'text-green-500';
    if (val >= 0.8) return 'text-blue-500';
    if (val >= 0.7) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getBgColor = (val: number) => {
    if (val >= 0.9) return 'bg-green-500';
    if (val >= 0.8) return 'bg-blue-500';
    if (val >= 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="my-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm select-none">
      
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
        <Calculator size={20} className="text-purple-600" />
        <h4 className="font-bold text-slate-800">آزمایشگاه محاسبه فیدلیتی (Werner States)</h4>
      </div>

      {/* Formula Display with Standard HTML/CSS */}
      <div className="bg-slate-50 p-6 rounded-lg flex justify-center font-mono text-slate-700 text-sm mb-8 border border-slate-200 overflow-x-auto">
        <div className="flex items-center gap-2" dir="ltr">
           <span className="font-bold">F'</span>
           <span>=</span>
           <span className="text-blue-600 font-bold">F<sub>1</sub></span>
           <span>·</span>
           <span className="text-purple-600 font-bold">F<sub>2</sub></span>
           <span>+</span>
           <div className="flex flex-col items-center justify-center mx-1">
              <span className="border-b border-slate-400 pb-0.5 mb-0.5 px-1">
                (1 - <span className="text-blue-600 font-bold">F<sub>1</sub></span>)
                (1 - <span className="text-purple-600 font-bold">F<sub>2</sub></span>)
              </span>
              <span>3</span>
           </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        
        {/* Input 1 */}
        <div className="flex flex-col items-center w-full max-w-[200px]">
           <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center shadow-sm transition-all ${getBgColor(f1).replace('bg-', 'border-')}`}>
              <span className={`text-xl font-bold ${getColor(f1)}`}>{f1.toFixed(2)}</span>
           </div>
           <label className="mt-3 text-sm font-bold text-slate-600 mb-2 flex gap-1 items-center" dir="ltr">
             Link 1 (F<sub>1</sub>)
           </label>
           <input 
             type="range" min="0.5" max="1" step="0.01" 
             value={f1} onChange={(e) => setF1(parseFloat(e.target.value))}
             className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
           />
        </div>

        {/* Operator */}
        <div className="text-slate-300 hidden md:block">
           <ArrowRight size={32} />
        </div>

        {/* Input 2 */}
        <div className="flex flex-col items-center w-full max-w-[200px]">
           <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center shadow-sm transition-all ${getBgColor(f2).replace('bg-', 'border-')}`}>
              <span className={`text-xl font-bold ${getColor(f2)}`}>{f2.toFixed(2)}</span>
           </div>
           <label className="mt-3 text-sm font-bold text-slate-600 mb-2 flex gap-1 items-center" dir="ltr">
             Link 2 (F<sub>2</sub>)
           </label>
           <input 
             type="range" min="0.5" max="1" step="0.01" 
             value={f2} onChange={(e) => setF2(parseFloat(e.target.value))}
             className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
           />
        </div>

        {/* Operator */}
        <div className="text-slate-300 hidden md:block">
           <ArrowRight size={32} />
        </div>

        {/* Result */}
        <div className="flex flex-col items-center w-full max-w-[200px] relative">
           <div className={`w-28 h-28 rounded-full flex items-center justify-center shadow-lg transition-all ${getBgColor(result)}`}>
              <span className="text-2xl font-bold text-white drop-shadow-md">{result.toFixed(3)}</span>
           </div>
           <label className="mt-3 text-sm font-bold text-slate-800 flex gap-1 items-center" dir="ltr">
             Result (F')
           </label>
           <span className="text-xs text-slate-500">End-to-End Fidelity</span>
           
           {/* Drop info */}
           <div className="absolute -top-8 bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold border border-red-200">
              افت کیفیت: {((Math.max(f1, f2) - result) * 100).toFixed(1)}%
           </div>
        </div>

      </div>
      
      <div className="mt-8 text-xs text-slate-500 text-justify bg-yellow-50 p-3 rounded border border-yellow-200 leading-6">
        <strong>نکته ریاضی:</strong> جمله کسری دوم در فرمول، اثرات جانبی نویز ایزوتروپیک را نشان می‌دهد. اما همانطور که می‌بینید، تأثیر آن نسبت به بخش اول (حاصل‌ضرب مستقیم) کمتر است.
      </div>
    </div>
  );
};
