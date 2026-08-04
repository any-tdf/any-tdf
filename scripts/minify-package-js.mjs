import { resolve } from 'node:path';
import { minify } from 'terser';

const formatBytes = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

export const minifyPackageJavaScript = async (directory) => {
	if (!directory) throw new Error('A package output directory is required.');

	const outputDirectory = resolve(directory);
	const files = [...new Bun.Glob('**/*.{js,mjs,cjs}').scanSync({ cwd: outputDirectory, onlyFiles: true })].sort();
	let originalBytes = 0;
	let minifiedBytes = 0;

	for (const file of files) {
		const filePath = resolve(outputDirectory, file);
		const source = await Bun.file(filePath).text();
		const result = await minify(source, {
			module: !file.endsWith('.cjs'),
			compress: { passes: 2 },
			mangle: true,
			format: { comments: false }
		});
		if (result.code == null) throw new Error(`JavaScript minification produced no output: ${filePath}`);
		const minified = `${result.code.trimEnd()}\n`;
		originalBytes += Buffer.byteLength(source);
		minifiedBytes += Buffer.byteLength(minified);
		await Bun.write(filePath, minified);
	}

	return { files: files.length, originalBytes, minifiedBytes };
};

if (import.meta.main) {
	const result = await minifyPackageJavaScript(process.argv[2]);
	console.log(
		`Minified ${result.files} JavaScript files: ${formatBytes(result.originalBytes)} -> ${formatBytes(result.minifiedBytes)}`
	);
}
