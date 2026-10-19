import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Truck, 
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenTrackOrder: () => void;
  onOpenStitchingGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTrackOrder,
  onOpenStitchingGuide,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#12231c] text-stone-300 pt-16 pb-12 border-t border-emerald-950 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Col 1: Brand & Heritage */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-950 to-emerald-800 border-2 border-amber-400/90 flex items-center justify-center text-amber-200 font-brand-zm font-black text-xl shadow shrink-0">
                ZM
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-brand-zm text-3xl font-black tracking-[0.18em] text-white uppercase">
                    ZM
                  </span>
                  <span className="font-serif-luxury text-lg text-amber-400 font-normal" dir="rtl">
                    ز • م
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.3em] text-stone-400 uppercase font-bold">
                  Pret & Couture • Lahore
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light max-w-sm">
              Rooted in the royal artisanal heritage of Lahore, ZM weaves poetry into fabrics. From luxury unstitched summer lawn to bespoke bridal velvet shawls, designed and crafted for the modern Pakistani woman.
            </p>

            <div className="pt-2 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>UAN Helpline: +92 (042) 111-964-720</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@zmcouture.pk</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Support Hours: Mon - Sat: 10:00 AM - 10:00 PM PKT</span>
              </div>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-base font-bold text-white uppercase tracking-wider">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('winter')}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Winter Marina & Khaddar '26
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('unstitched')}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Unstitched Summer Lawn '26
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('pret')}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Ready-To-Wear Pret & Kurtis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('festive')}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Shaadi, Barat & Mehendi Formals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('mens')}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Men's Eastern Cotton Latha
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('shawls')}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Pashmina & Velvet Shawls
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-base font-bold text-white uppercase tracking-wider">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenTrackOrder}
                  className="hover:text-amber-300 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Track TCS / Leopards Order</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStitchingGuide}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Pakistani Tailoring & Measurements
                </button>
              </li>
              <li>
                <span className="text-stone-400">Cash on Delivery (COD) Policy</span>
              </li>
              <li>
                <span className="text-stone-400">7-Day Nationwide Exchange</span>
              </li>
              <li>
                <span className="text-stone-400">International Overseas Shipping</span>
              </li>
              <li>
                <span className="text-stone-400">Care for Silk & Lawn Fabrics</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Flagship Stores in Pakistan */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-base font-bold text-white uppercase tracking-wider">
              Flagship Stores
            </h4>
            <div className="space-y-2.5 text-[11px] text-stone-400">
              <div>
                <strong className="text-stone-200 block">Lahore:</strong>
                <span>Packages Mall (1st Floor) & MM Alam Road, Gulberg III</span>
              </div>
              <div>
                <strong className="text-stone-200 block">Karachi:</strong>
                <span>Dolmen Mall Clifton & LuckyOne Mall</span>
              </div>
              <div>
                <strong className="text-stone-200 block">Islamabad:</strong>
                <span>Beverly Centre, Blue Area & Centaurus</span>
              </div>
            </div>
          </div>

        </div>

        {/* Newsletter & Payment ecosystem section */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-emerald-900/60">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Be the First to Know
            </span>
            <h4 className="font-serif-luxury text-xl font-bold text-white">
              Subscribe to Eid Lawn & Festive Previews
            </h4>
            <p className="text-xs text-stone-400 mt-0.5">
              Receive secret VIP pre-booking links and Rs. 500 discount voucher on your first order.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div className="bg-emerald-900/60 border border-emerald-700 text-amber-200 p-3 rounded-xl flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Shukriya! Use code <strong>KHUSHAMDEED</strong> at checkout for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-emerald-950/60 border border-emerald-800 rounded-full px-4 py-2.5 text-xs text-stone-100 placeholder-stone-500 flex-1 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-[#0f382c] font-bold text-xs uppercase px-6 py-2.5 rounded-full transition cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Payments & Logistics badges */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium text-stone-400">Trusted Delivery & Payments in Pakistan:</span>
            <span className="bg-emerald-950 px-2 py-1 rounded border border-emerald-800 text-[10px] text-amber-300 font-bold">
              Cash on Delivery (COD)
            </span>
            <span className="bg-emerald-950 px-2 py-1 rounded border border-emerald-800 text-[10px] text-white">
              JazzCash
            </span>
            <span className="bg-emerald-950 px-2 py-1 rounded border border-emerald-800 text-[10px] text-white">
              Easypaisa
            </span>
            <span className="bg-emerald-950 px-2 py-1 rounded border border-emerald-800 text-[10px] text-white">
              Raast ID
            </span>
            <span className="bg-emerald-950 px-2 py-1 rounded border border-emerald-800 text-[10px] text-white">
              TCS Express
            </span>
            <span className="bg-emerald-950 px-2 py-1 rounded border border-emerald-800 text-[10px] text-white">
              Leopards
            </span>
          </div>

          <div className="text-[11px] text-stone-500">
            © 2026 ZM Pret & Couture. All Rights Reserved. Crafted in Lahore, Pakistan.
          </div>
        </div>

      </div>
    </footer>
  );
};
