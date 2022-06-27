import now from '~build/time';
import {
  CI,
  github,
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
import { format } from 'date-fns';

console.log('Build time:', now);

const buildTime = document.querySelector('#build-time') as HTMLElement;

function append(text: string) {
  const p = document.createElement('p');
  p.innerText = text;
  buildTime.appendChild(p);
}

append('Build time: ' + format(now, 'yyyy-MM-dd hh:mm'));
append('CI: ' + (CI ? CI : 'Not a CI env'));
append('Github: ' + (github ? github : 'Not a github'));
append('sha: ' + sha);
append('abbreviatedSha: ' + abbreviatedSha);
append('tag: ' + tag);
append('lastTag: ' + lastTag);
append('commitsSinceLastTag: ' + commitsSinceLastTag);
append('committer: ' + committer);
append('committerDate: ' + committerDate);
append('author: ' + author);
append('authorDate: ' + authorDate);
append('commitMessage: ' + commitMessage);
