import type { LangProps } from './index.js';

const zh_HK: LangProps = {
	common: {
		noData: '暫無數據',
		done: '完成'
	},
	actionSheet: {
		cancelText: '取消'
	},
	bottomSheet: {
		title: '標題'
	},
	dialog: {
		title: '提示',
		content: '內容',
		primaryText: '確定',
		secondaryText: '取消'
	},
	input: {
		pleaseInput: '請輸入',
		pleaseSelect: '請選擇'
	},
	modal: {
		title: '標題',
		content: '內容',
		btnText: '我知道了'
	},
	navBar: {
		title: '標題'
	},
	pagination: {
		defaultOnlyOnePage: '只有一頁'
	},
	picker: {
		defaultTitle: '請選擇',
		defaultCancel: '取消',
		defaultConfirm: '確定'
	},
	asyncPicker: {
		defaultTitle: '請選擇',
		defaultCancel: '取消',
		defaultConfirm: '確定',
		defaultNext: '下一步',
		defaultPrev: '上一步',
		defaultSelected: '已選'
	},
	rate: {
		error1: 'value 不能大於 total !',
		error2: 'total 必須能被 1 整除！',
		error3: '非半選時 value 必須能被 1 整除！',
		error4: '半選時 value 必須能被 0.5 整除！',
		error5: 'width 或 height 小於 20 會使移動端點擊困難！'
	},
	timePicker: {
		defaultTitle: '請選擇',
		defaultCancel: '取消',
		defaultConfirm: '確定',
		defaultYear: '年',
		defaultMonth: '月',
		defaultDay: '日',
		defaultHour: '時',
		defaultMinute: '分',
		defaultSecond: '秒'
	},
	calendar: {
		weekTextList: ['一', '二', '三', '四', '五', '六', '日'],
		weekSundayStartTextList: ['日', '一', '二', '三', '四', '五', '六'],
		monthTextList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		confirmText: '確認',
		selectedText: '已選',
		dayText: '天',
		beforeText: '最近',
		afterText: '未來',
		currentWeekText: '本週',
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
		editText: '編輯',
		doneText: '完成',
		selectAllText: '全選'
	},
	signature: {
		clearText: '清除',
		confirmText: '確定'
	},
	imagePreview: {
		loadFailedText: '載入失敗'
	},
	imageList: {
		uploadFailedText: '上傳失敗',
		pendingText: '待上傳'
	}
};

export default zh_HK;
