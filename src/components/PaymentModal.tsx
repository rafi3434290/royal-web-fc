import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ShieldCheck, Upload, ArrowRight, Tag, AlertCircle, Sparkles } from 'lucide-react';
import { SERVER_CONFIG } from '../data/serverData';
import { Order, Coupon } from '../types';

interface PaymentItem {
  id: string;
  name: string;
  priceBDT: number;
  quantity?: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: PaymentItem[];
  preAppliedCoupon?: Coupon | null;
  onOrderSuccess: (order: Order) => void;
  defaultIgn?: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  items,
  preAppliedCoupon,
  onOrderSuccess,
  defaultIgn = '',
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [ign, setIgn] = useState(defaultIgn);
  const [senderNumber, setSenderNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState(preAppliedCoupon?.code || '');
  const [couponApplied, setCouponApplied] = useState<Coupon | null>(preAppliedCoupon || null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (defaultIgn) {
      setIgn(defaultIgn);
    }
  }, [defaultIgn, isOpen]);

  useEffect(() => {
    if (preAppliedCoupon) {
      setCouponApplied(preAppliedCoupon);
      setCouponCode(preAppliedCoupon.code);
    }
  }, [preAppliedCoupon, isOpen]);

  if (!isOpen || items.length === 0) return null;

  const rawTotalBDT = items.reduce((sum, item) => sum + item.priceBDT * (item.quantity || 1), 0);
  let discountBDT = 0;
  if (couponApplied) {
    if (couponApplied.discountPercent) {
      discountBDT = Math.round((rawTotalBDT * couponApplied.discountPercent) / 100);
    } else if (couponApplied.discountAmount) {
      discountBDT = Math.min(couponApplied.discountAmount, rawTotalBDT);
    }
  }
  const finalTotalBDT = Math.max(0, rawTotalBDT - discountBDT);

