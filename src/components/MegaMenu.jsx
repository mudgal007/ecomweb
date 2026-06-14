import React from 'react';
import { motion } from 'framer-motion';

const CATEGORY_LINKS = {
  Casual: ['Linen Wrap Dresses', 'Ribbed Knit Dress', 'Denim Shirt Dresses', 'Sundresses', 'Cotton Maxis'],
  Party: ['Silk Slip Dresses', 'Sequin Gowns', 'Velvet Cocktails', 'Satin Slip Dresses', 'Cowl Neck Maxis'],
  Formal: ['A-Line Tailored Dresses', 'Tweed Blazer Dresses', 'Pleated Sheaths', 'Midi Workwear'],
  Ethnic: ['Georgette Anarkalis', 'Cotton Chikankari', 'Silk Chanderi', 'Floral Organza Lehengas']
};

export default function MegaMenu({ isOpen, onClose, onSelectCategory }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute inset-x-0 top-full z-50 border-b border-silk-gray border-opacity-40 bg-white bg-opacity-95 p-8 shadow-2xl backdrop-blur-xl"
      onMouseLeave={onClose}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-5 gap-8">
        
        {/* Core Categories Columns */}
        {Object.entries(CATEGORY_LINKS).map(([catName, links]) => (
          <div key={catName} className="flex flex-col gap-3">
            <h4 className="font-serif text-base font-semibold tracking-wider text-mulberry uppercase border-b border-silk-gray border-opacity-40 pb-2">
              {catName}
            </h4>
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      onSelectCategory(catName);
                      onClose();
                    }}
                    className="text-left text-xs text-velvet-charcoal text-opacity-70 hover:text-mulberry hover:font-medium transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Dynamic Highlight Promo Banner Card */}
        <div className="col-span-1 overflow-hidden rounded-xl bg-lavender-mist p-4 flex flex-col justify-between relative group/promo min-h-[200px]">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/promo:scale-105 opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300&auto=format&fit=crop')" }}></div>
          <div className="relative z-10">
            <span className="text-[10px] font-bold tracking-widest text-mulberry uppercase bg-white/60 px-2 py-0.5 rounded-full">New Edit</span>
            <h5 className="font-serif text-lg font-bold text-mulberry mt-2 leading-tight">The Fluidity of Silk</h5>
            <p className="text-[10px] text-velvet-charcoal/80 mt-1">100% Organic Mulberry silk in pastels.</p>
          </div>
          <button 
            onClick={() => {
              onSelectCategory('Party');
              onClose();
            }}
            className="relative z-10 text-left text-xs font-semibold text-mulberry flex items-center gap-1 hover:underline mt-4"
          >
            Explore Now →
          </button>
        </div>

      </div>

      {/* Helper Filters quick highlight bar */}
      <div className="mx-auto max-w-7xl mt-8 pt-4 border-t border-silk-gray border-opacity-40 flex items-center justify-between text-xs text-velvet-charcoal/60">
        <div className="flex gap-4 items-center">
          <span className="font-semibold text-mulberry/80 uppercase tracking-wider text-[10px]">Filter Guidelines:</span>
          <span>Sizes XS - XL</span>
          <span className="h-1 w-1 rounded-full bg-silk-gray"></span>
          <span>Prices $80 - $320</span>
          <span className="h-1 w-1 rounded-full bg-silk-gray"></span>
          <span>Premium Linens, Silks & Cotton Fabrics</span>
        </div>
        <span className="font-serif italic text-mulberry">Carefully curated sustainable fabrics.</span>
      </div>
    </motion.div>
  );
}
