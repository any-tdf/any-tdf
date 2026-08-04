import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { cleanStagedLicense } from './package-license.mjs';
import { verifyPackageConsumers } from './verify-package-consumers.mjs';

const dependencySections = ['dependencies', 'optionalDependencies', 'peerDependencies'];
const manifestDependencySections = [...dependencySections, 'devDependencies'];
const publishLifecycleScripts = ['prepack', 'postpack', 'prepare', 'prepublish', 'prepublishOnly', 'publish', 'postpublish'];
const defaultRegistry = 'https://registry.npmjs.org';

const normalizePath = (path) => path.replaceAll('\\', '/');
const packageSlug = (name) => name.replace(/^@/, '').replaceAll('/', '-');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const runCommand = async (command, options = {}) => {
	const capture = options.capture ?? false;
	const childProcess = Bun.spawn(command, {
		cwd: options.cwd,
		env: { ...process.env, ...options.env },
		stdin: 'ignore',
		stdout: capture ? 'pipe' : 'inherit',
		stderr: capture ? 'pipe' : 'inherit'
	});
	const [exitCode, stdout, stderr] = await Promise.all([
		childProcess.exited,
		capture ? new Response(childProcess.stdout).text() : '',
		capture ? new Response(childProcess.stderr).text() : ''
	]);

	if (exitCode !== 0) {
		const details = [stdout.trim(), stderr.trim()].filter(Boolean).join('\n');
		throw new Error(`Command failed (${exitCode}): ${command.join(' ')}${details ? `\n${details}` : ''}`);
	}

	return { stdout, stderr };
};

export const collectWorkspaces = async (workspaceRoot) => {
	const rootManifest = await Bun.file(resolve(workspaceRoot, 'package.json')).json();
	const patterns = rootManifest.workspaces?.packages ?? [];
	const manifestPaths = new Set();

	for (const pattern of patterns) {
		const glob = new Bun.Glob(`${pattern}/package.json`);
		for await (const path of glob.scan({ cwd: workspaceRoot, onlyFiles: true })) {
			manifestPaths.add(normalizePath(path));
		}
	}

	const workspaces = await Promise.all(
		[...manifestPaths].sort().map(async (manifestPath) => {
			const directory = resolve(workspaceRoot, manifestPath.slice(0, -'/package.json'.length));
			return {
				directory,
				manifestPath,
				manifest: await Bun.file(resolve(workspaceRoot, manifestPath)).json()
			};
		})
	);
	const names = new Set();

	for (const workspace of workspaces) {
		if (!workspace.manifest.name) throw new Error(`Workspace has no name: ${workspace.manifestPath}`);
		if (names.has(workspace.manifest.name)) throw new Error(`Duplicate Workspace name: ${workspace.manifest.name}`);
		names.add(workspace.manifest.name);
	}

	return workspaces;
};

export const getInternalDependencies = (workspace, workspaceNames) => {
	const dependencies = new Set();

	for (const section of dependencySections) {
		for (const dependencyName of Object.keys(workspace.manifest[section] ?? {})) {
			if (workspaceNames.has(dependencyName)) dependencies.add(dependencyName);
		}
	}

	return [...dependencies].sort();
};

export const sortPublishCandidates = (workspaces, candidateNames) => {
	const workspaceByName = new Map(workspaces.map((workspace) => [workspace.manifest.name, workspace]));
	const workspaceNames = new Set(workspaceByName.keys());
	const candidates = new Set(candidateNames);
	const visiting = new Set();
	const visited = new Set();
	const sorted = [];

	const visit = (name, ancestry = []) => {
		if (visited.has(name)) return;
		if (visiting.has(name)) throw new Error(`Circular publish dependency: ${[...ancestry, name].join(' -> ')}`);

		const workspace = workspaceByName.get(name);
		if (!workspace) throw new Error(`Unknown publish candidate: ${name}`);
		visiting.add(name);

		for (const dependencyName of getInternalDependencies(workspace, workspaceNames)) {
			if (candidates.has(dependencyName)) visit(dependencyName, [...ancestry, name]);
		}

		visiting.delete(name);
		visited.add(name);
		sorted.push(workspace);
	};

	for (const name of [...candidates].sort()) visit(name);
	return sorted;
};

