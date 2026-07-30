## 使用场景

图片列表组件用于展示待上传或已上传的图片列表，支持预览、删除、状态显示等功能。

## 上传流程

组件本身不负责实际的上传操作和文件选择，只负责展示图片和状态。文件选择和上传由开发者控制。

上传流程如下：

1. 用户点击上传按钮，触发 `onClickUpload` 事件
2. 开发者自行实现文件选择（如调用原生 input 或第三方库）
3. 获取到文件后，调用组件的 `addFiles` 方法添加文件
4. 组件触发 `onAdd` 事件
5. 业务代码处理上传逻辑，更新 `value` 中对应项的 `status` 和 `progress`
6. 上传完成后更新 `status` 为 `success` 或 `error`

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

## 上传状态

- `pending`：等待上传
- `uploading`：上传中（可显示进度）
- `success`：上传成功
- `error`：上传失败（点击可重试）

## 与 ImagePreview 配合

组件内置了 ImagePreview，点击图片可直接预览。如需自定义预览行为，可通过 `onPreview` 事件处理。

## 注意事项

- 组件使用 `URL.createObjectURL` 创建临时预览地址
- 删除图片时会自动释放临时地址
- 建议设置合理的 `max` 和 `maxSize` 限制
