const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

exports.createScssLoader = env => {
  return {
    test: /\.scss$/,
    use: [
      {
        loader:
          env === 'production'
            ? MiniCSSExtractWebpackPlugin.loader
            : 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          implementation: require("sass"),
        },
      },
    ],
  };
};