export const createSelectedPublishPlan = async (workspaces, selectedNames, versionExists) => {
	const workspaceByName = new Map(workspaces.map((workspace) => [workspace.manifest.name, workspace]));
	const selectedWorkspaces = selectedNames.map((name) => {
		const workspace = workspaceByName.get(name);
		if (!workspace) throw new Error(`Selected npm package is not a Workspace: ${name}`);
		if (workspace.manifest.private === true) throw new Error(`Selected npm package is private: ${name}`);
		return workspace;
	});
	const publicationStates = await Promise.all(
		selectedWorkspaces.map(async (workspace) => ({
			workspace,
			published: await versionExists(workspace.manifest.name, workspace.manifest.version)
		}))
	);
	const candidateNames = publicationStates.filter(({ published }) => !published).map(({ workspace }) => workspace.manifest.name);

	return sortPublishCandidates(workspaces, candidateNames);
};

export const createPublishPlan = async (workspaces, versionExists) =>
	createSelectedPublishPlan(
		workspaces,
		workspaces.filter(({ manifest }) => manifest.private !== true).map(({ manifest }) => manifest.name),
		versionExists
	);

export const collectPublishGateWorkspaces = (workspaces, candidates) => {
	const workspaceByName = new Map(workspaces.map((workspace) => [workspace.manifest.name, workspace]));
	const workspaceNames = new Set(workspaceByName.keys());
	const selected = new Set();

	const visit = (workspace) => {
		if (selected.has(workspace.manifest.name)) return;
		selected.add(workspace.manifest.name);
		for (const dependencyName of getInternalDependencies(workspace, workspaceNames)) {
			visit(workspaceByName.get(dependencyName));
		}
	};

	for (const candidate of candidates) visit(candidate);
	return sortPublishCandidates(workspaces, selected);
};

export const assertInternalDependencyAvailability = async (workspaces, candidates, versionExists, packedManifests = new Map()) => {
	const workspaceByName = new Map(workspaces.map((workspace) => [workspace.manifest.name, workspace]));
	const workspaceNames = new Set(workspaceByName.keys());
	const publicNames = new Set(workspaces.filter(({ manifest }) => manifest.private !== true).map(({ manifest }) => manifest.name));
	const candidateNames = new Set(candidates.map(({ manifest }) => manifest.name));
	const errors = [];

	for (const candidate of candidates) {
		const packedManifest = packedManifests.get(candidate.manifest.name);

		for (const dependencyName of getInternalDependencies(candidate, workspaceNames)) {
			const dependency = workspaceByName.get(dependencyName);
			if (!publicNames.has(dependencyName)) {
				errors.push(`${candidate.manifest.name} depends on private Workspace ${dependencyName}.`);
				continue;
			}

			if (packedManifest) {
				const range = dependencySections.map((section) => packedManifest[section]?.[dependencyName]).find(Boolean);
				if (!range || !Bun.semver.satisfies(dependency.manifest.version, range)) {
					errors.push(
						`${candidate.manifest.name} does not accept ${dependencyName}@${dependency.manifest.version} after packing (${range ?? 'missing range'}).`
					);
				}
			}

			if (!candidateNames.has(dependencyName) && !(await versionExists(dependencyName, dependency.manifest.version))) {
				errors.push(
					`${candidate.manifest.name} requires ${dependencyName}@${dependency.manifest.version}, but that version is neither published nor in this publish batch.`
				);
			}
		}
	}

	if (errors.length) throw new Error(errors.join('\n'));
};

const getExportTargets = (value) => {
	if (typeof value === 'string') return [value];
	if (Array.isArray(value)) return value.flatMap(getExportTargets);
	if (value && typeof value === 'object') return Object.values(value).flatMap(getExportTargets);
	return [];
};

