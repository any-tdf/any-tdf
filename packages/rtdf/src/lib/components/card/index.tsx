import type { CardProps } from '../../types';
import { resolveCardDerived, resolveCardStateOptions } from '@any-tdf/common/derived/card';

const Card: React.FC<CardProps> = ({
	bg = 'surface',
	radius = '',
	shadow = 'sm',
	border = 'none',
	borderWidth = '1',
	mx = '2',
	my = '2',
	p = '4',
	px,
	py,
	overflow = true,
	headerLine = true,
	footerLine = true,
	injClass = '',
	headerClass = '',
	bodyClass = '',
	footerClass = '',
	header,
	children,
	footer,
	onClick
}) => {
	// 公共派生层处理 Card class 和内容分支，children 与事件留在组件层。
	// Shared derived layer handles Card classes and content branches; children and events stay in the component layer.
	const cardState = resolveCardDerived(
		resolveCardStateOptions({
			props: {
				overflow,
				bg,
				radius,
				shadow,
				mx,
				my,
				border,
				borderWidth,
				injClass,
				p,
				px,
				py,
				headerClass,
				bodyClass,
				footerClass,
				headerLine,
				footerLine
			},
			handler: onClick,
			hasHeader: Boolean(header),
			hasBody: Boolean(children),
			hasFooter: Boolean(footer)
		})
	);
	const handleClick = () => {
		onClick?.();
	};

	const renderSlot = (slot?: CardProps['header']) => {
		if (!slot) return null;
		if (typeof slot === 'function') return slot();
		return slot;
	};

	const content = (
		<>
			{cardState.contentState.showHeader && (
				<>
					<div className={cardState.headerSlotClass}>{renderSlot(header)}</div>
					{cardState.contentState.showHeaderDivider ? <div className={cardState.dividerClass} /> : null}
				</>
			)}
			{cardState.contentState.showBody && <div className={cardState.bodySlotClass}>{children}</div>}
			{cardState.contentState.showFooter && (
				<>
					{cardState.contentState.showFooterDivider ? <div className={cardState.dividerClass} /> : null}
					<div className={cardState.footerSlotClass}>{renderSlot(footer)}</div>
				</>
			)}
		</>
	);

	if (cardState.contentState.isInteractive) {
		return (
			<button type="button" className={cardState.interactiveClass} onClick={handleClick}>
				{content}
			</button>
		);
	}

	return <div className={cardState.containerClass}>{content}</div>;
};

export default Card;
