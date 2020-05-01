exports.createTsxLoader = (env) => ({
  'test': /\.tsx?$/,
  'exclude': /node_modules/,
  'use': [
    {
      'loader': 'ts-loader',
      'options': {
        'transpileOnly': true,
        'happyPackMode': true,
        'appendTsxSuffixTo': [/\.vue$/],
        'configFile': undefined,
      },
    },
  ],
});
