const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const { ScriptDist, Externals } = require('./config.js');

function groups() {
  const tests = [
    '(.*hot.*)',
    'oidc-client',
    'object-hash',
    '.*babel.*',
    '.*(axios|fetch).*',
    'react',
    'vue',
    '.*antd.*',
  ];
  const ret = {};
  let i = 0;
  for (const str of tests) {
    const name = `c${i}`;
    ret[name] = {
      test: RegExp(`[\\\\/]node_modules[\\\\/]${str}`),
      name,
      reuseExistingChunk: true,
    };
    i++;
  }
  return ret;
}

module.exports = {
  'output': {
    'filename': ScriptDist('[name].[hash:5].js'),
    'hotUpdateChunkFilename': '[id].[hash].hot-update.js',
    'pathinfo': false,
  },
  'optimization': {
    'noEmitOnErrors': true,
    'moduleIds': 'hashed',
    'splitChunks': {
      'chunks': 'all',
      'maxInitialRequests': Infinity,
      'minSize': 0,
      'cacheGroups': {
        'vendors': {
          'test': /[\\/]node_modules[\\/]/,
          'name': 'vendor',
          'reuseExistingChunk': true,
        },
        'commons': {
          'chunks': 'initial',
          'name': 'common',
          'minChunks': 1,
          'maxInitialRequests': Infinity,
          'minSize': 0,
        },
        ...groups(),
      },
    },
    'runtimeChunk': {
      'name': (entry) => `r~${entry.name}`,
    },
    'minimize': true,
    'minimizer': [
      new TerserWebpackPlugin({
        'terserOptions': {
          'output': {
            'comments': false,
          },
        },
        'extractComments': false,
      }),
      new OptimizeCSSAssetsWebpackPlugin({
        'assetNameRegExp': /\.css$/g,
        'cssProcessor': require('cssnano'),
        'cssProcessorPluginOptions': {
          'preset': [
            'default',
            {
              'discardComments': {
                'removeAll': true,
              },
            },
          ],
        },
        'canPrint': false,
      }),
    ],
  },
  'performance': {
    'hints': false,
  },
  'externals': Externals,
};
