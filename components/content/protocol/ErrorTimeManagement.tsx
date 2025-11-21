
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { CutoffSimulator } from '../../visuals/CutoffSimulator';
import { CutoffDiscardFlow } from '../../visuals/CutoffDiscardFlow';
import { Timer, Trash2, RefreshCw, AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react';

export const ErrorTimeManagement: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۴-۱-۳
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          مدیریت خطا و زمان (Error & Time Management)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          راهکارهای پروتکل برای مقابله با عمر کوتاه حافظه کوانتومی و مدیریت شکست‌ها.
        </p>
      </div>

      {/* 1. Cutoff Time Mechanism */}
      <Card title="مکانیزم زمان قطع (Cutoff Time)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            در سخت‌افزارهای آینده نزدیک (Near-future)، عمر حافظه کوانتومی بسیار کوتاه است. بسیار پیش می‌آید که یک کیوبیت (مثلاً لینک چپ) تولید شود و در حافظه منتظر بماند، اما تا زمانی که جفت مناسب آن (لینک راست) آماده شود، کیوبیت اول آنقدر دچار ناهمدوسی شده باشد که دیگر قابل استفاده نباشد.
          </p>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6 flex items-start gap-3">
            <Clock className="text-red-600 shrink-0 mt-1" />
            <div>
              <h5 className="font-bold text-red-900 mb-1">راه‌حل: ضرب‌الاجل (Deadline)</h5>
              <p className="text-sm text-red-800 leading-6">
                ما از مکانیسم "زمان قطع" استفاده می‌کنیم [49, 55, 73]. اگر کیوبیتی در گره میانی منتظر بماند و عملیات Swap روی آن انجام نشود، پس از رسیدن به زمان Cutoff، پروتکل آن را <strong>دور می‌اندازد (Discard)</strong>.
              </p>
            </div>
          </div>

          <p className="mb-6">
            این پارامتر یک <strong>بده‌بستان (Trade-off)</strong> اساسی ایجاد می‌کند:
            <br/>
            هرچه مهلت زمانی (Cutoff) سخت‌گیرانه‌تر باشد، احتمال اینکه دو لینک همزمان آماده شوند کمتر است (نرخ پایین می‌آید)، اما اگر موفق شوند، کیفیت (Fidelity) بسیار بالا خواهد بود چون زمان کمی در حافظه مانده‌اند.
          </p>
          
          <CutoffSimulator />
          
          <p className="text-sm text-slate-500 text-center mt-2">
            با ابزار بالا بازی کنید: زمان قطع را کم کنید تا ببینید چگونه فیدلیتی بالا می‌رود اما نرخ موفقیت سقوط می‌کند.
          </p>
        </div>
      </Card>

      {/* 2. Handling Discards */}
      <Card title="مدیریت دور ریز (Discard Logic)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            وقتی یک کیوبیت به دلیل Cutoff دور ریخته می‌شود، گره باید یک <strong>رکورد موقت دورریز (Discard Record)</strong> ثبت کند. اما سوال اصلی اینجاست: این اطلاعات چگونه به گره‌های انتهایی می‌رسد تا بدانند که اتصال قطع شده است؟
          </p>
          <p className="mb-6">
             نمودار تعاملی زیر، روند کامل این ماجرا را از لحظه منقضی شدن تا لحظه اطلاع‌رسانی به مبدا نشان می‌دهد.
          </p>

          <CutoffDiscardFlow />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
               <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                 <RefreshCw size={18} className="text-blue-500"/>
                 نقش پیام TRACK
               </h5>
               <p className="text-sm text-slate-600 leading-6">
                 نکته کلیدی اینجاست که تکرارگر هنگام دور ریختن کیوبیت، <strong>هیچ پیام فوری</strong> ارسال نمی‌کند (چون پرهزینه است). او فقط در دفترچه خود یادداشت می‌کند. وقتی پیام TRACK (که طبق برنامه مرتباً ارسال می‌شود) به گره می‌رسد، این یادداشت را می‌بیند و متوجه خرابی می‌شود.
               </p>
             </div>

             <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
               <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                 <AlertTriangle size={18} className="text-orange-500"/>
                 شرایط خاص گره‌های انتهایی
               </h5>
               <p className="text-sm text-slate-600 leading-6">
                 <strong>نکته مهم:</strong> تایمر Cutoff در گره‌های انتهایی استفاده نمی‌شود! چرا؟ چون ممکن است منجر به حالتی شود که یک سمت کیوبیت را دور بریزد در حالی که سمت دیگر آن را به اپلیکیشن تحویل داده است (Window Condition).
                 گره‌های انتهایی تنها زمانی کیوبیت را دور می‌ریزند که "خبر انقضا" (Expiry Notification) را از شبکه دریافت کنند.
               </p>
             </div>
          </div>
        </div>
      </Card>

      {/* 3. Continuous Link Generation */}
      <Card title="تولید مداوم لینک (Continuous Generation)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            در شبکه‌های اولیه، دور ریختن کیوبیت‌ها به دلیل ناهمدوسی یک اتفاق نادر نیست، بلکه <strong>قاعده (Norm)</strong> است. شکست بیشتر از موفقیت رخ می‌دهد.
            بنابراین، پروتکل نباید بعد از هر شکست متوقف شود.
          </p>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-bl-lg font-bold">استراتژی کارآمد</div>
             <p className="text-sm text-slate-700 leading-7">
               پروتکل لایه شبکه از لایه لینک درخواست می‌کند که جفت‌ها را به صورت <strong>جریان مداوم (Stream)</strong> تولید کند، نه دانه‌دانه. تا زمانی که گره‌های انتهایی سیگنال پایان ندهند، تولید ادامه می‌یابد.
             </p>
             <hr className="border-slate-200 my-4"/>
             <div className="flex justify-between items-center text-sm font-bold">
               <span className="text-slate-500">Link-Pair Rate (LPR)</span>
               <span className="text-2xl text-slate-300">&gt;</span>
               <span className="text-slate-500">End-to-End Rate (EER)</span>
             </div>
             <p className="text-xs text-slate-500 mt-2 text-center">
               نرخ تولید لینک (LPR) باید همیشه بیشتر از نرخ نهایی (EER) باشد، زیرا بسیاری از جفت‌ها در مسیر از بین می‌روند.
             </p>
          </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/design/traffic-optimization" 
        nextTitle="۴-۱-۴. مدیریت ترافیک و بهینه‌سازی" 
      />
    </div>
  );
};
