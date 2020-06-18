// rollup.config.js
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const pkg = require('package.json');

export default {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'Deeplink',
  plugins: [
    uglify.uglify(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
  banner: `/* deeplink.js Version: ${pkg.version} */`,
  dest: 'dist/deeplink.js' // equivalent to --output
};
