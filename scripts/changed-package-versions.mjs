import { appendFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { collectWorkspaces, getInternalDependencies } from './publish-packages.mjs';

const runCommand = async (command, options = {}) => {
	const childProcess = Bun.spawn(command, {
		cwd: options.cwd,
		stdin: 'ignore',
		stdout: 'pipe',
		stderr: 'pipe'
	});
	const [exitCode, stdout, stderr] = await Promise.all([
		childProcess.exited,
		new Response(childProcess.stdout).text(),
		new Response(childProcess.stderr).text()
	]);

	if (exitCode !== 0 && !options.allowFailure) {
		const details = [stdout.trim(), stderr.trim()].filter(Boolean).join('\n');
		throw new Error(`Command failed (${exitCode}): ${command.join(' ')}${details ? `\n${details}` : ''}`);
	}

	return { exitCode, stdout, stderr };
};

export const collectVersionChanges = async (workspaces, readPreviousManifest) => {
	const changes = [];

	for (const workspace of workspaces.filter(({ manifest }) => manifest.private !== true)) {
		const previousManifest = await readPreviousManifest(workspace.manifestPath);
		if (previousManifest?.version === workspace.manifest.version) continue;
		changes.push({
			name: workspace.manifest.name,
			version: workspace.manifest.version,
			manifestPath: workspace.manifestPath
		});
	}

	return changes.sort((left, right) => left.name.localeCompare(right.name));
};

export const createPublishTiers = (workspaces, changes) => {
	const workspaceByName = new Map(workspaces.map((workspace) => [workspace.manifest.name, workspace]));
	const workspaceNames = new Set(workspaceByName.keys());
	const changedNames = new Set(changes.map(({ name }) => name));
	const depths = new Map();
	const visiting = new Set();

	const getDepth = (name) => {
		if (depths.has(name)) return depths.get(name);
		if (visiting.has(name)) throw new Error(`Circular changed-package dependency involving ${name}.`);
		const workspace = workspaceByName.get(name);
		if (!workspace) throw new Error(`Changed package is not a Workspace: ${name}`);
		visiting.add(name);
		const dependencies = getInternalDependencies(workspace, workspaceNames).filter((dependencyName) =>
			changedNames.has(dependencyName)
		);
		const depth = dependencies.length ? Math.max(...dependencies.map(getDepth)) + 1 : 0;
		visiting.delete(name);
		depths.set(name, depth);
		return depth;
	};

	for (const { name } of changes) getDepth(name);
	const maximumDepth = Math.max(0, ...depths.values());
	if (maximumDepth > 1) {
		throw new Error(`The npm publish workflow supports two dependency tiers, but the changed package graph requires ${maximumDepth + 1}.`);
	}

	return {
		all: changes,
		level0: changes.filter(({ name }) => depths.get(name) === 0),
		level1: changes.filter(({ name }) => depths.get(name) === 1),
		releases: changes.filter(({ version }) => !/-alpha(?:[.+-]|$)/i.test(version))
	};
};

const readManifestAtRevision = async (workspaceRoot, revision, manifestPath) => {
	if (!revision || /^0+$/.test(revision)) return undefined;
	const result = await runCommand(['git', 'show', `${revision}:${manifestPath}`], {
		cwd: workspaceRoot,
		allowFailure: true
	});
	if (result.exitCode !== 0) return undefined;
	return JSON.parse(result.stdout);
};

const writeGitHubOutputs = async (path, tiers) => {
	const output = [
		`all=${JSON.stringify(tiers.all)}`,
		`level0=${JSON.stringify(tiers.level0)}`,
		`level1=${JSON.stringify(tiers.level1)}`,
		`releases=${JSON.stringify(tiers.releases)}`
	].join('\n');
	await appendFile(path, `${output}\n`, 'utf-8');
};

if (import.meta.main) {
	const workspaceRoot = resolve(import.meta.dir, '..');
	const baseRevision = process.env.BASE_SHA;
	const workspaces = await collectWorkspaces(workspaceRoot);
	const changes = await collectVersionChanges(workspaces, (manifestPath) =>
		readManifestAtRevision(workspaceRoot, baseRevision, manifestPath)
	);
	const tiers = createPublishTiers(workspaces, changes);

	if (tiers.all.length) {
		console.log('Changed npm package versions:');
		for (const packageData of tiers.all) console.log(`- ${packageData.name}@${packageData.version}`);
	} else {
		console.log('No public npm package versions changed.');
	}

	if (process.env.GITHUB_OUTPUT) await writeGitHubOutputs(process.env.GITHUB_OUTPUT, tiers);
}
