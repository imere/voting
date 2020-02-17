const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const { ScriptDist } = require("./config.js");

module.exports = {
  "output": {
    "filename": ScriptDist("[name].js"),
  },
  "devServer": {
    "disableHostCheck": true,
  },
  "optimization": {
    "noEmitOnErrors": true,
    "removeAvailableModules": false,
    "removeEmptyChunks": false,
    "splitChunks": {
      "chunks": "all",
      "cacheGroups": {
        "vendors": {
          "test": /[\\/]node_modules[\\/]/,
          "name": "vendor",
          "reuseExistingChunk": true,
        },
        "commons": {
          "chunks": "initial",
          "name": "common",
          "minChunks": 1,
          "maxInitialRequests": 5,
          "minSize": 0,
        },
      },
    },
    "runtimeChunk": {
      "name": (entry) => `r~${entry.name}`,
    },
  },
  "performance": {
    "hints": false,
  },
  plugins: [
    new ForkTsCheckerPlugin({
      "checkSyntacticErrors": true,
      "memoryLimit": 512,
      "workers": 1,
      "silent": false,
    }),
  ]
};
