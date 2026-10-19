import React from 'react';
import { X, Ruler, Scissors, Sparkles, Check } from 'lucide-react';
import { STANDARD_SIZE_CHART } from '../data/pakistanData';

interface StitchingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StitchingGuideModal: React.FC<StitchingGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const bottomStyles = [
    {
      title: 'Traditional Shalwar',
      urdu: 'روایتی شلوار',
      desc: 'Authentic pleated drape with 6-8 inch paincha (cuff). Roomy, breathable, and timeless Eastern comfort.',
    },
    {
      title: 'Straight Pant / Trouser',
      urdu: 'سیدھا ٹراؤزر',
      desc: 'Clean structured trousers falling smoothly along the leg. Includes side slit and delicate lace insets.',
    },
    {
      title: 'Cigarette Pants',
      urdu: 'سگریٹ پینٹس',
      desc: 'Narrow tapered fit that hits just above the ankle bone. Perfect for long A-line kurtas.',
    },
    {
      title: 'Tulip Shalwar',
      urdu: 'ٹیولپ شلوار',
      desc: 'Petal-style curved wrap front with pearl drop tassels or beaded piping on the cuffs.',
    },
    {
      title: 'Gharara / Flared Culottes',
      urdu: 'غرارہ و فلیئرڈ',
      desc: 'Gathered ruched knees with voluminous zari borders, ideal for Mehendi and Barat formals.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-left">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#fcfaf7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-700" />
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                Pakistani Stitching & Tailoring Guide
              </h3>
              <p className="text-xs text-stone-500">
                Master darzi craftsmanship, standard size metrics, and bottom silhouettes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Section 1: Standard Sizing Matrix */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-900 tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-700" />
              <span>Standard Women's Size Chart (Inches)</span>
            </h4>
            <div className="overflow-x-auto border border-stone-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100/80 text-stone-700 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Bust / Chest</th>
                    <th className="py-2.5 px-3">Waist</th>
                    <th className="py-2.5 px-3">Hip</th>
                    <th className="py-2.5 px-3">Kameez Length</th>
                    <th className="py-2.5 px-3">Shoulder</th>
                    <th className="py-2.5 px-3">Armhole</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {STANDARD_SIZE_CHART.map((s) => (
                    <tr key={s.size} className="hover:bg-amber-50/40">
                      <td className="py-2.5 px-3 font-bold text-stone-900">{s.size}</td>
                      <td className="py-2.5 px-3">{s.bust}</td>
                      <td className="py-2.5 px-3">{s.waist}</td>
                      <td className="py-2.5 px-3">{s.hip}</td>
                      <td className="py-2.5 px-3">{s.length}</td>
                      <td className="py-2.5 px-3">{s.shoulder}</td>
                      <td className="py-2.5 px-3">{s.armhole}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Bottom Silhouettes */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-900 tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Pakistani Bottom Styles & Cuts</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {bottomStyles.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-stone-200 bg-stone-50/70 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-stone-900">{item.title}</strong>
                    <span className="text-amber-800 font-serif-luxury text-[11px]" dir="rtl">{item.urdu}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: The ZOHRA Master Darzi Promise */}
          <div className="bg-[#f2f7f4] p-4 rounded-xl border border-emerald-200 text-xs text-stone-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
              <Scissors className="w-4 h-4 text-emerald-800" />
              <span>The ZM Master Tailoring Standard</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-700">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>Full inner cotton/silk lining included for sheer chiffon & organza</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>Four-sided overlock stitching with invisible hemline finish</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>Handmade pearl loops and latkan tassels as shown in design photoshoot</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>Pre-washed & shrunk lawn fabrics to prevent post-stitch shrinkage</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-[#fcfaf7] border-t border-stone-200 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#0f382c] hover:bg-[#154737] text-white text-xs font-bold uppercase tracking-wider rounded-full transition cursor-pointer"
          >
            Got It, Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
