import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface LookbookSectionProps {
  onSelectProduct: (product: Product) => void;
  featuredProducts: Product[];
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  onSelectProduct,
  featuredProducts,
}) => {
  return (
    <section className="py-16 bg-[#1b3429] text-amber-50 relative overflow-hidden">
      {/* Decorative subtle texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editorial Lookbook</span>
            <span className="font-serif-luxury text-sm">شاہکار ایڈیشن</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            The Shaadi & Festive Edit
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            Curated ensembles honoring the vibrant traditions of Pakistani weddings — from intricate Mehendi gotawork to majestic Barat velvet shawls.
          </p>
        </div>

        {/* Lookbook 3-card Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-stone-900 border border-emerald-800/60 shadow-xl transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 bg-[#0f382c]/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                  {idx === 0 ? 'Mehendi Edit' : idx === 1 ? 'Barat Formal' : 'Walima Luxe'}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                    {item.collection}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-white mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                    {item.fabric}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/15">
                    <span className="text-amber-200 font-bold text-sm">
                      Rs. {item.pricePKR.toLocaleString('en-PK')}
                    </span>
                    <span className="text-xs text-white font-semibold flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                      <span>View Ensemble</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
