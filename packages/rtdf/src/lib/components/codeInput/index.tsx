import { useEffect, useRef, useState } from 'react';
import type { CodeInputProps } from '../../types';
import {
	normalizeCodeInputValue,
	resolveCodeInputAutoScrollTarget,
	resolveCodeInputBlurAction,
	resolveCodeInputDerived,
	resolveCodeInputFinishFlow,
	resolveCodeInputFocusAction,
	resolveCodeInputInitialFocused,
	resolveCodeInputInitialValue,
	resolveCodeInputInputAction,
	resolveCodeInputShouldAutoScroll,
	resolveCodeInputStateOptions
} from '@any-tdf/common/derived/codeInput';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';

const CodeInput: React.FC<CodeInputProps> = (props) => {
	const {
		value: valueProp,
		length = 6,
		mask = false,
		gutter = '2',
		focused: focusedProp,
		type = 'number',
		inputMode = '',
		native = false,
		info = '',
		errorInfo = '',
		radius = '',
		cellSize = 'md',
		cellStyle = 'box',
		cellBg = 'gray',
		cellBorder = 'solid',
		cursorStyle = 'line',
		cursorAnimation = 'blink',
		keyboardVisible = false,
		autoClose = false,
		autoScroll = true,
		bold = false,
		injClass = '',
		onChange,
		onFinish,
		onClose,
		onFocus,
		onFocusedChange
	} = props;
	const inputRef = useRef<HTMLInputElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const lastFinishedValueRef = useRef<string | null>(null);
	const initialValue = resolveCodeInputInitialValue(valueProp);
	const initialFocused = resolveCodeInputInitialFocused(focusedProp);
	const [innerValue, setInnerValue] = useState(initialValue);
	const [innerFocused, setInnerFocused] = useState(initialFocused);

	// 公共派生负责输入清洗，组件层只处理事件和状态同步。
	// Shared derived normalizes input; the component layer only handles events and state sync.
	const value = normalizeCodeInputValue({ value: innerValue, length, type, native });
	const focused = innerFocused;

	// 消费框架无关派生结果，组件层只负责事件、绑定和 DOM 读取。
	// Consume framework-agnostic derived results while the component layer keeps events, bindings and DOM reads.
	const codeInputState = resolveCodeInputDerived(
		resolveCodeInputStateOptions({
			props: {
				bold,
				cellBg,
				cellBorder,
				cellSize,
				cellStyle,
				cursorAnimation,
				cursorStyle,
				errorInfo,
				gutter,
				info,
				inputMode,
				injClass,
				length,
				mask,
				native,
				radius,
				type
			},
			focused,
			keyboardVisible,
			value
		})
	);
	const emitFinish = (nextValue: string) => {
		onFinish?.(nextValue);
	};
	const emitChange = (nextValue: string) => {
		onChange?.(nextValue);
	};
	const emitClose = () => {
		onClose?.();
	};
	const emitFocus = () => {
		onFocus?.();
	};
	const updateFocused = (nextFocused: boolean) => {
		setInnerFocused(nextFocused);
		onFocusedChange?.(nextFocused);
	};

	useEffect(() => {
		if (!native) {
			const nextValue = normalizeCodeInputValue({ value: innerValue, length, type, native });
			if (nextValue !== innerValue) {
				setInnerValue(nextValue);
			}
		}
	}, [innerValue, length, native, type]);

	useEffect(() => {
		setInnerValue(normalizeCodeInputValue({ value: initialValue, length, type, native }));
	}, [initialValue, length, native, type]);

	useEffect(() => {
		setInnerFocused(initialFocused);
	}, [initialFocused]);

	useEffect(() => {
		// 公共 finish flow 只返回完成和关闭意图，事件派发和状态赋值留在组件层。
		// Shared finish flow only returns finish and close intent; event dispatch and state assignment stay in the component layer.
		const flow = resolveCodeInputFinishFlow({
			value,
			length,
			lastFinishedValue: lastFinishedValueRef.current,
			autoClose
		});
		lastFinishedValueRef.current = flow.nextLastFinishedValue;
		if (!flow.shouldFinish) return;
		emitFinish(flow.finishedValue);
		if (flow.shouldClose) {
			if (flow.shouldEmitClose) emitClose();
			updateFocused(flow.nextFocused);
		}
	}, [autoClose, length, onClose, onFinish, value]);

	useEffect(() => {
		if (
			!resolveCodeInputShouldAutoScroll({
				autoScroll,
				keyboardVisible,
				hasContainer: Boolean(containerRef.current)
			})
		)
			return;
		const timer = setTimeout(() => {
			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) return;
			const viewportHeight = resolveViewportDimension({ value: window.innerHeight });
			const targetTop = resolveCodeInputAutoScrollTarget({
				rectBottom: rect.bottom,
				viewportHeight,
				autoScroll,
				scrollY: window.scrollY
			});
			// 组件层只执行 DOM 滚动，滚动目标由 common 纯计算得出。
			// The component layer only performs DOM scrolling; common returns the pure target value.
			if (targetTop !== null) {
				window.scrollTo({ top: targetTop, behavior: 'smooth' });
			}
		}, 300);
		return () => clearTimeout(timer);
	}, [autoScroll, keyboardVisible]);

	const handleClick = () => {
		// 公共 focus action 只返回聚焦状态和原生输入聚焦决策，DOM focus 留在组件层。
		// Shared focus action only returns focus state and native-input focus decisions; DOM focus stays in the component layer.
		const action = resolveCodeInputFocusAction({ native });
		updateFocused(action.nextFocused);
		if (action.shouldFocusNative && inputRef.current) {
			inputRef.current.focus();
		}
		if (action.shouldEmitFocus) emitFocus();
	};

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		// 公共 input action 负责清洗原始输入，组件层只同步状态和事件。
		// Shared input action normalizes raw input; the component layer only syncs state and events.
		const action = resolveCodeInputInputAction({ rawValue: event.target.value, length, type });
		setInnerValue(action.nextValue);
		if (action.shouldEmitChange) emitChange(action.nextValue);
	};

	const handleBlur = () => {
		const action = resolveCodeInputBlurAction();
		updateFocused(action.nextFocused);
	};

	return (
		<div ref={containerRef} className={codeInputState.rootClass}>
			{native ? (
				<input
					ref={inputRef}
					value={value}
					onChange={handleInput}
					onBlur={handleBlur}
					type="text"
					inputMode={codeInputState.nativeInputMode}
					maxLength={length}
					autoComplete="one-time-code"
					className={codeInputState.nativeInputClass}
				/>
			) : null}
			<button type="button" className={codeInputState.buttonClass} onClick={handleClick} aria-label="code input">
				{codeInputState.cellDisplayStates.map((cellDisplayState) =>
					codeInputState.cellStyle === 'line' ? (
						<div key={cellDisplayState.index} className={cellDisplayState.cellClass}>
							{cellDisplayState.kind === 'dot' ? (
								<span className={cellDisplayState.dotClass} />
							) : cellDisplayState.kind === 'maskText' || cellDisplayState.kind === 'valueText' ? (
								<span className={cellDisplayState.textClass}>{cellDisplayState.text}</span>
							) : cellDisplayState.kind === 'cursor' ? (
								cellDisplayState.showUnderlineCursor ? (
									<span className={cellDisplayState.underlineCursorClass} />
								) : (
									<span className={cellDisplayState.cursorClass} />
								)
							) : null}
							<span className={cellDisplayState.lineClass} />
						</div>
					) : (
						<div key={cellDisplayState.index} className={cellDisplayState.cellClass}>
							{cellDisplayState.kind === 'dot' ? (
								<span className={cellDisplayState.dotClass} />
							) : cellDisplayState.kind === 'maskText' || cellDisplayState.kind === 'valueText' ? (
								<span className={cellDisplayState.textClass}>{cellDisplayState.text}</span>
							) : cellDisplayState.kind === 'cursor' ? (
								cellDisplayState.showUnderlineCursor ? (
									<span className={cellDisplayState.underlineCursorClass} />
								) : (
									<span className={cellDisplayState.cursorClass} />
								)
							) : null}
						</div>
					)
				)}
			</button>
			{codeInputState.infoState.showInfo ? <p className={codeInputState.infoClass}>{codeInputState.infoState.text}</p> : null}
		</div>
	);
};

export default CodeInput;
