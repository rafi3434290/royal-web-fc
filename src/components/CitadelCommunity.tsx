import React from 'react';
import { MessageSquare, ArrowUpRight, Youtube, Facebook, Video } from 'lucide-react';
import { SERVER_CONFIG } from '../data/serverData';

export const CitadelCommunity: React.FC = () => {
  return (
    <section id="citadel" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0C1020]/95 via-[#13162C]/90 to-[#0A0D1A]/95 border border-indigo-500/25 p-8 sm:p-12 backdrop-blur-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[90px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -left-20 -top-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[90px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
                <MessageSquare size={14} className="text-indigo-400" />
                <span>Live Citadel: {SERVER_CONFIG.discordMemberCount} Active Members</span>
              </div>
              <h2 className="font-brand text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3">
                Citadel Community
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect with kingdom chieftains, recruit dynasty allies, trade in private markets, and report tickets directly to staff.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 shrink-0">
              <a
                href={SERVER_CONFIG.discordInvite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <MessageSquare size={18} />
                <span>Enter the Royal Discord Citadel</span>
                <ArrowUpRight size={16} />
              </a>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition-all cursor-pointer"
                  aria-label="YouTube Channel"
                >
                  <Youtube size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all cursor-pointer"
                  aria-label="Facebook Page"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10 transition-all cursor-pointer"
                  aria-label="TikTok Channel"
                >
                  <Video size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
