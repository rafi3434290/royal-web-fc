import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Copy, 
  Check, 
  MessageSquare, 
  ShieldCheck, 
  Package, 
  User
} from 'lucide-react';
import { Order } from '../types';
import { SERVER_CONFIG } from '../data/serverData';

interface OrderTrackerViewProps {
  orders: Order[];
}

export const OrderTrackerView: React.FC<OrderTrackerViewProps> = ({ orders }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSearched(true);
    const cleanQuery = searchInput.trim().toUpperCase().replace('#', '');
    const result = orders.find(
      (o) =>
        o.id.toUpperCase() === cleanQuery ||
        o.trxId.toUpperCase() === cleanQuery ||
        o.ign.toUpperCase() === cleanQuery
    );
    setFoundOrder(result || null);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase mb-2 block">
          REAL-TIME DISPATCH
        </span>
        <h1 className="font-brand text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Track Your Royal Order
        </h1>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Enter your Order ID (e.g. #ROYAL-8921), Transaction ID (TrxID), or Minecraft IGN to inspect fulfillment status.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-[#D4AF37]/35 shadow-xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              required
              placeholder="e.g. ROYAL-8921 or BL892K4M2"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-black/60 border border-slate-700 focus:border-[#D4AF37] text-sm text-white placeholder-slate-500 uppercase font-mono outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            Track Status
          </button>
        </form>
        <p className="text-[11px] text-slate-500 mt-3 text-center sm:text-left">
          Tip: You can also search by your bKash/Nagad TrxID or in-game character name.
        </p>
      </div>

      {/* Search Result */}
      {searched && (
        <div>
          {foundOrder ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
              {/* Order Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                    TRANSACTION SUMMARY
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <h3 className="font-mono text-xl sm:text-2xl font-black text-white">
                      #{foundOrder.id}
                    </h3>
                    <button
                      onClick={() => handleCopyId(foundOrder.id)}
                      className="p-1 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
                      title="Copy Order ID"
                    >
                      {copiedId ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                {/* Status Pill Badge */}
                <div>
                  {foundOrder.status === 'confirmed' ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <span>Approved &amp; Delivered in Realm</span>
                    </div>
                  ) : foundOrder.status === 'cancelled' ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/40 text-red-300 font-bold text-xs shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      <XCircle size={16} className="text-red-400" />
                      <span>Order Rejected / Refund Requested</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                      <Clock size={16} className="text-amber-400 animate-spin" />
                      <span>Pending Verification (Staff Queue)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-black/40 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Minecraft IGN</span>
                  <span className="font-brand text-base font-bold text-white flex items-center gap-2">
                    <User size={15} className="text-[#D4AF37]" />
                    <span>{foundOrder.ign}</span>
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Package Entitlement</span>
                  <span className="font-brand text-base font-bold text-white flex items-center gap-2">
                    <Package size={15} className="text-[#D4AF37]" />
                    <span className="truncate">{foundOrder.item}</span>
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Amount Paid</span>
                  <span className="font-mono text-base font-bold text-[#FDE68A]">
                    {foundOrder.amount} via {foundOrder.method}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Transaction ID (TrxID)</span>
                  <span className="font-mono text-sm font-bold text-slate-200 select-all uppercase">
                    {foundOrder.trxId}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Sender Mobile</span>
                  <span className="font-mono text-sm font-bold text-slate-200">
                    {foundOrder.sender}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Submitted On</span>
                  <span className="text-slate-300 font-mono">
                    {new Date(foundOrder.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {foundOrder.note && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-400 font-semibold block mb-1">Staff Note:</span>
                  <p className="text-slate-200">{foundOrder.note}</p>
                </div>
              )}

              {/* Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Need priority assistance with this claim?
                </span>
                <a
                  href={SERVER_CONFIG.discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare size={14} />
                  <span>Ask in Discord Support</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <XCircle size={40} className="mx-auto text-slate-600" />
              <h3 className="font-brand text-lg font-bold text-white">No Order Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We could not locate an order matching "{searchInput}". Please double check your Order ID or bKash/Nagad TrxID.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Recent Orders Overview */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
        <h4 className="font-brand text-base font-bold text-white mb-2 flex items-center gap-2">
          <ShieldCheck size={18} className="text-[#D4AF37]" />
          <span>Recent Kingdom Orders Feed</span>
        </h4>
        <p className="text-xs text-slate-400 mb-5">
          Public feed of recent player store requests processed by our automated delivery system.
        </p>

        <div className="space-y-2.5">
          {orders.slice(0, 5).map((ord) => (
            <div
              key={ord.id}
              className="p-3.5 rounded-2xl bg-black/40 border border-slate-800/80 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-[#FDE68A]">#{ord.id}</span>
                <span className="font-brand text-white font-semibold">{ord.ign}</span>
                <span className="text-slate-400 hidden sm:inline">• {ord.item}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-300 font-mono">{ord.amount}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    ord.status === 'confirmed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : ord.status === 'cancelled'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
