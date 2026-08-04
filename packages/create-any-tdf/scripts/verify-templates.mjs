import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, readdir, rename, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const defaultWorkspaceRoot = path.resolve(packageRoot, '../..');
const workspaceRootArgIndex = process.argv.indexOf('--workspace-root');
const workspaceRoot = path.resolve(
	workspaceRootArgIndex >= 0 ? process.argv[workspaceRootArgIndex + 1] || defaultWorkspaceRoot : defaultWorkspaceRoot
);
const keepOutput = process.argv.includes('--keep');
const concurrencyArgIndex = process.argv.indexOf('--concurrency');
const concurrency = Number(concurrencyArgIndex >= 0 ? process.argv[concurrencyArgIndex + 1] : 2) || 2;
const cliPath = path.join(packageRoot, 'dist/index.js');

const localPackagePaths = {
	'@any-tdf/common': 'packages/common',
	'@any-tdf/react-confetti': 'packages/react-confetti',
	'@any-tdf/react-motion': 'packages/react-motion',
	'@any-tdf/vue-confetti': 'packages/vue-confetti',
	'@any-tdf/vue-motion': 'packages/vue-motion',
	rtdf: 'packages/rtdf',
	stdf: 'packages/stdf',
	vtdf: 'packages/vtdf'
};

const templateCases = [
	{
		name: 'svelte-sktt',
		framework: 'svelte',
		template: 'sktt',
		theme: 'single',
		library: 'default'
	},
	{
		name: 'svelte-skut',
		framework: 'svelte',
		template: 'skut',
		theme: 'multi',
		library: 'remix'
	},
	{
		name: 'svelte-vstt',
		framework: 'svelte',
		template: 'vstt',
		theme: 'all',
		library: 'lucide'
	},
	{
		name: 'svelte-vsut',
		framework: 'svelte',
		template: 'vsut',
		theme: 'multi',
		library: 'phosphor'
	},
	{
		name: 'react-vrtt',
		framework: 'react',
		template: 'vrtt',
		theme: 'all',
		library: 'tabler'
	},
	{
		name: 'react-vrut',
		framework: 'react',
		template: 'vrut',
		theme: 'multi',
		library: 'iconoir'
	},
	{
		name: 'vue-vrtt',
		framework: 'vue',
		template: 'vrtt',
		theme: 'all',
		library: 'reicon'
	},
	{
		name: 'vue-vrut',
		framework: 'vue',
		template: 'vrut',
		theme: 'multi',
		library: 'default'
	}
];

const singleModeCases = [
	{ name: 'svelte-single-none', framework: 'svelte', template: 'vstt' },
	{ name: 'react-single-none', framework: 'react', template: 'vrtt' },
	{ name: 'vue-single-none', framework: 'vue', template: 'vrtt' }
];

const run = async (command, args, cwd) => {
	try {
		return await execFileAsync(command, args, {
			cwd,
			env: { ...process.env, NO_COLOR: '1' },
			maxBuffer: 1024 * 1024 * 24
		});
	} catch (error) {
		const details = [error.stdout, error.stderr].filter(Boolean).join('\n');
		throw new Error(`${command} ${args.join(' ')} failed in ${cwd}\n${details}`, { cause: error });
	}
};

const runPool = async (items, worker, limit = concurrency) => {
	let nextIndex = 0;
	const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
		while (nextIndex < items.length) {
			const item = items[nextIndex];
			nextIndex += 1;
			await worker(item);
		}
	});
	await Promise.all(runners);
};

const listFiles = async (directory) => {
	const files = [];
	const walk = async (currentDirectory) => {
		for (const entry of await readdir(currentDirectory, {
			withFileTypes: true
		})) {
			const entryPath = path.join(currentDirectory, entry.name);
			if (entry.isDirectory()) await walk(entryPath);
			else files.push(entryPath);
		}
	};
	await walk(directory);
	return files;
};

