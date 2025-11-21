
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { LatencyScalingChart } from '../../visuals/LatencyScalingChart';
import { CongestionCollapseAnim } from '../../visuals/CongestionCollapseAnim';
import { ThroughputLatencyChart } from '../../visuals/ThroughputLatencyChart';
import { AlertTriangle, CheckSquare, GitMerge, Clock, Info } from 'lucide-react';

export const ThroughputLatency: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۵-۱ (ارزیابی اولیه)
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          پهنای باند و تاخیر (Throughput & Latency)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          بررسی رفتار پروتکل در شرایط رقابت برای منابع و تحلیل پدیده فروپاشی ازدحام کوانتومی.
        </p>
      </div>

      {/* Introduction to Experiment */}
      <Card title="شرایط آزمایش اولیه">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            قبل از بررسی تأثیر ناهمدوسی شدید، ابتدا برای به دست آوردن درک بصری (Intuition)، پروتکل را روی دستگاه‌هایی با <strong>عمر حافظه طولانی (۱ دقیقه)</strong> ارزیابی می‌کنیم. این رکورد فعلی پلتفرم‌های NV Center ایزوله است [8].
          </p>
          <p className="mb-4">
            هدف ما بررسی نحوه اشتراک‌گذاری منابع توسط پروتکل، زمانی است که چندین مدار مجازی (VC) برای استفاده از <strong>لینک گلوگاه MA-MB</strong> با هم رقابت می‌کنند.
          </p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm mt-2">
             <h5 className="font-bold text-slate-900 mb-2 border-b border-slate-300 pb-1">سناریوهای مورد بررسی:</h5>
             <ul className="list-disc list-inside space-y-1 text-slate-700">
               <li><strong>۱ مدار:</strong> فقط (A0-B0).</li>
               <li><strong>۲ مدار:</strong> (A0-B0) و (A1-B1).</li>
               <li><strong>۴ مدار:</strong> (A0-B0)، (A1-B1)، (A0-B1) و (A1-B0).</li>
             </ul>
             <p className="mt-3 text-slate-500 text-xs">
               در هر سناریو، بین ۱ تا ۸ درخواست همزمان (هر کدام ۱۰۰ جفت) به صورت Round-Robin بین مدارها توزیع می‌شوند.
             </p>
          </div>
        </div>
      </Card>

      {/* 1. Latency Scaling Chart */}
      <Card title="تاخیر انتها-به-انتها (End-to-End Latency)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            در نمودار زیر، میانگین تاخیر درخواست‌ها بر حسب تعداد درخواست‌های همزمان رسم شده است. ما دو پارامتر را تغییر می‌دهیم: 
            <br/>
            ۱. <strong>فیدلیتی نهایی (End-to-End Fidelity):</strong> ۰.۷، ۰.۸ و ۰.۹.
            <br/>
            ۲. <strong>زمان قطع (Cutoff Time):</strong> طولانی (Long) و کوتاه (Short).
          </p>

          <LatencyScalingChart />

          <div className="mt-6 space-y-4">
             <div className="flex items-start gap-3">
               <CheckSquare className="text-green-600 shrink-0 mt-1" size={20}/>
               <p className="text-sm text-slate-700 leading-6">
                 <strong>مشاهده ۱:</strong> جفت‌های با فیدلیتی بالاتر (خط سبز) زمان بیشتری برای تولید نیاز دارند (شیب تندتر).
               </p>
             </div>
             <div className="flex items-start gap-3">
               <CheckSquare className="text-blue-600 shrink-0 mt-1" size={20}/>
               <p className="text-sm text-slate-700 leading-6">
                 <strong>مشاهده ۲ (حالت ۱ و ۲ مدار):</strong> تاخیر به صورت خطی با افزایش تعداد درخواست‌ها رشد می‌کند. این نشان می‌دهد که پروتکل منابع را به درستی به اشتراک می‌گذارد.
               </p>
             </div>
          </div>
        </div>
      </Card>

      {/* 2. Congestion Collapse */}
      <Card title="پدیده فروپاشی ازدحام کوانتومی (Quantum Congestion Collapse)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            در سناریوی <strong>۴ مدار</strong> با زمان قطع طولانی (Long Cutoff)، شبکه دچار مشکل جدی می‌شود (نمودار بالا را روی ۴ مدار و Long تنظیم کنید تا ببینید).
          </p>
          
          <div className="flex items-center gap-2 mb-4 bg-red-50 p-3 rounded text-red-900 font-bold border border-red-100">
            <AlertTriangle />
            چرا شبکه قفل می‌کند؟
          </div>
          <p className="mb-4">
            الگوریتم زمان‌بندی ساده‌ی ما فرض می‌کند لینک‌ها مستقل هستند، اما در واقعیت وابستگی وجود دارد. یک جفت در لینک بالادست (Upstream) باید منتظر تولید جفت متناظر در لینک پایین‌دست (Downstream) برای <strong>همان VC</strong> بماند.
          </p>
          
          <CongestionCollapseAnim />

          <p className="mt-4 text-sm text-slate-600 leading-7">
             با تنها ۲ کیوبیت حافظه در هر لینک، ممکن است حافظه با قطعات نامتناجس از ۴ مدار مختلف پر شود. هیچ کس نمی‌تواند Swap کند و همه منتظر خالی شدن حافظه هستند.
             <br/>
             <strong>راه‌حل (Short Cutoff):</strong> کاهش زمان Cutoff باعث می‌شود جفت‌های منتظر سریع‌تر دور ریخته شوند و حافظه آزاد شود. این کار اگرچه بی‌رحمانه است، اما جلوی قفل شدن شبکه را می‌گیرد (خطی شدن نمودار در حالت Short Cutoff).
          </p>
        </div>
      </Card>

      {/* 3. Throughput vs Latency */}
      <Card title="تاخیر در برابر پهنای باند (Saturation)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            برای بررسی رفتار اشباع، ما درخواست‌های کوچکی را با فرکانس فزاینده ارسال می‌کنیم و تاخیر را اندازه می‌گیریم. دو حالت را مقایسه می‌کنیم:
            <br/>
            <strong>۱. شبکه خالی:</strong> فقط مدار A0-B0 فعال است.
            <br/>
            <strong>۲. شبکه شلوغ:</strong> مدار A1-B1 دائماً مشغول است و با A0-B0 رقابت می‌کند.
          </p>

          <ThroughputLatencyChart />

          <div className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700 mt-6 text-sm leading-7">
             <h5 className="font-bold text-yellow-400 flex items-center gap-2 mb-2">
               <Info size={18} />
               تحلیل نتیجه عجیب:
             </h5>
             <p>
               شاید انتظار داشته باشید که در حالت شلوغ، شبکه در <strong>نصف</strong> ظرفیت حالت خالی اشباع شود (چون لینک گلوگاه نصف شده). اما نمودار نشان می‌دهد که اشباع در حدود <strong>۱۸ جفت/ثانیه</strong> رخ می‌دهد (که بیشتر از نصفِ ۲۷ جفت/ثانیه است).
             </p>
             <p className="mt-2 text-slate-400">
               <strong>دلیل:</strong> در حالت شلوغ، لینک گلوگاه (MA-MB) کندتر از سایر لینک‌ها جفت تولید می‌کند. بنابراین، وقتی گلوگاه بالاخره یک جفت تولید می‌کند، احتمال اینکه لینک‌های همسایه (که خلوت هستند) آماده باشند بسیار بالاست. این هماهنگی آماری باعث می‌شود کارایی کمی بهتر از حد انتظار باشد.
             </p>
          </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/evaluation/decoherence" 
        nextTitle="۵-۳. مقاومت در برابر ناهمدوسی" 
      />
    </div>
  );
};
