const button = require("./button.js");
const icon = require("./icon.js");
const dropdown = require("./dropdown.js");
module.exports = (options) => {
  return {
    ...button(options),
    ...icon(options),
    ...dropdown(options),
  };
};
