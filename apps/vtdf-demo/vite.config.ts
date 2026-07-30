import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import svgSymbol from '@any-tdf/vite-plugin-svg-symbol';
import { defineConfig } from 'vite-plus';

const packageRoot = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(packageRoot, '../..');

export default defineConfig({
	plugins: [
		vue(),
		tailwindcss(),
		svgSymbol([
			{
				inFile: resolve(repositoryRoot, 'apps/site-common/assets/svgs'),
				outFile: 'public/fonts',
				fileName: 'symbol',
				simple: false
			}
		])
	],
	resolve: {
		dedupe: ['vue']
	},
	server: {
		host: '0.0.0.0',
		port: 8886,
		strictPort: true,
		fs: {
			allow: [repositoryRoot]
		}
	},
	preview: {
		host: '0.0.0.0',
		port: 8886,
		strictPort: true
	},
	build: {
		outDir: 'demo-dist'
	}
} as unknown as Parameters<typeof defineConfig>[0]);
