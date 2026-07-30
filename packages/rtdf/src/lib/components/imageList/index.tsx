import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import type { ImageListItemProps, ImageListProps, LoadingProps } from '../../types';
import { zh_CN, type LangProps } from '../../lang';
import { useConfig } from '../config-provider';
import Icon from '../icon';
import ImagePreview from '../imagePreview';
import Loading from '../loading';
import {
	appendImageListItems,
	resolveImageListAddFilesFlow,
	resolveImageListDeleteFlow,
	resolveImageListDerived,
	resolveImageListInitialItems,
	resolveImageListUploadText,
	resolveImageListItemFromFile,
	resolveImageListItemId,
	resolveImageListMutationAction,
	resolveImageListPreviewCurrent,
	resolveImageListPreviewCloseAction,
	resolveImageListPreviewFlow,
	resolveImageListPreviewKeyboardFlow
} from '@any-tdf/common/derived/imageList';
import { refreshSvg } from '@any-tdf/common/svg/common';
import { SvgIcon } from '../utils/SvgIcon';

export interface ImageListRef {
	addFiles: (files: File[]) => void;
}

const ImageList = forwardRef<ImageListRef, ImageListProps>((props, ref) => {
	const {
		value: valueProp,
		columns = 4,
		max = 9,
		maxSize = 10,
		disabled = false,
		readonly = false,
		deletable = true,
		previewable = true,
		gap = '2',
		radius = '',
		aspectRatio = [1, 1],
		uploadText: uploadTextProp,
		loading,
		icon,
		deleteIcon,
		injClass = '',
		itemInjClass = '',
		uploadChild,
		itemChild,
		statusChild,
		onAdd,
		onDelete,
		onRetry,
		onPreview,
		onExceed,
		onOversized,
		onClickUpload
	} = props;
	const initialValue = resolveImageListInitialItems(valueProp);
	const [innerValue, setInnerValue] = useState<ImageListItemProps[]>(initialValue);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewCurrent, setPreviewCurrent] = useState(0);
	const { locale } = useConfig();
	const value = innerValue;
	const uploadText = resolveImageListUploadText(uploadTextProp);
	const imageListLang = (locale?.imageList || zh_CN.imageList) as NonNullable<LangProps['imageList']>;

	useEffect(() => {
		setInnerValue(resolveImageListInitialItems(valueProp));
	}, [valueProp]);

	// 输入组件状态，返回框架无关的 class、默认图标、预览和上传项视图派生结果。
	// Receive component state and return framework-agnostic classes, default icons, preview data and item view derivations.
	const imageListState = resolveImageListDerived<
		ImageListItemProps,
		NonNullable<typeof icon>,
		NonNullable<typeof deleteIcon>,
		LoadingProps
	>({
		items: value,
		columns,
		gap,
		radius,
		aspectRatio,
		icon,
		deleteIcon,
		loading,
		injClass,
		itemInjClass,
		max,
		readonly,
		disabled,
		previewable,
		useItemIdAsFallbackAlt: true,
		uploadFailedText: imageListLang.uploadFailedText,
		pendingText: imageListLang.pendingText
	});

	const createItemFromFile = (file: File): ImageListItemProps => {
		const id = resolveImageListItemId({ timestamp: Date.now(), random: Math.random() });
		const url = URL.createObjectURL(file);
		return resolveImageListItemFromFile({ id, url, file });
	};

	const addFiles = (files: File[]) => {
		const flow = resolveImageListAddFilesFlow({
			disabled,
			readonly,
			files,
			currentLength: value.length,
			max,
			maxSize
		});
		if (!flow.shouldAddFiles) return;
		if (flow.exceeded) {
			onExceed?.(files, max);
		}
		flow.oversizedFiles.forEach((file) => onOversized?.(file, maxSize));
		const validFiles = flow.validFiles;
		if (validFiles.length === 0) return;
		const newItems = validFiles.map(createItemFromFile);
		setInnerValue(appendImageListItems(value, newItems));
		onAdd?.(validFiles);
	};

	useImperativeHandle(ref, () => ({
		addFiles
	}));

	const handleDelete = (item: ImageListItemProps, index: number) => {
		const flow = resolveImageListDeleteFlow({ disabled, readonly, items: value, item, index });
		if (!flow.shouldDelete) return;
		if (flow.shouldRevokeUrl && item.url) {
			URL.revokeObjectURL(item.url);
		}
		onDelete?.(item, index);
		setInnerValue(flow.nextItems);
	};

	const handlePreview = (item: ImageListItemProps, index: number) => {
		const flow = resolveImageListPreviewFlow({
			items: value,
			itemId: item.id,
			previewable,
			url: item.url,
			disabled
		});
		if (!flow.shouldOpen) return;
		setPreviewCurrent(flow.nextPreviewIndex);
		setPreviewVisible(flow.nextPreviewVisible);
		if (flow.shouldEmitPreview) onPreview?.(item, index);
	};

	const handlePreviewClose = () => {
		const action = resolveImageListPreviewCloseAction();
		if (action.shouldClose) setPreviewVisible(action.nextPreviewVisible);
	};

	const handleRetry = (item: ImageListItemProps, index: number) => {
		const action = resolveImageListMutationAction({ disabled, readonly });
		if (!action.shouldMutate) return;
		onRetry?.(item, index);
	};
	const handlePreviewKeyDown = (event: React.KeyboardEvent<HTMLElement>, item: ImageListItemProps, index: number) => {
		const flow = resolveImageListPreviewKeyboardFlow({
			key: event.key,
			items: value,
			itemId: item.id,
			previewable,
			url: item.url,
			disabled
		});
		if (flow.shouldPreventDefault) {
			event.preventDefault();
		}
		if (flow.shouldOpen) {
			setPreviewCurrent(flow.nextPreviewIndex);
			setPreviewVisible(flow.nextPreviewVisible);
			if (flow.shouldEmitPreview) onPreview?.(item, index);
		}
	};

	const handleUploadClick = () => {
		const action = resolveImageListMutationAction({ disabled, readonly });
		if (!action.shouldMutate) return;
		onClickUpload?.();
	};

	return (
		<>
			<div className={imageListState.rootClass}>
				{imageListState.itemViewStates.map(({ item, index, imageState, statusState, statusMessage, previewAction }) => {
					return (
						<div key={item.id} className={imageListState.itemClass} style={imageListState.aspectRatioStyleValue}>
							{itemChild ? (
								itemChild(item, index)
							) : (
								<>
									{imageState.showImage ? (
										<button
											type="button"
											className={imageListState.previewButtonClass}
											disabled={!previewAction.shouldPreview}
											onClick={() => handlePreview(item, index)}
											onKeyDown={(event) => handlePreviewKeyDown(event, item, index)}
										>
											<img src={imageState.src} alt={imageState.alt} className={imageListState.imageClass} />
										</button>
									) : null}
									{statusState.showOverlay ? (
										<div className={imageListState.statusOverlayClass}>
											{statusChild ? (
												statusChild(item)
											) : (
												<>
													{statusState.isUploading ? <Loading {...imageListState.mergedLoading} /> : null}
													{statusState.isError ? (
														<button
															type="button"
															className={imageListState.retryButtonClass}
															onClick={(event) => {
																event.stopPropagation();
																handleRetry(item, index);
															}}
														>
															{/* 公共刷新 SVG 数据在 common 中维护。 / Shared refresh SVG data lives in common. */}
															<SvgIcon svg={refreshSvg} width={24} height={24} className={imageListState.retryIconClass} />
															<span className={imageListState.retryMessageClass}>{statusMessage}</span>
														</button>
													) : null}
													{statusState.isPending ? <span className={imageListState.pendingMessageClass}>{statusMessage}</span> : null}
												</>
											)}
										</div>
									) : null}
								</>
							)}

							{deletable && !readonly && !disabled ? (
								<button
									type="button"
									className={imageListState.deleteButtonClass}
									onClick={(event) => {
										event.stopPropagation();
										handleDelete(item, index);
									}}
								>
									<Icon {...imageListState.mergedDeleteIcon} />
								</button>
							) : null}
						</div>
					);
				})}

				{imageListState.showUploadButton ? (
					<button
						type="button"
						className={imageListState.uploadClass}
						style={imageListState.aspectRatioStyleValue}
						disabled={disabled}
						onClick={handleUploadClick}
					>
						{uploadChild ? (
							uploadChild()
						) : (
							<>
								<Icon {...imageListState.mergedIcon} opacity={0.5} />
								{uploadText ? <span className={imageListState.uploadTextClass}>{uploadText}</span> : null}
							</>
						)}
					</button>
				) : null}
			</div>

			<ImagePreview
				visible={previewVisible}
				images={imageListState.previewImages}
				current={resolveImageListPreviewCurrent(previewCurrent)}
				onClose={handlePreviewClose}
				onChange={setPreviewCurrent}
			/>
		</>
	);
});

ImageList.displayName = 'ImageList';

export default ImageList;
