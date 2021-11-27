import html from '../core.js';
import {subscribe} from '../store.js';

const subscriber = subscribe();

function App() {
  return html`
    <h1>Hello world</h1>
  `
}

export default subscriber(App);

