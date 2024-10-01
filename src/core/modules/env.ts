import { type Options, BuildInfoModule } from '../types';

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

    const meta = await get();
    const body = Object.entries(meta).map(
      ([key, value]) =>
        `export const ${key} = (import.meta.env.SSR ? process?.env?.['${key.replace(/'/g, '\\')}'] : undefined) ?? ${JSON.stringify(value, null, 2)};`
    );

    return body.length > 0 ? body.join('\n') : 'export {};';
  }
}
