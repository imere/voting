const webpack = require('webpack');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BuildNotifier = require('webpack-build-notifier');
const DeepScopePlugin = require('webpack-deep-scope-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const WebpackMerge = require('webpack-merge');

const {
  PUBLIC_PATH,
  FALLBACK_PORT,
  CssDist
} = require('./config.js');

const {
  PugLoader,
  CssLoader,
  ScssLoader,
  SassLoader,
  TsxLoader,
  ImageLoader,
  MediaLoader,
  FontLoader,
} = require('./utils/loaders');

const args = require('yargs-parser')(process.argv.slice(2));
const currentEnv = args.mode || 'development';
const isProd = currentEnv === 'production';
require('node-bash-title')(currentEnv);

const baseConfig = {
  entry: {
    app: './web/src/index.tsx',
  },
  output: {
    publicPath: PUBLIC_PATH,
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
  },
  devServer: {
    port: process.env.PORT || FALLBACK_PORT,
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: '/index.html',
        },
      ],
    },
  },
  module: {
    rules: [
      PugLoader(currentEnv),
      CssLoader(currentEnv),
      ScssLoader(currentEnv),
      SassLoader(currentEnv),
      TsxLoader(currentEnv),
      ImageLoader(currentEnv),
      MediaLoader(currentEnv),
      FontLoader(currentEnv),
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx',],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false, // resolve conflict with `CopyWebpackPlugin`
    }),
    new ProgressBarWebpackPlugin(),
    new BuildNotifier({
      title: currentEnv,
      suppressSuccess: true,
    }),
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './web/public/index.html',
      inject: true,
      PUBLIC_PATH,
      favicon: './web/public/favicon.ico',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
        removeAttributeQuotes: isProd,
      },
      chunksSortMode: 'dependency',
    }),
    new CopyWebpackPlugin([
      { from: './web/public/robots.txt', to: '.' },
      { from: './web/public/*.png', to: '.', flatten: true },
    ]),
    new MiniCSSExtractWebpackPlugin({
      filename: isProd ? CssDist('[name].[contenthash:5].css') : CssDist('[name].css'),
      chunkFilename: isProd
        ? CssDist('[name].[contenthash:5].css')
        : CssDist('[name].css'),
    }),
    // new DeepScopePlugin(),
    new DashboardPlugin(),
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

module.exports = new SpeedMeasureWebpackPlugin().wrap(
  WebpackMerge(baseConfig, require(`./webpack.config.${isProd ? 'prod' : 'dev'}.js`))
);;
