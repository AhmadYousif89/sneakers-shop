/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        h1: "url('./src/assets/images/h1-1000.png')",
      },
      colors: {
        Black: '#000',
        White: '#fff',
        Orange: 'hsl(26, 100%, 55%)',
        Pale_orange: 'hsl(25, 100%, 94%)',
        Grayish_blue: ' hsl(221, 22%, 81%)',
        Very_dark_blue: 'hsl(220, 13%, 13%)',
        Dark_grayish_blue: 'hsl(219, 9%, 45%)',
        Light_grayish_blue: 'hsl(223, 64%, 98%)',
      },
      screens: {
        xs: '400px',
      },
      fontFamily: {
        kumbh: ['Kumbh Sans', ' sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      keyframes: {
        ripple: {
          from: { transform: 'scale(0)', opacity: '.25' },
          to: { transform: 'scale(3)', opacity: '0' },
        },
      },
      animation: {
        ripple: 'ripple 1s linear forwards',
        spin: 'spin 1s ease-out infinite',
      },
    },
  },
  plugins: [],
};
