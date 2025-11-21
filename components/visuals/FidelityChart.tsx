
import React, { useState } from 'react';
import { Gauge, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const FidelityChart: React.FC = () => {
  const [fidelity, setFidelity] = useState(0.9);

  // Helper to determine status based on value
  const getStatus = (val: number) => {
    if (val === 1) return { label: "کاملاً خالص (Perfect)", color: "text-green-600", bg: "bg-green-500" };
    if (val >= 0.8) return { label: "مناسب برای QKD", color: "text-green-500", bg: "bg-green-400" };
    if (val > 0.5) return { label: "دارای نویز (Noisy)", color: "text-yellow-500", bg: "bg-yellow-400" };
    return { label: "غیرقابل استفاده (Useless)", color: "text-red-500", bg: "bg-red-500" };
  };

  const status = getStatus(fidelity);

  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border border-slate-700 my-6">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        
        {/* Control Section */}
        <div className="flex-1 w-full">
          <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-300">
            <Gauge size={20} />
            مفهوم فیدلیتی (Fidelity)
          </h4>
          <p className="text-slate-400 text-sm mb-6 text-justify leading-6">
            برخلاف شبکه کلاسیک که داده یا ۰ است یا ۱، کیفیت حالت کوانتومی با عددی پیوسته بین ۰ تا ۱ سنجیده می‌شود.
            اسلایدر زیر را حرکت دهید تا تاثیر آن را ببینید.
          </p>
          
          <div className="mb-2 flex justify-between text-xs font-mono text-slate-500">
            <span>0.0 (Random)</span>
            <span>0.5 (Limit)</span>
            <span>0.8 (QKD)</span>
            <span>1.0 (Perfect)</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={fidelity}
            onChange={(e) => setFidelity(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          
          <div className="mt-6 p-4 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-between">
            <span className="text-slate-400 text-sm">مقدار فیدلیتی:</span>
            <span className={`text-2xl font-bold font-mono ${status.color}`}>{fidelity.toFixed(2)}</span>
          </div>
        </div>

        {/* Visualization Section */}
        <div className="flex-1 w-full flex flex-col items-center justify-center">
           <div className={`relative w-40 h-40 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${fidelity < 0.5 ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : fidelity < 0.8 ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]'}`}>
              
              {/* Inner Circle representing the state purity */}
              <div 
                className={`w-full h-full rounded-full transition-all duration-300 ${status.bg}`}
                style={{ 
                  opacity: Math.max(0.1, (fidelity - 0.4) * 1.6), // Fade out as fidelity drops
                  transform: `scale(${0.5 + (fidelity * 0.5)})` // Shrink as fidelity drops
                }}
              ></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 drop-shadow-md">
                 {fidelity < 0.5 ? <XCircle size={48} className="text-white" /> : 
                  fidelity < 0.8 ? <AlertTriangle size={48} className="text-white" /> :
                  <CheckCircle size={48} className="text-white" />
                 }
              </div>
           </div>

           <div className="mt-4 text-center">
             <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${status.bg} text-slate-900`}>
               {status.label}
             </div>
             <p className="text-xs text-slate-400 mt-2 h-10">
               {fidelity === 1 && "حالت دقیقاً همان چیزی است که می‌خواهیم."}
               {fidelity >= 0.8 && fidelity < 1 && "کمی نویز دارد اما برای اکثر برنامه‌ها (مثل رمزنگاری) قابل قبول است."}
               {fidelity > 0.5 && fidelity < 0.8 && "نویز زیاد است. ممکن است نیاز به تصحیح خطا یا خالص‌سازی (Purification) باشد."}
               {fidelity <= 0.5 && "اطلاعات کاملاً از دست رفته است. هیچ فرقی با نویز تصادفی ندارد."}
             </p>
           </div>
        </div>

      </div>
    </div>
  );
};