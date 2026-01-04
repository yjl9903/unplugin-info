# unplugin-info

[![Demo](https://img.shields.io/badge/unplugin--info-demo-00CCAA)](https://yjl9903.github.io/unplugin-info/)
[![version](https://img.shields.io/npm/v/unplugin-info?label=unplugin-info)](https://www.npmjs.com/package/unplugin-info)
[![install size](https://packagephobia.com/badge?p=unplugin-info)](https://packagephobia.com/result?p=unplugin-info)
[![GitHub License](https://img.shields.io/github/license/yjl9903/unplugin-info)](https://github.com/yjl9903/unplugin-info/blob/main/LICENSE)
[![CI](https://github.com/yjl9903/unplugin-info/actions/workflows/ci.yml/badge.svg)](https://github.com/yjl9903/unplugin-info/actions/workflows/ci.yml)

Export build information as virutal module.

This plugin helps you add **build timestamp** / **commit SHA** / **CI environment** / `package.json` / ... to your application. So you can easily check whether the production version meets your expectations, or config your application.

> **Migration from v0 to v1**
>
> + Move git related information from `~build/info` to `~build/git`
> + Move CI related information from `~build/info` to `~build/ci`
> + Remove `commitsSinceLastTag` from `~build/git`

## Installation

```bash
npm i -D unplugin-info
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts

import Info from 'unplugin-info/vite';

export default defineConfig({
  plugins: [
    Info()
  ]
});
```

Full example is located at [examples/vite](https://github.com/yjl9903/unplugin-info/blob/main/examples/vite).

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js

import Info from 'unplugin-info/rollup';

export default {
  plugins: [
    Info()
  ]
};
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js

module.exports = {
  /* ... */
  plugins: [
    require('unplugin-info/rspack')()
  ]
};
```

Full example is located at [examples/rspack](https://github.com/yjl9903/unplugin-info/blob/main/examples/rspack).

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js

module.exports = {
  /* ... */
  plugins: [
    require('unplugin-info/webpack')()
  ]
};
```

Full example is located at [examples/webpack](https://github.com/yjl9903/unplugin-info/blob/main/examples/webpack).

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.ts

export default defineNuxtConfig({
  modules: ['unplugin-info/nuxt'],
  info: {
    // Your unplugin-info options ...
  }
});
```

Full example is located at [examples/nuxt](https://github.com/yjl9903/unplugin-info/blob/main/examples/nuxt).

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js

module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-info/webpack')()
    ]
  }
};
```

<br></details>

<details>
<summary>Quasar</summary><br>

```ts
// quasar.conf.js [Vite]
module.exports = {
  vitePlugins: [
    [
      'unplugin-info/vite',
      {
        /* options */
      }
    ]
  ]
};
```

```ts
// quasar.conf.js [Webpack]
const Info = require('unplugin-info/webpack');

module.exports = {
  build: {
    chainWebpack(chain) {
      chain.plugin('unplugin-info').use(
        Info()
      );
    }
  }
};
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild';

build({
  /* ... */
  plugins: [
    require('unplugin-info/esbuild')({
      /* options */
    }),
  ],
});
```

<br></details>

<details>
<summary>Astro</summary><br>

```ts
// astro.config.mjs

import Info from 'unplugin-info/astro';

export default defineConfig({
  integrations: [
    Info()
  ],
});
```

<br></details>

### TypeScript

To make the TypeScript work, you can add `unplugin-info/client` to your corresponding `tsconfig.json`.

```json5
{
  "compilerOptions": {
    // ...
    "types": [
      "unplugin-info/client"
    ],
  },
  // ...
}
```

Or you can add TypeScript [triple-slash directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) to your `.d.ts` (i.e. for projects initialized by Vite, it may be `src/env.d.ts`).

```ts
// Your .d.ts file

/// <reference types="unplugin-info/client" />
```

Or if you did some advanced modification (see below), you can just copy and paste [client.d.ts](https://github.com/yjl9903/unplugin-info/blob/main/client.d.ts) to your project, and then do anything you want.

## Usage

`unplugin-info` creates several virtual modules, `~build/time`, `~build/git`, `~build/ci`, `~build/console`, `~build/meta`, `~build/env`, and `~build/package`.

You can just import these modules as usual, and do anything with them. Common use cases may be like:

```ts
// main.ts

import now from '~build/time'
import { sha } from '~build/git'

// console log the build info
console.log(`Build ${sha} at ${now}`)
```

```tsx
// App.tsx

import now from '~build/time'

// Render it in your app
function App() {
  return <span>{now.toLocaleString()}</span>
}
```

### ~build/time

It exports the timestamp when the vite started.

```ts
import now from '~build/time'

console.log(now)
// There will be a log like "Fri Jun 24 2022 16:30:30 GMT+0800 (中国标准时间)"
```

### ~build/git

It exports the infomation about the current git repo, which is powered by [simple-git](https://www.npmjs.com/package/simple-git).

```ts
import {
  github,
  sha,
  abbreviatedSha,
  tag,
  lastTag,
  committer,
  committerEmail,
  committerDate,
  author,
  authorEmail,
  authorDate,
  commitMessage
} from '~build/git';

// ...
```

> [!NOTE]
>
> From `unplugin-info@0.6.0`, the original virtual module called `~build/info` will be renamed to `~build/git`, and the CI/CD related information will be moved to another virtual module called `~build/ci`.

You can even **custom or override the exported git information**.

All the functions will be executed during the generation of `~build/git`, and the return result with its corresponding field name will be merged into `~build/git`. The following example adds another `isClean` field to `~build/git`.

```ts
// vite.config.ts

import Info from 'unplugin-info/vite';

export default defineConfig({
  plugins: [
    Info({
      git: {
        // Gets whether this represents a clean working branch.
        isClean: async (git) => {
          const status = await git.status()
          return status.isClean()
        }
      }
    })
  ]
});
```

Full example is located at [examples/vite](https://github.com/yjl9903/unplugin-info/blob/main/examples/vite/vite.config.ts).

### ~build/ci

It exports the current CI/CD environment information, which is powered by [ci-info](https://github.com/watson/ci-info).

```ts
import { isCI, isPR, name } from '~build/ci'
```

### ~build/console

It will print some helpful logs in your browser.

```ts
import '~build/console';
```

### ~build/meta

It exports some meta data from the options of the plugin.

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    BuildInfo({
      meta: { message: 'This is set from vite.config.ts' }
    })
  ]
})
```

You can also generate meta data lazily.

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    BuildInfo({
      meta: async () => ({ message: 'This is set from vite.config.ts' })
    })
  ]
})
```

Then you can import them in your app.

```ts
import { message } from '~build/meta'

console.log(message)
// This is set from vite.config.ts
```

> [!NOTE]
>
> Meta data will be serialized to JSON format, so you should gen it in you `vite.config.ts` and pass the result object.

To get TypeScript support, you can add type declaration in your `env.d.ts` (It is include in the [official Vite project template](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)).

```ts
declare module '~build/meta' {
  export const message: string;
}
```

Full example is located at [examples/vite](https://github.com/yjl9903/unplugin-info/blob/main/examples/vite/vite.config.ts).

### ~build/env

> [!NOTE]
>
> Now it only suports for Vite.

It exports some environment data from the options of the plugin.

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    BuildInfo({
      env: { BUILD_MESSAGE: 'This is a default value set from vite.config.ts' }
    })
  ]
})
```

Compared with `~build/meta`, `~build/env` is targeted at accessing environment variables for the SSR runtime (like Nuxt, Remix, Astro, and so on).

Then you can import them in your Vite app.

```ts
import { BUILD_MESSAGE } from '~build/env'

console.log(BUILD_MESSAGE)
```

In the client-side, this will always output `This is a default value set from vite.config.ts`.

But in the server-side, the output log is determined by the corresponding environment variable `process.env.BUILD_MESSAGE`.

To get TypeScript support, you can add type declaration in your `env.d.ts` (It is include in the [official Vite project template](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)).

```ts
declare module '~build/env' {
  export const BUILD_MESSAGE: string;
}
```

### ~build/package

It exports the information of the current `package.json`.

```ts
import { name, version } from '~build/package';
```

You can also **control which fields should be exported**. By default, we only export fields name, version, description, keywords, license, author from your package.json.

```ts
// vite.config.ts

import Info from 'unplugin-info/vite';

export default defineConfig({
  plugins: [
    Info({
      package: {
        dependencies: true
      }
    })
  ]
});
```

Full example is located at [examples/vite](https://github.com/yjl9903/unplugin-info/blob/main/examples/vite/vite.config.ts).

## Relationship with [vite-plugin-info](https://www.npmjs.com/package/vite-plugin-info)

This pacakge was initially called [vite-plugin-info](https://www.npmjs.com/package/vite-plugin-info). It has been refactored using [unplugin](https://www.npmjs.com/package/unplugin) to support additional tools, including Webpack and so on.

We recommend migrating from [vite-plugin-info](https://www.npmjs.com/package/vite-plugin-info) to [unplugin-info](https://www.npmjs.com/package/unplugin-info), as [unplugin-info](https://www.npmjs.com/package/unplugin-info) will continue to be maintained and new features will be added.

However, you can still use [vite-plugin-info](https://www.npmjs.com/package/vite-plugin-info), as it works fine. Thanks to Vite's compatibility, and the source code of [vite-plugin-info](https://www.npmjs.com/package/vite-plugin-info) can be founded [here](https://github.com/yjl9903/unplugin-info/tree/vite-plugin-info).

## License

MIT License © 2023 [XLor](https://github.com/yjl9903)
