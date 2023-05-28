/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'absenior-orange': '#EC6D41',
      'absenior-background': '#508E92',
      'absenior-orange-hover': '#D7572B',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      red: colors.red,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    extend: {},
  },
  plugins: [],
}

