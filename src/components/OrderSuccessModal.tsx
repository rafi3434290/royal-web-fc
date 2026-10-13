import React, { useState } from 'react';
import { Check, Copy, CheckCheck, MessageSquare, X } from 'lucide-react';
import { SERVER_CONFIG } from '../data/serverData';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderId,
}) => {
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md bg-[#0A0E18] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(212,175,55,0.25)] z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <Check size={32} className="stroke-[3]" />
        </div>

        <span className="text-[11px] font-bold text-[#D4AF37] tracking-widest uppercase block mb-1">
          ORDER SUBMITTED
        </span>
        <h3 className="font-brand text-2xl font-black text-white mb-2">
          Royal Claim Recorded!
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
          Your transaction has been dispatched to the Royal Grand Chancellor for manual verification.
        </p>

        {/* Tracking ID Badge */}
        <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 mb-6 flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              Order Tracking ID
            </span>
            <span className="font-mono text-base font-bold text-[#FDE68A]">
              {orderId}
            </span>
          </div>
          <button
            onClick={handleCopyId}
            className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            {copiedId ? <CheckCheck size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copiedId ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Next Steps List */}
        <div className="text-left text-xs text-slate-300 space-y-2 mb-7 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
              1
            </span>
            <span>Join Minecraft server: <strong className="font-mono text-white">play.royallsmp.net:26069</strong></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
              2
            </span>
            <span>Rank perks apply automatically upon bKash/Nagad TrxID match (5-15 mins).</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <a
            href={SERVER_CONFIG.discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare size={15} />
            <span>Open Support Ticket on Discord</span>
          </a>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Back to Realm
          </button>
        </div>
      </div>
    </div>
  );
};
