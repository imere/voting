exports.createPugLoader = env => {
  return {
    test: /\.pug$/,
    loader: 'pug-plain-loader',
  };
};
