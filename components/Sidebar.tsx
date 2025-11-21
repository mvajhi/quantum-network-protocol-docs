
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION_TREE, APP_TITLE } from '../constants';
import { BookOpen, ChevronLeft, Menu, X } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <aside className="w-full md:w-72 bg-white border-l border-slate-200 md:h-screen md:sticky md:top-0 sticky top-0 h-auto z-50 flex flex-col shadow-[rgba(0,0,0,0.05)_0px_0px_10px]">
      {/* Title Header */}
      <div className="p-4 md:p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div className="flex items-center gap-3 text-primary-600">
          <BookOpen size={24} className="shrink-0" />
          <div className="flex flex-col">
             <span className="text-xs font-bold uppercase tracking-wider">مستندات آموزشی</span>
             <h2 className="font-black text-slate-800 leading-tight md:text-lg text-sm">{APP_TITLE}</h2>
          </div>
        </div>
        
        {/* Mobile Toggle */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className={`flex-1 overflow-y-auto p-4 custom-scrollbar transition-all duration-300 ${isOpen ? 'block max-h-[80vh]' : 'hidden md:block'}`}>
        <ul className="space-y-2">
          {NAVIGATION_TREE.map((item) => (
            <li key={item.id}>
              <NavLink
                to={`/${item.id}`}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {item.title}
                <ChevronLeft size={16} className="opacity-50" />
              </NavLink>

              {/* Subsections Render Logic (if exists) */}
              {item.subsections && (
                <ul className="mr-4 mt-2 space-y-1 border-r-2 border-slate-100 pr-2">
                  {item.subsections.map((sub) => (
                    <li key={sub.id}>
                      <NavLink
                        to={`/${item.id}/${sub.id}`}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `block py-1.5 px-2 rounded text-xs transition-colors ${
                            isActive
                              ? 'text-primary-600 font-bold bg-white shadow-sm'
                              : 'text-slate-500 hover:text-slate-800'
                          }`
                        }
                      >
                        {sub.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer info */}
      <div className={`p-4 text-center text-xs text-slate-400 border-t border-slate-100 bg-slate-50 ${isOpen ? 'block' : 'hidden md:block'}`}>
        بر اساس مقاله CoNEXT '20
      </div>
    </aside>
  );
};
