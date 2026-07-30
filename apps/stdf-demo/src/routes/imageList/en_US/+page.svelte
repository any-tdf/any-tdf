<!-- ImageList Demo -->
<script lang="ts">
	import { ImageList, Button, Icon } from 'stdf';
	import type { ImageListItemProps } from 'stdf/types';

	// Basic usage
	let value1 = $state<ImageListItemProps[]>([]);

	// Default images
	let value2 = $state<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
		{ id: '2', url: '/assets/images/wall_2.jpg', status: 'success' }
	]);

	// Different columns
	let value3 = $state<ImageListItemProps[]>([]);
	let value4 = $state<ImageListItemProps[]>([]);
	let value5 = $state<ImageListItemProps[]>([]);

	// Status
	let value6 = $state<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
		{ id: '2', url: '/assets/images/wall_2.jpg', status: 'uploading' },
		{ id: '3', url: '/assets/images/wall_3.jpg', status: 'error', message: 'Failed' },
		{ id: '4', url: '/assets/images/wall_4.jpg', status: 'pending' }
	]);

	// Max count
	let value7 = $state<ImageListItemProps[]>([]);
	let exceedMsg = $state('');

	// Max size
	let value8 = $state<ImageListItemProps[]>([]);
	let oversizedMsg = $state('');

	// Disabled
	let value9 = $state<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' }
	]);

	// Readonly
	let value10 = $state<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
		{ id: '2', url: '/assets/images/wall_2.jpg', status: 'success' }
	]);

	// Not deletable
	let value11 = $state<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' }
	]);

	// Custom style
	let value12 = $state<ImageListItemProps[]>([]);

	// Custom upload button
	let value13 = $state<ImageListItemProps[]>([]);

	// Simulate upload
	let value14 = $state<ImageListItemProps[]>([]);

	// Simulate upload function
	const simulateUpload = (files: File[]) => {
		files.forEach((file) => {
			const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
			const url = URL.createObjectURL(file);

			// Add pending item
			value14 = [
				...value14,
				{ id, url, file, status: 'uploading' }
			];

			// Simulate upload delay
			setTimeout(() => {
				// Random success or fail
				const success = Math.random() > 0.3;
				value14 = value14.map((item) =>
					item.id === id
						? {
								...item,
								status: success ? 'success' : 'error',
								message: success ? '' : 'Upload failed'
							}
						: item
				);
			}, 1500);
		});
	};

	// Retry upload
	const handleRetry = (item: ImageListItemProps, index: number) => {
		value14 = value14.map((v, i) =>
			i === index ? { ...v, status: 'uploading', message: '' } : v
		);

		setTimeout(() => {
			value14 = value14.map((v, i) =>
				i === index ? { ...v, status: 'success' } : v
			);
		}, 1500);
	};
</script>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Basic Usage</div>
<div class="mx-4">
	<ImageList bind:value={value1} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Default Images</div>
<div class="mx-4">
	<ImageList bind:value={value2} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Different Columns</div>
<p class="mx-4 mb-2 text-xs opacity-60">3 columns</p>
<div class="mx-4">
	<ImageList bind:value={value3} columns={3} />
</div>
<p class="mx-4 mb-2 mt-4 text-xs opacity-60">4 columns (default)</p>
<div class="mx-4">
	<ImageList bind:value={value4} columns={4} />
</div>
<p class="mx-4 mb-2 mt-4 text-xs opacity-60">5 columns</p>
<div class="mx-4">
	<ImageList bind:value={value5} columns={5} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Status Display</div>
<p class="mx-4 mb-2 text-xs opacity-60">Show various states</p>
<div class="mx-4">
	<ImageList bind:value={value6} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Max Count</div>
<p class="mx-4 mb-2 text-xs opacity-60">Maximum 3 images {exceedMsg ? `(${exceedMsg})` : ''}</p>
<div class="mx-4">
	<ImageList
		bind:value={value7}
		max={3}
		onexceed={(files, max) => (exceedMsg = `Exceeded, max ${max} images`)}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Max Size</div>
<p class="mx-4 mb-2 text-xs opacity-60">Max 2MB per image {oversizedMsg ? `(${oversizedMsg})` : ''}</p>
<div class="mx-4">
	<ImageList
		bind:value={value8}
		maxSize={2}
		onoversized={(file, maxSize) => (oversizedMsg = `${file.name} exceeds ${maxSize}MB`)}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Disabled</div>
<div class="mx-4">
	<ImageList bind:value={value9} disabled />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Readonly</div>
<div class="mx-4">
	<ImageList bind:value={value10} readonly />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Not Deletable</div>
<div class="mx-4">
	<ImageList bind:value={value11} deletable={false} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Style</div>
<p class="mx-4 mb-2 text-xs opacity-60">Radius, gap</p>
<div class="mx-4">
	<ImageList bind:value={value12} radius="xl" gap="4" />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Add Button</div>
<div class="mx-4">
	<ImageList bind:value={value13}>
		{#snippet uploadChild()}
			<div class="flex flex-col items-center text-primary dark:text-dark">
				<Icon name="ri-camera-line" size={32} />
				<span class="text-xs mt-1">Take Photo</span>
			</div>
		{/snippet}
	</ImageList>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Simulate Upload</div>
<p class="mx-4 mb-2 text-xs opacity-60">Demo upload flow (with retry)</p>
<div class="mx-4">
	<ImageList
		bind:value={value14}
		onadd={simulateUpload}
		onretry={handleRetry}
	/>
</div>

<div class="h-20"></div>
