import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import type { InputProps } from '../../types';
import Icon from '../icon';
import { zh_CN } from '../../lang';
import { useConfig } from '../config-provider';
import {
	resolveInputBlurStateAction,
	resolveInputClearAction,
	resolveInputCompositionAction,
	resolveInputCurrentValue,
	resolveInputCustomContentKeyboardAction,
	resolveInputDerived,
	resolveInputFocusAction,
	resolveInputFocusStateAction,
	resolveInputInitialValue,
	resolveInputStateOptions,
	resolveInputTextareaHeightStyle,
	resolveInputValueChangeAction
} from '@any-tdf/common/derived/input';
import { formClearSvg, selectArrowRightSvg } from '@any-tdf/common/svg/common';
import { SvgIcon } from '../utils/SvgIcon';

const Input: React.FC<InputProps> = ({
	title = '',
	titlePosition = 'out',
	inputPosition = 'left',
	placeholder = '',
	radius = '',
	label1 = null,
	label2 = null,
	label3 = null,
	label4 = null,
	label5 = null,
	label6 = null,
	tip = null,
	data1 = null,
	data2 = null,
	data3 = null,
	value: controlledValue,
	clear = false,
	inputStyle = 'block',
	lineTransition = null,
	duration = 'base',
	autocomplete = true,
	py = '2',
	disabled = false,
	state: inputState = 'theme',
	type = 'text',
	inputmode = '',
	readonly = false,
	select = false,
	required = false,
	maxlength = 24,
	textareaMaxlength = 200,
	rows = 2,
	autosize = false,
	negative = false,
	onFocus,
	onBlur,
	onChange,
	onClear,
	onClickLabel1,
	onClickLabel2,
	onClickLabel3,
	onClickLabel4,
	onClickLabel5,
	onClickLabel6,
	onKeyDown,
	onkeydown,
	titleChild,
	data1Child,
	data2Child,
	data3Child,
	label1Child,
	label2Child,
	label3Child,
	label4Child,
	label5Child,
	label6Child,
	tipChild,
	inputChild,
	children
}) => {
	type InputMode = NonNullable<React.InputHTMLAttributes<HTMLInputElement>['inputMode']>;
	const { locale } = useConfig();
	const inputLang = locale?.input || zh_CN.input;

	// 是否获取焦点
	const [focus, setFocus] = useState(false);

	// 中文输入上屏标识
	const [flag, setFlag] = useState(true);

	// 内部 value 状态
	const [internalValue, setInternalValue] = useState(resolveInputInitialValue(controlledValue));

	// input 元素
	const inputRef = useRef<HTMLInputElement>(null);

	// textarea 元素
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// 使用受控组件模式
	const value = resolveInputCurrentValue({ controlledValue, internalValue });
	const setValue = (val: string) => {
		if (controlledValue === undefined) {
			setInternalValue(val);
		}
		onChange?.(val);
	};

	// 消费框架无关派生结果，组件层只负责事件、绑定和 DOM 读取。
	// Consume framework-agnostic derived results while the component layer keeps events, bindings and DOM reads.
	const inputViewState = resolveInputDerived(
		resolveInputStateOptions({
			props: {
				autocomplete,
				clear,
				disabled,
				duration,
				inputPosition,
				inputState,
				inputStyle,
				inputmode,
				lineTransition,
				placeholder,
				py,
				radius,
				readonly,
				rows,
				select,
				textTone: 'plain',
				title,
				titlePosition,
				type
			},
			focus,
			hasInputChild: Boolean(inputChild || children),
			hasTip: tip !== null,
			pleaseSelect: inputLang.pleaseSelect,
			pleaseInput: inputLang.pleaseInput,
			value
		})
	);

	// 获取焦点时派发事件
	const handleFocus = () => {
		const action = resolveInputFocusStateAction({ value });
		setFocus(action.nextFocus);
		if (action.shouldEmitFocus) onFocus?.(action.value);
	};

	// 失去焦点时派发事件
	const handleBlur = () => {
		const action = resolveInputBlurStateAction({ value });
		setFocus(action.nextFocus);
		if (action.shouldEmitBlur) onBlur?.(action.value);
	};

	// 输入内容变化时触发
	const valueChangeFun = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const nextRawValue = e.target.value;
		// 处理拼音输入时，内容上屏后才做校验
		setTimeout(() => {
			// 公共 action 只返回输入提交动作，DOM 高度和事件派发留在组件内。
			// Shared action only returns input commit action; DOM height and events stay in the component.
			const action = resolveInputValueChangeAction({
				rawValue: nextRawValue,
				value: nextRawValue,
				type,
				maxlength,
				textareaMaxlength,
				negative,
				autosize,
				composing: !flag
			});
			if (!action.shouldCommit) return;
			if (action.shouldResizeTextarea && textareaRef.current) {
				textareaRef.current.style.height = resolveInputTextareaHeightStyle({
					scrollHeight: textareaRef.current.scrollHeight
				});
			}
			setValue(action.nextValue);
		}, 0);
	};

	// 拼音输入时，文字还未上屏触发
	const handleCompositionStart = () => {
		const action = resolveInputCompositionAction({ phase: 'start' });
		setFlag(!action.nextComposing);
	};

	// 拼音输入时，文字完成上屏触发
	const handleCompositionEnd = () => {
		const action = resolveInputCompositionAction({ phase: 'end' });
		setFlag(!action.nextComposing);
	};

	// 清除时触发
	const clearFun = (e?: React.MouseEvent) => {
		// 阻止事件冒泡，避免在 select 模式下触发焦点
		e?.preventDefault();
		e?.stopPropagation();
		const action = resolveInputClearAction();
		setValue(action.nextValue);
		if (action.shouldClear) onClear?.();
	};

	// 键盘事件
	const handleKeyDown = (e: React.KeyboardEvent) => {
		// 派发事件，并传出按键的 key
		onKeyDown?.(e.key);
		onkeydown?.(e.key);
	};

	const emitLabelClick = (lowercase?: () => void, camelCase?: () => void) => {
		lowercase?.();
		camelCase?.();
	};

	// 自动调整 textarea 高度
	useEffect(() => {
		if (type === 'textarea' && autosize && textareaRef.current) {
			textareaRef.current.style.height = resolveInputTextareaHeightStyle({
				scrollHeight: textareaRef.current.scrollHeight
			});
		}
	}, [value, type, autosize]);

	const focusInput = () => {
		// 公共 action 只返回是否允许聚焦，DOM focus 留在组件层。
		// Shared action only returns whether focus is allowed; DOM focus stays in the component layer.
		const action = resolveInputFocusAction({ disabled });
		if (!action.shouldFocus) return;
		if (type === 'textarea') {
			textareaRef.current?.focus();
		} else {
			inputRef.current?.focus();
		}
	};

	const handleCustomContentKeyDown = (e: React.KeyboardEvent) => {
		// 公共 action 只判断激活键，事件对象和 DOM 聚焦留在组件层。
		// Shared action only identifies activation keys; event objects and DOM focus stay in the component layer.
		const action = resolveInputCustomContentKeyboardAction({ key: e.key, disabled });
		if (action.shouldFocus) focusInput();
	};

	return (
		<div className={inputViewState.outerClass}>
			<label>
				<div className={inputViewState.titleRowClass}>
					{titlePosition === 'out' &&
						(titleChild ??
							(title === '' ? null : (
								<div className={inputViewState.titleClass}>
									{required && <span className={inputViewState.requiredClass}>*</span>}
									{title}
								</div>
							)))}
					<div className={inputViewState.edgeContentClass}>
						{data1Child ?? (data1 !== null ? data1 : null)}
						{data2Child ?? (data2 !== null ? data2 : null)}
					</div>
				</div>
				<div className={inputViewState.wrapperClass}>
					{label1Child ??
						(label1 !== null ? (
							<button type="button" onClick={() => emitLabelClick(onClickLabel1)}>
								<Icon {...label1} />
							</button>
						) : null)}
					{label2Child ??
						(label2 !== null ? (
							<button type="button" onClick={() => emitLabelClick(onClickLabel2)}>
								{label2}
							</button>
						) : null)}
					{label3Child ??
						(label3 !== null ? (
							<button type="button" onClick={() => emitLabelClick(onClickLabel3)}>
								<Icon {...label3} />
							</button>
						) : null)}
					<div className={inputViewState.contentColumnClass}>
						{titlePosition === 'in' && (
							<div className={inputViewState.inlineTitleClass}>
								{required && <span className={inputViewState.inlineRequiredClass}>*</span>}
								{title}
							</div>
						)}
						<div className={inputViewState.controlRowClass}>
							<div className={inputViewState.controlSlotClass}>
								{inputChild || children ? (
									<div className={inputViewState.customWrapperClass}>
										{type === 'textarea' ? (
											<textarea
												ref={textareaRef}
												value={value}
												rows={rows}
												inputMode={inputViewState.mode as InputMode}
												placeholder={inputViewState.placeholderText}
												className={inputViewState.hiddenControlClass}
												onFocus={handleFocus}
												onBlur={handleBlur}
												onChange={valueChangeFun}
												onCompositionStart={handleCompositionStart}
												onCompositionEnd={handleCompositionEnd}
												autoComplete={inputViewState.autocompleteValue}
												disabled={disabled}
												readOnly
												tabIndex={-1}
												onKeyDown={handleKeyDown}
											/>
										) : (
											<input
												ref={inputRef}
												value={value}
												inputMode={inputViewState.mode as InputMode}
												placeholder={inputViewState.placeholderText}
												className={inputViewState.hiddenControlClass}
												onFocus={handleFocus}
												onBlur={handleBlur}
												onChange={valueChangeFun}
												onCompositionStart={handleCompositionStart}
												onCompositionEnd={handleCompositionEnd}
												autoComplete={inputViewState.autocompleteValue}
												disabled={disabled}
												readOnly
												tabIndex={-1}
												onKeyDown={handleKeyDown}
												type={inputViewState.nativeInputType}
											/>
										)}
										<div
											className={inputViewState.customContentClass}
											style={inputViewState.customContentStyleValue}
											role="textbox"
											tabIndex={inputViewState.focusableTabIndex}
											onFocus={focusInput}
											onClick={focusInput}
											onKeyDown={handleCustomContentKeyDown}
										>
											{inputChild ?? children}
										</div>
									</div>
								) : type === 'textarea' ? (
									<textarea
										ref={textareaRef}
										value={value}
										rows={rows}
										inputMode={inputViewState.mode as InputMode}
										placeholder={inputViewState.placeholderText}
										className={inputViewState.controlClass}
										onFocus={handleFocus}
										onBlur={handleBlur}
										onChange={valueChangeFun}
										onCompositionStart={handleCompositionStart}
										onCompositionEnd={handleCompositionEnd}
										autoComplete={inputViewState.autocompleteValue}
										disabled={disabled}
										readOnly={inputViewState.nativeReadonly}
										onKeyDown={handleKeyDown}
									/>
								) : (
									<input
										ref={inputRef}
										value={value}
										inputMode={inputViewState.mode as InputMode}
										placeholder={inputViewState.placeholderText}
										className={inputViewState.controlClass}
										onFocus={handleFocus}
										onBlur={handleBlur}
										onChange={valueChangeFun}
										onCompositionStart={handleCompositionStart}
										onCompositionEnd={handleCompositionEnd}
										autoComplete={inputViewState.autocompleteValue}
										disabled={disabled}
										readOnly={inputViewState.nativeReadonly}
										onKeyDown={handleKeyDown}
										type={inputViewState.nativeInputType}
									/>
								)}
							</div>
							{inputViewState.displayState.showClearButton && (
								<button type="button" onClick={clearFun} aria-label="clear">
									{/* 公共输入图标 SVG 数据在 common 中维护。 / Shared input SVG data lives in common. */}
									<SvgIcon svg={formClearSvg} width={16} height={16} className={inputViewState.clearIconClass} />
								</button>
							)}
						</div>
					</div>
					{label4Child ??
						(label4 !== null ? (
							<button type="button" onClick={() => emitLabelClick(onClickLabel4)}>
								<Icon {...label4} />
							</button>
						) : null)}
					{label5Child ??
						(label5 !== null ? (
							<button type="button" onClick={() => emitLabelClick(onClickLabel5)}>
								{label5}
							</button>
						) : null)}
					{inputViewState.displayState.showSelectIcon && (
						<SvgIcon svg={selectArrowRightSvg} width={24} height={24} className={inputViewState.selectIconClass} />
					)}
					{label6Child ??
						(label6 !== null ? (
							<button type="button" onClick={() => emitLabelClick(onClickLabel6)}>
								<Icon {...label6} />
							</button>
						) : null)}
					{inputViewState.displayState.showLineTransition && (
						<div className={inputViewState.lineClass} style={inputViewState.lineStyleValue} />
					)}
				</div>
				<div className={inputViewState.tipRowClass}>
					{tipChild ?? (tip !== null ? <div className={inputViewState.tipTextClass}>{tip}</div> : null)}
					{data3Child ?? (data3 !== null ? <div className={inputViewState.dataTextClass}>{data3}</div> : null)}
				</div>
			</label>
		</div>
	);
};

export default Input;
export type { InputProps } from '../../types';
