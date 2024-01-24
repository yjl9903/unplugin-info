import { name, version } from '~build/package';
import time from '~build/time';
import { isCI } from '~build/ci';
import { github } from '~build/git';

function component(...args: string[]) {
  const element = document.createElement('div');
  args.forEach((text) => {
    const span = document.createElement('span');
    span.textContent = text;
    element.appendChild(span);
  });
  return element;
}

export function app() {
  const element = document.createElement('div');
  element.classList.add('container');
  element.append(component('Project:', name));
  element.append(component('Build date:', time ? time.toLocaleString() : 'Unknown'));
  element.append(component('Environment:', `${process.env.NODE_ENV}${isCI ? '(ci)' : ''}`));
  element.append(component('Version:', version));
  element.append(
    component(`${name} is an open source project, you can view its source code on Github!`)
  );
  github && element.append(component(github));
  return element;
}
