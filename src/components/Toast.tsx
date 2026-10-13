import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#0A0E1A]/95 border border-[#D4AF37]/60 text-white text-xs sm:text-sm font-semibold shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.35)] backdrop-blur-xl flex items-center gap-2.5 pointer-events-none transition-all duration-300"
    >
      <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-slate-950 flex items-center justify-center shrink-0">
        <Check size={12} className="stroke-[3]" />
      </div>
      <span className="text-[#FDE68A]">{message}</span>
    </div>
  );
};
