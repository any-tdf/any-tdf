const vscode = require('vscode');
const https = require('node:https');
const {
	targets,
	supportedLanguageIds,
	findNearestPackageInfo,
	createComponentMaps,
	getApiContent,
	createHoverContent,
	parseApiMarkdown,
	createCompletionEntries,
	filterCompletionEntries,
	getTagCompletionContext,
	normalizeComponentName
} = require('./core');

const menuList = require('./menuList');
const componentMaps = createComponentMaps(menuList);
const latestVersionCache = new Map();
const apiItemsCache = new Map();

const triggerCharacters = [' ', ':', '@', '#', ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

const requestJson = (url) =>
	new Promise((resolve) => {
		const request = https.get(url, { headers: { Accept: 'application/json' }, timeout: 8000 }, (response) => {
			if (response.statusCode !== 200) {
				response.resume();
				resolve(null);
				return;
			}

			let body = '';
			response.setEncoding('utf-8');
			response.on('data', (chunk) => {
				body += chunk;
			});
			response.on('end', () => {
				try {
					resolve(JSON.parse(body));
				} catch {
					resolve(null);
				}
			});
		});
		request.on('timeout', () => request.destroy());
		request.on('error', () => resolve(null));
	});

const getLatestVersion = async (packageName) => {
	const cacheKey = packageName;
	if (latestVersionCache.has(cacheKey)) return latestVersionCache.get(cacheKey);

	const latestVersionPromise = (async () => {
		const packageInfo = await requestJson(`https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`);
		if (!packageInfo) return null;
		return packageInfo.version;
	})();

	latestVersionCache.set(cacheKey, latestVersionPromise);
	return latestVersionPromise;
};

const hasConfiguredValue = (inspectResult) =>
	Boolean(
		inspectResult &&
		(inspectResult.globalValue !== undefined ||
			inspectResult.workspaceValue !== undefined ||
			inspectResult.workspaceFolderValue !== undefined ||
			inspectResult.globalLanguageValue !== undefined ||
			inspectResult.workspaceLanguageValue !== undefined ||
			inspectResult.workspaceFolderLanguageValue !== undefined)
	);

const getIsZh = (target) => {
	const anyConfig = vscode.workspace.getConfiguration('AnyTDF');
	const anyInspect = anyConfig.inspect('English');
	if (hasConfiguredValue(anyInspect)) return !anyConfig.get('English', false);

	const legacyConfig = vscode.workspace.getConfiguration(target.label);
	return !legacyConfig.get('English', false);
};

const getWordAtPosition = (document, position) => {
	const wordRange = document.getWordRangeAtPosition(position, /[A-Za-z][A-Za-z0-9.-]*/);
	return wordRange ? normalizeComponentName(document.getText(wordRange)) : '';
};

const getActiveInfo = async (document) => {
	if (!supportedLanguageIds.includes(document.languageId)) return null;
	return await findNearestPackageInfo({
		filePath: document.uri.fsPath,
		languageId: document.languageId
	});
};

const getApiItems = async ({ targetKey, component, isZh }) => {
	const cacheKey = `${targetKey}:${component.name}:${isZh ? 'zh' : 'en'}`;
	if (apiItemsCache.has(cacheKey)) return apiItemsCache.get(cacheKey);

	const apiItemsPromise = (async () => {
		const apiContent = await getApiContent({ targetKey, component, isZh });
		return parseApiMarkdown(apiContent, { componentName: component.apiName || component.name });
	})();

	apiItemsCache.set(cacheKey, apiItemsPromise);
	return apiItemsPromise;
};

const createCompletionItem = (entry, range) => {
	const kind = entry.kind === 'event' ? vscode.CompletionItemKind.Event : vscode.CompletionItemKind.Property;
	const item = new vscode.CompletionItem(entry.label, kind);
	item.insertText = new vscode.SnippetString(entry.insertText);
	item.range = range;
	item.filterText = entry.filterText;
	item.detail = entry.detail;
	item.sortText = entry.sortText;
	if (entry.documentation) item.documentation = new vscode.MarkdownString(entry.documentation);
	return item;
};

const getReplacementRange = (document, position, prefix) => {
	const start = Math.max(position.character - (prefix || '').length, 0);
	return new vscode.Range(position.line, start, position.line, position.character);
};

const createHoverProvider = () => ({
	provideHover: async (document, position) => {
		const activeInfo = await getActiveInfo(document);
		if (!activeInfo) return null;

		const component = componentMaps[activeInfo.targetKey].get(getWordAtPosition(document, position));
		if (!component) return null;

		const isZh = getIsZh(activeInfo.target);
		const latestVersion = (await getLatestVersion(activeInfo.target.packageName)) || (isZh ? '获取失败' : 'Failed to get');
		const apiContent = await getApiContent({ targetKey: activeInfo.targetKey, component, isZh });
		const markdown = new vscode.MarkdownString(
			createHoverContent({
				targetKey: activeInfo.targetKey,
				currentVersion: activeInfo.currentVersion,
				latestVersion,
				component,
				apiContent,
				isZh
			})
		);
		return new vscode.Hover(markdown);
	}
});

const createCompletionProvider = () => ({
	provideCompletionItems: async (document, position) => {
		const activeInfo = await getActiveInfo(document);
		if (!activeInfo) return null;

		const textBeforeCursor = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
		const completionContext = getTagCompletionContext(textBeforeCursor);
		if (!completionContext) return null;

		const component = componentMaps[activeInfo.targetKey].get(completionContext.componentName);
		if (!component) return null;

		const isZh = getIsZh(activeInfo.target);
		const apiItems = await getApiItems({ targetKey: activeInfo.targetKey, component, isZh });
		const entries = filterCompletionEntries(
			createCompletionEntries({ targetKey: activeInfo.targetKey, apiItems, isZh }),
			completionContext.attributePrefix
		);
		const range = getReplacementRange(document, position, completionContext.attributePrefix);
		return entries.map((entry) => createCompletionItem(entry, range));
	}
});

const activate = (context) => {
	const selector = Object.values(targets).flatMap((target) => target.languageIds);
	context.subscriptions.push(vscode.languages.registerHoverProvider(selector, createHoverProvider()));
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, createCompletionProvider(), ...triggerCharacters));
};

const deactivate = () => {};

module.exports = {
	activate,
	deactivate
};
