import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { collectWorkspaces } from './publish-packages.mjs';

const defaultRepository = 'any-tdf/any-tdf';
const repositoryWebUrl = 'https://github.com/any-tdf/any-tdf';

const releaseProfiles = new Map([
	[
		'@any-tdf/common',
		{
			scope: 'Shared component core',
			description:
				'Changes to shared state derivation, component behavior, themes, locales, types, or SVG data used by STDF, RTDF, and VTDF. Framework-specific rendering changes are excluded.'
		}
	],
	[
		'stdf',
		{
			scope: 'Svelte component library',
			description:
				'This Release only covers Svelte rendering, events, snippets, and package output in `stdf`. Shared cross-framework logic belongs to the `@any-tdf/common` Release.'
		}
	],
	[
		'rtdf',
		{
			scope: 'React component library',
			description:
				'This Release only covers React rendering, events, composition, and package output in `rtdf`. Shared cross-framework logic belongs to the `@any-tdf/common` Release.'
		}
	],
	[
		'vtdf',
		{
			scope: 'Vue component library',
			description:
				'This Release only covers Vue rendering, events, slots, and package output in `vtdf`. Shared cross-framework logic belongs to the `@any-tdf/common` Release.'
		}
	],
	[
		'@any-tdf/react-motion',
		{
			scope: 'React motion runtime',
			description: 'Changes to the React motion runtime used by RTDF.'
		}
	],
	[
		'@any-tdf/vue-motion',
		{
			scope: 'Vue motion runtime',
			description: 'Changes to the Vue motion runtime used by VTDF.'
		}
	],
	[
		'@any-tdf/react-confetti',
		{
			scope: 'React confetti runtime',
			description: 'Changes to the standalone React confetti runtime.'
		}
	],
	[
		'@any-tdf/vue-confetti',
		{
			scope: 'Vue confetti runtime',
			description: 'Changes to the standalone Vue confetti runtime.'
		}
	],
	[
		'create-any-tdf',
		{
			scope: 'Project scaffolding CLI',
			description: 'Changes to the Any TDF project generator, templates, or command-line behavior.'
		}
	]
]);

const fallbackProfile = (name) => ({
	scope: 'Independent npm package',
	description: `This Release only covers changes to the \`${name}\` package.`
});

const packageSlug = (name) => name.replace(/^@/, '').replaceAll('/', '-');

