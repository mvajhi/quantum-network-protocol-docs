
import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';

export const ThroughputLatencyChart: React.FC = () => {
  const [hoverX, setHoverX] = useState<number | null>(null);

  // Data mimicking Fig 9
  // X: Throughput (pairs/s), Y: Latency (s)
  // Blue (Empty): Flat until ~26, then spikes
  // Orange (Congested): Flat until ~17, then spikes
  const dataEmpty = [
    {x: 3, y: 0.1}, {x: 6, y: 0.1}, {x: 9, y: 0.1}, {x: 12, y: 0.15}, {x: 15, y: 0.15}, 
    {x: 18, y: 0.18}, {x: 21, y: 0.2}, {x: 24, y: 0.3}, {x: 26.5, y: 1.0}, {x: 27, y: 4.0}
  ];
  
  const dataCongested = [
    {x: 3, y: 0.15}, {x: 6, y: 0.15}, {x: 9, y: 0.15}, {x: 12, y: 0.18}, {x: 15, y: 0.2}, 
    {x: 18, y: 0.6}, {x: 18.5, y: 4.0}
  ];

  const width = 500;
  const height = 250;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const xScale = (val: number) => padding.left + (val / 28) * chartW;
  const yScale = (val: number) => padding.top + chartH - (val / 4.5) * chartH;

  const generatePath = (data: any[]) => {
     return data.map((p, i) => (i===0 ? `M ${xScale(p.x)} ${yScale(p.y)}` : `L ${xScale(p.x)} ${yScale(p.y)}`)).join(' ');
  };

  return (
    <div className="my-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm select-none">
       <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
         <BarChart2 className="text-purple-600" />
         تاخیر در برابر پهنای باند (شکل ۹)
       </h4>

       <div className="relative w-full h-[250px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
             {/* Axes */}
             <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#cbd5e1" strokeWidth="2" />
             <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#cbd5e1" strokeWidth="2" />

             {/* Grid Y */}
             {[0, 1, 2, 3, 4].map(tick => (
                <g key={tick}>
                   <line x1={padding.left} y1={yScale(tick)} x2={width - padding.right} y2={yScale(tick)} stroke="#f1f5f9" />
                   <text x={padding.left - 10} y={yScale(tick) + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">{tick}s</text>
                </g>
             ))}
             
             {/* Grid X */}
             {[5, 10, 15, 20, 25].map(tick => (
                <g key={tick}>
                   <text x={xScale(tick)} y={height - padding.bottom + 15} textAnchor="middle" className="text-[10px] fill-slate-400 font-mono">{tick}</text>
                </g>
             ))}

             {/* Labels */}
             <text x={width/2} y={height - 5} textAnchor="middle" className="text-xs font-bold fill-slate-600">Throughput (pairs/s)</text>
             <text transform={`rotate(-90, 15, ${height/2})`} x={15} y={height/2} textAnchor="middle" className="text-xs font-bold fill-slate-600">Latency (s)</text>

             {/* Curves */}
             <path d={generatePath(dataEmpty)} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
             {dataEmpty.map((p, i) => <circle key={i} cx={xScale(p.x)} cy={yScale(p.y)} r="3" fill="#3b82f6" />)}

             <path d={generatePath(dataCongested)} fill="none" stroke="#f97316" strokeWidth="2.5" />
             {dataCongested.map((p, i) => <circle key={i} cx={xScale(p.x)} cy={yScale(p.y)} r="3" fill="#f97316" />)}

             {/* Saturation Lines (approx) */}
             <line x1={xScale(18)} y1={padding.top} x2={xScale(18)} y2={height - padding.bottom} stroke="#f97316" strokeDasharray="4 4" opacity="0.5"/>
             <line x1={xScale(27)} y1={padding.top} x2={xScale(27)} y2={height - padding.bottom} stroke="#3b82f6" strokeDasharray="4 4" opacity="0.5"/>

          </svg>

          {/* Legend */}
          <div className="absolute top-4 left-16 bg-white/90 border border-slate-200 p-2 rounded shadow-sm text-xs">
             <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Empty Network (Saturation ~27)</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Congested Network (Saturation ~18)</span>
             </div>
          </div>
       </div>

       <div className="mt-4 text-sm text-slate-600 bg-slate-50 p-3 rounded leading-6 text-justify border-l-4 border-orange-500">
          <strong>مشاهده جالب:</strong> در حالت شلوغ (نارنجی)، شبکه در پهنای باندی اشباع می‌شود که <em>بیشتر از نصف</em> حالت خالی است (۱۸ در مقابل ۲۷). این کمی عجیب است چون لینک گلوگاه بین دو مدار تقسیم شده. دلیل آن این است که لینک‌های غیرگلوگاه (که خلوت هستند) شانس بالاتری دارند که جفت آماده داشته باشند، پس وقتی لینک گلوگاه تولید می‌کند، احتمال Swap موفق بیشتر است.
       </div>
    </div>
  );
};