import { mount } from 'svelte';
import 'virtual:uno.css';
import './app.css';
import App from './App.svelte';

const app = mount(App, {
	target: document.getElementById('app')!
});

export default app;
