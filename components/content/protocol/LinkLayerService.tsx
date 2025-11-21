
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { LinkGenerationChart } from '../../visuals/LinkGenerationChart';
import { LinkLayerRequirements } from '../../visuals/LinkLayerRequirements';
import { Repeat, Layers, RefreshCw } from 'lucide-react';

export const LinkLayerService: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۳-۵
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          سرویس لایه لینک (The Link Layer Service)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          رابط میان سخت‌افزار فیزیکی و پروتکل شبکه: چگونه عدم قطعیت را مدیریت کنیم؟
        </p>
      </div>

      {/* Intro: What does it do? */}
      <Card title="وظیفه لایه لینک">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            پروتکل لایه لینک مستقیماً با لایه فیزیکی تعامل دارد و یک <strong>سرویس معنادار</strong> تولید درهم‌تنیدگی را به لایه شبکه ارائه می‌دهد.
          </p>
          
          <div className="bg-slate-50 border-l-4 border-blue-500 p-4 my-4">
            <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
               <Layers size={18} className="text-blue-500" />
               منظور از «سرویس معنادار» چیست؟
            </h5>
            <p className="text-sm text-slate-600 leading-7">
              تولید درهم‌تنیدگی فیزیکی بسیار ناپایدار و احتمالی است. لایه لینک مسئولیت کارهای کثیف زیر را بر عهده می‌گیرد تا لایه شبکه راحت باشد:
              <ul className="list-disc list-inside mt-1 pr-2">
                <li>دسته‌بندی (Batching) تلاش‌ها</li>
                <li>تسهیم (Multiplexing) تلاش‌ها روی لینک</li>
                <li>مدیریت تلاش‌های مجدد (Retry Mechanism) برای افزایش قابلیت اطمینان</li>
              </ul>
            </p>
          </div>

          <p className="mb-4">
            در نهایت، لایه لینک یا یک جفت درهم‌تنیده با شناسه‌های مناسب تحویل می‌دهد و یا اعلام شکست می‌کند.
          </p>
        </div>
      </Card>

      {/* Figure 5: Stochastic Nature */}
      <Card title="چالش تصادفی بودن (Stochastic Nature)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-2">
             از آنجا که احتمال موفقیت در هر بار تلاش برای تولید درهم‌تنیدگی معمولاً پایین است، لایه لینک باید چندین بار تلاش کند. این موضوع باعث می‌شود که <strong>زمان تولید</strong> یک جفت ثابت نباشد و از یک توزیع احتمالی پیروی کند.
          </p>
          <div className="flex items-center gap-2 text-sm text-orange-600 font-bold bg-orange-50 w-fit px-3 py-1 rounded-full mb-4">
            <RefreshCw size={16} className="animate-spin-slow" />
            تلاش مجدد = زمان انتظار متغیر
          </div>
          
          <LinkGenerationChart />

          <p className="text-sm text-slate-600 mt-4 leading-7">
             این نمودار (شکل ۵ مقاله) توزیع تجمعی زمان تولید را نشان می‌دهد. همانطور که می‌بینید، اگرچه میانگین زمان ۱۰ میلی‌ثانیه است، اما برای اطمینان ۹۵ درصدی از تولید لینک، باید تا ۳۰ میلی‌ثانیه صبر کرد. این عدم قطعیت، طراحی پروتکل شبکه را دشوار می‌کند.
          </p>
        </div>
      </Card>

      {/* The 4 Requirements */}
      <Card title="نیازمندی‌های چهارگانه از لایه لینک">
        <div className="text-slate-800 leading-9 text-justify">
          <p>
            یک درخواست ساده لایه لینک، یک درخواست ناهمگام (Asynchronous) است که در یک طرف لینک ایجاد می‌شود و منجر به تحویل کیوبیت در هر دو طرف می‌شود. پروتکل شبکه ما برای کارکرد صحیح، <strong>چهار ویژگی</strong> را از سرویس لایه لینک طلب می‌کند:
          </p>
        </div>
        
        <LinkLayerRequirements />

        <div className="bg-blue-50 text-blue-900 text-sm p-4 rounded-lg border border-blue-200 flex items-start gap-3 mt-4">
           <Repeat size={20} className="shrink-0 mt-1" />
           <p className="leading-6">
             <strong>چرا این شناسه‌ها مهم هستند؟</strong> در شبکه کلاسیک، بسته‌ها خودشان هدر (Header) دارند که آدرس و اطلاعات را حمل می‌کند. در شبکه کوانتومی، کیوبیت‌ها نمی‌توانند هیچ اطلاعات اضافی ("Metadata") را با خود حمل کنند (چون دستکاری آن‌ها باعث خرابی می‌شود). بنابراین، ما به یک سیستم شناسه‌گذاری قوی در سطح نرم‌افزار نیاز داریم که با کیوبیت‌ها "همراه" شود.
           </p>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/design/protocol-design" 
        nextTitle="۴-۱. طراحی پروتکل (Protocol Design)" 
      />
    </div>
  );
};