import React, { useState } from 'react';
import { ChevronDown, Scale, AlertTriangle } from 'lucide-react';
import { RULES } from '../data/serverData';

export const RoyalDecree: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('rule-hacks');

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="decree" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2">
            Code of Honor
          </p>
          <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight flex items-center justify-center gap-3">
            <Scale className="text-[#D4AF37] w-8 h-8" />
            <span>The Royal Decree</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Essential server rules enforced by our kingdom moderators and automated heuristics.
          </p>
        </div>

        <div className="space-y-3.5">
          {RULES.map((rule, idx) => {
            const isExpanded = expandedId === rule.id;
            return (
              <div
                key={rule.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900/90 border-[#D4AF37]/50 shadow-[0_8px_25px_rgba(0,0,0,0.5)]'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(rule.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-brand font-bold text-xs sm:text-sm text-[#D4AF37] w-6 shrink-0">
                      0{idx + 1}.
                    </span>
                    <div>
                      <h3 className="font-brand text-base sm:text-lg font-bold text-white">
                        {rule.title}
                      </h3>
                      {!isExpanded && (
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {rule.shortDesc}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div
                      className={`p-1.5 rounded-full transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-slate-500'
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-800/80 text-xs sm:text-sm">
                    <p className="text-slate-300 leading-relaxed pt-3 mb-4">
                      {rule.fullDesc}
                    </p>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/25 border border-red-900/40 text-red-300">
                      <AlertTriangle size={15} className="shrink-0 text-red-400" />
                      <span className="text-xs">
                        <strong>Enforcement Penalty:</strong> {rule.penalty}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
