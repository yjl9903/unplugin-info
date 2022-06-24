import { defineConfig } from 'vite';
import BuildInfo from 'vite-plugin-info';

export default defineConfig({
  plugins: [BuildInfo({ github: 'https://github.com/yjl9903/vite-plugin-info' })]
});
