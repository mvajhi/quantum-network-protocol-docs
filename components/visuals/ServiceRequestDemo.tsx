
import React, { useState, useEffect } from 'react';
import { Settings, Zap, Database, Activity, Gauge, AlertTriangle, CheckCircle2, XCircle, Info, Hash } from 'lucide-react';

export const ServiceRequestDemo: React.FC = () => {
  const [useCase, setUseCase] = useState<'measure' | 'create'>('measure');
  const [fidelity, setFidelity] = useState(0.80);
  const [deadline, setDeadline] = useState(500); // ms
  const [count, setCount] = useState(1);

  // --- Real-time Calculation Logic ---
  const calculateMetrics = () => {
    let stressScore = 0;
    let reasons: string[] = [];

    // 1. Fidelity Cost
    // Base cost: 0 to ~25
    const fidScore = (fidelity - 0.5) * 50; 
    stressScore += fidScore;
    
    // Hard penalty for > 0.9
    if (fidelity > 0.90) {
        stressScore += 30;
        reasons.push("کیفیت بالای ۹۰٪ نیاز به خالص‌سازی (Distillation) سنگین دارد.");
    }

    // 2. Time Pressure
    // Short deadline = high stress.
    // 50ms -> 80 points
    // 500ms -> 8 points
    const timePressure = 4000 / Math.max(deadline, 10); 
    stressScore += timePressure;

    if (deadline < 100) {
        reasons.push("مهلت زمانی بسیار کوتاه است (فشار بر نرخ تولید).");
    }

    // 3. Count (Quantity) Cost
    // Generating more pairs takes more time or parallel resources
    const quantityCost = count * 1.5;
    stressScore += quantityCost;

    if (count > 10) {
       reasons.push("تعداد زیاد جفت‌ها پهنای باند شبکه را اشغال می‌کند.");
    }

    // 4. Memory Penalty (Use Case)
    if (useCase === 'create') {
        // Holding qubits in memory adds decoherence risk per qubit
        const memCost = count * 3; 
        stressScore += memCost;
        reasons.push("حالت «ذخیره‌سازی» به دلیل ناهمدوسی حافظه، هزینه بالایی دارد.");
    }

    // Cap for visualization
    // Let's say max meaningful score is 150
    const visualScore = Math.min(150, Math.max(0, stressScore));
    
    // Determine Status
    let status: 'success' | 'warning' | 'failure' = 'success';
    let statusText = "درخواست قابل انجام است.";
    
    if (visualScore > 120) {
        status = 'failure';
        statusText = "غیرممکن! منابع کافی نیست.";
    } else if (visualScore > 75) {
        status = 'warning';
        statusText = "ریسک بالا (لبه تیغ).";
    } else {
        status = 'success';
        statusText = "وضعیت پایدار.";
    }

    return { score: visualScore, status, statusText, reasons };
  };

  const metrics = calculateMetrics();

  const getScoreColor = (score: number) => {
      if (score > 120) return 'text-red-500';
      if (score > 75) return 'text-orange-500';
      return 'text-green-500';
  };
  
  const getBarColor = (score: number) => {
      if (score > 120) return 'bg-red-500';
      if (score > 75) return 'bg-orange-500';
      return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl my-10 overflow-hidden flex flex-col lg:flex-row">
      
      {/* Left: Controls Panel */}
      <div className="flex-1 p-6 bg-slate-50/80 border-b lg:border-b-0 lg:border-l border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-white p-2 rounded-lg border border-slate-200 text-blue-600 shadow-sm">
            <Settings size={20} />
          </div>
          <h4 className="font-black text-slate-800 text-base">تنظیمات درخواست</h4>
        </div>

        <div className="space-y-6">
          
          {/* Use Case */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">نوع کاربرد</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setUseCase('measure')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  useCase === 'measure' ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Zap size={16}/> Measure Directly
              </button>
              <button
                onClick={() => setUseCase('create')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  useCase === 'create' ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Database size={16}/> Create & Keep
              </button>
            </div>
          </div>

          {/* Count */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
             <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                   <Hash size={12}/> تعداد جفت‌ها
                </label>
                <span className="text-sm font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{count}</span>
             </div>
             <input 
               type="range" min="1" max="50" step="1"
               value={count} onChange={(e) => setCount(parseInt(e.target.value))}
               className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-slate-600"
             />
          </div>

          {/* Fidelity */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                 <Gauge size={12}/> حداقل فیدلیتی
              </label>
              <span className={`text-sm font-bold px-2 py-0.5 rounded ${fidelity > 0.9 ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'}`}>
                  {(fidelity * 100).toFixed(0)}%
              </span>
            </div>
            <input 
              type="range" min="0.50" max="0.99" step="0.01" 
              value={fidelity} onChange={(e) => setFidelity(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Deadline */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                   <Activity size={12}/> مهلت زمانی
                </label>
                <span className="text-sm font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{deadline} ms</span>
            </div>
            <input 
                type="range" min="50" max="2000" step="50"
                value={deadline} onChange={(e) => setDeadline(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-green-600"
            />
          </div>

        </div>
      </div>

      {/* Right: Dashboard */}
      <div className="w-full lg:w-[45%] bg-slate-900 p-8 text-white flex flex-col relative overflow-hidden">
         {/* Glow */}
         <div className={`absolute top-[-50%] right-[-50%] w-[100%] h-[100%] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-500 ${getBarColor(metrics.score)}`}></div>

         <div className="flex items-center gap-2 mb-8 opacity-70">
             <Activity size={18} />
             <span className="text-xs font-bold uppercase tracking-widest">Feasibility Analysis</span>
         </div>

         <div className="flex-1 flex flex-col items-center justify-center relative z-10">
             
             {/* SVG Gauge */}
             <div className="relative w-64 h-32 mb-6 overflow-hidden">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                   {/* Background Arc */}
                   <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#334155" strokeWidth="20" strokeLinecap="round" />
                   
                   {/* Colored Sections for reference */}
                   {/* Green zone 0-75 (0 to 45% of arc) */}
                   <path d="M 20 100 A 80 80 0 0 1 90 38" fill="none" stroke="#22c55e" strokeWidth="4" strokeOpacity="0.2" />
                   
                   {/* Active Arc */}
                   {/* Map score 0-150 to angle 0-180 (approx) */}
                   {/* Start angle is -180 (left) to 0 (right) in SVG coord system if we use circle... 
                       Simpler: pathLength=100. 
                       Total length of semi-circle r=80 is pi*80 approx 251.
                   */}
                   <path 
                      d="M 20 100 A 80 80 0 0 1 180 100" 
                      fill="none" 
                      stroke={metrics.status === 'failure' ? '#ef4444' : metrics.status === 'warning' ? '#f97316' : '#22c55e'} 
                      strokeWidth="20" 
                      strokeLinecap="round"
                      strokeDasharray={`${(metrics.score / 150) * 251}, 251`} // 251 is approx length of arc
                      className="transition-all duration-700 ease-out"
                   />
                </svg>
                
                {/* Needle / Value Text */}
                <div className="absolute bottom-0 left-0 right-0 text-center">
                   <div className={`text-4xl font-black tracking-tighter ${getScoreColor(metrics.score)}`}>
                      {Math.round(metrics.score)}
                   </div>
                   <div className="text-[10px] text-slate-500 font-bold uppercase">Network Load Score</div>
                </div>
             </div>

             <div className={`w-full text-center p-4 rounded-xl border-2 bg-slate-800/50 backdrop-blur-sm transition-colors duration-300 ${
                 metrics.status === 'failure' ? 'border-red-500/50 text-red-400' :
                 metrics.status === 'warning' ? 'border-orange-500/50 text-orange-400' :
                 'border-green-500/50 text-green-400'
             }`}>
                 <div className="flex items-center justify-center gap-2 font-bold text-lg mb-1">
                    {metrics.status === 'failure' ? <XCircle /> : metrics.status === 'warning' ? <AlertTriangle /> : <CheckCircle2 />}
                    {metrics.statusText}
                 </div>
             </div>

             <div className="w-full mt-6 space-y-2">
                 {metrics.reasons.length > 0 ? (
                    metrics.reasons.map((r, i) => (
                        <div key={i} className="text-xs text-slate-300 flex gap-2 items-start bg-slate-800 p-2 rounded">
                           <Info size={14} className="shrink-0 mt-0.5 text-blue-400"/>
                           <span>{r}</span>
                        </div>
                    ))
                 ) : (
                    <div className="text-center text-xs text-slate-500 italic py-2">هیچ مانع خاصی وجود ندارد.</div>
                 )}
             </div>

         </div>
      </div>
    </div>
  );
};
