const path = require('path');

module.exports = {
  PUBLIC_PATH: '/',
  FALLBACK_HOST: '0.0.0.0',
  FALLBACK_PORT: 5000,
  FALLBACK_UURI: 'mongodb://127.0.0.1:27017/test',
  FALLBACK_SURI: 'mongodb://127.0.0.1:27017/session',
  CssDist: sub => {
    return path.join('web', 'assets', 'styles', sub);
  },
  ScriptDist: sub => {
    return path.join('web', 'assets', 'scripts', sub);
  },
  Externals: env => [
    {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router': 'ReactRouter',
      'react-router-dom': 'ReactRouterDOM',
      'redux': 'Redux',
      'redux-thunk': 'ReduxThunk',
    },
  ]
};
