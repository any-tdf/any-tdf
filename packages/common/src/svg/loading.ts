import type { SvgCircleData, SvgData, SvgRectData } from './types.js';

export type LoadingPathSvgData = {
	readonly viewBox: string;
	readonly width?: string;
	readonly height?: string;
	readonly path: {
		readonly d: string;
		readonly strokeWidth: string;
		readonly pathLength: string;
	};
};

const loadingOneColor0TrackCircle = {
	type: 'circle',
	cx: '12',
	cy: '12',
	r: '10',
	strokeWidth: '4',
	fill: 'none',
	className: 'opacity-5',
	stroke: 'currentColor'
} satisfies SvgCircleData;

const loadingOneColor0CarCircle = {
	type: 'circle',
	cx: '12',
	cy: '12',
	r: '10',
	strokeWidth: '4',
	fill: 'none',
	className: 'opacity-80',
	stroke: 'currentColor',
	strokeDashoffset: '46.07669455648491',
	strokeDasharray: '69.11503837897544',
	strokeLinecap: 'round'
} satisfies SvgCircleData;

const loadingOneColor22TrackCircle = {
	type: 'circle',
	className: 'track stroke-1.25 opacity-0',
	stroke: 'currentColor',
	cx: '20',
	cy: '20',
	r: '17.5',
	fill: 'none'
} satisfies SvgCircleData;

const loadingOneColor22CarCircle = {
	type: 'circle',
	className: 'car stroke-1.25',
	stroke: 'currentColor',
	cx: '20',
	cy: '20',
	r: '17.5',
	fill: 'none'
} satisfies SvgCircleData;

const loadingOneColor25TrackRect = {
	type: 'rect',
	className: 'opacity-10',
	x: '2.5',
	y: '2.5',
	fill: 'none',
	strokeWidth: '5px',
	width: '32.5',
	height: '32.5'
} satisfies SvgRectData;

const loadingOneColor25CarRect = {
	type: 'rect',
	className: 'car',
	x: '2.5',
	y: '2.5',
	fill: 'none',
	strokeWidth: '5px',
	width: '32.5',
	height: '32.5',
	pathLength: '100'
} satisfies SvgRectData;

// Loading 动画 SVG 只保存稳定图形数据，动画、颜色和渲染结构留在组件层。
// Loading animation SVG stores only stable shape data; animation, color, and render structure stay in the component layer.
export const loadingOneColor0Svg = {
	viewBox: '0 0 24 24',
	paths: [],
	trackCircle: loadingOneColor0TrackCircle,
	carCircle: loadingOneColor0CarCircle,
	nodes: [loadingOneColor0TrackCircle, loadingOneColor0CarCircle]
} satisfies SvgData & {
	readonly trackCircle: SvgCircleData;
	readonly carCircle: SvgCircleData;
};

export const loadingOneColor22Svg = {
	viewBox: '0 0 40 40',
	paths: [],
	trackCircle: loadingOneColor22TrackCircle,
	carCircle: loadingOneColor22CarCircle,
	nodes: [loadingOneColor22TrackCircle, loadingOneColor22CarCircle]
} satisfies SvgData & {
	readonly trackCircle: SvgCircleData;
	readonly carCircle: SvgCircleData;
};

export const loadingOneColor25Svg = {
	viewBox: '0 0 35 35',
	paths: [],
	trackRect: loadingOneColor25TrackRect,
	carRect: loadingOneColor25CarRect,
	nodes: [loadingOneColor25TrackRect, loadingOneColor25CarRect]
} satisfies SvgData & {
	readonly trackRect: SvgRectData;
	readonly carRect: SvgRectData;
};

export const loadingOneColor24Svg = {
	viewBox: '0 0 37 37',
	path: {
		d: 'M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5',
		strokeWidth: '5',
		pathLength: '100'
	}
} satisfies LoadingPathSvgData;

export const loadingOneColor26Svg = {
	viewBox: '0 0 37 37',
	width: '37',
	height: '37',
	path: {
		d: 'M36.63 31.746 c0 -13.394 -7.3260000000000005 -25.16 -18.13 -31.375999999999998 C7.696 6.66 0.37 18.352 0.37 31.746 c5.328 3.108 11.544 4.8839999999999995 18.13 4.8839999999999995 S31.301999999999996 34.854 36.63 31.746z',
		strokeWidth: '5',
		pathLength: '100'
	}
} satisfies LoadingPathSvgData;

export const loadingOneColor36Svg = {
	viewBox: '0 0 55 23.1',
	path: {
		d: 'M26.7,12.2c3.5,3.4,7.4,7.8,12.7,7.8c5.5,0,9.6-4.4,9.6-9.5C49,5,45.1,1,39.8,1c-5.5,0-9.5,4.2-13.1,7.8l-3.4,3.3c-3.6,3.6-7.6,7.8-13.1,7.8C4.9,20,1,16,1,10.5C1,5.4,5.1,1,10.6,1c5.3,0,9.2,4.5,12.7,7.8L26.7,12.2z',
		strokeWidth: '5',
		pathLength: '100'
	}
} satisfies LoadingPathSvgData;

export const loadingOneColor37Svg = {
	viewBox: '0 0 40 40',
	width: '40',
	height: '40',
	path: {
		d: 'M29.760000000000005 18.72 c0 7.28 -3.9200000000000004 13.600000000000001 -9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.840000000000002 2.64 c -3.6 0 -6.88 -0.96 -9.76 -2.64 c0 -7.28 3.9200000000000004 -13.52 9.840000000000002 -16.96 c2.8800000000000003 -1.6800000000000002 6.24 -2.64 9.76 -2.64 S26.880000000000003 17.040000000000003 29.760000000000005 18.72 c5.84 3.3600000000000003 9.76 9.68 9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.76 2.64 c -3.6 0 -6.88 -0.96 -9.840000000000002 -2.64 c -5.84 -3.3600000000000003 -9.76 -9.68 -9.76 -16.96 c0 -7.28 3.9200000000000004 -13.600000000000001 9.76 -16.96 C25.84 5.120000000000001 29.760000000000005 11.440000000000001 29.760000000000005 18.72z',
		strokeWidth: '4',
		pathLength: '100'
	}
} satisfies LoadingPathSvgData;

export const loadingOneColor38Svg = {
	viewBox: '0 0 50 31.25',
	width: '50',
	height: '31.25',
	path: {
		d: 'M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25',
		strokeWidth: '4',
		pathLength: '100'
	}
} satisfies LoadingPathSvgData;
