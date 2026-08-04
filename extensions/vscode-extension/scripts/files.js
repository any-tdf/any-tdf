const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { execFileSync } = require('node:child_process');

const extensionRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(extensionRoot, '../..');
const targets = ['stdf', 'rtdf', 'vtdf'];
const checkOnly = process.argv.includes('--check');
const errors = [];
let apiDocumentCount = 0;

const ensureDir = (dir) => {
	fs.mkdirSync(dir, { recursive: true });
};

const readFile = (filePath) => (fs.existsSync(filePath) ? fs.readFileSync(filePath) : undefined);

const checkFile = (targetFile, expectedContent, label) => {
	const actualContent = readFile(targetFile);
	if (!actualContent || !actualContent.equals(expectedContent)) {
		errors.push(`${label} is not synchronized: ${path.relative(workspaceRoot, targetFile)}`);
	}
};

const collectFiles = (directory, baseDirectory = directory) => {
	if (!fs.existsSync(directory)) return [];

	return fs
		.readdirSync(directory, { withFileTypes: true })
		.flatMap((entry) => {
			const absolutePath = path.join(directory, entry.name);
			if (entry.isDirectory()) return collectFiles(absolutePath, baseDirectory);
			return [path.relative(baseDirectory, absolutePath)];
		})
		.sort();
};

const getApiDocuments = (target) => {
	const sourceDir = path.join(workspaceRoot, 'content', target, 'components');
	if (!fs.existsSync(sourceDir)) throw new Error(`Cannot find ${sourceDir}.`);

	const documents = new Map();
	const components = fs
		.readdirSync(sourceDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort();

	for (const component of components) {
		for (const fileName of ['api.md', 'api_en.md']) {
			const sourceFile = path.join(sourceDir, component, fileName);
			if (fs.existsSync(sourceFile)) documents.set(path.join(component, fileName), sourceFile);
		}
	}

	return { components, documents };
};

const synchronizeApiDocs = (target) => {
	const targetDir = path.join(extensionRoot, 'src/docs', target, 'components');
	const { components, documents } = getApiDocuments(target);
	apiDocumentCount += documents.size;

	if (checkOnly) {
		for (const component of components) {
			for (const fileName of ['api.md', 'api_en.md']) {
				if (!documents.has(path.join(component, fileName))) {
					errors.push(`${target.toUpperCase()} component "${component}" is missing ${fileName}.`);
				}
			}
		}

		const expectedFiles = [...documents.keys()].sort();
		const actualFiles = collectFiles(targetDir);
		if (JSON.stringify(actualFiles) !== JSON.stringify(expectedFiles)) {
			errors.push(`${target.toUpperCase()} API document file list is not synchronized.`);
		}

		for (const [relativePath, sourceFile] of documents) {
			checkFile(path.join(targetDir, relativePath), fs.readFileSync(sourceFile), `${target.toUpperCase()} API document`);
		}
		return;
	}

	fs.rmSync(targetDir, { recursive: true, force: true });
	ensureDir(targetDir);
	for (const [relativePath, sourceFile] of documents) {
		const targetFile = path.join(targetDir, relativePath);
		ensureDir(path.dirname(targetFile));
		fs.copyFileSync(sourceFile, targetFile);
	}

	console.log(`Copied ${target} API docs for ${components.length} components.`);
};

const formatMenuList = (menuList) => {
	const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'any-tdf-vscode-'));
	const temporaryFile = path.join(temporaryDirectory, 'menuList.js');
	fs.writeFileSync(temporaryFile, `module.exports = ${JSON.stringify(menuList, null, '\t')};\n`, 'utf-8');

	try {
		execFileSync(process.execPath, ['x', 'vp', 'fmt', temporaryFile], {
			cwd: extensionRoot,
			stdio: 'pipe'
		});
		return fs.readFileSync(temporaryFile);
	} finally {
		fs.rmSync(temporaryDirectory, { recursive: true, force: true });
	}
};

const synchronizeMenuList = async () => {
	const dataPath = path.join(workspaceRoot, 'apps/site-common/dist/data.js');
	if (!fs.existsSync(dataPath)) {
		throw new Error(`Cannot find ${dataPath}. Run the site-common build first.`);
	}

	const { menuList } = await import(pathToFileURL(dataPath).href);
	const expectedContent = formatMenuList(menuList);
	const menuListPath = path.join(extensionRoot, 'src/menuList.js');

	if (checkOnly) {
		checkFile(menuListPath, expectedContent, 'VS Code menu data');
		return;
	}

	fs.writeFileSync(menuListPath, expectedContent);
	console.log('Generated src/menuList.js.');
};

const main = async () => {
	for (const target of targets) synchronizeApiDocs(target);
	await synchronizeMenuList();

	if (errors.length) {
		console.error(errors.map((error) => `FAIL ${error}`).join('\n'));
		process.exit(1);
	}

	if (checkOnly) console.log(`PASS VS Code generated files (${apiDocumentCount} API documents)`);
};

main();
