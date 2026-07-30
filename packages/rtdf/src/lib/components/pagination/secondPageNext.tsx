import type { SmallAreaRadius } from '../../types';
import Page from './page';
import { resolvePaginationSecondPageDerived, resolvePaginationSecondPageStateOptions } from '@any-tdf/common/derived/pagination';

type SecondPageProps = {
	pageCol?: number;
	pages?: number[];
	maxShowPage?: number;
	radius?: SmallAreaRadius;
	type?: 'border' | 'block' | 'bold';
	bg?: 'white' | 'surface' | 'gray' | 'theme';
	onClickItem?: (index: number) => void;
};

const SecondPageNext: React.FC<SecondPageProps> = ({
	pageCol = 3,
	pages = [],
	maxShowPage = 9,
	radius = 'md',
	type = 'bold',
	bg = 'white',
	onClickItem
}) => {
	// 公共派生层统一二级页码浮层结果，组件层只渲染按钮与绑定点击。
	// Common derivation unifies second-level page popover output; the component layer only renders buttons and binds clicks.
	const secondPageState = resolvePaginationSecondPageDerived(
		resolvePaginationSecondPageStateOptions({
			props: { bg, maxShowPage, pageCol, pages, placement: 'next' }
		})
	);
	if (!secondPageState.visible) return null;

	return (
		<div className={secondPageState.containerClass} style={secondPageState.containerStyleValue}>
			<div className={secondPageState.contentClass} style={secondPageState.gridStyleValue}>
				{pages.map((item) => (
					<Page key={item} type={type} radius={radius} onClick={() => onClickItem?.(item)}>
						{item}
					</Page>
				))}
			</div>
			<div className={secondPageState.arrowClass}></div>
		</div>
	);
};

export default SecondPageNext;
