/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 10s linear infinite alternate',
        'expand': 'expand 0.3s ease-out',
        'expand-reverse': 'expand-reverse 10s ease-out',

      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-60%)' }
        },
        'expand': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0%)' }
        },
        'expand-reverse': {
          from: { transform: 'translateY(0%)' },
          to: { transform: 'translateY(100%)' }
        },
      },
    },
    screens: {

      'xsm': '480px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}

