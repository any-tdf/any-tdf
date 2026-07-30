import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
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
	plugins: [
		react(),
		tailwindcss()
		/* RTDF_SVG_SYMBOL_PLUGIN */
	]
} as unknown as Parameters<typeof defineConfig>[0]);
/* RTDF_SVG_SYMBOL_IMPORT */
