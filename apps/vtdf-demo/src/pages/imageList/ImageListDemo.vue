<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon, ImageList } from 'vtdf';
import type { ImageListItemProps } from 'vtdf/types';

type Locale = 'zh_CN' | 'en_US';
type ImageListExpose = {
	addFiles: (files: File[]) => void;
};

const props = withDefaults(
	defineProps<{
		locale?: Locale;
	}>(),
	{
		locale: 'zh_CN'
	}
);

const messages = {
	zh_CN: {
		basic: '基础用法',
		defaultImages: '默认图片',
		columns: '不同列数',
		threeColumns: '3 列',
		fourColumns: '4 列（默认）',
		fiveColumns: '5 列',
		status: '状态展示',
		statusDesc: '展示各种状态',
		uploadFailed: '上传失败',
		maxCount: '数量限制',
		maxCountDesc: '最多 3 张',
		exceed: '超出限制，最多 {max} 张',
		maxSize: '大小限制',
		maxSizeDesc: '单张最大 2 MB',
		oversized: '{name} 超过 {maxSize} MB',
		disabled: '禁用状态',
		readonly: '只读状态',
		notDeletable: '不可删除',
		customStyle: '自定义样式',
		customStyleDesc: '圆角、间距',
		customAdd: '自定义添加按钮',
		takePhoto: '拍照上传',
		simulate: '模拟上传',
		simulateDesc: '演示上传流程（含重试），点击添加按钮触发文件选择'
	},
	en_US: {
		basic: 'Basic Usage',
		defaultImages: 'Default Images',
		columns: 'Different Columns',
		threeColumns: '3 columns',
		fourColumns: '4 columns (default)',
		fiveColumns: '5 columns',
		status: 'Status Display',
		statusDesc: 'Show various states',
		uploadFailed: 'Failed',
		maxCount: 'Max Count',
		maxCountDesc: 'Maximum 3 images',
		exceed: 'Exceeded, max {max} images',
		maxSize: 'Max Size',
		maxSizeDesc: 'Max 2 MB per image',
		oversized: '{name} exceeds {maxSize} MB',
		disabled: 'Disabled',
		readonly: 'Readonly',
		notDeletable: 'Not Deletable',
		customStyle: 'Custom Style',
		customStyleDesc: 'Radius, gap',
		customAdd: 'Custom Add Button',
		takePhoto: 'Take Photo',
		simulate: 'Simulate Upload',
		simulateDesc: 'Demo upload flow (with retry), click add button to select files'
	}
} satisfies Record<Locale, Record<string, string>>;

