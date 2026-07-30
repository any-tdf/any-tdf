import { forwardRef, useEffect, useMemo, useRef } from 'react';
import {
	resolveScrollRadioDerived,
	resolveScrollRadioScrollAction,
	resolveScrollRadioStateOptions
} from '@any-tdf/common/derived/scrollRadio';

interface ScrollRadioProps {
	data?: Record<string, string>[];
	showRow?: 3 | 5 | 7;
	initIndex?: number;
	labelKey?: string;
	autoScrollToLast?: boolean;
	useAnimation?: boolean;
	lastSelectedIndex?: number;
	align?: 'center' | 'left' | 'right';
	injClass?: string;
	onScrollEnd?: (index: number, isTouch: boolean) => void;
	onScrolling?: (index: number) => void;
}

const ScrollRadio = forwardRef<HTMLDivElement, ScrollRadioProps>(
	(
		{
			data = [],
			showRow = 5,
			initIndex = 0,
			labelKey = 'label',
			autoScrollToLast = true,
			useAnimation = true,
			lastSelectedIndex = 0,
			align = 'center',
			onScrollEnd,
			onScrolling,
			injClass = ''
		},
		ref
	) => {
		const scrollElementRef = useRef<HTMLDivElement>(null);
		const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
		const isTouchRef = useRef(false);

		// 公共派生层处理 ScrollRadio 的列表布局和滚动数学，DOM 监听留在组件层。
		// Shared derived layer handles ScrollRadio list layout and scroll math; DOM listeners stay in the component layer.
		const scrollRadioState = useMemo(
			() =>
				resolveScrollRadioDerived(
					resolveScrollRadioStateOptions({
						props: {
							data,
							labelKey,
							showRow,
							autoScrollToLast,
							useAnimation,
							initIndex,
							align,
							injClass
						},
						lastSelectedIndex
					})
				),
			[data, labelKey, showRow, autoScrollToLast, useAnimation, lastSelectedIndex, initIndex, align, injClass]
		);

		useEffect(() => {
			const scrollElement = scrollElementRef.current;
			if (!scrollElement) return;
			scrollElement.scrollTop = scrollRadioState.scrollTop;
		}, [scrollRadioState.scrollTop, scrollRadioState.paddedData.length]);

		useEffect(() => {
			const scrollElement = scrollElementRef.current;
			if (!scrollElement) return;

			const handleScroll = (event: Event) => {
				isTouchRef.current = true;
				const scrollTop = (event.target as HTMLElement).scrollTop;
				const scrollAction = resolveScrollRadioScrollAction({
					scrollTop,
					itemHeight: scrollRadioState.itemHeight,
					isTouch: isTouchRef.current
				});
				onScrolling?.(scrollAction.scrollingIndex);

				if (scrollTimerRef.current) {
					clearTimeout(scrollTimerRef.current);
				}
				scrollTimerRef.current = setTimeout(() => {
					onScrollEnd?.(scrollAction.scrollEndIndex, scrollAction.wasTouch);
				});
			};

			scrollElement.addEventListener('scroll', handleScroll, { passive: true });
			return () => {
				scrollElement.removeEventListener('scroll', handleScroll);
				if (scrollTimerRef.current) {
					clearTimeout(scrollTimerRef.current);
					scrollTimerRef.current = null;
				}
			};
		}, [scrollRadioState.itemHeight, onScrollEnd, onScrolling]);

		return (
			<div ref={ref} className={scrollRadioState.rootClass} style={scrollRadioState.wrapperStyle}>
				<div ref={scrollElementRef} className={scrollRadioState.scrollClass} style={scrollRadioState.wrapperStyle}>
					{scrollRadioState.paddedData.map((item, index) => (
						<div key={index} className={scrollRadioState.itemClass} style={scrollRadioState.itemStyle}>
							<div className={scrollRadioState.labelClass}>{item[labelKey]}</div>
						</div>
					))}
					<div className={scrollRadioState.maskLayerClass} style={scrollRadioState.wrapperStyle}>
						<div className={scrollRadioState.topMaskClass} style={scrollRadioState.maskStyle} />
						<div className={scrollRadioState.highlightClass} style={scrollRadioState.itemStyle} />
						<div className={scrollRadioState.bottomMaskClass} style={scrollRadioState.maskStyle} />
					</div>
				</div>
			</div>
		);
	}
);

ScrollRadio.displayName = 'ScrollRadio';

export default ScrollRadio;
