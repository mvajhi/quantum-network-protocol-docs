
import React, { useState, useEffect, useRef } from 'react';
import { Timer, Trash2, CheckCircle2, Play, Pause, RotateCcw, GraduationCap, Activity, ChevronLeft, ChevronRight, Hourglass } from 'lucide-react';

// --- Types ---
type Mode = 'tutorial' | 'simulation';

// --- Tutorial Data ---
const TUTORIAL_STEPS = [
  {
    id: 0,
    title: "۱. سناریوی مسئله",
    desc: "فرض کنید می‌خواهیم بین چپ و راست یک ارتباط برقرار کنیم. لینک سمت چپ (L1) زودتر تولید می‌شود و به تکرارگر می‌رسد. اما لینک سمت راست (L2) هنوز آماده نیست.",
    action: "start",
  },
  {
    id: 1,
    title: "۲. انتظار در حافظه",
    desc: "لینک L1 وارد حافظه کوانتومی تکرارگر می‌شود. عقربه‌ی زمان شروع به حرکت می‌کند. هر میلی‌ثانیه که می‌گذرد، نویز محیط باعث کاهش کیفیت (Fidelity) کیوبیت می‌شود (ناهمدوسی).",
    action: "wait",
  },
  {
    id: 2,
    title: "۳. رسیدن به حد مجاز (Cutoff)",
    desc: "اگر زمان انتظار از حد تعیین شده (Cutoff) عبور کند، سیستم تصمیم می‌گیرد L1 را دور بریزد. چرا؟ چون کیفیت آن آنقدر پایین آمده که حتی اگر L2 هم برسد، جفت نهایی به‌درد‌نخور خواهد بود.",
    action: "discard",
  },
  {
    id: 3,
    title: "۴. حالت موفقیت",
    desc: "حالا فرض کنید Cutoff را بیشتر کرده‌ایم یا L2 زودتر رسیده است. در این صورت عملیات Swap انجام می‌شود. جفت نهایی ایجاد می‌شود اما کیفیت آن وابسته به مدت زمانی است که L1 منتظر مانده بود.",
    action: "success",
  }
];

