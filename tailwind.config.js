module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        22.5: "5.625rem",
        27: "6.75rem",
        190: "47.5rem",
      },
      colors: {
        "gray-200-6": "rgba(229, 229, 229, 0.6)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
