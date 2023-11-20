/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
