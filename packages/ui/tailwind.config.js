/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/*.{js,ts,jsx,tsx}',
    './components/*.{js,ts,jsx,tsx}',
    './app/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')],
}
