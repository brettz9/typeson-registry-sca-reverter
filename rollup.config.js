import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

// While typeson-registry has an ES distribution, it does not have so for
//  the `sparse-undefined` preset (we could add source, but that might
//  not be resolvable)

// eslint-disable-next-line import/no-anonymous-default-export
export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'typesonRegistrySCAReverter'
  },
  plugins: [
    babel(),
    resolve(),
    commonjs()
  ]
}, {
  input: 'src/index.js',
  output: {
    file: 'dist/index-es.js',
    format: 'es'
  },
  plugins: [
    babel(),
    resolve({
      module: true
    }),
    commonjs()
  ]
}];
