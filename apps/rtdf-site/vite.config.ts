import { defineConfig } from 'vite-plus';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import md from '@any-tdf/vite-plugin-md-ts';
import svgSymbol from '@any-tdf/vite-plugin-svg-symbol';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(__dirname, '../..');

export default defineConfig({
	publicDir: 'static',
	plugins: [
		react(),
		tailwindcss(),
		md({ marked: {}, include: ['../../content/rtdf/**/*.md', '../../packages/**/*.md'] }),
		svgSymbol([{ inFile: 'src/lib/symbol', outFile: 'static/fonts', fileName: 'symbol' }])
	],
	resolve: {
		dedupe: ['react', 'react-dom', 'react/jsx-runtime']
	},
	server: {
		hmr: true,
		host: '0.0.0.0',
		port: 5554,
		fs: {
			allow: [repositoryRoot]
		}
	},
	build: { assetsDir: 'build', emptyOutDir: true }
} as unknown as Parameters<typeof defineConfig>[0]);
