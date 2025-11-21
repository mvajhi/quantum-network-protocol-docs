
import React from 'react';
import { Card } from '../ui/Card';
import { PageNavigation } from '../ui/PageNavigation';
import { FutureRoadmap } from '../visuals/FutureRoadmap';
import { Target, ArrowUpRight } from 'lucide-react';

export const Discussion: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۶
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          بحث و نتیجه‌گیری (Discussion)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          جمع‌بندی دستاوردها و ترسیم نقشه راه برای آینده اینترنت کوانتومی.
        </p>
      </div>

      {/* Summary */}
      <Card title="گامی مهم به سوی شبکه مقیاس‌پذیر">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            در این مقاله، ما یک پروتکل <strong>Quantum Data Plane</strong> اتصال‌گرا (Connection-oriented) را پیشنهاد کردیم که قادر است درهم‌تنیدگی End-to-End را در سراسر یک شبکه توزیع کند.
          </p>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-start gap-3 mb-4">
             <Target className="text-green-600 shrink-0 mt-1" />
             <p className="text-sm text-green-800 leading-7">
               اگرچه کار ما یک گام بسیار مهم است، اما باید به یاد داشت که این پروتکل تنها <strong>یک جزء</strong> از معماری کامل شبکه کوانتومی است. برای رسیدن به اینترنت کوانتومی نهایی، مسیر طولانی و هیجان‌انگیزی در پیش است.
             </p>
          </div>
        </div>
      </Card>

      {/* Future Directions */}
      <Card title="مسیرهای آینده (Future Directions)">
        <p className="text-slate-600 mb-6 leading-8 text-justify">
           طراحی ما بر اساس اصول مهندسی سیستم و لایه‌بندی انجام شده است تا بتواند به عنوان پایه‌ای برای توسعه‌های بعدی عمل کند. چهار حوزه اصلی برای کارهای آتی شناسایی شده است:
        </p>
        
        <FutureRoadmap />

        <div className="mt-8 space-y-6 text-slate-800 leading-9 text-justify">
           
           <div>
              <h4 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
                 <ArrowUpRight size={20}/> ۱. سرویس‌های پیشرفته (QNP Services)
              </h4>
              <p className="text-sm text-slate-600">
                 ما QNP را با الهام از MPLS طراحی کردیم. این یعنی پتانسیل پیاده‌سازی سرویس‌های مشابه MPLS وجود دارد، مانند:
                 <br/> • پشتیبانی از چندمسیر (Multipath) برای افزایش پهنای باند.
                 <br/> • بازیابی سریع خطا (Fast Reroute).
                 <br/> • و ویژگی‌های کوانتومی خاص مثل تولید پیشگیرانه و ذخیره جفت‌ها برای آینده [16].
              </p>
           </div>

           <div>
              <h4 className="font-bold text-purple-700 flex items-center gap-2 mb-2">
                 <ArrowUpRight size={20}/> ۲. طراحی کامل Control Plane
              </h4>
              <p className="text-sm text-slate-600">
                 تمرکز این مقاله روی Data Plane بود. اما تحقیقات روی پروتکل‌های مسیریابی و سیگنالینگ نیز در حال رشد است [12, 15, 87]. سوالات باز زیادی وجود دارد:
                 <br/> • معماری نرم‌افزاری باید متمرکز (SDN) باشد یا توزیع‌شده؟ [2, 53]
                 <br/> • چگونه منابع را بهینه رزرو کنیم؟
              </p>
           </div>

        </div>
      </Card>

      {/* Closing Thought */}
      <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl text-center leading-8 italic border border-slate-700 shadow-xl">
         "همانطور که پشته پروتکل شبکه کلاسیک به صورت سیستماتیک به عنوان راهکارهای توزیع‌شده برای مسائل بهینه‌سازی طراحی شده است [17]، قابل تصور است که بتوان رویکرد مشابهی را برای بهبود طراحی پشته شبکه کوانتومی نیز به کار برد."
      </div>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/related-work" 
        nextTitle="۷. کارهای مرتبط" 
      />
    </div>
  );
};