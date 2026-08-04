import { defineConfig } from 'vite-plus';

const ignorePatterns = [
	'**/node_modules/**',
	'**/dist/**',
	'**/build/**',
	'**/.svelte-kit/**',
	'**/.claude/**',
	'**/.turbo/**',
	'**/.vercel/**',
	'**/.vite/**',
	'**/demo-dist/**',
	'**/coverage/**',
	'**/reports/**',
	'**/scripts/**',
	'**/tests/**',
	'**/*.test.*',
	'**/*.spec.*',
	'**/docs/site/**',
	'**/site/**',
	'apps/*-site/static/**/*.min.js',
	'packages/create-any-tdf/snippet/**',
	'packages/create-any-tdf/templates/**'
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
			typeAware: true
		},
		overrides: [
			{
				files: ['packages/common/**'],
				rules: {
					'typescript/no-redundant-type-constituents': 'off'
				}
			}
		]
	}
});
