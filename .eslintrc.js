'use strict';
module.exports = {
  extends: ['ash-nazg/sauron'],
  parserOptions: {
    sourceType: 'module'
  },
  settings: {
    polyfills: [
      'Object.entries'
    ]
  },
  overrides: [
    {
      files: '.eslintrc.js',
      extends: ['plugin:node/recommended-script'],
      rules: {
        'import/no-commonjs': 0
      }
    },
    {
      files: ['*.md'],
      globals: {
        typesonRegistrySCAReverter: true,
        setGlobalVars: true,
        shimIndexedDB: true
      },
      rules: {
        'import/unambiguous': 0
      }
    }
  ],
  rules: {
  }
};
