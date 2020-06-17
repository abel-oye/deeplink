
module.exports = {
    singleQuote: true,
    trailingComma: 'none',
    printWidth: 100,
    overrides: [
      {
        files: '.prettierrc',
        options: { parser: 'json' }
      }
    ],
    arrowParens: 'avoid'
  };
  