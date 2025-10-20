/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D3CFF",
          50: "#EEF0FF",
          100: "#DDE0FF",
          200: "#B9BFFF",
          300: "#959EFF",
          400: "#707DFF",
          500: "#4C5CFF",
          600: "#2D3CFF",
          700: "#1F2ACC",
          800: "#151E99",
          900: "#0D1366",
        },
        accent: {
          purple: "#7E3AF2",
          red: "#FF1D5E",
        },
        carbon: {
          blue: "#0A1B2B",
        },
      },
    },
  },
  plugins: [],
}
