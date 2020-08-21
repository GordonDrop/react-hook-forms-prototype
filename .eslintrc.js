module.exports = {
  rules: {
    "import/no-extraneous-dependencies": "off",
    "quotes": ["error", "single"],
},
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: ["airbnb-typescript-prettier"],
      rules: {
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-empty-interface": "warn",
        "react/jsx-props-no-spreading": "off",
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
