import React from 'react';
import { Bell, ShoppingBag, Menu, User, LogOut } from 'lucide-react';
import { RoyalCrest } from './RoyalCrest';
import { ActiveView, MinecraftPlayer } from '../types';

interface NavbarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onOpenNotifications: () => void;
  onOpenCart: () => void;
  onOpenDrawer: () => void;
  cartCount: number;
  unreadCount?: number;
  player: MinecraftPlayer | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  onOpenNotifications,
  onOpenCart,
  onOpenDrawer,
  cartCount,
  unreadCount = 2,
  player,
  onOpenLogin,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#080A10]/90 border-b border-[#D4AF37]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
        {/* Left: Royal SMP Crown Crest + Brand Mark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group text-left transition-transform active:scale-95 cursor-pointer shrink-0"
          aria-label="Royal SMP Home View"
        >
          <RoyalCrest size={38} />
          <div className="flex flex-col">
            <span className="font-brand text-lg sm:text-xl font-black tracking-wider text-white group-hover:text-[#FDE68A] transition-colors leading-none">
              ROYAL SMP
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#D4AF37] tracking-[0.2em] uppercase mt-0.5">
              Official Network
            </span>
          </div>
        </button>

        {/* Center: Multi-View Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-slate-300">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeView === 'home'
                ? 'bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/30 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('store')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeView === 'store' || activeView === 'ranks'
                ? 'bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/30 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Store &amp; Ranks
          </button>
          <button
            onClick={() => onNavigate('leaderboard')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeView === 'leaderboard'
                ? 'bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/30 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => onNavigate('vote')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeView === 'vote'
                ? 'bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/30 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Vote
          </button>
          <button
            onClick={() => onNavigate('track')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeView === 'track'
                ? 'bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/30 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Track Order
          </button>
          <button
            onClick={() => onNavigate('rules')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeView === 'rules'
                ? 'bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/30 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Rules
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeView === 'about'
                ? 'bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/30 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right: Login/Player Skin + STORE Button, Chime, Cart Pill, Drawer trigger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Minecraft IGN Login / Skin Avatar Badge */}
          {player ? (
            <div className="flex items-center gap-1.5 p-1 sm:pl-2 sm:pr-1 rounded-full bg-slate-900/90 border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-800 border border-[#D4AF37] shrink-0">
                <img
                  src={player.avatarUrl}
                  alt={player.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/64';
                  }}
                />
              </div>
              <span className="hidden sm:inline font-brand font-bold text-xs text-[#FDE68A] max-w-[95px] truncate">
                {player.username}
              </span>
              <button
                onClick={onLogout}
                className="p-1 text-slate-400 hover:text-red-400 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                title="Logout character"
                aria-label="Logout character"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold border border-[#D4AF37]/35 hover:border-[#D4AF37]/75 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <User size={13} className="text-[#D4AF37]" />
              <span>Login</span>
            </button>
          )}

          {/* Golden Pill STORE Button */}
          <button
            onClick={() => onNavigate('store')}
            className="group relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] animate-gold-shimmer text-[#080A10] font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_28px_rgba(212,175,55,0.65)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 border border-[#FFF3B0]/60 shrink-0 cursor-pointer"
          >
            <ShoppingBag size={13} className="stroke-[2.5]" />
            <span className="font-extrabold tracking-wider">STORE</span>
          </button>

          {/* Notification Chime Icon */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full bg-slate-900/80 border border-[#D4AF37]/25 text-slate-300 hover:text-[#FDE68A] hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 transition-all active:scale-95 cursor-pointer"
            aria-label="View server announcements and chronicles"
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#E2136E] ring-2 ring-[#080A10]" />
            )}
          </button>

          {/* Player Cart Pill */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/80 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 text-slate-200 hover:text-[#FDE68A] hover:bg-[#D4AF37]/10 transition-all active:scale-95 cursor-pointer"
            aria-label="View shopping cart"
          >
            <ShoppingBag size={15} className="text-[#D4AF37]" />
            <span className="text-xs font-mono font-bold">
              {cartCount > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-[#080A10] text-[10px] font-black">
                  {cartCount}
                </span>
              ) : (
                <span className="text-slate-400 hidden xs:inline">Cart</span>
              )}
            </span>
          </button>

          {/* Minimalist Hamburger Drawer Trigger */}
          <button
            onClick={onOpenDrawer}
            className="p-2 rounded-full bg-slate-900/80 border border-[#D4AF37]/25 text-slate-300 hover:text-white hover:border-[#D4AF37]/60 hover:bg-white/5 transition-all active:scale-95 cursor-pointer"
            aria-label="Open navigation menu drawer"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
