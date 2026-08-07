import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import type { InfiniteScrollProps, InfiniteScrollRef, InfiniteScrollSlotDetail } from '../../types';
import {
	infiniteScrollDefaultTexts,
	resolveInfiniteScrollDerived,
	resolveInfiniteScrollDetail,
	resolveInfiniteScrollDistance,
	resolveInfiniteScrollRootMargin,
	resolveInfiniteScrollShouldLoad
} from '@any-tdf/common/derived/infiniteScroll';
import { useConfig } from '../config-provider';
import { zh_CN } from '../../lang';
import Loading from '../loading';
import { addScrollListener, getScrollElement, getScrollMetrics } from '../utils/scroll';

const defaultLoadingIcon: NonNullable<InfiniteScrollProps['loadingIcon']> = {
	type: '1_0',
	height: '4',
	width: '4',
	theme: true
};

const renderSlotContent = (slot: InfiniteScrollProps['loadingChild'], detail: InfiniteScrollSlotDetail): ReactNode =>
	typeof slot === 'function' ? slot(detail) : slot;

const InfiniteScroll = forwardRef<InfiniteScrollRef, InfiniteScrollProps>(
	(
		{
			children,
			direction = 'down',
			disabled = false,
			error = false,
			errorChild,
			errorText,
			finished = false,
			finishedChild,
			finishedText,
			immediateCheck = true,
			injClass = '',
			loading = false,
			loadingChild,
			loadingIcon,
			loadingText,
			offset = 300,
			onLoad,
			onload,
			scrollTarget = null,
			textClass = ''
		},
		ref
	) => {
		const { locale } = useConfig();
		const lang = locale?.infiniteScroll || zh_CN.infiniteScroll || infiniteScrollDefaultTexts;
		const rootRef = useRef<HTMLDivElement | null>(null);
		const lockedRef = useRef(false);
		const latestStateRef = useRef({
			disabled,
			direction,
			error,
			finished,
			loading,
			offset,
			scrollTarget
		});

		latestStateRef.current = {
			disabled,
			direction,
			error,
			finished,
			loading,
			offset,
			scrollTarget
		};

		const infiniteScrollState = useMemo(
			() =>
				resolveInfiniteScrollDerived({
					disabled,
					error,
					errorText: errorText ?? lang.errorText,
					finished,
					finishedText: finishedText ?? lang.finishedText,
					injClass,
					loading,
					loadingText: loadingText ?? lang.loadingText,
					textClass
				}),
			[
				disabled,
				error,
				errorText,
				finished,
				finishedText,
				injClass,
				lang.errorText,
				lang.finishedText,
				lang.loadingText,
				loading,
				loadingText,
				textClass
			]
		);
		const loadingIconState = useMemo(() => (loadingIcon === null ? null : { ...defaultLoadingIcon, ...loadingIcon }), [loadingIcon]);

		const emitLoad = useCallback(
			(isRetry: boolean) => {
				if (lockedRef.current) return;
				lockedRef.current = true;
				onLoad?.(isRetry);
				onload?.(isRetry);
			},
			[onLoad, onload]
		);

		const check = useCallback(() => {
			const state = latestStateRef.current;
			const scrollElement = getScrollElement(state.scrollTarget, rootRef.current);
			const metrics = getScrollMetrics(scrollElement);
			const distance = resolveInfiniteScrollDistance({ ...metrics, direction: state.direction });
			if (
				resolveInfiniteScrollShouldLoad({
					disabled: state.disabled,
					distance,
					error: state.error,
					finished: state.finished,
					loading: state.loading,
					offset: state.offset,
					visible: true
				})
			) {
				emitLoad(false);
			}
		}, [emitLoad]);

		useImperativeHandle(ref, () => ({ check }), [check]);

		const retry = useCallback(() => {
			lockedRef.current = false;
			emitLoad(true);
		}, [emitLoad]);

		const detail = useMemo(
			() => resolveInfiniteScrollDetail({ status: infiniteScrollState.status, retry }),
			[infiniteScrollState.status, retry]
		);

		useEffect(() => {
			// 任一阻塞状态解除后主动复检，避免内容变化后停在边界不再触发
			// Re-check after any blocking state clears so the component does not stall at the boundary
			if (!loading) lockedRef.current = false;
			if (loading || error || finished || disabled) return;
			const frame = window.requestAnimationFrame(check);
			return () => window.cancelAnimationFrame(frame);
		}, [check, loading, error, finished, disabled]);

		useEffect(() => {
			const scrollElement = getScrollElement(scrollTarget, rootRef.current);
			const remove = addScrollListener(scrollElement, check);
			let observer: IntersectionObserver | null = null;
			if (rootRef.current && typeof IntersectionObserver !== 'undefined') {
				const root = scrollElement === window ? null : (scrollElement as HTMLElement);
				observer = new IntersectionObserver(
					(entries) => {
						if (entries.some((entry) => entry.isIntersecting)) check();
					},
					{ root, rootMargin: resolveInfiniteScrollRootMargin({ direction, offset }) }
				);
				observer.observe(rootRef.current);
			}
			if (immediateCheck) window.setTimeout(check, 0);
			return () => {
				observer?.disconnect();
				remove();
			};
		}, [check, direction, immediateCheck, offset, scrollTarget]);

		const customContent =
			renderSlotContent(children, detail) ??
			(infiniteScrollState.status === 'loading'
				? renderSlotContent(loadingChild, detail)
				: infiniteScrollState.status === 'finished'
					? renderSlotContent(finishedChild, detail)
					: infiniteScrollState.status === 'error'
						? renderSlotContent(errorChild, detail)
						: null);

		return (
			<div ref={rootRef} className={infiniteScrollState.rootClass} aria-busy={infiniteScrollState.ariaBusy} aria-live="polite">
				{customContent ?? (
					<>
						{infiniteScrollState.status === 'loading' ? (
							<div className={infiniteScrollState.textClass}>
								{loadingIconState ? <Loading {...loadingIconState} /> : null}
								<span>{infiniteScrollState.defaultText}</span>
							</div>
						) : null}
						{infiniteScrollState.status === 'finished' ? (
							<div className={infiniteScrollState.textClass}>{infiniteScrollState.defaultText}</div>
						) : null}
						{infiniteScrollState.status === 'error' ? (
							<button type="button" className={infiniteScrollState.errorButtonClass} onClick={retry}>
								{infiniteScrollState.defaultText}
							</button>
						) : null}
					</>
				)}
			</div>
		);
	}
);

InfiniteScroll.displayName = 'InfiniteScroll';

export type { InfiniteScrollProps, InfiniteScrollRef } from '../../types';
export default InfiniteScroll;
