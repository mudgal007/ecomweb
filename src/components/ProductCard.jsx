import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modern E-Commerce Product Card Component
 * 
 * Design Features:
 * - Dynamic image scale and second-image transition on hover.
 * - Quick-size select grid overlays.
 * - Framer Motion micro-interactions for the wishlist icon and action buttons.
 * - Integrated loading/success states for the cart interaction.
 * - Accessibility support: Keyboard navigation focus states, ARIA attributes.
 */

const DEFAULT_PRODUCT = {
  id: 'amethyst-silk-slip',
  name: 'La Parisienne Silk Slip Dress',
  price: 180.00,
  originalPrice: 240.00,
  category: 'PARTY COLLECTION',
  rating: 4.8,
  reviewCount: 42,
  images: [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop', // Silk dress main
    'https://images.unsplash.com/photo-1539008885128-40d24ee0d031?q=80&w=600&auto=format&fit=crop'  // Silk dress detail / styled
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    { name: 'Mulberry', hex: '#2C1A30' },
    { name: 'Blush Pink', hex: '#F6DFE5' },
    { name: 'Alabaster Cream', hex: '#FAF7F2' }
  ],
  badge: 'Bestseller'
};

export default function ProductCard({ 
  product = DEFAULT_PRODUCT, 
  onQuickView = () => console.log('Quick view triggered'), 
  onAddToCart = (item) => console.log('Added to cart:', item) 
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  // Handles adding item with feedback
  const handleQuickAdd = async (e) => {
    e.stopPropagation();
    if (!selectedSize) {
      alert('Please select a size first!');
      return;
    }
    
    setIsAdding(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsAdding(false);
    setAdded(true);
    
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[0]
    });

    // Reset added state feedback
    setTimeout(() => setAdded(false), 2000);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div 
      className="group relative flex flex-col w-full max-w-sm overflow-hidden rounded-xl bg-alabaster bg-opacity-40 p-3 transition-shadow duration-300 hover:shadow-xl border border-silk-gray border-opacity-30"
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images[1]) setCurrentImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      {/* Product Image Gallery & Interaction Layer */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-lavender-mist">
        
        {/* Badges */}
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-mulberry px-3 py-1 text-xs font-medium tracking-wide text-alabaster uppercase shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button (Aesthetic Micro-interaction) */}
        <button 
          onClick={toggleWishlist}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white bg-opacity-70 backdrop-blur-md transition-all duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-mulberry"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className={`h-5 w-5 transition-colors duration-300 ${isWishlisted ? 'fill-blush-pink stroke-mulberry' : 'fill-none stroke-velvet-charcoal'}`}
            animate={isWishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </motion.svg>
        </button>

        {/* Primary/Secondary Image Slideshow */}
        <div className="h-full w-full">
          <motion.img 
            src={product.images[currentImageIndex]} 
            alt={product.name} 
            className="h-full w-full object-cover object-center"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          />
        </div>

        {/* Quick View Hover Panel Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2.5 bg-gradient-to-t from-velvet-charcoal/80 to-transparent p-4 pt-10"
            >
              {/* Quick View Overlay Trigger */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="w-full rounded-md bg-white py-2 text-center text-xs font-semibold tracking-wider text-velvet-charcoal uppercase shadow-md transition-all hover:bg-alabaster active:scale-95 focus:outline-none focus:ring-2 focus:ring-mulberry"
              >
                Quick View
              </button>

              {/* Sizes Quick Selection */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold tracking-widest text-alabaster/70 uppercase">Select Size:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <button 
                      key={size}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSize(size);
                      }}
                      className={`flex h-7 w-7 items-center justify-center rounded text-[11px] font-semibold transition-all ${selectedSize === size ? 'bg-mulberry text-white' : 'bg-white/20 text-white hover:bg-white/45'}`}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Information Details */}
      <div className="flex flex-col pt-3 pb-1">
        <span className="text-[10px] font-bold tracking-widest text-mulberry/60 uppercase">
          {product.category}
        </span>
        
        <h3 className="mt-1 font-serif text-lg font-medium leading-tight text-velvet-charcoal">
          {product.name}
        </h3>

        {/* Ratings */}
        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex text-gold">
            {Array.from({ length: 5 }).map((_, idx) => (
              <svg 
                key={idx} 
                className={`h-3.5 w-3.5 ${idx < Math.floor(product.rating) ? 'fill-gold text-gold' : 'fill-none stroke-gold'}`} 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.48 3.499c.195-.49.883-.49 1.078 0l2.124 5.311 5.762.348c.53.032.742.684.348 1.055l-4.382 4.12 1.34 5.614c.123.518-.432.921-.89.673L12 18.152l-5.18 3.033c-.458.248-1.013-.155-.89-.673l1.34-5.614-4.382-4.12c-.394-.37-.182-1.023.348-1.055l5.762-.348 2.124-5.311z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] font-medium text-velvet-charcoal/50">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price & Purchase Actions */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-velvet-charcoal">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-velvet-charcoal/40 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Quick Add To Cart Button */}
          <button 
            disabled={isAdding}
            onClick={handleQuickAdd}
            className={`relative flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-mulberry ${
              !selectedSize 
                ? 'bg-silk-gray text-velvet-charcoal/40 cursor-not-allowed' 
                : added
                  ? 'bg-green-600 text-white'
                  : 'bg-mulberry text-alabaster hover:bg-velvet-charcoal hover:-translate-y-[1px]'
            }`}
            aria-label={added ? "Added successfully" : "Add to Cart"}
          >
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.div 
                  key="loading"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : added ? (
                <motion.span 
                  key="added" 
                  initial={{ scale: 0.8 }} 
                  animate={{ scale: 1 }} 
                  exit={{ scale: 0.8 }}
                  className="flex items-center gap-1"
                >
                  ✓ Added
                </motion.span>
              ) : (
                <motion.span key="normal">
                  {selectedSize ? `Add [${selectedSize}]` : 'Select Size'}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}
