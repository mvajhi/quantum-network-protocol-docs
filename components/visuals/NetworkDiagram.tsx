import React from 'react';
import { Laptop, Router as RouterIcon, CircleDot } from 'lucide-react';

// --- Icon Components ---

const HybridRouterIcon = () => (
  <div className="relative w-14 h-14 flex flex-col items-center justify-center z-20 group cursor-pointer transition-transform hover:scale-110">
    {/* Classical Plane (Top - Blue) */}
    <div className="w-10 h-4 bg-blue-500 rounded-t-lg border border-blue-600 relative z-20 flex items-center justify-center">
      <div className="w-8 h-0.5 bg-blue-300/50"></div>
    </div>
    
    {/* Icon Center */}
    <div className="w-10 h-6 bg-gradient-to-b from-blue-600 to-purple-600 border-x border-slate-700 relative z-10 flex items-center justify-center">
      <RouterIcon size={16} className="text-white" />
    </div>

    {/* Quantum Plane (Bottom - Purple) */}
    <div className="w-10 h-4 bg-purple-500 rounded-b-lg border border-purple-600 relative z-20 shadow-lg flex items-center justify-center">
      <div className="w-8 h-0.5 bg-purple-300/50"></div>
    </div>
    
    {/* Tooltip */}
    <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      روتر هیبریدی (کلاسیک + کوانتومی)
    </div>
  </div>
);

const ClassicalRouterIcon = () => (
  <div className="relative w-14 h-14 flex flex-col items-center justify-center z-20 group cursor-pointer transition-transform hover:scale-110">
    <div className="w-10 h-4 bg-blue-400 rounded-t-lg border border-blue-500 relative z-20"></div>
    <div className="w-10 h-6 bg-blue-500 border-x border-blue-600 relative z-10 flex items-center justify-center">
        <RouterIcon size={16} className="text-white" />
    </div>
    <div className="w-10 h-4 bg-blue-600 rounded-b-lg border border-blue-700 relative z-20 shadow-lg"></div>
    
    <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      روتر کلاسیک
    </div>
  </div>
);

const EndNodeIcon = ({ label, align = 'center' }: { label: string, align?: 'left' | 'right' | 'center' }) => (
  <div className={`flex flex-col items-center z-20 group relative ${align === 'left' ? 'items-start' : align === 'right' ? 'items-end' : ''}`}>
    <div className="w-12 h-12 bg-white rounded-lg border-2 border-slate-200 shadow-sm flex items-center justify-center relative z-10">
      <Laptop size={24} className="text-slate-700" />
    </div>
    <span className="mt-1 text-[10px] font-bold text-slate-600 bg-white/80 px-1 rounded backdrop-blur-sm border border-slate-100">{label}</span>
  </div>
);

const RepeaterNode = () => (
  <div className="w-3 h-3 bg-purple-400 rounded-full border-2 border-white shadow-sm relative z-10 group">
     <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-slate-800 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      تکرارگر کوانتومی
    </div>
  </div>
);

