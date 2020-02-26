module.exports = {
  "root": true,
  "parser": "vue-eslint-parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "env": {
    "amd": true,
    "browser": true,
    "jquery": false,
    "node": true,
    "es6": true,
    "worker": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:vue/recommended",
    "prettier/@typescript-eslint"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "tsconfigRootDir": ".",
    "project": [
      "./tsconfig.json"
    ],
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "extraFileExtensions": ["vue"]
  },
  "rules": {
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "accessor-pairs": "warn",
    "array-callback-return": "warn",
    "arrow-body-style": "warn",
    "array-bracket-newline": "warn",
    "array-element-newline": "warn",
    "arrow-parens": "error",
    "arrow-spacing": "error",
    "block-scoped-var": "error",
    "block-spacing": "error",
    "brace-style": "error",
    "callback-return": "warn",
    "class-methods-use-this": "off",
    "comma-style": "error",
    "complexity": "error",
    "computed-property-spacing": "error",
    "consistent-this": "error",
    "constructor-super": "error",
    "curly": "warn",
    "default-case": "error",
    "dot-location": "warn",
    "dot-notation": "warn",
    "eol-last": "error",
    "eqeqeq": "error",
    "quotes": [
      "error",
      "double"
    ],
    "indent": [
      "error",
      2
    ],
    "jsx-quotes": "error",
    "keyword-spacing": "error",
    "new-parens": "error",
    "no-dupe-args": "error",
    "no-dupe-class-members": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-duplicate-imports": "error",
    "object-curly-newline": "error",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "quote-props": [
      "off",
      "as-needed"
    ],
    "space-before-blocks": "error",
    "space-unary-ops": "error",
    "unicode-bom": "error",
    "semi": "error",
    "no-trailing-spaces": "error"
  }
}