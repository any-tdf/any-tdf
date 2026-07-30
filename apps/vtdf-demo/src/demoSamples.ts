export type DemoSample = {
	component: string;
	props?: Record<string, unknown>;
	slot?: string;
};

const optionItems = [
	{ label: '选项 1', value: '1' },
	{ label: '选项 2', value: '2' },
	{ label: '选项 3', value: '3' }
];

const pickerData = [
	{ label: '浙江', value: 'zhejiang', children: [{ label: '杭州', value: 'hangzhou' }] },
	{ label: '江苏', value: 'jiangsu', children: [{ label: '南京', value: 'nanjing' }] }
];

const imageItems = [
	{ url: '/assets/images/avatar_1.jpg', status: 'done' },
	{ url: '/assets/images/avatar_2.png', status: 'done' }
];

export const demoSamples: Record<string, DemoSample[]> = {
	accordion: [
		{
			component: 'Accordion',
			props: {
				items: [
					{ title: '标题 1', content: '内容 1' },
					{ title: '标题 2', content: '内容 2' }
				]
			}
		}
	],
	actionPopover: [
		{
			component: 'ActionPopover',
			props: {
				visible: true,
				actions: [
					{ text: '复制', icon: { name: 'ri-file-copy-line' } },
					{ text: '分享', icon: { name: 'ri-share-line' } }
				],
				layout: 'inline'
			}
		}
	],
	actionSheet: [
		{
			component: 'ActionSheet',
			props: { visible: true, title: '动作面板', actions: [{ text: '编辑' }, { text: '删除', state: 'error' }], popup: { size: 42 } }
		}
	],
	alert: [{ component: 'Alert', props: { visible: true, title: '提示', content: '这是一条 VTDF 提示。' } }],
	asyncPicker: [{ component: 'AsyncPicker', props: { visible: true, title: '异步选择', datas: pickerData, popup: { size: 45 } } }],
	avatar: [{ component: 'Avatar', props: { src: '/assets/images/avatar_1.jpg', size: '12', radius: 'full' } }],
	avatarGroup: [
		{
			component: 'AvatarGroup',
			props: { data: [{ src: '/assets/images/avatar_1.jpg' }, { src: '/assets/images/avatar_2.png' }, { text: 'V' }], size: '10' }
		}
	],
	badge: [{ component: 'Badge', props: { text: '99+', state: 'error' }, slot: '消息' }],
	bottomSheet: [{ component: 'BottomSheet', props: { visible: true, title: '底部浮窗', content: '拖动或点击遮罩关闭。' } }],
	button: [{ component: 'Button', props: { type: 'primary', icon: { name: 'ri-vuejs-fill' } }, slot: 'VTDF 按钮' }],
	buttonGroup: [{ component: 'ButtonGroup', props: { items: [{ text: '取消' }, { text: '确认', icon: { name: 'ri-check-line' } }] } }],
	calendar: [{ component: 'Calendar', props: { visible: true, popup: { size: 70 } } }],
	card: [{ component: 'Card', props: { title: '卡片标题', header: '头部', footer: '底部' }, slot: '卡片内容' }],
	cell: [{ component: 'Cell', props: { title: '单元格', detail: '详情', rightIcon: { name: 'ri-arrow-right-s-line' } } }],
	charRoll: [{ component: 'CharRoll', props: { value: 'VTDF', autoStart: true } }],
	checkbox: [{ component: 'Checkbox', props: { options: optionItems, value: ['1'] } }],
	codeInput: [{ component: 'CodeInput', props: { value: '1234', length: 6 } }],
	colorPicker: [{ component: 'ColorPicker', props: { visible: true, value: ['oklch(0.6 0.2 250)'], popup: { size: 72 } } }],
	countDown: [{ component: 'CountDown', props: { time: 3661000 } }],
	dialog: [{ component: 'Dialog', props: { visible: true, title: '确认操作', content: '是否继续？' } }],
	divider: [{ component: 'Divider', props: { text: '分割线' } }],
	feedback: [{ component: 'Feedback', props: {} }],
	form: [
		{
			component: 'Form',
			props: {
				items: [
					{ type: 'input', label: '姓名', name: 'name', value: 'VTDF' },
					{ type: 'switch', label: '启用', name: 'enabled', value: true }
				]
			}
		}
	],
	fullKeyboard: [{ component: 'FullKeyboard', props: { visible: true, popup: { size: 44 } } }],
	grids: [{ component: 'Grids', props: { cols: '3', gap: '2' }, slot: '网格内容' }],
	icon: [{ component: 'Icon', props: { name: 'ri-vuejs-fill', size: 42, state: 'success' } }],
	imageList: [{ component: 'ImageList', props: { value: imageItems, max: 4 } }],
	imagePreview: [
		{ component: 'ImagePreview', props: { visible: true, images: ['/assets/images/wall_1.jpg', '/assets/images/wall_2.jpg'], index: 0 } }
	],
	indexBar: [
		{
			component: 'IndexBar',
			props: {
				data: [
					{ index: 'A', children: ['Apple', 'Ant'] },
					{ index: 'B', children: ['Bee'] }
				]
			}
		}
	],
	input: [{ component: 'Input', props: { label: '输入框', value: 'VTDF', placeholder: '请输入' } }],
	list: [
		{ component: 'List', props: { data: [{ title: '第一项' }, { title: '第二项' }], itemChild: (item: { title: string }) => item.title } }
	],
	loading: [{ component: 'Loading', props: { type: '1_0', size: '8' } }],
	mask: [{ component: 'Mask', props: { visible: true, bg: 'black' } }],
	modal: [{ component: 'Modal', props: { visible: true, title: '模态框', content: 'VTDF Modal' } }],
	navBar: [{ component: 'NavBar', props: { title: 'VTDF Demo', left: 'back' }, slot: '完成' }],
	noticeBar: [{ component: 'NoticeBar', props: { text: '这是一条通知栏消息。', leftIcon: { name: 'ri-megaphone-line' } } }],
	numKeyboard: [{ component: 'NumKeyboard', props: { visible: true, popup: { size: 38 } } }],
	pagination: [{ component: 'Pagination', props: { current: 2, total: 8 } }],
	picker: [{ component: 'Picker', props: { visible: true, datas: pickerData, popup: { size: 48 } } }],
	placeholder: [{ component: 'Placeholder', props: { title: '暂无数据', icon: { name: 'ri-inbox-line' } } }],
	popup: [{ component: 'Popup', props: { visible: true, position: 'bottom', size: 35 }, slot: 'Popup 内容' }],
	progress: [{ component: 'Progress', props: { percent: 66 } }],
	progressLoop: [{ component: 'ProgressLoop', props: { percent: 72, size: 96 } }],
	radio: [{ component: 'Radio', props: { options: optionItems, value: '1' } }],
	rate: [{ component: 'Rate', props: { value: 3.5 } }],
	signature: [{ component: 'Signature', props: { height: 220 } }],
	skeleton: [{ component: 'Skeleton', props: { rows: 3, animated: true } }],
	slider: [{ component: 'Slider', props: { value: 45, max: 100, showValue: true } }],
	stepper: [{ component: 'Stepper', props: { value: 2 } }],
	steps: [{ component: 'Steps', props: { active: 1, items: [{ title: '开始' }, { title: '处理' }, { title: '完成' }] } }],
	swiper: [
		{ component: 'Swiper', props: { data: [{ img: '/assets/images/wall_1.jpg' }, { img: '/assets/images/wall_2.jpg' }], height: '48' } }
	],
	switch: [{ component: 'Switch', props: { checked: true } }],
	tabBar: [
		{
			component: 'TabBar',
			props: {
				labels: [
					{ text: '首页', icon: { name: 'ri-home-line' } },
					{ text: '设置', icon: { name: 'ri-settings-line' } }
				],
				active: 0
			}
		}
	],
	tabs: [{ component: 'Tabs', props: { tab: { labels: ['标签 1', '标签 2'] } }, slot: '标签内容' }],
	tag: [{ component: 'Tag', props: { text: '标签', state: 'success' } }],
	timePicker: [{ component: 'TimePicker', props: { visible: true, popup: { size: 48 } } }],
	toast: [{ component: 'Toast', props: { visible: true, message: '操作成功', type: 'success' } }],
	tooltip: [{ component: 'Tooltip', props: { visible: true, content: '提示内容' }, slot: '悬浮目标' }]
};
