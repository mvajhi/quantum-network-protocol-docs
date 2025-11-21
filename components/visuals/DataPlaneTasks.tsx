
import React, { useState } from 'react';
import { Zap, RefreshCw, ShieldCheck, Link, ArrowRight, Server, Database, Activity } from 'lucide-react';

export const DataPlaneTasks: React.FC = () => {
  const [activeTask, setActiveTask] = useState<1 | 2 | 3>(1);

  return (
    <div className="my-10 bg-slate-900 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col md:flex-row min-h-[400px] select-none">
      
      {/* Sidebar / Tabs */}
      <div className="w-full md:w-1/3 bg-slate-950 flex flex-col border-b md:border-b-0 md:border-l border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h4 className="font-bold text-blue-300 uppercase tracking-wider text-sm">وظایف اصلی پروتکل</h4>
          <p className="text-xs text-slate-500 mt-2">سه مسئولیت کلیدی لایه Data Plane</p>
        </div>
        
        <button 
          onClick={() => setActiveTask(1)}
          className={`flex items-center gap-4 p-5 text-right transition-all hover:bg-slate-900 ${activeTask === 1 ? 'bg-slate-900 border-r-4 border-blue-500 text-blue-100 shadow-[inset_10px_0_20px_rgba(0,0,0,0.3)]' : 'text-slate-500 border-transparent'}`}
        >
          <div className={`p-2 rounded-lg ${activeTask === 1 ? 'bg-blue-500 text-white' : 'bg-slate-800'}`}>
            <Link size={20} />
          </div>
          <div>
            <span className="block font-bold text-sm">۱. مدیریت تولید لینک</span>
            <span className="text-[10px] opacity-70">Link-pair generation</span>
          </div>
        </button>

        <button 
          onClick={() => setActiveTask(2)}
          className={`flex items-center gap-4 p-5 text-right transition-all hover:bg-slate-900 ${activeTask === 2 ? 'bg-slate-900 border-r-4 border-purple-500 text-purple-100 shadow-[inset_10px_0_20px_rgba(0,0,0,0.3)]' : 'text-slate-500 border-transparent'}`}
        >
          <div className={`p-2 rounded-lg ${activeTask === 2 ? 'bg-purple-500 text-white' : 'bg-slate-800'}`}>
            <RefreshCw size={20} />
          </div>
          <div>
            <span className="block font-bold text-sm">۲. سواپینگ و ردیابی</span>
            <span className="text-[10px] opacity-70">Swapping & Tracking</span>
          </div>
        </button>

        <button 
          onClick={() => setActiveTask(3)}
          className={`flex items-center gap-4 p-5 text-right transition-all hover:bg-slate-900 ${activeTask === 3 ? 'bg-slate-900 border-r-4 border-green-500 text-green-100 shadow-[inset_10px_0_20px_rgba(0,0,0,0.3)]' : 'text-slate-500 border-transparent'}`}
        >
          <div className={`p-2 rounded-lg ${activeTask === 3 ? 'bg-green-500 text-white' : 'bg-slate-800'}`}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="block font-bold text-sm">۳. مدیریت کیفیت (QoS)</span>
            <span className="text-[10px] opacity-70">Quality of Service</span>
          </div>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 relative flex flex-col justify-center">
        
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] transition-colors duration-700 ${
            activeTask === 1 ? 'bg-blue-600' : activeTask === 2 ? 'bg-purple-600' : 'bg-green-600'
          }`}></div>
        </div>

        {/* Task 1 Content: Link Generation */}
        {activeTask === 1 && (
          <div className="relative z-10 animate-fadeIn">
             <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
               <Link /> مدیریت تولید لینک (Generation)
             </h3>
             <p className="text-slate-300 text-sm leading-7 mb-8 text-justify">
               لایه شبکه خودش با فوتون‌ها بازی نمی‌کند! بلکه مانند یک "مدیر پروژه"، به لایه پایین‌تر (Link Layer) دستور می‌دهد که شروع به کار کند.
               وظیفه آن اطمینان از این است که لینک‌های کافی و با فیدلیتی مناسب تولید شوند.
             </p>
             
             {/* Visual: Manager and Worker */}
             <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-700 flex items-center justify-between relative">
                {/* Network Layer (Manager) */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg z-10">
                    <Server size={32} />
                  </div>
                  <span className="text-xs font-bold text-blue-300">لایه شبکه (شما)</span>
                </div>

                {/* Instruction Arrow */}
                <div className="flex-1 h-0.5 bg-slate-600 relative mx-4">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-xs px-2 py-1 rounded border border-slate-600 whitespace-nowrap text-blue-200">
                     "تولید کن: N=5, Fid=0.9"
                   </div>
                   <ArrowRight className="absolute -left-1 top-1/2 -translate-y-1/2 text-slate-600" size={16}/>
                </div>

                {/* Link Layer (Worker) */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-slate-800 border-2 border-slate-600 rounded-lg flex items-center justify-center z-10">
                    <Zap size={32} className="text-yellow-500 animate-pulse" />
                  </div>
                  <span className="text-xs font-bold text-slate-500">لایه لینک</span>
                </div>
             </div>
          </div>
        )}

        {/* Task 2 Content: Swapping & Tracking */}
        {activeTask === 2 && (
          <div className="relative z-10 animate-fadeIn">
             <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
               <RefreshCw /> سواپینگ و ردیابی (Tracking)
             </h3>
             <p className="text-slate-300 text-sm leading-7 mb-8 text-justify">
               تکرارگرها باید عملیات Swap را انجام دهند، اما این کافی نیست. پروتکل باید نتیجه این عملیات‌ها را جمع‌آوری کند تا بتواند "وضعیت بل نهایی" (End-to-End Bell State) را محاسبه کند. بدون این ردیابی، ارتباط بی معنی است.
             </p>
             
             {/* Visual: Swap Log */}
             <div className="flex gap-4 items-center justify-center">
                
                <div className="bg-slate-800 p-4 rounded-lg border border-purple-500/30 flex flex-col items-center gap-2">
                   <span className="text-[10px] text-slate-400">Repeater 1</span>
                   <div className="flex gap-2 text-sm font-mono bg-black/30 p-1 rounded">
                      <span>Result:</span><span className="text-purple-400">01</span>
                   </div>
                </div>

                <div className="h-0.5 w-8 bg-purple-500/50"></div>

                <div className="bg-slate-800 p-4 rounded-lg border border-purple-500/30 flex flex-col items-center gap-2">
                   <span className="text-[10px] text-slate-400">Repeater 2</span>
                   <div className="flex gap-2 text-sm font-mono bg-black/30 p-1 rounded">
                      <span>Result:</span><span className="text-purple-400">11</span>
                   </div>
                </div>

                <ArrowRight className="text-slate-500" />

                <div className="bg-purple-900/40 p-4 rounded-lg border border-purple-500 flex flex-col items-center gap-1 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                   <Database size={20} className="text-purple-300 mb-1" />
                   <span className="text-[10px] text-purple-200">Tracking System</span>
                   <span className="text-xs font-bold text-white">Final State Calculation</span>
                </div>

             </div>
          </div>
        )}

        {/* Task 3 Content: QoS */}
        {activeTask === 3 && (
           <div className="relative z-10 animate-fadeIn">
             <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
               <ShieldCheck /> مدیریت کیفیت سرویس (QoS)
             </h3>
             <p className="text-slate-300 text-sm leading-7 mb-8 text-justify">
               پروتکل نمی‌تواند فیزیک را تغییر دهد، اما می‌تواند "پلیس" باشد. باید درخواست‌هایی که قابل انجام نیستند را رد کند (Policing) یا ترافیک را به تاخیر بیندازد (Shaping) تا منابع آزاد شوند.
             </p>
             
             <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800 p-3 rounded border border-slate-700 text-center">
                   <div className="w-8 h-8 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-2">
                     <Activity size={16} />
                   </div>
                   <h5 className="text-xs font-bold text-slate-300 mb-1">تضمین فیدلیتی</h5>
                   <p className="text-[10px] text-slate-500">اطمینان از اینکه F {'>'} Threshold است.</p>
                </div>

                <div className="bg-slate-800 p-3 rounded border border-slate-700 text-center">
                   <div className="w-8 h-8 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-2">
                     <ShieldCheck size={16} />
                   </div>
                   <h5 className="text-xs font-bold text-slate-300 mb-1">پلیس ترافیک</h5>
                   <p className="text-[10px] text-slate-500">رد کردن درخواست‌های غیرممکن.</p>
                </div>

                 <div className="bg-slate-800 p-3 rounded border border-slate-700 text-center">
                   <div className="w-8 h-8 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                     <Activity size={16} />
                   </div>
                   <h5 className="text-xs font-bold text-slate-300 mb-1">شکل‌دهی (Shaping)</h5>
                   <p className="text-[10px] text-slate-500">به تاخیر انداختن درخواست‌ها برای مدیریت بار.</p>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};