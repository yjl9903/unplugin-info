import type { Options } from '../types';

import { BuildInfoModule } from './base';

export class BuildConsoleModule extends BuildInfoModule {
  constructor(root: string, options: Options) {
    super('console', root, options);
  }

  load() {
    const { environment = ['development', 'production'] } = this.options.console ?? {};

    return [
      `import time from '~build/time';`,
      `import { isCI } from '~build/ci';`,
      `import { github } from '~build/git';`,
      `import { name, version } from '~build/package';`,
      ``,
      `export const print = () => {`,
      `  if (!${JSON.stringify(environment)}.includes(process.env.NODE_ENV)) return;`,
      `  if (typeof import.meta?.env?.SSR !== 'undefined' && import.meta.env.SSR) return;`,
      `  console.groupCollapsed('~build/console');`,
      `  console.log('Project:', name);`,
      `  console.log('Build-at:', time ? time.toLocaleString() : 'Unknown');`,
      `  console.log('Environment:', \`${process.env.NODE_ENV}\${isCI ? '(ci)' : ''}\`);`,
      `  console.log('Version:', version);`,
      `  console.log('GitHub:', github);`,
      `  console.groupEnd();`,
      `};`,
      ``,
      `print();`
    ].join('\n');
  }
}