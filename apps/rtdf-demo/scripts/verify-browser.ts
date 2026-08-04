import { existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
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
	steps: Array<() => Promise<void>>;
};

const baseUrl = process.env.RTDF_VERIFY_BASE_URL || 'http://127.0.0.1:4173';
const scenarioFilter = process.env.RTDF_VERIFY_SCENARIO || '';
const pagesRoot = join(import.meta.dir, '../src/pages');
const chromePath =
	process.env.CHROME_PATH ||
	[
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser'
	].find((path) => existsSync(path));
const debugPort = Number(process.env.RTDF_BROWSER_DEBUG_PORT || 9229);
const userDataDir = mkdtempSync(join(tmpdir(), 'rtdf-browser-'));

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
		'--window-size=390,844',
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
			this.pending.set(id, {
				resolve: resolve as (value: unknown) => void,
				reject
			});
		});
	};

	evaluate = async <T>(expression: string) => {
		const result = await this.call<{
			result: { value: T };
			exceptionDetails?: unknown;
		}>('Runtime.evaluate', {
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
const target = (await targetResponse.json()) as {
	webSocketDebuggerUrl: string;
};
const page = await CDPClient.create(target.webSocketDebuggerUrl);
await page.call('Runtime.enable');
await page.call('Page.enable');

const browserErrors: string[] = [];
page.on('Runtime.exceptionThrown', (params) => {
	browserErrors.push(JSON.stringify(params));
});
page.on('Runtime.consoleAPICalled', (params) => {
	const event = params as {
		type?: string;
		args?: Array<{ value?: unknown; description?: string }>;
	};
	if (event.type !== 'error') return;
	browserErrors.push(event.args?.map((arg) => String(arg.value ?? arg.description ?? '')).join(' ') || 'console.error');
});

const runInPage = <T>(body: string) => {
	return page.evaluate<T>(`(async () => {
		${body}
	})()`);
};

const goto = async (path: string) => {
	browserErrors.length = 0;
	const lang = path.includes('/zh_CN') ? 'zh_CN' : 'en_US';
	const url = `${baseUrl}${path}${path.includes('?') ? '&' : '?'}channel=iframe&theme=ANYTDF&darkMode=light&lang=${lang}`;
	await page.call('Page.navigate', { url });
	await waitFor(
		() => runInPage<boolean>(`return document.readyState === 'complete' && document.body.innerText.length > 0;`),
		`load ${path}`
	);
};

const waitFor = async (predicate: () => Promise<boolean>, label: string, timeout = 5000) => {
	const started = Date.now();
	while (Date.now() - started < timeout) {
		if (await predicate()) return;
		await sleep(100);
	}
	throw new Error(`Timed out waiting for ${label}`);
};

const clickText = async (text: string, index = 0) => {
	const ok = await runInPage<boolean>(`
		const text = ${JSON.stringify(text)};
		const index = ${index};
		const visible = (el) => {
			const rect = el.getBoundingClientRect();
			const style = getComputedStyle(el);
			return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
		};
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		const clickables = [...document.querySelectorAll('button,[role="button"],a')].filter(visible);
		const clickableExact = clickables.filter((el) => normalize(el.textContent || el.value) === text);
		const clickableLoose = clickables
			.filter((el) => normalize(el.textContent || el.value).includes(text))
			.sort((a, b) => normalize(a.textContent || a.value).length - normalize(b.textContent || b.value).length);
		const nested = [...document.querySelectorAll('input,textarea,div,span')].filter(visible);
		const nestedExact = nested.filter((el) => normalize(el.textContent || el.value) === text);
		const nestedLoose = nested
			.filter((el) => normalize(el.textContent || el.value).includes(text))
			.sort((a, b) => normalize(a.textContent || a.value).length - normalize(b.textContent || b.value).length);
		const target = clickableExact[index] || clickableLoose[index] || nestedExact[index] || nestedLoose[index];
		if (!target) return false;
		const clickable = target.closest('button,[role="button"],a') || target;
		clickable.scrollIntoView({ block: 'center', inline: 'center' });
		clickable.click();
		return true;
	`);
	if (!ok) throw new Error(`Unable to click text: ${text}`);
	await sleep(150);
};

const setInputValue = async (currentValue: string, nextValue: string) => {
	const result = await runInPage<{ ok: boolean; reason?: string; candidates: Array<{ tag: string; type: string; value: string }> }>(`
		const isVisible = (element) => {
			const rect = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
		};
		const all = [...document.querySelectorAll('input,textarea')];
		const editable = all.filter((element) => !element.disabled && !element.readOnly && isVisible(element));
		const input = editable.find((element) => element.value === ${JSON.stringify(currentValue)});
		const candidates = editable.slice(0, 8).map((element) => ({
			tag: element.tagName.toLowerCase(),
			type: element instanceof HTMLInputElement ? element.type : 'textarea',
			value: element.value,
		}));
		if (!input) return { ok: false, reason: 'target input not found', candidates };
		input.scrollIntoView({ block: 'center', inline: 'center' });
		input.focus();
		input.select();
		return {
			ok: document.activeElement === input,
			reason: document.activeElement === input ? '' : 'target input did not receive focus',
			candidates,
		};
	`);
	if (!result.ok) throw new Error(`Unable to focus input: ${JSON.stringify(result)}`);
	await page.call('Input.insertText', { text: nextValue });
	await waitFor(
		() =>
			runInPage<boolean>(
				`return [...document.querySelectorAll('input,textarea')].some((input) => input.value === ${JSON.stringify(nextValue)});`
			),
		'input value'
	);
};

const bodyIncludes = (text: string) => {
	return runInPage<boolean>(`return document.body.innerText.includes(${JSON.stringify(text)});`);
};

const elementCount = (selector: string) => {
	return runInPage<number>(`return document.querySelectorAll(${JSON.stringify(selector)}).length;`);
};

const assertNoBrowserErrors = (label: string) => {
	if (browserErrors.length > 0) {
		throw new Error(`${label}: ${browserErrors.slice(0, 3).join(' | ')}`);
	}
};

const clickFirstInteractive = async () => {
	await runInPage<boolean>(`
		const visible = (el) => {
			const rect = el.getBoundingClientRect();
			const style = getComputedStyle(el);
			return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
		};
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		const candidates = [...document.querySelectorAll('button,[role="button"],a,input:not([disabled]):not([readonly]),textarea:not([disabled]):not([readonly])')]
			.filter(visible)
			.filter((el) => {
				const text = normalize(el.textContent || el.value || el.getAttribute('aria-label') || '');
				const href = el.getAttribute('href') || '';
				if (href && new URL(href, window.location.href).origin !== window.location.origin) return false;
				if (text.includes('切换到') || text.includes('切换主题')) return false;
				return true;
			})
			.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
		const target = candidates[0];
		if (!target) return false;
		target.scrollIntoView({ block: 'center', inline: 'center' });
		if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
			target.focus();
			target.value = 'smoke';
			target.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: 'smoke' }));
			target.dispatchEvent(new Event('change', { bubbles: true }));
			return true;
		}
		target.click();
		return true;
	`);
	await sleep(150);
};

const demoPages = readdirSync(pagesRoot, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && !['components', 'home'].includes(entry.name))
	.map((entry) => entry.name)
	.sort();

const scenarios: Scenario[] = [
	{
		name: 'Toast opens from Cell click',
		path: '/toast/en_US',
		steps: [() => clickText('Basic usage'), () => waitFor(() => bodyIncludes('Light hint'), 'toast message')]
	},
	{
		name: 'Dialog opens and renders content',
		path: '/dialog/en_US',
		steps: [() => clickText('Basic Usage'), () => waitFor(() => bodyIncludes('Go to Fairy Island?'), 'dialog content')]
	},
	{
		name: 'Modal basic uses content-height popup',
		path: '/modal/zh_CN',
		steps: [
			() => clickText('基础用法'),
			async () => {
				await sleep(500);
				const metrics = await runInPage<{
					found: boolean;
					rect?: { height: number; width: number };
					viewportHeight: number;
					text?: string;
				}>(`
						const panel = [...document.querySelectorAll('.fixed.inset-0 .pointer-events-auto')].find((element) => {
							const rect = element.getBoundingClientRect();
							const text = element.textContent || '';
							return rect.width > 0 && rect.height > 0 && text.includes('您明白吗？') && text.includes('我明白了');
						});
						if (!panel) return { found: false, viewportHeight: window.innerHeight };
						const rect = panel.getBoundingClientRect();
						return {
							found: true,
							rect: { height: rect.height, width: rect.width },
							viewportHeight: window.innerHeight,
							text: (panel.textContent || '').slice(0, 120),
						};
					`);
				if (!metrics.found || !metrics.rect || metrics.rect.height <= 0 || metrics.rect.height > 260 || metrics.rect.width <= 0) {
					throw new Error(JSON.stringify(metrics));
				}
			}
		]
	},
	{
		name: 'Popup mask closes without opacity flash',
		path: '/popup/zh_CN',
		steps: [
			() => clickText('基础用法'),
			async () => {
				const metrics = await runInPage<{
					found: boolean;
					before?: number;
					after?: number;
					samples?: number[];
					removed?: boolean;
				}>(`
						const getMask = () =>
							[...document.querySelectorAll('button.fixed.inset-0')].find((element) => {
								const rect = element.getBoundingClientRect();
								const style = getComputedStyle(element);
								return rect.width === window.innerWidth && rect.height === window.innerHeight && Number(style.zIndex) >= 500;
							});
						const mask = getMask();
						if (!mask) return { found: false };
						const readOpacity = () => {
							const current = getMask();
							return current ? Number.parseFloat(getComputedStyle(current).opacity || '1') : 0;
						};
						const before = readOpacity();
						mask.click();
						const samples = [];
						for (let index = 0; index < 12; index += 1) {
							await new Promise((resolve) => setTimeout(resolve, 20));
							samples.push(readOpacity());
						}
						return {
							found: true,
							before,
							after: samples[0],
							samples,
							removed: !getMask(),
						};
					`);
				const maxRise =
					metrics.samples?.reduce(
						(rise, sample, index, samples) => (index === 0 ? rise : Math.max(rise, sample - samples[index - 1])),
						0
					) ?? 0;
				if (
					!metrics.found ||
					metrics.before === undefined ||
					metrics.after === undefined ||
					metrics.after - metrics.before > 0.08 ||
					maxRise > 0.08 ||
					!metrics.removed
				) {
					throw new Error(JSON.stringify(metrics));
				}
			}
		]
	},
	{
		name: 'BottomSheet animates in and out',
		path: '/bottomSheet/zh_CN',
		steps: [
			async () => {
				const metrics = await runInPage<{
					clicked: boolean;
					early?: {
						found: boolean;
						transform: string;
						opacity: number;
						animationCount: number;
					};
					final?: {
						found: boolean;
						opacity: number;
						rectTop: number;
						expectedTop: number;
					};
					exiting?: {
						found: boolean;
						transform: string;
						animationCount: number;
					};
					removed: boolean;
				}>(`
					const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
					const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
					const getSheet = () => document.querySelector('.fixed.w-screen.bg-bg-overlay');
					const readEarly = () => {
						const sheet = getSheet();
						if (!sheet) return { found: false, transform: '', opacity: 0, animationCount: 0 };
						const style = getComputedStyle(sheet);
						return {
							found: true,
							transform: style.transform,
							opacity: Number.parseFloat(style.opacity || '1'),
							animationCount: sheet.getAnimations().length,
						};
					};
					const readFinal = () => {
						const sheet = getSheet();
						if (!sheet) return { found: false, opacity: 0, rectTop: 0, expectedTop: window.innerHeight * 0.5 };
						const rect = sheet.getBoundingClientRect();
						const style = getComputedStyle(sheet);
						return {
							found: true,
							opacity: Number.parseFloat(style.opacity || '1'),
							rectTop: rect.top,
							expectedTop: window.innerHeight * 0.5,
						};
					};
					const trigger = [...document.querySelectorAll('div')]
						.filter((element) => typeof element.onclick === 'function')
						.find((element) => normalize(element.textContent) === '基础用法');
					if (!trigger) return { clicked: false, removed: false };
					trigger.click();
					await sleep(50);
					const early = readEarly();
					await sleep(550);
					const final = readFinal();
					const closeButton = getSheet()?.querySelector('button');
					closeButton?.click();
					await sleep(50);
					const exiting = readEarly();
					await sleep(300);
					return {
						clicked: true,
						early,
						final,
						exiting,
						removed: !getSheet(),
					};
				`);
				if (
					!metrics.clicked ||
					!metrics.early?.found ||
					metrics.early.animationCount === 0 ||
					metrics.early.transform === 'none' ||
					metrics.early.opacity < 0.95 ||
					!metrics.final?.found ||
					metrics.final.opacity < 0.95 ||
					Math.abs(metrics.final.rectTop - metrics.final.expectedTop) > 3 ||
					!metrics.exiting?.found ||
					metrics.exiting.animationCount === 0 ||
					metrics.exiting.transform === 'none' ||
					!metrics.removed
				) {
					throw new Error(JSON.stringify(metrics));
				}
			}
		]
	},
	{
		name: 'ActionSheet opens actions',
		path: '/actionSheet/en_US',
		steps: [() => clickText('Basic usage'), () => waitFor(() => bodyIncludes('Option one'), 'action sheet option')]
	},
	{
		name: 'ActionPopover opens inline actions',
		path: '/actionPopover/en_US',
		steps: [
			() => clickText('More actions'),
			() =>
				waitFor(
					() =>
						runInPage<boolean>(`
							return [...document.querySelectorAll('.fixed.z-50')].some((panel) => {
								const rect = panel.getBoundingClientRect();
								const style = getComputedStyle(panel);
								const text = panel.textContent || '';
								return (
									rect.width > 0 &&
									rect.height > 0 &&
									style.visibility !== 'hidden' &&
									style.display !== 'none' &&
									Number.parseFloat(style.opacity || '1') > 0.95 &&
									style.transform !== 'matrix(0.5, 0, 0, 0.5, 0, 0)' &&
									text.includes('Edit') &&
									text.includes('Delete')
								);
							});
						`),
					'action popover actions'
				)
		]
	},
	{
		name: 'ActionPopover demo variants open actions',
		path: '/actionPopover/zh_CN',
		steps: [
			async () => {
				const metrics = await runInPage<{ passed: boolean; failures: string[] }>(`
					const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
					const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
					const visible = (element) => {
						const rect = element.getBoundingClientRect();
						const style = getComputedStyle(element);
						return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
					};
					const closePopover = async () => {
						document.body.click();
						await sleep(180);
					};
					const isTriggerButton = (button) => !button.closest('.fixed.z-50');
					const findButtonByText = (text) =>
						[...document.querySelectorAll('button')]
						.filter(visible)
						.filter(isTriggerButton)
						.find((button) => normalize(button.textContent) === text);
					const findButtonAfterText = (text) => {
						const marker = [...document.querySelectorAll('div')]
							.filter(visible)
							.filter((element) => normalize(element.textContent).includes(text))
							.sort((a, b) => normalize(a.textContent).length - normalize(b.textContent).length)[0];
						if (!marker) return null;
						return [...document.querySelectorAll('button')]
							.filter(visible)
							.filter(isTriggerButton)
							.find((button) => marker.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING);
					};
					const panelWithText = (items) =>
						[...document.querySelectorAll('.fixed.z-50')].some((panel) => {
							const rect = panel.getBoundingClientRect();
							const style = getComputedStyle(panel);
							const text = panel.textContent || '';
							return (
								(rect.width > 0 || panel.querySelectorAll('button').length > 0) &&
								style.visibility !== 'hidden' &&
								style.display !== 'none' &&
								Number.parseFloat(style.opacity || '1') > 0.95 &&
								style.transform !== 'matrix(0.5, 0, 0, 0.5, 0, 0)' &&
								items.every((item) => text.includes(item))
							);
						});
					const ringSnapshot = () => {
						const buttons = [...document.querySelectorAll('.fixed.z-50 button')].filter(visible);
						const first = buttons[0];
						if (!first) {
							return { found: false, count: buttons.length, opacity: 0, transform: '', transitionDuration: '' };
						}
						const style = getComputedStyle(first);
						return {
							found: true,
							count: buttons.length,
							opacity: Number.parseFloat(style.opacity || '1'),
							transform: style.transform,
							transitionDuration: style.transitionDuration,
						};
					};
					const waitForRingSnapshot = async (snapshots, expectedCount) => {
						for (let i = 0; i < 20; i += 1) {
							const observed = snapshots.find((snapshot) => snapshot.found && snapshot.count === expectedCount);
							if (observed) return observed;
							const current = ringSnapshot();
							if (current.found && current.count === expectedCount) return current;
							await sleep(16);
						}
						return ringSnapshot();
					};
					const captureRingOpen = async (button, expectedCount) => {
						const snapshots = [];
						const observer = new MutationObserver(() => {
							const snapshot = ringSnapshot();
							if (snapshot.found) snapshots.push(snapshot);
						});
						observer.observe(document.body, { childList: true, subtree: true });
						button.click();
						const first = await waitForRingSnapshot(snapshots, expectedCount);
						await sleep(350);
						const final = ringSnapshot();
						observer.disconnect();
						return { first, final };
					};
					const ringSnapshotVisible = (snapshot, expectedCount) =>
						snapshot.found &&
						snapshot.count === expectedCount &&
						snapshot.opacity > 0.95 &&
						snapshot.transform !== 'matrix(0.5, 0, 0, 0.5, 0, 0)';
					const ringSnapshotChanged = (metrics) =>
						metrics.first.found &&
						metrics.final.found &&
						(Math.abs(metrics.first.opacity - metrics.final.opacity) > 0.05 || metrics.first.transform !== metrics.final.transform);
					const ringFailureDetails = (metrics) => JSON.stringify({ first: metrics.first, final: metrics.final });
					const failures = [];
					const assertInline = async (label, items) => {
						await closePopover();
						const button = findButtonByText(label);
						if (!button) {
							failures.push(label + ': trigger missing');
							return;
						}
						button.scrollIntoView({ block: 'center', inline: 'center' });
						button.click();
						await sleep(350);
						if (!panelWithText(items)) failures.push(label + ': panel missing');
					};
					const assertInlineAfterText = async (markerText, items) => {
						await closePopover();
						const button = findButtonAfterText(markerText);
						if (!button) {
							failures.push(markerText + ': trigger missing');
							return;
						}
						button.scrollIntoView({ block: 'center', inline: 'center' });
						button.click();
						await sleep(350);
						if (!panelWithText(items)) failures.push(markerText + ': panel missing');
					};
					const assertRingAfterText = async (markerText, expectedCount) => {
						await closePopover();
						let button = findButtonAfterText(markerText);
						if (!button) {
							failures.push(markerText + ': trigger missing');
							return;
						}
						button.scrollIntoView({ block: 'center', inline: 'center' });
						const firstOpen = await captureRingOpen(button, expectedCount);
						if (!ringSnapshotVisible(firstOpen.final, expectedCount)) failures.push(markerText + ': ring actions missing');
						if (!ringSnapshotChanged(firstOpen)) failures.push(markerText + ': first ring intro missing ' + ringFailureDetails(firstOpen));
						await closePopover();
						button = findButtonAfterText(markerText);
						if (!button) {
							failures.push(markerText + ': second trigger missing');
							return;
						}
						button.scrollIntoView({ block: 'center', inline: 'center' });
						const secondOpen = await captureRingOpen(button, expectedCount);
						if (!ringSnapshotVisible(secondOpen.final, expectedCount)) failures.push(markerText + ': second ring actions missing');
						if (!ringSnapshotChanged(secondOpen)) failures.push(markerText + ': second ring intro missing ' + ringFailureDetails(secondOpen));
					};

					await assertInline('更多操作', ['编辑', '删除']);
					await assertInline('居中对齐', ['编辑', '删除']);
					await assertInline('右对齐', ['编辑', '删除']);
					await assertInline('更多', ['复制链接', '举报']);
					await assertInlineAfterText('向上弹出', ['编辑', '删除']);
					await assertInline('操作菜单', ['编辑', '收藏', '删除']);
					await assertInline('编辑', ['复制', '粘贴']);
					await assertInline('反转色', ['编辑', '删除']);
					await assertInline('横向操作', ['复制', '粘贴']);
					await assertInline('宫格操作', ['编辑', '删除']);
					await assertRingAfterText('3 个操作项', 3);
					await assertRingAfterText('5 个操作项', 5);
					await assertRingAfterText('全圆', 8);

					return { passed: failures.length === 0, failures };
				`);
				if (!metrics.passed) {
					throw new Error(JSON.stringify(metrics.failures));
				}
			}
		]
	},
	{
		name: 'Card ActionPopover opens user actions',
		path: '/card/en_US',
		steps: [
			() =>
				runInPage<boolean>(`
					const button = document.querySelector('button[aria-label="More actions"]');
					if (!button) return false;
					button.scrollIntoView({ block: 'center', inline: 'center' });
					button.click();
					return true;
				`).then((ok) => {
					if (!ok) throw new Error('Unable to click card action button');
				}),
			() =>
				waitFor(
					() =>
						runInPage<boolean>(`
							return [...document.querySelectorAll('.fixed.z-50')].some((panel) => {
								const rect = panel.getBoundingClientRect();
								const style = getComputedStyle(panel);
								const text = panel.textContent || '';
								return (
									rect.width > 0 &&
									rect.height > 0 &&
									style.visibility !== 'hidden' &&
									style.display !== 'none' &&
									Number.parseFloat(style.opacity || '1') > 0.95 &&
									style.transform !== 'matrix(0.5, 0, 0, 0.5, 0, 0)' &&
									text.includes('Edit') &&
									text.includes('Delete')
								);
							});
						`),
					'card action popover actions'
				)
		]
	},
	{
		name: 'Input accepts browser input events',
		path: '/input/en_US',
		steps: [
			() => setInputValue('Initial text', 'RTDF input smoke'),
			() => clickText('Show Current Value'),
			() => waitFor(() => bodyIncludes('Current input text: RTDF input smoke'), 'controlled input value')
		]
	},
	{
		name: 'Radio change updates selected text',
		path: '/radio/en_US',
		steps: [() => clickText('KOTL', 1), () => waitFor(() => bodyIncludes('Selected: Keeper of the Light'), 'radio selected value')]
	},
	{
		name: 'Checkbox custom child toggles selected text',
		path: '/checkbox/en_US',
		steps: [() => clickText('Lina', 1), () => waitFor(() => bodyIncludes('Selected Lina'), 'checkbox selected value')]
	},
	{
		name: 'Tabs click switches active content',
		path: '/tabs/en_US',
		steps: [() => clickText('steamer', 0), () => waitFor(() => bodyIncludes('I am a ship'), 'tab content')]
	},
	{
		name: 'Tabs custom transition stays below tab bar',
		path: '/tabs/en_US',
		steps: [
			async () => {
				const ok = await runInPage<boolean>(`
					const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
					const header = [...document.querySelectorAll('div')].find((el) => normalize(el.textContent) === 'Custom transition');
					const root = header?.nextElementSibling;
					if (!header || !root) return false;
					header.scrollIntoView({ block: 'center', inline: 'center' });
					const carButton = [...root.querySelectorAll('button')].find((button) => normalize(button.textContent) === 'car');
					if (!carButton) return false;
					carButton.click();
					return true;
				`);
				if (!ok) throw new Error('Unable to click custom transition tab');
			},
			() =>
				waitFor(
					() =>
						runInPage<boolean>(`
							const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
							const visible = (el) => {
								const rect = el.getBoundingClientRect();
								const style = getComputedStyle(el);
								return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
							};
							const header = [...document.querySelectorAll('div')].find((el) => normalize(el.textContent) === 'Custom transition');
							const root = header?.nextElementSibling;
							if (!root) return false;
							const buttons = [...root.querySelectorAll('button')].filter(visible);
							const buttonRects = buttons.map((button) => button.getBoundingClientRect());
							const tabBottom = Math.max(...buttonRects.map((rect) => rect.bottom));
							const content = [...root.querySelectorAll('div')]
								.filter((el) => visible(el) && normalize(el.textContent) === 'I am car')
								.map((el) => el.getBoundingClientRect())
								.sort((a, b) => b.top - a.top)[0];
							return Boolean(content && content.top >= tabBottom + 4);
						`),
					'custom transition content below tab bar',
					7000
				)
		]
	},
	{
		name: 'Calendar opens popup',
		path: '/calendar/en_US',
		steps: [() => clickText('Basic usage'), () => waitFor(() => bodyIncludes('Confirm'), 'calendar confirm button')]
	},
	{
		name: 'Picker opens popup',
		path: '/picker/en_US',
		steps: [() => clickText('Basic usage'), () => waitFor(() => bodyIncludes('Confirm'), 'picker confirm button')]
	},
	{
		name: 'TimePicker opens popup columns',
		path: '/timePicker/zh_CN',
		steps: [
			() => clickText('基础用法'),
			async () => {
				await sleep(900);
				const metrics = await runInPage<{
					found: boolean;
					rect?: { top: number; bottom: number; height: number };
					viewportHeight: number;
					text?: string;
					transform?: string;
					contentCount: number;
				}>(`
					const candidates = [...document.querySelectorAll('.fixed.inset-0 .pointer-events-auto')];
					const panel = candidates.find((element) => {
						const rect = element.getBoundingClientRect();
						const text = element.textContent || '';
						return rect.width > 0 && rect.height > 0 && text.includes('确定') && text.includes('年');
					});
					if (!panel) {
						return {
							found: false,
							viewportHeight: window.innerHeight,
							contentCount: document.querySelectorAll('.picker-contents').length,
						};
					}
					const rect = panel.getBoundingClientRect();
					return {
						found: true,
						rect: { top: rect.top, bottom: rect.bottom, height: rect.height },
						viewportHeight: window.innerHeight,
						text: (panel.textContent || '').slice(0, 160),
						transform: getComputedStyle(panel).transform,
						contentCount: panel.querySelectorAll('.picker-contents').length,
					};
				`);
				if (
					!metrics.found ||
					!metrics.rect ||
					metrics.contentCount < 3 ||
					Math.abs(metrics.rect.bottom - metrics.viewportHeight) > 2 ||
					metrics.rect.height < 300 ||
					metrics.transform !== 'matrix(1, 0, 0, 1, 0, 0)'
				) {
					throw new Error(JSON.stringify(metrics));
				}
			}
		]
	},
	{
		name: 'ColorPicker first popup aligns to viewport bottom',
		path: '/colorPicker/en_US',
		steps: [
			() => clickText('OKLCH Only'),
			async () => {
				await sleep(900);
				const metrics = await runInPage<{
					found: boolean;
					rect?: { top: number; bottom: number; height: number };
					viewportHeight: number;
					text?: string;
					transform?: string;
					containerHeight?: string;
				}>(`
							const candidates = [...document.querySelectorAll('.fixed.inset-0 .pointer-events-auto')];
							const panel = candidates.find((element) => {
								const rect = element.getBoundingClientRect();
								const text = element.textContent || '';
								return rect.width > 0 && rect.height > 0 && text.includes('oklch(');
							});
							if (!panel) return { found: false, viewportHeight: window.innerHeight };
							const rect = panel.getBoundingClientRect();
							return {
								found: true,
								rect: { top: rect.top, bottom: rect.bottom, height: rect.height },
								viewportHeight: window.innerHeight,
								text: (panel.textContent || '').slice(0, 120),
								transform: getComputedStyle(panel).transform,
								containerHeight: getComputedStyle(panel.parentElement).height,
							};
						`);
				if (
					!metrics.found ||
					!metrics.rect ||
					Math.abs(metrics.rect.bottom - metrics.viewportHeight) > 2 ||
					metrics.rect.height < 320 ||
					metrics.rect.top > metrics.viewportHeight - 320
				) {
					throw new Error(JSON.stringify(metrics));
				}
			}
		]
	},
	{
		name: 'NumKeyboard writes value through key click',
		path: '/numKeyboard/en_US',
		steps: [() => clickText('Get Content'), () => clickText('1'), () => waitFor(() => bodyIncludes('Content: 1'), 'num keyboard value')]
	},
	{
		name: 'NumKeyboard love code shows svelte-compatible confetti',
		path: '/numKeyboard/en_US',
		steps: [
			() => clickText('Please Enter 5201314'),
			() => clickText('5'),
			() => clickText('2'),
			() => clickText('0'),
			() => clickText('1'),
			() => clickText('3'),
			() => clickText('1'),
			() => clickText('4'),
			() =>
				waitFor(
					() =>
						runInPage<boolean>(`
							const holder = document.querySelector('.any-tdf-confetti-holder.rounded');
							return Boolean(holder) && holder.querySelectorAll('.any-tdf-confetti').length === 100;
						`),
					'love code confetti'
				)
		]
	},
	{
		name: 'FullKeyboard opens letter keyboard',
		path: '/fullKeyboard/en_US',
		steps: [() => clickText('Letter Only Mode'), () => waitFor(() => bodyIncludes('q'), 'full keyboard keys')]
	},
	{
		name: 'FullKeyboard hello shows svelte-compatible confetti',
		path: '/fullKeyboard/en_US',
		steps: [
			() => clickText('Please input hello'),
			() => clickText('h'),
			() => clickText('e'),
			() => clickText('l'),
			() => clickText('l'),
			() => clickText('o'),
			() =>
				waitFor(
					() =>
						runInPage<boolean>(`
							const holder = document.querySelector('.any-tdf-confetti-holder.rounded');
							return Boolean(holder) && holder.querySelectorAll('.any-tdf-confetti').length === 100;
						`),
					'hello confetti'
				)
		]
	},
	{
		name: 'ImagePreview opens overlay',
		path: '/imagePreview/en_US',
		steps: [
			() => clickText('Preview Images'),
			() =>
				waitFor(
					() =>
						runInPage<boolean>(`
							const overlay = [...document.querySelectorAll('*')].find((element) => {
								const style = getComputedStyle(element);
								const rect = element.getBoundingClientRect();
								return style.position === 'fixed' && Number(style.zIndex) > 1000 && rect.width > 0 && rect.height > 0 && element.querySelector('img[src*="/assets/images/wall_1.jpg"]');
							});
							if (!overlay) return false;
							const image = overlay.querySelector('img[src*="/assets/images/wall_1.jpg"]');
							const rect = image.getBoundingClientRect();
							const style = getComputedStyle(overlay);
							return image.complete && image.naturalWidth > 0 && rect.width > 0 && rect.height > 0 && style.opacity !== '0' && style.visibility !== 'hidden';
						`),
					'image preview visible image'
				)
		]
	},
	{
		name: 'Theme switch changes mode attribute',
		path: '/button/en_US',
		steps: [
			() => runInPage<boolean>(`document.querySelector('button[aria-label="切换到暗色模式"]')?.click(); return true;`),
			() =>
				waitFor(() => runInPage<boolean>(`return document.documentElement.getAttribute('data-mode') === 'dark';`), 'dark mode attribute')
		]
	}
];

const failures: Array<{ name: string; reason: string }> = [];
const scenariosToRun = scenarioFilter ? scenarios.filter((scenario) => scenario.name.includes(scenarioFilter)) : scenarios;

for (const scenario of scenariosToRun) {
	try {
		await goto(scenario.path);
		for (const step of scenario.steps) {
			await step();
		}
		assertNoBrowserErrors(scenario.name);
		console.log(`PASS ${scenario.name}`);
	} catch (error) {
		failures.push({
			name: scenario.name,
			reason: error instanceof Error ? error.message : String(error)
		});
		console.log(`FAIL ${scenario.name}`);
	}
}

let routeSmokeChecked = 0;
if (!scenarioFilter) {
	for (const demoPage of demoPages) {
		for (const lang of ['zh_CN', 'en_US'] as const) {
			const path = `/${demoPage}/${lang}`;
			try {
				await goto(path);
				await clickFirstInteractive();
				await sleep(200);
				assertNoBrowserErrors(`route smoke ${path}`);
				routeSmokeChecked += 1;
			} catch (error) {
				failures.push({
					name: `route smoke ${path}`,
					reason: error instanceof Error ? error.message : String(error)
				});
			}
		}
	}
	console.log(`PASS route smoke checked ${routeSmokeChecked}/${demoPages.length * 2}`);
}

page.close();
cleanup();

console.log(
	JSON.stringify(
		{
			baseUrl,
			checked: scenariosToRun.length,
			routeSmokeChecked,
			routeSmokeTotal: scenarioFilter ? 0 : demoPages.length * 2,
			failedCount: failures.length,
			failures
		},
		null,
		2
	)
);

if (failures.length > 0) process.exit(1);
