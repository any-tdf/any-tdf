import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { ImageList, Icon } from 'rtdf/components';
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

function ImageListEn() {
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
		{ id: '3', url: '/assets/images/wall_3.jpg', status: 'error', message: 'Failed' },
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

	const simulateUpload = (files: File[]) => {
		files.forEach((file) => {
			const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
			const url = URL.createObjectURL(file);
			setValue14((prev) => [...prev, { id, url, file, status: 'uploading' }]);
			setTimeout(() => {
				const success = Math.random() > 0.3;
				setValue14((prev) =>
					prev.map((item) =>
						item.id === id ? { ...item, status: success ? 'success' : 'error', message: success ? '' : 'Upload failed' } : item
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
			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Basic Usage</div>
			<div className="mx-4">
				<ImageList value={value1} onAdd={createAddHandler(setValue1)} onDelete={createDeleteHandler(setValue1)} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Default Images</div>
			<div className="mx-4">
				<ImageList value={value2} onAdd={createAddHandler(setValue2)} onDelete={createDeleteHandler(setValue2)} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Different Columns</div>
			<p className="mx-4 mb-2 text-xs opacity-60">3 columns</p>
			<div className="mx-4">
				<ImageList value={value3} columns={3} onAdd={createAddHandler(setValue3)} onDelete={createDeleteHandler(setValue3)} />
			</div>
			<p className="mx-4 mb-2 mt-4 text-xs opacity-60">4 columns (default)</p>
			<div className="mx-4">
				<ImageList value={value4} columns={4} onAdd={createAddHandler(setValue4)} onDelete={createDeleteHandler(setValue4)} />
			</div>
			<p className="mx-4 mb-2 mt-4 text-xs opacity-60">5 columns</p>
			<div className="mx-4">
				<ImageList value={value5} columns={5} onAdd={createAddHandler(setValue5)} onDelete={createDeleteHandler(setValue5)} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Status Display</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Show various states</p>
			<div className="mx-4">
				<ImageList value={value6} onAdd={createAddHandler(setValue6)} onDelete={createDeleteHandler(setValue6)} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Max Count</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Maximum 3 images {exceedMsg ? `(${exceedMsg})` : ''}</p>
			<div className="mx-4">
				<ImageList
					value={value7}
					max={3}
					onAdd={createAddHandler(setValue7)}
					onDelete={createDeleteHandler(setValue7)}
					onExceed={(_files, max) => setExceedMsg(`Exceeded, max ${max} images`)}
				/>
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Max Size</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Max 2 MB per image {oversizedMsg ? `(${oversizedMsg})` : ''}</p>
			<div className="mx-4">
				<ImageList
					value={value8}
					maxSize={2}
					onAdd={createAddHandler(setValue8)}
					onDelete={createDeleteHandler(setValue8)}
					onOversized={(file, maxSize) => setOversizedMsg(`${file.name} exceeds ${maxSize} MB`)}
				/>
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Disabled</div>
			<div className="mx-4">
				<ImageList value={value9} disabled />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Readonly</div>
			<div className="mx-4">
				<ImageList value={value10} readonly />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Not Deletable</div>
			<div className="mx-4">
				<ImageList value={value11} deletable={false} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Style</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Radius, gap</p>
			<div className="mx-4">
				<ImageList value={value12} radius="xl" gap="4" onAdd={createAddHandler(setValue12)} onDelete={createDeleteHandler(setValue12)} />
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Custom Add Button</div>
			<div className="mx-4">
				<ImageList
					value={value13}
					onAdd={createAddHandler(setValue13)}
					onDelete={createDeleteHandler(setValue13)}
					uploadChild={() => (
						<div className="flex flex-col items-center text-primary dark:text-dark">
							<Icon name="ri-camera-line" size={32} />
							<span className="mt-1 text-xs">Take Photo</span>
						</div>
					)}
				/>
			</div>

			<div className="mx-4 mb-2 mt-10 text-lg font-bold">Simulate Upload</div>
			<p className="mx-4 mb-2 text-xs opacity-60">Demo upload flow (with retry)</p>
			<div className="mx-4">
				<ImageList value={value14} onAdd={simulateUpload} onDelete={createDeleteHandler(setValue14)} onRetry={handleRetry} />
			</div>

			<div className="h-20" />
		</div>
	);
}

export default ImageListEn;
