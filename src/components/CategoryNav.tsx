import React from 'react';
import { ProductCategory } from '../types';

interface CategoryNavProps {
  currentCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  productCounts: Record<ProductCategory, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  currentCategory,
  onSelectCategory,
  productCounts,
}) => {
  const categoryCards = [
    {
      id: 'all' as ProductCategory,
      label: 'All Looks',
      sub: 'Complete Catalog',
      urdu: 'تمام مجموعہ',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'winter' as ProductCategory,
      label: 'Winter Edit',
      sub: 'Khaddar, Marina & Karandi',
      urdu: 'موسمِ سرما',
      image: 'https://images.unsplash.com/photo-1583391733975-081498c8dfd8?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'unstitched' as ProductCategory,
      label: 'Unstitched Lawn',
      sub: '3-Piece & 2-Piece',
      urdu: 'ان سلے سوٹ',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'pret' as ProductCategory,
      label: 'Ready-to-Wear',
      sub: 'Daily Pret & Kurtis',
      urdu: 'ریڈی ٹو ویئر پرٹ',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'festive' as ProductCategory,
      label: 'Festive & Shaadi',
      sub: 'Formals & Ghararas',
      urdu: 'شادی و فارملز',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'mens' as ProductCategory,
      label: "Men's Eastern",
      sub: 'Latha Kurta & Waistcoats',
      urdu: 'مردانہ کُرتا شلوار',
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'shawls' as ProductCategory,
      label: 'Velvet & Shawls',
      sub: 'Pashmina & Tilla',
      urdu: 'پشمینہ و شالیں',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif-luxury text-xl sm:text-2xl text-stone-900 font-semibold">
            Shop by Collection & Craft
          </h3>
          <p className="text-xs text-stone-500">
            Tailored silhouettes, certified pure fabrics, and Pakistani artisan threadwork
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
        {categoryCards.map((card) => {
          const isSelected = currentCategory === card.id;
          const count = productCounts[card.id] || 0;

          return (
            <button
              key={card.id}
              onClick={() => onSelectCategory(card.id)}
              className={`group relative overflow-hidden rounded-xl border text-left transition-all p-3 cursor-pointer flex flex-col justify-between h-40 ${
                isSelected
                  ? 'border-[#0f382c] bg-[#0f382c] text-white shadow-md'
                  : 'border-stone-200 bg-white hover:border-stone-400 text-stone-800 hover:shadow-sm'
              }`}
            >
              {/* Background preview image */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-amber-400 text-[#0f382c]'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {count} items
                </span>
                <span className="text-xs font-serif-luxury text-amber-500/90 font-medium" dir="rtl">
                  {card.urdu}
                </span>
              </div>

              <div className="relative z-10 pt-4">
                <h4 className="font-serif-luxury text-base font-bold leading-tight">
                  {card.label}
                </h4>
                <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                  {card.sub}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
