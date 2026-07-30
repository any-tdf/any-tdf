import type { NavBarProps } from '../../types';
import { zh_CN } from '../../lang';
import { useConfig } from '../config-provider';
import Icon from '../icon';
import { resolveNavBarDerived, resolveNavBarStateOptions } from '@any-tdf/common/derived/navBar';
import { arrowLeftSvg } from '@any-tdf/common/svg/common';
import { SvgIcon } from '../utils/SvgIcon';

const NavBar: React.FC<NavBarProps> = ({
	title,
	titleAlign = 'left',
	left = 'back',
	rights = [],
	line = true,
	injClass = '',
	love = false,
	onClickLeft,
	onClickRight,
	titleChild,
	leftChild,
	rightChild
}) => {
	const { locale } = useConfig();
	const navBarLang = locale?.navBar || zh_CN.navBar;
	// 公共派生层只处理 NavBar 状态推导，点击与 children 留在组件内。
	// The shared derived layer only handles NavBar state derivation; clicks and children stay in the component.
	const navBarState = resolveNavBarDerived(
		resolveNavBarStateOptions({
			props: { title, titleAlign, left, line, love, injClass },
			defaults: navBarLang,
			hasCustomChild: Boolean(leftChild)
		})
	);

	const handleClickLeft = () => {
		onClickLeft?.();
	};

	return (
		<div className={navBarState.containerClass}>
			{navBarState.leftState.kind === 'child' ? (
				leftChild
			) : navBarState.leftState.kind === 'back' ? (
				<button
					type="button"
					className={navBarState.leftButtonClass}
					onClick={handleClickLeft}
					aria-label={navBarState.leftState.ariaLabel}
				>
					{/* 公共返回箭头 SVG 数据在 common 中维护。 / Shared back arrow SVG data lives in common. */}
					<SvgIcon svg={arrowLeftSvg} width={navBarState.iconSize} height={navBarState.iconSize} className={navBarState.backSvgClass} />
				</button>
			) : navBarState.leftState.kind === 'spacer' ? (
				<div className={navBarState.spacerClass} />
			) : navBarState.leftState.kind === 'icon' ? (
				<button type="button" className={navBarState.leftButtonClass} onClick={handleClickLeft}>
					<Icon {...navBarState.leftState.iconProps} />
				</button>
			) : null}

			<div className={navBarState.titleWrapClass}>
				{titleChild || <div className={navBarState.titleAlignClass}>{navBarState.titleText}</div>}
			</div>

			<div className={navBarState.rightWrapClass}>
				{rightChild ||
					(rights.length > 0
						? rights.map((icon, index) => (
								<button
									key={icon.name || `right-icon-${index}`}
									type="button"
									className={navBarState.rightButtonClass}
									onClick={() => {
										onClickRight?.(index);
									}}
								>
									<Icon {...icon} size={navBarState.iconSize} />
								</button>
							))
						: null)}
			</div>
		</div>
	);
};

export default NavBar;
