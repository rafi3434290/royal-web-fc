import { 
  RankItem, 
  GoldPackage, 
  GameModeItem, 
  WhyPlayItem, 
  PatchNoteItem, 
  LeaderboardEntry, 
  FAQItem, 
  RuleCategory,
  Coupon,
  AnnouncementItem
} from '../types';

export const SERVER_CONFIG = {
  name: 'Royal SMP',
  javaIP: 'play.royallsmp.net',
  bedrockIP: 'pe.royallsmp.net',
  bedrockPort: 26069,
  javaDefaultPort: 25565,
  discordInvite: 'https://discord.gg/KWFpAPmzJ',
  voteUrl: 'https://minecraft-mp.com/server/352209/vote/',
  bkashNumber: '01837640083',
  nagadNumber: '01837640083',
  season: 'Season 6',
  estYear: '2020',
  adminName: 'RaFI_Playz',
  ownerName: 'mr_nasa',
  discordMemberCount: '3,840+',
  masterStaffPasscode: 'RoyalMaster#2026!K9x7vQ$EmpireStaff',
  initialTicker: 'SEASON 6 HAS COMMENCED! JAVA: play.royallsmp.net | BEDROCK: pe.royallsmp.net:26069 | 100% GRIEF PROTECTION & ULTRA LOW PING'
};

export const INITIAL_RANKS: RankItem[] = [
  {
    id: 'monopoly',
    name: 'MONOPOLY',
    badge: 'SUPREME EMPEROR',
    priceBDT: 900,
    originalPriceBDT: 1200,
    highlight: true,
    popular: true,
    color: '#F59E0B',
    accentGlow: 'rgba(245, 158, 11, 0.45)',
    description: 'The supreme crown of Royal SMP. Absolute dominion over trade, custom tags, and royal vaults.',
    perks: [
      'Supreme [Monopoly] chat tag with shimmering gold gradient',
      'Exclusive /fly command access in player claims & spawn',
      '10x Private Player Vaults (/pv 1-10) with infinite capacity',
      '8x Netherite Templates & 8x Netherite Ingots unlock',
      'Keep Inventory enabled across all standard survival zones',
      'Custom Join & Leave announcement broadcast to the entire realm',
      '15 Max Auction House listings + 0% market transaction tax',
      'Priority queue spot during peak hours & event realms'
    ],
  },
  {
    id: 'prestige',
    name: 'PRESTIGE',
    badge: 'GRAND SOVEREIGN',
    priceBDT: 650,
    originalPriceBDT: 850,
    highlight: false,
    popular: false,
    color: '#A855F7',
    accentGlow: 'rgba(168, 85, 247, 0.35)',
    description: 'Commanding authority designed for elite builders and high-ranking kingdom commanders.',
    perks: [
      'Imperial [Prestige] chat prefix with royal amethyst glow',
      'Access to /feed and /workbench anywhere in the realm',
      '6x Private Player Vaults (/pv 1-6) for sacred gear',
      '4x Netherite Upgrade Templates & 4x Netherite Ingots',
      'Keep Inventory enabled in overworld survival realms',
      '10 Max Auction House listings + 50% reduced listing fee',
      'Special particle trail effects in spawn & hubs'
    ],
  },
  {
    id: 'executive',
    name: 'EXECUTIVE',
    badge: 'ROYAL DUKE',
    priceBDT: 500,
    originalPriceBDT: 650,
    highlight: false,
    popular: false,
    color: '#06B6D4',
    accentGlow: 'rgba(6, 182, 212, 0.35)',
    description: 'Command the royal market with elevated commerce tools, expanded homes, and private chests.',
    perks: [
      'Distinguished [Executive] chat insignia with cyan sheen',
      '4x Private Player Vaults (/pv 1-4) storage',
      'Access to /condense & /craft anytime without crafting bench',
      '8 Set Homes (/sethome) across any claimed territories',
      '7 Max simultaneous Auction House trading slots',
      'Exclusive access to Executive lounge & market quarters'
    ],
  },
  {
    id: 'venture',
    name: 'VENTURE',
    badge: 'NOBLE KNIGHT',
    priceBDT: 300,
    originalPriceBDT: 400,
    highlight: false,
    popular: false,
    color: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.35)',
    description: 'Essential kingdom starter rank for ambitious warriors ready to conquer their initial frontier.',
    perks: [
      'Vibrant [Venture] chat crest with emerald sheen',
      '2x Private Player Vaults (/pv 1-2) protected from thieves',
      '5 Set Homes (/sethome) for effortless fast travel',
      'Access to /hat and custom cosmetic armor colors',
      '5 Auction House trading slots',
      '1.5x In-game coin multiplier from daily jobs'
    ],
  },
];

