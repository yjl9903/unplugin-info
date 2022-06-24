# vite-plugin-info

Export build information as Vite virutal module.

## Installation

```bash
npm i -D vite-plugin-info
```

## Usage

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

## License

MIT License © 2021 [XLor](https://github.com/yjl9903)
