import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite-plus';
export default defineConfig({
	plugins: [sveltekit()]
} as unknown as Parameters<typeof defineConfig>[0]);