const prepareLocalPackages = async (outputRoot) => {
	const packRoot = path.join(outputRoot, 'packed');
	const localPackagesRoot = path.join(outputRoot, 'local-packages');
	await mkdir(packRoot, { recursive: true });

	for (const [packageName, relativePath] of Object.entries(localPackagePaths)) {
		const sourcePath = path.join(workspaceRoot, relativePath);
		await run('bun', ['run', 'build'], sourcePath);
		const { stdout } = await run('bun', ['pm', 'pack', '--destination', packRoot, '--ignore-scripts', '--quiet'], sourcePath);
		const archivePath = stdout
			.trim()
			.split('\n')
			.findLast((line) => line.endsWith('.tgz'));
		assert.ok(archivePath, `Unable to locate packed archive for ${packageName}`);

		const destinationPath = path.join(localPackagesRoot, `${relativePath}.tgz`);
		await mkdir(path.dirname(destinationPath), { recursive: true });
		await rename(archivePath, destinationPath);
	}

	return localPackagesRoot;
};

const getAppPath = (projectDirectory, templateCase) => {
	if (templateCase.framework === 'react') return path.join(projectDirectory, 'src/App.tsx');
	if (templateCase.framework === 'vue') return path.join(projectDirectory, 'src/App.vue');
	return templateCase.template.startsWith('sk')
		? path.join(projectDirectory, 'src/routes/+page.svelte')
		: path.join(projectDirectory, 'src/App.svelte');
};

const generateProject = async (outputRoot, localPackagesRoot, templateCase, iconUsage = 'both', themeMode = templateCase.theme) => {
	const projectDirectory = path.join(outputRoot, templateCase.name);
	await run(
		'bun',
		[
			cliPath,
			projectDirectory,
			'--framework',
			templateCase.framework,
			'--template',
			templateCase.template,
			'--icon-usage',
			iconUsage,
			'--theme-mode',
			themeMode,
			'--built-in-icon-library',
			templateCase.library || 'default',
			'--package-manager',
			'bun',
			'--local-packages',
			localPackagesRoot,
			'--language',
			'en_US'
		],
		workspaceRoot
	);
	return projectDirectory;
};

const assertCleanGeneration = async (projectDirectory, templateCase) => {
	const files = await listFiles(projectDirectory);
	assert.equal(
		files.some((file) => file.endsWith(`${path.sep}_gitignore`)),
		false,
		`${templateCase.name} kept packed _gitignore`
	);
	assert.equal(
		files.some((file) => file.endsWith(`${path.sep}.gitignore`)),
		true,
		`${templateCase.name} did not restore .gitignore`
	);
	const forbiddenNames = new Set([
		'.DS_Store',
		'bun.lock',
		'tsconfig.app.tsbuildinfo',
		'tsconfig.node.tsbuildinfo',
		'uno.config.d.ts',
		'uno.config.js',
		'vite.config.d.ts',
		'vite.config.js'
	]);
	assert.equal(
		files.some((file) => forbiddenNames.has(path.basename(file))),
		false,
		`${templateCase.name} copied generated files`
	);
	for (const directoryName of ['dist', 'node_modules', '.svelte-kit']) {
		await assert.rejects(stat(path.join(projectDirectory, directoryName)), `${templateCase.name} copied ${directoryName}`);
	}

	const sourceFiles = files.filter((file) => /\.(?:css|js|json|svelte|ts|tsx|vue)$/.test(file));
	for (const file of sourceFiles) {
		const content = await readFile(file, 'utf8');
		assert.equal(/(?:STDF|RTDF|VTDF)_(?:ICON_EXAMPLES|SVG_SYMBOL|THEME|UNOCSS)|__(?:STDF|RTDF|VTDF)_/.test(content), false, file);
	}

	const packageJson = JSON.parse(await readFile(path.join(projectDirectory, 'package.json'), 'utf8'));
	const frameworkPackage = templateCase.framework === 'svelte' ? 'stdf' : templateCase.framework === 'react' ? 'rtdf' : 'vtdf';
	const dependencyValue = packageJson.dependencies?.[frameworkPackage] || packageJson.devDependencies?.[frameworkPackage];
	assert.equal(dependencyValue.startsWith('file:'), true, `${templateCase.name} did not use the local framework package`);
	assert.equal((await readFile(path.join(projectDirectory, 'vite.config.ts'), 'utf8')).includes('svgSymbol(['), true);
	assert.equal(
		files.some((file) => file.endsWith(path.join('src', 'lib', 'svgs', 'Heroicons', 'cake.svg'))),
		true
	);

	if (templateCase.template.endsWith('ut')) {
		const unoConfig = await readFile(path.join(projectDirectory, 'uno.config.ts'), 'utf8');
		assert.equal(unoConfig.includes('presetIcons({'), true);
		assert.equal(unoConfig.includes("'i-duo-icons:cake'"), true);
	} else {
		const cssPath = path.join(projectDirectory, templateCase.framework === 'svelte' ? 'src/app.css' : 'src/index.css');
		assert.equal((await readFile(cssPath, 'utf8')).includes('@plugin "@iconify/tailwind4"'), true);
		assert.equal(
			Boolean(packageJson.dependencies?.['@any-tdf/common'] || packageJson.devDependencies?.['@any-tdf/common']),
			false,
			`${templateCase.name} must rely on the UI package's transitive common dependency`
		);
	}
};

