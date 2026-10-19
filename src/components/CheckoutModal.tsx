import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Phone, 
  CreditCard, 
  Wallet, 
  Building2, 
  ShieldCheck, 
  ArrowLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { CartItem, CurrencyCode, CustomerShippingAddress, OrderRecord, PaymentMethodType } from '../types';
import { CURRENCIES, DISCOUNT_CODES, FREE_SHIPPING_THRESHOLD_PKR, PAKISTAN_CITIES, PROVINCES, STANDARD_SHIPPING_FEE_PKR } from '../data/pakistanData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  appliedPromo: string | null;
  onOrderSuccess: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  appliedPromo,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');

  const [address, setAddress] = useState<CustomerShippingAddress>({
    fullName: 'Madiha Shafi',
    phone: '0300 8472911',
    email: 'madihashafi417@gmail.com',
    city: 'Lahore',
    province: 'Punjab',
    streetAddress: 'House 42, Block C-2, Gulberg III',
    nearestLandmark: 'Near Mini Market & Main Boulevard',
    deliveryNotes: 'Please call before delivery. Ring bell on right.',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('cod');
  const [jazzCashNumber, setJazzCashNumber] = useState('0300 8472911');
  const [easypaisaNumber, setEasypaisaNumber] = useState('0345 8472911');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const subtotalPKR = items.reduce((sum, item) => sum + item.itemPricePKR * item.quantity, 0);

  let discountAmountPKR = 0;
  if (appliedPromo && DISCOUNT_CODES[appliedPromo]) {
    const promo = DISCOUNT_CODES[appliedPromo];
    if (subtotalPKR >= promo.minOrder) {
      discountAmountPKR = Math.round((subtotalPKR * promo.percent) / 100);
    }
  }

  const isFreeShipping = subtotalPKR >= FREE_SHIPPING_THRESHOLD_PKR;
  const shippingFeePKR = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE_PKR;
  const grandTotalPKR = Math.max(0, subtotalPKR - discountAmountPKR + shippingFeePKR);

  // Update province automatically when city is chosen
  const handleCityChange = (cityName: string) => {
    const found = PAKISTAN_CITIES.find((c) => c.city === cityName);
    setAddress({
      ...address,
      city: cityName,
      province: found ? found.province : address.province,
    });
  };

  const [shippingError, setShippingError] = useState<string | null>(null);

  const handleContinueToPayment = () => {
    if (!address.fullName.trim()) {
      setShippingError('Please enter your full name');
      return;
    }
    if (!address.phone.trim() || address.phone.trim().length < 10) {
      setShippingError('Please enter a valid Pakistani contact number (e.g. 0300 1234567)');
      return;
    }
    if (!address.streetAddress.trim()) {
      setShippingError('Please enter your complete delivery street address');
      return;
    }
    setShippingError(null);
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const trackingNo = `TCS-${randomNum}-PK`;
    const orderId = `ZM-${randomNum}`;

    const newOrder: OrderRecord = {
      orderId,
      trackingNumber: trackingNo,
      courierName: 'TCS Express Pakistan',
      date: new Date().toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      items,
      shippingAddress: address,
      paymentMethod,
      subtotalPKR,
      discountPKR: discountAmountPKR,
      shippingFeePKR,
      totalPKR: grandTotalPKR,
      status: 'Confirmed',
    };

    setConfirmedOrder(newOrder);
    setStep('confirmed');
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 text-left">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#fcfaf7] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
              {step === 'confirmed' ? 'Order Successful' : 'Pakistani Nationwide Checkout'}
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
              {step === 'shipping' && 'Delivery Address & Contact'}
              {step === 'payment' && 'Select Pakistani Payment Option'}
              {step === 'confirmed' && 'Shukriya! Order Confirmed'}
            </h3>
          </div>

          {step !== 'confirmed' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
          {step === 'shipping' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-stone-600 bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                <Truck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>
                  Delivering via <strong>TCS Express</strong> & <strong>Leopards Courier</strong> to all cities, towns, and tehsils across Pakistan.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="e.g. Madiha Shafi"
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#0f382c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number (for Courier SMS updates) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      placeholder="03XX XXXXXXX"
                      className="w-full bg-white border border-stone-300 rounded-lg pl-3 pr-8 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#0f382c]"
                    />
                    <Phone className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City (Pakistan) *
                  </label>
                  <select
                    value={address.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#0f382c]"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c.city} value={c.city}>
                        {c.city} ({c.deliveryDays})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Province *
                  </label>
                  <select
                    value={address.province}
                    onChange={(e) => setAddress({ ...address, province: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#0f382c]"
                  >
                    {PROVINCES.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Complete Street Address (House #, Street / Block / Sector / Mohallah) *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.streetAddress}
                    onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                    placeholder="e.g. House 42, Block C-2, Gulberg III"
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#0f382c]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nearest Landmark / Area Indicator
                  </label>
                  <input
                    type="text"
                    value={address.nearestLandmark}
                    onChange={(e) => setAddress({ ...address, nearestLandmark: e.target.value })}
                    placeholder="e.g. Near Mini Market, Behind PSO Petrol Pump"
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#0f382c]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Rider Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={address.deliveryNotes}
                    onChange={(e) => setAddress({ ...address, deliveryNotes: e.target.value })}
                    placeholder="e.g. Please call before arriving or ring bell twice"
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#0f382c]"
                  />
                </div>
              </div>

              {shippingError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-lg text-xs font-medium">
                  {shippingError}
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-stone-200">
                <div>
                  <span className="text-[11px] text-stone-500 block">Total to Pay</span>
                  <strong className="text-base text-[#0f382c]">
                    {CURRENCIES[currency].format(grandTotalPKR)}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={handleContinueToPayment}
                  className="bg-[#0f382c] hover:bg-[#154737] text-white py-3 px-6 rounded-full font-bold text-xs uppercase tracking-widest transition flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <span>Continue to Payment</span>
                  <ChevronRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-600 mb-2">
                Select your preferred payment method in Pakistan:
              </div>

              <div className="space-y-3">
                {/* 1. Cash on Delivery (COD) */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    paymentMethod === 'cod'
                      ? 'border-[#0f382c] bg-emerald-50/60 ring-1 ring-[#0f382c]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-[#0f382c] focus:ring-[#0f382c]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-[#0f382c]" />
                        <span>Cash on Delivery (COD)</span>
                      </span>
                      <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded">
                        Most Popular in Pakistan
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Pay cash to the TCS or Leopards courier rider at your doorstep when your parcel arrives. Please keep exact change ready.
                    </p>
                  </div>
                </label>

                {/* 2. JazzCash */}
                <label
                  onClick={() => setPaymentMethod('jazzcash')}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    paymentMethod === 'jazzcash'
                      ? 'border-[#0f382c] bg-amber-50/60 ring-1 ring-[#0f382c]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'jazzcash'}
                    onChange={() => setPaymentMethod('jazzcash')}
                    className="mt-1 text-[#0f382c]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                        <Wallet className="w-4 h-4 text-rose-700" />
                        <span>JazzCash Mobile Wallet</span>
                      </span>
                      <span className="text-[10px] text-stone-500 font-semibold">Instant MPIN Push</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1">
                      You will receive an MPIN prompt on your registered JazzCash mobile phone to approve the transaction.
                    </p>
                    {paymentMethod === 'jazzcash' && (
                      <div className="mt-2 pt-2 border-t border-amber-200">
                        <label className="block text-[10px] font-semibold text-stone-700 mb-1">
                          JazzCash Account Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={jazzCashNumber}
                          onChange={(e) => setJazzCashNumber(e.target.value)}
                          placeholder="0300 1234567"
                          className="w-full bg-white border border-stone-300 rounded px-2.5 py-1 text-xs"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* 3. Easypaisa */}
                <label
                  onClick={() => setPaymentMethod('easypaisa')}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    paymentMethod === 'easypaisa'
                      ? 'border-[#0f382c] bg-emerald-50/60 ring-1 ring-[#0f382c]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'easypaisa'}
                    onChange={() => setPaymentMethod('easypaisa')}
                    className="mt-1 text-[#0f382c]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                        <Wallet className="w-4 h-4 text-emerald-700" />
                        <span>Easypaisa Account</span>
                      </span>
                      <span className="text-[10px] text-stone-500 font-semibold">Instant Approval</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Pay directly via your Telenor Easypaisa wallet with seamless OTP verification.
                    </p>
                    {paymentMethod === 'easypaisa' && (
                      <div className="mt-2 pt-2 border-t border-emerald-200">
                        <label className="block text-[10px] font-semibold text-stone-700 mb-1">
                          Easypaisa Account Number
                        </label>
                        <input
                          type="tel"
                          value={easypaisaNumber}
                          onChange={(e) => setEasypaisaNumber(e.target.value)}
                          placeholder="0345 1234567"
                          className="w-full bg-white border border-stone-300 rounded px-2.5 py-1 text-xs"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* 4. Direct Bank Transfer / Raast Instant */}
                <label
                  onClick={() => setPaymentMethod('bank_raast')}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    paymentMethod === 'bank_raast'
                      ? 'border-[#0f382c] bg-stone-100 ring-1 ring-[#0f382c]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank_raast'}
                    onChange={() => setPaymentMethod('bank_raast')}
                    className="mt-1 text-[#0f382c]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-blue-700" />
                        <span>Raast ID & Direct Bank Transfer (Meezan / HBL)</span>
                      </span>
                      <span className="text-[10px] text-stone-500 font-semibold">0% Fee</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Transfer instantly from any Pakistani bank app using our official Raast ID: <code className="bg-stone-200 px-1 py-0.5 rounded font-mono font-bold text-stone-800">raast@zmcouture</code>.
                    </p>
                  </div>
                </label>

                {/* 5. Visa / Mastercard / PayPak */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    paymentMethod === 'card'
                      ? 'border-[#0f382c] bg-stone-100 ring-1 ring-[#0f382c]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 text-[#0f382c]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-indigo-700" />
                        <span>Credit / Debit Card (Visa, MasterCard, PayPak)</span>
                      </span>
                      <span className="text-[10px] text-stone-500 font-semibold">3D Secure 2.0</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Encrypted local & international card checkout via Pakistani payment gateway.
                    </p>
                  </div>
                </label>
              </div>

              {/* Order Final Action */}
              <div className="pt-4 flex items-center justify-between border-t border-stone-200 mt-4">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="bg-[#0f382c] hover:bg-[#154737] text-white py-3.5 px-8 rounded-full font-bold text-xs uppercase tracking-widest transition shadow-lg shadow-emerald-950/20 flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>
                    Confirm & Place Order ({CURRENCIES[currency].format(grandTotalPKR)})
                  </span>
                </button>
              </div>
            </div>
          )}

          {step === 'confirmed' && confirmedOrder && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-amber-800 tracking-widest">
                  Order Successfully Booked
                </span>
                <h3 className="font-serif-luxury text-3xl font-bold text-stone-900 mt-1">
                  Mubarak! Your Order is Placed
                </h3>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                  We have received your order. A confirmation SMS has been dispatched to{' '}
                  <strong className="text-stone-900">{confirmedOrder.shippingAddress.phone}</strong>.
                </p>
              </div>

              {/* Order Details Card */}
              <div className="bg-[#fcfaf7] p-4 sm:p-5 rounded-2xl border border-[#ede3d5] text-left max-w-lg mx-auto space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Order ID:</span>
                  <span className="font-mono font-bold text-stone-900">{confirmedOrder.orderId}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500">TCS Tracking #:</span>
                  <span className="font-mono font-bold text-emerald-800">{confirmedOrder.trackingNumber}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Delivery Destination:</span>
                  <span className="font-medium text-stone-900">
                    {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.province}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500">Payment Mode:</span>
                  <span className="font-bold text-[#0f382c] uppercase">
                    {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : confirmedOrder.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm font-bold text-stone-900 pt-1">
                  <span>Payable Amount:</span>
                  <span className="text-[#0f382c]">
                    {CURRENCIES[currency].format(confirmedOrder.totalPKR)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0f382c] hover:bg-[#154737] text-white text-xs font-bold uppercase tracking-wider rounded-full transition shadow cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
