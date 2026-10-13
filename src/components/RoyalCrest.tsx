import React from 'react';

interface RoyalCrestProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const RoyalCrest: React.FC<RoyalCrestProps> = ({ size = 36, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-md bg-[#D4AF37]/35 scale-110 pointer-events-none"
          aria-hidden="true"
        />
      )}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
      >
        <defs>
          <linearGradient id="imperialGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#9A7B1C" />
            <stop offset="100%" stopColor="#684F0E" />
          </linearGradient>
          <linearGradient id="swordBlade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="60%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="gemAmethyst" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>
        </defs>

        {/* Crossed Swords Background */}
        <path
          d="M12 52L52 12M52 12L46 12M52 12L52 18"
          stroke="url(#swordBlade)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        <path
          d="M52 52L12 12M12 12L18 12M12 12L12 18"
          stroke="url(#swordBlade)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* Shield / Medallion Backdrop */}
        <path
          d="M32 6L48 14V34C48 46 32 58 32 58C32 58 16 46 16 34V14L32 6Z"
          fill="#0C101C"
          stroke="url(#imperialGold)"
          strokeWidth="2"
        />

        {/* Imperial Crown */}
        <path
          d="M21 38L23 23L28 28L32 18L36 28L41 23L43 38H21Z"
          fill="url(#imperialGold)"
          stroke="#5C450C"
          strokeWidth="0.8"
        />
        <path
          d="M20 40H44V43C44 43.5 43.5 44 43 44H21C20.5 44 20 43.5 20 43V40Z"
          fill="url(#imperialGold)"
        />

        {/* Gemstones */}
        <circle cx="32" cy="18" r="2" fill="url(#gemAmethyst)" />
        <circle cx="23" cy="23" r="1.5" fill="url(#gemAmethyst)" />
        <circle cx="41" cy="23" r="1.5" fill="url(#gemAmethyst)" />
        <circle cx="32" cy="42" r="1.5" fill="url(#gemAmethyst)" />
      </svg>
    </div>
  );
};
