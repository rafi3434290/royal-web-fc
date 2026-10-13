import React from 'react';
import { Copy, Check, Users, Activity, Sparkles, Wifi } from 'lucide-react';
import { SERVER_CONFIG } from '../data/serverData';
import { ServerStatus } from '../types';

interface HeroProps {
  serverStatus: ServerStatus | null;
  copiedJava: boolean;
  copiedBedrock: boolean;
  onCopyJava: () => void;
  onCopyBedrock: () => void;
  onOpenStore: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  serverStatus,
  copiedJava,
  copiedBedrock,
  onCopyJava,
  onCopyBedrock,
}) => {
  const onlinePlayers = serverStatus?.players?.online ?? 148;

  return (
    <section id="hero" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Background radial ambiance */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#4F46E5]/15 via-[#D4AF37]/15 to-transparent blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 flex flex-col items-center">
        {/* Pill Status Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-[#D4AF37]/30 text-xs text-[#FDE68A] shadow-[0_0_20px_rgba(212,175,55,0.15)] mb-8 transition-transform hover:scale-105 select-none">
          <span className="text-[#D4AF37]">👑</span>
          <span className="font-semibold tracking-wider">ROYAL REALM IS LIVE • JAVA &amp; BEDROCK • EST. 2020</span>
        </div>

        {/* Headline */}
        <h1 className="font-brand text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-none mb-6">
          <span className="bg-gradient-to-r from-[#FFF4B8] via-[#E5B83B] via-[#F59E0B] to-[#FFF4B8] bg-clip-text text-transparent animate-gold-shimmer drop-shadow-[0_4px_30px_rgba(212,175,55,0.3)]">
            FORGE YOUR DYNASTY
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-10 text-balance">
          Enter South Asia's foremost survival multiplayer realm. Build kingdoms, conquer economies, and write your legend.
        </p>

        {/* Interactive Quick-Join Dock */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mb-12">
          <button
            onClick={onCopyJava}
            className="w-full sm:w-auto flex-1 group px-7 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-[#FFF9D2] cursor-pointer"
          >
            {copiedJava ? (
              <>
                <Check size={18} className="stroke-[3]" />
                <span>Java IP Copied!</span>
              </>
            ) : (
              <>
                <Copy size={18} className="text-slate-900 group-hover:scale-110 transition-transform" />
                <span>Connect Java Edition ⚔</span>
              </>
            )}
          </button>

          <button
            onClick={onCopyBedrock}
            className="w-full sm:w-auto flex-1 group px-7 py-4 rounded-full bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 hover:text-white font-semibold text-sm sm:text-base tracking-wide border border-[#D4AF37]/35 hover:border-[#D4AF37]/75 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_24px_rgba(212,175,55,0.25)] hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            {copiedBedrock ? (
              <>
                <Check size={17} className="text-emerald-400 stroke-[3]" />
                <span className="text-emerald-300 font-bold">Port Copied!</span>
              </>
            ) : (
              <>
                <span className="text-[#D4AF37] font-mono text-xs px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                  MCPE
                </span>
                <span>Bedrock Port: {SERVER_CONFIG.bedrockPort}</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Metrics Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-slate-800 text-slate-300">
            <Users size={14} className="text-emerald-400" />
            <span>Live: <strong className="text-white font-mono tabular-nums">{onlinePlayers}+ Warriors</strong></span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-slate-800 text-slate-300">
            <Activity size={14} className="text-[#D4AF37]" />
            <span>Uptime: <strong className="text-white font-mono">99.98%</strong></span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-slate-800 text-slate-300">
            <Wifi size={14} className="text-indigo-400" />
            <span>Sub-20ms Asian Routing</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-slate-800 text-slate-300">
            <Sparkles size={14} className="text-[#F59E0B]" />
            <span>{SERVER_CONFIG.season}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
