import React, { useState } from 'react';
import { 
  Crown, 
  Coins, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Plus, 
  Tag, 
  AlertCircle
} from 'lucide-react';
import { RankItem, GoldPackage, Coupon } from '../types';

interface StoreViewProps {
  ranks: RankItem[];
  goldPackages: GoldPackage[];
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  onClearCoupon: () => void;
  onClaimRank: (rank: RankItem, finalPrice: number) => void;
  onClaimGold: (pkg: GoldPackage, finalPrice: number) => void;
  onAddToCart: (item: { id: string; name: string; type: 'rank' | 'gold'; priceBDT: number }) => void;
}

export const StoreView: React.FC<StoreViewProps> = ({
  ranks,
  goldPackages,
  appliedCoupon,
  onApplyCoupon,
  onClearCoupon,
  onClaimRank,
  onClaimGold,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'ranks' | 'gold'>('ranks');
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponMsg(null);
    const res = await onApplyCoupon(couponInput.trim());
    setCouponLoading(false);
    if (res.success) {
      setCouponMsg({ type: 'success', text: res.message });
      setCouponInput('');
    } else {
      setCouponMsg({ type: 'error', text: res.message });
    }
  };

  const calculateDiscountedPrice = (priceBDT: number) => {
    if (!appliedCoupon) return priceBDT;
    if (appliedCoupon.discountPercent) {
      const discount = Math.round((priceBDT * appliedCoupon.discountPercent) / 100);
      return Math.max(0, priceBDT - discount);
    }
    if (appliedCoupon.discountAmount) {
      return Math.max(0, priceBDT - appliedCoupon.discountAmount);
    }
    return priceBDT;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2 block">
          OFFICIAL MINECRAFT TREASURY
        </span>
        <h1 className="font-brand text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Royal Store &amp; Ranks
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Equip your dynasty with commanding titles, dimensional vaults, and server sovereignty. Manual bKash &amp; Nagad delivery.
        </p>

        {/* Tab Switcher: Server Ranks vs Gold Coin Bundles */}
        <div className="inline-flex p-1.5 rounded-full bg-slate-900/95 border border-slate-800 mt-8 shadow-md">
          <button
            onClick={() => setActiveTab('ranks')}
            className={`px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'ranks'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Crown size={15} />
            <span>Server Ranks</span>
          </button>
          <button
            onClick={() => setActiveTab('gold')}
            className={`px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'gold'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Coins size={15} />
            <span>Gold Coin Bundles</span>
          </button>
        </div>
      </div>

      {/* Interactive Coupon Code Box */}
      <div className="max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-[#D4AF37]/30 shadow-lg">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Tag size={14} className="text-[#D4AF37]" />
            <span>Have a Promotional Coupon?</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Codes: ROYAL20, NASA50, RAFI10
          </span>
        </div>
        <form onSubmit={handleCouponSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Coupon Code (e.g. ROYAL20)"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-[#D4AF37] text-sm text-white placeholder-slate-500 uppercase font-mono outline-none"
          />
          <button
            type="submit"
            disabled={couponLoading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 text-xs font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {couponLoading ? 'Checking...' : 'Apply Code'}
          </button>
        </form>
        {appliedCoupon && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-300">
            <span className="font-semibold flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Coupon <strong>{appliedCoupon.code}</strong> Active ({appliedCoupon.discountPercent ? `${appliedCoupon.discountPercent}% Off` : `${appliedCoupon.discountAmount} BDT Off`})</span>
            </span>
            <button
              onClick={onClearCoupon}
              className="text-[11px] underline hover:text-white cursor-pointer ml-2"
            >
              Remove
            </button>
          </div>
        )}
        {couponMsg && (
          <p className={`mt-2 text-xs font-medium flex items-center gap-1 ${couponMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
            {couponMsg.type === 'success' ? <Check size={13} /> : <AlertCircle size={13} />}
            <span>{couponMsg.text}</span>
          </p>
        )}
      </div>

      {/* RANKS TAB VIEW */}
      {activeTab === 'ranks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ranks.map((rank) => {
            const finalPrice = calculateDiscountedPrice(rank.priceBDT);
            const hasDiscount = finalPrice < rank.priceBDT;
            return (
              <div
                key={rank.id}
                className={`group relative rounded-3xl backdrop-blur-xl p-7 transition-all duration-300 flex flex-col justify-between ${
                  rank.highlight
                    ? 'bg-gradient-to-b from-[#1C1708]/95 via-[#0F1320]/95 to-[#090D17] border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.25)] lg:-translate-y-2'
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

                  {/* Clean Pricing in BDT */}
                  <div className="mb-6 pb-6 border-b border-slate-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="font-brand text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {finalPrice}
                      </span>
                      <span className="text-xs font-bold text-[#D4AF37]">BDT</span>
                      {hasDiscount ? (
                        <span className="text-xs text-red-400 line-through font-mono font-bold ml-1">
                          {rank.priceBDT} BDT
                        </span>
                      ) : rank.originalPriceBDT ? (
                        <span className="text-xs text-slate-500 line-through font-mono ml-1">
                          {rank.originalPriceBDT} BDT
                        </span>
                      ) : null}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Lifetime dynasty entitlement • Manual Delivery
                    </span>
                  </div>

                  {/* Perks List */}
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

                {/* Actions */}
                <div className="space-y-2.5 pt-4">
                  <button
                    onClick={() => onClaimRank(rank, finalPrice)}
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
                        priceBDT: finalPrice,
                      })
                    }
                    className="w-full py-2 rounded-full bg-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* GOLD COINS TAB VIEW */}
      {activeTab === 'gold' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {goldPackages.map((pkg) => {
            const finalPrice = calculateDiscountedPrice(pkg.priceBDT);
            const hasDiscount = finalPrice < pkg.priceBDT;
            return (
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
                    Universal in-game currency for player auction listings, claims expansion, and merchant market trades.
                  </p>
                  <div className="mb-6 pb-4 border-b border-slate-800">
                    <div className="flex items-baseline gap-2">
                      <span className="font-brand text-3xl font-black text-white">
                        {finalPrice}
                      </span>
                      <span className="text-xs font-bold text-[#D4AF37]">BDT</span>
                      {hasDiscount ? (
                        <span className="text-xs text-red-400 line-through font-mono font-bold ml-1">
                          {pkg.priceBDT} BDT
                        </span>
                      ) : pkg.originalPriceBDT ? (
                        <span className="text-xs text-slate-500 line-through font-mono ml-1">
                          {pkg.originalPriceBDT} BDT
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => onClaimGold(pkg, finalPrice)}
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
                        priceBDT: finalPrice,
                      })
                    }
                    className="w-full py-1.5 rounded-full text-slate-400 hover:text-white text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trust Badge */}
      <div className="max-w-xl mx-auto text-center pt-8">
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900/90 border border-[#D4AF37]/30 text-xs sm:text-sm text-slate-300 shadow-md">
          <ShieldCheck size={16} className="text-[#D4AF37] shrink-0" />
          <span className="font-medium">
            Protected Delivery • Manual bKash/Nagad Verification within 15 mins
          </span>
        </div>
      </div>
    </div>
  );
};
