import { cleanStagedLicense, stageRootLicense } from './package-license.mjs';

const command = process.argv.slice(2);
if (!command.length) {
	throw new Error('Usage: bun run scripts/run-with-root-license.mjs <command> [...arguments]');
}

await stageRootLicense();
let exitCode = 1;

try {
	const childProcess = Bun.spawn(command, {
		cwd: process.cwd(),
		stdin: 'inherit',
		stdout: 'inherit',
		stderr: 'inherit'
	});
	exitCode = await childProcess.exited;
} finally {
	await cleanStagedLicense();
}

process.exit(exitCode);
