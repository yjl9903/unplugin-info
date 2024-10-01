import type { Options } from '../types';

import { BuildGitModule } from './git';

export class LegacyInfoModule extends BuildGitModule {
  constructor(root: string, options: Options) {
    super(root, options);
    this.name = `${options.prefix}/info`;
  }
}
