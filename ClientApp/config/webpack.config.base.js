const webpack = require('webpack');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BuildNotifier = require('webpack-build-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

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

const ENVS = ['production', 'development']
const args = require('yargs-parser')(process.argv.slice(2));
const currentEnv = (ENVS.includes(args.mode)) ? args.mode : 'development';
const isProd = currentEnv === 'production';
require('node-bash-title')(currentEnv);

const baseConfig = {
  entry: {
    app: './web/src/index.tsx',
  },
  output: {
    publicPath: PUBLIC_PATH,
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    pathinfo: false,
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
    noParse: /jquery|lodash|moment|immutable/,
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
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.jsx',],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      memoryLimit: 512,
      workers: 1,
      silent: false,
    }),
    new ProgressBarWebpackPlugin(),
    // new BuildNotifier({
    //   title: currentEnv.toUpperCase(),
    //   showDuration: true,
    //   excludeWarnings: true,
    //   suppressSuccess: true,
    // }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false, // resolve conflict with `CopyWebpackPlugin`
    }),
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.tsx?$/]),
    // new HardSourceWebpackPlugin({
    //   // Either an absolute path or relative to webpack's options.context.
    //   cacheDirectory: './node_modules/.cache/hard-source/[confighash]',
    //   // Either a string of object hash function given a webpack config.
    //   configHash: function (webpackConfig) {
    //     // node-object-hash on npm can be used to build this.
    //     return require('node-object-hash')({ sort: false }).hash(webpackConfig);
    //   },
    //   // Either false, a string, an object, or a project hashing function.
    //   environmentHash: {
    //     root: process.cwd(),
    //     directories: [],
    //     files: ['package-lock.json', 'yarn.lock'],
    //   },
    //   // An object.
    //   info: {
    //     // 'none' or 'test'.
    //     mode: 'none',
    //     // 'debug', 'log', 'info', 'warn', or 'error'.
    //     level: 'error',
    //   },
    //   // Clean up large, old caches automatically.
    //   cachePrune: {
    //     // Caches younger than `maxAge` are not considered for deletion. They must
    //     // be at least this (default: 2 days) old in milliseconds.
    //     maxAge: 2 * 24 * 60 * 60 * 1000,
    //     // All caches together must be larger than `sizeThreshold` before any
    //     // caches will be deleted. Together they must be at least this
    //     // (default: 50 MB) big in bytes.
    //     sizeThreshold: 50 * 1024 * 1024
    //   },
    // }),
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
      filename: isProd
        ? CssDist('[name].[contenthash:5].css')
        : CssDist('[name].css'),
      chunkFilename: isProd
        ? CssDist('[name].[contenthash:5].css')
        : CssDist('[name].css'),
      ignoreOrder: false,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: require('path').resolve(__dirname, '../docs/bundle', 'report.html'),
      openAnalyzer: false,
    }),
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
);
