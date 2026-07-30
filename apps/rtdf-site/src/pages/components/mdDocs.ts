// 组件文档 md 文件（经 @any-tdf/vite-plugin-md-ts 转换为 HTML 字符串）
export const componentDocs = import.meta.glob('../../../../../content/rtdf/components/**/*.md');

export const loadComponentDoc = async (nav: string, file: string): Promise<string | null> => {
	const filePath = Object.keys(componentDocs).find((key) => key.endsWith(`/components/${nav}/${file}`));
	if (!filePath) return null;
	const mod = (await componentDocs[filePath]()) as { default: string };
	return mod.default;
};
