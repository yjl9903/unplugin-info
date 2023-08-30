import { defineConfig } from 'vite';
import BuildInfo from 'vite-plugin-info/vite';

export default defineConfig({
  plugins: [BuildInfo({ meta: { message: 'This is set from vite.config.ts' } })]
});
