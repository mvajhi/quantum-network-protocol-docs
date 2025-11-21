
import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Pause, Zap, ArrowDown, Database, Network, Gauge } from 'lucide-react';

export const NearFutureHardwareDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0); // 0: Idle, 1: Gen Left, 2: Move, 3: Gen Right, 4: Swap
  const [progress, setProgress] = useState(0);
  const [memoryFidelity, setMemoryFidelity] = useState(100);
  const [cycleCount, setCycleCount] = useState(0);
  const [log, setLog] = useState<string>("Ready to start sequence...");

  // Timings (ticks)
  const GEN_TIME = 50;
  const MOVE_TIME = 30;
  const SWAP_TIME = 20;

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        if (step === 0) {
          setStep(1);
          setProgress(0);
          setMemoryFidelity(100);
          setLog("1. Generating Left Link...");
        } 
        else if (step === 1) { // Generate Left
          setProgress(p => {
            if (p >= 100) {
               setStep(2);
               setLog("2. Moving Qubit to Memory...");
               return 0;
            }
            return p + (100/GEN_TIME);
          });
        }
        else if (step === 2) { // Move to Memory
          setProgress(p => {
            if (p >= 100) {
               setStep(3);
               setLog("3. Generating Right Link (Memory Decaying!)...");
               return 0;
            }
            return p + (100/MOVE_TIME);
          });
        }
        else if (step === 3) { // Generate Right (Memory Decays!)
          setMemoryFidelity(f => Math.max(0, f - 0.5)); // Decay logic
          setProgress(p => {
            if (p >= 100) {
               setStep(4);
               setLog("4. Performing Bell State Measurement...");
               return 0;
            }
            return p + (100/GEN_TIME);
          });
        }
        else if (step === 4) { // Swap
          setProgress(p => {
            if (p >= 100) {
               setCycleCount(c => c + 1);
               setStep(1); // Loop back
               setMemoryFidelity(100);
               setLog("Cycle Complete. Starting next...");
               return 0;
            }
            return p + (100/SWAP_TIME);
          });
        }
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isRunning, step]);

  const togglePlay = () => setIsRunning(!isRunning);
  const reset = () => {
    setIsRunning(false);
    setStep(0);
    setProgress(0);
    setMemoryFidelity(100);
    setCycleCount(0);
    setLog("Reset.");
  };

  return (
    <div className="my-8 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden select-none">
       
       {/* Top Bar */}
       <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
             <span className="font-bold text-slate-200 text-sm">Quantum Node Simulator (NV Center)</span>
          </div>
          <div className="flex gap-2">
             <button onClick={togglePlay} className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                {isRunning ? <Pause size={16}/> : <Play size={16}/>}
             </button>
             <button onClick={reset} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors border border-slate-700">
                <RotateCcw size={16}/>
             </button>
          </div>
       </div>

       <div className="flex flex-col md:flex-row min-h-[400px]">
          
          {/* LEFT: VISUALIZATION */}
          <div className="flex-1 relative bg-slate-900 p-8 flex flex-col items-center justify-center overflow-hidden">
             
             {/* Background Pipes */}
             <div className="absolute top-[20%] left-0 w-[30%] h-4 bg-slate-800 rounded-r-full border-y border-r border-slate-700 z-0"></div>
             <div className="absolute top-[20%] right-0 w-[30%] h-4 bg-slate-800 rounded-l-full border-y border-l border-slate-700 z-0"></div>
             <div className="absolute top-[22%] left-2 text-[9px] text-slate-500 uppercase font-bold tracking-wider">Left Link</div>
             <div className="absolute top-[22%] right-2 text-[9px] text-slate-500 uppercase font-bold tracking-wider">Right Link</div>

             {/* Photons moving */}
             {step === 1 && (
                <div className="absolute top-[20%] left-0 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_yellow] z-10 animate-[moveRight_1s_infinite_linear]"></div>
             )}
             {step === 3 && (
                <div className="absolute top-[20%] right-0 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_15px_purple] z-10 animate-[moveLeft_1s_infinite_linear]"></div>
             )}

             {/* MAIN MACHINE */}
             <div className="relative z-20 w-64 bg-slate-800 border-2 border-slate-600 rounded-2xl p-4 flex flex-col items-center gap-6 shadow-2xl">
                <div className="absolute -top-3 bg-slate-800 px-3 border border-slate-600 rounded-full text-[10px] text-slate-400 font-bold">QUANTUM CORE</div>

                {/* SLOT 1: COMMUNICATION */}
                <div className="w-full flex justify-between items-center relative">
                   <span className="text-[10px] text-slate-400 w-12 text-right">COMM</span>
                   <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-500 bg-slate-900 flex items-center justify-center relative shadow-inner">
                      
                      {/* The Qubit (Comm) */}
                      <div className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg z-20
                         ${step === 1 ? 'bg-yellow-400 scale-100 shadow-yellow-500/50' : 
                           step === 3 ? 'bg-purple-400 scale-100 shadow-purple-500/50' : 
                           step === 4 ? 'bg-purple-400 scale-100' : 'scale-0'}
                      `}>
                         <Network size={16} className="text-white/80" />
                      </div>

                      {/* Move Animation Ghost */}
                      {step === 2 && (
                         <div className="absolute w-10 h-10 rounded-full bg-yellow-400 z-30 animate-[moveToMem_1s_ease-in-out_forwards]"></div>
                      )}

                   </div>
                   <span className="w-12"></span>
                </div>

                {/* Arrow Down */}
                <div className={`transition-all duration-300 ${step === 2 ? 'text-yellow-400 opacity-100 scale-125' : 'text-slate-600 opacity-50'}`}>
                   <ArrowDown size={24} />
                </div>

                {/* SLOT 2: MEMORY */}
                <div className="w-full flex justify-between items-center relative">
                   <span className="text-[10px] text-slate-400 w-12 text-right">MEM</span>
                   <div className={`w-16 h-16 rounded-full border-2 border-slate-500 bg-slate-900 flex items-center justify-center relative shadow-inner transition-colors duration-300 ${step >= 2 && step <= 4 ? 'border-blue-500/50' : ''}`}>
                      
                      {/* The Qubit (Mem) */}
                      <div className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg
                         ${step >= 3 && step <= 4 ? 'scale-100' : 'scale-0'}
                      `}
                      style={{
                         backgroundColor: `rgba(59, 130, 246, ${memoryFidelity / 100})`, // Fade out
                         boxShadow: `0 0 ${memoryFidelity/5}px rgba(59, 130, 246, 0.8)`
                      }}
                      >
                         <Database size={16} className="text-white/80" />
                      </div>

                      {/* Decay Warning */}
                      {step === 3 && (
                         <div className="absolute -right-8 top-0 text-red-500 animate-pulse">
                            <ArrowDown size={16} />
                         </div>
                      )}

                   </div>
                   
                   {/* Fidelity Bar */}
                   <div className="w-12 flex flex-col items-start gap-1">
                      {step >= 3 && step <= 4 && (
                        <>
                           <div className="h-10 w-1.5 bg-slate-700 rounded-full overflow-hidden relative">
                              <div 
                                className={`absolute bottom-0 left-0 w-full transition-all duration-100 ${memoryFidelity > 80 ? 'bg-green-500' : memoryFidelity > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ height: `${memoryFidelity}%` }}
                              ></div>
                           </div>
                           <span className={`text-[9px] font-bold ${memoryFidelity > 80 ? 'text-green-500' : 'text-red-500'}`}>
                              {Math.round(memoryFidelity)}%
                           </span>
                        </>
                      )}
                   </div>
                </div>

             </div>
             
             {/* Swap Flash */}
             {step === 4 && (
               <div className="absolute inset-0 bg-white/10 z-30 animate-[flash_0.2s_ease-out]"></div>
             )}
             
             {/* Success Message */}
             {step === 4 && progress > 50 && (
                <div className="absolute bottom-10 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
                   Swapped!
                </div>
             )}

          </div>

          {/* RIGHT: STATUS PANEL */}
          <div className="w-full md:w-1/3 bg-slate-950 border-t md:border-t-0 md:border-r border-slate-800 p-6 flex flex-col gap-6">
             
             {/* Log Console */}
             <div className="bg-black/50 rounded-lg p-4 border border-slate-800 font-mono text-xs text-green-400 h-24 overflow-y-auto shadow-inner">
                <span className="text-slate-500 mr-2">{">"}</span>
                {log}
                <span className="animate-pulse block mt-1">_</span>
             </div>

             {/* Stats */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
                   <span className="text-[10px] text-slate-500 uppercase font-bold mb-1">Total Pairs</span>
                   <span className="text-2xl font-bold text-white">{cycleCount}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
                   <span className="text-[10px] text-slate-500 uppercase font-bold mb-1">Current Fidelity</span>
                   <span className={`text-2xl font-bold ${memoryFidelity > 80 ? 'text-green-400' : memoryFidelity > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {step >= 3 ? Math.round(memoryFidelity) : '-'}<span className="text-sm">%</span>
                   </span>
                </div>
             </div>

             {/* Steps Explanation */}
             <div className="flex-1">
                <h5 className="text-slate-400 text-xs font-bold uppercase mb-3 border-b border-slate-800 pb-2">Sequence Status</h5>
                <div className="space-y-2">
                   <div className={`flex items-center gap-2 text-xs ${step === 1 ? 'text-yellow-400 font-bold' : 'text-slate-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-yellow-400' : 'bg-slate-700'}`}></div>
                      1. Generate Left Link
                   </div>
                   <div className={`flex items-center gap-2 text-xs ${step === 2 ? 'text-blue-400 font-bold' : 'text-slate-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-blue-400' : 'bg-slate-700'}`}></div>
                      2. Move to Memory
                   </div>
                   <div className={`flex items-center gap-2 text-xs ${step === 3 ? 'text-purple-400 font-bold' : 'text-slate-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${step === 3 ? 'bg-purple-400' : 'bg-slate-700'}`}></div>
                      3. Gen Right (Mem Decay)
                   </div>
                   <div className={`flex items-center gap-2 text-xs ${step === 4 ? 'text-green-400 font-bold' : 'text-slate-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${step === 4 ? 'bg-green-400' : 'bg-slate-700'}`}></div>
                      4. Swap & Complete
                   </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-slate-400 transition-all duration-200" style={{ width: `${progress}%` }}></div>
                </div>
             </div>

          </div>

       </div>

       <style>{`
         @keyframes moveRight { from { left: 0; opacity: 0; } 50% { opacity: 1; } to { left: 50%; opacity: 0; } }
         @keyframes moveLeft { from { right: 0; opacity: 0; } 50% { opacity: 1; } to { right: 50%; opacity: 0; } }
         @keyframes moveToMem { from { transform: translateY(0); } to { transform: translateY(6rem); } }
         @keyframes flash { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
       `}</style>
    </div>
  );
};
