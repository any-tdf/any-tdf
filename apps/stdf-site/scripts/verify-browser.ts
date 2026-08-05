import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

type CDPResponse = {
	id?: number;
	result?: unknown;
	error?: { message: string };
	method?: string;
	params?: unknown;
};

type Scenario = {
	name: string;
	path: string;
	viewport?: { width: number; height: number; mobile: boolean };
	requiredText: string[];
	requiredSelectors: Array<{ selector: string; label: string }>;
	expectsComponentPreview?: boolean;
	expectsInlineComponentTitle?: boolean;
	expectsWrappedComponentTitle?: boolean;
	expectsNarrowLayout?: boolean;
	expectsFullWidthWorkbench?: boolean;
	expectsThemeFavicon?: boolean;
	expectsHeaderLogoMotion?: boolean;
	expectsStaticGuideLogo?: boolean;
};

const baseUrl = process.env.STDF_SITE_VERIFY_BASE_URL || 'http://127.0.0.1:4173';
const debugPort = Number(process.env.STDF_SITE_BROWSER_DEBUG_PORT || 9237);
const chromePath =
	process.env.CHROME_PATH ||
	[
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser'
	].find((path) => existsSync(path));
const userDataDir = mkdtempSync(join(tmpdir(), 'stdf-site-browser-'));

