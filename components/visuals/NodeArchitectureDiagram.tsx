
import React from 'react';
import { Cpu, Server, Settings, Database, ArrowDown, ArrowLeftRight, Monitor, Share2 } from 'lucide-react';

export const NodeArchitectureDiagram: React.FC = () => {
  return (
    <div className="my-8 select-none overflow-hidden" dir="rtl">
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-lg relative">
        
        {/* Background Dashed Lines for Layers */}
        <div className="absolute top-[28%] left-0 right-0 border-t-2 border-dashed border-slate-300 z-0"></div>
        <div className="absolute bottom-[25%] left-0 right-0 border-t-2 border-dashed border-slate-300 z-0"></div>
        
        {/* Layer Labels */}
        <div className="absolute top-[27%] right-2 bg-white px-2 text-xs font-bold text-slate-400 z-10">سیستم عامل (OS)</div>
        <div className="absolute bottom-[24%] right-2 bg-white px-2 text-xs font-bold text-slate-400 z-10">سخت‌افزار (Hardware)</div>

        <div className="flex flex-col gap-10 relative z-10">
          
          {/* --- Layer 1: User Space / Control Plane --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative">
            
            {/* External Connections (Top) */}
            <div className="hidden md:flex absolute -top-4 left-1/4 -translate-x-1/2 -translate-y-full flex-col items-center opacity-70">
               <div className="h-6 w-0.5 bg-slate-400"></div>
               <div className="bg-slate-50 text-slate-600 text-[9px] p-1 rounded border border-slate-200 text-center w-40">
                 ارتباط کلاسیک با سایر برنامه‌ها
               </div>
               <div className="h-2 w-0.5 bg-slate-400"></div>
            </div>

             <div className="hidden md:flex absolute -top-4 left-3/4 -translate-x-1/2 -translate-y-full flex-col items-center opacity-70">
               <div className="h-6 w-0.5 bg-slate-400"></div>
               <div className="bg-slate-50 text-slate-600 text-[9px] p-1 rounded border border-slate-200 text-center w-40">
                 ارتباط کلاسیک با سایر روترها
               </div>
               <div className="h-2 w-0.5 bg-slate-400"></div>
            </div>

            {/* Application Block */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm relative group transition-all hover:shadow-md z-20">
              <div className="mb-2 bg-blue-200 p-2 rounded-full text-blue-700">
                <Monitor size={20} />
              </div>
              <h5 className="font-bold text-blue-900 text-sm mb-1">برنامه کاربردی (Application)</h5>
              <span className="text-[10px] text-blue-700 bg-blue-100/50 px-2 py-0.5 rounded">فقط در گره پایانی</span>
            </div>

            {/* Routing Block */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm relative group transition-all hover:shadow-md z-20">
               <div className="mb-2 bg-green-200 p-2 rounded-full text-green-700">
                <ArrowLeftRight size={20} />
              </div>
              <h5 className="font-bold text-green-900 text-sm mb-1">مسیریابی و مهندسی ترافیک</h5>
              <span className="text-[10px] text-green-700 bg-green-100/50 px-2 py-0.5 rounded">Signalling & Routing</span>
            </div>
          </div>

          {/* Connections Layer 1 -> Layer 2 */}
          <div className="absolute top-[105px] inset-x-0 h-12 pointer-events-none hidden md:block">
             <svg className="w-full h-full">
                {/* App -> Stack */}
                <path d="M 25% 0 L 25% 100%" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                <path d="M 25% 100% L 25% 0" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                
                {/* Routing -> Stack */}
                <path d="M 75% 0 L 75% 100%" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                <path d="M 75% 100% L 75% 0" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
             </svg>
          </div>

          {/* --- Layer 2: OS (Quantum Network Stack) --- */}
          <div className="flex justify-center pt-4 pb-2 relative z-20">
            <div className="w-full md:w-3/4 bg-purple-50 border-2 border-purple-300 rounded-xl p-6 shadow-md relative">
              
              {/* External Connection (Right) */}
              <div className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 hidden md:flex items-center group cursor-pointer">
                 <div className="bg-slate-100 group-hover:bg-purple-100 text-slate-600 group-hover:text-purple-800 transition-colors text-[9px] p-2 rounded border border-slate-200 text-center w-36 shadow-sm mr-2">
                   ارتباط کلاسیک با پشته شبکه همسایگان
                   <Share2 size={12} className="mx-auto mt-1 opacity-50"/>
                 </div>
                 <div className="w-8 h-0.5 bg-slate-400 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-400 rounded-full"></div>
                 </div>
              </div>

              <div className="flex items-center justify-center gap-3 mb-4 border-b border-purple-200 pb-3">
                <Server size={24} className="text-purple-600" />
                <h5 className="font-bold text-purple-900 text-lg">پشته شبکه کوانتومی (Network Stack)</h5>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-purple-900">
                 <div className="bg-purple-100/50 p-2 rounded border border-purple-100">
                    <strong>• تعاملات بالا دستی:</strong>
                    <ul className="list-disc list-inside mt-1 opacity-80 text-[10px] space-y-1">
                      <li>تولید جفت‌های درهم‌تنیده</li>
                      <li>مقداردهی جداول Data Plane</li>
                    </ul>
                 </div>
                 <div className="bg-purple-100/50 p-2 rounded border border-purple-100">
                    <strong>• عملیات داخلی:</strong>
                    <ul className="list-disc list-inside mt-1 opacity-80 text-[10px] space-y-1">
                      <li>عملیات لایه شبکه (Swap)</li>
                      <li>عملیات لایه لینک (تولید)</li>
                      <li>مدیریت کیوبیت‌ها</li>
                    </ul>
                 </div>
              </div>
            </div>
          </div>

          {/* Connections Layer 2 -> Layer 3 */}
          <div className="flex justify-around px-12 text-slate-400 -my-4 relative z-10">
             <ArrowDown size={24} strokeWidth={1.5} />
             <ArrowDown size={24} strokeWidth={1.5} />
          </div>

          {/* --- Layer 3: Resource Managers --- */}
          <div className="grid grid-cols-2 gap-0 border-2 border-slate-300 rounded-lg overflow-hidden bg-slate-50 shadow-sm z-20">
            <div className="p-4 border-l border-slate-200 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-colors group">
              <div className="mb-2 text-slate-500 group-hover:text-slate-700">
                 <Settings size={20} />
              </div>
              <h5 className="font-bold text-slate-700 text-sm">زمان‌بند وظایف (Scheduler)</h5>
            </div>
            <div className="p-4 flex flex-col items-center justify-center text-center hover:bg-slate-100 transition-colors group">
              <div className="mb-2 text-slate-500 group-hover:text-slate-700">
                 <Database size={20} />
              </div>
              <h5 className="font-bold text-slate-700 text-sm">مدیریت حافظه (MMU)</h5>
            </div>
          </div>
          
           {/* Connections Layer 3 -> Layer 4 */}
          <div className="flex justify-center text-slate-400 -my-4 relative z-10">
             <ArrowDown size={24} strokeWidth={1.5} />
             <span className="text-[10px] absolute top-1 bg-white px-1 font-mono">Physical Instructions</span>
          </div>

          {/* --- Layer 4: Hardware --- */}
          <div className="bg-slate-800 text-white rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden mt-2 z-20">
             {/* Glow Effect */}
             <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500 blur-[50px] opacity-20"></div>

             <div className="flex flex-col items-center md:items-start z-10">
                <div className="flex items-center gap-3 mb-2">
                   <Cpu size={32} className="text-blue-400" />
                   <span className="font-bold text-lg">دستگاه کوانتومی (Quantum Device)</span>
                </div>
                <p className="text-xs text-slate-400 max-w-xs text-center md:text-right leading-5">
                  در پلتفرم‌های فعلی، حافظه، پردازنده و رابط شبکه همگی در یک قطعه سخت‌افزاری واحد ادغام شده‌اند.
                </p>
             </div>
             
             <div className="h-px w-full bg-slate-700 md:hidden my-4"></div>
             <div className="w-px h-16 bg-slate-700 hidden md:block mx-4"></div>

             <div className="grid grid-cols-3 gap-4 text-center z-10">
                <div className="bg-slate-700/50 p-2 rounded border border-slate-600 flex flex-col items-center min-w-[80px]">
                  <span className="text-[10px] text-slate-400 mb-1">Memory</span>
                  <span className="font-bold text-sm">حافظه</span>
                </div>
                <div className="bg-slate-700/50 p-2 rounded border border-slate-600 flex flex-col items-center min-w-[80px]">
                  <span className="text-[10px] text-slate-400 mb-1">Processor</span>
                  <span className="font-bold text-sm">پردازنده</span>
                </div>
                <div className="bg-slate-700/50 p-2 rounded border border-slate-600 flex flex-col items-center min-w-[80px]">
                  <span className="text-[10px] text-slate-400 mb-1">Network</span>
                  <span className="font-bold text-sm">رابط شبکه</span>
                </div>
             </div>
          </div>

        </div>
        
        {/* SVG Defs for markers */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
            </marker>
          </defs>
        </svg>
      </div>
      
      <div className="mt-4 text-center text-xs text-slate-500 bg-slate-50 p-3 rounded border border-slate-100">
        <strong>شکل ۴:</strong> اجزای سیستم محلی یک گره کوانتومی. مدیریت منابع سخت‌افزاری توسط اجزای سیستم‌عامل مانند زمان‌بند و مدیر حافظه انجام می‌شود.
      </div>
    </div>
  );
};
