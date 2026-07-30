import type { PickerDataChildProps, PickerDatasProps, PickerMultipleItem, PickerProps } from '../../types';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	resolvePickerCancelAction,
	resolvePickerCloseAction,
	resolvePickerConfirmAction,
	resolvePickerDatasColumnData,
	resolvePickerDerived,
	resolvePickerInitialVisible,
	resolvePickerLinkageScrollState,
	resolvePickerMultipleRemoveAction,
	resolvePickerMultipleToggleAction,
	resolvePickerStateOptions
} from '@any-tdf/common/derived/picker';
import Popup from '../popup';
import ScrollRadio from '../scrollRadio';
import Tag from '../tag';
import Icon from '../icon';
import { useConfig } from '../config-provider';
import { zh_CN } from '../../lang';
import { splitPopupCallbacks } from '@any-tdf/common/derived/props';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';

const emptyPickerDatas: PickerDatasProps[] = [];
const emptyNumberList: number[] = [];
const emptyAlignList: NonNullable<PickerProps['linkageAligns']> = [];
const emptyLabelKeyList: string[] = [];
const emptyPopupProps: NonNullable<PickerProps['popup']> = {};
const defaultMultipleIcon: NonNullable<PickerProps['multipleIcon']> = {
	name: 'ri-checkbox-circle-line',
	type: 'symbol',
	size: 24
};
const defaultMultipleIconActive: NonNullable<PickerProps['multipleIconActive']> = {
	name: 'ri-checkbox-circle-fill',
	type: 'symbol',
	size: 24
};

