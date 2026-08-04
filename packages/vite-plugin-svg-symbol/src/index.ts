import path from 'node:path';
import fs from 'node:fs';
import { optimize } from 'svgo';

export interface SvgSymbolOptions {
	inFile?: string;
	outFile?: string;
	fileName?: string;
	simple?: boolean;
}

type Command = 'serve' | 'build';

interface ResolvedConfig {
	root: string;
	command: Command;
}

interface Watcher {
	add: (paths: string | readonly string[]) => void;
	on: (event: string, listener: (event: string, path: string) => void) => void;
}

interface ViteDevServer {
	config: {
		root: string;
	};
	watcher: Watcher;
}

export interface SvgSymbolPlugin {
	name: string;
	configResolved?: (config: ResolvedConfig) => void;
	buildStart?: () => void | Promise<void>;
	configureServer?: (server: ViteDevServer) => void | Promise<void>;
}

interface NormalizedOptions {
	inFile: string;
	outFile: string;
	fileName: string;
	simple: boolean;
}

interface ParsedSvg {
	attributes: Map<string, string>;
	content: string;
}

interface SpriteEntry {
	defs: string[];
	symbol: string;
}

const defaultOptions: Required<SvgSymbolOptions> = {
	inFile: 'src/lib/symbol',
	outFile: 'public/fonts',
	fileName: 'symbol',
	simple: true
};

