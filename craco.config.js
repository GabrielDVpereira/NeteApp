const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '_': path.resolve(__dirname, 'src'),
    },
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};