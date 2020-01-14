// @ts-nocheck
const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

exports.createCssLoader = env => {
  return {
    test: /\.css$/,
    use: (env === 'production' ? [
      {
        loader: MiniCSSExtractWebpackPlugin.loader,
      },
    ] : [
        // {
        //   loader: "thread-loader",
        //   // loaders with equal options will share worker pools
        //   options: {
        //     // the number of spawned workers, defaults to (number of cpus - 1) or
        //     // fallback to 1 when require('os').cpus() is undefined
        //     // workers: 2,
        //     // number of jobs a worker processes in parallel
        //     // defaults to 20
        //     // workerParallelJobs: 50,
        //     // poolRespawn: false,
        //     // timeout for killing the worker processes when idle
        //     // defaults to 500 (ms)
        //     // can be set to Infinity for watching builds to keep workers alive
        //     // poolTimeout: 2000,
        //     // poolParallelJobs: 50,
        //     name: "css"
        //   }
        // },
        {
          loader: 'style-loader',
        },
      ]
    ).concat(
      [
        {
          loader: 'cache-loader',
          options: {
            cacheDirectory: require('../../config').CacheDir(),
          }
        },
        {
          loader: 'css-loader',
        },
        'postcss-loader',
      ]),
  };
};
