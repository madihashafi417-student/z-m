import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Truck, 
  Phone, 
  Ruler, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { CurrencyCode, ProductCategory } from '../types';
import { CURRENCIES } from '../data/pakistanData';

interface HeaderProps {
  currentCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  cartCount: number;
  cartTotalPKR: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTrackOrder: () => void;
  onOpenStitchingGuide: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  currency,
  onCurrencyChange,
  cartCount,
  cartTotalPKR,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTrackOrder,
  onOpenStitchingGuide,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const categories: { label: string; urdu: string; value: ProductCategory }[] = [
    { label: 'All Collections', urdu: 'تمام مجموعہ', value: 'all' },
    { label: 'Winter Collection', urdu: 'موسمِ سرما', value: 'winter' },
    { label: 'Unstitched Lawn', urdu: 'لان ان سلے سوٹ', value: 'unstitched' },
    { label: 'Ready-to-Wear (Pret)', urdu: 'ریڈی ٹو ویئر پرٹ', value: 'pret' },
    { label: 'Festive & Shaadi', urdu: 'شادی و فیسٹیو', value: 'festive' },
    { label: "Men's Eastern", urdu: 'مردانہ روایتی', value: 'mens' },
    { label: 'Heirloom Shawls', urdu: 'پشمینہ و شالیں', value: 'shawls' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fcfbf9]/95 backdrop-blur-md border-b border-[#e7e1d7] transition-all">
      {/* Top Banner Bar for Pakistan */}
      <div className="bg-[#0f382c] text-amber-50 text-xs px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center text-[11px] md:text-xs">
            <span className="flex items-center gap-1.5 font-medium tracking-wide">
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              <span>Free Express Delivery Across Pakistan on Orders Over Rs. 4,999</span>
            </span>
            <span className="hidden sm:inline-block text-emerald-400">•</span>
            <span className="hidden sm:inline-block text-amber-200">
              Cash on Delivery (COD) Available Nationwide 🇵🇰
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] md:text-xs">
            {/* Track Order Quick Link */}
            <button
              onClick={onOpenTrackOrder}
              className="flex items-center gap-1 hover:text-amber-200 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Track TCS Order</span>
            </button>

            <span className="text-emerald-400">|</span>

            {/* Helpline */}
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-amber-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden lg:inline">Helpline:</span>
              <span>+92 300 1234567</span>
            </a>

            <span className="text-emerald-400">|</span>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 font-semibold text-amber-300 hover:text-white cursor-pointer px-1 py-0.5 rounded"
              >
                <span>{currency} ({CURRENCIES[currency].symbol})</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-32 bg-stone-900 border border-stone-700 shadow-xl rounded-md py-1 z-50 text-xs"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        onCurrencyChange(cur);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-emerald-950/60 ${
                        currency === cur ? 'text-amber-300 font-bold' : 'text-stone-300'
                      }`}
                    >
                      <span>{cur}</span>
                      <span className="text-stone-400 text-[10px]">{CURRENCIES[cur].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo - ZM Luxury Haute Couture */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => onSelectCategory('all')}
              className="cursor-pointer group flex items-center gap-3"
            >
              {/* Luxury Monogram Crest */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0f382c] to-[#1a4a3b] border-2 border-amber-300/90 flex items-center justify-center text-amber-100 shadow-md group-hover:scale-105 transition-all shrink-0">
                <span className="font-brand-zm font-black text-lg sm:text-xl tracking-[0.1em] text-amber-200 pl-0.5">
                  ZM
                </span>
              </div>

              <div className="flex flex-col items-start">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-brand-zm text-3xl sm:text-4xl lg:text-5xl font-black tracking-[0.18em] text-[#0f382c] uppercase leading-none">
                    ZM
                  </span>
                  <span className="text-sm sm:text-base font-serif-luxury text-amber-700 font-semibold hidden sm:inline" dir="rtl">
                    ز • م
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-stone-500 font-bold mt-1">
                  Pret & Couture • Lahore
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search lawn suits, chiffon, kurtas, velvet shawls..."
                className="w-full bg-white border border-[#dcd4c7] rounded-full pl-10 pr-9 py-2 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#0f382c] focus:ring-1 focus:ring-[#0f382c] transition shadow-sm"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Stitching Guide quick trigger */}
            <button
              onClick={onOpenStitchingGuide}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 text-stone-700 hover:border-[#0f382c] hover:text-[#0f382c] text-xs font-medium transition cursor-pointer"
              title="Pakistani Master Stitching & Measurements"
            >
              <Ruler className="w-3.5 h-3.5 text-amber-700" />
              <span>Stitching Guide</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-700 hover:text-[#0f382c] transition cursor-pointer rounded-full hover:bg-stone-100"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#0f382c] hover:bg-[#164a3b] text-white px-3 sm:px-4 py-2 rounded-full transition shadow-md cursor-pointer group"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-500 text-stone-900 rounded-full w-4 h-4 text-[10px] font-extrabold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] text-amber-200/90 font-medium">Bag</span>
                <span className="text-xs font-semibold">
                  {cartTotalPKR > 0 ? CURRENCIES[currency].format(cartTotalPKR) : 'Rs. 0'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search lawn, pret, festive..."
              className="w-full bg-white border border-[#dcd4c7] rounded-full pl-9 pr-8 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#0f382c]"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-8 pt-3 border-t border-[#f0eae1] mt-3">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`group relative text-xs tracking-[0.15em] uppercase font-semibold py-1 cursor-pointer transition-colors ${
                  isActive
                    ? 'text-[#0f382c]'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0f382c] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Off-Canvas / Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-3 shadow-xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-2">Collections</p>
          <div className="grid grid-cols-1 gap-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  onSelectCategory(cat.value);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left transition ${
                  currentCategory === cat.value
                    ? 'bg-emerald-50 text-[#0f382c] font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-xs text-stone-400 font-serif-luxury" dir="rtl">{cat.urdu}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenStitchingGuide();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-stone-700 px-2 py-1.5 rounded hover:bg-stone-50"
            >
              <Ruler className="w-4 h-4 text-amber-700" />
              <span>Pakistani Tailoring & Stitching Guide</span>
            </button>
            <button
              onClick={() => {
                onOpenTrackOrder();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs text-stone-700 px-2 py-1.5 rounded hover:bg-stone-50"
            >
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>Track Pakistani Courier (TCS / Leopards)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
