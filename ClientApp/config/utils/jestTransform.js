module.exports = {
  process(src, filename) {
    require("path").resolve(src, filename);
    return "";
  },
};
