import path from 'node:path';
import process from 'node:process';

import { createUnplugin } from 'unplugin';

import type { Options } from './types';

import { BuildTimeModule } from './modules/time';
import { BuildGitModule } from './modules/git';
import { LegacyInfoModule } from './modules/info';
import { BuildCIModule } from './modules/ci';
import { BuildMetaModule } from './modules/meta';
import { BuildPackageModule } from './modules/package';

export * from './types';

export const UnpluginInfo = createUnplugin<Options | undefined>((options = {}) => {
  let now: Date;

  const root = path.resolve(options?.root ?? process.cwd());

  const modules = {
    Time: new BuildTimeModule(root, options),
    Git: new BuildGitModule(root, options),
    Info: new LegacyInfoModule(root, options),
    CI: new BuildCIModule(root, options),
    Meta: new BuildMetaModule(root, options),
    Package: new BuildPackageModule(root, options)
  };

  return {
    name: 'unplugin-info',
    buildStart() {
      now = new Date();
    },
    resolveId(id) {
      if (
        Object.values(modules)
          .map((m) => m.name)
          .includes(id)
      ) {
        return `\0${id}`;
      }
    },
    loadInclude(id) {
      if (!id.startsWith('\0')) return false;
      id = id.slice(1);
      return Object.values(modules)
        .map((m) => m.name)
        .includes(id);
    },
    async load(id) {
      if (!id.startsWith('\0')) return;
      id = id.slice(1);

      for (const mod of Object.values(modules)) {
        if (id === mod.name) {
          if (id === modules.Info.name) {
            this.warn(
              `${modules.Info.name} is deprecated, please migrate to ${modules.Git.name} and ${modules.CI.name}`
            );
          }

          return mod.load(this, id);
        }
      }
    },
    vite: {
      handleHotUpdate({ file, server }) {
        // HMR: package.json
        if (file === normalizePath(path.resolve(root, 'package.json'))) {
          const module = server.moduleGraph.getModuleById('\0' + modules.Package);
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
