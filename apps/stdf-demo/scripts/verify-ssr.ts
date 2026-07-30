import { resolve } from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { render } from 'svelte/server';
import { createServer } from 'vite-plus';

const packageRoot = resolve(import.meta.dir, '..');
const workspaceRoot = resolve(packageRoot, '../..');

const globalObject = globalThis as Record<string, unknown>;
['window', 'document', 'navigator', 'localStorage', 'sessionStorage', 'ResizeObserver', 'MutationObserver', 'IntersectionObserver'].forEach(
	(key) => {
		Reflect.deleteProperty(globalObject, key);
	}
);

const server = await createServer({
	appType: 'custom',
	configFile: false,
	logLevel: 'silent',
	plugins: [svelte()],
	server: {
		fs: {
			allow: [workspaceRoot]
		},
		hmr: false,
		middlewareMode: true
	}
});

const failed: { component: string; reason: string }[] = [];

try {
	const componentExports = await server.ssrLoadModule('stdf');
	const componentEntries = Object.entries(componentExports)
		.filter(([name, value]) => /^[A-Z]/.test(name) && typeof value === 'function')
		.sort(([left], [right]) => left.localeCompare(right));

	for (const [component, Component] of componentEntries) {
		try {
			render(Component as Parameters<typeof render>[0], { props: {} });
		} catch (error) {
			failed.push({ component, reason: error instanceof Error ? error.message : String(error) });
		}
	}

	console.log(JSON.stringify({ checked: componentEntries.length, failedCount: failed.length, failed }, null, 2));
} finally {
	await server.close();
}

if (failed.length > 0) process.exit(1);
