import { existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

type CDPResponse = {
	id?: number;
	result?: unknown;
	error?: { message: string };
};

const packageRoot = resolve(import.meta.dir, '..');
const routesRoot = join(packageRoot, 'src/routes');
const baseUrl = process.env.STDF_VERIFY_BASE_URL || 'http://127.0.0.1:8888';
const scenarioFilter = process.env.STDF_VERIFY_SCENARIO || '';
const debugPort = Number(process.env.STDF_BROWSER_DEBUG_PORT || 9236);
const chromePath =
	process.env.CHROME_PATH ||
	[
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser'
	].find((path) => existsSync(path));
const userDataDir = mkdtempSync(join(tmpdir(), 'stdf-browser-'));
const routes = readdirSync(routesRoot, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && entry.name !== 'components')
	.map((entry) => entry.name)
	.sort();
const failed: { route: string; reason: string }[] = [];

if (!chromePath) {
	console.error('Chrome or Chromium executable was not found. Set CHROME_PATH to run browser verification.');
	process.exit(1);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
		'--remote-debugging-address=127.0.0.1',
		`--remote-debugging-port=${debugPort}`,
		`--user-data-dir=${userDataDir}`,
		'about:blank'
	],
	{ stdout: 'ignore', stderr: 'ignore' }
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
	for (let i = 0; i < 80; i += 1) {
		const response = await fetch(url).catch((error: Error) => {
			lastError = error.message;
			return undefined;
		});
		if (response?.ok) return response.json() as Promise<T>;
		if (chromeExited) throw new Error(`Chrome exited before DevTools became available. Last fetch error: ${lastError}`);
		await sleep(100);
	}
	throw new Error(`Unable to connect to Chrome DevTools: ${lastError}`);
};

class CDPClient {
	private id = 0;
	private pending = new Map<number, { resolve: (value: unknown) => void; reject: (error: Error) => void }>();
	private socket: WebSocket;

	private constructor(socket: WebSocket) {
		this.socket = socket;
		this.socket.onmessage = (event) => {
			const message = JSON.parse(String(event.data)) as CDPResponse;
			if (!message.id) return;
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

	close = () => this.socket.close();
}

await waitForJson<{ webSocketDebuggerUrl: string }>(`http://127.0.0.1:${debugPort}/json/version`);
const targetResponse = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' });
if (!targetResponse.ok) throw new Error(`Unable to create Chrome page target: ${targetResponse.status}`);
const target = (await targetResponse.json()) as { webSocketDebuggerUrl: string };
const page = await CDPClient.create(target.webSocketDebuggerUrl);
await page.call('Runtime.enable');
await page.call('Page.enable');
await page.call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 3, mobile: true });
await page.call('Emulation.setTouchEmulationEnabled', { enabled: true });

const runInPage = <T>(body: string) =>
	page.evaluate<T>(`(async () => {
		${body}
	})()`);

const waitForReady = async () => {
	for (let i = 0; i < 100; i += 1) {
		const ready = await runInPage<boolean>("return document.readyState === 'complete' && document.body.innerText.length > 0;").catch(
			() => false
		);
		if (ready) return true;
		await sleep(100);
	}
	return false;
};

