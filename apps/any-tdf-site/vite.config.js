import { defineConfig } from 'vite-plus';

export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 5556,
		strictPort: true
	},
	preview: {
		host: '0.0.0.0',
		port: 5556,
		strictPort: true
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true
	}
});