const assertBuiltProject = async (projectDirectory, templateCase) => {
	const outputDirectory =
		templateCase.framework === 'svelte' && templateCase.template.startsWith('sk')
			? path.join(projectDirectory, '.svelte-kit/output')
			: path.join(projectDirectory, 'dist');
	assert.equal((await stat(outputDirectory)).isDirectory(), true, `${templateCase.name} did not produce build output`);
	const symbolRoot = path.join(
		projectDirectory,
		templateCase.framework === 'svelte' && templateCase.template.startsWith('sk') ? 'static/symbols' : 'public/symbols'
	);
	assert.equal((await stat(path.join(symbolRoot, 'Heroicons.svg'))).isFile(), true, `${templateCase.name} did not emit SVG symbols`);
};

const main = async () => {
	const outputRoot = await mkdtemp(path.join(tmpdir(), 'create-any-tdf-verify-'));
	let succeeded = false;
	try {
		await run('bun', ['run', 'build'], packageRoot);
		const localPackagesRoot = await prepareLocalPackages(outputRoot);
		console.log(`Verification workspace: ${outputRoot}`);

		await runPool(
			templateCases,
			async (templateCase) => {
				const projectDirectory = await generateProject(outputRoot, localPackagesRoot, templateCase);
				await assertCleanGeneration(projectDirectory, templateCase);
				console.log(`generated ${templateCase.name}`);
			},
			4
		);

		await runPool(
			singleModeCases,
			async (templateCase) => {
				const projectDirectory = await generateProject(
					outputRoot,
					localPackagesRoot,
					{ ...templateCase, theme: 'single', library: 'default' },
					'none',
					'single'
				);
				const appContent = await readFile(getAppPath(projectDirectory, templateCase), 'utf8');
				if (templateCase.framework === 'svelte') assert.equal(appContent.includes('switchTheme'), false);
				else assert.equal(appContent.includes('activeTheme'), true);
				assert.equal(appContent.includes(', Icon'), false);
				assert.equal(appContent.includes(', Tabs'), false);
				assert.equal(appContent.includes(', Tab }'), false);
				console.log(`validated options ${templateCase.name}`);
			},
			3
		);

		await runPool(templateCases, async (templateCase) => {
			const projectDirectory = path.join(outputRoot, templateCase.name);
			await run('bun', ['install'], projectDirectory);
			await run('bun', ['run', 'format:check'], projectDirectory);
			await run('bun', ['run', 'check'], projectDirectory);
			await run('bun', ['run', 'build'], projectDirectory);
			await assertBuiltProject(projectDirectory, templateCase);
			console.log(`verified ${templateCase.name}`);
		});

		succeeded = true;
		console.log(`All ${templateCases.length} templates passed generation, install, format check, type check, and build.`);
	} finally {
		if (succeeded && !keepOutput) await rm(outputRoot, { recursive: true, force: true });
		else console.log(`Verification workspace preserved: ${outputRoot}`);
	}
};

await main();
