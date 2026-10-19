import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Scissors, Sparkles } from 'lucide-react';
import { CurrencyCode, Product } from '../types';
import { CURRENCIES } from '../data/pakistanData';

interface ProductCardProps {
  product: Product;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onQuickAddToCart: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onQuickAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const currentPriceFormatted = CURRENCIES[currency].format(product.pricePKR);
  const originalPriceFormatted = product.originalPricePKR 
    ? CURRENCIES[currency].format(product.originalPricePKR) 
    : null;

  const discountPercent = product.originalPricePKR
    ? Math.round(((product.originalPricePKR - product.pricePKR) / product.originalPricePKR) * 100)
    : 0;

  return (
    <div
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200/80 hover:border-stone-400 hover:shadow-lg transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-[#0f382c] text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
              New Lawn '26
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-rose-700 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded shadow">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-700 hover:text-rose-600 transition shadow hover:scale-110 cursor-pointer z-10"
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-stone-700'
            }`}
          />
        </button>

        {/* Piece Tag & Stitching Tag */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <span className="bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[10px] font-semibold px-2 py-0.5 rounded">
            {product.pieceCount} {product.category === 'unstitched' ? 'Unstitched' : 'Suit'}
          </span>

          {product.stitchingAvailable && (
            <span className="bg-amber-100/90 backdrop-blur-sm text-[#0f382c] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-amber-300/40">
              <Scissors className="w-2.5 h-2.5" />
              Stitching Avail.
            </span>
          )}
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white/95 text-stone-900 px-3.5 py-2 rounded-full text-xs font-semibold shadow-lg hover:bg-stone-100 flex items-center gap-1.5 cursor-pointer transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye className="w-3.5 h-3.5 text-stone-700" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex flex-col flex-1 justify-between text-left">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="tracking-wide uppercase font-semibold text-amber-800/80 flex items-center gap-1">
              <span className="text-[9px] font-mono font-extrabold text-[#0f382c] bg-amber-50 border border-amber-200/80 px-1 rounded">ZM</span>
              <span>{product.collection}</span>
            </span>
            <span className="font-serif-luxury text-stone-400 text-xs" dir="rtl">
              {product.urduTitle.split('-')[0]}
            </span>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif-luxury text-base font-semibold text-stone-900 hover:text-[#0f382c] line-clamp-1 cursor-pointer transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>

          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
            {product.fabric}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-stone-100 mt-3 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-stone-950">
                {currentPriceFormatted}
              </span>
              {originalPriceFormatted && (
                <span className="text-xs text-stone-400 line-through">
                  {originalPriceFormatted}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-800 font-medium block">
              Inclusive of GST
            </span>
          </div>

          <button
            onClick={() => onQuickAddToCart(product)}
            className="bg-emerald-50 hover:bg-[#0f382c] text-[#0f382c] hover:text-white p-2 rounded-full transition-colors cursor-pointer border border-emerald-200"
            title="Add to Shopping Bag"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
