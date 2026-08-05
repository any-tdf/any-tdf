import { appendFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const workspaceRoot = resolve(import.meta.dir, '..');
const fullRunPatterns = [
	'.github/workflows/ci.yml',
	'bun.lock',
	'bunfig.toml',
	'package.json',
	'tsconfig.base.json',
	'turbo.json',
	'vite.config.ts'
];
const routePatterns = [
	...fullRunPatterns,
	'apps/rtdf-demo/',
	'apps/site-common/',
	'apps/stdf-demo/',
	'apps/vtdf-demo/',
	'packages/common/',
	'packages/react-confetti/',
	'packages/react-motion/',
	'packages/rtdf/',
	'packages/stdf/',
	'packages/vite-plugin-md-ts/',
	'packages/vite-plugin-svg-symbol/',
	'packages/vtdf/',
	'packages/vue-confetti/',
	'packages/vue-motion/',
	'scripts/generate-vtdf.mjs',
	'scripts/serve-static.mjs',
	'scripts/verify-demo-previews.mjs'
];
const browserPatterns = [
	...routePatterns,
	'apps/rtdf-site/',
	'apps/stdf-site/',
	'apps/vtdf-site/',
	'content/',
	'scripts/verify-site-previews.mjs',
	'scripts/verify-site-shared-browser.mjs'
];
const publishPatterns = [
	...fullRunPatterns,
	'.changeset/',
	'.github/workflows/publish-npm-package.yml',
	'.github/workflows/publish-npm.yml',
	'.github/workflows/version-packages.yml',
	'LICENSE',
	'packages/common/',
	'packages/create-any-tdf/',
	'packages/react-confetti/',
	'packages/react-motion/',
	'packages/rtdf/',
	'packages/stdf/',
	'packages/vite-plugin-md-ts/',
	'packages/vite-plugin-svg-symbol/',
	'packages/vtdf/',
	'packages/vue-confetti/',
	'packages/vue-motion/',
	'scripts/'
];
const scopePatterns = {
	routes: routePatterns,
	browser: browserPatterns,
	publish: publishPatterns
};

const normalizePath = (path) => path.replaceAll('\\', '/').replace(/^\.\//, '');
const matchesPattern = (path, pattern) => (pattern.endsWith('/') ? path.startsWith(pattern) : path === pattern);

export const getCiScopes = (changedPaths, forceFull = false) => {
	const paths = changedPaths.map(normalizePath);
	return Object.fromEntries(
		Object.entries(scopePatterns).map(([scope, patterns]) => [
			scope,
			forceFull || paths.some((path) => patterns.some((pattern) => matchesPattern(path, pattern)))
		])
	);
};

const readChangedPaths = async (baseRevision, headRevision) => {
	const diffProcess = Bun.spawn(['git', 'diff', '--name-only', '--no-renames', '-z', baseRevision, headRevision], {
		cwd: workspaceRoot,
		stdout: 'pipe',
		stderr: 'pipe'
	});
	const [exitCode, stdout, stderr] = await Promise.all([
		diffProcess.exited,
		new Response(diffProcess.stdout).text(),
		new Response(diffProcess.stderr).text()
	]);

	if (exitCode !== 0) throw new Error(`Unable to detect changed files:\n${stderr.trim()}`);
	return stdout.split('\0').filter(Boolean);
};

const writeGitHubOutputs = async (scopes) => {
	const outputPath = process.env.GITHUB_OUTPUT;
	if (!outputPath) throw new Error('GITHUB_OUTPUT is required when detecting CI scopes.');
	const output = `${Object.entries(scopes)
		.map(([scope, enabled]) => `${scope}=${enabled}`)
		.join('\n')}\n`;
	await appendFile(outputPath, output);
};

if (import.meta.main) {
	const forceFull = process.env.CI_FORCE_FULL === 'true';
	const baseRevision = process.env.CI_COMPARISON_BASE;
	const headRevision = process.env.CI_COMPARISON_HEAD;
	if (!forceFull && (!baseRevision || !headRevision)) {
		throw new Error('CI_COMPARISON_BASE and CI_COMPARISON_HEAD are required for a scoped CI run.');
	}

	const changedPaths = forceFull ? [] : await readChangedPaths(baseRevision, headRevision);
	const scopes = getCiScopes(changedPaths, forceFull);
	await writeGitHubOutputs(scopes);
	console.log(`CI scopes for ${forceFull ? 'a full run' : `${changedPaths.length} changed files`}: ${JSON.stringify(scopes)}`);
}
