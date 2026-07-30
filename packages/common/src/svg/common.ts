import { reiconBuiltInIconSet } from './reicon.js';
import { tagCloseSvg } from './tag.js';
import type { SvgData, SvgNodeData, SvgPathData } from './types.js';

export { reiconBuiltInIconSet };

const pathDataSvg = (path: SvgPathData, viewBox = '0 0 24 24'): SvgData => ({
	viewBox,
	paths: [path],
	defaultFill: 'currentColor'
});

const pathSvg = (d: string, viewBox = '0 0 24 24'): SvgData => pathDataSvg({ d }, viewBox);

const evenoddPathSvg = (d: string, viewBox = '0 0 24 24'): SvgData =>
	pathDataSvg(
		{
			d,
			fillRule: 'evenodd',
			clipRule: 'evenodd'
		},
		viewBox
	);

const strokePathSvg = (d: string, viewBox = '0 0 24 24', strokeWidth: number | string = 2): SvgData => ({
	viewBox,
	paths: [{ d, strokeLinecap: 'round', strokeLinejoin: 'round' }],
	defaultFill: 'none',
	defaultStroke: 'currentColor',
	defaultStrokeWidth: strokeWidth
});

const lucideSvg = (nodes: readonly SvgNodeData[]): SvgData => ({
	viewBox: '0 0 24 24',
	paths: [],
	nodes: nodes.map((node) => ({ strokeLinecap: 'round', strokeLinejoin: 'round', ...node }) as SvgNodeData),
	defaultFill: 'none',
	defaultStroke: 'currentColor',
	defaultStrokeWidth: 2
});

const lucidePathSvg = (...paths: string[]): SvgData => lucideSvg(paths.map((d) => ({ d })));

const lucideFilledPathSvg = (d: string): SvgData => evenoddPathSvg(d);

const lucideFilledSvg = (...paths: string[]): SvgData => ({
	viewBox: '0 0 24 24',
	paths: paths.map((d) => ({ d })),
	defaultFill: 'currentColor'
});

const phosphorPathSvg = (d: string): SvgData => pathSvg(d, '0 0 256 256');

const phosphorStrokePathSvg = (d: string): SvgData => strokePathSvg(d, '0 0 256 256', 16);

const tablerSvg = (nodes: readonly SvgNodeData[]): SvgData => ({
	viewBox: '0 0 24 24',
	paths: [],
	nodes: nodes.map((node) => ({ strokeLinecap: 'round', strokeLinejoin: 'round', ...node }) as SvgNodeData),
	defaultFill: 'none',
	defaultStroke: 'currentColor',
	defaultStrokeWidth: 2
});

const tablerPathSvg = (...paths: string[]): SvgData => tablerSvg(paths.map((d) => ({ d })));

const tablerFilledPathSvg = (d: string): SvgData => pathSvg(d);

const iconoirSvg = (nodes: readonly SvgNodeData[]): SvgData => ({
	viewBox: '0 0 24 24',
	paths: [],
	nodes: nodes.map((node) => ({ strokeLinecap: 'round', strokeLinejoin: 'round', ...node }) as SvgNodeData),
	defaultFill: 'none',
	defaultStroke: 'currentColor',
	defaultStrokeWidth: 1.5
});

const iconoirPathSvg = (...paths: string[]): SvgData => iconoirSvg(paths.map((d) => ({ d })));

const _iconoirFilledPathSvg = (d: string): SvgData => pathSvg(d);

const iconoirEvenoddPathSvg = (d: string): SvgData => evenoddPathSvg(d);

// 高复用基础图标只保存图形数据，尺寸、颜色和事件由组件层决定。
// Shared base icons store only shape data; size, color, and events stay in component layers.
export const arrowLeftSvg = pathSvg(
	'M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z'
);

export const arrowRightSvg = pathSvg(
	'M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z'
);

export const selectArrowRightSvg = pathSvg(
	'M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z'
);

export const accordionArrowRightSvg = strokePathSvg('M9 5l7 7-7 7');

export const closeSvg = pathSvg(
	'M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z'
);

export const closePlainSvg = pathSvg(
	'M12 10.5858L16.9497 5.63604L18.364 7.05025L13.4142 12L18.364 16.9497L16.9497 18.364L12 13.4142L7.05025 18.364L5.63604 16.9497L10.5858 12L5.63604 7.05025L7.05025 5.63604L12 10.5858Z'
);

export const downSvg = pathSvg(
	'M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z'
);

export const plusSvg = pathSvg('M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z');

export const accordionPlusSvg = strokePathSvg('M12 4v16m8-8H4');

export const minusSvg = pathSvg('M5 11V13H19V11H5Z');

export const moreSvg = pathSvg(
	'M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z'
);

export const moreSmallSvg = pathSvg(
	'M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z'
);

export const statusSuccessSvg = pathSvg(
	'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z'
);

export const statusErrorSvg = pathSvg(
	'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z'
);

export const statusWarningSvg = pathSvg(
	'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z'
);

export const statusInfoSvg = pathSvg(
	'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 7V9H13V7H11ZM11 11V17H13V11H11Z'
);

export const statusSvgByType = {
	success: statusSuccessSvg,
	error: statusErrorSvg,
	warning: statusWarningSvg,
	info: statusInfoSvg
} as const;

export const toastSuccessSvg = pathSvg(
	'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z'
);

export const toastErrorSvg = pathSvg(
	'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z'
);

export const toastWarningSvg = pathSvg(
	'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z'
);

export const toastInfoSvg = pathSvg(
	'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z'
);

export const toastSvgByType = {
	success: toastSuccessSvg,
	error: toastErrorSvg,
	warning: toastWarningSvg,
	info: toastInfoSvg
} as const;

export const circleCloseSvg = statusErrorSvg;

export const formClearSvg = statusErrorSvg;

export const checkboxCheckedSvg = pathSvg(
	'M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z'
);

export const checkboxUncheckedSvg = pathSvg(
	'M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z'
);

export const radioCheckedSvg = pathSvg(
	'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17Z'
);

export const radioUncheckedSvg = pathSvg(
	'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z'
);

export const volumeSvg = pathSvg(
	'M13 7.22056L9.60282 10.0001H6V14.0001H9.60282L13 16.7796V7.22056ZM8.88889 16.0001H5C4.44772 16.0001 4 15.5524 4 15.0001V9.00007C4 8.44778 4.44772 8.00007 5 8.00007H8.88889L14.1834 3.66821C14.3971 3.49335 14.7121 3.52485 14.887 3.73857C14.9601 3.8279 15 3.93977 15 4.05519V19.9449C15 20.2211 14.7761 20.4449 14.5 20.4449C14.3846 20.4449 14.2727 20.405 14.1834 20.3319L8.88889 16.0001ZM18.8631 16.5911L17.4411 15.1691C18.3892 14.4376 19 13.2902 19 12.0001C19 10.5697 18.2493 9.31476 17.1203 8.60766L18.5589 7.16906C20.0396 8.26166 21 10.0187 21 12.0001C21 13.8422 20.1698 15.4905 18.8631 16.5911Z'
);

export const starSvg = pathSvg('M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z');

export const rateStarSvg = pathSvg(
	'M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z'
);

export const avatarUserSvg = pathSvg(
	'M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
);

export const avatarGroupUserSvg = pathSvg(
	'M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z'
);

export const imageRotateSvg = pathSvg(
	'M11 9H21C21.5522 9 22 9.44772 22 10V20C22 20.5523 21.5522 21 21 21H11C10.4477 21 9.99996 20.5523 9.99996 20V10C9.99996 9.44772 10.4477 9 11 9ZM12 11V19H20V11H12ZM5.99996 10.5858L7.82839 8.75736L9.24261 10.1716L4.99996 14.4142L0.757324 10.1716L2.17154 8.75736L3.99996 10.5858V8C3.99996 5.23858 6.23854 3 8.99996 3H13V5H8.99996C7.34311 5 5.99996 6.34315 5.99996 8V10.5858Z'
);

