import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite-plus';
export default defineConfig({
	plugins: [react()],
	build: {
		assetsDir: 'build',
		emptyOutDir: true
	}
} as unknown as Parameters<typeof defineConfig>[0]);
