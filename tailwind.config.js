/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          100: '#A70104',
          200: '#A70104',
          300: '#A70104',
          400: '#A70104',
          500: '#A70104',
          600: '#A70104',
          700: '#A70104',
          800: '#A70104',
          900: '#A70104',
        }
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
