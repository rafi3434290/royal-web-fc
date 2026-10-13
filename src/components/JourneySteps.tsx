import React from 'react';
import { Copy, Check, Terminal, Laptop, Smartphone } from 'lucide-react';
import { SERVER_CONFIG } from '../data/serverData';

interface JourneyStepsProps {
  copiedJava: boolean;
  copiedBedrock: boolean;
  onCopyJava: () => void;
  onCopyBedrock: () => void;
}

export const JourneySteps: React.FC<JourneyStepsProps> = ({
  copiedJava,
  copiedBedrock,
  onCopyJava,
  onCopyBedrock,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Copy IP & Port',
      desc: 'Grab the server connection details below for your exact Minecraft edition with a single tap.',
    },
    {
      num: '02',
      title: 'Open Minecraft (1.20 - 1.21+)',
      desc: 'Launch either Java or Bedrock Edition. Add Royal SMP to your multiplayer server roster.',
    },
    {
      num: '03',
      title: 'Join & Claim Your Crown',
      desc: 'Enter spawn, run /register if cracked, and establish your dynasty claims in the survival realm.',
    },
  ];

  return (
    <section id="journey" className="py-20 relative bg-gradient-to-b from-transparent via-slate-950/60 to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2">
            Seamless Onboarding
          </p>
          <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Journey into the Kingdom
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Three simple steps to enter South Asia's premier survival realm.
          </p>
        </div>

        {/* 3 Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 relative">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-[#D4AF37]/40 backdrop-blur-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-brand text-2xl font-black text-[#D4AF37]">
                  {step.num}
                </span>
                <span className="w-8 h-px bg-[#D4AF37]/30" />
              </div>
              <h3 className="font-brand text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Minimalist Java & Bedrock Direct Copy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Java Edition Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0B0F1A]/90 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-800 text-[#D4AF37]">
                    <Laptop size={18} />
                  </div>
                  <div>
                    <h4 className="font-brand text-base font-bold text-white">Java Edition</h4>
                    <span className="text-[11px] text-slate-400">PC / Mac / Linux (1.20 - 1.21.x)</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-mono font-medium border border-emerald-500/20">
                  Online
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/50 border border-slate-800 flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Terminal size={14} className="text-[#D4AF37] shrink-0" />
                  <span className="font-mono text-sm text-slate-200 truncate select-all">
                    {SERVER_CONFIG.javaIP}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">
                  Port: 25565
                </span>
              </div>
            </div>
            <button
              onClick={onCopyJava}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedJava ? <Check size={16} /> : <Copy size={16} />}
              <span>{copiedJava ? 'Java Address Copied!' : 'Copy Java Address'}</span>
            </button>
          </div>

          {/* Bedrock / Mobile Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0B0F1A]/90 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-800 text-indigo-400">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h4 className="font-brand text-base font-bold text-white">Bedrock / Mobile</h4>
                    <span className="text-[11px] text-slate-400">Android, iOS, Console, Win 10</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[11px] font-mono font-medium border border-indigo-500/20">
                  Crossplay
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/50 border border-slate-800 flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Terminal size={14} className="text-indigo-400 shrink-0" />
                  <span className="font-mono text-sm text-slate-200 truncate select-all">
                    {SERVER_CONFIG.bedrockIP}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#FDE68A] bg-[#D4AF37]/15 px-2 py-0.5 rounded-md shrink-0">
                  Port: {SERVER_CONFIG.bedrockPort}
                </span>
              </div>
            </div>
            <button
              onClick={onCopyBedrock}
              className="w-full py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs sm:text-sm tracking-wide border border-white/10 hover:border-[#D4AF37]/50 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedBedrock ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span>{copiedBedrock ? 'Port Copied!' : 'Copy Bedrock Port (26069)'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
