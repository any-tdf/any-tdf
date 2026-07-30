import { copyFile, readFile, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const rootPackageName = '@any-tdf/monorepo';

export const findWorkspaceRoot = async (startDirectory = process.cwd()) => {
	let directory = resolve(startDirectory);

	while (true) {
		const manifestFile = Bun.file(resolve(directory, 'package.json'));
		if (await manifestFile.exists()) {
			const manifest = await manifestFile.json();
			if (manifest.name === rootPackageName) return directory;
		}

		const parentDirectory = dirname(directory);
		if (parentDirectory === directory) {
			throw new Error(`Cannot find ${rootPackageName} from ${startDirectory}.`);
		}
		directory = parentDirectory;
	}
};

export const stageRootLicense = async (targetDirectory = process.cwd()) => {
	const workspaceRoot = await findWorkspaceRoot(targetDirectory);
	const sourceFile = resolve(workspaceRoot, 'LICENSE');
	const targetFile = resolve(targetDirectory, 'LICENSE');

	if (targetFile === sourceFile) throw new Error('Cannot stage the root License onto itself.');
	await copyFile(sourceFile, targetFile);
	console.log(`Staged root LICENSE in ${targetDirectory}.`);
};

export const cleanStagedLicense = async (targetDirectory = process.cwd()) => {
	const workspaceRoot = await findWorkspaceRoot(targetDirectory);
	const sourceFile = resolve(workspaceRoot, 'LICENSE');
	const targetFile = resolve(targetDirectory, 'LICENSE');
	const target = Bun.file(targetFile);

	if (!(await target.exists())) return;

	const [sourceContent, targetContent] = await Promise.all([
		readFile(sourceFile),
		readFile(targetFile)
	]);
	if (!sourceContent.equals(targetContent)) {
		throw new Error(`Refusing to remove a LICENSE that differs from the root License: ${targetFile}`);
	}

	await rm(targetFile);
	console.log(`Removed staged LICENSE from ${targetDirectory}.`);
};

if (import.meta.main) {
	const action = process.argv[2];
	if (action === 'stage') await stageRootLicense();
	else if (action === 'clean') await cleanStagedLicense();
	else throw new Error('Usage: bun run scripts/package-license.mjs <stage|clean>');
}
