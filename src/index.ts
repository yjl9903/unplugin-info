import type { Plugin } from 'vite';

import getRepoInfo from 'git-repo-info';

interface UserOption {
  /**
   * Github repo url
   */
  github?: string;

  /**
   * Custom virtual module prefix
   */
  prefix?: string;
}

export default function createInfoPlugin(option?: UserOption): Plugin {
  const now = new Date();
  const info = getRepoInfo();

  const ModuleName = {
    BuildTime: `~${option?.prefix ?? 'build'}/time`,
    BuildInfo: `~${option?.prefix ?? 'build'}/info`
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
          `export const github = ${JSON.stringify(option?.github ?? null)}`,
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
