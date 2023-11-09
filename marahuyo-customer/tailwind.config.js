/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      x: "1350px",
      xl: "1440px",
    },
    colors: {
      "custom-white": "#FFFFFF",
      "custom-red": "#A40000",
      "custom-yellow": "#C08D09",
      "custom-blue": "#2E2C9B",
      "custom-light": "#FFFBED",
      "custom-orange": "#C14C32",
      "custom-gray": "#C1C1C1",
      "custom-lblue": "#1DA1F2",
      "custom-green": "#91D755",
      "custom-redd": "#C81E1E",
      "custom-greens": "#539165",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      kagitingan: ["Kagitingan-Bold", "sans-serif"],
      alta: ["Alta-Regular", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
