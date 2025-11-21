
import React from 'react';
import { Microscope, Globe2, Hammer, Rocket } from 'lucide-react';

export const EvolutionTimeline: React.FC = () => {
  return (
    <div className="my-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
      <h4 className="text-center font-bold text-slate-800 mb-8 text-lg">مسیر تکامل: از آزمایشگاه تا شهر</h4>
      
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
        
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
        
        {/* Phase 1: Physics */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[150px]">
          <div className="w-16 h-16 bg-white border-4 border-slate-300 text-slate-400 rounded-full flex items-center justify-center mb-3 shadow-sm">
            <Microscope size={28} />
          </div>
          <h5 className="font-bold text-slate-700 text-sm mb-1">گذشته</h5>
          <p className="text-xs text-slate-500">آزمایش‌های فیزیک پیچیده در محیط کنترل شده</p>
        </div>

        {/* Phase 2: Hardware Dev */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[150px]">
          <div className="w-16 h-16 bg-white border-4 border-blue-300 text-blue-500 rounded-full flex items-center justify-center mb-3 shadow-sm">
            <Hammer size={28} />
          </div>
          <h5 className="font-bold text-slate-800 text-sm mb-1">اخیر</h5>
          <p className="text-xs text-slate-500">ساخت سخت‌افزارهای کوانتومی اولیه</p>
        </div>

        {/* Current Phase */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[150px]">
          <div className="w-20 h-20 bg-blue-600 border-4 border-blue-100 text-white rounded-full flex items-center justify-center mb-3 shadow-lg transform scale-110">
            <Rocket size={32} />
          </div>
          <h5 className="font-bold text-blue-700 text-base mb-1">زمان حال (این مقاله)</h5>
          <p className="text-xs text-slate-600 font-bold">مهندسی سیستم‌ها و طراحی پروتکل‌های شبکه</p>
        </div>

        {/* Phase 4: Future */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[150px]">
          <div className="w-16 h-16 bg-white border-4 border-purple-300 text-purple-500 rounded-full flex items-center justify-center mb-3 shadow-sm">
            <Globe2 size={28} />
          </div>
          <h5 className="font-bold text-slate-800 text-sm mb-1">آینده نزدیک</h5>
          <p className="text-xs text-slate-500">راه‌اندازی شبکه‌های بین‌شهری واقعی</p>
        </div>

      </div>
    </div>
  );
};