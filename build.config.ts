import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/vite',
    'src/webpack',
    'src/rollup',
    'src/esbuild',
    'src/nuxt',
    'src/types'
  ],
  declaration: true,
  rollup: {
    emitCJS: true
  },
  externals: ['@nuxt/schema', '@nuxt/kit', 'webpack', 'rollup', 'vite', 'esbuild', 'rspack'],
  clean: true
});
