import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import type { BatchActionProps, ListProps, SwipeActionProps } from '../../types';
import Icon from '../icon';
import { useConfig } from '../config-provider';
import { zh_CN } from '../../lang';
import {
	resolveListBatchActionClass,
	resolveListBatchActionStatus,
	resolveListBatchModeAction,
	resolveListBatchSelected,
	resolveListBatchToggleText,
	resolveListCloseSwipeAction,
	resolveListItemClickAction,
	resolveListInitialBatchMode,
	resolveListInitialBatchSelected,
	resolveListInitialSwiping,
	resolveListItemKey,
	resolveListItemKeyboardAction,
	resolveListItemSwipeOffset,
	resolveListItemsAfterLeave,
	resolveListRenderItems,
	resolveListDerived,
	resolveListSelectAll,
	resolveListSwipeEndAction,
	resolveListSwipeMoveState,
	resolveListSwipeStartAction,
	type ListItemViewState,
	type ListRenderItem
} from '@any-tdf/common/derived/list';
import { arrowRightSvg, listBackTopSvg, listCheckSvg, radioUncheckedSvg } from '@any-tdf/common/svg/common';
import { SvgIcon } from '../utils/SvgIcon';

const LIST_TRANSITION_DURATION = 300;

const List = <T extends Record<string, unknown>>(props: ListProps<T>) => {
	const {
		data = [],
		keyField = 'id',
		gap = '0',
		mx = '0',
		my = '0',
		itemPx = '0',
		itemPy = '0',
		transition: listTransition = 'slideRight',
		transitionDelay = 50,
		batchMode: batchModeProp,
		batchSelected: batchSelectedProp,
		batchSelectable = false,
		batchActions = [],
		injClass = '',
		itemInjClass = '',
		arrow = false,
		clickable = true,
		divider = true,
		itemRadius = '',
		swipeActions = [],
		swipeHint = 'first',
		swipeThreshold = 30,
		itemChild,
		headerChild,
		footerChild,
		onBatchModeChange,
		onBatchChange,
		onClickItem,
		onSwipeAction
	} = props;

	const { locale } = useConfig();
	const listLang = locale?.list || zh_CN.list;

	const [innerBatchMode, setInnerBatchMode] = useState(resolveListInitialBatchMode(batchModeProp));
	const [innerBatchSelected, setInnerBatchSelected] = useState<(string | number)[]>(resolveListInitialBatchSelected(batchSelectedProp));
	const [swipeOffsets, setSwipeOffsets] = useState<Record<string | number, number>>({});
	const [renderItems, setRenderItems] = useState<ListRenderItem<T>[]>(
		() => resolveListRenderItems({ data, keyField, transition: listTransition }).items
	);

	const leaveTimersRef = useRef(new Map<string | number, ReturnType<typeof setTimeout>>());
	const swipeStartXRef = useRef(0);
	const swipeStartYRef = useRef(0);
	const swipeMovedDistanceRef = useRef(0);
	const swipeMovedKeyRef = useRef<string | number | null>(null);
	const swipeClickBlockKeyRef = useRef<string | number | null>(null);
	const isSwipingRef = useRef(resolveListInitialSwiping());
	const activeSwipeKeyRef = useRef<string | number | null>(null);

	const batchMode = innerBatchMode;
	const batchSelected = innerBatchSelected;

	// 公共派生层处理 List class、item 视图状态和纯计算，DOM 事件与 children 渲染留在组件层。
	// Shared derived layer handles List classes, item view state and pure calculations; DOM events and children rendering stay in the component layer.
	const listState = useMemo(
		() =>
			resolveListDerived<T, SwipeActionProps>({
				renderItems,
				prefix: 'rtdf',
				transition: listTransition,
				transitionDelay,
				staggerVariable: '--rtdf-list-stagger-x',
				swipeActions,
				swipeOffsets,
				swipeHint,
				batchMode,
				batchSelected,
				clickable,
				hasClickHandler: Boolean(onClickItem),
				gap,
				mx,
				my,
				itemPx,
				itemPy,
				itemRadius,
				itemInjClass,
				injClass,
				divider
			}),
		[
			batchMode,
			batchSelected,
			clickable,
			divider,
			gap,
			injClass,
			itemInjClass,
			itemPx,
			itemPy,
			itemRadius,
			listTransition,
			mx,
			my,
			onClickItem,
			renderItems,
			swipeActions,
			swipeHint,
			swipeOffsets,
			transitionDelay
		]
	);

	const clearLeaveTimer = (key: string | number) => {
		const timer = leaveTimersRef.current.get(key);
		if (timer) {
			clearTimeout(timer);
			leaveTimersRef.current.delete(key);
		}
	};

	const emitBatchChange = (selected: (string | number)[]) => {
		onBatchChange?.(selected);
	};

	const emitClickItem = (item: T, index: number) => {
		if (!clickable) return;
		onClickItem?.(item, index);
	};

	const emitSwipeAction = (actionIndex: number, action: SwipeActionProps, item: T, itemIndex: number) => {
		onSwipeAction?.(actionIndex, action, item, itemIndex);
	};

	useEffect(() => {
		return () => {
			leaveTimersRef.current.forEach((timer) => clearTimeout(timer));
			leaveTimersRef.current.clear();
		};
	}, []);

	useEffect(() => {
		setInnerBatchMode(resolveListInitialBatchMode(batchModeProp));
	}, [batchModeProp]);

	useEffect(() => {
		setInnerBatchSelected(resolveListInitialBatchSelected(batchSelectedProp));
	}, [batchSelectedProp]);

	useEffect(() => {
		setRenderItems((currentItems) => {
			// 公共函数返回渲染项状态，timer 的创建和清理继续留在组件层。
			// Shared helper returns render-item state while timer ownership stays in the component.
			const nextState = resolveListRenderItems({
				currentItems,
				data,
				keyField,
				transition: listTransition
			});
			nextState.restoredKeys.forEach(clearLeaveTimer);
			nextState.leavingKeys.forEach((leavingKey) => {
				if (leaveTimersRef.current.has(leavingKey)) return;
				const timer = setTimeout(() => {
					setRenderItems((items) => resolveListItemsAfterLeave(items, leavingKey));
					leaveTimersRef.current.delete(leavingKey);
				}, LIST_TRANSITION_DURATION);
				leaveTimersRef.current.set(leavingKey, timer);
			});

			return nextState.isSame ? currentItems : nextState.items;
		});
	}, [data, keyField, listTransition]);

	const toggleBatchMode = () => {
		const action = resolveListBatchModeAction({ batchMode });
		setInnerBatchMode(action.nextBatchMode);
		onBatchModeChange?.(action.nextBatchMode);
		if (action.shouldClearSelected) {
			setInnerBatchSelected(action.nextSelected);
			emitBatchChange(action.nextSelected);
		}
	};

	const handleBatchSelect = (item: T, index: number) => {
		const key = resolveListItemKey(item, index, keyField);
		const nextSelected = resolveListBatchSelected(batchSelected, key);
		setInnerBatchSelected(nextSelected);
		emitBatchChange(nextSelected);
	};

	const handleSelectAll = () => {
		const nextSelected = resolveListSelectAll({ selected: batchSelected, data, keyField });
		setInnerBatchSelected(nextSelected);
		emitBatchChange(nextSelected);
	};

	const closeSwipe = (itemKey: string | number) => {
		setSwipeOffsets((prev) => {
			const action = resolveListCloseSwipeAction({
				swipeOffsets: prev,
				itemKey,
				activeSwipeKey: activeSwipeKeyRef.current
			});
			activeSwipeKeyRef.current = action.nextActiveSwipeKey;
			return action.nextSwipeOffsets as Record<string | number, number>;
		});
	};

	const handleSwipeStart = (event: ReactPointerEvent, itemKey: string | number) => {
		const action = resolveListSwipeStartAction({
			hasSwipeActions: listState.hasSwipeActions,
			batchMode,
			activeSwipeKey: activeSwipeKeyRef.current,
			itemKey,
			clientX: event.clientX,
			clientY: event.clientY
		});
		if (!action.shouldStart) return;
		isSwipingRef.current = action.isSwiping;
		swipeMovedDistanceRef.current = action.swipeMovedDistance;
		swipeMovedKeyRef.current = action.swipeMovedKey;
		swipeStartXRef.current = action.swipeStartX;
		swipeStartYRef.current = action.swipeStartY;
		if (action.shouldCapturePointer) {
			(event.target as HTMLElement).setPointerCapture(event.pointerId);
		}
		if (action.closeKey !== null) {
			closeSwipe(action.closeKey);
		}
	};

	const handleSwipeMove = (event: ReactPointerEvent, itemKey: string | number) => {
		if (!listState.hasSwipeActions || batchMode || !isSwipingRef.current) return;
		const currentX = event.clientX;
		const currentY = event.clientY;
		const moveState = resolveListSwipeMoveState({
			currentX,
			currentY,
			startX: swipeStartXRef.current,
			startY: swipeStartYRef.current,
			currentOffset: resolveListItemSwipeOffset(swipeOffsets, itemKey),
			swipeActionWidth: listState.swipeActionWidth,
			swipeMovedDistance: swipeMovedDistanceRef.current,
			itemKey
		});
		if (moveState.ignore) return;

		swipeMovedDistanceRef.current = moveState.nextMovedDistance;
		if (moveState.nextMovedKey !== null) {
			swipeMovedKeyRef.current = moveState.nextMovedKey;
		}

		setSwipeOffsets((prev) => ({ ...prev, [itemKey]: moveState.nextOffset }));
		swipeStartXRef.current = moveState.nextStartX;
	};

	const handleSwipeEnd = (event: ReactPointerEvent, itemKey: string | number) => {
		if (!listState.hasSwipeActions || batchMode || !isSwipingRef.current) return;
		(event.target as HTMLElement).releasePointerCapture(event.pointerId);
		const offset = resolveListItemSwipeOffset(swipeOffsets, itemKey);
		const action = resolveListSwipeEndAction({
			offset,
			swipeThreshold,
			swipeActionWidth: listState.swipeActionWidth,
			itemKey,
			swipeMovedKey: swipeMovedKeyRef.current,
			swipeOffsets,
			activeSwipeKey: activeSwipeKeyRef.current
		});
		isSwipingRef.current = action.isSwiping;
		setSwipeOffsets(action.nextSwipeOffsets as Record<string | number, number>);
		activeSwipeKeyRef.current = action.nextActiveSwipeKey;

		if (action.shouldBlockClick && action.nextSwipeClickBlockKey !== null) {
			swipeClickBlockKeyRef.current = action.nextSwipeClickBlockKey;
			setTimeout(() => {
				if (swipeClickBlockKeyRef.current === itemKey) {
					swipeClickBlockKeyRef.current = null;
				}
			}, 0);
		}
		swipeMovedKeyRef.current = action.nextSwipeMovedKey;
	};

	const handleSwipeActionClick = (actionIndex: number, action: SwipeActionProps, item: T, itemIndex: number, itemKey: string | number) => {
		closeSwipe(itemKey);
		action.onClick?.();
		emitSwipeAction(actionIndex, action, item, itemIndex);
	};

	const handleItemClick = (item: T, index: number, itemKey: string | number) => {
		// 公共 action 只返回点击意图，事件和状态赋值留在组件内。
		// Shared action only returns click intent; events and state assignment stay in the component.
		const action = resolveListItemClickAction({
			swipeClickBlockKey: swipeClickBlockKeyRef.current,
			itemKey,
			activeSwipeKey: activeSwipeKeyRef.current,
			batchMode,
			clickable
		});
		if (action.intent === 'ignore') return;
		if (action.intent === 'closeSwipe' && action.closeKey !== null) {
			closeSwipe(action.closeKey);
			return;
		}
		if (action.intent === 'batchSelect') {
			handleBatchSelect(item, index);
			return;
		}
		if (action.intent === 'clickItem') emitClickItem(item, index);
	};

	const renderSwipeHintIcon = () => (
		<>
			{/* 公共 List 图标 SVG 数据在 common 中维护。 / Shared List SVG data lives in common. */}
			<SvgIcon svg={listBackTopSvg} className={listState.swipeHintIconClass} />
		</>
	);

	const renderBatchUncheckedIcon = () => <SvgIcon svg={radioUncheckedSvg} className={listState.batchUncheckedIconClass} />;

	const renderBatchCheckedIcon = () => <SvgIcon svg={listCheckSvg} className={listState.batchCheckedIconClass} />;

	const renderListItem = (itemViewState: ListItemViewState<T, SwipeActionProps>) => {
		const { item, index, itemKey } = itemViewState;
		const handleItemKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
			const action = resolveListItemKeyboardAction({
				key: event.key,
				clickable,
				hasClickHandler: Boolean(onClickItem),
				batchMode
			});
			if (action.shouldPreventDefault) {
				event.preventDefault();
			}
			if (action.shouldClick) {
				handleItemClick(item, index, itemKey);
			}
		};

		return (
			<div key={itemKey} className={itemViewState.transitionClass} style={itemViewState.transitionStyle}>
				<div className={itemViewState.shellClass}>
					{itemViewState.showBatchSelect ? (
						<button
							type="button"
							className={itemViewState.batchSelectClass}
							style={itemViewState.batchSelectWidthStyle}
							onClick={() => handleBatchSelect(item, index)}
						>
							{itemViewState.batchSelected ? renderBatchCheckedIcon() : renderBatchUncheckedIcon()}
						</button>
					) : null}
					{itemViewState.showSwipeActions ? (
						<div className={itemViewState.actionLayerClass}>
							{itemViewState.swipeActions.map((actionState) => {
								return (
									<button
										key={`${itemKey}-action-${actionState.index}`}
										type="button"
										className={actionState.buttonClass}
										onClick={() => handleSwipeActionClick(actionState.index, actionState.action, item, index, itemKey)}
									>
										{actionState.action.icon ? <Icon name={actionState.action.icon} size={20} /> : null}
										{actionState.action.text ? <span className={actionState.textClass}>{actionState.action.text}</span> : null}
									</button>
								);
							})}
						</div>
					) : null}
					<div
						className={itemViewState.contentLayerClass}
						style={itemViewState.transformStyle}
						onPointerDown={(event) => handleSwipeStart(event, itemKey)}
						onPointerMove={(event) => handleSwipeMove(event, itemKey)}
						onPointerUp={(event) => handleSwipeEnd(event, itemKey)}
						onPointerCancel={(event) => handleSwipeEnd(event, itemKey)}
					>
						<div
							role="button"
							tabIndex={itemViewState.tabIndex}
							className={itemViewState.buttonClass}
							onClick={() => handleItemClick(item, index, itemKey)}
							onKeyDown={handleItemKeyDown}
							aria-disabled={itemViewState.disabled}
						>
							<div className={itemViewState.itemContentClass}>{itemChild(item, index)}</div>
							{arrow && !batchMode ? (
								<div className={itemViewState.arrowClass}>
									{/* 公共箭头 SVG 数据在 common 中维护。 / Shared arrow SVG data lives in common. */}
									<SvgIcon svg={arrowRightSvg} width={20} height={20} className={listState.arrowIconClass} />
								</div>
							) : null}
						</div>
						{itemViewState.showSwipeHint ? <div className={itemViewState.swipeHintClass}>{renderSwipeHintIcon()}</div> : null}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className={listState.rootClass}>
			{batchSelectable ? (
				<div className={listState.batchBarClass}>
					{batchMode ? (
						<div className={listState.batchActionGroupClass}>
							<button type="button" className={listState.batchTextButtonClass} onClick={handleSelectAll}>
								{listLang.selectAllText} ({batchSelected.length}/{data.length})
							</button>
							{batchSelected.length > 0
								? (batchActions as BatchActionProps[]).map((action, actionIndex) => (
										<button
											key={`batch-${actionIndex}`}
											type="button"
											className={resolveListBatchActionClass(resolveListBatchActionStatus(action.status))}
											onClick={() => {
												action.onClick?.(batchSelected);
											}}
										>
											{action.text}
										</button>
									))
								: null}
						</div>
					) : (
						<span />
					)}
					<button type="button" className={listState.batchTextButtonClass} onClick={toggleBatchMode}>
						{resolveListBatchToggleText({
							batchMode,
							doneText: listLang.doneText,
							editText: listLang.editText
						})}
					</button>
				</div>
			) : null}

			{headerChild ? headerChild() : null}

			<div className={listState.contentClass}>{listState.items.map(renderListItem)}</div>

			{footerChild ? footerChild() : null}
		</div>
	);
};

export default List;
