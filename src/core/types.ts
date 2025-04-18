import type { SimpleGit } from 'simple-git';

type Metadata = Record<string | number, any>;

type Env = Record<string | number, any>;

export interface Options {
  /**
   * Git repo root path
   */
  root?: string;

  /**
   * Github repo url
   */
  github?: string;

  /**
   * Custom the exported fields in ~build/git
   */
  git?: Record<string, (git: SimpleGit) => Promise<any> | any>;

  /**
   * Filter exported fields of package.json
   */
  package?: string[] | Record<string, boolean | null | undefined>;

  /**
   * Pass some meta data to Vite app
   *
   * Notice: meta data will be serialized to JSON format
   */
  meta?: Metadata | (() => Metadata | Promise<Metadata>);

  /**
   * Pass environment variables to Vite SSR app
   *
   * For each key / value record
   * - In the SSR environment, it will read the environment variable (e.g. process.env.<key>)
   * - In the client environment, it will return the provided default value
   */
  env?: Metadata | (() => Env | Promise<Env>);

  /**
   * Print help build information
   */
  console?: {
    /**
     * Enable build info log under these NODE_ENV
     *
     * @default ['development','production']
     */
    environment?: string[];
  };

  /**
   * Custom virtual module prefix
   *
   * @default '~build'
   */
  prefix?: string;

  /**
   * Whether it is bundled for cloudflare worker runtime
   */
  cloudflare?: boolean;
}
