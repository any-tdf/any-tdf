## Use Cases

ImageList component is used to display pending or uploaded images, supporting preview, delete, status display and more.

## Upload Flow

The component itself does not handle actual upload operations or file selection, only displays images and status. File selection and upload are controlled by the developer.

The upload flow is:

1. User clicks upload button, triggers `onclickUpload` event
2. Developer implements file selection (e.g., native input or third-party library)
3. After getting files, call component's `addFiles` method to add them
4. Component triggers `onadd` event
5. Business code handles upload logic, updates `status` and `progress` in `value`
6. Update `status` to `success` or `error` when complete

```svelte
<script>
	let value = $state([]);
	let uploadRef;
	let fileInput;

	// Trigger file selection when upload button clicked
	const handleClickUpload = () => {
		fileInput?.click();
	};

	// Add files to component after selection
	const handleFileChange = (e) => {
		const files = Array.from(e.target.files || []);
		if (files.length > 0) {
			uploadRef?.addFiles(files);
		}
		e.target.value = '';
	};

	// Start upload after files added
	const handleAdd = (files) => {
		files.forEach((file) => {
			const id = Date.now();
			value = [...value, { id, file, status: 'uploading', progress: 0 }];

			// Call upload API
			uploadFile(file, {
				onProgress: (progress) => {
					value = value.map((v) => (v.id === id ? { ...v, progress } : v));
				},
				onSuccess: (url) => {
					value = value.map((v) => (v.id === id ? { ...v, url, status: 'success' } : v));
				},
				onError: () => {
					value = value.map((v) => (v.id === id ? { ...v, status: 'error' } : v));
				}
			});
		});
	};
</script>

<input type="file" accept="image/*" multiple class="hidden" bind:this={fileInput} onchange={handleFileChange} />

<ImageList bind:this={uploadRef} bind:value onadd={handleAdd} onclickUpload={handleClickUpload} />
```

## Upload Status

- `pending`: Waiting to upload
- `uploading`: Uploading (can show progress)
- `success`: Upload succeeded
- `error`: Upload failed (click to retry)

## Works with ImagePreview

Component has built-in ImagePreview, clicking image opens preview directly. For custom preview behavior, handle it via `onpreview` event.

## Notes

- Component uses `URL.createObjectURL` to create temporary preview URL
- Temporary URL is automatically revoked when image is deleted
- Recommend setting reasonable `max` and `maxSize` limits
