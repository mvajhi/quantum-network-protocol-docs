
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { PhaseForward, PhaseSwap, PhaseTrack } from '../../visuals/SequencePhases';
import { PlayCircle, CheckSquare, ArrowRight, Flag, Timer, AlertTriangle } from 'lucide-react';

export const ExampleSequence: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۴-۲
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          نمونه دنباله عملیاتی (Sequence Example)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          شبیه‌سازی گام‌به‌گام جریان یک درخواست از لحظه ثبت تا تحویل کیوبیت نهایی.
        </p>
      </div>

      {/* Introduction */}
      <Card title="مرور کلی فرآیند">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            برای درک بهتر عملکرد پروتکل Data Plane، ما فرآیند را به <strong>سه فاز اصلی</strong> تقسیم کرده‌ایم. 
            توجه داشته باشید که در این نمودارها، جهت جریان از <strong>راست به چپ</strong> (مطابق با زبان فارسی) تنظیم شده است.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-600">
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> <strong>سمت راست:</strong> شروع درخواست (آلیس/Head-end)</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-slate-500 rounded-full"></span> <strong>سمت چپ:</strong> مقصد نهایی (باب/Tail-end)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* PHASE 1: FORWARD */}
      <Card title="فاز ۱: انتشار درخواست (Forward Phase)">
        <div className="text-slate-800 leading-9 text-justify mb-4">
          <p>
            همه چیز با درخواست آلیس شروع می‌شود. پیام <span className="font-mono font-bold text-blue-600">FORWARD</span> در طول مدار مجازی (VC) حرکت می‌کند تا همه گره‌ها را بیدار کند.
          </p>
        </div>
        
        <PhaseForward />
        
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4 text-sm text-blue-900 leading-7">
          <strong>نکته مهم:</strong> هر گره به محض دریافت این پیام، بدون معطلی شروع به تولید لینک می‌کند. منتظر گره‌های بعدی نمی‌ماند. این کلید سرعت پروتکل است.
        </div>
      </Card>

      {/* PHASE 2: SWAP */}
      <Card title="فاز ۲: تولید و سواپ (Generation & Swap)">
        <div className="text-slate-800 leading-9 text-justify mb-4">
          <p>
            در این مرحله، لینک‌های فیزیکی (زرد رنگ) تولید می‌شوند. تکرارگرهای میانی به محض اینکه دو بازوی چپ و راستشان آماده شد، عملیات <span className="font-bold text-purple-600">Swap</span> را انجام می‌دهند.
          </p>
        </div>

        <PhaseSwap />

        <div className="bg-slate-800 text-slate-300 p-4 rounded-xl border border-slate-700 mt-4 text-sm leading-7">
          <strong>استقلال تکرارگرها:</strong> در انیمیشن بالا دقت کنید که تکرارگر ۱ و ۲ ممکن است در زمان‌های متفاوتی عملیات را انجام دهند. هیچ هماهنگی مرکزی در این لحظه وجود ندارد. نتیجه هر Swap در حافظه همان تکرارگر ذخیره می‌شود.
        </div>
      </Card>

      {/* PHASE 3: TRACK */}
      <Card title="فاز ۳: جمع‌آوری و تحویل (Tracking & Delivery)">
        <div className="text-slate-800 leading-9 text-justify mb-4">
          <p>
            حالا که Swapها انجام شده، باید نتایج آن‌ها جمع‌آوری شود. پیام‌های <span className="font-mono font-bold text-green-600">TRACK</span> از دو سر خط شروع به حرکت می‌کنند و نتایج را "جارو" می‌کنند.
          </p>
        </div>

        <PhaseTrack />

        <div className="bg-green-50 p-4 rounded-xl border border-green-100 mt-4 text-sm text-green-900 leading-7">
          <strong>نتیجه نهایی:</strong> وقتی پیام TRACK به انتهای دیگر می‌رسد، حاوی مجموع تمام تغییرات (Pauli corrections) است. گره انتهایی این اطلاعات را به همراه کیوبیت به کاربر تحویل می‌دهد.
        </div>
      </Card>

      {/* Conclusion */}
      <Card title="پایان چرخه" className="bg-slate-50 border-slate-200">
        <div className="flex items-start gap-4">
           <div className="bg-white p-3 rounded-full border border-slate-200 shadow-sm shrink-0">
             <Flag size={24} className="text-slate-500" />
           </div>
           <p className="text-slate-600 text-sm leading-7 text-justify">
             پس از تحویل موفقیت‌آمیز، یک پیام <span className="font-mono font-bold">COMPLETE</span> (که در اینجا برای سادگی نمایش داده نشد) ارسال می‌شود تا منابع رزرو شده در لایه لینک آزاد شوند و سیستم برای درخواست بعدی آماده شود.
           </p>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/design/entanglement-distillation" 
        nextTitle="۴-۳. تقطیر درهم‌تنیدگی (Distillation)" 
      />
    </div>
  );
};
