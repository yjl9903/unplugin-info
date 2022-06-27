import { defineConfig } from 'vite';
import BuildInfo from 'vite-plugin-info';

export default defineConfig({
  plugins: [BuildInfo({})]
});
