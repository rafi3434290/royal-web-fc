import React, { useState } from 'react';
import { Volume2, X, ChevronRight } from 'lucide-react';
import { ActiveView } from '../types';

interface TopTickerProps {
  message: string;
  onNavigate: (view: ActiveView) => void;
}

export const TopTicker: React.FC<TopTickerProps> = ({ message, onNavigate }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !message) return null;

  return (
    <aside aria-label="Announcement ticker" className="relative z-50 bg-gradient-to-r from-[#161204] via-[#2D2106] to-[#161204] border-b border-[#D4AF37]/30 text-xs py-2 px-4 shadow-[0_2px_15px_rgba(212,175,55,0.15)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Broadcast pill */}
        <div className="flex items-center gap-2.5 overflow-hidden flex-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-slate-950 font-black text-[10px] tracking-wider uppercase shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.4)]">
            <Volume2 size={11} className="stroke-[3]" />
            <span>ANNOUNCEMENT</span>
          </span>
          {/* Marquee / Message Text */}
          <div className="truncate text-slate-200 font-medium">
            <span className="font-semibold text-[#FDE68A]">{message}</span>
          </div>
        </div>

        {/* Right Actions: Quick link + Close */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('store')}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] hover:text-[#FFF] transition-colors cursor-pointer"
          >
            <span>Visit Store</span>
            <ChevronRight size={13} />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss announcement banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
