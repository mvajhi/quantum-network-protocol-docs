
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { NearFutureHardwareDemo } from '../../visuals/NearFutureHardwareDemo';
import { Microscope, Cpu, Settings, CheckCircle } from 'lucide-react';

export const NearFuturePerformance: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۵-۳
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          عملکرد روی سخت‌افزار آینده نزدیک (Near-Future)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          اثبات کارایی پروتکل بر روی سخت‌افزارهای بسیار محدود و پر از نویز که همین امروز در دسترس هستند.
        </p>
      </div>

      {/* Intro */}
      <Card title="چالش سخت‌افزار واقعی">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            تا اینجا، ما شبکه‌ای را در نظر گرفتیم که اگرچه غیرممکن نیست، اما هنوز کمی فراتر از توانایی‌های فعلی است (۲ کیوبیت ارتباطی، گیت‌های سریع و ...).
            اکنون می‌خواهیم نشان دهیم که پروتکل QNP حتی روی سخت‌افزارهای محدود امروزی [1, 43] نیز کار می‌کند. این موضوع <strong>بهنگام بودن (Timeliness)</strong> این پژوهش را برجسته می‌کند.
          </p>
        </div>
      </Card>

      {/* Constraints & Demo */}
      <Card title="محدودیت‌ها و نتایج شبیه‌سازی">
        <div className="text-slate-800 leading-9 text-justify">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
             
             <div>
               <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                 <Cpu size={20} className="text-orange-500"/>
                 محدودیت‌های سخت‌افزاری
               </h4>
               <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside bg-slate-50 p-4 rounded-lg border border-slate-200">
                 <li><strong>تک کیوبیت ارتباطی:</strong> گره‌ها فقط ۱ کیوبیت دارند که می‌تواند به فیبر نوری وصل شود. بنابراین نمی‌توانند همزمان لینک چپ و راست تولید کنند.</li>
                 <li><strong>عملیات سریال:</strong> باید یک لینک تولید شود، به حافظه منتقل شود، و سپس لینک دوم تولید شود.</li>
                 <li><strong>نویز اسپین هسته‌ای:</strong> فرآیند تولید لینک دوم باعث ایجاد نویز روی کیوبیت اول (که در حافظه است) می‌شود [47].</li>
               </ul>
             </div>

             <div>
               <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                 <Settings size={20} className="text-blue-500"/>
                 پیکربندی آزمایش
               </h4>
               <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside bg-slate-50 p-4 rounded-lg border border-slate-200">
                 <li><strong>توپولوژی:</strong> شبکه خطی ۳ گره‌ای.</li>
                 <li><strong>فاصله:</strong> ۲۵ کیلومتر بین هر گره.</li>
                 <li><strong>هدف:</strong> فیدلیتی ۰.۵ (کافی برای اثبات درهم‌تنیدگی).</li>
                 <li><strong>تنظیمات:</strong> جدول مسیریابی به صورت دستی تنظیم شده تا بهترین استفاده را از منابع محدود ببرد.</li>
               </ul>
             </div>

          </div>
          
          <NearFutureHardwareDemo />

          <div className="mt-6">
             <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
               <CheckCircle size={20} className="text-green-600" />
               نتیجه‌گیری نهایی:
             </h4>
             <p className="text-sm text-slate-700 leading-7 text-justify">
               علیرغم تفاوت‌های عظیم در محیط عملیاتی (نسبت به سناریوهای قبلی)، پروتکل QNP همچنان عملکردی (Functional) باقی می‌ماند.
               این پروتکل پارامترهای درستی (Knobs) را به Control Plane ارائه می‌دهد. یک اپراتور شبکه که محدودیت‌ها را درک می‌کند، می‌تواند با تنظیم دقیق زمان Cutoff و نرخ درخواست، از همین سخت‌افزار محدود نیز سرویس بگیرد.
             </p>
          </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/discussion" 
        nextTitle="۶. بحث و نتیجه‌گیری (Discussion)" 
      />
    </div>
  );
};
