exports.createFontLoader = (env) => ({
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  loader: "url-loader",
  options: {
    limit: 10000,
    name:
      env === "production"
        ? "fonts/[name].[contenthash:5].[ext]"
        : "fonts/[name].[ext]",
  },
});
