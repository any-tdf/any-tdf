import type { TagProps } from '../../types';
import {
	resolveTagClickAction,
	resolveTagCloseAction,
	resolveTagDerived,
	resolveTagKeyboardAction,
	resolveTagStateOptions
} from '@any-tdf/common/derived/tag';
import { tagCloseSvg } from '@any-tdf/common/svg/tag';
import { SvgIcon } from '../utils/SvgIcon';

const Tag: React.FC<TagProps> = ({
	text = '',
	state = 'theme',
	fill = 'base',
	size = 'md',
	radius = 'sm',
	mark = false,
	closable = false,
	disabled = false,
	injClass = '',
	children,
	onClick,
	onClose
}) => {
	const tagState = resolveTagDerived(
		resolveTagStateOptions({
			props: { text, state, fill, size, radius, mark, closable, disabled, injClass },
			hasCustomContent: Boolean(children)
		})
	);
	const handleClick = () => {
		const action = resolveTagClickAction({ disabled });
		if (action.shouldEmit) onClick?.();
	};
	const handleClose = () => {
		const action = resolveTagCloseAction({ disabled });
		if (action.shouldEmit) onClose?.();
	};
	const handleKeyDown = (key: string) => {
		// 公共 action 只判断按键是否触发 Tag 事件，DOM 事件仍留在组件层。
		// Shared action only decides whether the key triggers a Tag event; DOM events stay in the component layer.
		const action = resolveTagKeyboardAction({ key, disabled });
		if (action.shouldEmit) onClick?.();
	};
	const handleCloseKeyDown = (event: React.KeyboardEvent) => {
		// 公共 action 只返回关闭键盘动作，事件阻止冒泡仍由组件处理。
		// Shared action only returns close keyboard action; event propagation remains handled by the component.
		const action = resolveTagKeyboardAction({ key: event.key, disabled });
		if (!action.isActivationKey) return;
		event.stopPropagation();
		if (action.shouldEmit) onClose?.();
	};

	return (
		<span
			className={tagState.classes.rootClass}
			role="button"
			tabIndex={tagState.focusableTabIndex}
			onClick={() => {
				handleClick?.();
			}}
			onKeyDown={(e) => handleKeyDown(e.key)}
		>
			{tagState.contentState.showCustomContent ? children : tagState.contentState.showText ? text : null}
			{tagState.contentState.showClose && (
				<SvgIcon
					svg={tagCloseSvg}
					className={tagState.classes.closeClass}
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					role="button"
					tabIndex={tagState.focusableTabIndex}
					ariaHidden={false}
					onClick={(event) => {
						event.stopPropagation();
						handleClose?.();
					}}
					onKeyDown={handleCloseKeyDown}
				/>
			)}
		</span>
	);
};

export default Tag;
