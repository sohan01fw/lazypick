import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import tailwind from "eslint-plugin-tailwindcss";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } }, // Added node globals
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...tailwind.configs["flat/recommended"], // Flat config for Tailwind
  {
    plugins: {
      prettier: eslintPluginPrettier, // Using 'prettier' here for ESLint-Prettier integration
      unusedImports, // Detects unused imports
      tailwindcss: tailwind, // Ensure the Tailwind plugin is activated
    },
    rules: {
      // General formatting rules
      quotes: ["error", "double"], // Enforce double quotes
      semi: "error", // Enforce semicolons
      "jsx-quotes": ["error", "prefer-double"],
      "prefer-const": "error", // Prefer `const` over `let` where possible
      "no-console": "warn", // Warn about `console` statements
      "no-undef": "error", // Disallow undefined variables

      // React-specific rules
      "react/prop-types": "off", // Disables prop-types checks (often used with TypeScript)
      "react/jsx-uses-react": "off", // React 17+ doesn't require React in scope
      "react/react-in-jsx-scope": "off", // Same as above
      "react-hooks/exhaustive-deps": "off", // Disabling exhaustive deps warnings

      // Disable ESLint's unused vars, since we use `eslint-plugin-unused-imports`
      "no-unused-vars": "off",

      // Tailwind rules
      "tailwindcss/classnames-order": "warn", // Ensures Tailwind classes are ordered properly
      "tailwindcss/no-custom-classname": "off", // Allows custom class names
      "tailwindcss/no-contradicting-classname": "error", // Detects contradicting Tailwind classes
    },

    settings: {
      // React settings
      react: {
        version: "detect", // Automatically detect React version
      },

      // Tailwind CSS settings
      tailwindcss: {
        callees: ["classnames", "clsx", "ctl"], // Functions that process class names
        config: "tailwind.config.js", // Path to the Tailwind configuration
        cssFiles: [
          "**/*.css", // Scan all CSS files
          "!**/node_modules", // Exclude node_modules
          "!**/.*", // Exclude dot files
          "!**/dist", // Exclude dist directory
          "!**/build", // Exclude build directory
        ],
        cssFilesRefreshRate: 5000, // How often to refresh CSS files (milliseconds)
        removeDuplicates: true, // Removes duplicate classes
        skipClassAttribute: false, // Do not skip the `class` attribute
        whitelist: [], // Add custom classnames to whitelist if needed
        tags: [], // Custom tags for specific Tailwind usage
        classRegex: "^class(Name)?$", // Matches `class` or `className` attributes
      },
    },
  },
];
