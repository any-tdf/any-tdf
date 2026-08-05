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
	steps: Array<() => Promise<void>>;
};

const baseUrl = process.env.VTDF_SITE_VERIFY_BASE_URL || 'http://127.0.0.1:5553';
const chromePath =
	process.env.CHROME_PATH ||
	[
		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
		'/Applications/Chromium.app/Contents/MacOS/Chromium',
		'/usr/bin/google-chrome',
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser'
	].find((path) => existsSync(path));
const debugPort = Number(process.env.VTDF_SITE_BROWSER_DEBUG_PORT || 9230);
const userDataDir = mkdtempSync(join(tmpdir(), 'vtdf-site-browser-'));

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

const runInPage = <T>(body: string) => {
	return page.evaluate<T>(`(async () => {
		${body}
	})()`);
};

const waitFor = async (predicate: () => Promise<boolean>, label: string, timeout = 20000) => {
	const started = Date.now();
	while (Date.now() - started < timeout) {
		if (await predicate()) return;
		await sleep(100);
	}
	throw new Error(`Timed out waiting for ${label}`);
};

const goto = async (path: string) => {
	browserErrors.length = 0;
	const url = new URL(path, baseUrl);
	if (!url.searchParams.has('lang')) url.searchParams.set('lang', 'zh_CN');
	await page.call('Page.navigate', { url: url.toString() });
	let pageState: { readyState?: string; href?: string; bodyLength?: number; error?: string } = {};
	for (let attempt = 0; attempt < 600; attempt += 1) {
		pageState = await runInPage(`
			return {
				readyState: document.readyState,
				href: window.location.href,
				bodyLength: document.body?.innerText.length || 0
			};
		`).catch((error: Error) => ({ error: error.message }));
		if (pageState.readyState === 'complete' && (pageState.bodyLength ?? 0) > 0) break;
		await sleep(100);
	}
	if (pageState.readyState !== 'complete' || (pageState.bodyLength ?? 0) === 0) {
		throw new Error(`Timed out waiting for load ${path}: ${JSON.stringify(pageState)} ${browserErrors.slice(0, 3).join(' | ')}`);
	}
	await sleep(200);
};

const bodyIncludes = (text: string) => {
	return runInPage<boolean>(`return document.body.innerText.includes(${JSON.stringify(text)});`);
};

const assertBodyIncludes = async (text: string) => {
	const ok = await bodyIncludes(text);
	if (!ok) throw new Error(`Expected page body to include: ${text}`);
};

const assertBodyExcludes = async (text: string) => {
	const ok = await bodyIncludes(text);
	if (ok) throw new Error(`Expected page body not to include: ${text}`);
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
	const selector = '[data-logo-animated] [data-logo-layer="vtdf-mark"]';
	await setReducedMotion(false);
	const running = await readLogoAnimation(selector);
	await setReducedMotion(true);
	const reduced = await readLogoAnimation(selector);
	await setReducedMotion(false);
	if (!running.found || !running.animationNames.includes('tdf-vtdf-logo-draw')) {
		throw new Error(`Expected VTDF header logo animation: ${JSON.stringify(running)}`);
	}
	if (!reduced.found || reduced.animationNames.some((name) => name !== 'none')) {
		throw new Error(`Expected reduced-motion VTDF header logo: ${JSON.stringify(reduced)}`);
	}
};

const assertStaticGuideLogo = async () => {
	const result = await readLogoAnimation('[data-logo-static] [data-logo-layer="vtdf-mark"]');
	if (!result.found || result.animationNames.some((name) => name !== 'none')) {
		throw new Error(`Expected static VTDF guide logo: ${JSON.stringify(result)}`);
	}
};

const assertSourceCode = async (required: string[], forbidden: string[] = []) => {
	const code = await runInPage<string>(`return document.querySelector('pre code')?.textContent || '';`);
	const missing = required.filter((text) => !code.includes(text));
	const blocked = forbidden.filter((text) => code.includes(text));
	if (missing.length > 0 || blocked.length > 0) {
		throw new Error(`Unexpected component source code: ${JSON.stringify({ missing, blocked })}`);
	}
};

const assertToolbarButton = async (label: string, size: number) => {
	const result = await runInPage<{ found: boolean; width: number; height: number }>(`
		const label = ${JSON.stringify(label)};
		const visible = (el) => {
			const rect = el.getBoundingClientRect();
			const style = getComputedStyle(el);
			return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
		};
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		const target = [...document.querySelectorAll('button')]
			.filter(visible)
			.find((el) => normalize(\`\${el.textContent || ''} \${el.getAttribute('aria-label') || ''}\`).includes(label));
		// 新 UI 工具栏图标为内联 SVG（非 symbol sprite）
		const svg = target?.querySelector('svg');
		const rect = svg?.getBoundingClientRect();
		return {
			found: Boolean(target && svg && rect && rect.width > 0 && rect.height > 0),
			width: Math.round(rect?.width || 0),
			height: Math.round(rect?.height || 0)
		};
	`);
	if (!result.found || result.width !== size || result.height !== size) {
		throw new Error(`Unexpected toolbar button for ${label}: ${JSON.stringify({ ...result, expectedSize: size })}`);
	}
};

