import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createSSRApp, h, type Component } from 'vue';
import { renderToString } from 'vue/server-renderer';

const packageRoot = resolve(import.meta.dir, '..');
const workspaceRoot = resolve(packageRoot, '../..');
const distEntry = resolve(workspaceRoot, 'packages/vtdf/dist/index.js');

if (!existsSync(distEntry)) {
	console.error(`Missing dist entry: ${distEntry}. Run bun run --filter vtdf build before verify:ssr.`);
	process.exit(1);
}

const globalObject = globalThis as Record<string, unknown>;
['window', 'document', 'navigator', 'localStorage', 'sessionStorage', 'ResizeObserver', 'MutationObserver', 'IntersectionObserver'].forEach(
	(key) => {
		Reflect.deleteProperty(globalObject, key);
	}
);

const componentExports = await import(distEntry);
const componentsRequiringProps = new Set(['SvgIcon']);
const componentEntries = Object.entries(componentExports)
	.filter(
		([name, value]) =>
			!componentsRequiringProps.has(name) &&
			/^[A-Z]/.test(name) &&
			typeof value === 'object' &&
			value !== null &&
			('setup' in value || 'render' in value || 'template' in value)
	)
	.sort(([left], [right]) => left.localeCompare(right));
const failed: { component: string; reason: string }[] = [];

for (const [component, Component] of componentEntries) {
	const app = createSSRApp({
		render: () => h(Component as Component)
	});

	try {
		await renderToString(app);
	} catch (error) {
		failed.push({ component, reason: error instanceof Error ? error.message : String(error) });
	}
}

console.log(JSON.stringify({ checked: componentEntries.length, failedCount: failed.length, failed }, null, 2));

if (failed.length > 0) process.exit(1);
