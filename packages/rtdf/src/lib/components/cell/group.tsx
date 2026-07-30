import type { CellGroupProps } from '../../types/index.js';
import { resolveCellGroupClass } from '@any-tdf/common/derived/cell';

const CellGroup: React.FC<CellGroupProps> = ({ radius = '', shadow = 'xs', bg = 'surface', my = '4', mx = '2', children }) => {
	// 公共派生层只处理 CellGroup 的 class 字符串，children 渲染留在组件内。
	// Shared derived layer only handles CellGroup class strings; children rendering stays in the component.
	const className = resolveCellGroupClass({ bg, radius, shadow, my, mx });

	return <div className={className}>{children}</div>;
};

export default CellGroup;
