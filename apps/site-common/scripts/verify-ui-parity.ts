import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

type CDPMessage = {
	id?: number;
	method?: string;
	params?: unknown;
	result?: unknown;
	error?: { message: string };
};

type Site = {
	name: 'STDF' | 'RTDF' | 'VTDF';
	baseUrl: string;
};

type MetricSpec = {
	selector: string;
	height?: boolean;
};

type ElementMetrics = Record<string, string | number>;

const sites: Site[] = [
	{ name: 'STDF', baseUrl: process.env.STDF_SITE_VERIFY_BASE_URL ?? 'http://127.0.0.1:4173' },
	{ name: 'RTDF', baseUrl: process.env.RTDF_SITE_VERIFY_BASE_URL ?? 'http://127.0.0.1:4173' },
	{ name: 'VTDF', baseUrl: process.env.VTDF_SITE_VERIFY_BASE_URL ?? 'http://127.0.0.1:5553' }
];

const chromePath =
	process.env.CHROME_PATH ??
	[
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium'
	].find((path) => existsSync(path));

if (!chromePath) throw new Error('Chrome or Chromium executable was not found.');

const debugPort = Number(process.env.SITE_UI_PARITY_DEBUG_PORT ?? 9245);
const geometryTolerance = 2;
const userDataDir = mkdtempSync(join(tmpdir(), 'any-tdf-site-parity-'));
const sleep = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));
const chrome = Bun.spawn(
	[
		chromePath,
		'--headless=new',
		'--disable-gpu',
		'--no-first-run',
		'--no-default-browser-check',
		'--disable-dev-shm-usage',
		`--remote-debugging-port=${debugPort}`,
		`--user-data-dir=${userDataDir}`,
		'about:blank'
	],
	{ stdout: 'ignore', stderr: 'ignore' }
);

const cleanup = () => {
	chrome.kill();
	rmSync(userDataDir, { recursive: true, force: true });
};

process.on('exit', cleanup);
process.on('SIGINT', () => process.exit(130));

const waitForChrome = async () => {
	for (let attempt = 0; attempt < 100; attempt += 1) {
		const response = await fetch(`http://127.0.0.1:${debugPort}/json/version`).catch(() => undefined);
		if (response?.ok) return;
		await sleep(100);
	}
	throw new Error('Unable to connect to Chrome DevTools.');
};

class CDPClient {
	private id = 0;
	private pending = new Map<number, { resolve: (value: unknown) => void; reject: (error: Error) => void }>();
	private handlers = new Map<string, Array<(params: unknown) => void>>();

	private constructor(private socket: WebSocket) {
		socket.onmessage = (event) => {
			const message = JSON.parse(String(event.data)) as CDPMessage;
			if (!message.id) {
				if (message.method) this.handlers.get(message.method)?.forEach((handler) => handler(message.params));
				return;
			}
			const pending = this.pending.get(message.id);
			if (!pending) return;
			this.pending.delete(message.id);
			if (message.error) {
				pending.reject(new Error(message.error.message));
				return;
			}
			pending.resolve(message.result);
		};
	}

	static create = async (webSocketDebuggerUrl: string) => {
		const socket = new WebSocket(webSocketDebuggerUrl);
		await new Promise<void>((resolve, reject) => {
			socket.onopen = () => resolve();
			socket.onerror = () => reject(new Error('Unable to open DevTools websocket.'));
		});
		return new CDPClient(socket);
	};

	call = <T = unknown>(method: string, params: Record<string, unknown> = {}) => {
		const id = (this.id += 1);
		this.socket.send(JSON.stringify({ id, method, params }));
		return new Promise<T>((resolve, reject) => {
			this.pending.set(id, { resolve: resolve as (value: unknown) => void, reject });
		});
	};

	evaluate = async <T>(expression: string) => {
		const response = await this.call<{ result: { value: T }; exceptionDetails?: unknown }>('Runtime.evaluate', {
			expression,
			awaitPromise: true,
			returnByValue: true
		});
		if (response.exceptionDetails) throw new Error(`Browser evaluation failed: ${JSON.stringify(response.exceptionDetails)}`);
		return response.result.value;
	};

	on = (method: string, handler: (params: unknown) => void) => {
		const handlers = this.handlers.get(method) ?? [];
		handlers.push(handler);
		this.handlers.set(method, handlers);
	};

	close = () => this.socket.close();
}

await waitForChrome();
const targetResponse = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' });
if (!targetResponse.ok) throw new Error(`Unable to create browser target: ${targetResponse.status}`);
const target = (await targetResponse.json()) as { webSocketDebuggerUrl: string };
const page = await CDPClient.create(target.webSocketDebuggerUrl);
await page.call('Runtime.enable');
await page.call('Page.enable');

