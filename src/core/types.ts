import type { SimpleGit } from 'simple-git';

type Metadata = Record<string | number, any>;

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
   * Custom virtual module prefix
   *
   * @default '~build'
   */
  prefix?: string;
}
