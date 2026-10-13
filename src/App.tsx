import React, { useState, useEffect, useCallback } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { TopTicker } from './components/TopTicker';
import { Navbar } from './components/Navbar';
import { SlideDrawer } from './components/SlideDrawer';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { NotificationsModal } from './components/NotificationsModal';
import { StaffPasscodeModal } from './components/StaffPasscodeModal';
import { LoginModal } from './components/LoginModal';
import { Toast } from './components/Toast';

// Views
import { HomeView } from './views/HomeView';
import { StoreView } from './views/StoreView';
import { LeaderboardView } from './views/LeaderboardView';
import { VoteView } from './views/VoteView';
import { OrderTrackerView } from './views/OrderTrackerView';
import { RulesView } from './views/RulesView';
import { AboutView } from './views/AboutView';
import { AdminView } from './views/AdminView';

// Data & Types
import { 
  SERVER_CONFIG, 
  INITIAL_RANKS, 
  INITIAL_GOLD_PACKAGES, 
  INITIAL_COUPONS,
  INITIAL_ANNOUNCEMENTS,
  LEADERBOARD_RICHEST,
  LEADERBOARD_KILLS,
  LEADERBOARD_PLAYTIME
} from './data/serverData';
import { 
  ActiveView, 
  Order, 
  Coupon, 
  RankItem, 
  GoldPackage, 
  CartItem, 
  ServerStatus,
  MinecraftPlayer,
  LeaderboardDataset,
  LeaderboardEntry,
  LeaderboardCategory,
  AnnouncementItem
} from './types';

