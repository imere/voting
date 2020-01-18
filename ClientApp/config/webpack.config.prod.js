const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const { ScriptDist, Externals } = require("./config.js");

module.exports = {
  output: {
    filename: ScriptDist("[name].[hash:5].js"),
    hotUpdateChunkFilename: "[id].[hash].hot-update.js",
    pathinfo: false,
  },
  optimization: {
    noEmitOnErrors: true,
    moduleIds: "hashed",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        hot: {
          test: /[\\/]node_modules[\\/](.*hot.*)[\\/]/,
          name: "c0",
          reuseExistingChunk: true,
        },
        react: {
          test: /[\\/]node_modules[\\/](.*react.*)[\\/]/,
          name: "c01",
          reuseExistingChunk: true,
        },
        babel: {
          test: /[\\/]node_modules[\\/](.*babel.*)[\\/]/,
          name: "c1",
          reuseExistingChunk: true,
        },
        core: {
          test: /[\\/]node_modules[\\/](.*core.*)[\\/]/,
          name: "c2",
          reuseExistingChunk: true,
        },
        router: {
          test: /[\\/]node_modules[\\/](.*router.*)[\\/]/,
          name: "c3",
          reuseExistingChunk: true,
        },
        state: {
          test: /[\\/]node_modules[\\/](.*redux.*)[\\/]/,
          name: "c4",
          reuseExistingChunk: true,
        },
        loader: {
          test: /[\\/]node_modules[\\/](.*loader.*)[\\/]/,
          name: "c5",
          reuseExistingChunk: true,
        },
        http: {
          test: /[\\/]node_modules[\\/](.*(axios|fetch).*)[\\/]/,
          name: "c6",
          reuseExistingChunk: true,
        },
        aui: {
          test: /[\\/]node_modules[\\/](.*antd.*)[\\/]/,
          name: "c7",
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: (entry) => `r~${entry.name}`,
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
        canPrint: true,
      }),
    ],
  },
  performance: {
    hints: "warning",
  },
  externals: Externals,
};
