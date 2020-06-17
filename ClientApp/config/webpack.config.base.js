const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
// const DashboardPlugin = require("webpack-dashboard/plugin");
// const BuildNotifier = require('webpack-build-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const StylelintPlugin = require('stylelint-webpack-plugin');
// const HardSourcePlugin = require("hard-source-webpack-plugin");
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CombineManifestPlugin = require('webpack-combine-manifest-plugin');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const WebpackMerge = require('webpack-merge');

const {
  OUTPUT_PATH,
  PUBLIC_PATH,
  DEV_HOST,
  DEV_PORT,
  CssDist
} = require('./config.js');

const {
  EslintLoader,
  PugLoader,
  CssLoader,
  LessLoader,
  ScssLoader,
  ScssModuleLoader,
  SassLoader,
  BabelLoader,
  ImageLoader,
  MediaLoader,
  FontLoader,
  VueLoader,
} = require('./utils/loaders');

const ENVS = [
  'production',
  'development'
];
const args = require('yargs-parser')(process.argv.slice(2));
const currentEnv = (ENVS.includes(args.mode)) ? args.mode : 'development';
const isProd = currentEnv === 'production';
require('node-bash-title')(currentEnv);

if (isProd) {
  ['./dist'].forEach((name) => {
    if (fs.existsSync(name)) {
      fs.rmdirSync(name, { 'recursive': true });
    }
  });
}

const baseConfig = {
  mode: currentEnv,
  // 'stats': 'errors-warnings',
  entry: {
    app: './web/src/index.tsx',
    callback: './web/src/framework/AuthCallback/index.ts',
  },
  output: {
    publicPath: PUBLIC_PATH,
    path: OUTPUT_PATH,
  },
  devServer: {
    quiet: true,
    host: DEV_HOST,
    port: DEV_PORT,
    historyApiFallback: {
      rewrites: [
        // {
        //   'from': /^\/auth-callback$/,
        //   'to': '/auth-callback.html',
        // },
        {
          'from': /.*/,
          'to': '/index.html',
        },
      ],
    },
  },
  module: {
    // "noParse": /jquery|lodash|moment|immutable/,
    rules: [
      EslintLoader(currentEnv),
      PugLoader(currentEnv),
      CssLoader(currentEnv),
      LessLoader(currentEnv),
      ScssLoader(currentEnv),
      ScssModuleLoader(currentEnv),
      SassLoader(currentEnv),
      BabelLoader(currentEnv),
      ImageLoader(currentEnv),
      MediaLoader(currentEnv),
      FontLoader(currentEnv),
      VueLoader(currentEnv),
    ],
  },
  resolve: {
    symlinks: false,
    extensions: [
      '.vue',
      '.tsx',
      '.ts',
      '.mjs',
      '.jsx',
      '.js',
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'hoist-non-react-statics': path.resolve('./node_modules/hoist-non-react-statics'),
      'react-is': path.resolve('./node_modules/react-is'),
    },
    // "modules": [
    //   path.resolve("./"),
    //   path.resolve("./node_modules"),
    // ],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.json'
      }),
    ]
  },
  plugins: [
    // new DashboardPlugin(),
    // new BuildNotifier({
    //   title: currentEnv.toUpperCase(),
    //   showDuration: true,
    //   excludeWarnings: true,
    //   suppressSuccess: true,
    // }),
    new webpack.WatchIgnorePlugin({
      paths: [/\.d\.tsx?$/]
    }),
    // new FriendlyErrorsWebpackPlugin(),
    // new HardSourcePlugin({
    //   // Either an absolute path or relative to webpack's options.context.
    //   cacheDirectory: require("path").resolve(__dirname, "../node_modules/.cache/hard-source/[confighash]"),
    //   // Either a string of object hash function given a webpack config.
    //   configHash: function (webpackConfig) {
    //     // node-object-hash on npm can be used to build this.
    //     return require("node-object-hash")({ sort: false }).hash(webpackConfig);
    //   },
    //   // Either false, a string, an object, or a project hashing function.
    //   environmentHash: {
    //     root: process.cwd(),
    //     directories: [],
    //     files: [
    //       "package-lock.json",
    //       "yarn.lock"
    //     ],
    //   },
    //   // An object.
    //   info: {
    //     // 'none' or 'test'.
    //     mode: "none",
    //     // 'debug', 'log', 'info', 'warn', or 'error'.
    //     level: "error",
    //   },
    //   // Clean up large, old caches automatically.
    //   cachePrune: {
    //     // Caches younger than `maxAge` are not considered for deletion. They must
    //     // be at least this (default: 2 days) old in milliseconds.
    //     maxAge: 5 * 60 * 1000,
    //     // All caches together must be larger than `sizeThreshold` before any
    //     // caches will be deleted. Together they must be at least this
    //     // (default: 50 MB) big in bytes.
    //     sizeThreshold: 50 * 1024 * 1024
    //   },
    // }),
    new DuplicatePackageCheckerPlugin(),
    new StylelintPlugin({
      configFile: undefined,
      files: ['**/*.{vue,html,css,sss,less,scss,sass}'],
      fix: false,
    }),
    new HtmlPlugin({
      templateParameters: {
        PUBLIC_PATH,
        isProd,
        id: '__root',
      },
      filename: 'index.html',
      template: './web/public/index.html',
      inject: true,
      favicon: './web/public/favicon.ico',
      excludeChunks: [
        'r~callback',
        'callback'
      ],
      chunksSortMode: 'auto',
    }),
    new HtmlPlugin({
      templateParameters: {
        PUBLIC_PATH,
        isProd,
        id: 'callback',
      },
      filename: 'auth-callback.html',
      template: './web/public/index.html',
      inject: true,
      favicon: './web/public/favicon.ico',
      excludeChunks: [
        'r~app',
        'app'
      ],
      chunksSortMode: 'auto',
    }),
    new CopyPlugin({
      patterns: [
        { 'from': './web/public/robots.txt', 'to': '.' },
        { 'from': './web/public/*.png', 'to': '.', 'flatten': true },
      ]
    }),
    new MiniCSSExtractPlugin({
      filename: isProd
        ? CssDist('[name].[contenthash:5].css')
        : CssDist('[name].css'),
      chunkFilename: isProd
        ? CssDist('[name].[contenthash:5].css')
        : CssDist('[name].css'),
      ignoreOrder: false,
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      'clientsClaim': true,
      'skipWaiting': true,
    }),
    new BundleAnalyzerPlugin({
      'analyzerMode': 'static',
      'reportFilename': require('path').resolve(__dirname, '../docs/bundle-analyzer', 'report.html'),
      'openAnalyzer': false,
    }),
    new VueLoaderPlugin(),
    new AntdDayjsWebpackPlugin({
      replaceMoment: false,
    }),
    new CombineManifestPlugin({
      from: [
        path.join(__dirname, '../', 'web/public/manifest.json'),
        path.join(__dirname, '../', 'dist/manifest.json'),
      ],
      to: path.join(__dirname, '../', 'dist/manifest.json')
    })
  ],
  node: false,
};

const mergedConfig = WebpackMerge(baseConfig, require(`./webpack.config.${isProd ? 'prod' : 'dev'}.js`));

module.exports = isProd
  ?
  mergedConfig
  // new SpeedMeasurePlugin({
  //   outputFormat: 'human'
  // }).wrap(mergedConfig)
  :
  mergedConfig;

