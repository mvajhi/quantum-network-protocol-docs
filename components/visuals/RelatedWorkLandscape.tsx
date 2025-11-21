
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';

export const RelatedWorkLandscape: React.FC = () => {
  return (
    <div className="my-10 select-none">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
         
         <h4 className="text-center font-bold text-slate-800 mb-8">چشم‌انداز کارهای مرتبط (Related Work Landscape)</h4>

         {/* Chart Area */}
         <div className="relative w-full h-[400px] border-l-2 border-b-2 border-slate-300">
            
            {/* Y Axis Label */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-slate-500 tracking-wider">
               قابلیت‌های شبکه (Scope & Flexibility)
            </div>

            {/* X Axis Label */}
            <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 tracking-wider">
               آمادگی سخت‌افزاری (Hardware Readiness)
            </div>

            {/* Grid Background */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:40px_40px]"></div>

            {/* --- ZONES --- */}
            
            {/* Zone: Future Tech */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-red-50/30 border-r border-dashed border-red-200 flex items-start justify-center pt-4">
               <span className="text-[10px] font-bold text-red-300 uppercase">Far Future (Fault Tolerant)</span>
            </div>
            {/* Zone: Near Term */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-green-50/30 flex items-start justify-center pt-4">
               <span className="text-[10px] font-bold text-green-400 uppercase">Near Future (Noisy)</span>
            </div>

            {/* --- ITEMS --- */}

            {/* 1. This Work */}
            <div className="absolute top-[20%] right-[20%] translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20">
               <div className="w-32 p-2 bg-blue-600 text-white rounded-lg shadow-xl border-2 border-blue-400 flex items-center gap-2 animate-pulse hover:animate-none transition-transform hover:scale-110">
                  <CheckCircle size={16} />
                  <span className="text-xs font-bold">QNP (This Work)</span>
               </div>
               <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] p-2 rounded w-40 text-center z-30">
                  Network Layer, Robust to Decoherence, Near-term Hardware.
               </div>
            </div>

            {/* 2. UDP/TCP Based [95] */}
            <div className="absolute top-[10%] left-[10%] translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer opacity-70 hover:opacity-100">
               <div className="w-28 p-2 bg-slate-100 text-slate-600 rounded-lg border border-slate-300 flex items-center gap-2 hover:bg-white transition-colors">
                  <XCircle size={16} className="text-red-400" />
                  <span className="text-xs font-bold">UDP/TCP [95]</span>
               </div>
               <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] p-2 rounded w-40 text-center z-30">
                  Requires full error correction (beyond current hardware capabilities).
               </div>
            </div>

            {/* 3. RuleSet Based [57] */}
            <div className="absolute top-[50%] right-[10%] translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer opacity-70 hover:opacity-100">
               <div className="w-28 p-2 bg-slate-100 text-slate-600 rounded-lg border border-slate-300 flex items-center gap-2 hover:bg-white transition-colors">
                  <HelpCircle size={16} className="text-orange-400" />
                  <span className="text-xs font-bold">RuleSet [57]</span>
               </div>
               <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] p-2 rounded w-40 text-center z-30">
                  Combines Signalling & Data Plane. Limited to 2 nodes in study.
               </div>
            </div>

            {/* 4. Repeater Chains */}
            <div className="absolute bottom-[30%] right-[30%] translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer opacity-70 hover:opacity-100">
               <div className="w-32 p-2 bg-slate-100 text-slate-600 rounded-lg border border-slate-300 flex items-center gap-2 hover:bg-white transition-colors">
                  <AlertTriangle size={16} className="text-yellow-500" />
                  <span className="text-xs font-bold">Repeater Chains</span>
               </div>
               <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] p-2 rounded w-40 text-center z-30">
                  Specific to linear topology. No switching/merging flows.
               </div>
            </div>

            {/* 5. Link Layer [22] */}
            <div className="absolute bottom-[10%] right-[10%] translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer opacity-70 hover:opacity-100">
               <div className="w-28 p-2 bg-purple-100 text-purple-700 rounded-lg border border-purple-300 flex items-center gap-2 hover:bg-white transition-colors">
                  <CheckCircle size={16} />
                  <span className="text-xs font-bold">Link Layer [22]</span>
               </div>
               <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] p-2 rounded w-40 text-center z-30">
                  Foundation of our work. Limited to direct connections.
               </div>
            </div>

         </div>

         <div className="mt-6 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 text-justify leading-6">
            <strong>تحلیل نمودار:</strong> اکثر پروتکل‌های پیشرفته (بالای نمودار) نیاز به سخت‌افزار تصحیح خطا دارند (سمت چپ) که هنوز موجود نیست. کارهای موجود برای سخت‌افزار فعلی (سمت راست) معمولاً محدود به لینک‌های مستقیم یا زنجیره‌های خطی ساده هستند (پایین نمودار).
            <br/>
            پروتکل <strong>QNP</strong> (آبی) تلاش می‌کند این شکاف را پر کند: ارائه قابلیت‌های شبکه (لایه بالا) روی سخت‌افزارهای نویزی موجود (سمت راست).
         </div>

      </div>
    </div>
  );
};