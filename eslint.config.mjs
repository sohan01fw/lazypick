import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } }, // Added node globals
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      eslintPluginPrettier,
      unusedImports,
    },
    rules: {
      quotes: ["error", "double"],
      semi: "error",
      "prefer-const": "error",
      "no-console": "warn",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "no-unused-vars": "off",
      "no-undef": "error",
    },

    settings: {
      react: {
        version: "detect", // Automatically detects the React version
      },
    },
    // ... other configurations
  },
];
