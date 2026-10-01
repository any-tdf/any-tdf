import { expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { renderGuide } from './generate-skill-guide-references.mjs';

test('guide links resolve offline while external resources and anchors survive', () => {
	const source = '[简体中文](/guide/md?lang=zh_CN)\n\n[Theme](/guide/theme#custom) [MD](/guide/md) [Color](/guide/color) [Button](/components?nav=button&tab=0) [History](/guide/milestone) [External](https://example.com/guide/theme)';
	const result = renderGuide(source, 'rtdf', 'mdPlugin', ['theme', 'mdPlugin']);
	expect(result).not.toContain('简体中文');
	expect(result).toContain('[Theme](./theme.md#custom)');
	expect(result).toContain('[MD](./mdPlugin.md)');
	expect(result).toContain('[Color](../color.md)');
	expect(result).toContain('[Button](../components/button.md)');
	expect(result).toContain('[History](https://rtdf.dev/guide/milestone)');
	expect(result).toContain('[External](https://example.com/guide/theme)');
});

test('check catches changed guide content, library versions, and obsolete files', () => {
	const fixture = mkdtempSync(path.join(os.tmpdir(), 'skill-guide-test-'));
	const sourcePath = path.resolve(import.meta.dir, 'generate-skill-guide-references.mjs');
	const guideDirectory = path.join(fixture, 'content/rtdf/guide');
	const references = path.join(fixture, 'packages/skills/rtdf-skill/rtdf/references');
	const manifestPath = path.join(fixture, 'packages/rtdf/package.json');
	const scriptPath = path.join(fixture, 'scripts/generate-skill-guide-references.mjs');
	const run = (check = false) => spawnSync(process.execPath, [scriptPath, '--target', 'rtdf', ...(check ? ['--check'] : [])], { encoding: 'utf-8' });
	try {
		for (const directory of [guideDirectory, references, path.dirname(manifestPath), path.dirname(scriptPath), path.join(fixture, 'node_modules/.bin')]) mkdirSync(directory, { recursive: true });
		writeFileSync(scriptPath, readFileSync(sourcePath));
		const formatter = path.join(fixture, 'node_modules/.bin/vp');
		writeFileSync(formatter, `#!/usr/bin/env bun\nimport { spawnSync } from 'node:child_process';\nconst result = spawnSync(${JSON.stringify(path.resolve(import.meta.dir, '../node_modules/.bin/vp'))}, process.argv.slice(2), { cwd: ${JSON.stringify(path.resolve(import.meta.dir, '..'))}, stdio: 'inherit' });\nprocess.exit(result.status ?? 1);\n`);
		chmodSync(formatter, 0o755);
		writeFileSync(manifestPath, JSON.stringify({ version: '0.0.1' }));
		for (const name of ['quickStart', 'compatibility', 'theme', 'icon', 'iconPlugin', 'internation', 'create', 'feedback', 'utils', 'mdPlugin']) writeFileSync(path.join(guideDirectory, `${name}_en.md`), `# ${name}\n\nOriginal.\n`);
		const initial = run();
		if (initial.status !== 0) throw new Error(initial.stderr || initial.stdout);
		expect(run(true).status).toBe(0);
		writeFileSync(path.join(guideDirectory, 'utils_en.md'), '# Utilities\n\nNew API.\n');
		expect(run(true).status).not.toBe(0);
		expect(run().status).toBe(0);
		writeFileSync(manifestPath, JSON.stringify({ version: '0.0.2' }));
		expect(run(true).status).not.toBe(0);
		expect(run().status).toBe(0);
		writeFileSync(path.join(references, 'guides/obsolete.md'), 'Obsolete.');
		expect(run(true).status).not.toBe(0);
		expect(run().status).toBe(0);
		expect(run(true).status).toBe(0);
	} finally {
		rmSync(fixture, { recursive: true, force: true });
	}
});
