import terser from '@rollup/plugin-terser';

export default {
	input: 'src/index.js',
	output: [{ file: 'dist/index.js', format: 'es', banner: '#!/usr/bin/env node' }],
	external: [
		'node:child_process',
		'node:fs',
		'node:module',
		'node:path',
		'node:url',
		'fs-extra',
		'@clack/prompts',
		'kleur/colors',
		'minimist',
		'oxfmt',
		'pacote'
	],
	plugins: [terser()]
};