export const INITIAL_GOLD_PACKAGES: GoldPackage[] = [
  { id: 'gold-1000', name: '1,000 Gold Coins', coins: 1000, bonus: 0, priceBDT: 500, originalPriceBDT: 600, color: '#EAB308' },
  { id: 'gold-2080', name: '2,080 Gold Coins', coins: 2080, bonus: 80, priceBDT: 1040, originalPriceBDT: 1250, color: '#F59E0B' },
  { id: 'gold-3210', name: '3,210 Gold Coins', coins: 3210, bonus: 210, priceBDT: 1605, originalPriceBDT: 1950, color: '#D97706' },
  { id: 'gold-4400', name: '4,400 Gold Coins', coins: 4400, bonus: 400, priceBDT: 2200, originalPriceBDT: 2650, color: '#B45309' },
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'ROYAL20', discountPercent: 20, active: true },
  { code: 'NASA50', discountAmount: 50, active: true },
  { code: 'RAFI10', discountPercent: 10, active: true }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    category: 'SEASON UPDATE',
    title: 'Season 6: Reign of Monarchs & Gold Economy Released!',
    content: 'Season 6 is live! Running 5+ years of legendary Minecraft survival with ultra-low Bangladesh/Asia ping, enterprise DDoS mitigation, custom Gold Coins, and rank bundles. Join our official Discord at https://discord.gg/KWFpAPmzJ!',
    author: 'Royal SMP Administration',
    date: 'October 12, 2026',
  },
  {
    id: 'ann-2',
    category: 'RANK NOTICE',
    title: 'Netherite Upgrade Bundle Unlock Date (Oct 17, 3:30 PM)',
    content: 'The 8x Templates and 8x Netherite Ingots included in Monopoly and Prestige kits will unlock on October 17th at 3:30 PM to keep initial progression balanced.',
    author: 'Server Operations',
    date: 'October 10, 2026',
  },
  {
    id: 'ann-3',
    category: 'NETWORK',
    title: 'Crossplay Server IP: play.royallsmp.net Port: 26069',
    content: 'All players on Java and Bedrock can now connect via play.royallsmp.net on port 26069 with zero lag and instant inventory synchronization.',
    author: 'Network Team',
    date: 'October 08, 2026',
  }
];

export const GAME_MODES: GameModeItem[] = [
  {
    id: 'survival',
    title: 'Royal Survival',
    tag: 'Flagship Dynasty',
    description: 'The legendary SMP experience. Golden shovel claims, sovereign kingdoms, player-driven trading, and custom economy.',
    badge: 'SEASON 6 ACTIVE',
    icon: 'Crown',
    features: ['100% Anti-Grief Protection', 'Chest Shops & Auctions', 'Custom Daily Jobs', 'Dynmap World Atlas'],
    bannerGradient: 'from-amber-500/20 via-yellow-600/10 to-transparent',
    status: 'ONLINE',
    playersCount: '130 Online'
  },
  {
    id: 'warzone',
    title: 'Warzone PvP',
    tag: 'Combat Colosseum',
    description: 'High-stakes battlegrounds. Ranked 1v1 duels, King of the Hill (KOTH), and Netherite bounty hunting.',
    badge: 'COMPETITIVE',
    icon: 'Swords',
    features: ['Zero-Lag Hit Registration', 'Custom Kit Duels', 'Hourly KOTH Drops', 'Bounty Hunter Ledger'],
    bannerGradient: 'from-red-600/20 via-orange-600/10 to-transparent',
    status: 'ONLINE',
    playersCount: '18 Online'
  },
  {
    id: 'dungeons',
    title: 'Dungeon PvE',
    tag: 'Mythic Raids',
    description: 'Cooperative instance labyrinths with custom mythological bosses, legendary artifact blueprints, and mythical crates.',
    badge: 'EXPEDITION',
    icon: 'Skull',
    features: ['Custom Boss Mechanics', 'Ancient Relic Drops', 'Party Raids (2-4 Players)', 'Mythic Crate Keys'],
    bannerGradient: 'from-purple-600/20 via-indigo-600/10 to-transparent',
    status: 'WEEKEND EVENTS',
    playersCount: 'Queue Ready'
  }
];

