module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // TypeScript Rules
    "@typescript-eslint/no-explicit-any": "warn", // Changed from "off" to "warn" to encourage proper typing
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],

    // Console & Debugging
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"], // Allow console.warn and console.error, but warn on console.log
      },
    ],
    "no-debugger": "warn",

    // Code Quality
    "no-var": "error", // Use const or let instead
    "prefer-const": "warn",
    "prefer-template": "warn",
    "object-shorthand": "warn",

    // React Best Practices
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