export const CutoffSimulator: React.FC = () => {
  const [mode, setMode] = useState<Mode>('tutorial');

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-700 overflow-hidden my-10 shadow-2xl select-none flex flex-col">
      {/* Top Tab Switcher */}
      <div className="flex border-b border-slate-800 bg-slate-950">
        <button 
          onClick={() => setMode('tutorial')}
          className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold text-xs md:text-sm transition-all ${mode === 'tutorial' ? 'bg-slate-800 text-blue-400 border-b-2 border-blue-500 shadow-[inset_0_-2px_10px_rgba(59,130,246,0.1)]' : 'text-slate-500 hover:bg-slate-900 hover:text-slate-400'}`}
        >
          <GraduationCap size={18} />
          حالت آموزشی (Step-by-Step)
        </button>
        <button 
          onClick={() => setMode('simulation')}
          className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold text-xs md:text-sm transition-all ${mode === 'simulation' ? 'bg-slate-800 text-orange-400 border-b-2 border-orange-500 shadow-[inset_0_-2px_10px_rgba(249,115,22,0.1)]' : 'text-slate-500 hover:bg-slate-900 hover:text-slate-400'}`}
        >
          <Activity size={18} />
          آزمایشگاه شبیه‌سازی (Live Lab)
        </button>
      </div>

      <div className="p-4 md:p-8 min-h-[450px] flex flex-col">
        {mode === 'tutorial' ? <TutorialMode /> : <SimulationMode />}
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Tutorial Mode ---
const TutorialMode: React.FC = () => {
  const [step, setStep] = useState(0);
  const [animState, setAnimState] = useState<'idle' | 'waiting' | 'discarded' | 'success'>('idle');
  const [timer, setTimer] = useState(0);

  // Reset logic when changing steps
  useEffect(() => {
    setTimer(0);
    if (step === 0) setAnimState('idle');
    if (step === 1) {
      setAnimState('waiting');
      // Animate timer up to 40ms
      const interval = setInterval(() => setTimer(t => Math.min(t + 1, 40)), 50);
      return () => clearInterval(interval);
    }
    if (step === 2) {
      setAnimState('discarded');
      setTimer(50); // Max out logic
    }
    if (step === 3) {
      setAnimState('success');
      setTimer(10); // Short wait
    }
  }, [step]);

  return (
    <div className="flex flex-col h-full gap-6">
      
      {/* Visualization Area */}
      <div className="relative flex-1 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden min-h-[250px]">
         
         {/* Background Grid */}
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

         {/* Central Repeater Memory */}
         <div className="relative z-10 w-40 h-32 rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-center bg-slate-900 shadow-2xl">
            <span className="text-[9px] text-slate-500 absolute top-2 tracking-wider font-bold">QUANTUM MEMORY</span>
            
            {/* Qubit L1 (The waiting one) */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 relative z-10
              ${animState === 'idle' ? 'opacity-0 scale-0 translate-x-[-120px]' : 'opacity-100 scale-100 translate-x-0'}
              ${animState === 'waiting' || animState === 'discarded' ? 'animate-pulse' : ''}
              ${timer > 30 ? 'bg-red-500 shadow-[0_0_20px_red]' : 'bg-blue-500 shadow-[0_0_20px_#3b82f6]'}
            `}>
              <span className="text-[10px] font-bold text-white">L1</span>
            </div>

            {/* Waiting Timer Animation */}
            {(animState === 'waiting' || animState === 'discarded') && (
               <div className="absolute -bottom-4 bg-slate-800 text-white text-xs px-2 py-1 rounded border border-slate-600 flex items-center gap-1 shadow-lg z-20 whitespace-nowrap">
                 <Hourglass size={12} className={animState === 'waiting' ? "animate-spin" : ""} />
                 Wait: {timer}ms
               </div>
            )}

            {/* Discard Animation Overlay */}
            {animState === 'discarded' && (
               <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 rounded-xl z-30 animate-in fade-in zoom-in duration-300">
                 <div className="flex flex-col items-center gap-2">
                   <div className="bg-red-500/20 p-3 rounded-full">
                     <Trash2 size={32} className="text-red-500" />
                   </div>
                   <span className="text-red-400 text-xs font-bold uppercase">Discarded</span>
                 </div>
               </div>
            )}

            {/* Success Swap Animation Overlay */}
            {animState === 'success' && (
               <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 rounded-xl z-30 animate-in fade-in zoom-in duration-300">
                  <div className="flex flex-col items-center gap-2">
                   <div className="bg-green-500/20 p-3 rounded-full">
                     <CheckCircle2 size={32} className="text-green-500" />
                   </div>
                   <span className="text-green-400 text-xs font-bold uppercase">Swapped!</span>
                 </div>
               </div>
            )}
         </div>

         {/* Incoming Link L2 (Only appears in Success state logic effectively, or implies arrival) */}
         <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-purple-500 rounded-full shadow-[0_0_20px_#a855f7] flex items-center justify-center transition-all duration-1000 z-20
            ${animState === 'success' ? 'translate-x-[-150px] opacity-0 scale-50' : 'translate-x-[100px] opacity-100'}
         `}>
            <span className="text-[10px] font-bold text-white">L2</span>
         </div>

         {/* Connection Lines */}
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[50%] h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-slate-700"></div>
         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50%] h-0.5 bg-gradient-to-l from-transparent via-slate-700 to-slate-700"></div>

      </div>

      {/* Explanation Text & Nav */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row gap-6 items-center shadow-lg">
         <div className="flex-1">
            <h4 className="font-bold text-blue-300 mb-2 flex items-center gap-2 text-sm md:text-base">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs shrink-0">{TUTORIAL_STEPS[step].id + 1}</span>
              {TUTORIAL_STEPS[step].title}
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-7 text-justify">
              {TUTORIAL_STEPS[step].desc}
            </p>
         </div>
         
         <div className="flex gap-2 min-w-[160px]">
            <button 
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-slate-600"
            >
              <ChevronRight />
            </button>
            <button 
              onClick={() => setStep(s => Math.min(3, s + 1))}
              disabled={step === 3}
              className="flex-1 py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 text-sm"
            >
              بعدی <ChevronLeft size={18} />
            </button>
         </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Simulation Mode ---
const SimulationMode: React.FC = () => {
  const [cutoff, setCutoff] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ attempts: 0, success: 0, drops: 0, totalFidelity: 0 });
  
  // Visualization States
  const [l1State, setL1State] = useState<'empty' | 'waiting' | 'arrived'>('empty');
  const [l1Time, setL1Time] = useState(0);
  const [feedback, setFeedback] = useState<'none' | 'success' | 'drop'>('none');

  // Refs for interval logic
  const stateRef = useRef({
    l1Time: 0,
    l1Arrived: false,
    timer: 0
  });

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        const st = stateRef.current;
        st.timer++;

        // 1. Stochastic Arrival of L1 (if empty)
        if (!st.l1Arrived && Math.random() > 0.85) {
          st.l1Arrived = true;
          st.l1Time = 0;
          setL1State('waiting');
        }

        // 2. If L1 is waiting, process logic
        if (st.l1Arrived) {
          st.l1Time++;
          setL1Time(st.l1Time);

          // A. Check Cutoff (Failure)
          if (st.l1Time > cutoff) {
            handleResult('drop', 0);
            return; 
          }

          // B. Check L2 Arrival (Success)
          // Probability of L2 arriving this tick. 
          // Let's say 5% chance per tick => Avg arrival ~20 ticks.
          // If cutoff < 20, we will drop often. If cutoff > 20, we succeed often.
          if (Math.random() > 0.95) { 
             // Calculate Fidelity: Start at 100, decay by 1.5 per tick
             const fidelity = Math.max(50, 100 - (st.l1Time * 1.5)); 
             handleResult('success', fidelity);
             return; 
          }
        }
      }, 50); // 50ms tick
    }
    return () => clearInterval(interval);
  }, [isRunning, cutoff]);

  const handleResult = (type: 'success' | 'drop', fid: number) => {
    setFeedback(type);
    
    // Update Stats
    setStats(prev => ({
      attempts: prev.attempts + 1,
      success: prev.success + (type === 'success' ? 1 : 0),
      drops: prev.drops + (type === 'drop' ? 1 : 0),
      totalFidelity: prev.totalFidelity + fid
    }));

    // Reset logic for next attempt (with delay)
    setTimeout(() => {
      // Only reset if still running or to clean up
      setFeedback('none');
      setL1State('empty');
      stateRef.current.l1Arrived = false;
      stateRef.current.l1Time = 0;
      setL1Time(0);
    }, 500);
  };

  const resetStats = () => {
    setStats({ attempts: 0, success: 0, drops: 0, totalFidelity: 0 });
    setL1Time(0);
    setL1State('empty');
    setFeedback('none');
    stateRef.current.l1Arrived = false;
    stateRef.current.l1Time = 0;
    setIsRunning(false);
  };

  // Derived Metrics
  const avgFid = stats.success > 0 ? (stats.totalFidelity / stats.success).toFixed(1) : "0";
  const successRate = stats.attempts > 0 ? ((stats.success / stats.attempts) * 100).toFixed(0) : "0";

  return (
    <div className="flex flex-col gap-6 h-full">
      
      {/* Controls Header */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-8 items-center justify-between shadow-md">
         
         {/* Slider */}
         <div className="flex-1 w-full">
            <div className="flex justify-between mb-2">
               <label className="text-sm font-bold text-orange-400 flex items-center gap-2">
                 <Timer size={16} /> Cutoff Limit: {cutoff} ticks
               </label>
            </div>
            <input 
              type="range" min="5" max="60" value={cutoff} onChange={(e) => setCutoff(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
               <span>Fast Drop (Low Success, High Fidelity)</span>
               <span>Patient (High Success, Low Fidelity)</span>
            </div>
         </div>

         {/* Action Buttons */}
         <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 md:flex-none px-6 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${isRunning ? 'bg-slate-800 text-white border border-slate-700' : 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20'}`}
            >
              {isRunning ? <Pause size={18}/> : <Play size={18}/>}
              {isRunning ? 'توقف' : 'شروع'}
            </button>
            <button onClick={resetStats} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors border border-slate-700">
               <RotateCcw size={18} />
            </button>
         </div>
      </div>

      {/* Main Visualizer */}
      <div className="relative flex-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden min-h-[200px]">
         <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
         
         {/* Repeater Box */}
         <div className="relative z-10 w-48 h-32 border-2 border-slate-600 rounded-2xl flex flex-col items-center justify-center bg-slate-900 shadow-xl">
            <span className="text-[9px] text-slate-500 absolute top-2 font-bold tracking-wider">BUFFER STATE</span>
            
            {/* Waiting Qubit */}
            {l1State !== 'empty' && (
               <div className="flex flex-col items-center animate-in zoom-in duration-200">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 
                     ${l1Time > cutoff * 0.8 ? 'bg-red-500 shadow-[0_0_20px_red] animate-pulse' : 'bg-blue-500 shadow-[0_0_20px_#3b82f6]'}
                  `}>
                    <span className="font-bold text-xs text-white">Q1</span>
                  </div>
                  <div className="mt-2 bg-black/40 px-2 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-700">
                     {l1Time} / {cutoff}
                  </div>
               </div>
            )}

            {/* Empty State Placeholder */}
            {l1State === 'empty' && !feedback && (
               <span className="text-xs text-slate-600 animate-pulse">Waiting for Link...</span>
            )}

            {/* Feedback Overlays */}
            {feedback === 'success' && (
               <div className="absolute inset-0 bg-green-600 flex items-center justify-center rounded-xl z-20 animate-in fade-in zoom-in duration-200">
                  <div className="flex flex-col items-center">
                    <CheckCircle2 size={40} className="text-white mb-1" />
                    <span className="text-white font-bold text-sm">Link Created!</span>
                  </div>
               </div>
            )}
            {feedback === 'drop' && (
               <div className="absolute inset-0 bg-red-600 flex items-center justify-center rounded-xl z-20 animate-in fade-in zoom-in duration-200">
                  <div className="flex flex-col items-center">
                     <Trash2 size={40} className="text-white mb-1" />
                     <span className="text-white font-bold text-sm">Timeout!</span>
                  </div>
               </div>
            )}
         </div>

         {/* Connection Lines */}
         <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-800 -z-0"></div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center shadow-sm">
            <span className="text-xs text-slate-400 mb-1 uppercase tracking-wide">Total Attempts</span>
            <span className="text-2xl font-mono font-bold text-white">{stats.attempts}</span>
         </div>
         <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center shadow-sm">
            <span className="text-xs text-slate-400 mb-1 uppercase tracking-wide">Success Rate</span>
            <div className={`text-2xl font-mono font-bold flex items-baseline gap-1 ${parseInt(successRate) > 50 ? 'text-green-400' : 'text-red-400'}`}>
               {successRate}<span className="text-sm">%</span>
            </div>
         </div>
         <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center shadow-sm">
            <span className="text-xs text-slate-400 mb-1 uppercase tracking-wide">Avg Quality</span>
            <div className={`text-2xl font-mono font-bold flex items-baseline gap-1 ${parseFloat(avgFid) > 80 ? 'text-blue-400' : 'text-yellow-400'}`}>
               {avgFid}<span className="text-sm">%</span>
            </div>
         </div>
      </div>

      <div className="text-[10px] md:text-xs text-slate-500 text-center px-4">
         <strong className="text-slate-400">نکته آموزشی:</strong> هرچه Cutoff را کمتر کنید، کیفیت میانگین (Avg Quality) بالاتر می‌رود، زیرا فقط کیوبیت‌های "تازه" تبدیل به لینک می‌شوند. اما نرخ موفقیت به شدت افت می‌کند. این همان Trade-off اصلی پروتکل است.
      </div>

    </div>
  );
};
