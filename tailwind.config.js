/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sanguo-red': '#E53E3E',
        'sanguo-gold': '#ECC94B',
        'sanguo-brown': '#744210',
        'sanguo-bg': '#FFF5F5',
      },
      fontFamily: {
        'chinese': ['"Zhi Mang Xing"', '"Ma Shan Zheng"', 'cursive', 'sans-serif'],
      }
    },
  },
  plugins: [],
}