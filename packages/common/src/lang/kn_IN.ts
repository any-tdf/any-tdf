import type { LangProps } from './index.js';

const kn_IN: LangProps = {
	common: {
		noData: 'ಡೇಟಾ ಇಲ್ಲ',
		done: 'ಮುಗಿದಿದೆ'
	},
	actionSheet: {
		cancelText: 'ರದ್ದುಮಾಡಿ'
	},
	bottomSheet: {
		title: 'ಶೀರ್ಷಿಕೆ'
	},
	dialog: {
		title: 'ಎಚ್ಚರಿಕೆ',
		content: 'ವಿಷಯ',
		primaryText: 'ಪ್ರಾಥಮಿಕ',
		secondaryText: 'ರದ್ದುಪಡಿಸಿ'
	},
	input: {
		pleaseInput: 'ದಯವಿಟ್ಟು ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ನಮೂದಿಸಿ',
		pleaseSelect: 'ದಯವಿಟ್ಟು ಆಯ್ಕೆಮಾಡಿ'
	},
	modal: {
		title: 'ಶೀರ್ಷಿಕೆ',
		content: 'ವಿಷಯ',
		btnText: 'ಗ್ರಹಿಸಿ'
	},
	navBar: {
		title: 'ಶೀರ್ಷಿಕೆ'
	},
	pagination: {
		defaultOnlyOnePage: 'ಒಂದು ಪುಟ ಮಾತ್ರ'
	},
	picker: {
		defaultTitle: 'ಆಯ್ಕೆ ಮಾಡಿ',
		defaultCancel: 'ರದ್ದುಮಾಡಿ',
		defaultConfirm: 'ದೃಢೀಕರಿಸು'
	},
	asyncPicker: {
		defaultTitle: 'ಆಯ್ಕೆ ಮಾಡಿ',
		defaultCancel: 'ರದ್ದುಮಾಡಿ',
		defaultConfirm: 'ದೃಢೀಕರಿಸು',
		defaultNext: 'ಮುಂದಿನ',
		defaultPrev: 'ಹಿಂದಿನ',
		defaultSelected: 'ಆಯ್ಕೆಯಾಗಿದೆ'
	},
	rate: {
		error1: 'ಮೊತ್ತವನ್ನು ಕಡಿಮೆಗೊಳಿಸಿ!',
		error2: 'ಮೊತ್ತವನ್ನು 1 ನಿಂದ ವಿಭಜಿಸಬೇಕು!',
		error3: 'ಅಥವಾ ಅನುಸ್ತಾಪಿಸಲಾಗದ ಸಂದರ್ಭದಲ್ಲಿ, ಮೊತ್ತವನ್ನು 1 ನಿಂದ ವಿಭಜಿಸಬೇಕು!',
		error4: 'ಅಥವಾ ಒಂದು ಸ್ಥಾನವನ್ನು ನೀಡಬೇಕಾದ ಸಂದರ್ಭದಲ್ಲಿ, ಮೊತ್ತವನ್ನು 0.5 ರವರೆಗೆ ವಿಭಜಿಸಬೇಕು!',
		error5: 'ಗಾತ್ರದ ಅಳತೆ 20 ಕ್ಕಿಂತ ಕಡಿಮೆಯಿರಬೇಕು, ಮೊಬೈಲ್ ಟೆರ್ಮಿನಲ್‌ನಲ್ಲಿ ಗುರುತಿಸುವುದು ಮತ್ತು ನೀರ್ಗಲ್ಲಿನ ಮೂಲಕ ಬೇಯಿಸುವುದು ಸಾಧ್ಯವಿಲ್ಲ!'
	},
	timePicker: {
		defaultTitle: 'ಆಯ್ದಿಸಿ',
		defaultCancel: 'ರದ್ದುಮಾಡಿ',
		defaultConfirm: 'ದೃಢೀಕರಿಸು',
		defaultYear: 'ವರ್ಷ',
		defaultMonth: 'ತಿಂಗಳು',
		defaultDay: 'ದಿನ',
		defaultHour: 'ಘಂಟೆ',
		defaultMinute: 'ನಿಮಿಷ',
		defaultSecond: 'ಸೆಕೆಂಡ್'
	},
	calendar: {
		weekTextList: ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'],
		weekSundayStartTextList: ['ಶನಿ', 'ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ'],
		monthTextList: ['ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್'],
		confirmText: 'ದೃಢೀಕರಿಸು',
		selectedText: 'ಆಯ್ದಲ್ಲಿದೆ',
		dayText: 'ದಿನ',
		beforeText: 'ಕೊನೆಯದೊಂದು',
		afterText: 'ಮುಂದೆ',
		currentWeekText: 'ಈ ವಾರ',
		currentMonthText: 'ಈ ತಿಂಗಳು',
		currentQuarterText: 'ಈ ತ್ರೈಮಾಸಿಕ'
	},
	form: {
		submit: 'ಸಲ್ಲಿಸಿ'
	},
	fullKeyboard: {
		space: 'ಸ್ಪೇಸ್'
	},
	list: {
		editText: 'ಸಂಪಾದನೆ',
		doneText: 'ಮುಗಿದಿದೆ',
		selectAllText: 'ಎಲ್ಲಾ ಆಯ್ಕೆಮಾಡಿ'
	},
	signature: {
		clearText: 'ತೆರವುಗೊಳಿಸಿ',
		confirmText: 'ದೃಢೀಕರಿಸು'
	},
	imagePreview: {
		loadFailedText: 'ಲೋಡ್ ವಿಫಲವಾಗಿದೆ'
	},
	imageList: {
		uploadFailedText: 'ಅಪ್‌ಲೋಡ್ ವಿಫಲವಾಗಿದೆ',
		pendingText: 'ಬಾಕಿ ಇದೆ'
	}
};

export default kn_IN;
