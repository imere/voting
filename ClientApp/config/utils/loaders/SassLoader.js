const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

exports.createSassLoader = (env) => ({
  'test': /\.sass$/,
  'use': (env === 'production'
    ? [
      {
        'loader': MiniCSSExtractWebpackPlugin.loader,
      },
    ]
    : [
      // {
      //   loader: "thread-loader",
      //   options: {
      //        // node-sass has a bug which blocks threads from the Node.js thread pool.
      //     workerParallelJobs: 2,
      //     name: "css"
      //   }
      // },
      {
        'loader': 'style-loader',
      },
    ]
  ).concat([
    {
      'loader': 'css-loader',
      'options': {
        'importLoaders': 2,
      }
    },
    'postcss-loader',
    {
      'loader': 'sass-loader',
      'options': {
        'implementation': require('sass'),
        'indentedSyntax': true,
      },
    },
  ]),
});
