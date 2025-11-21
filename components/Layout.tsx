import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // In RTL, flex-row puts the first child (Sidebar) on the Right.
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50/50 text-slate-900 font-sans">
      
      {/* Sidebar Navigation - Stays on the right due to dir="rtl" in html */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-4xl mx-auto p-6 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
};