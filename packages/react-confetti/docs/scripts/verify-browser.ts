import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

type CDPResponse = {
	id?: number;
	result?: unknown;
	error?: { message: string };
};

const baseUrl = process.env.REACT_CONFETTI_DOCS_VERIFY_BASE_URL || 'http://127.0.0.1:5561/?lang=en_US';
const debugPort = Number(process.env.REACT_CONFETTI_DOCS_BROWSER_DEBUG_PORT || 9233);
const chromePath =
	process.env.CHROME_PATH ||
	[
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser'
	].find((path) => existsSync(path));
const userDataDir = mkdtempSync(join(tmpdir(), 'react-confetti-browser-'));

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

	close = () => this.socket.close();
}

await waitForJson<{ webSocketDebuggerUrl: string }>(`http://127.0.0.1:${debugPort}/json/version`);
const targetResponse = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' });
if (!targetResponse.ok) throw new Error(`Unable to create Chrome page target: ${targetResponse.status}`);
const target = (await targetResponse.json()) as { webSocketDebuggerUrl: string };
const page = await CDPClient.create(target.webSocketDebuggerUrl);
await page.call('Runtime.enable');
await page.call('Page.enable');

const runInPage = <T>(body: string) =>
	page.evaluate<T>(`(async () => {
		${body}
	})()`);

await page.call('Page.navigate', { url: baseUrl });
for (let i = 0; i < 100; i += 1) {
	const ready = await runInPage<boolean>("return document.readyState === 'complete' && !!document.querySelector('button');").catch(
		() => false
	);
	if (ready) break;
	await sleep(100);
}

const initial = await runInPage<{
	title: string;
	lang: string;
	apiPropsPresent: boolean;
	examplesPresent: boolean;
	constantInitiallyInactive: boolean;
}>(`
	const text = document.body.textContent || '';
	const apiProps = ['size','x','y','duration','infinite','delay','colorRange','colorArray','amount','iterationCount','fallDistance','rounded','cone','noGravity','xSpread','destroyOnComplete','disableForReducedMotion','className','style'];
	const examples = ['Default','Lots','Few','Large','Rounded','Colored','Multi Colored','Images','Gradient','Flag','Vertical','Horizontal','Cone','All around','Explosion','Sparkles','Spray','Feathered','Constant','Fullscreen','Green range','No fall','USA','Animate explosion'];
	return {
		title: document.title,
		lang: document.documentElement.lang,
		apiPropsPresent: apiProps.every((name) => text.includes(name)),
		examplesPresent: examples.every((label) => text.includes(label)),
		constantInitiallyInactive: ![...document.querySelectorAll('.confetti-toggle')].some((toggle) => toggle.textContent?.includes('Constant') && toggle.querySelector('.any-tdf-confetti-holder')),
	};
`);

await runInPage(`
	[...document.querySelectorAll('button')].find((button) => button.textContent?.trim() === 'Default')?.click();
`);
await sleep(100);
const defaultDemo = await runInPage<{ pieces: number }>(`
	const holders = [...document.querySelectorAll('.any-tdf-confetti-holder')];
	return { pieces: holders.at(-1)?.querySelectorAll('.any-tdf-confetti').length || 0 };
`);

await runInPage(`
	[...document.querySelectorAll('button')].find((button) => button.textContent?.trim() === 'Constant')?.click();
`);
await sleep(100);
const constantDemo = await runInPage<{ pieces: number; iterationCount: string }>(`
	const holders = [...document.querySelectorAll('.any-tdf-confetti-holder')];
	const holder = holders.at(-1);
	const style = holder ? getComputedStyle(holder) : null;
	return {
		pieces: holder?.querySelectorAll('.any-tdf-confetti').length || 0,
		iterationCount: style?.getPropertyValue('--transition-iteration-count').trim() || '',
	};
`);

await runInPage(`
	[...document.querySelectorAll('button')].find((button) => button.textContent?.trim() === 'Fullscreen')?.click();
`);
await sleep(100);
const fullscreenDemo = await runInPage<{
	exists: boolean;
	pieces: number;
	position: string;
	top: string;
	left: string;
	width: number;
	height: number;
	justifyContent: string;
	overflow: string;
	pointerEvents: string;
	fallDistance: string;
	iterationCount: string;
}>(`
	const layer = document.querySelector('.fullscreen-confetti');
	const holder = layer?.querySelector('.any-tdf-confetti-holder');
	const layerStyle = layer ? getComputedStyle(layer) : null;
	const holderStyle = holder ? getComputedStyle(holder) : null;
	const rect = layer?.getBoundingClientRect();
	return {
		exists: !!layer,
		pieces: layer?.querySelectorAll('.any-tdf-confetti').length || 0,
		position: layerStyle?.position || '',
		top: layerStyle?.top || '',
		left: layerStyle?.left || '',
		width: Math.round(rect?.width || 0),
		height: Math.round(rect?.height || 0),
		justifyContent: layerStyle?.justifyContent || '',
		overflow: layerStyle?.overflow || '',
		pointerEvents: layerStyle?.pointerEvents || '',
		fallDistance: holderStyle?.getPropertyValue('--fall-distance').trim() || '',
		iterationCount: holderStyle?.getPropertyValue('--transition-iteration-count').trim() || '',
	};
`);

page.close();

const result = { initial, defaultDemo, constantDemo, fullscreenDemo };
console.log(JSON.stringify(result, null, 2));

if (initial.title !== '@any-tdf/react-confetti') throw new Error(`Unexpected title: ${initial.title}`);
if (initial.lang !== 'en') throw new Error(`Unexpected lang: ${initial.lang}`);
if (!initial.apiPropsPresent) throw new Error('API props are missing from the docs page.');
if (!initial.examplesPresent) throw new Error('Expected examples are missing from the docs page.');
if (!initial.constantInitiallyInactive) throw new Error('Constant demo should not start active.');
if (defaultDemo.pieces !== 50) throw new Error(`Default demo rendered ${defaultDemo.pieces} pieces instead of 50.`);
if (constantDemo.pieces !== 20 || constantDemo.iterationCount !== 'infinite')
	throw new Error('Constant demo did not render 20 infinite pieces.');
if (!fullscreenDemo.exists) throw new Error('Fullscreen layer was not rendered.');
if (fullscreenDemo.pieces !== 200) throw new Error(`Fullscreen rendered ${fullscreenDemo.pieces} pieces instead of 200.`);
if (fullscreenDemo.position !== 'fixed') throw new Error(`Fullscreen layer position is ${fullscreenDemo.position}.`);
if (fullscreenDemo.top !== '-50px' || fullscreenDemo.left !== '0px')
	throw new Error('Fullscreen layer is not anchored like the upstream demo.');
if (fullscreenDemo.width <= 0 || fullscreenDemo.height <= 0) throw new Error('Fullscreen layer has invalid dimensions.');
if (fullscreenDemo.justifyContent !== 'center') throw new Error('Fullscreen layer is not centered.');
if (fullscreenDemo.overflow !== 'hidden') throw new Error('Fullscreen layer does not hide overflow.');
if (fullscreenDemo.pointerEvents !== 'none') throw new Error('Fullscreen layer should not capture pointer events.');
if (fullscreenDemo.fallDistance !== '100vh') throw new Error(`Fullscreen fall distance is ${fullscreenDemo.fallDistance}.`);
if (fullscreenDemo.iterationCount !== 'infinite') throw new Error('Fullscreen demo should be infinite.');

cleanup();
process.exit(0);
