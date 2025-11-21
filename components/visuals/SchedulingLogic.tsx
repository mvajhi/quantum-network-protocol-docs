
import React, { useState, useEffect } from 'react';
import { Scale, Clock, Database, RefreshCcw, Trash2, Zap } from 'lucide-react';

interface Request {
  id: number;
  vcType: 'HighFid' | 'LowFid';
  age: number;
}

export const SchedulingLogic: React.FC = () => {
  const [queueHigh, setQueueHigh] = useState<Request[]>([]);
  const [queueLow, setQueueLow] = useState<Request[]>([]);
  const [physicalMemory, setPhysicalMemory] = useState<Request[]>([]);
  const [turn, setTurn] = useState<'High' | 'Low'>('High');
  const [tick, setTick] = useState(0);

  // Simulation Parameters
  const MEMORY_LIMIT = 6;
  const HIGH_FID_GEN_TIME = 3; // Needs 3 ticks to generate
  const LOW_FID_GEN_TIME = 1;  // Needs 1 tick
  
  // Weighted Round Robin: High needs more attempts
  // Let's simulate simple: High gets 3 slots, Low gets 1 slot in cycle
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      
      // 1. Generate Requests (simulating higher layers demanding pairs)
      if (Math.random() > 0.7 && queueHigh.length < 5) {
         setQueueHigh(prev => [...prev, { id: Date.now(), vcType: 'HighFid', age: 0 }]);
      }
      if (Math.random() > 0.6 && queueLow.length < 5) {
         setQueueLow(prev => [...prev, { id: Date.now() + 1, vcType: 'LowFid', age: 0 }]);
      }

      // 2. Aging Logic (Decoherence in Physical Memory)
      setPhysicalMemory(prev => {
         return prev.map(item => ({ ...item, age: item.age + 1 }))
                    .filter(item => item.age < 10); // Expire after 10 ticks
      });

      // 3. Scheduling Logic (Simplified Weighted)
      // In this visual, we just alternate pulling from queues into memory
      // if memory has space.
      
      const currentMemSize = physicalMemory.length;
      if (currentMemSize < MEMORY_LIMIT) {
         // Determine who's turn based on tick (3 High, 1 Low pattern)
         const slot = tick % 4;
         const isHighTurn = slot < 3; 
         setTurn(isHighTurn ? 'High' : 'Low');

         if (isHighTurn && queueHigh.length > 0) {
            const [next, ...rest] = queueHigh;
            setQueueHigh(rest);
            setPhysicalMemory(prev => [...prev, next]);
         } else if (!isHighTurn && queueLow.length > 0) {
             const [next, ...rest] = queueLow;
             setQueueLow(rest);
             setPhysicalMemory(prev => [...prev, next]);
         } else if (isHighTurn && queueHigh.length === 0 && queueLow.length > 0) {
             // Work conservation (Under-subscribed)
             const [next, ...rest] = queueLow;
             setQueueLow(rest);
             setPhysicalMemory(prev => [...prev, next]);
         }
      }

    }, 800);

    return () => clearInterval(interval);
  }, [queueHigh, queueLow, physicalMemory, tick]);


  return (
    <div className="my-10 bg-slate-900 text-white p-6 rounded-2xl border border-slate-700 shadow-2xl select-none">
      
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
           <Scale className="text-orange-500" />
           <h4 className="font-bold text-lg">منطق زمان‌بندی و صف‌بندی</h4>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
           <Clock size={14}/> Tick: {tick}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
         
         {/* LOGICAL QUEUES */}
         <div className="flex-1 flex flex-col gap-4">
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">صف‌های منطقی (Logical Queues)</h5>
            
            {/* High Fid Queue */}
            <div className={`bg-slate-800 p-4 rounded-xl border-2 transition-colors duration-300 ${turn === 'High' ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-slate-700'}`}>
               <div className="flex justify-between mb-2">
                 <span className="text-xs font-bold text-blue-300">High Fidelity VC</span>
                 <span className="text-[10px] bg-blue-900 text-blue-200 px-2 py-0.5 rounded">Weight: 3x</span>
               </div>
               <div className="flex gap-2 h-10 items-center overflow-hidden">
                  {queueHigh.map(r => (
                    <div key={r.id} className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold shadow-sm animate-in slide-in-from-right">Q</div>
                  ))}
                  {queueHigh.length === 0 && <span className="text-[10px] text-slate-600 italic">Empty</span>}
               </div>
            </div>

            {/* Low Fid Queue */}
            <div className={`bg-slate-800 p-4 rounded-xl border-2 transition-colors duration-300 ${turn === 'Low' ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-slate-700'}`}>
               <div className="flex justify-between mb-2">
                 <span className="text-xs font-bold text-purple-300">Low Fidelity VC</span>
                 <span className="text-[10px] bg-purple-900 text-purple-200 px-2 py-0.5 rounded">Weight: 1x</span>
               </div>
               <div className="flex gap-2 h-10 items-center overflow-hidden">
                  {queueLow.map(r => (
                    <div key={r.id} className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-[10px] font-bold shadow-sm animate-in slide-in-from-right">Q</div>
                  ))}
                  {queueLow.length === 0 && <span className="text-[10px] text-slate-600 italic">Empty</span>}
               </div>
            </div>
         </div>

         {/* SCHEDULER */}
         <div className="flex flex-col items-center justify-center w-16">
             <div className="h-full w-1 bg-slate-700 relative">
                {/* Moving Indicator */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10 transition-all duration-300 ${turn === 'High' ? 'top-[25%]' : 'top-[75%]'}`}>
                   <RefreshCcw size={16} className="text-slate-900 animate-spin-slow" />
                </div>
             </div>
         </div>

         {/* PHYSICAL MEMORY */}
         <div className="flex-1 bg-slate-950 p-6 rounded-xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2">
               <Database size={24} className="text-slate-700" />
            </div>
            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">حافظه فیزیکی مشترک (Physical Memory)</h5>
            
            <div className="grid grid-cols-3 gap-4">
               {Array.from({ length: MEMORY_LIMIT }).map((_, idx) => {
                 const item = physicalMemory[idx];
                 return (
                   <div key={idx} className="aspect-square rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center relative bg-slate-900">
                      {item ? (
                        <div className={`w-10 h-10 rounded-full flex flex-col items-center justify-center transition-all duration-500 animate-in zoom-in
                           ${item.vcType === 'HighFid' ? 'bg-blue-600' : 'bg-purple-600'}
                           ${item.age > 7 ? 'animate-pulse bg-red-500' : ''}
                        `}>
                           <span className="text-[10px] font-bold">{item.vcType === 'HighFid' ? 'H' : 'L'}</span>
                           <span className="text-[8px] opacity-80">{item.age}ms</span>
                        </div>
                      ) : (
                        <span className="text-slate-800 text-[9px]">Free</span>
                      )}
                   </div>
                 )
               })}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 bg-slate-900 p-2 rounded border border-slate-800">
               <Trash2 size={12} className="text-red-500" />
               <span>قانون FIFO: قدیمی‌ترین آیتم‌ها برای Swap انتخاب می‌شوند. اگر Age {'>'} 10 شود، دور ریخته می‌شوند.</span>
            </div>
         </div>

      </div>

      <div className="mt-6 text-xs text-slate-400 leading-5 text-justify border-t border-slate-800 pt-4">
         <strong>توضیح الگوریتم:</strong> در اینجا می‌بینید که درخواست‌های High Fidelity (آبی) با وزن بیشتری (۳ به ۱) وارد حافظه می‌شوند. این عادلانه است زیرا تولید آن‌ها در دنیای واقعی زمان بیشتری می‌برد. اگر حافظه پر شود، هر دو صف باید صبر کنند. این مکانیسم تضمین می‌کند که مدارهای با کیفیت بالا، سهم عادلانه‌ای از زمان لینک را دریافت کنند.
      </div>
    </div>
  );
};