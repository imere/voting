module.exports = {
  CssLoader: require('./CssLoader').createCssLoader,
  FontLoader: require('./FontLoader').createFontLoader,
  ImageLoader: require('./ImageLoader').createImageLoader,
  MediaLoader: require('./MediaLoader').createMediaLoader,
  PugLoader: require('./PugLoader').createPugLoader,
  SassLoader: require('./SassLoader').createSassLoader,
  ScssLoader: require('./ScssLoader').createScssLoader,
  TsxLoader: require('./TsxLoader').createTsxLoader,
}
