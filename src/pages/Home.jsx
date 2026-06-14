import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

export const MOCK_PRODUCTS = [
  {
    id: 'amethyst-silk-slip',
    name: 'La Parisienne Silk Slip Dress',
    price: 180.00,
    originalPrice: 240.00,
    category: 'Party',
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539008885128-40d24ee0d031?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Mulberry', hex: '#2C1A30' },
      { name: 'Blush Pink', hex: '#F6DFE5' }
    ],
    badge: 'Bestseller'
  },
  {
    id: 'linen-wrap-sundress',
    name: 'Summer Meadow Linen Wrap',
    price: 145.00,
    originalPrice: 175.00,
    category: 'Casual',
    rating: 4.7,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sage Green', hex: '#8F9779' },
      { name: 'Alabaster Cream', hex: '#FAF7F2' }
    ],
    badge: 'Eco-Luxe'
  },
  {
    id: 'manhattan-blazer-midi',
    name: 'Manhattan Double-Breasted Blazer Dress',
    price: 210.00,
    originalPrice: null,
    category: 'Formal',
    rating: 4.8,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Velvet Charcoal', hex: '#1F1521' },
      { name: 'Ivory Silk', hex: '#FFFDF9' }
    ],
    badge: 'Trending'
  },
  {
    id: 'emerald-organza-lehenga',
    name: 'Emerald Floral Organza Dress',
    price: 295.00,
    originalPrice: 350.00,
    category: 'Ethnic',
    rating: 5.0,
    reviewCount: 33,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Emerald', hex: '#0B4C3A' },
      { name: 'Pastel Blush', hex: '#FADADD' }
    ],
    badge: 'Handcrafted'
  },
  {
    id: 'chikankari-cotton-maxi',
    name: 'Ivory Cotton Chikankari Dress',
    price: 165.00,
    originalPrice: 195.00,
    category: 'Ethnic',
    rating: 4.6,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1605761974111-c7487199432e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572451479139-6a308211d8be?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ivory White', hex: '#FDFBF7' }
    ],
    badge: 'New In'
  },
  {
    id: 'midnight-cowl-gown',
    name: 'Midnight Cowl Neck Satin Gown',
    price: 225.00,
    originalPrice: 280.00,
    category: 'Party',
    rating: 4.9,
    reviewCount: 50,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Violet', hex: '#1A0E2B' },
      { name: 'Wine Red', hex: '#581825' }
    ],
    badge: 'Limited Run'
  }
];

export default function Home({ onQuickView, onAddToCart, onSelectProduct, onNavigate }) {
  const [selectedFilterTab, setSelectedFilterTab] = useState('All');

  const categories = ['All', 'Casual', 'Party', 'Formal', 'Ethnic'];

  const filteredProducts = selectedFilterTab === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === selectedFilterTab);

  return (
    <div className="flex flex-col gap-16 pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-lavender-mist bg-opacity-65 py-24 sm:py-32 border-b border-silk-gray border-opacity-35">
        <div className="absolute inset-0 bg-cover bg-right sm:bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop')" }}></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col items-start gap-6 max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest text-mulberry uppercase bg-white/70 px-3 py-1 rounded-full shadow-sm"
          >
            The Summer Capsule Edit
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl font-light leading-tight text-mulberry"
          >
            Draped in Pure <br />
            <span className="font-semibold italic text-gold">Mulberry Silk</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base text-velvet-charcoal text-opacity-80 leading-relaxed max-w-lg"
          >
            Explore fluid, lightweight dresses crafted in pastel lavender, blush pink, and alabaster cream. Tailored for absolute style and organic comfort.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            onClick={() => {
              const el = document.getElementById('product-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full bg-mulberry px-8 py-3 text-xs font-bold tracking-widest text-alabaster uppercase shadow-lg hover:bg-velvet-charcoal transition-all active:scale-95 mt-2"
          >
            Shop Now →
          </motion.button>
        </div>
      </section>

      {/* Highlights Category Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        <div className="text-center sm:text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-mulberry">Shop by Occasion</h2>
          <p className="text-xs text-velvet-charcoal/50 mt-1">Carefully conceptualized wardrobes for every highlight.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Casual', url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=400&auto=format&fit=crop', desc: 'Sundresses & Wraps' },
            { name: 'Party', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop', desc: 'Satin & Sequin Gowns' },
            { name: 'Formal', url: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=400&auto=format&fit=crop', desc: 'Workwear Midis & Blazers' },
            { name: 'Ethnic', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop', desc: 'Organzas & Chikankaris' }
          ].map((cat) => (
            <div 
              key={cat.name} 
              onClick={() => {
                setSelectedFilterTab(cat.name);
                setTimeout(() => {
                  document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="group relative h-60 rounded-xl overflow-hidden cursor-pointer shadow-md border border-silk-gray border-opacity-35"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                style={{ backgroundImage: `url('${cat.url}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-velvet-charcoal/80 via-transparent to-transparent flex flex-col justify-end p-5" />
              <div className="relative z-10 h-full flex flex-col justify-end p-5">
                <span className="font-serif text-lg font-bold text-alabaster leading-none">{cat.name}</span>
                <span className="text-[10px] text-alabaster/70 mt-1 uppercase tracking-wider">{cat.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Grid with Category tab filters */}
      <section id="product-grid" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8 scroll-mt-20">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-mulberry">Seasonal Bestsellers</h2>
            <p className="text-xs text-velvet-charcoal/50 mt-1">Trending high-conversion dress silhouettes.</p>
          </div>
          
          {/* Tab filters */}
          <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilterTab(tab)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedFilterTab === tab
                    ? 'bg-mulberry text-alabaster shadow-md'
                    : 'bg-white text-velvet-charcoal/60 hover:text-mulberry border border-silk-gray border-opacity-35'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product listing grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id} 
              onClick={() => onSelectProduct(prod)}
              className="cursor-pointer"
            >
              <ProductCard 
                product={prod}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Styling Journal Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-silk-gray border-opacity-40 pt-16 flex flex-col gap-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-mulberry">The Styling Journal</h2>
          <p className="text-xs text-velvet-charcoal/50 mt-1">Curated styling guides and fashion editorial tips from our design studio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'How to style pastels for evening events',
              url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500&auto=format&fit=crop',
              date: 'June 12, 2026',
              readTime: '3 min read'
            },
            {
              title: '5 Sustainable Fabrics to Choose This Season',
              url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500&auto=format&fit=crop',
              date: 'June 08, 2026',
              readTime: '4 min read'
            }
          ].map((blog, idx) => (
            <div 
              key={idx} 
              onClick={() => onNavigate('blog')}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-silk-gray border-opacity-30 flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 sm:h-auto sm:w-48 bg-lavender-mist overflow-hidden flex-shrink-0">
                <img src={blog.url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold tracking-widest text-mulberry/50 uppercase">{blog.date} · {blog.readTime}</span>
                  <h3 className="font-serif text-lg font-bold text-mulberry group-hover:underline leading-snug">{blog.title}</h3>
                  <p className="text-xs text-velvet-charcoal/60 line-clamp-2">
                    Discover professional rules on combining lavender, blush and cream silhouettes with simple accessories to achieve absolute aesthetic balance.
                  </p>
                </div>
                <span className="text-xs font-semibold text-mulberry group-hover:underline">Read Article →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
