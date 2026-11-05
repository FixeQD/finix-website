import { hydrate, mount } from 'svelte';
import App from './App.svelte';
import './shared';

// The build pre-renders the page into #app, so the browser hydrates it. In dev the element is empty.
const target = document.getElementById('app')!;
export default target.hasChildNodes() ? hydrate(App, { target }) : mount(App, { target });
