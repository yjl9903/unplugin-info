import '~build/console';
import now from '~build/time';
import { github, branch, sha } from '~build/git';
import { isCI, name as ciName } from '~build/ci';
import { name, version } from '~build/package';

debugger;
console.log('Hello Rspack with unplugin-info!');
console.log('Build time:', now);
console.log('CI:', isCI ? ciName : 'Not a CI env');
console.log('GitHub:', github);
console.log('Branch:', branch);
console.log('SHA:', sha);
console.log('Package name:', name);
console.log('Package version:', version);
