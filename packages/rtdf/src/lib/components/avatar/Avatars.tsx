import { forwardRef } from 'react';
import {
	resolveAvatarGroupDerived,
	resolveAvatarGroupKeyboardAction,
	resolveAvatarGroupStateOptions
} from '@any-tdf/common/derived/avatarGroup';
import { avatarGroupUserSvg } from '@any-tdf/common/svg/common';
import type { AvatarGroupProps } from '../../types';
import Avatar from './index';
import { SvgIcon } from '../utils/SvgIcon';

const Avatars = forwardRef<HTMLDivElement, AvatarGroupProps>(
	(
		{
			data = [],
			radius = '',
			size = 'base',
			compact = 4,
			lineWidth = '3',
			reverse = false,
			max = 10,
			top = 'totle',
			injClass = '',
			onClick
		},
		ref
	) => {
		const handleClick = () => {
			onClick?.();
		};
		const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
			// 公共键盘动作函数只返回点击决策，事件对象处理留在组件层。
			// Shared keyboard action function only returns click decisions; event object handling stays in the component.
			const action = resolveAvatarGroupKeyboardAction({ key: event.key });
			if (action.shouldPreventDefault) {
				event.preventDefault();
			}
			if (action.shouldClick) {
				handleClick();
			}
		};

		// 公共派生层处理 AvatarGroup 的 class、列表截断、布局计算和纯键盘动作，点击事件与 children 留在组件内。
		// Shared derived layer handles AvatarGroup classes, list slicing, layout math and pure keyboard actions; click events and children stay in the component.
		const groupState = resolveAvatarGroupDerived(
			resolveAvatarGroupStateOptions({
				props: { data, max, compact, reverse, top, size, radius, lineWidth, injClass },
				total: data.length
			})
		);

		const renderTopContent = () => {
			if (groupState.topState.kind === 'total') {
				return <div className={groupState.totalClass}>{groupState.topState.totalText}</div>;
			}

			if (groupState.topState.kind === 'add') {
				return (
					<div className={groupState.addClass}>
						<div className={groupState.addIconWrapClass}>
							{/* 公共默认头像组 SVG 数据在 common 中维护。 / Shared default avatar group SVG data lives in common. */}
							<SvgIcon svg={avatarGroupUserSvg} width={24} height={24} className={groupState.addIconClass} />
						</div>
					</div>
				);
			}

			if (groupState.topState.kind === 'none') {
				return null;
			}

			if (typeof top === 'function') return top();
			return top as React.ReactNode;
		};

		const renderAvatars = () => {
			return groupState.items.map((itemState) => (
				<div key={itemState.item.image || itemState.index} className={groupState.itemClass} style={itemState.style}>
					<Avatar radius={radius} size={size} {...itemState.item} />
				</div>
			));
		};

		const renderTopElement = () => {
			const topContent = renderTopContent();
			if (!topContent) return null;

			return (
				<div className={groupState.itemClass} style={groupState.topStyle}>
					{topContent}
				</div>
			);
		};

		return (
			<div className={groupState.rootClass}>
				<div ref={ref} role="button" tabIndex={0} className={groupState.buttonClass} onClick={handleClick} onKeyDown={handleKeyDown}>
					{reverse && (
						<div className={groupState.itemClass} style={groupState.topStyle}>
							{renderTopContent()}
						</div>
					)}

					{renderAvatars()}

					{!reverse && renderTopElement()}
				</div>
			</div>
		);
	}
);

Avatars.displayName = 'Avatars';

export default Avatars;
