import type { AsyncPickerProps } from '../../types';
import { forwardRef, useState, useEffect, useCallback } from 'react';
import Popup from '../popup';
import Loading from '../loading';
import ScrollRadio from '../scrollRadio';
import { zh_CN } from '../../lang';
import { useConfig } from '../config-provider';
import { splitPopupCallbacks } from '@any-tdf/common/derived/props';
import { Transition as MotionTransition } from '../utils/transition';
import {
	resolveAsyncPickerCloseAction,
	resolveAsyncPickerDerived,
	resolveAsyncPickerInitialVisible,
	resolveAsyncPickerLeftButtonFlow,
	resolveAsyncPickerRightButtonFlow,
	resolveAsyncPickerStateOptions
} from '@any-tdf/common/derived/asyncPicker';
import { resolveViewportDimension } from '@any-tdf/common/derived/helpers';

const AsyncPicker = forwardRef<HTMLDivElement, AsyncPickerProps>(
	(
		{
			visible = false,
			data = [],
			lastLevel = false,
			firstLevel = true,
			showRow = 5,
			labelKey = 'label',
			align = 'center',
			cancelText: cancelTextProp,
			confirmText: confirmTextProp,
			title: titleProp,
			nextText: nextTextProp,
			prevText: prevTextProp,
			showSelected = false,
			selectedText: selectedTextProp,
			height = 30,
			popup = {},
			loading = {},
			onCancel,
			onPrev,
			onConfirm,
			onNext,
			onClose
		},
		_ref
	) => {
		const { locale } = useConfig();
		const asyncPickerLang = locale?.asyncPicker || zh_CN.asyncPicker;
		const [internalVisible, setInternalVisible] = useState(() => resolveAsyncPickerInitialVisible(visible));
		const [internalData, setInternalData] = useState(data);
		const [internalLastLevel, setInternalLastLevel] = useState(lastLevel);
		const [internalFirstLevel, setInternalFirstLevel] = useState(firstLevel);
		const [internalLabelKey, setInternalLabelKey] = useState(labelKey);
		const { popupProps, popupOnClose } = splitPopupCallbacks(popup);

		// 用于存储当前选定的所有项和索引
		// Used to store all selected items and indexes
		const [items, setItems] = useState<Record<string, unknown>[]>([]);
		const [indexs, setIndexs] = useState<number[]>([]);

		// 当前选中项索引
		// Current selected item index
		const [currentIndex, setCurrentIndex] = useState(0);

		// 公共派生层只处理 AsyncPicker 尺寸、按钮文案、选中路径和纯动作描述，事件与异步加载留在组件内。
		// Shared derived layer only handles AsyncPicker sizes, button text, selected path and pure actions; events and async loading stay in the component.
		const asyncPickerDerived = resolveAsyncPickerDerived(
			resolveAsyncPickerStateOptions({
				currentIndex,
				data: internalData,
				defaults: asyncPickerLang,
				firstLevel: internalFirstLevel,
				indexs,
				items,
				lastLevel: internalLastLevel,
				props: {
					cancelText: cancelTextProp,
					confirmText: confirmTextProp,
					height,
					nextText: nextTextProp,
					popup,
					prevText: prevTextProp,
					selectedText: selectedTextProp,
					showRow,
					showSelected,
					title: titleProp
				},
				viewportHeight: resolveViewportDimension({
					value: typeof window === 'undefined' ? undefined : window.innerHeight
				}),
				viewportWidth: resolveViewportDimension({
					value: typeof document === 'undefined' ? undefined : document.documentElement.clientWidth
				})
			})
		);
		const isLoading = asyncPickerDerived.isLoading;
		const usePopup = asyncPickerDerived.usePopup;

		useEffect(() => {
			setInternalVisible(resolveAsyncPickerInitialVisible(visible));
		}, [visible]);

		useEffect(() => {
			setInternalData(data);
		}, [data]);

		useEffect(() => {
			setInternalLastLevel(lastLevel);
		}, [lastLevel]);

		useEffect(() => {
			setInternalFirstLevel(firstLevel);
		}, [firstLevel]);

		useEffect(() => {
			setInternalLabelKey(labelKey);
		}, [labelKey]);

		// 点击左侧按钮
		// Click left button
		const clickLeftFunc = useCallback(() => {
			// 公共流程只返回状态补丁和关闭决策，事件与异步加载留在组件层。
			// Shared flow only returns state patches and close decisions; events and async loading stay in the component layer.
			const flow = resolveAsyncPickerLeftButtonFlow(asyncPickerDerived.leftAction);
			if (flow.type === 'none') return;
			if (flow.type === 'cancel') {
				if (flow.closeAction.shouldClose) setInternalVisible(flow.closeAction.nextVisible);
				if (flow.closeAction.shouldEmitClose) onClose?.();
				onCancel?.();
				return;
			}
			setItems(flow.items);
			setIndexs(flow.indexs);
			setInternalData(flow.resetState.data);
			setTimeout(() => {
				onPrev?.();
				setCurrentIndex(flow.resetState.currentIndex);
			});
		}, [asyncPickerDerived.leftAction, onCancel, onClose, onPrev]);

		// 点击右侧按钮，如果是最后一列，则触发 confirm 事件，否则触发 next 事件
		// Click the right button, if it is the last column, trigger the confirm event, otherwise trigger the next event
		const clickRightFunc = useCallback(() => {
			// 公共流程只返回状态补丁和确认 / 下一级决策，事件与异步加载留在组件层。
			// Shared flow only returns state patches plus confirm or next-step decisions; events and async loading stay in the component layer.
			const flow = resolveAsyncPickerRightButtonFlow(asyncPickerDerived.rightAction);
			if (flow.type === 'none') return;
			if (flow.type === 'confirm') {
				setItems(flow.items);
				setIndexs(flow.indexs);
				setInternalData(flow.resetState.data);
				if (flow.closeAction.shouldClose) setInternalVisible(flow.closeAction.nextVisible);
				setCurrentIndex(flow.resetState.currentIndex);
				if (flow.closeAction.shouldEmitClose) onClose?.();
				onConfirm?.(flow.items, flow.indexs);
				return;
			}
			setItems(flow.items);
			setIndexs(flow.indexs);
			setInternalData(flow.resetState.data);
			setTimeout(() => {
				onNext?.(flow.currentIndex);
				setCurrentIndex(flow.resetState.currentIndex);
			});
		}, [asyncPickerDerived.rightAction, onClose, onConfirm, onNext]);

		// 滚动结束
		// Scroll end
		const scrollEndFunc = useCallback((index: number) => {
			setCurrentIndex(index);
		}, []);

		const content = (
			<>
				<div className={asyncPickerDerived.headerClass}>
					<button
						type="button"
						className={asyncPickerDerived.leftButtonClass}
						onClick={() => {
							if (!isLoading) clickLeftFunc();
						}}
					>
						{isLoading ? (
							<div className={asyncPickerDerived.buttonLoadingClass}>
								<Loading width="4" height="4" customColor={['#666']} />
							</div>
						) : (
							asyncPickerDerived.leftButtonText
						)}
					</button>
					<div>{asyncPickerDerived.texts.title}</div>
					<button
						type="button"
						className={asyncPickerDerived.rightButtonClass}
						onClick={() => {
							if (!isLoading) clickRightFunc();
						}}
					>
						{isLoading ? (
							<div className={asyncPickerDerived.buttonLoadingClass}>
								<Loading width="4" height="4" theme />
							</div>
						) : (
							asyncPickerDerived.rightButtonText
						)}
					</button>
				</div>

				{showSelected && (
					<div className={asyncPickerDerived.selectedWrapClass}>
						<div className={asyncPickerDerived.selectedLabelClass}>{asyncPickerDerived.texts.selectedText}</div>
						{items.map((item, index) => (
							<MotionTransition
								key={index}
								visible={!isLoading}
								transition="fly"
								inParams={asyncPickerDerived.selectedFlyInParams}
								outParams={asyncPickerDerived.selectedFlyOutParams}
								className={asyncPickerDerived.selectedItemClass}
							>
								{item[internalLabelKey] as string}
							</MotionTransition>
						))}
					</div>
				)}

				<div className={asyncPickerDerived.bodyClass}>
					<div className={asyncPickerDerived.contentClipClass}>
						{isLoading ? (
							<div className={asyncPickerDerived.loadingClass} style={asyncPickerDerived.loadingHeightStyleValue}>
								<Loading width="28" height="8" type="1_16" theme {...loading} />
							</div>
						) : (
							<div style={asyncPickerDerived.inlineContentStyleValue}>
								<ScrollRadio
									data={internalData as Record<string, string>[]}
									showRow={showRow}
									labelKey={internalLabelKey}
									align={align}
									autoScrollToLast={false}
									onScrollEnd={scrollEndFunc}
								/>
							</div>
						)}
					</div>
				</div>
			</>
		);

		if (!usePopup) {
			return content;
		}

		return (
			<Popup
				visible={internalVisible}
				size={0}
				maskClosable
				transitionDistance={asyncPickerDerived.metrics.transitionDistance}
				{...popupProps}
				onClose={() => {
					// 公共 close action 只返回可见状态和 close 回调决策，Popup 回调留在组件层。
					// Shared close action only returns visibility and close callback decisions; Popup callbacks stay in the component layer.
					const action = resolveAsyncPickerCloseAction();
					if (action.shouldClose) setInternalVisible(action.nextVisible);
					if (action.shouldEmitClose) {
						onClose?.();
						popupOnClose?.();
					}
				}}
			>
				{content}
			</Popup>
		);
	}
);

AsyncPicker.displayName = 'AsyncPicker';

export default AsyncPicker;
