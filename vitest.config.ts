import { defineConfig } from 'vitest/config';
import Info from './src';

export default defineConfig({
  test: {},
  plugins: [Info({ meta: { message: 'This is set from vite.config.ts' } })]
});
