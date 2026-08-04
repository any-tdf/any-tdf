import { defineConfig } from 'vite-plus';

export default defineConfig({
	pack: {
		entry: ['src/index.js'],
		banner: '#!/usr/bin/env node',
		deps: {
			neverBundle: true
		},
		minify: true,
		outputOptions: {
			entryFileNames: '[name].js'
		}
	}
});
