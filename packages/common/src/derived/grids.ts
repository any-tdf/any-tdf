import { joinClasses, resolveClassMapValue } from './helpers.js';

export const gridRowObj = {
	'1': 'row-span-1',
	'2': 'row-span-2',
	'3': 'row-span-3',
	'4': 'row-span-4',
	'5': 'row-span-5',
	'6': 'row-span-6'
} as const;

export const gridColObj = {
	'1': ' col-span-1',
	'2': ' col-span-2',
	'3': ' col-span-3',
	'4': ' col-span-4',
	'5': ' col-span-5',
	'6': ' col-span-6',
	'7': ' col-span-7',
	'8': ' col-span-8',
	'9': ' col-span-9',
	'10': ' col-span-10',
	'11': ' col-span-11',
	'12': ' col-span-12'
} as const;

export const gridsColsObj = {
	'1': ' grid-cols-1',
	'2': ' grid-cols-2',
	'3': ' grid-cols-3',
	'4': ' grid-cols-4',
	'5': ' grid-cols-5',
	'6': ' grid-cols-6',
	'7': ' grid-cols-7',
	'8': ' grid-cols-8',
	'9': ' grid-cols-9',
	'10': ' grid-cols-10',
	'11': ' grid-cols-11',
	'12': ' grid-cols-12'
} as const;

export const gridsMxObj = {
	'0': ' mx-0',
	'1': ' mx-1',
	'2': ' mx-2',
	'4': ' mx-4',
	'8': ' mx-8'
} as const;

export const gridsMyObj = {
	'0': ' my-0',
	'1': ' my-1',
	'2': ' my-2',
	'4': ' my-4',
	'8': ' my-8'
} as const;

export const gridsGapObj = {
	'0': ' gap-0',
	'1': ' gap-1',
	'2': ' gap-2',
	'4': ' gap-4',
	'8': ' gap-8'
} as const;

export type GridRowKey = keyof typeof gridRowObj | string;
export type GridColKey = keyof typeof gridColObj | string;
export type GridsColsKey = keyof typeof gridsColsObj | string;
export type GridsGapKey = keyof typeof gridsGapObj | string;
export type GridsMxKey = keyof typeof gridsMxObj | string;
export type GridsMyKey = keyof typeof gridsMyObj | string;
export type GridDerived = {
	itemClass: string;
};
export type GridsDerived = {
	containerClass: string;
};
export type ResolveGridDerivedOptions = {
	row?: GridRowKey;
	col?: GridColKey;
};
export type ResolveGridsDerivedOptions = {
	cols?: GridsColsKey;
	gap?: GridsGapKey;
	mx?: GridsMxKey;
	my?: GridsMyKey;
};
export type GridStatePropsLike = Partial<ResolveGridDerivedOptions>;
export type GridsStatePropsLike = Partial<ResolveGridsDerivedOptions>;
export type ResolveGridStateOptionsParams = {
	props: GridStatePropsLike;
};
export type ResolveGridsStateOptionsParams = {
	props: GridsStatePropsLike;
};

const resolveTrimmedClassMapValue = <T extends Record<string, string>, K extends keyof T>(
	map: T,
	key: K | string | number | undefined,
	fallback: K
): string => resolveClassMapValue(map, key, fallback).trim();

// 输入 Grid 布局状态，返回组件层可直接绑定的 class。
// Resolve Grid layout state into a class string that components can bind directly.
export const resolveGridItemClass = ({ row = '1', col = '1' }: ResolveGridDerivedOptions = {}): string =>
	joinClasses([resolveTrimmedClassMapValue(gridRowObj, row, '1'), resolveTrimmedClassMapValue(gridColObj, col, '1')]);

// 输入 Grids 容器布局状态，返回组件层可直接绑定的 class。
// Resolve Grids container layout state into a class string that components can bind directly.
export const resolveGridsContainerClass = ({ cols = '6', gap = '2', mx = '2', my = '2' }: ResolveGridsDerivedOptions = {}): string =>
	joinClasses([
		'grid',
		resolveTrimmedClassMapValue(gridsColsObj, cols, '6'),
		resolveTrimmedClassMapValue(gridsMxObj, mx, '2'),
		resolveTrimmedClassMapValue(gridsMyObj, my, '2'),
		resolveTrimmedClassMapValue(gridsGapObj, gap, '2')
	]);

// 输入组件 props，返回框架无关的 Grid 派生入参。
// Receive component props and return framework-agnostic Grid derivation options.
export const resolveGridStateOptions = ({ props }: ResolveGridStateOptionsParams): ResolveGridDerivedOptions => ({
	col: props.col,
	row: props.row
});

// 输入组件 props，返回框架无关的 Grids 派生入参。
// Receive component props and return framework-agnostic Grids derivation options.
export const resolveGridsStateOptions = ({ props }: ResolveGridsStateOptionsParams): ResolveGridsDerivedOptions => ({
	cols: props.cols,
	gap: props.gap,
	mx: props.mx,
	my: props.my
});

// 输入 Grid 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Grid state and return framework-agnostic derived values ready for component binding.
export const resolveGridDerived = (options: ResolveGridDerivedOptions = {}): GridDerived => ({
	itemClass: resolveGridItemClass(options)
});

// 输入 Grids 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Grids state and return framework-agnostic derived values ready for component binding.
export const resolveGridsDerived = (options: ResolveGridsDerivedOptions = {}): GridsDerived => ({
	containerClass: resolveGridsContainerClass(options)
});
