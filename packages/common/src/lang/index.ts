export { default as ar_EG } from './ar_EG.js';
export { default as az_AZ } from './az_AZ.js';
export { default as bg_BG } from './bg_BG.js';
export { default as bn_BD } from './bn_BD.js';
export { default as ca_ES } from './ca_ES.js';
export { default as cs_CZ } from './cs_CZ.js';
export { default as da_DK } from './da_DK.js';
export { default as de_DE } from './de_DE.js';
export { default as el_GR } from './el_GR.js';
export { default as en_GB } from './en_GB.js';
export { default as en_US } from './en_US.js';
export { default as es_ES } from './es_ES.js';
export { default as et_EE } from './et_EE.js';
export { default as eu_ES } from './eu_ES.js';
export { default as fa_IR } from './fa_IR.js';
export { default as fi_FI } from './fi_FI.js';
export { default as fr_BE } from './fr_BE.js';
export { default as fr_CA } from './fr_CA.js';
export { default as fr_FR } from './fr_FR.js';
export { default as ga_IE } from './ga_IE.js';
export { default as gl_ES } from './gl_ES.js';
export { default as he_IL } from './he_IL.js';
export { default as hi_IN } from './hi_IN.js';
export { default as hr_HR } from './hr_HR.js';
export { default as hu_HU } from './hu_HU.js';
export { default as hy_AM } from './hy_AM.js';
export { default as id_ID } from './id_ID.js';
export { default as is_IS } from './is_IS.js';
export { default as it_IT } from './it_IT.js';
export { default as ja_JP } from './ja_JP.js';
export { default as ka_GE } from './ka_GE.js';
export { default as kk_KZ } from './kk_KZ.js';
export { default as km_KH } from './km_KH.js';
export { default as kmr_IQ } from './kmr_IQ.js';
export { default as kn_IN } from './kn_IN.js';
export { default as ko_KR } from './ko_KR.js';
export { default as lt_LT } from './lt_LT.js';
export { default as lv_LV } from './lv_LV.js';
export { default as mk_MK } from './mk_MK.js';
export { default as ml_IN } from './ml_IN.js';
export { default as mn_MN } from './mn_MN.js';
export { default as ms_MY } from './ms_MY.js';
export { default as nb_NO } from './nb_NO.js';
export { default as ne_NP } from './ne_NP.js';
export { default as nl_BE } from './nl_BE.js';
export { default as nl_NL } from './nl_NL.js';
export { default as pl_PL } from './pl_PL.js';
export { default as pt_BR } from './pt_BR.js';
export { default as pt_PT } from './pt_PT.js';
export { default as ro_RO } from './ro_RO.js';
export { default as ru_RU } from './ru_RU.js';
export { default as si_LK } from './si_LK.js';
export { default as sk_SK } from './sk_SK.js';
export { default as sl_SI } from './sl_SI.js';
export { default as sr_RS } from './sr_RS.js';
export { default as sv_SE } from './sv_SE.js';
export { default as ta_IN } from './ta_IN.js';
export { default as th_TH } from './th_TH.js';
export { default as tk_TK } from './tk_TK.js';
export { default as tr_TR } from './tr_TR.js';
export { default as uk_UA } from './uk_UA.js';
export { default as ur_PK } from './ur_PK.js';
export { default as vi_VN } from './vi_VN.js';
export { default as zh_CN } from './zh_CN.js';
export { default as zh_HK } from './zh_HK.js';
export { default as zh_TW } from './zh_TW.js';

export type LangProps = {
	common: {
		noData: string;
		done: string;
	};
	actionSheet: {
		cancelText: string;
	};
	bottomSheet: {
		title: string;
	};
	dialog: {
		title: string;
		content: string;
		primaryText: string;
		secondaryText: string;
	};
	input: {
		pleaseInput: string;
		pleaseSelect: string;
	};
	modal: {
		title: string;
		content: string;
		btnText: string;
	};
	navBar: {
		title: string;
	};
	pagination: {
		defaultOnlyOnePage: string;
	};
	picker: {
		defaultTitle: string;
		defaultCancel: string;
		defaultConfirm: string;
	};
	asyncPicker: {
		defaultTitle: string;
		defaultCancel: string;
		defaultConfirm: string;
		defaultNext: string;
		defaultPrev: string;
		defaultSelected: string;
	};
	rate: {
		error1: string;
		error2: string;
		error3: string;
		error4: string;
		error5: string;
	};
	timePicker: {
		defaultTitle: string;
		defaultCancel: string;
		defaultConfirm: string;
		defaultYear: string;
		defaultMonth: string;
		defaultDay: string;
		defaultHour: string;
		defaultMinute: string;
		defaultSecond: string;
	};
	calendar: {
		weekTextList: string[];
		weekSundayStartTextList: string[];
		monthTextList: string[];
		confirmText: string;
		selectedText: string;
		dayText: string;
		beforeText: string;
		afterText: string;
		currentWeekText: string;
		currentMonthText: string;
		currentQuarterText: string;
	};
	form: {
		submit: string;
	};
	fullKeyboard: {
		space: string;
	};
	list: {
		editText: string;
		doneText: string;
		selectAllText: string;
	};
	pullRefresh?: {
		pullingText: string;
		canReleaseText: string;
		refreshingText: string;
		successText: string;
	};
	infiniteScroll?: {
		loadingText: string;
		finishedText: string;
		errorText: string;
	};
	signature: {
		clearText: string;
		confirmText: string;
	};
	imagePreview: {
		loadFailedText: string;
	};
	imageList: {
		uploadFailedText: string;
		pendingText: string;
	};
};
