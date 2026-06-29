import { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, ShoppingCart, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function MediBuddyModal() {
  const { mediBuddyModalOpen, closeMediBuddy, selectedProduct } = useAppContext();
  const [connecting, setConnecting] = useState(true);
  const [progress, setProgress] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!mediBuddyModalOpen) return;
    
    // Reset state
    setConnecting(true);
    setProgress(0);
    setAddedToCart(false);

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + (100 / (1500 / 30)), 100));
    }, 30);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setConnecting(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [mediBuddyModalOpen]);

  if (!mediBuddyModalOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={closeMediBuddy}
      />

      {/* Modal Card */}
      <div className="bg-gray-50 rounded-t-3xl w-full h-[80%] flex flex-col relative z-10 animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white rounded-t-3xl shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-lg">
              m
            </div>
            <span className="font-bold text-gray-900">MediBuddy</span>
          </div>
          <button onClick={closeMediBuddy} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          {connecting ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-3xl">
                  m
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connecting to MediBuddy...</h3>
              <p className="text-gray-500 text-sm mb-8">Establishing secure health bridge</p>
              
              <div className="w-full max-w-[240px] bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-brand-green h-full transition-all duration-75 ease-linear" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 animate-in fade-in duration-500">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 bg-green-100 text-brand-green rounded-full flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Connected to MediBuddy</h3>
                <div className="flex items-center justify-center gap-1.5 mt-2 bg-blue-50 text-brand-blue px-3 py-1 rounded-full text-xs font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Sharing: BP trend, Heart Rate, Sleep, Stress data
                </div>
              </div>

              {/* Product Highlight (if triggered from Buy button) */}
              {selectedProduct && (
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-3xl shrink-0">
                    {selectedProduct.emoji}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">{selectedProduct.name}</h4>
                    <p className="font-bold text-brand-green text-sm mt-1">{selectedProduct.price}</p>
                    <button 
                      onClick={() => setAddedToCart(true)}
                      className={`mt-2 w-full py-2 rounded-lg text-xs font-bold transition-colors ${
                        addedToCart ? 'bg-gray-100 text-brand-green' : 'bg-brand-green text-white hover:bg-[#158562]'
                      }`}
                    >
                      {addedToCart ? 'Added to Cart ✓' : 'Add to cart'}
                    </button>
                  </div>
                </div>
              )}

              {/* Actions Grid */}
              <div className="space-y-3">
                <button className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-brand-green hover:shadow-md transition-all text-left flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-brand-blue">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Book a doctor consultation</h4>
                    <p className="text-gray-500 text-xs mt-0.5">Next available: Today, 4:30 PM</p>
                  </div>
                </button>

                <button className={`w-full bg-white p-4 rounded-2xl border ${selectedProduct ? 'border-brand-green shadow-md' : 'border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]'} hover:border-brand-green hover:shadow-md transition-all text-left flex items-center gap-4`}>
                  <div className="bg-green-50 p-3 rounded-xl text-brand-green">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Shop Ayurvedic products</h4>
                    <p className="text-gray-500 text-[11px] mt-0.5 pr-2 truncate">Sarpagandha, Ashwagandha, Arjuna Bark...</p>
                  </div>
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
