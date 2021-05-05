import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import packageJson from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: packageJson.module,
      format: 'esm'
    },
    {
      file: packageJson.main,
      format: 'cjs',
      exports: 'default'
    }
  ],
  external: Object.keys(packageJson.dependencies || {}),
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: ['node_modules/**']
    }),
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs()
  ]
}
