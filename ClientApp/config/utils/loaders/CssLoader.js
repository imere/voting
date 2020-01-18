// @ts-nocheck
const MiniCSSExtractWebpackPlugin = require("mini-css-extract-plugin");

exports.createCssLoader = (env) => ({
  "test": /\.css$/,
  "use": (env === "production"
    ? [
      {
        "loader": MiniCSSExtractWebpackPlugin.loader,
      },
    ]
    : [
      {
        "loader": "style-loader",
      },
    ]
  ).concat(
    [
      {
        "loader": "cache-loader",
        "options": {
          "cacheDirectory": require("../../config").CacheDir,
        }
      },
      {
        "loader": "css-loader",
        "options": {
          "importLoaders": 1
        }
      },
      "postcss-loader",
    ]),
});
