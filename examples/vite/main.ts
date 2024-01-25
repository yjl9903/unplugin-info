import now from '~build/time';
import {
  github,
  branch,
  sha,
  abbreviatedSha,
  tag,
  lastTag,
  commitsSinceLastTag,
  committer,
  committerDate,
  author,
  authorDate,
  commitMessage
} from '~build/git';
import { message } from '~build/meta';
import { name, version } from '~build/package';
import { isCI, name as ciName } from '~build/ci';

import { format } from 'date-fns';
import './playground';

const buildTime = document.querySelector<HTMLElement>('.container')!;

function append(key: string, value: string | number | null) {
  const p = document.createElement('div');
  const span1 = document.createElement('span');
  span1.style.fontWeight = 'bold';
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
append('Github: ', github ? github : 'Not a github');
append('Branch: ', branch);
append('SHA: ', sha);
append('AbbreviatedSha: ', abbreviatedSha);
append('Tag: ', tag);
append('LastTag: ', lastTag);
append('CommitsSinceLastTag: ', commitsSinceLastTag);
append('Committer: ', committer);
append('CommitterDate: ', committerDate);
append('Author: ', author);
append('AuthorDate: ', authorDate);
append('CommitMessage: ', commitMessage);

append('Message: ', message);

append('Package name: ', name);
append('Package version: ', version);
append('', '');

append('You can also open console and play around with it.', '');

const printBuildInfo = () => {
  if (process.env.NODE_ENV === 'development') {
    return;
  }
  console.group('Build info');
  console.log('Project:', name);
  console.log('Build date:', now ? now.toLocaleString() : 'Unknown');
  console.log('Environment:', `${process.env.NODE_ENV}${isCI ? '(ci)' : ''}`);
  console.log('Version:', version);
  console.log(`${name} is an open source project, you can view its source code on Github!`);
  console.log(github);
  console.groupEnd();
};

printBuildInfo();
