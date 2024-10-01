import '~build/console';

import { app } from './app';

const container = document.querySelector('#app') || document.body;
container.appendChild(app());