export const WHY_PLAY_CARDS: WhyPlayItem[] = [
  {
    id: 'why-1',
    title: 'Lag-Free Ryzen 9 Hardware',
    description: 'Powered by dedicated 5.7GHz AMD Ryzen 9 7950X compute nodes with Gen4 NVMe arrays for steady 20.0 TPS.',
    icon: 'Cpu',
    badge: '20.0 TPS'
  },
  {
    id: 'why-2',
    title: '24/7 Enterprise Mitigation',
    description: '3.2Tbps multi-tiered DDoS scrubbing shields your game sessions against malicious packet floods.',
    icon: 'ShieldAlert',
    badge: '99.98% UPTIME'
  },
  {
    id: 'why-3',
    title: 'Fair Play & Balanced Economy',
    description: 'Zero pay-to-win kits. Progression rewards hard work, trading, and community cooperation.',
    icon: 'Scale',
    badge: 'NO P2W'
  },
  {
    id: 'why-4',
    title: 'Cross-Platform Sync',
    description: 'Connect seamlessly from PC, Android, iOS, Nintendo Switch, PlayStation, and Xbox with unified inventory.',
    icon: 'Gamepad2',
    badge: 'CROSSPLAY'
  },
  {
    id: 'why-5',
    title: 'Active Heuristic Anti-Cheat',
    description: 'Machine-learning packet analysis detects speed, fly, auto-clickers, and baritone instantly.',
    icon: 'Eye',
    badge: 'SECURE'
  },
  {
    id: 'why-6',
    title: 'Weekly Kingdom Events',
    description: 'Compete in Castle Sieges, Meteor Strikes, Hide & Seek, and King of the Hill battles for rare keys.',
    icon: 'Calendar',
    badge: 'SATURDAY 8PM'
  },
  {
    id: 'why-7',
    title: 'Custom Enchants & Blueprints',
    description: 'Discover 45+ unique enchantment blueprints to customize your armor, tools, and weapons.',
    icon: 'Sparkles',
    badge: 'NEW FORGE'
  },
  {
    id: 'why-8',
    title: 'Dedicated Asian Routing',
    description: 'Direct peering routes through Dhaka, Singapore, and Mumbai ensuring sub-20ms ultra-low ping.',
    icon: 'Zap',
    badge: '<20MS PING'
  }
];

export const PATCH_NOTES: PatchNoteItem[] = [
  {
    id: 'patch-6-4',
    tag: 'MAJOR RELEASE',
    version: 'Season 6: Reign of Monarchs',
    date: 'October 12, 2026',
    title: 'New Gold Currency, Warzone Duels, and Dynasty Quests',
    highlights: [
      'Introduced dynamic player-to-player Gold Coin bullion economy with private dimensional vaults.',
      'Full Crossplay support updated to Minecraft 1.20.x through 1.21.x with GeyserMC protocol optimizations.',
      'Anti-grief claim limits expanded by 25% for all active players who complete starter quests.',
      'Overhauled King of the Hill arena with automated beacon chest reward distribution.'
    ]
  },
  {
    id: 'patch-6-3',
    tag: 'BALANCE PATCH',
    version: 'Update 6.3 - Netherite Balancing',
    date: 'October 08, 2026',
    title: 'Netherite Upgrade Unlock Schedule Announced',
    highlights: [
      'Netherite templates in Monopoly and Prestige kits locked until October 17 at 3:30 PM for fair early-game pace.',
      'Optimized server entity ticking, raising global survival render distance to 12 chunks.',
      'Added bKash and Nagad automated transaction verification callbacks.'
    ]
  }
];

