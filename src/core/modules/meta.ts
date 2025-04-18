import type { Options } from '../types';

import { BuildInfoModule } from './base';

export class BuildMetaModule extends BuildInfoModule {
  constructor(root: string, options: Options) {
    super('meta', root, options);
  }

  async load() {
    const { options } = this;
    const get = () => {
      if (!options?.meta) return {};
      if (typeof options.meta === 'function') {
        return options.meta();
      }
      return options.meta;
    };

    const meta = await get();
    const body = Object.entries(meta).map(
      ([key, value]) => `export const ${key} = ${JSON.stringify(value, null, 2)};`
    );

    return body.length > 0 ? body.join('\n') : 'export {};';
  }
}
