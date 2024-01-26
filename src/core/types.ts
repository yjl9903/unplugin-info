import type { SimpleGit } from 'simple-git';

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
   * Custom virtual module prefix
   *
   * @default '~build'
   */
  prefix?: string;

  /**
   * Pass some meta data to Vite app
   *
   * Notice: meta data will be serialized to JSON format
   */
  meta?: Record<string | number | symbol, any>;
}
