module.exports = {
  process(src, filename) {
    return require('path').resolve(src, filename);
  },
};
