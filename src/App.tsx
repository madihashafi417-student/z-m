/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Scissors, 
  ShoppingBag,
  ArrowUpDown
} from 'lucide-react';
import { 
  BottomStyle, 
  CartItem, 
  CurrencyCode, 
  PieceCount, 
  Product, 
  ProductCategory, 
  StitchingMeasurements, 
  StitchingType 
} from './types';
import { PRODUCTS } from './data/products';
import { CURRENCIES, DISCOUNT_CODES } from './data/pakistanData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackModal } from './components/OrderTrackModal';
import { StitchingGuideModal } from './components/StitchingGuideModal';
import { LookbookSection } from './components/LookbookSection';
import { PakistaniPerks } from './components/PakistaniPerks';
import { CustomerTestimonials } from './components/CustomerTestimonials';
import { WishlistDrawer } from './components/WishlistDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Filtering State
  const [currentCategory, setCurrentCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [selectedPieceFilter, setSelectedPieceFilter] = useState<string>('all');
  const [stitchingOnlyFilter, setStitchingOnlyFilter] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [priceRangePKR, setPriceRangePKR] = useState<number>(35000);

  // Cart & Wishlist with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zm_cart') || localStorage.getItem('zohra_cart');
      return saved ? JSON.parse(saved) : [
        // Seed default item for instant realistic experience
        {
          cartItemId: 'seed-1',
          product: PRODUCTS[0],
          quantity: 1,
          stitchingType: 'unstitched',
          itemPricePKR: PRODUCTS[0].pricePKR,
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('zm_wishlist') || localStorage.getItem('zohra_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1]];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>('KHUSHAMDEED');

  // Modals & Drawers
  const [activeProductForModal, setActiveProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isStitchingGuideOpen, setIsStitchingGuideOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('zm_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('zm_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      all: PRODUCTS.length,
      winter: 0,
      unstitched: 0,
      pret: 0,
      festive: 0,
      mens: 0,
      shawls: 0,
    };
    PRODUCTS.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (currentCategory !== 'all' && product.category !== currentCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesCollection = product.collection.toLowerCase().includes(query);
        const matchesUrdu = product.urduTitle.includes(query);
        const matchesWork = product.workType.toLowerCase().includes(query);
        if (!matchesTitle && !matchesFabric && !matchesCollection && !matchesUrdu && !matchesWork) {
          return false;
        }
      }

      // Piece count filter
      if (selectedPieceFilter !== 'all' && product.pieceCount !== selectedPieceFilter) {
        return false;
      }

      // Stitching available filter
      if (stitchingOnlyFilter && !product.stitchingAvailable) {
        return false;
      }

      // Max price filter
      if (product.pricePKR > priceRangePKR) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price-high') return b.pricePKR - a.pricePKR;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // default: featured
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [currentCategory, searchQuery, selectedPieceFilter, stitchingOnlyFilter, priceRangePKR, sortBy]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    stitchingType: StitchingType,
    selectedSize?: 'XS' | 'S' | 'M' | 'L' | 'XL',
    customMeasurements?: StitchingMeasurements
  ) => {
    let finalItemPrice = product.pricePKR;
    if (stitchingType === 'standard') {
      finalItemPrice += product.stitchingPrices.standard;
    } else if (stitchingType === 'custom') {
      finalItemPrice += product.stitchingPrices.custom;
    }

    const cartItemId = `${product.id}-${stitchingType}-${selectedSize || 'none'}-${
      customMeasurements ? customMeasurements.bottomStyle : 'default'
    }`;

    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prevCart,
        {
          cartItemId,
          product,
          quantity: 1,
          stitchingType,
          selectedSize,
          customMeasurements,
          itemPricePKR: finalItemPrice,
        },
      ];
    });

    showToast(`Added "${product.title}" to your Shopping Bag!`);
    setIsCartOpen(true);
  };

  const handleQuickAddToCart = (product: Product) => {
    handleAddToCart(
      product,
      product.category === 'unstitched' ? 'unstitched' : 'standard',
      product.category !== 'unstitched' ? 'M' : undefined
    );
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    const isSaved = wishlist.some((p) => p.id === product.id);
    if (isSaved) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed from Wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.title}" to Wishlist!`);
    }
  };

  // Promo code
  const handleApplyPromo = (code: string) => {
    if (DISCOUNT_CODES[code]) {
      setAppliedPromo(code);
      return { success: true, message: DISCOUNT_CODES[code].description };
    }
    return { success: false, message: 'Invalid promo code for Pakistani market' };
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const totalCartPKR = cart.reduce((sum, item) => sum + item.itemPricePKR * item.quantity, 0);

  const resetFilters = () => {
    setSelectedPieceFilter('all');
    setStitchingOnlyFilter(false);
    setPriceRangePKR(35000);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 font-sans-clean selection:bg-[#0f382c] selection:text-amber-100">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#0f382c] text-amber-50 px-4 py-2.5 rounded-full shadow-2xl text-xs font-semibold flex items-center gap-2 border border-emerald-700/80 animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header with Pakistan-specific features */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        cartTotalPKR={totalCartPKR}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenStitchingGuide={() => setIsStitchingGuideOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Hero Banner with Pakistani couture storytelling */}
      <HeroBanner
        onExplore={(cat) => {
          setCurrentCategory(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Visual Category Cards Carousel / Grid */}
      <CategoryNav
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        productCounts={categoryCounts}
      />

      {/* Pakistani Market Perks: COD, Master Tailoring, Genuine Lawn */}
      <PakistaniPerks />

      {/* Catalog & Filter Section */}
      <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full text-left">
        
        {/* Title and Active Collection Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-800 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {currentCategory === 'all'
                  ? 'All Luxury Ensembles'
                  : currentCategory === 'winter'
                  ? 'Winter Khaddar, Marina & Karandi'
                  : currentCategory === 'unstitched'
                  ? 'Unstitched Lawn Collection'
                  : currentCategory === 'pret'
                  ? 'Ready-to-Wear Pret & Kurtis'
                  : currentCategory === 'festive'
                  ? 'Festive & Shaadi Formals'
                  : currentCategory === 'mens'
                  ? "Men's Eastern Collection"
                  : 'Pashmina & Velvet Shawls'}
              </span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
              {currentCategory === 'all'
                ? 'The Complete Signature Edit'
                : currentCategory === 'winter'
                ? 'WINTER MARINA & KHADDAR \'26'
                : currentCategory.toUpperCase()}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Showing {filteredProducts.length} authentic Pakistani designer pieces
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-1.5 shadow-sm">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-xs text-stone-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold text-stone-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured / Bestsellers</option>
                <option value="newest">New Arrivals First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3 bg-[#fdfcf9] border-b border-stone-200/80 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-700 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#0f382c]" />
              Pieces:
            </span>
            {['all', '1-Piece', '2-Piece', '3-Piece'].map((pc) => (
              <button
                key={pc}
                onClick={() => setSelectedPieceFilter(pc)}
                className={`text-xs px-3 py-1 rounded-full border transition cursor-pointer ${
                  selectedPieceFilter === pc
                    ? 'bg-[#0f382c] text-white border-[#0f382c] font-bold'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {pc === 'all' ? 'All Pieces' : pc}
              </button>
            ))}

            <button
              onClick={() => setStitchingOnlyFilter(!stitchingOnlyFilter)}
              className={`text-xs px-3 py-1 rounded-full border transition cursor-pointer flex items-center gap-1.5 ml-2 ${
                stitchingOnlyFilter
                  ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
              }`}
            >
              <Scissors className="w-3 h-3 text-amber-700" />
              <span>Tailoring Available Only</span>
            </button>
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-500 font-medium">
              Max Price: <strong className="text-stone-900">{CURRENCIES[currency].format(priceRangePKR)}</strong>
            </span>
            <input
              type="range"
              min="3500"
              max="35000"
              step="1000"
              value={priceRangePKR}
              onChange={(e) => setPriceRangePKR(Number(e.target.value))}
              className="accent-[#0f382c] w-24 sm:w-32 cursor-pointer"
            />
            {(selectedPieceFilter !== 'all' || stitchingOnlyFilter || priceRangePKR < 35000 || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-stone-400 hover:text-stone-700 p-1 flex items-center gap-0.5"
                title="Reset Filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="text-[10px]">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-2xl border border-stone-200 p-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-stone-800">
              No Ensembles Matched Your Criteria
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your price slider or clearing filters to view more Pakistani luxury designs.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-5 py-2.5 bg-[#0f382c] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#164d3d] transition cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlist.some((p) => p.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setActiveProductForModal(p)}
                onQuickAddToCart={handleQuickAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Editorial Lookbook Feature */}
      <LookbookSection
        onSelectProduct={(p) => setActiveProductForModal(p)}
        featuredProducts={PRODUCTS.filter((p) => p.category === 'festive')}
      />

      {/* Verified Pakistani Customer Reviews */}
      <CustomerTestimonials />

      {/* Comprehensive Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenStitchingGuide={() => setIsStitchingGuideOpen(true)}
      />

      {/* Floating WhatsApp Help for Pakistani Shoppers */}
      <WhatsAppButton />

      {/* Product Detail & Custom Tailoring Modal */}
      <ProductDetailModal
        product={activeProductForModal}
        onClose={() => setActiveProductForModal(null)}
        currency={currency}
        isWishlisted={wishlist.some((p) => p.id === activeProductForModal?.id)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenStitchingGuide={() => setIsStitchingGuideOpen(true)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* Pakistani Nationwide Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        appliedPromo={appliedPromo}
        onOrderSuccess={(order) => {
          setCart([]);
          showToast(`Order #${order.orderId} placed via Cash on Delivery!`);
        }}
      />

      {/* TCS / Leopards Courier Tracker Modal */}
      <OrderTrackModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />

      {/* Master Darzi Pakistani Stitching & Measurements Modal */}
      <StitchingGuideModal
        isOpen={isStitchingGuideOpen}
        onClose={() => setIsStitchingGuideOpen(false)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency={currency}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onMoveToCart={(product) => {
          handleQuickAddToCart(product);
          setIsWishlistOpen(false);
        }}
      />

    </div>
  );
}
