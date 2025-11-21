
import React, { useState, useEffect } from 'react';
import { Play, Zap, Database, Clock, ShieldCheck, HardDrive, Activity } from 'lucide-react';

export const UseCaseComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'measure' | 'create'>('measure');
  const [items, setItems] = useState<any[]>([]);
  const [measureCount, setMeasureCount] = useState(0);

  // Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prevItems => {
        const now = Date.now();
        let newItems = [...prevItems];

        // Add new item occasionally
        if (Math.random() > 0.6) {
          newItems.push({ id: now, created: now, status: 'fresh' });
        }

        if (activeTab === 'measure') {
          // Measure Directly: Items disappear quickly (consumed)
          newItems = newItems.filter(item => {
            if (now - item.created > 800) {
              setMeasureCount(c => c + 1);
              return false; // Consumed
            }
            return true;
          });
        } else {
          // Create and Keep: Items stay, but age (turn red)
          newItems = newItems.map(item => {
            const age = now - item.created;
            if (age > 3000) return { ...item, status: 'dead' }; // Decohered
            if (age > 1500) return { ...item, status: 'decaying' }; // Warning
            return item;
          });
          // Keep max 6 items to prevent overflow in visualization
          if (newItems.length > 6) newItems.shift();
        }

        return newItems;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Reset when switching tabs
  useEffect(() => {
    setItems([]);
    setMeasureCount(0);
  }, [activeTab]);

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-xl my-8 select-none">
      
      {/* Tabs Header */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('measure')}
          className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
            activeTab === 'measure' 
              ? 'bg-slate-800 text-blue-400 border-b-2 border-blue-400' 
              : 'bg-slate-900 text-slate-500 hover:text-slate-300'
          }`}
        >
          <Zap size={18} />
          ۱. اندازه‌گیری مستقیم (Measure Directly)
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
            activeTab === 'create' 
              ? 'bg-slate-800 text-orange-400 border-b-2 border-orange-400' 
              : 'bg-slate-900 text-slate-500 hover:text-slate-300'
          }`}
        >
          <Database size={18} />
          ۲. ایجاد و نگهداری (Create and Keep)
        </button>
      </div>

      {/* Visualization Content */}
      <div className="p-8 min-h-[300px] relative">
        
        {/* Info Overlay */}
        <div className="absolute top-4 right-4 text-xs text-slate-500 font-mono border border-slate-700 rounded p-2 bg-slate-800/50">
           {activeTab === 'measure' ? (
             <>
               <div>نرخ مصرف: بالا</div>
               <div>حساسیت به تاخیر: کم</div>
               <div className="text-green-400 mt-1">تعداد مصرف شده: {measureCount}</div>
             </>
           ) : (
             <>
               <div>نیاز به حافظه: دارد</div>
               <div>حساسیت به ناهمدوسی: شدید</div>
               <div className="text-orange-400 mt-1">تعداد در حافظه: {items.length}</div>
             </>
           )}
        </div>

        {/* Central Animation Area */}
        <div className="flex flex-col items-center justify-center mt-8 gap-8">
          
          {/* Source */}
          <div className="flex flex-col items-center">
             <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-white border border-slate-600">
               منبع
             </div>
             <div className="h-8 w-0.5 bg-slate-600"></div>
          </div>

          {/* Buffer / Memory Area */}
          <div className={`w-full max-w-md h-24 rounded-xl border-2 flex items-center justify-center gap-4 px-4 relative transition-colors duration-500 ${
             activeTab === 'create' ? 'bg-slate-800/50 border-slate-600' : 'bg-transparent border-dashed border-slate-700'
          }`}>
             <span className="absolute -top-3 bg-slate-900 px-2 text-xs text-slate-500">
               {activeTab === 'create' ? 'حافظه کوانتومی (Quantum Memory)' : 'محل عبور (بدون ذخیره)'}
             </span>

             {/* Items */}
             {items.map((item) => (
               <div 
                  key={item.id}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 animate-bounce-slight
                    ${activeTab === 'measure' ? 'bg-blue-500 scale-100 opacity-100' : ''}
                    ${item.status === 'fresh' && activeTab === 'create' ? 'bg-green-500' : ''}
                    ${item.status === 'decaying' && activeTab === 'create' ? 'bg-yellow-500 animate-pulse' : ''}
                    ${item.status === 'dead' && activeTab === 'create' ? 'bg-red-900 opacity-50' : ''}
                  `}
               >
                 {activeTab === 'measure' ? <Activity size={16} className="text-white"/> : <Clock size={16} className="text-white"/>}
               </div>
             ))}

             {items.length === 0 && (
               <span className="text-slate-600 text-xs italic">در حال انتظار...</span>
             )}
          </div>

          {/* Application / Consumer */}
          <div className="flex flex-col items-center w-full">
             <div className="h-8 w-0.5 bg-slate-600"></div>
             <div className={`w-full p-4 rounded-lg border flex items-center gap-4 transition-colors ${
                activeTab === 'measure' ? 'bg-blue-900/20 border-blue-800' : 'bg-orange-900/20 border-orange-800'
             }`}>
                <div className={`p-3 rounded-full ${activeTab === 'measure' ? 'bg-blue-800 text-blue-300' : 'bg-orange-800 text-orange-300'}`}>
                   {activeTab === 'measure' ? <ShieldCheck size={24} /> : <HardDrive size={24} />}
                </div>
                <div className="flex-1">
                   <h4 className={`font-bold text-sm mb-1 ${activeTab === 'measure' ? 'text-blue-300' : 'text-orange-300'}`}>
                      {activeTab === 'measure' ? 'کاربرد: رمزنگاری (QKD)' : 'کاربرد: محاسبات توزیع‌شده'}
                   </h4>
                   <p className="text-xs text-slate-400 leading-5">
                      {activeTab === 'measure' 
                        ? 'جفت‌ها به محض رسیدن اندازه‌گیری شده و کلید تولید می‌شود. نیازی به ذخیره نیست.' 
                        : 'نیاز به جمع‌آوری چندین جفت همزمان برای انجام عملیات پیچیده. خطر از دست رفتن اطلاعات بالاست.'}
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
};