import { forwardRef } from 'react';
import type { SmallAreaRadius } from '../../types';
import { resolvePaginationPageClass } from '@any-tdf/common/derived/pagination';

interface PageProps {
	active?: boolean;
	type?: 'border' | 'block' | 'bold';
	radius?: SmallAreaRadius;
	children: React.ReactNode;
	onClick?: () => void;
	injClass?: string;
}

const Page = forwardRef<HTMLButtonElement, PageProps>(
	({ active = false, type = 'border', radius = '', children, onClick, injClass = '', ...restProps }, ref) => {
		// 页码 class 由公共派生函数统一计算，组件层只绑定事件和内容。
		// Page classes are resolved by common derivation; the component layer only binds events and content.
		const pageClass = resolvePaginationPageClass({ active, type, radius, injClass });

		return (
			<button ref={ref} type="button" className={pageClass} onClick={onClick} {...restProps}>
				{children}
			</button>
		);
	}
);

Page.displayName = 'Page';

export default Page;
