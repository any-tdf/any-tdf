import { forwardRef, type KeyboardEvent } from 'react';
import { resolveAvatarDerived, resolveAvatarKeyboardAction, resolveAvatarStateOptions } from '@any-tdf/common/derived/avatar';
import { avatarUserSvg } from '@any-tdf/common/svg/common';
import type { AvatarProps } from '../../types';
import Icon from '../icon';
import { SvgIcon } from '../utils/SvgIcon';

const Avatar = forwardRef<HTMLButtonElement, AvatarProps>(
	(
		{ image = '', alt = '', icon = {}, altSize = 'md', radius = '', size = 'base', imgSize = 'l', line = 'none', injClass = '', onClick },
		ref
	) => {
		const handleClick = () => {
			onClick?.();
		};
		const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
			// 公共键盘动作函数只返回点击决策，事件对象处理留在组件层。
			// Shared keyboard action function only returns click decisions; event object handling stays in the component.
			const action = resolveAvatarKeyboardAction({ key: event.key });
			if (action.shouldPreventDefault) {
				event.preventDefault();
			}
			if (action.shouldClick) {
				handleClick();
			}
		};
		// 公共派生层处理 Avatar 的 class、尺寸值、内容分支和纯键盘动作，事件与具体渲染留在组件内。
		// Shared derived layer handles Avatar classes, size values, content branches and pure keyboard actions; events and concrete rendering stay in the component.
		const avatarState = resolveAvatarDerived(
			resolveAvatarStateOptions({
				props: { image, alt, altSize, radius, size, imgSize, line, injClass },
				hasIcon: Boolean(icon?.name)
			})
		);

		const renderContent = () => {
			if (avatarState.contentState.kind === 'icon' || avatarState.contentState.kind === 'defaultIcon') {
				// 显示图标或默认用户图标。
				// Render custom icon or default user icon.
				return (
					<div className={avatarState.iconWrapClass}>
						{avatarState.contentState.kind === 'icon' ? (
							<Icon {...icon} />
						) : (
							<>
								{/* 公共默认头像 SVG 数据在 common 中维护。 / Shared default avatar SVG data lives in common. */}
								<SvgIcon
									svg={avatarUserSvg}
									width={avatarState.iconSize}
									height={avatarState.iconSize}
									className={avatarState.defaultIconClass}
								/>
							</>
						)}
					</div>
				);
			}

			if (avatarState.contentState.kind === 'alt') {
				// 显示替代文本。
				// Render fallback text.
				return <div className={avatarState.centeredAltClass}>{alt}</div>;
			}

			// 显示图片。
			// Render image.
			return (
				<div className={avatarState.imageWrapClass}>
					<img src={image} className={avatarState.centeredImageClass} alt="" />
				</div>
			);
		};

		return (
			<button type="button" ref={ref} onClick={handleClick} onKeyDown={handleKeyDown} className={avatarState.rootClass}>
				{renderContent()}
			</button>
		);
	}
);

Avatar.displayName = 'Avatar';

export default Avatar;
