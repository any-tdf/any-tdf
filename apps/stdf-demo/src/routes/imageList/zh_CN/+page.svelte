<!-- ImageList Demo -->
<script lang="ts">
	import { ImageList, Button, Icon } from 'stdf';
	import type { ImageListItemProps } from 'stdf/types';

	// 基础用法
	let value1 = $state<ImageListItemProps[]>([]);

	// 默认图片
	let value2 = $state<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
		{ id: '2', url: '/assets/images/wall_2.jpg', status: 'success' }
	]);

	// 不同列数
	let value3 = $state<ImageListItemProps[]>([]);
	let value4 = $state<ImageListItemProps[]>([]);
	let value5 = $state<ImageListItemProps[]>([]);

	// 上传状态
	let value6 = $state<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
		{ id: '2', url: '/assets/images/wall_2.jpg', status: 'uploading' },
		{ id: '3', url: '/assets/images/wall_3.jpg', status: 'error', message: '上传失败' },
		{ id: '4', url: '/assets/images/wall_4.jpg', status: 'pending' }
	]);

	// 数量限制
	let value7 = $state<ImageListItemProps[]>([]);
	let exceedMsg = $state('');

	// 大小限制
	let value8 = $state<ImageListItemProps[]>([]);
	let oversizedMsg = $state('');

	// 禁用状态
	let value9 = $state<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' }
	]);

	// 只读状态
	let value10 = $state<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' },
		{ id: '2', url: '/assets/images/wall_2.jpg', status: 'success' }
	]);

	// 不可删除
	let value11 = $state<ImageListItemProps[]>([
		{ id: '1', url: '/assets/images/wall_1.jpg', status: 'success' }
	]);

	// 自定义样式
	let value12 = $state<ImageListItemProps[]>([]);

	// 自定义上传按钮
	let value13 = $state<ImageListItemProps[]>([]);

	// 模拟上传
	let value14 = $state<ImageListItemProps[]>([]);
	let uploadRef14 = $state<any>();
	let fileInput14 = $state<HTMLInputElement>();

	// 点击上传按钮时调起文件选择
	const handleClickUpload14 = () => {
		fileInput14?.click();
	};

	// 文件选择后添加到组件
	const handleFileChange14 = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const files = Array.from(target.files || []);
		if (files.length > 0) {
			uploadRef14?.addFiles(files);
		}
		target.value = '';
	};

	// 模拟上传函数
	const simulateUpload = (files: File[]) => {
		files.forEach((file) => {
			const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
			const url = URL.createObjectURL(file);

			// 添加待上传项
			value14 = [
				...value14,
				{ id, url, file, status: 'uploading' }
			];

			// 模拟上传延迟
			setTimeout(() => {
				// 随机成功或失败
				const success = Math.random() > 0.3;
				value14 = value14.map((item) =>
					item.id === id
						? {
								...item,
								status: success ? 'success' : 'error',
								message: success ? '' : '上传失败'
							}
						: item
				);
			}, 1500);
		});
	};

	// 重试上传
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

<div class="mx-4 mb-2 mt-10 text-lg font-bold">基础用法</div>
<div class="mx-4">
	<ImageList bind:value={value1} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">默认图片</div>
<div class="mx-4">
	<ImageList bind:value={value2} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">不同列数</div>
<p class="mx-4 mb-2 text-xs opacity-60">3 列</p>
<div class="mx-4">
	<ImageList bind:value={value3} columns={3} />
</div>
<p class="mx-4 mb-2 mt-4 text-xs opacity-60">4 列（默认）</p>
<div class="mx-4">
	<ImageList bind:value={value4} columns={4} />
</div>
<p class="mx-4 mb-2 mt-4 text-xs opacity-60">5 列</p>
<div class="mx-4">
	<ImageList bind:value={value5} columns={5} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">状态展示</div>
<p class="mx-4 mb-2 text-xs opacity-60">展示各种状态</p>
<div class="mx-4">
	<ImageList bind:value={value6} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">数量限制</div>
<p class="mx-4 mb-2 text-xs opacity-60">最多 3 张 {exceedMsg ? `(${exceedMsg})` : ''}</p>
<div class="mx-4">
	<ImageList
		bind:value={value7}
		max={3}
		onexceed={(files, max) => (exceedMsg = `超出限制，最多 ${max} 张`)}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">大小限制</div>
<p class="mx-4 mb-2 text-xs opacity-60">单张最大 2MB {oversizedMsg ? `(${oversizedMsg})` : ''}</p>
<div class="mx-4">
	<ImageList
		bind:value={value8}
		maxSize={2}
		onoversized={(file, maxSize) => (oversizedMsg = `${file.name} 超过 ${maxSize}MB`)}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">禁用状态</div>
<div class="mx-4">
	<ImageList bind:value={value9} disabled />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">只读状态</div>
<div class="mx-4">
	<ImageList bind:value={value10} readonly />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">不可删除</div>
<div class="mx-4">
	<ImageList bind:value={value11} deletable={false} />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">自定义样式</div>
<p class="mx-4 mb-2 text-xs opacity-60">圆角、间距</p>
<div class="mx-4">
	<ImageList bind:value={value12} radius="xl" gap="4" />
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">自定义添加按钮</div>
<div class="mx-4">
	<ImageList bind:value={value13}>
		{#snippet uploadChild()}
			<div class="flex flex-col items-center text-primary dark:text-dark">
				<Icon name="ri-camera-line" size={32} />
				<span class="text-xs mt-1">拍照上传</span>
			</div>
		{/snippet}
	</ImageList>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">模拟上传</div>
<p class="mx-4 mb-2 text-xs opacity-60">演示上传流程（含重试），点击添加按钮触发文件选择</p>
<div class="mx-4">
	<input type="file" accept="image/*" multiple class="hidden" bind:this={fileInput14} onchange={handleFileChange14} />
	<ImageList
		bind:this={uploadRef14}
		bind:value={value14}
		onadd={simulateUpload}
		onretry={handleRetry}
		onclickUpload={handleClickUpload14}
	/>
</div>

<div class="h-20"></div>
