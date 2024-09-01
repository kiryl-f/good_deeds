/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: 'rgb(2, 0, 36)', // Custom dark blue
        lightBeige: 'rgba(212, 206, 158, 1)', // Custom light beige
        lightGreen: 'rgba(153, 210, 191, 1)', // Custom light green
      },
    },
  },
  plugins: [],
};
