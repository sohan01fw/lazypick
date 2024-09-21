import { relative } from "path";
import { ESLint } from "eslint";

const removeIgnoredFiles = async (files) => {
  const cwd = process.cwd();
  const eslint = new ESLint();
  const relativePaths = files.map((file) => relative(cwd, file));
  const isIgnored = await Promise.all(relativePaths.map((file) => eslint.isPathIgnored(file)));
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);

  return filteredFiles.join(" ");
};

export default {
  "**/*.{js,mjs,cjs,ts,jsx,tsx,md,yml}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);

    if (!filesToLint) return []; // Avoid running the command if no files to lint

    return [
      `eslint -c eslint.config.mjs --max-warnings=0 --fix ${filesToLint}`,
      `prettier --config .prettierrc.json --write ${filesToLint}`,
    ];
  },
  "**/*.css": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);

    if (!filesToLint) return []; // Avoid running the command if no files to format

    return [`prettier --config .prettierrc.json --write ${filesToLint}`];
  },
};
