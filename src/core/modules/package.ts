import fs from 'node:fs';
import path from 'node:path';

import { type Options, BuildInfoModule } from '../types';

export class BuildPackageModule extends BuildInfoModule {
  constructor(root: string, options: Options) {
    super('package', root, options);
  }

  load() {
    const { root, options } = this;
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
    const defaults = ['name', 'version', 'description', 'keywords', 'license', 'author'];
    const keys = new Set(
      Array.isArray(options?.package)
        ? [...defaults, ...options.package]
        : typeof options?.package === 'object'
          ? Object.entries(
              Object.fromEntries([
                ...defaults.map((d) => [d, true] as const),
                ...Object.entries(options.package)
              ])
            )
              .filter(([k, v]) => !!v)
              .map(([k, v]) => k)
          : defaults
    );
    const resolved = {
      name: '',
      version: '0.0.0',
      description: '',
      keywords: [],
      license: '',
      author: '',
      ...pkg
    };
    const entries = [...keys].map((key) => [key, resolved[key]] as const);
    return entries
      .map(([key, value]) => `export const ${key} = ${JSON.stringify(value, null, 2)};`)
      .join('\n');
  }
}
