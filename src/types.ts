export type ActiveView = 
  | 'home' 
  | 'store' 
  | 'ranks' 
  | 'vote' 
  | 'leaderboard' 
  | 'track' 
  | 'rules' 
  | 'about' 
  | 'admin';

export interface RankItem {
  id: string;
  name: string;
  badge: string;
  priceBDT: number;
  originalPriceBDT?: number;
  highlight?: boolean;
  popular?: boolean;
  color: string;
  accentGlow: string;
  description: string;
  perks: string[];
}

export interface GoldPackage {
  id: string;
  name: string;
  coins: number;
  bonus: number;
  priceBDT: number;
  originalPriceBDT?: number;
  color: string;
}

export interface GameModeItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  badge: string;
  icon: string;
  features: string[];
  bannerGradient: string;
  status: string;
  playersCount: string;
}

export interface WhyPlayItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface PatchNoteItem {
  id: string;
  tag: string;
  version: string;
  date: string;
  title: string;
  highlights: string[];
}

export interface LeaderboardEntry {
  rank: number;
  ign: string;
  title: string;
  clan: string;
  score: string;
  rawScore: number;
  avatarSeed: string;
}

export type LeaderboardCategory = 'wealth' | 'kills' | 'playtime';

export interface LeaderboardDataset {
  wealth: LeaderboardEntry[];
  kills: LeaderboardEntry[];
  playtime: LeaderboardEntry[];
}

export interface OrderItem {
  name: string;
  price: string;
  quantity: number;
}

export interface Order {
  id: string;
  ign: string;
  item: string;
  itemsList?: OrderItem[];
  amount: string;
  originalAmount?: string;
  couponCode?: string;
  discount?: string;
  method: 'bKash' | 'Nagad';
  sender: string;
  trxId: string;
  screenshot?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  note?: string;
  createdAt: number;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  active: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  type: 'rank' | 'gold';
  priceBDT: number;
  quantity: number;
}

export interface ServerStatus {
  online: boolean;
  ip: string;
  port: number;
  version: string;
  players: {
    online: number;
    max: number;
  };
}

export interface AnnouncementItem {
  id: string;
  category: string;
  title: string;
  content: string;
  author: string;
  date: string;
  activeTicker?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'connection' | 'store' | 'gameplay' | 'claims';
}

export interface RuleCategory {
  category: string;
  description: string;
  rules: Array<{
    title: string;
    description: string;
    penalty: string;
  }>;
}

export interface MinecraftPlayer {
  username: string;
  avatarUrl: string;
  bodyUrl: string;
}
