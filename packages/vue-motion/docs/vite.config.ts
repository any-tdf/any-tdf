import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite-plus';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		dedupe: ['vue']
	},
	server: {
		host: '0.0.0.0',
		port: 8896
	},
	preview: {
		host: '0.0.0.0',
		port: 8897
	},
	build: {
		outDir: 'build',
		emptyOutDir: true
	}
} as unknown as Parameters<typeof defineConfig>[0]);
