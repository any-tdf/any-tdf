import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

type CDPResponse = {
	id?: number;
	result?: unknown;
	error?: { message: string };
	method?: string;
	params?: unknown;
};

type PageStats = {
	title: string;
	heading: string;
	text: string;
	lines: string[];
	counts: Record<string, number>;
	rects: Record<string, number[]>;
	scrollHeight: number;
	clientHeight: number;
	consoleErrors: string[];
};

type PixelDiff = {
	widthA: number;
	heightA: number;
	widthB: number;
	heightB: number;
	comparedWidth: number;
	comparedHeight: number;
	mismatchRatio: number;
	averageDelta: number;
};

type PageComparison = {
	component: string;
	lang: 'zh_CN' | 'en_US';
	stdfUrl: string;
	rtdfUrl: string;
	stdfScreenshot: string;
	rtdfScreenshot: string;
	textLineRatio: number;
	missingInRtdf: string[];
	extraInRtdf: string[];
	metricDiffs: string[];
	pixelDiff: PixelDiff;
	stdf: Omit<PageStats, 'text' | 'lines' | 'consoleErrors'> & { textHash: string; consoleErrors: string[] };
	rtdf: Omit<PageStats, 'text' | 'lines' | 'consoleErrors'> & { textHash: string; consoleErrors: string[] };
};

const packageRoot = resolve(import.meta.dir, '..');
const workspaceRoot = resolve(packageRoot, '../..');
const stdfRoutesRoot = join(workspaceRoot, 'apps/stdf-demo/src/routes');
const rtdfPagesRoot = join(workspaceRoot, 'apps/rtdf-demo/src/pages');
const stdfBaseUrl = process.env.STDF_COMPARE_BASE_URL || 'http://127.0.0.1:5173';
const rtdfBaseUrl = process.env.RTDF_COMPARE_BASE_URL || 'http://127.0.0.1:5174';
const outputRoot = process.env.COMPARE_OUTPUT_DIR || join(tmpdir(), 'stdf-rtdf-mobile-compare');
const chromePath =
	process.env.CHROME_PATH ||
	[
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser'
	].find((path) => existsSync(path));
const debugPort = Number(process.env.COMPARE_BROWSER_DEBUG_PORT || 9231);
const languages = ['zh_CN', 'en_US'] as const;
const mobileViewport = { width: 390, height: 844, deviceScaleFactor: 3, mobile: true };
const visualDiffThreshold = Number(process.env.COMPARE_VISUAL_THRESHOLD || 0.05);
const textLineThreshold = Number(process.env.COMPARE_TEXT_THRESHOLD || 0.92);
const snapshotSettleTime = Number(process.env.COMPARE_SETTLE_MS || 500);
const pageFilter = new Set(
	(process.env.COMPARE_PAGES || '')
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean)
);

if (!chromePath) {
	console.error('Chrome or Chromium executable was not found. Set CHROME_PATH to run mobile parity comparison.');
	process.exit(1);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const hashText = (value: string) => createHash('sha256').update(value).digest('hex').slice(0, 16);

const listComponents = () => {
	const stdfComponents = readdirSync(stdfRoutesRoot, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && existsSync(join(stdfRoutesRoot, entry.name, 'zh_CN/+page.svelte')))
		.map((entry) => entry.name);
	const rtdfComponents = new Set(
		readdirSync(rtdfPagesRoot, { withFileTypes: true })
			.filter((entry) => entry.isDirectory() && entry.name !== 'components' && entry.name !== 'home')
			.map((entry) => entry.name)
	);
	return stdfComponents.filter((component) => rtdfComponents.has(component)).sort();
};

const normalizeLine = (value: string) => {
	const normalized = value
		.replace(/\bRTDF\b/g, 'STDF')
		.replace(/\bVTDF\b/g, 'STDF')
		.replace(/\brtdf\b/g, 'stdf')
		.replace(/\bvtdf\b/g, 'stdf')
		.replace(/-f (?:svelte|react|vue)\b/g, '-f framework')
		.replace(/\bonChange\b/g, 'onchange')
		.replace(/\bonClick\b/g, 'onclick')
		.replace(/\bchildren\b/g, 'Snippet')
		.replace(/\bchild content\b/g, 'Snippet')
		.replace(/\bdetailChild\b/g, 'Snippet')
		.replace(/\bcheckboxChild\b/g, 'Snippet')
		.replace(/\bradioChild\b/g, 'Snippet')
		.replace(/\bcontentChild\b/g, 'Snippet')
		.replace(/\btitleChild\b/g, 'Snippet')
		.replace(/\brightChild\b/g, 'Snippet')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\d{2}:\d{2}:\d{2}:\d{3}\b/g, 'HH:mm:ss:SSS')
		.replace(/\b\d{2}:\d{3}\b/g, 'ss:SSS')
		.replace(/([（(])\s+/g, '$1')
		.replace(/\s+([）)])/g, '$1')
		.replace(/([：:])\s+/g, '$1')
		.replace(/\s*\/\s*/g, '/')
		.replace(/(-?\d+)\s+(ms|px|MB|%)/g, '$1$2');
	if (normalized === 'STDF Demo') return '';
	if ((Array.from(normalized).length === 1 && !/^\d$/.test(normalized)) || /^\d{3}$/.test(normalized)) return '';
	return normalized;
};

