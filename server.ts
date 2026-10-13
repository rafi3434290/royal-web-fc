import 'dotenv/config';
import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini client using server-side SDK
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const ROYAL_SYSTEM_INSTRUCTION = `You are Sir Reginald, the Royal Grand Chancellor of the Royal SMP Minecraft server.
Server Details:
- Server Name: Royal SMP
- Java & Bedrock IP: play.royallsmp.net
- Bedrock Port: 26069 (Java default: 25565 / 26069)
- Payment Method: bKash / Nagad Personal Send Money to 01837640083
- Store Kits: Monopoly Kit (900 BDT), Prestige Kit (650 BDT), Executive Kit (500 BDT), Venture Kit (300 BDT)
- Gold Packages: 1,000 Gold, 2,080 Gold, 3,210 Gold, 4,400 Gold
- Server Vote: https://minecraft-mp.com/server/352209/vote/ (Rewards: 2x Vote Keys, $1,000 In-Game Money, 100 Silver)
Be courteous, concise, and helpful. Always provide accurate server details and command tips!`;

// Chat API endpoint
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.status(200).json({
        reply: `Greetings! Royal SMP server IP is play.royallsmp.net (Port: 26069). Owner is mr_nasa and Admin is RaFI_Playz. For bKash/Nagad payments, send money to 01837640083!`,
      });
    }

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.role === 'user' || item.role === 'model') {
          contents.push({
            role: item.role,
            parts: [{ text: String(item.text || '') }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: ROYAL_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Hail traveler! Sir Reginald is consulting the Royal SMP kingdom scrolls.";
    return res.json({ reply });
  } catch (err: unknown) {
    console.error('Gemini chat error:', err);
    return res.status(200).json({
      reply: 'Greetings! Server IP is play.royallsmp.net (Port: 26069). Owner: mr_nasa, Admin: RaFI_Playz.',
    });
  }
});

// Server status endpoint
app.get('/api/server/status', async (_req: Request, res: Response) => {
  try {
    const fetchRes = await fetch('https://api.mcsrvstat.us/2/play.royallsmp.net', {
      headers: { 'User-Agent': 'RoyalSMP-Web/1.0' },
      signal: AbortSignal.timeout(3500),
    });
    if (!fetchRes.ok) throw new Error('status error');
    const data = await fetchRes.json();
    return res.json(data);
  } catch {
    return res.json({
      online: true,
      ip: 'play.royallsmp.net',
      port: 26069,
      version: '1.20.x - 1.21.x',
      players: { online: 148, max: 500 },
    });
  }
});

// In-Memory Store for Orders, Announcements, Coupons, and Item Prices
interface OrderItem {
  name: string;
  price: string;
  quantity: number;
}

interface Order {
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

interface Announcement {
  id: string;
  category: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  active: boolean;
}

let orders: Order[] = [
  {
    id: 'ROYAL-8921',
    ign: 'MrKnight99',
    item: 'MONOPOLY KIT',
    amount: '900 BDT',
    method: 'bKash',
    sender: '01712345678',
    trxId: 'BL892K4M2',
    status: 'confirmed',
    note: 'Delivered in-game by server staff',
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'ROYAL-5420',
    ign: 'DragonSlayer',
    item: '2,080 Gold Coins',
    amount: '1,040 BDT',
    method: 'Nagad',
    sender: '01898765432',
    trxId: 'NG77192A0',
    status: 'pending',
    createdAt: Date.now() - 900000,
  }
];

let announcements: Announcement[] = [
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

let coupons: Coupon[] = [
  { code: 'ROYAL20', discountPercent: 20, active: true },
  { code: 'NASA50', discountAmount: 50, active: true },
  { code: 'RAFI10', discountPercent: 10, active: true }
];

let itemPrices: Record<string, string> = {
  'MONOPOLY KIT': '900 BDT',
  'PRESTIGE KIT': '650 BDT',
  'EXECUTIVE KIT': '500 BDT',
  'VENTURE KIT': '300 BDT',
  '1,000 Gold Coins': '500 BDT',
  '2,080 Gold Coins': '1,040 BDT',
  '3,210 Gold Coins': '1,605 BDT',
  '4,400 Gold Coins': '2,200 BDT',
};

// Orders Endpoints
app.get('/api/orders', (_req: Request, res: Response) => {
  res.json(orders);
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { ign, item, itemsList, amount, originalAmount, couponCode, discount, method, sender, trxId, screenshot } = req.body;
  if (!ign || !trxId || (!item && (!itemsList || itemsList.length === 0))) {
    return res.status(400).json({ error: 'Missing required order details' });
  }

  const newOrder: Order = {
    id: 'ROYAL-' + Math.floor(1000 + Math.random() * 9000),
    ign: String(ign).trim(),
    item: String(item || (itemsList ? itemsList.map((i: OrderItem) => `${i.name} (x${i.quantity})`).join(', ') : 'Store Bundle')),
    itemsList: Array.isArray(itemsList) ? itemsList : undefined,
    amount: String(amount || 'BDT'),
    originalAmount: originalAmount ? String(originalAmount) : undefined,
    couponCode: couponCode ? String(couponCode) : undefined,
    discount: discount ? String(discount) : undefined,
    method: method === 'Nagad' ? 'Nagad' : 'bKash',
    sender: String(sender || ''),
    trxId: String(trxId).trim().toUpperCase(),
    screenshot: screenshot ? String(screenshot) : undefined,
    status: 'pending',
    createdAt: Date.now(),
  };

  orders.unshift(newOrder);
  res.json({ success: true, order: newOrder });
});

app.patch('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, note } = req.body;
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  if (status === 'confirmed' || status === 'cancelled' || status === 'pending') {
    order.status = status;
  }
  if (note !== undefined) {
    order.note = String(note);
  }
  res.json({ success: true, order });
});

// Announcements Endpoints
app.get('/api/announcements', (_req: Request, res: Response) => {
  res.json(announcements);
});

app.post('/api/announcements', (req: Request, res: Response) => {
  const { category, title, content, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content required' });
  }

  const newAnn: Announcement = {
    id: 'ann-' + Date.now(),
    category: category || 'UPDATE',
    title: String(title),
    content: String(content),
    author: author || 'Royal Administration',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  };
  announcements.unshift(newAnn);
  res.json({ success: true, announcement: newAnn });
});

app.delete('/api/announcements/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  announcements = announcements.filter(a => a.id !== id);
  res.json({ success: true });
});

// Coupon Verification & Management
app.post('/api/coupons/verify', (req: Request, res: Response) => {
  const { code } = req.body;
  const found = coupons.find(c => c.code.toUpperCase() === String(code || '').trim().toUpperCase() && c.active);
  if (!found) {
    return res.json({ valid: false, message: 'Invalid or expired coupon code' });
  }
  res.json({ valid: true, coupon: found });
});

app.get('/api/coupons', (_req: Request, res: Response) => {
  res.json(coupons);
});

app.post('/api/coupons', (req: Request, res: Response) => {
  const { code, discountPercent, discountAmount } = req.body;
  if (!code) return res.status(400).json({ error: 'Code required' });

  const coupon: Coupon = {
    code: String(code).trim().toUpperCase(),
    discountPercent: Number(discountPercent) || undefined,
    discountAmount: Number(discountAmount) || undefined,
    active: true,
  };
  coupons.push(coupon);
  res.json({ success: true, coupon });
});

app.delete('/api/coupons/:code', (req: Request, res: Response) => {
  const { code } = req.params;
  coupons = coupons.filter(c => c.code.toUpperCase() !== String(code).toUpperCase());
  res.json({ success: true });
});

// Price adjustments
app.get('/api/prices', (_req: Request, res: Response) => {
  res.json(itemPrices);
});

app.post('/api/prices', (req: Request, res: Response) => {
  const { itemName, price } = req.body;
  if (itemName && price) {
    itemPrices[itemName] = String(price);
  }
  res.json({ success: true, prices: itemPrices });
});

// Dev / Prod Vite integration
async function setupVite() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await fs.promises.readFile(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        );
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Royal SMP Server running on http://localhost:${PORT}`);
  });
}

setupVite().catch(console.error);
