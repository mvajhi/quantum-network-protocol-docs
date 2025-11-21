
import React from 'react';
import { Map, Activity, Settings, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export const ProtocolTriad: React.FC = () => {
  return (
    <div className="my-10 select-none">
      <div className="relative bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col items-center md:block md:h-[320px]">
        
        {/* Center Text (Mobile only) */}
        <div className="md:hidden text-center mb-8 font-bold text-slate-400 text-sm">
          معماری سه‌گانه لایه شبکه
        </div>

        {/* --- Service 1: Routing (Left/Top) --- */}
        <div className="relative z-10 md:absolute md:top-10 md:left-10 w-64 bg-white p-4 rounded-xl border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex items-center gap-3 mb-2 text-green-700">
             <div className="bg-green-100 p-2 rounded-lg"><Map size={20} /></div>
             <h5 className="font-bold text-sm">پروتکل مسیریابی (Routing)</h5>
           </div>
           <p className="text-xs text-slate-500 leading-5">
             مسیر بهینه را بر اساس هزینه، پهنای باند و <strong className="text-green-600">فیدلیتی</strong> محاسبه می‌کند.
           </p>
           {/* Arrow to Center */}
           <div className="hidden md:block absolute top-1/2 -right-12 w-12 h-0.5 bg-green-300">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-300 rotate-45"></div>
           </div>
        </div>

        {/* --- Service 2: Signalling (Right/Top) --- */}
        <div className="relative z-10 mt-4 md:mt-0 md:absolute md:top-10 md:right-10 w-64 bg-white p-4 rounded-xl border-2 border-orange-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex items-center gap-3 mb-2 text-orange-700">
             <div className="bg-orange-100 p-2 rounded-lg"><Activity size={20} /></div>
             <h5 className="font-bold text-sm">پروتکل سیگنالینگ (Signalling)</h5>
           </div>
           <p className="text-xs text-slate-500 leading-5">
             مدار مجازی را برقرار کرده و <strong className="text-orange-600">زمان‌بندی (Scheduling)</strong> عملیات را مدیریت می‌کند.
           </p>
            {/* Arrow to Center */}
           <div className="hidden md:block absolute top-1/2 -left-12 w-12 h-0.5 bg-orange-300">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-300 rotate-45"></div>
           </div>
        </div>

        {/* --- Core: Data Plane (Bottom/Center) --- */}
        <div className="relative z-20 mt-8 md:mt-0 md:absolute md:bottom-10 md:left-1/2 md:-translate-x-1/2 w-72 bg-blue-600 text-white p-6 rounded-xl shadow-xl border-4 border-blue-200 transform scale-105">
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-800 text-[10px] px-3 py-0.5 rounded-full font-bold tracking-wider border border-blue-400">
             FOCUS OF THIS PAPER
           </div>
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-white/20 p-2 rounded-lg"><Settings size={24} className="animate-spin-slow" /></div>
             <h5 className="font-bold text-lg">Quantum Data Plane</h5>
           </div>
           <p className="text-xs text-blue-100 leading-5">
             بلوک سازنده اصلی. وظیفه تولید واقعی درهم‌تنیدگی را بر اساس قوانین دریافتی از مسیریابی و سیگنالینگ بر عهده دارد.
           </p>
           
           {/* Connection Lines for Mobile */}
           <div className="md:hidden absolute -top-6 left-1/2 w-0.5 h-6 bg-slate-300"></div>
        </div>

        {/* Background Arrows (Desktop) */}
        <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20">
           <path d="M 30% 30% Q 50% 60% 50% 65%" stroke="black" strokeWidth="2" fill="none" />
           <path d="M 70% 30% Q 50% 60% 50% 65%" stroke="black" strokeWidth="2" fill="none" />
        </svg>

      </div>
      <div className="text-center mt-2 text-xs text-slate-400">
        معماری پیشنهادی لایه شبکه: تفکیک وظایف بین سه پروتکل مجزا
      </div>
    </div>
  );
};