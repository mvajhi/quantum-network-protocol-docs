
import React from 'react';
import { Card } from '../ui/Card';
import { SwappingDemo } from '../visuals/SwappingDemo';
import { PageNavigation } from '../ui/PageNavigation';
import { Atom, Network, Share2, Target, CheckSquare, GitMerge } from 'lucide-react';

export const EntanglementSolution: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۱-۴
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          راهکار: توزیع درهم‌تنیدگی (Entanglement Distribution)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          چگونه با استفاده از پدیده درهم‌تنیدگی و تله‌پورت کوانتومی، بر محدودیت‌های انتقال فیزیکی غلبه کنیم؟
        </p>
      </div>

      {/* 1. The Core Concept: Entanglement instead of Transmission */}
      <Card title="جایگزینی برای انتقال مستقیم">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            همانطور که در بخش قبل دیدیم، ارسال مستقیم کیوبیت‌ها در فواصل طولانی با شکست مواجه می‌شود. اما یک راهکار جایگزین هوشمندانه وجود دارد: <strong>تکیه بر توزیع جفت‌های درهم‌تنیده (Entangled Pairs).</strong>
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 my-6 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
             <div className="shrink-0 bg-indigo-100 text-indigo-600 p-4 rounded-full h-16 w-16 flex items-center justify-center">
               <Atom size={32} />
             </div>
             <div>
               <h4 className="font-bold text-indigo-900 text-lg mb-2">درهم‌تنیدگی کوانتومی چیست؟</h4>
               <p className="text-sm text-indigo-800 leading-7">
                 درهم‌تنیدگی یک حالت خاص بین دو یا چند کیوبیت است که در آن وضعیت هر کیوبیت را <strong>نمی‌توان مستقل از دیگران توصیف کرد</strong>، حتی اگر در فواصل بسیار دور از هم باشند. آلبرت انیشتین این پدیده را "عمل شبح‌وار در فاصله" نامید. در شبکه، این پدیده ماده اولیه اصلی برای ارتباطات راه دور است.
               </p>
             </div>
          </div>

          <p>
            چرا این پدیده کلید حل مشکل است؟ زیرا اگر شما یک جفت کیوبیت درهم‌تنیده بین مبدا و مقصد داشته باشید، می‌توانید از پروتکل <strong>تله‌پورت کوانتومی (Quantum Teleportation)</strong> استفاده کنید تا یک کیوبیت داده‌ی دلخواه را از مبدا به مقصد منتقل کنید.
          </p>
        </div>
      </Card>

      {/* 2. How it solves the problems */}
      <Card title="چرا این روش موانع فیزیکی را دور می‌زند؟">
        <div className="grid grid-cols-1 gap-6">
          
          <div className="flex gap-4">
            <div className="mt-1 bg-green-100 p-2 rounded-lg text-green-700 h-fit"><CheckSquare size={20}/></div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">غلبه بر قضیه عدم کپی‌برداری (No-Cloning)</h4>
              <p className="text-sm text-slate-600 leading-7 text-justify">
                تله‌پورت کردن داده‌ها نیاز به مصرف کردن یک "جفت درهم‌تنیده" دارد. خوشبختانه، جفت‌های درهم‌تنیده معمولاً در حالت‌های خاص و شناخته‌شده‌ای به نام <strong>حالت‌های بل (Bell States)</strong> هستند. برخلاف داده‌های کاربر که ناشناخته‌اند و نمی‌توان کپی‌شان کرد، حالت‌های بل شناخته شده‌اند. بنابراین اگر یک جفت درهم‌تنیده در مسیر گم شود، مشکلی نیست! ما به سادگی یک جفت جدید از همان نوع تولید می‌کنیم.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 bg-purple-100 p-2 rounded-lg text-purple-700 h-fit"><GitMerge size={20}/></div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">غلبه بر اتلاف انتقال (با روش Stitching)</h4>
              <p className="text-sm text-slate-600 leading-7 text-justify">
                 برای ایجاد درهم‌تنیدگی در فواصل طولانی (مثلاً ۱۰۰۰ کیلومتر)، لازم نیست یک فوتون را ۱۰۰۰ کیلومتر بفرستیم (که حتماً گم می‌شود). در عوض، ما لینک‌های کوتاه (مثلاً ۱۰ کیلومتری) ایجاد می‌کنیم و سپس آن‌ها را به هم "بخیه" می‌زنیم. این فرآیند <strong>Entanglement Swapping</strong> نام دارد.
              </p>
            </div>
          </div>

        </div>
      </Card>

      {/* 3. Interactive Demo of Swapping */}
      <SwappingDemo />

      {/* 4. Current Progress */}
      <Card title="وضعیت پیشرفت تکنولوژی">
        <div className="text-slate-800 leading-9 text-justify">
           <p className="mb-4">
             تولید درهم‌تنیدگی بین دو گره که مستقیماً به هم متصل هستند (لینک سطح پایین) تاکنون در فواصل تا <strong>۱.۳ کیلومتر</strong> [41] به صورت عملی نشان داده شده است.
           </p>
           <p>
             همچنین کار بر روی راه‌اندازی ستاپ‌های <strong>سه گره‌ای</strong> (شبیه شبیه‌سازی بالا) و افزایش فاصله بین گره‌ها به چندین کیلومتر در حال انجام است [28, 83]. این یعنی سخت‌افزار لازم برای اجرای پروتکل‌های شبکه کم‌کم در حال آماده شدن است.
           </p>
        </div>
      </Card>

      {/* 5. The Paper's Contributions */}
      <Card title="مشارکت‌های این مقاله (Contributions)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-6">
            نقطه شروع کار ما، پروتکلی است که اخیراً برای تولید درهم‌تنیدگی در سطح لینک (Link-level) پیشنهاد شده است [22]. اما رفتن از "سطح لینک" به "سطح انتها-به-انتها" (End-to-End) یک جهش بزرگ در پیچیدگی است. 
          </p>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Target className="text-red-500" />
              اهداف طراحی پروتکل ما
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="bg-slate-200 text-slate-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-1">1</span>
                <p className="text-sm text-slate-700 leading-7">
                  <strong>هماهنگی (Coordination):</strong> مدیریت فرآیند تعویض درهم‌تنیدگی (Swapping) بین چندین گره مختلف برای اینکه قطعات کوچک به درستی به یک خط طولانی تبدیل شوند.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="bg-slate-200 text-slate-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-1">2</span>
                <p className="text-sm text-slate-700 leading-7">
                  <strong>مدیریت ناهمدوسی:</strong> کاهش میزان ناهمدوسی که کیوبیت‌ها در حافظه تجربه می‌کنند (چون منتظر ماندن برای سایر گره‌ها زمان‌بر است).
                </p>
              </li>
              <li className="flex gap-3">
                <span className="bg-slate-200 text-slate-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-1">3</span>
                <p className="text-sm text-slate-700 leading-7">
                  <strong>جبران اتلاف:</strong> ارائه راهکار برای زمانی که کیوبیت‌ها در حافظه به دلیل ناهمدوسی از بین می‌روند.
                </p>
              </li>
               <li className="flex gap-3">
                <span className="bg-slate-200 text-slate-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-1">4</span>
                <p className="text-sm text-slate-700 leading-7">
                  <strong>تضمین کیفیت (Fidelity):</strong> اطمینان از اینکه جفت درهم‌تنیده نهایی کیفیت کافی برای استفاده در اپلیکیشن‌ها را دارد.
                </p>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h4 className="font-bold text-slate-900 mb-2">دستاوردهای کلیدی پژوهش:</h4>
            <p className="text-slate-700 text-sm leading-7 mb-4">
              نتیجه کار ما یک پروتکل <strong>Quantum Data Plane</strong> است که قادر به ایجاد درهم‌تنیدگی سراسری است. به طور خاص:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="bg-blue-50 p-3 rounded border border-blue-100 text-blue-900 text-xs leading-5">
                ۱. طراحی پروتکل لایه شبکه با قابلیت مقابله با ناهمدوسی.
              </li>
              <li className="bg-blue-50 p-3 rounded border border-blue-100 text-blue-900 text-xs leading-5">
                ۲. ترسیم معماری سرویس‌های شبکه کوانتومی و جایگاه این پروتکل به عنوان بلوک سازنده.
              </li>
              <li className="bg-blue-50 p-3 rounded border border-blue-100 text-blue-900 text-xs leading-5">
                ۳. ارزیابی کارایی پروتکل در برابر ناهمدوسی با استفاده از شبیه‌ساز شبکه.
              </li>
              <li className="bg-blue-50 p-3 rounded border border-blue-100 text-blue-900 text-xs leading-5">
                ۴. اثبات عملکرد پروتکل روی سخت‌افزارهای بسیار محدودِ امروزی (Near-term hardware).
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/background/motivation" 
        nextTitle="۲-۱. انگیزه و ضرورت زمانی" 
      />

    </div>
  );
};