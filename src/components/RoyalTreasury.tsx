import React, { useState } from 'react';
import { Check, ShieldCheck, Sparkles, Coins, Crown, Plus } from 'lucide-react';
import { RANKS, GOLD_PACKAGES } from '../data/serverData';
import { RankItem, GoldPackage } from '../types';

interface RoyalTreasuryProps {
  onClaimRank: (rank: RankItem) => void;
  onClaimGold: (pkg: GoldPackage) => void;
  onAddToCart: (item: { id: string; name: string; type: 'rank' | 'gold'; priceBDT: number }) => void;
}

export const RoyalTreasury: React.FC<RoyalTreasuryProps> = ({
  onClaimRank,
  onClaimGold,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'ranks' | 'gold'>('ranks');

  return (
    <section id="treasury" className="py-24 relative">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#D4AF37]/5 blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2">
            The Imperial Arsenal
          </p>
          <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Royal Treasury &amp; Ranks
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Equip your dynasty with commanding titles, private dimensional vaults, and server sovereignty.
          </p>

          <div className="inline-flex p-1.5 rounded-full bg-slate-900/90 border border-slate-800 mt-8">
            <button
              onClick={() => setActiveTab('ranks')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'ranks'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Crown size={15} />
              <span>Royal Ranks</span>
            </button>
            <button
              onClick={() => setActiveTab('gold')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'gold'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Coins size={15} />
              <span>Gold Coins</span>
            </button>
          </div>
        </div>

        {activeTab === 'ranks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {RANKS.map((rank) => (
              <div
                key={rank.id}
                className={`group relative rounded-3xl backdrop-blur-xl p-7 transition-all duration-300 flex flex-col justify-between ${
                  rank.highlight
                    ? 'bg-gradient-to-b from-[#1A1608]/90 via-[#0F1320]/95 to-[#090D17] border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.25)] lg:-translate-y-3'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
                }`}
              >
                {rank.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                    MOST POPULAR
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full border"
                      style={{
                        color: rank.color,
                        borderColor: `${rank.color}40`,
                        backgroundColor: `${rank.color}15`,
                      }}
                    >
                      {rank.badge}
                    </span>
                    <Sparkles size={16} style={{ color: rank.color }} />
                  </div>

                  <h3 className="font-brand text-2xl font-black text-white tracking-wide mb-1">
                    {rank.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {rank.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-slate-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="font-brand text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {rank.priceBDT}
                      </span>
                      <span className="text-xs font-bold text-[#D4AF37]">BDT</span>
                      {rank.originalPriceBDT && (
                        <span className="text-xs text-slate-500 line-through ml-1 font-mono">
                          {rank.originalPriceBDT} BDT
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Lifetime dynasty entitlement
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {rank.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: `${rank.color}25` }}
                        >
                          <Check size={11} style={{ color: rank.color }} className="stroke-[3]" />
                        </div>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5 pt-4">
                  <button
                    onClick={() => onClaimRank(rank)}
                    className={`w-full py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      rank.highlight
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-110'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-[#D4AF37]/60'
                    }`}
                  >
                    <span>Claim Rank</span>
                  </button>
                  <button
                    onClick={() =>
                      onAddToCart({
                        id: rank.id,
                        name: `${rank.name} RANK`,
                        type: 'rank',
                        priceBDT: rank.priceBDT,
                      })
                    }
                    className="w-full py-2 rounded-full bg-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'gold' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {GOLD_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="group relative rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-[#D4AF37]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-4">
                    <Coins size={22} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="font-brand text-xl font-bold text-white mb-1">
                    {pkg.coins.toLocaleString()} Gold
                  </h3>
                  {pkg.bonus > 0 && (
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold block mb-4">
                      +{pkg.bonus} Bonus Coins Included
                    </span>
                  )}
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    In-game currency for player auction listings, claim expansions, and merchant shops.
                  </p>
                  <div className="mb-6 pb-4 border-b border-slate-800">
                    <span className="font-brand text-3xl font-black text-white">
                      {pkg.priceBDT}
                    </span>
                    <span className="text-xs font-bold text-[#D4AF37] ml-1.5">BDT</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => onClaimGold(pkg)}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs tracking-wide shadow-md hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                  >
                    Claim Coins
                  </button>
                  <button
                    onClick={() =>
                      onAddToCart({
                        id: pkg.id,
                        name: `${pkg.coins.toLocaleString()} Gold Coins`,
                        type: 'gold',
                        priceBDT: pkg.priceBDT,
                      })
                    }
                    className="w-full py-1.5 rounded-full text-slate-400 hover:text-white text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 max-w-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900/80 border border-[#D4AF37]/30 text-xs sm:text-sm text-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <ShieldCheck size={16} className="text-[#D4AF37] shrink-0" />
            <span className="font-medium">
              Protected Delivery • Manual bKash/Nagad Verification within 15 mins
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
