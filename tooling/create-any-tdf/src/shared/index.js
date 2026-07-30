import { execFile } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const builtInIconLibraryOptions = [
	{ value: 'default', library: 'remix', label: 'Default (Remix)' },
	{ value: 'remix', library: 'remix', label: 'Remix' },
	{ value: 'lucide', library: 'lucide', label: 'Lucide' },
	{ value: 'phosphor', library: 'phosphor', label: 'Phosphor' },
	{ value: 'tabler', library: 'tabler', label: 'Tabler' },
	{ value: 'iconoir', library: 'iconoir', label: 'Iconoir' },
	{ value: 'reicon', library: 'reicon', label: 'Reicon' }
];

export const getBuiltInIconLibraryOptions = () =>
	builtInIconLibraryOptions.map((item) => ({
		value: item.value,
		label: item.label
	}));

export const getRegistryPackageName = (packageName) => packageName.replace('/', '%2F');
export const getPackageSpec = (packageName, tag = 'latest') => (tag === 'latest' ? packageName : `${packageName}@${tag}`);
export const getDependencyVersion = (version) => (version.includes('-') ? version : `^${version}`);

export const createLanguageOptions = (langAll) => {
	const languages = [];
	for (const key in langAll) {
		languages.push({ value: key, label: langAll[key].name, sort: langAll[key].sort });
	}
	languages.sort((a, b) => a.sort - b.sort);
	return languages;
};

export const createVersionResolver = ({ packageRoot, fallbackVersions }) => {
	const packageRequire = createRequire(path.join(packageRoot, 'package.json'));
	const matchesRequestedTag = (manifest, tag) =>
		tag === 'latest' ||
		manifest?.['dist-tags']?.[tag] === manifest?.version ||
		(typeof manifest?.version === 'string' && manifest.version.includes(`-${tag}`));

	const getRegistryManifest = async (packageName, tag) => {
		const registryAbortController = new AbortController();
		const registryTimeout = setTimeout(() => registryAbortController.abort(), 8000);
		try {
			const response = await fetch(`https://registry.npmjs.org/${getRegistryPackageName(packageName)}/${tag}`, {
				signal: registryAbortController.signal
			});
			if (response.ok) return await response.json();
			return null;
		} catch {
			return null;
		} finally {
			clearTimeout(registryTimeout);
		}
	};

	const getBunManifest = (packageName, tag = 'latest') =>
		new Promise((resolve) => {
			execFile('bun', ['pm', 'view', getPackageSpec(packageName, tag), '--json'], { cwd: packageRoot, timeout: 8000 }, (error, stdout) => {
				if (error || !stdout.trim()) {
					resolve(null);
					return;
				}

				try {
					resolve(JSON.parse(stdout));
				} catch {
					resolve(null);
				}
			});
		});

	const getLatestManifest = async (packageName, tag = 'latest') => {
		const registryManifest = await getRegistryManifest(packageName, tag);
		if (registryManifest?.version) return registryManifest;

		const bunManifest = await getBunManifest(packageName, tag);
		if (bunManifest?.version && matchesRequestedTag(bunManifest, tag)) return bunManifest;

		try {
			const pacotePath = packageRequire.resolve('pacote');
			const pacote = await import(pathToFileURL(pacotePath).href);
			const pacoteManifest = await (pacote.default || pacote).manifest(getPackageSpec(packageName, tag));
			return matchesRequestedTag(pacoteManifest, tag) ? pacoteManifest : null;
		} catch {
			return null;
		}
	};

	const getLatestVersion = async (packageName, tag = 'latest') => {
		const manifest = await getLatestManifest(packageName, tag);
		return manifest?.version || fallbackVersions[packageName] || null;
	};

	return { getLatestManifest, getLatestVersion };
};

export const createDependencyAdder =
	(getLatestVersion) =>
	async (packageJson, section, packageName, versionPrefix = '^') => {
		const latestVersion = await getLatestVersion(packageName);
		if (latestVersion) {
			packageJson[section][packageName] = `${versionPrefix}${latestVersion}`;
		}
	};

export const writeJson = (filePath, data, indent = '\t') => {
	const spacing = indent === '\t' ? '\t' : Number(indent);
	fs.writeFileSync(filePath, `${JSON.stringify(data, null, spacing)}\n`, 'utf-8');
};

export const replaceFileContent = (filePath, replacements) => {
	let content = fs.readFileSync(filePath, 'utf-8');
	for (const [from, to] of replacements) {
		content = content.replace(from, to);
	}
	fs.writeFileSync(filePath, content, 'utf-8');
};

export const formatBlockForMarker = (block, indent) => (block ? block.trimEnd().replace(/\n/g, `\n${indent}`) : '');
