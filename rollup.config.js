import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'node_modules/mastercard-locations/index.js',
  output: {
    exports: 'named',
    format: 'es',
    file: 'wrangler_modules/mastercard-locations/index.mjs'
  },
  plugins: [
    commonjs(),
    nodeResolve({ browser: true })
  ],
}