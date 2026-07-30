import { createApp } from 'vue';
import App from './App.vue';
import { fadeInUp, reveal, staggerChildren } from './directives/intersectionObserver';
import './app.css';

createApp(App).directive('reveal', reveal).directive('fade-in-up', fadeInUp).directive('stagger-children', staggerChildren).mount('#app');
