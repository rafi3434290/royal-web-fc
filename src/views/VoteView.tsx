import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Coins, 
  Sparkles, 
  ExternalLink, 
  Gift, 
  Clock,
  UserCheck
} from 'lucide-react';
import { SERVER_CONFIG } from '../data/serverData';

interface VoteViewProps {
  defaultIgn?: string;
}

export const VoteView: React.FC<VoteViewProps> = ({ defaultIgn = '' }) => {
  const [ign, setIgn] = useState(defaultIgn);

  useEffect(() => {
    if (defaultIgn) {
      setIgn(defaultIgn);
    }
  }, [defaultIgn]);

  const voteLinks = [
    {
      id: 'mp',
      name: 'Minecraft-MP Network (Primary)',
      url: SERVER_CONFIG.voteUrl,
      cooldown: 'Every 24 Hours',
      badge: 'TOP VOTED'
    },
    {
      id: 'topg',
      name: 'TopG Minecraft Server Portal',
      url: 'https://topg.org/minecraft-servers/',
      cooldown: 'Every 24 Hours',
      badge: 'DOUBLE KEYS'
    },
    {
      id: 'planetmc',
      name: 'Planet Minecraft Registry',
      url: 'https://www.planetminecraft.com',
      cooldown: 'Every 24 Hours',
      badge: 'COMMUNITY'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2 block">
          COMMUNITY BLESSINGS
        </span>
        <h1 className="font-brand text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Vote for Royal SMP
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Cast your vote daily to elevate our realm on global rankings and unlock instant crate keys and coins in-game.
        </p>

        {defaultIgn && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-[#D4AF37]/35 text-xs text-[#FDE68A] mt-4">
            <UserCheck size={14} className="text-[#D4AF37]" />
            <span>Logged in as <strong>{defaultIgn}</strong></span>
          </div>
        )}
      </div>

      {/* Rewards Showcase */}
      <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171308] via-slate-900 to-[#121626] border border-[#D4AF37]/40 shadow-xl">
        <h3 className="font-brand text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Gift size={20} className="text-[#D4AF37]" />
          <span>Guaranteed Instant In-Game Vote Rewards</span>
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Rewards are delivered to your character within 60 seconds of casting a verified vote.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Key size={20} className="text-[#D4AF37]" />
            </div>
            <div>
              <span className="font-brand text-base font-bold text-white block">2x Royal Vote Keys</span>
              <span className="text-xs text-slate-400">Unlock Mythic Crates in Spawn</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center shrink-0">
              <Coins size={20} className="text-[#F59E0B]" />
            </div>
            <div>
              <span className="font-brand text-base font-bold text-white block">$1,000 In-Game Cash</span>
              <span className="text-xs text-slate-400">Instant balance credit</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-purple-400" />
            </div>
            <div>
              <span className="font-brand text-base font-bold text-white block">100 Silver Shards</span>
              <span className="text-xs text-slate-400">Monthly Rank Lottery Entry</span>
            </div>
          </div>
        </div>
      </div>

      {/* Voting Sites Directory */}
      <div className="space-y-4">
        <h3 className="font-brand text-lg font-bold text-white">
          Active Voting Portals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {voteLinks.map((link) => (
            <div
              key={link.id}
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/25">
                    {link.badge}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock size={12} />
                    <span>{link.cooldown}</span>
                  </span>
                </div>
                <h4 className="font-brand text-base font-bold text-white mb-2">
                  {link.name}
                </h4>
                <p className="text-xs text-slate-400 mb-6">
                  Click to open the verification page, enter your in-game name {ign ? `(${ign})` : ''}, and solve the captcha.
                </p>
              </div>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-bold text-xs tracking-wide shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Vote on Site</span>
                <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Step Voter Guide */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
        <h4 className="font-brand text-base font-bold text-white mb-4">
          How to Ensure Rewards Land in Your Inventory:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800/80">
            <span className="font-brand font-bold text-[#D4AF37] text-sm block mb-1">01. Exact Username</span>
            <p className="text-slate-400">Enter your exact Minecraft In-Game Name (IGN) with proper capitalization on the voting site.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800/80">
            <span className="font-brand font-bold text-[#D4AF37] text-sm block mb-1">02. Be Online</span>
            <p className="text-slate-400">Ideally be connected to play.royallsmp.net, or log in within 24 hours to receive queued keys.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800/80">
            <span className="font-brand font-bold text-[#D4AF37] text-sm block mb-1">03. Open Vote Crates</span>
            <p className="text-slate-400">Head to server spawn and right-click the designated Vote Crates with your awarded keys.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