const normalizeLines = (lines: string[]) => [...new Set(lines.map(normalizeLine).filter(Boolean))];

const lineDiff = (left: string[], right: string[], ignoreStandaloneNumbers = false) => {
	const filterLines = (lines: string[]) =>
		ignoreStandaloneNumbers ? normalizeLines(lines).filter((line) => !/^-?\d+(?:\.\d+)?$/.test(line)) : normalizeLines(lines);
	const normalizedLeft = filterLines(left);
	const normalizedRight = filterLines(right);
	const rightSet = new Set(normalizedRight);
	const leftSet = new Set(normalizedLeft);
	return {
		missing: normalizedLeft.filter((line) => !rightSet.has(line)),
		extra: normalizedRight.filter((line) => !leftSet.has(line)),
		ratio: normalizedLeft.length === 0 ? 1 : normalizedLeft.filter((line) => rightSet.has(line)).length / normalizedLeft.length
	};
};

const compareMetrics = (stdf: PageStats, rtdf: PageStats) => {
	const diffs: string[] = [];
	const countKeys = ['buttons', 'inputs', 'textareas', 'selects', 'images', 'canvases', 'svgs', 'dialogs'];
	for (const key of countKeys) {
		if (stdf.counts[key] !== rtdf.counts[key]) diffs.push(`${key}: STDF ${stdf.counts[key]}, RTDF ${rtdf.counts[key]}`);
	}
	if (Math.abs(stdf.scrollHeight - rtdf.scrollHeight) > 80) {
		diffs.push(`scrollHeight: STDF ${stdf.scrollHeight}, RTDF ${rtdf.scrollHeight}`);
	}
	return diffs;
};

const chromeUserDataDir = join(tmpdir(), `stdf-rtdf-compare-${Date.now()}`);
const chrome = Bun.spawn(
	[
		chromePath,
		'--headless=new',
		'--disable-gpu',
		'--no-first-run',
		'--no-default-browser-check',
		'--disable-dev-shm-usage',
		`--window-size=${mobileViewport.width},${mobileViewport.height}`,
		`--remote-debugging-port=${debugPort}`,
		`--user-data-dir=${chromeUserDataDir}`,
		'about:blank'
	],
	{ stdout: 'ignore', stderr: 'ignore' }
);

const cleanup = () => {
	chrome.kill();
	rmSync(chromeUserDataDir, { recursive: true, force: true });
};

process.on('exit', cleanup);
process.on('SIGINT', () => {
	cleanup();
	process.exit(130);
});

const waitForJson = async <T>(url: string) => {
	let lastError = '';
	for (let i = 0; i < 100; i += 1) {
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

	close = () => {
		this.socket.close();
	};
}

await waitForJson<{ webSocketDebuggerUrl: string }>(`http://127.0.0.1:${debugPort}/json/version`);
const targetResponse = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' });
if (!targetResponse.ok) throw new Error(`Unable to create Chrome page target: ${targetResponse.status}`);
const target = (await targetResponse.json()) as { webSocketDebuggerUrl: string };
const page = await CDPClient.create(target.webSocketDebuggerUrl);
await page.call('Runtime.enable');
await page.call('Page.enable');
await page.call('Emulation.setDeviceMetricsOverride', mobileViewport);
await page.call('Emulation.setTouchEmulationEnabled', { enabled: true, configuration: 'mobile' });
await page.call('Emulation.setUserAgentOverride', {
	userAgent:
		'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
});
await page.call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });

