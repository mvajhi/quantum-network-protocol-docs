
import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export const VCAnalogy: React.FC = () => {
  return (
    <div className="my-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm select-none">
      <h4 className="text-center font-bold text-slate-800 mb-6">مفهوم مدار مجازی (Virtual Circuit)</h4>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative">
        
        {/* Tunnel Background */}
        <div className="absolute left-4 right-4 h-12 bg-slate-100 rounded-full border-2 border-dashed border-slate-300 -z-10"></div>

        {/* Head-End Node */}
        <div className="flex flex-col items-center z-10">
          <div className="w-14 h-14 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg border-2 border-blue-700">
             <MapPin size={24} />
          </div>
          <div className="mt-2 text-center">
             <span className="block font-bold text-xs text-slate-800">Head-End</span>
             <span className="block text-[10px] text-slate-500">(Upstream)</span>
          </div>
        </div>

        {/* Arrow Flow */}
        <div className="flex-1 flex items-center justify-center gap-1">
           <div className="h-0.5 w-full bg-blue-400 relative group cursor-pointer">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded border border-blue-200 text-[10px] font-mono text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
               FORWARD Msg
             </div>
             <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rotate-45"></div>
           </div>
        </div>

        {/* Repeater */}
        <div className="flex flex-col items-center z-10">
           <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center border-2 border-slate-300 text-slate-500 font-bold text-xs">
             R1
           </div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-1">
           <div className="h-0.5 w-full bg-blue-400 relative">
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rotate-45"></div>
           </div>
        </div>

        {/* Tail-End Node */}
        <div className="flex flex-col items-center z-10">
          <div className="w-14 h-14 bg-slate-700 text-white rounded-lg flex items-center justify-center shadow-lg border-2 border-slate-800">
             <MapPin size={24} />
          </div>
          <div className="mt-2 text-center">
             <span className="block font-bold text-xs text-slate-800">Tail-End</span>
             <span className="block text-[10px] text-slate-500">(Downstream)</span>
          </div>
        </div>

      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
         <div className="bg-blue-50 p-3 rounded border border-blue-100">
           <strong>۱. نصب مسیر:</strong> قبل از هر کاری، مسیر توسط پروتکل سیگنالینگ رزرو می‌شود.
         </div>
         <div className="bg-blue-50 p-3 rounded border border-blue-100">
           <strong>۲. جهت‌دار بودن:</strong> همیشه یک "بالادست" (Head) مسئول شروع کار است.
         </div>
         <div className="bg-blue-50 p-3 rounded border border-blue-100">
           <strong>۳. برچسب‌زنی:</strong> هر لینک یک Label مخصوص دارد (مثل MPLS) تا درخواست‌ها قاطی نشوند.
         </div>
      </div>
    </div>
  );
};