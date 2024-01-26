import { defineConfig } from 'vite';

import BuildInfo from '../../src/vite';

export default defineConfig({
  base: './',
  plugins: [BuildInfo({ meta: { message: 'This is set from vite.config.ts' } })]
});
