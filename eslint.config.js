import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";

export default [
  js.configs.recommended, // Use ESLint's recommended rules
  {
    files: ["**/*.ts", "**/*.tsx"], // Apply to TypeScript files
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      ecmaVersion: "latest", // Use the latest ECMAScript version
      sourceType: "module", // Use ES modules
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // Use TypeScript plugin
      react: reactPlugin, // Use React plugin
    },
    rules: {
      "no-console": "warn", // Warn about console.log
      "no-unused-vars": "warn", // Warn about unused variables
      "react/prop-types": "off", // Disable prop-types (use TypeScript instead)
      "@typescript-eslint/no-unused-vars": "warn", // Warn about unused TypeScript variables
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
];
