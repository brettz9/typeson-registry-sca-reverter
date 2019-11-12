module.exports = {
  extends: ["ash-nazg/sauron"],
  parserOptions: {
    sourceType: "module"
  },
  settings: {
    polyfills: [
      'Object.entries'
    ]
  },
  overrides: [
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