const browserErrors: string[] = [];
page.on('Runtime.exceptionThrown', (params) => {
	browserErrors.push(JSON.stringify(params));
});
page.on('Runtime.consoleAPICalled', (params) => {
	const event = params as { type?: string; args?: Array<{ value?: unknown; description?: string }> };
	if (event.type !== 'error' && event.type !== 'warning') return;
	const message = event.args?.map((arg) => String(arg.value ?? arg.description ?? '')).join(' ') || `console.${event.type}`;
	browserErrors.push(`${event.type}: ${message}`);
});

const waitFor = async (predicate: () => Promise<boolean>, label: string, timeout = 10000) => {
	const started = Date.now();
	while (Date.now() - started < timeout) {
		if (await predicate()) return;
		await sleep(100);
	}
	throw new Error(`Timed out waiting for ${label}`);
};

const runInPage = <T>(body: string) => {
	return page.evaluate<T>(`(async () => {
		${body}
	})()`);
};

const injectStableCss = () => {
	return runInPage<void>(`
		const style = document.createElement('style');
		style.setAttribute('data-compare-stable', 'true');
		style.textContent = '*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important;scroll-behavior:auto!important}';
		document.head.appendChild(style);
	`);
};

const snapshotPage = async (url: string) => {
	browserErrors.length = 0;
	await page.call('Page.navigate', { url: 'about:blank' });
	await sleep(50);
	await page.call('Page.navigate', { url });
	await waitFor(() => runInPage<boolean>(`return document.readyState === 'complete' && document.body.innerText.trim().length > 0;`), url);
	await injectStableCss();
	await sleep(snapshotSettleTime);
	await runInPage<void>(`
		window.scrollTo(0, 0);
		document.scrollingElement?.scrollTo(0, 0);
	`);
	await sleep(50);
	const stats = await runInPage<PageStats>(`
		const visible = (el) => {
			const rect = el.getBoundingClientRect();
			const style = getComputedStyle(el);
			return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
		};
		const visibleTextContainer = (el) => {
			if (!el || !visible(el)) return false;
			const rect = el.getBoundingClientRect();
			const docHeight = document.documentElement.scrollHeight;
			const docWidth = document.documentElement.clientWidth;
			return rect.bottom >= 0 && rect.top <= docHeight && rect.right >= 0 && rect.left <= docWidth;
		};
		const rectsFor = (selector) => [...document.querySelectorAll(selector)]
			.filter(visible)
			.slice(0, 12)
			.flatMap((el) => {
				const rect = el.getBoundingClientRect();
				return [Math.round(rect.x), Math.round(rect.y), Math.round(rect.width), Math.round(rect.height)];
			});
		const normalizeLine = (value) => value.replace(/\\s+/g, ' ').trim();
		const textContainerSelectors = 'button,[role="button"],a,label,summary,li,h1,h2,h3,h4,h5,h6,p,td,th,dt,dd,figcaption,legend,caption';
		const textContainers = new Set();
		const findTextContainer = (element) => {
			let current = element.closest(textContainerSelectors) || element;
			while (current?.parentElement) {
				const style = getComputedStyle(current);
				if (style.display !== 'inline' && style.display !== 'contents') return current;
				current = current.parentElement;
			}
			return current || element;
		};
		const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
		while (walker.nextNode()) {
			const node = walker.currentNode;
			const line = normalizeLine(node.textContent || '');
			if (!line) continue;
			if (!visibleTextContainer(node.parentElement)) continue;
			const container = findTextContainer(node.parentElement);
			if (container && visibleTextContainer(container)) textContainers.add(container);
		}
		const lines = [...new Set(
			[...textContainers]
				.flatMap((container) => (container.innerText || container.textContent || '').split(/\\n+/))
				.map(normalizeLine)
				.filter(Boolean)
		)];
		const text = normalizeLine(lines.join(' '));
		return {
			title: document.title,
			heading: normalizeLine(document.querySelector('h1,h2,[data-compare-title]')?.textContent || ''),
			text,
			lines,
			counts: {
				buttons: document.querySelectorAll('button,[role="button"]').length,
				inputs: document.querySelectorAll('input').length,
				textareas: document.querySelectorAll('textarea').length,
				selects: document.querySelectorAll('select').length,
				images: document.querySelectorAll('img').length,
				canvases: document.querySelectorAll('canvas').length,
				svgs: document.querySelectorAll('svg').length,
				dialogs: document.querySelectorAll('[role="dialog"],dialog').length
			},
			rects: {
				buttons: rectsFor('button,[role="button"]'),
				inputs: rectsFor('input,textarea'),
				images: rectsFor('img,canvas')
			},
			scrollHeight: document.documentElement.scrollHeight,
			clientHeight: document.documentElement.clientHeight,
			consoleErrors: []
		};
	`);
	stats.consoleErrors = browserErrors.slice();
	const screenshot = await page.call<{ data: string }>('Page.captureScreenshot', {
		format: 'png',
		fromSurface: true,
		captureBeyondViewport: false,
		clip: { x: 0, y: 0, width: mobileViewport.width, height: mobileViewport.height, scale: 1 }
	});
	return { stats, screenshotBase64: screenshot.data };
};

