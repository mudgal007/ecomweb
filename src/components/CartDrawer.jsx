import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const SHIPPING_THRESHOLD = 150;
  const shippingCost = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 10;
  const total = subtotal + shippingCost;
  
  // Dynamic free shipping progress percentage
  const progressPercent = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-velvet-charcoal bg-opacity-40 backdrop-blur-sm"
          />

          {/* Right Sliding Drawer Panel */}
          <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-alabaster flex flex-col shadow-2xl h-full border-l border-silk-gray border-opacity-35"
            >
              
              {/* Header */}
              <div className="bg-white px-6 py-5 border-b border-silk-gray border-opacity-40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-mulberry" />
                  <h3 className="font-serif text-lg font-bold text-mulberry uppercase tracking-wide">
                    Shopping Bag ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                  </h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 hover:bg-lavender-mist rounded-md text-velvet-charcoal/70 transition-colors"
                  aria-label="Close cart"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              {subtotal > 0 && (
                <div className="bg-white px-6 pb-4 border-b border-silk-gray border-opacity-25 flex flex-col gap-2">
                  <div className="text-xs text-velvet-charcoal text-opacity-80 flex justify-between font-medium">
                    {remainingForFreeShipping > 0 ? (
                      <span>You're <strong className="text-mulberry">${remainingForFreeShipping.toFixed(2)}</strong> away from Free Shipping!</span>
                    ) : (
                      <span className="text-green-700 font-bold flex items-center gap-1">🎉 You've unlocked Free Standard Shipping!</span>
                    )}
                    <span className="text-[10px] font-bold text-mulberry/50 uppercase tracking-widest">${subtotal.toFixed(0)} / $150</span>
                  </div>
                  <div className="w-full bg-silk-gray h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${progressPercent >= 100 ? 'bg-green-600' : 'bg-mulberry'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}

              {/* Items List Content Area */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-4 h-full text-center">
                    <div className="h-16 w-16 bg-lavender-mist rounded-full flex items-center justify-center text-mulberry/40">
                      <ShoppingBag size={28} />
                    </div>
                    <div>
                      <p className="font-serif text-lg font-bold text-mulberry">Your bag is empty</p>
                      <p className="text-xs text-velvet-charcoal/50 mt-1">Browse our collection of silk, wrap, and ethnic dresses to add styled items.</p>
                    </div>
                    <button 
                      onClick={onClose}
                      className="mt-2 rounded-full bg-mulberry px-6 py-2 text-xs font-semibold uppercase tracking-wider text-alabaster shadow-md hover:bg-velvet-charcoal transition-all"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.div 
                        key={`${item.id}-${item.size}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex gap-4 p-3 bg-white rounded-lg border border-silk-gray border-opacity-30 shadow-sm relative group"
                      >
                        {/* Thumbnail image */}
                        <div className="h-20 w-16 overflow-hidden rounded-md bg-lavender-mist flex-shrink-0">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif text-sm font-semibold text-velvet-charcoal leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-[10px] text-velvet-charcoal/60 mt-0.5">
                              Size: <strong className="text-mulberry font-bold uppercase">{item.size}</strong>
                            </p>
                          </div>
                          
                          {/* Quantity adjustments */}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center rounded-md border border-silk-gray border-opacity-60 bg-alabaster">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, item.size, Math.max(item.quantity - 1, 1))}
                                className="p-1 hover:text-mulberry text-velvet-charcoal/50"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-semibold px-2.5 text-velvet-charcoal">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                                className="p-1 hover:text-mulberry text-velvet-charcoal/50"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button 
                              onClick={() => onRemoveItem(item.id, item.size)}
                              className="text-velvet-charcoal/40 hover:text-red-600 transition-colors duration-200"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right flex flex-col justify-between items-end">
                          <span className="text-sm font-semibold text-mulberry font-sans">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <span className="text-[10px] text-velvet-charcoal/40">${item.price.toFixed(2)} ea</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Cart Footer block */}
              {cartItems.length > 0 && (
                <div className="bg-white border-t border-silk-gray border-opacity-40 p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-2 text-xs text-velvet-charcoal/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-velvet-charcoal">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      {shippingCost === 0 ? (
                        <span className="text-green-700 font-medium">FREE</span>
                      ) : (
                        <span>${shippingCost.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="h-px bg-silk-gray bg-opacity-40 my-1"></div>
                    <div className="flex justify-between text-sm font-serif text-mulberry font-bold">
                      <span>Estimated Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={onCheckout}
                    className="w-full rounded-full bg-mulberry py-3 text-center text-xs font-semibold tracking-wider text-alabaster uppercase shadow-lg hover:bg-velvet-charcoal transition-all active:scale-95"
                  >
                    Proceed to Checkout
                  </button>
                  <p className="text-[10px] text-center text-velvet-charcoal/40 mt-1">Tax calculated at checkout. Safe & secure payment options.</p>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
