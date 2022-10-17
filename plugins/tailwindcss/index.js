const plugin = require("tailwindcss/plugin");
const components = require("./components");
const bases = require("./base");
const pxui = plugin.withOptions(function (options = { prefix: "" }) {
  return function ({
    addBase,
    addUtilities,
    addComponents,
    e,
    theme,
    addVariant,
  }) {
    const prefix = options.prefix;
    const styles = components({ theme });
    const base = bases({ theme });
    if (prefix) {
      for (let key in styles) {
        const prefixKey = key.replace(/./, `.${prefix}-`);
        styles[prefixKey] = styles[key];
        delete styles[key];
      }
    }
    const rotateUtilities = Object.entries(theme("rotate")).map(
      (value, key) => {
        return {
          [`.${e(`rotate-${key}`)}`]: {
            transform: `rotate(${value})`,
          },
        };
      }
    );
    addVariant("pt", ({ modifySelectors, separator }) => {
      return modifySelectors(({ className }) => {
        return `.${e(`disabled${separator}${className}`)}:disabled`;
      });
    });
    addBase(base);
    addUtilities(rotateUtilities);
    addComponents(styles);
  };
});

module.exports = pxui;