export default function App() {
  // 1. Multi-View Active Routing State
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const handleNavigate = useCallback((view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 2. Modals & Drawers State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isStaffPasscodeOpen, setIsStaffPasscodeOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  // 3. Minecraft Player Login & Skin State (Feature 2)
  const [player, setPlayer] = useState<MinecraftPlayer | null>(() => {
    try {
      const saved = localStorage.getItem('royal_player_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (newPlayer: MinecraftPlayer) => {
    setPlayer(newPlayer);
    try {
      localStorage.setItem('royal_player_user', JSON.stringify(newPlayer));
    } catch {}
    showToast(`Welcome, ${newPlayer.username}! Character skin synchronized.`);
  };

  const handleLogout = () => {
    setPlayer(null);
    try {
      localStorage.removeItem('royal_player_user');
    } catch {}
    showToast('Logged out of character profile.');
  };

  // 4. Ticker Announcement Message
  const [tickerMessage, setTickerMessage] = useState<string>(() => {
    return localStorage.getItem('royal_ticker') || SERVER_CONFIG.initialTicker;
  });

  const handleBroadcastTicker = (newMsg: string) => {
    setTickerMessage(newMsg);
    try {
      localStorage.setItem('royal_ticker', newMsg);
    } catch {}
  };

  // 5. Announcements Feed (Feature 4)
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    try {
      const saved = localStorage.getItem('royal_announcements');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ANNOUNCEMENTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('royal_announcements', JSON.stringify(announcements));
    } catch {}
  }, [announcements]);

  const handlePublishAnnouncement = (data: Omit<AnnouncementItem, 'id' | 'date'>) => {
    const newAnn: AnnouncementItem = {
      id: 'ann-' + Date.now(),
      category: data.category,
      title: data.title,
      content: data.content,
      author: data.author || 'Royal Administration',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      activeTicker: true,
    };

    setAnnouncements((prev) => [newAnn, ...prev]);

    // Instantly update both the top scrolling ticker bar and the announcements feed!
    const newTickerText = `⚡ [${newAnn.category}] ${newAnn.title}: ${newAnn.content}`;
    setTickerMessage(newTickerText);
    try {
      localStorage.setItem('royal_ticker', newTickerText);
    } catch {}

    // Dispatch to server API if available
    fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnn),
    }).catch(() => {});
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    fetch(`/api/announcements/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  // 6. Dynamic Leaderboards State (Feature 3)
  const [leaderboards, setLeaderboards] = useState<LeaderboardDataset>(() => {
    try {
      const saved = localStorage.getItem('royal_leaderboards');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      wealth: LEADERBOARD_RICHEST,
      kills: LEADERBOARD_KILLS,
      playtime: LEADERBOARD_PLAYTIME,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('royal_leaderboards', JSON.stringify(leaderboards));
    } catch {}
  }, [leaderboards]);

  const handleUpdateLeaderboardEntry = (category: LeaderboardCategory, entry: LeaderboardEntry) => {
    setLeaderboards((prev) => {
      const list = [...(prev[category] || [])];
      const existingIndex = list.findIndex((e) => e.rank === entry.rank);
      if (existingIndex >= 0) {
        list[existingIndex] = entry;
      } else {
        list.push(entry);
      }
      list.sort((a, b) => a.rank - b.rank);
      return { ...prev, [category]: list };
    });
  };

  const handleDeleteLeaderboardEntry = (category: LeaderboardCategory, rank: number) => {
    setLeaderboards((prev) => ({
      ...prev,
      [category]: (prev[category] || []).filter((e) => e.rank !== rank),
    }));
  };

  const handleResetLeaderboardCategory = (category: LeaderboardCategory) => {
    setLeaderboards((prev) => ({
      ...prev,
      [category]:
        category === 'wealth'
          ? LEADERBOARD_RICHEST
          : category === 'kills'
          ? LEADERBOARD_KILLS
          : LEADERBOARD_PLAYTIME,
    }));
  };

  // 7. Server Ranks & Gold Packages (with live Admin price overrides)
  const [ranks, setRanks] = useState<RankItem[]>(() => {
    try {
      const saved = localStorage.getItem('royal_ranks');
      return saved ? JSON.parse(saved) : INITIAL_RANKS;
    } catch {
      return INITIAL_RANKS;
    }
  });

  const [goldPackages, setGoldPackages] = useState<GoldPackage[]>(() => {
    try {
      const saved = localStorage.getItem('royal_gold_packages');
      return saved ? JSON.parse(saved) : INITIAL_GOLD_PACKAGES;
    } catch {
      return INITIAL_GOLD_PACKAGES;
    }
  });

  // 8. Coupons State (Dynamic sync with Store & Admin)
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('royal_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [appliedStoreCoupon, setAppliedStoreCoupon] = useState<Coupon | null>(null);

  // 9. Orders State (Live Queue for Admin and Order Tracker)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('royal_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
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
  });

  useEffect(() => {
    try {
      localStorage.setItem('royal_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Load orders, coupons, prices, announcements from server backend if online
  useEffect(() => {
    const fetchRemoteData = async () => {
      try {
        const [ordersRes, couponsRes, pricesRes, annRes] = await Promise.all([
          fetch('/api/orders').catch(() => null),
          fetch('/api/coupons').catch(() => null),
          fetch('/api/prices').catch(() => null),
          fetch('/api/announcements').catch(() => null),
        ]);

        if (ordersRes && ordersRes.ok) {
          const remoteOrders = await ordersRes.json();
          if (Array.isArray(remoteOrders) && remoteOrders.length > 0) {
            setOrders(remoteOrders);
          }
        }
        if (couponsRes && couponsRes.ok) {
          const remoteCoupons = await couponsRes.json();
          if (Array.isArray(remoteCoupons) && remoteCoupons.length > 0) {
            setCoupons(remoteCoupons);
          }
        }
        if (annRes && annRes.ok) {
          const remoteAnn = await annRes.json();
          if (Array.isArray(remoteAnn) && remoteAnn.length > 0) {
            setAnnouncements(remoteAnn);
          }
        }
        if (pricesRes && pricesRes.ok) {
          const priceMap = await pricesRes.json();
          if (priceMap && typeof priceMap === 'object') {
            setRanks((prev) =>
              prev.map((r) => {
                const override = priceMap[`${r.name} KIT`];
                if (override) {
                  const num = parseInt(override.replace(/[^0-9]/g, ''), 10);
                  if (!isNaN(num)) return { ...r, priceBDT: num };
                }
                return r;
              })
            );
          }
        }
      } catch {}
    };
    fetchRemoteData();
  }, []);

  // 10. Player Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('royal_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('royal_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // 11. Checkout items currently passed into PaymentModal
  const [checkoutItems, setCheckoutItems] = useState<Array<{ id: string; name: string; priceBDT: number; quantity?: number }>>([]);

  // 12. Toast notification system
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3200);
  }, []);

  // 13. Copy Handlers for Java & Bedrock
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);

  const handleCopyJava = useCallback(() => {
    navigator.clipboard.writeText(SERVER_CONFIG.javaIP);
    setCopiedJava(true);
    showToast(`Java IP copied: ${SERVER_CONFIG.javaIP}`);
    setTimeout(() => setCopiedJava(false), 2400);
  }, [showToast]);

  const handleCopyBedrock = useCallback(() => {
    navigator.clipboard.writeText(`${SERVER_CONFIG.bedrockIP}:${SERVER_CONFIG.bedrockPort}`);
    setCopiedBedrock(true);
    showToast(`Bedrock IP & Port copied: ${SERVER_CONFIG.bedrockIP}:${SERVER_CONFIG.bedrockPort}`);
    setTimeout(() => setCopiedBedrock(false), 2400);
  }, [showToast]);

  // 14. Server Status
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/server/status');
        if (res.ok) {
          const data = await res.json();
          setServerStatus(data);
        }
      } catch {}
    };
    fetchStatus();
  }, []);

  // Coupon Verification logic
  const handleApplyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.active);
    if (found) {
      setAppliedStoreCoupon(found);
      return { 
        success: true, 
        message: `Applied ${found.code}: ${found.discountPercent ? `${found.discountPercent}% Off` : `${found.discountAmount} BDT Off`}` 
      };
    }
    try {
      const res = await fetch('/api/coupons/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode }),
      });
      const data = await res.json();
      if (data.valid && data.coupon) {
        setAppliedStoreCoupon(data.coupon);
        return { success: true, message: `Coupon ${data.coupon.code} active!` };
      }
    } catch {}
    return { success: false, message: 'Invalid or expired coupon code' };
  };

  const handleClearCoupon = () => {
    setAppliedStoreCoupon(null);
    showToast('Coupon removed');
  };

  // Cart operations
  const handleAddToCart = (item: { id: string; name: string; type: 'rank' | 'gold'; priceBDT: number }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to cart!`);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Checkout triggers
  const handleClaimRank = (rank: RankItem, finalPrice: number) => {
    setCheckoutItems([
      {
        id: rank.id,
        name: `${rank.name} RANK`,
        priceBDT: finalPrice,
        quantity: 1,
      },
    ]);
    setIsPaymentModalOpen(true);
  };

  const handleClaimGold = (pkg: GoldPackage, finalPrice: number) => {
    setCheckoutItems([
      {
        id: pkg.id,
        name: `${pkg.coins.toLocaleString()} Gold Coins`,
        priceBDT: finalPrice,
        quantity: 1,
      },
    ]);
    setIsPaymentModalOpen(true);
  };

  const handleCartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutItems(
      cart.map((c) => ({
        id: c.id,
        name: c.name,
        priceBDT: c.priceBDT,
        quantity: c.quantity,
      }))
    );
    setIsCartOpen(false);
    setIsPaymentModalOpen(true);
  };

  // Order Success callback
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== newOrder.id)]);
    setConfirmedOrderId(newOrder.id);
    setIsSuccessOpen(true);
    setCart([]);
    showToast(`Order #${newOrder.id} successfully queued!`);
  };

  // Admin Actions
  const handleUpdateOrderStatus = (orderId: string, status: 'confirmed' | 'cancelled') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => {});
    showToast(`Order #${orderId} marked as ${status}`);
  };

  const handleCreateCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev.filter((c) => c.code !== coupon.code)]);
    fetch('/api/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coupon),
    }).catch(() => {});
    try {
      localStorage.setItem('royal_coupons', JSON.stringify([coupon, ...coupons]));
    } catch {}
  };

  const handleDeleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    fetch(`/api/coupons/${code}`, { method: 'DELETE' }).catch(() => {});
    showToast(`Deleted coupon ${code}`);
  };

  const handleUpdatePrices = (
    newRankPrices: Record<string, number>,
    newGoldPrices: Record<string, number>
  ) => {
    const updatedRanks = ranks.map((r) =>
      newRankPrices[r.id] !== undefined ? { ...r, priceBDT: newRankPrices[r.id] } : r
    );
    const updatedGold = goldPackages.map((g) =>
      newGoldPrices[g.id] !== undefined ? { ...g, priceBDT: newGoldPrices[g.id] } : g
    );
    setRanks(updatedRanks);
    setGoldPackages(updatedGold);
    try {
      localStorage.setItem('royal_ranks', JSON.stringify(updatedRanks));
      localStorage.setItem('royal_gold_packages', JSON.stringify(updatedGold));
    } catch {}

    updatedRanks.forEach((r) => {
      fetch('/api/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName: `${r.name} KIT`, price: `${r.priceBDT} BDT` }),
      }).catch(() => {});
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080A10] text-[#F8FAFC] selection:bg-[#D4AF37]/30 selection:text-[#FDE68A] flex flex-col relative overflow-x-hidden font-body">
      {/* 1. Procedural Golden Ember Particles */}
      <ParticleCanvas />

      {/* 2. Top Announcement Strip */}
      <TopTicker
        message={tickerMessage}
        onNavigate={handleNavigate}
      />

      {/* 3. Global Top Navbar (With Player IGN Login & Avatar Skin Preview) */}
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        cartCount={totalCartCount}
        player={player}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 4. Slide-Out Drawer */}
      <SlideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        copiedJava={copiedJava}
        onCopyJava={handleCopyJava}
        onOpenStaffGate={() => setIsStaffPasscodeOpen(true)}
        player={player}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 5. MULTI-VIEW VIEW ROUTER CONTAINER */}
      <main className="flex-1 relative z-10">
        {activeView === 'home' && (
          <HomeView
            serverStatus={serverStatus}
            copiedJava={copiedJava}
            copiedBedrock={copiedBedrock}
            onCopyJava={handleCopyJava}
            onCopyBedrock={handleCopyBedrock}
            onNavigate={handleNavigate}
            onShowToast={showToast}
            announcements={announcements}
          />
        )}

        {(activeView === 'store' || activeView === 'ranks') && (
          <StoreView
            ranks={ranks}
            goldPackages={goldPackages}
            appliedCoupon={appliedStoreCoupon}
            onApplyCoupon={handleApplyCoupon}
            onClearCoupon={handleClearCoupon}
            onClaimRank={handleClaimRank}
            onClaimGold={handleClaimGold}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeView === 'leaderboard' && (
          <LeaderboardView leaderboards={leaderboards} />
        )}

        {activeView === 'vote' && (
          <VoteView defaultIgn={player?.username} />
        )}

        {activeView === 'track' && (
          <OrderTrackerView orders={orders} />
        )}

        {activeView === 'rules' && (
          <RulesView />
        )}

        {activeView === 'about' && (
          <AboutView />
        )}

        {activeView === 'admin' && (
          <AdminView
            orders={orders}
            coupons={coupons}
            ranks={ranks}
            goldPackages={goldPackages}
            leaderboards={leaderboards}
            announcements={announcements}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onCreateCoupon={handleCreateCoupon}
            onDeleteCoupon={handleDeleteCoupon}
            onUpdatePrices={handleUpdatePrices}
            onBroadcastTicker={handleBroadcastTicker}
            currentTicker={tickerMessage}
            onUpdateLeaderboardEntry={handleUpdateLeaderboardEntry}
            onDeleteLeaderboardEntry={handleDeleteLeaderboardEntry}
            onResetLeaderboardCategory={handleResetLeaderboardCategory}
            onPublishAnnouncement={handlePublishAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* 6. Multi-Column Imperial Footer with Staff Lock */}
      <Footer
        onNavigate={handleNavigate}
        onOpenStaffGate={() => {
          if (sessionStorage.getItem('royal_admin_auth') === 'true') {
            handleNavigate('admin');
          } else {
            setIsStaffPasscodeOpen(true);
          }
        }}
      />

      {/* 7. Interactive Modals */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        items={checkoutItems}
        preAppliedCoupon={appliedStoreCoupon}
        onOrderSuccess={handleOrderSuccess}
        defaultIgn={player?.username}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleCartCheckout}
      />

      <OrderSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        orderId={confirmedOrderId}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        announcements={announcements}
      />

      <StaffPasscodeModal
        isOpen={isStaffPasscodeOpen}
        onClose={() => setIsStaffPasscodeOpen(false)}
        onSuccess={() => handleNavigate('admin')}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        initialIgn={player?.username || ''}
      />

      {/* 8. Global Action Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
