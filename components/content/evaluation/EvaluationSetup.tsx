
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { NetSquidArchitecture } from '../../visuals/NetSquidArchitecture';
import { DumbbellTopology } from '../../visuals/DumbbellTopology';
import { SchedulingLogic } from '../../visuals/SchedulingLogic';
import { Terminal, GitBranch, Settings, Clock, Database } from 'lucide-react';

export const EvaluationSetup: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۵
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          ارزیابی عملکرد: پیاده‌سازی و پیکربندی
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          جزئیات شبیه‌ساز NetSquid، توپولوژی شبکه و الگوریتم‌های مدیریت منابع برای تست پروتکل.
        </p>
      </div>

      {/* 5.1 Simulator Setup */}
      <Card title="۵-۱. پلتفرم شبیه‌سازی (NetSquid)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            برای ارزیابی عملکرد پروتکل QNP، ما آن را بر روی یک شبیه‌ساز تخصصی شبکه کوانتومی به نام <strong>NetSquid</strong> (نوشته شده با Python و C++) پیاده‌سازی کرده‌ایم [66].
          </p>
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6 flex gap-3 items-start">
            <Terminal className="text-indigo-600 shrink-0 mt-1" />
            <p className="text-sm text-indigo-900 leading-6">
              <strong>چرا NetSquid؟</strong> این شبیه‌ساز به طور دقیق سخت‌افزار فیزیکی را مدل‌سازی می‌کند، از جمله ناهمدوسی (Decoherence)، تاخیر انتشار، اتلاف فیبر نوری، عملیات گیت‌های کوانتومی و وابستگی زمانی آن‌ها.
            </p>
          </div>
          
          <NetSquidArchitecture />

          <p className="mt-4 text-sm text-slate-600 leading-7">
            خود پروتکل QNP با زبان پایتون نوشته شده و روی پیاده‌سازی لایه لینک (که در مرجع [22] ارائه شده) اجرا می‌شود. از آنجا که تمرکز ما بر فرآیندهای Data Plane است، بخش Control Plane را تا حد امکان ساده نگه داشته‌ایم.
          </p>
        </div>
      </Card>

      {/* 5.2 Algorithms */}
      <Card title="۵-۲. الگوریتم‌های مدیریت منابع">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            پروتکل ما نیاز به تصمیم‌گیری در مورد زمان‌بندی تولید لینک‌ها و مدیریت حافظه دارد. ما الگوریتم‌های ساده اما کارآمدی را برای این منظور پیاده‌سازی کرده‌ایم:
          </p>
          
          <h4 className="font-bold text-slate-900 mt-6 mb-2 flex items-center gap-2">
            <Clock size={20} className="text-orange-500"/>
            زمان‌بندی لینک (Scheduling)
          </h4>
          <p className="mb-4 text-sm">
            لینک‌ها مستقل از هم عمل می‌کنند و از روش <strong>نوبت‌دهی وزن‌دار (Weighted Round-Robin)</strong> استفاده می‌کنند. تعداد جفت‌های تولید شده برای هر مدار مجازی (VC)، متناسب با نرخ درخواستی (LPR) و معکوس زمان تولید آن است.
          </p>
          <ul className="list-disc list-inside bg-orange-50 p-4 rounded-lg border border-orange-100 text-sm text-orange-900 space-y-2 mb-6">
            <li>مدارهای با فیدلیتی بالاتر (که تولیدشان زمان‌برتر است) سهم زمانی بیشتری می‌گیرند تا نرخ برابر داشته باشند.</li>
            <li>در حالت شلوغی (Over-subscribed)، ظرفیت موجود متناسب با تقاضا توزیع می‌شود.</li>
          </ul>

          <SchedulingLogic />

          <h4 className="font-bold text-slate-900 mt-8 mb-2 flex items-center gap-2">
            <Database size={20} className="text-purple-500"/>
            مدیریت صف (Queuing Strategy)
          </h4>
          <p className="text-sm text-slate-600 leading-7 mb-4">
            در هر گره، برای هر VC دو <strong>صف منطقی</strong> (بالادست و پایین‌دست) نگهداری می‌شود. نکته بسیار مهم این است که این صف‌ها فقط "منطقی" هستند و همه آن‌ها باید تعداد محدودی کیوبیت فیزیکی را در حافظه به اشتراک بگذارند. ما کیوبیت‌ها را از قبل به VC خاصی اختصاص نمی‌دهیم (No Pre-allocation).
          </p>
          <div className="bg-slate-100 p-3 rounded border border-slate-200 text-xs text-slate-700 font-mono">
            Strategy: First-In, First-Out (FIFO) preferring oldest unexpired pairs.
          </div>
        </div>
      </Card>

      {/* 5.3 Topology & Hardware */}
      <Card title="۵-۳. پیکربندی آزمایش (Topology & Hardware)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            برای ارزیابی، ما از توپولوژی نشان داده شده در شکل ۷ استفاده می‌کنیم که شامل ۶ گره است.
          </p>
          
          <DumbbellTopology />

          <h4 className="font-bold text-slate-900 mt-6 mb-2 text-lg flex items-center gap-2">
            <Settings size={20} className="text-blue-600"/>
            پارامترهای سخت‌افزاری
          </h4>
          <p className="mb-4 text-sm text-slate-700 leading-7">
            شبیه‌سازی ما بر اساس مدل ساده‌سازی شده پلتفرم <strong>Nitrogen Vacancy (NV) Center</strong> است [1, 8, 20]. پارامترهای استفاده شده (لیست شده در ضمیمه B مقاله) کمی خوش‌بینانه‌تر از وضعیت فعلی تکنولوژی انتخاب شده‌اند تا پتانسیل پروتکل را نشان دهند.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-center">
             <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
               <span className="block text-xs text-slate-400 font-bold uppercase mb-1">طول لینک‌ها</span>
               <span className="text-lg font-bold text-slate-800">2 متر</span>
               <span className="text-[10px] text-slate-500 block">(Lab Scale)</span>
             </div>
             <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
               <span className="block text-xs text-slate-400 font-bold uppercase mb-1">تعداد اجرا</span>
               <span className="text-lg font-bold text-slate-800">100</span>
               <span className="text-[10px] text-slate-500 block">Simulation Runs</span>
             </div>
             <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
               <span className="block text-xs text-slate-400 font-bold uppercase mb-1">زمان قطع (Cutoff)</span>
               <span className="text-lg font-bold text-slate-800">~1.5% Loss</span>
               <span className="text-[10px] text-slate-500 block">of Fidelity</span>
             </div>
          </div>

        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/evaluation/throughput-latency" 
        nextTitle="۵-۲. پهنای باند و تاخیر" 
      />
    </div>
  );
};
