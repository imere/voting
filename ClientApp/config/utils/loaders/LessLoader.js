// @ts-nocheck
const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

exports.createLessLoader = env => {
  return {
    test: /\.less$/,
    use: (env === 'production'
      ? [
        {
          loader: MiniCSSExtractWebpackPlugin.loader,
        },
      ]
      : [
        {
          loader: 'style-loader',
        },
      ]
    ).concat([
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: require('../../config').CacheDir,
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
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          strictMath: false,
          noIeCompat: false,
        }
      },
    ]),
  };
};
