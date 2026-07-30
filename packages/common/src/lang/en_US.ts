import type { LangProps } from './index.js';

const en_US: LangProps = {
	common: {
		noData: 'No data',
		done: 'Done'
	},
	actionSheet: {
		cancelText: 'Cancel'
	},
	bottomSheet: {
		title: 'Title'
	},
	dialog: {
		title: 'Hint',
		content: 'Content',
		primaryText: 'Confirm',
		secondaryText: 'Cancel'
	},
	input: {
		pleaseInput: 'Please enter',
		pleaseSelect: 'Please select'
	},
	modal: {
		title: 'Title',
		content: 'Content',
		btnText: 'I see'
	},
	navBar: {
		title: 'Title'
	},
	pagination: {
		defaultOnlyOnePage: 'Only one page'
	},
	picker: {
		defaultTitle: 'Please choose',
		defaultCancel: 'Cancel',
		defaultConfirm: 'Confirm'
	},
	asyncPicker: {
		defaultTitle: 'Please choose',
		defaultCancel: 'Cancel',
		defaultConfirm: 'Confirm',
		defaultNext: 'Next',
		defaultPrev: 'Previous',
		defaultSelected: 'Selected'
	},
	rate: {
		error1: 'Value cannot be greater than Total!',
		error2: 'Total must be removed by 1!',
		error3: 'Value must be removed by 1 when non -semi -elected!',
		error4: 'Value must be removed by 0.5 when half elected!',
		error5: 'Width or height is less than 20, which makes the mobile terminal click difficult!'
	},
	timePicker: {
		defaultTitle: 'Please choose',
		defaultCancel: 'Cancel',
		defaultConfirm: 'Confirm',
		defaultYear: 'Year',
		defaultMonth: 'Month',
		defaultDay: 'Day',
		defaultHour: 'Hour',
		defaultMinute: 'Minute',
		defaultSecond: 'Second'
	},
	calendar: {
		weekTextList: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		weekSundayStartTextList: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		monthTextList: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		],
		confirmText: 'Confirm',
		selectedText: 'Selected',
		dayText: 'day',
		beforeText: 'Recent',
		afterText: 'Future',
		currentWeekText: 'This week',
		currentMonthText: 'This month',
		currentQuarterText: 'This quarter'
	},
	form: {
		submit: 'Submit'
	},
	fullKeyboard: {
		space: 'space'
	},
	list: {
		editText: 'Edit',
		doneText: 'Done',
		selectAllText: 'Select all'
	},
	pullRefresh: {
		pullingText: 'Pull to refresh',
		canReleaseText: 'Release to refresh',
		refreshingText: 'Refreshing...',
		successText: 'Refresh success'
	},
	infiniteScroll: {
		loadingText: 'Loading...',
		finishedText: 'No more data',
		errorText: 'Load failed, click to retry'
	},
	signature: {
		clearText: 'Clear',
		confirmText: 'Confirm'
	},
	imagePreview: {
		loadFailedText: 'Load failed'
	},
	imageList: {
		uploadFailedText: 'Upload failed',
		pendingText: 'Pending'
	}
};

export default en_US;
