const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const { ScriptDist, Externals } = require('./config.js');

module.exports = {
  output: {
    filename: ScriptDist('[name].[hash:5].js'),
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        hot: {
          test: /[\\/]node_modules[\\/](.*hot.*)[\\/]/,
          name: 'ch',
          reuseExistingChunk: true,
        },
        babel: {
          test: /[\\/]node_modules[\\/](.*(babel|core|runtime).*)[\\/]/,
          name: 'polyfill',
          reuseExistingChunk: true,
        },
        router: {
          test: /[\\/]node_modules[\\/](.*router.*)[\\/]/,
          name: 'cu',
          reuseExistingChunk: true,
        },
        state: {
          test: /[\\/]node_modules[\\/](.*redux.*)[\\/]/,
          name: 'cs',
          reuseExistingChunk: true,
        },
        loader: {
          test: /[\\/]node_modules[\\/](.*loader.*)[\\/]/,
          name: 'cl',
          reuseExistingChunk: true,
        },
        http: {
          test: /[\\/]node_modules[\\/](.*(axios|fetch).*)[\\/]/,
          name: 'ct',
          reuseExistingChunk: true,
        },
        aui: {
          test: /[\\/]node_modules[\\/](.*antd.*)[\\/]/,
          name: 'cd',
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: entry => `r~${entry.name}`,
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
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: [
            'default',
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
    hints: 'warning',
  },
  externals: Externals(),
};
