// @ts-nocheck
const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

exports.createScssLoader = env => {
  return {
    test: /\.scss$/,
    use: (env === 'production' ? [
      {
        loader: MiniCSSExtractWebpackPlugin.loader,
      },
    ] : [
        // {
        //   loader: "thread-loader",
        //   options: {
        //        // node-sass has a bug which blocks threads from the Node.js thread pool.
        //     workerParallelJobs: 2,
        //     name: "css"
        //   }
        // },
        {
          loader: 'style-loader',
        },
      ]
    ).concat([
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: require('../../config').CacheDir(),
        }
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2
        }
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          implementation: require("sass"),
        },
      },
    ]),
  };
};
