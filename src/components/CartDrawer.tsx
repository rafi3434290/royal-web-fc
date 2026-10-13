import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalBDT = items.reduce((sum, item) => sum + item.priceBDT * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#0A0E18]/95 border-l border-[#D4AF37]/25 backdrop-blur-2xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h3 className="font-brand text-lg font-bold text-white">Player Cart</h3>
                <span className="text-xs text-slate-400">
                  {items.length} {items.length === 1 ? 'item' : 'items'} queued
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="my-6 space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {items.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <ShoppingBag size={42} className="mx-auto mb-3 opacity-30 text-[#D4AF37]" />
                <p className="text-sm font-semibold text-slate-400">Your royal cart is empty</p>
                <p className="text-xs text-slate-500 mt-1">Select a rank or gold bundle to begin</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 group"
                >
                  <div>
                    <h4 className="font-brand text-sm font-bold text-white">{item.name}</h4>
                    <span className="text-xs font-mono text-[#FDE68A]">
                      {item.priceBDT} BDT {item.quantity > 1 ? `x ${item.quantity}` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-white">
                      {item.priceBDT * item.quantity} BDT
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Checkout Actions */}
        {items.length > 0 && (
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Treasury Amount</span>
              <span className="font-brand text-2xl font-black text-[#F59E0B]">
                {totalBDT} BDT
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] animate-gold-shimmer text-slate-950 font-black text-sm tracking-wide shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onClearCart}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