const assertGeneratorPaletteMetrics = async () => {
	const result = await runInPage<{
		found: boolean;
		copyButtonCount: number;
		hasRequiredLabels: boolean;
		highlightedCodeCount: number;
		highlightSpanCount: number;
		codeHeights: number[];
	}>(`
		const palette = [...document.querySelectorAll('.generator-palette')][0];
		const codeBlocks = [...document.querySelectorAll('code.hljs.language-css')];
		const text = palette?.textContent || '';
		return {
			found: Boolean(palette),
			copyButtonCount: palette?.querySelectorAll('button[aria-label="copy"]').length || 0,
			hasRequiredLabels: ['Light BG', 'Dark BG', 'Text', 'base', 'surface', 'overlay', 'highlight', 'light', 'dark', 'onPri-L', 'onDark']
				.every((label) => text.includes(label)),
			highlightedCodeCount: codeBlocks.length,
			highlightSpanCount: palette?.querySelectorAll('code.hljs.language-css span').length || 0,
			codeHeights: codeBlocks.map((code) => Math.round(code.getBoundingClientRect().height))
		};
	`);
	if (
		!result.found ||
		result.copyButtonCount !== 2 ||
		!result.hasRequiredLabels ||
		result.highlightedCodeCount !== 2 ||
		result.highlightSpanCount < 10 ||
		result.codeHeights.some((height) => height < 100)
	) {
		throw new Error(`Unexpected generator palette metrics: ${JSON.stringify(result)}`);
	}
};

const assertGeneratorColorPickerSpacing = async () => {
	const result = await runInPage<{
		found: boolean;
		itemCount: number;
		textButtonCount: number;
		captionCount: number;
	}>(`
		const visible = (element) => {
			const rect = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
		};
		const panel = document.querySelector('.generator-controls');
		// 主题色 2 + 背景色 8 + 文字色 4 + 功能色 4 = 18 个带说明文字的取色按钮
		const items = [...(panel?.querySelectorAll('div.flex.flex-1.flex-col.items-center') || [])]
			.map((root) => {
				const button = root.querySelector(':scope > div.group.relative > button, :scope > div.group.relative > .group.relative button, :scope button');
				const span = [...root.children].find((child) => child.tagName === 'SPAN');
				if (!button || !span || !visible(button) || !visible(span)) return null;
				return { buttonClass: button.className || '', spanText: span.textContent || '' };
			})
			.filter(Boolean);
		return {
			found: Boolean(panel),
			itemCount: items.length,
			textButtonCount: items.filter((item) => item.buttonClass.includes('items-center')).length,
			captionCount: items.filter((item) => item.spanText.trim().length > 0).length
		};
	`);
	if (!result.found || result.itemCount !== 18 || result.textButtonCount !== 4 || result.captionCount !== 18) {
		throw new Error(`Unexpected generator color picker spacing: ${JSON.stringify(result)}`);
	}
};

const assertGeneratorRadiusLayout = async () => {
	const result = await runInPage<{
		found: boolean;
		groups: Array<{
			title: string;
			buttonCount: number;
			columnCount: number;
			labels: string[];
			canvasCount: number;
			shapeSizes: Array<{ width: number; height: number }>;
		}>;
	}>(`
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		const panel = document.querySelector('.generator-controls');
		const titleTexts = [
			['容器类（弹窗/卡片/单元格/骨架屏）', 'Box (Popup/Card/Cell/Skeleton)'],
			['表单类（按钮/输入框/日历/分页）', 'Form (Button/Input/Calendar/Pagination)'],
			['小型控件类（开关/进度/滑块/步进器）', 'Small (Switch/Progress/Slider/Stepper)']
		];
		const groups = titleTexts.map((titles) => {
			const title = [...(panel?.querySelectorAll('div') || [])].find((element) => titles.includes(normalize(element.textContent || '')));
			const grid = title?.nextElementSibling;
			const gridStyle = grid ? getComputedStyle(grid) : undefined;
			const buttons = [...(grid?.querySelectorAll(':scope > button') || [])];
			const labels = buttons.map((button) => normalize(button.querySelector(':scope > span')?.textContent || ''));
			const canvases = buttons.map((button) => button.querySelector('.radius-option-canvas')).filter(Boolean);
			const shapes = buttons.map((button) => button.querySelector('.radius-option-shape')).filter(Boolean);
			return {
				title: normalize(title?.textContent || ''),
				buttonCount: buttons.length,
				columnCount: gridStyle?.gridTemplateColumns.split(' ').filter(Boolean).length || 0,
				labels,
				canvasCount: canvases.length,
				shapeSizes: shapes.map((shape) => {
					const rect = shape.getBoundingClientRect();
					return { width: Math.round(rect.width), height: Math.round(rect.height) };
				})
			};
		});
		return { found: Boolean(panel), groups };
	`);
	const expectedLabels = [
		['0', '0.25', '0.375', '0.5', '0.75', '1', '1.5', '2'],
		['0', '0.25', '0.375', '0.5', '0.75', '1', '1.5', 'full'],
		['0', '0.25', '0.375', '0.5', '0.75', '1', '1.5', 'full']
	];
	const groupsMatch =
		result.groups.length === 3 &&
		result.groups.every((group, index) => {
			return (
				group.buttonCount === 8 &&
				group.columnCount === 4 &&
				group.labels.join('|') === expectedLabels[index].join('|') &&
				group.canvasCount === 8 &&
				group.shapeSizes.every((size) => size.width === 96 && size.height === 64)
			);
		});
	if (!result.found || !groupsMatch) {
		throw new Error(`Unexpected generator radius layout: ${JSON.stringify(result)}`);
	}
};

