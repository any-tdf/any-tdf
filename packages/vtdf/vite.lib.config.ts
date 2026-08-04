import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig } from 'vite-plus';
const ignorePatterns = [
	'node_modules/**',
	'**/node_modules/**',
	'dist/**',
	'**/dist/**',
	'build/**',
	'**/build/**',
	'.svelte-kit/**',
	'**/.svelte-kit/**',
	'demo-dist/**',
	'**/demo-dist/**',
	'coverage/**',
	'**/coverage/**',
	'reports/**',
	'**/reports/**',
	'scripts/**',
	'**/scripts/**',
	'tests/**',
	'**/tests/**',
	'**/*.test.*',
	'**/*.spec.*',
	'docs/site/**',
	'**/docs/site/**',
	'site/**'
];

const externalPackages = [/^vue($|\/)/, /^@any-tdf\/common($|\/)/, /^@any-tdf\/vue-motion($|\/)/, /^tailwindcss($|\/)/];

export default defineConfig({
	fmt: {
		ignorePatterns,
		singleQuote: true,
		semi: true,
		printWidth: 140,
		useTabs: true,
		trailingComma: 'none',
		sortPackageJson: true
	},
	lint: {
		ignorePatterns,
		options: {
			typeAware: true,
			typeCheck: true
		}
	},
	publicDir: false,
	plugins: [vue()],
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		minify: 'oxc',
		lib: {
			entry: {
				index: resolve(__dirname, 'src/lib/index.ts'),
				'components/index': resolve(__dirname, 'src/lib/components/index.ts'),
				'types/index': resolve(__dirname, 'src/lib/types/index.ts'),
				'theme/index': resolve(__dirname, 'src/lib/theme/index.ts'),
				'theme/plugin': resolve(__dirname, 'src/lib/theme/plugin.ts'),
				'svg/index': resolve(__dirname, 'src/lib/svg/index.ts'),
				'lang/index': resolve(__dirname, 'src/lib/lang/index.ts'),
				'components/utils/index': resolve(__dirname, 'src/lib/components/utils/index.ts')
			},
			formats: ['es']
		},
		rollupOptions: {
			external: externalPackages,
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: 'chunks/[name]-[hash].js'
			}
		}
	}
} as unknown as Parameters<typeof defineConfig>[0]);
