
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { ProtocolCycle } from '../../visuals/ProtocolCycle';
import { VCAnalogy } from '../../visuals/VCAnalogy';
import { ParallelismDemo } from '../../visuals/ParallelismDemo';
import { GitMerge, Zap, LayoutGrid, ArrowRightLeft } from 'lucide-react';

export const ProtocolDesign: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۴-۱-۱
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          طراحی پروتکل: چرخه عملیاتی
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          معرفی پروتکل شبکه کوانتومی (QNP) و نحوه عملکرد آن بر بستر مدارهای مجازی.
        </p>
      </div>

      {/* 1. Principle of Operation */}
      <Card title="اصول عملکرد (Principle of Operation)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            پروتکل پیشنهادی ما (QNP) زمانی عملیاتی می‌شود که یک <strong>مدار مجازی (Virtual Circuit - VC)</strong> توسط پروتکل سیگنالینگ در شبکه نصب شده باشد.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
             <h5 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
               <ArrowRightLeft size={18} />
               مدار مجازی چیست؟
             </h5>
             <p className="text-sm text-blue-800 leading-7">
               یک مسیر ثابت و مشخص بین دو گره انتهایی (End-nodes) که منابع Data Plane لازم (مثل حافظه و جداول مسیریابی) در تمام گره‌های میانیِ آن رزرو و تنظیم شده است. این مدار جهت‌دار است (از Head-end به Tail-end).
             </p>
          </div>
          
          <VCAnalogy />

          <h4 className="font-bold text-slate-900 mt-8 mb-4">چرخه حیات یک درخواست</h4>
          <p className="mb-4">
            هنگامی که درخواستی به گره ابتدایی (Head-end) می‌رسد، پروتکل شروع به کار می‌کند. مراحل زیر طی می‌شود:
          </p>
          <ul className="list-decimal list-inside space-y-2 text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <li><strong>شروع (Trigger):</strong> ارسال پیام <span className="font-mono bg-slate-200 px-1 rounded text-blue-700">FORWARD</span> به سمت پایین‌دست (Downstream).</li>
            <li><strong>تولید (Generate):</strong> شروع تولید لینک در تمام مسیر به محض دریافت پیام FORWARD.</li>
            <li><strong>سواپ (Swap):</strong> به محض اینکه دو لینک در یک گره میانی آماده شدند، عملیات Swap انجام می‌شود (بدون نیاز به هماهنگی کلاسیک اضافی در آن لحظه).</li>
            <li><strong>تکمیل (Track):</strong> نتایج Swap توسط پیام‌های <span className="font-mono bg-slate-200 px-1 rounded text-green-700">TRACK</span> جمع‌آوری شده و به دو طرف ارسال می‌شود.</li>
          </ul>
          
          <div className="mt-6">
             <ProtocolCycle />
          </div>
        </div>
      </Card>

      {/* 2. Why Virtual Circuits? */}
      <Card title="چرا مدارهای مجازی؟ (Virtual Circuits)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            ویژگی مرکزی پروتکل ما این است که <strong>Connection-Oriented</strong> (اتصال‌گرا) است. چرا ما اصرار داریم که مسیر از قبل مشخص باشد؟
          </p>
          <div className="flex items-center gap-3 bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-6">
             <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 shrink-0"><Zap size={24}/></div>
             <div>
               <h5 className="font-bold text-indigo-900">پاسخ: قابلیت موازی‌سازی (Parallelisation)</h5>
               <p className="text-sm text-indigo-800 leading-6">
                 لینک‌-جفت‌ها تا قبل از وصل شدن به هم (Swap) کاملاً مستقل هستند. پس می‌توان همه آن‌ها را <strong>همزمان</strong> تولید کرد.
               </p>
             </div>
          </div>
          
          <ParallelismDemo />

          <p className="mt-4">
            از آنجا که نرخ تولید لینک‌ها کند است (در حد چند ده هرتز [43])، این موازی‌سازی یک بهینه‌سازی حیاتی است. همچنین با کاهش زمان انتظار، اثرات مخرب <strong>ناهمدوسی</strong> را به حداقل می‌رساند.
          </p>
          <p className="mt-4 text-sm text-slate-600 bg-slate-100 p-3 rounded border-l-4 border-slate-400">
            <strong>نحوه پیاده‌سازی:</strong> مشابه MPLS، پروتکل سیگنالینگ یک برچسب (Link-Label) به هر لینک در مسیر اختصاص می‌دهد. لایه شبکه از این برچسب به عنوان شناسه درخواست (Request ID) برای لایه لینک استفاده می‌کند.
          </p>
        </div>
      </Card>

      {/* 3. Comparison */}
      <Card title="مقایسه با مدل‌های دیگر">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            برخی کارهای دیگر در زمینه مسیریابی کوانتومی [63, 80] مدل متفاوتی دارند. آن‌ها فرض می‌کنند که تمام لینک‌های شبکه در بازه‌های زمانی مشخص (Time Slots) تلاش به تولید می‌کنند و سپس گره‌ها بر اساس اینکه کدام لینک‌ها موفق شده‌اند، تصمیم می‌گیرند مسیر را "بسازند".
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
             <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <LayoutGrid size={18} className="text-slate-400" />
                  مدل‌های دیگر (Opportunistic)
                </h5>
                <p className="text-xs text-slate-600 leading-5">
                  نیاز به شبکه‌های بزرگ و متراکم (توری) دارند تا مسیرهای جایگزین زیادی وجود داشته باشد. مناسب آینده دور.
                </p>
             </div>
             <div className="bg-white border border-blue-500 p-4 rounded-lg shadow-md relative">
                <div className="absolute top-2 left-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                <h5 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <GitMerge size={18} />
                  مدل ما (Connection-Oriented)
                </h5>
                <p className="text-xs text-slate-600 leading-5">
                  روی مسیرهای تکی کار می‌کند (مناسب شبکه‌های خطی و کم‌تراکم فعلی). اما قابلیت تعمیم به مسیرهای چندگانه (Multipath) را نیز دارد.
                </p>
             </div>
          </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/design/swap-tracking" 
        nextTitle="۴-۱-۲. ردیابی و سواب (Swap & Tracking)" 
      />
    </div>
  );
};