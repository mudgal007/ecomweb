import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';

export default function CheckoutWizard({ isOpen, onClose, cartTotal = 0, onClearCart }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!shippingInfo.email || !shippingInfo.firstName || !shippingInfo.address) {
      alert('Please fill out all required fields.');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvc) {
      alert('Please fill out all payment details.');
      return;
    }
    // Simulate order placement
    setStep(3);
    onClearCart();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-velvet-charcoal bg-opacity-40 backdrop-blur-sm"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-alabaster rounded-2xl shadow-2xl overflow-hidden border border-silk-gray border-opacity-35 z-10 p-8 flex flex-col gap-6"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-velvet-charcoal/50 hover:text-velvet-charcoal transition-colors"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>

          {/* Checkout Steps Progress Bar */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-mulberry tracking-wide">Checkout</h3>
            <div className="flex items-center justify-between mt-6 relative">
              
              {/* Timeline Horizontal Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-silk-gray -translate-y-1/2 z-0" />
              <motion.div 
                className="absolute top-1/2 left-0 h-0.5 bg-mulberry -translate-y-1/2 z-0" 
                initial={{ width: '0%' }}
                animate={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                transition={{ duration: 0.3 }}
              />

              {/* Step 1 Node */}
              <div className="flex flex-col items-center gap-1.5 z-10">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= 1 ? 'bg-mulberry text-white' : 'bg-silk-gray text-velvet-charcoal/40'
                }`}>
                  1
                </div>
                <span className="text-[10px] font-bold text-velvet-charcoal/70 uppercase tracking-widest">Shipping</span>
              </div>

              {/* Step 2 Node */}
              <div className="flex flex-col items-center gap-1.5 z-10">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= 2 ? 'bg-mulberry text-white' : 'bg-silk-gray text-velvet-charcoal/40'
                }`}>
                  2
                </div>
                <span className="text-[10px] font-bold text-velvet-charcoal/70 uppercase tracking-widest">Payment</span>
              </div>

              {/* Step 3 Node */}
              <div className="flex flex-col items-center gap-1.5 z-10">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= 3 ? 'bg-mulberry text-white' : 'bg-silk-gray text-velvet-charcoal/40'
                }`}>
                  3
                </div>
                <span className="text-[10px] font-bold text-velvet-charcoal/70 uppercase tracking-widest">Done</span>
              </div>

            </div>
          </div>

          {/* Form Area */}
          <div className="mt-4 flex-1">
            <AnimatePresence mode="wait">
              
              {/* Step 1 Form Shipping */}
              {step === 1 && (
                <motion.form 
                  key="shippingForm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleShippingSubmit}
                  className="flex flex-col gap-4"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-mulberry border-b pb-1">Delivery Information</h4>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-velvet-charcoal/60">Email Address *</label>
                    <input 
                      required
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      placeholder="e.g. clara@gmail.com"
                      className="border border-silk-gray rounded-lg p-2.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-mulberry"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-velvet-charcoal/60">First Name *</label>
                      <input 
                        required
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        placeholder="Clara"
                        className="border border-silk-gray rounded-lg p-2.5 text-xs bg-white focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-velvet-charcoal/60">Last Name *</label>
                      <input 
                        required
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        placeholder="Devereaux"
                        className="border border-silk-gray rounded-lg p-2.5 text-xs bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-velvet-charcoal/60">Street Address *</label>
                    <input 
                      required
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      placeholder="e.g. 742 Evergreen Terrace"
                      className="border border-silk-gray rounded-lg p-2.5 text-xs bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-velvet-charcoal/60">City *</label>
                      <input 
                        required
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        placeholder="Springfield"
                        className="border border-silk-gray rounded-lg p-2.5 text-xs bg-white focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-velvet-charcoal/60">ZIP Code *</label>
                      <input 
                        required
                        type="text"
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                        placeholder="90210"
                        className="border border-silk-gray rounded-lg p-2.5 text-xs bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-xs text-velvet-charcoal/60">Subtotal: <strong>${cartTotal.toFixed(2)}</strong></span>
                    <button
                      type="submit"
                      className="rounded-full bg-mulberry text-alabaster px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-velvet-charcoal transition-all"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Step 2 Form Payment */}
              {step === 2 && (
                <motion.form 
                  key="paymentForm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handlePaymentSubmit}
                  className="flex flex-col gap-4"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-mulberry border-b pb-1 flex justify-between items-center">
                    <span>Card Payment Details</span>
                    <span className="flex items-center gap-1 text-[9px] text-green-700 normal-case"><ShieldCheck size={12} /> Secure SSL</span>
                  </h4>
                  
                  <div className="bg-white p-4 rounded-lg border flex gap-3 items-center">
                    <CreditCard className="text-mulberry" size={24} />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-velvet-charcoal">Charge Amount: ${(cartTotal).toFixed(2)}</p>
                      <p className="text-[10px] text-velvet-charcoal/50">Charged to securely stored credentials.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-velvet-charcoal/60">Credit Card Number *</label>
                    <input 
                      required
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      placeholder="e.g. 4111 2222 3333 4444"
                      className="border border-silk-gray rounded-lg p-2.5 text-xs bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-velvet-charcoal/60">Expiry Date (MM/YY) *</label>
                      <input 
                        required
                        type="text"
                        value={paymentInfo.expiry}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                        placeholder="12/28"
                        className="border border-silk-gray rounded-lg p-2.5 text-xs bg-white focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-velvet-charcoal/60">CVC Code *</label>
                      <input 
                        required
                        type="text"
                        value={paymentInfo.cvc}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvc: e.target.value})}
                        placeholder="123"
                        className="border border-silk-gray rounded-lg p-2.5 text-xs bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold uppercase tracking-wider text-mulberry hover:underline"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-mulberry text-alabaster px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-velvet-charcoal transition-all"
                    >
                      Place Order
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Step 3 Form Confirmation */}
              {step === 3 && (
                <motion.div 
                  key="confirmScreen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 text-center py-6"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-green-600"
                  >
                    <CheckCircle size={52} />
                  </motion.div>
                  
                  <div>
                    <h4 className="font-serif text-xl font-bold text-mulberry">Order Placed Successfully!</h4>
                    <p className="text-xs text-velvet-charcoal/70 mt-1">Thank you for your purchase, {shippingInfo.firstName}!</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border w-full max-w-xs text-left text-xs flex flex-col gap-1">
                    <div className="flex justify-between text-velvet-charcoal/50">
                      <span>Order Reference</span>
                      <span className="font-bold text-velvet-charcoal">#AMT-59281-SLK</span>
                    </div>
                    <div className="flex justify-between text-velvet-charcoal/50">
                      <span>Estimated Arrival</span>
                      <span className="font-bold text-velvet-charcoal">3-5 Business Days</span>
                    </div>
                    <div className="flex justify-between text-velvet-charcoal/50">
                      <span>Delivery Email</span>
                      <span className="text-velvet-charcoal truncate ml-2">{shippingInfo.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="mt-4 rounded-full bg-mulberry text-alabaster px-8 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-velvet-charcoal transition-all"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
