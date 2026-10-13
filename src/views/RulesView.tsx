import React, { useState } from 'react';
import { 
  Scale, 
  AlertTriangle, 
  Search 
} from 'lucide-react';
import { RULE_CATEGORIES } from '../data/serverData';

export const RulesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = RULE_CATEGORIES.filter((cat) => {
    if (selectedCategory !== 'all' && cat.category !== selectedCategory) return false;
    return true;
  }).map((cat) => ({
    ...cat,
    rules: cat.rules.filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.penalty.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.rules.length > 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2 block">
          IMPERIAL LAW &amp; CODEX
        </span>
        <h1 className="font-brand text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          The Royal Decree
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Mandatory server regulations enforced by our automated packet heuristics and moderation council.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Decrees
          </button>
          {RULE_CATEGORIES.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.category
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-xl mx-auto relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search rule keywords (e.g. hack, grief, trade, spam)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-[#D4AF37] text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
        />
      </div>

      {/* Rules Sections */}
      <div className="space-y-8">
        {filteredCategories.map((catGroup) => (
          <div key={catGroup.category} className="space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <h2 className="font-brand text-xl font-bold text-white flex items-center gap-2">
                <Scale size={18} className="text-[#D4AF37]" />
                <span>{catGroup.category}</span>
              </h2>
              <p className="text-xs text-slate-400">{catGroup.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catGroup.rules.map((rule, i) => (
                <div
                  key={i}
                  className="p-5 sm:p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-brand text-base font-bold text-white mb-2">
                      {rule.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {rule.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-red-300 bg-red-950/20 p-2.5 rounded-xl border border-red-900/30">
                    <AlertTriangle size={14} className="text-red-400 shrink-0" />
                    <span><strong>Penalty:</strong> {rule.penalty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
