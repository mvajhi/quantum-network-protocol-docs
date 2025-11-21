
import React, { useState } from 'react';
import { Search, Check, X, Trash2, Send, Box, RefreshCw, Settings, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface LinkPair {
  id: number;
  isGood: boolean; // The hidden reality
  status: 'hidden' | 'selected' | 'revealed-good' | 'revealed-bad' | 'delivered' | 'discarded';
}

export const FidelityTestDemo: React.FC = () => {
  // --- State ---
  const [phase, setPhase] = useState<'config' | 'generated' | 'sampled' | 'measured' | 'complete'>('config');
  const [noiseChance, setNoiseChance] = useState(0.2); // 20% chance of bad link
  const [pairs, setPairs] = useState<LinkPair[]>([]);
  const [verdict, setVerdict] = useState<'pass' | 'fail' | null>(null);

  // --- Constants ---
  const BATCH_SIZE = 6;
  const SAMPLE_SIZE = 2;

  // --- Actions ---

  const startGeneration = () => {
    const newPairs: LinkPair[] = [];
    for (let i = 0; i < BATCH_SIZE; i++) {
      // Randomly decide if this pair is good based on noise chance
      const isGood = Math.random() > noiseChance;
      newPairs.push({ id: i, isGood, status: 'hidden' });
    }
    setPairs(newPairs);
    setPhase('generated');
    setVerdict(null);
  };

  const selectSamples = () => {
    // Randomly pick indices
    const indices: number[] = [];
    while (indices.length < SAMPLE_SIZE) {
      const r = Math.floor(Math.random() * BATCH_SIZE);
      if (!indices.includes(r)) indices.push(r);
    }

    setPairs(prev => prev.map(p => 
      indices.includes(p.id) ? { ...p, status: 'selected' } : p
    ));
    setPhase('sampled');
  };

  const performMeasurement = () => {
    let hasFailure = false;
    
    const measuredPairs = pairs.map(p => {
      if (p.status === 'selected') {
        if (!p.isGood) hasFailure = true;
        return { ...p, status: p.isGood ? 'revealed-good' : 'revealed-bad' } as LinkPair;
      }
      return p;
    });

    setPairs(measuredPairs);
    setVerdict(hasFailure ? 'fail' : 'pass');
    setPhase('measured');
  };

  const finalizeBatch = () => {
    if (verdict === 'pass') {
      // Deliver the hidden ones
      setPairs(prev => prev.map(p => 
        p.status === 'hidden' ? { ...p, status: 'delivered' } : p
      ));
    } else {
      // Discard everything
      setPairs(prev => prev.map(p => 
        (p.status === 'hidden' || p.status === 'revealed-bad' || p.status === 'revealed-good') 
          ? { ...p, status: 'discarded' } : p
      ));
    }
    setPhase('complete');
  };

  const reset = () => {
    setPhase('config');
    setPairs([]);
    setVerdict(null);
  };

  // --- Visual Helpers ---

  const getCardStyle = (status: LinkPair['status']) => {
    switch (status) {
      case 'hidden': return 'bg-slate-800 border-slate-600';
      case 'selected': return 'bg-yellow-500/20 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)] scale-105';
      case 'revealed-good': return 'bg-green-500/20 border-green-500';
      case 'revealed-bad': return 'bg-red-500/20 border-red-500';
      case 'delivered': return 'bg-blue-600 border-blue-400 shadow-lg shadow-blue-900/20';
      case 'discarded': return 'bg-slate-900 border-slate-800 opacity-50 grayscale';
      default: return 'bg-slate-800';
    }
  };

  return (
    <div className="my-10 select-none font-sans">
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[450px]">
        
        {/* LEFT SIDE: Control Panel & Info */}
        <div className="w-full md:w-80 bg-slate-900 p-6 border-b md:border-b-0 md:border-l border-slate-800 flex flex-col">
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Search className="text-blue-500" />
              تست فیدلیتی
            </h3>
            <p className="text-xs text-slate-400 leading-6 text-justify">
              ما نمی‌توانیم همه جفت‌ها را تست کنیم (چون تست کردن آنها را نابود می‌کند). راه حل: <strong>نمونه‌برداری تصادفی</strong>.
            </p>
          </div>

          {/* Stepper */}
          <div className="space-y-4 flex-1">
             <StepItem 
               step={1} active={phase === 'config' || phase === 'generated'} 
               title="۱. تولید (Generation)" 
               desc="تولید تعدادی جفت درهم‌تنیده."
             />
             <StepItem 
               step={2} active={phase === 'sampled'} 
               title="۲. انتخاب (Sampling)" 
               desc="انتخاب تصادفی چند نمونه برای قربانی کردن."
             />
             <StepItem 
               step={3} active={phase === 'measured'} 
               title="۳. اندازه‌گیری (Testing)" 
               desc="تست مخرب نمونه‌ها برای کشف حقیقت."
             />
             <StepItem 
               step={4} active={phase === 'complete'} 
               title="۴. تصمیم‌گیری (Verdict)" 
               desc="تایید یا رد کل دسته بر اساس نتایج نمونه."
             />
          </div>

          {/* Action Button Area */}
          <div className="mt-8 pt-6 border-t border-slate-800">
             {phase === 'config' && (
               <div className="space-y-4">
                 <div className="flex justify-between text-xs font-bold text-slate-300">
                   <span>احتمال خرابی (Noise):</span>
                   <span>{Math.round(noiseChance * 100)}%</span>
                 </div>
                 <input 
                   type="range" min="0" max="0.8" step="0.1" 
                   value={noiseChance} onChange={(e) => setNoiseChance(parseFloat(e.target.value))}
                   className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                 />
                 <button onClick={startGeneration} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20 flex justify-center items-center gap-2">
                   <Box size={18}/> شروع تولید
                 </button>
               </div>
             )}

             {phase === 'generated' && (
                <button onClick={selectSamples} className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-yellow-900/20 flex justify-center items-center gap-2">
                  <Search size={18}/> انتخاب نمونه‌ها
                </button>
             )}

             {phase === 'sampled' && (
                <button onClick={performMeasurement} className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-900/20 flex justify-center items-center gap-2">
                  <Settings size={18}/> انجام تست (مخرب)
                </button>
             )}

             {phase === 'measured' && (
                <button onClick={finalizeBatch} className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-lg flex justify-center items-center gap-2 text-white ${verdict === 'pass' ? 'bg-green-600 hover:bg-green-500 shadow-green-900/20' : 'bg-red-600 hover:bg-red-500 shadow-red-900/20'}`}>
                  {verdict === 'pass' ? <><Send size={18}/> ارسال بقیه</> : <><Trash2 size={18}/> دور ریختن همه</>}
                </button>
             )}

             {phase === 'complete' && (
                <button onClick={reset} className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2">
                  <RefreshCw size={18}/> شروع مجدد
                </button>
             )}
          </div>

        </div>

        {/* RIGHT SIDE: Visualization Stage */}
        <div className="flex-1 bg-slate-950 p-4 md:p-10 flex flex-col items-center justify-center relative overflow-hidden">
           
           {/* Background Grid Effect */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

           {/* Empty State Placeholder */}
           {phase === 'config' && (
             <div className="text-center opacity-50">
               <Box size={64} className="mx-auto mb-4 text-slate-600" />
               <p className="text-slate-500 text-sm">آماده برای تولید...</p>
             </div>
           )}

           {/* THE GRID */}
           {phase !== 'config' && (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-lg relative z-10">
                {pairs.map((pair) => (
                  <div 
                    key={pair.id}
                    className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all duration-500 ${getCardStyle(pair.status)}`}
                  >
                     {/* Top Badge */}
                     <div className="absolute top-2 left-2 right-2 flex justify-between">
                       <span className="text-[10px] font-mono text-slate-400 opacity-50">#{pair.id + 1}</span>
                       {pair.status === 'selected' && <Search size={12} className="text-yellow-500 animate-bounce" />}
                     </div>

                     {/* Center Icon */}
                     <div className="flex-1 flex items-center justify-center">
                        {pair.status === 'hidden' && <Box size={32} className="text-slate-500" />}
                        {pair.status === 'selected' && <Box size={32} className="text-yellow-500" />}
                        
                        {/* Revealed Good */}
                        {pair.status === 'revealed-good' && (
                           <div className="flex flex-col items-center animate-in zoom-in duration-300">
                             <div className="bg-green-500 text-white p-2 rounded-full mb-1 shadow-lg shadow-green-500/50">
                               <Check size={20} strokeWidth={4} />
                             </div>
                             <span className="text-[10px] font-bold text-green-400 uppercase">سالم</span>
                           </div>
                        )}

                        {/* Revealed Bad */}
                        {pair.status === 'revealed-bad' && (
                           <div className="flex flex-col items-center animate-in zoom-in duration-300">
                             <div className="bg-red-500 text-white p-2 rounded-full mb-1 shadow-lg shadow-red-500/50">
                               <X size={20} strokeWidth={4} />
                             </div>
                             <span className="text-[10px] font-bold text-red-400 uppercase">خراب</span>
                           </div>
                        )}

                        {/* Delivered */}
                        {pair.status === 'delivered' && (
                           <div className="flex flex-col items-center animate-in slide-in-from-bottom-4 duration-500">
                             <Send size={32} className="text-white mb-1" />
                             <span className="text-[10px] font-bold text-blue-100">تحویل شد</span>
                           </div>
                        )}

                        {/* Discarded */}
                        {pair.status === 'discarded' && (
                           <div className="flex flex-col items-center">
                             <Trash2 size={32} className="text-slate-600" />
                           </div>
                        )}
                     </div>

                     {/* Bottom Status Text */}
                     <div className="absolute bottom-3 text-[10px] font-bold opacity-80">
                        {pair.status === 'hidden' && <span className="text-slate-500">نامشخص</span>}
                        {pair.status === 'selected' && <span className="text-yellow-500">انتخاب شده</span>}
                     </div>

                  </div>
                ))}
             </div>
           )}

           {/* Verdict Overlay */}
           {phase === 'measured' && (
             <div className={`absolute top-8 right-8 md:right-auto md:left-8 px-4 py-2 rounded-lg border-2 font-bold text-xs uppercase tracking-wider shadow-xl animate-in slide-in-from-top-4
                ${verdict === 'pass' ? 'bg-green-900/80 border-green-500 text-green-400' : 'bg-red-900/80 border-red-500 text-red-400'}
             `}>
               {verdict === 'pass' ? '✅ تست موفق: تایید' : '❌ تست ناموفق: رد'}
             </div>
           )}

        </div>

      </div>
    </div>
  );
};

const StepItem = ({ step, active, title, desc }: { step: number, active: boolean, title: string, desc: string }) => (
  <div className={`flex gap-4 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-40'}`}>
     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border-2
       ${active ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_10px_#3b82f6]' : 'bg-slate-800 border-slate-700 text-slate-500'}
     `}>
       {step}
     </div>
     <div>
       <h4 className={`text-sm font-bold mb-1 ${active ? 'text-white' : 'text-slate-400'}`}>{title}</h4>
       <p className="text-[10px] text-slate-500 leading-4">{desc}</p>
     </div>
  </div>
);
