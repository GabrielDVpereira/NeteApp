const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      colors: {
        primary: {
          DEFAULT: colors.indigo[500],
          dark: colors.indigo[700],
          contrast:colors.white
        },
        secondary: {
          DEFAULT: colors.purple[200],
          dark: colors.purple[400],
          contrast: colors.purple[700]
        },
        error: {
          DEFAULT: colors.red[500],
          dark: colors.red[700],
          contrast: colors.white
        }
      }
     },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }