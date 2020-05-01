const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

exports.createScssModuleLoader = (env) => ({
  'test': /\.module\.scss$/,
  'use': (env === 'production'
    ? [
      {
        'loader': MiniCSSExtractWebpackPlugin.loader,
      },
    ]
    : [
      {
        'loader': 'style-loader',
      },
    ]
  ).concat([
    {
      'loader': 'css-loader',
      'options': {
        'importLoaders': 2,
        'modules': {
          'mode': 'local',
          'localIdentName':
            env === 'production'
              ? '[hash:base64:5]'
              : '[path][name]__[local]',
          'context': require('path').resolve(__dirname, '../../../web/src'),
        },
      }
    },
    'postcss-loader',
    {
      'loader': 'sass-loader',
      'options': {
        'implementation': require('sass'),
      },
    },
  ]),
});