export const FAQS_COMPREHENSIVE: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'connection',
    question: 'How do I join from Mobile / Minecraft Pocket Edition (Bedrock)?',
    answer: 'Open Minecraft on your Android, iOS, or console device. Go to "Play" > "Servers" > "Add Server". Type Server Name: Royal SMP, Server Address: pe.royalsmp.net, and Port: 26069. Save and connect! You can play alongside Java Edition players with zero difference.'
  },
  {
    id: 'faq-2',
    category: 'connection',
    question: 'Can I play if I use a Cracked or TLauncher Minecraft client?',
    answer: 'Yes! Royal SMP natively welcomes both Official Microsoft/Mojang accounts and Cracked launchers (TLauncher, PojavLauncher, etc.). When you join the first time, simply type `/register <your_password> <repeat_password>` to safeguard your character.'
  },
  {
    id: 'faq-3',
    category: 'claims',
    question: 'How do I claim my land to stop other players from griefing or looting?',
    answer: 'You receive a free Golden Shovel when you type `/kit starter` or `/claim`. Right-click one corner of your area on the ground, then right-click the opposite diagonal corner. The area turns into your protected realm. Type `/trust <player>` to permit trusted friends to build with you.'
  },
  {
    id: 'faq-4',
    category: 'store',
    question: 'How does the bKash & Nagad payment verification work?',
    answer: 'Visit the Royal Treasury tab, choose your rank or gold bundle, and click Claim. Copy our official merchant recipient number (01837640083) and make a "Send Money" transfer from your bKash or Nagad app. Enter your Minecraft IGN, phone number, and TrxID in the modal. Our team verifies orders within 5-15 minutes.'
  },
  {
    id: 'faq-5',
    category: 'store',
    question: 'How long does rank activation take after submitting TrxID?',
    answer: 'Rank perks are typically processed within 5 to 15 minutes by server staff. You will receive an automated in-game broadcast congratulating you on your new rank. You can also track your exact order status using the "Order Tracker" tab.'
  },
  {
    id: 'faq-6',
    category: 'claims',
    question: 'Can other players steal from my chests or kill my animals?',
    answer: 'No. Inside your claimed territory, all chests, furnaces, barrels, armor stands, and farm animals are completely protected from unauthorized interaction. Only players granted `/trust` access can interact with your possessions.'
  },
  {
    id: 'faq-7',
    category: 'connection',
    question: 'What version of Minecraft do I need to connect?',
    answer: 'Royal SMP supports Minecraft 1.20 through the latest 1.21.x releases. Both vanilla clients and Fabric/Forge clients (with performance mods like Sodium or Iris) connect seamlessly.'
  },
  {
    id: 'faq-8',
    category: 'gameplay',
    question: 'How do I vote and receive daily Vote Keys?',
    answer: 'Visit the "Vote" tab, click any of our three voting partner sites, enter your Minecraft in-game username, and submit your vote. You will immediately receive 2x Royal Vote Keys and $1,000 cash in-game.'
  },
  {
    id: 'faq-9',
    category: 'store',
    question: 'What happens if I change my Minecraft username after buying a rank?',
    answer: 'All ranks and vaults are tied to your permanent UUID and database record. If you ever change your username, open a quick ticket on our official Discord, and staff will synchronize your previous entitlements instantly.'
  },
  {
    id: 'faq-10',
    category: 'gameplay',
    question: 'Is PvP enabled in the main survival overworld?',
    answer: 'PvP is strictly disabled inside player claims and the spawn hub. If you desire high-stakes combat, type `/warzone` to enter our custom PvP battle arena where duels, leaderboards, and KOTH events take place.'
  },
  {
    id: 'faq-11',
    category: 'gameplay',
    question: 'How do Private Player Vaults (/pv) protect my items?',
    answer: 'Player Vaults are dimensional ender storage containers accessed via commands such as `/pv 1`. Even if you die in the Nether or The End, items stored inside your Player Vaults are completely safe and never drop.'
  }
];

