import React, { useState } from 'react';
import { 
  Trophy, 
  Coins, 
  Swords, 
  Clock, 
  Crown, 
  Search,
  Users
} from 'lucide-react';
import { LeaderboardDataset, LeaderboardEntry, LeaderboardCategory } from '../types';

interface LeaderboardViewProps {
  leaderboards: LeaderboardDataset;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ leaderboards }) => {
  const [tab, setTab] = useState<LeaderboardCategory>('wealth');
  const [searchQuery, setSearchQuery] = useState('');

  const currentData: LeaderboardEntry[] = leaderboards[tab] || [];

  const filteredData = currentData.filter((entry) =>
    entry.ign.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.clan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort by rank ascending
  const sortedData = [...filteredData].sort((a, b) => a.rank - b.rank);
  const top3 = [...currentData].sort((a, b) => a.rank - b.rank).slice(0, 3);

  const getTabLabel = () => {
    switch (tab) {
      case 'wealth': return 'Treasury Fortune (Top Balance / Richest)';
      case 'kills': return 'Combat Dominance (Top PvP Kills)';
      case 'playtime': return 'Realm Dedication (Longest Playtime)';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2 block">
          HALL OF MONARCHS
        </span>
        <h1 className="font-brand text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Season 6 Leaderboard
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Celebrating the fiercest warriors, wealthiest dynasties, and most enduring rulers in Royal SMP.
        </p>

        {/* Interactive Tabs */}
        <div className="inline-flex p-1.5 rounded-full bg-slate-900/95 border border-slate-800 mt-8 shadow-md">
          <button
            onClick={() => setTab('wealth')}
            className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              tab === 'wealth'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Coins size={15} />
            <span>Top Balance / Richest</span>
          </button>
          <button
            onClick={() => setTab('kills')}
            className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              tab === 'kills'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Swords size={15} />
            <span>Top PvP Kills</span>
          </button>
          <button
            onClick={() => setTab('playtime')}
            className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              tab === 'playtime'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock size={15} />
            <span>Longest Playtime</span>
          </button>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {top3.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Rank 2 (Silver) */}
          {top3[1] && (
            <div className="order-2 md:order-1 p-6 rounded-3xl bg-slate-900/60 border border-slate-700/80 text-center flex flex-col items-center justify-between shadow-lg">
              <div>
                <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-950 font-bold font-mono text-xs flex items-center justify-center mx-auto mb-3">
                  #2
                </div>
                <div className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-slate-400 mx-auto mb-3 bg-slate-800 shadow-md">
                  <img
                    src={`https://mc-heads.net/avatar/${top3[1].avatarSeed || top3[1].ign}/72`}
                    alt={top3[1].ign}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/72';
                    }}
                  />
                </div>
                <h3 className="font-brand text-lg font-bold text-white">{top3[1].ign}</h3>
                <span className="text-xs text-slate-400 block">{top3[1].title}</span>
                <span className="text-[11px] font-mono text-[#D4AF37] block mt-1">{top3[1].clan}</span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 w-full">
                <span className="font-mono text-base font-bold text-slate-200">{top3[1].score}</span>
              </div>
            </div>
          )}

          {/* Rank 1 (Gold Supreme) */}
          {top3[0] && (
            <div className="order-1 md:order-2 p-7 rounded-3xl bg-gradient-to-b from-[#1E1708] to-[#0A0E18] border-2 border-[#D4AF37] text-center flex flex-col items-center justify-between shadow-[0_0_35px_rgba(212,175,55,0.25)] md:-translate-y-3">
              <div>
                <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-slate-950 font-black font-mono text-xs flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                  #1
                </div>
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#FDE68A] mx-auto mb-3 bg-slate-800 shadow-lg">
                  <img
                    src={`https://mc-heads.net/avatar/${top3[0].avatarSeed || top3[0].ign}/80`}
                    alt={top3[0].ign}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/80';
                    }}
                  />
                </div>
                <h3 className="font-brand text-xl font-black text-white">{top3[0].ign}</h3>
                <span className="text-xs font-semibold text-[#FDE68A] block">{top3[0].title}</span>
                <span className="text-[11px] font-mono text-[#D4AF37] block mt-1">{top3[0].clan}</span>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 w-full">
                <span className="font-brand text-lg font-black text-[#F59E0B]">{top3[0].score}</span>
              </div>
            </div>
          )}

          {/* Rank 3 (Bronze) */}
          {top3[2] && (
            <div className="order-3 p-6 rounded-3xl bg-slate-900/60 border border-amber-900/40 text-center flex flex-col items-center justify-between shadow-lg">
              <div>
                <div className="w-8 h-8 rounded-full bg-amber-700 text-white font-bold font-mono text-xs flex items-center justify-center mx-auto mb-3">
                  #3
                </div>
                <div className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-amber-700 mx-auto mb-3 bg-slate-800 shadow-md">
                  <img
                    src={`https://mc-heads.net/avatar/${top3[2].avatarSeed || top3[2].ign}/72`}
                    alt={top3[2].ign}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/72';
                    }}
                  />
                </div>
                <h3 className="font-brand text-lg font-bold text-white">{top3[2].ign}</h3>
                <span className="text-xs text-slate-400 block">{top3[2].title}</span>
                <span className="text-[11px] font-mono text-[#D4AF37] block mt-1">{top3[2].clan}</span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 w-full">
                <span className="font-mono text-base font-bold text-slate-200">{top3[2].score}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ranks 1 to 10 Table / List View */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h3 className="font-brand text-lg font-bold text-white flex items-center gap-2">
              <Trophy size={18} className="text-[#D4AF37]" />
              <span>Full Roster (Top 10 Warriors)</span>
            </h3>
            <span className="text-xs text-slate-400">{getTabLabel()}</span>
          </div>

          {/* Search Filter */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search warrior or clan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {sortedData.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            <Users size={32} className="mx-auto mb-2 opacity-40 text-[#D4AF37]" />
            <p>No leaderboard entries recorded in this category yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80 pt-2">
            {sortedData.map((entry) => (
              <div
                key={`${entry.rank}-${entry.ign}`}
                className="py-4 px-3 rounded-xl flex items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-brand font-black text-xs shrink-0 ${
                      entry.rank === 1
                        ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                        : entry.rank === 2
                        ? 'bg-slate-300 text-slate-950'
                        : entry.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {entry.rank}
                  </span>

                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0">
                    <img
                      src={`https://mc-heads.net/avatar/${entry.avatarSeed || entry.ign}/48`}
                      alt={entry.ign}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/48';
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-brand font-bold text-sm text-white">{entry.ign}</span>
                      {entry.rank === 1 && <Crown size={13} className="text-[#D4AF37]" />}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {entry.title} • <span className="text-[#D4AF37] font-mono">{entry.clan}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-sm sm:text-base font-bold text-[#FDE68A]">
                    {entry.score}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Verified Season 6</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
