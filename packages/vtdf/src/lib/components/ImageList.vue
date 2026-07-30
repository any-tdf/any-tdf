<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, ref, watch, type PropType } from 'vue';
import {
	appendImageListItems,
	resolveImageListAddFilesFlow,
	resolveImageListDeleteFlow,
	resolveImageListDerived,
	resolveImageListInitialItems,
	resolveImageListItemFromFile,
	resolveImageListItemId,
	resolveImageListMutationAction,
	resolveImageListPreviewCurrent,
	resolveImageListPreviewCloseAction,
	resolveImageListPreviewFlow,
	resolveImageListPreviewKeyboardFlow
} from '@any-tdf/common/derived/imageList';
import { refreshSvg } from '@any-tdf/common/svg/common';
import type { ImageListItemProps, ImageListProps, LoadingProps, VueNode } from '../types';
import { zh_CN, type LangProps } from '../lang';
import { useConfig } from './adapter/config';
import Icon from './Icon.vue';
import ImagePreview from './ImagePreview.vue';
import Loading from './Loading.vue';
import SvgIcon from './SvgIcon.vue';

type ImageListComponentProps = Omit<ImageListProps, 'uploadChild' | 'itemChild' | 'statusChild'> & {
	uploadChild?: () => VueNode;
	itemChild?: (item: ImageListItemProps, index: number) => VueNode;
	statusChild?: (item: ImageListItemProps) => VueNode;
};

const RenderNode = defineComponent({
	name: 'RenderNode',
	props: {
		node: {
			type: null as unknown as PropType<VueNode>,
			default: null
		}
	},
	setup: (renderProps) => () => renderProps.node ?? null
});

const props = withDefaults(defineProps<ImageListComponentProps>(), {
	value: () => [],
	columns: 4,
	max: 9,
	maxSize: 10,
	accept: 'image/*',
	multiple: true,
	disabled: false,
	readonly: false,
	deletable: true,
	previewable: true,
	gap: '2',
	radius: '',
	aspectRatio: () => [1, 1],
	uploadText: '',
	loading: () => ({}),
	icon: () => ({}),
	deleteIcon: () => ({}),
	injClass: '',
	itemInjClass: ''
});

const emit = defineEmits<{
	(event: 'update:value', value: ImageListItemProps[]): void;
	(event: 'add', files: File[]): void;
	(event: 'delete', item: ImageListItemProps, index: number): void;
	(event: 'retry', item: ImageListItemProps, index: number): void;
	(event: 'preview', item: ImageListItemProps, index: number): void;
	(event: 'exceed', files: File[], max: number): void;
	(event: 'oversized', file: File, maxSize: number): void;
	(event: 'clickUpload'): void;
}>();

const config = useConfig();
const value = ref<ImageListItemProps[]>(resolveImageListInitialItems(props.value));
const previewVisible = ref(false);
const previewCurrent = ref(0);
const createdUrls = new Set<string>();

const imageListLang = computed(() => (config.locale.imageList || zh_CN.imageList) as NonNullable<LangProps['imageList']>);

// 输入组件状态，返回框架无关的 class、默认图标、预览和上传项视图派生结果。
// Receive component state and return framework-agnostic classes, default icons, preview data and item view derivations.
const imageListState = computed(() =>
	resolveImageListDerived<ImageListItemProps, NonNullable<typeof props.icon>, NonNullable<typeof props.deleteIcon>, LoadingProps>({
		items: value.value,
		columns: props.columns,
		gap: props.gap,
		radius: props.radius,
		aspectRatio: props.aspectRatio,
		icon: props.icon,
		deleteIcon: props.deleteIcon,
		loading: props.loading,
		injClass: props.injClass,
		itemInjClass: props.itemInjClass,
		max: props.max,
		readonly: props.readonly,
		disabled: props.disabled,
		previewable: props.previewable,
		useItemIdAsFallbackAlt: true,
		uploadFailedText: imageListLang.value.uploadFailedText,
		pendingText: imageListLang.value.pendingText
	})
);

