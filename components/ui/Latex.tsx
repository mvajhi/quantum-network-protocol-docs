
import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    katex: any;
  }
}

interface LatexProps {
  children: string;
  block?: boolean;
  className?: string;
}

export const Latex: React.FC<LatexProps> = ({ children, block = false, className = "" }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkKatex = () => {
      if (window.katex) {
        setIsLoaded(true);
      } else {
        // Retry shortly if not loaded yet
        setTimeout(checkKatex, 100);
      }
    };
    checkKatex();
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current && window.katex) {
      let cleanChildren = children;
      // Remove delimiters if the user accidentally included them
      if (block && cleanChildren.trim().startsWith('$$') && cleanChildren.trim().endsWith('$$')) {
        cleanChildren = cleanChildren.trim().slice(2, -2);
      } else if (!block && cleanChildren.trim().startsWith('$') && cleanChildren.trim().endsWith('$')) {
         cleanChildren = cleanChildren.trim().slice(1, -1);
      }

      try {
        window.katex.render(cleanChildren, containerRef.current, {
          throwOnError: false,
          displayMode: block,
          output: 'html', // Use HTML output for better accessibility/performance
          trust: true // Allow colors
        });
      } catch (e) {
        console.error("KaTeX rendering error:", e);
        containerRef.current.innerText = cleanChildren; // Fallback
      }
    }
  }, [children, block, isLoaded]);

  // dir="ltr" is crucial for correct math layout in RTL pages
  // We render {children} initially so the raw formula is visible before KaTeX loads or if it fails
  return (
    <span 
      ref={containerRef} 
      dir="ltr" 
      className={`${className} ${block ? 'block text-center my-4 overflow-x-auto' : 'inline-block'}`}
    >
      {children}
    </span>
  );
};