const runCommand = async (command, options = {}) => {
	const childProcess = Bun.spawn(command, {
		cwd: options.cwd,
		env: { ...process.env, ...options.env },
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

export const parseReleasePackages = (value) => {
	const packages = JSON.parse(value);
	if (!Array.isArray(packages)) throw new Error('Release packages must be a JSON array.');

	const versionsByName = new Map();
	for (const packageData of packages) {
		if (!packageData || typeof packageData.name !== 'string' || typeof packageData.version !== 'string') {
			throw new Error('Every release package must provide string name and version fields.');
		}
		const existingVersion = versionsByName.get(packageData.name);
		if (existingVersion && existingVersion !== packageData.version) {
			throw new Error(`Multiple versions were provided for ${packageData.name}.`);
		}
		versionsByName.set(packageData.name, packageData.version);
	}

	return [...versionsByName].map(([name, version]) => ({ name, version }));
};

export const extractChangelogEntry = (changelog, version) => {
	const lines = changelog.replaceAll('\r\n', '\n').split('\n');
	const headingPattern = new RegExp(`^##\\s+${version.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}(?:\\s|$)`);
	const start = lines.findIndex((line) => headingPattern.test(line));
	if (start === -1) return '';

	let end = lines.length;
	for (let index = start + 1; index < lines.length; index += 1) {
		if (/^##\s+/.test(lines[index])) {
			end = index;
			break;
		}
	}

	return lines.slice(start + 1, end).join('\n').trim();
};

export const createReleaseNotes = (workspace, version, changelogEntry) => {
	const { name } = workspace.manifest;
	const profile = releaseProfiles.get(name) ?? fallbackProfile(name);
	const directory = workspace.manifest.repository?.directory ?? workspace.manifestPath.slice(0, -'/package.json'.length);
	const changes = changelogEntry.trim() || `- This release only synchronizes the \`${name}\` package version. It has no package-specific change entry.`;

	return `## Package

- **npm package:** \`${name}\`
- **Version:** \`${version}\`
- **Scope:** ${profile.scope}

${profile.description}

## Changes for \`${name}\`

${changes}

## Package links

- npm: [${name}@${version}](https://www.npmjs.com/package/${name}/v/${version})
- Source: [${directory}](${repositoryWebUrl}/tree/main/${directory})
- License: [MIT](${repositoryWebUrl}/blob/main/LICENSE)
`;
};

export const createGitHubReleasePlan = (workspaces, packages) => {
	const workspaceByName = new Map(workspaces.map((workspace) => [workspace.manifest.name, workspace]));
	return packages.map(({ name, version }) => {
		const workspace = workspaceByName.get(name);
		if (!workspace) throw new Error(`Published package is not a Workspace: ${name}`);
		if (workspace.manifest.private === true) throw new Error(`Private Workspace cannot have an npm release: ${name}`);
		if (workspace.manifest.version !== version) {
			throw new Error(`Release version mismatch for ${name}: expected ${workspace.manifest.version}, received ${version}`);
		}
		return {
			workspace,
			name,
			version,
			tag: `${name}@${version}`,
			title: `${name}@${version}`,
			prerelease: version.includes('-')
		};
	});
};

const readChangelogEntry = async ({ workspace, version }) => {
	const changelogPath = resolve(workspace.directory, 'CHANGELOG.md');
	const changelogFile = Bun.file(changelogPath);
	if (!(await changelogFile.exists())) return '';
	return extractChangelogEntry(await readFile(changelogPath, 'utf-8'), version);
};

const githubReleaseExists = async (repository, tag) => {
	const result = await runCommand(['gh', 'release', 'view', tag, '--repo', repository, '--json', 'tagName'], {
		allowFailure: true
	});
	return result.exitCode === 0;
};

export const createGitHubReleases = async (workspaceRoot, packages, options = {}) => {
	const repository = options.repository ?? process.env.GITHUB_REPOSITORY ?? defaultRepository;
	const target = options.target ?? process.env.RELEASE_TARGET ?? 'main';
	const workspaces = await collectWorkspaces(workspaceRoot);
	const plan = createGitHubReleasePlan(workspaces, packages);
	if (!plan.length) {
		console.log('No package versions were provided for GitHub Releases.');
		return { created: [], skipped: [] };
	}

	const temporaryDirectory = await mkdtemp(resolve(tmpdir(), 'any-tdf-github-releases-'));
	const created = [];
	const skipped = [];
	try {
		for (const release of plan) {
			if (await githubReleaseExists(repository, release.tag)) {
				console.log(`Existing GitHub Release: ${release.tag}`);
				skipped.push(release.tag);
				continue;
			}

			const changelogEntry = await readChangelogEntry(release);
			const notes = createReleaseNotes(release.workspace, release.version, changelogEntry);
			const notesPath = resolve(temporaryDirectory, `${packageSlug(release.name)}-${release.version}.md`);
			await writeFile(notesPath, notes, 'utf-8');
			const command = [
				'gh',
				'release',
				'create',
				release.tag,
				'--repo',
				repository,
				'--target',
				target,
				'--title',
				release.title,
				'--notes-file',
				notesPath
			];
			if (release.prerelease) command.push('--prerelease');
			await runCommand(command);
			console.log(`Created GitHub Release: ${release.tag}`);
			created.push(release.tag);
		}
	} finally {
		await rm(temporaryDirectory, { recursive: true, force: true });
	}

	return { created, skipped };
};

if (import.meta.main) {
	const workspaceRoot = resolve(import.meta.dir, '..');
	const packages = parseReleasePackages(process.env.RELEASE_PACKAGES_JSON ?? '[]');
	await createGitHubReleases(workspaceRoot, packages);
}
