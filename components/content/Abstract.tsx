import React from 'react';
import { Card } from '../ui/Card';
import { DecoherenceDemo } from '../visuals/DecoherenceDemo';
import { PageNavigation } from '../ui/PageNavigation';
import { Layers, Server, Share2 } from 'lucide-react';

export const Abstract: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Section */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold">
          بخش اول
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
          چکیده (Abstract)
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          نمایی کلی از چالش‌های پیش روی اینترنت کوانتومی و راهکار پیشنهادی این مقاله برای غلبه بر محدودیت‌های سخت‌افزاری.
        </p>
      </div>

      {/* Part 1: Context & The Promise */}
      <Card title="انقلاب دوم کوانتومی و وعده‌ی اینترنت کوانتومی">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 text-slate-700 leading-8 text-justify">
            <p className="mb-4">
              مقاله با اشاره به <strong>انقلاب دوم کوانتومی</strong> آغاز می‌شود. اگر انقلاب اول منجر به اختراع ترانزیستور و لیزر شد، انقلاب دوم بر روی کنترل تک‌تک سیستم‌های کوانتومی (مانند اتم‌ها یا فوتون‌ها) تمرکز دارد.
            </p>
            <p className="mb-4">
              این پیشرفت، نویدبخش ظهور <strong>اینترنت کوانتومی</strong> است. اما اینترنت کوانتومی چیست؟ برخلاف اینترنت کلاسیک که بیت‌های صفر و یک را منتقل می‌کند، اینترنت کوانتومی وظیفه انتقال «کیوبیت‌ها» و توزیع «درهم‌تنیدگی» (Entanglement) را بر عهده دارد که امنیت غیرقابل شکست و محاسبات توزیع‌شده فوق‌سریع را ممکن می‌سازد.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500 mt-4">
              <h4 className="font-bold text-blue-900 mb-2">وضعیت فعلی:</h4>
              <p className="text-sm text-blue-800">
                اولین نمونه‌های سخت‌افزاری شبکه کوانتومی در حال تکمیل هستند. اما مقاله تاکید می‌کند که یک شبکه کاربردی، چیزی فراتر از صرفاً سخت‌افزار فیزیکی است. ما هنوز در ابتدای راه توسعه سیستم‌های شبکه کوانتومی مقیاس‌پذیر هستیم.
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-center justify-center bg-slate-50 p-6 rounded-xl border border-slate-200 min-w-[200px]">
            <Share2 size={48} className="text-blue-500 mb-3" />
            <span className="text-sm font-bold text-slate-600 text-center">شبکه کوانتومی</span>
          </div>
        </div>
      </Card>

      {/* Part 2: The Core Problem - Decoherence */}
      <Card title="چالش اصلی: ناهمدوسی (Decoherence)">
        <div className="text-slate-700 leading-8 text-justify mb-6">
          <p>
            یکی از کلیدی‌ترین چالش‌ها در فناوری‌های کوانتومیِ آینده‌ی نزدیک (Near-term)، پدیده‌ای به نام <strong>Decoherence</strong> یا ناهمدوسی است.
          </p>
          <p className="mt-2">
            حالات کوانتومی بسیار شکننده هستند. کیوبیت‌ها تمایل دارند با محیط اطراف خود برهم‌کنش داشته باشند که این اتفاق باعث می‌شود اطلاعات ذخیره شده در آن‌ها به تدریج "نشت" کرده و از بین برود. این پدیده محدودیت‌های بسیار سخت‌گیرانه‌ای را بر روی <strong>زمان ذخیره‌سازی</strong> در حافظه‌های کوانتومی اعمال می‌کند.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 bg-red-50 p-4 rounded-lg text-red-900 border border-red-100">
            <li>در سخت‌افزارهای فعلی، عمر حافظه کوانتومی بسیار کوتاه است.</li>
            <li>اگر اطلاعات قبل از "خراب شدن" (Decay) منتقل نشوند، شبکه از کار می‌افتد.</li>
          </ul>
        </div>
        
        {/* Interactive Visual */}
        <DecoherenceDemo />
      </Card>

      {/* Part 3: The Proposed Solution - Protocol Design */}
      <Card title="راهکار پیشنهادی: پروتکل صفحه داده (Data Plane Protocol)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="text-purple-600" />
              هدف پروتکل
            </h4>
            <p className="text-slate-700 leading-7 text-justify">
              در این مقاله، نویسندگان یک <strong>پروتکل شبکه کوانتومی</strong> ارائه می‌دهند که هدف آن امکان‌پذیر ساختن ارتباط کوانتومی End-to-End (سر-به-سر) است. 
              این پروتکل طوری طراحی شده که با وجود چالش‌های بنیادین مکانیک کوانتوم (مثل عدم امکان کپی کردن اطلاعات یا همان No-Cloning Theorem) کار کند.
            </p>
          </div>
          
          <div>
             <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Server className="text-green-600" />
              ویژگی کلیدی: کارایی در زمان کم
            </h4>
            <p className="text-slate-700 leading-7 text-justify">
              پروتکل توسعه داده شده به طور خاص برای کارایی بالا در شرایطی طراحی شده که <strong>طول عمر حافظه کوانتومی کوتاه</strong> است.
              یعنی پروتکل باید "سریع" عمل کند و مدیریت دقیقی روی زمان‌بندی داشته باشد تا قبل از اینکه ناهمدوسی اطلاعات را نابود کند، ارتباط برقرار شود.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-slate-800 text-white p-6 rounded-xl">
          <h4 className="font-bold border-b border-slate-600 pb-2 mb-4 text-yellow-400">
            نتایج شبیه‌سازی
          </h4>
          <p className="leading-7 text-slate-300">
            نویسندگان با استفاده از یک شبیه‌ساز شبکه کوانتومی (NetSquid) نشان داده‌اند که این پروتکل حتی در شرایطی که اتلاف ناشی از ناهمدوسی قابل توجه است، می‌تواند سرویس خود را ارائه دهد.
            در نهایت، نتیجه‌گیری می‌شود که این پروتکل روی سخت‌افزارهای بسیار محدودِ امروزی نیز قابل اجراست که اهمیت زمانی (Timeliness) این پژوهش را نشان می‌دهد.
          </p>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/introduction/overview" 
        nextTitle="۱-۱. کلیات و انقلاب دوم" 
      />
    </div>
  );
};