const copiedRootAttributeNames = ['viewBox', 'aria-labelledby', 'role', 'fill', 'stroke'];
const xmlAttributePattern = /([A-Za-z_:][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
const defsPattern = /<defs\b[^>]*>([\s\S]*?)<\/defs>/g;
const emptyDefsPattern = /<defs\b[^>]*\/>/g;
const styleAttributePattern = /\sstyle\s*=\s*(?:"[^"]*"|'[^']*')/g;

const escapeXmlAttribute = (value: string) =>
	value.replace(/[&<>"']/g, (character) => {
		if (character === '&') return '&amp;';
		if (character === '<') return '&lt;';
		if (character === '>') return '&gt;';
		if (character === '"') return '&quot;';
		return '&apos;';
	});

const findOpeningTagEnd = (source: string) => {
	let quote = '';
	for (let index = 4; index < source.length; index += 1) {
		const character = source[index];
		if (quote) {
			if (character === quote) quote = '';
			continue;
		}
		if (character === '"' || character === "'") quote = character;
		else if (character === '>') return index;
	}
	return -1;
};

const parseOptimizedSvg = (source: string): ParsedSvg => {
	const svg = source.trim();
	if (!svg.startsWith('<svg')) throw new Error('Optimized SVG must contain an <svg> root element.');
	const openingTagEnd = findOpeningTagEnd(svg);
	if (openingTagEnd < 0) throw new Error('Optimized SVG has an incomplete <svg> root element.');

	const openingTag = svg.slice(4, openingTagEnd);
	const selfClosing = /\/\s*$/.test(openingTag);
	const attributeSource = selfClosing ? openingTag.replace(/\/\s*$/, '') : openingTag;
	const attributes = new Map<string, string>();
	for (const match of attributeSource.matchAll(xmlAttributePattern)) attributes.set(match[1], match[2] ?? match[3] ?? '');
	if (selfClosing) return { attributes, content: '' };

	const closingTagStart = svg.lastIndexOf('</svg>');
	if (closingTagStart < openingTagEnd) throw new Error('Optimized SVG has an incomplete </svg> root element.');
	return { attributes, content: svg.slice(openingTagEnd + 1, closingTagStart) };
};

const createSpriteEntry = (id: string, source: string): SpriteEntry => {
	const { attributes, content } = parseOptimizedSvg(source);
	const defs: string[] = [];
	const symbolContent = content
		.replace(defsPattern, (_match, value: string) => {
			defs.push(value.replace(styleAttributePattern, ''));
			return '';
		})
		.replace(emptyDefsPattern, '');
	const copiedAttributes = copiedRootAttributeNames
		.flatMap((name) => {
			const value = attributes.get(name);
			return value == null ? [] : [` ${name}="${escapeXmlAttribute(value)}"`];
		})
		.join('');

	return {
		defs,
		symbol: `<symbol id="${escapeXmlAttribute(id)}"${copiedAttributes}>${symbolContent}</symbol>`
	};
};

const createSpriteContent = (entries: SpriteEntry[]) => {
	const defs = entries.flatMap((entry) => entry.defs);
	const defsContent = defs.length ? `<defs>${defs.join('')}</defs>` : '';
	return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${defsContent}${entries
		.map((entry) => entry.symbol)
		.join('')}</svg>`;
};

const normalizeOptions = (options: SvgSymbolOptions[] | undefined, root: string): NormalizedOptions[] => {
	const values = options?.length ? options : [defaultOptions];

	return values.map((option) => {
		const inFile = option.inFile ?? defaultOptions.inFile;
		const outFile = option.outFile ?? defaultOptions.outFile;
		const fallbackFileName = path.basename(inFile) || defaultOptions.fileName;

		return {
			inFile: path.resolve(root, inFile),
			outFile: path.resolve(root, outFile),
			fileName: option.fileName?.trim() || fallbackFileName,
			simple: option.simple ?? defaultOptions.simple
		};
	});
};

const isInFolder = (file: string, folder: string) => {
	const relativePath = path.relative(path.resolve(folder), path.resolve(file));
	return relativePath !== '' && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
};

const handleFile = ({ inFile, outFile, fileName, simple }: NormalizedOptions) => {
	if (!fs.existsSync(inFile)) {
		console.warn(`[@any-tdf/vite-plugin-svg-symbol]: ⚠️  ${inFile} does not exist, skip it!`);
		return;
	}

	fs.mkdirSync(outFile, { recursive: true });
	const files = fs.readdirSync(inFile).sort();
	const entries: SpriteEntry[] = [];

	for (const file of files) {
		if (!file.endsWith('.svg')) {
			console.warn(`[@any-tdf/vite-plugin-svg-symbol]: ⏭️  ${path.join(inFile, file)} is not a svg file, skip it!`);
			continue;
		}

		const filePath = path.join(inFile, file);
		const result = optimize(fs.readFileSync(filePath, 'utf8'));
		result.data = result.data.replace(/p-id="[^"]*"/g, '').replace(/class="[^"]*"/g, '');

		if (simple) {
			if (result.data.includes('fill=') && !result.data.includes('fill="none"')) {
				result.data = result.data.replace(/fill="[^"]*"/g, 'fill="currentColor"');
			}
			if (result.data.includes('stroke=') && !result.data.includes('stroke="none"')) {
				result.data = result.data.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
			}
		}

		entries.push(createSpriteEntry(path.basename(file, '.svg'), result.data));
	}

	const outputPath = path.join(outFile, `${fileName}.svg`);
	fs.writeFileSync(outputPath, createSpriteContent(entries));
	console.log(`[@any-tdf/vite-plugin-svg-symbol]: ✅ ${inFile} has merged ${files.length} svg files to ${outputPath}`);
};

const runAll = (options: NormalizedOptions[]) => {
	if (!options.length) return;
	console.log(`[@any-tdf/vite-plugin-svg-symbol]: ⌛ Start processing ${options.length} folders...`);
	for (const option of options) handleFile(option);
};

const setupWatcher = (server: ViteDevServer, options: NormalizedOptions[]) => {
	const outputFiles = options.map((option) => path.resolve(option.outFile, `${option.fileName}.svg`));

	for (const option of options) server.watcher.add(option.inFile);
	server.watcher.on('all', (_event, file) => {
		if (outputFiles.includes(path.resolve(file)) || !file.endsWith('.svg')) return;
		const option = options.find((item) => isInFolder(file, item.inFile));
		if (option) handleFile(option);
	});
};

export const createSvgSprite = (options: SvgSymbolOptions[] = [], root: string = process.cwd()) => {
	runAll(normalizeOptions(options, root));
};

const svgSymbol = (options: SvgSymbolOptions[] = []): SvgSymbolPlugin => {
	let command: Command = 'serve';
	let normalizedOptions = normalizeOptions(options, process.cwd());
	const refreshOptions = (root: string) => {
		normalizedOptions = normalizeOptions(options, root);
	};

	return {
		name: '@any-tdf/vite-plugin-svg-symbol',
		configResolved: (config) => {
			command = config.command;
			refreshOptions(config.root);
		},
		buildStart: () => {
			if (command === 'build') runAll(normalizedOptions);
		},
		configureServer: (server) => {
			refreshOptions(server.config.root);
			runAll(normalizedOptions);
			setupWatcher(server, normalizedOptions);
		}
	};
};

export default svgSymbol;
