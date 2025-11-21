
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { RoutingTableVisual } from '../../visuals/RoutingTableVisual';
import { FidelityFormulaDemo } from '../../visuals/FidelityFormulaDemo';
import { FidelityTestDemo } from '../../visuals/FidelityTestDemo';
import { Settings, Microscope, Wifi, AlertTriangle } from 'lucide-react';

export const ProtocolDetails: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۴-۱-۵
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          جزئیات عملیاتی و محاسباتی
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          ساختار جداول مسیریابی، ریاضیات پشت پرده محاسبه فیدلیتی و تضمین قابلیت اطمینان پیام‌های کلاسیک.
        </p>
      </div>

      {/* 1. Routing Table */}
      <Card title="جدول مسیریابی (Routing Table)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            برای اینکه پروتکل صفحه داده (Data Plane) بتواند تصمیمات مسیریابی را اجرا کند، به یک ساختار داده محلی در هر گره نیاز دارد. برای هر <strong>مدار مجازی (VC)</strong>، یک ورودی (Entry) در جدول مسیریابی گره وجود دارد که شامل فیلدهای زیر است:
          </p>
          
          <RoutingTableVisual />

          <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
             <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
               <Settings size={18} className="text-slate-600"/>
               تفویض اختیار (Delegation)
             </h5>
             <p className="text-sm text-slate-700 leading-7">
               ما انتخاب مقادیر <strong>Min Fidelity</strong> و <strong>LPR</strong> را به پروتکل مسیریابی واگذار می‌کنیم. چرا؟
               <br/>
               (i) چون انتخاب آن‌ها نیازمند دانش کامل از کل مسیر است (مسیر طولانی‌تر نیاز به لینک‌های باکیفیت‌تر دارد).
               <br/>
               (ii) مقدار دقیق آن‌ها به پارامترهای سخت‌افزاری گره‌های مسیر بستگی دارد.
             </p>
             <p className="text-sm text-slate-700 leading-7 mt-2">
               همچنین، لازم نیست این مقادیر برای تمام لینک‌های مسیر یکسان باشند. در شبکه‌های ناهمگن (Heterogeneous)، ممکن است "بودجه‌بندی" فیدلیتی متفاوت باشد (مثلاً لینک‌های کوتاه‌تر کیفیت بالاتر و لینک‌های طولانی‌تر کیفیت پایین‌تری ارائه دهند).
             </p>
          </div>
        </div>
      </Card>

      {/* 2. Fidelity Calculation */}
      <Card title="محاسبه فیدلیتی (Fidelity Calculation)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            وقتی دو لینک درهم‌تنیده با کیفیت‌های <span dir="ltr" className="font-mono font-bold text-sm inline-block mx-1">F<sub>1</sub></span> و <span dir="ltr" className="font-mono font-bold text-sm inline-block mx-1">F<sub>2</sub></span> با هم Swap می‌شوند، کیفیت لینک حاصل (<span dir="ltr" className="font-mono font-bold text-sm inline-block mx-1">F'</span>) چقدر خواهد بود؟
          </p>
          <p className="mb-4">
            با فرض اینکه نویز موجود در سیستم <strong>ایزوتروپیک (Isotropic)</strong> است (که بدترین حالت ممکن یا Worst Case محسوب می‌شود)، جفت‌های درهم‌تنیده را می‌توان به صورت <strong>حالت‌های ورنر (Werner States)</strong> مدل کرد [94]. در این حالت، رابطه ریاضی زیر برقرار است:
          </p>

          <div className="bg-slate-800 text-white p-6 rounded-xl flex items-center justify-center font-mono text-lg dir-ltr my-6 shadow-lg border border-slate-700 overflow-x-auto">
             <div className="flex items-center gap-3" dir="ltr">
                <span>F' = F<sub>1</sub> · F<sub>2</sub> + </span>
                <div className="flex flex-col items-center justify-center">
                   <span className="border-b border-white pb-1 mb-1">(1 - F<sub>1</sub>)(1 - F<sub>2</sub>)</span>
                   <span>3</span>
                </div>
             </div>
          </div>

          <FidelityFormulaDemo />

          <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-sm text-green-800 mt-4">
             <strong>خاصیت انجمنی (Associativity):</strong> این فرمول خاصیت انجمنی دارد. یعنی ترتیب انجام Swapها (اینکه اول کدام لینک‌ها با هم ترکیب شوند) تأثیری در کیفیت نهایی ندارد. این موضوع فرضیه کلیدی ما در بخش‌های قبل (که ترتیب Swap مهم نیست) را از نظر ریاضی تأیید می‌کند.
          </div>
        </div>
      </Card>

      {/* 3. Fidelity Verification */}
      <Card title="روندهای تست فیدلیتی (Fidelity Test Rounds)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            یک مشکل اساسی در مکانیک کوانتوم وجود دارد: <strong>نمی‌توان کیفیت یک جفت را بدون اندازه‌گیری (و در نتیجه نابود کردن) آن فهمید.</strong> پس پروتکل چگونه مطمئن شود که فیدلیتی بالای آستانه است؟
          </p>
          
          <div className="flex items-start gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm mb-6">
             <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
               <Microscope size={24} />
             </div>
             <div>
               <h5 className="font-bold text-slate-900 mb-2">راهکار: قربانی کردن برای آمار</h5>
               <p className="text-sm text-slate-600 leading-7">
                 ما از روشی مشابه [22] استفاده می‌کنیم: تعدادی از جفت‌های تولید شده به عنوان "دورهای تست" (Test Rounds) علامت‌گذاری می‌شوند. این جفت‌ها به جای تحویل به برنامه، بلافاصله توسط پروتکل اندازه‌گیری می‌شوند.
                 از آمار نتایج این اندازه‌گیری‌ها برای تخمین زدن کیفیت جفت‌های باقی‌مانده استفاده می‌شود.
               </p>
             </div>
          </div>

          <FidelityTestDemo />
          
          <p className="mt-4 text-sm text-slate-600 leading-7">
             در این روش، پروتکل به صورت تصادفی برخی از درخواست‌ها را برای تست انتخاب می‌کند. اگر نتایج تست نشان‌دهنده خطای بالا باشند (مثلاً همبستگی مورد انتظار وجود نداشته باشد)، پروتکل نتیجه می‌گیرد که لینک خراب است و جفت‌های آن دسته را دور می‌ریزد.
          </p>
        </div>
      </Card>

      {/* 4. Classical Reliability */}
      <Card title="ارتباطات کلاسیک و قابلیت اطمینان">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            پروتکل ما فرض می‌کند که تمام پیام‌های کنترلی (مثل FORWARD و TRACK) به صورت <strong>منظم (Ordered)</strong> و <strong>قابل اطمینان (Reliable)</strong> تحویل داده می‌شوند.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                 <Wifi size={18} className="text-blue-600" />
                 پروتکل حمل‌ونقل (TCP/QUIC)
               </h5>
               <p className="text-sm text-slate-600 leading-6">
                 ما چرخ را دوباره اختراع نمی‌کنیم! هر مدار مجازی (VC) یک اتصال حمل‌ونقل استاندارد (مثل TCP یا QUIC) بین گره‌های مسیر برقرار می‌کند و وظیفه تضمین تحویل و ترتیب پیام‌ها را به آن می‌سپارد.
               </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                 <AlertTriangle size={18} className="text-orange-600" />
                 بررسی زنده‌بودن (Liveness)
               </h5>
               <p className="text-sm text-slate-600 leading-6">
                 مکانیزم‌های Keep-alive در پروتکل حمل‌ونقل برای پایش وضعیت کانال کلاسیک استفاده می‌شوند. اگر اتصال قطع شود، پروتکل بلافاصله تمام درخواست‌های آن VC را لغو (Abort) کرده و به اپلیکیشن‌ها اطلاع می‌دهد.
               </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/design/example-sequence" 
        nextTitle="۴-۲. نمونه دنباله عملیاتی (Sequence)" 
      />
    </div>
  );
};
