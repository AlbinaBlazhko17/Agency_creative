/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.js', './src/**/*.css'],
  theme: {
    extend: {
      colors: {
        black: '#1D1D1D',
        grey: '#464646',
        primary: '#377DFF',
      },
    },
  },
  plugins: [],
};