if (!chromePath) {
	console.error('Chrome or Chromium executable was not found. Set CHROME_PATH to run browser verification.');
	process.exit(1);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const chrome = Bun.spawn(
	[
		chromePath,
		'--headless=new',
		'--disable-gpu',
		'--no-first-run',
		'--no-default-browser-check',
		'--disable-dev-shm-usage',
		'--window-size=1440,1000',
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
process.on('SIGINT', () => {
	cleanup();
	process.exit(130);
});

const waitForJson = async <T>(url: string) => {
	let lastError = '';
	for (let i = 0; i < 80; i += 1) {
		const response = await fetch(url).catch((error: Error) => {
			lastError = error.message;
			return undefined;
		});
		if (response?.ok) return response.json() as Promise<T>;
		await sleep(100);
	}
	throw new Error(`Unable to connect to Chrome DevTools: ${lastError}`);
};

class CDPClient {
	private id = 0;
	private pending = new Map<number, { resolve: (value: unknown) => void; reject: (error: Error) => void }>();
	private handlers = new Map<string, Array<(params: unknown) => void>>();
	private socket: WebSocket;

	private constructor(socket: WebSocket) {
		this.socket = socket;
		this.socket.onmessage = (event) => {
			const message = JSON.parse(String(event.data)) as CDPResponse;
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
			socket.onerror = () => reject(new Error('Unable to open DevTools websocket'));
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
		const result = await this.call<{ result: { value: T }; exceptionDetails?: unknown }>('Runtime.evaluate', {
			expression,
			awaitPromise: true,
			returnByValue: true
		});
		if (result.exceptionDetails) throw new Error(`Browser evaluation failed: ${JSON.stringify(result.exceptionDetails)}`);
		return result.result.value;
	};

	on = (method: string, handler: (params: unknown) => void) => {
		const handlers = this.handlers.get(method) || [];
		handlers.push(handler);
		this.handlers.set(method, handlers);
	};

	close = () => this.socket.close();
}

await waitForJson<{ webSocketDebuggerUrl: string }>(`http://127.0.0.1:${debugPort}/json/version`);
const targetResponse = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' });
if (!targetResponse.ok) throw new Error(`Unable to create Chrome page target: ${targetResponse.status}`);
const target = (await targetResponse.json()) as { webSocketDebuggerUrl: string };
const page = await CDPClient.create(target.webSocketDebuggerUrl);
await page.call('Runtime.enable');
await page.call('Page.enable');

const browserErrors: string[] = [];
const baselineBrowserErrorMessages = ['width 或 height 小于 20 会使移动端点击困难！'];
page.on('Runtime.exceptionThrown', (params) => {
	browserErrors.push(JSON.stringify(params));
});
page.on('Runtime.consoleAPICalled', (params) => {
	const event = params as { type?: string; args?: Array<{ value?: unknown; description?: string }> };
	if (event.type !== 'error') return;
	browserErrors.push(event.args?.map((arg) => String(arg.value ?? arg.description ?? '')).join(' ') || 'console.error');
});

const runInPage = <T>(body: string) =>
	page.evaluate<T>(`(async () => {
		${body}
	})()`);

const waitFor = async (predicate: () => Promise<boolean>, label: string, timeout = 8000) => {
	const started = Date.now();
	while (Date.now() - started < timeout) {
		if (await predicate()) return;
		await sleep(100);
	}
	throw new Error(`Timed out waiting for ${label}`);
};

const goto = async (path: string, viewport = { width: 1440, height: 1000, mobile: false }) => {
	browserErrors.length = 0;
	await page.call('Emulation.setDeviceMetricsOverride', {
		width: viewport.width,
		height: viewport.height,
		deviceScaleFactor: viewport.mobile ? 3 : 1,
		mobile: viewport.mobile
	});
	const url = new URL(path, baseUrl);
	await page.call('Page.navigate', { url: url.toString() });
	await waitFor(
		() => runInPage<boolean>("return document.readyState === 'complete' && document.body.innerText.length > 0;"),
		`load ${path}`
	);
	await sleep(200);
};

const assertBodyIncludes = async (text: string) => {
	const ok = await runInPage<boolean>(`return document.body.innerText.includes(${JSON.stringify(text)});`);
	if (!ok) throw new Error(`Expected page body to include: ${text}`);
};

const assertSelector = async (selector: string, label: string) => {
	const ok = await runInPage<boolean>(`
		const element = document.querySelector(${JSON.stringify(selector)});
		if (!element) return false;
		const rect = element.getBoundingClientRect();
		return rect.width > 0 && rect.height > 0;
	`);
	if (!ok) throw new Error(`Expected visible selector: ${label}`);
};

const readLogoAnimation = async (selector: string) => {
	return runInPage<{ found: boolean; animationNames: string[] }>(`
		const element = document.querySelector(${JSON.stringify(selector)});
		return {
			found: Boolean(element),
			animationNames: element
				? getComputedStyle(element).animationName.split(',').map((name) => name.trim())
				: []
		};
	`);
};

const setReducedMotion = (reduced: boolean) => {
	return page.call('Emulation.setEmulatedMedia', {
		features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }]
	});
};

const assertHeaderLogoMotion = async () => {
	const selector = '[data-logo-animated] [data-logo-layer="stdf-mark"]';
	await setReducedMotion(false);
	const running = await readLogoAnimation(selector);
	await setReducedMotion(true);
	const reduced = await readLogoAnimation(selector);
	await setReducedMotion(false);
	if (!running.found || !running.animationNames.includes('tdf-stdf-logo-lightning')) {
		throw new Error(`Expected STDF header logo animation: ${JSON.stringify(running)}`);
	}
	if (!reduced.found || reduced.animationNames.some((name) => name !== 'none')) {
		throw new Error(`Expected reduced-motion STDF header logo: ${JSON.stringify(reduced)}`);
	}
};

const assertStaticGuideLogo = async () => {
	const result = await readLogoAnimation('[data-logo-static] [data-logo-layer="stdf-mark"]');
	if (!result.found || result.animationNames.some((name) => name !== 'none')) {
		throw new Error(`Expected static STDF guide logo: ${JSON.stringify(result)}`);
	}
};

const assertFlatSiteShell = async () => {
	const violations = await runInPage<string[]>(`
		return Array.from(document.querySelectorAll('.site-app *'))
			.filter((element) => !element.closest('[data-site-component-preview]'))
			.map((element) => {
				const style = getComputedStyle(element);
				const radii = [
					style.borderTopLeftRadius,
					style.borderTopRightRadius,
					style.borderBottomRightRadius,
					style.borderBottomLeftRadius
				];
				const hasRadius = radii.some((radius) => Number.parseFloat(radius) > 0);
				const hasShadow = style.boxShadow !== 'none' || style.textShadow !== 'none';
				const hasBackdrop = style.backdropFilter && style.backdropFilter !== 'none';
				const hasShadowFilter = style.filter.includes('blur(') || style.filter.includes('drop-shadow(');
				if (!hasRadius && !hasShadow && !hasBackdrop && !hasShadowFilter) return '';
				const name = element.tagName.toLowerCase();
				const id = element.id ? '#' + element.id : '';
				const classes = Array.from(element.classList).slice(0, 3).join('.');
				return name + id + (classes ? '.' + classes : '');
			})
			.filter(Boolean)
			.slice(0, 12);
	`);
	if (violations.length > 0) throw new Error(`Site shell is not flat: ${violations.join(', ')}`);
};

const assertComponentPreviewStyles = async () => {
	const result = await runInPage<{ previews: number; styledElements: number }>(`
		const previews = Array.from(document.querySelectorAll('[data-site-component-preview]'));
		const styledElements = previews.flatMap((preview) => Array.from(preview.querySelectorAll('*'))).filter((element) => {
			const style = getComputedStyle(element);
			return Number.parseFloat(style.borderRadius) > 0 || style.boxShadow !== 'none';
		}).length;
		return { previews: previews.length, styledElements };
	`);
	if (result.previews === 0 || result.styledElements === 0) {
		throw new Error('Component preview styles were not preserved');
	}
};

const assertNarrowComponentLayout = async () => {
	const result = await runInPage<{ viewport: number; layout: number; content: number; hasToggle: boolean }>(`
		const layout = document.querySelector('.site-component-layout');
		const content = document.querySelector('.component-doc-content');
		return {
			viewport: window.innerWidth,
			layout: layout?.getBoundingClientRect().width || 0,
			content: content?.getBoundingClientRect().width || 0,
			hasToggle: Boolean(document.querySelector('[data-site-width-toggle]'))
		};
	`);
	if (result.hasToggle || result.layout >= result.viewport - 100 || result.content > 52 * 16 + 1) {
		throw new Error(`Component narrow layout failed: viewport ${result.viewport}, layout ${result.layout}, content ${result.content}`);
	}
};

const assertFullWidthWorkbench = async () => {
	const result = await runInPage<{ viewport: number; workbench: number; hasSidebar: boolean }>(`
		const workbench = document.querySelector('.generator-workbench');
		return {
			viewport: window.innerWidth,
			workbench: workbench?.getBoundingClientRect().width || 0,
			hasSidebar: Boolean(document.querySelector('.site-sidebar'))
		};
	`);
	if (result.hasSidebar || result.workbench < result.viewport - 1) {
		throw new Error(`Theme generator is not full width: viewport ${result.viewport}, workbench ${result.workbench}`);
	}
};

const assertComponentTitleLayout = async (inline: boolean) => {
	const result = await runInPage<{ overlaps: boolean; titleWidth: number; descriptionWidth: number }>(`
		const row = document.querySelector('[data-component-title-row]');
		const title = row?.querySelector('h1');
		const description = row?.querySelector('p');
		const titleRect = title?.getBoundingClientRect();
		const descriptionRect = description?.getBoundingClientRect();
		return {
			overlaps: Boolean(
				titleRect &&
					descriptionRect &&
					descriptionRect.top < titleRect.bottom &&
					descriptionRect.bottom > titleRect.top
			),
			titleWidth: titleRect?.width || 0,
			descriptionWidth: descriptionRect?.width || 0
		};
	`);
	if (result.titleWidth === 0 || result.descriptionWidth === 0 || result.overlaps !== inline) {
		throw new Error(`Component title layout failed: expected ${inline ? 'inline' : 'wrapped'}, overlap ${result.overlaps}`);
	}
};

const assertNoBrowserErrors = () => {
	const unexpectedErrors = browserErrors.filter((message) => !baselineBrowserErrorMessages.some((baseline) => message.includes(baseline)));
	if (unexpectedErrors.length > 0) throw new Error(`Browser errors: ${unexpectedErrors.join('\n')}`);
};

const assertThemeFavicon = async () => {
	await runInPage(`document.documentElement.setAttribute('data-mode', 'dark');`);
	await waitFor(
		() => runInPage<boolean>(`return document.querySelector('[data-theme-favicon]')?.getAttribute('href') === '/favicon_black.ico';`),
		'dark favicon'
	);
	await runInPage(`document.documentElement.setAttribute('data-mode', 'primary');`);
	await waitFor(
		() => runInPage<boolean>(`return document.querySelector('[data-theme-favicon]')?.getAttribute('href') === '/favicon.ico';`),
		'light favicon'
	);
};

const scenarios: Scenario[] = [
	{
		name: 'home',
		path: '/',
		requiredText: ['STDF', 'Svelte'],
		requiredSelectors: [
			{ selector: 'header', label: 'header' },
			{ selector: 'main, body', label: 'page body' }
		],
		expectsComponentPreview: true,
		expectsThemeFavicon: true,
		expectsHeaderLogoMotion: true
	},
	{
		name: 'guide',
		path: '/guide/theme',
		requiredText: ['Theme', 'STDF'],
		requiredSelectors: [{ selector: 'pre code, article, main', label: 'guide content' }]
	},
	{
		name: 'components guide tab',
		path: '/components?nav=button&tab=0',
		requiredText: ['Button'],
		requiredSelectors: [
			{ selector: 'iframe', label: 'desktop demo iframe' },
			{ selector: 'pre code, code, main', label: 'demo source or content' }
		],
		expectsInlineComponentTitle: true
	},
	{
		name: 'components api tab mobile',
		path: '/components?nav=button&tab=1',
		viewport: { width: 390, height: 844, mobile: true },
		requiredText: ['Button'],
		requiredSelectors: [{ selector: 'iframe, main', label: 'mobile component content' }],
		expectsWrappedComponentTitle: true
	},
	{
		name: 'components unified narrow layout',
		path: '/components?nav=button&tab=1',
		viewport: { width: 1920, height: 1000, mobile: false },
		requiredText: ['Button'],
		requiredSelectors: [{ selector: '.component-doc-content', label: 'component documentation content' }],
		expectsNarrowLayout: true
	},
	{
		name: 'theme generator',
		path: '/generator',
		requiredText: ['STDF'],
		requiredSelectors: [{ selector: '[data-theme="generator-preview"]', label: 'theme generator preview' }],
		expectsComponentPreview: true,
		expectsFullWidthWorkbench: true
	},
	{
		name: 'color guide',
		path: '/guide/color',
		requiredText: ['STDF'],
		requiredSelectors: [{ selector: 'main', label: 'color guide content' }]
	},
	{
		name: 'logo guide',
		path: '/guide/logo',
		requiredText: [],
		requiredSelectors: [{ selector: '[data-logo-static]', label: 'static logo construction' }],
		expectsStaticGuideLogo: true
	}
];

const failures: Array<{ scenario: string; reason: string }> = [];
for (const scenario of scenarios) {
	try {
		await goto(scenario.path, scenario.viewport);
		for (const text of scenario.requiredText) await assertBodyIncludes(text);
		for (const selector of scenario.requiredSelectors) await assertSelector(selector.selector, selector.label);
		await assertFlatSiteShell();
		if (scenario.expectsComponentPreview) await assertComponentPreviewStyles();
		if (scenario.expectsInlineComponentTitle) await assertComponentTitleLayout(true);
		if (scenario.expectsWrappedComponentTitle) await assertComponentTitleLayout(false);
		if (scenario.expectsNarrowLayout) await assertNarrowComponentLayout();
		if (scenario.expectsFullWidthWorkbench) await assertFullWidthWorkbench();
		if (scenario.expectsThemeFavicon) await assertThemeFavicon();
		if (scenario.expectsHeaderLogoMotion) await assertHeaderLogoMotion();
		if (scenario.expectsStaticGuideLogo) await assertStaticGuideLogo();
		assertNoBrowserErrors();
	} catch (error) {
		failures.push({ scenario: scenario.name, reason: error instanceof Error ? error.message : String(error) });
	}
}

page.close();
cleanup();

const result = { baseUrl, checked: scenarios.length, failedCount: failures.length, failures };
console.log(JSON.stringify(result, null, 2));
if (failures.length > 0) process.exit(1);
