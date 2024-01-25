import * as ci from '~build/ci';
import * as git from '~build/git';
import * as info from '~build/info';
import * as meta from '~build/meta';
import * as packageInfo from '~build/package';
import time from '~build/time';

// poor man's unwrap
const unwrapModule = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const buildInfo = {
  info: unwrapModule(info),
  git: unwrapModule(git),
  ci: unwrapModule(ci),
  meta: unwrapModule(meta),
  package: unwrapModule(packageInfo),
  time
};

(globalThis as any).buildInfo = buildInfo;

console.log('You can access build info from `buildInfo` variable.');
console.log(buildInfo);
