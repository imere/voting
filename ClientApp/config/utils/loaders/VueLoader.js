const MiniCSSExtractWebpackPlugin = require("mini-css-extract-plugin");

exports.createVueLoader = (env) => {
  const isProd = "production" === env;
  return {
    test: /\.vue$/,
    loader: "vue-loader",
    options: {
      loaders: [
        {
          ts: "babel-loader!ts-loader",
        },
        {
          loader: "vue-style-loader",
          options: {
            sourceMap: !isProd,
          },
        },
        {
          loader: MiniCSSExtractWebpackPlugin.loader,
        },
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            sourceMap: !isProd,
          },
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: !isProd,
          },
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: !isProd,
          },
        },
      ],
      transformToRequire: {
        video: [
          "src",
          "poster"
        ],
        source: "src",
        img: "src",
        image: "xlink:href",
      },
    }
  };
};