const text = computed(() => messages[props.locale]);
const value1 = ref<ImageListItemProps[]>([]);
const value2 = ref<ImageListItemProps[]>([
	{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
	{ id: '2', url: '/assets/images/wall_2.jpg', status: 'success' }
]);
const value3 = ref<ImageListItemProps[]>([]);
const value4 = ref<ImageListItemProps[]>([]);
const value5 = ref<ImageListItemProps[]>([]);
const value6 = ref<ImageListItemProps[]>([
	{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
	{ id: '2', url: '/assets/images/wall_2.jpg', status: 'uploading' },
	{ id: '3', url: '/assets/images/wall_3.jpg', status: 'error', message: text.value.uploadFailed },
	{ id: '4', url: '/assets/images/wall_4.jpg', status: 'pending' }
]);
const value7 = ref<ImageListItemProps[]>([]);
const value8 = ref<ImageListItemProps[]>([]);
const value9 = ref<ImageListItemProps[]>([{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' }]);
const value10 = ref<ImageListItemProps[]>([
	{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
	{ id: '2', url: '/assets/images/wall_2.jpg', status: 'success' }
]);
const value11 = ref<ImageListItemProps[]>([{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' }]);
const value12 = ref<ImageListItemProps[]>([]);
const value13 = ref<ImageListItemProps[]>([]);
const value14 = ref<ImageListItemProps[]>([]);
const exceedMsg = ref('');
const oversizedMsg = ref('');
const uploadRef14 = ref<ImageListExpose | null>(null);
const fileInput14 = ref<HTMLInputElement | null>(null);

const format = (template: string, values: Record<string, string | number>) =>
	Object.entries(values).reduce((result, [key, value]) => result.replace(`{${key}}`, `${value}`), template);

const handleClickUpload14 = () => {
	fileInput14.value?.click();
};

const handleFileChange14 = (event: Event) => {
	const input = event.target as HTMLInputElement;
	const files = Array.from(input.files || []);
	if (files.length > 0) {
		uploadRef14.value?.addFiles(files);
	}
	input.value = '';
};

const simulateUpload = (files: File[]) => {
	files.forEach((file) => {
		const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
		const url = URL.createObjectURL(file);
		value14.value = [...value14.value, { id, url, file, status: 'uploading' }];
		setTimeout(() => {
			const success = Math.random() > 0.3;
			value14.value = value14.value.map((item) =>
				item.id === id ? { ...item, status: success ? 'success' : 'error', message: success ? '' : text.value.uploadFailed } : item
			);
		}, 1500);
	});
};

const handleRetry = (_item: ImageListItemProps, index: number) => {
	value14.value = value14.value.map((item, itemIndex) => (itemIndex === index ? { ...item, status: 'uploading', message: '' } : item));
	setTimeout(() => {
		value14.value = value14.value.map((item, itemIndex) => (itemIndex === index ? { ...item, status: 'success' } : item));
	}, 1500);
};

const handleDelete14 = (_item: ImageListItemProps, index: number) => {
	value14.value = value14.value.filter((_, itemIndex) => itemIndex !== index);
};
</script>

<template>
	<div>
		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.basic }}</div>
		<div class="mx-4">
			<ImageList v-model:value="value1" />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.defaultImages }}</div>
		<div class="mx-4">
			<ImageList v-model:value="value2" />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.columns }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.threeColumns }}</p>
		<div class="mx-4">
			<ImageList v-model:value="value3" :columns="3" />
		</div>
		<p class="mx-4 mb-2 mt-4 text-xs opacity-60">{{ text.fourColumns }}</p>
		<div class="mx-4">
			<ImageList v-model:value="value4" :columns="4" />
		</div>
		<p class="mx-4 mb-2 mt-4 text-xs opacity-60">{{ text.fiveColumns }}</p>
		<div class="mx-4">
			<ImageList v-model:value="value5" :columns="5" />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.status }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.statusDesc }}</p>
		<div class="mx-4">
			<ImageList v-model:value="value6" />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.maxCount }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.maxCountDesc }} {{ exceedMsg ? `(${exceedMsg})` : '' }}</p>
		<div class="mx-4">
			<ImageList v-model:value="value7" :max="3" @exceed="(_files, max) => (exceedMsg = format(text.exceed, { max }))" />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.maxSize }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.maxSizeDesc }} {{ oversizedMsg ? `(${oversizedMsg})` : '' }}</p>
		<div class="mx-4">
			<ImageList
				v-model:value="value8"
				:max-size="2"
				@oversized="(file, maxSize) => (oversizedMsg = format(text.oversized, { name: file.name, maxSize }))"
			/>
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.disabled }}</div>
		<div class="mx-4">
			<ImageList :value="value9" disabled />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.readonly }}</div>
		<div class="mx-4">
			<ImageList :value="value10" readonly />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.notDeletable }}</div>
		<div class="mx-4">
			<ImageList :value="value11" :deletable="false" />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.customStyle }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.customStyleDesc }}</p>
		<div class="mx-4">
			<ImageList v-model:value="value12" radius="xl" gap="4" />
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.customAdd }}</div>
		<div class="mx-4">
			<ImageList v-model:value="value13">
				<template #upload>
					<div class="flex flex-col items-center text-primary dark:text-dark">
						<Icon name="ri-camera-line" :size="32" />
						<span class="mt-1 text-xs">{{ text.takePhoto }}</span>
					</div>
				</template>
			</ImageList>
		</div>

		<div class="mx-4 mb-2 mt-10 text-lg font-bold">{{ text.simulate }}</div>
		<p class="mx-4 mb-2 text-xs opacity-60">{{ text.simulateDesc }}</p>
		<div class="mx-4">
			<input ref="fileInput14" type="file" accept="image/*" multiple class="hidden" @change="handleFileChange14" />
			<ImageList
				ref="uploadRef14"
				:value="value14"
				@add="simulateUpload"
				@delete="handleDelete14"
				@retry="handleRetry"
				@click-upload="handleClickUpload14"
			/>
		</div>

		<div class="h-20" />
	</div>
</template>
