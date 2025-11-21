import React from 'react';
import { Card } from '../ui/Card';
import { NetworkDiagram } from '../visuals/NetworkDiagram';
import { PageNavigation } from '../ui/PageNavigation';
import { ShieldCheck, Cpu, Cloud, Watch, Activity, Globe } from 'lucide-react';

export const Introduction: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۱-۱
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
          کلیات و انقلاب دوم (Overview)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          در این بخش به بررسی انقلاب دوم کوانتومی، ساختار شبکه‌های آینده و کاربردهای نوظهور آن می‌پردازیم.
        </p>
      </div>

      {/* Section 1: The Revolution */}
      <Card title="انقلاب دوم کوانتومی">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            ما هم‌اکنون در حال تجربه‌ی <strong>انقلاب دوم کوانتومی</strong> در سطح جهانی هستیم. اگر انقلاب اول منجر به اختراع ترانزیستورها و لیزرها شد (که در آن‌ها از قوانین کوانتومی به صورت تجمعی استفاده می‌شد)، انقلاب دوم بر روی کنترل و دستکاری <strong>تک‌تک سیستم‌های کوانتومی</strong> (مانند یک اتم منفرد یا یک فوتون) تمرکز دارد.
          </p>
          <p className="mb-4">
            این تحول بزرگ علمی، وعده‌ی ظهور <strong>«اینترنت کوانتومی»</strong> را با خود به همراه دارد؛ یک شبکه جهانی که برخلاف اینترنت کلاسیک که داده‌های صفر و یک را منتقل می‌کند، توانایی انتقال <strong>داده‌های کوانتومی</strong> (کیوبیت‌ها) را داراست. چنین شبکه‌ای امکاناتی را فراهم می‌کند که در چارچوب فیزیک کلاسیک غیرممکن هستند.
          </p>
        </div>
      </Card>

      {/* Section 2: The Diagram & Explanation */}
      <Card title="ساختار ترکیبی شبکه (Hybrid Network Structure)">
        <div className="mb-6 text-slate-800 leading-9 text-justify">
          <p>
             یکی از نکات کلیدی که باید در نظر داشت این است که شبکه‌های کوانتومی قرار نیست اینترنت فعلی را نابود یا جایگزین کنند. بلکه، آن‌ها به عنوان یک لایه تقویتی در کنار شبکه‌های غیرکوانتومی (کلاسیک) عمل خواهند کرد.
          </p>
          <p className="mt-2 text-sm text-slate-500 bg-slate-50 p-3 rounded border border-slate-200 inline-block">
            <span className="font-bold text-blue-600">نکته مهم:</span> شبکه‌های کوانتومی پروتکل‌هایی را اجرا می‌کنند که انجام آن‌ها با سیستم‌های کلاسیک یا از نظر ریاضی <strong>اثباتاً غیرممکن</strong> است و یا اینکه با کارایی بسیار پایین‌تری نسبت به حالت کوانتومی انجام می‌شود.
          </p>
        </div>

        <NetworkDiagram />
        
        <div className="text-slate-800 leading-9 text-justify mt-8 space-y-4">
           <h4 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-2 mb-3">
             تشریح شکل ۱
           </h4>
           <ul className="list-none space-y-4">
             <li className="flex items-start gap-3">
               <div className="mt-2 w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
               <p>
                 <strong>زیرساخت مشترک:</strong> همانطور که در تصویر می‌بینید، روترهای شبکه کوانتومی (که با رنگ‌های ترکیبی بنفش و آبی نمایش داده شده‌اند) در کنار زیرساخت‌های موجود اینترنت (روترهای آبی رنگ) قرار می‌گیرند. شبکه کوانتومی برای مدیریت و کنترل خود (Control Plane) به شدت به تبادل پیام‌های کلاسیک وابسته است.
               </p>
             </li>
             <li className="flex items-start gap-3">
               <div className="mt-2 w-2 h-2 bg-purple-500 rounded-full shrink-0"></div>
               <p>
                 <strong>تکرارگرهای کوانتومی (Quantum Repeaters):</strong> برخلاف سیگنال‌های کلاسیک که می‌توانند به راحتی کپی و تقویت شوند، اطلاعات کوانتومی را نمی‌توان کپی کرد (قضیه No-Cloning). بنابراین برای ارسال اطلاعات در فواصل طولانی (Long-distance links)، ما نیاز به زنجیره‌ای از «تکرارگرهای کوانتومی» داریم که در شکل با نقاط کوچک بنفش روی خطوط اتصال نمایش داده شده‌اند. این تکرارگرها وظیفه دارند درهم‌تنیدگی را در طول مسیر توزیع کنند.
               </p>
             </li>
           </ul>
        </div>
      </Card>

      {/* Section 3: Applications */}
      <Card title="پارادایم جدید و کاربردها">
        <div className="text-slate-800 leading-9 text-justify mb-8">
           <p>
             این معماری جدید، امکانات نوینی را فراهم می‌کند که فراتر از صرفاً "سریع‌تر شدن" اینترنت است. این قابلیت‌ها ماهیت ارتباطات را تغییر می‌دهند:
           </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          
          {/* App 1 */}
          <div className="flex gap-4 items-start p-4 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 shadow-sm transition-all hover:shadow-md">
            <div className="bg-green-100 p-3 rounded-lg text-green-700">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-1">ارتباطات امن کوانتومی</h4>
              <span className="text-xs font-mono text-slate-400 block mb-2">Quantum Secure Communications</span>
              <p className="text-sm text-slate-600 leading-6">
                ایجاد کانال‌های ارتباطی که امنیت آن‌ها توسط قوانین فیزیک تضمین می‌شود، نه دشواری ریاضی. اگر جاسوسی تلاش کند اطلاعات را شنود کند، حالت کوانتومی تغییر کرده و طرفین بلافاصله متوجه می‌شوند (توزیع کلید کوانتومی QKD).
              </p>
            </div>
          </div>

          {/* App 2 */}
          <div className="flex gap-4 items-start p-4 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100 shadow-sm transition-all hover:shadow-md">
            <div className="bg-purple-100 p-3 rounded-lg text-purple-700">
              <Cpu size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-1">محاسبات کوانتومی توزیع‌شده</h4>
              <span className="text-xs font-mono text-slate-400 block mb-2">Distributed Quantum Computation</span>
              <p className="text-sm text-slate-600 leading-6">
                اتصال کامپیوترهای کوانتومی کوچک به یکدیگر برای تشکیل یک "ابرکامپیوتر کوانتومی" قدرتمند. این کار اجازه می‌دهد توان پردازشی به صورت نمایی افزایش یابد.
              </p>
            </div>
          </div>

          {/* App 3 */}
          <div className="flex gap-4 items-start p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 shadow-sm transition-all hover:shadow-md">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
              <Cloud size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-1">رایانش ابری کوانتومی امن</h4>
              <span className="text-xs font-mono text-slate-400 block mb-2">Secure Quantum Computing in the Cloud</span>
              <p className="text-sm text-slate-600 leading-6">
                کاربران می‌توانند محاسبات خود را به یک سرور کوانتومی قدرتمند بفرستند بدون اینکه خود سرور متوجه شود چه چیزی را محاسبه می‌کند (Blind Quantum Computing). این سطح از حفظ حریم خصوصی در محاسبات کلاسیک غیرممکن است.
              </p>
            </div>
          </div>

          {/* Grid for smaller items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-white transition-colors">
               <div className="bg-orange-100 p-2 rounded-lg text-orange-700">
                <Watch size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">همگام‌سازی ساعت</h4>
                <span className="text-[10px] font-mono text-slate-400 block mb-1">Clock Synchronisation</span>
                <p className="text-xs text-slate-600 leading-5">
                  همگام‌سازی ساعت‌های اتمی در فواصل دور با دقتی بی‌نظیر که برای سیستم‌های موقعیت‌یابی (GPS) نسل بعد حیاتی است.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-white transition-colors">
               <div className="bg-red-100 p-2 rounded-lg text-red-700">
                <Activity size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">شبکه‌های اندازه‌گیری</h4>
                <span className="text-[10px] font-mono text-slate-400 block mb-1">Quantum Sensor Networks</span>
                <p className="text-xs text-slate-600 leading-5">
                  استفاده از درهم‌تنیدگی برای اتصال حسگرها (تلسکوپ‌ها یا آشکارسازها) جهت افزایش شدید دقت اندازه‌گیری.
                </p>
              </div>
            </div>
          </div>

        </div>
      </Card>

      {/* Section 4: Timeline */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

        <div className="flex-1 z-10">
           <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
             <Globe className="text-blue-400" />
             چشم‌انداز زمانی
           </h3>
           <p className="leading-8 text-slate-300 text-justify text-lg">
             این تکنولوژی با سرعتی چشمگیر در حال توسعه است. طبق پیش‌بینی‌ها و برنامه‌ریزی‌های انجام شده، اولین <strong>شبکه کوانتومی بین‌شهری (Inter-city)</strong> قرار است در همین چند سال آینده آنلاین و عملیاتی شود.
           </p>
        </div>
      </div>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/introduction/current-state" 
        nextTitle="۱-۲. وضعیت فعلی و محدودیت‌ها" 
      />

    </div>
  );
};