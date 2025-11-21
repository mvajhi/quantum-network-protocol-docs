
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { SwappingDemo } from '../../visuals/SwappingDemo';
import { ClassicalDependency } from '../../visuals/ClassicalDependency';
import { BellStateMeasurementVisual } from '../../visuals/BellStateMeasurementVisual';
import { Network, Settings, AlertTriangle, GitMerge, MessageSquare, Microscope } from 'lucide-react';
import { Latex } from '../../ui/Latex';

export const EntanglementSwapping: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۲-۲
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          تعویض درهم‌تنیدگی (Entanglement Swapping)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          مکانیسم اصلی تکرارگرهای کوانتومی برای غلبه بر اتلاف و ایجاد ارتباطات دوربرد.
        </p>
      </div>

      {/* Section 1: The Problem & The Proposal */}
      <Card title="چالش توزیع و راهکار بریگل (۱۹۹۸)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            با توجه به قضیه عدم کپی‌برداری (No-Cloning)، ناهمدوسی و اتلاف انتقال، چگونه می‌توان کیوبیت‌های درهم‌تنیده را به صورت عملی توزیع کرد وقتی که نمی‌توانیم از تقویت‌کننده‌ها (Amplifiers) یا ارسال مجدد (Retransmissions) استفاده کنیم؟
          </p>
          <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 my-4">
             <div className="flex items-center gap-3 mb-2">
                <GitMerge className="text-indigo-600" />
                <h4 className="font-bold text-indigo-900">پیشنهاد تکرارگر کوانتومی</h4>
             </div>
             <p className="text-sm text-indigo-800 leading-7">
               در سال ۱۹۹۸، بریگل و همکارانش [10] راهکاری را پیشنهاد دادند که در آن <strong>تکرارگرهای کوانتومی (Quantum Repeaters)</strong> با اتصال زنجیره‌ای از جفت‌های درهم‌تنیدهِ کوتاه‌برد، درهم‌تنیدگیِ دوربرد ایجاد می‌کنند.
               این فرآیند <strong>Entanglement Swapping</strong> نام دارد.
             </p>
          </div>
          <p>
            بنابراین، یک طرح عملی برای توزیع درهم‌تنیدگی می‌تواند ترکیبی از دو جزء باشد:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-slate-700 text-sm pr-4">
            <li><strong>لایه پایین:</strong> پروتکلی برای تولید جفت‌های درهم‌تنیده در فواصل کوتاه (لایه لینک فیزیکی).</li>
            <li><strong>لایه بالا:</strong> عملیات تعویض درهم‌تنیدگی (Swapping) در تکرارگرها برای اتصال این لینک‌ها به هم.</li>
          </ul>
        </div>
      </Card>

      {/* Section 2: Swapping Visualization (Figure 3 equivalent) */}
      <Card title="فرآیند تعویض درهم‌تنیدگی (نمایش عملی)">
        <p className="text-slate-600 mb-4 text-justify leading-8">
          شکل زیر (معادل شکل ۳ مقاله) نشان می‌دهد که چگونه گره میانی با انجام عملیات روی کیوبیت‌های حافظه خود، درهم‌تنیدگی را به دو گره انتهایی منتقل می‌کند، حتی اگر آن دو گره هرگز مستقیماً با هم برهم‌کنش نداشته باشند.
        </p>
        <SwappingDemo />
        <p className="text-xs text-center text-slate-400 mt-2">
          شکل ۳ مقاله: تکرارگرهای کوانتومی با اتصال جفت‌های کوتاه‌برد، درهم‌تنیدگی دوربرد ایجاد می‌کنند.
        </p>
      </Card>

      {/* NEW SECTION: Bell State Measurement Detail */}
      <Card title="عمق مطلب: اندازه‌گیری بل (Bell State Measurement)">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            عملیات Swapping در واقع اجرای یک <strong>اندازه‌گیری بل (BSM)</strong> روی دو کیوبیت موجود در گره میانی است. بیایید دقیق‌تر نگاه کنیم که داخل گره تکرارگر (B) چه اتفاقی می‌افتد.
          </p>
          
          <div className="flex items-start gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 my-4">
             <div className="bg-purple-100 p-2 rounded-lg text-purple-600 mt-1">
               <Microscope size={24} />
             </div>
             <div>
               <h4 className="font-bold text-slate-900 mb-1">BSM چیست؟</h4>
               <p className="text-sm text-slate-700 leading-7">
                 BSM یک اندازه‌گیری مشترک روی دو کیوبیت است که آن‌ها را به یکی از ۴ حالت پایه بل (<Latex>\Phi^\pm, \Psi^\pm</Latex>) تصویر (Project) می‌کند. 
                 این عملیات معمولاً شامل اعمال یک گیت <strong>CNOT</strong> و سپس یک گیت <strong>Hadamard</strong> و در نهایت اندازه‌گیری هر دو کیوبیت در پایه استاندارد است.
               </p>
             </div>
          </div>

          <BellStateMeasurementVisual />

          <div className="space-y-4 mt-6">
             <h5 className="font-bold text-slate-900 border-b border-slate-200 pb-2">نتایج این عملیات:</h5>
             <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
               <li>
                 <strong>خروجی کوانتومی:</strong> ندارد! دو کیوبیت ورودی در گره B نابود می‌شوند (به بیت‌های کلاسیک تبدیل می‌شوند). اما خاصیت درهم‌تنیدگی آن‌ها "منتقل" می‌شود به کیوبیت‌های A و C که هنوز زنده هستند.
               </li>
               <li>
                 <strong>خروجی کلاسیک:</strong> این اندازه‌گیری <strong>۲ بیت</strong> اطلاعات تولید می‌کند (۰۰، ۰۱، ۱۰، یا ۱۱). این بیت‌ها حیاتی هستند. آن‌ها به ما می‌گویند که درهم‌تنیدگی ایجاد شده بین A و C دقیقاً در چه وضعیتی است. بدون دانستن این نتیجه، حالت A-C یک مخلوط تصادفی و بی‌فایده است.
               </li>
             </ul>
          </div>
        </div>
      </Card>

      {/* Section 3: The Critical Role of Classical Networks */}
      <Card title="وابستگی حیاتی به شبکه کلاسیک">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            علیرغم ماهیت کوانتومی فرآیندهای زیربنایی، شبکه‌های کوانتومی برای تبادل <strong>پیام‌های کنترلی</strong> به اتصال کلاسیک (Classical Connectivity) بین تمام گره‌ها نیاز دارند (همانطور که در شکل ۱ دیدیم).
          </p>
          
          <div className="flex flex-col items-center my-6 bg-slate-50 border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-2 w-full justify-center">
               <MessageSquare className="text-blue-500" />
               <h4 className="font-bold text-slate-800">چرا شبکه کلاسیک لازم است؟</h4>
            </div>
            <p className="text-sm text-slate-600 leading-7 text-center max-w-2xl mb-4">
              نکته بسیار مهم اینجاست: فرآیند Entanglement Swapping (شکل بالا) نیازمند این است که گره میانی نتیجه اندازه‌گیری خود (همان ۲ بیت خروجی BSM) را به حداقل یکی از گره‌های دیگر بفرستد تا درهم‌تنیدگی <strong>قابل استفاده (Useful)</strong> باشد.
            </p>
            
            {/* Visual Component Here */}
            <div className="w-full max-w-3xl">
               <ClassicalDependency />
            </div>

            <div className="mt-4 bg-yellow-50 p-3 rounded text-xs text-yellow-800 border border-yellow-200 flex gap-2 items-start">
               <AlertTriangle size={16} className="shrink-0 mt-0.5" />
               <span>
                 بدون دریافت این پیام کلاسیک، گیرنده نمی‌داند کیوبیتش در چه وضعیتی است و در واقع اطلاعاتی ندارد (مخلوطی کاملاً تصادفی می‌بیند).
               </span>
            </div>
          </div>

          <p className="mt-4">
            علاوه بر این، درست مانند شبکه‌های کلاسیک، شبکه‌های کوانتومی نیز به <strong>پروتکل‌های کنترل و مدیریت</strong> نیاز دارند که آن‌ها هم از کانال‌های کلاسیک استفاده خواهند کرد.
          </p>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/background/fidelity-decoherence" 
        nextTitle="۲-۳. فیدلیتی و ناهمدوسی" 
      />

    </div>
  );
};
