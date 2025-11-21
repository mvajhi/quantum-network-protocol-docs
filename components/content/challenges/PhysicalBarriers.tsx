
import React from 'react';
import { Card } from '../../ui/Card';
import { NetworkStack } from '../../visuals/NetworkStack';
import { ZapOff, CopyX, Timer, ShieldAlert } from 'lucide-react';
import { PageNavigation } from '../../ui/PageNavigation';

export const PhysicalBarriers: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۱-۳
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          موانع بنیادین فیزیکی
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          چرا ساخت اینترنت کوانتومی سخت است؟ سه چالش اصلی: اتلاف انتقال، ناهمدوسی و قضیه عدم کپی‌برداری.
        </p>
      </div>

      {/* Introduction to the 3 Challenges */}
      <Card title="سه چالش کلیدی">
        <div className="text-slate-800 leading-9 text-justify mb-6">
          <p>
            گام بعدی در تکامل شبکه‌ها، امکان‌پذیر ساختن ارتباطات کوانتومی End-to-End در فواصل طولانی است. برای تحقق این هدف، با سه چالش اساسی روبرو هستیم:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
              <ZapOff size={24} />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">۱. اتلاف انتقال</h4>
            <span className="text-xs text-slate-500 font-mono">Transmission Losses</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-3">
              <Timer size={24} />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">۲. ناهمدوسی</h4>
            <span className="text-xs text-slate-500 font-mono">Decoherence</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-3">
              <CopyX size={24} />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">۳. عدم کپی‌برداری</h4>
            <span className="text-xs text-slate-500 font-mono">No-Cloning Theorem</span>
          </div>
        </div>
      </Card>

      {/* Deep Dive: Decoherence */}
      <Card title="ناهمدوسی: دشمن حافظه کوانتومی">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 text-slate-800 leading-9 text-justify">
            <p className="mb-4">
              <strong>ناهمدوسی (Decoherence)</strong> به از دست رفتن اطلاعات کوانتومی به دلیل برهم‌کنش سیستم با محیط اطراف گفته می‌شود. این پدیده طول عمر حافظه‌های کوانتومی را به شدت محدود می‌کند.
            </p>
            <p className="mb-4">
              زمان‌های معمول ذخیره‌سازی در سخت‌افزارهای شبکه کوانتومی بسیار کوتاه است:
            </p>
            <ul className="list-disc list-inside space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700">
              <li><strong>محدوده معمول:</strong> از چند میکروثانیه تا کمی بیش از یک ثانیه [1].</li>
              <li><strong>رکوردها:</strong> در دستگاه‌های ایزوله (جدا از شبکه) طول عمرهایی تا حدود یک دقیقه نیز مشاهده شده است [8]، اما در محیط شبکه شرایط بسیار سخت‌تر است.</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Deep Dive: No-Cloning */}
      <Card title="قضیه عدم کپی‌برداری (No-Cloning Theorem)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            این قضیه فیزیکی بیان می‌کند که <strong>نمی‌توان از یک داده کوانتومی دلخواه کپی گرفت.</strong>
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <h5 className="font-bold text-red-900 mb-2">چرا این موضوع برای شبکه مهم است؟</h5>
            <p className="text-sm text-red-800 leading-6">
              در شبکه‌های کلاسیک (مثل اینترنت فعلی)، اگر بسته‌ای در مسیر گم شود یا ضعیف شود، ما به سادگی سیگنال را تقویت می‌کنیم (Amplification) یا کپیِ بسته را دوباره می‌فرستیم (Retransmission).
              اما در شبکه کوانتومی، به دلیل قضیه عدم کپی‌برداری، <strong>استفاده از تکنیک‌های استاندارد تقویت یا ارسال مجدد برای جبران اتلاف و ناهمدوسی غیرممکن است.</strong>
            </p>
          </div>
        </div>
      </Card>

      {/* The Solution Stack & Future */}
      <Card title="پشته شبکه کوانتومی و تصحیح خطا">
        <div className="text-slate-800 leading-9 text-justify mb-6">
          <p>
            برای غلبه بر این محدودیت‌ها، ما نیاز به معماری لایه‌بندی شده‌ای داریم که وظایف را تفکیک کند. شکل زیر ساختار پیشنهادی پشته شبکه کوانتومی را نشان می‌دهد که از مدل TCP/IP الهام گرفته شده است.
          </p>
        </div>

        {/* Figure 2 Component */}
        <NetworkStack />

        <div className="mt-8 text-slate-800 leading-9 text-justify">
          <h4 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
             <ShieldAlert className="text-blue-600"/>
             آیا تصحیح خطا (Error Correction) راه‌حل نیست؟
          </h4>
          <p className="mb-4">
            تکنیک‌های تصحیح خطای کوانتومی (Quantum Error Correction) وجود دارند که در نهایت می‌توانند هم اتلاف انتقال و هم ناهمدوسی را جبران کنند.
            اما مشکل اینجاست که این تکنیک‌ها از نظر منابع سخت‌افزاری <strong>بسیار پرهزینه و سنگین</strong> هستند.
          </p>
          <p className="bg-slate-800 text-slate-300 p-4 rounded-lg text-sm">
            طبق پیش‌بینی‌ها، پیاده‌سازی کامل و عملیاتی تصحیح خطا احتمالا تا چند دهه آینده امکان‌پذیر نخواهد بود. بنابراین، ما به پروتکل‌هایی نیاز داریم که بتوانند <strong>همین امروز</strong> با وجود این محدودیت‌ها کار کنند.
          </p>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/introduction/entanglement-solution" 
        nextTitle="۱-۴. راهکار: توزیع درهم‌تنیدگی" 
      />
    </div>
  );
};