const browserErrors: string[] = [];
const ignoredErrors = ['width 或 height 小于 20 会使移动端点击困难！'];
page.on('Runtime.exceptionThrown', (params) => browserErrors.push(JSON.stringify(params)));
page.on('Runtime.consoleAPICalled', (params) => {
	const event = params as { type?: string; args?: Array<{ value?: unknown; description?: string }> };
	if (event.type !== 'error') return;
	const message = event.args?.map((item) => String(item.value ?? item.description ?? '')).join(' ') ?? 'console.error';
	if (!ignoredErrors.some((ignored) => message.includes(ignored))) browserErrors.push(message);
});

const runInPage = <T>(body: string) => page.evaluate<T>(`(async () => { ${body} })()`);

const waitFor = async (predicate: () => Promise<boolean>, label: string, timeout = 20000) => {
	const start = Date.now();
	while (Date.now() - start < timeout) {
		if (await predicate().catch(() => false)) return;
		await sleep(100);
	}
	throw new Error(`Timed out waiting for ${label}.`);
};

const setViewport = (width: number, height: number, mobile = false) => {
	return page.call('Emulation.setDeviceMetricsOverride', {
		width,
		height,
		deviceScaleFactor: mobile ? 3 : 1,
		mobile
	});
};

const goto = async (site: Site, path: string, selector = '.site-app') => {
	browserErrors.length = 0;
	const url = new URL(path, site.baseUrl);
	if (!url.searchParams.has('lang')) url.searchParams.set('lang', 'zh_CN');
	await page.call('Page.navigate', { url: url.toString() });
	let pageState: unknown = null;
	for (let attempt = 0; attempt < 200; attempt += 1) {
		pageState = await runInPage(`
			return {
				readyState: document.readyState,
				href: window.location.href,
				hasSelector: Boolean(document.querySelector(${JSON.stringify(selector)})),
				body: document.body?.innerText.slice(0, 160) || ''
			};
		`).catch((error: Error) => ({ error: error.message }));
		if ((pageState as { readyState?: string; hasSelector?: boolean }).readyState === 'complete' && (pageState as { hasSelector?: boolean }).hasSelector) break;
		await sleep(100);
	}
	if ((pageState as { readyState?: string; hasSelector?: boolean }).readyState !== 'complete' || !(pageState as { hasSelector?: boolean }).hasSelector) {
		throw new Error(`Timed out waiting for ${site.name} ${path}: ${JSON.stringify(pageState)} ${browserErrors.join('\n')}`);
	}
	await sleep(250);
};

const collectMetrics = (specs: MetricSpec[]) => {
	return runInPage<Record<string, ElementMetrics>>(`
		const specs = ${JSON.stringify(specs)};
		const round = (value) => Math.round(value * 100) / 100;
		const number = (value) => round(Number.parseFloat(value) || 0);
		return Object.fromEntries(specs.map((spec) => {
			const element = document.querySelector(spec.selector);
			if (!element) throw new Error('Missing selector: ' + spec.selector);
			const rect = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			return [spec.selector, {
				x: round(rect.x),
				y: round(rect.y),
				width: round(rect.width),
				...(spec.height ? { height: round(rect.height) } : {}),
				paddingTop: number(style.paddingTop),
				paddingRight: number(style.paddingRight),
				paddingBottom: number(style.paddingBottom),
				paddingLeft: number(style.paddingLeft),
				fontSize: number(style.fontSize),
				lineHeight: number(style.lineHeight),
				columnGap: number(style.columnGap),
				display: style.display,
				position: style.position
			}];
		}));
	`);
};

const assertMetricsMatch = (scenario: string, baseline: Record<string, ElementMetrics>, actual: Record<string, ElementMetrics>, site: Site) => {
	for (const [selector, expected] of Object.entries(baseline)) {
		for (const [key, expectedValue] of Object.entries(expected)) {
			const actualValue = actual[selector]?.[key];
			if (typeof expectedValue === 'number' && typeof actualValue === 'number') {
				if (Math.abs(expectedValue - actualValue) <= geometryTolerance) continue;
			} else if (expectedValue === actualValue) {
				continue;
			}
			throw new Error(`${scenario}: ${site.name} ${selector} ${key} expected ${expectedValue}, got ${actualValue}`);
		}
	}
};

