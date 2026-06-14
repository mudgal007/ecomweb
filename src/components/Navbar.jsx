import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import MegaMenu from './MegaMenu';
import { AnimatePresence } from 'framer-motion';

export default function Navbar({ 
  cartCount = 0, 
  wishlistCount = 0, 
  onCartToggle, 
  onNavigate, 
  currentTab = 'home' 
}) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleShopHover = () => setIsMegaMenuOpen(true);
  const handleShopLeave = () => setIsMegaMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white bg-opacity-80 backdrop-blur-md border-b border-silk-gray border-opacity-35 transition-all">
      {/* Top Promotional Bar */}
      <div className="bg-mulberry py-1.5 px-4 text-center text-[11px] font-medium tracking-wider text-alabaster uppercase flex justify-between items-center sm:px-8">
        <span className="hidden sm:inline">🌟 Style Edit: Mulberry Silk Capsule Just Released</span>
        <span className="mx-auto sm:mx-0">Free Shipping on Orders Over $150</span>
        <a href="#blog" onClick={() => onNavigate('blog')} className="hidden sm:inline underline hover:text-blush-pink transition-colors">Read Styling Journal</a>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo & Mobile Menu Hamburger */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-velvet-charcoal hover:bg-lavender-mist rounded-md md:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <button 
              onClick={() => onNavigate('home')} 
              className="font-serif text-2xl font-bold tracking-widest text-mulberry focus:outline-none"
            >
              AMETHYST
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 h-full" onMouseLeave={handleShopLeave}>
            <div 
              className="relative h-full flex items-center" 
              onMouseEnter={handleShopHover}
            >
              <button 
                className={`text-xs font-semibold tracking-widest uppercase transition-colors py-5 border-b-2 ${
                  isMegaMenuOpen ? 'text-mulberry border-mulberry' : 'text-velvet-charcoal/70 border-transparent hover:text-mulberry'
                }`}
              >
                Shop Collection
              </button>
              
              <AnimatePresence>
                {isMegaMenuOpen && (
                  <MegaMenu 
                    isOpen={isMegaMenuOpen} 
                    onClose={() => setIsMegaMenuOpen(false)}
                    onSelectCategory={(category) => {
                      onNavigate('home');
                      // Wait a frame and scroll to grid or trigger search/filter
                      setTimeout(() => {
                        const el = document.getElementById('product-grid');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => onNavigate('home')}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors py-5 border-b-2 ${currentTab === 'home' ? 'text-mulberry border-mulberry' : 'text-velvet-charcoal/70 border-transparent hover:text-mulberry'}`}
            >
              Dresses
            </button>

            <button 
              onClick={() => onNavigate('blog')}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors py-5 border-b-2 ${currentTab === 'blog' ? 'text-mulberry border-mulberry' : 'text-velvet-charcoal/70 border-transparent hover:text-mulberry'}`}
            >
              Styling Blog
            </button>
          </nav>

          {/* Interactive Search Box */}
          <div className="hidden sm:flex relative max-w-xs w-full">
            <span className="absolute inset-y-0 left-3 flex items-center text-velvet-charcoal/40 pointer-events-none">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              placeholder="Search dresses (e.g. Silk, Wrap)..." 
              className="w-full rounded-full bg-alabaster py-1.5 pl-10 pr-4 text-xs text-velvet-charcoal placeholder-velvet-charcoal/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-mulberry border border-silk-gray border-opacity-35 transition-all"
            />
          </div>

          {/* User Utilities & Indicators */}
          <div className="flex items-center gap-4">
            {/* Account Profile Icon */}
            <button className="p-1.5 text-velvet-charcoal hover:bg-lavender-mist rounded-full transition-colors hidden sm:block" aria-label="Account Account">
              <User size={18} />
            </button>

            {/* Wishlist Link with indicator badge */}
            <button 
              onClick={() => onNavigate('wishlist')}
              className="p-1.5 text-velvet-charcoal hover:bg-lavender-mist rounded-full transition-colors relative" 
              aria-label="Wishlist"
            >
              <Heart size={18} className={wishlistCount > 0 ? 'fill-blush-pink text-mulberry' : ''} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-mulberry text-[9px] font-bold text-alabaster animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button with count and click triggers */}
            <button 
              onClick={onCartToggle}
              className="p-1.5 text-velvet-charcoal hover:bg-lavender-mist rounded-full transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-velvet-charcoal">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-velvet-charcoal/50 backdrop-blur-sm">
            <div className="w-64 bg-white h-screen p-6 flex flex-col gap-6 shadow-xl">
              <div className="flex justify-between items-center pb-4 border-b border-silk-gray">
                <span className="font-serif text-lg font-bold text-mulberry">AMETHYST</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-lavender-mist rounded">
                  <X size={18} />
                </button>
              </div>
              
              <ul className="flex flex-col gap-4">
                <li>
                  <button 
                    onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left font-semibold text-xs text-velvet-charcoal uppercase hover:text-mulberry"
                  >
                    Dresses
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('blog'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left font-semibold text-xs text-velvet-charcoal uppercase hover:text-mulberry"
                  >
                    Styling Blog
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { onNavigate('wishlist'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left font-semibold text-xs text-velvet-charcoal uppercase hover:text-mulberry"
                  >
                    My Wishlist ({wishlistCount})
                  </button>
                </li>
              </ul>
              
              <div className="relative mt-4">
                <span className="absolute inset-y-0 left-3 flex items-center text-velvet-charcoal/40">
                  <Search size={16} />
                </span>
                <input 
                  type="text" 
                  placeholder="Search dresses..." 
                  className="w-full rounded-full bg-alabaster py-2 pl-10 pr-4 text-xs focus:bg-white focus:outline-none border border-silk-gray border-opacity-35"
                />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
