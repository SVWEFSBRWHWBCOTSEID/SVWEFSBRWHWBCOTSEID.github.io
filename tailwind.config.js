const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ccc',
        secondary: '#999999',
        tertiary: '#404040',

        content: '#262421',
        'content-secondary': '#302e2c',
        'content-tertiary': '#24221e',
        background: '#161512', // colors.neutral['900'] // '#312e2b' // '#262421'

        'theme-red': colors.red['600'],
        'theme-orange': 'rgb(214 79 0)',
        'theme-yellow': '#bf811d',
        'theme-green': '#629924',

        'board-light': '#f0d9b5',
        'board-dark': '#b58863',
        'last-move': 'rgba(155, 199, 0, 0.41)',
        'active-square': 'rgba(20, 85, 30, 0.5)',
        'move-option': 'rgba(20, 85, 30, 0.3)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '2rem',
          xl: '4rem',
          '2xl': '6rem'
        }
      }
    }
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    plugin(({addVariant}) => {
      addVariant('slider-thumb', ['&::-webkit-slider-thumb', '&::-moz-range-thumb']);
      addVariant('scrollbar', ['&::-webkit-scrollbar']);
      addVariant('scrollbar-thumb', ['&::-webkit-scrollbar-thumb']);
    })
  ]
}
