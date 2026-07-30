// 站点菜单使用的 Lucide 图标名称映射（框架无关）。
// 各端站点把名称映射到各自的 Lucide 组件包（@lucide/svelte、lucide-react、lucide-vue-next）。

export const fallbackComponentIcon = 'Box';

// 组件分类图标，key 为中文分类名（与 menuList 的 class 字段一致）。
export const componentCategoryIconMap: Record<string, string> = {
	基础: 'Box',
	弹层基础: 'PanelsTopLeft',
	操作弹层: 'Rows3',
	布局: 'LayoutGrid',
	导航: 'Compass',
	表单与输入: 'TextCursorInput',
	选择控件: 'ListChecks',
	选择器: 'SlidersHorizontal',
	列表与单元格: 'List',
	数据展示: 'ChartNoAxesColumnIncreasing',
	媒体: 'Image',
	反馈: 'MessageCircleWarning',
	函数式: 'Braces'
};

// 组件图标，key 为 menuList 的 nav 字段。
export const componentIconMap: Record<string, string> = {
	button: 'MousePointerClick',
	buttonGroup: 'PanelsTopLeft',
	icon: 'Shapes',
	bottomSheet: 'PanelBottom',
	mask: 'Scan',
	popup: 'SquareArrowOutUpRight',
	actionPopover: 'MessageSquareMore',
	actionSheet: 'ListCollapse',
	card: 'CreditCard',
	divider: 'Minus',
	grids: 'Grid3X3',
	placeholder: 'ImageOff',
	skeleton: 'GalleryHorizontalEnd',
	indexBar: 'ListOrdered',
	navBar: 'PanelTop',
	pagination: 'Ellipsis',
	steps: 'ListStart',
	tabBar: 'PanelBottom',
	tabs: 'Rows3',
	codeInput: 'Binary',
	form: 'ListTodo',
	fullKeyboard: 'Keyboard',
	input: 'TextCursorInput',
	numKeyboard: 'Grid2X2',
	signature: 'PenLine',
	checkbox: 'SquareCheck',
	radio: 'CircleDot',
	rate: 'Star',
	slider: 'SlidersHorizontal',
	stepper: 'CirclePlus',
	switch: 'ToggleLeft',
	asyncPicker: 'ListFilter',
	calendar: 'CalendarDays',
	colorPicker: 'Pipette',
	picker: 'ListFilter',
	timePicker: 'Clock3',
	accordion: 'ChevronsUpDown',
	cell: 'Rows2',
	list: 'List',
	pullRefresh: 'RefreshCw',
	infiniteScroll: 'LoaderCircle',
	avatar: 'UserRound',
	avatarGroup: 'UsersRound',
	badge: 'Badge',
	charRoll: 'CaseSensitive',
	countDown: 'Timer',
	noticeBar: 'Megaphone',
	progress: 'ChartNoAxesColumnIncreasing',
	progressLoop: 'LoaderCircle',
	tag: 'Tag',
	tooltip: 'MessageSquareText',
	imagePreview: 'ScanSearch',
	imageList: 'Images',
	swiper: 'GalleryHorizontal',
	alert: 'TriangleAlert',
	dialog: 'MessagesSquare',
	loading: 'LoaderCircle',
	modal: 'PanelsTopLeft',
	toast: 'BellRing',
	feedback: 'MessageCircleReply'
};

// 指南分类图标，key 为中文分类名（与 guideMenuList 的 class 字段一致）。
export const guideCategoryIconMap: Record<string, string> = {
	常规: 'BookOpen',
	设计: 'Palette',
	工具: 'Wrench',
	其他: 'CircleEllipsis'
};

// 指南条目图标，key 为 guideMenuList 的 nav 字段。
export const guideItemIconMap: Record<string, string> = {
	'quick-start': 'Rocket',
	changelog: 'History',
	theme: 'Palette',
	icon: 'Shapes',
	feedback: 'MessageCircleReply',
	internation: 'Languages',
	faq: 'CircleQuestionMark',
	contribution: 'GitPullRequest',
	compatibility: 'MonitorCheck',
	upgrade: 'CircleArrowUp',
	color: 'Pipette',
	logo: 'Image',
	skill: 'BrainCircuit',
	utils: 'Braces',
	vscode: 'Blocks',
	create: 'Terminal',
	'icon-plugin': 'Puzzle',
	md: 'FileText',
	shortkey: 'Keyboard',
	about: 'Info',
	milestone: 'Goal',
	future: 'Telescope'
};
