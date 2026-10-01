// 指南页侧边栏菜单数据（框架无关）。
// doc 对应 content/*/guide 下的 Markdown 文件名（不含 _en 后缀），无 doc 的条目为站点内的特殊页面。

export type GuideMenuChild = {
	title: string;
	title_en: string;
	nav: string;
	doc?: string;
};

export type GuideMenuGroup = {
	class: string;
	class_en: string;
	childs: GuideMenuChild[];
};

export const guideMenuList: GuideMenuGroup[] = [
	{
		class: '常规',
		class_en: 'General',
		childs: [
			{ title: '快速上手', title_en: 'Quick start', nav: 'quick-start', doc: 'quickStart' },
			{ title: '更新日志', title_en: 'Changelog', nav: 'changelog', doc: 'changelog' },
			{ title: '主题配置', title_en: 'Theme', nav: 'theme', doc: 'theme' },
			{ title: '图标', title_en: 'Icon', nav: 'icon', doc: 'icon' },
			{ title: '函数式反馈', title_en: 'Functional Feedback', nav: 'feedback', doc: 'feedback' },
			{ title: '国际化', title_en: 'Internationalization', nav: 'internation', doc: 'internation' },
			{ title: '常见问题', title_en: 'FAQ', nav: 'faq', doc: 'faq' },
			{ title: '贡献指南', title_en: 'Contribution Guide', nav: 'contribution', doc: 'contribution' },
			{ title: '兼容性', title_en: 'Compatibility', nav: 'compatibility', doc: 'compatibility' },
			{ title: '升级指南', title_en: 'Upgrade Guide', nav: 'upgrade', doc: 'upgrade' }
		]
	},
	{
		class: '设计',
		class_en: 'Design',
		childs: [
			{ title: '色彩', title_en: 'Color', nav: 'color' },
			{ title: 'LOGO', title_en: 'LOGO', nav: 'logo' }
		]
	},
	{
		class: '工具',
		class_en: 'Tools',
		childs: [
			{ title: 'AI Skill', title_en: 'AI Skill', nav: 'skill', doc: 'skill' },
			{ title: '工具方法', title_en: 'Utils', nav: 'utils', doc: 'utils' },
			{ title: 'IDE 插件', title_en: 'IDE plugin', nav: 'vscode', doc: 'vscode' },
			{ title: '脚手架', title_en: 'Create CLI', nav: 'create' },
			{ title: '图标插件', title_en: 'Icon plugin', nav: 'icon-plugin' },
			{ title: 'MD 插件', title_en: 'MD plugin', nav: 'md' },
			{ title: '快捷键', title_en: 'Shortcut key', nav: 'shortkey' }
		]
	},
	{
		class: '其他',
		class_en: 'Other',
		childs: [
			{ title: '关于', title_en: 'About', nav: 'about', doc: 'about' },
			{ title: '里程碑', title_en: 'Milestone', nav: 'milestone', doc: 'milestone' },
			{ title: '计划', title_en: 'Future', nav: 'future', doc: 'future' }
		]
	}
];
