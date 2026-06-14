/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mulberry': '#2C1A30',
        'gold': '#D4AF37',
        'alabaster': '#FAF7F2',
        'lavender-mist': '#F2ECFA',
        'blush-pink': '#F7E5E9',
        'velvet-charcoal': '#1F1521',
        'silk-gray': '#E5E0DB',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
