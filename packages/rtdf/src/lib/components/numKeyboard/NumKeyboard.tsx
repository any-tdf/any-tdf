import React, { useEffect, useRef, useState } from 'react';
import Popup from '../popup';
import { zh_CN } from '../../lang';
import { useConfig } from '../config-provider';
import type { NumKeyboardKey, NumKeyboardProps } from '../../types';
import {
	resolveNumKeyboardCloseAction,
	resolveNumKeyboardCloseEmissionAction,
	resolveNumKeyboardDerived,
	resolveNumKeyboardInitialValue,
	resolveNumKeyboardInitialVisible,
	resolveNumKeyboardKeyFlow,
	resolveNumKeyboardStateOptions,
	resolveNumKeyboardVisibleChangeAction,
	type NumKeyboardCloseAction
} from '@any-tdf/common/derived/numKeyboard';
import { numKeyboardCloseSvg, numKeyboardDeleteSvg } from '@any-tdf/common/svg/numKeyboard';
import { splitPopupCallbacks } from '@any-tdf/common/derived/props';
import { SvgIcon } from '../utils/SvgIcon';

/**
 * NumKeyboard 数字键盘组件
 * Numeric keypad component for number input
 *
 * 支持数字输入、金额输入、小数点、删除等功能
 * Supports number input, amount input, decimal point, delete and other functions
 */
