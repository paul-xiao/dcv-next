module.exports = ({ theme }) => {
  return {
    ".btn": {
      padding: `${theme("spacing.2")} ${theme("spacing.4")}`,
      borderRadius: theme("borderRadius.md"),
      fontWeight: theme("fontWeight.600"),
    },
    ".btn-indigo": {
      backgroundColor: theme("colors.red.500"),
      color: theme("colors.white"),
      "&:hover": {
        backgroundColor: theme("colors.indigo.600"),
      },
    },
  };
};
