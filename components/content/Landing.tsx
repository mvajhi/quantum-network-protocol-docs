
import React from 'react';
import { ExternalLink, Github, Mail, Sparkles, BookOpen, ArrowLeft, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative animate-fadeIn">
      
      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-4xl w-full mb-12">
        
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100 shadow-sm">
          <BookOpen size={16} />
          <span>مستندات آموزشی مقاله</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Designing a <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient">
            Quantum Network Protocol
          </span>
        </h1>

        <div className="flex flex-col items-center gap-4">
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            یک پروتکل لایه شبکه برای توزیع درهم‌تنیدگی در اینترنت کوانتومی
          </p>
          
          {/* Paper Info Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg flex flex-col md:flex-row items-center gap-6 max-w-3xl w-full transition-transform hover:scale-[1.01]">
             <div className="text-center md:text-right flex-1">
               <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">نویسندگان مقاله</span>
               <span className="font-medium text-slate-800 text-lg">Wojciech Kozlowski, Axel Dahlberg, Stephanie Wehner</span>
             </div>
             
             <div className="hidden md:block w-px h-12 bg-slate-200"></div>
             <div className="w-full md:w-auto h-px md:h-auto bg-slate-200"></div>

             <a 
               href="https://arxiv.org/abs/2010.02575" 
               target="_blank" 
               rel="noreferrer"
               className="flex items-center justify-center gap-2 text-white bg-slate-900 hover:bg-slate-800 font-bold transition-all px-6 py-3 rounded-xl shadow-md hover:shadow-xl w-full md:w-auto whitespace-nowrap"
             >
               <span>مشاهده در arXiv</span>
               <ExternalLink size={18} />
             </a>
          </div>
        </div>
      </div>

      {/* Credits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
         
         {/* Profile Card */}
         <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-start gap-4">
               <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <GraduationCap size={32} />
               </div>
               <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-xl mb-1">مهدی وجهی</h3>
                  <p className="text-slate-500 text-sm mb-4">دانشجوی مهندسی کامپیوتر دانشگاه تهران</p>
                  <div className="flex gap-3">
                     <a href="mailto:mvajhi@ut.ac.ir" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                       <Mail size={14} /> mvajhi@ut.ac.ir
                     </a>
                     <a href="https://github.com/mvajhi" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                       <Github size={14} /> Github
                     </a>
                  </div>
               </div>
            </div>
         </div>

         {/* Tech Stack Card */}
         <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-md text-white flex items-center gap-5 relative overflow-hidden">
            {/* Deco */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full pointer-events-none"></div>
            
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400 border border-white/10 backdrop-blur-sm shrink-0">
               <Sparkles size={32} />
            </div>
            <div className="relative z-10">
               <h3 className="font-bold text-lg mb-1">طراحی شده با هوش مصنوعی</h3>
               <p className="text-slate-300 text-sm leading-6">
                 این سایت با استفاده از مدل قدرتمند <strong>Gemini 3</strong> و پلتفرم <strong>Google AI Studio</strong> توسعه داده شده است.
               </p>
            </div>
         </div>

      </div>

      {/* Start Button */}
      <div className="mt-16 pb-10">
         <button 
           onClick={() => navigate('/abstract')}
           className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 text-lg rounded-full hover:bg-blue-700 hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]"
         >
           شروع مطالعه
           <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
         </button>
      </div>

    </div>
  );
};
