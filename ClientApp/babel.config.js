const { compilerOptions = {} } = require('./tsconfig.json');
const alias = {};
const { paths = {} } = compilerOptions;
for (const k of Object.keys(paths)) {
  alias[k] = paths[k][0];
}

module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'modules': 'auto',
        'useBuiltIns': 'usage',
        'corejs': {
          'version': 3,
          'proposals': true
        }
      }
    ],
    '@babel/preset-typescript',
    'typescript-vue',
    '@babel/preset-react'
  ],
  'plugins': [
    [
      'module-resolver',
      {
        'root': ['.'],
        'alias': alias
      }
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        'absoluteRuntime': false,
        'corejs': 3,
        'helpers': true,
        'regenerator': true,
        'useESModules': false,
        'version': '^7.10.2'
      }
    ],
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-proposal-decorators',
      {
        'legacy': true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        'loose': true
      }
    ],
    [
      '@babel/plugin-proposal-private-methods',
      {
        'loose': true
      }
    ],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        'useBuiltIns': true
      }
    ],
    '@babel/plugin-proposal-optional-catch-binding',
    '@babel/plugin-proposal-optional-chaining',
    [
      'import',
      {
        'libraryName': 'antd',
        'libraryDirectory': 'es',
        'style': true
      }
    ],
  ],
  'env': {
    'production': {},
    'test': {
      'presets': [
        [
          '@babel/preset-env',
        ],
      ],
      'plugins': [
        [
          'import',
          {
            'libraryName': 'antd',
            'libraryDirectory': 'lib',
            'style': false,
          }
        ],
      ],
    },
  },
};
