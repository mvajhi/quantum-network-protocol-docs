
import React, { useState } from 'react';
import { Database, ArrowDown, ArrowUp, Tag, Activity, Gauge, Scale, Router, ChevronRight, Hash, Server, Network } from 'lucide-react';

export const RoutingTableVisual: React.FC = () => {
  const [activeField, setActiveField] = useState<string>('down-node');

  const sections = [
    {
      id: 'path',
      title: 'مسیر و همسایگان (Path & Neighbors)',
      icon: <Network size={18} />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      items: [
        { id: 'down-node', label: 'Next Hop (Downstream)', value: 'Node C (10.0.0.5)', icon: <ArrowDown size={16} />, desc: 'گره بعدی در مسیر به سمت مقصد نهایی. کیوبیت‌های تولید شده در این سمت (سمت راست) به اینجا فرستاده می‌شوند.' },
        { id: 'up-node', label: 'Prev Hop (Upstream)', value: 'Node A (10.0.0.2)', icon: <ArrowUp size={16} />, desc: 'گره قبلی در مسیر (سمت چپ). پیام‌های کنترلی مثل TRACK از اینجا دریافت می‌شوند.' },
      ]
    },
    {
      id: 'labels',
      title: 'برچسب‌ها (Switching Labels)',
      icon: <Tag size={18} />,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      items: [
        { id: 'in-label', label: 'Incoming Label (In-L)', value: 'L-3390', icon: <Tag size={16} />, desc: 'شناسه‌ای که گره بالادستی روی پیام‌های ورودی می‌زند. این گره با دیدن این برچسب می‌فهمد پیام مربوط به این مدار مجازی است.' },
        { id: 'out-label', label: 'Outgoing Label (Out-L)', value: 'L-8821', icon: <Tag size={16} />, desc: 'شناسه‌ای که این گره روی پیام‌های خروجی به سمت پایین‌دست می‌زند تا گره بعدی متوجه شود پیام مربوط به چیست (Label Swapping).' },
      ]
    },
    {
      id: 'qos',
      title: 'تضمین کیفیت (QoS Contract)',
      icon: <Activity size={18} />,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      items: [
        { id: 'fidelity', label: 'Min Fidelity Threshold', value: '0.92', icon: <Gauge size={16} />, desc: 'حداقل کیفیت فیزیکی مورد نیاز برای لینک‌های متصل به این گره. اگر کیفیت کمتر باشد، لینک دور ریخته می‌شود.' },
        { id: 'rate', label: 'Max Link Rate', value: '1000 Hz', icon: <Scale size={16} />, desc: 'حداکثر نرخ تولید مجاز برای جلوگیری از پر شدن بافرها و مدیریت تراکم.' },
      ]
    }
  ];

  const activeItem = sections.flatMap(s => s.items).find(i => i.id === activeField);

  return (
    <div className="my-8 select-none font-sans" dir="ltr">
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col">
        
        {/* Top Bar: Router Status */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
             <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/20">
               <Router size={24} className="text-white" />
             </div>
             <div>
               <h3 className="text-slate-100 font-bold text-lg">Routing Table Entry</h3>
               <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mt-1">
                 <span className="flex items-center gap-1"><Hash size={12}/> VC_ID: 1024</span>
                 <span className="text-slate-700">|</span>
                 <span className="flex items-center gap-1 text-green-400"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> ACTIVE</span>
               </div>
             </div>
          </div>
          
          <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Server size={14} />
            <span>Local Node: 10.0.0.4</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12">
           
           {/* Left Side: Data Fields */}
           <div className="md:col-span-7 p-6 grid grid-cols-1 gap-6 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/50">
              {sections.map(section => (
                <div key={section.id} className="space-y-3">
                   <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${section.color}`}>
                      {section.icon}
                      {section.title}
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.items.map(item => (
                        <button
                          key={item.id}
                          onClick={() => setActiveField(item.id)}
                          className={`relative p-3 rounded-lg border text-left transition-all duration-200 group overflow-hidden ${
                            activeField === item.id 
                              ? 'bg-slate-800 border-blue-500 shadow-md ring-1 ring-blue-500/50' 
                              : 'bg-slate-900 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                          }`}
                        >
                           <div className="flex justify-between items-start mb-1">
                              <span className="text-[10px] text-slate-500 font-bold uppercase">{item.label}</span>
                              <div className={`text-slate-600 ${activeField === item.id ? 'text-blue-400' : ''}`}>
                                {item.icon}
                              </div>
                           </div>
                           <div className={`font-mono text-sm font-bold ${activeField === item.id ? 'text-white' : 'text-slate-300'}`}>
                             {item.value}
                           </div>
                           {activeField === item.id && (
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg"></div>
                           )}
                        </button>
                      ))}
                   </div>
                </div>
              ))}
           </div>

           {/* Right Side: Interactive Description */}
           <div className="md:col-span-5 bg-slate-950 p-6 flex flex-col" dir="rtl">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                 <Activity size={20} className="text-blue-500" />
                 <span className="font-bold text-slate-200 text-sm">توضیحات فیلد (Field Info)</span>
              </div>
              
              {activeItem ? (
                <div className="animate-fadeIn">
                   <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-slate-900 rounded text-blue-400 border border-slate-800">
                        {activeItem.icon}
                      </div>
                      <span className="font-bold text-slate-100 font-mono text-lg" dir="ltr">{activeItem.label}</span>
                   </div>
                   <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800 mb-4">
                      <span className="text-xs text-slate-500 block mb-1">مقدار فعلی:</span>
                      <span className="font-mono text-xl text-blue-400 font-bold" dir="ltr">{activeItem.value}</span>
                   </div>
                   <p className="text-sm text-slate-400 leading-7 text-justify">
                      {activeItem.desc}
                   </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2 opacity-50">
                   <Router size={48} />
                   <p className="text-sm">یک فیلد را انتخاب کنید</p>
                </div>
              )}
           </div>

        </div>

      </div>
    </div>
  );
};