export const NetworkDiagram: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 my-8 select-none shadow-inner">
      
      {/* Diagram Area */}
      <div className="relative w-full aspect-[16/9] md:h-[450px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
        
        {/* Public Internetwork Cloud Area */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[70%] h-[70%] bg-blue-50/80 rounded-[100px] border-2 border-dashed border-blue-200 blur-xl absolute transform translate-y-4"></div>
            <div className="w-[65%] h-[65%] rounded-[80px] border-2 border-dashed border-blue-200/50 absolute transform translate-y-4"></div>
            <span className="absolute top-[18%] text-blue-300 font-bold text-xs md:text-sm tracking-[0.2em] uppercase z-0">Public Internetwork</span>
        </div>

        {/* --- SVG Connections Layer --- */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            {/* Gradients/Patterns could go here */}
          </defs>

          {/* === Classical Links (Blue Lines) === */}
          {/* Style: Solid Blue, thicker */}
          <g stroke="#3b82f6" strokeWidth="2.5" fill="none">
            {/* Left Node -> Left Hybrid Router */}
            <line x1="12%" y1="48%" x2="28%" y2="48%" />
            
            {/* Left Hybrid -> Top Right Hybrid */}
            <line x1="32%" y1="46%" x2="68%" y2="28%" />
            
            {/* Left Hybrid -> Bottom Middle Classical */}
            <line x1="32%" y1="50%" x2="48%" y2="72%" />
            
            {/* Bottom Middle Classical -> Bottom Right Hybrid */}
            <line x1="52%" y1="74%" x2="68%" y2="62%" />
            
            {/* Top Right Hybrid -> Bottom Right Hybrid */}
            <line x1="70%" y1="32%" x2="70%" y2="58%" />
            
            {/* Top Right Hybrid -> Top Right Node */}
            <line x1="72%" y1="28%" x2="88%" y2="20%" />
            
            {/* Bottom Right Hybrid -> Bottom Right Node */}
            <line x1="72%" y1="62%" x2="88%" y2="68%" />
          </g>

          {/* === Quantum Links (Purple Lines) === */}
          {/* Style: Purple */}
          <g stroke="#c084fc" strokeWidth="2.5" fill="none">
             {/* Left Node -> Left Hybrid Router (Shifted slightly down) */}
             <line x1="12%" y1="51%" x2="28%" y2="51%" />
             
             {/* Left Hybrid -> Top Right Hybrid (Shifted) */}
             <line x1="32%" y1="49%" x2="68%" y2="31%" />
             
             {/* Left Hybrid -> Bottom Right Hybrid (Direct Long Link) */}
             <line x1="32%" y1="53%" x2="68%" y2="65%" />
             
             {/* Top Right Hybrid -> Top Right Node */}
             <line x1="72%" y1="31%" x2="88%" y2="23%" />
             
             {/* Bottom Right Hybrid -> Bottom Right Node */}
             <line x1="72%" y1="65%" x2="88%" y2="71%" />
          </g>
        </svg>

        {/* --- Repeater Nodes Layer (Positioned on lines) --- */}
        {/* On Link: Left Hybrid -> Top Right Hybrid */}
        <div className="absolute top-[40%] left-[50%] z-10"><RepeaterNode /></div>
        
        {/* On Link: Left Hybrid -> Bottom Right Hybrid */}
        <div className="absolute top-[59%] left-[45%] z-10"><RepeaterNode /></div>
        <div className="absolute top-[62%] left-[58%] z-10"><RepeaterNode /></div>


        {/* --- Main Component Nodes (Absolute Positioning) --- */}
        
        {/* 1. Left End Node */}
        <div className="absolute top-[45%] left-[5%] -translate-y-1/2">
          <EndNodeIcon label="End-node" align="left"/>
        </div>

        {/* 2. Left Hybrid Router */}
        <div className="absolute top-[45%] left-[28%] -translate-x-1/2 -translate-y-1/2">
          <HybridRouterIcon />
        </div>

        {/* 3. Bottom Middle Classical Router */}
        <div className="absolute top-[75%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <ClassicalRouterIcon />
        </div>

        {/* 4. Top Right Hybrid Router */}
        <div className="absolute top-[25%] left-[70%] -translate-x-1/2 -translate-y-1/2">
          <HybridRouterIcon />
        </div>

        {/* 5. Bottom Right Hybrid Router */}
        <div className="absolute top-[65%] left-[70%] -translate-x-1/2 -translate-y-1/2">
          <HybridRouterIcon />
        </div>

        {/* 6. Top Right End Node */}
        <div className="absolute top-[15%] right-[5%] -translate-y-1/2">
          <EndNodeIcon label="End-node" align="right"/>
        </div>

        {/* 7. Bottom Right End Node */}
        <div className="absolute top-[70%] right-[5%] -translate-y-1/2">
          <EndNodeIcon label="End-node" align="right"/>
        </div>

      </div>

      {/* --- Legend Section --- */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">راهنمای نقشه (Legend)</h4>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs text-slate-700">
          
          {/* Hybrid Router */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex flex-col justify-center items-center scale-75">
               <div className="w-full h-1/2 bg-blue-500 rounded-t-sm"></div>
               <div className="w-full h-1/2 bg-purple-500 rounded-b-sm"></div>
            </div>
            <span>روتر با صفحه داده کلاسیک و کوانتومی</span>
          </div>

          {/* Classical Router */}
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 flex flex-col justify-center items-center scale-75">
               <div className="w-full h-full bg-blue-500 rounded-sm border border-blue-600"></div>
            </div>
            <span>روتر با صفحه داده کلاسیک (فقط)</span>
          </div>

          {/* End Node */}
          <div className="flex items-center gap-2">
             <Laptop size={16} className="text-slate-600"/>
            <span>گره پایانی با توانایی کوانتومی</span>
          </div>

          {/* Repeater */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full border border-white shadow-sm"></div>
            <span>زنجیره تکرارگر کوانتومی (Repeater Chain)</span>
          </div>

          {/* Classical Link */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
            <span>لینک کلاسیک</span>
          </div>

          {/* Quantum Link */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-purple-400 rounded-full"></div>
            <span>لینک کوانتومی</span>
          </div>

        </div>
      </div>
      <div className="text-center mt-6 text-sm font-bold text-slate-800 bg-slate-50 py-2 rounded">
        شکل ۱: شبکه‌های کوانتومی از زیرساخت‌های شبکه موجود برای تبادل پیام‌های کلاسیک جهت اجرای پروتکل‌های کوانتومی و همچنین مدیریت و کنترل خود شبکه استفاده خواهند کرد.
      </div>
    </div>
  );
};