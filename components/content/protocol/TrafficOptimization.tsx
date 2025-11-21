
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { EarlyDeliveryDiagram } from '../../visuals/EarlyDeliveryDiagram';
import { AggregationDiagram } from '../../visuals/AggregationDiagram';
import { ShieldCheck, Filter, Gauge, Zap, AlertOctagon, Layers, GitMerge, User, Key, History } from 'lucide-react';

export const TrafficOptimization: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۴-۱-۴
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          مدیریت ترافیک و بهینه‌سازی (Traffic & Optimization)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          چگونه شبکه از اشباع شدن منابع جلوگیری می‌کند، مقیاس‌پذیر می‌شود و تاخیر را برای اپلیکیشن‌های حساس کاهش می‌دهد.
        </p>
      </div>

      {/* 1. Policing and Shaping */}
      <Card title="۱. اعمال سیاست و شکل‌دهی (Policing & Shaping)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            منابع شبکه (مانند حافظه و لینک‌های فیزیکی) محدود هستند. اگر اپلیکیشن‌ها بیش از حد درخواست بفرستند، شبکه اشباع شده و کارایی برای همه پایین می‌آید. برای جلوگیری از این مشکل، از مکانیزم‌های <strong>End-to-End Rate (EER)</strong> استفاده می‌شود.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
             <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                <h5 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                  <ShieldCheck size={20} />
                  Policing (پلیس ترافیک)
                </h5>
                <p className="text-sm text-red-800 leading-7">
                  گره Head-end درخواست‌های ورودی را بررسی می‌کند. اگر نرخ درخواست شده توسط اپلیکیشن بیشتر از پهنای باند رزرو شده (EER) باشد، درخواست <strong>رد (Reject)</strong> می‌شود.
                </p>
             </div>

             <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                <h5 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                  <Filter size={20} />
                  Shaping (شکل‌دهی)
                </h5>
                <p className="text-sm text-yellow-800 leading-7">
                  اگر ترافیک به صورت لحظه‌ای زیاد شود اما در درازمدت مجاز باشد، Head-end درخواست‌ها را <strong>به تاخیر می‌اندازد (Delay)</strong> تا جریان ترافیک هموار شود.
                </p>
             </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700">
            <strong>نکته طراحی:</strong> این بررسی‌ها فقط در گره‌های انتهایی (End-nodes) انجام می‌شود. شبکه داخلی (Core) فرض می‌کند که ترافیک ورودی قبلاً چک شده و مجاز است. این کار پیچیدگی روترهای داخلی را کاهش می‌دهد.
          </div>
        </div>
      </Card>

      {/* 2. Aggregation */}
      <Card title="۲. تجمیع (Aggregation) و مقیاس‌پذیری">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            جفت‌های درهم‌تنیده‌ای که بین دو گره یکسان و با آستانه فیدلیتی یکسان تولید می‌شوند، از نظر شبکه <strong>غیرقابل تشخیص</strong> هستند. بنابراین، پروتکل QNP می‌تواند چندین درخواست مختلف را روی یک مدار مجازی (VC) واحد تجمیع کند.
          </p>
          
          <div className="bg-green-50 p-4 rounded-xl border border-green-100 my-4">
            <h5 className="font-bold text-green-900 mb-2 flex items-center gap-2">
              <Layers size={18} />
              چرا Aggregation مهم است؟
            </h5>
            <ul className="space-y-2 text-sm text-green-800 list-disc list-inside">
               <li>
                 <strong>کاهش وضعیت (State Reduction):</strong> تعداد کل مدارهایی که شبکه باید مدیریت کند کاهش می‌یابد.
               </li>
               <li>
                 <strong>اشتراک منابع (Resource Sharing):</strong> مهمترین مزیت این است که گره‌های میانی (Repeater) دیگر نیازی به تشخیص اینکه یک لینک متعلق به کدام درخواست است ندارند.
               </li>
            </ul>
          </div>

          <p className="mb-4">
            تصور کنید در یک تکرارگر، لینک سمت چپ مربوط به درخواست A رسیده و لینک سمت راست مربوط به درخواست B. اگر Aggregation نداشته باشیم، تکرارگر نمی‌تواند این دو را با هم Swap کند و باید منتظر بماند (که خطر Cutoff را بالا می‌برد). اما با Aggregation، تکرارگر هر دو لینکی که متعلق به "VC مشترک" باشند را Swap می‌کند.
          </p>

          <AggregationDiagram />

          <h4 className="font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
             <User size={20} className="text-blue-500"/>
             چالش Demultiplexing (تفکیک مجدد)
          </h4>
          <p className="mb-4">
            وقتی درخواست‌ها تجمیع می‌شوند، مدار مجازی (VC) دیگر اطلاعات درخواست‌های فردی را ردیابی نمی‌کند. بنابراین، وظیفه <strong>گره‌های انتهایی</strong> است که تشخیص دهند کدام جفت تحویل داده شده متعلق به کدام درخواست است.
            <br/>
            پروتکل QNP استراتژی خاصی را تحمیل نمی‌کند، اما دو ابزار کمکی ارائه می‌دهد:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
             <div className="border border-slate-200 p-4 rounded-xl">
                <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-sm">
                  <History size={18} className="text-purple-500"/>
                  مفهوم Epochs
                </h5>
                <p className="text-xs text-slate-600 leading-6 text-justify">
                  یک "ایپاک" مجموعه‌ای از درخواست‌های فعال فعلی است. هر بار که درخواستی اضافه یا حذف می‌شود، یک ایپاک جدید ایجاد می‌شود. پیام‌های TRACK شماره ایپاک را حمل می‌کنند تا گیرنده بداند جفت مربوطه در چه بازه زمانی و برای چه مجموعه درخواست‌هایی تولید شده است.
                </p>
             </div>

             <div className="border border-slate-200 p-4 rounded-xl">
                <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-sm">
                  <Key size={18} className="text-orange-500"/>
                  تطبیق با TRACK
                </h5>
                <p className="text-xs text-slate-600 leading-6 text-justify">
                  به دلیل مکانیزم Cutoff، ممکن است کیوبیت‌ها در میانه راه دور ریخته شوند که باعث ایجاد ناهماهنگی (Window Condition) می‌شود. اطلاعات موجود در پیام TRACK به گره‌های انتهایی اجازه می‌دهد چک کنند که آیا هر دو طرف توافق دارند که این جفت متعلق به درخواست X است یا خیر.
                </p>
             </div>
          </div>

        </div>
      </Card>

      {/* 3. Early Delivery */}
      <Card title="۳. تحویل زودهنگام (Early Delivery)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            برای کاربرد "Measure Directly" (مثل QKD)، اپلیکیشن می‌خواهد هرچه سریع‌تر کیوبیت را اندازه بگیرد تا از شر ناهمدوسی خلاص شود.
            <br/>
            در حالت عادی، گره منتظر می‌ماند تا پیام TRACK برسد و مطمئن شود که جفت سالم است، سپس کیوبیت را تحویل می‌دهد. اما این انتظار یعنی مرگ کیوبیت!
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <h5 className="font-bold text-blue-900 mb-1 flex items-center gap-2">
               <Zap size={18} />
               بهینه‌سازی:
            </h5>
            <p className="text-sm text-blue-800 leading-7">
              برخی اپلیکیشن‌ها می‌توانند کیوبیت را <strong>قبل از تکمیل تمام Swapها</strong> تحویل بگیرند و اندازه بگیرند. نتیجه اندازه‌گیری نگه داشته می‌شود تا زمانی که پیام TRACK برسد و اطلاعات لازم برای تفسیر نتیجه را بیاورد.
            </p>
          </div>
          
          <EarlyDeliveryDiagram />

          <div className="mt-4 flex gap-3 items-start text-slate-600 text-sm bg-slate-100 p-3 rounded border border-slate-200">
             <AlertOctagon size={20} className="shrink-0 text-orange-500 mt-1" />
             <p>
               در این حالت، اگر زنجیره Swap در میانه راه پاره شود (مثلاً به دلیل Cutoff)، اپلیکیشن پیامی مبنی بر "Discard" دریافت می‌کند و باید خودش نتیجه اندازه‌گیری را دور بریزد. مسئولیت مدیریت خطا در این روش به دوش اپلیکیشن می‌افتد.
             </p>
          </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/design/protocol-details" 
        nextTitle="۴-۱-۵. جزئیات عملیاتی و محاسباتی" 
      />
    </div>
  );
};
