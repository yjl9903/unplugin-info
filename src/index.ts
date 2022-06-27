import type { Plugin } from 'vite';

import path from 'node:path';

import ci from 'ci-info';
import getRepoInfo from 'git-repo-info';

import { getRepoUrl } from './repo';

export interface UserOption {
  /**
   * Git repo root path
   */
  root?: string;

  /**
   * Github repo url
   */
  github?: string;

  /**
   * Custom virtual module prefix
   *
   * @default '~build'
   */
  prefix?: string;
}

export default function createInfoPlugin(option?: UserOption): Plugin {
  const now = new Date();

  const root = path.resolve(option?.root ?? process.cwd());
  const info = getRepoInfo(root);
  const github = option?.github ?? getRepoUrl(info, root);

  const ModuleName = {
    BuildTime: `${option?.prefix ?? '~build'}/time`,
    BuildInfo: `${option?.prefix ?? '~build'}/info`
  };

  return {
    name: 'vite-plugin-info',
    resolveId(id) {
      if (ModuleName.BuildTime === id || ModuleName.BuildInfo === id) return id;
    },
    async load(id) {
      if (id === ModuleName.BuildTime) {
        return `const time = new Date(${now.getTime()})\n` + `export default time`;
      } else if (id === ModuleName.BuildInfo) {
        if (!info.root || !info.commonGitDir || !info.worktreeGitDir) {
          this.warn('This may not be a git repo');
        }

        const gen = (key: keyof typeof info) => {
          return `export const ${key} = ${JSON.stringify(info[key])}`;
        };

        return [
          `export const CI = ${ci.isCI ? `"${ci.name}"` : 'null'}`,
          `export const github = ${JSON.stringify(github ?? null)}`,
          gen('sha'),
          gen('abbreviatedSha'),
          gen('tag'),
          gen('committer'),
          gen('committerDate'),
          gen('commitMessage'),
          gen('author'),
          gen('authorDate'),
          gen('lastTag'),
          gen('commitsSinceLastTag')
        ].join('\n');
      }
    }
  };
}
