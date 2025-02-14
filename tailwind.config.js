/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.html", // All HTML files inside views folder
    "./src/views/**/*.{js,ts,jsx,tsx}", // If you have JavaScript/React files
    "./src/views/main/style/main.css", // Ensure Tailwind processes this file
  ],
  theme: {
    extend: {
      colors: {
        // search icon colors
        lightpurple: "#A585FA",
        mainpurple: "#4600FF",
      },
      blur: {
        400: "400px",
      },
      animation: {
        bell: "bell 0.3s ease-in-out", 
      },
      keyframes: {
        bell: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(10deg)" },
          "75%": { transform: "rotate(-10deg)" },
        },
      },
    },
  },
  plugins: [],
};
