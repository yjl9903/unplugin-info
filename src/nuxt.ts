import type { Options } from './core/types';

import { UnpluginInfo } from './core';

export default function (options: Options = {}, nuxt: any) {
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
