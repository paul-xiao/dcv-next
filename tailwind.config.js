module.exports = {
  content: ["./examples/**/*.{vue,js}", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@pxfed/dcui")],
};