const Picker = forwardRef<HTMLDivElement, PickerProps>(
	(
		{
			visible: visibleProp,
			datas = emptyPickerDatas,
			autoScrollToLast = true,
			cancelText,
			confirmText,
			title,
			isLinkage = false,
			linkageInitIndexs = emptyNumberList,
			linkageShowRows = emptyNumberList,
			linkageFlexs = emptyNumberList,
			linkageAligns = emptyAlignList,
			linkageLabelKeys = emptyLabelKeyList,
			linkageChildrenKey = 'children',
			height = 30,
			popup = emptyPopupProps,
			multiple = false,
			multipleIcon = defaultMultipleIcon,
			multipleIconActive = defaultMultipleIconActive,
			multipleSelected: multipleSelectedProp,
			onClose,
			onConfirm,
			onCancel,
			onMultipleChange,
			onmultiplechange
		},
		ref
	) => {
		const { locale } = useConfig();
		const pickerLang = locale?.picker || zh_CN.picker;
		const { popupProps, popupOnClose } = splitPopupCallbacks(popup);

		const [innerVisible, setInnerVisible] = useState(() => resolvePickerInitialVisible(visibleProp));
		const visible = innerVisible;

		useEffect(() => {
			setInnerVisible(resolvePickerInitialVisible(visibleProp));
		}, [visibleProp]);

		const [innerMultipleSelected, setInnerMultipleSelected] = useState<PickerMultipleItem[]>([]);
		const [newDatas, setNewDatas] = useState<PickerDatasProps[]>([]);
		const [lastSelectedIndexs, setLastSelectedIndexs] = useState<number[]>([]);
		const [currentScrollingIndexs, setCurrentScrollingIndexs] = useState<number[]>([]);
		const [scrollEndIndexs, setScrollEndIndexs] = useState<number[]>([]);
		const scrollEndIndexsRef = useRef<number[]>([]);
		const allLevelDataRef = useRef<(PickerDataChildProps[] | PickerDatasProps[])[]>([]);

		// 公共函数统一组装 Picker 派生入参，组件只传入当前 props、滚动状态和环境数值。
		// Shared helper normalizes Picker derivation options from current props, scroll state and environment values.
		const pickerBaseOptions = useMemo(
			() =>
				resolvePickerStateOptions({
					defaults: pickerLang,
					props: {
						datas,
						isLinkage,
						childrenKey: linkageChildrenKey,
						labelKeys: linkageLabelKeys,
						linkageInitIndexs,
						linkageShowRows,
						linkageFlexs,
						linkageAligns,
						cancelText,
						confirmText,
						title,
						height,
						popup
					},
					viewportHeight: resolveViewportDimension({
						value: typeof window === 'undefined' ? undefined : window.innerHeight
					})
				}),
			[
				datas,
				pickerLang,
				isLinkage,
				linkageChildrenKey,
				linkageLabelKeys,
				linkageInitIndexs,
				linkageShowRows,
				linkageFlexs,
				linkageAligns,
				cancelText,
				confirmText,
				title,
				height,
				popup
			]
		);
		const initialPickerState = useMemo(() => resolvePickerDerived(pickerBaseOptions), [pickerBaseOptions]);
		// 公共派生层统一 Picker 的文本、列样式、多选状态和布局值，滚动状态写入留在组件层。
		// Shared derivation centralizes Picker text, column styles, multiple state and layout values; scroll state writes stay in the component layer.
		const pickerState = useMemo(
			() =>
				resolvePickerDerived(
					resolvePickerStateOptions({
						currentScrollingIndexs,
						defaults: pickerLang,
						displayDatas: newDatas,
						innerMultipleSelected,
						lastSelectedIndexs,
						multiple,
						multipleSelected: multipleSelectedProp,
						props: {
							datas,
							isLinkage,
							childrenKey: linkageChildrenKey,
							labelKeys: linkageLabelKeys,
							linkageInitIndexs,
							linkageShowRows,
							linkageFlexs,
							linkageAligns,
							cancelText,
							confirmText,
							title,
							height,
							popup
						},
						viewportHeight: resolveViewportDimension({
							value: typeof window === 'undefined' ? undefined : window.innerHeight
						})
					})
				),
			[pickerBaseOptions, newDatas, currentScrollingIndexs, lastSelectedIndexs, innerMultipleSelected, multiple, multipleSelectedProp]
		);
		const multipleSelected = pickerState.multipleSelected;

		const updateMultipleSelected = useCallback(
			(nextSelected: PickerMultipleItem[]) => {
				if (!pickerState.multipleSelectionState.isControlled) {
					setInnerMultipleSelected(nextSelected);
				}
				onMultipleChange?.(nextSelected);
				onmultiplechange?.(nextSelected);
			},
			[onMultipleChange, onmultiplechange, pickerState.multipleSelectionState.isControlled]
		);

		useEffect(() => {
			scrollEndIndexsRef.current = scrollEndIndexs;
		}, [scrollEndIndexs]);

		useEffect(() => {
			const { initialState } = initialPickerState;

			// 公共 Picker 派生只返回初始化后的列和索引，状态赋值留在组件层。
			// Shared Picker derivations only return initialized columns and indexes; state assignment stays in the component.
			setNewDatas(initialState.datas);
			setScrollEndIndexs(initialState.scrollEndIndexs);
			scrollEndIndexsRef.current = initialState.scrollEndIndexs;
			setCurrentScrollingIndexs(initialState.currentScrollingIndexs);
			setLastSelectedIndexs(initialState.lastSelectedIndexs);
			allLevelDataRef.current = initialPickerState.allLevelData;
		}, [initialPickerState]);

		const setVisible = useCallback((nextVisible: boolean) => {
			setInnerVisible(nextVisible);
		}, []);

		const clickCancelFunc = useCallback(() => {
			// 公共动作函数只返回关闭和回调决策，组件层负责状态写入和事件触发。
			// Shared action function only returns close and callback decisions; the component writes state and fires events.
			const action = resolvePickerCancelAction();
			setVisible(action.nextVisible);
			if (action.shouldCancel) onCancel?.();
			if (action.shouldClose) onClose?.();
		}, [onCancel, onClose, setVisible]);

		const handlePopupClose = useCallback(() => {
			// 公共 close action 只返回可见状态和 close 回调决策，Popup 回调留在组件层。
			// Shared close action only returns visibility and close callback decisions; Popup callbacks stay in the component layer.
			const action = resolvePickerCloseAction();
			if (!action.shouldClose) return;
			setVisible(action.nextVisible);
			if (action.shouldEmitClose) {
				onClose?.();
				popupOnClose?.();
			}
		}, [onClose, popupOnClose, setVisible]);

		const clickConfirmFunc = useCallback(() => {
			const action = resolvePickerConfirmAction<{ [key: string]: string }>({
				datas,
				currentIndexs: scrollEndIndexsRef.current,
				isLinkage,
				allLevelData: allLevelDataRef.current,
				linkageLabelKeys
			});
			setVisible(action.nextVisible);
			if (action.shouldClose) onClose?.();
			setLastSelectedIndexs(action.indexs);
			if (action.shouldConfirm) onConfirm?.(action.items, action.indexs);
		}, [datas, isLinkage, linkageLabelKeys, onClose, onConfirm, setVisible]);

		const scrollingFunc = useCallback((index: number, col: number) => {
			setCurrentScrollingIndexs((prev) => {
				const next = [...prev];
				next[col] = index;
				return next;
			});
		}, []);

		const scrollEndFunc = useCallback(
			(index: number, col: number) => {
				const nextIndexs = [...scrollEndIndexsRef.current];
				nextIndexs[col] = index;

				if (isLinkage) {
					// 公共函数计算联动列更新，组件层只负责同步状态和异步填充。
					// Shared helper computes linkage column updates; component layer only syncs state and schedules async fills.
					const linkageState = resolvePickerLinkageScrollState({
						datas,
						displayDatas: newDatas,
						allLevelData: allLevelDataRef.current,
						currentIndexs: scrollEndIndexsRef.current,
						column: col,
						index,
						childrenKey: linkageChildrenKey,
						labelKeys: linkageLabelKeys
					});
					scrollEndIndexsRef.current = linkageState.currentIndexs;
					setScrollEndIndexs(linkageState.currentIndexs);
					setCurrentScrollingIndexs(linkageState.currentIndexs);
					setNewDatas(linkageState.datas);
					allLevelDataRef.current = linkageState.allLevelData;
					linkageState.columnUpdates.forEach(({ column, data }) => {
						setNewDatas((prev) => resolvePickerDatasColumnData(prev, column, []));
						if (data.length > 0) {
							setTimeout(() => {
								setNewDatas((prev) => resolvePickerDatasColumnData(prev, column, data));
							});
						}
					});
					return;
				}

				scrollEndIndexsRef.current = nextIndexs;
				setScrollEndIndexs(nextIndexs);
				setCurrentScrollingIndexs((prev) => {
					const next = [...prev];
					next[col] = index;
					return next;
				});
			},
			[datas, isLinkage, linkageChildrenKey, linkageLabelKeys, newDatas]
		);

		const clickMultipleIcon = useCallback(() => {
			const action = resolvePickerMultipleToggleAction({
				datas,
				currentIndexs: scrollEndIndexsRef.current,
				isLinkage,
				allLevelData: allLevelDataRef.current,
				linkageLabelKeys,
				multipleSelected
			});
			if (action.shouldEmit) updateMultipleSelected(action.nextSelected);
		}, [datas, isLinkage, linkageLabelKeys, multipleSelected, updateMultipleSelected]);

		const removeSelectedItem = useCallback(
			(index: number) => {
				const action = resolvePickerMultipleRemoveAction({ multipleSelected, index });
				if (action.shouldEmit) updateMultipleSelected(action.nextSelected);
			},
			[multipleSelected, updateMultipleSelected]
		);

		const content = (
			<>
				<div className={pickerState.headerClass}>
					<button type="button" className={pickerState.cancelButtonClass} onClick={clickCancelFunc}>
						{pickerState.texts.cancelText}
					</button>
					<div>{pickerState.texts.title}</div>
					<button type="button" className={pickerState.confirmButtonClass} onClick={clickConfirmFunc}>
						{pickerState.texts.confirmText}
					</button>
				</div>
				{pickerState.showMultipleTags ? (
					<div className={pickerState.multipleTagsClass}>
						{pickerState.multipleSelected.map((item, index) => (
							<Tag key={index} text={item.label} size="sm" closable onClose={() => removeSelectedItem(index)} />
						))}
					</div>
				) : null}
				<div className={pickerState.contentClass} style={pickerState.contentStyleValue}>
					{pickerState.columnItems.map((columnItem) => (
						<div key={columnItem.index} className={columnItem.rootClass} style={columnItem.styleValue}>
							{columnItem.hasData ? (
								<ScrollRadio
									{...columnItem.item}
									data={columnItem.data}
									lastSelectedIndex={columnItem.lastSelectedIndex}
									autoScrollToLast={autoScrollToLast}
									onScrollEnd={(index) => scrollEndFunc(index, columnItem.index)}
									onScrolling={(index) => scrollingFunc(index, columnItem.index)}
								/>
							) : null}
						</div>
					))}
					{multiple ? (
						<button type="button" className={pickerState.multipleButtonClass} onClick={clickMultipleIcon}>
							{pickerState.isCurrentSelected ? (
								<Icon {...multipleIconActive} theme />
							) : (
								<span className={pickerState.multipleInactiveIconClass}>
									<Icon {...multipleIcon} />
								</span>
							)}
						</button>
					) : null}
				</div>
			</>
		);

		if (!pickerState.usePopup) {
			return <div ref={ref}>{content}</div>;
		}

		return (
			<Popup
				visible={visible}
				size={0}
				maskClosable
				transitionDistance={pickerState.transitionDistance}
				{...popupProps}
				onClose={handlePopupClose}
			>
				<div ref={ref}>{content}</div>
			</Popup>
		);
	}
);

Picker.displayName = 'Picker';

export type { PickerProps } from '../../types';
export default Picker;
