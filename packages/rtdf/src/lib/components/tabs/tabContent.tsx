import type { TabContentProps } from '../../types';
import { resolveTabContentClass } from '@any-tdf/common/derived/tabContent';

const TabContent: React.FC<TabContentProps> = ({ show = true, children, onClickTab }) => {
	const clickFun = () => {
		onClickTab?.();
	};

	// 公共派生层只处理 TabContent 可见性 class，内容渲染留在组件内。
	// Shared derived layer only handles TabContent visibility classes; content rendering stays in the component.
	return (
		<div className={resolveTabContentClass(show)} onClick={clickFun}>
			{children}
		</div>
	);
};

export default TabContent;
