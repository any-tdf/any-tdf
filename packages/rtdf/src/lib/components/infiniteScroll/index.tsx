import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import type { InfiniteScrollProps, InfiniteScrollRef } from '../../types';
import {
	infiniteScrollDefaultTexts,
	resolveInfiniteScrollDerived,
	resolveInfiniteScrollDistance,
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

		useEffect(() => {
			if (!loading) lockedRef.current = false;
		}, [loading, error, finished, disabled]);

		useEffect(() => {
			const scrollElement = getScrollElement(scrollTarget, rootRef.current);
			const remove = addScrollListener(scrollElement, check);
			if (immediateCheck) window.setTimeout(check, 0);
			return remove;
		}, [check, immediateCheck, scrollTarget]);

		const retry = () => {
			lockedRef.current = false;
			emitLoad(true);
		};

		const customContent =
			children ||
			(infiniteScrollState.status === 'loading'
				? loadingChild
				: infiniteScrollState.status === 'finished'
					? finishedChild
					: infiniteScrollState.status === 'error'
						? errorChild
						: null);

		return (
			<div ref={rootRef} className={infiniteScrollState.rootClass} aria-busy={infiniteScrollState.ariaBusy}>
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
