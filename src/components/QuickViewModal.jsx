import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart } from 'lucide-react';

export default function QuickViewModal({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart,
  onAddToWishlist,
  isWishlisted = false
}) {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    if (!selectedSize) {
      alert('Please select a size first!');
      return;
    }
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsAdding(false);
    setAdded(true);
    
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0]
    });
    
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
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

        {/* Modal Content Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-alabaster rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-silk-gray border-opacity-35 z-10"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 z-20 p-1.5 rounded-full bg-white bg-opacity-70 backdrop-blur-md text-velvet-charcoal hover:bg-white transition-colors focus:ring-1 focus:ring-mulberry"
            aria-label="Close details"
          >
            <X size={20} />
          </button>

          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-white flex flex-col justify-between gap-4 border-r border-silk-gray border-opacity-25">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-lavender-mist relative flex items-center justify-center">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className="h-full w-full object-cover object-center transition-all duration-300"
              />
            </div>
            
            {/* Gallery Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-16 w-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImageIndex === idx ? 'border-mulberry' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Detail Purchasing controls */}
          <div className="p-8 flex flex-col justify-between gap-6 h-full">
            <div>
              {/* Product Info headers */}
              <span className="text-[10px] font-bold tracking-widest text-mulberry/60 uppercase">{product.category}</span>
              <h3 className="font-serif text-2xl font-semibold text-mulberry mt-1 leading-tight">{product.name}</h3>
              
              <div className="mt-2 flex items-center gap-2">
                <div className="flex text-gold">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star 
                      key={idx} 
                      size={14} 
                      className={`gold-rating-star ${idx < Math.floor(product.rating) ? 'fill-gold' : 'fill-none'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-velvet-charcoal/60">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Pricing */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-mulberry">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-base text-velvet-charcoal/40 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Short editorial description */}
              <p className="text-xs text-velvet-charcoal/70 leading-relaxed mt-4">
                Exquisitely tailored dress designed for seasonal events. Formulated with lightweight draped material, custom lining elements, and high-fashion detailing. Perfect for pairing with neutral accessories.
              </p>

              {/* Color selectors */}
              <div className="mt-6 flex flex-col gap-2">
                <span className="text-[10px] font-bold tracking-widest text-velvet-charcoal/60 uppercase">Color: {selectedColor}</span>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`h-7 w-7 rounded-full border flex items-center justify-center transition-all ${
                        selectedColor === color.name ? 'border-mulberry ring-2 ring-blush-pink' : 'border-silk-gray'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size selector pills */}
              <div className="mt-6 flex flex-col gap-2">
                <span className="text-[10px] font-bold tracking-widest text-velvet-charcoal/60 uppercase">Select Size:</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-9 w-12 rounded-lg border text-xs font-semibold tracking-wider transition-all ${
                        selectedSize === size
                          ? 'border-mulberry bg-mulberry text-white'
                          : 'border-silk-gray bg-white text-velvet-charcoal hover:border-mulberry'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Wishlist toggle */}
            <div className="flex gap-3">
              <button
                disabled={isAdding}
                onClick={handleAdd}
                className={`flex-1 rounded-full py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  !selectedSize
                    ? 'bg-silk-gray text-velvet-charcoal/40 cursor-not-allowed'
                    : added
                      ? 'bg-green-600 text-white'
                      : 'bg-mulberry text-alabaster hover:bg-velvet-charcoal'
                }`}
              >
                {isAdding ? 'Adding...' : added ? '✓ Added to Bag' : selectedSize ? `Add [Size ${selectedSize}]` : 'Select Size'}
              </button>

              <button
                onClick={() => onAddToWishlist(product.id)}
                className={`h-12 w-12 rounded-full border border-silk-gray flex items-center justify-center hover:bg-lavender-mist transition-colors group/wish`}
                aria-label="Add to wishlist"
              >
                <Heart 
                  size={18} 
                  className={`transition-colors duration-300 ${
                    isWishlisted ? 'fill-blush-pink text-mulberry' : 'text-velvet-charcoal/60 group-hover/wish:text-mulberry'
                  }`} 
                />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
