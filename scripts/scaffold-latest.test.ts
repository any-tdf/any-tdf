import { expect, test } from 'bun:test';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

test('scaffolds all frameworks from latest registry versions', async () => {
	const directory = await mkdtemp(resolve(tmpdir(), 'any-tdf-latest-'));
	const preload = resolve(directory, 'registry.mjs');
	await writeFile(preload, `globalThis.fetch = async (url) => {
		const parts = String(url).split('/');
		const tag = parts.at(-1);
		const name = decodeURIComponent(parts.at(-2));
		const stable = name === 'stdf' ? '3.0.0' : '0.0.1';
		return Response.json({ name, version: tag === 'latest' ? stable : stable + '-alpha.999' });
	};\n`);
	try {
		for (const [framework, template, name, section, version] of [
			['svelte', 'vstt', 'stdf', 'devDependencies', '^3.0.0'],
			['react', 'vrtt', 'rtdf', 'dependencies', '^0.0.1'],
			['vue', 'vrtt', 'vtdf', 'dependencies', '^0.0.1']
		]) {
			const projectDirectory = resolve(directory, framework);
			const child = Bun.spawn([
				process.execPath, '--preload', preload,
				resolve(import.meta.dir, '../packages/create-any-tdf/src/index.js'), projectDirectory,
				'-f', framework, '-t', template, '-i', 'none', '-m', 'single', '-p', 'bun', '-b', 'default', '-l', 'en_US'
			], { stdout: 'pipe', stderr: 'pipe' });
			const [exitCode, stdout, stderr] = await Promise.all([
				child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()
			]);
			if (exitCode !== 0) throw new Error(`Scaffolding ${framework} failed:\n${stdout}\n${stderr}`);
			const manifest = JSON.parse(await readFile(resolve(projectDirectory, 'package.json'), 'utf-8'));
			expect(manifest[section][name]).toBe(version);
		}
	} finally {
		await rm(directory, { recursive: true, force: true });
	}
}, 10000);
