import React, { useState } from 'react';
import { Lock, X, AlertCircle, ArrowRight } from 'lucide-react';
import { SERVER_CONFIG } from '../data/serverData';

interface StaffPasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const StaffPasscodeModal: React.FC<StaffPasscodeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === SERVER_CONFIG.masterStaffPasscode) {
      sessionStorage.setItem('royal_admin_auth', 'true');
      setError(false);
      setPasscode('');
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-md bg-[#0A0E18] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(212,175,55,0.25)] z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 cursor-pointer transition-colors"
          aria-label="Close Staff Gate"
        >
          <X size={18} />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mx-auto mb-4">
          <Lock size={26} />
        </div>

        <span className="text-[10px] font-mono font-bold text-[#D4AF37] tracking-widest uppercase block mb-1">
          HIGH-SECURITY TERMINAL
        </span>

        <h3 className="font-brand text-2xl font-black text-white mb-2">
          Staff Portal Gate
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          Enter the master staff security key to enter the administrative queue, leaderboard console, and price manager.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              required
              autoFocus
              placeholder="Enter Master Security Key..."
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              className={`w-full px-4 py-3 rounded-xl bg-black/60 border text-xs sm:text-sm text-white placeholder-slate-500 font-mono outline-none transition-colors ${
                error ? 'border-red-500 text-red-200' : 'border-slate-700 focus:border-[#D4AF37]'
              }`}
            />
            {error && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center justify-center gap-1 font-medium">
                <AlertCircle size={12} />
                <span>Invalid Security Key. Access Denied.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Unlock Staff Console</span>
            <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};
