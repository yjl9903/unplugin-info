import '@onekuma/preset.css';

import now from '~build/time';
import {
  github,
  branch,
  sha,
  abbreviatedSha,
  tag,
  lastTag,
  committer,
  committerEmail,
  committerDate,
  author,
  authorEmail,
  authorDate,
  commitMessage,
  isClean
} from '~build/git';
import { message } from '~build/meta';
import { isCI, name as ciName } from '~build/ci';
import { name, version, dependencies, devDependencies } from '~build/package';

import { format } from 'date-fns';

import './playground';

const buildTime = document.querySelector<HTMLElement>('.container')!;

function append(key: string, value: string | number | null) {
  const p = document.createElement('div');
  const span1 = document.createElement('span');
  span1.style.fontWeight = 'bold';
  span1.style.userSelect = 'none';
  span1.innerText = key;
  const span2 = document.createElement('span');
  span2.innerText = value !== null ? '' + value : 'null';
  p.appendChild(span1);
  p.appendChild(span2);
  buildTime.appendChild(p);
}

const h1 = document.createElement('h1');
// use caution with `innerHTML`
h1.innerHTML = `<a href="${github}" target="_blank">unplugin-info<a>`;
buildTime.appendChild(h1);

append('Build time: ', format(now, 'yyyy-MM-dd hh:mm'));
append('CI: ', isCI ? ciName : 'Not a CI env');
append('GitHub: ', github ? github : 'Not a github');
append('Branch: ', branch);
append('SHA: ', sha);
append('Abbreviated Sha: ', abbreviatedSha);
append('Tag: ', tag);
append('Last Tag: ', lastTag);
append('Committer: ', committer);
append('Committer Email: ', committerEmail);
append('Committer Date: ', committerDate);
append('Author: ', author);
append('Author Email: ', authorEmail);
append('Author Date: ', authorDate);
append('Commit Message: ', commitMessage);
append('Is Clean: ', isClean ? 'true' : 'false');

append('Message: ', message);

append('Package name: ', name);
append('Package version: ', version);
append(
  'Dependencies: ',
  [...Object.entries(dependencies), ...Object.entries(devDependencies)].map((d) => d[0]).join(' ,')
);
append('', '');

append('You can also open console and play around with it.', '');