const hasArchiveTarget = (files, target) => {
	if (!target.startsWith('./')) return true;
	const archiveTarget = `package/${target.slice(2)}`;
	if (!archiveTarget.includes('*')) return files.includes(archiveTarget);
	const pattern = new RegExp(`^${escapeRegExp(archiveTarget).replaceAll('\\*', '[^/]+')}$`);
	return files.some((file) => pattern.test(file));
};

const isLocalDependencySpecifier = (value) =>
	/^(?:workspace|catalog|file|link|portal):/i.test(value) ||
	value.startsWith('./') ||
	value.startsWith('../') ||
	value.startsWith('/') ||
	/^[a-zA-Z]:[\\/]/.test(value);

export const validatePackedManifest = (sourceWorkspace, manifest, files) => {
	const errors = [];
	if (manifest.name !== sourceWorkspace.manifest.name || manifest.version !== sourceWorkspace.manifest.version) {
		errors.push(
			`Packed identity must be ${sourceWorkspace.manifest.name}@${sourceWorkspace.manifest.version}, received ${manifest.name}@${manifest.version}.`
		);
	}

	for (const requiredFile of ['package/package.json', 'package/README.md', 'package/LICENSE']) {
		if (!files.includes(requiredFile)) errors.push(`Missing ${requiredFile.slice('package/'.length)}.`);
	}

	for (const section of manifestDependencySections) {
		for (const [dependencyName, value] of Object.entries(manifest[section] ?? {})) {
			if (typeof value !== 'string' || isLocalDependencySpecifier(value)) {
				errors.push(`${section}.${dependencyName} contains an unpublished dependency specifier: ${value}`);
			}
		}
	}

	for (const target of getExportTargets(manifest.exports ?? {})) {
		if (!hasArchiveTarget(files, target)) errors.push(`Export target is missing from the archive: ${target}`);
	}

	for (const field of ['main', 'module', 'types', 'svelte', 'style']) {
		const target = manifest[field];
		if (typeof target === 'string' && !hasArchiveTarget(files, target)) {
			errors.push(`${field} target is missing from the archive: ${target}`);
		}
	}

	const binTargets = typeof manifest.bin === 'string' ? [manifest.bin] : Object.values(manifest.bin ?? {});
	for (const target of binTargets) {
		if (typeof target !== 'string') continue;
		if (!hasArchiveTarget(files, target.startsWith('./') ? target : `./${target}`)) {
			errors.push(`bin target is missing from the archive: ${target}`);
		}
	}

	if (['stdf', 'rtdf', 'vtdf'].includes(manifest.name)) {
		if (!manifest.dependencies?.['@any-tdf/common']) {
			errors.push(`${manifest.name} must publish @any-tdf/common as a dependency.`);
		}
		if (files.some((file) => file.startsWith('package/dist/common/'))) {
			errors.push(`${manifest.name} must not bundle @any-tdf/common into dist/common.`);
		}
	}

	if (errors.length) throw new Error(`${manifest.name ?? sourceWorkspace.manifest.name} package validation failed:\n${errors.join('\n')}`);
};

const sanitizePackedManifest = (manifest) => {
	const scripts = { ...(manifest.scripts ?? {}) };
	for (const scriptName of publishLifecycleScripts) delete scripts[scriptName];
	return { ...manifest, ...(Object.keys(scripts).length ? { scripts } : { scripts: undefined }) };
};