const assertGeneratorLineChartLayout = async () => {
	const result = await runInPage<{
		found: boolean;
		viewBox: string;
		legendFlexWrap: string;
		legendItemCount: number;
		lineCount: number;
		pathCount: number;
		circleCount: number;
		textLabels: string[];
		circlePoints: string[];
		pathDs: string[];
	}>(`
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		const svg = [...document.querySelectorAll('svg[viewBox="0 0 320 160"]')].find((element) => {
			const text = normalize(element.textContent || '');
			return text.includes('600') && text.includes('10-13') && text.includes('10-16');
		});
		const legend = svg?.previousElementSibling;
		const legendStyle = legend ? getComputedStyle(legend) : undefined;
		const textLabels = [...(svg?.querySelectorAll('text') || [])].map((element) => normalize(element.textContent || ''));
		const circlePoints = [...(svg?.querySelectorAll('circle') || [])].map((element) =>
			\`\${element.getAttribute('cx')},\${element.getAttribute('cy')},\${element.getAttribute('r')}\`
		);
		const pathDs = [...(svg?.querySelectorAll('path') || [])].map((element) => element.getAttribute('d') || '');
		return {
			found: Boolean(svg && legend),
			viewBox: svg?.getAttribute('viewBox') || '',
			legendFlexWrap: legendStyle?.flexWrap || '',
			legendItemCount: legend?.children.length || 0,
			lineCount: svg?.querySelectorAll('line').length || 0,
			pathCount: svg?.querySelectorAll('path').length || 0,
			circleCount: svg?.querySelectorAll('circle').length || 0,
			textLabels,
			circlePoints,
			pathDs
		};
	`);
	const expectedLabels = ['600', '450', '300', '150', '0', '10-13', '10-14', '10-15', '10-16'];
	const expectedPoints = [
		'70,25,3',
		'147,95,3',
		'223,70,3',
		'300,55,3',
		'70,35,3',
		'147,65,3',
		'223,120,3',
		'300,20,3',
		'70,80,3',
		'147,50,3',
		'223,85,3',
		'300,40,3',
		'70,110,3',
		'147,75,3',
		'223,100,3',
		'300,85,3'
	];
	const expectedPaths = [
		'M70 25 Q108 60 147 95 T223 70 T300 55',
		'M70 35 Q108 55 147 65 T223 120 T300 20',
		'M70 80 Q108 45 147 50 T223 85 T300 40',
		'M70 110 Q108 100 147 75 T223 100 T300 85'
	];
	const labelsMatch = expectedLabels.every((label) => result.textLabels.includes(label));
	const pointsMatch = expectedPoints.every((point) => result.circlePoints.includes(point));
	const pathsMatch = expectedPaths.every((path) => result.pathDs.includes(path));
	if (
		!result.found ||
		result.viewBox !== '0 0 320 160' ||
		result.legendFlexWrap !== 'nowrap' ||
		result.legendItemCount !== 4 ||
		result.lineCount !== 5 ||
		result.pathCount !== 4 ||
		result.circleCount !== 16 ||
		!labelsMatch ||
		!pointsMatch ||
		!pathsMatch
	) {
		throw new Error(`Unexpected generator line chart layout: ${JSON.stringify(result)}`);
	}
};

const assertGeneratorNoticeBarContent = async () => {
	const result = await runInPage<{
		found: boolean;
		hasEmoji: boolean;
		hasExpectedText: boolean;
		hasWrongCharacter: boolean;
		hasMagicIcon: boolean;
		text: string;
	}>(`
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		const block = [...document.querySelectorAll('div')]
			.filter((element) => {
				const rect = element.getBoundingClientRect();
				const text = normalize(element.textContent || '');
				return rect.width > 250 && rect.width < 640 && text.includes('NoticeBar') && text.includes('Welcome to VTDF Theme Generator');
			})
			.sort((a, b) => a.getBoundingClientRect().height - b.getBoundingClientRect().height)[0];
		const text = normalize(block?.textContent || '');
		const svgHrefs = [...(block?.querySelectorAll('use') || [])].map((element) => element.getAttribute('href') || element.getAttribute('xlink:href') || '');
		return {
			found: Boolean(block),
			hasEmoji: text.includes('🥳'),
			hasExpectedText: text.includes('Welcome to VTDF Theme Generator, customize your own theme now!'),
			hasWrongCharacter: text.includes('叭'),
			hasMagicIcon: svgHrefs.some((href) => href.includes('ri-magic-line')),
			text
		};
	`);
	if (!result.found || !result.hasEmoji || !result.hasExpectedText || result.hasWrongCharacter || result.hasMagicIcon) {
		throw new Error(`Unexpected generator notice bar content: ${JSON.stringify(result)}`);
	}
};

