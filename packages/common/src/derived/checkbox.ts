import { resolveSelectionGroupClass, type SelectionLayout } from './selection.js';

// 输入外部 Checkbox 选中值，返回组件内部可写入的选中数组。
// Normalize external Checkbox checked values into an internal writable checked array.
export const resolveCheckboxInitialCheckeds = (checkeds?: readonly string[] | null): string[] => [...(checkeds ?? [])];

// 输入 Checkbox 当前选中值和点击项，返回下一组选中值。
// Resolve Checkbox checked values and clicked item into the next checked values.
export const resolveCheckboxNextCheckeds = (checkeds: string[] = [], name: string) =>
	checkeds.includes(name) ? checkeds.filter((value) => value !== name) : [name, ...checkeds];

export type ResolveCheckboxClickActionOptions = {
	checkeds?: string[];
	name: string;
};

export type CheckboxClickAction = {
	nextCheckeds: string[];
	shouldEmit: true;
};
export type ResolveCheckboxDerivedOptions<TItem extends { name: string } = { name: string }> = {
	checkeds?: readonly string[];
	data?: readonly TItem[];
	layout?: SelectionLayout;
};
export type CheckboxStatePropsLike<TItem extends { name: string } = { name: string }> = Partial<
	Omit<ResolveCheckboxDerivedOptions<TItem>, 'checkeds'>
>;
export type ResolveCheckboxStateOptionsParams<TItem extends { name: string } = { name: string }> = {
	checkeds?: readonly string[];
	props: CheckboxStatePropsLike<TItem>;
};
export type CheckboxItemState<TItem> = {
	checked: boolean;
	item: TItem;
};
export type CheckboxDerived<TItem> = {
	groupClass: string;
	itemStates: CheckboxItemState<TItem>[];
};

// 输入 Checkbox 点击状态，返回组件层可消费的下一组选中值。
// Consume Checkbox click state and return next checked values for component usage.
export const resolveCheckboxClickAction = ({ checkeds = [], name }: ResolveCheckboxClickActionOptions): CheckboxClickAction => ({
	nextCheckeds: resolveCheckboxNextCheckeds(checkeds, name),
	shouldEmit: true
});

// 输入 Checkbox 当前选中值和项名称，返回框架无关的选中态。
// Resolve Checkbox checked values and item name into a framework-agnostic checked state.
export const resolveCheckboxItemChecked = (checkeds: readonly string[] = [], name: string): boolean => checkeds.includes(name);

export const resolveCheckboxItemStates = <TItem extends { name: string }>({
	data = [],
	checkeds = []
}: Pick<ResolveCheckboxDerivedOptions<TItem>, 'data' | 'checkeds'> = {}): CheckboxItemState<TItem>[] =>
	data.map((item) => ({
		item,
		checked: resolveCheckboxItemChecked(checkeds, item.name)
	}));

// 输入组件 props 和内部选中值，返回框架无关的 Checkbox 派生入参。
// Receive component props and internal checked values, then return framework-agnostic Checkbox derivation options.
export const resolveCheckboxStateOptions = <TItem extends { name: string } = { name: string }>({
	checkeds,
	props
}: ResolveCheckboxStateOptionsParams<TItem>): ResolveCheckboxDerivedOptions<TItem> => ({
	checkeds,
	data: props.data,
	layout: props.layout
});

// 输入 Checkbox 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Checkbox state and return framework-agnostic derived values ready for component binding.
export const resolveCheckboxDerived = <TItem extends { name: string } = { name: string }>({
	data = [],
	checkeds = [],
	layout = 'v'
}: ResolveCheckboxDerivedOptions<TItem> = {}): CheckboxDerived<TItem> => ({
	groupClass: resolveSelectionGroupClass(layout),
	itemStates: resolveCheckboxItemStates({ data, checkeds })
});
