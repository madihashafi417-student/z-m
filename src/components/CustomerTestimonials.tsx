import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const CustomerTestimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Ayesha Rehman',
      city: 'DHA Phase 6, Lahore',
      product: 'Gul-e-Rana Embroidered Lawn (3-Piece)',
      rating: 5,
      comment:
        'The lawn fabric quality is unmatched! 80s combed cotton is so soft and breathable for Lahore summers. The digital silk dupatta drape is majestic. Delivered in just 24 hours with TCS COD.',
    },
    {
      name: 'Dr. Fatima Tariq',
      city: 'Clifton, Karachi',
      product: 'Noor-e-Jahan Festive Chiffon Formal',
      rating: 5,
      comment:
        'I ordered this for my sister’s Mehendi in Karachi. The custom stitching option was exceptional — fits like a glove with exact measurements and clean pearl finishing. Super fast delivery!',
    },
    {
      name: 'Zainab Qureshi',
      city: 'F-7/2, Islamabad',
      product: 'Mehtab Kashmiri Velvet Shawl Suit',
      rating: 5,
      comment:
        'Heirloom quality velvet! The antique gold tilla threadwork is so delicate and not scratchy at all. My mother loved the traditional craftsmanship. Paid easily via Raast instant transfer.',
    },
    {
      name: 'Hamza Bilal',
      city: 'Cantt, Rawalpindi',
      product: 'Shahkaar Cotton Latha Kurta Shalwar',
      rating: 5,
      comment:
        'Finding genuine Egyptian cotton latha with crisp finish is rare online. The traditional collar and wide-cut shalwar are tailored exactly how we prefer in Pakistan. 10/10.',
    },
  ];

  return (
    <section className="py-14 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">
            Loved Across Pakistan
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
            Voices from Our Patrons
          </h3>
          <p className="text-xs text-stone-500">
            Real feedback from verified buyers across Karachi, Lahore, Islamabad and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#faf8f5] p-5 rounded-xl border border-stone-200/90 flex flex-col justify-between space-y-3 relative hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/70">
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-bold text-stone-900 flex items-center gap-1">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3 h-3 text-emerald-700 inline" />
                  </strong>
                </div>
                <span className="text-[11px] text-amber-800 font-medium block">
                  {rev.city}
                </span>
                <span className="text-[10px] text-stone-400 block truncate mt-0.5">
                  Verified: {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
