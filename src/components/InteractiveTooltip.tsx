import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface InteractiveTooltipProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

export default function InteractiveTooltip({ term, definition, children }: InteractiveTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block group cursor-help z-30"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      <span className="underline decoration-emerald-500/40 hover:decoration-emerald-400 decoration-dotted underline-offset-4 font-semibold text-slate-100 transition-colors inline-flex items-center gap-0.5">
        {children || term}
        <HelpCircle className="w-3 h-3 text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
      </span>

      {/* Tooltip Popup Card */}
      {isVisible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-2xl text-left text-xs font-normal text-slate-300 leading-relaxed font-sans animate-in fade-in slide-in-from-bottom-1 duration-150 block pointer-events-none z-50">
          <strong className="text-emerald-400 font-semibold block mb-1 font-display">{term}</strong>
          {definition}
          {/* Small arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-950 block" />
        </span>
      )}
    </span>
  );
}
