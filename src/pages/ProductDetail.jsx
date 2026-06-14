import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingBag, ChevronRight, RotateCcw, Truck, ShieldCheck, Plus, Minus } from 'lucide-react';
import { MOCK_PRODUCTS } from './Home';

export default function ProductDetail({ 
  product, 
  onAddToCart, 
  onAddToWishlist, 
  isWishlisted = false,
  onNavigate,
  onSelectProduct
}) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });

  // Gallery zoom mouse event handlers
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${product.images[activeImageIndex]})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

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
      image: product.images[0],
      quantity: quantity
    });

    setTimeout(() => setAdded(false), 2000);
  };

  // Cross-sell recommendations mock data
  const STYLE_WITH_ITEMS = [
    { id: 'acc-001', name: 'Baroque Pearl Necklace', price: 75.00, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300&auto=format&fit=crop' },
    { id: 'acc-002', name: 'Linen Oversized Blazer', price: 210.00, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300&auto=format&fit=crop' },
    { id: 'acc-003', name: 'Silk Ribbon Headband', price: 35.00, image: 'https://images.unsplash.com/photo-1576243308206-85660b64d4a8?q=80&w=300&auto=format&fit=crop' }
  ];

  const handleAddAccessory = (acc) => {
    onAddToCart({
      id: acc.id,
      name: acc.name,
      price: acc.price,
      size: 'O/S',
      color: 'Default',
      image: acc.image,
      quantity: 1
    });
    alert(`Added ${acc.name} to your bag!`);
  };

  // Other recommendations from main product set
  const recommendations = MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-16">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-velvet-charcoal/50">
        <button onClick={() => onNavigate('home')} className="hover:text-mulberry">Home</button>
        <ChevronRight size={12} />
        <button onClick={() => onNavigate('home')} className="hover:text-mulberry">Dresses</button>
        <ChevronRight size={12} />
        <span className="hover:text-mulberry uppercase tracking-wider text-[10px]">{product.category}</span>
        <ChevronRight size={12} />
        <span className="text-mulberry font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Gallery Panel */}
        <div className="flex flex-col gap-4">
          <div 
            className="aspect-[3/4] rounded-2xl overflow-hidden bg-lavender-mist relative cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.name} 
              className="h-full w-full object-cover object-center"
            />
            {/* Magnified Hover Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none border border-silk-gray border-opacity-35 rounded-2xl bg-no-repeat"
              style={zoomStyle}
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-20 w-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activeImageIndex === idx ? 'border-mulberry' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Purchase Controls details column */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-mulberry/60 uppercase">{product.category} COLLECTION</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-mulberry mt-1 leading-tight">{product.name}</h1>
            
            {/* Star ratings */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    size={16} 
                    className={`gold-rating-star ${idx < Math.floor(product.rating) ? 'fill-gold' : 'fill-none'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-velvet-charcoal/60">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Pricing */}
            <div className="mt-5 flex items-baseline gap-4">
              <span className="text-3xl font-bold text-mulberry">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-velvet-charcoal/40 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>

          <hr className="border-silk-gray border-opacity-30" />

          {/* Color bubble buttons */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold tracking-widest text-velvet-charcoal/60 uppercase">Color: {selectedColor}</span>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all ${
                    selectedColor === color.name ? 'border-mulberry ring-2 ring-blush-pink' : 'border-silk-gray'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size selection pills */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-velvet-charcoal/60 uppercase">
              <span>Select Size:</span>
              <button className="underline hover:text-mulberry text-[9px] lowercase tracking-normal">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-10 w-14 rounded-lg border text-xs font-semibold tracking-wider transition-all ${
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

          {/* Quantity adjuster */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold tracking-widest text-velvet-charcoal/60 uppercase">Quantity:</span>
            <div className="flex items-center rounded-lg border border-silk-gray border-opacity-60 bg-white max-w-[120px] justify-between p-1">
              <button 
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                className="p-1.5 hover:text-mulberry text-velvet-charcoal/50"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-semibold text-velvet-charcoal">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 hover:text-mulberry text-velvet-charcoal/50"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Cart actions */}
          <div className="flex gap-4 mt-2">
            <button
              disabled={isAdding}
              onClick={handleAdd}
              className={`flex-1 rounded-full py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                !selectedSize
                  ? 'bg-silk-gray text-velvet-charcoal/40 cursor-not-allowed'
                  : added
                    ? 'bg-green-600 text-white'
                    : 'bg-mulberry text-alabaster hover:bg-velvet-charcoal hover:-translate-y-[1px]'
              }`}
            >
              <ShoppingBag size={14} />
              {isAdding ? 'Adding...' : added ? '✓ Added to Bag' : selectedSize ? `Add [Size ${selectedSize}] to Bag` : 'Select Size'}
            </button>

            <button
              onClick={() => onAddToWishlist(product.id)}
              className={`h-12 w-12 rounded-full border border-silk-gray flex items-center justify-center hover:bg-lavender-mist transition-colors group/wish`}
              aria-label="Add to wishlist"
            >
              <Heart 
                size={20} 
                className={`transition-colors duration-300 ${
                  isWishlisted ? 'fill-blush-pink text-mulberry' : 'text-velvet-charcoal/60 group-hover/wish:text-mulberry'
                }`} 
              />
            </button>
          </div>

          {/* Trust anchors Accordion info tabs */}
          <div className="mt-8 border-t border-silk-gray border-opacity-35 pt-4">
            <div className="flex justify-around text-center text-[10px] font-semibold text-velvet-charcoal/70 gap-4">
              <div className="flex flex-col items-center gap-1">
                <Truck size={18} className="text-mulberry/80" />
                <span>Express Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw size={18} className="text-mulberry/80" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={18} className="text-mulberry/80" />
                <span>Eco-Luxe Certified</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Cross Sell Section */}
      <section className="border-t border-silk-gray border-opacity-40 pt-16 flex flex-col gap-6">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-mulberry">Style With</h2>
          <p className="text-xs text-velvet-charcoal/50 mt-1">Complete your capsule dress silhouette with items hand-selected by our stylists.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STYLE_WITH_ITEMS.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-silk-gray border-opacity-30 p-4 flex gap-4 items-center shadow-sm relative group hover:shadow-md transition-shadow">
              <div className="h-20 w-16 rounded-lg overflow-hidden bg-lavender-mist flex-shrink-0">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-velvet-charcoal leading-tight">{item.name}</h4>
                  <span className="text-xs font-semibold text-mulberry mt-1 block">${item.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleAddAccessory(item)}
                  className="rounded-full border border-mulberry text-mulberry py-1 px-3 text-[10px] font-bold uppercase tracking-wider hover:bg-mulberry hover:text-white transition-all mt-2.5 max-w-[80px]"
                >
                  Add +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews feed section */}
      <section className="border-t border-silk-gray border-opacity-40 pt-16 flex flex-col gap-8">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-mulberry">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} size={14} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-xs text-velvet-charcoal/70"><strong>{product.rating}</strong> stars based on {product.reviewCount} customer reviews.</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 max-w-3xl">
          {[
            { author: 'Clara D.', rating: 5, date: 'June 01, 2026', comment: 'Exquisite drape! The organic silk feels incredibly luxurious against the skin. I received so many compliments wearing this to our evening dinner party. Definitely worth the investment!' },
            { author: 'Elena S.', rating: 5, date: 'May 28, 2026', comment: 'Perfect fit. I was initially worried about the size, but the size charts were exact. Highly recommend adding the oversized linen blazer to complete the silhouette!' },
            { author: 'Vivienne R.', rating: 4, date: 'May 15, 2026', comment: 'Beautiful dress, but ensure you order standard size. The colors are very accurate pastel mulberry tones. Shipping arrived in exactly 3 days in fully compostable packaging.' }
          ].map((rev, idx) => (
            <div key={idx} className="bg-white border border-silk-gray border-opacity-35 rounded-xl p-6 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-velvet-charcoal">{rev.author}</span>
                  <span className="text-[10px] text-velvet-charcoal/40 ml-2 font-medium">{rev.date}</span>
                </div>
                <div className="flex text-gold">
                  {Array.from({ length: 5 }).map((_, rIdx) => (
                    <Star 
                      key={rIdx} 
                      size={12} 
                      className={`gold-rating-star ${rIdx < rev.rating ? 'fill-gold' : 'fill-none'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-velvet-charcoal/70 leading-relaxed font-normal">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Recommendations Carousel section */}
      <section className="border-t border-silk-gray border-opacity-40 pt-16 flex flex-col gap-6">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-mulberry text-center">You May Also Like</h2>
          <p className="text-xs text-velvet-charcoal/50 text-center mt-1">More dress silhouettes from our design studio capsules.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div 
              key={rec.id}
              onClick={() => {
                onSelectProduct(rec);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer"
            >
              <ProductCard 
                product={rec}
                onQuickView={onNavigate} /* Redirect callback */
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
