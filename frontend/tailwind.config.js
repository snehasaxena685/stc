/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "gov-green": "#1B5E20",
        "gov-green-light": "#2E7D32",
        "gov-green-soft": "#A5D6A7",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)",
        deep: "0 12px 32px rgba(0,0,0,0.14)",
      },
    },
  },
  plugins: [],
};
