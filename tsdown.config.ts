import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/vite.ts',
    'src/astro.ts',
    'src/webpack.ts',
    'src/rollup.ts',
    'src/esbuild.ts',
    'src/nuxt.ts',
    'src/rspack.ts'
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  deps: {
    neverBundle: ['@nuxt/schema', '@nuxt/kit', '@rspack/core', 'webpack', 'rollup', 'vite', 'esbuild']
  }
});
