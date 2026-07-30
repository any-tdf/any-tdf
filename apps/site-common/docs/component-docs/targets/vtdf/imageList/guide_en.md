## Use Cases

ImageList component is used to display pending or uploaded images, supporting preview, delete, status display and more.

## Upload Flow

The component itself does not handle actual upload operations or file selection, only displays images and status. File selection and upload are controlled by the developer.

The upload flow is:

1. User clicks upload button, triggering the `@click-upload` event
2. Developer implements file selection (e.g., native input or third-party library)
3. After getting files, call component's `addFiles` method to add them
4. Component triggers the `@add` event
5. Business code handles upload logic, updates `status` and `progress` in `value`
6. Update `status` to `success` or `error` when complete

```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { ImageListItemProps } from 'vtdf';
import { ImageList } from 'vtdf';

const uploadRef = ref<{ addFiles: (files: File[]) => void } | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const value = ref<ImageListItemProps[]>([]);

const handleClickUpload = () => {
	fileInputRef.value?.click();
};

const handleFileChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const files = Array.from(target.files || []);
	if (files.length > 0) {
		uploadRef.value?.addFiles(files);
	}
	target.value = '';
};

const handleAdd = (files: File[]) => {
	files.forEach((file) => {
		const id = Date.now();
		value.value = [...value.value, { id, file, status: 'uploading', progress: 0 }];

		uploadFile(file, {
			onProgress: (progress: number) => {
				value.value = value.value.map((item) => (item.id === id ? { ...item, progress } : item));
			},
			onSuccess: (url: string) => {
				value.value = value.value.map((item) => (item.id === id ? { ...item, url, status: 'success' } : item));
			},
			onError: () => {
				value.value = value.value.map((item) => (item.id === id ? { ...item, status: 'error' } : item));
			}
		});
	});
};
</script>

<template>
	<input ref="fileInputRef" type="file" accept="image/*" multiple class="hidden" @change="handleFileChange" />
	<ImageList ref="uploadRef" v-model:value="value" @add="handleAdd" @click-upload="handleClickUpload" />
</template>
```

## Upload Status

- `pending`: Waiting to upload
- `uploading`: Uploading (can show progress)
- `success`: Upload succeeded
- `error`: Upload failed (click to retry)

## Works with ImagePreview

Component has built-in ImagePreview; clicking an image opens preview directly. For custom preview behavior, handle it via the `@preview` event.

## Notes

- Component uses `URL.createObjectURL` to create temporary preview URL
- Temporary URL is automatically revoked when image is deleted
- Recommend setting reasonable `max` and `maxSize` limits
