import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { Lock, Unlock, ArrowLeftRight, AlertTriangle } from 'lucide-react';

export const CurrentState: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۱-۲
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          وضعیت فعلی و محدودیت‌ها
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          بررسی پیشرفت‌های حاصل شده در توزیع کلید کوانتومی (QKD) و دلیل ناکافی بودن فناوری‌های فعلی برای یک اینترنت کوانتومی واقعی.
        </p>
      </div>

      {/* QKD Introduction */}
      <Card title="ارتباطات کوانتومی امروز: عصر QKD">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            ارتباطات کوانتومی سال‌هاست که به طور فعال مورد تحقیق و بررسی قرار گرفته است. مشهورترین و شناخته‌شده‌ترین کاربرد آن، <strong>توزیع کلید کوانتومی (Quantum Key Distribution - QKD)</strong> است.
          </p>
          <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg border border-green-100 my-6">
            <Lock className="text-green-600 shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-bold text-green-800 mb-1">QKD چیست؟</h4>
              <p className="text-sm text-green-700 leading-6">
                یک پروتکل برای ارتباطات امن است که به دو طرف اجازه می‌دهد یک کلید رمزنگاری سری مشترک بسازند. امنیت این کلید توسط قوانین مکانیک کوانتوم تضمین می‌شود، به طوری که هرگونه تلاش برای شنود باعث ایجاد خطا در کلید و لو رفتن شنودگر می‌شود.
              </p>
            </div>
          </div>
          <p>
            هم‌اکنون شبکه‌های QKD با برد کوتاه (Short-distance) در محیط‌های شهری (Metropolitan) پیاده‌سازی شده و مورد مطالعه قرار گرفته‌اند. جالب است بدانید که این فناوری حتی به صورت تجاری نیز در دسترس است و شرکت‌هایی وجود دارند که سخت‌افزارهای QKD را می‌فروشند.
          </p>
        </div>
      </Card>

      {/* Trusted Nodes Problem */}
      <Card title="مسئله گره‌های مورد اعتماد (Trusted Nodes)">
        <div className="text-slate-800 leading-9 text-justify mb-6">
          <p className="mb-4">
            آیا می‌توانیم شبکه‌های QKD را به فواصل طولانی گسترش دهیم؟ پاسخ فعلاً "بله" است، اما با یک شرط بزرگ و محدودکننده: <strong>تمام گره‌های میانی باید امن و مورد اعتماد باشند.</strong>
          </p>
          <p className="mb-4">
            در حال حاضر، شبکه‌های طولانی‌مسافت QKD با استفاده از روشی به نام "Trusted Node" کار می‌کنند. در این روش، هر گره میانی پیام را رمزگشایی کرده و دوباره رمزگذاری می‌کند تا به گره بعدی بفرستد.
          </p>
        </div>

        {/* Visual Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Scenario A: Trusted Node */}
          <div className="border border-orange-200 bg-orange-50/50 rounded-xl p-5">
            <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2 text-sm">
              <AlertTriangle size={18} />
              شبکه‌های فعلی (Trusted Nodes)
            </h4>
            <div className="flex justify-between items-center mb-4 relative h-16 px-2">
              <div className="z-10 flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">A</div>
              </div>
              
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-300 -translate-y-1/2"></div>
              
              <div className="z-10 flex flex-col items-center bg-orange-100 p-2 rounded border border-orange-300">
                <Unlock size={16} className="text-orange-600 mb-1" />
                <span className="text-[9px] text-orange-800 font-bold">گره واسط</span>
              </div>

              <div className="z-10 flex flex-col items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">B</div>
              </div>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>گره واسط به اطلاعات دسترسی دارد.</li>
              <li>گره واسط باید از نظر فیزیکی کاملا امن باشد.</li>
              <li>امنیت End-to-End وجود <strong>ندارد</strong>.</li>
            </ul>
          </div>

          {/* Scenario B: Quantum Repeater */}
          <div className="border border-green-200 bg-green-50/50 rounded-xl p-5">
            <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2 text-sm">
              <Lock size={18} />
              هدف: شبکه کوانتومی واقعی
            </h4>
             <div className="flex justify-between items-center mb-4 relative h-16 px-2">
              <div className="z-10 flex flex-col items-center">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">A</div>
              </div>
              
               {/* Connection Line (Entanglement) */}
              <div className="absolute top-1/2 left-0 w-full h-1 border-b-2 border-dashed border-purple-400 -translate-y-1/2"></div>

              <div className="z-10 flex flex-col items-center bg-slate-100 p-2 rounded border border-slate-300">
                <ArrowLeftRight size={16} className="text-slate-500 mb-1" />
                <span className="text-[9px] text-slate-500 font-bold">تکرارگر</span>
              </div>

              <div className="z-10 flex flex-col items-center">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">B</div>
              </div>
            </div>
             <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>گره واسط فقط درهم‌تنیدگی را منتقل می‌کند.</li>
              <li>اطلاعات هرگز در گره واسط آشکار نمی‌شود.</li>
              <li>امنیت End-to-End <strong>تضمین شده</strong> است.</li>
            </ul>
          </div>

        </div>

        <div className="text-slate-800 leading-9 text-justify">
           <p className="mb-4">
             مشکل اصلی گره‌های فعلی (Trusted Nodes) این است که اگرچه می‌توانند با همسایگان خود کیوبیت رد و بدل کنند، اما توانایی <strong>فوروارد کردن (Forwarding)</strong> کیوبیت‌ها را ندارند.
           </p>
           <div className="bg-slate-800 text-slate-200 p-4 rounded-lg text-sm leading-7 border-r-4 border-purple-500">
             <strong>مفهوم کلیدی:</strong> در یک شبکه کوانتومی واقعی، فوروارد کردن به معنای کپی و ارسال نیست (چون کپی غیرممکن است). بلکه باید از روشی به نام <strong>Entanglement Swapping</strong> (تعویض درهم‌تنیدگی) استفاده شود که گره‌های فعلی فاقد آن هستند.
             در نتیجه، شبکه‌های فعلی نمی‌توانند کیوبیت‌ها را به صورت سراسری (End-to-End) منتقل کنند و امنیت سراسری را ارائه نمی‌دهند.
           </div>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/introduction/physical-barriers" 
        nextTitle="۱-۳. موانع بنیادین فیزیکی" 
      />
    </div>
  );
};