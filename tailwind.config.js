module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        190: "47.5rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