  const currentRecipient = selectedMethod === 'bKash' ? SERVER_CONFIG.bkashNumber : SERVER_CONFIG.nagadNumber;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(currentRecipient);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleVerifyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponError(null);
    try {
      const res = await fetch('/api/coupons/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim() }),
      });
      const data = await res.json();
      if (data.valid && data.coupon) {
        setCouponApplied(data.coupon);
        setCouponError(null);
      } else {
        setCouponError(data.message || 'Invalid or expired coupon');
        setCouponApplied(null);
      }
    } catch {
      // Offline fallback: check well-known coupons
      const code = couponCode.trim().toUpperCase();
      if (code === 'ROYAL20') {
        setCouponApplied({ code: 'ROYAL20', discountPercent: 20, active: true });
        setCouponError(null);
      } else if (code === 'NASA50') {
        setCouponApplied({ code: 'NASA50', discountAmount: 50, active: true });
        setCouponError(null);
      } else if (code === 'RAFI10') {
        setCouponApplied({ code: 'RAFI10', discountPercent: 10, active: true });
        setCouponError(null);
      } else {
        setCouponError('Invalid coupon code');
        setCouponApplied(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError('Screenshot file must be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!ign.trim()) {
      setFormError('Please enter your Minecraft In-Game Name (IGN)');
      return;
    }
    if (!senderNumber.trim() || senderNumber.length < 10) {
      setFormError('Please enter a valid bKash/Nagad sender phone number');
      return;
    }
    if (!trxId.trim() || trxId.length < 5) {
      setFormError('Please provide the valid Transaction ID (TrxID)');
      return;
    }

    setIsSubmitting(true);

    const generatedId = 'ROYAL-' + Math.floor(1000 + Math.random() * 9000);
    const newOrderObj: Order = {
      id: generatedId,
      ign: ign.trim(),
      item: items.map((i) => `${i.name} (x${i.quantity || 1})`).join(', '),
      itemsList: items.map((i) => ({
        name: i.name,
        price: `${i.priceBDT} BDT`,
        quantity: i.quantity || 1,
      })),
      amount: `${finalTotalBDT} BDT`,
      originalAmount: `${rawTotalBDT} BDT`,
      couponCode: couponApplied?.code,
      discount: discountBDT > 0 ? `${discountBDT} BDT` : undefined,
      method: selectedMethod,
      sender: senderNumber.trim(),
      trxId: trxId.trim().toUpperCase(),
      screenshot: screenshotPreview || undefined,
      status: 'pending',
      createdAt: Date.now(),
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrderObj),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.order) {
          onOrderSuccess(data.order);
          onClose();
          return;
        }
      }
      onOrderSuccess(newOrderObj);
      onClose();
    } catch {
      onOrderSuccess(newOrderObj);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl max-h-[92vh] bg-[#0A0E18] border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-[0_0_60px_rgba(0,0,0,0.9)] z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-bold text-[#D4AF37] tracking-widest uppercase">
              ROYAL TREASURY PORTAL
            </span>
            <h3 className="font-brand text-xl sm:text-2xl font-black text-white">
              Claim Royal Order
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close payment dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items Summary */}
        <div className="my-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Item(s) Selected</span>
            <span>Total Value</span>
          </div>

          <div className="space-y-1">
            {items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm font-semibold text-white">
                <span>
                  {it.name} {it.quantity && it.quantity > 1 ? `x${it.quantity}` : ''}
                </span>
                <span className="font-mono text-[#FDE68A]">
                  {it.priceBDT * (it.quantity || 1)} BDT
                </span>
              </div>
            ))}
          </div>

          {discountBDT > 0 && (
            <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold pt-2 mt-2 border-t border-slate-800">
              <span>Coupon Discount ({couponApplied?.code})</span>
              <span>-{discountBDT} BDT</span>
            </div>
          )}

          <div className="flex items-center justify-between text-base font-bold text-white pt-2.5 mt-2 border-t border-slate-800">
            <span>Payable Amount</span>
            <span className="font-mono text-lg text-[#F59E0B]">
              {finalTotalBDT} BDT
            </span>
          </div>
        </div>

        {/* Payment Method Selector (bKash / Nagad) */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
            Select Payment Method (Personal Send Money)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedMethod('bKash')}
              className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2.5 font-bold text-sm transition-all cursor-pointer ${
                selectedMethod === 'bKash'
                  ? 'bg-[#E2136E]/15 border-[#E2136E] text-[#E2136E] shadow-[0_0_20px_rgba(226,19,110,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#E2136E]" />
              <span>bKash Personal</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedMethod('Nagad')}
              className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2.5 font-bold text-sm transition-all cursor-pointer ${
                selectedMethod === 'Nagad'
                  ? 'bg-[#F7941D]/15 border-[#F7941D] text-[#F7941D] shadow-[0_0_20px_rgba(247,148,29,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#F7941D]" />
              <span>Nagad Personal</span>
            </button>
          </div>
        </div>

        {/* Merchant Recipient Number Card with Direct Copy */}
        <div className="mb-6 p-4 rounded-2xl bg-black/60 border border-[#D4AF37]/30 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase">
              Send Money to Official Number:
            </p>
            <p className="font-mono text-base sm:text-lg font-bold text-white select-all">
              {currentRecipient}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopyNumber}
            className="px-3.5 py-2 rounded-full bg-[#D4AF37] hover:bg-[#FDE68A] text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.3)] shrink-0"
          >
            {copiedNumber ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedNumber ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Promo Coupon Box */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Discount Coupon (Optional)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Try ROYAL20 or NASA50"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#D4AF37] text-sm text-white placeholder-slate-600 uppercase font-mono outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleVerifyCoupon}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-[#FDE68A] border border-slate-700 hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
          {couponApplied && (
            <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1 font-medium">
              <Sparkles size={12} />
              <span>Coupon {couponApplied.code} applied!</span>
            </p>
          )}
          {couponError && (
            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle size={12} />
              <span>{couponError}</span>
            </p>
          )}
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Minecraft In-Game Name (IGN) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. RaFI_Playz or mr_nasa"
              value={ign}
              onChange={(e) => setIgn(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#D4AF37] text-sm text-white placeholder-slate-600 outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Sender Mobile Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="01XXXXXXXXX"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#D4AF37] text-sm text-white placeholder-slate-600 outline-none transition-colors font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Transaction ID (TrxID) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. BL892K4M2"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#D4AF37] text-sm text-white placeholder-slate-600 outline-none transition-colors uppercase font-mono"
              />
            </div>
          </div>

          {/* Screenshot Upload / Preview (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Payment Screenshot (Optional, for instant verification)
            </label>
            <div className="flex items-center gap-3">
              <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-slate-700 hover:border-[#D4AF37] bg-slate-900/40 text-slate-400 hover:text-white text-xs cursor-pointer transition-colors">
                <Upload size={14} />
                <span>{screenshotPreview ? 'Change Screenshot' : 'Upload Receipt Screenshot'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {screenshotPreview && (
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#D4AF37]/40 shrink-0">
                  <img
                    src={screenshotPreview}
                    alt="Receipt Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] animate-gold-shimmer text-slate-950 font-black text-sm tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Verifying with Treasury...' : 'Submit Order for Verification'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck size={13} className="text-[#D4AF37]" />
            <span>Protected by Royal SMP Staff • In-game delivery within 5-15 mins</span>
          </p>
        </form>
      </div>
    </div>
  );
};
