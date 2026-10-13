import React from 'react';
import { RoyalCrest } from './RoyalCrest';
import { SERVER_CONFIG } from '../data/serverData';
import { ActiveView } from '../types';
import { Lock, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
  onOpenStaffGate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenStaffGate }) => {
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#06080E] pt-16 pb-12 relative z-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Multi-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Server Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <RoyalCrest size={40} />
              <div>
                <span className="font-brand text-lg font-black text-white tracking-wider block leading-none">
                  {SERVER_CONFIG.name}
                </span>
                <span className="text-[10px] text-[#D4AF37] font-semibold tracking-widest uppercase mt-0.5 block">
                  Official Minecraft Network
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Operating since {SERVER_CONFIG.estYear}. Bangladesh &amp; South Asia's preeminent survival multiplayer network featuring Season 6, 99.98% uptime, and crossplay.
            </p>
            <div className="font-mono text-[11px] text-[#FDE68A]">
              IP: {SERVER_CONFIG.javaIP} | Port: {SERVER_CONFIG.bedrockPort}
            </div>
          </div>

          {/* Column 2: Realms & Navigation */}
          <div className="space-y-3">
            <h4 className="font-brand text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Landing Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('store')}
                  className="hover:text-[#FDE68A] text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Royal Treasury &amp; Store
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('leaderboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hall of Fame (Leaderboards)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vote')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Daily Vote for Keys
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support & Guidelines */}
          <div className="space-y-3">
            <h4 className="font-brand text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
              Kingdom Directives
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('track')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track bKash/Nagad Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rules')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Royal Decree (Rules)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Network &amp; Hardware
                </button>
              </li>
              <li>
                <a
                  href={SERVER_CONFIG.discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Discord Citadel</span>
                  <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Developer Credit & Staff Lock */}
          <div className="space-y-4">
            <h4 className="font-brand text-sm font-bold text-white uppercase tracking-wider text-[#D4AF37]">
              Crafted With Passion
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-[#D4AF37]/30 space-y-3">
              <p className="text-[11px] text-slate-300">
                Crafted with passion for Royal SMP by <strong className="text-[#FDE68A] font-bold">RAFI</strong>
              </p>
              {/* Discrete Staff Lock Trigger */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">Administration</span>
                <button
                  onClick={onOpenStaffGate}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-[#D4AF37]/20 text-slate-400 hover:text-[#D4AF37] transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                  title="Staff Portal Gate"
                  aria-label="Staff Portal Gate"
                >
                  <Lock size={12} />
                  <span>Staff Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-slate-500 text-[11px] leading-relaxed">
          <p>
            &copy; {new Date().getFullYear()} {SERVER_CONFIG.name}. All rights reserved. Operating continuously since {SERVER_CONFIG.estYear}.
          </p>
          <p className="max-w-xl text-center md:text-right">
            Not an official Minecraft service. Not approved by or associated with Mojang or Microsoft. All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};