export const LEADERBOARD_RICHEST: LeaderboardEntry[] = [
  { rank: 1, ign: 'mr_nasa', title: 'Grand Monarch', clan: 'Royal Dynasty', score: '$12,500,000', rawScore: 12500000, avatarSeed: 'mr_nasa' },
  { rank: 2, ign: 'RaFI_Playz', title: 'Prime Chancellor', clan: 'Royal Guard', score: '$8,950,000', rawScore: 8950000, avatarSeed: 'RaFI_Playz' },
  { rank: 3, ign: 'Vortex_King', title: 'High Duke', clan: 'Eclipse Order', score: '$5,400,000', rawScore: 5400000, avatarSeed: 'Vortex' },
  { rank: 4, ign: 'SlayerX99', title: 'Lord Marshal', clan: 'Valhalla', score: '$3,820,000', rawScore: 3820000, avatarSeed: 'SlayerX' },
  { rank: 5, ign: 'Aetheria_BD', title: 'Baroness', clan: 'Solaris', score: '$2,910,000', rawScore: 2910000, avatarSeed: 'Aetheria' },
  { rank: 6, ign: 'BengalTiger', title: 'Trade Mogul', clan: 'Dhaka Guild', score: '$2,150,000', rawScore: 2150000, avatarSeed: 'Tiger' },
  { rank: 7, ign: 'ShadowNinja', title: 'Treasurer', clan: 'Nightfall', score: '$1,800,000', rawScore: 1800000, avatarSeed: 'Ninja' },
  { rank: 8, ign: 'RedstonePro', title: 'Chief Architect', clan: 'Engineers', score: '$1,350,000', rawScore: 1350000, avatarSeed: 'Redstone' },
  { rank: 9, ign: 'LunaMoon', title: 'Countess', clan: 'Celestia', score: '$980,000', rawScore: 980000, avatarSeed: 'Luna' },
  { rank: 10, ign: 'Zafreen_BD', title: 'Noble Knight', clan: 'Bengal Guard', score: '$750,000', rawScore: 750000, avatarSeed: 'Zafreen' },
];

export const LEADERBOARD_KILLS: LeaderboardEntry[] = [
  { rank: 1, ign: 'SlayerX99', title: 'Warmaster', clan: 'Valhalla', score: '1,482 Kills', rawScore: 1482, avatarSeed: 'SlayerX' },
  { rank: 2, ign: 'Vortex_King', title: 'Gladiator', clan: 'Eclipse Order', score: '1,120 Kills', rawScore: 1120, avatarSeed: 'Vortex' },
  { rank: 3, ign: 'ShadowStrike', title: 'Assassin', clan: 'Nightfall', score: '945 Kills', rawScore: 945, avatarSeed: 'Shadow' },
  { rank: 4, ign: 'RaFI_Playz', title: 'Prime Chancellor', clan: 'Royal Guard', score: '810 Kills', rawScore: 810, avatarSeed: 'RaFI_Playz' },
  { rank: 5, ign: 'DragonBorn_BD', title: 'Knight Commander', clan: 'Bengal Tigers', score: '670 Kills', rawScore: 670, avatarSeed: 'Dragon' },
  { rank: 6, ign: 'BloodHound', title: 'Bounty Hunter', clan: 'Rogue Legion', score: '582 Kills', rawScore: 582, avatarSeed: 'Hound' },
  { rank: 7, ign: 'CyberBlade', title: 'Duelist', clan: 'Cyber Order', score: '512 Kills', rawScore: 512, avatarSeed: 'Blade' },
  { rank: 8, ign: 'Phantom_BD', title: 'Ghost Warrior', clan: 'Phantom', score: '445 Kills', rawScore: 445, avatarSeed: 'Phantom' },
  { rank: 9, ign: 'KnightRider', title: 'Iron Vanguard', clan: 'Valhalla', score: '390 Kills', rawScore: 390, avatarSeed: 'Rider' },
  { rank: 10, ign: 'mr_nasa', title: 'Grand Monarch', clan: 'Royal Dynasty', score: '340 Kills', rawScore: 340, avatarSeed: 'mr_nasa' },
];

