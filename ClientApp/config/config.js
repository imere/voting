const path = require("path");

module.exports = {
  "OUTPUT_PATH": path.resolve(__dirname, "../dist"),
  "PUBLIC_PATH": "/",
  "FALLBACK_HOST": "0.0.0.0",
  "FALLBACK_PORT": 5000,
  "FALLBACK_UURI": "mongodb://127.0.0.1:27017/test",
  "FALLBACK_SURI": "mongodb://127.0.0.1:27017/session",
  "CssDist": (name) => path.posix.join("assets", "styles", name),
  "ScriptDist": (name) => path.posix.join("assets", "scripts", name),
  "CacheDir": require("path").resolve(__dirname, "../node_modules/.cache/cache-loader"),
  "Externals": [
    {
      "react": "React",
      "react-dom": "ReactDOM",
      "react-router": "ReactRouter",
      "react-router-dom": "ReactRouterDOM",
      "redux": "Redux",
      "redux-thunk": "ReduxThunk",
    },
  ]
};
