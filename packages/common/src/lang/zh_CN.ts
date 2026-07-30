import type { LangProps } from './index.js';

const zh_CN: LangProps = {
	common: {
		noData: '暂无数据',
		done: '完成'
	},
	actionSheet: {
		cancelText: '取消'
	},
	bottomSheet: {
		title: '标题'
	},
	dialog: {
		title: '提示',
		content: '内容',
		primaryText: '确定',
		secondaryText: '取消'
	},
	input: {
		pleaseInput: '请输入',
		pleaseSelect: '请选择'
	},
	modal: {
		title: '标题',
		content: '内容',
		btnText: '我知道了'
	},
	navBar: {
		title: '标题'
	},
	pagination: {
		defaultOnlyOnePage: '只有一页'
	},
	picker: {
		defaultTitle: '请选择',
		defaultCancel: '取消',
		defaultConfirm: '确定'
	},
	asyncPicker: {
		defaultTitle: '请选择',
		defaultCancel: '取消',
		defaultConfirm: '确定',
		defaultNext: '下一步',
		defaultPrev: '上一步',
		defaultSelected: '已选'
	},
	rate: {
		error1: 'value 不能大于 total!',
		error2: 'total 必须能被 1 整除！',
		error3: '非半选时 value 必须能被 1 整除！',
		error4: '半选时 value 必须能被 0.5 整除！',
		error5: 'width 或 height 小于 20 会使移动端点击困难！'
	},
	timePicker: {
		defaultTitle: '请选择',
		defaultCancel: '取消',
		defaultConfirm: '确定',
		defaultYear: '年',
		defaultMonth: '月',
		defaultDay: '日',
		defaultHour: '时',
		defaultMinute: '分',
		defaultSecond: '秒'
	},
	calendar: {
		weekTextList: ['一', '二', '三', '四', '五', '六', '日'],
		weekSundayStartTextList: ['日', '一', '二', '三', '四', '五', '六'],
		monthTextList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		confirmText: '确认',
		selectedText: '已选',
		dayText: '天',
		beforeText: '最近',
		afterText: '未来',
		currentWeekText: '本周',
		currentMonthText: '本月',
		currentQuarterText: '本季度'
	},
	form: {
		submit: '提交'
	},
	fullKeyboard: {
		space: '空格'
	},
	list: {
		editText: '编辑',
		doneText: '完成',
		selectAllText: '全选'
	},
	pullRefresh: {
		pullingText: '下拉刷新',
		canReleaseText: '释放立即刷新',
		refreshingText: '刷新中...',
		successText: '刷新成功'
	},
	infiniteScroll: {
		loadingText: '加载中...',
		finishedText: '没有更多了',
		errorText: '加载失败，点击重试'
	},
	signature: {
		clearText: '清空',
		confirmText: '确认'
	},
	imagePreview: {
		loadFailedText: '加载失败'
	},
	imageList: {
		uploadFailedText: '上传失败',
		pendingText: '待上传'
	}
};

export default zh_CN;
