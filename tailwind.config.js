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
        background: colors.neutral['900'] // '#302e2c' // '#312e2b' // '#262421' //'#161512'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '2rem',
          sm: '4rem',
          lg: '6rem',
          xl: '12rem',
          '2xl': '16rem',
        }
      }
    },
  },
  plugins: [],
}
