import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const runCommand = async (command, cwd) => {
	const childProcess = Bun.spawn(command, {
		cwd,
		env: process.env,
		stdin: 'ignore',
		stdout: 'inherit',
		stderr: 'inherit'
	});
	const exitCode = await childProcess.exited;
	if (exitCode !== 0) throw new Error(`Command failed (${exitCode}): ${command.join(' ')}`);
};

const collectFiles = async (directory) => {
	const files = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = resolve(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await collectFiles(path)));
		else if (entry.isFile()) files.push(path);
	}
	return files;
};

const consumerDefinitions = {
	stdf: {
		label: 'STDF',
		frameworkDependencies: (rootManifest) => ({
			'@sveltejs/vite-plugin-svelte': rootManifest.workspaces.catalogs.svelte['@sveltejs/vite-plugin-svelte'],
			svelte: rootManifest.workspaces.catalogs.svelte.svelte
		}),
		vitePlugin: "import { svelte } from '@sveltejs/vite-plugin-svelte';",
		vitePlugins: 'tailwindcss(), svelte()',
		files: {
			'src/App.svelte': `<script>\n\timport { Button } from 'stdf';\n</script>\n\n<Button fill="solid">STDF</Button>\n`,
			'src/main.js':
				"import './app.css';\nimport { mount } from 'svelte';\nimport App from './App.svelte';\n\nmount(App, { target: document.querySelector('#app') });\n",
			'src/entry-server.js':
				"import { render } from 'svelte/server';\nimport { switchTheme } from 'stdf/theme';\nimport App from './App.svelte';\n\nswitchTheme('ANYTDF');\nexport const html = render(App).body;\n",
			'src/app.css': "@import 'tailwindcss';\n@import 'stdf/source.css';\n\n@plugin \"stdf/theme\" {\n\tall: true;\n}\n"
		}
	},
	rtdf: {
		label: 'RTDF',
		frameworkDependencies: (rootManifest) => ({
			react: rootManifest.workspaces.catalogs.react.react,
			'react-dom': rootManifest.workspaces.catalogs.react['react-dom']
		}),
		vitePlugin: '',
		vitePlugins: 'tailwindcss()',
		files: {
			'src/main.js': "import './app.css';\nimport { Button } from 'rtdf';\n\nexport { Button };\n",
			'src/entry-server.js':
				"import { createElement } from 'react';\nimport { renderToString } from 'react-dom/server';\nimport { Button } from 'rtdf';\nimport { switchTheme } from 'rtdf/theme';\n\nswitchTheme('ANYTDF');\nexport const html = renderToString(createElement(Button, { fill: 'solid' }, 'RTDF'));\n",
			'src/app.css': "@import 'rtdf/style.css';\n",
			'src/source.css': "@import 'tailwindcss';\n@import 'rtdf/source.css';\n"
		}
	},
	vtdf: {
		label: 'VTDF',
		frameworkDependencies: (rootManifest) => ({
			'@vue/server-renderer': rootManifest.workspaces.catalogs.vue['@vue/server-renderer'],
			vue: rootManifest.workspaces.catalogs.vue.vue
		}),
		vitePlugin: '',
		vitePlugins: 'tailwindcss()',
		files: {
			'src/main.js': "import './app.css';\nimport { Button } from 'vtdf';\n\nexport { Button };\n",
			'src/entry-server.js':
				"import { createSSRApp, h } from 'vue';\nimport { renderToString } from '@vue/server-renderer';\nimport { Button } from 'vtdf';\nimport { switchTheme } from 'vtdf/theme';\n\nswitchTheme('ANYTDF');\nconst app = createSSRApp({ render: () => h(Button, { fill: 'solid' }, { default: () => 'VTDF' }) });\nexport const html = await renderToString(app);\n",
			'src/app.css': "@import 'vtdf/style.css';\n",
			'src/source.css': "@import 'tailwindcss';\n@import 'vtdf/source.css';\n"
		}
	}
};

const getInternalDependencyNames = (workspace, workspaceNames) => {
	const names = new Set();
	for (const section of ['dependencies', 'optionalDependencies', 'peerDependencies']) {
		for (const name of Object.keys(workspace.manifest[section] ?? {})) {
			if (workspaceNames.has(name)) names.add(name);
		}
	}
	return [...names];
};

