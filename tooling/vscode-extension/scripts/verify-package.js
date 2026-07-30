const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const extensionRoot = path.resolve(__dirname, '..');
const sourceManifest = JSON.parse(fs.readFileSync(path.join(extensionRoot, 'package.json'), 'utf-8'));
const vsixPath = path.join(extensionRoot, `${sourceManifest.name}-${sourceManifest.version}.vsix`);
const errors = [];

if (!fs.existsSync(vsixPath)) {
	console.error(`FAIL VS Code package does not exist: ${vsixPath}`);
	process.exit(1);
}

const readArchiveFile = (archivePath) =>
	execFileSync('unzip', ['-p', vsixPath, archivePath], { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
const archiveFiles = execFileSync('unzip', ['-Z1', vsixPath], {
	encoding: 'utf-8',
	maxBuffer: 10 * 1024 * 1024
})
	.trim()
	.split('\n');
const embeddedManifest = JSON.parse(readArchiveFile('extension/package.json'));
const embeddedCore = readArchiveFile('extension/src/core.js');
const apiDocuments = archiveFiles.filter((file) => /^extension\/src\/docs\/(?:stdf|rtdf|vtdf)\/components\/[^/]+\/api(?:_en)?\.md$/.test(file));

if (embeddedManifest.name !== sourceManifest.name || embeddedManifest.version !== sourceManifest.version) {
	errors.push(
		`Embedded manifest must be ${sourceManifest.name}@${sourceManifest.version}, received ${embeddedManifest.name}@${embeddedManifest.version}.`
	);
}

if (embeddedManifest.homepage !== sourceManifest.homepage) {
	errors.push(`Embedded homepage must be ${sourceManifest.homepage}, received ${embeddedManifest.homepage}.`);
}

const embeddedRepository = JSON.stringify(embeddedManifest.repository);
if (!embeddedRepository.includes('any-tdf/any-tdf') || !embeddedRepository.includes('tooling/vscode-extension')) {
	errors.push(`Embedded repository does not point to tooling/vscode-extension: ${embeddedRepository}.`);
}

if (apiDocuments.length !== 360) {
	errors.push(`Expected 360 embedded API documents, received ${apiDocuments.length}.`);
}

for (const requiredFile of ['extension/src/core.js', 'extension/src/extension.js', 'extension/src/menuList.js']) {
	if (!archiveFiles.includes(requiredFile)) errors.push(`Missing required extension file: ${requiredFile}.`);
}

const unexpectedWorkspaceFiles = archiveFiles.filter(
	(file) => file.includes('/node_modules/') || /^extension\/(?:apps|packages|tooling)\//.test(file)
);
if (unexpectedWorkspaceFiles.length) {
	errors.push(`Package contains Workspace files: ${unexpectedWorkspaceFiles.slice(0, 5).join(', ')}.`);
}

for (const legacyRepository of ['stdf', 'rtdf', 'vtdf']) {
	if (embeddedCore.includes(`https://github.com/any-tdf/${legacyRepository}/`)) {
		errors.push(`Embedded core still points to the legacy ${legacyRepository} repository.`);
	}
}

if (!embeddedCore.includes('https://github.com/any-tdf/any-tdf/blob/main')) {
	errors.push('Embedded core does not point to the monorepo source tree.');
}

if (errors.length) {
	console.error(errors.map((error) => `FAIL ${error}`).join('\n'));
	process.exit(1);
}

console.log(
	`PASS VS Code package (${archiveFiles.length} files, ${apiDocuments.length} API documents, ${fs.statSync(vsixPath).size} bytes)`
);
