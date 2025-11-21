
import React from 'react';
import { Layers, ArrowUp, Monitor, GitCommit } from 'lucide-react';

export const LayeredDistillation: React.FC = () => {
  return (
    <div className="my-8 p-6 bg-slate-50 rounded-xl border border-slate-200 select-none">
      <h4 className="text-center font-bold text-slate-800 mb-8">معماری لایه‌ای پیشنهادی</h4>
      
      <div className="relative max-w-2xl mx-auto">
        
        {/* LAYER 3: Application / Virtual Circuit */}
        <div className="bg-purple-100 border-2 border-purple-300 rounded-xl p-4 mb-4 relative z-30 shadow-sm">
           <div className="absolute -top-3 right-4 bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">Layer 3: Service</div>
           <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                 <Monitor size={24} className="text-purple-700" />
                 <span className="text-xs font-bold text-purple-900 mt-1">App A</span>
              </div>
              
              <div className="flex-1 mx-4 h-2 bg-purple-300 rounded-full relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] text-purple-900 font-bold bg-purple-100 px-2 rounded">Virtual High-Fidelity Link</span>
                 </div>
              </div>

              <div className="flex flex-col items-center">
                 <Monitor size={24} className="text-purple-700" />
                 <span className="text-xs font-bold text-purple-900 mt-1">App B</span>
              </div>
           </div>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center -my-2 relative z-20">
           <ArrowUp size={24} className="text-slate-400 rotate-180" />
        </div>

        {/* LAYER 2: Distillation Module */}
        <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-4 mb-4 relative z-10 shadow-sm mx-8">
           <div className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">Layer 2: Distillation</div>
           <div className="text-center text-xs text-blue-800 mb-2">
             ماژول تقطیر (Distillation Module)
           </div>
           <div className="flex justify-center gap-2">
              <div className="bg-white border border-blue-200 px-3 py-1 rounded text-[10px] text-slate-600">Consume Pair 1</div>
              <div className="bg-white border border-blue-200 px-3 py-1 rounded text-[10px] text-slate-600">Consume Pair 2</div>
              <div className="text-blue-500 font-bold">&rarr;</div>
              <div className="bg-green-100 border border-green-300 px-3 py-1 rounded text-[10px] text-green-700 font-bold">1 Good Pair</div>
           </div>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center -my-2 relative z-20">
           <ArrowUp size={24} className="text-slate-400 rotate-180" />
        </div>

        {/* LAYER 1: QNP (Our Protocol) */}
        <div className="bg-slate-200 border-2 border-slate-400 rounded-xl p-4 relative z-0 shadow-inner">
           <div className="absolute -top-3 right-4 bg-slate-600 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">Layer 1: QNP Network</div>
           
           <div className="flex items-center justify-between mt-2 opacity-70">
              <div className="flex flex-col items-center gap-1">
                 <GitCommit size={16} />
                 <span className="text-[10px] font-mono">Node</span>
              </div>
              <div className="flex-1 mx-2 border-b-2 border-dashed border-slate-500 relative h-4">
                 {/* Multiple lines representing raw pairs */}
                 <div className="absolute top-0 w-full h-0.5 bg-slate-400"></div>
                 <div className="absolute top-2 w-full h-0.5 bg-slate-400"></div>
                 <div className="absolute top-4 w-full h-0.5 bg-slate-400"></div>
              </div>
              <div className="flex flex-col items-center gap-1">
                 <GitCommit size={16} />
                 <span className="text-[10px] font-mono">Node</span>
              </div>
              <div className="flex-1 mx-2 border-b-2 border-dashed border-slate-500 relative h-4">
                  <div className="absolute top-0 w-full h-0.5 bg-slate-400"></div>
                 <div className="absolute top-2 w-full h-0.5 bg-slate-400"></div>
                 <div className="absolute top-4 w-full h-0.5 bg-slate-400"></div>
              </div>
               <div className="flex flex-col items-center gap-1">
                 <GitCommit size={16} />
                 <span className="text-[10px] font-mono">Node</span>
              </div>
           </div>
           <div className="text-center text-[10px] text-slate-500 mt-2">
             تولید جفت‌های خام (Raw Pairs) با فیدلیتی پایین توسط پروتکل شبکه
           </div>
        </div>

      </div>
    </div>
  );
};