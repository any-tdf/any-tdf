import { resolveSelectionGroupClass, type SelectionLayout } from './selection.js';

// 输入外部 Radio 选中值，返回组件内部可写入的选中值。
// Normalize an external Radio selected value into an internal writable selected value.
export const resolveRadioInitialValue = (value?: string | null): string => value ?? '';

// 输入 Radio 点击项，返回下一组选中值。
// Resolve Radio clicked item into the next selected value.
export const resolveRadioNextValue = (name: string) => name;

export type ResolveRadioClickActionOptions = {
	name: string;
};

export type RadioClickAction = {
	nextValue: string;
	shouldEmit: true;
};
export type ResolveRadioDerivedOptions<TItem extends { name: string } = { name: string }> = {
	data?: readonly TItem[];
	layout?: SelectionLayout;
	value?: string;
};
export type RadioStatePropsLike<TItem extends { name: string } = { name: string }> = Partial<
	Omit<ResolveRadioDerivedOptions<TItem>, 'value'>
>;
export type ResolveRadioStateOptionsParams<TItem extends { name: string } = { name: string }> = {
	props: RadioStatePropsLike<TItem>;
	value?: string;
};
export type RadioItemState<TItem> = {
	checked: boolean;
	item: TItem;
};
export type RadioDerived<TItem> = {
	groupClass: string;
	itemStates: RadioItemState<TItem>[];
};

// 输入 Radio 点击状态，返回组件层可消费的下一选中值。
// Consume Radio click state and return the next selected value for component usage.
export const resolveRadioClickAction = ({ name }: ResolveRadioClickActionOptions): RadioClickAction => ({
	nextValue: resolveRadioNextValue(name),
	shouldEmit: true
});

// 输入 Radio 当前值和项名称，返回框架无关的选中态。
// Resolve Radio current value and item name into a framework-agnostic checked state.
export const resolveRadioItemChecked = (value: string, name: string): boolean => value === name;

export const resolveRadioItemStates = <TItem extends { name: string }>({
	data = [],
	value = ''
}: Pick<ResolveRadioDerivedOptions<TItem>, 'data' | 'value'> = {}): RadioItemState<TItem>[] =>
	data.map((item) => ({
		item,
		checked: resolveRadioItemChecked(value, item.name)
	}));

// 输入组件 props 和内部选中值，返回框架无关的 Radio 派生入参。
// Receive component props and internal selected value, then return framework-agnostic Radio derivation options.
export const resolveRadioStateOptions = <TItem extends { name: string } = { name: string }>({
	props,
	value
}: ResolveRadioStateOptionsParams<TItem>): ResolveRadioDerivedOptions<TItem> => ({
	data: props.data,
	layout: props.layout,
	value
});

// 输入 Radio 当前状态，返回组件层可直接绑定的框架无关派生结果。
// Receive current Radio state and return framework-agnostic derived values ready for component binding.
export const resolveRadioDerived = <TItem extends { name: string } = { name: string }>({
	data = [],
	value = '',
	layout = 'v'
}: ResolveRadioDerivedOptions<TItem> = {}): RadioDerived<TItem> => ({
	groupClass: resolveSelectionGroupClass(layout),
	itemStates: resolveRadioItemStates({ data, value })
});
