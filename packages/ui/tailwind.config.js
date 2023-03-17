/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  purge: {
    enabled: process.env.NODE_ENV === 'publish',
    content: ['./admin/**/*.{js,jsx,ts,tsx}']
  },
  content: [
    './admin/pages/**/*.{js,ts,jsx,tsx}',
    './admin/components/**/*.{js,ts,jsx,tsx}',
    './admin/**/*.{js,ts,jsx,tsx}',
    './admin/resourceData/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')],
}
