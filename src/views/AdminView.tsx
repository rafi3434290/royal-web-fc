import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Volume2, 
  DollarSign, 
  Tag, 
  Eye, 
  AlertCircle, 
  ArrowRight,
  LogOut,
  Trophy,
  Megaphone,
  Edit3,
  RotateCcw,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { 
  Order, 
  Coupon, 
  RankItem, 
  GoldPackage, 
  LeaderboardDataset, 
  LeaderboardEntry, 
  LeaderboardCategory,
  AnnouncementItem
} from '../types';
import { SERVER_CONFIG } from '../data/serverData';

interface AdminViewProps {
  orders: Order[];
  coupons: Coupon[];
  ranks: RankItem[];
  goldPackages: GoldPackage[];
  leaderboards: LeaderboardDataset;
  announcements: AnnouncementItem[];
  onUpdateOrderStatus: (orderId: string, status: 'confirmed' | 'cancelled') => void;
  onCreateCoupon: (coupon: Coupon) => void;
  onDeleteCoupon: (code: string) => void;
  onUpdatePrices: (newRankPrices: Record<string, number>, newGoldPrices: Record<string, number>) => void;
  onBroadcastTicker: (newTicker: string) => void;
  currentTicker: string;
  onUpdateLeaderboardEntry: (category: LeaderboardCategory, entry: LeaderboardEntry) => void;
  onDeleteLeaderboardEntry: (category: LeaderboardCategory, rank: number) => void;
  onResetLeaderboardCategory: (category: LeaderboardCategory) => void;
  onPublishAnnouncement: (announcement: Omit<AnnouncementItem, 'id' | 'date'>) => void;
  onDeleteAnnouncement: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  orders,
  coupons,
  ranks,
  goldPackages,
  leaderboards,
  announcements,
  onUpdateOrderStatus,
  onCreateCoupon,
  onDeleteCoupon,
  onUpdatePrices,
  onBroadcastTicker,
  currentTicker,
  onUpdateLeaderboardEntry,
  onDeleteLeaderboardEntry,
  onResetLeaderboardCategory,
  onPublishAnnouncement,
  onDeleteAnnouncement,
  onShowToast,
}) => {
  // Passcode gate state
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('royal_admin_auth') === 'true';
  });
  const [passError, setPassError] = useState(false);

  // Active Tab inside Admin Control Panel
  const [adminTab, setAdminTab] = useState<'orders' | 'leaderboard' | 'announcements' | 'coupons' | 'prices'>('orders');

  // Screenshot modal preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // --- LEADERBOARD MANAGER STATE ---
  const [lbCategory, setLbCategory] = useState<LeaderboardCategory>('wealth');
  const [lbRank, setLbRank] = useState<number>(1);
  const [lbIgn, setLbIgn] = useState<string>('');
  const [lbScore, setLbScore] = useState<string>('');
  const [lbTitle, setLbTitle] = useState<string>('Grand Monarch');
  const [lbClan, setLbClan] = useState<string>('Royal Dynasty');
  const [isEditingLb, setIsEditingLb] = useState<boolean>(false);

  // --- ANNOUNCEMENT PUBLISHER STATE ---
  const [annTitle, setAnnTitle] = useState('');
  const [annTag, setAnnTag] = useState<'SEASON UPDATE' | 'EVENT' | 'DISCOUNT' | 'MAINTENANCE' | 'NETWORK' | 'COMMUNITY'>('SEASON UPDATE');
  const [annContent, setAnnContent] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [isCustomTag, setIsCustomTag] = useState(false);

  // New Coupon Form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');
  const [discountValue, setDiscountValue] = useState<number>(20);

  // Price overrides local form state
  const [tempRankPrices, setTempRankPrices] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    ranks.forEach((r) => { map[r.id] = r.priceBDT; });
    return map;
  });
  const [tempGoldPrices, setTempGoldPrices] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    goldPackages.forEach((g) => { map[g.id] = g.priceBDT; });
    return map;
  });

  // Announcement ticker broadcaster state
  const [tickerMessage, setTickerMessage] = useState(currentTicker);

  // Handle Authentication (Security Fix: Validation intact, NO master key displayed on screen)
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === SERVER_CONFIG.masterStaffPasscode) {
      setIsAuthenticated(true);
      sessionStorage.setItem('royal_admin_auth', 'true');
      setPassError(false);
      onShowToast('Staff clearance granted. Welcome, Grand Chancellor.');
    } else {
      setPassError(true);
      onShowToast('Invalid Master Staff Passcode');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('royal_admin_auth');
    setPasscode('');
    onShowToast('Staff session terminated');
  };

  // --- LEADERBOARD ACTIONS ---
  const handleSaveLeaderboardEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lbIgn.trim()) {
      onShowToast('Please provide player IGN');
      return;
    }
    if (!lbScore.trim()) {
      onShowToast('Please provide a Score/Value');
      return;
    }

    const cleanIgn = lbIgn.trim();
    const entry: LeaderboardEntry = {
      rank: Number(lbRank),
      ign: cleanIgn,
      title: lbTitle.trim() || 'Monarch',
      clan: lbClan.trim() || 'Royal Clan',
      score: lbScore.trim(),
      rawScore: parseInt(lbScore.replace(/[^0-9]/g, ''), 10) || 0,
      avatarSeed: cleanIgn,
    };

    onUpdateLeaderboardEntry(lbCategory, entry);
    onShowToast(`Updated #${entry.rank} ${entry.ign} in ${lbCategory.toUpperCase()} Leaderboard!`);

    // Reset form after saving
    setLbIgn('');
    setLbScore('');
    setIsEditingLb(false);
    // increment rank if within 1-10
    if (lbRank < 10) setLbRank(lbRank + 1);
  };

  const handleEditEntry = (entry: LeaderboardEntry) => {
    setLbRank(entry.rank);
    setLbIgn(entry.ign);
    setLbScore(entry.score);
    setLbTitle(entry.title);
    setLbClan(entry.clan);
    setIsEditingLb(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // --- ANNOUNCEMENT PUBLISH ACTION ---
  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) {
      onShowToast('Please provide Announcement Title and Description');
      return;
    }

    const finalTag = isCustomTag && customTag.trim() ? customTag.trim().toUpperCase() : annTag;

    // Call onPublishAnnouncement which updates both ticker bar and announcements feed
    onPublishAnnouncement({
      title: annTitle.trim(),
      category: finalTag,
      content: annContent.trim(),
      author: 'Royal Administration',
      activeTicker: true,
    });

    onShowToast(`Announcement published! Ticker and News feed updated.`);
    setAnnTitle('');
    setAnnContent('');
    setCustomTag('');
    setIsCustomTag(false);
  };

  // Add Coupon
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const coupon: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: discountType === 'percent' ? Number(discountValue) : undefined,
      discountAmount: discountType === 'fixed' ? Number(discountValue) : undefined,
      active: true,
    };
    onCreateCoupon(coupon);
    setNewCouponCode('');
    onShowToast(`Coupon code ${coupon.code} activated`);
  };

  // Save Price adjustments
  const handleSavePrices = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePrices(tempRankPrices, tempGoldPrices);
    onShowToast('Store pricing overrides deployed across realm!');
  };

  // Broadcast Notice directly
  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tickerMessage.trim()) return;
    onBroadcastTicker(tickerMessage.trim());
    onShowToast('Announcement dispatched to global ticker!');
  };

  // ========================================================
  // 1. IF NOT AUTHENTICATED: SHOW SECURE MASTER PASSCODE GATE
  // (NO PASSCODE HINT DISPLAYED ON SCREEN)
  // ========================================================
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-[#D4AF37]/50 shadow-[0_0_60px_rgba(212,175,55,0.2)]">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto mb-6 shadow-md">
            <Lock size={30} />
          </div>

          <span className="text-[10px] font-mono font-bold text-[#D4AF37] tracking-widest uppercase block mb-1">
            RESTRICTED HIGH-COUNCIL PORTAL
          </span>

          <h2 className="font-brand text-2xl font-black text-white mb-2">
            Staff Terminal Gate
          </h2>

          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Administrative access strictly prohibited without master authorization key.
          </p>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter Master Passcode..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPassError(false);
                }}
                className={`w-full px-4 py-3 rounded-xl bg-black/60 border text-sm text-white placeholder-slate-500 font-mono outline-none transition-colors ${
                  passError ? 'border-red-500 text-red-200' : 'border-slate-700 focus:border-[#D4AF37]'
                }`}
              />
              {passError && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center justify-center gap-1 font-medium">
                  <AlertCircle size={12} />
                  <span>Access Denied: Invalid Security Key</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md hover:brightness-110 active:scale-98 transition-all cursor-pointer"
            >
              Verify Security Clearance
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ========================================================
  // AUTHENTICATED STAFF TERMINAL DASHBOARD
  // ========================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Terminal Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest block">
              AUTHENTICATED AS CHANCELLOR
            </span>
            <h1 className="font-brand text-2xl sm:text-3xl font-black text-white">
              Staff Command Terminal
            </h1>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          <span>Lock Session</span>
        </button>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800/80">
        <button
          onClick={() => setAdminTab('orders')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            adminTab === 'orders'
              ? 'bg-[#D4AF37] text-slate-950 shadow-md font-black'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <CheckCircle2 size={15} />
          <span>Orders Queue ({orders.filter(o => o.status === 'pending').length} Pending)</span>
        </button>

        <button
          onClick={() => setAdminTab('leaderboard')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            adminTab === 'leaderboard'
              ? 'bg-[#D4AF37] text-slate-950 shadow-md font-black'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Trophy size={15} />
          <span>Leaderboard Manager</span>
        </button>

        <button
          onClick={() => setAdminTab('announcements')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            adminTab === 'announcements'
              ? 'bg-[#D4AF37] text-slate-950 shadow-md font-black'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Megaphone size={15} />
          <span>Publish Announcement</span>
        </button>

        <button
          onClick={() => setAdminTab('coupons')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            adminTab === 'coupons'
              ? 'bg-[#D4AF37] text-slate-950 shadow-md font-black'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Tag size={15} />
          <span>Coupons</span>
        </button>

        <button
          onClick={() => setAdminTab('prices')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            adminTab === 'prices'
              ? 'bg-[#D4AF37] text-slate-950 shadow-md font-black'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <DollarSign size={15} />
          <span>Price Overrides</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: LIVE ORDERS QUEUE */}
      {/* ======================================================== */}
      {adminTab === 'orders' && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-brand text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[#D4AF37]" />
                <span>Live Orders Queue ({orders.length} Records)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Incoming bKash and Nagad payment transfers awaiting manual in-game delivery.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Live Real-Time Sync
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase font-mono">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">IGN</th>
                  <th className="py-3 px-3">Package</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Sender &amp; TrxID</th>
                  <th className="py-3 px-3">Receipt</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-3 font-mono font-bold text-[#FDE68A]">
                      #{ord.id}
                    </td>
                    <td className="py-4 px-3 font-bold text-white flex items-center gap-2">
                      <img 
                        src={`https://mc-heads.net/avatar/${ord.ign}/24`} 
                        alt={ord.ign}
                        className="w-5 h-5 rounded"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/24'; }}
                      />
                      <span>{ord.ign}</span>
                    </td>
                    <td className="py-4 px-3 text-slate-300">
                      {ord.item}
                    </td>
                    <td className="py-4 px-3 font-mono font-bold text-amber-300">
                      {ord.amount}
                      {ord.discount && (
                        <span className="text-[10px] text-emerald-400 block">
                          Disc: {ord.discount}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-3 font-mono text-slate-300">
                      <div>{ord.method}: {ord.sender}</div>
                      <div className="text-[#D4AF37] font-bold select-all">{ord.trxId}</div>
                    </td>
                    <td className="py-4 px-3">
                      {ord.screenshot ? (
                        <button
                          onClick={() => setPreviewImage(ord.screenshot || null)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center gap-1 border border-slate-700 cursor-pointer"
                        >
                          <Eye size={12} />
                          <span>View Image</span>
                        </button>
                      ) : (
                        <span className="text-slate-500 font-mono">No Image</span>
                      )}
                    </td>
                    <td className="py-4 px-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase font-mono ${
                          ord.status === 'confirmed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : ord.status === 'cancelled'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {ord.status !== 'confirmed' && (
                          <button
                            onClick={() => onUpdateOrderStatus(ord.id, 'confirmed')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
                            title="Approve & Deliver in Realm"
                          >
                            Approve
                          </button>
                        )}
                        {ord.status !== 'cancelled' && (
                          <button
                            onClick={() => onUpdateOrderStatus(ord.id, 'cancelled')}
                            className="px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-bold text-[11px] transition-colors cursor-pointer"
                            title="Reject Order"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* TAB 2: LEADERBOARD MANAGER (FEATURE 3) */}
      {/* ======================================================== */}
      {adminTab === 'leaderboard' && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-8">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-brand text-xl font-bold text-white flex items-center gap-2">
                  <Trophy size={20} className="text-[#D4AF37]" />
                  <span>Leaderboard Manager</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage Top Balance / Richest, Top PvP Kills, and Longest Playtime rankings. Changes update the public Hall of Fame immediately!
                </p>
              </div>

              {/* Reset Category Button */}
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Reset "${lbCategory.toUpperCase()}" leaderboard category back to defaults?`)) {
                    onResetLeaderboardCategory(lbCategory);
                    onShowToast(`Reset ${lbCategory.toUpperCase()} leaderboard to defaults.`);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-950/60 text-slate-300 hover:text-red-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw size={14} />
                <span>Reset Category</span>
              </button>
            </div>

            {/* Category Filter Switcher */}
            <div className="flex flex-wrap items-center gap-2.5 mt-6 p-1.5 rounded-2xl bg-black/40 border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setLbCategory('wealth');
                  setIsEditingLb(false);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                  lbCategory === 'wealth'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Top Balance / Richest
              </button>

              <button
                type="button"
                onClick={() => {
                  setLbCategory('kills');
                  setIsEditingLb(false);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                  lbCategory === 'kills'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Top PvP Kills
              </button>

              <button
                type="button"
                onClick={() => {
                  setLbCategory('playtime');
                  setIsEditingLb(false);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                  lbCategory === 'playtime'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Longest Playtime
              </button>
            </div>
          </div>

          {/* Add / Edit Entry Form */}
          <form onSubmit={handleSaveLeaderboardEntry} className="p-5 sm:p-6 rounded-2xl bg-black/50 border border-[#D4AF37]/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                <Edit3 size={14} />
                <span>{isEditingLb ? `Edit Rank #${lbRank} Entry` : `Add or Update Entry in ${lbCategory.toUpperCase()}`}</span>
              </span>
              {isEditingLb && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingLb(false);
                    setLbIgn('');
                    setLbScore('');
                  }}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Rank Position */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Rank Position (1-10)
                </label>
                <select
                  value={lbRank}
                  onChange={(e) => setLbRank(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-[#D4AF37]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
                    <option key={r} value={r}>Position #{r}</option>
                  ))}
                </select>
              </div>

              {/* IGN */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Player IGN <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. mr_nasa"
                  value={lbIgn}
                  onChange={(e) => setLbIgn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Score / Value */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Score / Value <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    lbCategory === 'wealth'
                      ? '$5,000,000 or 500,000 Gold'
                      : lbCategory === 'kills'
                      ? '450 Kills'
                      : '1,200 Hours'
                  }
                  value={lbScore}
                  onChange={(e) => setLbScore(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Title / Role */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Title / Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grand Monarch"
                  value={lbTitle}
                  onChange={(e) => setLbTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Clan */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Dynasty / Clan
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royal Dynasty"
                  value={lbClan}
                  onChange={(e) => setLbClan(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Live Head Preview & Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                {lbIgn.trim() && (
                  <div className="flex items-center gap-2 p-1.5 px-3 rounded-xl bg-slate-900 border border-slate-800">
                    <img
                      src={`https://mc-heads.net/avatar/${lbIgn.trim()}/28`}
                      alt="Skin Preview"
                      className="w-6 h-6 rounded"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/28'; }}
                    />
                    <span className="text-xs text-slate-300 font-mono">{lbIgn.trim()}</span>
                  </div>
                )}
                <span className="text-[11px] text-slate-500">
                  Saving will update position #{lbRank} in public {lbCategory} leaderboard.
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs tracking-wide hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                <Plus size={15} />
                <span>{isEditingLb ? 'Update Position' : 'Save Leaderboard Entry'}</span>
              </button>
            </div>
          </form>

          {/* Current Entries Table */}
          <div className="space-y-3">
            <h3 className="font-brand text-sm font-bold text-white flex items-center justify-between">
              <span>Current {lbCategory.toUpperCase()} Roster</span>
              <span className="text-xs text-slate-400 font-mono font-normal">
                {leaderboards[lbCategory]?.length || 0} Entries
              </span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase font-mono">
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Player Skin</th>
                    <th className="py-2.5 px-3">IGN</th>
                    <th className="py-2.5 px-3">Title &amp; Clan</th>
                    <th className="py-2.5 px-3">Score / Value</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {([...(leaderboards[lbCategory] || [])].sort((a, b) => a.rank - b.rank)).map((entry) => (
                    <tr key={`${entry.rank}-${entry.ign}`} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#FDE68A]">
                        #{entry.rank}
                      </td>
                      <td className="py-3 px-3">
                        <img
                          src={`https://mc-heads.net/avatar/${entry.avatarSeed || entry.ign}/28`}
                          alt={entry.ign}
                          className="w-7 h-7 rounded-lg border border-[#D4AF37]/40"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/28'; }}
                        />
                      </td>
                      <td className="py-3 px-3 font-bold text-white font-brand text-sm">
                        {entry.ign}
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        <span>{entry.title}</span>
                        <span className="text-slate-500 font-mono ml-1.5">• {entry.clan}</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-amber-300">
                        {entry.score}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEditEntry(entry)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
                            title="Edit entry"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteLeaderboardEntry(lbCategory, entry.rank);
                              onShowToast(`Deleted rank #${entry.rank} from ${lbCategory}`);
                            }}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-200 transition-colors cursor-pointer"
                            title="Delete entry"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* TAB 3: PUBLISH ANNOUNCEMENT MANAGER (FEATURE 4) */}
      {/* ======================================================== */}
      {adminTab === 'announcements' && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-8">
          <div>
            <h2 className="font-brand text-xl font-bold text-white flex items-center gap-2">
              <Megaphone size={20} className="text-[#D4AF37]" />
              <span>Publish Announcement Manager</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Publish news and updates. Once posted, announcements instantly update both the top scrolling ticker bar and the Announcements/News section!
            </p>
          </div>

          {/* Announcement Form */}
          <form onSubmit={handlePublishAnnouncement} className="p-6 rounded-2xl bg-black/40 border border-[#D4AF37]/30 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Title */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Announcement Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Season 6 Double Drop Weekend & Netherite Tournament"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Tag / Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Announcement Tag <span className="text-red-400">*</span>
                </label>
                {!isCustomTag ? (
                  <div className="space-y-1">
                    <select
                      value={annTag}
                      onChange={(e) => setAnnTag(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-[#D4AF37]"
                    >
                      <option value="SEASON UPDATE">SEASON UPDATE</option>
                      <option value="EVENT">EVENT</option>
                      <option value="DISCOUNT">DISCOUNT</option>
                      <option value="MAINTENANCE">MAINTENANCE</option>
                      <option value="NETWORK">NETWORK</option>
                      <option value="COMMUNITY">COMMUNITY</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => setIsCustomTag(true)}
                      className="text-[11px] text-[#D4AF37] hover:underline cursor-pointer block text-right"
                    >
                      + Custom Tag
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="e.g. TOURNAMENT"
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white uppercase font-mono outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomTag(false)}
                      className="text-[11px] text-slate-400 hover:text-white cursor-pointer block text-right"
                    >
                      Back to preset tags
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Description / Content <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="Write the full announcement details for the website players..."
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#D4AF37]" />
                <span>Will instantly post to Top Marquee Ticker and Announcements feed.</span>
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] animate-gold-shimmer text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Publish to Website</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>

          {/* Active Ticker Editor */}
          <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 space-y-3">
            <h3 className="font-brand text-sm font-bold text-white flex items-center gap-2">
              <Volume2 size={16} className="text-[#D4AF37]" />
              <span>Current Top Ticker Message</span>
            </h3>
            <form onSubmit={handleBroadcast} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                value={tickerMessage}
                onChange={(e) => setTickerMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
              >
                Override Ticker
              </button>
            </form>
          </div>

          {/* Published Announcements History */}
          <div className="space-y-3">
            <h3 className="font-brand text-sm font-bold text-white">
              Published Announcements ({announcements.length})
            </h3>
            <div className="space-y-3">
              {announcements.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#FDE68A] uppercase">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">{item.date}</span>
                    </div>
                    <h4 className="font-brand text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{item.content}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onBroadcastTicker(`[${item.category}] ${item.title}: ${item.content.slice(0, 100)}...`);
                        onShowToast('Ticker set to announcement!');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                      title="Set as top ticker"
                    >
                      Set Ticker
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onDeleteAnnouncement(item.id);
                        onShowToast('Announcement removed');
                      }}
                      className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-200 cursor-pointer"
                      title="Delete announcement"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* TAB 4: DYNAMIC COUPON CODE GENERATOR */}
      {/* ======================================================== */}
      {adminTab === 'coupons' && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-brand text-xl font-bold text-white flex items-center gap-2">
                <Tag size={18} className="text-[#D4AF37]" />
                <span>Dynamic Coupon Code Generator</span>
              </h2>
              <p className="text-xs text-slate-400">
                Created coupons immediately sync with the store checkout validation engine.
              </p>
            </div>
          </div>

          {/* Create Coupon Form */}
          <form onSubmit={handleAddCoupon} className="p-5 rounded-2xl bg-black/40 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Coupon Code
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SUMMER25"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white uppercase font-mono outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Discount Type
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as 'percent' | 'fixed')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-[#D4AF37]"
              >
                <option value="percent">Percentage (% Off)</option>
                <option value="fixed">Fixed Amount (BDT Off)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                Discount Value
              </label>
              <input
                type="number"
                required
                min={1}
                max={discountType === 'percent' ? 100 : 5000}
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs tracking-wide hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus size={14} />
              <span>Create Coupon</span>
            </button>
          </form>

          {/* Active Coupons Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase font-mono">
                  <th className="py-2.5 px-3">Code</th>
                  <th className="py-2.5 px-3">Discount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {coupons.map((c) => (
                  <tr key={c.code} className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-mono font-bold text-[#FDE68A]">
                      {c.code}
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-white">
                      {c.discountPercent ? `${c.discountPercent}% Off Total` : `${c.discountAmount} BDT Off`}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onDeleteCoupon(c.code)}
                        className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete Coupon"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* TAB 5: LIVE PRICE OVERRIDES */}
      {/* ======================================================== */}
      {adminTab === 'prices' && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
          <div>
            <h2 className="font-brand text-xl font-bold text-white flex items-center gap-2">
              <DollarSign size={18} className="text-[#D4AF37]" />
              <span>Live Price Overrides</span>
            </h2>
            <p className="text-xs text-slate-400">
              Direct numeric input fields to edit prices of all Ranks and Gold coin packages on the fly.
            </p>
          </div>

          <form onSubmit={handleSavePrices} className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
                Server Ranks Pricing (BDT)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ranks.map((r) => (
                  <div key={r.id} className="p-4 rounded-2xl bg-black/40 border border-slate-800">
                    <label className="block text-xs font-bold text-white mb-2">
                      {r.name} Kit
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={50}
                        max={10000}
                        value={tempRankPrices[r.id] ?? r.priceBDT}
                        onChange={(e) =>
                          setTempRankPrices({ ...tempRankPrices, [r.id]: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white outline-none focus:border-[#D4AF37]"
                      />
                      <span className="text-xs font-bold text-[#D4AF37]">BDT</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
                Gold Coin Packages Pricing (BDT)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {goldPackages.map((g) => (
                  <div key={g.id} className="p-4 rounded-2xl bg-black/40 border border-slate-800">
                    <label className="block text-xs font-bold text-white mb-2">
                      {g.name}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={50}
                        max={10000}
                        value={tempGoldPrices[g.id] ?? g.priceBDT}
                        onChange={(e) =>
                          setTempGoldPrices({ ...tempGoldPrices, [g.id]: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white outline-none focus:border-[#D4AF37]"
                      />
                      <span className="text-xs font-bold text-[#D4AF37]">BDT</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Deploy Updated Prices
            </button>
          </form>
        </section>
      )}

      {/* Screenshot Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-2xl w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 text-center">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="font-brand text-sm font-bold text-white">Payment Receipt Image</h3>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto rounded-xl">
              <img
                src={previewImage}
                alt="Receipt Full Preview"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
