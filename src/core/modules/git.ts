import type { UnpluginBuildContext, UnpluginContext } from 'unplugin';

import ci from 'ci-info';

import type { Options } from '../types';

import { getRepoInfo } from '../utils/git';

import { BuildInfoModule } from './base';

export class BuildGitModule extends BuildInfoModule {
  constructor(root: string, options: Options) {
    super('git', root, options);
  }

  async load(ctx: UnpluginBuildContext & UnpluginContext, id: string) {
    const { root, options } = this;
    const info = await getRepoInfo(root, options?.git);
    if (info && options?.github) {
      info.github = options.github;
    }

    if (!info) {
      ctx.warn('This may not be a git repo');
    }

    const keys = [
      ...new Set([
        'github',
        'sha',
        'abbreviatedSha',
        'branch',
        'tag',
        'tags',
        'lastTag',
        'describe',
        'author',
        'authorEmail',
        'authorDate',
        'committer',
        'committerEmail',
        'committerDate',
        'commitMessage',
        ...Object.keys(options?.git ?? {})
      ])
    ];
    const gen = (key: string) => {
      return `export const ${key} = ${info ? JSON.stringify((info as any)[key]) : 'null'}`;
    };

    return [
      // Support legacy ~build/info module
      id.endsWith('info') ? `export const CI = ${ci.isCI ? `"${ci.name}"` : 'null'}` : ``,
      ...keys.map((key) => gen(key))
    ].join('\n');
  }
}
