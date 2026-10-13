import React from 'react';
import { ShieldCheck, Coins, Swords, Gamepad2, Compass, Zap, ArrowRight } from 'lucide-react';
import { PILLARS_OF_REALM } from '../data/serverData';

interface PillarsOfRealmProps {
  onSelectFeature?: (id: string) => void;
  onOpenStore: () => void;
}

export const PillarsOfRealm: React.FC<PillarsOfRealmProps> = ({ onOpenStore }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
      case 'Coins':
        return <Coins className="w-6 h-6 text-[#F59E0B]" />;
      case 'Swords':
        return <Swords className="w-6 h-6 text-red-400" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-6 h-6 text-indigo-400" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-300" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="pillars" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2">
            Kingdom Architecture
          </p>
          <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Pillars of the Realm
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Engineered from five years of dedicated multiplayer evolution. Uncompromising stability meets high-stakes survival.
          </p>
        </div>

        {/* 6 Sleek Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PILLARS_OF_REALM.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-[#D4AF37]/50 p-7 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.2)] flex flex-col justify-between"
            >
              {/* Glowing Golden Top-Border Accent */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-[#D4AF37]/30 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:border-[#D4AF37] transition-all">
                    {getIcon(pillar.icon)}
                  </div>
                  <span className="text-[10px] font-bold font-mono tracking-wider px-3 py-1 rounded-full bg-slate-800/80 text-[#FDE68A] border border-white/5 uppercase">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="font-brand text-xl font-bold text-white group-hover:text-[#FDE68A] transition-colors mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs font-semibold text-[#D4AF37] mb-3">
                  {pillar.subtitle}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Minimalist interactive link */}
              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Dynasty Verified</span>
                <button
                  onClick={onOpenStore}
                  className="text-xs font-semibold text-[#D4AF37] hover:text-[#FDE68A] flex items-center gap-1 group/btn cursor-pointer"
                >
                  <span>Explore Perk</span>
                  <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
