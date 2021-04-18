module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin:{
        98:"98vw"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
