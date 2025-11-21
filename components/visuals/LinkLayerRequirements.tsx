
import React from 'react';
import { Tag, Fingerprint, Atom, Sliders } from 'lucide-react';

export const LinkLayerRequirements: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      
      {/* Requirement 1 */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
         <div className="flex items-start justify-between mb-3">
            <div className="bg-blue-100 text-blue-600 p-2.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Tag size={20} />
            </div>
            <span className="text-xs font-bold text-slate-300">REQ-1</span>
         </div>
         <h5 className="font-bold text-slate-800 text-sm mb-2">شناسه درخواست (Request ID)</h5>
         <p className="text-xs text-slate-500 leading-5 text-justify">
           هر درخواست باید یک شناسه یکتا داشته باشد که همراه تمام کیوبیت‌های تحویلی (در هر دو سر لینک) ارسال شود. این به لایه شبکه اجازه می‌دهد بفهمد کدام کیوبیت متعلق به کدام درخواست است.
         </p>
      </div>

      {/* Requirement 2 */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
         <div className="flex items-start justify-between mb-3">
            <div className="bg-purple-100 text-purple-600 p-2.5 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Fingerprint size={20} />
            </div>
            <span className="text-xs font-bold text-slate-300">REQ-2</span>
         </div>
         <h5 className="font-bold text-slate-800 text-sm mb-2">شناسه جفت (Pair ID)</h5>
         <p className="text-xs text-slate-500 leading-5 text-justify">
           هر جفت تولید شده در یک درخواست باید یک شناسه منحصر‌به‌فرد داخلی داشته باشد. این برای ردیابی درهم‌تنیدگی (Entanglement Tracking) ضروری است تا جفت‌ها با هم قاطی نشوند.
         </p>
      </div>

      {/* Requirement 3 */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
         <div className="flex items-start justify-between mb-3">
            <div className="bg-green-100 text-green-600 p-2.5 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Atom size={20} />
            </div>
            <span className="text-xs font-bold text-slate-300">REQ-3</span>
         </div>
         <h5 className="font-bold text-slate-800 text-sm mb-2">حالت بل (Bell State)</h5>
         <p className="text-xs text-slate-500 leading-5 text-justify">
           لایه لینک باید به لایه شبکه اطلاع دهد که کیوبیت‌های تحویلی در کدام یک از ۴ حالت بل هستند. این اطلاعات برای محاسبه حالت نهایی End-to-End حیاتی است.
         </p>
      </div>

      {/* Requirement 4 */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
         <div className="flex items-start justify-between mb-3">
            <div className="bg-orange-100 text-orange-600 p-2.5 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Sliders size={20} />
            </div>
            <span className="text-xs font-bold text-slate-300">REQ-4</span>
         </div>
         <h5 className="font-bold text-slate-800 text-sm mb-2">پارامترهای کیفیت (QoS)</h5>
         <p className="text-xs text-slate-500 leading-5 text-justify">
           درخواست‌کننده (لایه شبکه) باید بتواند حداقل فیدلیتی و محدودیت‌های زمانی را مشخص کند. این به لایه شبکه اجازه می‌دهد کیفیت سرویس خود را تنظیم کند.
         </p>
      </div>

    </div>
  );
};
