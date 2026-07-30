import type { RateProps } from '../../types';
import { resolveRateClickAction, resolveRateDerived, resolveRateInitialValue, resolveRateStateOptions } from '@any-tdf/common/derived/rate';
import { rateStarSvg } from '@any-tdf/common/svg/common';
import { zh_CN } from '../../lang';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useConfig } from '../config-provider';
import { SvgIcon } from '../utils/SvgIcon';

const Rate = forwardRef<HTMLDivElement, RateProps>(
	(
		{
			value = 4,
			total = 5,
			height = 24,
			width = 24,
			opacity = '0.2',
			space = '3',
			half = false,
			zero = false,
			vertical = false,
			disabled = false,
			readonly = false,
			animation = 'current',
			children,
			onClick
		},
		ref
	) => {
		const { locale } = useConfig();
		const rateLang = locale?.rate || zh_CN.rate;
		const [internalValue, setInternalValue] = useState(resolveRateInitialValue(value));
		const [isScale, setIsScale] = useState(false);
		const [clickIndex, setClickIndex] = useState(0);
		// 公共派生层统一 Rate 的 class、尺寸、象限状态和校验结果，组件层只处理事件和动画计时。
		// Common derivation unifies Rate class, size, quadrant state and validation results; the component layer only handles events and animation timing.
		const rateState = useMemo(
			() =>
				resolveRateDerived(
					resolveRateStateOptions({
						value: internalValue,
						clickIndex,
						isScale,
						props: { total, half, width, height, space, disabled, animation, vertical, opacity }
					})
				),
			[animation, clickIndex, disabled, half, height, internalValue, isScale, opacity, space, total, vertical, width]
		);

		useEffect(() => {
			setInternalValue(resolveRateInitialValue(value));
		}, [value]);

		useEffect(() => {
			rateState.validationErrors.forEach((errorKey) => {
				console.error(rateLang[errorKey]);
			});
		}, [rateLang, rateState.validationErrors]);

		const clickFun = (index: number) => {
			const action = resolveRateClickAction({
				index,
				value: internalValue,
				half,
				zero,
				disabled,
				readonly
			});
			if (!action.shouldChange) return;
			setIsScale(action.isScale);
			setClickIndex(action.clickIndex);
			window.setTimeout(() => {
				setIsScale(action.resetIsScale);
			}, action.resetScaleDelay);

			setInternalValue(action.nextValue);
			onClick?.(action.nextValue);
		};

		const renderStar = (index: number) => {
			const item = rateState.items[index];
			if (!item) return null;
			return (
				<button key={index} type="button" className={item.buttonClass} style={item.buttonStyleValue} onClick={() => clickFun(index)}>
					{item.quadrants.map((quadrantItem) => (
						<div key={quadrantItem.quadrant} className={quadrantItem.className} style={quadrantItem.styleValue}>
							<div style={quadrantItem.starStyleValue}>
								{children ? (
									children
								) : (
									<>
										{/* 公共星形 SVG 数据在 common 中维护，评分事件仍在组件内处理。 / Shared star SVG data lives in common while rating events stay here. */}
										<SvgIcon svg={rateStarSvg} width={width} height={height} className={rateState.starSvgClass} />
									</>
								)}
							</div>
						</div>
					))}
				</button>
			);
		};

		return (
			<div ref={ref} className={rateState.rootClass}>
				{rateState.itemIndexes.map((index) => renderStar(index))}
			</div>
		);
	}
);

Rate.displayName = 'Rate';

export type { RateProps } from '../../types';
export default Rate;
