/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Add your file paths here
  ], // Add TypeScript and JSX files
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
        rowdies: ["Rowdies", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        archivo: ["Archivo", "sans-serif"],
        bitter: ["Bitter", "serif"],
      },
      colors: {
        cream: "#FAFAF0",
        darkGreen: "#256B4A",
        mainGreen: "#22A768",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
