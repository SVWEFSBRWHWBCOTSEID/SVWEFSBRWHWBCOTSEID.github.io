module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
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