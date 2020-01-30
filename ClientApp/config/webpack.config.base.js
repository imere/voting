const fs = require("fs");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
// const BuildNotifier = require('webpack-build-notifier');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
// const HardSourcePlugin = require('hard-source-webpack-plugin');

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const WebpackMerge = require("webpack-merge");

const {
  OUTPUT_PATH,
  PUBLIC_PATH,
  FALLBACK_PORT,
  CssDist
} = require("./config.js");

const {
  EslintLoader,
  PugLoader,
  CssLoader,
  LessLoader,
  ScssLoader,
  SassLoader,
  BabelLoader,
  ImageLoader,
  MediaLoader,
  FontLoader,
} = require("./utils/loaders");

const ENVS = [
  "production",
  "development"
];
const args = require("yargs-parser")(process.argv.slice(2));
const currentEnv = (ENVS.includes(args.mode)) ? args.mode : "development";
const isProd = currentEnv === "production";
require("node-bash-title")(currentEnv);

if (isProd) {
  ["./dist"].forEach((name) => {
    if (fs.existsSync(name)) {
      fs.rmdirSync(name, { "recursive": true });
    }
  });
}

const baseConfig = {
  "entry": {
    "app": "./web/src/index.tsx",
  },
  "output": {
    "publicPath": PUBLIC_PATH,
    "path": OUTPUT_PATH,
  },
  "devServer": {
    "port": process.env.PORT || FALLBACK_PORT,
    "historyApiFallback": {
      "rewrites": [
        {
          "from": /.*/,
          "to": "/index.html",
        },
      ],
    },
  },
  "module": {
    // "noParse": /jquery|lodash|moment|immutable/,
    "rules": [
      EslintLoader(currentEnv),
      PugLoader(currentEnv),
      CssLoader(currentEnv),
      LessLoader(currentEnv),
      ScssLoader(currentEnv),
      SassLoader(currentEnv),
      BabelLoader(currentEnv),
      ImageLoader(currentEnv),
      MediaLoader(currentEnv),
      FontLoader(currentEnv),
    ],
  },
  "resolve": {
    "symlinks": false,
    "extensions": [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
    ],
    "plugins": [
      new TsconfigPathsPlugin({
        "configFile": "tsconfig.json"
      }),
    ]
  },
  "plugins": [
    new ForkTsCheckerPlugin({
      "checkSyntacticErrors": true,
      "memoryLimit": 512,
      "workers": 1,
      "silent": false,
    }),
    new ProgressBarPlugin(),
    // new BuildNotifier({
    //   title: currentEnv.toUpperCase(),
    //   showDuration: true,
    //   excludeWarnings: true,
    //   suppressSuccess: true,
    // }),
    new webpack.WatchIgnorePlugin([
      /\.js$/,
      /\.d\.tsx?$/
    ]),
    // new HardSourcePlugin({
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
    new HtmlPlugin({
      "filename": "index.html",
      "template": "./web/public/index.html",
      "inject": true,
      PUBLIC_PATH,
      "favicon": "./web/public/favicon.ico",
      "minify": {
        "removeComments": isProd,
        "collapseWhitespace": isProd,
        "removeAttributeQuotes": isProd,
      },
      "chunksSortMode": "dependency",
    }),
    new CopyPlugin([
      { "from": "./web/public/robots.txt", "to": "." },
      { "from": "./web/public/*.png", "to": ".", "flatten": true },
    ]),
    new MiniCSSExtractPlugin({
      "filename": isProd
        ? CssDist("[name].[contenthash:5].css")
        : CssDist("[name].css"),
      "chunkFilename": isProd
        ? CssDist("[name].[contenthash:5].css")
        : CssDist("[name].css"),
      "ignoreOrder": false,
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      "clientsClaim": true,
      "skipWaiting": true,
    }),
    new BundleAnalyzerPlugin({
      "analyzerMode": "static",
      "reportFilename": require("path").resolve(__dirname, "../docs/bundle", "report.html"),
      "openAnalyzer": false,
    }),
  ],
  "node": {
    "setImmediate": false,
    "dgram": "empty",
    "fs": "empty",
    "net": "empty",
    "tls": "empty",
    "child_process": "empty",
  },
};

module.exports = new SpeedMeasurePlugin().wrap(
  WebpackMerge(baseConfig, require(`./webpack.config.${isProd ? "prod" : "dev"}.js`))
);
