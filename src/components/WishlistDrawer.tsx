import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { CurrencyCode, Product } from '../types';
import { CURRENCIES } from '../data/pakistanData';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  currency: CurrencyCode;
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  currency,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between text-left relative animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#fcfaf7]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
              Saved Favorites
            </h3>
            <span className="text-xs bg-rose-100 text-rose-900 font-bold px-2 py-0.5 rounded-full">
              {wishlist.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxury text-lg font-bold text-stone-800">
                Your Wishlist is Empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Tap the heart on any lawn suit, kurti, or formal to save for later.
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80 items-center justify-between"
              >
                <div className="w-16 h-20 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 text-xs">
                  <span className="text-[10px] text-amber-800 font-semibold uppercase block">
                    {product.pieceCount} • {product.category}
                  </span>
                  <h4 className="font-serif-luxury text-sm font-bold text-stone-900 truncate">
                    {product.title}
                  </h4>
                  <div className="font-bold text-stone-900 mt-1">
                    {CURRENCIES[currency].format(product.pricePKR)}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 items-end">
                  <button
                    onClick={() => {
                      onMoveToCart(product);
                      onRemoveFromWishlist(product.id);
                    }}
                    className="p-2 bg-[#0f382c] hover:bg-[#154637] text-white rounded-lg text-xs cursor-pointer shadow-sm"
                    title="Move to Shopping Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="p-4 bg-[#fcfaf7] border-t border-stone-200">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-full transition"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
