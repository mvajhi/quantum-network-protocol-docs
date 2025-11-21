
import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Laptop, Server, ArrowRight, Play, Pause, 
  RotateCcw, ChevronRight, ChevronLeft, Zap, 
  Database, Mail, CheckCircle2, GitMerge, FileText 
} from 'lucide-react';

export const SequenceDiagramVisual: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<any>(null);

  // Total granular steps to show every packet movement
  const TOTAL_STEPS = 11;

  const stepsInfo = [
    {
      title: "۰. وضعیت اولیه (Ready)",
      desc: "مدار مجازی (VC) نصب شده است. همه گره‌ها جداول مسیریابی را دارند و منتظر تریگر هستند.",
      activeNodes: []
    },
    {
      title: "۱. درخواست کاربر (Request)",
      desc: "آلیس درخواست خود را به گره انتهایی محلی (Node 0) ارسال می‌کند.",
      activeNodes: ['alice', 'n0']
    },
    {
      title: "۲. انتشار پیام FORWARD (گام ۱)",
      desc: "گره N0 پیام FORWARD را می‌سازد و به N1 می‌فرستد. همزمان تولید لینک محلی خود را شروع می‌کند.",
      activeNodes: ['n0', 'n1']
    },
    {
      title: "۳. انتشار پیام FORWARD (گام ۲)",
      desc: "گره N1 پیام را می‌گیرد، آن را به N2 فوروارد می‌کند و تولید لینک‌های خود را آغاز می‌کند.",
      activeNodes: ['n1', 'n2']
    },
    {
      title: "۴. انتشار پیام FORWARD (گام ۳)",
      desc: "گره N2 پیام را به N3 می‌رساند. اکنون تمام گره‌های مسیر از درخواست آگاه شده‌اند (Triggered).",
      activeNodes: ['n2', 'n3']
    },
    {
      title: "۵. تولید لینک‌ها (Generation)",
      desc: "تمام لینک‌های فیزیکی به صورت موازی تولید می‌شوند. (خطوط زرد عمودی نشان‌دهنده درهم‌تنیدگی فیزیکی هستند).",
      activeNodes: ['n0', 'n1', 'n2', 'n3']
    },
    {
      title: "۶. عملیات سواپ (Swap)",
      desc: "تکرارگرهای N1 و N2 متوجه می‌شوند هر دو لینک چپ و راستشان آماده است. عملیات Swap انجام شده و رکورد آن ذخیره می‌شود.",
      activeNodes: ['n1', 'n2']
    },
    {
      title: "۷. شروع پیام‌های TRACK",
      desc: "گره‌های انتهایی (N0 و N3) که لینکشان آماده است، پیام TRACK را برای جمع‌آوری نتایج ارسال می‌کنند.",
      activeNodes: ['n0', 'n1', 'n2', 'n3']
    },
    {
      title: "۸. جمع‌آوری سوابق (Tracking)",
      desc: "پیام‌های TRACK در گره‌های میانی (N1, N2) توقف کرده، نتایج Swap را برمی‌دارند و به مسیر ادامه می‌دهند.",
      activeNodes: ['n1', 'n2']
    },
    {
      title: "۹. رسیدن به مقصد (Arrival)",
      desc: "پیام TRACK که از چپ آمده بود به راست می‌رسد (و بالعکس). حالا هر طرف تمام اطلاعات لازم را دارد.",
      activeNodes: ['n0', 'n3']
    },
    {
      title: "۱۰. تحویل به کاربر (Delivery)",
      desc: "گره N0 و N3 کیوبیت نهایی + شناسه + اطلاعات اصلاح را به آلیس و باب تحویل می‌دهند.",
      activeNodes: ['alice', 'bob']
    },
    {
      title: "۱۱. پیام COMPLETE",
      desc: "چرخه با موفقیت تمام شد. پیام COMPLETE برای آزادسازی منابع ارسال می‌شود.",
      activeNodes: []
    }
  ];

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStep(prev => {
          if (prev >= TOTAL_STEPS) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const handleNext = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const handlePrev = () => setStep(s => Math.max(s - 1, 0));
  const togglePlay = () => {
    if (step === TOTAL_STEPS) setStep(0);
    setIsPlaying(!isPlaying);
  };

  // --- Render Helpers ---
  
  const Node = ({ label, icon: Icon, isActive, type = 'node' }: any) => (
    <div className={`flex flex-col items-center z-20 transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100 opacity-70'}`}>
       <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-colors duration-300
         ${isActive 
            ? 'bg-slate-800 border-blue-400 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
            : 'bg-slate-900 border-slate-700 text-slate-600'
         }
       `}>
         <Icon size={20} />
       </div>
       <span className={`mt-2 text-[10px] font-bold px-2 py-0.5 rounded ${isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-500'}`}>
         {label}
       </span>
    </div>
  );

  const Packet = ({ show, fromX, toX, color, icon: Icon, label }: any) => {
    if (!show) return null;
    return (
      <div 
        className="absolute top-12 -translate-y-1/2 z-30 flex flex-col items-center transition-all duration-1000 ease-in-out"
        style={{ left: `${fromX}%`, transform: `translateX(${toX - fromX > 0 ? 0 : -100}%)` }} // Initial position logic is handled by parent re-render with different classes usually, but here we use a simpler approach for React
      >
        {/* We use CSS animation classes defined below for movement */}
      </div>
    );
  };

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-2xl my-8 select-none overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="bg-slate-900 p-4 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${isPlaying ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
             {isPlaying ? <Play size={18} className="animate-pulse"/> : <Pause size={18}/>}
          </div>
          <div>
            <h4 className="font-bold text-slate-200 text-sm">شبیه‌ساز تعاملی پروتکل (Interactive Sequence)</h4>
            <p className="text-[10px] text-slate-500">نمایش دقیق جریان پیام‌ها و تغییر وضعیت‌ها</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
           <button onClick={() => setStep(0)} className="p-2 hover:bg-slate-800 rounded text-slate-400 transition-colors"><RotateCcw size={14}/></button>
           <button onClick={handlePrev} disabled={step===0} className="p-2 hover:bg-slate-800 rounded text-slate-400 transition-colors disabled:opacity-30"><ChevronRight size={16}/></button>
           <span className="text-xs font-mono font-bold text-blue-400 w-16 text-center">T = {step}</span>
           <button onClick={handleNext} disabled={step===TOTAL_STEPS} className="p-2 hover:bg-slate-800 rounded text-slate-400 transition-colors disabled:opacity-30"><ChevronLeft size={16}/></button>
           <button onClick={togglePlay} className={`px-3 py-1.5 rounded text-xs font-bold ml-2 transition-colors ${isPlaying ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
             {isPlaying ? 'توقف' : 'پخش خودکار'}
           </button>
        </div>
      </div>

      {/* VISUAL STAGE */}
      <div className="relative h-[400px] bg-[radial-gradient(circle_at_center,#1e293b_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden">
         
         {/* Swimlanes */}
         <div className="absolute inset-0 flex justify-between px-16 pointer-events-none">
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className="w-px h-full bg-slate-800/50 border-r border-dashed border-slate-800"></div>
            ))}
         </div>

         {/* Nodes Row */}
         <div className="absolute top-8 left-0 right-0 flex justify-between px-16">
            <Node label="Alice" icon={User} isActive={step >= 1 && step <= 10} />
            <Node label="Node 0" icon={Laptop} isActive={step >= 2} />
            <Node label="Repeater 1" icon={Server} isActive={step >= 3} />
            <Node label="Repeater 2" icon={Server} isActive={step >= 4} />
            <Node label="Node 3" icon={Laptop} isActive={step >= 4} />
            <Node label="Bob" icon={User} isActive={step >= 10} />
         </div>

         {/* --- DYNAMIC ANIMATION LAYER --- */}
         <div className="absolute top-28 bottom-0 left-0 right-0 px-16">
            
            {/* 1. Request (Alice -> N0) */}
            <div className={`absolute top-0 transition-all duration-700 ease-out flex items-center gap-2
               ${step === 1 ? 'left-0 opacity-100 translate-x-0' : step > 1 ? 'left-[20%] opacity-0' : 'left-0 opacity-0 -translate-x-full'}
            `}>
               <div className="bg-slate-200 text-slate-900 text-[10px] font-bold px-2 py-1 rounded">REQ</div>
               <ArrowRight size={16} className="text-slate-400"/>
            </div>

            {/* 2,3,4. FORWARD Message Chain */}
            {/* N0 -> N1 */}
            <div className={`absolute top-8 transition-all duration-700 ease-linear
               ${step === 2 ? 'left-[20%] opacity-100 translate-x-0' : step > 2 ? 'left-[40%] opacity-0' : 'left-[20%] opacity-0'}
            `}>
               <div className="flex items-center gap-1 text-blue-400">
                  <div className="bg-blue-500/20 p-1 rounded border border-blue-500/50"><Mail size={14}/></div>
                  <span className="text-[9px] font-mono">FWD</span>
                  <ArrowRight size={12}/>
               </div>
            </div>
             {/* N1 -> N2 */}
            <div className={`absolute top-8 transition-all duration-700 ease-linear
               ${step === 3 ? 'left-[40%] opacity-100 translate-x-0' : step > 3 ? 'left-[60%] opacity-0' : 'left-[40%] opacity-0'}
            `}>
               <div className="flex items-center gap-1 text-blue-400">
                  <div className="bg-blue-500/20 p-1 rounded border border-blue-500/50"><Mail size={14}/></div>
                  <span className="text-[9px] font-mono">FWD</span>
                  <ArrowRight size={12}/>
               </div>
            </div>
             {/* N2 -> N3 */}
            <div className={`absolute top-8 transition-all duration-700 ease-linear
               ${step === 4 ? 'left-[60%] opacity-100 translate-x-0' : step > 4 ? 'left-[80%] opacity-0' : 'left-[60%] opacity-0'}
            `}>
               <div className="flex items-center gap-1 text-blue-400">
                  <div className="bg-blue-500/20 p-1 rounded border border-blue-500/50"><Mail size={14}/></div>
                  <span className="text-[9px] font-mono">FWD</span>
                  <ArrowRight size={12}/>
               </div>
            </div>

            {/* 5. Generation (Vertical Lines) */}
            <div className={`absolute top-20 w-full h-24 transition-all duration-500 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
               {/* Link 1 */}
               <div className="absolute left-[25%] h-full w-1 bg-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse"></div>
               {/* Link 2 */}
               <div className="absolute left-[50%] h-full w-1 bg-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse delay-75"></div>
               {/* Link 3 */}
               <div className="absolute left-[75%] h-full w-1 bg-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse delay-150"></div>
               {step === 5 && <div className="absolute w-full text-center text-yellow-500 text-[10px] font-bold mt-10 bg-slate-950/50">GENERATING ENTANGLEMENT...</div>}
            </div>

            {/* 6. Swap (Diamonds) */}
            {step >= 6 && (
               <>
                 <div className="absolute top-[120px] left-[40%] -translate-x-1/2 z-20 animate-[bounceIn_0.5s_ease-out]">
                    <div className="w-8 h-8 bg-purple-600 rotate-45 border-2 border-white flex items-center justify-center shadow-[0_0_20px_#9333ea]">
                       <GitMerge size={16} className="text-white -rotate-45" />
                    </div>
                 </div>
                 <div className="absolute top-[120px] left-[60%] -translate-x-1/2 z-20 animate-[bounceIn_0.5s_ease-out_0.1s_backwards]">
                    <div className="w-8 h-8 bg-purple-600 rotate-45 border-2 border-white flex items-center justify-center shadow-[0_0_20px_#9333ea]">
                       <GitMerge size={16} className="text-white -rotate-45" />
                    </div>
                 </div>
               </>
            )}

            {/* 7,8,9. TRACK Messages (Green) */}
            {/* Downstream: N0 -> N1 -> N2 -> N3 */}
            <div className={`absolute top-[160px] flex items-center gap-1 text-green-400 transition-all duration-700 ease-in-out
               ${step === 7 ? 'left-[20%]' : step === 8 ? 'left-[40%]' : step === 9 ? 'left-[60%]' : step > 9 ? 'left-[80%] opacity-0' : 'left-[20%] opacity-0'}
            `}>
               <div className="bg-green-500/20 p-1 rounded border border-green-500/50"><FileText size={14}/></div>
               {step === 8 && <div className="text-[8px] absolute -top-3 left-0 bg-purple-500 text-white px-1 rounded">+Swap1</div>}
               {step === 9 && <div className="text-[8px] absolute -top-3 left-0 bg-purple-500 text-white px-1 rounded">+Swap2</div>}
               <ArrowRight size={12}/>
            </div>

             {/* Upstream: N3 -> N2 -> N1 -> N0 */}
            <div className={`absolute top-[190px] flex items-center gap-1 text-green-400 flex-row-reverse transition-all duration-700 ease-in-out
               ${step === 7 ? 'left-[80%] -translate-x-full' : step === 8 ? 'left-[60%] -translate-x-full' : step === 9 ? 'left-[40%] -translate-x-full' : step > 9 ? 'left-[20%] opacity-0' : 'left-[80%] opacity-0'}
            `}>
               <div className="bg-green-500/20 p-1 rounded border border-green-500/50"><FileText size={14}/></div>
               {step === 8 && <div className="text-[8px] absolute -top-3 right-0 bg-purple-500 text-white px-1 rounded">+Swap2</div>}
               {step === 9 && <div className="text-[8px] absolute -top-3 right-0 bg-purple-500 text-white px-1 rounded">+Swap1</div>}
               <ArrowRight size={12} className="rotate-180"/>
            </div>

            {/* 10. Delivery */}
            {step >= 10 && (
               <>
                 <div className="absolute top-[220px] left-0 w-[20%] border-b-2 border-dotted border-green-500 animate-[growRight_0.5s_ease-out]"></div>
                 <div className="absolute top-[220px] right-0 w-[20%] border-b-2 border-dotted border-green-500 animate-[growLeft_0.5s_ease-out]"></div>
                 <div className="absolute top-[210px] left-[10%] text-green-400 text-[10px] font-bold">DELIVER</div>
                 <div className="absolute top-[210px] right-[10%] text-green-400 text-[10px] font-bold">DELIVER</div>
               </>
            )}

            {/* 11. COMPLETE */}
            {step === 11 && (
               <div className="absolute top-[260px] left-[20%] right-[20%] h-8 flex items-center justify-center animate-pulse">
                  <div className="bg-orange-500/20 text-orange-400 border border-orange-500/50 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                     <CheckCircle2 size={14} />
                     TRANSACTION COMPLETE
                  </div>
               </div>
            )}

         </div>

      </div>

      {/* Description Footer */}
      <div className="bg-slate-900 p-6 border-t border-slate-800">
         <div className="flex items-start gap-4">
             <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-inner">
               <h2 className="text-3xl font-bold text-blue-500 font-mono">{step}</h2>
             </div>
             <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-200 mb-1">{stepsInfo[step].title}</h3>
                <p className="text-sm text-slate-400 leading-7 text-justify border-l-2 border-slate-700 pl-4">
                   {stepsInfo[step].desc}
                </p>
             </div>
         </div>
         
         {/* Legend */}
         <div className="flex gap-4 mt-6 pt-4 border-t border-slate-800/50 text-[10px] text-slate-500">
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> پیام کلاسیک (Classic Msg)</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> لینک کوانتومی (Quantum Link)</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-500 rounded-full"></div> عملیات Swap</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> پیام Track + داده</div>
         </div>
      </div>
      
      <style>{`
         @keyframes bounceIn {
           0% { transform: translate(-50%, -50%) scale(0) rotate(45deg); opacity: 0; }
           60% { transform: translate(-50%, -50%) scale(1.2) rotate(45deg); opacity: 1; }
           100% { transform: translate(-50%, -50%) scale(1) rotate(45deg); }
         }
         @keyframes growRight { from { width: 0; } to { width: 20%; } }
         @keyframes growLeft { from { width: 0; } to { width: 20%; } }
      `}</style>
    </div>
  );
};
