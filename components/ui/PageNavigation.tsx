import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PageNavigationProps {
  nextPath?: string;
  nextTitle?: string;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({ nextPath, nextTitle }) => {
  const navigate = useNavigate();

  if (!nextPath) return null;

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 flex justify-end">
      <button
        onClick={() => navigate(nextPath)}
        className="group flex items-center gap-4 bg-white border border-slate-200 hover:border-primary-500 hover:bg-primary-50/30 text-slate-700 px-5 py-4 rounded-xl transition-all shadow-sm hover:shadow-md w-full md:w-auto max-w-xs"
      >
        <div className="flex-1 text-left">
          <span className="block text-xs text-slate-400 mb-1 font-medium">صفحه بعدی</span>
          <span className="block font-bold text-sm md:text-base text-slate-800 group-hover:text-primary-700 transition-colors">
            {nextTitle}
          </span>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-primary-500 flex items-center justify-center transition-colors">
             <ArrowLeft size={20} className="text-slate-500 group-hover:text-white transition-colors" />
        </div>
      </button>
    </div>
  );
};