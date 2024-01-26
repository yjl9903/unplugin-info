import { defineConfig } from 'vite';

import BuildInfo from '../../src/vite';

export default defineConfig({
  base: './',
  plugins: [
    BuildInfo({
      git: {
        isClean: async (git) => {
          const status = await git.status();
          return status.isClean();
        }
      },
      package: {
        dependencies: true,
        devDependencies: true
      },
      meta: { message: 'This is set from vite.config.ts' }
    })
  ]
});
