import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Users, 
  Activity, 
  Wifi, 
  Sparkles, 
  Laptop, 
  Smartphone, 
  Crown, 
  Swords, 
  Skull, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  MessageSquare, 
  ArrowUpRight, 
  ChevronDown, 
  Cpu, 
  ShieldAlert, 
  Scale, 
  Gamepad2, 
  Eye, 
  Calendar, 
  Zap,
  Globe,
  Compass
} from 'lucide-react';
import { 
  SERVER_CONFIG, 
  GAME_MODES, 
  WHY_PLAY_CARDS, 
  PATCH_NOTES, 
  FAQS_COMPREHENSIVE 
} from '../data/serverData';
import { ActiveView, ServerStatus, AnnouncementItem } from '../types';

interface HomeViewProps {
  serverStatus: ServerStatus | null;
  copiedJava: boolean;
  copiedBedrock: boolean;
  onCopyJava: () => void;
  onCopyBedrock: () => void;
  onNavigate: (view: ActiveView) => void;
  onShowToast: (msg: string) => void;
  announcements?: AnnouncementItem[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  serverStatus,
  copiedJava,
  copiedBedrock,
  onCopyJava,
  onCopyBedrock,
  onNavigate,
  onShowToast,
  announcements = [],
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const onlinePlayers = serverStatus?.players?.online ?? 148;
  const maxPlayers = serverStatus?.players?.max ?? 500;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      onShowToast('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    onShowToast('Subscribed to the Royal Chronicle updates!');
    setNewsletterEmail('');
  };

  const getWhyIcon = (icon: string) => {
    switch (icon) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-emerald-400" />;
      case 'Scale': return <Scale className="w-5 h-5 text-yellow-300" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-indigo-400" />;
      case 'Eye': return <Eye className="w-5 h-5 text-cyan-400" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-purple-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#D4AF37]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-orange-400" />;
      default: return <Sparkles className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  const getGameModeIcon = (icon: string) => {
    switch (icon) {
      case 'Crown': return <Crown className="w-7 h-7 text-[#D4AF37]" />;
      case 'Swords': return <Swords className="w-7 h-7 text-red-400" />;
      case 'Skull': return <Skull className="w-7 h-7 text-purple-400" />;
      default: return <Crown className="w-7 h-7 text-[#D4AF37]" />;
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* ======================================================== */}
      {/* 1. GRAND HERO SECTION */}
      {/* ======================================================== */}
      <section className="relative pt-10 sm:pt-16 pb-12 sm:pb-20 overflow-hidden text-center">
        {/* Background Radial Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] bg-gradient-to-tr from-[#4F46E5]/18 via-[#D4AF37]/15 to-transparent blur-[130px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          {/* Live Pill Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/95 border border-[#D4AF37]/35 text-xs text-[#FDE68A] shadow-[0_0_25px_rgba(212,175,55,0.2)] mb-8 select-none transition-transform hover:scale-105">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wider uppercase">
              SERVER ONLINE • JAVA &amp; BEDROCK • EST. 2020
            </span>
          </div>

          {/* Title: "RULE YOUR KINGDOM IN ROYAL SMP" with animated gold shimmer */}
          <h1 className="font-brand text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.05] mb-6">
            <span className="bg-gradient-to-r from-[#FFF4B8] via-[#E5B83B] via-[#F59E0B] to-[#FFF4B8] bg-clip-text text-transparent animate-gold-shimmer drop-shadow-[0_4px_35px_rgba(212,175,55,0.35)]">
              RULE YOUR KINGDOM IN ROYAL SMP
            </span>
          </h1>

          {/* Subtitle: 2-line punchy description */}
          <p className="max-w-2xl text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-10 text-balance">
            South Asia's premier Minecraft survival realm. Build sovereign dynasties, dominate player-driven commerce, and forge your legend.
          </p>

          {/* Quick Connect Dock (Sleek Dual Pill Buttons) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mb-12">
            {/* Primary Gold Pill: "Copy Java IP ⚔" */}
            <button
              onClick={onCopyJava}
              className="w-full sm:w-auto flex-1 group px-7 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] text-slate-950 font-black text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:shadow-[0_0_42px_rgba(212,175,55,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-[#FFF9D2] cursor-pointer"
            >
              {copiedJava ? (
                <>
                  <Check size={18} className="stroke-[3]" />
                  <span>play.royallsmp.net Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={18} className="text-slate-900 group-hover:scale-110 transition-transform" />
                  <span>Copy Java IP ⚔</span>
                </>
              )}
            </button>

            {/* Secondary Glass Pill: "Copy Bedrock IP" */}
            <button
              onClick={onCopyBedrock}
              className="w-full sm:w-auto flex-1 group px-7 py-4 rounded-full bg-slate-900/85 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm sm:text-base tracking-wide border border-[#D4AF37]/35 hover:border-[#D4AF37]/75 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_24px_rgba(212,175,55,0.25)] hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {copiedBedrock ? (
                <>
                  <Check size={17} className="text-emerald-400 stroke-[3]" />
                  <span className="text-emerald-300 font-bold">Port 26069 Copied!</span>
                </>
              ) : (
                <>
                  <span className="text-[#D4AF37] font-mono text-xs px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                    PORT 26069
                  </span>
                  <span>Copy Bedrock IP</span>
                </>
              )}
            </button>
          </div>

          {/* Live Server Stats: Real-time counter, Ping gauge, and 99.9% Uptime */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 shadow-sm">
              <Users size={15} className="text-emerald-400" />
              <span>
                Players Online: <strong className="text-white font-mono tabular-nums">{onlinePlayers}/{maxPlayers}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 shadow-sm">
              <Wifi size={15} className="text-cyan-400" />
              <span>
                Asian Routing: <strong className="text-white font-mono">&lt;20ms Sub-Ping</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 shadow-sm">
              <Activity size={15} className="text-[#D4AF37]" />
              <span>
                Hardware Uptime: <strong className="text-white font-mono">99.98%</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. LIVE NETWORK REALM OVERVIEW (PLAYER DISTRIBUTION) */}
      {/* ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-[#D4AF37]/25 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-slate-800 text-center sm:text-left">
            <div>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block">
                GLOBAL TELEMETRY
              </span>
              <h3 className="font-brand text-lg font-bold text-white">
                Live Network Realms Status
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>BungeeCord Proxies Synced</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
            {/* Survival Realm Card */}
            <div className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/15 text-[#D4AF37]">
                  <Crown size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Survival SMP (S6)</h4>
                  <span className="text-xs text-slate-400">Main Dynmap Realm</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-bold text-[#FDE68A]">130 Warriors</span>
                <span className="text-[10px] text-emerald-400 block font-semibold">20.0 TPS</span>
              </div>
            </div>

            {/* Warzone Arena Card */}
            <div className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-500/15 text-red-400">
                  <Swords size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Warzone &amp; Duels</h4>
                  <span className="text-xs text-slate-400">Competitive PvP Arena</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-bold text-red-300">18 Warriors</span>
                <span className="text-[10px] text-emerald-400 block font-semibold">KOTH Active</span>
              </div>
            </div>

            {/* Hub & Gateway Card */}
            <div className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400">
                  <Globe size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Main Citadel Hub</h4>
                  <span className="text-xs text-slate-400">Spawn &amp; Marketplace</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-bold text-indigo-300">Fast Queue</span>
                <span className="text-[10px] text-emerald-400 block font-semibold">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. GAME MODES SHOWCASE ("CHOOSE YOUR ADVENTURE" GRID) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2">
            Immersive Worlds
          </p>
          <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Choose Your Adventure
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Engineered with deep custom game mechanics, balanced reward cycles, and zero pay-to-win barriers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {GAME_MODES.map((mode) => (
            <div
              key={mode.id}
              className={`group relative rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-[#D4AF37]/50 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.2)]`}
            >
              {/* Subtle Golden Top Border */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-[#D4AF37]/30 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    {getGameModeIcon(mode.icon)}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-slate-800/90 text-[#FDE68A] border border-white/5 uppercase">
                    {mode.badge}
                  </span>
                </div>

                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  {mode.tag}
                </span>
                <h3 className="font-brand text-2xl font-black text-white mb-2 group-hover:text-[#FDE68A] transition-colors">
                  {mode.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {mode.description}
                </p>

                {/* Features Checkpoints */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800/80">
                  {mode.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 size={13} className="text-[#D4AF37] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {mode.playersCount}
                </span>
                <button
                  onClick={onCopyJava}
                  className="text-xs font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 group/btn cursor-pointer"
                >
                  <span>Join Mode</span>
                  <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. "WHY PLAY ON ROYAL SMP?" (8 COMPACT HIGHLIGHT CARDS) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2">
            Superior Infrastructure
          </p>
          <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Why Play on Royal SMP?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Built from 5+ years of feedback to deliver Bangladesh &amp; Asia's most fluid Minecraft survival experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_PLAY_CARDS.map((card) => (
            <div
              key={card.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#D4AF37]/45 transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/60 group-hover:border-[#D4AF37]/50 transition-colors">
                    {getWhyIcon(card.icon)}
                  </div>
                  {card.badge && (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-[#FDE68A] border border-white/5">
                      {card.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-brand text-base font-bold text-white mb-2 group-hover:text-[#FDE68A] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. HOW TO JOIN GUIDE (INTERACTIVE 4-STEP FLOW) */}
      {/* ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2">
            Fast Access
          </p>
          <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            How to Join the Realm
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Four easy steps to establish your character on Java or Bedrock Edition.
          </p>
        </div>

        {/* 4-Step Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {[
            { num: '01', title: 'Copy Server IP', desc: 'Copy play.royallsmp.net or bedrock port 26069 below.' },
            { num: '02', title: 'Open Minecraft', desc: 'Launch version 1.20 - 1.21.x on PC, mobile, or console.' },
            { num: '03', title: 'Add to Server List', desc: 'Go to Multiplayer > Add Server and paste the address.' },
            { num: '04', title: 'Claim Your Realm!', desc: 'Join spawn, type /kit starter, and mark your claims.' }
          ].map((st) => (
            <div
              key={st.num}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-[#D4AF37]/40 backdrop-blur-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-brand text-2xl font-black text-[#D4AF37]">
                  {st.num}
                </span>
                <span className="w-6 h-px bg-[#D4AF37]/30" />
              </div>
              <h3 className="font-brand text-base font-bold text-white mb-1.5">{st.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Dedicated Java and Bedrock Setup Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Java Setup Card */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-[#D4AF37]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-800 text-[#D4AF37]">
                    <Laptop size={18} />
                  </div>
                  <div>
                    <h4 className="font-brand text-base font-bold text-white">Java Edition Setup</h4>
                    <span className="text-[11px] text-slate-400">PC / Mac / Linux (1.20 - 1.21.x)</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400">Default Port: 25565</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/60 border border-slate-800 mb-5 flex items-center justify-between">
                <span className="font-mono text-sm text-[#FDE68A] select-all truncate">
                  {SERVER_CONFIG.javaIP}
                </span>
                <span className="text-xs text-slate-500 font-mono">Port Optional</span>
              </div>
            </div>
            <button
              onClick={onCopyJava}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs tracking-wide shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedJava ? <Check size={15} /> : <Copy size={15} />}
              <span>{copiedJava ? 'Java Address Copied!' : 'Copy Java Address'}</span>
            </button>
          </div>

          {/* Bedrock Setup Card */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-[#D4AF37]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-800 text-indigo-400">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h4 className="font-brand text-base font-bold text-white">Bedrock / Mobile Setup</h4>
                    <span className="text-[11px] text-slate-400">Android, iOS, Win10, Consoles</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-indigo-400">Geyser Crossplay</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/60 border border-slate-800 mb-5 flex items-center justify-between">
                <span className="font-mono text-sm text-slate-200 select-all truncate">
                  {SERVER_CONFIG.bedrockIP}
                </span>
                <span className="text-xs font-mono text-[#FDE68A] font-bold bg-[#D4AF37]/15 px-2 py-0.5 rounded">
                  Port: {SERVER_CONFIG.bedrockPort}
                </span>
              </div>
            </div>
            <button
              onClick={onCopyBedrock}
              className="w-full py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs tracking-wide border border-white/10 hover:border-[#D4AF37]/50 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedBedrock ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
              <span>{copiedBedrock ? 'Port Copied!' : 'Copy Bedrock Port (26069)'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. LATEST NEWS & ANNOUNCEMENTS (FEATURE 4) */}
      {/* ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2">
            Chronicles of the Realm
          </p>
          <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Latest News &amp; Announcements
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Keep abreast of network updates, balance notes, and weekly kingdom events.
          </p>
        </div>

        {/* Display Dynamic Announcements if present, or Patch Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements && announcements.length > 0 ? (
            announcements.slice(0, 4).map((ann) => (
              <div
                key={ann.id}
                className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-[#D4AF37]/40 backdrop-blur-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/30 uppercase">
                      {ann.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{ann.date}</span>
                  </div>
                  <h3 className="font-brand text-xl font-bold text-white mb-3">
                    {ann.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6 whitespace-pre-line">
                    {ann.content}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>By {ann.author || 'Royal Administration'}</span>
                  <button
                    onClick={() => onNavigate('rules')}
                    className="text-xs font-semibold text-[#D4AF37] hover:text-[#FFF] cursor-pointer"
                  >
                    View Server Decree &rarr;
                  </button>
                </div>
              </div>
            ))
          ) : (
            PATCH_NOTES.map((patch) => (
              <div
                key={patch.id}
                className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-[#D4AF37]/40 backdrop-blur-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/30 uppercase">
                      {patch.tag}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{patch.date}</span>
                  </div>
                  <span className="text-xs font-bold text-[#D4AF37] block mb-1">
                    {patch.version}
                  </span>
                  <h3 className="font-brand text-xl font-bold text-white mb-4">
                    {patch.title}
                  </h3>
                  <ul className="space-y-2.5 mb-6">
                    {patch.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <span className="text-[#D4AF37] font-bold mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>By Royal SMP Administration</span>
                  <button
                    onClick={() => onNavigate('rules')}
                    className="text-xs font-semibold text-[#D4AF37] hover:text-[#FFF] cursor-pointer"
                  >
                    View Server Decree &rarr;
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. COMPREHENSIVE FAQ ACCORDION (10+ COMMON QUESTIONS) */}
      {/* ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2">
            King's Inquiries
          </p>
          <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Comprehensive solutions regarding connections, grief prevention, and payments.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS_COMPREHENSIVE.map((faq, idx) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-[#D4AF37]/50 shadow-[0_8px_25px_rgba(0,0,0,0.5)]'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-brand font-bold text-xs text-[#D4AF37] w-6 shrink-0">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}.
                    </span>
                    <span className="font-brand text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`p-1.5 rounded-full transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown size={17} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-800/80">
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-3">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. STAY UPDATED / NEWSLETTER SUBSCRIPTION */}
      {/* ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#121626]/90 to-slate-900/90 border border-[#D4AF37]/35 text-center shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase block mb-1">
              ROYAL CHRONICLE DISPATCH
            </span>
            <h3 className="font-brand text-2xl sm:text-3xl font-black text-white mb-3">
              Stay Updated on Season 6 Drops
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Subscribe to get immediate alerts for tournament brackets, rank discounts, and Netherite unlocks straight to your inbox.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                <span>You are officially subscribed to the Royal Chronicle!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-slate-900 border border-slate-700 focus:border-[#D4AF37] text-sm text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. DISCORD CITADEL BANNER */}
      {/* ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0C1020]/95 via-[#13162C]/90 to-[#0A0D1A]/95 border border-indigo-500/30 p-8 sm:p-12 backdrop-blur-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
                <MessageSquare size={14} className="text-indigo-400" />
                <span>Live Discord Citadel: {SERVER_CONFIG.discordMemberCount} Active Members</span>
              </div>
              <h2 className="font-brand text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3">
                Join the Discord Citadel
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Recruit kingdom commanders, trade rare Netherite gear, participate in giveaways, and receive 24/7 ticket support.
              </p>
            </div>

            <a
              href={SERVER_CONFIG.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer shrink-0"
            >
              <MessageSquare size={18} />
              <span>Join Discord Server</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