export const NumKeyboard: React.FC<NumKeyboardProps> = (props) => {
	const {
		type = 'button',
		value,
		visible,
		height = '12',
		space = '2',
		p = '2',
		reverse = false,
		done = true,
		dot = true,
		close = false,
		doneText: doneTextProp,
		doneDisabled = false,
		radius,
		clear = false,
		preview = false,
		previewMask = false,
		panelClass = '',
		keyClass = '',
		doneClass = '',
		popup = {},
		onClick,
		onOpen,
		onClose
	} = props;
	const { locale } = useConfig();
	const commonLang = locale?.common || zh_CN.common;
	const initialValue = resolveNumKeyboardInitialValue(value);
	const initialVisible = resolveNumKeyboardInitialVisible(visible);
	const [internalValue, setInternalValue] = useState(initialValue);
	const [internalVisible, setInternalVisible] = useState(initialVisible);
	const currentValue = internalValue;
	const currentVisible = internalVisible;
	const { popupProps, popupOnClose } = splitPopupCallbacks(popup);
	// 公共派生层只处理 NumKeyboard 文案、布局、class、预览和 Popup 参数，事件留在组件内。
	// Shared derived layer only handles NumKeyboard text, layout, classes, preview and Popup params; events stay in the component.
	const keyboardState = resolveNumKeyboardDerived(
		resolveNumKeyboardStateOptions({
			props: {
				type,
				height,
				space,
				p,
				reverse,
				done,
				dot,
				close,
				doneText: doneTextProp,
				radius,
				preview,
				previewMask,
				panelClass,
				keyClass,
				doneClass,
				popup: popup === null ? null : popupProps
			},
			value: currentValue,
			doneDisabled,
			defaults: commonLang
		})
	);
	const previousVisibleRef = useRef<boolean | undefined>(undefined);
	const skipNextCloseEffectRef = useRef(false);
	const renderSvg = (svg: typeof numKeyboardDeleteSvg) => (
		<>
			{/* 公共 NumKeyboard SVG 数据在 common 中维护。 / Shared NumKeyboard SVG data lives in common. */}
			<SvgIcon svg={svg} width={keyboardState.svgSize} height={keyboardState.svgSize} className={keyboardState.svgClass} />
		</>
	);

	const emitClose = () => {
		onClose?.();
	};

	const closeKeyboard = (action: NumKeyboardCloseAction = resolveNumKeyboardCloseAction()) => {
		// 公共 close action 只返回可见状态和 close 回调决策，跳过重复 effect 的 ref 留在组件层。
		// Shared close action only returns visibility and close callback decisions; the duplicate-effect skip ref stays in the component layer.
		if (!action.shouldClose) return;
		skipNextCloseEffectRef.current = true;
		setInternalVisible(action.nextVisible);
		if (action.shouldEmitClose) emitClose();
	};
	const handlePopupClose = () => {
		closeKeyboard();
		popupOnClose?.();
	};

	// 点击按键事件 / Click the button event
	const clickFunc = (key: NumKeyboardKey) => {
		// 公共 flow 返回值更新和关闭动作，事件触发仍保留在组件内。
		// Shared flow returns value updates and close actions; event dispatch stays inside the component.
		const flow = resolveNumKeyboardKeyFlow({ value: currentValue, key, doneDisabled });
		if (flow.shouldUpdateValue) {
			setInternalValue(flow.nextValue);
		}

		// 派发事件，传递出两个参数，输入的数字字符串和本次点击的类型
		// Dispatch events, pass out two parameters, the input number string and the type of this click
		onClick?.(key);

		if (flow.closeAction) {
			closeKeyboard(flow.closeAction);
		}
	};

	// 激活与关闭键盘事件 / Activate and close the keyboard event
	useEffect(() => {
		// 公共 action 只判断可见性回调和清空策略，副作用和状态写入仍在组件层。
		// Shared action only decides visibility callbacks and clear policy; side effects and state writes stay in the component layer.
		const action = resolveNumKeyboardVisibleChangeAction({
			visible: currentVisible,
			previousVisible: previousVisibleRef.current,
			clear,
			keyboardHeight: keyboardState.keyboardHeight
		});
		if (action.shouldSkip) {
			return;
		}
		previousVisibleRef.current = action.nextPreviousVisible;
		if (action.shouldClearValue) {
			setInternalValue('');
		}
		if (action.shouldEmitOpen) {
			onOpen?.(action.openHeight);
		}
		if (action.shouldEmitClose) {
			const closeEmissionAction = resolveNumKeyboardCloseEmissionAction({
				shouldEmitClose: action.shouldEmitClose,
				skipNextCloseEmission: skipNextCloseEffectRef.current
			});
			skipNextCloseEffectRef.current = closeEmissionAction.nextSkipNextCloseEmission;
			if (closeEmissionAction.shouldEmitClose) emitClose();
		}
	}, [currentVisible, clear, keyboardState.keyboardHeight, onClose, onOpen]);

	// 监听外部 value 变化
	useEffect(() => {
		setInternalValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		setInternalVisible(resolveNumKeyboardInitialVisible(visible));
	}, [visible]);

	const renderKeyboard = () => (
		<div className={keyboardState.panelClass}>
			{preview ? (
				<div className={keyboardState.previewClass}>
					{keyboardState.previewState.showMask
						? keyboardState.previewState.maskIndexes.map((index) => (
								<span key={`${index}-${currentValue.length}`} className={keyboardState.previewState.dotClass} />
							))
						: keyboardState.previewState.displayValue}
				</div>
			) : null}
			<div className={keyboardState.gridClass}>
				{keyboardState.keyRows.topKeys.map((item) => (
					<button key={item} type="button" className={keyboardState.keyClasses[item]} onClick={() => clickFunc(item)}>
						{item}
					</button>
				))}

				{done && (
					<button type="button" className={keyboardState.keyClasses.delete} onClick={() => clickFunc('delete')} aria-label="delete">
						{renderSvg(numKeyboardDeleteSvg)}
					</button>
				)}

				{keyboardState.keyRows.middleKeys.map((item) => (
					<button key={item} type="button" className={keyboardState.keyClasses[item]} onClick={() => clickFunc(item)}>
						{item}
					</button>
				))}

				{done && (
					<button type="button" className={keyboardState.doneKeyClass} onClick={() => clickFunc('done')} disabled={doneDisabled}>
						{keyboardState.doneText}
					</button>
				)}

				{keyboardState.keyRows.bottomKeys.map((item) => (
					<button key={item} type="button" className={keyboardState.keyClasses[item]} onClick={() => clickFunc(item)}>
						{item}
					</button>
				))}

				{dot && (
					<button type="button" className={keyboardState.keyClasses['.']} onClick={() => clickFunc('.')}>
						.
					</button>
				)}

				{keyboardState.showCloseKey && (
					<button type="button" className={keyboardState.keyClasses.close} onClick={() => clickFunc('close')} aria-label="close">
						{renderSvg(numKeyboardCloseSvg)}
					</button>
				)}

				<button type="button" className={keyboardState.zeroKeyClass} onClick={() => clickFunc('0')}>
					0
				</button>

				{!done && (
					<button type="button" className={keyboardState.keyClasses.delete} onClick={() => clickFunc('delete')} aria-label="delete">
						{renderSvg(numKeyboardDeleteSvg)}
					</button>
				)}
			</div>
		</div>
	);

	if (!keyboardState.usePopup) {
		return renderKeyboard();
	}

	return (
		<Popup visible={currentVisible} {...keyboardState.popupProps} onClose={handlePopupClose}>
			{renderKeyboard()}
		</Popup>
	);
};

export default NumKeyboard;
