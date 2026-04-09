/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3f51b5",
          secondary: "#1a237e",
          accent: "#f59e0b",
        },
      },
    },
  },
  plugins: [],
};
