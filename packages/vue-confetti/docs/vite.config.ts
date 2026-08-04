import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite-plus';
export default defineConfig({
	plugins: [vue()],
	resolve: {
		dedupe: ['vue']
	},
	build: {
		assetsDir: 'build',
		emptyOutDir: true
	}
} as unknown as Parameters<typeof defineConfig>[0]);