export const LEADERBOARD_PLAYTIME: LeaderboardEntry[] = [
  { rank: 1, ign: 'mr_nasa', title: 'Grand Monarch', clan: 'Royal Dynasty', score: '1,420 Hours', rawScore: 1420, avatarSeed: 'mr_nasa' },
  { rank: 2, ign: 'RaFI_Playz', title: 'Prime Chancellor', clan: 'Royal Guard', score: '1,190 Hours', rawScore: 1190, avatarSeed: 'RaFI_Playz' },
  { rank: 3, ign: 'CraftMasterBD', title: 'Master Builder', clan: 'Craft Guild', score: '980 Hours', rawScore: 980, avatarSeed: 'Craft' },
  { rank: 4, ign: 'Vortex_King', title: 'High Duke', clan: 'Eclipse Order', score: '850 Hours', rawScore: 850, avatarSeed: 'Vortex' },
  { rank: 5, ign: 'Zafreen_BD', title: 'Baroness', clan: 'Solaris', score: '760 Hours', rawScore: 760, avatarSeed: 'Zafreen' },
  { rank: 6, ign: 'MineHero_99', title: 'Veteran Miner', clan: 'Deep Quarry', score: '690 Hours', rawScore: 690, avatarSeed: 'Miner' },
  { rank: 7, ign: 'BengalTiger', title: 'Trade Mogul', clan: 'Dhaka Guild', score: '620 Hours', rawScore: 620, avatarSeed: 'Tiger' },
  { rank: 8, ign: 'Aetheria_BD', title: 'Baroness', clan: 'Solaris', score: '540 Hours', rawScore: 540, avatarSeed: 'Aetheria' },
  { rank: 9, ign: 'SlayerX99', title: 'Lord Marshal', clan: 'Valhalla', score: '495 Hours', rawScore: 495, avatarSeed: 'SlayerX' },
  { rank: 10, ign: 'SilentKnight', title: 'Sentinel', clan: 'Royal Guard', score: '420 Hours', rawScore: 420, avatarSeed: 'Sentinel' },
];

export const RULE_CATEGORIES: RuleCategory[] = [
  {
    category: 'Combat & Fair Play',
    description: 'Enforcing genuine skill and competitive integrity.',
    rules: [
      {
        title: 'Zero Tolerance for Hacked Clients',
        description: 'Using combat reach, killaura, fly, speed hacks, freecam, or Baritone bot automation results in an instant automated permanent ban.',
        penalty: 'Permanent Hardware & IP Ban'
      },
      {
        title: 'Combat Logging Prohibition',
        description: 'Disconnecting while in active PvP combat tags your character as defeated, causing immediate inventory drop.',
        penalty: 'Instant In-Game Death + 15 min Jail'
      },
      {
        title: 'No Glitch Exploitation',
        description: 'Exploiting Nether portal duplication bugs, chunk loading duplication, or block phasing will lead to immediate rollback.',
        penalty: 'Inventory Wipe & 30-Day Suspension'
      }
    ]
  },
  {
    category: 'Kingdom Claims & Land Preservation',
    description: 'Protecting player creations, wilderness aesthetic, and server health.',
    rules: [
      {
        title: 'No Wilderness Griefing / Lava Casting',
        description: 'Constructing lava-cobble casts or massive ugly holes right along another player claim boundary is forbidden.',
        penalty: 'Staff Rollback + 7-Day Ban'
      },
      {
        title: 'No Trapping Spawn or Teleport Points',
        description: 'Creating teleport trap kills (/tpa death traps) or locking newcomers inside bedrock cages is strictly illegal.',
        penalty: '14-Day Ban + Fine of 50,000 In-Game Coins'
      },
      {
        title: 'No Lag Machines / Redstone Loops',
        description: 'Clock circuits without automatic shutdown mechanisms that lower the server TPS will be deleted without warning.',
        penalty: 'Apparatus Disassembly + Warning'
      }
    ]
  },
  {
    category: 'Economy & Commercial Conduct',
    description: 'Ensuring honest player transactions and official payment legitimacy.',
    rules: [
      {
        title: 'Fair Player Market Dealing',
        description: 'Scamming agreed chest shop deliveries or deceptive item renaming (e.g., naming wooden pickaxe as Netherite) is penalized.',
        penalty: 'Restitution + Account Suspension'
      },
      {
        title: 'Real Money Trading (RMT) Restriction',
        description: 'Trading in-game coins, gear, or claims for real bKash/Nagad money outside the official Royal SMP store is not permitted.',
        penalty: 'Permanent In-Game Ban for Both Parties'
      }
    ]
  },
  {
    category: 'Community & Chat Decorum',
    description: 'Maintaining a welcoming and mature environment for all monarchs.',
    rules: [
      {
        title: 'Respectful Discourse',
        description: 'Hate speech, racism, sectarian remarks, doxxing, or aggressive toxicity in public chat or Discord will not be tolerated.',
        penalty: 'Mute Escalating to Permanent Ban'
      },
      {
        title: 'No Advertisement of External Networks',
        description: 'Promoting rival Minecraft servers or sharing external Discord links without administrative clearance is banned.',
        penalty: 'Instant Permanent Mute & Kick'
      }
    ]
  }
];

