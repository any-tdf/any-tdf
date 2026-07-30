import type { LangProps } from './index.js';

const ja_JP: LangProps = {
	common: {
		noData: 'データがありません',
		done: '完了'
	},
	actionSheet: {
		cancelText: 'キャンセル'
	},
	bottomSheet: {
		title: 'タイトル'
	},
	dialog: {
		title: '注意',
		content: '内容',
		primaryText: '確認する',
		secondaryText: 'キャンセル'
	},
	input: {
		pleaseInput: '入力してください',
		pleaseSelect: '選択してください'
	},
	modal: {
		title: 'タイトル',
		content: '内容',
		btnText: '了解'
	},
	navBar: {
		title: 'タイトル'
	},
	pagination: {
		defaultOnlyOnePage: '1 ページのみ'
	},
	picker: {
		defaultTitle: '選んでください',
		defaultCancel: 'キャンセル',
		defaultConfirm: '確認'
	},
	asyncPicker: {
		defaultTitle: '選んでください',
		defaultCancel: 'キャンセル',
		defaultConfirm: '確認',
		defaultNext: '次へ',
		defaultPrev: '前へ',
		defaultSelected: '選択済み'
	},
	rate: {
		error1: 'value は total を上回ることはできません！',
		error2: 'total は 1 で割り切れる必要があります！',
		error3: '半選択時、value は 1 で割り切れる必要があります！',
		error4: '半選択時、value は 0.5 で割り切れる必要があります！',
		error5: 'width または height が 20 未満の場合、モバイル端末でのクリックが困難になる可能性があります！'
	},
	timePicker: {
		defaultTitle: '選んでください',
		defaultCancel: 'キャンセル',
		defaultConfirm: '確認',
		defaultYear: '年',
		defaultMonth: '月',
		defaultDay: '日',
		defaultHour: '時',
		defaultMinute: '分',
		defaultSecond: '秒'
	},
	calendar: {
		weekTextList: ['月', '火', '水', '木', '金', '土', '日'],
		weekSundayStartTextList: ['日', '月', '火', '水', '木', '金', '土'],
		monthTextList: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'],
		confirmText: '確認',
		selectedText: '選択済み',
		dayText: '日',
		beforeText: '最近',
		afterText: '未来',
		currentWeekText: '今週',
		currentMonthText: '今月',
		currentQuarterText: '今四半期'
	},
	form: {
		submit: '送信'
	},
	fullKeyboard: {
		space: 'スペース'
	},
	list: {
		editText: '編集',
		doneText: '完了',
		selectAllText: '全選択'
	},
	signature: {
		clearText: 'クリア',
		confirmText: '確認'
	},
	imagePreview: {
		loadFailedText: '読み込みに失敗しました'
	},
	imageList: {
		uploadFailedText: 'アップロードに失敗しました',
		pendingText: '保留中'
	}
};

export default ja_JP;
