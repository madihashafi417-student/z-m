import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Scissors, 
  Truck, 
  Tag, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { CartItem, CurrencyCode } from '../types';
import { CURRENCIES, DISCOUNT_CODES, FREE_SHIPPING_THRESHOLD_PKR, STANDARD_SHIPPING_FEE_PKR } from '../data/pakistanData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotalPKR = items.reduce((sum, item) => sum + item.itemPricePKR * item.quantity, 0);

  // Discount calculation
  let discountAmountPKR = 0;
  if (appliedPromo && DISCOUNT_CODES[appliedPromo]) {
    const promo = DISCOUNT_CODES[appliedPromo];
    if (subtotalPKR >= promo.minOrder) {
      discountAmountPKR = Math.round((subtotalPKR * promo.percent) / 100);
    }
  }

  // Shipping logic
  const isFreeShipping = subtotalPKR >= FREE_SHIPPING_THRESHOLD_PKR || subtotalPKR === 0;
  const shippingFeePKR = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE_PKR;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_PKR - subtotalPKR);
  const freeShippingProgressPercent = Math.min(100, Math.round((subtotalPKR / FREE_SHIPPING_THRESHOLD_PKR) * 100));

  const grandTotalPKR = Math.max(0, subtotalPKR - discountAmountPKR + shippingFeePKR);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput.trim().toUpperCase());
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between text-left relative animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#fcfaf7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0f382c]" />
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
              Shopping Bag
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator (Pakistani threshold) */}
        <div className="bg-[#f0f9f5] border-b border-emerald-100 px-4 py-2.5 text-xs">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="flex items-center gap-1 font-semibold text-emerald-950">
              <Truck className="w-3.5 h-3.5 text-emerald-700" />
              {isFreeShipping && subtotalPKR > 0
                ? 'Unlocked Free Express Delivery in Pakistan!'
                : `Add ${CURRENCIES[currency].format(remainingForFreeShipping)} more for FREE Nationwide Delivery`}
            </span>
            <span className="font-bold text-emerald-800">{freeShippingProgressPercent}%</span>
          </div>
          <div className="w-full bg-emerald-200/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#0f382c] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxury text-lg font-bold text-stone-800">
                Your Shopping Bag is Empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our unstitched lawn, festive pret, or men's eastern collections.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#0f382c] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#164d3d] transition cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80 relative"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between text-xs">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif-luxury text-sm font-bold text-stone-900 line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-400 hover:text-rose-600 transition p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Stitching Badge */}
                    <div className="mt-1 flex flex-wrap gap-1">
                      <span className="text-[10px] bg-stone-200 text-stone-800 px-1.5 py-0.5 rounded">
                        {item.product.pieceCount}
                      </span>

                      {item.stitchingType === 'unstitched' && (
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-medium px-1.5 py-0.5 rounded">
                          Unstitched Fabric
                        </span>
                      )}

                      {item.stitchingType === 'standard' && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-900 font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Scissors className="w-2.5 h-2.5" />
                          Size {item.selectedSize}
                        </span>
                      )}

                      {item.stitchingType === 'custom' && (
                        <span className="text-[10px] bg-purple-100 text-purple-900 font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Scissors className="w-2.5 h-2.5" />
                          Bespoke ({item.customMeasurements?.bottomStyle})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 mt-2">
                    <div className="flex items-center border border-stone-300 rounded bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-stone-900 text-[11px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-stone-950 text-sm">
                      {CURRENCIES[currency].format(item.itemPricePKR * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code & Checkout Footer */}
        {items.length > 0 && (
          <div className="p-4 bg-[#fcfaf7] border-t border-stone-200 space-y-3">
            {/* Promo Code Voucher Form */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-lg px-3 py-1.5 text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Coupon <strong>{appliedPromo}</strong> applied</span>
                  </div>
                  <button
                    onClick={onRemovePromo}
                    className="text-stone-500 hover:text-stone-800 text-[11px] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. EID2026)"
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs uppercase text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#0f382c]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoMessage && (
                <p className={`text-[11px] mt-1 ${promoMessage.error ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Suggested coupon hints */}
              {!appliedPromo && (
                <div className="flex gap-2 mt-1.5 text-[10px] text-stone-500">
                  <span>Try:</span>
                  <button
                    onClick={() => {
                      setPromoInput('EID2026');
                      onApplyPromo('EID2026');
                    }}
                    className="underline text-amber-800 font-semibold hover:text-amber-950 cursor-pointer"
                  >
                    EID2026 (15% Off)
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => {
                      setPromoInput('KHUSHAMDEED');
                      onApplyPromo('KHUSHAMDEED');
                    }}
                    className="underline text-amber-800 font-semibold hover:text-amber-950 cursor-pointer"
                  >
                    KHUSHAMDEED (10% Off)
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/80 pt-2.5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-800">
                  {CURRENCIES[currency].format(subtotalPKR)}
                </span>
              </div>

              {discountAmountPKR > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Discount ({appliedPromo})</span>
                  <span>- {CURRENCIES[currency].format(discountAmountPKR)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span>Courier Shipping (Pakistan)</span>
                  {isFreeShipping && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                      FREE
                    </span>
                  )}
                </span>
                <span className="font-semibold text-stone-800">
                  {shippingFeePKR === 0 ? 'Rs. 0' : CURRENCIES[currency].format(shippingFeePKR)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#0f382c] border-t border-stone-200 pt-2">
                <span>Total Amount</span>
                <span>{CURRENCIES[currency].format(grandTotalPKR)}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={onProceedToCheckout}
              className="w-full bg-[#0f382c] hover:bg-[#154637] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            <p className="text-[10px] text-center text-stone-500">
              Pay via Cash on Delivery (COD) or JazzCash / Easypaisa / Raast
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
