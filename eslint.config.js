const eslintPluginPrettier = require("eslint-plugin-prettier");

module.exports = {
  plugins: {
    prettier: eslintPluginPrettier,
  },
  languageOptions: {
    globals: {
      // Define your global variables here
      browser: true,
      es2021: true,
    },
  },
  rules: {
    "prettier/prettier": ["error", { singleQuote: false, semi: true }],
    "no-console": "warn",
  },
};
