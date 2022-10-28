const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      colors: {
        primary: {
          DEFAULT: colors.red[500],
          dark: colors.red[700],
          contrast: colors.white
        },
        secondary: {
          DEFAULT: '#AB92BF',
          dark: '#655A7C',
          contrast: colors.white
        },
        error: {
          DEFAULT: colors.red[500],
          dark: colors.red[700],
          contrast: colors.white
        },
        success: {
          DEFAULT: '#339989',
          dark: '#246B60',
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