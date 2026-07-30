import { useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { ImageList, Icon, type ImageListRef } from 'rtdf/components';
import type { ImageListItemProps } from 'rtdf/types';

const createItems = (files: File[]): ImageListItemProps[] =>
	files.map((file) => ({
		id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
		url: URL.createObjectURL(file),
		file,
		status: 'pending'
	}));

const createAddHandler = (setValue: Dispatch<SetStateAction<ImageListItemProps[]>>) => (files: File[]) => {
	setValue((prev) => [...prev, ...createItems(files)]);
};

const createDeleteHandler = (setValue: Dispatch<SetStateAction<ImageListItemProps[]>>) => (_item: ImageListItemProps, index: number) => {
	setValue((prev) => prev.filter((_, i) => i !== index));
};

function ImageListZh() {
	const [value1, setValue1] = useState<ImageListItemProps[]>([]);
	const [value2, setValue2] = useState<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
		{ id: '2', url: '/assets/images/wall_2.jpg', status: 'success' }
	]);
	const [value3, setValue3] = useState<ImageListItemProps[]>([]);
	const [value4, setValue4] = useState<ImageListItemProps[]>([]);
	const [value5, setValue5] = useState<ImageListItemProps[]>([]);
	const [value6, setValue6] = useState<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
		{ id: '2', url: '/assets/images/wall_2.jpg', status: 'uploading' },
		{ id: '3', url: '/assets/images/wall_3.jpg', status: 'error', message: '上传失败' },
		{ id: '4', url: '/assets/images/wall_4.jpg', status: 'pending' }
	]);
	const [value7, setValue7] = useState<ImageListItemProps[]>([]);
	const [exceedMsg, setExceedMsg] = useState('');
	const [value8, setValue8] = useState<ImageListItemProps[]>([]);
	const [oversizedMsg, setOversizedMsg] = useState('');
	const [value9] = useState<ImageListItemProps[]>([{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' }]);
	const [value10] = useState<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
		{ id: '2', url: '/assets/images/wall_2.jpg', status: 'success' }
	]);
	const [value11] = useState<ImageListItemProps[]>([{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' }]);
	const [value12, setValue12] = useState<ImageListItemProps[]>([]);
	const [value13, setValue13] = useState<ImageListItemProps[]>([]);
	const [value14, setValue14] = useState<ImageListItemProps[]>([]);
	const uploadRef14 = useRef<ImageListRef | null>(null);
	const fileInput14 = useRef<HTMLInputElement | null>(null);

	const handleClickUpload14 = () => {
		fileInput14.current?.click();
	};

	const handleFileChange14 = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		if (files.length > 0) {
			uploadRef14.current?.addFiles(files);
		}
		event.target.value = '';
	};

	const simulateUpload = (files: File[]) => {
		files.forEach((file) => {
			const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
			const url = URL.createObjectURL(file);
			setValue14((prev) => [...prev, { id, url, file, status: 'uploading' }]);
			setTimeout(() => {
				const success = Math.random() > 0.3;
				setValue14((prev) =>
					prev.map((item) =>
						item.id === id ? { ...item, status: success ? 'success' : 'error', message: success ? '' : '上传失败' } : item
					)
				);
			}, 1500);
		});
	};

	const handleRetry = (_item: ImageListItemProps, index: number) => {
		setValue14((prev) => prev.map((item, i) => (i === index ? { ...item, status: 'uploading', message: '' } : item)));
		setTimeout(() => {
			setValue14((prev) => prev.map((item, i) => (i === index ? { ...item, status: 'success' } : item)));
		}, 1500);
	};

	return (
		<div>
			<div className="mx-4 mb-2 mt-10 text-lg font-bold">基础用法</div>
			<div className="mx-4">
				<ImageList value={value1} onAdd={createAddHandler(setValue1)} onDelete={createDeleteHandler(setValue1)} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">默认图片</div>
			<div className="mx-4">
				<ImageList value={value2} onAdd={createAddHandler(setValue2)} onDelete={createDeleteHandler(setValue2)} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">不同列数</div>
			<p className="mx-4 mb-2 text-xs opacity-60">3 列</p>
			<div className="mx-4">
				<ImageList value={value3} columns={3} onAdd={createAddHandler(setValue3)} onDelete={createDeleteHandler(setValue3)} />
			</div>
			<p className="mx-4 mb-2 mt-4 text-xs opacity-60">4 列（默认）</p>
			<div className="mx-4">
				<ImageList value={value4} columns={4} onAdd={createAddHandler(setValue4)} onDelete={createDeleteHandler(setValue4)} />
			</div>
			<p className="mx-4 mb-2 mt-4 text-xs opacity-60">5 列</p>
			<div className="mx-4">
				<ImageList value={value5} columns={5} onAdd={createAddHandler(setValue5)} onDelete={createDeleteHandler(setValue5)} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">状态展示</div>
			<p className="mx-4 mb-2 text-xs opacity-60">展示各种状态</p>
			<div className="mx-4">
				<ImageList value={value6} onAdd={createAddHandler(setValue6)} onDelete={createDeleteHandler(setValue6)} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">数量限制</div>
			<p className="mx-4 mb-2 text-xs opacity-60">最多 3 张 {exceedMsg ? `(${exceedMsg})` : ''}</p>
			<div className="mx-4">
				<ImageList
					value={value7}
					max={3}
					onAdd={createAddHandler(setValue7)}
					onDelete={createDeleteHandler(setValue7)}
					onExceed={(_files, max) => setExceedMsg(`超出限制，最多 ${max} 张`)}
				/>
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">大小限制</div>
			<p className="mx-4 mb-2 text-xs opacity-60">单张最大 2 MB {oversizedMsg ? `(${oversizedMsg})` : ''}</p>
			<div className="mx-4">
				<ImageList
					value={value8}
					maxSize={2}
					onAdd={createAddHandler(setValue8)}
					onDelete={createDeleteHandler(setValue8)}
					onOversized={(file, maxSize) => setOversizedMsg(`${file.name} 超过 ${maxSize} MB`)}
				/>
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">禁用状态</div>
			<div className="mx-4">
				<ImageList value={value9} disabled />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">只读状态</div>
			<div className="mx-4">
				<ImageList value={value10} readonly />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">不可删除</div>
			<div className="mx-4">
				<ImageList value={value11} deletable={false} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">自定义样式</div>
			<p className="mx-4 mb-2 text-xs opacity-60">圆角、间距</p>
			<div className="mx-4">
				<ImageList value={value12} radius="xl" gap="4" onAdd={createAddHandler(setValue12)} onDelete={createDeleteHandler(setValue12)} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">自定义添加按钮</div>
			<div className="mx-4">
				<ImageList
					value={value13}
					onAdd={createAddHandler(setValue13)}
					onDelete={createDeleteHandler(setValue13)}
					uploadChild={() => (
						<div className="flex flex-col items-center text-primary dark:text-dark">
							<Icon name="ri-camera-line" size={32} />
							<span className="mt-1 text-xs">拍照上传</span>
						</div>
					)}
				/>
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">模拟上传</div>
			<p className="mx-4 mb-2 text-xs opacity-60">演示上传流程（含重试），点击添加按钮触发文件选择</p>
			<div className="mx-4">
				<input ref={fileInput14} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange14} />
				<ImageList
					ref={uploadRef14}
					value={value14}
					onAdd={simulateUpload}
					onDelete={createDeleteHandler(setValue14)}
					onRetry={handleRetry}
					onClickUpload={handleClickUpload14}
				/>
			</div>

			<div className="h-20" />
		</div>
	);
}

export default ImageListZh;
