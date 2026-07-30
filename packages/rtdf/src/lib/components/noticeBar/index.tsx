import type { NoticeBarProps } from '../../types';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../icon';
import {
	resolveNoticeBarAnimationSetupAction,
	resolveNoticeBarCloseDelayState,
	resolveNoticeBarCloseRequestAction,
	resolveNoticeBarDerived,
	resolveNoticeBarHorizontalStepAction,
	resolveNoticeBarMeasuredRect,
	resolveNoticeBarMeasuredRectVisible,
	resolveNoticeBarStateOptions,
	resolveNoticeBarVerticalStepAction
} from '@any-tdf/common/derived/noticeBar';
import { arrowRightSvg, closeSvg, volumeSvg } from '@any-tdf/common/svg/common';
import { SvgIcon } from '../utils/SvgIcon';

const NoticeBar = forwardRef<HTMLDivElement, NoticeBarProps>(
	(
		{
			textList = [],
			leftIcon = 'volume',
			rightIcon = 'close',
			space = 100,
			speed = 30,
			vertical = false,
			duration = 500,
			interval = 4,
			injClass = '',
			radius = '',
			leftChild,
			rightChild,
			onClickRight
		},
		ref
	) => {
		const handleRightClick = () => {
			onClickRight?.();
		};

		const [isShow, setIsShow] = useState(true);
		const [isShowClose, setIsShowClose] = useState(true);
		const [currentIndex, setCurrentIndex] = useState(0);
		const [isTransition, setIsTransition] = useState(true);
		const [outBoxWidth, setOutBoxWidth] = useState(0);
		const [outBoxHeight, setOutBoxHeight] = useState(0);
		const [left, setLeft] = useState(speed);
		const [newTextListState, setNewTextListState] = useState<string[] | null>(null);

		const boxRef = useRef<HTMLDivElement | null>(null);
		const outBoxRef = useRef<HTMLDivElement | null>(null);

		// 公共派生层处理 NoticeBar 的 class、图标状态、文本列表和滚动 item，计时器与 DOM 测量留在组件层。
		// Shared derived layer handles NoticeBar classes, icon state, text lists and scroll items; timers and DOM reads stay in the component layer.
		const noticeBarState = useMemo(
			() =>
				resolveNoticeBarDerived(
					resolveNoticeBarStateOptions({
						props: { textList, duration, space, rightIcon, leftIcon, injClass, radius },
						newTextListState,
						currentIndex,
						isTransition,
						outBoxHeight,
						outBoxWidth,
						left,
						isShow,
						hasLeftChild: Boolean(leftChild),
						hasCustomChild: Boolean(rightChild)
					})
				),
			[
				textList,
				newTextListState,
				currentIndex,
				isTransition,
				duration,
				outBoxHeight,
				outBoxWidth,
				left,
				space,
				rightIcon,
				leftIcon,
				isShow,
				injClass,
				radius,
				leftChild,
				rightChild
			]
		);

		useEffect(() => {
			if (noticeBarState.textListValidation.isInvalidType) {
				console.error('[RTDF NoticeBar error] textList must be an array.');
				return;
			}
			if (noticeBarState.textListValidation.isEmpty) {
				console.error('[RTDF NoticeBar error]textList must not be empty.');
			}
		}, [noticeBarState.textListValidation]);

		useEffect(() => {
			setLeft(speed);
		}, [speed]);

		useEffect(() => {
			if (!noticeBarState.textListValidation.shouldAnimate) return;

			let rafId: number | undefined = undefined;
			let times: ReturnType<typeof setInterval> | null = null;
			let resetTimer: ReturnType<typeof setTimeout> | null = null;
			let startTime = 0;
			let boxWidth = 0;

			if (!vertical) {
				boxWidth = resolveNoticeBarMeasuredRect(boxRef.current?.getBoundingClientRect()).width;
			}
			const outBoxSize = resolveNoticeBarMeasuredRect(outBoxRef.current?.getBoundingClientRect());
			if (resolveNoticeBarMeasuredRectVisible(outBoxSize)) {
				setOutBoxWidth(outBoxSize.width);
				setOutBoxHeight(outBoxSize.height);
			}

			// 公共 setup action 只决定启动分支，DOM 测量和 timer 执行留在组件层。
			// Shared setup action only decides the startup branch; DOM measurement and timers stay in the component layer.
			const setupAction = resolveNoticeBarAnimationSetupAction({
				boxWidth,
				outBoxWidth: outBoxSize.width,
				outBoxHeight: outBoxSize.height,
				shouldAnimate: noticeBarState.textListValidation.shouldAnimate,
				space,
				speed,
				textList,
				vertical
			});
			setOutBoxWidth(setupAction.outBoxWidth);
			setOutBoxHeight(setupAction.outBoxHeight);
			setNewTextListState(setupAction.newTextListState);
			setLeft(setupAction.left);
			setCurrentIndex(setupAction.currentIndex);
			setIsTransition(setupAction.isTransition);
			if (!setupAction.shouldRun) {
				return;
			}

			if (setupAction.shouldStartHorizontal) {
				const step = (time: number) => {
					setLeft((prev) => {
						// 公共 action 只计算帧偏移，动画帧调度留在组件内。
						// Shared action only calculates frame offset; animation frame scheduling stays in the component layer.
						const action = resolveNoticeBarHorizontalStepAction({
							left: prev,
							speed,
							time,
							startTime,
							boxWidth
						});
						startTime = action.nextStartTime;
						return action.nextLeft;
					});
					rafId = requestAnimationFrame(step);
				};
				rafId = requestAnimationFrame(step);
			}

			if (setupAction.shouldStartVertical) {
				times = setInterval(() => {
					setCurrentIndex((prev) => {
						const action = resolveNoticeBarVerticalStepAction({
							currentIndex: prev,
							textLength: noticeBarState.textListVertical.length
						});
						if (action.shouldScheduleReset) {
							setIsTransition(action.nextTransition);
							if (resetTimer) {
								clearTimeout(resetTimer);
							}
							resetTimer = setTimeout(() => {
								setCurrentIndex(action.resetIndex);
								setIsTransition(action.resetTransition);
							}, duration);
							return action.nextIndex;
						}
						setIsTransition(action.nextTransition);
						return action.nextIndex;
					});
				}, interval * 1000);
			}

			return () => {
				if (vertical && times) {
					clearInterval(times);
				}
				if (rafId !== undefined) {
					cancelAnimationFrame(rafId);
				}
				if (resetTimer) {
					clearTimeout(resetTimer);
				}
			};
		}, [
			textList,
			noticeBarState.textListValidation.shouldAnimate,
			vertical,
			space,
			speed,
			interval,
			duration,
			noticeBarState.textListVertical.length
		]);

		const handleRightAction = () => {
			// 公共 action 返回关闭状态和延迟卸载决策，组件层只负责写状态和安排 timer。
			// Shared action returns close visibility and delayed-unmount decisions; the component layer only writes state and schedules the timer.
			const action = resolveNoticeBarCloseRequestAction(rightIcon);
			setIsShow(action.isShow);
			setIsShowClose(action.isShowClose);
			if (action.shouldScheduleClose) {
				setTimeout(() => {
					const delayState = resolveNoticeBarCloseDelayState();
					setIsShow(delayState.isShow);
					setIsShowClose(delayState.isShowClose);
				}, action.closeDelayMs);
			}
			handleRightClick();
		};

		const renderLeftIcon = () => {
			if (noticeBarState.leftIconState.kind === 'child') {
				return leftChild;
			}
			if (noticeBarState.leftIconState.kind === 'volume') {
				return (
					<>
						{/* 公共 SVG 数据在 common 中维护，组件层只负责渲染。 / Shared SVG data lives in common, the component layer only renders it. */}
						<SvgIcon svg={volumeSvg} width={20} height={20} className={noticeBarState.iconClass} />
					</>
				);
			}
			if (noticeBarState.leftIconState.kind === 'icon') {
				return <Icon {...noticeBarState.leftIconState.iconProps} />;
			}
			return null;
		};

		const renderRightIcon = () => {
			if (noticeBarState.rightIconState.kind === 'custom') {
				return rightChild;
			}
			if (noticeBarState.rightIconState.kind === 'none') {
				return null;
			}
			if (noticeBarState.rightIconState.kind === 'close') {
				return <SvgIcon svg={closeSvg} width={20} height={20} className={noticeBarState.iconClass} />;
			}
			if (noticeBarState.rightIconState.kind === 'arrow') {
				return <SvgIcon svg={arrowRightSvg} width={20} height={20} className={noticeBarState.arrowIconClass} />;
			}
			return null;
		};

		if (!isShowClose) {
			return null;
		}

		return (
			<div ref={ref} className={noticeBarState.rootClass}>
				<div className={noticeBarState.leftIconClass}>{renderLeftIcon()}</div>
				{vertical ? (
					<div className={noticeBarState.verticalViewportClass} ref={outBoxRef}>
						<div className={noticeBarState.verticalInnerClass} style={noticeBarState.heightStyle}>
							{noticeBarState.verticalItems.map((item) => {
								return (
									<div key={`${item.text}-${item.index}`} className={item.className} style={item.style}>
										{item.text}
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<div className={noticeBarState.horizontalViewportClass} ref={outBoxRef}>
						<div className={noticeBarState.horizontalTrackClass} style={noticeBarState.horizontalTrackStyle} ref={boxRef}>
							{noticeBarState.horizontalItems.map((item) => (
								<div key={`${item.text}-${item.index}`} className={item.className} style={item.style}>
									{item.text}
								</div>
							))}
						</div>
					</div>
				)}
				<button className={noticeBarState.rightButtonClass} onClick={handleRightAction} type="button">
					{renderRightIcon()}
				</button>
			</div>
		);
	}
);

NoticeBar.displayName = 'NoticeBar';

export default NoticeBar;
