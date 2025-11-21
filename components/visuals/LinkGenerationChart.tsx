
import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export const LinkGenerationChart: React.FC = () => {
  const [hoverX, setHoverX] = useState<number | null>(null);

  // Parameters mimicking the paper's chart
  // Exponential CDF: F(t) = 1 - e^(-lambda * t)
  // With Mean = 10ms => lambda = 1/10 = 0.1
  const lambda = 0.1;
  const points: { x: number, y: number }[] = [];
  
  for (let x = 0; x <= 110; x += 1) {
    const y = 1 - Math.exp(-lambda * x);
    points.push({ x, y });
  }

  // SVG Scaling
  const width = 500;
  const height = 250;
  const padding = { left: 50, right: 20, top: 20, bottom: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const xScale = (val: number) => (val / 110) * chartWidth;
  const yScale = (val: number) => chartHeight - (val * chartHeight);

  // Path Generator
  const pathData = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${padding.left + xScale(p.x)} ${padding.top + yScale(p.y)}`
  ).join(' ');

  // Special Markers
  const meanX = 10; // 10ms
  const p95X = 30;  // 30ms (approx where 1 - e^(-3) ≈ 0.95)

  // Helper to get Y for tooltip
  const getY = (x: number) => 1 - Math.exp(-lambda * x);

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm my-6 select-none">
      <div className="flex justify-between items-center mb-4">
         <h5 className="font-bold text-slate-800 text-sm flex items-center gap-2">
           <Activity size={16} className="text-blue-600"/>
           توزیع تجمعی زمان تولید لینک (CDF)
         </h5>
         <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500">Fig. 5 Recreated</span>
      </div>

      <div className="relative w-full aspect-[2/1] md:h-[300px] overflow-visible group">
         <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            
            {/* Grid Lines (Y) */}
            {[0, 0.25, 0.5, 0.75, 1].map(tick => (
              <g key={tick}>
                <line 
                  x1={padding.left} 
                  y1={padding.top + yScale(tick)} 
                  x2={width - padding.right} 
                  y2={padding.top + yScale(tick)} 
                  stroke="#e2e8f0" 
                  strokeDasharray="4 4"
                />
                <text 
                  x={padding.left - 10} 
                  y={padding.top + yScale(tick) + 4} 
                  textAnchor="end" 
                  className="text-[10px] fill-slate-400 font-mono"
                >{tick}</text>
              </g>
            ))}

            {/* Grid Lines (X) */}
            {[0, 20, 40, 60, 80, 100].map(tick => (
              <g key={tick}>
                <line 
                   x1={padding.left + xScale(tick)}
                   y1={padding.top}
                   x2={padding.left + xScale(tick)}
                   y2={height - padding.bottom}
                   stroke="#e2e8f0"
                   strokeDasharray="4 4"
                />
                <text 
                  x={padding.left + xScale(tick)} 
                  y={height - padding.bottom + 15} 
                  textAnchor="middle" 
                  className="text-[10px] fill-slate-400 font-mono"
                >{tick}</text>
              </g>
            ))}

            {/* Axes Labels */}
            <text 
               x={width / 2} 
               y={height - 5} 
               textAnchor="middle" 
               className="text-xs font-bold fill-slate-600"
            >Link-pair generation time (ms)</text>
            
            <text 
               transform={`rotate(-90, 15, ${height/2})`} 
               x={15} 
               y={height/2} 
               textAnchor="middle" 
               className="text-xs font-bold fill-slate-600"
            >Fraction of pairs</text>

            {/* Main Curve */}
            <path d={pathData} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-md" />

            {/* Marker: Mean (10ms) */}
            <line 
               x1={padding.left + xScale(meanX)} y1={padding.top + yScale(0)}
               x2={padding.left + xScale(meanX)} y2={padding.top + yScale(getY(meanX))}
               stroke="#f97316" strokeWidth="2" strokeDasharray="5 2"
            />
            <circle cx={padding.left + xScale(meanX)} cy={padding.top + yScale(getY(meanX))} r="4" fill="#f97316" />

            {/* Marker: 95th Percentile (30ms) */}
            <line 
               x1={padding.left + xScale(p95X)} y1={padding.top + yScale(0)}
               x2={padding.left + xScale(p95X)} y2={padding.top + yScale(getY(p95X))}
               stroke="#16a34a" strokeWidth="2" strokeDasharray="5 2"
            />
            <circle cx={padding.left + xScale(p95X)} cy={padding.top + yScale(getY(p95X))} r="4" fill="#16a34a" />

            {/* Interactive Hover Effect */}
            {hoverX !== null && (
              <g>
                <line 
                   x1={padding.left + xScale(hoverX)} y1={padding.top + yScale(0)}
                   x2={padding.left + xScale(hoverX)} y2={padding.top + yScale(getY(hoverX))}
                   stroke="#64748b" strokeWidth="1"
                />
                <circle cx={padding.left + xScale(hoverX)} cy={padding.top + yScale(getY(hoverX))} r="4" fill="#64748b" />
                <rect 
                   x={padding.left + xScale(hoverX) + 10} 
                   y={padding.top + yScale(getY(hoverX)) - 30}
                   width="80" height="35" rx="4" fill="#1e293b" 
                />
                 <text x={padding.left + xScale(hoverX) + 50} y={padding.top + yScale(getY(hoverX)) - 18} textAnchor="middle" className="fill-white text-[10px] font-bold">
                   {hoverX.toFixed(0)}ms
                 </text>
                 <text x={padding.left + xScale(hoverX) + 50} y={padding.top + yScale(getY(hoverX)) - 6} textAnchor="middle" className="fill-blue-300 text-[9px]">
                   {(getY(hoverX) * 100).toFixed(1)}%
                 </text>
              </g>
            )}

            {/* Interactive Overlay Rect */}
            <rect 
              x={padding.left} y={padding.top} width={chartWidth} height={chartHeight} fill="transparent"
              onMouseMove={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const x = e.clientX - rect.left;
                 const val = (x / chartWidth) * 110;
                 setHoverX(Math.max(0, Math.min(110, val)));
              }}
              onMouseLeave={() => setHoverX(null)}
            />

         </svg>

         {/* Legend Overlay */}
         <div className="absolute top-10 right-16 bg-white/90 border border-slate-200 p-2 rounded shadow-sm text-[10px]">
            <div className="flex items-center gap-2 mb-1">
               <div className="w-3 h-0.5 bg-orange-500"></div>
               <span className="text-slate-700">Mean Value (~10ms)</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-3 h-0.5 bg-green-600"></div>
               <span className="text-slate-700">95th Percentile (~30ms)</span>
            </div>
         </div>
      </div>
      
      <div className="text-xs text-slate-500 text-center px-4 leading-5">
         <strong>تحلیل نمودار:</strong> به طور متوسط باید ۱۰ میلی‌ثانیه صبر کنیم، اما در ۵ درصد موارد، زمان انتظار به بیش از ۳۰ میلی‌ثانیه می‌رسد. این ماهیت احتمالی (Probabilistic) چالش اصلی در زمان‌بندی دقیق است.
      </div>
    </div>
  );
};
