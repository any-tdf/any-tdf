import type { SkeletonProps } from '../../types';
import { forwardRef, memo } from 'react';
import { resolveSkeletonDerived, resolveSkeletonRandomValue, resolveSkeletonStateOptions } from '@any-tdf/common/derived/skeleton';
import { SvgIcon } from '../utils/SvgIcon';

/**
 * Skeleton 组件 - 骨架屏组件
 * Skeleton component for loading placeholders
 */
const Skeleton = memo(
	forwardRef<HTMLDivElement, SkeletonProps>(
		(
			{ type = 'div', width = '6', height = '6', radius = '', space = '1', lines = 3, iconRatio = 0.6, effect = 'pulse', bg = 'gray' },
			ref
		) => {
			// 随机源留在组件层，随机值归一化由公共派生层统一。
			// Random source stays in the component layer, while shared derivations normalize the value.
			const randomValue = resolveSkeletonRandomValue({ random: Math.random() });
			const skeletonState = resolveSkeletonDerived(
				resolveSkeletonStateOptions({
					props: { type, width, height, radius, space, lines, iconRatio, effect, bg },
					randomValue
				})
			);

			// 段落类型的骨架屏
			if (skeletonState.displayState.showParagraph) {
				return (
					<div ref={ref} className={skeletonState.classes.wrapperClass}>
						<div className={skeletonState.paragraphClass}>
							{skeletonState.paragraphLineIndexes.map((i) => (
								<div key={i} className={skeletonState.classes.lineClass} />
							))}
							<div className={skeletonState.randomLineClass} />
						</div>
					</div>
				);
			}

			// 普通类型的骨架屏
			return (
				<div ref={ref} className={skeletonState.classes.wrapperClass}>
					<div className={skeletonState.classes.blockClass}>
						{skeletonState.displayState.showIcon && skeletonState.iconSvg ? (
							<div className={skeletonState.iconWrapClass} style={skeletonState.iconRatioStyleValue}>
								{/* 公共 Skeleton 图标 SVG 数据在 common 中维护。 / Shared Skeleton SVG data lives in common. */}
								<SvgIcon svg={skeletonState.iconSvg} width="100%" height="100%" className={skeletonState.iconSvgClass} />
							</div>
						) : null}
					</div>
				</div>
			);
		}
	)
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
