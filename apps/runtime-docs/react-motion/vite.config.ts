import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite-plus';
export default defineConfig({
	plugins: [react()],
	server: {
		host: '0.0.0.0',
		port: 8898
	},
	preview: {
		host: '0.0.0.0',
		port: 8899
	},
	build: {
		outDir: 'build',
		emptyOutDir: true
	}
} as unknown as Parameters<typeof defineConfig>[0]);
