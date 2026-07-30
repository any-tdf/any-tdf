import type { DividerProps } from '../../types';
import { forwardRef } from 'react';
import { resolveDividerDerived, resolveDividerStateOptions } from '@any-tdf/common/derived/divider';

const Divider = forwardRef<HTMLDivElement, DividerProps>(
	(
		{ layout = 'h', px = '0', py = '4', text = '', align = 'center', line = 'solid', mx = '1', weight = '1', injClass = '', ...restProps },
		ref
	) => {
		// 公共派生层处理 Divider 的 class 和渲染分支，组件层只负责模板绑定。
		// Shared derived layer handles Divider classes and render branches; the component layer only binds templates.
		const dividerState = resolveDividerDerived(
			resolveDividerStateOptions({
				props: { layout, px, py, text, align, line, mx, weight, injClass }
			})
		);

		if (dividerState.isVertical) {
			return <div ref={ref} className={dividerState.verticalClass} {...restProps} />;
		}

		return (
			<div ref={ref} className={dividerState.horizontalClass} {...restProps}>
				{dividerState.lineVisibility.showLeadingLine && <div className={dividerState.lineClass} />}
				{dividerState.lineVisibility.showText && <div className={dividerState.textClass}>{text}</div>}
				{dividerState.lineVisibility.showTrailingLine && <div className={dividerState.lineClass} />}
			</div>
		);
	}
);

Divider.displayName = 'Divider';

export default Divider;
