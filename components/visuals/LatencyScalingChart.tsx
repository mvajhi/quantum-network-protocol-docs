
import React, { useState } from 'react';
import { Activity, Clock } from 'lucide-react';

export const LatencyScalingChart: React.FC = () => {
  const [cutoff, setCutoff] = useState<'long' | 'short'>('long');
  const [circuits, setCircuits] = useState<1 | 2 | 4>(1);

  // Chart dimensions
  const width = 500;
  const height = 300;
  const padding = { left: 50, right: 20, top: 40, bottom: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Helper to scale coordinates
  const xScale = (req: number) => padding.left + ((req - 1) / 7) * chartWidth; // requests 1 to 8
  const yScale = (val: number) => padding.top + chartHeight - (val / 75) * chartHeight; // max latency ~75s

  // --- Data Generators based on Figure 8 trends ---
  const getData = (fid: number) => {
    const points = [];
    for (let r = 1; r <= 8; r++) {
      let y = 0;
      
      if (circuits === 1) {
        // Linear growth
        // Long Cutoff: ~0 to 50s for F=0.9
        // Short Cutoff: ~0 to 30s for F=0.9
        const slope = cutoff === 'long' ? (fid === 0.9 ? 6 : 1.5) : (fid === 0.9 ? 3.5 : 1);
        y = r * slope;
      } 
      else if (circuits === 2) {
        // Similar linear but slightly different slope
        const slope = cutoff === 'long' ? (fid === 0.9 ? 4.5 : 1.2) : (fid === 0.9 ? 2.8 : 0.8);
        y = r * slope;
      } 
      else if (circuits === 4) {
        if (cutoff === 'long') {
           // Congestion Collapse! Exponential-ish jump at r=2/3
           if (fid === 0.9) {
             y = r < 2 ? r * 5 : r < 4 ? r * 10 : 75; // Max out quickly
           } else {
             y = r < 3 ? r * 2 : r * 8;
           }
        } else {
           // Short Cutoff fixes it -> Linear
           const slope = fid === 0.9 ? 3.5 : 1.2;
           y = r * slope;
        }
      }
      
      // Add baseline offset
      y += (fid === 0.9 ? 5 : 1);

      points.push({ x: r, y: Math.min(y, 75) });
    }
    return points;
  };

  const renderLine = (fid: number, color: string) => {
    const data = getData(fid);
    const path = data.map((p, i) => (i === 0 ? `M ${xScale(p.x)} ${yScale(p.y)}` : `L ${xScale(p.x)} ${yScale(p.y)}`)).join(' ');
    
    return (
      <g>
         <path d={path} fill="none" stroke={color} strokeWidth="2" />
         {data.map((p, i) => (
           <circle key={i} cx={xScale(p.x)} cy={yScale(p.y)} r="3" fill={color} className="hover:r-5 transition-all" />
         ))}
      </g>
    );
  };

  return (
    <div className="my-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm select-none">
       
       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
             <Activity className="text-blue-600" />
             <h4 className="font-bold text-slate-800">مقیاس‌پذیری تاخیر (شکل ۸)</h4>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
             {/* Circuit Toggle */}
             <div className="flex bg-slate-100 p-1 rounded-lg">
                {[1, 2, 4].map(c => (
                   <button 
                     key={c}
                     onClick={() => setCircuits(c as any)}
                     className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${circuits === c ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                     {c} Circuit{c>1?'s':''}
                   </button>
                ))}
             </div>

             {/* Cutoff Toggle */}
             <div className="flex bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setCutoff('long')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${cutoff === 'long' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Long Cutoff
                </button>
                <button 
                  onClick={() => setCutoff('short')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${cutoff === 'short' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Short Cutoff
                </button>
             </div>
          </div>
       </div>

       <div className="relative w-full h-[300px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
             {/* Axes */}
             <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#cbd5e1" strokeWidth="2" />
             <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#cbd5e1" strokeWidth="2" />
             
             {/* Grid */}
             {[0, 25, 50, 75].map(tick => (
                <g key={tick}>
                   <line x1={padding.left} y1={yScale(tick)} x2={width - padding.right} y2={yScale(tick)} stroke="#f1f5f9" />
                   <text x={padding.left - 10} y={yScale(tick) + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">{tick}s</text>
                </g>
             ))}
             {[1, 2, 3, 4, 5, 6, 7, 8].map(tick => (
                <g key={tick}>
                   <text x={xScale(tick)} y={height - padding.bottom + 15} textAnchor="middle" className="text-[10px] fill-slate-400 font-mono">{tick}</text>
                </g>
             ))}

             {/* Lines */}
             {renderLine(0.7, '#3b82f6')} {/* Blue F=0.7 */}
             {renderLine(0.8, '#f97316')} {/* Orange F=0.8 */}
             {renderLine(0.9, '#22c55e')} {/* Green F=0.9 */}

             {/* Labels */}
             <text transform={`rotate(-90, 15, ${height/2})`} x={15} y={height/2} textAnchor="middle" className="text-xs font-bold fill-slate-600">Latency (s)</text>
             <text x={width/2} y={height - 5} textAnchor="middle" className="text-xs font-bold fill-slate-600">Number of Requests</text>

             {/* Legend */}
             <g transform={`translate(${padding.left + 20}, ${padding.top})`}>
                <circle cx="0" cy="0" r="3" fill="#3b82f6"/> <text x="10" y="4" className="text-[10px] fill-slate-500">F=0.7</text>
                <circle cx="0" cy="15" r="3" fill="#f97316"/> <text x="10" y="19" className="text-[10px] fill-slate-500">F=0.8</text>
                <circle cx="0" cy="30" r="3" fill="#22c55e"/> <text x="10" y="34" className="text-[10px] fill-slate-500">F=0.9</text>
             </g>
          </svg>
       </div>

       <div className="mt-4 bg-slate-50 p-3 rounded border border-slate-100 text-xs text-slate-600 text-justify">
          {circuits === 4 && cutoff === 'long' ? (
             <div className="flex gap-2 text-red-600 font-bold">
                <Clock size={16}/>
                <span>هشدار: فروپاشی ازدحام مشاهده می‌شود! (Quantum Congestion Collapse)</span>
             </div>
          ) : (
             <span>رشد خطی نرمال. با افزایش تعداد درخواست‌ها، تاخیر به صورت خطی افزایش می‌یابد که نشان‌دهنده تسهیم مناسب منابع است.</span>
          )}
       </div>

    </div>
  );
};