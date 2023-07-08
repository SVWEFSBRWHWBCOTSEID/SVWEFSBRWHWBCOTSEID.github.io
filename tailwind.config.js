const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

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
        secondary: '#999999',
        tertiary: '#404040',
        content: '#262421',
        'content-secondary': '#302e2c',
        'content-tertiary': '#24221e',
        background: '#161512', // colors.neutral['900'] // '#312e2b' // '#262421'
        'theme-green': '#629924',
        'theme-orange': 'rgb(214 79 0)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '0.75rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem'
        }
      }
    }
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    plugin(({addVariant}) => {
      addVariant('slider-thumb', ['&::-webkit-slider-thumb', '&::-moz-range-thumb'])
    })
  ]
}
