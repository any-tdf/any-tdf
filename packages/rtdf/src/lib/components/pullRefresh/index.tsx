import { useEffect, useMemo, useRef, useState } from 'react';
import type { TouchEvent as ReactTouchEvent, MouseEvent as ReactMouseEvent } from 'react';
import type { PullRefreshChangeDetail, PullRefreshProps } from '../../types';
import type { PullRefreshStatus } from '@any-tdf/common/types';
import {
	pullRefreshDefaultTexts,
	resolvePullRefreshCanStart,
	resolvePullRefreshChangeDetail,
	resolvePullRefreshCompletionAction,
	resolvePullRefreshDerived,
	resolvePullRefreshDistance,
	resolvePullRefreshGestureIntent,
	resolvePullRefreshGestureLock,
	resolvePullRefreshReleaseAction,
	type PullRefreshGestureLock
} from '@any-tdf/common/derived/pullRefresh';
import { useConfig } from '../config-provider';
import { zh_CN } from '../../lang';
import Loading from '../loading';
import { getScrollElement, getScrollMetrics } from '../utils/scroll';

const defaultLoadingIcon: NonNullable<PullRefreshProps['loadingIcon']> = {
	type: '1_0',
	height: '4',
	width: '4',
	theme: true
};

const PullRefresh = ({
	animationDuration = 300,
	canReleaseChild,
	canReleaseText,
	children,
	contentClass = '',
	disabled = false,
	headClass = '',
	headHeight = 50,
	injClass = '',
	loadingIcon,
	maxDistance = 0,
	normalChild,
	onChange,
	onchange,
	onRefresh,
	onrefresh,
	pullFactor = 1,
	pullingChild,
	pullingText,
	refreshing = false,
	refreshingChild,
	refreshingText,
	scrollTarget = null,
	successChild,
	successDuration = 500,
	successText,
	threshold = 60
}: PullRefreshProps) => {
	const { locale } = useConfig();
	const lang = locale?.pullRefresh || zh_CN.pullRefresh || pullRefreshDefaultTexts;
	const textState = {
		pullingText: pullingText ?? lang.pullingText,
		canReleaseText: canReleaseText ?? lang.canReleaseText,
		refreshingText: refreshingText ?? lang.refreshingText,
		successText: successText ?? lang.successText
	};
	const rootRef = useRef<HTMLDivElement | null>(null);
	const startXRef = useRef(0);
	const startYRef = useRef(0);
	const canPullRef = useRef(false);
	const gestureLockRef = useRef<PullRefreshGestureLock>('none');
	const mouseDraggingRef = useRef(false);
	const wasRefreshingRef = useRef(refreshing);
	const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [distance, setDistance] = useState(0);
	const [status, setStatus] = useState<PullRefreshStatus>('normal');

	const pullRefreshState = useMemo(
		() =>
			resolvePullRefreshDerived({
				animationDuration,
				canReleaseText: textState.canReleaseText,
				contentClass,
				disabled,
				distance,
				headClass,
				headHeight,
				injClass,
				pullingText: textState.pullingText,
				refreshing,
				refreshingText: textState.refreshingText,
				status,
				successText: textState.successText,
				threshold
			}),
		[
			animationDuration,
			contentClass,
			disabled,
			distance,
			headClass,
			headHeight,
			injClass,
			refreshing,
			status,
			textState.canReleaseText,
			textState.pullingText,
			textState.refreshingText,
			textState.successText,
			threshold
		]
	);
	const loadingIconState = useMemo(() => (loadingIcon === null ? null : { ...defaultLoadingIcon, ...loadingIcon }), [loadingIcon]);

	const emitChange = (nextStatus: PullRefreshStatus, nextDistance: number) => {
		const detail = resolvePullRefreshChangeDetail({
			status: nextStatus,
			distance: nextDistance,
			threshold
		});
		onChange?.(detail);
		onchange?.(detail);
	};

	const clearSuccessTimer = () => {
		if (successTimerRef.current) {
			clearTimeout(successTimerRef.current);
			successTimerRef.current = null;
		}
	};

	useEffect(() => {
		if (refreshing) {
			clearSuccessTimer();
			wasRefreshingRef.current = true;
			setDistance(headHeight);
			setStatus('refreshing');
			emitChange('refreshing', headHeight);
			return;
		}
		if (wasRefreshingRef.current) {
			wasRefreshingRef.current = false;
			const action = resolvePullRefreshCompletionAction({
				headHeight,
				showSuccess: Boolean(textState.successText)
			});
			setDistance(action.nextDistance);
			setStatus(action.nextStatus);
			emitChange(action.nextStatus, action.nextDistance);
			clearSuccessTimer();
			successTimerRef.current = setTimeout(() => {
				setDistance(0);
				setStatus('normal');
				emitChange('normal', 0);
			}, successDuration);
		}
	}, [refreshing, headHeight, successDuration, textState.successText]);

	useEffect(
		() => () => {
			clearSuccessTimer();
			removeMouseListeners();
		},
		[]
	);

	const startGesture = (clientX: number, clientY: number) => {
		const scrollElement = getScrollElement(scrollTarget, rootRef.current);
		canPullRef.current = resolvePullRefreshCanStart({
			disabled,
			refreshing,
			scrollTop: getScrollMetrics(scrollElement).scrollTop
		});
		gestureLockRef.current = 'none';
		startXRef.current = clientX;
		startYRef.current = clientY;
	};

	const moveGesture = (clientX: number, clientY: number, preventDefault: () => void) => {
		if (!canPullRef.current) return;
		const intent = resolvePullRefreshGestureIntent({
			currentX: clientX,
			currentY: clientY,
			startX: startXRef.current,
			startY: startYRef.current
		});
		gestureLockRef.current = resolvePullRefreshGestureLock({
			current: gestureLockRef.current,
			deltaX: intent.deltaX,
			deltaY: intent.deltaY
		});
		if (gestureLockRef.current !== 'vertical') return;
		if (intent.deltaY <= 0) {
			// 回拖超过起点时取消下拉，并把滚动交还给原生容器
			// Dragging back past the start point cancels the pull and hands scrolling back to the native container
			if (distance !== 0 || status !== 'normal') {
				setDistance(0);
				setStatus('normal');
				emitChange('normal', 0);
			}
			return;
		}
		preventDefault();
		const nextDistance = resolvePullRefreshDistance({ deltaY: intent.deltaY, pullFactor, threshold, maxDistance });
		const nextStatus: PullRefreshStatus = nextDistance <= 0 ? 'normal' : nextDistance >= threshold ? 'canRelease' : 'pulling';
		if (nextDistance === distance && nextStatus === status) return;
		setDistance(nextDistance);
		setStatus(nextStatus);
		emitChange(nextStatus, nextDistance);
	};

	const endGesture = () => {
		if (!canPullRef.current) return;
		canPullRef.current = false;
		gestureLockRef.current = 'none';
		const action = resolvePullRefreshReleaseAction({
			disabled,
			distance,
			headHeight,
			refreshing,
			threshold
		});
		setDistance(action.nextDistance);
		setStatus(action.nextStatus);
		emitChange(action.nextStatus, action.nextDistance);
		if (action.shouldRefresh) {
			onRefresh?.();
			onrefresh?.();
		}
	};

	const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
		const touch = event.touches[0];
		startGesture(touch.clientX, touch.clientY);
	};

	const handleTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
		const touch = event.touches[0];
		moveGesture(touch.clientX, touch.clientY, () => {
			if (event.cancelable) event.preventDefault();
		});
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!mouseDraggingRef.current) return;
		if ((event.buttons & 1) !== 1) {
			handleMouseUp();
			return;
		}
		moveGesture(event.clientX, event.clientY, () => event.preventDefault());
	};

	const removeMouseListeners = () => {
		mouseDraggingRef.current = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	};

	function handleMouseUp() {
		if (!mouseDraggingRef.current) return;
		removeMouseListeners();
		endGesture();
	}

	const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
		if (event.button !== 0) return;
		startGesture(event.clientX, event.clientY);
		if (!canPullRef.current) return;
		mouseDraggingRef.current = true;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};

	const detail = useMemo<PullRefreshChangeDetail>(
		() =>
			resolvePullRefreshChangeDetail({
				status: pullRefreshState.status,
				distance: pullRefreshState.distance,
				threshold
			}),
		[pullRefreshState.distance, pullRefreshState.status, threshold]
	);
	const customHead = {
		normal: normalChild,
		pulling: pullingChild,
		canRelease: canReleaseChild,
		refreshing: refreshingChild,
		success: successChild
	}[pullRefreshState.status]?.(detail);

	return (
		<div
			ref={rootRef}
			className={pullRefreshState.rootClass}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={endGesture}
			onTouchCancel={endGesture}
			onMouseDown={handleMouseDown}
		>
			<div className={pullRefreshState.trackClass}>
				<div className={pullRefreshState.headClass} style={pullRefreshState.headStyleValue} aria-live="polite">
					{customHead ?? (
						<div className="inline-flex items-center gap-2">
							{pullRefreshState.status === 'refreshing' && loadingIconState ? <Loading {...loadingIconState} /> : null}
							<span>{pullRefreshState.defaultText}</span>
						</div>
					)}
				</div>
				<div className={pullRefreshState.contentClass} style={pullRefreshState.contentStyleValue}>
					{children}
				</div>
			</div>
		</div>
	);
};

export type { PullRefreshProps } from '../../types';
export default PullRefresh;
