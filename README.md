# vite-plugin-info

[![version](https://img.shields.io/npm/v/vite-plugin-info?color=rgb%2850%2C203%2C86%29&label=vite-plugin-info)](https://www.npmjs.com/package/vite-plugin-info) [![CI](https://github.com/yjl9903/vite-plugin-info/actions/workflows/ci.yml/badge.svg)](https://github.com/yjl9903/vite-plugin-info/actions/workflows/ci.yml)

Export build information as Vite virutal module.

This plugin helps you add build timestamp / commit SHA / ... to your application. So you can easily check whether the production version meets your expectations.

## Installation

```bash
npm i -D vite-plugin-info
```

Add plugin `vite-plugin-info` to your `vite.config.ts`.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import BuildInfo from 'vite-plugin-info'

export default defineConfig({
  plugins: [
    BuildInfo()
  ]
})
```

## Usage

`vite-plugin-info` creates three virtual modules, `~build/time`, `~build/info`, and `~build/meta`.

### ~build/time

It exports the timestamp when the vite started.

```ts
import now from '~build/time'

console.log(now)
// There will be a log like "Fri Jun 24 2022 16:30:30 GMT+0800 (中国标准时间)"
```

### ~build/info

It exports the infomation about the current git repo. This is powered by [git-repo-info](https://github.com/rwjblue/git-repo-info).

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
} from '~build/info';

// ...
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

## License

MIT License © 2021 [XLor](https://github.com/yjl9903)
