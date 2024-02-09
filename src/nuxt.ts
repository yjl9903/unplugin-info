import { defineNuxtModule } from '@nuxt/kit';

import type { Options } from './core/types';

import { UnpluginInfo } from './core';

export default defineNuxtModule({
  meta: {
    // Usually the npm package name of your module
    name: 'unplugin-info/nuxt',
    // The key in `nuxt.config` that holds your module options
    configKey: 'info',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0'
    }
  },
  // Default configuration options for your module, can also be a function returning those
  defaults: {},
  // Shorthand sugar to register Nuxt hooks
  hooks: {},
  setup(options: Options = {}, nuxt) {
    // install webpack plugin
    nuxt.hook('webpack:config', async (config: any) => {
      config.plugins = config.plugins || [];
      config.plugins.unshift(UnpluginInfo.webpack(options));
    });

    // install vite plugin
    nuxt.hook('vite:extendConfig', async (config: any) => {
      config.plugins = config.plugins || [];
      config.plugins.push(UnpluginInfo.vite(options));
    });
  }
});