const navigate = async (url: string) => {
	const response = await fetch(url).catch(() => undefined);
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

const checkThemeFavicon = async () => {
	const lightReason = await navigate(`${baseUrl}/button/zh_CN?channel=iframe&theme=ANYTDF&darkMode=light&lang=zh_CN`);
	if (lightReason) throw new Error(lightReason);
	const lightReady = await waitForFunction(`
		const favicon = document.querySelector('[data-theme-favicon]')?.getAttribute('href') || '';
		return document.documentElement.getAttribute('data-mode') === 'primary' && favicon.endsWith('stdf.svg');
	`);
	if (!lightReady) throw new Error('Light favicon did not match light mode');

	await runInPage(`document.documentElement.setAttribute('data-mode', 'dark');`);
	const manualDarkReady = await waitForFunction(`
		return (document.querySelector('[data-theme-favicon]')?.getAttribute('href') || '').endsWith('stdf_dark.svg');
	`);
	if (!manualDarkReady) throw new Error('Favicon did not follow the runtime dark mode change');

	const darkReason = await navigate(`${baseUrl}/button/zh_CN?channel=iframe&theme=ANYTDF&darkMode=dark&lang=zh_CN`);
	if (darkReason) throw new Error(darkReason);
	const darkReady = await waitForFunction(`
		const favicon = document.querySelector('[data-theme-favicon]')?.getAttribute('href') || '';
		return document.documentElement.getAttribute('data-mode') === 'dark' && favicon.endsWith('stdf_dark.svg');
	`);
	if (!darkReady) throw new Error('Dark favicon did not match the darkMode parameter');
};

const clickText = async (text: string) => {
	const clicked = await runInPage<boolean>(`
		const wanted = ${JSON.stringify(text)};
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim().toLowerCase();
		const isVisible = (element) => {
			const rect = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
		};
		const candidates = [...document.querySelectorAll('button, [role="button"], a, [onclick]')].filter(isVisible);
		const target = candidates.find((element) => normalize(element.textContent) === normalize(wanted));
		if (!target) return false;
		target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
		return true;
	`);
	if (!clicked) throw new Error(`Unable to click text: ${text}`);
};

if (scenarioFilter !== 'confetti') {
	for (const route of routes) {
		const url = `${baseUrl}/${route}/zh_CN?channel=iframe&theme=ANYTDF&darkMode=light&lang=zh_CN`;
		const reason = await navigate(url);
		if (reason) {
			failed.push({ route, reason });
			continue;
		}
		const state = await runInPage<{ hasText: boolean; layoutValid: boolean }>(`
			const text = document.body.innerText || '';
			const box = document.body.getBoundingClientRect();
			return { hasText: text.length > 0, layoutValid: box.width >= 300 && box.height >= 200 };
		`);
		if (!state.hasText) failed.push({ route, reason: 'Route text not rendered' });
		if (!state.layoutValid) failed.push({ route, reason: 'Document body has invalid layout' });
	}
	await checkThemeFavicon().catch((error: unknown) => {
		failed.push({ route: 'theme favicon', reason: error instanceof Error ? error.message : String(error) });
	});
}

const checkKeyboardConfetti = async (path: string, openText: string, keys: string[], expectedText: string) => {
	const reason = await navigate(`${baseUrl}${path}?channel=iframe&theme=ANYTDF&darkMode=light&lang=en_US`);
	if (reason) {
		failed.push({ route: path, reason });
		return;
	}
	await clickText(openText);
	for (const key of keys) await clickText(key);
	const ok = await waitForFunction(`
		const bodyText = document.body.innerText || '';
		const confettiNodes = [...document.querySelectorAll('*')].filter((element) => /confetti/i.test(element.getAttribute('class') || ''));
		return bodyText.includes(${JSON.stringify(expectedText)}) && confettiNodes.length > 0;
	`);
	if (!ok) failed.push({ route: path, reason: 'Svelte confetti interaction was not rendered' });
};

await checkKeyboardConfetti('/numKeyboard/en_US', 'Please Enter 5201314', ['5', '2', '0', '1', '3', '1', '4'], '5201314');
await checkKeyboardConfetti('/fullKeyboard/en_US', 'Please input hello', ['h', 'e', 'l', 'l', 'o'], 'hello');

page.close();
cleanup();

const result = {
	baseUrl,
	scenarioFilter,
	checked: scenarioFilter === 'confetti' ? 2 : routes.length + 3,
	failedCount: failed.length,
	failed
};
console.log(JSON.stringify(result, null, 2));
if (failed.length > 0) process.exit(1);
