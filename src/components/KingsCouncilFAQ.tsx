import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS } from '../data/serverData';

export const KingsCouncilFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2">
            Guidance &amp; Inquiries
          </p>
          <h2 className="font-brand text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight flex items-center justify-center gap-3">
            <HelpCircle className="text-[#D4AF37] w-8 h-8" />
            <span>King's Council FAQ</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Answers to frequent inquiries regarding connections, bedrock crossplay, and rank delivery.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
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
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-brand text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-800/80">
                    <p className="text-slate-300 text-sm leading-relaxed pt-3">
                      {faq.answer}
                    </p>
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
