# unplugin-info

[![version](https://img.shields.io/npm/v/unplugin-info?label=unplugin-info)](https://www.npmjs.com/package/unplugin-info) [![install size](https://packagephobia.com/badge?p=unplugin-info)](https://packagephobia.com/result?p=unplugin-info) [![CI](https://github.com/yjl9903/unplugin-info/actions/workflows/ci.yml/badge.svg)](https://github.com/yjl9903/unplugin-info/actions/workflows/ci.yml)

Export build information as virutal module.

This plugin helps you add build timestamp / commit SHA / ... to your application. So you can easily check whether the production version meets your expectations.

> This pacakge was originally named [vite-plugin-info](https://www.npmjs.com/package/vite-plugin-info). Now it has been refactored using [unplugin](https://www.npmjs.com/package/unplugin) to support more tools.
>
> However, you can still use [vite-plugin-info](https://www.npmjs.com/package/vite-plugin-info) since it works fine. Thanks to the compatibility of Vite. And the source code of [vite-plugin-info](https://www.npmjs.com/package/vite-plugin-info) is [here](https://github.com/yjl9903/unplugin-info/tree/vite-plugin-info).

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

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.ts

export default defineNuxtConfig({
  modules: ['unplugin-info/nuxt']
});
```

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

## Usage

`unplugin-info` creates three virtual modules, `~build/time`, `~build/info`, and `~build/meta`.

### ~build/time

It exports the timestamp when the vite started.

```ts
import now from '~build/time'

console.log(now)
// There will be a log like "Fri Jun 24 2022 16:30:30 GMT+0800 (中国标准时间)"
```

### ~build/git

It exports the infomation about the current git repo, which is powered by [git-repo-info](https://github.com/rwjblue/git-repo-info).

```ts
import {
  github,
  sha,
  abbreviatedSha,
  tag,
  lastTag,
  commitsSinceLastTag,
  committer,
  committerDate,
  author,
  authorDate,
  commitMessage
} from '~build/git';

// ...
```

### ~build/ci

It exports the current CI/CD environment information, which is powered by [ci-info](https://github.com/watson/ci-info).

```ts
import { isCI, isPR, name } from '~build/ci'
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

Then you can import them in your Vite app.

```ts
import { message } from '~build/meta'

console.log(message)
// This is set from vite.config.ts
```

> **Note**
>
> Meta data will be serialized to JSON format, so you should gen it in you `vite.config.ts` and pass the result object.

To get TypeScript support, you can add type declaration in your `env.d.ts` (It is include in the [official Vite project template](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)).

```ts
declare module '~build/meta' {
  export const message: string;
}
```

### ~build/package

It exports the information of the current `package.json`.

```ts
import { name, version } from '~build/package';
```

## License

MIT License © 2023 [XLor](https://github.com/yjl9903)
