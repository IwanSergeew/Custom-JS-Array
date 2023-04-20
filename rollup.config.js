import typescript from '@rollup/plugin-typescript';
import polyfill from 'rollup-plugin-polyfill-node';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: './bin/esm/index.js',
      format: 'es',
    },
    plugins: [typescript(), polyfill()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: './bin/types/index.d.ts',
    },
    plugins: [dts()],
  },
];
