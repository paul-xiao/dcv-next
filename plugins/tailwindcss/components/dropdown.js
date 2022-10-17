module.exports = ({ theme }) => {
  return {
    ".dropdown": {
      position: "relative",
      "&>*:focus": {
        color: theme("colors.red"),
      },
    },
    ".dropdown-content": {
      display: "none",
      position: "absolute",
      top: "40px",
      left: "0px",
      width: "100px",
      color: theme("colors.gray"),
      backgroudColor: theme("colors.white"),
    },
  };
};
