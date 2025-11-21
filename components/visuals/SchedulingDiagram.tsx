import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

export const SchedulingDiagram: React.FC = () => {
  const [scenario, setScenario] = useState<'unsync' | 'sync'>('unsync');
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const reset = (newScenario: 'unsync' | 'sync') => {
    setScenario(newScenario);
    setStep(0);
  };

  // Visual State Helpers
  const getLeftLinkState = () => {
    if (scenario === 'unsync') {
      if (step >= 1) return step >= 2 ? 'dead' : 'arrived';
    } else {
      if (step >= 1) return 'arrived';
    }
    return 'waiting';
  };

  const getRightLinkState = () => {
    if (scenario === 'unsync') {
      if (step === 3) return 'arrived';
    } else {
      if (step >= 2) return 'arrived';
    }
    return 'waiting';
  };

  const leftState = getLeftLinkState();
  const rightState = getRightLinkState();

  // Educational Content per step
  const getContent = () => {
    if (scenario === 'unsync') {
      switch (step) {
        case 0: return {
          title: "وضعیت اولیه: ناهماهنگی",
          text: "در این سناریو، هیچ پروتکل سیگنالینگی برای هماهنگ کردن زمان تولید وجود ندارد. لینک‌ها هر زمان که آماده شوند ارسال می‌شوند.",
          time: "T = 0"
        };
        case 1: return {
          title: "ورود زودهنگام لینک چپ",
          text: "لینک سمت چپ تولید شده و به تکرارگر می‌رسد. اما لینک سمت راست هنوز آماده نیست. لینک چپ مجبور است در حافظه کوانتومی تکرارگر منتظر بماند.",
          time: "T = 20ms"
        };
        case 2: return {
          title: "فاجعه ناهمدوسی (Decoherence)",
          text: "زمان انتظار طولانی شد! به دلیل عمر کوتاه حافظه کوانتومی، کیوبیت سمت چپ دچار ناهمدوسی شده و اطلاعات آن از بین می‌رود (رنگ قرمز). دیگر قابل استفاده نیست.",
          time: "T = 50ms (Critical Limit)"
        };
        case 3: return {
          title: "ورود دیرهنگام و شکست",
          text: "لینک سمت راست بالاخره می‌رسد، اما دیگر فایده‌ای ندارد چون شریک آن (لینک چپ) از بین رفته است. عملیات Swap شکست می‌خورد و کل فرآیند باید از اول تکرار شود.",
          time: "T = 80ms"
        };
      }
    } else {
      // Sync Scenario
      switch (step) {
        case 0: return {
          title: "وضعیت اولیه: هماهنگی دقیق",
          text: "پروتکل سیگنالینگ یک بازه زمانی مشخص (Time Bin) را رزرو کرده است. به هر دو گره دستور داده شده که دقیقاً برای زمان T=60 آماده باشند.",
          time: "T = 0"
        };
        case 1: return {
          title: "تولید همزمان (لینک چپ)",
          text: "لینک چپ کمی قبل از زمان موعود می‌رسد. چون زمان‌بندی دقیق است، مدت انتظار بسیار کوتاه خواهد بود.",
          time: "T = 55ms"
        };
        case 2: return {
          title: "تولید همزمان (لینک راست)",
          text: "لینک راست بلافاصله می‌رسد. هر دو لینک اکنون در حافظه موجود و سالم هستند.",
          time: "T = 60ms"
        };
        case 3: return {
          title: "موفقیت عملیات Swap",
          text: "چون هر دو لینک سالم هستند، تکرارگر بلافاصله عملیات Swap را انجام می‌دهد. اتصال برقرار شد! این قدرتِ پروتکل سیگنالینگ در مدیریت زمان است.",
          time: "T = 65ms"
        };
      }
    }
    return { title: "", text: "", time: "" };
  };

  const content = getContent();

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 my-8 select-none text-white shadow-lg overflow-hidden flex flex-col md:flex-row">
      
      {/* Diagram Area */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-slate-700 bg-slate-950 relative min-h-[300px]">
         
         {/* Scenario Label */}
         <div className="absolute top-4 left-4 bg-slate-800 px-3 py-1 rounded-full text-xs font-bold border border-slate-600 text-slate-400">
            {scenario === 'unsync' ? 'سناریو ۱: بدون سیگنالینگ' : 'سناریو ۲: با سیگنالینگ'}
         </div>

         {/* Timer */}
         <div className="absolute top-4 right-4 font-mono text-yellow-500 font-bold">
           {content.time}
         </div>

         <div className="relative w-full max-w-md h-40 flex items-center justify-center">
            
            {/* Repeater */}
            <div className="z-20 flex flex-col items-center">
              <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-2xl transition-all duration-500 ${
                  step === 3 && scenario === 'sync' ? 'bg-green-900/30 border-green-500' : 
                  step >= 2 && scenario === 'unsync' ? 'bg-red-900/30 border-red-500' : 
                  'bg-slate-800 border-slate-600'
              }`}>
                  {step === 3 && scenario === 'sync' ? <CheckCircle2 size={32} className="text-green-500 animate-bounce"/> :
                   step >= 2 && scenario === 'unsync' ? <AlertTriangle size={32} className="text-red-500 animate-pulse"/> :
                   <Clock size={32} className="text-slate-500"/>
                  }
              </div>
              <span className="text-xs text-slate-500 mt-3 font-bold">تکرارگر (Repeater)</span>
            </div>

            {/* Left Link */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center w-1/3 transition-all duration-700"
                 style={{ opacity: leftState === 'waiting' ? 0.3 : 1, transform: leftState === 'waiting' ? 'translateX(-20px)' : 'translateX(0)' }}>
                <div className={`h-3 w-full rounded-full mb-2 transition-colors duration-500 ${leftState === 'dead' ? 'bg-red-600 animate-pulse shadow-[0_0_15px_red]' : 'bg-blue-500 shadow-[0_0_15px_#3b82f6]'}`}></div>
                <span className="text-[10px] text-slate-400">{leftState === 'dead' ? 'ناهمدوسی!' : 'لینک چپ'}</span>
            </div>

             {/* Right Link */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center w-1/3 transition-all duration-700"
                 style={{ opacity: rightState === 'waiting' ? 0.3 : 1, transform: rightState === 'waiting' ? 'translateX(20px)' : 'translateX(0)' }}>
                <div className="h-3 w-full bg-blue-500 rounded-full mb-2 shadow-[0_0_15px_#3b82f6]"></div>
                <span className="text-[10px] text-slate-400">لینک راست</span>
            </div>

         </div>
      </div>

      {/* Controls & Text Area */}
      <div className="w-full md:w-80 bg-slate-900 p-6 flex flex-col">
        
        {/* Scenario Selector */}
        <div className="flex bg-slate-800 p-1 rounded-lg mb-6">
          <button 
            onClick={() => reset('unsync')}
            className={`flex-1 py-2 rounded text-xs font-bold transition-colors ${scenario === 'unsync' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            شکست
          </button>
          <button 
            onClick={() => reset('sync')}
            className={`flex-1 py-2 rounded text-xs font-bold transition-colors ${scenario === 'sync' ? 'bg-green-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            موفقیت
          </button>
        </div>

        {/* Step Content */}
        <div className="flex-1">
           <div className="flex items-center gap-2 mb-3">
             <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">گام {step + 1} از 4</span>
             <h4 className="font-bold text-blue-300 text-sm">{content.title}</h4>
           </div>
           <p className="text-sm text-slate-300 leading-7 text-justify min-h-[120px]">
             {content.text}
           </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-slate-800">
           <button 
             onClick={prevStep} 
             disabled={step === 0}
             className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
           >
             <ChevronRight size={16} /> قبلی
           </button>
           <button 
             onClick={nextStep} 
             disabled={step === 3}
             className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-bold"
           >
             بعدی <ChevronLeft size={16} />
           </button>
        </div>

      </div>
    </div>
  );
};