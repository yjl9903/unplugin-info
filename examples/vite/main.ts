import now from '~build/time';
import {
  CI,
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
} from '~build/info';
import { message } from '~build/meta';
import { name, version } from '~build/package';

import { format } from 'date-fns';

console.log('Build time:', now);

const buildTime = document.querySelector('.container') as HTMLElement;

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

append('Build time: ', format(now, 'yyyy-MM-dd hh:mm'));
append('CI: ', CI ? CI : 'Not a CI env');
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