export const RANKS = INITIAL_RANKS;
export const GOLD_PACKAGES = INITIAL_GOLD_PACKAGES;
export const FAQS = FAQS_COMPREHENSIVE;

export const RULES = [
  {
    id: 'rule-hacks',
    title: 'No Hacking, Cheating or X-Ray',
    shortDesc: 'Unfair advantages, hacked clients, baritone, freecam, or automated macros are strictly prohibited.',
    fullDesc: 'Our heuristic anti-cheat analyzes packets in real time. Any use of fly hacks, speed, auto-clickers, or X-Ray resource packs will lead to immediate automated ban without refund.',
    penalty: 'Permanent Realm Ban',
  },
  {
    id: 'rule-respect',
    title: 'Mutual Honor & Respect',
    shortDesc: 'Treat all monarchs and travelers with dignity in chat, private messages, and discord.',
    fullDesc: 'Hate speech, toxicity, excessive spam, doxxing, or harassment will not be tolerated under any circumstances. Keep global chat friendly and welcoming to newcomers.',
    penalty: 'Temporary Mute to Permanent Ban',
  },
  {
    id: 'rule-trade',
    title: 'Fair Trade & Scams Ban',
    shortDesc: 'Real-world trades outside official store channels or intentional item scamming is banned.',
    fullDesc: 'All transactions for ranks must happen through the official Royal Treasury portal using bKash/Nagad. In-game deals must honor agreed prices without deceitful drop-trapping.',
    penalty: 'Inventory Wipe & Account Suspension',
  },
  {
    id: 'rule-grief',
    title: 'No Griefing or Wilderness Destruction',
    shortDesc: 'Do not deface landscapes near claims, build trap spawns, or construct offensive symbols.',
    fullDesc: 'Even outside claimed zones, massive intentional lava casting, terrain destruction around player borders, or intentional lag machines will be rolled back by staff.',
    penalty: 'Rollback + 14-day Suspension',
  },
];

export const PILLARS_OF_REALM = [
  {
    id: 'claims',
    title: 'Imperial Land Claims',
    subtitle: 'Zero Griefing Protocol',
    description: 'Golden shovel territory marking protects your fortress from griefers, fire spread, and unauthorized looting.',
    icon: 'ShieldCheck',
    badge: 'PROTECTION',
  },
  {
    id: 'economy',
    title: 'Royal Gold Economy',
    subtitle: 'Free Player Commerce',
    description: 'Thriving player-driven marketplace with private vaults, chest shops, dynamic auctions, and gold bullion currency.',
    icon: 'Coins',
    badge: 'TREASURY',
  },
  {
    id: 'pvp',
    title: 'Warzone & Duels',
    subtitle: 'Competitive Arenas',
    description: 'Custom gladiatorial arenas, ranked 1v1 duels, King of the Hill events, and high-risk bounty hunting zones.',
    icon: 'Swords',
    badge: 'COMBAT',
  },
  {
    id: 'crossplay',
    title: 'Seamless Cross-Play',
    subtitle: 'Unified Real-Time Sync',
    description: 'Flawless interoperability between Java Edition and Bedrock (iOS, Android, Windows, PlayStation, Xbox, Switch).',
    icon: 'Gamepad2',
    badge: 'UNIVERSAL',
  },
];
