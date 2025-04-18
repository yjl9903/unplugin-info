import type { UnpluginBuildContext, UnpluginContext, TransformResult } from 'unplugin';

import type { Options } from '../types';

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
