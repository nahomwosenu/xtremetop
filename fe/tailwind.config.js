const flowbite = require('flowbite-react/tailwind')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        medium: ['"customMedium"', "sans-serif"],
        black: ['"customBlack"', "sans-serif"],
        book: ['"customBook"', "sans-serif"],
        roman: ['"customRoman"', "sans-serif"],
        avenir: ['"avenirRoman","roman"'],
        franklin: ['"franklinGhotic", "roman"']
      }
    }
  },
  plugins: [
    flowbite.plugin(),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".font-custom-medium": { fontFamily: '"customMedium"' },
        ".font-custom-black": { fontFamily: '"customBlack"' },
        ".font-custom-book": { fontFamily: '"customBook"' },
        ".font-custom-roman": { fontFamily: '"customRoman"' },
      })
    })
  ]
}
