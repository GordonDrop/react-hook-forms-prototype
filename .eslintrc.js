module.exports = {
  extends: ["plugin:jest/recommended"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "quotes": ["error", "single"],
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: ["airbnb-typescript-prettier", "plugin:jest/recommended"],
      rules: {
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-empty-interface": "warn",
      },
      settings: {
        "import/resolver": {
          node: {
            moduleDirectory: ["node_modules", "src/"],
          },
        },
      },
    },
  ],
};
