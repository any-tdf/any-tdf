import React from 'react';
import { renderToString } from 'react-dom/server';
import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { createServer } from 'vite-plus';

type StorageLike = {
	getItem: (key: string) => string | null;
	setItem: (key: string, value: string) => void;
	removeItem: (key: string) => void;
	clear: () => void;
};

const packageRoot = resolve(import.meta.dir, '..');
const workspaceRoot = resolve(packageRoot, '../..');
const pagesRoot = join(packageRoot, 'src/pages');
const skipPages = new Set(['components', 'home']);
const languages = ['zh_CN', 'en_US'] as const;

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
	plugins: [react()],
	resolve: {
		dedupe: ['react', 'react-dom', 'react/jsx-runtime']
	},
	server: {
		fs: {
			allow: [workspaceRoot]
		},
		hmr: false,
		middlewareMode: true
	}
});

const componentExports = await server.ssrLoadModule('rtdf');
const ConfigProvider = componentExports.ConfigProvider as React.ComponentType<{
	locale: unknown;
	theme: string;
	mode: string;
	children?: React.ReactNode;
}>;
const en_US = componentExports.en_US;
const zh_CN = componentExports.zh_CN;
const componentsRequiringProps = new Set(['SvgIcon']);
const strictFailed: { component: string; reason: string }[] = [];
const strictComponentEntries = Object.entries(componentExports)
	.filter(
		([name, value]) =>
			!componentsRequiringProps.has(name) &&
			/^[A-Z]/.test(name) &&
			(typeof value === 'function' || (typeof value === 'object' && value !== null && '$$typeof' in value))
	)
	.sort(([left], [right]) => left.localeCompare(right));

for (const [component, Component] of strictComponentEntries) {
	try {
		renderToString(React.createElement(Component as React.ElementType));
	} catch (error) {
		strictFailed.push({ component, reason: error instanceof Error ? error.message : String(error) });
	}
}

console.log(
	JSON.stringify({ strictChecked: strictComponentEntries.length, strictFailedCount: strictFailed.length, strictFailed }, null, 2)
);

if (strictFailed.length > 0) {
	await server.close();
	process.exit(1);
}

const createStorage = (): StorageLike => {
	const store = new Map<string, string>();
	return {
		getItem: (key) => store.get(key) ?? null,
		setItem: (key, value) => {
			store.set(key, value);
		},
		removeItem: (key) => {
			store.delete(key);
		},
		clear: () => {
			store.clear();
		}
	};
};

const noop = () => {};
const storage = createStorage();
const documentElement = {
	getAttribute: () => 'light',
	setAttribute: noop,
	style: {
		setProperty: noop,
		removeProperty: noop
	}
};
const body = {
	clientWidth: 390,
	style: {},
	getBoundingClientRect: () => ({ width: 390, height: 844, top: 0, right: 390, bottom: 844, left: 0 })
};

Object.assign(globalThis, {
	window: {
		innerWidth: 390,
		innerHeight: 844,
		devicePixelRatio: 2,
		scrollY: 0,
		self: {},
		top: {},
		location: { href: 'http://localhost/', pathname: '/', search: '' },
		history: { replaceState: noop },
		addEventListener: noop,
		removeEventListener: noop,
		setTimeout,
		clearTimeout,
		requestAnimationFrame: (callback: FrameRequestCallback) => setTimeout(() => callback(Date.now()), 16),
		cancelAnimationFrame: (id: number) => clearTimeout(id),
		scrollTo: noop,
		matchMedia: () => ({
			matches: false,
			addEventListener: noop,
			removeEventListener: noop
		})
	},
	document: {
		documentElement,
		body,
		createElement: () => ({
			getContext: () => null,
			style: {},
			width: 0,
			height: 0
		}),
		addEventListener: noop,
		removeEventListener: noop,
		hidden: false
	},
	navigator: {
		userAgent: 'SSR Smoke Test',
		clipboard: { writeText: async () => undefined }
	},
	localStorage: storage,
	sessionStorage: storage,
	getComputedStyle: () => ({
		getPropertyValue: () => ''
	}),
	ResizeObserver: class {
		observe = noop;
		disconnect = noop;
		unobserve = noop;
	},
	MutationObserver: class {
		observe = noop;
		disconnect = noop;
	}
});

const pages = readdirSync(pagesRoot, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && !skipPages.has(entry.name))
	.map((entry) => entry.name)
	.sort();

const failed: { page: string; lang: string; reason: string }[] = [];
const warnings: string[] = [];
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.warn = (...args: unknown[]) => {
	warnings.push(args.map(String).join(' '));
};

console.error = (...args: unknown[]) => {
	warnings.push(args.map(String).join(' '));
};

for (const page of pages) {
	for (const lang of languages) {
		const modulePath = `/src/pages/${page}/${lang}.tsx`;
		const module = await server.ssrLoadModule(modulePath).catch((error: Error) => {
			failed.push({ page, lang, reason: `import failed: ${error.message}` });
			return undefined;
		});
		if (!module?.default) continue;
		const Component = module.default as React.ComponentType;
		try {
			const html = renderToString(
				<ConfigProvider locale={lang === 'zh_CN' ? zh_CN : en_US} theme="ANYTDF" mode="primary">
					<Component />
				</ConfigProvider>
			);
			if (!html) failed.push({ page, lang, reason: 'render returned empty HTML' });
		} catch (error) {
			failed.push({ page, lang, reason: error instanceof Error ? error.message : String(error) });
		}
	}
}

const checked = pages.length * languages.length;
console.warn = originalConsoleWarn;
console.error = originalConsoleError;

console.log(
	JSON.stringify({ pages: pages.length, checked, failedCount: failed.length, failed, warningCount: warnings.length, warnings }, null, 2)
);

await server.close();

if (failed.length > 0 || warnings.length > 0) process.exit(1);
