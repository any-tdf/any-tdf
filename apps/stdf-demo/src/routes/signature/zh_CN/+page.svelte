<!-- Signature Demo -->
<script lang="ts">
	import { Signature, Button, Toast, ImageList, Tab } from 'stdf';
	import type { SignatureResult, SignatureRotation, ImageListItemProps } from 'stdf/types';

	// 基础用法 - 签名图片列表
	let signatureImages = $state<ImageListItemProps[]>([]);

	function handleConfirm1(result: SignatureResult) {
		if (result.isEmpty) {
			showToast = true;
			toastMessage = '签名为空，请先签名';
			return;
		}
		// 添加新签名到列表
		const newItem: ImageListItemProps = {
			id: Date.now(),
			url: result.dataUrl,
			status: 'success'
		};
		if (signatureImages.length >= 6) {
			// 超过 6 张时移除最早的一张
			signatureImages = [...signatureImages.slice(1), newItem];
		} else {
			signatureImages = [...signatureImages, newItem];
		}
		showToast = true;
		toastMessage = '签名已保存';
	}

	// 自定义比例
	let result2: SignatureResult | null = $state(null);

	// 自定义颜色
	let result3: SignatureResult | null = $state(null);

	// 自定义画笔粗细
	let result4: SignatureResult | null = $state(null);

	// 旋转导出
	let rotationValue = $state(0);
	const rotationMap: SignatureRotation[] = [0, 90, 180, 270];
	const rotationLabels = [{ text: '0°' }, { text: '90°' }, { text: '180°' }, { text: '270°' }];
	let rotation = $derived(rotationMap[rotationValue] as SignatureRotation);
	let rotationImages = $state<ImageListItemProps[]>([]);
	let rotationSignatureRef = $state<Signature>();

	function handleRotationExport() {
		const result = rotationSignatureRef?.getSignature(rotation);
		if (result) {
			if (result.isEmpty) {
				showToast = true;
				toastMessage = '签名为空，请先签名';
				return;
			}
			const newItem: ImageListItemProps = {
				id: Date.now(),
				url: result.dataUrl,
				status: 'success',
				message: `旋转 ${rotation}°`
			};
			if (rotationImages.length >= 6) {
				rotationImages = [...rotationImages.slice(1), newItem];
			} else {
				rotationImages = [...rotationImages, newItem];
			}
			showToast = true;
			toastMessage = `签名已导出（旋转 ${rotation}°）`;
		}
	}

	// 自定义圆角
	let result7: SignatureResult | null = $state(null);

	// 不显示按钮
	let signatureRef = $state<Signature>();

	function handleExternalClear() {
		signatureRef?.clear();
	}

	function handleExternalConfirm() {
		const result = signatureRef?.getSignature();
		if (result) {
			if (result.isEmpty) {
				showToast = true;
				toastMessage = '签名为空';
			} else {
				showToast = true;
				toastMessage = '签名已获取';
			}
		}
	}

	// 导出不同格式
	let imageTypeIndex = $state(0);
	const imageTypes = ['png', 'jpeg', 'webp'] as const;
	const imageTypeLabels = [{ text: 'PNG' }, { text: 'JPEG' }, { text: 'WebP' }];
	let imageType = $derived(imageTypes[imageTypeIndex]);

	// Toast 显示
	let showToast = $state(false);
	let toastMessage = $state('');

	function handleClear() {
		showToast = true;
		toastMessage = '签名已清空';
	}

	function handleDrawStart() {
		console.log('开始绘制');
	}

	function handleDrawEnd() {
		console.log('结束绘制');
	}
</script>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">基础用法</div>
<p class="mx-4 mb-2 text-xs opacity-60">点击确认后签名图片将保存到下方列表（最多 6 张）</p>
<div class="mx-4">
	<Signature
		onconfirm={handleConfirm1}
		onclear={handleClear}
		ondrawStart={handleDrawStart}
		ondrawEnd={handleDrawEnd}
	/>
	{#if signatureImages.length > 0}
		<div class="mt-3">
			<p class="text-sm opacity-60 mb-2">已保存的签名：</p>
			<ImageList
				bind:value={signatureImages}
				readonly
				columns={3}
				aspectRatio={[3, 1]}
			/>
		</div>
	{/if}
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">自定义比例</div>
<p class="mx-4 mb-2 text-xs opacity-60">宽高比 2:1</p>
<div class="mx-4">
	<Signature
		aspectRatio={[2, 1]}
		onconfirm={(result) => (result2 = result)}
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">自定义颜色</div>
<p class="mx-4 mb-2 text-xs opacity-60">蓝色画笔，浅蓝背景</p>
<div class="mx-4">
	<Signature
		lineColor="#2563eb"
		bgColor="#dbeafe"
		onconfirm={(result) => (result3 = result)}
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">自定义画笔粗细</div>
<p class="mx-4 mb-2 text-xs opacity-60">画笔粗细 6px</p>
<div class="mx-4">
	<Signature
		lineWidth={6}
		onconfirm={(result) => (result4 = result)}
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">旋转导出</div>
<p class="mx-4 mb-2 text-xs opacity-60">导出时可指定旋转角度，适用于横屏签名后需要旋转图片的场景</p>
<div class="mx-4 mb-3">
	<Tab labels={rotationLabels} active={rotationValue} onclickTab={(i) => (rotationValue = i)} />
</div>
<div class="mx-4">
	<Signature
		bind:this={rotationSignatureRef}
		showButtons={false}
	/>
	<div class="flex gap-3 mt-3 justify-end">
		<Button fill="line" size="auto" injClass="px-4" onclick={() => rotationSignatureRef?.clear()}>清空</Button>
		<Button fill="base" size="auto" injClass="px-4" onclick={handleRotationExport}>导出（{rotation}°）</Button>
	</div>
	{#if rotationImages.length > 0}
		<div class="mt-3">
			<p class="text-sm opacity-60 mb-2">已导出的签名：</p>
			<ImageList
				bind:value={rotationImages}
				readonly
				columns={3}
				aspectRatio={[3, 1]}
			/>
		</div>
	{/if}
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">自定义圆角</div>
<p class="mx-4 mb-2 text-xs opacity-60">圆角 2xl</p>
<div class="mx-4">
	<Signature
		radius="2xl"
		onconfirm={(result) => (result7 = result)}
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">不显示按钮</div>
<p class="mx-4 mb-2 text-xs opacity-60">通过外部调用组件方法</p>
<div class="mx-4">
	<Signature
		bind:this={signatureRef}
		showButtons={false}
	/>
	<div class="flex gap-3 mt-3">
		<Button fill="line" size="auto" injClass="px-4" onclick={handleExternalClear}>外部清空</Button>
		<Button fill="base" size="auto" injClass="px-4" onclick={handleExternalConfirm}>外部获取</Button>
	</div>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">导出不同格式</div>
<div class="mx-4 mb-3">
	<Tab labels={imageTypeLabels} active={imageTypeIndex} onclickTab={(i) => (imageTypeIndex = i)} />
</div>
<div class="mx-4">
	<Signature
		{imageType}
		imageQuality={0.8}
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">自定义按钮文字</div>
<div class="mx-4">
	<Signature
		clearText="重新签名"
		confirmText="提交签名"
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">自定义按钮样式</div>
<div class="mx-4">
	<Signature
		clearButton={{ state: 'error', fill: 'line' }}
		confirmButton={{ state: 'success', fill: 'base' }}
		onclear={handleClear}
	/>
</div>

<div class="h-20"></div>

<Toast bind:visible={showToast} message={toastMessage} duration={1500} />
