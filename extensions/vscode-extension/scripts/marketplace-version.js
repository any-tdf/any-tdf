const fs = require('node:fs');
const path = require('node:path');

const extensionRoot = path.resolve(__dirname, '..');
const manifest = require(path.join(extensionRoot, 'package.json'));
const extensionId = `${manifest.publisher}.${manifest.name}`;

const parseMarketplaceVersions = (output) => {
	const start = output.indexOf('{');
	const end = output.lastIndexOf('}');
	if (start === -1 || end === -1) throw new Error('VS Code Marketplace response did not contain JSON.');
	const metadata = JSON.parse(output.slice(start, end + 1));
	const versions = new Set();

	for (const entry of metadata.versions ?? metadata.allVersions ?? []) {
		if (typeof entry === 'string') versions.add(entry);
		else if (entry?.version) versions.add(entry.version);
	}
	if (metadata.version) versions.add(metadata.version);
	return versions;
};

const writeOutput = (name, value) => {
	if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
	else console.log(`${name}=${value}`);
};

const checkMarketplaceVersion = () => {
	const result = Bun.spawnSync(['bun', 'run', 'vsce', 'show', extensionId, '--json'], {
		cwd: extensionRoot,
		stdout: 'pipe',
		stderr: 'pipe'
	});
	const stdout = result.stdout.toString();
	const stderr = result.stderr.toString();
	let published = false;

	if (result.exitCode === 0) {
		const normalizedOutput = stdout.trim();
		published =
			normalizedOutput !== '' &&
			normalizedOutput !== 'undefined' &&
			normalizedOutput !== 'null' &&
			parseMarketplaceVersions(stdout).has(manifest.version);
	} else if (!/not found|does not exist|could not find/i.test(`${stdout}\n${stderr}`)) {
		throw new Error(`Unable to query ${extensionId}:\n${stderr || stdout}`);
	}

	writeOutput('extension-id', extensionId);
	writeOutput('version', manifest.version);
	writeOutput('published', String(published));
	console.log(
		published
			? `${extensionId}@${manifest.version} already exists in the VS Code Marketplace.`
			: `${extensionId}@${manifest.version} is not published yet.`
	);
	return published;
};

module.exports = { checkMarketplaceVersion, parseMarketplaceVersions };

if (require.main === module) checkMarketplaceVersion();
