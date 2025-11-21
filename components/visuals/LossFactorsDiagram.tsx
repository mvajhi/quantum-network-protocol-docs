
import React from 'react';
import { Activity, Timer, Scissors, Zap } from 'lucide-react';

export const LossFactorsDiagram: React.FC = () => {
  return (
    <div className="my-8 select-none">
      <div className="relative bg-white border border-slate-200 rounded-xl p-8 min-h-[250px] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-50 via-white to-white opacity-50 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

        {/* The Chain */}
        <div className="flex items-center justify-center w-full max-w-2xl relative z-10 gap-0 md:gap-4">
          
          {/* Left Node */}
          <div className="flex flex-col items-center gap-2 relative group">
            <div className="w-16 h-16 bg-slate-800 text-white rounded-lg flex items-center justify-center shadow-lg relative">
              Node A
              {/* P4 Badge */}
              <div className="absolute -top-3 -left-3 bg-orange-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white z-20 cursor-help" title="P4: Decoherence in Memory">
                P4
              </div>
            </div>
          </div>

          {/* Link 1 */}
          <div className="flex-1 h-1 bg-slate-300 relative mx-2 flex items-center justify-center">
             <div className="absolute -top-8 bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold border border-blue-200 flex items-center gap-1 cursor-help" title="P1: Imperfect Generation">
               <Zap size={10}/> P1
             </div>
          </div>

          {/* Repeater Node */}
          <div className="flex flex-col items-center gap-2 relative">
             <div className="w-20 h-20 bg-purple-100 border-2 border-purple-500 text-purple-900 rounded-full flex flex-col items-center justify-center shadow-lg relative">
              <span className="text-xs font-bold">Repeater</span>
              <Scissors size={16} className="mt-1 opacity-50" />

               {/* P2 Badge */}
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white z-20 cursor-help" title="P2: Swapping Loss">
                P2
              </div>
               {/* P3 Badge */}
              <div className="absolute -bottom-3 -right-3 bg-yellow-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white z-20 cursor-help" title="P3: Gate Imperfection">
                P3
              </div>
            </div>
          </div>

           {/* Link 2 */}
          <div className="flex-1 h-1 bg-slate-300 relative mx-2 flex items-center justify-center">
             <div className="absolute -top-8 bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold border border-blue-200 flex items-center gap-1 cursor-help" title="P1: Imperfect Generation">
               <Zap size={10}/> P1
             </div>
          </div>

          {/* Right Node */}
          <div className="flex flex-col items-center gap-2 relative">
            <div className="w-16 h-16 bg-slate-800 text-white rounded-lg flex items-center justify-center shadow-lg relative">
              Node B
               {/* P4 Badge */}
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white z-20 cursor-help" title="P4: Decoherence in Memory">
                P4
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        
        <div className="flex gap-3 items-start bg-blue-50 p-3 rounded-lg border border-blue-100">
          <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">P1</div>
          <div>
            <h5 className="text-xs font-bold text-blue-900">تولید اولیه ناقص</h5>
            <p className="text-[10px] text-blue-800 leading-4">جفت‌های تولید شده روی لینک‌های فیزیکی از همان ابتدا ۱۰۰٪ خالص نیستند.</p>
          </div>
        </div>

        <div className="flex gap-3 items-start bg-red-50 p-3 rounded-lg border border-red-100">
          <div className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">P2</div>
          <div>
            <h5 className="text-xs font-bold text-red-900">اتلاف در Swapping</h5>
            <p className="text-[10px] text-red-800 leading-4">ترکیب دو جفت ناقص، منجر به جفتی با کیفیت پایین‌تر از هر دو می‌شود.</p>
          </div>
        </div>

        <div className="flex gap-3 items-start bg-yellow-50 p-3 rounded-lg border border-yellow-100">
          <div className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">P3</div>
          <div>
            <h5 className="text-xs font-bold text-yellow-900">نقص گیت‌ها</h5>
            <p className="text-[10px] text-yellow-800 leading-4">هر بار که روی کیوبیت پردازشی انجام می‌شود، کیفیت آن کمی افت می‌کند.</p>
          </div>
        </div>

        <div className="flex gap-3 items-start bg-orange-50 p-3 rounded-lg border border-orange-100">
          <div className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">P4</div>
          <div>
            <h5 className="text-xs font-bold text-orange-900">ناهمدوسی (Decoherence)</h5>
            <p className="text-[10px] text-orange-800 leading-4">افت کیفیت در طول زمان، زمانی که کیوبیت در حافظه منتظر می‌ماند.</p>
          </div>
        </div>

      </div>
    </div>
  );
};