
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { EvolutionTimeline } from '../../visuals/EvolutionTimeline';
import { NetworkStack } from '../../visuals/NetworkStack';
import { BookOpen, Zap, ArrowUpCircle } from 'lucide-react';

export const Motivation: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۲-۱
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          انگیزه و ضرورت زمانی (Motivation)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          چرا اکنون زمان مناسبی برای طراحی پروتکل‌های شبکه کوانتومی است؟ گذار از فیزیک محض به مهندسی سیستم.
        </p>
      </div>

      {/* Section 1: The Great Shift */}
      <Card title="گذار از آزمایشگاه به دنیای واقعی">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            تا همین اواخر، تولید درهم‌تنیدگی‌های با طول عمر بالا، صرفاً در انحصار آزمایش‌های فیزیک بسیار پیچیده (Sophisticated physics experiments) بود. این آزمایش‌ها معمولاً روی میزهای اپتیکی در شرایط بسیار کنترل‌شده انجام می‌شدند.
          </p>
          <p className="mb-4">
            اما اکنون شرایط در حال تغییر است. استقرار واقعی (Real deployments) شبکه‌های کوانتومی بسیار نزدیک است. طبق برنامه‌ریزی‌ها، اولین <strong>شبکه کوانتومی بین‌شهری (Inter-city)</strong> قرار است طی چند سال آینده آنلاین شود [4].
          </p>
          
          <EvolutionTimeline />

          <p className="mt-4">
             کارهای بنیادین زیادی برای ساخت سخت‌افزار کوانتومی انجام شده است تا این امر ممکن شود [8, 58, 75, 83, 92]. اکنون ما وارد فاز جدیدی از توسعه شده‌ایم:
          </p>
          <div className="bg-blue-50 border-r-4 border-blue-500 p-4 mt-4 rounded-l-md">
            <p className="font-bold text-blue-900">
              فاز مهندسی سیستم‌ها:
            </p>
            <p className="text-blue-800 text-sm leading-7 mt-1">
              دیگر سوال فقط این نیست که "چگونه یک کیوبیت بسازیم؟"، بلکه سوال اصلی این است که "چگونه سیستم‌های ارتباطی کوانتومی بسازیم که این سخت‌افزارها را مدیریت کنند؟"
            </p>
          </div>
        </div>
      </Card>

      {/* Section 2: Moving Up the Stack */}
      <Card title="صعود در لایه‌های شبکه">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 text-slate-800 leading-9 text-justify">
            <p className="mb-4">
              تحقیقات در زمینه سیستم‌های کوانتومی در سال‌های اخیر به آرامی در حال ظهور بوده است [13, 49, ...]. اخیراً، پیشنهادی برای پشته شبکه کوانتومی (الهام گرفته از TCP/IP) ارائه شده است که لایه‌های مختلف را تعریف می‌کند.
            </p>
            <p className="mb-4">
              همچنین یک <strong>پروتکل لایه لینک (Link Layer Protocol)</strong> طراحی شده است که سرویس تولید درهم‌تنیدگی را بین گره‌هایی که <strong>مستقیماً</strong> به هم متصل هستند، ارائه می‌دهد [22].
            </p>
            
            <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-xl border border-yellow-200 mt-6">
              <ArrowUpCircle className="text-yellow-600 mt-1 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-yellow-900 mb-1">هدف این مقاله: یک پله بالاتر</h4>
                <p className="text-sm text-yellow-800 leading-7">
                  ما در این مقاله، یک پله در پشته شبکه بالا می‌رویم (Go one level up). هدف ما دستیابی به گام بعدی در اتصال‌پذیری کوانتومی است: 
                  <strong> یک پروتکل لایه شبکه (Network Layer) </strong>
                  که قادر باشد درهم‌تنیدگی سراسری (End-to-End) را بین هر جفت گره دلخواه در شبکه فراهم کند.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Context for Stack */}
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            <div className="relative w-full">
              <NetworkStack />
              {/* Overlay Arrow pointing to Network Layer */}
              <div className="absolute top-[90px] -right-2 md:-right-6 flex items-center gap-2 animate-bounce">
                <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                  تمرکز ما اینجاست
                </div>
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-red-600 border-b-[6px] border-b-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 3: Note on Prerequisites */}
      <Card className="bg-slate-800 border-slate-700 text-white">
        <div className="flex items-start gap-4">
          <div className="bg-slate-700 p-3 rounded-lg">
            <BookOpen className="text-slate-300" size={24} />
          </div>
          <div>
             <h4 className="font-bold text-slate-200 mb-2">یادداشت در مورد مفاهیم فیزیک</h4>
             <p className="text-slate-400 text-sm leading-7 text-justify">
               در این مستندات، ما تنها مفاهیم مکانیک کوانتومی را معرفی می‌کنیم که برای درک طراحی پروتکل ضروری هستند. با این حال، شبکه‌های کوانتومی در ادبیات علمی موضوع جدیدی نیستند. برای مطالعه عمیق‌تر فیزیکِ موضوع، مراجع خوبی وجود دارند (مانند [22, 54, 85]).
               تمرکز ما در اینجا بر روی جنبه‌های <strong>نرم‌افزاری و پروتکلی</strong> است.
             </p>
          </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/background/entanglement-swapping" 
        nextTitle="۲-۲. تعویض درهم‌تنیدگی" 
      />

    </div>
  );
};