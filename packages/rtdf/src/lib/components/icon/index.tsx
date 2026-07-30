import type { IconProps } from '../../types';
import {
	resolveIconDerived,
	resolveIconInteractive,
	resolveIconKeyboardAction,
	resolveIconStateOptions
} from '@any-tdf/common/derived/icon';
import { useConfig } from '../config-provider';

const Icon: React.FC<IconProps> = ({
	type = 'symbol',
	name = '',
	size = 24,
	width = 0,
	height = 0,
	state,
	theme = false,
	opacity = 1,
	path,
	y = 0,
	injClass = '',
	children,
	onClick
}) => {
	const handleClick = () => {
		onClick?.();
	};
	const isInteractive = resolveIconInteractive(onClick);
	const { iconPath } = useConfig();

	// 公共派生层统一 Icon 的 class、style、尺寸、可访问性和最终资源路径，组件层只负责事件触发。
	// Common derivation unifies Icon class, style, size, accessibility and final asset path; the component layer only fires events.
	const iconState = resolveIconDerived(
		resolveIconStateOptions({
			props: { type, name, size, width, height, state, theme, opacity, path, y, injClass },
			configPath: iconPath,
			interactive: isInteractive
		})
	);

	// 键盘事件处理函数
	const handleKeyDown = (e: React.KeyboardEvent) => {
		const action = resolveIconKeyboardAction({ interactive: isInteractive, key: e.key });
		if (action.shouldPreventDefault) {
			e.preventDefault();
		}
		if (action.shouldClick) {
			handleClick();
		}
	};

	// 如果有子元素，直接渲染子元素
	if (children) {
		return <>{children}</>;
	}

	// 渲染 iconify 类型的图标
	if (type === 'iconify' || type === 'iconify-color') {
		return (
			<span
				className={iconState.iconifyClass}
				style={iconState.iconifyStyleValue}
				onClick={isInteractive ? handleClick : undefined}
				onKeyDown={isInteractive ? handleKeyDown : undefined}
				role={iconState.accessibility.role}
				tabIndex={iconState.accessibility.tabIndex}
				aria-label={iconState.accessibility.ariaLabel}
				aria-hidden={iconState.accessibility.ariaHidden}
			/>
		);
	}

	// 渲染 symbol 类型的图标（默认）
	return (
		<svg
			width={iconState.symbolWidth}
			height={iconState.symbolHeight}
			className={iconState.symbolClass}
			style={iconState.symbolStyleValue}
			onClick={isInteractive ? handleClick : undefined}
			onKeyDown={isInteractive ? handleKeyDown : undefined}
			role={iconState.accessibility.role}
			tabIndex={iconState.accessibility.tabIndex}
			aria-label={iconState.accessibility.ariaLabel}
			aria-hidden={iconState.accessibility.ariaHidden}
		>
			<use xlinkHref={iconState.symbolHref} />
		</svg>
	);
};

export default Icon;
