import React from 'react';
import { X, Vote, Key, Coins, ExternalLink, Sparkles } from 'lucide-react';
import { SERVER_CONFIG } from '../data/serverData';

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoteModal: React.FC<VoteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg bg-[#0A0E18] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(0,0,0,0.9)] z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mx-auto mb-4">
          <Vote size={28} />
        </div>

        <span className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase block mb-1">
          DAILY KINGDOM REWARD
        </span>
        <h3 className="font-brand text-2xl font-black text-white mb-2">
          Vote for Royal SMP
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
          Support our realm on the public Minecraft leaderboard and receive immediate in-game blessings every 24 hours.
        </p>

        {/* Guaranteed Rewards */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left mb-6 space-y-2.5">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Guaranteed Vote Rewards:
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-200">
            <Key size={15} className="text-[#D4AF37]" />
            <span><strong>2x Royal Vote Keys</strong> (Unlock Mythic Crates in Spawn)</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-200">
            <Coins size={15} className="text-[#F59E0B]" />
            <span><strong>$1,000 In-Game Coins</strong> &amp; <strong>100 Silver</strong></span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-200">
            <Sparkles size={15} className="text-purple-400" />
            <span>Chance to win <strong>Permanent Venture Rank</strong> in Monthly Draw</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <a
            href={SERVER_CONFIG.voteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Vote Site</span>
            <ExternalLink size={15} />
          </a>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full text-slate-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
