
import React, { useState, useEffect } from 'react';
import { User, Laptop, Server, ArrowLeft, GitMerge, Mail, CheckCircle2, Zap } from 'lucide-react';

// --- Common Node Component ---
const NodeItem = ({ label, icon: Icon, active, color = "blue" }: any) => (
  <div className={`flex flex-col items-center z-10 transition-all duration-500 ${active ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}`}>
    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border-2 shadow-sm transition-colors duration-300
      ${active 
         ? `bg-slate-800 border-${color}-400 text-${color}-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]` 
         : 'bg-slate-50 border-slate-300 text-slate-400'
      }
    `}>
      <Icon size={20} />
    </div>
    <span className="mt-2 text-[10px] font-bold text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
      {label}
    </span>
  </div>
);

// --- PHASE 1: FORWARD (Request) ---
export const PhaseForward: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep(s => (s + 1) % 5), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-100 p-6 rounded-xl border border-slate-300 my-6 select-none" dir="rtl">
      <div className="flex justify-between items-center mb-8 px-4 md:px-12 relative">
        {/* Connecting Line */}
        <div className="absolute top-6 left-12 right-12 h-0.5 bg-slate-300 -z-0"></div>

        {/* Nodes (Right to Left) */}
        <NodeItem label="آلیس" icon={User} active={step >= 0} color="blue" />
        <NodeItem label="گره ۰" icon={Laptop} active={step >= 1} color="blue" />
        <NodeItem label="تکرارگر ۱" icon={Server} active={step >= 2} color="blue" />
        <NodeItem label="تکرارگر ۲" icon={Server} active={step >= 3} color="blue" />
        <NodeItem label="گره ۳" icon={Laptop} active={step >= 4} color="blue" />
      </div>

      {/* Animation Layer */}
      <div className="relative h-16 overflow-hidden">
         <div className="absolute top-0 right-0 w-full text-center">
            {step === 0 && <span className="text-xs font-bold text-slate-500 animate-pulse">آلیس درخواست می‌دهد...</span>}
            {step === 1 && <span className="text-xs font-bold text-blue-600">پیام FORWARD به گره ۰ رسید</span>}
            {step === 2 && <span className="text-xs font-bold text-blue-600">فوروارد به تکرارگر ۱ + شروع تولید لینک</span>}
            {step === 3 && <span className="text-xs font-bold text-blue-600">فوروارد به تکرارگر ۲ + شروع تولید لینک</span>}
            {step === 4 && <span className="text-xs font-bold text-green-600">رسید به گره ۳ (پایان مسیر)</span>}
         </div>

         {/* Moving Packet (Right to Left) */}
         {step > 0 && step < 5 && (
           <div 
             className="absolute top-6 flex items-center gap-2 text-blue-500 transition-all duration-1000 ease-linear"
             style={{ right: `${(step) * 20}%`, transform: 'translateX(50%)' }}
           >
             <div className="bg-blue-100 p-1.5 rounded-lg border border-blue-300 shadow-sm">
               <Mail size={16} />
             </div>
             <ArrowLeft size={16} />
           </div>
         )}
      </div>
      <div className="text-center text-[10px] text-slate-400 mt-2">
        نمایش جریان پیام FORWARD از راست به چپ
      </div>
    </div>
  );
};

// --- PHASE 2: GENERATION & SWAP ---
export const PhaseSwap: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep(s => (s + 1) % 3), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 my-6 select-none text-white" dir="rtl">
       <div className="flex justify-between items-center mb-12 px-4 md:px-12 relative min-h-[100px]">
        
        {/* Nodes */}
        <NodeItem label="گره ۰" icon={Laptop} active={true} color="slate" />
        <NodeItem label="تکرارگر ۱" icon={Server} active={true} color="purple" />
        <NodeItem label="تکرارگر ۲" icon={Server} active={true} color="purple" />
        <NodeItem label="گره ۳" icon={Laptop} active={true} color="slate" />

        {/* Links (Always visible/generating) */}
        <div className="absolute top-6 left-[12%] right-[12%] h-0.5 bg-slate-700 -z-0 flex justify-around items-center">
           {/* Link 1 */}
           <div className={`w-1/3 h-1 relative ${step >= 0 ? 'bg-yellow-500 shadow-[0_0_10px_orange]' : 'bg-slate-700'}`}>
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-yellow-500 animate-pulse">Link Gen</div>
           </div>
           {/* Link 2 */}
           <div className={`w-1/3 h-1 relative ${step >= 0 ? 'bg-yellow-500 shadow-[0_0_10px_orange]' : 'bg-slate-700'}`}></div>
           {/* Link 3 */}
           <div className={`w-1/3 h-1 relative ${step >= 0 ? 'bg-yellow-500 shadow-[0_0_10px_orange]' : 'bg-slate-700'}`}></div>
        </div>

        {/* Swaps happening at Repeaters */}
        {step >= 1 && (
          <>
            <div className="absolute top-6 right-[33%] -translate-y-1/2 z-20 animate-[bounceIn_0.5s_ease-out]">
               <div className="bg-purple-600 p-2 rounded-full border-2 border-white shadow-lg">
                 <GitMerge size={20} className="text-white" />
               </div>
            </div>
            <div className="absolute top-6 left-[33%] -translate-y-1/2 z-20 animate-[bounceIn_0.5s_ease-out_0.2s_backwards]">
               <div className="bg-purple-600 p-2 rounded-full border-2 border-white shadow-lg">
                 <GitMerge size={20} className="text-white" />
               </div>
            </div>
          </>
        )}

      </div>
      
      <div className="text-center h-8">
         {step === 0 && <span className="text-xs text-slate-400">1. تولید موازی لینک‌ها در تمام مسیر...</span>}
         {step === 1 && <span className="text-xs font-bold text-purple-400">2. انجام عملیات Swap در تکرارگرها (مستقل از هم)</span>}
         {step === 2 && <span className="text-xs font-bold text-green-400">3. ثبت نتایج در حافظه تکرارگر</span>}
      </div>

      <style>{`
         @keyframes bounceIn {
           0% { transform: translate(0, -50%) scale(0); }
           60% { transform: translate(0, -50%) scale(1.2); }
           100% { transform: translate(0, -50%) scale(1); }
         }
      `}</style>
    </div>
  );
};

// --- PHASE 3: TRACKING ---
export const PhaseTrack: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep(s => (s + 1) % 5), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-green-50 p-6 rounded-xl border border-green-200 my-6 select-none" dir="rtl">
      <div className="flex justify-between items-center mb-8 px-4 md:px-12 relative">
        
        {/* Nodes */}
        <NodeItem label="گره ۰" icon={Laptop} active={true} color="slate" />
        <NodeItem label="تکرارگر ۱" icon={Server} active={true} color="slate" />
        <NodeItem label="تکرارگر ۲" icon={Server} active={true} color="slate" />
        <NodeItem label="گره ۳" icon={Laptop} active={true} color="slate" />

        {/* Background Path */}
        <div className="absolute top-6 left-12 right-12 h-0.5 bg-green-200 -z-0"></div>

        {/* TRACK Messages Moving Towards Ends (Or across) */}
        {/* Based on paper: Each end-node initiates a TRACK. They proceed along the circuit. */}
        {/* So: N0 -> N1 -> N2 -> N3  AND  N3 -> N2 -> N1 -> N0 */}
        
        {step > 0 && step < 4 && (
           <>
             {/* Message going Left (N0 -> N3) */}
             <div className="absolute top-0 transition-all duration-1000 ease-linear flex flex-col items-center gap-1"
                  style={{ right: `${step * 25}%`, transform: 'translateX(50%)' }}>
                <div className="bg-green-500 text-white p-1.5 rounded shadow-lg flex items-center gap-1">
                   <Mail size={12} />
                   <span className="text-[8px] font-bold">TRACK</span>
                </div>
                <ArrowLeft size={12} className="text-green-600"/>
             </div>

             {/* Message going Right (N3 -> N0) */}
             <div className="absolute top-12 transition-all duration-1000 ease-linear flex flex-col items-center gap-1"
                  style={{ left: `${step * 25}%`, transform: 'translateX(-50%)' }}>
                 <div className="bg-green-500 text-white p-1.5 rounded shadow-lg flex items-center gap-1">
                   <span className="text-[8px] font-bold">TRACK</span>
                   <Mail size={12} />
                </div>
                {/* Arrow Right (flipped Left icon) */}
                <ArrowLeft size={12} className="text-green-600 rotate-180"/>
             </div>
           </>
        )}

        {/* Delivery at ends */}
        {step === 4 && (
           <>
             <div className="absolute top-4 right-0 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold animate-bounce">
               تحویل داده!
             </div>
             <div className="absolute top-4 left-0 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold animate-bounce">
               تحویل داده!
             </div>
           </>
        )}

      </div>
      <div className="text-center text-[10px] text-green-800 mt-4">
         جمع‌آوری نتایج Swap توسط پیام‌های TRACK از دو سمت
      </div>
    </div>
  );
};
