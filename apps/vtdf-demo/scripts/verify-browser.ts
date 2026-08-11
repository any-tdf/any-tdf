import { existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

type CDPResponse = {
	id?: number;
	result?: unknown;
	error?: { message: string };
	method?: string;
	params?: unknown;
};

const packageRoot = resolve(import.meta.dir, '..');
const workspaceRoot = resolve(packageRoot, '../..');
const stdfRoutesRoot = join(workspaceRoot, 'apps/stdf-demo/src/routes');
const baseUrl = process.env.VTDF_VERIFY_BASE_URL || 'http://127.0.0.1:8886';
const scenarioFilter = process.env.VTDF_VERIFY_SCENARIO || '';
const debugPort = Number(process.env.VTDF_BROWSER_DEBUG_PORT || 9235);
const chromePath =
	process.env.CHROME_PATH ||
	[
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser'
	].find((path) => existsSync(path));
const userDataDir = mkdtempSync(join(tmpdir(), 'vtdf-browser-'));
const routes = readdirSync(stdfRoutesRoot, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && entry.name !== 'components')
	.map((entry) => entry.name)
	.sort();
const selectedRoutes = scenarioFilter && scenarioFilter !== 'confetti' ? routes.filter((route) => route === scenarioFilter) : routes;
const failed: { route: string; reason: string }[] = [];

if (!chromePath) {
	console.error('Chrome or Chromium executable was not found. Set CHROME_PATH to run browser verification.');
	process.exit(1);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const withTimeout = <T>(promise: Promise<T>, label: string, timeout = 3000) =>
	new Promise<T>((resolve, reject) => {
		const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${label}`)), timeout);
		promise.then(
			(value) => {
				clearTimeout(timer);
				resolve(value);
			},
			(error: unknown) => {
				clearTimeout(timer);
				reject(error);
			}
		);
	});

const chrome = Bun.spawn(
	[
		chromePath,
		'--headless=new',
		'--no-sandbox',
		'--disable-gpu',
		'--no-first-run',
		'--no-default-browser-check',
		'--disable-dev-shm-usage',
		'--window-size=390,844',
		`--remote-debugging-address=127.0.0.1`,
		`--remote-debugging-port=${debugPort}`,
		`--user-data-dir=${userDataDir}`,
		'about:blank'
	],
	{
		stdout: 'ignore',
		stderr: 'ignore'
	}
);
let chromeExited = false;
chrome.exited.then(() => {
	chromeExited = true;
});

let cleaned = false;
const cleanup = () => {
	if (cleaned) return;
	cleaned = true;
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
		if (chromeExited) throw new Error(`Chrome exited before DevTools became available. Last fetch error: ${lastError}`);
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
		return withTimeout(
			new Promise<T>((resolve, reject) => {
				this.pending.set(id, {
					resolve: resolve as (value: unknown) => void,
					reject
				});
			}),
			method
		);
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
const target = (await targetResponse.json()) as { webSocketDebuggerUrl: string };
const page = await CDPClient.create(target.webSocketDebuggerUrl);
await page.call('Runtime.enable');
await page.call('Page.enable');
await page.call('Emulation.setDeviceMetricsOverride', {
	width: 390,
	height: 844,
	deviceScaleFactor: 3,
	mobile: true
});
await page.call('Emulation.setTouchEmulationEnabled', { enabled: true });

const browserMessages: string[] = [];
page.on('Runtime.exceptionThrown', (params) => {
	browserMessages.push(`exception: ${JSON.stringify(params)}`);
});
page.on('Runtime.consoleAPICalled', (params) => {
	const event = params as { type?: string; args?: Array<{ value?: unknown; description?: string }> };
	if (event.type !== 'error' && event.type !== 'warning') return;
	const message = event.args?.map((arg) => String(arg.value ?? arg.description ?? '')).join(' ') || `console.${event.type}`;
	browserMessages.push(`${event.type}: ${message}`);
});

const runInPage = <T>(body: string) =>
	page.evaluate<T>(`(async () => {
		${body}
	})()`);

const waitForReady = async () => {
	const deadline = Date.now() + 10000;
	while (Date.now() < deadline) {
		const ready = await runInPage<boolean>("return document.readyState === 'complete' && !!document.querySelector('#app');").catch(
			() => false
		);
		if (ready) return true;
		await sleep(100);
	}
	return false;
};

const navigate = async (url: string) => {
	browserMessages.length = 0;
	await page.call('Page.navigate', { url: 'about:blank' });
	await sleep(50);
	const response = await withTimeout(fetch(url), `fetch ${url}`, 5000).catch(() => undefined);
	if (!response?.ok) return `HTTP ${response?.status ?? 'unknown'}`;
	await page.call('Page.navigate', { url });
	const ready = await waitForReady();
	return ready ? '' : 'Page did not finish rendering';
};

const waitForFunction = async (body: string) => {
	for (let i = 0; i < 50; i += 1) {
		const matched = await runInPage<boolean>(body).catch(() => false);
		if (matched) return true;
		await sleep(100);
	}
	return false;
};

const clickText = async (text: string) => {
	const clicked = await runInPage<boolean>(`
		const wanted = ${JSON.stringify(text)};
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		const isVisible = (element) => {
			const rect = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
		};
		const candidates = [...document.querySelectorAll('button, [role="button"], a')].filter(isVisible);
		const target = candidates.find((element) => normalize(element.textContent) === wanted);
		if (!target) return false;
		target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
		return true;
	`);
	if (!clicked) throw new Error(`Unable to click text: ${text}`);
};

if (scenarioFilter !== 'confetti') {
	for (const [index, route] of selectedRoutes.entries()) {
		console.error(`[vtdf verify] route ${index + 1}/${selectedRoutes.length}: ${route}`);
		const url = `${baseUrl}/${route}/zh_CN?channel=iframe&theme=ANYTDF&darkMode=light&lang=zh_CN`;
		const reason = await navigate(url);
		if (reason) {
			failed.push({ route, reason });
			continue;
		}
		const state = await runInPage<{ hasContent: boolean; layoutValid: boolean }>(`
			const text = document.body.innerText || '';
			const box = document.querySelector('#app')?.getBoundingClientRect();
			return {
				hasContent: text.trim().length > 0,
				layoutValid: !!box && box.width >= 300 && box.height >= 200,
			};
		`);
		if (!state.hasContent) {
			failed.push({ route, reason: 'Route content not rendered' });
		}
		if (!state.layoutValid) {
			failed.push({ route, reason: 'App root has invalid layout' });
		}
		if (browserMessages.length > 0) {
			failed.push({ route, reason: `Browser console warnings or errors: ${browserMessages.slice(0, 3).join(' | ')}` });
		}
	}
}

const checkBottomSheetMotion = async () => {
	const path = '/bottomSheet/en_US';
	console.error(`[vtdf verify] scenario: ${path} motion`);
	const reason = await navigate(`${baseUrl}${path}?channel=iframe&theme=ANYTDF&darkMode=light&lang=en_US`);
	if (reason) {
		failed.push({ route: path, reason });
		return;
	}

	const metrics = await runInPage<{
		clicked: boolean;
		early?: { animationCount: number; found: boolean; height: number; transform: string };
		final?: { animationCount: number; expectedTop: number; found: boolean; height: number; rectTop: number; transform: string };
		exiting?: { animationCount: number; found: boolean; transform: string };
		removed: boolean;
	}>(`
		const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		const getSheet = () => document.querySelector('.fixed.w-screen.bg-bg-overlay');
		const trigger = [...document.querySelectorAll('button, [role="button"]')].find(
			(element) => normalize(element.textContent) === 'Basic Usage'
		);
		if (!trigger) return { clicked: false, removed: false };
		trigger.click();
		await sleep(50);
		const earlySheet = getSheet();
		const early = earlySheet
			? {
					animationCount: earlySheet.getAnimations().length,
					found: true,
					height: earlySheet.getBoundingClientRect().height,
					transform: getComputedStyle(earlySheet).transform,
				}
			: { animationCount: 0, found: false, height: 0, transform: '' };
		await sleep(550);
		const finalSheet = getSheet();
		const final = finalSheet
			? {
					animationCount: finalSheet.getAnimations().length,
					expectedTop: window.innerHeight * 0.5,
					found: true,
					height: finalSheet.getBoundingClientRect().height,
					rectTop: finalSheet.getBoundingClientRect().top,
					transform: getComputedStyle(finalSheet).transform,
				}
			: { animationCount: 0, expectedTop: window.innerHeight * 0.5, found: false, height: 0, rectTop: 0, transform: '' };
		const closeButton = finalSheet?.querySelector('button[aria-label="close"]');
		closeButton?.click();
		await sleep(50);
		const exitingSheet = getSheet();
		const exiting = exitingSheet
			? {
					animationCount: exitingSheet.getAnimations().length,
					found: true,
					transform: getComputedStyle(exitingSheet).transform,
				}
			: { animationCount: 0, found: false, transform: '' };
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
		metrics.early.height <= 0 ||
		metrics.early.transform === 'none' ||
		!metrics.final?.found ||
		metrics.final.animationCount !== 0 ||
		metrics.final.height <= 0 ||
		Math.abs(metrics.final.rectTop - metrics.final.expectedTop) > 3 ||
		!metrics.exiting?.found ||
		metrics.exiting.animationCount === 0 ||
		metrics.exiting.transform === 'none' ||
		!metrics.removed
	) {
		failed.push({ route: path, reason: `BottomSheet motion is invalid: ${JSON.stringify(metrics)}` });
	}
};

const checkCardActionPopover = async () => {
	const path = '/card/en_US';
	console.error(`[vtdf verify] scenario: ${path} ActionPopover`);
	const reason = await navigate(`${baseUrl}${path}?channel=iframe&theme=ANYTDF&darkMode=light&lang=en_US`);
	if (reason) {
		failed.push({ route: path, reason });
		return;
	}

	const clicked = await runInPage<boolean>(`
		const button = document.querySelector('button[aria-label="More actions"]');
		if (!button) return false;
		button.scrollIntoView({ block: 'center', inline: 'center' });
		button.click();
		return true;
	`);
	const opened =
		clicked &&
		(await waitForFunction(`
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
					text.includes('Edit') &&
					text.includes('Share') &&
					text.includes('Delete')
				);
			});
		`));
	if (!opened) {
		failed.push({ route: path, reason: clicked ? 'Card ActionPopover actions did not render' : 'Card ActionPopover trigger was not found' });
	}
};

const checkSwiperLayout = async () => {
	const path = '/swiper/en_US';
	console.error(`[vtdf verify] scenario: ${path} layout`);
	const reason = await navigate(`${baseUrl}${path}?channel=iframe&theme=ANYTDF&darkMode=light&lang=en_US`);
	if (reason) {
		failed.push({ route: path, reason });
		return;
	}

	const metrics = await runInPage<{
		bodyWidth: number;
		containerStyleWidth: string;
		documentWidth: number;
		imageHeight: number;
		imageWidth: number;
		innerWidth: number;
		itemStyleWidth: string;
		rootWidth: number;
	}>(`
		const images = [...document.querySelectorAll('img[src*="/assets/images/wall_"]')];
		const imageMetrics = images.map((image) => {
			const rect = image.getBoundingClientRect();
			const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
			return { image, rect, visibleWidth };
		});
		const visibleImage = imageMetrics.reduce(
			(current, candidate) => (candidate.visibleWidth > current.visibleWidth ? candidate : current),
			{ image: null, rect: { height: 0, width: 0 }, visibleWidth: 0 }
		);
		const item = visibleImage.image?.closest('.absolute');
		const container = item?.parentElement;
		const root = container?.parentElement;
		const rootRect = root?.getBoundingClientRect();
		return {
			bodyWidth: document.body.clientWidth,
			containerStyleWidth: container?.getAttribute('style') || '',
			documentWidth: document.documentElement.clientWidth,
			imageHeight: visibleImage.rect.height,
			imageWidth: visibleImage.visibleWidth,
			innerWidth: window.innerWidth,
			itemStyleWidth: item?.getAttribute('style') || '',
			rootWidth: rootRect?.width || 0,
		};
	`);
	const expectedWidth = Math.min(metrics.innerWidth, metrics.documentWidth);
	if (
		expectedWidth <= 0 ||
		Math.abs(metrics.rootWidth - expectedWidth) > 2 ||
		Math.abs(metrics.imageWidth - expectedWidth) > 2 ||
		metrics.imageHeight <= 0
	) {
		failed.push({ route: path, reason: `Swiper layout is invalid: ${JSON.stringify(metrics)}` });
	}
};

const checkDemoInjectionClasses = async () => {
	const path = '/placeholder/en_US';
	console.error(`[vtdf verify] scenario: ${path} injected classes`);
	const reason = await navigate(`${baseUrl}${path}?channel=iframe&theme=ANYTDF&darkMode=light&lang=en_US`);
	if (reason) {
		failed.push({ route: path, reason });
		return;
	}

	const state = await runInPage<{ backgroundImage: string; found: boolean }>(`
		const target = document.querySelector('.vtdf-demo-gradient-primary');
		return {
			backgroundImage: target ? getComputedStyle(target).backgroundImage : '',
			found: Boolean(target),
		};
	`);
	if (!state.found || !state.backgroundImage.includes('linear-gradient')) {
		failed.push({ route: path, reason: `Demo injected class is invalid: ${JSON.stringify(state)}` });
	}
};

const checkTabsInitialLayout = async () => {
	const path = '/tabs/en_US';
	console.error(`[vtdf verify] scenario: ${path} initial layout`);
	const reason = await navigate(`${baseUrl}${path}?channel=iframe&theme=ANYTDF&darkMode=light&lang=en_US`);
	if (reason) {
		failed.push({ route: path, reason });
		return;
	}

	const state = await runInPage<{
		contentWidths: number[];
		found: boolean;
		trackWidth: number;
		visibleContentCount: number;
		viewportWidth: number;
	}>(`
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		const heading = [...document.querySelectorAll('div')].find(
			(element) => normalize(element.textContent) === 'Transition mitigation' && element.children.length === 0
		);
		const example = heading?.nextElementSibling;
		const viewport = [...(example?.querySelectorAll('.overflow-hidden') || [])].find((element) => {
			const children = [...(element.firstElementChild?.children || [])];
			return children.length === 4 && children.every((child) => normalize(child.textContent).startsWith('I am a '));
		});
		const track = viewport?.firstElementChild;
		const viewportRect = viewport?.getBoundingClientRect();
		const contentRects = track ? [...track.children].map((element) => element.getBoundingClientRect()) : [];
		const visibleContentCount = viewportRect
			? contentRects.filter(
					(rect) =>
						Math.max(0, Math.min(rect.right, viewportRect.right) - Math.max(rect.left, viewportRect.left)) > 1
				).length
			: 0;
		return {
			contentWidths: contentRects.map((rect) => rect.width),
			found: Boolean(viewport && track),
			trackWidth: track?.getBoundingClientRect().width || 0,
			visibleContentCount,
			viewportWidth: viewportRect?.width || 0,
		};
	`);
	if (
		!state.found ||
		state.viewportWidth <= 0 ||
		state.trackWidth <= state.viewportWidth ||
		state.visibleContentCount !== 1 ||
		state.contentWidths.some((width) => Math.abs(width - state.viewportWidth) > 2)
	) {
		failed.push({ route: path, reason: `Tabs initial layout is invalid: ${JSON.stringify(state)}` });
	}
};

const checkKeyboardConfetti = async (path: string, openText: string, keys: string[]) => {
	console.error(`[vtdf verify] scenario: ${path}`);
	const reason = await navigate(`${baseUrl}${path}?channel=iframe&theme=ANYTDF&darkMode=light&lang=en_US`);
	if (reason) {
		failed.push({ route: path, reason });
		return;
	}
	await clickText(openText);
	for (const key of keys) {
		await clickText(key);
	}
	const ok = await waitForFunction(`
		const holder = document.querySelector('.any-tdf-confetti-holder.rounded');
		return Boolean(holder) && holder.querySelectorAll('.any-tdf-confetti').length === 100;
	`);
	if (!ok) {
		failed.push({ route: path, reason: 'Svelte-compatible Vue confetti was not rendered' });
	}
};

if (scenarioFilter !== 'confetti') {
	await checkBottomSheetMotion();
	await checkCardActionPopover();
	await checkSwiperLayout();
	await checkDemoInjectionClasses();
	await checkTabsInitialLayout();
}
await checkKeyboardConfetti('/numKeyboard/en_US', 'Please enter 5201314', ['5', '2', '0', '1', '3', '1', '4']);
await checkKeyboardConfetti('/fullKeyboard/en_US', 'Please enter hello', ['h', 'e', 'l', 'l', 'o']);

page.close();
cleanup();

const result = {
	baseUrl,
	scenarioFilter,
	checked: scenarioFilter === 'confetti' ? 2 : selectedRoutes.length + 7,
	failedCount: failed.length,
	failed
};
console.log(JSON.stringify(result, null, 2));
if (failed.length > 0) process.exit(1);
