export type SvgBaseNodeData = {
	readonly className?: string;
	readonly fill?: string;
	readonly stroke?: string;
	readonly strokeWidth?: string | number;
	readonly strokeLinecap?: 'butt' | 'round' | 'square';
	readonly strokeLinejoin?: 'bevel' | 'miter' | 'round';
	readonly strokeDasharray?: string | number;
	readonly strokeDashoffset?: string | number;
	readonly pathLength?: string | number;
	readonly fillRule?: 'nonzero' | 'evenodd';
	readonly clipRule?: 'nonzero' | 'evenodd';
	readonly opacity?: string | number;
};

export type SvgPathData = SvgBaseNodeData & {
	readonly type?: 'path';
	readonly d: string;
};

export type SvgCircleData = SvgBaseNodeData & {
	readonly type: 'circle';
	readonly cx: string | number;
	readonly cy: string | number;
	readonly r: string | number;
};

export type SvgRectData = SvgBaseNodeData & {
	readonly type: 'rect';
	readonly x?: string | number;
	readonly y?: string | number;
	readonly width: string | number;
	readonly height: string | number;
	readonly rx?: string | number;
	readonly ry?: string | number;
};

export type SvgLineData = SvgBaseNodeData & {
	readonly type: 'line';
	readonly x1: string | number;
	readonly y1: string | number;
	readonly x2: string | number;
	readonly y2: string | number;
};

export type SvgPolylineData = SvgBaseNodeData & {
	readonly type: 'polyline';
	readonly points: string;
};

export type SvgPolygonData = SvgBaseNodeData & {
	readonly type: 'polygon';
	readonly points: string;
};

export type SvgNodeData = SvgPathData | SvgCircleData | SvgRectData | SvgLineData | SvgPolylineData | SvgPolygonData;
export type SvgRenderableNodeData = SvgBaseNodeData & {
	readonly type: SvgNodeType;
	readonly d?: string;
	readonly cx?: string | number;
	readonly cy?: string | number;
	readonly r?: string | number;
	readonly x?: string | number;
	readonly y?: string | number;
	readonly width?: string | number;
	readonly height?: string | number;
	readonly rx?: string | number;
	readonly ry?: string | number;
	readonly x1?: string | number;
	readonly y1?: string | number;
	readonly x2?: string | number;
	readonly y2?: string | number;
	readonly points?: string;
};

export type SvgData = {
	readonly viewBox: string;
	readonly paths: readonly SvgPathData[];
	readonly nodes?: readonly SvgNodeData[];
	readonly defaultFill?: string;
	readonly defaultStroke?: string;
	readonly defaultStrokeWidth?: string | number;
};

export type SvgNodeType = NonNullable<SvgNodeData['type']>;

export type ResolveSvgRootAttrsOptions = {
	readonly svg: SvgData;
	readonly fill?: string;
	readonly stroke?: string;
	readonly strokeWidth?: string | number;
};

export type SvgRootAttrs = {
	readonly fill?: string;
	readonly stroke?: string;
	readonly strokeWidth?: string | number;
	readonly viewBox: string;
};

// 只保存框架无关的 SVG 数据，不保存 DOM、事件或组件实例。
// Store only framework-agnostic SVG data, never DOM, events, or component instances.
export const getSvgNodes = (svg: SvgData): readonly SvgNodeData[] => svg.nodes || svg.paths || [];

// 输入 SVG 数据，返回渲染层更容易消费的规范化节点列表。
// Receive SVG data and return normalized nodes that renderers can consume directly.
export const getSvgRenderableNodes = (svg: SvgData): readonly SvgRenderableNodeData[] =>
	getSvgNodes(svg).map((node) => ({ ...node, type: resolveSvgNodeType(node) }));

// 输入 SVG 数据和覆盖值，返回渲染层可直接绑定的根节点属性。
// Receive SVG data and overrides, then return bind-ready root attributes for renderers.
export const resolveSvgRootAttrs = ({ svg, fill, stroke, strokeWidth }: ResolveSvgRootAttrsOptions): SvgRootAttrs => ({
	viewBox: svg.viewBox,
	fill: fill || svg.defaultFill,
	stroke: stroke || svg.defaultStroke,
	strokeWidth: strokeWidth || svg.defaultStrokeWidth
});

// 输入 SVG 节点，返回规范化节点类型，未声明时按 path 处理。
// Receive an SVG node and return its normalized node type, treating omitted type as path.
export const resolveSvgNodeType = (node: SvgNodeData): SvgNodeType => node.type || 'path';

// 输入 SVG 节点和索引，返回稳定渲染 key。
// Receive an SVG node and index, then return a stable render key.
export const resolveSvgNodeKey = (node: SvgNodeData | SvgRenderableNodeData, index: number): string => `${node.type || 'path'}-${index}`;

export const isSvgPathNode = (node: SvgNodeData): node is SvgPathData => resolveSvgNodeType(node) === 'path';

export const isSvgCircleNode = (node: SvgNodeData): node is SvgCircleData => node.type === 'circle';

export const isSvgRectNode = (node: SvgNodeData): node is SvgRectData => node.type === 'rect';

export const isSvgLineNode = (node: SvgNodeData): node is SvgLineData => node.type === 'line';

export const isSvgPolylineNode = (node: SvgNodeData): node is SvgPolylineData => node.type === 'polyline';

export const isSvgPolygonNode = (node: SvgNodeData): node is SvgPolygonData => node.type === 'polygon';