const compareScreenshots = (leftBase64: string, rightBase64: string) => {
	return page.evaluate<PixelDiff>(`new Promise((resolve, reject) => {
		const load = (src) => new Promise((resolveImage, rejectImage) => {
			const image = new Image();
			image.onload = () => resolveImage(image);
			image.onerror = () => rejectImage(new Error('Unable to decode screenshot'));
			image.src = src;
		});
		Promise.all([
			load(${JSON.stringify(`data:image/png;base64,${leftBase64}`)}),
			load(${JSON.stringify(`data:image/png;base64,${rightBase64}`)})
		]).then(([left, right]) => {
			const width = Math.min(left.width, right.width);
			const height = Math.min(left.height, right.height);
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(left, 0, 0);
			const leftData = ctx.getImageData(0, 0, width, height).data;
			ctx.clearRect(0, 0, width, height);
			ctx.drawImage(right, 0, 0);
			const rightData = ctx.getImageData(0, 0, width, height).data;
			let mismatch = 0;
			let totalDelta = 0;
			for (let i = 0; i < leftData.length; i += 4) {
				const delta = Math.abs(leftData[i] - rightData[i]) + Math.abs(leftData[i + 1] - rightData[i + 1]) + Math.abs(leftData[i + 2] - rightData[i + 2]);
				totalDelta += delta;
				if (delta > 72) mismatch += 1;
			}
			resolve({
				widthA: left.width,
				heightA: left.height,
				widthB: right.width,
				heightB: right.height,
				comparedWidth: width,
				comparedHeight: height,
				mismatchRatio: mismatch / (width * height),
				averageDelta: totalDelta / (width * height * 3)
			});
		}).catch(reject);
	})`);
};

rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(join(outputRoot, 'screenshots', 'stdf'), { recursive: true });
mkdirSync(join(outputRoot, 'screenshots', 'rtdf'), { recursive: true });

const components = listComponents().filter(
	(component) => pageFilter.size === 0 || languages.some((lang) => pageFilter.has(component) || pageFilter.has(`${component}/${lang}`))
);
const comparisons: PageComparison[] = [];

