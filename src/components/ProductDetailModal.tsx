import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Scissors, 
  Ruler, 
  Truck, 
  ShieldCheck, 
  ChevronRight,
  Info,
  Check
} from 'lucide-react';
import { BottomStyle, CurrencyCode, Product, StitchingMeasurements, StitchingType } from '../types';
import { CURRENCIES, STANDARD_SIZE_CHART } from '../data/pakistanData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (
    product: Product,
    stitchingType: StitchingType,
    selectedSize?: 'XS' | 'S' | 'M' | 'L' | 'XL',
    customMeasurements?: StitchingMeasurements
  ) => void;
  onOpenStitchingGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenStitchingGuide,
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [stitchingType, setStitchingType] = useState<StitchingType>(
    product.category === 'unstitched' ? 'unstitched' : 'standard'
  );
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>('M');
  const [showSizeModal, setShowSizeModal] = useState(false);

  // Custom stitching measurements state
  const [bottomStyle, setBottomStyle] = useState<BottomStyle>('Straight Pant');
  const [measurements, setMeasurements] = useState<StitchingMeasurements>({
    kameezLength: '42',
    chest: '39',
    waist: '33',
    hip: '43',
    sleevesLength: '21',
    shoulder: '15',
    trouserLength: '38',
    bottomStyle: 'Straight Pant',
    specialInstructions: '',
  });

  // Calculate total price based on stitching
  let calculatedPricePKR = product.pricePKR;
  if (stitchingType === 'standard') {
    calculatedPricePKR += product.stitchingPrices.standard;
  } else if (stitchingType === 'custom') {
    calculatedPricePKR += product.stitchingPrices.custom;
  }

  const handleAddToCart = () => {
    onAddToCart(
      product,
      stitchingType,
      stitchingType === 'standard' ? selectedSize : undefined,
      stitchingType === 'custom' ? { ...measurements, bottomStyle } : undefined
    );
    onClose();
  };

  const bottomStyleOptions: BottomStyle[] = [
    'Straight Pant',
    'Traditional Shalwar',
    'Cigarette Pant',
    'Tulip Shalwar',
    'Gharara / Flared',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[88vh] overflow-y-auto">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 bg-stone-50 p-4 sm:p-6 flex flex-col justify-between">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-inner bg-stone-200">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-[#0f382c] text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded">
                {product.pieceCount} {product.category.toUpperCase()}
              </div>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                      selectedImageIndex === idx ? 'border-[#0f382c] shadow' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & Stitching Customizer */}
          <div className="lg:col-span-6 p-5 sm:p-7 space-y-5">
            {/* Collection & Urdu Title */}
            <div>
              <div className="flex items-center justify-between text-xs text-amber-800 font-semibold uppercase tracking-wider mb-1">
                <span>{product.collection}</span>
                <span className="font-serif-luxury text-stone-500 text-sm font-normal" dir="rtl">
                  {product.urduTitle}
                </span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {product.title}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                SKU: ZM-{product.id.toUpperCase()} • Color: {product.color}
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-[#fcfaf7] p-3.5 rounded-xl border border-[#ede5d8] flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#0f382c]">
                    {CURRENCIES[currency].format(calculatedPricePKR)}
                  </span>
                  {product.originalPricePKR && (
                    <span className="text-sm text-stone-400 line-through">
                      {CURRENCIES[currency].format(product.originalPricePKR)}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-stone-500">
                  {stitchingType === 'unstitched'
                    ? 'Unstitched Suit Price'
                    : stitchingType === 'standard'
                    ? `Includes Standard Stitching (+Rs. ${product.stitchingPrices.standard})`
                    : `Includes Custom Tailoring (+Rs. ${product.stitchingPrices.custom})`}
                </span>
              </div>

              <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-1 rounded">
                In Stock (Lahore Hub)
              </span>
            </div>

            {/* Pakistani Stitching Type Selector */}
            {product.stitchingAvailable ? (
              <div className="space-y-2 pt-1 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-amber-700" />
                    <span>Choose Stitching Option</span>
                  </label>
                  <button
                    onClick={onOpenStitchingGuide}
                    className="text-[11px] text-amber-800 hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
                  >
                    <span>Tailoring Guide</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Unstitched */}
                  <button
                    onClick={() => setStitchingType('unstitched')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                      stitchingType === 'unstitched'
                        ? 'border-[#0f382c] bg-emerald-50/50 text-[#0f382c] font-semibold ring-1 ring-[#0f382c]'
                        : 'border-stone-200 hover:border-stone-400 text-stone-700'
                    }`}
                  >
                    <span className="block text-xs font-bold">Unstitched</span>
                    <span className="text-[10px] text-stone-500">Cut Pieces Only</span>
                    <span className="text-[11px] text-emerald-700 font-medium block mt-1">+Rs. 0</span>
                  </button>

                  {/* Standard Stitch */}
                  <button
                    onClick={() => setStitchingType('standard')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                      stitchingType === 'standard'
                        ? 'border-[#0f382c] bg-emerald-50/50 text-[#0f382c] font-semibold ring-1 ring-[#0f382c]'
                        : 'border-stone-200 hover:border-stone-400 text-stone-700'
                    }`}
                  >
                    <span className="block text-xs font-bold">Standard Size</span>
                    <span className="text-[10px] text-stone-500">XS to XL</span>
                    <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                      +Rs. {product.stitchingPrices.standard}
                    </span>
                  </button>

                  {/* Custom Stitch */}
                  <button
                    onClick={() => setStitchingType('custom')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                      stitchingType === 'custom'
                        ? 'border-[#0f382c] bg-emerald-50/50 text-[#0f382c] font-semibold ring-1 ring-[#0f382c]'
                        : 'border-stone-200 hover:border-stone-400 text-stone-700'
                    }`}
                  >
                    <span className="block text-xs font-bold">Bespoke Fit</span>
                    <span className="text-[10px] text-stone-500">Your Measurements</span>
                    <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                      +Rs. {product.stitchingPrices.custom}
                    </span>
                  </button>
                </div>
              </div>
            ) : null}

            {/* Standard Size Selector (if pret or standard stitched) */}
            {(stitchingType === 'standard' || !product.stitchingAvailable) && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                    Select Size: <span className="text-[#0f382c]">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeModal(!showSizeModal)}
                    className="text-[11px] text-stone-600 underline hover:text-[#0f382c] cursor-pointer flex items-center gap-1"
                  >
                    <Ruler className="w-3 h-3 text-amber-700" />
                    <span>View Pakistani Size Chart</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-11 h-10 rounded-lg text-xs font-bold flex items-center justify-center transition cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#0f382c] text-white shadow-md'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* Inline Pakistani Size Chart Modal */}
                {showSizeModal && (
                  <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-xs text-stone-800 mt-2 space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-amber-950 pb-1 border-b border-amber-200">
                      <span>Standard Pakistani Women's Sizes (Inches)</span>
                      <button onClick={() => setShowSizeModal(false)} className="text-stone-500 hover:text-stone-900">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="overflow-x-auto text-[11px]">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-amber-200 text-amber-900">
                            <th className="py-1">Size</th>
                            <th>Bust</th>
                            <th>Waist</th>
                            <th>Hip</th>
                            <th>Length</th>
                          </tr>
                        </thead>
                        <tbody>
                          {STANDARD_SIZE_CHART.map((s) => (
                            <tr key={s.size} className={selectedSize === s.size ? 'font-bold text-[#0f382c]' : ''}>
                              <td className="py-1">{s.size}</td>
                              <td>{s.bust}</td>
                              <td>{s.waist}</td>
                              <td>{s.hip}</td>
                              <td>{s.length}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Custom Measurements Input Fields (if custom stitching selected) */}
            {stitchingType === 'custom' && (
              <div className="bg-[#fbf9f5] p-3.5 rounded-xl border border-[#e5ded4] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">Enter Your Measurements (Inches)</span>
                  <span className="text-[10px] text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded font-medium">
                    Master Tailor Checked
                  </span>
                </div>

                {/* Bottom Style Selection */}
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Select Trouser / Shalwar Cut:
                  </label>
                  <select
                    value={bottomStyle}
                    onChange={(e) => setBottomStyle(e.target.value as BottomStyle)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-[#0f382c]"
                  >
                    {bottomStyleOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] text-stone-500">Kameez Length</label>
                    <input
                      type="text"
                      value={measurements.kameezLength}
                      onChange={(e) => setMeasurements({ ...measurements, kameezLength: e.target.value })}
                      placeholder="e.g. 42"
                      className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500">Chest / Bust</label>
                    <input
                      type="text"
                      value={measurements.chest}
                      onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                      placeholder="e.g. 39"
                      className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500">Waist</label>
                    <input
                      type="text"
                      value={measurements.waist}
                      onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                      placeholder="e.g. 33"
                      className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500">Trouser Length</label>
                    <input
                      type="text"
                      value={measurements.trouserLength}
                      onChange={(e) => setMeasurements({ ...measurements, trouserLength: e.target.value })}
                      placeholder="e.g. 38"
                      className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-stone-500 mb-0.5">Special Tailoring Notes (Optional)</label>
                  <input
                    type="text"
                    value={measurements.specialInstructions || ''}
                    onChange={(e) => setMeasurements({ ...measurements, specialInstructions: e.target.value })}
                    placeholder="e.g. Keep neckline modest, full sleeves with inner lining..."
                    className="w-full bg-white border border-stone-300 rounded px-2.5 py-1 text-xs"
                  />
                </div>
              </div>
            )}

            {/* Fabric Details & Breakdown */}
            <div className="border-t border-stone-200 pt-3 space-y-2 text-xs">
              <span className="font-bold text-stone-900 block uppercase tracking-wider text-[11px]">
                Fabric & Piece Breakdown
              </span>
              <ul className="space-y-1 text-stone-600 text-[11px] leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Shirt Front:</strong> {product.fabricDetails.front}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Shirt Back:</strong> {product.fabricDetails.back}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Sleeves:</strong> {product.fabricDetails.sleeves}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Dupatta:</strong> {product.fabricDetails.dupatta}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Trouser:</strong> {product.fabricDetails.trouser}</span>
                </li>
                {product.fabricDetails.additionalBorders && (
                  <li className="flex items-start gap-1.5 text-amber-900 font-medium">
                    <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span><strong>Included Borders:</strong> {product.fabricDetails.additionalBorders}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Delivery Timeline info for Pakistani shoppers */}
            <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60 flex items-start gap-2.5 text-xs text-stone-700">
              <Truck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-950 block">
                  {stitchingType === 'unstitched'
                    ? 'Dispatches in 24-48 Hours across Pakistan via TCS'
                    : 'Custom Stitched Order: Dispatches in 5-7 Working Days'}
                </strong>
                <span className="text-[11px] text-stone-600">
                  Cash on Delivery (COD) accepted at doorstep in all Pakistani cities.
                </span>
              </div>
            </div>

            {/* Add to Cart & Wishlist Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#0f382c] hover:bg-[#154637] text-white py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest transition shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>
                  Add To Bag • {CURRENCIES[currency].format(calculatedPricePKR)}
                </span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-full border transition cursor-pointer ${
                  isWishlisted
                    ? 'border-rose-400 bg-rose-50 text-rose-600'
                    : 'border-stone-300 hover:border-stone-400 text-stone-700'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
