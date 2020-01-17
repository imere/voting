exports.createTsxLoader = env => {
  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: require('../../config').CacheDir,
        }
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          happyPackMode: true,
          appendTsxSuffixTo: [/\.vue$/],
          configFile: 'tsconfig.json',
        },
      },
    ],
  };
};
