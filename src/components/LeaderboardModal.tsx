import React, { useState } from 'react';
import { X, Trophy, Swords, Coins, Clock, Crown } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'kills' | 'wealth' | 'playtime'>('wealth');

  if (!isOpen) return null;

  const wealthData = [
    { rank: 1, name: 'mr_nasa', title: 'Grand Monarch', stat: '$12,500,000', clan: 'Royal Dynasty' },
    { rank: 2, name: 'RaFI_Playz', title: 'Prime Chancellor', stat: '$8,950,000', clan: 'Royal Guard' },
    { rank: 3, name: 'Vortex_King', title: 'High Duke', stat: '$5,400,000', clan: 'Eclipse Order' },
    { rank: 4, name: 'SlayerX99', title: 'Lord Marshal', stat: '$3,820,000', clan: 'Valhalla' },
    { rank: 5, name: 'Aetheria', title: 'Baroness', stat: '$2,910,000', clan: 'Solaris' },
  ];

  const killsData = [
    { rank: 1, name: 'SlayerX99', title: 'Warmaster', stat: '1,482 Kills', clan: 'Valhalla' },
    { rank: 2, name: 'Vortex_King', title: 'Gladiator', stat: '1,120 Kills', clan: 'Eclipse Order' },
    { rank: 3, name: 'ShadowStrike', title: 'Assassin', stat: '945 Kills', clan: 'Nightfall' },
    { rank: 4, name: 'RaFI_Playz', title: 'Prime Chancellor', stat: '810 Kills', clan: 'Royal Guard' },
    { rank: 5, name: 'DragonBorn_BD', title: 'Knight', stat: '670 Kills', clan: 'Bengal Tigers' },
  ];

  const playtimeData = [
    { rank: 1, name: 'mr_nasa', title: 'Grand Monarch', stat: '1,420 Hours', clan: 'Royal Dynasty' },
    { rank: 2, name: 'RaFI_Playz', title: 'Prime Chancellor', stat: '1,190 Hours', clan: 'Royal Guard' },
    { rank: 3, name: 'CraftMasterBD', title: 'Master Builder', stat: '980 Hours', clan: 'Craft Guild' },
    { rank: 4, name: 'Vortex_King', title: 'High Duke', stat: '850 Hours', clan: 'Eclipse Order' },
    { rank: 5, name: 'Zafreen_BD', title: 'Baroness', stat: '760 Hours', clan: 'Solaris' },
  ];

  const currentList = tab === 'wealth' ? wealthData : tab === 'kills' ? killsData : playtimeData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl bg-[#0A0E18] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
              <Trophy size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                HALL OF FAME
              </span>
              <h3 className="font-brand text-xl font-bold text-white">
                Season 6 Leaderboards
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="my-5 p-1 rounded-full bg-slate-900 border border-slate-800 grid grid-cols-3 gap-1">
          <button
            onClick={() => setTab('wealth')}
            className={`py-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === 'wealth'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Coins size={13} />
            <span>Treasury</span>
          </button>
          <button
            onClick={() => setTab('kills')}
            className={`py-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === 'kills'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Swords size={13} />
            <span>Warzone</span>
          </button>
          <button
            onClick={() => setTab('playtime')}
            className={`py-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === 'playtime'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock size={13} />
            <span>Playtime</span>
          </button>
        </div>

        {/* List */}
        <div className="space-y-2.5 max-h-[46vh] overflow-y-auto pr-1">
          {currentList.map((entry) => (
            <div
              key={entry.rank}
              className={`p-3.5 rounded-2xl flex items-center justify-between border ${
                entry.rank === 1
                  ? 'bg-gradient-to-r from-[#D4AF37]/15 to-transparent border-[#D4AF37]/50'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-brand font-black text-xs ${
                    entry.rank === 1
                      ? 'bg-[#D4AF37] text-slate-950 shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                      : entry.rank === 2
                      ? 'bg-slate-300 text-slate-950'
                      : entry.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {entry.rank}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-brand font-bold text-sm text-white">{entry.name}</span>
                    {entry.rank === 1 && <Crown size={13} className="text-[#D4AF37]" />}
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {entry.clan} • {entry.title}
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm font-bold text-[#FDE68A]">
                {entry.stat}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            Leaderboard stats update automatically from realm servers every 60 minutes.
          </p>
        </div>
      </div>
    </div>
  );
};
