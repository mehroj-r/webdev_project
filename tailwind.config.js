/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.html", // All HTML files inside views folder
    "./src/views/**/*.{js,ts,jsx,tsx}", // If you have JavaScript/React files
    "./src/views/main/style/main.css", // Ensure Tailwind processes this file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
