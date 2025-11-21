
import React, { useState } from 'react';
import { Activity, Clock, AlertTriangle } from 'lucide-react';

export const DecoherenceRobustnessChart: React.FC = () => {
  const [view, setView] = useState<'memory' | 'delay'>('memory');
  const [fidelity, setFidelity] = useState<0.8 | 0.9>(0.9);

  // Chart Dimensions
  const width = 500;
  const height = 300;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // --- Data Generators ---

  // View 1: Throughput vs Memory Lifetime (Log X)
  // Approx Logic: Logistic curve starting low at 0.1s, maxing out at ~5s.
  // F=0.9 is lower/slower than F=0.8.
  // Cutoff strategy is slightly better than Oracle.
  const getMemoryData = (fid: number, type: 'cutoff' | 'oracle') => {
    const points = [];
    // Log steps from 0.1 to 50
    const xPoints = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];
    
    for (let x of xPoints) {
       let y = 0;
       const saturation = fid === 0.9 ? 10 : 50; // F=0.8 is much faster
       const inflection = fid === 0.9 ? 2 : 0.8; // F=0.9 needs more memory time
       
       // Sigmoid-ish
       y = saturation * (x / (x + inflection));
       
       // Oracle is slightly worse (per paper text "cutoff timer is more efficient")
       if (type === 'oracle') y *= 0.9;
       
       points.push({ x, y });
    }
    return points;
  };

  // View 2: Throughput vs Message Delay (Log X)
  // Flat until delay ~ cutoff, then crash.
  // F=0.9 (cutoff ~20ms?), F=0.8 (cutoff ~50ms?)
  const getDelayData = (fid: number) => {
      const points = [];
      // Log steps: 10^-7 to 10^-1
      const xPoints = [1e-7, 1e-6, 1e-5, 1e-4, 1e-3, 5e-3, 1e-2, 2e-2, 5e-2, 1e-1];
      
      for (let x of xPoints) {
          const baseRate = fid === 0.9 ? 4 : 50;
          const cutoffThreshold = 0.02; // ~20ms
          
          let y = baseRate;
          if (x > cutoffThreshold) {
              // Steep drop
              y = baseRate * Math.exp(-(x - cutoffThreshold) * 100); 
              if (y < 0.1) y = 0;
          }
          points.push({ x, y });
      }
      return points;
  };

  // --- Scales ---
  // Memory X: Log 0.1 to 50
  const scaleXMem = (val: number) => {
     const min = Math.log10(0.1);
     const max = Math.log10(50);
     const v = Math.log10(val);
     return ((v - min) / (max - min)) * chartW;
  };

  // Delay X: Log 1e-7 to 1e-1
  const scaleXDelay = (val: number) => {
     const min = Math.log10(1e-7);
     const max = Math.log10(1e-1);
     const v = Math.log10(val);
     return ((v - min) / (max - min)) * chartW;
  };

  const scaleY = (val: number) => {
     const max = 55; // Max throughput
     return chartH - (val / max) * chartH;
  };

  // --- Render Helper ---
  const renderLine = (data: {x:number, y:number}[], color: string, dashed = false, xScaleFunc: any) => {
     const path = data.map((p, i) => 
        (i === 0 ? `M ${padding.left + xScaleFunc(p.x)} ${padding.top + scaleY(p.y)}` 
                 : `L ${padding.left + xScaleFunc(p.x)} ${padding.top + scaleY(p.y)}`)
     ).join(' ');

     return (
        <g>
           <path d={path} stroke={color} strokeWidth="2.5" fill="none" strokeDasharray={dashed ? "5,5" : "0"} />
           {data.map((p, i) => (
              <circle key={i} cx={padding.left + xScaleFunc(p.x)} cy={padding.top + scaleY(p.y)} r="3" fill={color} />
           ))}
        </g>
     );
  };

  return (
    <div className="my-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm select-none">
       
       {/* Controls */}
       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg">
             <button 
               onClick={() => setView('memory')}
               className={`px-4 py-2 text-xs font-bold rounded-md transition-colors ${view === 'memory' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
               تاثیر حافظه (Memory Lifetime)
             </button>
             <button 
               onClick={() => setView('delay')}
               className={`px-4 py-2 text-xs font-bold rounded-md transition-colors ${view === 'delay' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
               تاثیر تاخیر پیام (Message Delay)
             </button>
          </div>

          {view === 'memory' && (
             <div className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200">
               مقایسه استراتژی: <span className="text-blue-500 font-bold">Cutoff</span> vs <span className="text-orange-500 font-bold">Oracle</span>
             </div>
          )}
       </div>

       <div className="relative w-full h-[300px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
             
             {/* Axes */}
             <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#cbd5e1" strokeWidth="2" />
             <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#cbd5e1" strokeWidth="2" />

             {/* Y Grid & Labels */}
             {[0, 10, 20, 30, 40, 50].map(tick => (
                <g key={tick}>
                   <line x1={padding.left} y1={padding.top + scaleY(tick)} x2={width - padding.right} y2={padding.top + scaleY(tick)} stroke="#f1f5f9" />
                   <text x={padding.left - 10} y={padding.top + scaleY(tick) + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">{tick}</text>
                </g>
             ))}
             <text transform={`rotate(-90, 15, ${height/2})`} x={15} y={height/2} textAnchor="middle" className="text-xs font-bold fill-slate-600">Throughput (pairs/s)</text>


             {/* X Grid & Logic based on View */}
             {view === 'memory' ? (
                <>
                   {[0.1, 1, 10, 50].map(tick => (
                      <g key={tick}>
                         <text x={padding.left + scaleXMem(tick)} y={height - padding.bottom + 15} textAnchor="middle" className="text-[10px] fill-slate-400 font-mono">{tick}s</text>
                         <line x1={padding.left + scaleXMem(tick)} y1={height - padding.bottom} x2={padding.left + scaleXMem(tick)} y2={height - padding.bottom + 5} stroke="#cbd5e1" />
                      </g>
                   ))}
                   <text x={width/2} y={height - 10} textAnchor="middle" className="text-xs font-bold fill-slate-600">Memory Lifetime T*2 (s) - Log Scale</text>

                   {/* Lines F=0.9 */}
                   {renderLine(getMemoryData(0.9, 'cutoff'), '#3b82f6', false, scaleXMem)}
                   {renderLine(getMemoryData(0.9, 'oracle'), '#f97316', true, scaleXMem)}
                   
                   {/* Lines F=0.8 (Much Higher) */}
                   {renderLine(getMemoryData(0.8, 'cutoff'), '#3b82f6', false, scaleXMem)}
                   {renderLine(getMemoryData(0.8, 'oracle'), '#f97316', true, scaleXMem)}
                   
                   {/* Annotations */}
                   <text x={padding.left + scaleXMem(2)} y={padding.top + scaleY(48)} className="text-[10px] fill-slate-500 font-bold">F=0.8</text>
                   <text x={padding.left + scaleXMem(5)} y={padding.top + scaleY(8)} className="text-[10px] fill-slate-500 font-bold">F=0.9</text>
                </>
             ) : (
                <>
                   {[1e-7, 1e-5, 1e-3, 1e-1].map(tick => (
                      <g key={tick}>
                         <text x={padding.left + scaleXDelay(tick)} y={height - padding.bottom + 15} textAnchor="middle" className="text-[10px] fill-slate-400 font-mono">10^{Math.log10(tick)}</text>
                         <line x1={padding.left + scaleXDelay(tick)} y1={height - padding.bottom} x2={padding.left + scaleXDelay(tick)} y2={height - padding.bottom + 5} stroke="#cbd5e1" />
                      </g>
                   ))}
                   <text x={width/2} y={height - 10} textAnchor="middle" className="text-xs font-bold fill-slate-600">Message Delay (s) - Log Scale</text>

                   {/* Lines */}
                   {renderLine(getDelayData(0.8), '#f97316', false, scaleXDelay)}
                   {renderLine(getDelayData(0.9), '#3b82f6', false, scaleXDelay)}

                   {/* Cutoff Marker */}
                   <line 
                     x1={padding.left + scaleXDelay(0.02)} y1={padding.top} 
                     x2={padding.left + scaleXDelay(0.02)} y2={height - padding.bottom} 
                     stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" 
                   />
                   <text x={padding.left + scaleXDelay(0.02) - 5} y={padding.top + 10} textAnchor="end" className="text-[10px] fill-green-600 font-bold rotate-90">Cutoff Threshold</text>
                </>
             )}

          </svg>
          
          {/* Legend */}
          <div className="absolute top-8 right-10 bg-white/90 border border-slate-200 p-2 rounded shadow-sm text-[10px]">
             {view === 'memory' ? (
               <>
                 <div className="flex items-center gap-2 mb-1"><div className="w-3 h-0.5 bg-blue-500"></div> Cutoff Strategy (QNP)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-orange-500 border-dashed border-b-2"></div> Oracle Strategy</div>
               </>
             ) : (
               <>
                  <div className="flex items-center gap-2 mb-1"><div className="w-3 h-0.5 bg-orange-500"></div> F=0.8 Throughput</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-blue-500"></div> F=0.9 Throughput</div>
               </>
             )}
          </div>
       </div>
       
       <div className="mt-4 text-xs text-slate-600 text-justify bg-slate-50 p-3 rounded border-l-4 border-blue-500">
          {view === 'memory' 
            ? 'همانطور که می‌بینید، با کاهش عمر حافظه (حرکت به چپ)، پهنای باند کاهش می‌یابد. نکته جالب اینجاست که استراتژی Cutoff (خط آبی) حتی از استراتژی Oracle (خط نارنجی) که به اطلاعات غیرممکن دسترسی دارد، بهتر عمل می‌کند.'
            : 'تا زمانی که تاخیر پیام‌های کلاسیک (محور افقی) کمتر از زمان Cutoff (خط سبز) باشد، هیچ تاثیری بر کارایی شبکه ندارد. این نشان می‌دهد طراحی غیرمسدودکننده (Non-blocking) پروتکل چقدر موثر است.'
          }
       </div>

    </div>
  );
};