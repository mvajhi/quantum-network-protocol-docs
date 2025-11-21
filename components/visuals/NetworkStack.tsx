
import React from 'react';

export const NetworkStack: React.FC = () => {
  return (
    <div className="max-w-md mx-auto my-8 font-sans select-none">
      {/* Header */}
      <div className="bg-blue-100 border border-blue-200 text-blue-900 font-black text-center py-3 rounded-t-xl text-xl shadow-sm">
        Application
      </div>

      {/* Stack Container */}
      <div className="flex flex-col shadow-lg rounded-b-xl overflow-hidden border-x border-b border-slate-200">
        
        {/* Transport Layer */}
        <div className="flex h-14 border-b border-white/20">
          <div className="w-1/3 bg-green-200/80 flex items-center justify-center font-bold text-green-900 border-r border-white/50">
            Transport
          </div>
          <div className="w-2/3 bg-green-100 flex items-center justify-center text-green-800 font-medium">
            Qubit transmission
          </div>
        </div>

        {/* Network Layer */}
        <div className="flex h-14 border-b border-white/20">
          <div className="w-1/3 bg-yellow-200/80 flex items-center justify-center font-bold text-yellow-900 border-r border-white/50">
            Network
          </div>
          <div className="w-2/3 bg-yellow-50 flex items-center justify-center text-yellow-800 font-medium">
            Long distance entanglement
          </div>
        </div>

        {/* Link Layer */}
        <div className="flex h-14 border-b border-white/20">
          <div className="w-1/3 bg-orange-200/80 flex items-center justify-center font-bold text-orange-900 border-r border-white/50">
            Link
          </div>
          <div className="w-2/3 bg-orange-50 flex items-center justify-center text-orange-800 font-medium text-sm">
            Robust entanglement generation
          </div>
        </div>

        {/* Physical Layer */}
        <div className="flex h-14">
          <div className="w-1/3 bg-red-200/80 flex items-center justify-center font-bold text-red-900 border-r border-white/50">
            Physical
          </div>
          <div className="w-2/3 bg-red-50 flex items-center justify-center text-red-800 font-medium text-sm">
            Attempt entanglement generation
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-4 text-center text-xs text-slate-500 bg-slate-50 p-3 rounded border border-slate-100">
        <strong>شکل ۲:</strong> تخصیص عملکردی در پشته شبکه کوانتومی. این ساختار از پشته TCP/IP الهام گرفته شده است.
      </div>
    </div>
  );
};
