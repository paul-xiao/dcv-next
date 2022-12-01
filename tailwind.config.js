module.exports = {
  content: ["./src/**/*.{vue,ts}"],
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