const compareScenario = async (name: string, path: string, specs: MetricSpec[]) => {
	let baseline: Record<string, ElementMetrics> | null = null;
	for (const site of sites) {
		await goto(site, path, specs[0].selector);
		const metrics = await collectMetrics(specs);
		if (!baseline) baseline = metrics;
		else assertMetricsMatch(name, baseline, metrics, site);
		if (browserErrors.length > 0) throw new Error(`${site.name} browser errors: ${browserErrors.join('\n')}`);
	}
	console.log(`PASS ${name}`);
};

await setViewport(1440, 1000);
await compareScenario('home desktop geometry', '/', [
	{ selector: '.site-header', height: true },
	{ selector: '.site-header-inner', height: true },
	{ selector: '.site-hero', height: true },
	{ selector: '.site-hero-copy' },
	{ selector: '.site-hero-visual', height: true },
	{ selector: '.site-section-heading' }
]);
await compareScenario('components desktop geometry', '/components?nav=button&tab=1', [
	{ selector: '.site-component-layout' },
	{ selector: '.site-sidebar' },
	{ selector: '.site-component-main' },
	{ selector: '.component-heading' },
	{ selector: '.component-doc-tabs', height: true },
	{ selector: '.component-doc-content' }
]);
await compareScenario('guide desktop geometry', '/guide/theme', [
	{ selector: '.site-doc-layout' },
	{ selector: '.site-sidebar' },
	{ selector: '.site-doc-main' },
	{ selector: '.site-doc-main-inner' },
	{ selector: '.site-outline' }
]);
await compareScenario('generator desktop geometry', '/generator', [
	{ selector: '.generator-workbench' },
	{ selector: '.generator-controls' },
	{ selector: '.generator-preview' }
]);

for (const site of sites) {
	await setViewport(1440, 1000);
	await goto(site, '/');
	await runInPage(`document.querySelector('.site-version-trigger')?.click(); return true;`);
	await waitFor(() => runInPage<boolean>(`return Boolean(document.querySelector('#site-version-menu'));`), `${site.name} version menu`);
	await runInPage(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); return true;`);

	await runInPage(`document.querySelector('.site-search-trigger')?.click(); return true;`);
	await waitFor(() => runInPage<boolean>(`return Boolean(document.querySelector('[style*="z-index: 10000"] input'));`), `${site.name} command palette`);
	await runInPage(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true })); return true;`);

	await runInPage(`document.querySelector('.site-header-nav button.site-header-action[aria-expanded]')?.click(); return true;`);
	await waitFor(() => runInPage<boolean>(`return Boolean(document.querySelector('.site-theme-popover'));`), `${site.name} theme popover`);

	await goto(site, '/guide/icon-plugin', '.site-doc-layout article.prose');
	const iconPluginState = await runInPage<{ activeNav: string; hasPluginContent: boolean }>(`
		const activeNav = document.querySelector('.site-sidebar-link[aria-current="page"]')?.textContent?.trim() || '';
		const articleText = document.querySelector('.site-doc-layout article.prose')?.textContent || '';
		return {
			activeNav,
			hasPluginContent: articleText.includes('@any-tdf/vite-plugin-svg-symbol')
		};
	`);
	if (iconPluginState.activeNav !== '图标插件' || !iconPluginState.hasPluginContent) {
		throw new Error(`${site.name} icon plugin route resolved incorrectly: ${JSON.stringify(iconPluginState)}`);
	}

	await goto(site, '/components?nav=button&tab=0', '.component-doc-tabs');
	await runInPage(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', code: 'ArrowRight', bubbles: true })); return true;`);
	await waitFor(
		() => runInPage<boolean>(`return new URLSearchParams(window.location.search).get('tab') === '1';`),
		`${site.name} component keyboard navigation`
	);

	await goto(site, '/guide/generator', '.generator-workbench');
	const redirectedPath = await runInPage<string>(`return window.location.pathname;`);
	if (redirectedPath !== '/generator') throw new Error(`${site.name} legacy generator path did not redirect.`);

	await setViewport(390, 844, true);
	await goto(site, '/');
	await runInPage(`document.querySelector('.site-mobile-menu-button')?.click(); return true;`);
	await waitFor(
		() =>
			runInPage<boolean>(`
				const button = document.querySelector('.site-mobile-menu-button');
				const popover = document.querySelector('.site-header-inner > .site-popover');
				return button?.getAttribute('aria-expanded') === 'true' && Boolean(popover?.getBoundingClientRect().height);
			`),
		`${site.name} mobile navigation`
	);

	if (browserErrors.length > 0) throw new Error(`${site.name} browser errors: ${browserErrors.join('\n')}`);
	console.log(`PASS ${site.name} shared interactions`);
}

page.close();
cleanup();
console.log(`PASS cross-site UI parity for ${sites.length} sites`);
