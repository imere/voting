const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

exports.createSassLoader = env => {
  return {
    test: /\.sass$/,
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
          indentedSyntax: true,
        },
      },
    ],
  };
};
