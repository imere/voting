const { compilerOptions } = require("./tsconfig.json");
const alias = {};
if (compilerOptions) {
  const { paths } = compilerOptions;
  if (paths) {
    Object.keys(paths).forEach((k) => alias[k] = paths[k][0]);
  }
}

module.exports = {
  "presets": [
    "typescript-vue",
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["."],
        "alias": alias
      }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false,
        "version": "^7.8.4"
      }
    ],
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      }
    ],
  ],
  "env": {
    "production": {}
  }
};
