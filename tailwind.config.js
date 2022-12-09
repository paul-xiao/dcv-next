module.exports = {
  content: ["./src/**/*.{vue,ts}", "./examples/**/*.{vue,ts}"],
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