export const packWorkspace = async (workspace, temporaryDirectory) => {
	const slug = `${packageSlug(workspace.manifest.name)}-${workspace.manifest.version}`;
	const finalArchive = resolve(temporaryDirectory, `${slug}-publish.tgz`);
	const extractDirectory = resolve(temporaryDirectory, `${slug}-contents`);
	await mkdir(extractDirectory, { recursive: true });
	const archivesBeforePack = new Set((await readdir(temporaryDirectory)).filter((file) => file.endsWith('.tgz')));

	try {
		await runCommand(['bun', 'pm', 'pack', '--destination', temporaryDirectory, '--quiet'], {
			cwd: workspace.directory
		});
	} finally {
		await cleanStagedLicense(workspace.directory);
	}
	const newArchives = (await readdir(temporaryDirectory)).filter((file) => file.endsWith('.tgz') && !archivesBeforePack.has(file));
	if (newArchives.length !== 1) {
		throw new Error(`Expected one TGZ from ${workspace.manifest.name}, received ${newArchives.join(', ') || 'none'}.`);
	}
	const rawArchive = resolve(temporaryDirectory, newArchives[0]);

	await runCommand(['tar', '-xzf', rawArchive, '-C', extractDirectory]);
	const packageDirectory = resolve(extractDirectory, 'package');
	const manifestPath = resolve(packageDirectory, 'package.json');
	const packedManifest = sanitizePackedManifest(JSON.parse(await readFile(manifestPath, 'utf-8')));
	await writeFile(manifestPath, `${JSON.stringify(packedManifest, null, '\t')}\n`, 'utf-8');

	const { stdout } = await runCommand(['tar', '-tzf', rawArchive], { capture: true });
	const files = stdout
		.trim()
		.split('\n')
		.map((file) => file.replace(/^\.\//, '').replace(/\/$/, ''))
		.filter(Boolean);
	validatePackedManifest(workspace, packedManifest, files);
	await runCommand(['tar', '-czf', finalArchive, '-C', extractDirectory, 'package']);
	await rm(rawArchive, { force: true });

	return { workspace, manifest: packedManifest, files, archivePath: finalArchive };
};

export const publishCandidates = async (packages, options) => {
	const published = [];
	const skipped = [];

	for (const packageData of packages) {
		const { name, version } = packageData.manifest;
		if (await options.versionExists(name, version)) {
			skipped.push(`${name}@${version}`);
			continue;
		}

		await options.publish(packageData);
		published.push(`${name}@${version}`);
		options.markPublished?.(name, version);
	}

	return { published, skipped };
};

export const createRegistryClient = (registry = defaultRegistry) => {
	const normalizedRegistry = registry.replace(/\/$/, '');
	const cache = new Map();
	const getKey = (name, version) => `${name}@${version}`;
	const hasVersion = async (name, version) => {
		const key = getKey(name, version);
		if (cache.get(key) === true) return true;
		const response = await fetch(`${normalizedRegistry}/${encodeURIComponent(name)}/${encodeURIComponent(version)}`, {
			headers: { accept: 'application/json' }
		});
		if (response.status !== 200 && response.status !== 404) {
			throw new Error(`Registry lookup failed for ${key}: ${response.status} ${response.statusText}`);
		}
		const exists = response.status === 200;
		if (exists) cache.set(key, true);
		return exists;
	};

	return {
		hasVersion,
		waitForVersion: async (name, version) => {
			for (let attempt = 0; attempt < 12; attempt += 1) {
				if (await hasVersion(name, version)) return true;
				if (attempt < 11) await Bun.sleep(5000);
			}
			return false;
		},
		markPublished: (name, version) => cache.set(getKey(name, version), true)
	};
};

const assertReleasePolicy = (workspaces) => {
	const workspaceByName = new Map(workspaces.map((workspace) => [workspace.manifest.name, workspace]));
	const stdfVersion = workspaceByName.get('stdf')?.manifest.version;
	const reactVueFrameworks = ['rtdf', 'vtdf'].map((name) => workspaceByName.get(name)).filter(Boolean);

	if (!stdfVersion?.startsWith('3.')) {
		throw new Error(`stdf must remain on the 3.x release line before publishing, received ${stdfVersion ?? 'missing'}.`);
	}
	if (
		reactVueFrameworks.length !== 2 ||
		reactVueFrameworks.some(({ manifest }) => !manifest.version.startsWith('0.')) ||
		new Set(reactVueFrameworks.map(({ manifest }) => manifest.version)).size !== 1
	) {
		throw new Error(
			`rtdf and vtdf must share one 0.x version before publishing: ${reactVueFrameworks
				.map(({ manifest }) => `${manifest.name}@${manifest.version}`)
				.join(', ')}`
		);
	}

	const synchronizedVersionGroups = [
		['@any-tdf/react-confetti', '@any-tdf/vue-confetti'],
		['@any-tdf/react-motion', '@any-tdf/vue-motion'],
		['rtdf', 'vtdf']
	];
	for (const packageNames of synchronizedVersionGroups) {
		const group = packageNames.map((name) => workspaceByName.get(name)).filter(Boolean);
		if (group.length !== packageNames.length || new Set(group.map(({ manifest }) => manifest.version)).size !== 1) {
			throw new Error(
				`Synchronized npm package versions must match before publishing: ${group
					.map(({ manifest }) => `${manifest.name}@${manifest.version}`)
					.join(', ')}`
			);
		}
	}
};

const runPublishGates = async (workspaces) => {
	for (const workspace of workspaces) {
		if (!workspace.manifest.scripts?.['release:check']) {
			throw new Error(`${workspace.manifest.name} must define release:check before it can be published.`);
		}
	}

	for (const workspace of workspaces) {
		console.log(`Running publish gate: ${workspace.manifest.name}`);
		await cleanStagedLicense(workspace.directory);
		try {
			await runCommand(['bun', 'run', 'release:check'], { cwd: workspace.directory });
		} finally {
			await cleanStagedLicense(workspace.directory);
		}
	}
};

export const isTrustedPublishingAuthenticationFailure = (error) => {
	const message = String(error);
	return (
		/ENEEDAUTH|E401|E403|authenticate|authentication|not authorized/i.test(message) ||
		(/E404/i.test(message) && /could not be found|do not have permission/i.test(message))
	);
};

export const isConfiguredNodeAuthToken = (token) => Boolean(token && token !== 'XXXXX-XXXXX');

const npmPublish = async (packageData, dryRun) => {
	const command = [
		'npm',
		'publish',
		packageData.archivePath,
		'--ignore-scripts',
		'--access',
		packageData.manifest.publishConfig?.access ?? 'public'
	];
	const tag = packageData.manifest.publishConfig?.tag;
	if (tag) command.push('--tag', tag);
	if (process.env.GITHUB_ACTIONS === 'true' && process.env.NPM_CONFIG_PROVENANCE !== 'false') {
		command.push('--provenance');
	}
	if (dryRun) command.push('--dry-run');

	const publishWithEnvironment = async (env) => {
		const result = await runCommand(command, { env, capture: true });
		if (result.stdout.trim()) console.log(result.stdout.trim());
		if (result.stderr.trim()) console.error(result.stderr.trim());
	};

	if (isConfiguredNodeAuthToken(process.env.NODE_AUTH_TOKEN)) {
		await publishWithEnvironment({});
		return;
	}

	try {
		await publishWithEnvironment({ NPM_TOKEN: '', NODE_AUTH_TOKEN: '' });
	} catch (error) {
		const token = process.env.NPM_TOKEN;
		const isAuthenticationFailure = isTrustedPublishingAuthenticationFailure(error);
		if (!isAuthenticationFailure) throw error;
		if (!token) {
			throw new Error('npm Trusted Publishing was unavailable and NPM_TOKEN is not configured.', { cause: error });
		}
		console.warn('npm Trusted Publishing was unavailable; retrying with the configured npm token.');
		await publishWithEnvironment({ NPM_TOKEN: token, NODE_AUTH_TOKEN: token });
	}
};

export const parseArguments = (arguments_) => {
	const options = {
		dryRun: false,
		packageNames: [],
		packOnly: false,
		skipConsumers: false,
		skipGates: false,
		registry: process.env.NPM_CONFIG_REGISTRY ?? process.env.npm_config_registry ?? defaultRegistry
	};

	for (const argument of arguments_) {
		if (argument === '--dry-run') options.dryRun = true;
		else if (argument === '--pack-only') options.packOnly = true;
		else if (argument === '--skip-consumers') options.skipConsumers = true;
		else if (argument === '--skip-gates') options.skipGates = true;
		else if (argument.startsWith('--package=')) {
			const packageName = argument.slice('--package='.length);
			if (!packageName) throw new Error('The --package option requires a package name.');
			if (!options.packageNames.includes(packageName)) options.packageNames.push(packageName);
		}
		else if (argument.startsWith('--registry=')) options.registry = argument.slice('--registry='.length);
		else throw new Error(`Unknown npm publish option: ${argument}`);
	}

	return options;
};

export const runPublish = async (workspaceRoot, options) => {
	const workspaces = await collectWorkspaces(workspaceRoot);
	assertReleasePolicy(workspaces);
	const registryClient = createRegistryClient(options.registry);
	const selectedNames = options.packageNames.length
		? options.packageNames
		: workspaces.filter(({ manifest }) => manifest.private !== true).map(({ manifest }) => manifest.name);
	if (process.env.EXPECTED_PACKAGE_VERSION) {
		if (selectedNames.length !== 1) throw new Error('EXPECTED_PACKAGE_VERSION requires exactly one selected npm package.');
		const selectedWorkspace = workspaces.find(({ manifest }) => manifest.name === selectedNames[0]);
		if (selectedWorkspace?.manifest.version !== process.env.EXPECTED_PACKAGE_VERSION) {
			throw new Error(
				`Selected package version mismatch for ${selectedNames[0]}: expected ${process.env.EXPECTED_PACKAGE_VERSION}, received ${selectedWorkspace?.manifest.version ?? 'missing'}`
			);
		}
	}
	const candidates = options.packOnly
		? sortPublishCandidates(workspaces, selectedNames)
		: await createSelectedPublishPlan(workspaces, selectedNames, registryClient.hasVersion);

	if (!candidates.length) {
		console.log(`No unpublished versions found for: ${selectedNames.join(', ')}`);
		return { published: [], skipped: selectedNames };
	}

	const dependencyVersionExists = options.packageNames.length ? registryClient.waitForVersion : registryClient.hasVersion;
	await assertInternalDependencyAvailability(workspaces, candidates, options.packOnly ? async () => true : dependencyVersionExists);
	const gateWorkspaces = collectPublishGateWorkspaces(workspaces, candidates);
	if (!options.skipGates) await runPublishGates(gateWorkspaces);

	const temporaryDirectory = await mkdtemp(resolve(tmpdir(), 'any-tdf-publish-'));
	try {
		const packages = [];
		for (const candidate of candidates) packages.push(await packWorkspace(candidate, temporaryDirectory));
		const packedManifests = new Map(packages.map(({ manifest }) => [manifest.name, manifest]));
		await assertInternalDependencyAvailability(
			workspaces,
			candidates,
			options.packOnly ? async () => true : dependencyVersionExists,
			packedManifests
		);
		if (!options.skipConsumers) {
			await verifyPackageConsumers(workspaceRoot, workspaces, packages, temporaryDirectory);
		}

		if (options.packOnly) {
			for (const packageData of packages) {
				console.log(`Validated package: ${packageData.manifest.name}@${packageData.manifest.version}`);
			}
			return { published: [], skipped: [] };
		}

		const result = await publishCandidates(packages, {
			versionExists: registryClient.hasVersion,
			markPublished: registryClient.markPublished,
			publish: (packageData) => npmPublish(packageData, options.dryRun)
		});
		return result;
	} finally {
		await rm(temporaryDirectory, { recursive: true, force: true });
	}
};

if (import.meta.main) {
	const workspaceRoot = resolve(import.meta.dir, '..');
	await runPublish(workspaceRoot, parseArguments(process.argv.slice(2)));
}
