exports.createMediaLoader = env => {
  return {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name:
        env === 'production'
          ? 'media/[name].[contenthash:5].[ext]'
          : 'media/[name].[ext]',
    },
  };
};
