
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { LazyTrackingDemo } from '../../visuals/LazyTrackingDemo';
import { Database, Mail, Network, EyeOff, Clock } from 'lucide-react';

export const SwapTracking: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۴-۱-۲
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          ردیابی و سواب (Swap & Tracking)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          چگونه شبکه نتایج عملیات کوانتومی را مدیریت می‌کند و چرا ترتیب زمانی انجام آن‌ها اهمیتی ندارد.
        </p>
      </div>

      {/* 1. Swap Records */}
      <Card title="سوابق عملیات تعویض (Swap Records)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            همانطور که در بخش ۳-۴ توضیح داده شد، پروتکل علاوه بر انجام فیزیکی Swap، باید وضعیت درهم‌تنیدگی را <strong>ردیابی (Track)</strong> کند. به عبارت دیگر، باید:
          </p>
          <ul className="list-disc list-inside space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700 mb-6">
             <li>(i) به درستی تشخیص دهد که کدام کیوبیت‌ها در گره‌های انتهایی متعلق به یک جفت هستند.</li>
             <li>(ii) تمام نتایج عملیات Swap را جمع‌آوری کند تا بتواند حالت نهایی بل (Final Bell State) را استنتاج کند.</li>
          </ul>
          
          <p className="mb-4">
            به همین دلیل، به محض اینکه یک عملیات Swap در یک گره میانی تکمیل می‌شود، یک <strong>سوابق موقت (Swap Record)</strong> در آن گره ثبت (Log) می‌شود. این رکورد شامل اطلاعات زیر است:
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center my-6">
             {/* Visual representation of a Record */}
             <div className="bg-white border-2 border-slate-800 rounded-xl p-4 shadow-[4px_4px_0px_rgba(30,41,59,1)] w-full max-w-md">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-3">
                   <Database size={18} className="text-slate-500"/>
                   <span className="font-mono font-bold text-slate-800">SWAP_LOG_ENTRY</span>
                </div>
                <div className="space-y-2 font-mono text-sm">
                   <div className="flex justify-between">
                     <span className="text-slate-500">Pair A ID:</span>
                     <span className="text-blue-600 font-bold">#L1-8392</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-500">Pair B ID:</span>
                     <span className="text-blue-600 font-bold">#L2-4421</span>
                   </div>
                   <div className="flex justify-between bg-yellow-50 p-1 rounded">
                     <span className="text-slate-500">Result (2-bit):</span>
                     <span className="text-red-600 font-bold">10</span>
                   </div>
                </div>
             </div>
          </div>

          <p>
            اگر حالت بل جفت‌های ورودی مشخص باشد، خروجیِ ۲ بیتیِ Swap به طور یکتا مشخص می‌کند که جفت خروجی (که اکنون بین دو گره دورتر کشیده شده است) در چه حالتی قرار دارد.
          </p>
        </div>
      </Card>

      {/* 2. Lazy Entanglement Tracking */}
      <Card title="ردیابی تنبل درهم‌تنیدگی (Lazy Entanglement Tracking)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            گره‌های میانی نیازی به دانستن وضعیت نهایی ندارند؛ فقط گره‌های انتهایی (End-nodes) باید بدانند. پروتکل QNP برای رساندن این اطلاعات از روشی به نام <strong>ردیابی تنبل</strong> استفاده می‌کند.
          </p>
          
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 mb-6">
             <h5 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
               <Mail size={18} />
               مکانیزم پیام TRACK
             </h5>
             <p className="text-sm text-blue-800 leading-7">
               پروتکل یک پیام <span className="font-mono font-bold">TRACK</span> را از Head-end به Tail-end (و برعکس) در طول مدار مجازی می‌فرستد. این پیام در هر گره توقف می‌کند، سوابق Swap را (اگر آماده باشند) برمی‌دارد و اگر آماده نباشند صبر می‌کند.
             </p>
          </div>

          <h4 className="font-bold text-slate-900 mb-2 mt-6">چرا "تنبل" (Lazy)؟</h4>
          <p className="mb-4">
            چون پروتکل هیچ تلاشی برای ردیابی وضعیت جفت‌های <em>میانی</em> در حین انجام فرآیند نمی‌کند. ممکن است Swapها با ترتیبی کاملاً تصادفی انجام شوند (مثلاً گره ۵ زودتر از گره ۲ انجام دهد).
            پیام TRACK وانمود می‌کند که Swapها به ترتیبِ عبورِ پیام انجام شده‌اند.
          </p>

          <LazyTrackingDemo />

          <div className="mt-4 bg-slate-800 text-white p-4 rounded-lg text-sm leading-7 border-r-4 border-green-500">
             <strong className="text-green-400 block mb-1 flex items-center gap-2"><EyeOff size={16}/> نکته ظریف کوانتومی:</strong>
             گره‌های میانی (Swap کننده) واقعاً نمی‌دانند ورودی‌شان چیست! چون ممکن است Swapهای دیگر در شبکه وضعیت ورودی آن‌ها را تغییر داده باشند. اما ما نیازی نداریم که آن‌ها بدانند.
             پیام TRACK با جمع‌آوری نتایج یکی پس از دیگری، در نهایت در گره مقصد تمام قطعات پازل را دارد تا تصویر نهایی را بسازد.
          </div>
        </div>
      </Card>

      {/* 3. Advantages */}
      <Card title="مزیت روش اتصال‌گرا (Connection-Oriented Advantage)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
           <div className="border border-green-200 bg-green-50/50 p-5 rounded-xl">
              <h5 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <Network size={18} />
                روش ما (Lazy Tracking)
              </h5>
              <ul className="text-sm text-green-900 space-y-3 list-disc list-inside">
                 <li>عملیات کوانتومی منتظر پیام‌های کلاسیک نمی‌مانند.</li>
                 <li>گره‌ها می‌توانند مستقل عمل کنند.</li>
                 <li>اگر کیوبیتی خراب شد (Decohered)، گره می‌تواند آن را دور بریزد بدون اینکه نیاز باشد فوراً به کل شبکه خبر دهد (TRACK وقتی رسید متوجه می‌شود).</li>
              </ul>
           </div>

           <div className="border border-slate-200 bg-white p-5 rounded-xl opacity-70">
              <h5 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Clock size={18} />
                روش Hop-by-Hop (سنتی)
              </h5>
              <ul className="text-sm text-slate-600 space-y-3 list-disc list-inside">
                 <li>هر گره باید قبل از Swap بداند دقیقا وضعیت ورودی چیست.</li>
                 <li>نیاز به آپدیت مداوم دیتابیس درهم‌تنیدگی دارد.</li>
                 <li>تاخیر و مسائل همگام‌سازی (Synchronization) ایجاد می‌کند که در حضور ناهمدوسی فاجعه‌بار است.</li>
              </ul>
           </div>

        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/design/error-time-management" 
        nextTitle="۴-۱-۳. مدیریت خطا و زمان" 
      />
    </div>
  );
};
