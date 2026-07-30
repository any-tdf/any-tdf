import type { LangProps } from './index.js';

const ko_KR: LangProps = {
	common: {
		noData: '데이터가 없습니다',
		done: '완료'
	},
	actionSheet: {
		cancelText: '취소'
	},
	bottomSheet: {
		title: '제목'
	},
	dialog: {
		title: '경고',
		content: '내용',
		primaryText: '확인',
		secondaryText: '취소'
	},
	input: {
		pleaseInput: '비밀번호를 입력해주세요',
		pleaseSelect: '선택해 주세요'
	},
	modal: {
		title: '제목',
		content: '내용',
		btnText: '확인'
	},
	navBar: {
		title: '제목'
	},
	pagination: {
		defaultOnlyOnePage: '한 페이지만 있습니다'
	},
	picker: {
		defaultTitle: '선택해주세요',
		defaultCancel: '취소',
		defaultConfirm: '확인'
	},
	asyncPicker: {
		defaultTitle: '선택해주세요',
		defaultCancel: '취소',
		defaultConfirm: '확인',
		defaultNext: '다음',
		defaultPrev: '이전',
		defaultSelected: '선택됨'
	},
	rate: {
		error1: '합계를 감소시키십시오!',
		error2: '합계를 1 로 나누십시오!',
		error3: '또는 합계를 1 로 나눌 수 없는 경우',
		error4: '또는 값이 0.5 미만인 경우!',
		error5: '측정 값은 20 보다 작아야합니다. 모바일 단말기에서 식별하거나 물을 통해 측정할 수 없습니다!'
	},
	timePicker: {
		defaultTitle: '선택해주세요',
		defaultCancel: '취소',
		defaultConfirm: '확인',
		defaultYear: '년',
		defaultMonth: '월',
		defaultDay: '일',
		defaultHour: '시간',
		defaultMinute: '분',
		defaultSecond: '초'
	},
	calendar: {
		weekTextList: ['일', '월', '화', '수', '목', '금', '토'],
		weekSundayStartTextList: ['토', '일', '월', '화', '수', '목', '금'],
		monthTextList: ['1 월', '2 월', '3 월', '4 월', '5 월', '6 월', '7 월', '8 월', '9 월', '10 월', '11 월', '12 월'],
		confirmText: '확인',
		selectedText: '선택됨',
		dayText: '일',
		beforeText: '이전',
		afterText: '이후',
		currentWeekText: '이번 주',
		currentMonthText: '이번 달',
		currentQuarterText: '이번 분기'
	},
	form: {
		submit: '제출'
	},
	fullKeyboard: {
		space: '스페이스'
	},
	list: {
		editText: '편집',
		doneText: '완료',
		selectAllText: '전체 선택'
	},
	signature: {
		clearText: '지우기',
		confirmText: '확인'
	},
	imagePreview: {
		loadFailedText: '로드 실패'
	},
	imageList: {
		uploadFailedText: '업로드 실패',
		pendingText: '대기 중'
	}
};

export default ko_KR;
