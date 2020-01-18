exports.createEslintLoader = (env) => ({
  enforce: "pre",
  test: /\.(j|t)sx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "eslint-loader",
      options: {
        cache: true,
        fix: false,
        failOnError: true,
        configFile: ".eslintrc.json",
        eslintPath: require.resolve("eslint"),
        outputReport: {
          filePath: require("path").resolve(__dirname, "../../../docs/eslint/checkstyle.xml"),
          formatter: "checkstyle",
        },
      },
    },
  ],
});
