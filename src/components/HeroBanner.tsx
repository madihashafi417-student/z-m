import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Scissors, Truck, RefreshCw } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroBannerProps {
  onExplore: (category: ProductCategory) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden bg-[#162721] text-amber-50">
      {/* Editorial Decorative Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#e5c07b_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Ambient glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-800/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text / Brand Story */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/70 border border-emerald-700/60 text-amber-300 text-xs tracking-wider uppercase font-semibold">
              <span className="font-brand-zm font-black text-amber-200 bg-emerald-950 px-2 py-0.5 rounded text-xs border border-amber-300/40">ZM</span>
              <span>ZM Luxury Pret & Lawn 2026</span>
              <span className="text-emerald-400">•</span>
              <span className="font-serif-luxury text-sm tracking-normal">ز • م</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
              The Essence of <br />
              <span className="italic font-light text-amber-200">Pakistani Elegance &</span>
              <br />
              ZM Heirloom Craft.
            </h1>

            <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              From gossamer 3-piece unstitched lawn paired with pure silk dupattas to hand-embellished zardozi wedding formals. Delivered to your doorstep anywhere in Pakistan with Cash on Delivery.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => onExplore('winter')}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-[#0f382c] font-bold text-xs uppercase tracking-widest rounded-full transition shadow-lg shadow-amber-400/20 flex items-center gap-2 cursor-pointer group"
              >
                <span>Winter Collection '26</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onExplore('unstitched')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs uppercase tracking-widest rounded-full transition cursor-pointer"
              >
                <span>Unstitched Lawn</span>
              </button>

              <button
                onClick={() => onExplore('pret')}
                className="px-5 py-3.5 text-stone-200 hover:text-white font-medium text-xs uppercase tracking-widest transition cursor-pointer"
              >
                <span>Ready-To-Wear Pret</span>
              </button>

              <button
                onClick={() => onExplore('festive')}
                className="px-5 py-3.5 text-amber-200 hover:text-white font-medium text-xs uppercase tracking-widest transition cursor-pointer underline underline-offset-4 decoration-amber-400/60"
              >
                <span>Shaadi Festive</span>
              </button>
            </div>

            {/* Quick Pakistan Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-emerald-900/60 text-stone-300">
              <div className="flex items-center gap-2 text-left">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-[11px] leading-tight">
                  <strong className="block text-white font-medium">Nationwide COD</strong>
                  <span className="text-stone-400">Pay cash upon delivery</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <Scissors className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-[11px] leading-tight">
                  <strong className="block text-white font-medium">Master Tailoring</strong>
                  <span className="text-stone-400">Custom stitch service</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-[11px] leading-tight">
                  <strong className="block text-white font-medium">100% Original</strong>
                  <span className="text-stone-400">Guaranteed authentic</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <RefreshCw className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-[11px] leading-tight">
                  <strong className="block text-white font-medium">Easy Exchange</strong>
                  <span className="text-stone-400">7 days across PK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase / Editorial Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Primary Image */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/30 shadow-2xl aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
                  alt="Pakistani Luxury Lawn Model"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                {/* Floating Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/85 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                        Bestseller • 3-Piece Lawn
                      </span>
                      <h4 className="font-serif-luxury text-base text-white font-medium">
                        Gul-e-Rana Swiss Lawn
                      </h4>
                    </div>
                    <span className="text-amber-200 font-bold text-sm">
                      Rs. 8,950
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Thumbnail */}
              <div className="hidden sm:block absolute -bottom-6 -left-8 w-36 h-48 rounded-xl overflow-hidden border-2 border-amber-200 shadow-2xl z-20">
                <img
                  src="https://images.unsplash.com/photo-1583391733975-081498c8dfd8?auto=format&fit=crop&w=600&q=80"
                  alt="Embroidery close-up"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-2 left-2 right-2 bg-emerald-950/90 text-amber-200 text-[9px] font-bold text-center py-1 rounded">
                  Resham Adda Work
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
