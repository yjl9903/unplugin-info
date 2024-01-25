import { defineConfig } from 'vite';
import BuildInfo from 'unplugin-info/vite';

export default defineConfig({
  base: './',
  plugins: [BuildInfo({ meta: { message: 'This is set from vite.config.ts' } })]
});
