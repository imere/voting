module.exports = {
  "EslintLoader": require("./EslintLoader").createEslintLoader,
  "CssLoader": require("./CssLoader").createCssLoader,
  "FontLoader": require("./FontLoader").createFontLoader,
  "ImageLoader": require("./ImageLoader").createImageLoader,
  "MediaLoader": require("./MediaLoader").createMediaLoader,
  "PugLoader": require("./PugLoader").createPugLoader,
  "SassLoader": require("./SassLoader").createSassLoader,
  "ScssLoader": require("./ScssLoader").createScssLoader,
  "LessLoader": require("./LessLoader").createLessLoader,
  "BabelLoader": require("./BabelLoader").createBabelLoader,
  "TsxLoader": require("./TsxLoader").createTsxLoader,
};
