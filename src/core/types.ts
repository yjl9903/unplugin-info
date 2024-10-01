import type { SimpleGit } from 'simple-git';
import type { UnpluginBuildContext, UnpluginContext, TransformResult } from 'unplugin';

type Metadata = Record<string | number, any>;

export abstract class BuildInfoModule {
  name: string;

  root: string;

  options: Options;

  constructor(name: string, root: string, options: Options) {
    this.name = `${options?.prefix ?? '~build'}/${name}`;
    this.root = root;
    this.options = options;
  }

  buildStart(ctx: UnpluginBuildContext): Promise<void> | void {}

  buildEnd(ctx: UnpluginBuildContext): Promise<void> | void {}

  abstract load(
    ctx: UnpluginBuildContext & UnpluginContext,
    id: string
  ): TransformResult | Promise<TransformResult>;
}

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
