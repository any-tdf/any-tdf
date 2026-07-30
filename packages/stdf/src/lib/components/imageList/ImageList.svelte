<script lang="ts">
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import Loading from '../loading/Loading.svelte';
	import ImagePreview from '../imagePreview/ImagePreview.svelte';
	import type { ImageListProps, ImageListItemProps, LoadingProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import {
		appendImageListItems,
		resolveImageListAddFilesFlow,
		resolveImageListDeleteFlow,
		resolveImageListDerived,
		resolveImageListItemFromFile,
		resolveImageListItemId,
		resolveImageListMutationAction,
		resolveImageListPreviewFlow
	} from '@any-tdf/common/derived/imageList';
	import { refreshSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const imageListLang = (currentLang.imageList || zh_CN.imageList) as NonNullable<LangProps['imageList']>;

	let {
		value = $bindable([]),
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
		uploadText = '',
		loading = {},
		icon = {},
		deleteIcon = {},
		injClass = '',
		itemInjClass = '',
		uploadChild,
		itemChild,
		statusChild,
		onadd,
		ondelete,
		onretry,
		onpreview,
		onexceed,
		onoversized,
		onclickUpload
	}: ImageListProps = $props();

	// 预览相关状态
	// Preview related states
	let previewVisible = $state(false);
	let previewIndex = $state(0);

	// 输入组件状态，返回框架无关的 class、默认图标、预览和上传项视图派生结果。
	// Receive component state and return framework-agnostic classes, default icons, preview data and item view derivations.
	const imageListState = $derived(
		resolveImageListDerived<ImageListItemProps, typeof icon, typeof deleteIcon, LoadingProps>({
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
			uploadFailedText: imageListLang.uploadFailedText,
			pendingText: imageListLang.pendingText
		})
	);

	// 生成唯一 ID
	// Generate unique ID
	const generateId = () => resolveImageListItemId({ timestamp: Date.now(), random: Math.random() });

	// 点击上传按钮
	// Click upload button
	const handleUploadClick = () => {
		const action = resolveImageListMutationAction({ disabled, readonly });
		if (!action.shouldMutate) return;
		onclickUpload?.();
	};

	// 添加文件（供外部调用）
	// Add files (for external use)
	export function addFiles(files: File[]) {
		const flow = resolveImageListAddFilesFlow({ disabled, readonly, files, currentLength: value.length, max, maxSize });
		if (!flow.shouldAddFiles) return;

		if (flow.exceeded) {
			onexceed?.(files, max);
		}

		flow.oversizedFiles.forEach((file) => onoversized?.(file, maxSize));
		const validFiles = flow.validFiles;
		if (validFiles.length === 0) return;

		// 创建新的上传项
		// Create new upload items
		const newItems: ImageListItemProps[] = validFiles.map((file) => resolveImageListItemFromFile({ id: generateId(), file, url: URL.createObjectURL(file) }));

		value = appendImageListItems(value, newItems);
		onadd?.(validFiles);
	}

	// 删除图片
	// Delete image
	const handleDelete = (item: ImageListItemProps, index: number) => {
		const flow = resolveImageListDeleteFlow({ disabled, readonly, items: value, item, index });
		if (!flow.shouldDelete) return;
		// 释放 URL
		// Revoke URL
		if (flow.shouldRevokeUrl && item.url) {
			URL.revokeObjectURL(item.url);
		}
		value = flow.nextItems;
		ondelete?.(item, index);
	};

	// 重试上传
	// Retry upload
	const handleRetry = (item: ImageListItemProps, index: number) => {
		const action = resolveImageListMutationAction({ disabled, readonly });
		if (!action.shouldMutate) return;
		onretry?.(item, index);
	};

	// 预览图片
	// Preview image
	const handlePreview = (item: ImageListItemProps, index: number) => {
		const flow = resolveImageListPreviewFlow({ items: value, itemId: item.id, previewable, url: item.url, disabled });
		if (!flow.shouldOpen) return;
		previewIndex = flow.nextPreviewIndex;
		previewVisible = flow.nextPreviewVisible;
		if (flow.shouldEmitPreview) onpreview?.(item, index);
	};

</script>

<!-- 网格容器 Grid container -->
<div class={imageListState.rootClass}>
	<!-- 已上传图片列表 Uploaded images list -->
	{#each imageListState.itemViewStates as itemViewState (itemViewState.item.id)}
		{@const item = itemViewState.item}
		{@const index = itemViewState.index}
		<div class={imageListState.itemClass} style={imageListState.aspectRatioStyleString}>
			{#if itemChild}
				{@render itemChild(item, index)}
			{:else}
				<!-- 图片 Image -->
				{@const imageState = itemViewState.imageState}
				{#if imageState.showImage}
					<button class={imageListState.previewButtonClass} onclick={() => handlePreview(item, index)} {disabled}>
						<img src={imageState.src} alt={imageState.alt} class={imageListState.imageClass} />
					</button>
				{/if}

				<!-- 状态遮罩 Status overlay -->
				{@const statusState = itemViewState.statusState}
				{@const statusMessage = itemViewState.statusMessage}
				{#if statusState.showOverlay}
					<div class={imageListState.statusOverlayClass}>
						{#if statusChild}
							{@render statusChild(item)}
						{:else if statusState.isUploading}
							<!-- 上传中 Uploading -->
							<Loading {...imageListState.mergedLoading} />
						{:else if statusState.isError}
							<!-- 上传失败 Upload error -->
							<button class={imageListState.retryButtonClass} onclick={() => handleRetry(item, index)}>
								<!-- 公共刷新 SVG 数据在 common 中维护。 / Shared refresh SVG data lives in common. -->
								<SvgIcon svg={refreshSvg} width="24" height="24" class={imageListState.retryIconClass} />
								<span class={imageListState.retryMessageClass}>{statusMessage}</span>
							</button>
						{:else if statusState.isPending}
							<!-- 等待上传 Pending -->
							<span class={imageListState.pendingMessageClass}>{statusMessage}</span>
						{/if}
					</div>
				{/if}

				<!-- 删除按钮 Delete button -->
				{#if deletable && !disabled && !readonly}
					<button
						class={imageListState.deleteButtonClass}
						onclick={() => handleDelete(item, index)}
					>
						<Icon {...imageListState.mergedDeleteIcon} />
					</button>
				{/if}
			{/if}
		</div>
	{/each}

	<!-- 上传按钮 Upload button -->
	{#if imageListState.showUploadButton}
		<button
			class={imageListState.uploadClass}
			style={imageListState.aspectRatioStyleString}
			onclick={handleUploadClick}
			{disabled}
		>
			{#if uploadChild}
				{@render uploadChild()}
			{:else}
				<Icon {...imageListState.mergedIcon} opacity={0.5} />
				{#if uploadText}
					<span class={imageListState.uploadTextClass}>{uploadText}</span>
				{/if}
			{/if}
		</button>
	{/if}
</div>

<!-- 图片预览 Image preview -->
<ImagePreview bind:visible={previewVisible} images={imageListState.previewImages} bind:current={previewIndex} />
