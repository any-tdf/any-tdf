import { marked, type MarkedOptions } from 'marked';
import { createFilter } from 'rollup-pluginutils';

const markdownExtension = /\.md$/;

export interface MarkdownPluginOptions {
	include?: string[];
	exclude?: string[];
	marked?: MarkedOptions;
}

export type MDOptions = MarkdownPluginOptions;

export interface MarkdownTransformResult {
	code: string;
	map: {
		version: number;
		sources: string[];
		names: string[];
		mappings: string;
	};
}

export interface MarkdownPlugin {
	name: string;
	transform: (source: string, id: string) => Promise<MarkdownTransformResult | null>;
}

const md = (options: MarkdownPluginOptions = {}): MarkdownPlugin => {
	const filter = createFilter(options.include ?? ['**/*.md'], options.exclude);
	if (options.marked) marked.setOptions(options.marked);

	return {
		name: '@any-tdf/vite-plugin-md-ts',
		transform: async (source: string, id: string) => {
			const filePath = id.split('?')[0];
			if (!markdownExtension.test(filePath) || !filter(filePath)) return null;

			const content = options.marked ? await marked.parse(source, options.marked) : source;
			return {
				code: `export default ${JSON.stringify(content.toString())};`,
				map: {
					version: 3,
					sources: [filePath],
					names: [],
					mappings: ''
				}
			};
		}
	};
};

export default md;
