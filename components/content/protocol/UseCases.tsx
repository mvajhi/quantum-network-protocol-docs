
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { UseCaseComparison } from '../../visuals/UseCaseComparison';
import { Target, Archive, Zap } from 'lucide-react';

export const UseCases: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header Section */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۳-۱
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          موارد استفاده (Use Cases)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          شناسایی نیازهای اپلیکیشن‌های کوانتومی برای طراحی پروتکل مناسب.
        </p>
      </div>

      {/* Intro */}
      <Card title="طراحی بر اساس نیاز">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            در حال حاضر، هیچ شبکه کوانتومی عمومی وجود ندارد، بنابراین آمار واقعی از الگوهای ترافیک در دسترس نیست. با این حال، با بررسی پروتکل‌های کاربردی شناخته‌شده (Application Protocols)، می‌توانیم نیازهای آن‌ها را دسته‌بندی کنیم.
          </p>
          <p>
            مرجع [22] دو دسته کلی از موارد استفاده را شناسایی می‌کند که نماینده تقاضاهای اپلیکیشن‌های کوانتومی هستند:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 border-blue-200 border p-4 rounded-lg flex items-center gap-3">
              <Zap className="text-blue-600" />
              <span className="font-bold text-blue-900">۱. اندازه‌گیری مستقیم (Measure Directly)</span>
            </div>
            <div className="bg-orange-50 border-orange-200 border p-4 rounded-lg flex items-center gap-3">
              <Archive className="text-orange-600" />
              <span className="font-bold text-orange-900">۲. ایجاد و نگهداری (Create and Keep)</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Visualization */}
      <UseCaseComparison />

      {/* Detailed Breakdown: Measure Directly */}
      <Card title="۱. اندازه‌گیری مستقیم (Measure Directly)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            اپلیکیشن‌های این دسته، جفت‌های درهم‌تنیده را <strong>به محض دریافت مصرف می‌کنند</strong> (با اندازه‌گیری آن‌ها). 
            ویژگی اصلی این دسته این است که کیوبیت‌ها هرگز در حافظه "بیکار" نمی‌مانند و بلافاصله استفاده می‌شوند.
          </p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
            <h5 className="font-bold text-slate-800 mb-2 text-sm flex items-center gap-2">
               <Target size={16} className="text-green-600"/>
               ویژگی‌های شبکه:
            </h5>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
              <li>می‌توانند نوسانات در نرخ تحویل (Rate Fluctuations) را تحمل کنند.</li>
              <li>کمترین تاثیر را از ناهمدوسیِ حافظه می‌پذیرند (چون ذخیره نمی‌کنند).</li>
            </ul>
          </div>

          <p className="text-sm text-slate-600 font-bold mb-2">کاربردها:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <li className="bg-white border border-slate-200 p-2 rounded shadow-sm">توزیع کلید کوانتومی (QKD) [32]</li>
            <li className="bg-white border border-slate-200 p-2 rounded shadow-sm">احراز هویت امن (Secure Identification) [23]</li>
            <li className="bg-white border border-slate-200 p-2 rounded shadow-sm">پروتکل‌های رمزنگاری دو طرفه [3, 14, 24]</li>
          </ul>
        </div>
      </Card>

      {/* Detailed Breakdown: Create and Keep */}
      <Card title="۲. ایجاد و نگهداری (Create and Keep)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            اپلیکیشن‌های این دسته نیاز به <strong>ذخیره‌سازی</strong> دارند. ممکن است نیاز باشد چندین جفت درهم‌تنیده به طور همزمان در حافظه وجود داشته باشند تا یک عملیات خاص انجام شود.
          </p>
          
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
             <p className="text-red-900 font-bold text-sm mb-2">چالش اصلی:</p>
             <p className="text-red-800 text-sm leading-6">
               به دلیل پدیده ناهمدوسی، این اپلیکیشن‌ها نمی‌توانند تاخیرهای زیاد بین رسیدن جفت‌های متوالی را تحمل کنند. اگر جفت اول برسد و برای رسیدن جفت دوم خیلی منتظر بمانیم، جفت اول در حافظه خراب می‌شود.
             </p>
          </div>

          <p className="text-sm text-slate-600 font-bold mb-2">کاربردها:</p>
          <ul className="space-y-2 text-sm text-slate-700">
             <li className="flex items-start gap-2">
               <span className="text-blue-500">•</span>
               ارسال قطعی کیوبیت (Deterministic Teleportation)
             </li>
             <li className="flex items-start gap-2">
               <span className="text-blue-500">•</span>
               انجام عملیات مشترک روی چندین کیوبیت (Sensing [38], Metrology [50])
             </li>
             <li className="flex items-start gap-2">
               <span className="text-blue-500">•</span>
               سیستم‌های توزیع‌شده کوانتومی (Quantum Distributed Systems) [6, 25]
             </li>
          </ul>
        </div>
      </Card>
      
      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/protocol/service-delivered" 
        nextTitle="۳-۲. سرویس تحویلی به لایه بالا" 
      />
    </div>
  );
};