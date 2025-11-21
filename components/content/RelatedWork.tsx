
import React from 'react';
import { Card } from '../ui/Card';
import { PageNavigation } from '../ui/PageNavigation';
import { RelatedWorkLandscape } from '../visuals/RelatedWorkLandscape';
import { BookOpen, GitCommit, Link, Layers } from 'lucide-react';

export const RelatedWork: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۷
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          کارهای مرتبط (Related Work)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          جایگاه این پژوهش در میان سایر تحقیقات و پروتکل‌های پیشنهادی.
        </p>
      </div>

      {/* Visual Landscape */}
      <Card title="نقشه مقایسه‌ای">
        <div className="text-slate-800 leading-9 text-justify mb-6">
          <p>
            برای درک بهتر نوآوری این مقاله، باید آن را با سه دسته دیگر از تحقیقات مقایسه کنیم:
            <br/> ۱. پروتکل‌های دیگر Data Plane
            <br/> ۲. پروتکل‌های زنجیره تکرارگر (Repeater Chain)
            <br/> ۳. معماری‌های پشته شبکه
          </p>
        </div>
        
        <RelatedWorkLandscape />
      </Card>

      {/* 1. Other Data Plane Protocols */}
      <Card title="۱. سایر پروتکل‌های Data Plane">
        <div className="space-y-6">
           <div className="flex gap-4 items-start">
              <div className="bg-slate-100 p-2 rounded text-slate-500 font-bold text-xs w-20 text-center mt-1">Ref [95]</div>
              <p className="text-sm text-slate-700 leading-7 flex-1 text-justify">
                 طرحی الهام گرفته از UDP/TCP ارائه می‌دهد که بر پایه <strong>تصحیح خطای کوانتومی</strong> استوار است. این روش از نظر کیفیت و تعداد کیوبیت مورد نیاز، بسیار فراتر از توانایی‌های سخت‌افزاری فعلی است.
              </p>
           </div>
           <div className="flex gap-4 items-start">
              <div className="bg-slate-100 p-2 rounded text-slate-500 font-bold text-xs w-20 text-center mt-1">Ref [42]</div>
              <p className="text-sm text-slate-700 leading-7 flex-1 text-justify">
                 پروتکلی پیشنهاد می‌دهد اما مسئله حیاتی <strong>ناهمدوسی (Decoherence)</strong> را در نظر نمی‌گیرد.
              </p>
           </div>
           <div className="flex gap-4 items-start">
              <div className="bg-slate-100 p-2 rounded text-slate-500 font-bold text-xs w-20 text-center mt-1">Ref [57]</div>
              <p className="text-sm text-slate-700 leading-7 flex-1 text-justify">
                 پروتکل Data Plane و سیگنالینگ را در یک پروتکل واحد مبتنی بر "RuleSet" ترکیب می‌کند. اما نویسندگان آن را فقط برای شبکه دو-گره‌ای با یک لینک بررسی کرده‌اند.
              </p>
           </div>
        </div>
      </Card>

      {/* 2. Repeater Chain Protocols */}
      <Card title="۲. پروتکل‌های زنجیره تکرارگر (Repeater Chain)">
        <div className="flex items-start gap-4 mb-4">
           <div className="bg-yellow-100 p-3 rounded-full text-yellow-600 shrink-0">
             <Link size={24} />
           </div>
           <div className="text-slate-800 leading-8 text-justify text-sm">
             <p className="mb-2">
               از آنجا که لینک‌های طولانی در اینترنت کوانتومی از زنجیره‌ای از تکرارگرها ساخته می‌شوند، تحقیقات زیادی روی پروتکل‌های مدیریت این زنجیره‌ها انجام شده است [9, 10, 29, 31, ...].
             </p>
             <p className="bg-yellow-50 p-3 rounded border border-yellow-200 text-yellow-900">
               <strong>محدودیت:</strong> این پروتکل‌ها فقط روی زنجیره‌های خطی کار می‌کنند. آن‌ها نمی‌توانند توپولوژی‌های غیرخطی را مدیریت کنند و مکانیزمی برای ادغام (Merge) یا تفکیک (Split) جریان‌ها ندارند.
             </p>
             <p className="mt-2">
               با این حال، ما در طراحی QNP از ایده‌های خوب این تحقیقات (مانند زمان Cutoff) بهره برده‌ایم.
             </p>
           </div>
        </div>
      </Card>

      {/* 3. Network Stacks */}
      <Card title="۳. پشته‌های شبکه (Network Stacks)">
        <div className="flex items-start gap-4">
           <div className="bg-purple-100 p-3 rounded-full text-purple-600 shrink-0">
             <Layers size={24} />
           </div>
           <div className="text-slate-800 leading-8 text-justify text-sm">
             <p className="mb-2">
               مقاله ما در معماری پشته شبکه پیشنهاد شده در مرجع [22] قرار می‌گیرد. نویسندگان آن مرجع، پروتکل لایه لینک را طراحی کردند، اما پروتکل لایه شبکه را توسعه ندادند. کار ما تکمیل‌کننده آن است.
             </p>
             <p>
               همچنین طرح‌های دیگری برای پشته شبکه وجود دارد [65]، اما آن‌ها بسیاری از جزئیات حیاتی سطح پایین (مانند نقص‌های سخت‌افزاری یا کنترل کلاسیک) را در نظر نگرفته‌اند.
             </p>
           </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/conclusions" 
        nextTitle="۸. نتیجه‌گیری" 
      />
    </div>
  );
};