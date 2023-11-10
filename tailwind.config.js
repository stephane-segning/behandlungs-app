/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['luxury']
  }
}
