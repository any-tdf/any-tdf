import type { PlaceholderProps } from '../../types';
import { forwardRef, memo } from 'react';
import { resolvePlaceholderDerived, resolvePlaceholderStateOptions } from '@any-tdf/common/derived/placeholder';

/**
 * Placeholder 组件 - 占位符组件
 * Placeholder component for creating placeholder boxes with customizable styling
 */
const Placeholder = memo(
	forwardRef<HTMLDivElement, PlaceholderProps>(
		({ py = '4', height = 'full', radius = '', shadow = 'none', children, injClass = '' }, ref) => {
			// 公共派生层只处理 Placeholder 的 class 字符串，children 渲染留在组件内。
			// Shared derived layer only handles Placeholder class strings; children rendering stays in the component.
			const placeholderState = resolvePlaceholderDerived(
				resolvePlaceholderStateOptions({ props: { py, height, radius, shadow, injClass } })
			);

			return (
				<div ref={ref} className={placeholderState.rootClass}>
					{children}
				</div>
			);
		}
	)
);

Placeholder.displayName = 'Placeholder';

export default Placeholder;
