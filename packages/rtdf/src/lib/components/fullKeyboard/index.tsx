import { useEffect, useRef, useState } from 'react';
import Popup from '../popup';
import { zh_CN } from '../../lang';
import { useConfig } from '../config-provider';
import type { FullKeyboardProps } from '../../types';
import { splitPopupCallbacks } from '@any-tdf/common/derived/props';
import {
	fullKeyboardLetterRows,
	fullKeyboardNumberRow,
	fullKeyboardSymbolRows,
	resolveFullKeyboardCaseToggleAction,
	resolveFullKeyboardCloseAction,
	resolveFullKeyboardDerived,
	resolveFullKeyboardInitialValue,
	resolveFullKeyboardInitialVisible,
	resolveFullKeyboardInputKey,
	resolveFullKeyboardKeyFlow,
	resolveFullKeyboardStateOptions,
	resolveFullKeyboardSymbolModeToggleAction,
	resolveFullKeyboardTexts,
	resolveFullKeyboardUsePopup,
	resolveFullKeyboardVisibleChangeFlow,
	type FullKeyboardCloseAction
} from '@any-tdf/common/derived/fullKeyboard';
import { fullKeyboardShiftSvg } from '@any-tdf/common/svg/fullKeyboard';
import { numKeyboardDeleteSvg } from '@any-tdf/common/svg/numKeyboard';
import { SvgIcon } from '../utils/SvgIcon';