const assertThemePanelLayout = async () => {
	const result = await runInPage<{
		found: boolean;
		gridTemplateColumns: string;
		columnCount: number;
		gridScrollWidth: number;
		gridClientWidth: number;
		panelWidth: number;
		textOverflow: boolean;
		createHeight: number;
		createScrollWidth: number;
		createClientWidth: number;
	}>(`
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		const grid = document.querySelector('.theme-switch-grid');
		const panel = grid?.parentElement;
		const create = [...document.querySelectorAll('a')].find((element) => normalize(element.textContent).includes('Create theme') || normalize(element.textContent) === 'Create');
		const gridStyle = grid ? getComputedStyle(grid) : undefined;
		const createRect = create?.getBoundingClientRect();
		const panelRect = panel?.getBoundingClientRect();
		const textOverflow = [...(grid?.querySelectorAll('button') || [])].some((button) => {
			const label = button.children[1];
			const labelRect = label?.getBoundingClientRect();
			const buttonRect = button.getBoundingClientRect();
			return Boolean(labelRect && (labelRect.right > buttonRect.right + 1 || labelRect.left < buttonRect.left - 1));
		});
		return {
			found: Boolean(grid && panel && create),
			gridTemplateColumns: gridStyle?.gridTemplateColumns || '',
			columnCount: gridStyle?.gridTemplateColumns.split(' ').filter(Boolean).length || 0,
			gridScrollWidth: grid?.scrollWidth || 0,
			gridClientWidth: grid?.clientWidth || 0,
			panelWidth: Math.round(panelRect?.width || 0),
			textOverflow,
			createHeight: Math.round(createRect?.height || 0),
			createScrollWidth: create?.scrollWidth || 0,
			createClientWidth: create?.clientWidth || 0
		};
	`);
	const hasNoHorizontalScroll = result.gridScrollWidth <= result.gridClientWidth + 1;
	const createFits = result.createScrollWidth <= result.createClientWidth + 1 && result.createHeight <= 64;
	if (
		!result.found ||
		result.columnCount !== 3 ||
		!hasNoHorizontalScroll ||
		result.textOverflow ||
		!createFits ||
		result.panelWidth <= 176
	) {
		throw new Error(`Unexpected theme panel layout: ${JSON.stringify(result)}`);
	}
};

const assertHomeDemoInteractions = async () => {
	const result = await runInPage<{
		rootFound: boolean;
		themeChanged: boolean;
		switchMoved: boolean;
		tabChanged: boolean;
		paginationChanged: boolean;
		sliderChanged: boolean;
		details: Record<string, unknown>;
	}>(`
		const paint = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
		const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		const visible = (element) => {
			const rect = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
		};
		const readClassSignature = (elements) => elements.map((element) => element.getAttribute('class') || '').join('|');
		const readStyleSignature = (root) => [...(root?.querySelectorAll('[style]') || [])].map((element) => element.getAttribute('style') || '').join('|');

		// Hero 组件预览：根节点带 data-theme/data-mode，内部是真实 vtdf 组件
		const root = document.querySelector('.hero-component-preview[data-theme][data-mode]');
		const themeButton = [...(root?.querySelectorAll('button') || [])].find((element) =>
			(element.textContent || '').includes('随机主题') || (element.textContent || '').includes('Random theme')
		);
		const beforeTheme = root?.getAttribute('data-theme') || '';
		let afterTheme = beforeTheme;
		for (let index = 0; index < 8 && afterTheme === beforeTheme; index += 1) {
			themeButton?.click();
			await paint();
			afterTheme = root?.getAttribute('data-theme') || '';
		}

		const switchRoot = document.querySelector('.hero-preview-switch');
		const switchButton = switchRoot?.querySelector('button');
		const switchBefore = readClassSignature([switchButton, ...(switchButton?.querySelectorAll('*') || [])].filter(Boolean));
		switchButton?.click();
		await wait(350);
		const switchAfter = readClassSignature([switchButton, ...(switchButton?.querySelectorAll('*') || [])].filter(Boolean));

		const tabButtons = [...document.querySelectorAll('.hero-preview-tab button')].filter(visible);
		const tabRoot = document.querySelector('.hero-preview-tab');
		const tabBefore = \`\${readClassSignature(tabButtons)}|\${readStyleSignature(tabRoot)}\`;
		(tabButtons[1] || tabButtons[0])?.click();
		await wait(350);
		const tabAfter = \`\${readClassSignature([...document.querySelectorAll('.hero-preview-tab button')].filter(visible))}|\${readStyleSignature(tabRoot)}\`;

		const paginationRoot = document.querySelector('.hero-preview-pagination');
		const readPaginationSignature = () =>
			[...(paginationRoot?.querySelectorAll('button') || [])]
				.filter(visible)
				.map((button) => [button.textContent?.trim(), button.getAttribute('class') || '', button.disabled ? 'disabled' : 'enabled'].join(':'))
				.join('|');
		const paginationBefore = readPaginationSignature();
		const nextPageButton = paginationRoot?.querySelector('button[aria-label="next"]:not(:disabled)');
		const prePageButton = paginationRoot?.querySelector('button[aria-label="pre"]:not(:disabled)');
		(nextPageButton || prePageButton)?.click();
		await paint();
		const paginationAfter = readPaginationSignature();

		const sliderRoot = document.querySelector('.hero-preview-slider-control');
		const findSliderLine = () =>
			[...(sliderRoot?.querySelectorAll('div') || [])].find((element) => {
				const className = element.getAttribute('class') || '';
				return className.includes('cursor-move') || className.includes('touch-none');
			}) ||
			[...(sliderRoot?.querySelectorAll('div') || [])]
				.map((element) => ({ element, rect: element.getBoundingClientRect() }))
				.filter((item) => item.rect.width >= 80 && item.rect.height > 0 && item.rect.height <= 28)
				.sort((a, b) => b.rect.width - a.rect.width)[0]?.element;
		let sliderBefore = readStyleSignature(sliderRoot);
		let sliderAfter = sliderBefore;
		const sliderLine = findSliderLine();
		const sliderRatios = [0.85, 0.15, 0.65];
		for (const ratio of sliderRatios) {
			const rect = sliderLine?.getBoundingClientRect();
			if (!sliderLine || !rect) break;
			const clientX = rect.left + rect.width * ratio;
			const clientY = rect.top + rect.height / 2;
			sliderLine.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 1, clientX, clientY }));
			sliderLine.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1, clientX, clientY }));
			await wait(250);
			sliderAfter = readStyleSignature(sliderRoot);
			if (sliderAfter !== sliderBefore) break;
		}

		return {
			rootFound: Boolean(root),
			themeChanged: Boolean(themeButton) && beforeTheme !== afterTheme,
			switchMoved: Boolean(switchButton) && switchBefore !== switchAfter,
			tabChanged: tabButtons.length >= 2 && tabBefore !== tabAfter,
			paginationChanged: Boolean(paginationRoot) && paginationBefore !== paginationAfter,
			sliderChanged: Boolean(sliderRoot && sliderLine) && sliderBefore !== sliderAfter,
			details: {
				beforeTheme,
				afterTheme,
				switchBefore,
				switchAfter,
				tabButtonCount: tabButtons.length,
				paginationBefore,
				paginationAfter,
				sliderBefore,
				sliderAfter
			}
		};
	`);
	if (
		!result.rootFound ||
		!result.themeChanged ||
		!result.switchMoved ||
		!result.tabChanged ||
		!result.paginationChanged ||
		!result.sliderChanged
	) {
		throw new Error(`Unexpected home demo interactions: ${JSON.stringify(result)}`);
	}
};

