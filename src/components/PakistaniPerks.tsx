import React from 'react';
import { Truck, ShieldCheck, Scissors, RefreshCw } from 'lucide-react';

export const PakistaniPerks: React.FC = () => {
  const perks = [
    {
      icon: Truck,
      title: 'Nationwide Cash on Delivery',
      urdu: 'کیش آن ڈیلیوری',
      desc: 'Pay cash at your doorstep across 250+ cities & tehsils via TCS, Leopards & Trax riders.',
    },
    {
      icon: Scissors,
      title: 'Pakistani Master Stitching',
      urdu: 'ماہر درزی سلائی',
      desc: 'Professional tailor service with custom measurements, lining, and traditional piping.',
    },
    {
      icon: ShieldCheck,
      title: '100% Certified Original Lawn',
      urdu: 'خالص و اصلی لان',
      desc: 'Combed long-staple cotton, genuine silk dupattas, and colour-fast reactive dyes.',
    },
    {
      icon: RefreshCw,
      title: '7-Day Hassle-Free Exchange',
      urdu: 'آسان تبدیلی و ریٹرن',
      desc: 'Exchange unstitched suits or size swaps smoothly with doorstep courier pickup.',
    },
  ];

  return (
    <section className="bg-[#f7f4ed] border-y border-[#e7decb] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3 rounded-xl transition hover:bg-white/60"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-900/10 text-[#0f382c] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-luxury text-base font-bold text-stone-900">
                      {perk.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
