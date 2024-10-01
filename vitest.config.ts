import { defineConfig } from 'vitest/config';

import Info from './src/vite';

export default defineConfig({
  test: {},
  plugins: [
    Info({
      meta: { message: 'This is set from vite.config.ts' },
      env: {
        BUILD_MESSAGE: 'This should be overwriten in SSR'
      }
    })
  ]
});
