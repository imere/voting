exports.createImageLoader = (env) => ({
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: "file-loader",
  options: {
    limit: 4000,
    name:
      env === "production"
        ? "img/[name].[contenthash:5].[ext]"
        : "img/[name].[ext]",
  },
});
