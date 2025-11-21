
import React from 'react';
import { Clock, Zap } from 'lucide-react';

export const ParallelismDemo: React.FC = () => {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
      
      {/* Sequential Model (Bad) */}
      <div className="bg-white border-2 border-slate-200 rounded-xl p-6 opacity-70">
        <div className="flex justify-between items-start mb-6">
           <h5 className="font-bold text-slate-700 flex items-center gap-2">
             <Clock size={18} className="text-red-500" />
             روش ترتیبی (Sequential)
           </h5>
           <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-bold">کند</span>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-2 pl-4 border-l-2 border-slate-300">
           <div className="h-8 bg-slate-200 w-3/4 rounded flex items-center px-2 text-xs text-slate-600">
             1. Generate Link A (10ms)
           </div>
           <div className="h-8 bg-slate-200 w-3/4 rounded flex items-center px-2 text-xs text-slate-600 ml-8">
             2. Generate Link B (10ms)
           </div>
           <div className="h-8 bg-slate-200 w-3/4 rounded flex items-center px-2 text-xs text-slate-600 ml-16">
             3. Generate Link C (10ms)
           </div>
           <div className="h-8 bg-red-100 w-full rounded flex items-center px-2 text-xs font-bold text-red-600 mt-2 border border-red-200">
             Total Time = 30ms (Decoherence Risk!)
           </div>
        </div>
      </div>

      {/* Parallel Model (Good - Our Protocol) */}
      <div className="bg-white border-2 border-blue-500 rounded-xl p-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] px-3 py-1 rounded-bl-lg font-bold">
          QNP DESIGN
        </div>
        <div className="flex justify-between items-start mb-6">
           <h5 className="font-bold text-blue-700 flex items-center gap-2">
             <Zap size={18} className="text-yellow-500 fill-yellow-500" />
             روش موازی (Parallel)
           </h5>
           <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded font-bold">سریع</span>
        </div>

         {/* Timeline */}
        <div className="relative flex flex-col gap-2 pl-4 border-l-2 border-blue-300">
           {/* All start at same time */}
           <div className="relative h-24 w-full">
              <div className="absolute top-0 left-0 h-6 bg-blue-100 w-2/3 rounded flex items-center px-2 text-xs text-blue-800 border border-blue-200">
                 Gen Link A
              </div>
              <div className="absolute top-8 left-0 h-6 bg-blue-100 w-3/4 rounded flex items-center px-2 text-xs text-blue-800 border border-blue-200">
                 Gen Link B (Slowest)
              </div>
              <div className="absolute top-16 left-0 h-6 bg-blue-100 w-1/2 rounded flex items-center px-2 text-xs text-blue-800 border border-blue-200">
                 Gen Link C
              </div>
           </div>
           
           <div className="h-8 bg-green-100 w-3/4 rounded flex items-center px-2 text-xs font-bold text-green-700 mt-2 border border-green-200">
             Total Time = Max(Link) ≈ 10-15ms
           </div>
        </div>

        <p className="text-xs text-slate-500 mt-4 leading-5">
          با استفاده از مدارهای مجازی (VC)، می‌توانیم تمام منابع مسیر را همزمان فعال کنیم. این کار زمان انتظار کیوبیت‌ها در حافظه را به شدت کاهش می‌دهد.
        </p>
      </div>

    </div>
  );
};