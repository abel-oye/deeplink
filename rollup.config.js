// rollup.config.js
const fs = require('fs');
const babel = require('rollup-plugin-babel');
const serve = require('rollup-plugin-serve');

export default {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'Deeplink',
  plugins: [
    serve({
      contentBase: ['.'],
      open: true,
      openPage: '/examples/index.html',
      https: {
        key: fs.readFileSync('./keys/key.pem'),
        cert: fs.readFileSync('./keys/cert.pem')
        // ca: fs.readFileSync('./keys/cert.pem')
      }
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
  dest: 'dist/deeplink.js' // equivalent to --output
};