for (const component of components) {
	for (const lang of languages) {
		if (pageFilter.size > 0 && !pageFilter.has(component) && !pageFilter.has(`${component}/${lang}`)) continue;
		const query = `channel=iframe&theme=ANYTDF&darkMode=light&lang=${lang}`;
		const stdfUrl = `${stdfBaseUrl}/${component}/${lang}?${query}`;
		const rtdfUrl = `${rtdfBaseUrl}/${component}/${lang}?${query}`;
		const stdfSnapshot = await snapshotPage(stdfUrl);
		const rtdfSnapshot = await snapshotPage(rtdfUrl);
		const screenshotName = `${component}-${lang}.png`;
		const stdfScreenshot = join(outputRoot, 'screenshots', 'stdf', screenshotName);
		const rtdfScreenshot = join(outputRoot, 'screenshots', 'rtdf', screenshotName);
		writeFileSync(stdfScreenshot, Buffer.from(stdfSnapshot.screenshotBase64, 'base64'));
		writeFileSync(rtdfScreenshot, Buffer.from(rtdfSnapshot.screenshotBase64, 'base64'));
		const lineComparison = lineDiff(stdfSnapshot.stats.lines, rtdfSnapshot.stats.lines, component === 'timePicker');
		const pixelDiff = await compareScreenshots(stdfSnapshot.screenshotBase64, rtdfSnapshot.screenshotBase64);
		comparisons.push({
			component,
			lang,
			stdfUrl,
			rtdfUrl,
			stdfScreenshot,
			rtdfScreenshot,
			textLineRatio: lineComparison.ratio,
			missingInRtdf: lineComparison.missing.slice(0, 20),
			extraInRtdf: lineComparison.extra.slice(0, 20),
			metricDiffs: compareMetrics(stdfSnapshot.stats, rtdfSnapshot.stats),
			pixelDiff,
			stdf: {
				title: stdfSnapshot.stats.title,
				heading: stdfSnapshot.stats.heading,
				counts: stdfSnapshot.stats.counts,
				rects: stdfSnapshot.stats.rects,
				scrollHeight: stdfSnapshot.stats.scrollHeight,
				clientHeight: stdfSnapshot.stats.clientHeight,
				textHash: hashText(stdfSnapshot.stats.text),
				consoleErrors: stdfSnapshot.stats.consoleErrors
			},
			rtdf: {
				title: rtdfSnapshot.stats.title,
				heading: rtdfSnapshot.stats.heading,
				counts: rtdfSnapshot.stats.counts,
				rects: rtdfSnapshot.stats.rects,
				scrollHeight: rtdfSnapshot.stats.scrollHeight,
				clientHeight: rtdfSnapshot.stats.clientHeight,
				textHash: hashText(rtdfSnapshot.stats.text),
				consoleErrors: rtdfSnapshot.stats.consoleErrors
			}
		});
		console.log(
			`${component}/${lang}: visual ${(pixelDiff.mismatchRatio * 100).toFixed(2)}%, text ${(lineComparison.ratio * 100).toFixed(1)}%`
		);
	}
}

const highVisualDiffs = comparisons.filter((item) => item.pixelDiff.mismatchRatio > visualDiffThreshold);
const textDiffs = comparisons.filter((item) => item.textLineRatio < textLineThreshold);
const metricDiffs = comparisons.filter((item) => item.metricDiffs.length > 0);
const consoleErrorDiffs = comparisons.filter((item) => item.stdf.consoleErrors.length > 0 || item.rtdf.consoleErrors.length > 0);
const summary = {
	stdfBaseUrl,
	rtdfBaseUrl,
	mobileViewport,
	thresholds: { visualDiffThreshold, textLineThreshold },
	snapshotSettleTime,
	pageFilter: [...pageFilter],
	components: components.length,
	checked: comparisons.length,
	outputRoot,
	highVisualDiffCount: highVisualDiffs.length,
	textDiffCount: textDiffs.length,
	metricDiffCount: metricDiffs.length,
	consoleErrorDiffCount: consoleErrorDiffs.length,
	topVisualDiffs: [...comparisons]
		.sort((a, b) => b.pixelDiff.mismatchRatio - a.pixelDiff.mismatchRatio)
		.slice(0, 20)
		.map((item) => ({
			page: `${item.component}/${item.lang}`,
			visual: Number((item.pixelDiff.mismatchRatio * 100).toFixed(2)),
			text: Number((item.textLineRatio * 100).toFixed(1)),
			metricDiffs: item.metricDiffs
		}))
};
const markdown = [
	'# STDF RTDF mobile comparison',
	'',
	`- STDF: ${stdfBaseUrl}`,
	`- RTDF: ${rtdfBaseUrl}`,
	`- viewport: ${mobileViewport.width} x ${mobileViewport.height}, DPR ${mobileViewport.deviceScaleFactor}`,
	`- checked: ${comparisons.length}`,
	`- high visual diffs: ${highVisualDiffs.length}`,
	`- text diffs: ${textDiffs.length}`,
	`- metric diffs: ${metricDiffs.length}`,
	`- console error diffs: ${consoleErrorDiffs.length}`,
	'',
	'## Top visual diffs',
	'',
	...summary.topVisualDiffs.map(
		(item) => `- ${item.page}: visual ${item.visual}%, text ${item.text}%, metrics ${item.metricDiffs.join('; ') || 'none'}`
	)
].join('\n');

writeFileSync(join(outputRoot, 'report.json'), JSON.stringify({ summary, comparisons }, null, 2));
writeFileSync(join(outputRoot, 'summary.md'), markdown);

console.log(JSON.stringify(summary, null, 2));
page.close();
cleanup();

if (highVisualDiffs.length > 0 || textDiffs.length > 0 || metricDiffs.length > 0 || consoleErrorDiffs.length > 0) {
	process.exit(1);
}
