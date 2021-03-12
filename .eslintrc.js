module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: ["tsconfig.json", "babel.config.js"]
  },
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": [1, {
      "extensions": [
        ".js",
        ".ts",
        ".tsx"
      ]
    }],
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "all",
        "arrowParens": "avoid",
        "endOfLine": "auto"
      }
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/extensions": ["error", "never"],
    "react/prop-types": 0,
    "react-hooks/exhaustive-deps": "off",
    "no-shadow": "off",
    "global-require":"off",
    "no-plusplus":"off",
    "@typescript-eslint/no-shadow": ["error"]
    "react/jsx-props-no-spreading": "off",
  }
};
