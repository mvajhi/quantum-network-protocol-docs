
import React, { useState } from 'react';
import { GitBranch, Settings, Layers, Globe, Server, PlusCircle } from 'lucide-react';

export const FutureRoadmap: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  const items = [
    {
      id: 'services',
      title: 'توسعه سرویس‌ها (QNP Services)',
      icon: <Server size={24} />,
      color: 'text-blue-500',
      bg: 'bg-blue-500',
      pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
      desc: 'ایجاد سرویس‌های پیشرفته‌تر مانند MPLS کلاسیک (پشتیبانی از چندمسیر و بازیابی خطا) و سرویس‌های جدید کوانتومی (ذخیره‌سازی پیشگیرانه جفت‌های درهم‌تنیده).'
    },
    {
      id: 'control',
      title: 'طراحی کنترل پلین (Control Plane)',
      icon: <Settings size={24} />,
      color: 'text-purple-500',
      bg: 'bg-purple-500',
      pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
      desc: 'تحقیق بر روی رزرو منابع، سیگنالینگ، مهندسی ترافیک و معماری نرم‌افزاری (SDN متمرکز یا توزیع‌شد؟).'
    },
    {
      id: 'stack',
      title: 'بهینه‌سازی پشته (Protocol Stack)',
      icon: <Layers size={24} />,
      color: 'text-green-500',
      bg: 'bg-green-500',
      pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
      desc: 'اعمال رویکرد "Layering as Optimization Decomposition" برای تحلیل جامع پشته پروتکل و طراحی سیستماتیک آن.'
    },
    {
      id: 'hybrid',
      title: 'شبکه‌های ناهمگن (Heterogeneous)',
      icon: <Globe size={24} />,
      color: 'text-orange-500',
      bg: 'bg-orange-500',
      pos: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
      desc: 'بررسی عملکرد پروتکل در شبکه‌هایی که ترکیبی از پلتفرم‌های سخت‌افزاری مختلف با پارامترهای متفاوت هستند.'
    }
  ];

  return (
    <div className="my-12 select-none">
      <div className="relative w-full h-[400px] bg-slate-50 rounded-2xl border border-slate-200 shadow-inner flex items-center justify-center overflow-hidden">
        
        {/* Background Lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
           <div className="w-[80%] h-[80%] border-2 border-dashed border-slate-400 rounded-full animate-[spin_60s_linear_infinite]"></div>
           <div className="absolute w-[60%] h-[60%] border-2 border-dashed border-slate-400 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
        </div>

        {/* Center Node */}
        <div className="relative z-20 w-32 h-32 bg-white border-4 border-slate-800 rounded-full flex flex-col items-center justify-center shadow-2xl">
           <GitBranch size={32} className="text-slate-800 mb-1" />
           <span className="text-xs font-bold text-slate-600">این مقاله</span>
           <span className="text-[9px] text-slate-400">(QNP Core)</span>
        </div>

        {/* Connecting Lines to Orbit */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
           <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#cbd5e1" strokeWidth="2" />
           <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
           <line x1="50%" y1="50%" x2="50%" y2="90%" stroke="#cbd5e1" strokeWidth="2" />
           <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
        </svg>

        {/* Orbit Items */}
        <div className="absolute inset-0 w-2/3 h-2/3 m-auto">
           {items.map((item) => (
             <div 
               key={item.id}
               className={`absolute ${item.pos} w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-lg border-2 flex items-center justify-center cursor-pointer transition-all duration-300 group z-30
                  ${active === item.id ? `border-${item.color.split('-')[1]}-500 scale-125` : 'border-slate-200 hover:border-slate-400 hover:scale-110'}
               `}
               onClick={() => setActive(active === item.id ? null : item.id)}
             >
                <div className={`${item.color} group-hover:scale-110 transition-transform`}>
                   {item.icon}
                </div>
                {active !== item.id && (
                   <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full ${item.bg} text-white flex items-center justify-center shadow-md`}>
                      <PlusCircle size={14} />
                   </div>
                )}
             </div>
           ))}
        </div>

        {/* Info Overlay */}
        {active && (
           <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 text-white p-4 rounded-xl backdrop-blur-md animate-in slide-in-from-bottom-10 z-40 border border-slate-700 shadow-2xl">
              {(() => {
                 const selected = items.find(i => i.id === active);
                 return (
                    <div className="flex items-start gap-4">
                       <div className={`p-3 rounded-lg ${selected?.bg} shrink-0`}>
                          {selected?.icon}
                       </div>
                       <div>
                          <h4 className="font-bold text-lg mb-1">{selected?.title}</h4>
                          <p className="text-sm text-slate-300 leading-6 text-justify">{selected?.desc}</p>
                       </div>
                       <button onClick={() => setActive(null)} className="text-slate-500 hover:text-white ml-auto">
                          بستن
                       </button>
                    </div>
                 )
              })()}
           </div>
        )}

      </div>
      <div className="text-center mt-4 text-xs text-slate-500">
         برای مشاهده جزئیات مسیرهای آینده، روی آیکون‌ها کلیک کنید.
      </div>
    </div>
  );
};