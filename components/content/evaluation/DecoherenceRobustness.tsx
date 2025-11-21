
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { DecoherenceRobustnessChart } from '../../visuals/DecoherenceRobustnessChart';
import { Clock, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';

export const DecoherenceRobustness: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۵-۲ (ارزیابی اصلی)
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          مقاومت در برابر ناهمدوسی (Decoherence Robustness)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          ارزیابی مکانیزم‌های پروتکل (Cutoff و عملیات غیرمسدودکننده) در مواجهه با عمر کوتاه حافظه و تاخیر شبکه.
        </p>
      </div>

      {/* Intro */}
      <Card title="سناریوی آزمایش">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            در این بخش، ما دو مکانیزم اصلی پروتکل برای مدیریت ناهمدوسی را زیر ذره‌بین می‌بریم:
            <br/> ۱. تایمر قطع (Cutoff Timer)
            <br/> ۲. عدم انتظار برای پیام‌های کنترلی (Non-blocking Operations)
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
             <h5 className="font-bold text-slate-900 mb-2">پیکربندی ترافیک:</h5>
             <ul className="space-y-1 text-slate-700">
               <li>مدار A0-B0 با هدف فیدلیتی <strong>0.9</strong> (High Fidelity).</li>
               <li>مدار A1-B1 با هدف فیدلیتی <strong>0.8</strong> (Low Fidelity).</li>
             </ul>
             <p className="mt-3 text-slate-500 text-xs">
               ما از فیدلیتی‌های متفاوت استفاده می‌کنیم چون درخواست‌های کم‌کیفیت‌تر (0.8) سریع‌تر تولید می‌شوند و کمتر تحت تأثیر ناهمدوسی قرار می‌گیرند (چون زمان انتظارشان کمتر است).
             </p>
          </div>
        </div>
      </Card>

      {/* 1. Cutoff Timer Analysis */}
      <Card title="تحلیل تایمر قطع (Cutoff Timer)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            در نمودار زیر، ما طول عمر حافظه کوانتومی (<span dir="ltr" className="font-mono">T*2</span>) را کاهش می‌دهیم و تاثیر آن را بر پهنای باند می‌بینیم.
            همچنین پروتکل خود را با یک استراتژی ایده‌آل‌گرایانه به نام <strong>Oracle</strong> مقایسه می‌کنیم.
          </p>
          
          <div className="bg-orange-50 p-3 rounded border border-orange-200 text-sm text-orange-900 mb-4 flex items-center gap-2">
            <AlertTriangle size={18} />
            <span><strong>استراتژی Oracle:</strong> فرض می‌کند که می‌توانیم در انتهای مسیر، جفت‌های بی‌کیفیت را شناسایی و حذف کنیم (که در واقعیت غیرممکن است).</span>
          </div>

          <DecoherenceRobustnessChart />

          <div className="mt-6">
             <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
               <ShieldCheck className="text-green-600" />
               نتیجه‌گیری کلیدی:
             </h4>
             <p className="text-sm text-slate-700 leading-7">
               نمودار نشان می‌دهد که استراتژی <strong>Cutoff Timer</strong> (خط آبی) حتی از استراتژی Oracle هم کارآمدتر است. چرا؟ چون Oracle منابع شبکه را برای انتقال جفت‌هایی هدر می‌دهد که در نهایت دور ریخته می‌شوند. اما Cutoff این جفت‌های معیوب را در همان گره‌های میانی حذف می‌کند و منابع را برای تلاش‌های جدید آزاد می‌سازد.
             </p>
          </div>
        </div>
      </Card>

      {/* 2. Message Delays */}
      <Card title="تاثیر تاخیر پیام‌های کلاسیک">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            همانطور که عمر حافظه کوتاه‌تر می‌شود، تاخیر پیام‌های کنترلی اهمیت پیدا می‌کند. اگر پیام کلاسیک دیر برسد، ممکن است کیوبیت در انتظار، خراب شود.
          </p>
          <p className="mb-4">
            پروتکل QNP طوری طراحی شده که عملیات کوانتومی (مثل Swap) هرگز منتظر پیام کلاسیک نمی‌مانند (Non-blocking). برای اثبات کارایی این روش، ما تاخیر مصنوعی به شبکه تزریق کردیم (تب دوم نمودار بالا را ببینید).
          </p>
          
          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-200 mt-4">
             <Zap className="text-blue-600 shrink-0 mt-1" />
             <p className="text-sm text-blue-900 leading-6">
               <strong>مشاهده:</strong> تا زمانی که تاخیر پیام از زمان Cutoff کمتر باشد، هیچ تاثیری بر پهنای باند ندارد. تنها زمانی که تاخیر از این آستانه عبور کند، کارایی سقوط می‌کند. این یعنی QNP در برابر تاخیرهای شبکه کلاسیک تا حد زیادی <strong>مقاوم (Robust)</strong> است.
             </p>
          </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/evaluation/near-future" 
        nextTitle="۵-۴. عملکرد روی سخت‌افزار آینده نزدیک" 
      />
    </div>
  );
};