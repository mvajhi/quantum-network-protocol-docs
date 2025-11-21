
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { DistillationProcess } from '../../visuals/DistillationProcess';
import { LayeredDistillation } from '../../visuals/LayeredDistillation';
import { Beaker, AlertTriangle, Layers, HelpCircle, Clock, Zap } from 'lucide-react';

export const EntanglementDistillation: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۴-۳
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          تقطیر درهم‌تنیدگی (Entanglement Distillation)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          چگونه می‌توان کیفیت جفت‌های درهم‌تنیده را افزایش داد و جایگاه این فرآیند در پروتکل ما کجاست؟
        </p>
      </div>

      {/* 1. Definition */}
      <Card title="تقطیر چیست؟ (What is Distillation?)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            <strong>تقطیر درهم‌تنیدگی</strong> فرآیندی است که طی آن دو یا چند جفت درهم‌تنیده با کیفیت پایین (Imperfect Pairs) مصرف می‌شوند تا با یک احتمال مشخص، یک جفت با فیدلیتی بالاتر تولید شود [30, 48].
          </p>
          <p className="mb-4">
            این فرآیند مانند "تصفیه کردن" است. ناخالصی‌ها (نویز) جدا می‌شوند، اما هزینه آن از دست دادن تعدادی از جفت‌های اولیه است.
          </p>
          
          <DistillationProcess />

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4 flex gap-3 items-start">
             <AlertTriangle className="text-orange-500 shrink-0 mt-1" />
             <p className="text-sm text-slate-700 leading-6">
               <strong>ضرورت:</strong> اگرچه سواپینگ (Swapping) طول لینک را افزایش می‌دهد، اما باعث کاهش فیدلیتی می‌شود. برای مسیرهای خیلی طولانی، کیفیت نهایی آنقدر افت می‌کند که غیرقابل استفاده می‌شود. تقطیر تنها راه غلبه بر این "محدودیت فیدلیتی" و دستیابی به فواصل طولانی است.
             </p>
          </div>
        </div>
      </Card>

      {/* 2. Why Not Built-in? */}
      <Card title="چرا در پروتکل اصلی نیست؟">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            ممکن است بپرسید اگر تقطیر تا این حد حیاتی است، چرا ما آن را مستقیماً در "پروتکل صفحه داده" (QNP) ادغام نکرده‌ایم؟ دلایل ما به شرح زیر است:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h5 className="font-bold text-red-800 mb-2 flex items-center gap-2 text-sm">
                  <Zap size={16} />
                  نیاز سخت‌افزاری بالا
                </h5>
                <p className="text-xs text-slate-600 leading-5">
                  تقطیر نیاز به گیت‌های کوانتومی پیچیده‌تر و حافظه بیشتری نسبت به سواپ ساده دارد. بسیاری از سخت‌افزارهای اولیه قادر به انجام آن نیستند.
                </p>
             </div>

             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h5 className="font-bold text-red-800 mb-2 flex items-center gap-2 text-sm">
                  <Clock size={16} />
                  مشکل زمان (Decoherence)
                </h5>
                <p className="text-xs text-slate-600 leading-5">
                  تقطیر زمان‌بر است. برای مقابله با "ناهمدوسی فوق‌سریع" (Fast Decoherence) که چالش اصلی این مقاله است، تقطیر راهکار مناسبی نیست (حتی ممکن است اوضاع را بدتر کند چون جفت‌ها بیشتر در حافظه می‌مانند).
                </p>
             </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-2">
             <h5 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <HelpCircle size={18} />
                سوالات باز پژوهشی
             </h5>
             <p className="text-sm text-blue-800 leading-7 text-justify">
               استراتژی بهینه تقطیر هنوز یک سوال باز است:
               <br/> • آیا باید بلافاصله بعد از تولید لینک انجام شود؟
               <br/> • آیا باید بعد از هر سواپ انجام شود؟ (Swap-then-Distill)
               <br/> • یا فقط در گره‌های انتهایی؟
               <br/>
               چون هنوز توافقی وجود ندارد، بهتر است پروتکل شبکه را به یک روش خاص محدود نکنیم.
             </p>
          </div>
        </div>
      </Card>

      {/* 3. Layered Architecture */}
      <Card title="راهکار پیشنهادی: معماری لایه‌ای">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            پروتکل QNP طوری طراحی شده که یک <strong>بلوک سازنده (Building Block)</strong> برای سرویس‌های پیچیده‌تر باشد. تقطیر یکی از بهترین مثال‌های چنین سرویسی است.
          </p>
          <p className="mb-6">
            پیشنهاد ما این است که تقطیر را به عنوان یک لایه روی پروتکل شبکه پیاده‌سازی کنیم.
            در این مدل، پروتکل شبکه (QNP) وظیفه دارد جفت‌های خام را بین دو گره تحویل دهد. سپس یک ماژول تقطیر این جفت‌ها را مصرف کرده و جفت باکیفیت را به لایه بالاتر (اپلیکیشن یا یک مدار مجازی دیگر) می‌دهد.
          </p>
          
          <LayeredDistillation />

          <p className="mt-4 text-sm bg-slate-100 p-3 rounded text-slate-600 leading-7 text-justify border-r-4 border-slate-400">
            این رویکرد شبیه به پیشنهادات اولیه معماری شبکه کوانتومی است [88]. لایه بالاتر، تمام گره‌های میانی و عملیات پیچیده پایین را به صورت <strong>یک لینک مجازی واحد (Virtual Link)</strong> می‌بیند.
          </p>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/evaluation/setup" 
        nextTitle="۵-۱. پیاده‌سازی و پیکربندی (Setup)" 
      />
    </div>
  );
};
