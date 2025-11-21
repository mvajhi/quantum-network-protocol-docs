
import React, { useState } from 'react';
import { Package, Eye, CheckCircle2, Clock, ArrowRight, AlertCircle } from 'lucide-react';

export const EarlyDeliveryDiagram: React.FC = () => {
  const [mode, setMode] = useState<'standard' | 'early'>('standard');

  return (
    <div className="my-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm select-none">
      
      {/* Mode Switcher */}
      <div className="flex bg-slate-100 p-1 rounded-lg mb-8 w-fit mx-auto">
        <button 
          onClick={() => setMode('standard')}
          className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${mode === 'standard' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          روش استاندارد (Standard)
        </button>
        <button 
          onClick={() => setMode('early')}
          className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${mode === 'early' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          تحویل زودهنگام (Early Delivery)
        </button>
      </div>

      {/* Flow Visualization */}
      <div className="relative flex flex-col gap-8 max-w-2xl mx-auto">
         
         {/* Step 1: Physical Arrival */}
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
               <Package size={24} />
            </div>
            <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
               <h5 className="text-sm font-bold text-slate-800">۱. دریافت فیزیکی کیوبیت</h5>
               <p className="text-xs text-slate-500">کیوبیت از آخرین لینک به گره انتهایی می‌رسد.</p>
            </div>
         </div>

         {/* Connector Line */}
         <div className="h-8 w-0.5 bg-slate-300 ml-6"></div>

         {/* Step 2: Decision Point */}
         {mode === 'standard' ? (
           <>
             <div className="flex items-center gap-4 opacity-50">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 border border-slate-200">
                   <Clock size={24} />
                </div>
                <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                   <h5 className="text-sm font-bold text-slate-800">۲. انتظار برای پیام TRACK</h5>
                   <p className="text-xs text-slate-500">کیوبیت در حافظه نگهداری می‌شود تا نتیجه تمام Swapها برسد. (خطر ناهمدوسی!)</p>
                </div>
             </div>

             <div className="h-8 w-0.5 bg-slate-300 ml-6 opacity-50"></div>

             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 border border-green-200">
                   <CheckCircle2 size={24} />
                </div>
                <div className="flex-1 bg-green-50 p-3 rounded-lg border border-green-200">
                   <h5 className="text-sm font-bold text-green-900">۳. تحویل به اپلیکیشن</h5>
                   <p className="text-xs text-green-700">کیوبیت + اطلاعات اصلاح (Correction Info) همزمان تحویل داده می‌شوند.</p>
                </div>
             </div>
           </>
         ) : (
           <>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200 shadow-[0_0_15px_#3b82f6] animate-pulse">
                   <Eye size={24} />
                </div>
                <div className="flex-1 bg-blue-50 p-3 rounded-lg border border-blue-200 shadow-sm">
                   <h5 className="text-sm font-bold text-blue-900">۲. اندازه‌گیری فوری! (Early Measure)</h5>
                   <p className="text-xs text-blue-700">
                     بدون صبر کردن، کیوبیت به اپلیکیشن تحویل داده شده و اندازه‌گیری می‌شود. 
                     <span className="font-bold text-blue-800 block mt-1">مزیت: ناهمدوسی صفر در این مرحله.</span>
                   </p>
                </div>
             </div>

             <div className="h-8 w-0.5 bg-slate-300 ml-6"></div>

             <div className="flex items-center gap-4 opacity-80">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200">
                   <Clock size={24} />
                </div>
                <div className="flex-1 bg-orange-50 p-3 rounded-lg border border-orange-200 border-dashed">
                   <h5 className="text-sm font-bold text-orange-900">۳. انتظار تاخیری (Post-Processing)</h5>
                   <p className="text-xs text-orange-800">
                     اپلیکیشن نتیجه اندازه‌گیری را نگه می‌دارد و منتظر پیام TRACK می‌ماند تا آن را تفسیر کند.
                   </p>
                </div>
             </div>
           </>
         )}

      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-6 text-justify flex items-start gap-2">
         <AlertCircle size={16} className="shrink-0 mt-0.5 text-slate-400"/>
         {mode === 'standard' 
           ? 'در روش استاندارد، تضمین می‌شود که فقط جفت‌های سالم تحویل داده شوند، اما کیوبیت مدت بیشتری در معرض نویز حافظه قرار می‌گیرد.' 
           : 'در روش Early Delivery، مسئولیت مدیریت خطا به عهده اپلیکیشن می‌افتد. اگر پیام TRACK خبر از خرابی لینک بدهد، اپلیکیشن باید نتیجه اندازه‌گیری خود را دور بریزد.'}
      </div>

    </div>
  );
};