const syncValue = (nextValue: ImageListItemProps[]) => {
	value.value = nextValue;
	emit('update:value', nextValue);
};

const generateId = () => resolveImageListItemId({ timestamp: Date.now(), random: Math.random() });

const createItemFromFile = (file: File): ImageListItemProps => {
	const url = URL.createObjectURL(file);
	createdUrls.add(url);
	return resolveImageListItemFromFile({ id: generateId(), file, url });
};

const emitAdd = (files: File[]) => {
	emit('add', files);
};

const emitDelete = (item: ImageListItemProps, index: number) => {
	emit('delete', item, index);
};

const emitRetry = (item: ImageListItemProps, index: number) => {
	emit('retry', item, index);
};

const emitPreview = (item: ImageListItemProps, index: number) => {
	emit('preview', item, index);
};

const emitExceed = (files: File[], max: number) => {
	emit('exceed', files, max);
};

const emitOversized = (file: File, maxSize: number) => {
	emit('oversized', file, maxSize);
};

const addFiles = (files: File[]) => {
	const flow = resolveImageListAddFilesFlow({
		disabled: props.disabled,
		readonly: props.readonly,
		files,
		currentLength: value.value.length,
		max: props.max,
		maxSize: props.maxSize
	});
	if (!flow.shouldAddFiles) return;
	if (flow.exceeded) {
		emitExceed(files, props.max);
	}
	flow.oversizedFiles.forEach((file) => emitOversized(file, props.maxSize));
	const validFiles = flow.validFiles;

	if (validFiles.length === 0) return;
	syncValue(appendImageListItems(value.value, validFiles.map(createItemFromFile)));
	emitAdd(validFiles);
};

const handleUploadClick = () => {
	const action = resolveImageListMutationAction({
		disabled: props.disabled,
		readonly: props.readonly
	});
	if (!action.shouldMutate) return;
	emit('clickUpload');
};

const handleDelete = (item: ImageListItemProps, index: number) => {
	const flow = resolveImageListDeleteFlow({
		disabled: props.disabled,
		readonly: props.readonly,
		items: value.value,
		item,
		index
	});
	if (!flow.shouldDelete) return;
	if (flow.shouldRevokeUrl && item.url) {
		URL.revokeObjectURL(item.url);
		createdUrls.delete(item.url);
	}
	syncValue(flow.nextItems);
	emitDelete(item, index);
};

const handleRetry = (item: ImageListItemProps, index: number) => {
	const action = resolveImageListMutationAction({
		disabled: props.disabled,
		readonly: props.readonly
	});
	if (!action.shouldMutate) return;
	emitRetry(item, index);
};

const handlePreview = (item: ImageListItemProps, index: number) => {
	const flow = resolveImageListPreviewFlow({
		items: value.value,
		itemId: item.id,
		previewable: props.previewable,
		url: item.url,
		disabled: props.disabled
	});
	if (!flow.shouldOpen) return;
	previewCurrent.value = flow.nextPreviewIndex;
	previewVisible.value = flow.nextPreviewVisible;
	if (flow.shouldEmitPreview) emitPreview(item, index);
};

const handlePreviewClose = () => {
	const action = resolveImageListPreviewCloseAction();
	if (action.shouldClose) previewVisible.value = action.nextPreviewVisible;
};

const handlePreviewKeyDown = (event: KeyboardEvent, item: ImageListItemProps, index: number) => {
	const flow = resolveImageListPreviewKeyboardFlow({
		key: event.key,
		items: value.value,
		itemId: item.id,
		previewable: props.previewable,
		url: item.url,
		disabled: props.disabled
	});
	if (flow.shouldPreventDefault) {
		event.preventDefault();
	}
	if (flow.shouldOpen) {
		previewCurrent.value = flow.nextPreviewIndex;
		previewVisible.value = flow.nextPreviewVisible;
		if (flow.shouldEmitPreview) emitPreview(item, index);
	}
};

