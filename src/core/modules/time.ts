import { type Options, BuildInfoModule } from '../types';

export class BuildTimeModule extends BuildInfoModule {
  now!: Date;

  constructor(root: string, options: Options) {
    super('time', root, options);
  }

  buildStart() {
    this.now = new Date();
  }

  load() {
    return `const time = new Date(${this.now.getTime()})\n` + 'export default time';
  }
}
