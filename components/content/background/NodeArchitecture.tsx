
import React from 'react';
import { Card } from '../../ui/Card';
import { PageNavigation } from '../../ui/PageNavigation';
import { NodeArchitectureDiagram } from '../../visuals/NodeArchitectureDiagram';
import { QubitTypes } from '../../visuals/QubitTypes';
import { Cpu, Network, Layers, Settings } from 'lucide-react';

export const NodeArchitecture: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      
      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-3 font-bold shadow-sm">
          بخش ۲-۴
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
          معماری گره کوانتومی (Quantum Node Architecture)
        </h1>
        <p className="text-lg text-slate-600 leading-8">
          بررسی ساختار داخلی یک گره شبکه، تعامل بین سیستم‌عامل و سخت‌افزار، و محدودیت‌های فیزیکی دستگاه‌ها.
        </p>
      </div>

      {/* Section 1: High Level Architecture */}
      <Card title="معماری سطح بالا">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            قبل از ورود به جزئیات پروتکل، ابتدا معماری سطح بالای یک گره کوانتومی را تعریف می‌کنیم. همانطور که در شکل زیر نشان داده شده است، انتظار می‌رود <strong>پشته شبکه (Network Stack)</strong> بخشی از سیستم‌عامل محلی (OS) باشد.
          </p>
          
          <NodeArchitectureDiagram />

          <div className="mt-6">
             <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Settings className="text-purple-600" />
                وظایف پشته شبکه (Network Stack)
             </h4>
             <p className="mb-4">
               پشته شبکه مسئول مدیریت تمام عملیات مربوط به تولید جفت‌های درهم‌تنیده است و این کار را با کمک سرویس‌های سیستم‌عامل انجام می‌دهد.
               <br />
               هنگامی که یک درخواست درهم‌تنیدگی (از سمت یک اپلیکیشن یا یک گره بالادستی) دریافت می‌شود، پشته شبکه باید دو کار انجام دهد:
             </p>
             <ul className="list-decimal list-inside space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700">
               <li className="pl-2">
                 <strong>هماهنگی (Coordinate):</strong> با گره‌های همسایه ارتباط برقرار کند تا پارامترهای لینک را تنظیم کند.
               </li>
               <li className="pl-2">
                 <strong>دستورات محلی (Issue Instructions):</strong> دستورات فیزیکی لازم برای تولید جفت‌های لینک و انجام عملیات Swapping را به سخت‌افزار ارسال کند.
               </li>
             </ul>
          </div>
        </div>
      </Card>

      {/* Section 2: Coordination & Separation of Concerns */}
      <Card title="هماهنگی و تفکیک وظایف">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="text-slate-800 leading-8 text-justify">
            <h4 className="font-bold text-slate-900 mb-2 text-sm flex items-center gap-2">
              <Network size={18} className="text-blue-500"/>
              هماهنگی کلاسیک
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              پشته شبکه با استفاده از پیام‌های کلاسیک با همسایگان خود هماهنگ می‌شود (همه گره‌ها به صورت کلاسیک به هم متصل هستند، همانطور که در شکل ۱ دیدیم). این پیام‌ها برای تبادل اطلاعات کنترلی و نتایج اندازه‌گیری‌ها حیاتی هستند.
            </p>
          </div>

          <div className="text-slate-800 leading-8 text-justify">
             <h4 className="font-bold text-slate-900 mb-2 text-sm flex items-center gap-2">
              <Layers size={18} className="text-green-500"/>
              خارج از پشته شبکه
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              درست مانند شبکه‌های کلاسیک، وظایف پیچیده‌ای مانند <strong>محاسبه مسیر (Path Computation)</strong> در داخل خودِ پشته شبکه انجام نمی‌شود. این وظایف به پروتکل‌های مسیریابی (Routing Protocols) سپرده می‌شوند که تصمیمات خود را با پر کردن جداول Data Plane به پشته شبکه ابلاغ می‌کنند.
            </p>
          </div>

        </div>
      </Card>

      {/* Section 3: Hardware Realities */}
      <Card title="واقعیت‌های سخت‌افزاری: کیوبیت‌های ارتباطی vs حافظه">
        <div className="text-slate-800 leading-9 text-justify">
          <p className="mb-4">
            در سخت‌افزارهای موجود، برخلاف دستگاه‌های کلاسیک که کارت شبکه (NIC) از پردازنده (CPU) جداست، در اینجا تمایز فیزیکی وجود ندارد. هم پردازنده و هم رابط شبکه مستقیماً روی کیوبیت‌های موجود در حافظه اصلی (Main Memory) عمل می‌کنند.
          </p>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-4">
             <p className="text-sm text-orange-900 font-bold mb-1">یک محدودیت مهم سخت‌افزاری:</p>
             <p className="text-sm text-orange-800">
               معمولاً سخت‌افزار نمی‌تواند روی هر کیوبیت دلخواهی هر عملیاتی را انجام دهد. بسته به پیاده‌سازی فیزیکی (مثلاً یون‌های به دام افتاده یا مراکز NV در الماس)، کیوبیت‌ها به دو دسته تقسیم می‌شوند:
             </p>
          </div>

          <QubitTypes />

          <p className="mt-4">
            پشته شبکه برای دسترسی به این منابع سخت‌افزاری و جلوگیری از تداخل، به سایر اجزای سیستم‌عامل مانند <strong>Quantum Task Scheduler</strong> (زمان‌بند وظایف) و <strong>Memory Manager</strong> (مدیر حافظه) متکی است.
          </p>
        </div>
      </Card>

      {/* Footer Navigation */}
      <PageNavigation 
        nextPath="/protocol/use-cases" 
        nextTitle="۳-۱. موارد استفاده (Use Cases)" 
      />
    </div>
  );
};