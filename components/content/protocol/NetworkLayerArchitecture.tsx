
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { ProtocolTriad } from '../../visuals/ProtocolTriad';
import { SchedulingDiagram } from '../../visuals/SchedulingDiagram';
import { Map, Activity, Layers, GitBranch, Clock, CheckSquare } from 'lucide-react';

export const NetworkLayerArchitecture: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۳-۳
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          معماری لایه شبکه (Network Layer Architecture)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          چرا یک پروتکل به تنهایی کافی نیست؟ معرفی نقش‌های مسیریابی، سیگنالینگ و صفحه داده.
        </p>
      </div>

      {/* Intro: The Ecosystem */}
      <Card title="یک پروتکل برای همه کارها؟ خیر.">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            ارائه سرویس کامل لایه شبکه نمی‌تواند تنها با یک پروتکل انجام شود. در عوض، ما وضعیتی شبیه به شبکه‌های کلاسیک را متصور هستیم که در آن سرویس‌های متنوع از بلوک‌های سازنده ساده‌تر (مثل IP Datagram یا MPLS) ساخته می‌شوند.
          </p>
          <p>
            در این مقاله، ما یک <strong>پروتکل صفحه داده کوانتومی (Quantum Data Plane Protocol)</strong> پیشنهاد می‌کنیم که قرار است چنین بلوک سازنده‌ای باشد. اما این پروتکل برای کار کردن به حمایت حداقل دو سرویس خارجی نیاز دارد:
          </p>
        </div>
        
        <ProtocolTriad />

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800 mt-4">
          <strong>نکته مهم:</strong> در این مقاله، ما فقط پروتکل Data Plane (بخش آبی در شکل بالا) را طراحی می‌کنیم، اما ابتدا باید نقش دو پروتکل دیگر را درک کنیم تا مرزهای وظایف مشخص شود.
        </div>
      </Card>

      {/* 1. Routing Protocol */}
      <Card title="۱. پروتکل مسیریابی (Routing Protocol)">
        <div className="flex items-start gap-4 mb-6">
           <div className="bg-green-100 p-3 rounded-xl text-green-700 shrink-0">
             <Map size={24} />
           </div>
           <div className="text-slate-800 leading-8 text-justify">
             <p>
               قبل از اینکه بتوان یک جفت درهم‌تنیده End-to-End ایجاد کرد، باید مسیر بهینه مشخص شود. درست مثل شبکه کلاسیک، این کار توسط یک پروتکل مسیریابی جداگانه انجام می‌شود.
             </p>
           </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
           <h5 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
             <GitBranch size={18} />
             پیچیدگی مسیریابی کوانتومی
           </h5>
           <p className="text-sm text-slate-600 mb-4 leading-7">
             مسیریابی در شبکه کوانتومی بسیار پیچیده‌تر از کلاسیک است. چرا؟ چون فقط پیدا کردن "کوتاه‌ترین مسیر" کافی نیست. الگوریتم باید فاکتورهای زیر را همزمان در نظر بگیرد:
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200 text-slate-700">
                <CheckSquare size={16} className="text-blue-500"/>
                <span>طول مسیر (Path Length)</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200 text-slate-700">
                <CheckSquare size={16} className="text-blue-500"/>
                <span>هزینه و پهنای باند (Cost & Throughput)</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200 text-purple-700 font-bold">
                <CheckSquare size={16} className="text-purple-500"/>
                <span>فیدلیتی نهایی (End-to-End Fidelity)</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200 text-orange-700 font-bold">
                <CheckSquare size={16} className="text-orange-500"/>
                <span>زمان تولید لینک‌ها (Generation Time)</span>
              </div>
           </div>
           <p className="text-xs text-slate-500 mt-3 leading-5">
             مسیرهای با فیدلیتی بالاتر نیاز به لینک‌های باکیفیت‌تر و گره‌هایی با حافظه طولانی‌مدت دارند. همچنین تولید لینک‌های باکیفیت‌تر زمان‌برتر است که روی پهنای باند تاثیر می‌گذارد.
           </p>
        </div>
      </Card>

      {/* 2. Signalling Protocol */}
      <Card title="۲. پروتکل سیگنالینگ (Signalling Protocol)">
        <div className="flex items-start gap-4 mb-6">
           <div className="bg-orange-100 p-3 rounded-xl text-orange-700 shrink-0">
             <Activity size={24} />
           </div>
           <div className="text-slate-800 leading-8 text-justify">
             <p>
               پروتکل ما <strong>Connection-Oriented</strong> (اتصال‌گرا) است. یعنی قبل از شروع کار، باید یک مسیر ثابت به نام <strong>مدار مجازی (Virtual Circuit)</strong> بین مبدا و مقصد برقرار شود. وظیفه نصب این مدار بر عهده پروتکل سیگنالینگ است (شبیه به پروتکل RSVP-TE در شبکه‌های MPLS کلاسیک).
             </p>
           </div>
        </div>

        <div className="text-slate-800 leading-9 text-justify">
          <h5 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-lg">
            <Clock size={20} className="text-red-500" />
            چالش حیاتی: مدیریت زمان‌بندی (Schedule Management)
          </h5>
          <p className="mb-6">
            فقط اختصاص دادن مسیر کافی نیست! در یک گره کوانتومی (تکرارگر)، لینک بالادستی (Upstream) و لینک پایین‌دستی (Downstream) باید <strong>به‌اندازه کافی نزدیک به هم در زمان</strong> تولید شوند. اگر یکی زود بیاید و دیگری دیر، اولی قبل از رسیدن دومی دچار ناهمدوسی شده و از بین می‌رود.
          </p>
          
          {/* Simulation */}
          <SchedulingDiagram />

          <p className="mt-4 text-sm text-slate-600 leading-7">
            مولفه مسیریابی (Routing) فقط منابع را انتخاب می‌کند، اما تصمیم نمی‌گیرد "کی" از آن‌ها استفاده شود. 
            پروتکل پیشنهادی ما (Data Plane) هم دیدش محدود به یک مدار مجازی است.
            بنابراین، این <strong>پروتکل سیگنالینگ</strong> است که بهترین گزینه برای مدیریت جدول زمانی (Schedule) است. در شبکه‌های اولیه، این همگام‌سازی باید بسیار دقیق باشد و ممکن است نیاز به اختصاص <strong>Time Bins</strong> (بازه های زمانی اختصاصی) به هر مدار باشد.
          </p>
        </div>
      </Card>

      {/* Conclusion on Architecture */}
      <Card className="bg-slate-800 border-slate-700 text-white">
        <div className="flex items-center gap-3 mb-4 text-blue-300">
          <Layers size={24} />
          <h4 className="font-bold text-lg">جمع‌بندی معماری</h4>
        </div>
        <p className="leading-7 text-slate-300 text-justify">
          تحقیقات روی الگوریتم‌های مسیریابی و سیگنالینگ (چه توزیع‌شده و چه متمرکز) یک حوزه پژوهشی فعال است [12, 16, 87].
          طراحی ما در این مقاله (پروتکل Data Plane) فرض خاصی در مورد معماری آن‌ها نمی‌کند، بلکه فقط فرض می‌کند که این دو سرویس وجود دارند و دستورات لازم (جدول مسیریابی و زمان‌بندی) را فراهم می‌کنند.
        </p>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/protocol/quantum-data-plane" 
        nextTitle="۳-۴. پروتکل صفحه داده کوانتومی" 
      />
    </div>
  );
};