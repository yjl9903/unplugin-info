import { type Options, BuildInfoModule } from '../types';

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
    const body = Object.entries(await get()).map(
      ([key, value]) => `export const ${key} = ${JSON.stringify(value, null, 2)};`
    );
    return body.join('\n');
  }
}
