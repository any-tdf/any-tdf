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

const baseUrl = process.env.RTDF_SITE_VERIFY_BASE_URL || 'http://127.0.0.1:4173';
const chromePath =
	process.env.CHROME_PATH ||
	[
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser'
	].find((path) => existsSync(path));
const debugPort = Number(process.env.RTDF_SITE_BROWSER_DEBUG_PORT || 9231);
const userDataDir = mkdtempSync(join(tmpdir(), 'rtdf-site-browser-'));

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
	{
		stdout: 'ignore',
		stderr: 'ignore'
	}
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
	for (let i = 0; i < 300; i += 1) {
		const response = await fetch(url).catch((error: Error) => {
			lastError = error.message;
			return undefined;
		});
		if (response?.ok) return response.json() as Promise<T>;
		await sleep(200);
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
				if (message.method) {
					this.handlers.get(message.method)?.forEach((handler) => handler(message.params));
				}
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
		const result = await this.call<{ result: { value: T }; exceptionDetails?: { text?: string; exception?: { description?: string } } }>(
			'Runtime.evaluate',
			{
				expression,
				awaitPromise: true,
				returnByValue: true
			}
		);
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
// RTDF 组件库内部的告警信息（尺寸提示），不影响页面功能
const baselineBrowserErrorMessages = ['width 或 height 小于 20 会使移动端点击困难！'];
page.on('Runtime.exceptionThrown', (params) => {
	browserErrors.push(JSON.stringify(params));
});
page.on('Runtime.consoleAPICalled', (params) => {
	const event = params as { type?: string; args?: Array<{ value?: unknown; description?: string }> };
	if (event.type !== 'error') return;
	const message = event.args?.map((arg) => String(arg.value ?? arg.description ?? '')).join(' ') || 'console.error';
	if (baselineBrowserErrorMessages.some((baseline) => message.includes(baseline))) return;
	browserErrors.push(message);
});

const runInPage = <T>(body: string) => {
	return page.evaluate<T>(`(async () => {
		${body}
	})()`);
};

const waitFor = async (predicate: () => Promise<boolean>, label: string, timeout = 15000) => {
	const started = Date.now();
	while (Date.now() - started < timeout) {
		if (await predicate().catch(() => false)) return;
		await sleep(150);
	}
	throw new Error(`Timed out waiting for ${label}`);
};

const goto = async (path: string, waitSelector: string, timeout = 15000) => {
	browserErrors.length = 0;
	const url = new URL(path, baseUrl);
	await page.call('Page.navigate', { url: url.toString() });
	await waitFor(async () => {
		return runInPage<boolean>(`
			const target = document.querySelector(${JSON.stringify(waitSelector)});
			return document.readyState === 'complete' && Boolean(target);
		`);
	}, `load ${path} (${waitSelector})`, timeout);
	await sleep(300);
};

const assertNoErrorOverlay = async () => {
	const hasOverlay = await runInPage<boolean>(`return Boolean(document.querySelector('vite-error-overlay'));`);
	if (hasOverlay) throw new Error('vite error overlay is visible');
	if (browserErrors.length > 0) throw new Error(`Browser errors:\n${browserErrors.join('\n')}`);
};

const assertSelector = async (selector: string, label: string) => {
	const ok = await runInPage<boolean>(`
		const element = document.querySelector(${JSON.stringify(selector)});
		if (!element) return false;
		const rect = element.getBoundingClientRect();
		return rect.width > 0 && rect.height > 0;
	`);
	if (!ok) throw new Error(`Expected visible selector: ${label} (${selector})`);
};

const assertBodyIncludes = async (text: string) => {
	const ok = await runInPage<boolean>(`return document.body.innerText.includes(${JSON.stringify(text)});`);
	if (!ok) throw new Error(`Expected page body to include: ${text}`);
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
	const selector = '[data-logo-animated] [data-logo-layer="react"]';
	await setReducedMotion(false);
	const running = await readLogoAnimation(selector);
	await setReducedMotion(true);
	const reduced = await readLogoAnimation(selector);
	await setReducedMotion(false);
	if (!running.found || !running.animationNames.includes('tdf-rtdf-logo-spin')) {
		throw new Error(`Expected RTDF header logo animation: ${JSON.stringify(running)}`);
	}
	if (!reduced.found || reduced.animationNames.some((name) => name !== 'none')) {
		throw new Error(`Expected reduced-motion RTDF header logo: ${JSON.stringify(reduced)}`);
	}
};

const assertStaticGuideLogo = async () => {
	const result = await readLogoAnimation('[data-logo-static] [data-logo-layer="react"]');
	if (!result.found || result.animationNames.some((name) => name !== 'none')) {
		throw new Error(`Expected static RTDF guide logo: ${JSON.stringify(result)}`);
	}
};

const scenarios: Array<{ name: string; run: () => Promise<void> }> = [
	{
		name: '首页渲染（hero/主题系统/组件网格/footer）',
		run: async () => {
			await goto('/?lang=zh_CN', '.site-hero-title');
			await assertSelector('.site-header', 'site header');
			await assertSelector('.hero-component-preview', 'hero component preview');
			await assertSelector('#terminal-demo', 'terminal demo');
			await assertSelector('#stat-counter', 'stat counter');
			await assertSelector('.theme-option-grid', 'theme option grid');
			await assertSelector('.component-item-card', 'component item card');
			await assertSelector('.site-footer', 'site footer');
			await assertHeaderLogoMotion();
			await assertNoErrorOverlay();
		}
	},
	{
		name: '组件文档页 tab=0（侧边栏/源码/iframe 预览）',
		run: async () => {
			await goto('/components?nav=button&tab=0', '.site-component-stage');
			await assertSelector('.site-sidebar .site-sidebar-link', 'sidebar links');
			await assertSelector('.component-doc-tabs', 'doc tabs');
			await assertSelector('.site-component-code code.hljs', 'highlighted demo source');
			await assertSelector('#iframe-id', 'demo iframe');
			await assertNoErrorOverlay();
		}
	},
	{
		name: '组件文档页 tab=1（API 文档 + outline）',
		run: async () => {
			await goto('/components?nav=button&tab=1', '.component-doc-layout article.prose table');
			await assertSelector('.component-api-prose', 'api prose');
			await assertNoErrorOverlay();
		}
	},
	{
		name: '指南页 quick-start（侧边栏/prose/outline）',
		run: async () => {
			await goto('/guide', '.site-doc-layout article.prose');
			await assertSelector('.site-sidebar .site-sidebar-link', 'guide sidebar links');
			await assertNoErrorOverlay();
		}
	},
	{
		name: '指南页 theme（md 渲染）',
		run: async () => {
			await goto('/guide/theme', '.site-doc-layout article.prose');
			await assertBodyIncludes('主题');
			await assertNoErrorOverlay();
		}
	},
	{
		name: '指南页 color（色彩卡 + ThemeSwitch）',
		run: async () => {
			await goto('/guide/color', '.theme-switch-option');
			await assertNoErrorOverlay();
		}
	},
	{
		name: '指南页 icon（内置图标 gallery）',
		run: async () => {
			await goto('/guide/icon', '.not-prose table');
			await assertNoErrorOverlay();
		}
	},
	{
		name: '指南页 logo（规范图静态展示）',
		run: async () => {
			await goto('/guide/logo', '[data-logo-static] [data-logo-layer="react"]');
			await assertStaticGuideLogo();
			await assertNoErrorOverlay();
		}
	},
	{
		name: 'guide/generator 重定向到 /generator',
		run: async () => {
			await goto('/guide/generator', '.generator-workbench, .generator-mobile-notice', 20000);
			const currentPath = await runInPage<string>(`return window.location.pathname;`);
			if (currentPath !== '/generator') throw new Error(`Expected redirect to /generator, got ${currentPath}`);
			await assertNoErrorOverlay();
		}
	},
	{
		name: '主题生成器（控制面板/预览/配置）',
		run: async () => {
			await goto('/generator', '.generator-workbench');
			await assertSelector('.generator-controls', 'generator controls');
			await assertSelector('.generator-preview [data-site-component-preview]', 'generator preview');
			await assertNoErrorOverlay();
			// 切换到配置 tab
			await runInPage(`
				const buttons = [...document.querySelectorAll('button')];
				const target = buttons.find((button) => (button.textContent || '').trim() === '配置' || (button.textContent || '').trim() === 'Config');
				if (!target) throw new Error('config tab button not found');
				target.click();
			`);
			await waitFor(async () => {
				return runInPage<boolean>(`return Boolean(document.querySelector('#myCodeBlock code, code#myCodeBlock'));`);
			}, 'palette tab');
			await assertSelector('code#myCodeBlock.hljs.language-css', 'config code block');
			await assertSelector('code#myCodeBlock2.hljs.language-css', 'theme vars code block');
			await assertBodyIncludes('@plugin "rtdf/theme"');
			await assertNoErrorOverlay();
		}
	},
	{
		name: '404 页面',
		run: async () => {
			await goto('/not-exist-page', '.svg-spin');
			await assertBodyIncludes('页面未找到');
			await assertNoErrorOverlay();
		}
	}
];

const failed: string[] = [];
for (const scenario of scenarios) {
	try {
		await scenario.run();
		console.log(`✓ ${scenario.name}`);
	} catch (error) {
		failed.push(scenario.name);
		console.error(`✗ ${scenario.name}`);
		console.error(`  ${error instanceof Error ? error.message : String(error)}`);
	}
}

page.close();
cleanup();

if (failed.length > 0) {
	console.error(`\n${failed.length}/${scenarios.length} 个场景失败`);
	process.exit(1);
}
console.log(`\n全部 ${scenarios.length} 个场景通过`);
