import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Salam! I want to inquire about Pakistani Lawn suits and custom stitching.');

  const presetMessages = [
    'Salam! I want to check custom stitching measurements for unstitched lawn.',
    'Is Cash on Delivery (COD) available in my city?',
    'I want to inquire about dispatch times via TCS Express.',
    'Do you deliver international orders to UK / USA / UAE?',
  ];

  const handleSend = () => {
    const encoded = encodeURIComponent(selectedTopic);
    window.open(`https://wa.me/923001234567?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 text-left">
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#0f382c] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-xs text-amber-200">
                ZM
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight font-brand-zm tracking-wide text-amber-100">ZM VIP Stylist Support</h4>
                <span className="text-[10px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Lahore Design Studio
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-300 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick choices */}
          <div className="p-3.5 bg-stone-50 space-y-2 text-xs">
            <p className="text-[11px] text-stone-500 font-medium">Quick WhatsApp inquiry:</p>
            <div className="space-y-1.5">
              {presetMessages.map((msg, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTopic(msg)}
                  className={`w-full text-left p-2 rounded-lg text-[11px] transition ${
                    selectedTopic === msg
                      ? 'bg-emerald-100/80 border border-emerald-300 text-emerald-950 font-semibold'
                      : 'bg-white border border-stone-200 text-stone-700 hover:border-emerald-200'
                  }`}
                >
                  {msg}
                </button>
              ))}
            </div>

            {/* Input & Send */}
            <div className="pt-2">
              <textarea
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                rows={2}
                className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs text-stone-800 focus:outline-none focus:border-[#0f382c]"
              />
              <button
                onClick={handleSend}
                className="w-full mt-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill / Circle Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-xl hover:scale-105 transition duration-300 cursor-pointer font-bold text-xs"
        aria-label="WhatsApp Stylist Help"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp Help</span>
      </button>
    </div>
  );
};
