/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.html", // All HTML files inside views folder
    "./src/views/**/*.{js,ts,jsx,tsx}", // If you have JavaScript/React files
    "./src/views/main/style/main.css", // Ensure Tailwind processes this file
  ],
  theme: {
    extend: {
      animation: {
        move: "moveBg 5s infinite ease-in-out alternate",
      },
      keyframes: {
        moveBg: {
          "0%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(30px) translateX(20px)" },
          "100%": { transform: "translateY(0px) translateX(0px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
