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
        purpleBlue: 'rgba(98, 96, 230, 1)',    // First color
        lightCyan: 'rgba(203, 255, 251, 1)',   // Second color
        skyBlue: 'rgba(122, 236, 247, 1)',     // Third color
      },
    },
  },
  plugins: [],
};