const assertHomeLoadingAnimationRunning = async () => {
	const result = await runInPage<{
		found: boolean;
		animatedCount: number;
		runningCount: number;
		pausedCount: number;
		states: Array<{ name: string; playState: string; inlinePlayState: string }>;
	}>(`
		await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
		const root = document.querySelector('.hero-preview-profile');
		const targets = root
			? [root, ...root.querySelectorAll('*')].filter((element) => {
				const style = getComputedStyle(element);
				return style.animationName !== 'none' || element.style.animationPlayState;
			})
			: [];
		const states = targets.map((element) => {
			const style = getComputedStyle(element);
			return {
				name: style.animationName,
				playState: style.animationPlayState,
				inlinePlayState: element.style.animationPlayState
			};
		});
		return {
			found: Boolean(root),
			animatedCount: targets.length,
			runningCount: states.filter((state) => state.playState === 'running' || state.inlinePlayState === 'running').length,
			pausedCount: states.filter((state) => state.playState === 'paused' || state.inlinePlayState === 'paused').length,
			states: states.slice(0, 12)
		};
	`);
	if (!result.found || result.animatedCount === 0 || result.runningCount === 0 || result.pausedCount > 0) {
		throw new Error(`Unexpected home loading animation state: ${JSON.stringify(result)}`);
	}
};

const assertHomeHeroPreview = async () => {
	const result = await runInPage<{
		cells: Record<string, boolean>;
		swiperChildren: number;
	}>(`
		return {
			cells: {
				action: Boolean(document.querySelector('.hero-preview-action button')),
				notice: Boolean(document.querySelector('.hero-preview-notice *')),
				profile: Boolean(document.querySelector('.hero-preview-profile *')),
				switch: Boolean(document.querySelector('.hero-preview-switch button')),
				tab: Boolean(document.querySelector('.hero-preview-tab button')),
				input: Boolean(document.querySelector('.hero-preview-input input')),
				rate: Boolean(document.querySelector('.hero-preview-rate *')),
				choice: Boolean(document.querySelector('.hero-preview-choice *')),
				slider: Boolean(document.querySelector('.hero-preview-slider-control *')),
				pagination: Boolean(document.querySelector('.hero-preview-pagination button')),
				swiper: Boolean(document.querySelector('.hero-preview-swiper *'))
			},
			swiperChildren: document.querySelectorAll('.hero-preview-swiper *').length
		};
	`);
	const missing = Object.entries(result.cells)
		.filter(([, ok]) => !ok)
		.map(([key]) => key);
	if (missing.length > 0 || result.swiperChildren === 0) {
		throw new Error(`Unexpected home hero preview cells: ${JSON.stringify({ missing, ...result })}`);
	}
};

const assertGeneratorFullKeyboardMetrics = async () => {
	const result = await runInPage<{
		found: boolean;
		firstRowButtonCount: number;
		sameRow: boolean;
		fitsRoot: boolean;
		fitsRow: boolean;
		valueChanged: boolean;
		details: Record<string, unknown>;
	}>(`
		const paint = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		// 通过区块标签文本定位 FullKeyboard 预览块
		const root = [...document.querySelectorAll('div')]
			.filter((element) => normalize(element.textContent || '').includes('Full Keyboard')
				&& element.querySelector('.grid-cols-10'))
			.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];
		if (!root) return { found: false, firstRowButtonCount: 0, sameRow: false, fitsRoot: false, fitsRow: false, valueChanged: false, details: {} };
		root.scrollIntoView({ block: 'center', inline: 'nearest' });
		await paint();
		const value = [...root.querySelectorAll('span')].find((element) => (element.getAttribute('class') || '').includes('font-bold'));
		const beforeValue = value?.textContent?.trim() || '';
		const firstRow = root.querySelector('.grid-cols-10');
		const buttons = [...(firstRow?.querySelectorAll('button') || [])].filter((button) => {
			const rect = button.getBoundingClientRect();
			return rect.width > 0 && rect.height > 0;
		});
		const tops = buttons.map((button) => Math.round(button.getBoundingClientRect().top));
		const sameRow = buttons.length === 10 && Math.max(...tops) - Math.min(...tops) <= 2;
		const rootRect = root.getBoundingClientRect();
		const firstRowRect = firstRow?.getBoundingClientRect();
		buttons[0]?.click();
		await paint();
		const afterValue = value?.textContent?.trim() || '';
		return {
			found: true,
			firstRowButtonCount: buttons.length,
			sameRow,
			fitsRoot: root.scrollWidth <= root.clientWidth + 1,
			fitsRow: Boolean(firstRowRect) && firstRowRect.left >= rootRect.left - 1 && firstRowRect.right <= rootRect.right + 1,
			valueChanged: beforeValue !== afterValue && afterValue.includes('q'),
			details: {
				beforeValue,
				afterValue,
				tops,
				rootScrollWidth: root.scrollWidth,
				rootClientWidth: root.clientWidth
			}
		};
	`);
	if (
		!result.found ||
		result.firstRowButtonCount !== 10 ||
		!result.sameRow ||
		!result.fitsRoot ||
		!result.fitsRow ||
		!result.valueChanged
	) {
		throw new Error(`Unexpected generator FullKeyboard metrics: ${JSON.stringify(result)}`);
	}
};

