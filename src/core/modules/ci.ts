import ci from 'ci-info';

import type { Options } from '../types';

import { BuildInfoModule } from './base';

export class BuildCIModule extends BuildInfoModule {
  constructor(root: string, options: Options) {
    super('ci', root, options);
  }

  load() {
    return [
      `export const isCI = ${ci.isCI !== null ? (ci.isCI ? 'true' : 'false') : 'null'}`,
      `export const isPR = ${ci.isPR !== null ? (ci.isPR ? 'true' : 'false') : 'null'}`,
      `export const name = ${ci.name !== null ? `\`${ci.name}\`` : 'null'}`
    ].join('\n');
  }
}
