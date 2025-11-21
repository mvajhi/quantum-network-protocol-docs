
import React from 'react';
import { Code, Layers, Cpu, Box, Activity } from 'lucide-react';

export const NetSquidArchitecture: React.FC = () => {
  return (
    <div className="my-8 select-none">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-2xl max-w-md mx-auto relative overflow-hidden">
        
        {/* Title */}
        <div className="text-center mb-8 relative z-10">
          <h4 className="text-blue-400 font-bold text-lg">پشته شبیه‌سازی (Simulation Stack)</h4>
          <p className="text-slate-500 text-xs">ساختار پیاده‌سازی پروژه</p>
        </div>

        {/* Stack Container */}
        <div className="flex flex-col gap-2 relative z-10">
          
          {/* Top Layer: QNP */}
          <div className="bg-blue-600 rounded-lg p-4 flex items-center gap-4 shadow-lg transform hover:scale-105 transition-transform border-2 border-blue-400">
            <div className="bg-white/20 p-2 rounded-md">
              <Code size={24} className="text-white" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">QNP Implementation</h5>
              <p className="text-blue-200 text-[10px]">Python Code (This Work)</p>
            </div>
          </div>

          {/* Middle Layer: Link Layer */}
          <div className="bg-purple-700 rounded-lg p-4 flex items-center gap-4 shadow-md transform hover:scale-105 transition-transform border-2 border-purple-500 opacity-90">
            <div className="bg-white/20 p-2 rounded-md">
              <Layers size={24} className="text-white" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Link Layer Protocol</h5>
              <p className="text-purple-200 text-[10px]">Ref. [22] Implementation</p>
            </div>
          </div>

          {/* Bottom Layer: NetSquid */}
          <div className="bg-slate-800 rounded-lg p-4 flex flex-col gap-2 shadow-md border-2 border-slate-600 mt-2">
            <div className="flex items-center gap-4">
               <div className="bg-orange-500/20 p-2 rounded-md text-orange-500">
                 <Cpu size={24} />
               </div>
               <div>
                 <h5 className="font-bold text-slate-200 text-sm">NetSquid Simulator</h5>
                 <p className="text-slate-500 text-[10px]">Discrete Event Engine (Python/C++)</p>
               </div>
            </div>
            
            {/* Sub-components of NetSquid */}
            <div className="grid grid-cols-2 gap-2 mt-2">
               <div className="bg-slate-900 p-2 rounded text-[10px] text-slate-400 flex items-center gap-2 border border-slate-700">
                  <Activity size={12} className="text-red-400"/> Decoherence
               </div>
               <div className="bg-slate-900 p-2 rounded text-[10px] text-slate-400 flex items-center gap-2 border border-slate-700">
                  <Box size={12} className="text-yellow-400"/> Fiber Loss
               </div>
               <div className="bg-slate-900 p-2 rounded text-[10px] text-slate-400 flex items-center gap-2 border border-slate-700">
                  <Activity size={12} className="text-green-400"/> Gate Noise
               </div>
               <div className="bg-slate-900 p-2 rounded text-[10px] text-slate-400 flex items-center gap-2 border border-slate-700">
                  <Box size={12} className="text-blue-400"/> Delays
               </div>
            </div>
          </div>

        </div>

        {/* Background Deco */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      </div>
    </div>
  );
};