import { app } from './app';
import './print-build-info';

const container = document.querySelector('#app') || document.body;
container.appendChild(app());
