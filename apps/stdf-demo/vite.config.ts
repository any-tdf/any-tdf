import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite-plus';
import tailwindcss from '@tailwindcss/vite';
import svgSymbol from '@any-tdf/vite-plugin-svg-symbol';
const packageRoot = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(packageRoot, '../..');

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		svgSymbol([{ inFile: resolve(repositoryRoot, 'apps/site-common/assets/svgs'), outFile: 'static/fonts', fileName: 'symbol' }])
	],
	server: {
		hmr: true,
		host: '0.0.0.0',
		port: 8888,
		fs: {
			allow: [repositoryRoot]
		}
	},
	preview: {
		host: '0.0.0.0',
		port: 8888,
		strictPort: true
	}
} as unknown as Parameters<typeof defineConfig>[0]);
