exports.createTsxLoader = env => {
  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
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
      //     // Allow to respawn a dead worker pool
      //     // respawning slows down the entire compilation
      //     // and should be set to false for development
      //     poolRespawn: false,
      //     // timeout for killing the worker processes when idle
      //     // defaults to 500 (ms)
      //     // can be set to Infinity for watching builds to keep workers alive
      //     poolTimeout: 2000,
      //     // number of jobs the poll distributes to the workers
      //     // defaults to 200
      //     // decrease of less efficient but more fair distribution
      //     poolParallelJobs: 50,
      //     // name of the pool
      //     // can be used to create different pools with elsewise identical options
      //     name: "ts"
      //   }
      // },
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: require('../../config').CacheDir(),
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
