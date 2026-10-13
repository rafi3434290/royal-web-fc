import React from 'react';
import { 
  X, 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  Vote, 
  Trophy, 
  Newspaper, 
  MessageSquare, 
  ChevronRight, 
  Copy, 
  Check, 
  Search, 
  Info, 
  Lock,
  User,
  LogOut
} from 'lucide-react';
import { RoyalCrest } from './RoyalCrest';
import { SERVER_CONFIG } from '../data/serverData';
import { ActiveView, MinecraftPlayer } from '../types';

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onOpenNotifications: () => void;
  cartCount: number;
  onOpenCart: () => void;
  copiedJava: boolean;
  onCopyJava: () => void;
  onOpenStaffGate: () => void;
  player: MinecraftPlayer | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const SlideDrawer: React.FC<SlideDrawerProps> = ({
  isOpen,
  onClose,
  activeView,
  onNavigate,
  onOpenNotifications,
  cartCount,
  onOpenCart,
  copiedJava,
  onCopyJava,
  onOpenStaffGate,
  player,
  onOpenLogin,
  onLogout,
}) => {
  if (!isOpen) return null;

  const handleLinkClick = (view: ActiveView) => {
    onNavigate(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Drawer Container */}
      <div className="relative w-full max-w-sm h-full bg-[#090D18]/98 border-l border-[#D4AF37]/25 backdrop-blur-2xl p-6 flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.9)] z-10 overflow-y-auto">
        <div>
          {/* Top Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#D4AF37]/20">
            <div className="flex items-center gap-3">
              <RoyalCrest size={34} />
              <div>
                <span className="font-brand text-lg font-bold tracking-wider text-white">ROYAL SMP</span>
                <span className="block text-[11px] text-[#D4AF37] font-medium tracking-wide">SEASON 6 MULTI-REALM</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Player Login / Skin Profile Section in Drawer */}
          <div className="my-4">
            {player ? (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-[#121626] border border-[#D4AF37]/35 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 border-2 border-[#D4AF37] shadow">
                    <img
                      src={player.avatarUrl}
                      alt={player.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/64';
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                      LOGGED IN PLAYER
                    </span>
                    <span className="font-brand text-sm font-bold text-white truncate max-w-[130px] block">
                      {player.username}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                  }}
                  className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                  title="Logout player"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
                className="w-full p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-[#D4AF37]/30 flex items-center justify-center gap-2 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                <User size={15} className="text-[#D4AF37]" />
                <span>Login with Minecraft IGN</span>
              </button>
            )}
          </div>

          {/* Quick Action Pinned Pill */}
          <div className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-[#D4AF37]/15 to-[#4F46E5]/15 border border-[#D4AF37]/25 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#FDE68A] font-semibold">Server Address</p>
              <p className="text-[13px] font-mono text-white select-all">{SERVER_CONFIG.javaIP}</p>
            </div>
            <button
              onClick={onCopyJava}
              className="px-3 py-1.5 rounded-full bg-[#D4AF37] text-slate-950 text-xs font-bold flex items-center gap-1.5 hover:bg-[#FDE68A] active:scale-95 transition-all shadow-[0_0_12px_rgba(212,175,55,0.4)] cursor-pointer"
            >
              {copiedJava ? <Check size={13} /> : <Copy size={13} />}
              {copiedJava ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Navigation Links with Subtle Gold Dividers */}
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => handleLinkClick('home')}
              className={`w-full flex items-center justify-between py-3 px-3 rounded-xl transition-all text-sm font-medium group cursor-pointer ${
                activeView === 'home'
                  ? 'bg-[#D4AF37]/20 text-[#FDE68A] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <Sparkles size={17} className="text-[#D4AF37]" />
                Home Portal
              </span>
              <ChevronRight size={15} className="text-slate-600 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

            <button
              onClick={() => handleLinkClick('store')}
              className={`w-full flex items-center justify-between py-3 px-3 rounded-xl transition-all text-sm font-medium group cursor-pointer ${
                activeView === 'store' || activeView === 'ranks'
                  ? 'bg-[#D4AF37]/20 text-[#FDE68A] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <ShoppingBag size={17} className="text-[#D4AF37]" />
                Royal Treasury &amp; Ranks
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#FDE68A] border border-[#D4AF37]/30">STORE</span>
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

            <button
              onClick={() => handleLinkClick('leaderboard')}
              className={`w-full flex items-center justify-between py-3 px-3 rounded-xl transition-all text-sm font-medium group cursor-pointer ${
                activeView === 'leaderboard'
                  ? 'bg-[#D4AF37]/20 text-[#FDE68A] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <Trophy size={17} className="text-[#D4AF37]" />
                Leaderboards (Hall of Fame)
              </span>
              <ChevronRight size={15} className="text-slate-600 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

            <button
              onClick={() => handleLinkClick('vote')}
              className={`w-full flex items-center justify-between py-3 px-3 rounded-xl transition-all text-sm font-medium group cursor-pointer ${
                activeView === 'vote'
                  ? 'bg-[#D4AF37]/20 text-[#FDE68A] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <Vote size={17} className="text-[#D4AF37]" />
                Vote for Rewards
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">2x Keys</span>
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

            <button
              onClick={() => handleLinkClick('track')}
              className={`w-full flex items-center justify-between py-3 px-3 rounded-xl transition-all text-sm font-medium group cursor-pointer ${
                activeView === 'track'
                  ? 'bg-[#D4AF37]/20 text-[#FDE68A] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <Search size={17} className="text-[#D4AF37]" />
                Track Order
              </span>
              <ChevronRight size={15} className="text-slate-600 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

            <button
              onClick={() => handleLinkClick('rules')}
              className={`w-full flex items-center justify-between py-3 px-3 rounded-xl transition-all text-sm font-medium group cursor-pointer ${
                activeView === 'rules'
                  ? 'bg-[#D4AF37]/20 text-[#FDE68A] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <ShieldCheck size={17} className="text-[#D4AF37]" />
                Server Rules &amp; Decree
              </span>
              <ChevronRight size={15} className="text-slate-600 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

            <button
              onClick={() => handleLinkClick('about')}
              className={`w-full flex items-center justify-between py-3 px-3 rounded-xl transition-all text-sm font-medium group cursor-pointer ${
                activeView === 'about'
                  ? 'bg-[#D4AF37]/20 text-[#FDE68A] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <Info size={17} className="text-[#D4AF37]" />
                About Royal SMP Network
              </span>
              <ChevronRight size={15} className="text-slate-600 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

            <button
              onClick={() => {
                onClose();
                onOpenNotifications();
              }}
              className="w-full flex items-center justify-between py-3 px-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-sm font-medium group cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Newspaper size={17} className="text-[#D4AF37]" />
                Chronicle &amp; Updates
              </span>
              <ChevronRight size={15} className="text-slate-600 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

            <a
              href={SERVER_CONFIG.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between py-3 px-3 text-indigo-300 hover:text-white hover:bg-indigo-950/30 rounded-xl transition-colors text-sm font-medium group"
            >
              <span className="flex items-center gap-3">
                <MessageSquare size={17} className="text-indigo-400" />
                Discord Citadel
              </span>
              <span className="text-[11px] text-indigo-400 font-mono">3.8k+</span>
            </a>
          </nav>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="pt-6 border-t border-[#D4AF37]/20 space-y-3">
          {cartCount > 0 && (
            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="w-full py-2.5 px-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-between transition-colors border border-white/10 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag size={14} className="text-[#D4AF37]" />
                View Cart
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-slate-950 text-[10px] font-bold">
                {cartCount} item{cartCount > 1 ? 's' : ''}
              </span>
            </button>
          )}

          <button
            onClick={() => handleLinkClick('store')}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-98 transition-all cursor-pointer"
          >
            OPEN ROYAL TREASURY
          </button>

          {/* Discreet Staff Lock trigger */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
            <span>Manual Verification 15 Mins</span>
            <button
              onClick={() => {
                onClose();
                onOpenStaffGate();
              }}
              className="p-1 text-slate-600 hover:text-[#D4AF37] transition-colors cursor-pointer"
              title="Staff Terminal Gate"
              aria-label="Staff Terminal Gate"
            >
              <Lock size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
