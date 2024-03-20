import type { Options } from './core';

import VitePlugin from './vite';

export default (options: Options = {}) => ({
  name: 'unplugin-info',
  hooks: {
    'astro:config:setup': async (astro: any) => {
      astro.config.vite.plugins ||= [];
      astro.config.vite.plugins.push(VitePlugin(options));
    }
  }
});