watch(
	() => props.value,
	(nextValue) => {
		value.value = resolveImageListInitialItems(nextValue);
	},
	{ deep: true }
);

onBeforeUnmount(() => {
	createdUrls.forEach((url) => URL.revokeObjectURL(url));
	createdUrls.clear();
});

defineExpose({
	addFiles
});
</script>

<template>
	<div :class="imageListState.rootClass">
		<div
			v-for="itemViewState in imageListState.itemViewStates"
			:key="itemViewState.item.id"
			:class="imageListState.itemClass"
			:style="imageListState.aspectRatioStyleValue"
		>
			<slot v-if="$slots.item" name="item" :item="itemViewState.item" :index="itemViewState.index" />
			<RenderNode v-else-if="itemChild" :node="itemChild(itemViewState.item, itemViewState.index)" />
			<div
				v-else
				:class="imageListState.previewContainerClass"
				:role="itemViewState.previewAction.shouldPreview ? 'button' : undefined"
				:tabindex="itemViewState.previewAction.shouldPreview ? 0 : undefined"
				@click="handlePreview(itemViewState.item, itemViewState.index)"
				@keydown="handlePreviewKeyDown($event, itemViewState.item, itemViewState.index)"
			>
				<img
					v-if="itemViewState.imageState.showImage"
					:src="itemViewState.imageState.src"
					:alt="itemViewState.imageState.alt"
					:class="imageListState.imageClass"
				/>

				<div v-if="itemViewState.statusState.showOverlay" :class="imageListState.statusOverlayClass">
					<slot v-if="$slots.status" name="status" :item="itemViewState.item" />
					<RenderNode v-else-if="statusChild" :node="statusChild(itemViewState.item)" />
					<template v-else>
						<Loading v-if="itemViewState.statusState.isUploading" v-bind="imageListState.mergedLoading" />
						<button
							v-else-if="itemViewState.statusState.isError"
							type="button"
							:class="imageListState.retryButtonClass"
							@click.stop="handleRetry(itemViewState.item, itemViewState.index)"
						>
							<!-- 公共刷新 SVG 数据在 common 中维护。 / Shared refresh SVG data lives in common. -->
							<SvgIcon :svg="refreshSvg" width="24" height="24" :class-name="imageListState.retryIconClass" />
							<span :class="imageListState.retryMessageClass">{{ itemViewState.statusMessage }}</span>
						</button>
						<span v-else-if="itemViewState.statusState.isPending" :class="imageListState.pendingMessageClass">{{
							itemViewState.statusMessage
						}}</span>
					</template>
				</div>
			</div>

			<button
				v-if="deletable && !readonly && !disabled"
				type="button"
				:class="imageListState.deleteButtonClass"
				@click.stop="handleDelete(itemViewState.item, itemViewState.index)"
			>
				<Icon v-bind="imageListState.mergedDeleteIcon" />
			</button>
		</div>

		<button
			v-if="imageListState.showUploadButton"
			type="button"
			:class="imageListState.uploadClass"
			:style="imageListState.aspectRatioStyleValue"
			:disabled="disabled"
			@click="handleUploadClick"
		>
			<slot v-if="$slots.upload" name="upload" />
			<RenderNode v-else-if="uploadChild" :node="uploadChild()" />
			<template v-else>
				<Icon v-bind="imageListState.mergedIcon" :opacity="0.5" />
				<span v-if="uploadText" :class="imageListState.uploadTextClass">{{ uploadText }}</span>
			</template>
		</button>
	</div>

	<ImagePreview
		:visible="previewVisible"
		:images="imageListState.previewImages"
		:current="resolveImageListPreviewCurrent(previewCurrent)"
		@close="handlePreviewClose"
		@change="(index: number) => (previewCurrent = index)"
	/>
</template>
