const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

exports.createCssLoader = env => {
  return {
    test: /\.css$/,
    use: [
      {
        loader: MiniCSSExtractWebpackPlugin.loader,
      },
      {
        loader: 'css-loader',
      },
      'postcss-loader',
    ],
  };
};