export const imageLineSvg = pathSvg(
	'M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 15.0104V5H4V19L13.2929 9.70711C13.6834 9.31658 14.3166 9.31658 14.7071 9.70711L20 15.0104ZM20 17.8388L14 11.8388L6.83882 19H20V17.8388ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z'
);

export const refreshSvg = pathSvg(
	'M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 9.25022 5.38734 6.82447 7.50024 5.38451L7.5 8H9.5V2L3.5 2V4L5.99918 3.99989C3.57075 5.82434 2 8.72873 2 12Z'
);

export const calendarDisabledSvg = pathSvg(
	'M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333zM170.666667 512a341.333333 341.333333 0 0 0 550.016 270.08L241.92 303.36A339.84 339.84 0 0 0 170.666667 512z m341.333333-341.333333a339.882667 339.882667 0 0 0-209.877333 72.106666L781.226667 721.92A341.333333 341.333333 0 0 0 512 170.666667z',
	'0 0 1024 1024'
);

export const listBackTopSvg = pathSvg(
	'M10.071 4.92896L11.4852 6.34317L6.82834 11L16.0002 11.0002L16.0002 13.0002L6.82839 13L11.4852 17.6569L10.071 19.0711L2.99994 12L10.071 4.92896ZM18.0001 19V4.99997H20.0001V19H18.0001Z'
);

export const listCheckSvg = pathSvg(
	'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z'
);

export const skeletonImageSvg = pathSvg(
	'M5 11.1005L7 9.1005L12.5 14.6005L16 11.1005L19 14.1005V5H5V11.1005ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10Z'
);

export const skeletonVideoSvg = pathSvg(
	'M18.001 20H20V22H12C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 15.2712 20.4293 18.1755 18.001 20ZM12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10ZM8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14ZM16 14C17.1046 14 18 13.1046 18 12C18 10.8954 17.1046 10 16 10C14.8954 10 14 10.8954 14 12C14 13.1046 14.8954 14 16 14ZM12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z'
);

export const skeletonCodeSvg = pathSvg(
	'M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM16.4645 15.5355L20 12L16.4645 8.46447L15.0503 9.87868L17.1716 12L15.0503 14.1213L16.4645 15.5355ZM6.82843 12L8.94975 9.87868L7.53553 8.46447L4 12L7.53553 15.5355L8.94975 14.1213L6.82843 12ZM11.2443 17L14.884 7H12.7557L9.11597 17H11.2443Z'
);

export const skeletonQrSvg = pathSvg(
	'M16 17V16H13V13H16V15H18V17H17V19H15V21H13V18H15V17H16ZM21 21H17V19H19V17H21V21ZM3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM18 13H21V15H18V13ZM6 6V8H8V6H6ZM6 16V18H8V16H6ZM16 6V8H18V6H16Z'
);

export const skeletonBarcodeSvg = pathSvg('M2 4H4V20H2V4ZM6 4H8V20H6V4ZM9 4H12V20H9V4ZM13 4H15V20H13V4ZM16 4H18V20H16V4ZM19 4H22V20H19V4Z');

export const skeletonSvgByType = {
	img: skeletonImageSvg,
	video: skeletonVideoSvg,
	code: skeletonCodeSvg,
	qrcode: skeletonQrSvg,
	barcode: skeletonBarcodeSvg
} as const;

export const builtInIconLibraryList = ['remix', 'lucide', 'phosphor', 'tabler', 'iconoir', 'reicon'] as const;
export type BuiltInIconLibrary = (typeof builtInIconLibraryList)[number];
export const defaultBuiltInIconLibrary: BuiltInIconLibrary = 'remix';
export const builtInIconLibraryLabelMap = {
	remix: 'Remix',
	lucide: 'Lucide',
	phosphor: 'Phosphor',
	tabler: 'Tabler',
	iconoir: 'Iconoir',
	reicon: 'Reicon'
} as const satisfies Record<BuiltInIconLibrary, string>;
type BuiltInIconSet = Readonly<Record<string, SvgData>>;

const builtInIconKeyList = [
	'arrowLeft',
	'arrowRight',
	'selectArrowRight',
	'accordionArrowRight',
	'close',
	'closePlain',
	'down',
	'plus',
	'accordionPlus',
	'minus',
	'more',
	'moreSmall',
	'statusSuccess',
	'statusError',
	'statusWarning',
	'statusInfo',
	'toastSuccess',
	'toastError',
	'toastWarning',
	'toastInfo',
	'circleClose',
	'formClear',
	'checkboxChecked',
	'checkboxUnchecked',
	'radioChecked',
	'radioUnchecked',
	'volume',
	'star',
	'rateStar',
	'avatarUser',
	'avatarGroupUser',
	'imageRotate',
	'imageLine',
	'refresh',
	'calendarDisabled',
	'listBackTop',
	'listCheck',
	'skeletonImage',
	'skeletonVideo',
	'skeletonCode',
	'skeletonQr',
	'skeletonBarcode',
	'tagClose'
] as const;

export const remixBuiltInIconSet = {
	arrowLeft: arrowLeftSvg,
	arrowRight: arrowRightSvg,
	selectArrowRight: selectArrowRightSvg,
	accordionArrowRight: accordionArrowRightSvg,
	close: closeSvg,
	closePlain: closePlainSvg,
	down: downSvg,
	plus: plusSvg,
	accordionPlus: accordionPlusSvg,
	minus: minusSvg,
	more: moreSvg,
	moreSmall: moreSmallSvg,
	statusSuccess: statusSuccessSvg,
	statusError: statusErrorSvg,
	statusWarning: statusWarningSvg,
	statusInfo: statusInfoSvg,
	toastSuccess: toastSuccessSvg,
	toastError: toastErrorSvg,
	toastWarning: toastWarningSvg,
	toastInfo: toastInfoSvg,
	circleClose: circleCloseSvg,
	formClear: formClearSvg,
	checkboxChecked: checkboxCheckedSvg,
	checkboxUnchecked: checkboxUncheckedSvg,
	radioChecked: radioCheckedSvg,
	radioUnchecked: radioUncheckedSvg,
	volume: volumeSvg,
	star: starSvg,
	rateStar: rateStarSvg,
	avatarUser: avatarUserSvg,
	avatarGroupUser: avatarGroupUserSvg,
	imageRotate: imageRotateSvg,
	imageLine: imageLineSvg,
	refresh: refreshSvg,
	calendarDisabled: calendarDisabledSvg,
	listBackTop: listBackTopSvg,
	listCheck: listCheckSvg,
	skeletonImage: skeletonImageSvg,
	skeletonVideo: skeletonVideoSvg,
	skeletonCode: skeletonCodeSvg,
	skeletonQr: skeletonQrSvg,
	skeletonBarcode: skeletonBarcodeSvg,
	tagClose: tagCloseSvg
} as const;

