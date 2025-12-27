import type { Options } from '../types';

import { BuildInfoModule } from './base';

export class BuildEnvModule extends BuildInfoModule {
  constructor(root: string, options: Options) {
    super('env', root, options);
  }

  async load() {
    const { options } = this;
    const get = () => {
      if (!options?.env) return {};
      if (typeof options.env === 'function') {
        return options.env();
      }
      return options.env;
    };

    const cloudflare = options.cloudflare === true;
    const meta = await get();
    const body = Object.entries(meta).map(([key, value]) =>
      !cloudflare
        ? `export const ${key} = (typeof import.meta?.env?.SSR !== 'undefined' && import.meta.env.SSR ? process?.env?.['${key.replace(/'/g, '\\\\')}'] : undefined) ?? ${JSON.stringify(value, null, 2)};`
        : `export const ${key} = ${JSON.stringify(value, null, 2)};`
    );

    return body.length > 0 ? body.join('\n') : 'export {};';
  }
}