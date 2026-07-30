import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

const distDir = resolve(process.cwd(), process.argv[2] || 'dist');
const commonDist = resolve(process.cwd(), 'node_modules/@any-tdf/common/dist');
const targetDir = resolve(distDir, 'common');

if (!existsSync(commonDist)) {
	throw new Error(`Missing common dist: ${commonDist}`);
}

rmSync(targetDir, { recursive: true, force: true });
cpSync(commonDist, targetDir, { recursive: true });

const toImportPath = (fromFile, targetFile) => {
	const relativePath = relative(dirname(fromFile), targetFile).replaceAll('\\', '/');
	return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
};

const getCommonTarget = (subpath = '') => {
	if (!subpath) return 'common/index.js';
	if (['derived', 'lang', 'svg', 'theme', 'types', 'utils'].includes(subpath)) {
		return `common/${subpath}/index.js`;
	}
	return `common/${subpath}.js`;
};

const rewriteCommonImports = (filePath) => {
	if (!/\.(d\.ts|js|svelte|vue)$/.test(filePath)) return;

	const content = readFileSync(filePath, 'utf-8');
	const nextContent = content.replace(/(["'])@any-tdf\/common(?:\/([^"']+))?\1/g, (match, quote, subpath) => {
		const targetFile = resolve(distDir, getCommonTarget(subpath));
		return `${quote}${toImportPath(filePath, targetFile)}${quote}`;
	});

	if (nextContent !== content) {
		writeFileSync(filePath, nextContent, 'utf-8');
	}
};

const walkDistFiles = (dir) => {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const filePath = resolve(dir, entry.name);
		if (entry.isDirectory()) {
			walkDistFiles(filePath);
		} else if (entry.isFile()) {
			rewriteCommonImports(filePath);
		}
	}
};

walkDistFiles(distDir);

for (const cssFile of ['style.css', 'app.css']) {
	const stylePath = resolve(distDir, cssFile);
	if (existsSync(stylePath)) {
		const content = readFileSync(stylePath, 'utf-8')
			.replaceAll('@source "../node_modules/@any-tdf/common/dist";', '@source "./common";')
			.replaceAll("@source '../../common/src';", '@source "./common";');
		writeFileSync(stylePath, content, 'utf-8');
	}
}
