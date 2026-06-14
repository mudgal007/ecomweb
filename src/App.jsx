import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home, { MOCK_PRODUCTS } from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import CheckoutWizard from './components/CheckoutWizard';
import { Heart, BookOpen, Trash2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'detail' | 'blog' | 'wishlist'
  const [activeProduct, setActiveProduct] = useState(MOCK_PRODUCTS[0]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // General navigation selector
  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product) => {
    setActiveProduct(product);
    setActiveTab('detail');
  };

  // Cart operations
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += item.quantity || 1;
        return updated;
      }
      return [...prevCart, { ...item, quantity: item.quantity || 1 }];
    });
    // Trigger slide-in drawer automatically for polished UX
    setTimeout(() => setIsCartOpen(true), 300);
  };

  const handleUpdateQuantity = (id, size, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const handleClearCart = () => setCart([]);

  // Wishlist operations
  const handleToggleWishlist = (id) => {
    setWishlist((prevWish) =>
      prevWish.includes(id) ? prevWish.filter((i) => i !== id) : [...prevWish, id]
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-alabaster flex flex-col font-sans select-none">
      
      {/* Sticky Header */}
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onNavigate={handleNavigate}
        currentTab={activeTab}
      />

      {/* Main Page Area Container */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <Home 
            onQuickView={(prod) => {
              setActiveProduct(prod);
              setIsQuickViewOpen(true);
            }}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'detail' && (
          <ProductDetail 
            product={activeProduct}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleToggleWishlist}
            isWishlisted={wishlist.includes(activeProduct?.id)}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activeTab === 'wishlist' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
            <div className="text-center sm:text-left">
              <h1 className="font-serif text-3xl font-bold text-mulberry flex items-center justify-center sm:justify-start gap-2">
                <Heart className="fill-blush-pink text-mulberry animate-pulse" /> My Wishlist
              </h1>
              <p className="text-xs text-velvet-charcoal/50 mt-1">Dresses saved from our capsule edits.</p>
            </div>

            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center bg-white border border-silk-gray border-opacity-35 rounded-2xl max-w-lg mx-auto w-full">
                <Heart size={36} className="text-velvet-charcoal/30" />
                <div>
                  <h4 className="font-serif text-lg font-bold text-mulberry">Your wishlist is empty</h4>
                  <p className="text-xs text-velvet-charcoal/50 mt-1">Tap the heart icons while browsing to save dresses here.</p>
                </div>
                <button 
                  onClick={() => handleNavigate('home')}
                  className="rounded-full bg-mulberry text-alabaster px-6 py-2 text-xs font-semibold uppercase tracking-wider shadow hover:bg-velvet-charcoal transition-all"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {MOCK_PRODUCTS.filter(p => wishlist.includes(p.id)).map((prod) => (
                  <div key={prod.id} className="relative group/wCard">
                    <button
                      onClick={() => handleToggleWishlist(prod.id)}
                      className="absolute right-6 top-6 z-20 h-8 w-8 rounded-full bg-white flex items-center justify-center text-red-500 shadow-md hover:bg-red-50 transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div onClick={() => handleSelectProduct(prod)} className="cursor-pointer">
                      <div className="pointer-events-none">
                        {/* Display preview card without triggers to avoid collisions */}
                        <img src={prod.images[0]} alt={prod.name} className="aspect-[3/4] w-full object-cover rounded-xl shadow-sm" />
                        <div className="pt-3">
                          <span className="text-[10px] font-bold text-mulberry/50 uppercase tracking-widest">{prod.category}</span>
                          <h4 className="font-serif text-base font-semibold text-velvet-charcoal mt-0.5 leading-tight">{prod.name}</h4>
                          <span className="text-sm font-semibold text-mulberry block mt-1">${prod.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="mx-auto max-w-4xl px-4 py-12 flex flex-col gap-12">
            <div className="text-center flex flex-col gap-2">
              <h1 className="font-serif text-4xl font-bold text-mulberry flex items-center justify-center gap-2">
                <BookOpen size={28} className="text-mulberry" /> The Styling Journal
              </h1>
              <p className="text-xs text-velvet-charcoal/60">Aesthetic guidelines & garment care tips from our design studio in Paris.</p>
            </div>

            <div className="flex flex-col gap-16">
              {[
                {
                  title: 'How to style pastel tones for evening events',
                  date: 'June 12, 2026',
                  author: 'Madeleine V.',
                  image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=700&auto=format&fit=crop',
                  content: 'Working with delicate blush, soft lavender, and cream tones is all about establishing harmonious contrast. When selecting accessories, favor warm bronze or antique gold tones over harsh silver, which elevates the warmth of the linen or silk. Keep shoes within matching tones like neutral ivory or beige slides. Let the fluidity of the dress cowl remain the primary focus by keeping necklaces minimalist or opting for baroque pearl drops.'
                },
                {
                  title: '5 Sustainable Fabrics to Choose This Season',
                  date: 'June 08, 2026',
                  author: 'Julian F.',
                  image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=700&auto=format&fit=crop',
                  content: 'High fashion should never compromise the health of our environment. This season, our capsule collections focus heavily on: 1) Organic Mulberry Silk, produced utilizing zero chemical pesticides; 2) European Linen, requiring minimal irrigation; 3) GOTS-certified Organic Cotton; 4) Refined Tencel Lyocell, sourced from sustainably harvested wood pulp; and 5) Recycled satin blends that reduce post-consumer waste while maintaining a stunning sheen.'
                }
              ].map((post, index) => (
                <article key={index} className="flex flex-col gap-6 bg-white border border-silk-gray border-opacity-35 rounded-2xl overflow-hidden shadow-sm p-6 sm:p-8">
                  <div className="h-64 sm:h-96 rounded-xl overflow-hidden bg-lavender-mist">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-mulberry/50 tracking-widest uppercase">{post.date} · By {post.author}</span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-mulberry mt-1 leading-snug">{post.title}</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-velvet-charcoal/70 leading-relaxed font-normal whitespace-pre-line">{post.content}</p>
                    <div className="h-px bg-silk-gray my-2"></div>
                    <span className="text-xs font-serif italic text-gold">Amethyst Couture Styling Journal - Edition 04</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer Block */}
      <footer className="bg-white border-t border-silk-gray border-opacity-35 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <span className="font-serif text-xl font-bold text-mulberry tracking-widest">AMETHYST</span>
            <p className="text-xs text-velvet-charcoal/60 leading-relaxed">
              Fashion-forward, elegant women's dresses designed to celebrate clean silhouettes and premium natural textiles.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-mulberry mb-3">Occasions</h4>
            <ul className="flex flex-col gap-2 text-xs text-velvet-charcoal/60">
              <li><button onClick={() => handleNavigate('home')} className="hover:underline">Casual Wear</button></li>
              <li><button onClick={() => handleNavigate('home')} className="hover:underline">Party & Evening</button></li>
              <li><button onClick={() => handleNavigate('home')} className="hover:underline">Tailored Formal</button></li>
              <li><button onClick={() => handleNavigate('home')} className="hover:underline">Ethnic Heritage</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-mulberry mb-3">Design Studio</h4>
            <ul className="flex flex-col gap-2 text-xs text-velvet-charcoal/60 font-sans">
              <li><button onClick={() => handleNavigate('blog')} className="hover:underline">Styling Journal</button></li>
              <li><a href="#about" className="hover:underline">Fabric Sourcing</a></li>
              <li><a href="#eco" className="hover:underline">Sustainability Pledge</a></li>
              <li><a href="#care" className="hover:underline">Garment Care Guides</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-mulberry">Styling Letters</h4>
            <p className="text-xs text-velvet-charcoal/60">Subscribe to receive styling updates and custom drop dates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email..." 
                className="bg-alabaster border border-silk-gray text-xs p-2 rounded-lg flex-1 focus:outline-none" 
              />
              <button 
                onClick={() => alert('Thank you for subscribing!')}
                className="bg-mulberry text-alabaster text-xs font-bold tracking-wider px-4 rounded-lg hover:bg-velvet-charcoal uppercase"
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-silk-gray border-opacity-25 flex flex-col sm:flex-row justify-between items-center text-xs text-velvet-charcoal/40 gap-4">
          <span>© 2026 AMETHYST Luxe Dress E-Commerce. All Rights Reserved.</span>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Dynamic Slide-in Cart Drawer Overlay */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Quick View Modal Overlay */}
      <QuickViewModal 
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={activeProduct}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleToggleWishlist}
        isWishlisted={wishlist.includes(activeProduct?.id)}
      />

      {/* Step by Step Checkout Wizard Modal */}
      <CheckoutWizard 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartTotal={cartTotal}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
