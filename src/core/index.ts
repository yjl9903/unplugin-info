import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import ci from 'ci-info';
import { createUnplugin } from 'unplugin';

import type { Options } from './types';

import { getRepoInfo } from './git';

export * from './types';

export const UnpluginInfo = createUnplugin<Options | undefined>((option) => {
  let now: Date;

  const root = path.resolve(option?.root ?? process.cwd());

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
        const info = await getRepoInfo(root, option?.git);
        if (info && option?.github) {
          info.github = option.github;
        }

        if (id === ModuleName.BuildInfo) {
          this.warn(
            `${ModuleName.BuildInfo} is deprecated, please migrate to ${ModuleName.BuildGit} and ${ModuleName.BuildCI}`
          );
        }
        if (!info) {
          this.warn('This may not be a git repo');
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
            'author',
            'authorEmail',
            'authorDate',
            'committer',
            'committerEmail',
            'committerDate',
            'commitMessage',
            ...Object.keys(option?.git ?? {})
          ])
        ];
        const gen = (key: string) => {
          return `export const ${key} = ${info ? JSON.stringify((info as any)[key]) : 'null'}`;
        };

        return [
          id === ModuleName.BuildInfo
            ? `export const CI = ${ci.isCI ? `"${ci.name}"` : 'null'}`
            : ``,
          ...keys.map((key) => gen(key))
        ].join('\n');
      } else if (id === ModuleName.BuildCI) {
        return [
          `export const isCI = ${ci.isCI !== null ? (ci.isCI ? 'true' : 'false') : 'null'}`,
          `export const isPR = ${ci.isPR !== null ? (ci.isPR ? 'true' : 'false') : 'null'}`,
          `export const name = ${ci.name !== null ? `\`${ci.name}\`` : 'null'}`
        ].join('\n');
      } else if (id === ModuleName.BuildMeta) {
        const get = () => {
          if (!option?.meta) return {};
          if (typeof option.meta === 'function') {
            return option.meta();
          }
          return option.meta;
        };
        const body = Object.entries(await get()).map(
          ([key, value]) => `export const ${key} = ${JSON.stringify(value, null, 2)};`
        );
        return body.join('\n');
      } else if (id === ModuleName.BuildPackage) {
        const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
        const defaults = ['name', 'version', 'description', 'keywords', 'license', 'author'];
        const keys = new Set(
          Array.isArray(option?.package)
            ? [...defaults, ...option.package]
            : typeof option?.package === 'object'
              ? Object.entries(
                  Object.fromEntries([
                    ...defaults.map((d) => [d, true] as const),
                    ...Object.entries(option.package)
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