const FullKeyboard: React.FC<FullKeyboardProps> = (props) => {
	const {
		value: valueProp,
		visible: visibleProp,
		type = 'button',
		mode = 'full',
		done = true,
		doneText: doneTextProp,
		doneDisabled = false,
		radius = '',
		preview = false,
		previewMask = false,
		panelClass = '',
		keyClass: keyClassProp = '',
		doneClass = '',
		popup = {},
		onClick,
		onOpen,
		onClose
	} = props;
	const { locale } = useConfig();
	const commonLang = locale?.common || zh_CN.common;
	const fullKeyboardLang = locale?.fullKeyboard || zh_CN.fullKeyboard;
	const keyboardTexts = resolveFullKeyboardTexts({
		doneText: doneTextProp,
		defaults: { common: commonLang, fullKeyboard: fullKeyboardLang }
	});
	const initialValue = resolveFullKeyboardInitialValue(valueProp);
	const initialVisible = resolveFullKeyboardInitialVisible(visibleProp);
	const [innerValue, setInnerValue] = useState(initialValue);
	const [innerVisible, setInnerVisible] = useState(initialVisible);
	const [isUpperCase, setIsUpperCase] = useState(false);
	const [isSymbolMode, setIsSymbolMode] = useState(false);

	const usePopup = resolveFullKeyboardUsePopup(popup);
	const { popupProps, popupOnClose } = splitPopupCallbacks(popup);
	const value = innerValue;
	const visible = innerVisible;
	const previousVisibleRef = useRef<boolean | undefined>(undefined);
	const skipNextCloseEffectRef = useRef(false);

	const [letterRow1, letterRow2, letterRow3] = fullKeyboardLetterRows;
	const numberRow = fullKeyboardNumberRow;
	const symbolRow4 = fullKeyboardSymbolRows[3];

	// 公共派生层只处理 FullKeyboard 的按键、面板和布局 class，输入事件留在组件内。
	// Shared derived layer only handles FullKeyboard key, panel and layout classes; input events stay in the component.
	const keyboardState = resolveFullKeyboardDerived(
		resolveFullKeyboardStateOptions({
			props: {
				doneClass,
				done,
				keyClass: keyClassProp,
				mode,
				panelClass,
				popup: popupProps,
				preview,
				previewMask,
				radius,
				type
			},
			doneDisabled,
			isSymbolMode,
			isUpperCase,
			value
		})
	);

	const updateValue = (nextValue: string) => {
		setInnerValue(nextValue);
	};
	const emitClick = (key: string) => {
		onClick?.(key);
	};
	const emitOpen = (height: number) => {
		onOpen?.(height);
	};
	const emitClose = () => {
		onClose?.();
	};
	const closeKeyboard = (action: FullKeyboardCloseAction = resolveFullKeyboardCloseAction()) => {
		// 公共 close action 只返回可见状态和 close 回调决策，跳过重复 effect 的 ref 留在组件层。
		// Shared close action only returns visibility and close callback decisions; the duplicate-effect skip ref stays in the component layer.
		if (!action.shouldClose) return;
		skipNextCloseEffectRef.current = true;
		setInnerVisible(action.nextVisible);
		if (action.shouldEmitClose) emitClose();
	};
	const handlePopupClose = () => {
		closeKeyboard();
		popupOnClose?.();
	};

	const clickKey = (key: string) => {
		// 公共 flow 返回输入值、事件键和关闭动作，事件派发仍留在组件层。
		// Shared flow returns input value, emit key and close action; event dispatch stays in the component layer.
		const flow = resolveFullKeyboardKeyFlow({ value, key, isUpperCase, doneDisabled });
		if (flow.shouldUpdateValue) {
			updateValue(flow.nextValue);
		}
		if (flow.shouldEmit) {
			emitClick(flow.emitKey);
		}
		if (flow.closeAction) {
			closeKeyboard(flow.closeAction);
		}
	};

	const clickDelete = () => {
		clickKey('delete');
	};

	const clickSpace = () => {
		clickKey(' ');
	};

	const clickDone = () => {
		clickKey('done');
	};

	const toggleCase = () => setIsUpperCase((prev) => resolveFullKeyboardCaseToggleAction(prev).nextUpperCase);
	const toggleSymbolMode = () => setIsSymbolMode((prev) => resolveFullKeyboardSymbolModeToggleAction(prev).nextSymbolMode);

	const renderKeyButton = (key: string, className = keyboardState.keyButtonClass) => (
		<button key={key} type="button" className={className} onClick={() => clickKey(key)}>
			{resolveFullKeyboardInputKey(key, isUpperCase)}
		</button>
	);

	useEffect(() => {
		// 公共 visibility flow 只判断可见性回调和关闭去重，副作用与 ref 写入仍在组件层。
		// Shared visibility flow only decides visibility callbacks and close dedupe; side effects and ref writes stay in the component layer.
		const flow = resolveFullKeyboardVisibleChangeFlow({
			visible,
			previousVisible: previousVisibleRef.current,
			keyboardHeight: keyboardState.keyboardHeight,
			skipNextCloseEmission: skipNextCloseEffectRef.current
		});
		if (flow.shouldSkip) {
			return;
		}
		previousVisibleRef.current = flow.nextPreviousVisible;
		if (flow.shouldEmitOpen) {
			emitOpen(flow.openHeight);
		}
		if (flow.rawShouldEmitClose) {
			skipNextCloseEffectRef.current = flow.nextSkipNextCloseEmission;
			if (flow.shouldEmitClose) emitClose();
		}
	}, [keyboardState.keyboardHeight, visible]);

	useEffect(() => {
		setInnerValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		setInnerVisible(resolveFullKeyboardInitialVisible(visibleProp));
	}, [visibleProp]);

	const renderLetterRows = () => (
		<>
			<div className={keyboardState.gridRow10Class}>{letterRow1.map((key) => renderKeyButton(key))}</div>
			<div className={keyboardState.gridRow9PxClass}>{letterRow2.map((key) => renderKeyButton(key))}</div>
			<div className={keyboardState.flexRowClass}>
				<button type="button" className={keyboardState.shiftButtonClass} onClick={toggleCase} aria-label="shift">
					{/* 公共 FullKeyboard SVG 数据在 common 中维护，大小写状态仍在组件内。 / Shared FullKeyboard SVG data lives in common while case state stays here. */}
					<SvgIcon svg={fullKeyboardShiftSvg} width={18} height={16} className={keyboardState.iconClass} />
				</button>
				<div className={keyboardState.innerGrid7Class}>{letterRow3.map((key) => renderKeyButton(key))}</div>
				<button type="button" className={keyboardState.deleteButtonClass} onClick={clickDelete} aria-label="delete">
					<SvgIcon svg={numKeyboardDeleteSvg} width={22} height={22} className={keyboardState.iconClass} />
				</button>
			</div>
		</>
	);

	const renderKeyboard = () => (
		<div className={keyboardState.panelClass}>
			{preview ? (
				<div className={keyboardState.previewClass}>
					{keyboardState.previewState.showMask
						? keyboardState.previewState.maskIndexes.map((index) => (
								<span key={`dot-${index}`} className={keyboardState.previewState.dotClass} />
							))
						: keyboardState.previewState.displayValue}
				</div>
			) : null}

			{keyboardState.layout.showLetterMode ? (
				<>
					{renderLetterRows()}
					<div className={keyboardState.bottomRowClass}>
						<button type="button" className={keyboardState.flex1KeyClass} onClick={clickSpace}>
							<span className={keyboardState.spaceTextClass}>{keyboardTexts.spaceText}</span>
						</button>
						{keyboardState.layout.showDoneButton ? (
							<button type="button" className={keyboardState.doneButtonClass} disabled={doneDisabled} onClick={clickDone}>
								{keyboardTexts.doneText}
							</button>
						) : null}
					</div>
				</>
			) : keyboardState.layout.showLetterNumberMode ? (
				<>
					<div className={keyboardState.gridRow10Class}>{numberRow.map((key) => renderKeyButton(key))}</div>
					{renderLetterRows()}
					<div className={keyboardState.bottomRowClass}>
						<button type="button" className={keyboardState.flex1KeyClass} onClick={clickSpace}>
							<span className={keyboardState.spaceTextClass}>{keyboardTexts.spaceText}</span>
						</button>
						{keyboardState.layout.showDoneButton ? (
							<button type="button" className={keyboardState.doneButtonClass} disabled={doneDisabled} onClick={clickDone}>
								{keyboardTexts.doneText}
							</button>
						) : null}
					</div>
				</>
			) : (
				<>
					{keyboardState.layout.showSymbolRows ? (
						<>
							{keyboardState.layout.symbolMainRows.map((row, rowIndex) => (
								<div key={rowIndex} className={keyboardState.gridRow10Class}>
									{row.map((key) => renderKeyButton(key))}
								</div>
							))}
							<div className={keyboardState.flexRowClass}>
								<div className={keyboardState.innerGrid9Class}>{symbolRow4.map((key) => renderKeyButton(key))}</div>
								<button type="button" className={keyboardState.deleteButtonClass} onClick={clickDelete} aria-label="delete">
									<SvgIcon svg={numKeyboardDeleteSvg} width={22} height={22} className={keyboardState.iconClass} />
								</button>
							</div>
						</>
					) : (
						renderLetterRows()
					)}
					<div className={keyboardState.bottomRowClass}>
						<button type="button" className={keyboardState.symbolToggleButtonClass} onClick={toggleSymbolMode}>
							{keyboardState.symbolToggleText}
						</button>
						{keyboardState.layout.bottomSymbolKeys.map((key) => renderKeyButton(key, keyboardState.symbolKeyClass))}
						<button type="button" className={keyboardState.flex1KeyClass} onClick={clickSpace}>
							<span className={keyboardState.spaceTextClass}>{keyboardTexts.spaceText}</span>
						</button>
						{keyboardState.layout.showDoneButton ? (
							<button type="button" className={keyboardState.doneButtonClass} disabled={doneDisabled} onClick={clickDone}>
								{keyboardTexts.doneText}
							</button>
						) : null}
					</div>
				</>
			)}
		</div>
	);

	if (!usePopup) {
		return renderKeyboard();
	}

	return (
		<Popup visible={visible} {...keyboardState.popupProps} onClose={handlePopupClose}>
			{renderKeyboard()}
		</Popup>
	);
};

export default FullKeyboard;
