
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { DataPlaneTasks } from '../../visuals/DataPlaneTasks';
import { Network, ShieldAlert, CheckCircle } from 'lucide-react';

export const QuantumDataPlane: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۳-۴
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          پروتکل صفحه داده کوانتومی
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          قلب تپنده شبکه: مولفه‌ای که مسئول هماهنگی تولید و اتصال لینک‌هاست.
        </p>
      </div>

      {/* Definition and Analogy */}
      <Card title="تعریف پروتکل">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            در شبکه‌های کلاسیک، وقتی تمام تنظیمات اولیه انجام شد، وظیفه انتقال واقعی بسته‌ها بر عهده "Data Plane" است. به طور مشابه، ما <strong>پروتکل صفحه داده کوانتومی</strong> را به عنوان مولفه‌ای تعریف می‌کنیم که مسئولیت‌های زیر را بر عهده دارد:
          </p>
          <div className="bg-indigo-50 border-r-4 border-indigo-500 p-6 rounded-l-lg my-6 shadow-sm">
            <p className="font-bold text-indigo-900 text-lg mb-2">مسئولیت اصلی:</p>
            <p className="text-indigo-800 leading-8">
              هماهنگی تولید درهم‌تنیدگی در سطح لینک و سپس انجام عملیات تعویض درهم‌تنیدگی (Swapping) در طول مسیر بین دو گره دور از هم، به گونه‌ای که اتلاف ناشی از ناهمدوسی به حداقل برسد و در صورت بروز خطا، جبران شود.
            </p>
          </div>
          <p>
            تمرکز کار ما در این مقاله بر روی همین مکانیزم‌هاست: یعنی <strong>عملیات کوانتومی محلی</strong> و <strong>پیام‌رسانی کلاسیک</strong> برای هماهنگ کردن این عملیات.
          </p>
        </div>
      </Card>

      {/* Scope: What is Included vs Excluded */}
      <Card title="مرزهای پروتکل (Scope)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-green-50 p-5 rounded-xl border border-green-200">
            <h5 className="font-bold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle size={20} />
              شامل می‌شود:
            </h5>
            <ul className="text-sm text-green-800 space-y-3 list-disc list-inside leading-6">
              <li>هماهنگی عملیات فیزیکی در گره‌ها.</li>
              <li>تبادل پیام‌های کلاسیک ضروری برای این هماهنگی (مثلاً ارسال نتایج Swap).</li>
              <li>تصمیم‌گیری‌های لحظه‌ای برای مدیریت خطاهای Data Plane.</li>
            </ul>
          </div>

          <div className="bg-red-50 p-5 rounded-xl border border-red-200">
            <h5 className="font-bold text-red-800 mb-3 flex items-center gap-2">
              <ShieldAlert size={20} />
              شامل نمی‌شود:
            </h5>
            <ul className="text-sm text-red-800 space-y-3 list-disc list-inside leading-6">
              <li>مدیریت منابع بلندمدت.</li>
              <li>الگوریتم‌های مسیریابی (Routing).</li>
              <li>مدیریت وضعیت‌های بلندمدت شبکه.</li>
            </ul>
          </div>

        </div>
        <p className="mt-6 text-slate-600 text-sm text-justify leading-7">
          <strong>تفاوت با کارهای قبلی:</strong> بسیاری از تحقیقات موجود در زمینه مسیریابی کوانتومی، روی جنبه‌های Control Plane و الگوریتم‌ها تمرکز دارند و با مدل‌های انتزاعی از Data Plane کار می‌کنند. اما ما در اینجا روی جزئیات اجرایی و عملیاتی Data Plane تمرکز داریم.
        </p>
      </Card>

      {/* The Three Main Tasks */}
      <Card title="سه وظیفه اصلی پروتکل">
        <p className="text-slate-600 mb-4 leading-8 text-justify">
          ما انتظار داریم چنین پروتکلی سه وظیفه کلیدی را انجام دهد تا بتواند نیازمندی‌های موارد استفاده (بخش ۳-۱) را برآورده کند. روی هر وظیفه کلیک کنید تا جزئیات آن را ببینید:
        </p>
        
        <DataPlaneTasks />

        <div className="mt-6 space-y-4 text-slate-800 leading-8 text-justify">
           <h4 className="font-bold text-slate-900 text-lg border-b border-slate-200 pb-2">توضیحات تکمیلی</h4>
           
           <div>
             <h5 className="font-bold text-blue-700">۱. مدیریت تولید لینک (Link-pair generation management)</h5>
             <p className="text-sm text-slate-600">
               برای ایجاد یک جفت در فواصل طولانی، ابتدا باید لینک‌های کوتاه در تمام مسیر تولید شوند. لایه شبکه خودش مستقیماً فرآیند فیزیکی را مدیریت نمی‌کند، بلکه به <strong>پروتکل لایه لینک [22]</strong> تکیه می‌کند (طبق پشته شبکه شکل ۲).
               اما این وظیفه لایه شبکه است که سرویس لایه لینک را در هر گره مدیریت کند تا تعداد کافی جفت با فیدلیتی مناسب تولید شود.
             </p>
           </div>

           <div>
             <h5 className="font-bold text-purple-700">۲. سواپینگ و ردیابی (Entanglement swapping and tracking)</h5>
             <p className="text-sm text-slate-600">
               پس از تولید لینک‌ها، تکرارگرها باید سواپ را انجام دهند. علاوه بر عملیات فیزیکی، پروتکل باید سواپ‌هایی را که در تولید هر جفت End-to-End دخیل بوده‌اند، <strong>ردیابی (Track)</strong> کند.
               این کار به دو دلیل انجام می‌شود (که در بخش ۳-۲ گفتیم):
               <br/> ۱. شناسایی صحیح اینکه کدام کیوبیت‌ها متعلق به یک جفت هستند.
               <br/> ۲. استنتاج حالت بل نهایی (Final Bell State) برای تحویل به گیرنده.
             </p>
           </div>

           <div>
             <h5 className="font-bold text-green-700">۳. مدیریت کیفیت سرویس (Quality of Service)</h5>
             <p className="text-sm text-slate-600">
               اگرچه پروتکل Data Plane به تنهایی نمی‌تواند کیفیت سرویس را "تضمین" کند (چون به منابع فیزیکی وابسته است)، اما باید مکانیسم‌های پایه‌ای را فراهم کند تا پروتکل‌های پشتیبان بتوانند به این هدف برسند.
               این شامل موارد زیر است:
               <br/> (i) اطمینان (Confidence) از اینکه فیدلیتی بالای آستانه است.
               <br/> (ii) اعمال سیاست (Policing) با رد کردن درخواست‌هایی که قابل انجام نیستند.
               <br/> (iii) شکل‌دهی (Shaping) ترافیک با به تاخیر انداختن درخواست‌هایی که می‌توانند بعداً انجام شوند.
             </p>
           </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/protocol/link-layer-service" 
        nextTitle="۳-۵. سرویس لایه لینک" 
      />
    </div>
  );
};