import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import ci from 'ci-info';
import getRepoInfo from 'git-repo-info';
import { createUnplugin } from 'unplugin';

import type { Options } from './types';

import { getRepoUrl } from './repo';

export * from './types';

export const UnpluginInfo = createUnplugin<Options | undefined>((option) => {
  let now: Date;

  const root = path.resolve(option?.root ?? process.cwd());
  const info = getRepoInfo(root);
  const github = option?.github ?? getRepoUrl(info, root);

  console.log('git root', root);
  console.log('repo info', info);

  const ModuleName = {
    BuildTime: `${option?.prefix ?? '~build'}/time`,
    BuildGit: `${option?.prefix ?? '~build'}/git`,
    BuildInfo: `${option?.prefix ?? '~build'}/info`,
    BuildCI: `${option?.prefix ?? '~build'}/ci`,
    BuildMeta: `${option?.prefix ?? '~build'}/meta`,
    BuildPackage: `${option?.prefix ?? '~build'}/package`
  };

  return {
    name: 'unplugin-info',
    buildStart() {
      now = new Date();
    },
    resolveId(id) {
      if (Object.values(ModuleName).includes(id)) {
        return `\0${id}`;
      }
    },
    loadInclude(id) {
      if (!id.startsWith('\0')) return false;
      id = id.slice(1);
      return Object.values(ModuleName).includes(id);
    },
    async load(id) {
      if (!id.startsWith('\0')) return;
      id = id.slice(1);

      if (id === ModuleName.BuildTime) {
        return `const time = new Date(${now.getTime()})\n` + 'export default time';
      } else if (id === ModuleName.BuildInfo || id === ModuleName.BuildGit) {
        if (!info.root || !info.commonGitDir || !info.worktreeGitDir)
          this.warn('This may not be a git repo');

        const gen = (key: keyof typeof info) => {
          return `export const ${key} = ${JSON.stringify(info[key])}`;
        };

        return [
          id === ModuleName.BuildInfo
            ? `export const CI = ${ci.isCI ? `"${ci.name}"` : 'null'}`
            : ``,
          `export const github = ${JSON.stringify(github ?? null)}`,
          gen('sha'),
          gen('abbreviatedSha'),
          gen('branch'),
          gen('tag'),
          gen('committer'),
          gen('committerDate'),
          gen('commitMessage'),
          gen('author'),
          gen('authorDate'),
          gen('lastTag'),
          gen('commitsSinceLastTag')
        ].join('\n');
      } else if (id === ModuleName.BuildCI) {
        return [
          `export const isCI = ${ci.isCI !== null ? (ci.isCI ? 'true' : 'false') : 'null'}`,
          `export const isPR = ${ci.isPR !== null ? (ci.isPR ? 'true' : 'false') : 'null'}`,
          `export const name = ${ci.name !== null ? `\`${ci.name}\`` : 'null'}`
        ].join('\n');
      } else if (id === ModuleName.BuildMeta) {
        const body = Object.entries(option?.meta ?? {}).map(
          ([key, value]) => `export const ${key} = ${JSON.stringify(value, null, 2)};`
        );
        return body.join('\n');
      } else if (id === ModuleName.BuildPackage) {
        const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
        const entries = Object.entries({
          name: '',
          version: '0.0.0',
          description: '',
          keywords: [],
          license: '',
          author: '',
          ...pkg
        }).filter(([key]) =>
          ['name', 'version', 'description', 'keywords', 'license', 'author'].includes(key)
        );
        return entries
          .map(([key, value]) => `export const ${key} = ${JSON.stringify(value, null, 2)};`)
          .join('\n');
      }
    },
    vite: {
      handleHotUpdate({ file, server }) {
        // HMR: package.json
        if (file === normalizePath(path.resolve(root, 'package.json'))) {
          const module = server.moduleGraph.getModuleById('\0' + ModuleName.BuildPackage);
          if (module) {
            // Invalidate module for reloading
            server.moduleGraph.invalidateModule(module);

            // Reload client
            server.ws.send({
              type: 'full-reload'
            });
          }
        }
      }
    }
  };
});

function normalizePath(filename: string) {
  return filename.split(path.win32.sep).join(path.posix.sep);
}
