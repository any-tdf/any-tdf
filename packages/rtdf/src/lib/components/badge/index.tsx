import type { BadgeProps } from '../../types';
import { resolveBadgeDerived, resolveBadgeStateOptions } from '@any-tdf/common/derived/badge';

const Badge: React.FC<BadgeProps> = ({
	text = '',
	radius = '',
	isLeft = false,
	isShow = true,
	offsetY = 0,
	offsetX = 0,
	isInner = false,
	injClass = '',
	children
}) => {
	// 公共派生层只接收 Badge 状态，组件层只负责 JSX 绑定。
	// The shared derived layer receives Badge state; the component layer only binds JSX.
	const badgeState = resolveBadgeDerived(
		resolveBadgeStateOptions({
			props: { text, radius, isLeft, isShow, offsetY, offsetX, isInner, injClass }
		})
	);

	if (badgeState.isInner) {
		return (
			<div className={badgeState.classes.innerClass} style={badgeState.innerStyleValue}>
				{text}
			</div>
		);
	}

	return (
		<div className={badgeState.classes.wrapperClass}>
			{children}
			<div className={badgeState.classes.outerClass} style={badgeState.outerStyleValue}>
				{text}
			</div>
		</div>
	);
};

export default Badge;
