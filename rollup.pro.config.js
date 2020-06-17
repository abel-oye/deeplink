// rollup.config.js
var babel = require('rollup-plugin-babel');

export default {
  input: 'src/index.js',

  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
  output: [
    {
      file: 'dist/deeplink.js', // equivalent to --output
      format: 'umd',
      name: 'deeplink'
    }
  ]
};
