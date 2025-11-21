
import React from 'react';
import { Wifi, Box } from 'lucide-react';

export const QubitTypes: React.FC = () => {
  return (
    <div className="my-6 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg text-white">
      <h4 className="text-center font-bold mb-6 text-blue-300">انواع کیوبیت در سخت‌افزار</h4>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        
        {/* Hardware Representation */}
        <div className="relative w-48 h-48 bg-slate-900 rounded-2xl border-2 border-slate-600 p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center">
          
          {/* Chip Label */}
          <span className="absolute top-2 left-2 text-[10px] font-mono text-slate-500">QPU</span>

          {/* Communication Qubits (Edge) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col gap-2 bg-slate-800 p-1 rounded-r-lg border-y border-r border-slate-600">
             <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
             <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
          </div>
          
          {/* Connection lines inside chip */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <line x1="50%" y1="50%" x2="95%" y2="50%" stroke="white" strokeWidth="1" />
            <circle cx="50%" cy="50%" r="30" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          </svg>

          {/* Storage Qubits (Center) */}
          <div className="grid grid-cols-2 gap-2 relative z-10">
             <div className="w-6 h-6 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-[8px]">S1</div>
             <div className="w-6 h-6 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-[8px]">S2</div>
             <div className="w-6 h-6 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-[8px]">S3</div>
             <div className="w-6 h-6 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-[8px]">S4</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-start bg-slate-700/50 p-3 rounded-lg border border-slate-600">
             <div className="mt-1 bg-green-500/20 p-2 rounded-full text-green-400">
               <Wifi size={18} />
             </div>
             <div>
               <h5 className="font-bold text-green-400 text-sm">کیوبیت‌های ارتباطی (Comm)</h5>
               <p className="text-xs text-slate-400 leading-5 max-w-[200px] mt-1">
                 تنها این کیوبیت‌ها می‌توانند مستقیماً با شبکه (فوتون‌ها) برهم‌کنش داشته باشند و درهم‌تنیدگی ایجاد کنند.
               </p>
             </div>
          </div>

          <div className="flex gap-3 items-start bg-slate-700/50 p-3 rounded-lg border border-slate-600">
             <div className="mt-1 bg-blue-500/20 p-2 rounded-full text-blue-400">
               <Box size={18} />
             </div>
             <div>
               <h5 className="font-bold text-blue-400 text-sm">کیوبیت‌های حافظه (Storage)</h5>
               <p className="text-xs text-slate-400 leading-5 max-w-[200px] mt-1">
                 برای ذخیره‌سازی اطلاعات کوانتومی استفاده می‌شوند اما مستقیماً به فیبر نوری وصل نیستند.
               </p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
