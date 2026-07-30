import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite-plus';
import tailwindcss from '@tailwindcss/vite';
import md from '@any-tdf/vite-plugin-md-ts';
import svgSymbol from '@any-tdf/vite-plugin-svg-symbol';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(packageRoot, '../..');

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		md({ marked: {}, include: ['../../content/stdf/**/*.md', '../../packages/**/*.md'] }),
		svgSymbol([{ inFile: 'src/lib/symbol', outFile: 'static/fonts', fileName: 'symbol' }])
	],
	server: {
		hmr: true,
		host: '0.0.0.0',
		port: 5555,
		fs: {
			allow: [repositoryRoot]
		}
	},
	build: { assetsDir: 'build' }
} as unknown as Parameters<typeof defineConfig>[0]);