const lucideChevronLeftSvg = lucidePathSvg('m15 18-6-6 6-6');
const lucideChevronRightSvg = lucidePathSvg('m9 18 6-6-6-6');
const lucideChevronDownSvg = lucidePathSvg('m6 9 6 6 6-6');
const lucideXSvg = lucidePathSvg('M18 6 6 18', 'm6 6 12 12');
const lucidePlusSvg = lucidePathSvg('M5 12h14', 'M12 5v14');
const lucideMinusSvg = lucidePathSvg('M5 12h14');
const lucideEllipsisSvg = lucideSvg([
	{ type: 'circle', cx: 12, cy: 12, r: 1 },
	{ type: 'circle', cx: 19, cy: 12, r: 1 },
	{ type: 'circle', cx: 5, cy: 12, r: 1 }
]);
const lucideCircleCheckSvg = lucideSvg([{ type: 'circle', cx: 12, cy: 12, r: 10 }, { d: 'm9 12 2 2 4-4' }]);
const lucideCircleXSvg = lucideSvg([{ type: 'circle', cx: 12, cy: 12, r: 10 }, { d: 'm15 9-6 6' }, { d: 'm9 9 6 6' }]);
const lucideCircleAlertSvg = lucideSvg([
	{ type: 'circle', cx: 12, cy: 12, r: 10 },
	{ type: 'line', x1: 12, y1: 8, x2: 12, y2: 12 },
	{ type: 'line', x1: 12, y1: 16, x2: 12.01, y2: 16 }
]);
const lucideInfoSvg = lucideSvg([{ type: 'circle', cx: 12, cy: 12, r: 10 }, { d: 'M12 16v-4' }, { d: 'M12 8h.01' }]);
const lucideCircleCheckFilledSvg = lucideFilledPathSvg(
	'M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20ZM8.293 11.293a1 1 0 0 1 1.414 0L11 12.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414Z'
);
const lucideCircleXFilledSvg = lucideFilledPathSvg(
	'M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20ZM9.707 8.293 12 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12 8.293 9.707a1 1 0 0 1 1.414-1.414Z'
);
const lucideCircleAlertFilledSvg = lucideFilledPathSvg(
	'M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20Zm0 5a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1Zm0 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z'
);
const lucideInfoFilledSvg = lucideFilledPathSvg(
	'M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20Zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm0 4a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1Z'
);
const lucideSquareCheckFilledSvg = lucideFilledPathSvg(
	'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3.293 8.293a1 1 0 0 1 1.414 0L11 12.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414Z'
);
const lucideSquareSvg = lucideSvg([{ type: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 }]);
const lucideCircleDotFilledSvg = lucideSvg([
	{ type: 'circle', cx: 12, cy: 12, r: 10 },
	{ type: 'circle', cx: 12, cy: 12, r: 2, fill: 'currentColor', stroke: 'none' }
]);
const lucideCircleSvg = lucideSvg([{ type: 'circle', cx: 12, cy: 12, r: 10 }]);
const lucideVolumeSvg = lucidePathSvg(
	'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
	'M16 9a5 5 0 0 1 0 6',
	'M19.364 18.364a9 9 0 0 0 0-12.728'
);
const lucideStarFilledSvg = pathSvg(
	'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'
);
const lucideUserSvg = lucideSvg([{ d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' }, { type: 'circle', cx: 12, cy: 7, r: 4 }]);
const lucideUserPlusSvg = lucideSvg([
	{ d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
	{ type: 'circle', cx: 9, cy: 7, r: 4 },
	{ type: 'line', x1: 19, y1: 8, x2: 19, y2: 14 },
	{ type: 'line', x1: 22, y1: 11, x2: 16, y2: 11 }
]);
const lucideRotateCcwSquareSvg = lucidePathSvg(
	'M20 9V7a2 2 0 0 0-2-2h-6',
	'm15 2-3 3 3 3',
	'M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2'
);
const lucideImageSvg = lucideSvg([
	{ type: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
	{ type: 'circle', cx: 9, cy: 9, r: 2 },
	{ d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' }
]);
const lucideImageFilledSvg = lucideFilledPathSvg(
	'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5.379 3.207L5 19.586V20h14a1 1 0 0 0 1-1v-5.586l-2.086-2.086a2 2 0 0 0-2.828 0l-.707.707Z'
);
const lucideRefreshCwSvg = lucidePathSvg(
	'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8',
	'M21 3v5h-5',
	'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16',
	'M8 16H3v5'
);
const lucideArrowLeftFromLineFilledSvg = lucideFilledSvg(
	'M8.293 5.293 1.586 12l6.707 6.707 1.414-1.414L4.414 12l5.293-5.293-1.414-1.414Z',
	'M3 11h14v2H3Z',
	'M20 5h2v14h-2Z'
);
const lucideFilmFilledSvg = lucideFilledPathSvg(
	'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 1v7h8V4H8Zm0 9v7h8v-7H8ZM4 5v2h2V5H4Zm0 4v2h2V9H4Zm0 4v2h2v-2H4Zm0 4v2h2v-2H4Zm14-12v2h2V5h-2Zm0 4v2h2V9h-2Zm0 4v2h2v-2h-2Zm0 4v2h2v-2h-2Z'
);
const lucideCodeXmlFilledSvg = lucideFilledSvg(
	'M18.707 7.293 23.414 12l-4.707 4.707-1.414-1.414L20.586 12l-3.293-3.293 1.414-1.414Z',
	'M5.293 7.293 7 9l-3 3 3 3-1.707 1.707L.586 12l4.707-4.707Z',
	'M13.546 3.702 15.454 4.298 10.454 20.298 8.546 19.702Z'
);
const lucideQrCodeFilledSvg = lucideFilledPathSvg(
	'M4 3h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 2v1h1V5H5Zm12-2h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 2v1h1V5h-1ZM4 16h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Zm1 2v1h1v-1H5Zm6-12h2v4a1 1 0 0 1-1 1H7v2h3a3 3 0 0 0 3-3V7h-2V6Zm6 9h4v2h-3v4h-2v-5a1 1 0 0 1 1-1Zm3 5h2v2h-2v-2ZM2 11h2v2H2v-2Zm9-9h2v2h-2V2Zm0 13h2v2h-2v-2Zm4-4h3v2h-3v-2Zm5 0h2v2h-2v-2Zm-9 8h2v3h-2v-3Z'
);
const lucideBarcodeFilledSvg = lucideFilledSvg('M2 5h2v14H2Z', 'M7 5h2v14H7Z', 'M11 5h2v14h-2Z', 'M16 5h2v14h-2Z', 'M20 5h2v14h-2Z');
const lucideCalendarOffSvg = lucidePathSvg(
	'M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18',
	'M21 15.5V6a2 2 0 0 0-2-2H9.5',
	'M16 2v4',
	'M3 10h7',
	'M21 10h-5.5',
	'm2 2 20 20'
);

export const lucideBuiltInIconSet = {
	arrowLeft: lucideChevronLeftSvg,
	arrowRight: lucideChevronRightSvg,
	selectArrowRight: lucideChevronRightSvg,
	accordionArrowRight: lucideChevronRightSvg,
	close: lucideXSvg,
	closePlain: lucideXSvg,
	down: lucideChevronDownSvg,
	plus: lucidePlusSvg,
	accordionPlus: lucidePlusSvg,
	minus: lucideMinusSvg,
	more: lucideEllipsisSvg,
	moreSmall: lucideEllipsisSvg,
	statusSuccess: lucideCircleCheckFilledSvg,
	statusError: lucideCircleXFilledSvg,
	statusWarning: lucideCircleAlertFilledSvg,
	statusInfo: lucideInfoFilledSvg,
	toastSuccess: lucideCircleCheckSvg,
	toastError: lucideCircleXSvg,
	toastWarning: lucideCircleAlertSvg,
	toastInfo: lucideInfoSvg,
	circleClose: lucideCircleXFilledSvg,
	formClear: lucideCircleXFilledSvg,
	checkboxChecked: lucideSquareCheckFilledSvg,
	checkboxUnchecked: lucideSquareSvg,
	radioChecked: lucideCircleDotFilledSvg,
	radioUnchecked: lucideCircleSvg,
	volume: lucideVolumeSvg,
	star: lucideStarFilledSvg,
	rateStar: lucideStarFilledSvg,
	avatarUser: lucideUserSvg,
	avatarGroupUser: lucideUserPlusSvg,
	imageRotate: lucideRotateCcwSquareSvg,
	imageLine: lucideImageSvg,
	refresh: lucideRefreshCwSvg,
	calendarDisabled: lucideCalendarOffSvg,
	listBackTop: lucideArrowLeftFromLineFilledSvg,
	listCheck: lucideCircleCheckFilledSvg,
	skeletonImage: lucideImageFilledSvg,
	skeletonVideo: lucideFilmFilledSvg,
	skeletonCode: lucideCodeXmlFilledSvg,
	skeletonQr: lucideQrCodeFilledSvg,
	skeletonBarcode: lucideBarcodeFilledSvg,
	tagClose: lucideXSvg
} as const;

const phosphorCaretLeftSvg = phosphorPathSvg(
	'M165.66 202.34a8 8 0 0 1-11.32 11.32l-80-80a8 8 0 0 1 0-11.32l80-80a8 8 0 0 1 11.32 11.32L91.31 128Z'
);
const phosphorCaretRightSvg = phosphorPathSvg(
	'm181.66 133.66l-80 80a8 8 0 0 1-11.32-11.32L164.69 128L90.34 53.66a8 8 0 0 1 11.32-11.32l80 80a8 8 0 0 1 0 11.32'
);
const phosphorCaretDownSvg = phosphorPathSvg(
	'm213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32'
);
const phosphorAccordionArrowRightSvg = phosphorStrokePathSvg('M96 48l80 80l-80 80');
const phosphorXSvg = phosphorPathSvg(
	'M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z'
);
const phosphorPlusSvg = phosphorPathSvg(
	'M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8'
);
const phosphorAccordionPlusSvg = phosphorStrokePathSvg('M128 40v176M216 128H40');
const phosphorMinusSvg = phosphorPathSvg('M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8');
const phosphorDotsThreeSvg = phosphorPathSvg(
	'M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12m56-12a12 12 0 1 0 12 12a12 12 0 0 0-12-12m-136 0a12 12 0 1 0 12 12a12 12 0 0 0-12-12'
);
const phosphorCheckCircleSvg = phosphorPathSvg(
	'M173.66 98.34a8 8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 0M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88'
);
const phosphorXCircleSvg = phosphorPathSvg(
	'M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88'
);
const phosphorWarningCircleSvg = phosphorPathSvg(
	'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m-8-80V80a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0m20 36a12 12 0 1 1-12-12a12 12 0 0 1 12 12'
);
const phosphorInfoSvg = phosphorPathSvg(
	'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m16-40a8 8 0 0 1-8 8a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 8 8m-32-92a12 12 0 1 1 12 12a12 12 0 0 1-12-12'
);
const phosphorCheckCircleFillSvg = phosphorPathSvg(
	'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32'
);
const phosphorXCircleFillSvg = phosphorPathSvg(
	'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m37.66 130.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32L139.31 128Z'
);
const phosphorWarningCircleFillSvg = phosphorPathSvg(
	'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m-8 56a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm8 104a12 12 0 1 1 12-12a12 12 0 0 1-12 12'
);
const phosphorInfoFillSvg = phosphorPathSvg(
	'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m-4 48a12 12 0 1 1-12 12a12 12 0 0 1 12-12m12 112a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 0 16'
);
const phosphorCheckSquareFillSvg = phosphorPathSvg(
	'M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-34.34 77.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32'
);
const phosphorCheckSquareSvg = phosphorPathSvg(
	'M173.66 98.34a8 8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 0M224 48v160a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16m-16 160V48H48v160z'
);
const phosphorRadioButtonFillSvg = phosphorPathSvg(
	'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m56-88a56 56 0 1 1-56-56a56.06 56.06 0 0 1 56 56'
);
const phosphorCircleSvg = phosphorPathSvg(
	'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88'
);
const phosphorSpeakerHighSvg = phosphorPathSvg(
	'M155.51 24.81a8 8 0 0 0-8.42.88L77.25 80H32a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h45.25l69.84 54.31A8 8 0 0 0 160 224V32a8 8 0 0 0-4.49-7.19M32 96h40v64H32Zm112 111.64l-56-43.55V91.91l56-43.55Zm54-106.08a40 40 0 0 1 0 52.88a8 8 0 0 1-12-10.58a24 24 0 0 0 0-31.72a8 8 0 0 1 12-10.58M248 128a79.9 79.9 0 0 1-20.37 53.34a8 8 0 0 1-11.92-10.67a64 64 0 0 0 0-85.33a8 8 0 1 1 11.92-10.67A79.83 79.83 0 0 1 248 128'
);
const phosphorStarFillSvg = phosphorPathSvg(
	'm234.29 114.85l-45 38.83L203 211.75a16.4 16.4 0 0 1-24.5 17.82L128 198.49l-50.53 31.08A16.4 16.4 0 0 1 53 211.75l13.76-58.07l-45-38.83A16.46 16.46 0 0 1 31.08 86l59-4.76l22.76-55.08a16.36 16.36 0 0 1 30.27 0l22.75 55.08l59 4.76a16.46 16.46 0 0 1 9.37 28.86Z'
);
const phosphorUserSvg = phosphorPathSvg(
	'M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56'
);
const phosphorUserPlusSvg = phosphorPathSvg(
	'M256 136a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0v-16h-16a8 8 0 0 1 0-16h16v-16a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8m-57.87 58.85a8 8 0 0 1-12.26 10.3C165.75 181.19 138.09 168 108 168s-57.75 13.19-77.87 37.15a8 8 0 0 1-12.25-10.3c14.94-17.78 33.52-30.41 54.17-37.17a68 68 0 1 1 71.9 0c20.65 6.76 39.23 19.39 54.18 37.17M108 152a52 52 0 1 0-52-52a52.06 52.06 0 0 0 52 52'
);
const phosphorArrowCounterClockwiseSvg = phosphorPathSvg(
	'M224 128a96 96 0 0 1-94.71 96H128a95.38 95.38 0 0 1-65.9-26.2a8 8 0 0 1 11-11.63a80 80 0 1 0-1.67-114.78a3 3 0 0 1-.26.25L44.59 96H72a8 8 0 0 1 0 16H24a8 8 0 0 1-8-8V56a8 8 0 0 1 16 0v29.8L60.25 60A96 96 0 0 1 224 128'
);
const phosphorImageSvg = phosphorPathSvg(
	'M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 16v102.75l-26.07-26.06a16 16 0 0 0-22.63 0l-20 20l-44-44a16 16 0 0 0-22.62 0L40 149.37V56ZM40 172l52-52l80 80H40Zm176 28h-21.37l-36-36l20-20L216 181.38zm-72-100a12 12 0 1 1 12 12a12 12 0 0 1-12-12'
);
const phosphorArrowsClockwiseSvg = phosphorPathSvg(
	'M224 48v48a8 8 0 0 1-8 8h-48a8 8 0 0 1 0-16h28.69l-14.63-14.63a79.56 79.56 0 0 0-56.13-23.43h-.45a79.52 79.52 0 0 0-55.89 22.77a8 8 0 0 1-11.18-11.44a96 96 0 0 1 135 .79L208 76.69V48a8 8 0 0 1 16 0m-37.59 135.29a80 80 0 0 1-112.47-.66L59.31 168H88a8 8 0 0 0 0-16H40a8 8 0 0 0-8 8v48a8 8 0 0 0 16 0v-28.69l14.63 14.63A95.43 95.43 0 0 0 130 222.06h.53a95.36 95.36 0 0 0 67.07-27.33a8 8 0 0 0-11.18-11.44Z'
);
const phosphorProhibitSvg = phosphorPathSvg(
	'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m88 104a87.56 87.56 0 0 1-20.41 56.28L71.72 60.4A88 88 0 0 1 216 128m-176 0a87.56 87.56 0 0 1 20.41-56.28L184.28 195.6A88 88 0 0 1 40 128'
);
const phosphorArrowLineLeftFillSvg = phosphorPathSvg(
	'M48 40v176a8 8 0 0 1-16 0V40a8 8 0 0 1 16 0m176 80h-72V56a8 8 0 0 0-13.66-5.66l-72 72a8 8 0 0 0 0 11.32l72 72A8 8 0 0 0 152 200v-64h72a8 8 0 0 0 0-16'
);
const phosphorFilmReelFillSvg = phosphorPathSvg(
	'M232 216h-48.64A103.95 103.95 0 1 0 128 232h104a8 8 0 0 0 0-16M80 148a20 20 0 1 1 20-20a20 20 0 0 1-20 20m48 48a20 20 0 1 1 20-20a20 20 0 0 1-20 20m0-96a20 20 0 1 1 20-20a20 20 0 0 1-20 20m28 28a20 20 0 1 1 20 20a20 20 0 0 1-20-20'
);
const phosphorImageFillSvg = phosphorPathSvg(
	'M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m-60 48a12 12 0 1 1-12 12a12 12 0 0 1 12-12m60 112H40v-39.31l46.34-46.35a8 8 0 0 1 11.32 0L165 181.66a8 8 0 0 0 11.32-11.32l-17.66-17.65L173 138.34a8 8 0 0 1 11.31 0L216 170.07z'
);
const _phosphorCodeSvg = phosphorPathSvg(
	'M69.12 94.15L28.5 128l40.62 33.85a8 8 0 1 1-10.24 12.29l-48-40a8 8 0 0 1 0-12.29l48-40a8 8 0 0 1 10.24 12.3m176 27.7l-48-40a8 8 0 1 0-10.24 12.3L227.5 128l-40.62 33.85a8 8 0 1 0 10.24 12.29l48-40a8 8 0 0 0 0-12.29m-82.39-89.37a8 8 0 0 0-10.25 4.79l-64 176a8 8 0 0 0 4.79 10.26A8.1 8.1 0 0 0 96 224a8 8 0 0 0 7.52-5.27l64-176a8 8 0 0 0-4.79-10.25'
);
const phosphorCodeFillSvg = phosphorPathSvg(
	'M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16M92.8 145.6a8 8 0 1 1-9.6 12.8l-32-24a8 8 0 0 1 0-12.8l32-24a8 8 0 0 1 9.6 12.8L69.33 128Zm58.89-71.4l-32 112a8 8 0 1 1-15.38-4.4l32-112a8 8 0 0 1 15.38 4.4m53.11 60.2l-32 24a8 8 0 0 1-9.6-12.8l23.47-17.6l-23.47-17.6a8 8 0 1 1 9.6-12.8l32 24a8 8 0 0 1 0 12.8'
);
const _phosphorQrCodeSvg = phosphorPathSvg(
	'M104 40H56a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 64H56V56h48zm0 32H56a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16m0 64H56v-48h48zm96-160h-48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 64h-48V56h48zm-64 72v-32a8 8 0 0 1 16 0v32a8 8 0 0 1-16 0m80-16a8 8 0 0 1-8 8h-24v40a8 8 0 0 1-8 8h-32a8 8 0 0 1 0-16h24v-56a8 8 0 0 1 16 0v8h24a8 8 0 0 1 8 8m0 32v16a8 8 0 0 1-16 0v-16a8 8 0 0 1 16 0'
);
const phosphorQrCodeFillSvg = phosphorPathSvg(
	'M120 56v48a16 16 0 0 1-16 16H56a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16m-16 80H56a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16m96-96h-48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m-56 144a8 8 0 0 0 8-8v-32a8 8 0 0 0-16 0v32a8 8 0 0 0 8 8m64-32h-24v-8a8 8 0 0 0-16 0v56h-24a8 8 0 0 0 0 16h32a8 8 0 0 0 8-8v-40h24a8 8 0 0 0 0-16m0 32a8 8 0 0 0-8 8v16a8 8 0 0 0 16 0v-16a8 8 0 0 0-8-8'
);
const _phosphorBarcodeSvg = phosphorPathSvg(
	'M232 48v40a8 8 0 0 1-16 0V56h-32a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8M72 200H40v-32a8 8 0 0 0-16 0v40a8 8 0 0 0 8 8h40a8 8 0 0 0 0-16m152-40a8 8 0 0 0-8 8v32h-32a8 8 0 0 0 0 16h40a8 8 0 0 0 8-8v-40a8 8 0 0 0-8-8M32 96a8 8 0 0 0 8-8V56h32a8 8 0 0 0 0-16H32a8 8 0 0 0-8 8v40a8 8 0 0 0 8 8m48-16a8 8 0 0 0-8 8v80a8 8 0 0 0 16 0V88a8 8 0 0 0-8-8m104 88V88a8 8 0 0 0-16 0v80a8 8 0 0 0 16 0m-40-88a8 8 0 0 0-8 8v80a8 8 0 0 0 16 0V88a8 8 0 0 0-8-8m-32 0a8 8 0 0 0-8 8v80a8 8 0 0 0 16 0V88a8 8 0 0 0-8-8'
);
const phosphorBarcodeFillSvg = phosphorPathSvg(
	'M224 40H32a8 8 0 0 0-8 8v160a8 8 0 0 0 8 8h192a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8M40 64a8 8 0 0 1 8-8h32a8 8 0 0 1 0 16H56v24a8 8 0 0 1-16 0Zm40 136H48a8 8 0 0 1-8-8v-32a8 8 0 0 1 16 0v24h24a8 8 0 0 1 0 16m24-48a8 8 0 0 1-16 0v-48a8 8 0 0 1 16 0Zm32 0a8 8 0 0 1-16 0v-48a8 8 0 0 1 16 0Zm24 8a8 8 0 0 1-8-8v-48a8 8 0 0 1 16 0v48a8 8 0 0 1-8 8m56 32a8 8 0 0 1-8 8h-32a8 8 0 0 1 0-16h24v-24a8 8 0 0 1 16 0Zm0-96a8 8 0 0 1-16 0V72h-24a8 8 0 0 1 0-16h32a8 8 0 0 1 8 8Z'
);

export const phosphorBuiltInIconSet = {
	arrowLeft: phosphorCaretLeftSvg,
	arrowRight: phosphorCaretRightSvg,
	selectArrowRight: phosphorCaretRightSvg,
	accordionArrowRight: phosphorAccordionArrowRightSvg,
	close: phosphorXSvg,
	closePlain: phosphorXSvg,
	down: phosphorCaretDownSvg,
	plus: phosphorPlusSvg,
	accordionPlus: phosphorAccordionPlusSvg,
	minus: phosphorMinusSvg,
	more: phosphorDotsThreeSvg,
	moreSmall: phosphorDotsThreeSvg,
	statusSuccess: phosphorCheckCircleFillSvg,
	statusError: phosphorXCircleFillSvg,
	statusWarning: phosphorWarningCircleFillSvg,
	statusInfo: phosphorInfoFillSvg,
	toastSuccess: phosphorCheckCircleSvg,
	toastError: phosphorXCircleSvg,
	toastWarning: phosphorWarningCircleSvg,
	toastInfo: phosphorInfoSvg,
	circleClose: phosphorXCircleFillSvg,
	formClear: phosphorXCircleFillSvg,
	checkboxChecked: phosphorCheckSquareFillSvg,
	checkboxUnchecked: phosphorCheckSquareSvg,
	radioChecked: phosphorRadioButtonFillSvg,
	radioUnchecked: phosphorCircleSvg,
	volume: phosphorSpeakerHighSvg,
	star: phosphorStarFillSvg,
	rateStar: phosphorStarFillSvg,
	avatarUser: phosphorUserSvg,
	avatarGroupUser: phosphorUserPlusSvg,
	imageRotate: phosphorArrowCounterClockwiseSvg,
	imageLine: phosphorImageSvg,
	refresh: phosphorArrowsClockwiseSvg,
	calendarDisabled: phosphorProhibitSvg,
	listBackTop: phosphorArrowLineLeftFillSvg,
	listCheck: phosphorCheckCircleFillSvg,
	skeletonImage: phosphorImageFillSvg,
	skeletonVideo: phosphorFilmReelFillSvg,
	skeletonCode: phosphorCodeFillSvg,
	skeletonQr: phosphorQrCodeFillSvg,
	skeletonBarcode: phosphorBarcodeFillSvg,
	tagClose: phosphorXSvg
} as const;

const tablerChevronLeftSvg = tablerPathSvg('m15 6l-6 6l6 6');
const tablerChevronRightSvg = tablerPathSvg('m9 6l6 6l-6 6');
const tablerChevronDownSvg = tablerPathSvg('m6 9l6 6l6-6');
const tablerXSvg = tablerPathSvg('M18 6L6 18M6 6l12 12');
const tablerPlusSvg = tablerPathSvg('M12 5v14m-7-7h14');
const tablerMinusSvg = tablerPathSvg('M5 12h14');
const tablerDotsSvg = tablerPathSvg('M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0');
const tablerCircleCheckSvg = tablerPathSvg('M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'm9 12l2 2l4-4');
const tablerCircleXSvg = tablerPathSvg('M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m7-2l4 4m0-4l-4 4');
const tablerAlertCircleSvg = tablerPathSvg('M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-4v4m0 4h.01');
const tablerInfoCircleSvg = tablerPathSvg('M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-3h.01', 'M11 12h1v4h1');
const tablerCircleCheckFilledSvg = tablerFilledPathSvg(
	'M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-1.293 5.953a1 1 0 0 0-1.32-.083l-.094.083L11 12.585l-1.293-1.292l-.094-.083a1 1 0 0 0-1.403 1.403l.083.094l2 2l.094.083a1 1 0 0 0 1.226 0l.094-.083l4-4l.083-.094a1 1 0 0 0-.083-1.32'
);
const tablerCircleXFilledSvg = tablerFilledPathSvg(
	'M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34m-6.489 5.8a1 1 0 0 0-1.218 1.567L10.585 12l-1.292 1.293l-.083.094a1 1 0 0 0 1.497 1.32L12 13.415l1.293 1.292l.094.083a1 1 0 0 0 1.32-1.497L13.415 12l1.292-1.293l.083-.094a1 1 0 0 0-1.497-1.32L12 10.585l-1.293-1.292l-.094-.083z'
);
const tablerAlertCircleFilledSvg = tablerFilledPathSvg(
	'M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1-19.995.324L2 12l.004-.28C2.152 6.327 6.57 2 12 2m.01 13l-.127.007a1 1 0 0 0 0 1.986L12 17l.127-.007a1 1 0 0 0 0-1.986zM12 7a1 1 0 0 0-.993.883L11 8v4l.007.117a1 1 0 0 0 1.986 0L13 12V8l-.007-.117A1 1 0 0 0 12 7'
);
const tablerInfoCircleFilledSvg = tablerFilledPathSvg(
	'M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1-19.995.324L2 12l.004-.28C2.152 6.327 6.57 2 12 2m0 9h-1l-.117.007a1 1 0 0 0 0 1.986L11 13v3l.007.117a1 1 0 0 0 .876.876L12 17h1l.117-.007a1 1 0 0 0 .876-.876L14 16l-.007-.117a1 1 0 0 0-.764-.857l-.112-.02L13 15v-3l-.007-.117a1 1 0 0 0-.876-.876zm.01-3l-.127.007a1 1 0 0 0 0 1.986L12 10l.127-.007a1 1 0 0 0 0-1.986z'
);
const tablerSquareCheckFilledSvg = tablerFilledPathSvg(
	'M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005.195v12.666c0 1.96-1.537 3.56-3.472 3.662l-.195.005H5.667a3.667 3.667 0 0 1-3.662-3.472L2 18.333V5.667c0-1.96 1.537-3.56 3.472-3.662L5.667 2zm-2.626 7.293a1 1 0 0 0-1.414 0L11 12.585l-1.293-1.292l-.094-.083a1 1 0 0 0-1.32 1.497l2 2l.094.083a1 1 0 0 0 1.32-.083l4-4l.083-.094a1 1 0 0 0-.083-1.32'
);
const tablerSquareCheckSvg = tablerPathSvg('M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'm9 12l2 2l4-4');
const _tablerCircleDotFilledSvg = tablerFilledPathSvg(
	'M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34M12 10a2 2 0 0 0-1.977 1.697l-.018.154L10 12l.005.15A2 2 0 1 0 12 10'
);
const _tablerCircleDotSvg = tablerPathSvg('M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0', 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0');
const tablerCircleSvg = tablerPathSvg('M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0');
const tablerVolumeSvg = tablerPathSvg(
	'M15 8a5 5 0 0 1 0 8m2.7-11a9 9 0 0 1 0 14M6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l3.5-4.5A.8.8 0 0 1 11 5v14a.8.8 0 0 1-1.5.5z'
);
const tablerStarFilledSvg = tablerFilledPathSvg(
	'm8.243 7.34l-6.38.925l-.113.023a1 1 0 0 0-.44 1.684l4.622 4.499l-1.09 6.355l-.013.11a1 1 0 0 0 1.464.944l5.706-3l5.693 3l.1.046a1 1 0 0 0 1.352-1.1l-1.091-6.355l4.624-4.5l.078-.085a1 1 0 0 0-.633-1.62l-6.38-.926l-2.852-5.78a1 1 0 0 0-1.794 0z'
);
const tablerUserSvg = tablerPathSvg('M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0', 'M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2');
const tablerUserPlusSvg = tablerPathSvg('M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0m8 12h6m-3-3v6M6 21v-2a4 4 0 0 1 4-4h4');
const tablerRotateRectangleSvg = tablerPathSvg(
	'm10.09 4.01l.496-.495a2 2 0 0 1 2.828 0l7.071 7.07a2 2 0 0 1 0 2.83l-7.07 7.07a2 2 0 0 1-2.83 0l-7.07-7.07a2 2 0 0 1 0-2.83L7.05 7.05H3.062m3.988 3.988V7.05'
);
const tablerPhotoSvg = tablerPathSvg(
	'M15 8h.01M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z',
	'm3 16l5-5c.928-.893 2.072-.893 3 0l5 5',
	'm14 14l1-1c.928-.893 2.072-.893 3 0l3 3'
);
const tablerRefreshSvg = tablerPathSvg('M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4m-4 4a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4');
const tablerCircleOffSvg = tablerPathSvg('M20.042 16.045A9 9 0 0 0 7.955 3.958M5.637 5.635a9 9 0 1 0 12.725 12.73M3 3l18 18');
const tablerArrowBarLeftSvg = tablerPathSvg('M4 12h10M4 12l4 4m-4-4l4-4m12-4v16');
const tablerPhotoFilledSvg = tablerFilledPathSvg(
	'M8.813 11.612c.457-.38.918-.38 1.386.011l.108.098l4.986 4.986l.094.083a1 1 0 0 0 1.403-1.403l-.083-.094L15.415 14l.292-.293l.106-.095c.457-.38.918-.38 1.386.011l.108.098l4.674 4.675a4 4 0 0 1-3.775 3.599L18 22H6a4 4 0 0 1-3.98-3.603l6.687-6.69zM18 2a4 4 0 0 1 3.995 3.8L22 6v9.585l-3.293-3.292l-.15-.137c-1.256-1.095-2.85-1.097-4.096-.017l-.154.14l-.307.306l-2.293-2.292l-.15-.137c-1.256-1.095-2.85-1.097-4.096-.017l-.154.14L2 15.585V6a4 4 0 0 1 3.8-3.995L6 2zm-2.99 5l-.127.007a1 1 0 0 0 0 1.986L15 9l.127-.007a1 1 0 0 0 0-1.986z'
);
const tablerMovieSvg = tablerPathSvg(
	'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm4-2v16m8-16v16M4 8h4m-4 8h4m-4-4h16m-4-4h4m-4 8h4'
);
const _tablerCodeSvg = tablerPathSvg('m7 8l-4 4l4 4m10-8l4 4l-4 4M14 4l-4 16');
const tablerCodeCircleFilledSvg = tablerFilledPathSvg(
	'M17 3.34A10 10 0 1 1 2 12l.005-.324A10 10 0 0 1 17 3.34m-6.293 5.953a1 1 0 0 0-1.414 0l-2 2a1 1 0 0 0 0 1.414l2 2a1 1 0 0 0 1.414 0l.083-.094a1 1 0 0 0-.083-1.32L9.415 12l1.292-1.293a1 1 0 0 0 0-1.414m4 0a1 1 0 0 0-1.414 0l-.083.094a1 1 0 0 0 .083 1.32L14.585 12l-1.292 1.293a1 1 0 0 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414z'
);
const tablerQrcodeSvg = tablerPathSvg(
	'M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm3 12v.01M14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM7 7v.01M4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm13-8v.01M14 14h3m3 0v.01M14 14v3m0 3h3m0-3h3m0 0v3'
);
const tablerBarcodeSvg = tablerPathSvg(
	'M4 7V6a2 2 0 0 1 2-2h2M4 17v1a2 2 0 0 0 2 2h2m8-16h2a2 2 0 0 1 2 2v1m-4 13h2a2 2 0 0 0 2-2v-1M5 11h1v2H5zm5 0v2m4-2h1v2h-1zm5 0v2'
);

export const tablerBuiltInIconSet = {
	arrowLeft: tablerChevronLeftSvg,
	arrowRight: tablerChevronRightSvg,
	selectArrowRight: tablerChevronRightSvg,
	accordionArrowRight: tablerChevronRightSvg,
	close: tablerXSvg,
	closePlain: tablerXSvg,
	down: tablerChevronDownSvg,
	plus: tablerPlusSvg,
	accordionPlus: tablerPlusSvg,
	minus: tablerMinusSvg,
	more: tablerDotsSvg,
	moreSmall: tablerDotsSvg,
	statusSuccess: tablerCircleCheckFilledSvg,
	statusError: tablerCircleXFilledSvg,
	statusWarning: tablerAlertCircleFilledSvg,
	statusInfo: tablerInfoCircleFilledSvg,
	toastSuccess: tablerCircleCheckSvg,
	toastError: tablerCircleXSvg,
	toastWarning: tablerAlertCircleSvg,
	toastInfo: tablerInfoCircleSvg,
	circleClose: tablerCircleXFilledSvg,
	formClear: tablerCircleXFilledSvg,
	checkboxChecked: tablerSquareCheckFilledSvg,
	checkboxUnchecked: tablerSquareCheckSvg,
	radioChecked: tablerCircleCheckFilledSvg,
	radioUnchecked: tablerCircleSvg,
	volume: tablerVolumeSvg,
	star: tablerStarFilledSvg,
	rateStar: tablerStarFilledSvg,
	avatarUser: tablerUserSvg,
	avatarGroupUser: tablerUserPlusSvg,
	imageRotate: tablerRotateRectangleSvg,
	imageLine: tablerPhotoSvg,
	refresh: tablerRefreshSvg,
	calendarDisabled: tablerCircleOffSvg,
	listBackTop: tablerArrowBarLeftSvg,
	listCheck: tablerCircleCheckFilledSvg,
	skeletonImage: tablerPhotoFilledSvg,
	skeletonVideo: tablerMovieSvg,
	skeletonCode: tablerCodeCircleFilledSvg,
	skeletonQr: tablerQrcodeSvg,
	skeletonBarcode: tablerBarcodeSvg,
	tagClose: tablerXSvg
} as const;

const iconoirNavArrowLeftSvg = iconoirPathSvg('m15 6l-6 6l6 6');
const iconoirNavArrowRightSvg = iconoirPathSvg('m9 6l6 6l-6 6');
const iconoirNavArrowDownSvg = iconoirPathSvg('m6 9l6 6l6-6');
const iconoirXmarkSvg = iconoirPathSvg('M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243');
const iconoirPlusSvg = iconoirPathSvg('M6 12h6m6 0h-6m0 0V6m0 6v6');
const iconoirMinusSvg = iconoirPathSvg('M6 12h12');
const iconoirMoreHorizCircleSvg = iconoirSvg([
	{
		d: 'M7 12.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m5 0a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m5 0a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1',
		fill: 'currentColor',
		stroke: 'none'
	},
	{ d: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10' }
]);
const iconoirCheckCircleSvg = iconoirPathSvg('m7 12.5l3 3l7-7', 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10');
const iconoirXmarkCircleSvg = iconoirPathSvg(
	'M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10'
);
const iconoirWarningCircleSvg = iconoirPathSvg(
	'M12 7v6m0 4.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10'
);
const iconoirInfoCircleSvg = iconoirPathSvg(
	'M12 11.5v5m0-8.99l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10'
);
const iconoirCheckCircleSolidSvg = iconoirEvenoddPathSvg(
	'M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M7.53 11.97a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l7-7a.75.75 0 0 0-1.06-1.06L10 14.44z'
);
const iconoirXmarkCircleSolidSvg = iconoirEvenoddPathSvg(
	'M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M9.702 8.641a.75.75 0 0 0-1.061 1.06L10.939 12l-2.298 2.298a.75.75 0 0 0 1.06 1.06L12 13.062l2.298 2.298a.75.75 0 0 0 1.06-1.06L13.06 12l2.298-2.298a.75.75 0 1 0-1.06-1.06L12 10.938z'
);
const iconoirWarningCircleSolidSvg = iconoirEvenoddPathSvg(
	'M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12M12 6.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75m.568 11.25a.75.75 0 0 0-1.115-1.003l-.01.011a.75.75 0 0 0 1.114 1.004z'
);
const iconoirInfoCircleSolidSvg = iconoirEvenoddPathSvg(
	'M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12M12 10.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75M12.568 8a.75.75 0 1 0-1.115-1.003l-.01.011a.75.75 0 1 0 1.114 1.004z'
);
const iconoirCheckSquareSolidSvg = iconoirEvenoddPathSvg(
	'M3.6 2.25A1.35 1.35 0 0 0 2.25 3.6v16.8c0 .746.604 1.35 1.35 1.35h16.8a1.35 1.35 0 0 0 1.35-1.35V3.6a1.35 1.35 0 0 0-1.35-1.35zm13.93 6.78a.75.75 0 0 0-1.06-1.06L10 14.44l-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0z'
);
const iconoirCheckSquareSvg = iconoirPathSvg(
	'M3 20.4V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6Z',
	'm7 12.5l3 3l7-7'
);
const iconoirCircleSvg = iconoirPathSvg('M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10');
const iconoirSkipPrevSolidSvg = iconoirSvg([
	{ d: 'M6 7v10' },
	{ d: 'M17.028 5.267a.6.6 0 0 1 .972.471v12.524a.6.6 0 0 1-.972.47l-7.931-6.261a.6.6 0 0 1 0-.942z', fill: 'currentColor' }
]);
const iconoirStarSolidSvg = pathDataSvg({
	d: 'm8.587 8.236l2.598-5.232a.911.911 0 0 1 1.63 0l2.598 5.232l5.808.844a.902.902 0 0 1 .503 1.542l-4.202 4.07l.992 5.75c.127.738-.653 1.3-1.32.952L12 18.678l-5.195 2.716c-.666.349-1.446-.214-1.319-.953l.992-5.75l-4.202-4.07a.902.902 0 0 1 .503-1.54z',
	stroke: 'currentColor',
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
	strokeWidth: 1.5
});
const iconoirUserSvg = iconoirPathSvg('M5 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8');
const iconoirUserPlusSvg = iconoirPathSvg(
	'M17 10h3m3 0h-3m0 0V7m0 3v3M1 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8'
);
const iconoirSoundHighSvg = iconoirPathSvg(
	'M1 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H3a2 2 0 0 1-2-2Z',
	'M17.5 7.5S19 9 19 11.5s-1.5 4-1.5 4m3-11S23 7 23 11.5s-2.5 7-2.5 7'
);
const iconoirRotateCameraLeftSvg = iconoirPathSvg(
	'M2.05 3v4.497c0 .278.226.503.504.503v0c.2 0 .38-.119.466-.3A10 10 0 0 1 12.05 2c5.186 0 9.45 3.947 9.951 9m0 10v-4.497a.503.503 0 0 0-.503-.503v0a.52.52 0 0 0-.465.3A10 10 0 0 1 12 22c-5.185 0-9.448-3.947-9.95-9',
	'M6 16.4V9.394a.6.6 0 0 1 .6-.6h1.173a.6.6 0 0 0 .504-.275l1.446-2.244A.6.6 0 0 1 10.227 6h3.546a.6.6 0 0 1 .504.275l1.446 2.244a.6.6 0 0 0 .504.275H17.4a.6.6 0 0 1 .6.6V16.4a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6',
	'M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4'
);
const iconoirMediaImageSvg = iconoirPathSvg(
	'M21 3.6v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6',
	'm3 16l7-3l11 5m-5-8a2 2 0 1 1 0-4a2 2 0 0 1 0 4'
);
const iconoirRefreshSvg = iconoirPathSvg(
	'M21.888 13.5C21.164 18.311 17.013 22 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2c4.1 0 7.625 2.468 9.168 6',
	'M17 8h4.4a.6.6 0 0 0 .6-.6V3'
);
const iconoirProhibitionSvg = iconoirPathSvg(
	'M19.141 5A9.97 9.97 0 0 0 12 2C6.477 2 2 6.477 2 12a9.97 9.97 0 0 0 2.859 7M19.14 5A9.97 9.97 0 0 1 22 12c0 5.523-4.477 10-10 10a9.97 9.97 0 0 1-7.141-3M19.14 5L4.86 19'
);
const _iconoirUploadSvg = iconoirPathSvg('M6 20h12m-6-4V4m0 0l3.5 3.5M12 4L8.5 7.5');
const iconoirCinemaOldSvg = iconoirPathSvg(
	'M7 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m10 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-5-5a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4',
	'M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2S2 6.477 2 12m0 0v10'
);
const iconoirCodeSvg = iconoirPathSvg('M13.5 6L10 18.5m-3.5-10L3 12l3.5 3.5m11-7L21 12l-3.5 3.5');
const iconoirQrCodeSvg = iconoirPathSvg(
	'M15 12v3M12 3v3m6 6v3m-6 3h9m-3 3h3M6 12h3M6 6.011L6.01 6M12 12.011l.01-.011M3 12.011L3.01 12M12 9.011L12.01 9M12 15.011l.01-.011M15 21.011l.01-.011m-3.01.011l.01-.011M21 12.011l.01-.011M21 15.011l.01-.011M18 6.011L18.01 6M9 3.6v4.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6m12 0v4.8a.6.6 0 0 1-.6.6h-4.8a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6M6 18.011L6.01 18M9 15.6v4.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6v-4.8a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6'
);
const iconoirBarcodeSvg = iconoirPathSvg('M5 19V5h1m6 14V5h1M9 5v14m7-14v14m3-14v14M6 5v14H5m8-14v14h-1');

export const iconoirBuiltInIconSet = {
	arrowLeft: iconoirNavArrowLeftSvg,
	arrowRight: iconoirNavArrowRightSvg,
	selectArrowRight: iconoirNavArrowRightSvg,
	accordionArrowRight: iconoirNavArrowRightSvg,
	close: iconoirXmarkSvg,
	closePlain: iconoirXmarkSvg,
	down: iconoirNavArrowDownSvg,
	plus: iconoirPlusSvg,
	accordionPlus: iconoirPlusSvg,
	minus: iconoirMinusSvg,
	more: iconoirMoreHorizCircleSvg,
	moreSmall: iconoirMoreHorizCircleSvg,
	statusSuccess: iconoirCheckCircleSolidSvg,
	statusError: iconoirXmarkCircleSolidSvg,
	statusWarning: iconoirWarningCircleSolidSvg,
	statusInfo: iconoirInfoCircleSolidSvg,
	toastSuccess: iconoirCheckCircleSvg,
	toastError: iconoirXmarkCircleSvg,
	toastWarning: iconoirWarningCircleSvg,
	toastInfo: iconoirInfoCircleSvg,
	circleClose: iconoirXmarkCircleSolidSvg,
	formClear: iconoirXmarkCircleSolidSvg,
	checkboxChecked: iconoirCheckSquareSolidSvg,
	checkboxUnchecked: iconoirCheckSquareSvg,
	radioChecked: iconoirCheckCircleSvg,
	radioUnchecked: iconoirCircleSvg,
	volume: iconoirSoundHighSvg,
	star: iconoirStarSolidSvg,
	rateStar: iconoirStarSolidSvg,
	avatarUser: iconoirUserSvg,
	avatarGroupUser: iconoirUserPlusSvg,
	imageRotate: iconoirRotateCameraLeftSvg,
	imageLine: iconoirMediaImageSvg,
	refresh: iconoirRefreshSvg,
	calendarDisabled: iconoirProhibitionSvg,
	listBackTop: iconoirSkipPrevSolidSvg,
	listCheck: iconoirCheckCircleSolidSvg,
	skeletonImage: iconoirMediaImageSvg,
	skeletonVideo: iconoirCinemaOldSvg,
	skeletonCode: iconoirCodeSvg,
	skeletonQr: iconoirQrCodeSvg,
	skeletonBarcode: iconoirBarcodeSvg,
	tagClose: iconoirXmarkSvg
} as const;

export const builtInIconSetByLibrary = {
	remix: remixBuiltInIconSet,
	lucide: lucideBuiltInIconSet,
	phosphor: phosphorBuiltInIconSet,
	tabler: tablerBuiltInIconSet,
	iconoir: iconoirBuiltInIconSet,
	reicon: reiconBuiltInIconSet
} as const;

export const builtInIconGalleryList = builtInIconKeyList.map((key) => ({ key, label: key })) as readonly {
	readonly key: string;
	readonly label: string;
}[];

const builtInIconKeyBySvg = new WeakMap<SvgData, string>();

builtInIconKeyList.forEach((key) => {
	builtInIconKeyBySvg.set(remixBuiltInIconSet[key], key);
	builtInIconKeyBySvg.set(lucideBuiltInIconSet[key], key);
	builtInIconKeyBySvg.set(phosphorBuiltInIconSet[key], key);
	builtInIconKeyBySvg.set(tablerBuiltInIconSet[key], key);
	builtInIconKeyBySvg.set(iconoirBuiltInIconSet[key], key);
	builtInIconKeyBySvg.set(reiconBuiltInIconSet[key], key);
});

export const resolveBuiltInIconSet = (library: BuiltInIconLibrary = defaultBuiltInIconLibrary): BuiltInIconSet =>
	builtInIconSetByLibrary[library] || builtInIconSetByLibrary[defaultBuiltInIconLibrary];

export const resolveBuiltInSvg = (key: string, library: BuiltInIconLibrary = defaultBuiltInIconLibrary): SvgData =>
	resolveBuiltInIconSet(library)[key] || resolveBuiltInIconSet(defaultBuiltInIconLibrary)[key];

export const resolveBuiltInSvgFromData = (svg: SvgData, library: BuiltInIconLibrary = defaultBuiltInIconLibrary): SvgData => {
	const key = builtInIconKeyBySvg.get(svg);
	if (!key) return svg;
	return resolveBuiltInSvg(key, library);
};

export const resolveStatusSvgByType = (library: BuiltInIconLibrary = defaultBuiltInIconLibrary) => {
	const iconSet = resolveBuiltInIconSet(library);
	return {
		success: iconSet.statusSuccess,
		error: iconSet.statusError,
		warning: iconSet.statusWarning,
		info: iconSet.statusInfo
	} as const;
};

export const resolveToastSvgByType = (library: BuiltInIconLibrary = defaultBuiltInIconLibrary) => {
	const iconSet = resolveBuiltInIconSet(library);
	return {
		success: iconSet.toastSuccess,
		error: iconSet.toastError,
		warning: iconSet.toastWarning,
		info: iconSet.toastInfo
	} as const;
};

export const resolveSkeletonSvgByType = (library: BuiltInIconLibrary = defaultBuiltInIconLibrary) => {
	const iconSet = resolveBuiltInIconSet(library);
	return {
		img: iconSet.skeletonImage,
		video: iconSet.skeletonVideo,
		code: iconSet.skeletonCode,
		qrcode: iconSet.skeletonQr,
		barcode: iconSet.skeletonBarcode
	} as const;
};

// 输入 Skeleton 类型，返回匹配的 SVG 数据；不包含 DOM、样式或事件。
// Resolve a Skeleton type to SVG data only; no DOM, styles, or events are included.
export const resolveSkeletonSvg = (type?: string, library: BuiltInIconLibrary = defaultBuiltInIconLibrary): SvgData | undefined =>
	resolveSkeletonSvgByType(library)[type as keyof typeof skeletonSvgByType];
