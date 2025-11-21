
import React from 'react';
import { Laptop, Server, ArrowLeftRight, GitMerge, GitCommit } from 'lucide-react';

export const DumbbellTopology: React.FC = () => {
  return (
    <div className="my-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm select-none">
      <h4 className="text-center font-bold text-slate-800 mb-8 flex items-center justify-center gap-2">
        <GitMerge className="text-blue-500" />
        توپولوژی دمبل (شکل ۷ مقاله)
      </h4>

      <div className="relative h-[250px] flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
        
        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
           {/* Left Side Connections */}
           <line x1="15%" y1="30%" x2="35%" y2="50%" stroke="#94a3b8" strokeWidth="2" />
           <line x1="15%" y1="70%" x2="35%" y2="50%" stroke="#94a3b8" strokeWidth="2" />
           
           {/* Bottleneck Link */}
           <line x1="35%" y1="50%" x2="65%" y2="50%" stroke="#ef4444" strokeWidth="4" strokeDasharray="5,5" className="animate-pulse" />
           
           {/* Right Side Connections */}
           <line x1="65%" y1="50%" x2="85%" y2="30%" stroke="#94a3b8" strokeWidth="2" />
           <line x1="65%" y1="50%" x2="85%" y2="70%" stroke="#94a3b8" strokeWidth="2" />
        </svg>

        {/* Label for Bottleneck */}
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded border border-red-200 z-10">
          گلوگاه (Bottleneck)
        </div>

        {/* --- NODES --- */}

        {/* End Node A0 */}
        <div className="absolute left-[10%] top-[25%] flex flex-col items-center gap-1">
           <div className="w-10 h-10 bg-white border-2 border-blue-500 rounded-lg flex items-center justify-center shadow-sm z-10">
             <Laptop size={18} className="text-blue-600"/>
           </div>
           <span className="text-xs font-bold text-slate-600">A0</span>
        </div>

        {/* End Node A1 */}
        <div className="absolute left-[10%] bottom-[25%] flex flex-col items-center gap-1">
           <div className="w-10 h-10 bg-white border-2 border-blue-500 rounded-lg flex items-center justify-center shadow-sm z-10">
             <Laptop size={18} className="text-blue-600"/>
           </div>
           <span className="text-xs font-bold text-slate-600">A1</span>
        </div>

        {/* Middle Node MA */}
        <div className="absolute left-[35%] top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
           <div className="w-12 h-12 bg-slate-800 border-2 border-slate-600 rounded-full flex items-center justify-center shadow-lg z-10">
             <Server size={20} className="text-white"/>
           </div>
           <span className="text-xs font-bold text-slate-800 bg-white px-1 rounded">MA</span>
           <span className="text-[9px] text-slate-400 bg-slate-100 px-1 rounded">Router</span>
        </div>

        {/* Middle Node MB */}
        <div className="absolute left-[65%] top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
           <div className="w-12 h-12 bg-slate-800 border-2 border-slate-600 rounded-full flex items-center justify-center shadow-lg z-10">
             <Server size={20} className="text-white"/>
           </div>
           <span className="text-xs font-bold text-slate-800 bg-white px-1 rounded">MB</span>
           <span className="text-[9px] text-slate-400 bg-slate-100 px-1 rounded">Router</span>
        </div>

        {/* End Node B0 */}
        <div className="absolute right-[10%] top-[25%] flex flex-col items-center gap-1">
           <div className="w-10 h-10 bg-white border-2 border-blue-500 rounded-lg flex items-center justify-center shadow-sm z-10">
             <Laptop size={18} className="text-blue-600"/>
           </div>
           <span className="text-xs font-bold text-slate-600">B0</span>
        </div>

        {/* End Node B1 */}
        <div className="absolute right-[10%] bottom-[25%] flex flex-col items-center gap-1">
           <div className="w-10 h-10 bg-white border-2 border-blue-500 rounded-lg flex items-center justify-center shadow-sm z-10">
             <Laptop size={18} className="text-blue-600"/>
           </div>
           <span className="text-xs font-bold text-slate-600">B1</span>
        </div>

      </div>

      <div className="mt-4 text-sm text-slate-600 text-justify bg-slate-50 p-3 rounded leading-6">
        <strong>چرا این توپولوژی؟</strong> این ساختار به اندازه کافی پیچیده است که قابلیت‌های ادغام (Merge) و تفکیک (Split) جریان‌های درهم‌تنیدگی را تست کند (جریان‌های A0 و A1 باید از لینک مشترک MA-MB عبور کنند)، اما آنقدر ساده است که نیازی به الگوریتم‌های مسیریابی پیچیده نداشته باشد.
      </div>
    </div>
  );
};