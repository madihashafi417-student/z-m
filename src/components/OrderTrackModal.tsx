import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, Package } from 'lucide-react';

interface OrderTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTrackingNumber?: string;
}

export const OrderTrackModal: React.FC<OrderTrackModalProps> = ({
  isOpen,
  onClose,
  defaultTrackingNumber,
}) => {
  const [trackingInput, setTrackingInput] = useState(defaultTrackingNumber || 'TCS-847291-PK');
  const [hasSearched, setHasSearched] = useState(true);

  if (!isOpen) return null;

  const sampleTrackingSteps = [
    {
      title: 'Order Confirmed & Picked',
      desc: 'Warehouse dispatch team picked items at Gulberg III Lahore facility',
      date: 'Yesterday, 11:30 AM',
      status: 'completed',
    },
    {
      title: 'Quality Check & Packaging Passed',
      desc: 'Fabric meterage and stitching threadwork inspected by Master Darzi',
      date: 'Yesterday, 03:45 PM',
      status: 'completed',
    },
    {
      title: 'Dispatched via TCS Express',
      desc: 'Transferred to TCS Gateway Hub Lahore (Air Cargo / Linehaul)',
      date: 'Today, 08:15 AM',
      status: 'completed',
    },
    {
      title: 'Arrived at Destination City Hub',
      desc: 'Sorting complete at Regional Delivery Centre',
      date: 'Today, 01:20 PM',
      status: 'current',
    },
    {
      title: 'Out for Doorstep Delivery',
      desc: 'Assigned to courier rider for Cash on Delivery collection',
      date: 'Expected Today by 6:00 PM',
      status: 'upcoming',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 text-left">
      <div 
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#fcfaf7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#0f382c]" />
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
              Track Nationwide Courier
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Input Bar */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">
              Enter TCS / Leopards Tracking Number or Order ID:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="e.g. TCS-847291-PK"
                className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono uppercase text-stone-900 focus:outline-none focus:border-[#0f382c]"
              />
              <button
                onClick={() => setHasSearched(true)}
                className="bg-[#0f382c] hover:bg-[#154637] text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track</span>
              </button>
            </div>
            <p className="text-[10px] text-stone-400">
              Sample IDs: <code className="text-amber-800">ZM-582914</code>, <code className="text-amber-800">TCS-847291-PK</code> or <code className="text-amber-800">LEO-910283-PK</code>
            </p>
          </div>

          {hasSearched && (
            <div className="space-y-4 pt-2 border-t border-stone-200">
              {/* Courier Summary */}
              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                    Courier: TCS Express Pakistan
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-900">
                    Tracking: {trackingInput}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#0f382c] bg-white px-2.5 py-1 rounded shadow-sm border border-emerald-300">
                  In Transit
                </span>
              </div>

              {/* Steps timeline */}
              <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-stone-200">
                {sampleTrackingSteps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Step Icon */}
                    <span 
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white ${
                        step.status === 'completed'
                          ? 'bg-emerald-700'
                          : step.status === 'current'
                          ? 'bg-amber-500 ring-4 ring-amber-100 animate-pulse'
                          : 'bg-stone-300'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </span>

                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-bold ${
                          step.status === 'current' ? 'text-amber-900' : 'text-stone-900'
                        }`}>
                          {step.title}
                        </h4>
                        <span className="text-[10px] text-stone-400">{step.date}</span>
                      </div>
                      <p className="text-[11px] text-stone-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-stone-50 p-3 rounded-lg text-[11px] text-stone-600 border border-stone-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Rider will call your contact phone before doorstep delivery. Please ensure exact payment is ready if paying by Cash on Delivery (COD).</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
