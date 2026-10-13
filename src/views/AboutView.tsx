import React from 'react';
import { 
  Crown, 
  Server, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Users 
} from 'lucide-react';
import { RoyalCrest } from '../components/RoyalCrest';
import { SERVER_CONFIG } from '../data/serverData';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <RoyalCrest size={52} className="mx-auto mb-4" />
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2 block">
          ESTABLISHED 2020 • 5+ YEARS OF SURVIVAL
        </span>
        <h1 className="font-brand text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          About Royal SMP Network
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          The story, technical infrastructure, and administrative vision behind South Asia's preeminent Minecraft survival community.
        </p>
      </div>

      {/* Chronicle Story Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-[#D4AF37]/35 shadow-xl space-y-4">
        <h3 className="font-brand text-2xl font-bold text-white flex items-center gap-2.5">
          <Crown size={22} className="text-[#D4AF37]" />
          <span>The Chronicle of Royal SMP</span>
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Founded in early 2020, Royal SMP originated with a singular aspiration: to provide Minecraft survivalists in Bangladesh, India, and South Asia with an ultra-stable, zero-lag home where creations endure without seasonal resets or toxic griefing.
        </p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Now in <strong>{SERVER_CONFIG.season}</strong>, the realm has expanded into a multi-realm ecosystem supporting thousands of concurrent monthly adventurers across Java Edition and Bedrock Edition with custom player-driven economies, dimensional vaults, and gladiatorial PvP.
        </p>
      </div>

      {/* Enterprise Hardware Specs */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
            DEDICATED HARDWARE
          </span>
          <h2 className="font-brand text-2xl font-black text-white">
            High-Performance Bare-Metal Nodes
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <Cpu size={28} className="mx-auto mb-3 text-amber-400" />
            <h4 className="font-brand text-base font-bold text-white">AMD Ryzen 9 7950X</h4>
            <span className="text-xs text-slate-400">5.7 GHz Peak Frequency</span>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <Server size={28} className="mx-auto mb-3 text-emerald-400" />
            <h4 className="font-brand text-base font-bold text-white">128 GB DDR5 ECC</h4>
            <span className="text-xs text-slate-400">Error-Correcting Memory</span>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <HardDrive size={28} className="mx-auto mb-3 text-cyan-400" />
            <h4 className="font-brand text-base font-bold text-white">Gen4 NVMe RAID-1</h4>
            <span className="text-xs text-slate-400">7,000 MB/s Read &amp; Write</span>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <Wifi size={28} className="mx-auto mb-3 text-indigo-400" />
            <h4 className="font-brand text-base font-bold text-white">3.2 Tbps DDoS Shield</h4>
            <span className="text-xs text-slate-400">Real-Time Packet Scrubbing</span>
          </div>
        </div>
      </div>

      {/* Leadership Council Roster */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <h3 className="font-brand text-xl font-bold text-white flex items-center gap-2">
          <Users size={20} className="text-[#D4AF37]" />
          <span>High Council Leadership</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 border border-[#D4AF37]/50 shrink-0">
              <img
                src="https://mc-heads.net/avatar/mr_nasa/64"
                alt="mr_nasa"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider">FOUNDER &amp; OWNER</span>
              <h4 className="font-brand text-lg font-bold text-white">{SERVER_CONFIG.ownerName}</h4>
              <p className="text-xs text-slate-400">Visionary founder and primary infrastructure architect of Royal SMP.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-black/40 border border-slate-800 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 border border-[#D4AF37]/50 shrink-0">
              <img
                src="https://mc-heads.net/avatar/RaFI_Playz/64"
                alt="RaFI_Playz"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">LEAD ARCHITECT &amp; ADMIN</span>
              <h4 className="font-brand text-lg font-bold text-white">{SERVER_CONFIG.adminName}</h4>
              <p className="text-xs text-slate-400">Frontend engineering, web systems, and server gameplay balancer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
