
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { EntanglementIdentifier } from '../../visuals/EntanglementIdentifier';
import { ServiceRequestDemo } from '../../visuals/ServiceRequestDemo';
import { Fingerprint, Gauge, Clock, Info } from 'lucide-react';

export const ServiceDelivered: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۳-۲
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          سرویس تحویلی به لایه‌های بالاتر
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          شبکه کوانتومی دقیقاً چه چیزی را و چگونه به برنامه کاربردی تحویل می‌دهد؟
        </p>
      </div>

      {/* 1. Logical Identifier */}
      <Card title="شناسه جفت درهم‌تنیده (Entangled Pair Identifier)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            اینجا جایی است که جادو اتفاق می‌افتد. به لحاظ <strong>منطقی (Logically)</strong>، شبکه به اپلیکیشن‌ها "یک جفت درهم‌تنیده" تحویل می‌دهد.
            اما به لحاظ <strong>فیزیکی (Physically)</strong>، شبکه به هر یک از دو گره انتهایی، "یک کیوبیت" تحویل می‌دهد.
          </p>
          <p className="mb-4">
            برای اینکه اپلیکیشن‌های دو سر خط بفهمند که کیوبیت‌هایشان با هم جفت هستند (متعلق به یک جفت درهم‌تنیده واحد هستند)، شبکه باید تمام عملیات‌های Swap که در طول مسیر انجام شده را ردیابی کند.
            در نهایت، شبکه همراه با کیوبیت، یک <strong>شناسه (Identifier)</strong> یکتا نیز به اپلیکیشن می‌دهد.
          </p>
          
          <EntanglementIdentifier />

          <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm text-slate-600 mt-2">
            <strong className="text-slate-900">نکته:</strong> بدون این شناسه، دریافت‌کننده نمی‌داند کیوبیتی که دریافت کرده با چه کسی در دنیا درهم‌تنیده است!
          </div>
        </div>
      </Card>

      {/* 2. Entangled Pair State */}
      <Card title="وضعیت جفت درهم‌تنیده (State)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            جفت‌های درهم‌تنیده در چهار حالت مختلف وجود دارند که به آن‌ها <strong>حالت‌های بل (Bell States)</strong> می‌گویند.
            همه این چهار حالت به یک اندازه قابل استفاده هستند، اما نکته حیاتی این است که گیرنده باید بداند <strong>کدام یک</strong> از این چهار حالت را دریافت کرده است.
          </p>
          <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-xl border border-purple-100 my-4">
            <Info className="text-purple-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-purple-900 mb-1">تصادفی بودن ذاتی</h4>
              <p className="text-sm text-purple-800 leading-7">
                به دلیل تصادفی بودن ذاتی مکانیک کوانتوم، وقتی گره‌های میانی عملیات Swap را انجام می‌دهند، نتیجه از قبل مشخص نیست. نتیجه Swap به صورت احتمالی یکی از چهار حالت بل خواهد بود.
                شبکه وظیفه دارد این نتایج را جمع‌آوری کند، حالت نهایی End-to-End را محاسبه کند و آن را به اپلیکیشن گزارش دهد.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Class of Service: Fidelity */}
      <Card title="کلاس سرویس: فیدلیتی (Fidelity)">
        <div className="text-slate-800 leading-9 text-justify">
          <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold">
            <Gauge />
            <span>Trade-off: کیفیت در برابر سرعت</span>
          </div>
          <p className="mb-4">
            حالت‌های کوانتومی لازم نیست بی‌نقص باشند تا قابل استفاده باشند. برای تولید حالت‌های با کیفیت‌تر (فیدلیتی بالاتر)، شبکه باید زمان بیشتری صرف کند (مثلاً تلاش‌های ناموفق را دور بریزد یا عملیات خالص‌سازی انجام دهد).
          </p>
          <p className="mb-4">
            بنابراین، اپلیکیشن باید در هر درخواست، حداقل فیدلیتی مورد نیاز خود (<span className="font-mono font-bold text-blue-600">F_min</span>) را مشخص کند. شبکه تلاش می‌کند حالتی با کیفیت بالاتر از این حد تحویل دهد.
          </p>
        </div>
      </Card>

      {/* 4. Class of Service: Time */}
      <Card title="کلاس سرویس: زمان (Time)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-6">
            علاوه بر کیفیت، زمان‌بندی نیز حیاتی است، به خصوص با توجه به دو مورد استفاده‌ای که در بخش قبل بررسی کردیم. اپلیکیشن می‌تواند درخواست خود را به یکی از دو صورت زیر بیان کند:
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
               <h5 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                 <Clock size={18} className="text-blue-500"/>
                 برای Measure Directly
               </h5>
               <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                 <li><strong>گزینه ۱:</strong> تعداد N جفت تا زمان T تحویل بده.</li>
                 <li><strong>گزینه ۲:</strong> با نرخ R جفت بر ثانیه (Rate) تحویل بده.</li>
               </ul>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
               <h5 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                 <Clock size={18} className="text-orange-500"/>
                 برای Create and Keep
               </h5>
               <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                 <li><strong>شرط سخت‌گیرانه:</strong> تعداد N جفت تا زمان T تحویل بده، به شرطی که...</li>
                 <li className="bg-orange-50 p-2 rounded text-orange-900 text-xs">
                   فاصله زمانی بین اولین و آخرین جفت (Δt) بسیار کوتاه باشد (همه با هم زنده باشند).
                 </li>
               </ul>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-4 font-bold text-slate-700">خودتان تجربه کنید:</p>
            <ServiceRequestDemo />
          </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/protocol/network-layer-architecture" 
        nextTitle="۳-۳. معماری لایه شبکه" 
      />
    </div>
  );
};