const assertGeneratorLoadingLazyAnimation = async () => {
	const result = await runInPage<{
		found: boolean;
		inView: { visible: boolean; animatedCount: number; runningCount: number; pausedCount: number; states: string[] };
		offView: { visible: boolean; animatedCount: number; runningCount: number; pausedCount: number; states: string[] };
		backInView: { visible: boolean; animatedCount: number; runningCount: number; pausedCount: number; states: string[] };
	}>(`
		const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
		// 通过区块标签文本定位 Loading 预览块（label 文本为 加载中/Loading + Loading 组件名）
		const root = [...document.querySelectorAll('div')]
			.filter((element) => {
				const text = normalize(element.textContent || '');
				return (text.includes('加载中 Loading') || text.endsWith('Loading Loading') || text.startsWith('Loading Loading')
						|| text === '加载中 Loading' || text === 'Loading Loading')
					&& element.querySelector('svg');
			})
			.sort((a, b) => a.getBoundingClientRect().height - b.getBoundingClientRect().height)[0]
			|| [...document.querySelectorAll('div.break-inside-avoid')].find((element) => normalize(element.textContent || '').startsWith('加载中') || normalize(element.textContent || '').startsWith('Loading'));
		const container = root?.closest('[data-theme="generator-preview"]');
		const readState = () => {
			const rect = root?.getBoundingClientRect();
			const containerRect = container?.getBoundingClientRect();
			const visible = Boolean(
				rect &&
				containerRect &&
				rect.bottom > Math.max(0, containerRect.top) &&
				rect.top < Math.min(window.innerHeight, containerRect.bottom) &&
				rect.right > Math.max(0, containerRect.left) &&
				rect.left < Math.min(window.innerWidth, containerRect.right)
			);
			const targets = root
				? [root, ...root.querySelectorAll('*')].filter((element) => {
					const style = getComputedStyle(element);
					return style.animationName !== 'none' || element.style.animationPlayState;
				})
				: [];
			const states = targets.map((element) => {
				const style = getComputedStyle(element);
				return \`\${style.animationName}:\${style.animationPlayState}:\${element.style.animationPlayState || '-'}\`;
			});
			return {
				visible,
				animatedCount: targets.length,
				runningCount: states.filter((state) => state.includes(':running')).length,
				pausedCount: states.filter((state) => state.includes(':paused')).length,
				states: states.slice(0, 12)
			};
		};
		if (!root || !container) {
			return {
				found: false,
				inView: readState(),
				offView: readState(),
				backInView: readState()
			};
		}
		root.scrollIntoView({ block: 'center', inline: 'nearest' });
		await wait(700);
		const inView = readState();
		const containerRect = container.getBoundingClientRect();
		const rootRect = root.getBoundingClientRect();
		const rootCenter = rootRect.top - containerRect.top + rootRect.height / 2 + container.scrollTop;
		container.scrollTop = rootCenter < container.scrollHeight / 2 ? container.scrollHeight : 0;
		await wait(700);
		let offView = readState();
		if (offView.visible) {
			container.scrollTop = container.scrollTop === 0 ? container.scrollHeight : 0;
			await wait(700);
			offView = readState();
		}
		root.scrollIntoView({ block: 'center', inline: 'nearest' });
		await wait(700);
		const backInView = readState();
		return { found: true, inView, offView, backInView };
	`);
	const hasRunningInView =
		result.inView.visible && result.inView.animatedCount > 0 && result.inView.runningCount > 0 && result.inView.pausedCount === 0;
	const hasPausedOffView = !result.offView.visible && result.offView.animatedCount > 0 && result.offView.pausedCount > 0;
	const hasRunningBackInView =
		result.backInView.visible &&
		result.backInView.animatedCount > 0 &&
		result.backInView.runningCount > 0 &&
		result.backInView.pausedCount === 0;
	if (!result.found || !hasRunningInView || !hasPausedOffView || !hasRunningBackInView) {
		throw new Error(`Unexpected generator loading lazy animation state: ${JSON.stringify(result)}`);
	}
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
		const candidates = [...document.querySelectorAll('button,[role="button"],a')].filter(visible);
		const exact = candidates.filter((el) => normalize(el.textContent || el.getAttribute('aria-label') || '') === text);
		const loose = candidates
			.filter((el) => normalize(el.textContent || el.getAttribute('aria-label') || '').includes(text))
			.sort((a, b) => normalize(a.textContent || '').length - normalize(b.textContent || '').length);
		const target = exact[index] || loose[index];
		if (!target) return false;
		target.scrollIntoView({ block: 'center', inline: 'center' });
		target.click();
		return true;
	`);
	if (!ok) throw new Error(`Unable to click text: ${text}`);
	await sleep(250);
};

const clickByAriaLabel = async (label: string) => {
	const ok = await runInPage<boolean>(`
		const label = ${JSON.stringify(label)};
		const target = [...document.querySelectorAll('[aria-label]')].find((element) => element.getAttribute('aria-label') === label);
		if (!target) return false;
		target.scrollIntoView({ block: 'center', inline: 'center' });
		target.click();
		return true;
	`);
	if (!ok) throw new Error(`Unable to click aria-label: ${label}`);
	await sleep(300);
};

const assertIframeUrl = async (component: string, lang: 'zh_CN' | 'en_US') => {
	await waitFor(() => runInPage<boolean>(`return Boolean(document.querySelector('#iframe-id'));`), `iframe for ${component}`);
	const src = await runInPage<string>(`return document.querySelector('#iframe-id')?.getAttribute('src') || '';`);
	if (!src.includes(`/${component}/${lang}`)) throw new Error(`Unexpected iframe src for ${component}: ${src}`);
	if (!src.includes(`lang=${lang}`)) throw new Error(`Iframe src is missing lang=${lang}: ${src}`);
	if (!src.includes('channel=iframe')) throw new Error(`Iframe src is missing channel=iframe: ${src}`);
};

const assertNoBrowserErrors = (label: string) => {
	const unexpectedErrors = browserErrors.filter((message) => !baselineBrowserErrorMessages.some((baseline) => message.includes(baseline)));
	if (unexpectedErrors.length > 0) {
		throw new Error(`${label}: ${unexpectedErrors.slice(0, 3).join(' | ')}`);
	}
};

const scenarios: Scenario[] = [
	{
		name: 'Home renders zh',
		path: '/',
		steps: [
			() => assertBodyIncludes('VTDF'),
			() => assertBodyIncludes('基于'),
			() => assertSelector('a[aria-label="VTDF 首页"]', 'home brand link'),
			() => assertHeaderLogoMotion(),
			() => assertHomeDemoInteractions(),
			() => assertHomeLoadingAnimationRunning()
		]
	},
	{
		name: 'Home renders en',
		path: '/?lang=en_US',
		steps: [
			() => assertBodyIncludes('VTDF'),
			() => assertBodyIncludes('mobile Web component'),
			() => assertSelector('a[aria-label="VTDF home"]', 'home brand link')
		]
	},
	{
		name: 'Home hero preview renders vtdf components',
		path: '/',
		steps: [() => assertHomeHeroPreview(), () => assertBodyIncludes('开始使用'), () => assertBodyIncludes('浏览组件')]
	},
	{
		name: 'Home renders long sections',
		path: '/',
		steps: [
			() => assertBodyIncludes('简单、轻量、可组合的移动组件底座'),
			() =>
				runInPage<void>(`
					for (const ratio of [0.18, 0.32, 0.46, 0.6, 0.74, 0.88, 1]) {
						window.scrollTo(0, document.body.scrollHeight * ratio);
						await new Promise((resolve) => setTimeout(resolve, 350));
					}
				`),
			() => waitFor(() => bodyIncludes('一个命令，建立可运行的组件工程'), 'home terminal section'),
			() => assertBodyIncludes('亮暗模式与 42 套主题使用同一组语义'),
			() => waitFor(() => bodyIncludes('从 API 到移动交互的完整组件体验'), 'home component system section'),
			() => assertBodyIncludes('灵活 API'),
			() => waitFor(() => bodyIncludes('移动优先'), 'home mobile section'),
			() => assertBodyIncludes('技术栈'),
			() => assertBodyIncludes('组件总览'),
			() => assertBodyIncludes('使用前须知'),
			() => assertBodyIncludes('由社区持续建设'),
			() => assertBodyIncludes('CONTRIBUTORS'),
			() => assertBodyIncludes('SPONSORS / GITHUB'),
			() => assertBodyIncludes('VTDF DESIGN')
		]
	},
	{
		name: 'Header language switch keeps route',
		path: '/components?nav=button&tab=0',
		steps: [
			() => clickByAriaLabel('切换到英文'),
			() => waitFor(() => bodyIncludes('Button'), 'English component title'),
			() => assertIframeUrl('button', 'en_US')
		]
	},
	{
		name: 'Components demo tab renders source and iframe',
		path: '/components?nav=button&tab=0',
		steps: [
			() => assertBodyIncludes('Button'),
			() => waitFor(() => runInPage<boolean>(`return document.querySelectorAll('pre code').length > 0;`), 'highlighted code'),
			() => assertIframeUrl('button', 'zh_CN')
		]
	},
	{
		name: 'Components shared demo source resolves Vue file',
		path: '/components?nav=imageList&tab=0',
		steps: [
			() => assertBodyIncludes('ImageList'),
			() => waitFor(() => runInPage<boolean>(`return document.querySelectorAll('pre code.hljs').length > 0;`), 'highlighted Vue code'),
			() => assertSourceCode(['type Locale', 'ImageListExpose', '<ImageList'], ['<ImageListDemo locale="zh_CN" />'])
		]
	},
	{
		name: 'Components API tab renders markdown',
		path: '/components?nav=button&tab=1',
		steps: [
			() => waitFor(() => bodyIncludes('Button Props'), 'Button API markdown'),
			() => assertBodyIncludes('Button Events'),
			() => assertBodyIncludes('fill')
		]
	},
	{
		name: 'Components guide tab renders markdown',
		path: '/components?nav=button&tab=2&lang=en_US',
		steps: [
			() => assertBodyIncludes('Button'),
			() => waitFor(() => bodyIncludes('Button group'), 'Button guide markdown'),
			() => clickText('API'),
			() => waitFor(() => bodyIncludes('Button Props'), 'tab click to API')
		]
	},
	{
		name: 'Components keyboard navigation changes tab',
		path: '/components?nav=calendar&tab=0&lang=en_US',
		steps: [
			() => page.call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 }),
			() => waitFor(() => bodyIncludes('Calendar Props'), 'calendar API after ArrowRight')
		]
	},
	{
		name: 'Guide quick start renders zh',
		path: '/guide',
		steps: [
			() => waitFor(() => bodyIncludes('bun create any-tdf@alpha vtdf-app -f vue'), 'quick start command'),
			() => assertBodyIncludes('安装')
		]
	},
	{
		name: 'Guide theme renders en',
		path: '/guide/theme?lang=en_US',
		steps: [() => assertBodyIncludes('Theme'), () => assertBodyIncludes('@plugin "vtdf/theme"')]
	},
	{
		name: 'Guide color page renders generated swatches',
		path: '/guide/color?lang=en_US',
		steps: [
			() => assertBodyIncludes('VTDF follows Tailwind CSS v4'),
			() => assertBodyIncludes('primary'),
			() => assertBodyIncludes('success')
		]
	},
	{
		name: 'Generator page renders live preview',
		path: '/generator?lang=en_US',
		steps: [
			() =>
				runInPage<void>(`
					if (!document.title.includes('Theme generator')) throw new Error('Unexpected generator title: ' + document.title);
				`),
			() => assertBodyExcludes('Live Preview'),
			() => assertBodyIncludes('Theme colors'),
			() => assertBodyIncludes('Background'),
			() => assertBodyIncludes('Extended colors'),
			() => assertBodyIncludes('Product Actions'),
			() => assertBodyIncludes('User Login'),
			() => assertBodyIncludes('Donut Chart'),
			() => assertSelector('svg[viewBox="0 0 614 383.76"]', 'generator landscape illustration'),
			() => assertToolbarButton('Preview', 14),
			() => assertToolbarButton('Config', 14),
			() => assertToolbarButton('Switch to', 16),
			() => assertToolbarButton('Random', 14),
			() => assertToolbarButton('Reset', 14),
			() => assertToolbarButton('Cache', 14),
			() => assertGeneratorColorPickerSpacing(),
			() => assertGeneratorRadiusLayout(),
			() => assertGeneratorLineChartLayout(),
			() => assertGeneratorNoticeBarContent(),
			() => assertGeneratorFullKeyboardMetrics(),
			() => assertGeneratorLoadingLazyAnimation(),
			() => clickText('Config'),
			() => waitFor(() => bodyIncludes('@plugin "vtdf/theme"'), 'generator plugin config'),
			() => assertGeneratorPaletteMetrics()
		]
	},
	{
		name: 'Guide logo page renders construction grid',
		path: '/guide/logo?lang=en_US',
		steps: [
			() =>
				runInPage<void>(`
					const compactText = (document.body.innerText || '').replace(/\\s+/g, '');
					if (!compactText.includes('VTDF')) throw new Error('Expected visible VTDF wordmark');
				`),
			() => assertSelector('svg[data-logo-construction][viewBox="0 0 81 81"]', 'logo construction svg'),
			() => assertStaticGuideLogo(),
			() =>
				runInPage<void>(`
					const svg = document.querySelector('svg[data-logo-construction][viewBox="0 0 81 81"]');
					const lines = svg?.querySelectorAll('line').length || 0;
					const circles = svg?.querySelectorAll('circle').length || 0;
					if (lines !== 18 || circles !== 3) {
						throw new Error('Unexpected logo construction grid: ' + JSON.stringify({ lines, circles }));
					}
				`)
		]
	},
	{
		name: 'Guide create page renders scaffold docs',
		path: '/guide/create?lang=en_US',
		steps: [
			() => assertBodyIncludes('create-any-tdf'),
			() => assertBodyIncludes('bun create any-tdf my-app -f vue'),
			() => assertBodyIncludes('Templates')
		]
	},
	{
		name: 'Guide shortcut page renders keyboard docs',
		path: '/guide/shortkey?lang=en_US',
		steps: [() => assertBodyIncludes('The whole website'), () => assertBodyIncludes('arrow keys')]
	},
	{
		name: 'Header theme panel changes data mode',
		path: '/components?nav=button&tab=0&lang=en_US',
		steps: [
			() => clickText('Theme'),
			() => assertThemePanelLayout(),
			() => clickByAriaLabel('Dark'),
			() => waitFor(() => runInPage<boolean>(`return document.documentElement.getAttribute('data-mode') === 'dark';`), 'dark mode'),
			() => assertIframeUrl('button', 'en_US')
		]
	}
];

const failures: Array<{ name: string; reason: string }> = [];

for (const scenario of scenarios) {
	try {
		await goto(scenario.path);
		for (const step of scenario.steps) {
			await step();
		}
		assertNoBrowserErrors(scenario.name);
		console.log(`PASS ${scenario.name}`);
	} catch (error) {
		failures.push({ name: scenario.name, reason: error instanceof Error ? error.message : String(error) });
		console.log(`FAIL ${scenario.name}`);
	}
}

page.close();
cleanup();

console.log(JSON.stringify({ baseUrl, checked: scenarios.length, failedCount: failures.length, failures }, null, 2));

if (failures.length > 0) process.exit(1);
