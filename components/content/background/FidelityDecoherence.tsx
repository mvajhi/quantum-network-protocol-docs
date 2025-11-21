
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { FidelityChart } from '../../visuals/FidelityChart';
import { LossFactorsDiagram } from '../../visuals/LossFactorsDiagram';
import { Microscope, Clock, AlertCircle, Layers, HelpCircle } from 'lucide-react';

export const FidelityDecoherence: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۲-۳
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          فیدلیتی و ناهمدوسی (Fidelity & Decoherence)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          معرفی متریک‌های کیفیت در شبکه کوانتومی و بررسی دقیق عواملی که باعث تخریب اطلاعات می‌شوند.
        </p>
      </div>

      {/* Section 1: What is Fidelity? */}
      <Card title="فیدلیتی (Fidelity): معیار کیفیت کوانتومی">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            در شبکه‌های معمولی، ما پارامترهایی مثل <strong>Throughput</strong> (پهنای باند) و <strong>Latency</strong> (تاخیر) را اندازه می‌گیریم. در شبکه کوانتومی، در کنار این‌ها، یک پارامتر کلیدی و حیاتی دیگر وجود دارد به نام <strong>Fidelity</strong> [22].
          </p>
          <div className="bg-purple-50 border-r-4 border-purple-500 p-4 my-4 rounded-l-md">
            <p className="text-sm text-purple-900 leading-7">
              فیدلیتی یک متریک کاملاً کوانتومی است و هیچ معادل کلاسیکی ندارد. مقدار آن عددی بین <strong>۰ و ۱</strong> است و نشان می‌دهد که حالت کوانتومی فعلی چقدر به حالت "مطلوب" (Desired State) نزدیک است.
            </p>
          </div>
          
          <FidelityChart />

          <h4 className="font-bold text-slate-900 mt-6 mb-2 text-lg">تفاوت با شبکه کلاسیک</h4>
          <p className="mb-4">
            در شبکه‌های کلاسیک، داده‌ها باید بدون هیچ خطایی (Error-free) تحویل داده شوند. اما اپلیکیشن‌های کوانتومی می‌توانند با "حالت‌های ناقص" هم کار کنند، به شرط اینکه فیدلیتی بالای یک آستانه خاص باشد.
            <br />
            <span className="text-sm text-slate-500 bg-slate-100 px-2 py-0.5 rounded mt-1 inline-block">
              مثال: برای توزیع کلید کوانتومی ساده (QKD)، فیدلیتی حدود ۰.۸ کافی است.
            </span>
          </p>
        </div>
      </Card>

      {/* Section 2: Decoherence Deep Dive */}
      <Card title="چالش زمان: ناهمدوسی (Decoherence)">
        <div className="flex flex-col md:flex-row gap-6 items-start">
           <div className="flex-1 text-slate-800 leading-9 text-justify">
             <p className="mb-4">
               ناهمدوسی به معنای تخریب تدریجی کیفیت کیوبیت در طول زمان است که باعث کاهش فیدلیتی می‌شود. این پدیده یکی از اصلی‌ترین چالش‌هاست زیرا محدودیت‌های بسیار سخت‌گیرانه‌ای را بر روی <strong>مدت زمان نگهداری کیوبیت در حافظه</strong> اعمال می‌کند.
             </p>
             <ul className="space-y-3 mt-2">
               <li className="flex items-center gap-3 text-sm text-slate-700 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
                 <Clock className="text-red-500" size={20} />
                 <span><strong>در شبکه:</strong> عمر حافظه در حد چند میلی‌ثانیه است [22, 43].</span>
               </li>
               <li className="flex items-center gap-3 text-sm text-slate-700 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
                 <Microscope className="text-blue-500" size={20} />
                 <span><strong>در آزمایشگاه (ایزوله):</strong> عمر حافظه تا حدود یک دقیقه هم دیده شده است [8].</span>
               </li>
             </ul>
             <p className="mt-4 text-sm text-slate-500 leading-6">
               اتصال دستگاه به شبکه، نویز بیشتری ایجاد می‌کند و عمر حافظه را کاهش می‌دهد.
             </p>
           </div>
        </div>
      </Card>

      {/* Section 3: Four Ways Fidelity is Lost (P1-P4) */}
      <Card title="چهار عامل افت کیفیت (P1 - P4)">
        <p className="text-slate-800 mb-6 leading-8 text-justify">
          در یک شبکه کوانتومی واقعی، فیدلیتی به چهار روش مختلف از دست می‌رود. درک این چهار عامل برای طراحی پروتکل حیاتی است:
        </p>
        
        <LossFactorsDiagram />

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-6">
          <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
            <Layers size={18} />
            استراتژی مقابله با این عوامل
          </h4>
          <ul className="space-y-4 text-sm text-slate-700 leading-7">
            <li className="pl-2 border-l-2 border-blue-300">
              <strong className="text-blue-800 block mb-1">عامل P1 (لینک اولیه):</strong>
              <span>این ویژگیِ سخت‌افزار است. برخی پیاده‌سازی‌ها اجازه می‌دهند فیدلیتی را بالا ببریم، اما به قیمت کاهش نرخ تولید (Rate). این یک بده‌بستان (Trade-off) است.</span>
            </li>
            <li className="pl-2 border-l-2 border-red-300">
              <strong className="text-red-800 block mb-1">عامل P2 (سواپینگ):</strong>
              <span>این یک ویژگی بنیادین فیزیکی است. تنها راه برای داشتن خروجی خوب، این است که ورودی‌های بسیار باکیفیتی به عملیات Swap بدهیم.</span>
            </li>
            <li className="pl-2 border-l-2 border-yellow-300">
              <strong className="text-yellow-800 block mb-1">عامل P3 (گیت‌ها):</strong>
              <span>با بهبود سخت‌افزار حل می‌شود که خارج از محدوده طراحی پروتکل شبکه است.</span>
            </li>
            <li className="pl-2 border-l-2 border-orange-300 bg-orange-50/50 rounded-r py-1">
              <strong className="text-orange-800 block mb-1 flex items-center gap-2">
                 عامل P4 (ناهمدوسی): <span className="bg-orange-200 text-orange-900 text-[10px] px-2 py-0.5 rounded-full">تمرکز ما</span>
              </strong>
              <span>این عامل مستقیماً به <strong>پروتکل</strong> مربوط است. پروتکل باید طوری طراحی شود که زمان بیکاری (Idling Time) کیوبیت‌ها در حافظه به حداقل برسد.</span>
            </li>
          </ul>
        </div>
      </Card>

      {/* Section 4: Protocol Design Questions */}
      <Card className="bg-slate-900 border-slate-800 text-white">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-blue-300 mb-2">
            <HelpCircle size={24} />
            <h3 className="text-xl font-bold">سوالات اصلی طراحی</h3>
          </div>
          <p className="text-slate-300 leading-7 text-justify">
            با توجه به موارد بالا، طراحی پروتکل ما روی پاسخ دادن به دو سوال کلیدی متمرکز است:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
              <span className="text-blue-400 font-bold text-lg block mb-2">(i) مدیریت کیفیت</span>
              <p className="text-sm text-slate-400 leading-6">
                پروتکل چگونه بفهمد که چه مقدار فیدلیتی باید از لینک‌های فردی درخواست کند تا مطمئن شود کیفیت نهایی End-to-End پس از همه عملیات‌ها کافی خواهد بود؟
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-orange-500 transition-colors">
              <span className="text-orange-400 font-bold text-lg block mb-2">(ii) مدیریت زمان</span>
              <p className="text-sm text-slate-400 leading-6">
                پروتکل چگونه ناهمدوسی را با کاهش دادنِ زمان انتظار کیوبیت‌ها در حافظه، به حداقل برساند؟
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/background/node-architecture" 
        nextTitle="۲-۴. معماری گره کوانتومی" 
      />

    </div>
  );
};
