import React, { useState } from 'react';
import { X, User, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { MinecraftPlayer } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (player: MinecraftPlayer) => void;
  initialIgn?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  initialIgn = '',
}) => {
  const [ign, setIgn] = useState(initialIgn);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const trimmedIgn = ign.trim();
  const avatarUrl = trimmedIgn
    ? `https://mc-heads.net/avatar/${trimmedIgn}/64`
    : 'https://mc-heads.net/avatar/Steve/64';
  const bodyUrl = trimmedIgn
    ? `https://mc-heads.net/body/${trimmedIgn}/right`
    : 'https://mc-heads.net/body/Steve/right';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmedIgn) {
      setError('Please enter your Minecraft in-game username (IGN).');
      return;
    }
    if (trimmedIgn.length < 2 || trimmedIgn.length > 20) {
      setError('IGN must be between 2 and 20 characters.');
      return;
    }

    const player: MinecraftPlayer = {
      username: trimmedIgn,
      avatarUrl: `https://mc-heads.net/avatar/${trimmedIgn}/64`,
      bodyUrl: `https://mc-heads.net/body/${trimmedIgn}/right`,
    };

    onLogin(player);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#0A0E18] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(212,175,55,0.25)] z-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close Login Modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-mono font-bold text-[#D4AF37] tracking-widest uppercase block mb-1">
            WARRIOR AUTHENTICATION
          </span>
          <h3 className="font-brand text-2xl font-black text-white">
            Minecraft Player Login
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Enter your exact Minecraft In-Game Name to link your character and skin to the portal.
          </p>
        </div>

        {/* Live Skin & Avatar Preview Stage */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-black/80 border border-slate-800 flex items-center justify-center gap-6">
          {/* Full Body Skin */}
          <div className="relative w-24 h-36 flex items-center justify-center bg-slate-950/70 rounded-2xl border border-[#D4AF37]/30 shadow-inner overflow-hidden p-1">
            <img
              src={bodyUrl}
              alt={trimmedIgn || 'Minecraft Skin Preview'}
              className="max-h-32 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] transition-all transform hover:scale-105"
              onError={(e) => {
                // fallback to default Steve
                (e.target as HTMLImageElement).src = 'https://mc-heads.net/body/Steve/right';
              }}
            />
          </div>

          {/* Player Head & Info */}
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border-2 border-[#D4AF37] overflow-hidden shadow-md">
                <img
                  src={avatarUrl}
                  alt={trimmedIgn || 'Avatar'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/64';
                  }}
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                  LIVE SKIN PREVIEW
                </span>
                <p className="font-brand text-sm font-bold text-white truncate max-w-[140px]">
                  {trimmedIgn || 'Your Character'}
                </p>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#FDE68A]" />
              <span>Real-time Mojang &amp; Bedrock fetch</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Minecraft In-Game Name (IGN) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g. RaFI_Playz or mr_nasa"
                value={ign}
                onChange={(e) => {
                  setIgn(e.target.value);
                  setError(null);
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#D4AF37] text-sm text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>
            {error && (
              <p className="text-xs text-red-400 mt-1.5 font-medium">
                {error}
              </p>
            )}
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
            <span className="text-slate-500">Quick test:</span>
            <button
              type="button"
              onClick={() => setIgn('RaFI_Playz')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[#FDE68A] cursor-pointer"
            >
              RaFI_Playz
            </button>
            <button
              type="button"
              onClick={() => setIgn('mr_nasa')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[#FDE68A] cursor-pointer"
            >
              mr_nasa
            </button>
            <button
              type="button"
              onClick={() => setIgn('Notch')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            >
              Notch
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] animate-gold-shimmer text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Log In with Character</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 mt-4">
          <ShieldCheck size={13} className="text-[#D4AF37]" />
          <span>Works with Java &amp; Bedrock usernames without passwords</span>
        </p>
      </div>
    </div>
  );
};