export const verifyPackageConsumers = async (workspaceRoot, workspaces, packages, temporaryDirectory) => {
	const packageByName = new Map(packages.map((packageData) => [packageData.manifest.name, packageData]));
	const workspaceByName = new Map(workspaces.map((workspace) => [workspace.manifest.name, workspace]));
	const workspaceNames = new Set(workspaceByName.keys());
	const rootManifest = await Bun.file(resolve(workspaceRoot, 'package.json')).json();
	let verifiedConsumers = 0;

	for (const [packageName, definition] of Object.entries(consumerDefinitions)) {
		const packageData = packageByName.get(packageName);
		if (!packageData) continue;
		const consumerRoot = resolve(temporaryDirectory, `${packageName}-consumer`);
		await mkdir(resolve(consumerRoot, 'src'), { recursive: true });

		const overrides = {};
		for (const dependencyName of getInternalDependencyNames(workspaceByName.get(packageName), workspaceNames)) {
			const dependencyPackage = packageByName.get(dependencyName);
			if (dependencyPackage) overrides[dependencyName] = `file:${dependencyPackage.archivePath}`;
		}
		const manifest = {
			name: `@any-tdf/${packageName}-consumer-test`,
			private: true,
			type: 'module',
			dependencies: {
				'@tailwindcss/vite': rootManifest.workspaces.catalog['@tailwindcss/vite'],
				[packageName]: `file:${packageData.archivePath}`,
				tailwindcss: rootManifest.workspaces.catalog.tailwindcss,
				vite: rootManifest.workspaces.catalog.vite,
				...definition.frameworkDependencies(rootManifest)
			},
			...(Object.keys(overrides).length ? { overrides } : {})
		};

		await writeFile(resolve(consumerRoot, 'package.json'), `${JSON.stringify(manifest, null, '\t')}\n`, 'utf-8');
		await writeFile(
			resolve(consumerRoot, 'index.html'),
			`${definition.files['src/source.css'] ? '<link rel="stylesheet" href="/src/source.css">\n' : ''}<div id="app"></div>\n<script type="module" src="/src/main.js"></script>\n`,
			'utf-8'
		);
		await writeFile(
			resolve(consumerRoot, 'vite.config.js'),
			`import tailwindcss from '@tailwindcss/vite';\nimport { defineConfig } from 'vite';\n${definition.vitePlugin}\nexport default defineConfig({ plugins: [${definition.vitePlugins}] });\n`,
			'utf-8'
		);
		for (const [path, content] of Object.entries(definition.files)) {
			await writeFile(resolve(consumerRoot, path), content, 'utf-8');
		}

		await runCommand(['bun', 'install', '--ignore-scripts'], consumerRoot);
		await runCommand(['bun', 'run', 'vite', 'build'], consumerRoot);
		await runCommand(['bun', 'run', 'vite', 'build', '--ssr', 'src/entry-server.js', '--outDir', 'ssr'], consumerRoot);
		const serverModule = await import(`${pathToFileURL(resolve(consumerRoot, 'ssr/entry-server.js')).href}?consumer`);
		if (!serverModule.html?.includes(definition.label)) {
			throw new Error(`${packageName} SSR output does not contain ${definition.label}.`);
		}

		const cssFiles = (await collectFiles(resolve(consumerRoot, 'dist'))).filter((file) => file.endsWith('.css'));
		const css = (await Promise.all(cssFiles.map((file) => readFile(file, 'utf-8')))).join('\n');
		if (!css.includes('.shadow-2xl')) {
			throw new Error(`${packageName} Tailwind output did not scan @any-tdf/common/source.css.`);
		}

		const installedFrameworkManifest = JSON.parse(await readFile(resolve(consumerRoot, 'node_modules', packageName, 'package.json'), 'utf-8'));
		if (!installedFrameworkManifest.dependencies?.['@any-tdf/common']) {
			throw new Error(`${packageName} must keep @any-tdf/common as a dependency so consumers install it transitively.`);
		}
		const commonManifestPaths = [
			resolve(consumerRoot, 'node_modules', '@any-tdf', 'common', 'package.json'),
			resolve(consumerRoot, 'node_modules', packageName, 'node_modules', '@any-tdf', 'common', 'package.json')
		];
		if (!commonManifestPaths.some((path) => existsSync(path))) {
			throw new Error(`${packageName} consumer did not receive @any-tdf/common as a transitive dependency.`);
		}
		verifiedConsumers += 1;
		console.log(`Verified consumer: ${packageName} (SSR, theme, Tailwind CSS, transitive common dependency)`);
	}

	return verifiedConsumers;
};
