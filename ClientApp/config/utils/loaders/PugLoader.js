exports.createPugLoader = (env) => ({
  test: /\.pug$/,
  loader: "pug-plain-loader",
});
