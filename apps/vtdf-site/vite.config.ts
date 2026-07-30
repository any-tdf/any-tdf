import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import md from '@any-tdf/vite-plugin-md-ts';
import svgSymbol from '@any-tdf/vite-plugin-svg-symbol';
import { defineConfig } from 'vite-plus';

const packageRoot = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(packageRoot, '../..');

export default defineConfig({
	publicDir: 'static',
	plugins: [
		vue(),
		tailwindcss(),
		md({ marked: {}, include: ['../../content/vtdf/**/*.md', '../../packages/**/*.md'] }),
		svgSymbol([
			{
				inFile: 'src/lib/symbol',
				outFile: 'static/fonts',
				fileName: 'symbol'
			}
		])
	],
	resolve: {
		dedupe: ['vue']
	},
	server: {
		host: '0.0.0.0',
		port: 5553,
		fs: {
			allow: [repositoryRoot]
		}
	},
	preview: {
		host: '0.0.0.0',
		port: 5553,
		strictPort: true
	},
	build: {
		assetsDir: 'build',
		emptyOutDir: true
	}
} as unknown as Parameters<typeof defineConfig>[0]);
