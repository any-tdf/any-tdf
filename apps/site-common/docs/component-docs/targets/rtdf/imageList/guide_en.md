## Use Cases

ImageList component is used to display pending or uploaded images, supporting preview, delete, status display and more.

## Upload Flow

The component itself does not handle actual upload operations or file selection, only displays images and status. File selection and upload are controlled by the developer.

The upload flow is:

1. User clicks upload button, triggers `onClickUpload` event
2. Developer implements file selection (e.g., native input or third-party library)
3. After getting files, call component's `addFiles` method to add them
4. Component triggers `onAdd` event
5. Business code handles upload logic, updates `status` and `progress` in `value`
6. Update `status` to `success` or `error` when complete

```tsx
import { useRef, useState } from 'react';
import type { ImageListItemProps } from 'rtdf';
import { ImageList } from 'rtdf';

const uploadRef = useRef<{ addFiles: (files: File[]) => void } | null>(null);
const fileInputRef = useRef<HTMLInputElement | null>(null);
const [value, setValue] = useState<ImageListItemProps[]>([]);

const handleClickUpload = () => {
	fileInputRef.current?.click();
};

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	const files = Array.from(event.target.files || []);
	if (files.length > 0) {
		uploadRef.current?.addFiles(files);
	}
	event.target.value = '';
};

const handleAdd = (files: File[]) => {
	files.forEach((file) => {
		const id = Date.now();
		setValue((prev) => [...prev, { id, file, status: 'uploading', progress: 0 }]);

		uploadFile(file, {
			onProgress: (progress: number) => {
				setValue((prev) => prev.map((item) => (item.id === id ? { ...item, progress } : item)));
			},
			onSuccess: (url: string) => {
				setValue((prev) => prev.map((item) => (item.id === id ? { ...item, url, status: 'success' } : item)));
			},
			onError: () => {
				setValue((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'error' } : item)));
			}
		});
	});
};

return (
	<>
		<input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
		<ImageList ref={uploadRef} value={value} onAdd={handleAdd} onClickUpload={handleClickUpload} />
	</>
);
```

## Upload Status

- `pending`: Waiting to upload
- `uploading`: Uploading (can show progress)
- `success`: Upload succeeded
- `error`: Upload failed (click to retry)

## Works with ImagePreview

Component has built-in ImagePreview, clicking image opens preview directly. For custom preview behavior, handle it via `onPreview` event.

## Notes

- Component uses `URL.createObjectURL` to create temporary preview URL
- Temporary URL is automatically revoked when image is deleted
- Recommend setting reasonable `max` and `maxSize` limits
