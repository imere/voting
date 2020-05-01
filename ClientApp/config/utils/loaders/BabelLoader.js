exports.createBabelLoader = (env) => ({
  'test': /\.(j|t)sx?$/,
  'exclude': /node_modules/,
  'use': [
    // {
    //   "loader": "cache-loader",
    //   "options": {
    //     "cacheDirectory": require("../../config").CacheDir,
    //   }
    // },
    {
      'loader': 'babel-loader',
    },
  ],
});
