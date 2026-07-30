import type { ButtonProps } from '../../types';
import { resolveButtonDerived, resolveButtonStateOptions } from '@any-tdf/common/derived/button';
import { forwardRef, type MouseEvent } from 'react';
import Icon from '../icon';
import Loading from '../loading';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			fill = 'base',
			state,
			radius = '',
			size = 'big',
			border = 'solid',
			love = false,
			heightOut = '2',
			heightIn = '3',
			disabled = false,
			customSize = false,
			customWidth = 0,
			customHeight = 0,
			icon = null,
			iconPosition = 'left',
			loading = null,
			disabledLoading = true,
			type = 'button',
			injClass = '',
			children,
			onClick
		},
		ref
	) => {
		// 公共派生层处理 Button class、尺寸和内容分支，事件与 children 留在组件层。
		// Shared derived layer handles Button classes, size and content branches; events and children stay in the component layer.
		const buttonState = resolveButtonDerived(
			resolveButtonStateOptions({
				props: {
					fill,
					state,
					radius,
					size,
					border,
					heightOut,
					heightIn,
					injClass,
					love,
					disabled,
					loading,
					disabledLoading,
					customSize,
					customWidth,
					customHeight,
					icon,
					iconPosition
				}
			})
		);

		const clickFun = (event: MouseEvent<HTMLButtonElement>) => {
			onClick?.(event);
		};

		return (
			<div className={buttonState.outerClass}>
				<button
					ref={ref}
					onClick={clickFun}
					className={buttonState.buttonClass}
					disabled={buttonState.innerDisabled}
					style={buttonState.buttonStyleValue ?? undefined}
					type={type}
					aria-disabled={buttonState.innerDisabled}
					aria-busy={loading ? true : undefined}
				>
					{buttonState.contentState.loadingProps && <Loading {...buttonState.contentState.loadingProps} />}
					{buttonState.contentState.showLeftIcon && buttonState.contentState.iconProps ? (
						<Icon {...buttonState.contentState.iconProps} />
					) : null}
					{children}
					{buttonState.contentState.showRightIcon && buttonState.contentState.iconProps ? (
						<Icon {...buttonState.contentState.iconProps} />
					) : null}
				</button>
			</div>
		);
	}
);

Button.displayName = 'Button';

export type { ButtonProps } from '../../types';
export default Button;
