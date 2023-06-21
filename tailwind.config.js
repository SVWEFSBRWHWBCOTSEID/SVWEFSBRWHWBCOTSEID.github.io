const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        secondary: '#999999',
        tertiary: '#404040',
        content: '#262421',
        'content-secondary': '#302e2c',
        background: colors.neutral['900'] // '#312e2b' // '#262421' //'#161512'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '0.75rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        }
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ]
}
