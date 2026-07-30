<!-- Signature Demo -->
<script lang="ts">
	import { Signature, Button, Toast, ImageList, Tab } from 'stdf';
	import type { SignatureResult, SignatureRotation, ImageListItemProps } from 'stdf/types';

	// Basic usage - signature image list
	let signatureImages = $state<ImageListItemProps[]>([]);

	function handleConfirm1(result: SignatureResult) {
		if (result.isEmpty) {
			showToast = true;
			toastMessage = 'Signature is empty, please sign first';
			return;
		}
		// Add new signature to list
		const newItem: ImageListItemProps = {
			id: Date.now(),
			url: result.dataUrl,
			status: 'success'
		};
		if (signatureImages.length >= 6) {
			// Remove the oldest one when exceeding 6
			signatureImages = [...signatureImages.slice(1), newItem];
		} else {
			signatureImages = [...signatureImages, newItem];
		}
		showToast = true;
		toastMessage = 'Signature saved';
	}

	// Custom ratio
	let result2: SignatureResult | null = $state(null);

	// Custom colors
	let result3: SignatureResult | null = $state(null);

	// Custom line width
	let result4: SignatureResult | null = $state(null);

	// Rotation export
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
				toastMessage = 'Signature is empty, please sign first';
				return;
			}
			const newItem: ImageListItemProps = {
				id: Date.now(),
				url: result.dataUrl,
				status: 'success',
				message: `Rotated ${rotation}°`
			};
			if (rotationImages.length >= 6) {
				rotationImages = [...rotationImages.slice(1), newItem];
			} else {
				rotationImages = [...rotationImages, newItem];
			}
			showToast = true;
			toastMessage = `Signature exported (rotated ${rotation}°)`;
		}
	}

	// Custom radius
	let result7: SignatureResult | null = $state(null);

	// Hide buttons
	let signatureRef = $state<Signature>();

	function handleExternalClear() {
		signatureRef?.clear();
	}

	function handleExternalConfirm() {
		const result = signatureRef?.getSignature();
		if (result) {
			if (result.isEmpty) {
				showToast = true;
				toastMessage = 'Signature is empty';
			} else {
				showToast = true;
				toastMessage = 'Signature captured';
			}
		}
	}

	// Export different formats
	let imageTypeIndex = $state(0);
	const imageTypes = ['png', 'jpeg', 'webp'] as const;
	const imageTypeLabels = [{ text: 'PNG' }, { text: 'JPEG' }, { text: 'WebP' }];
	let imageType = $derived(imageTypes[imageTypeIndex]);

	// Toast display
	let showToast = $state(false);
	let toastMessage = $state('');

	function handleClear() {
		showToast = true;
		toastMessage = 'Signature cleared';
	}

	function handleDrawStart() {
		console.log('Draw started');
	}

	function handleDrawEnd() {
		console.log('Draw ended');
	}
</script>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Basic Usage</div>
<p class="mx-4 mb-2 text-xs opacity-60">After clicking confirm, signatures will be saved to the list below (max 6)</p>
<div class="mx-4">
	<Signature
		clearText="Clear"
		confirmText="Confirm"
		onconfirm={handleConfirm1}
		onclear={handleClear}
		ondrawStart={handleDrawStart}
		ondrawEnd={handleDrawEnd}
	/>
	{#if signatureImages.length > 0}
		<div class="mt-3">
			<p class="text-sm opacity-60 mb-2">Saved signatures:</p>
			<ImageList
				bind:value={signatureImages}
				readonly
				columns={3}
				aspectRatio={[3, 1]}
			/>
		</div>
	{/if}
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Aspect Ratio</div>
<p class="mx-4 mb-2 text-xs opacity-60">Aspect ratio 2:1</p>
<div class="mx-4">
	<Signature
		aspectRatio={[2, 1]}
		clearText="Clear"
		confirmText="Confirm"
		onconfirm={(result) => (result2 = result)}
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Colors</div>
<p class="mx-4 mb-2 text-xs opacity-60">Blue pen, light blue background</p>
<div class="mx-4">
	<Signature
		lineColor="#2563eb"
		bgColor="#dbeafe"
		clearText="Clear"
		confirmText="Confirm"
		onconfirm={(result) => (result3 = result)}
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Line Width</div>
<p class="mx-4 mb-2 text-xs opacity-60">Line width 6px</p>
<div class="mx-4">
	<Signature
		lineWidth={6}
		clearText="Clear"
		confirmText="Confirm"
		onconfirm={(result) => (result4 = result)}
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Rotation Export</div>
<p class="mx-4 mb-2 text-xs opacity-60">Specify rotation angle when exporting, useful for rotating images after landscape signing</p>
<div class="mx-4 mb-3">
	<Tab labels={rotationLabels} active={rotationValue} onclickTab={(i) => (rotationValue = i)} />
</div>
<div class="mx-4">
	<Signature
		bind:this={rotationSignatureRef}
		showButtons={false}
	/>
	<div class="flex gap-3 mt-3 justify-end">
		<Button fill="line" size="auto" injClass="px-4" onclick={() => rotationSignatureRef?.clear()}>Clear</Button>
		<Button fill="base" size="auto" injClass="px-4" onclick={handleRotationExport}>Export ({rotation}°)</Button>
	</div>
	{#if rotationImages.length > 0}
		<div class="mt-3">
			<p class="text-sm opacity-60 mb-2">Exported signatures:</p>
			<ImageList
				bind:value={rotationImages}
				readonly
				columns={3}
				aspectRatio={[3, 1]}
			/>
		</div>
	{/if}
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Border Radius</div>
<p class="mx-4 mb-2 text-xs opacity-60">Border radius 2xl</p>
<div class="mx-4">
	<Signature
		radius="2xl"
		clearText="Clear"
		confirmText="Confirm"
		onconfirm={(result) => (result7 = result)}
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Hide Buttons</div>
<p class="mx-4 mb-2 text-xs opacity-60">Call component methods externally</p>
<div class="mx-4">
	<Signature
		bind:this={signatureRef}
		showButtons={false}
	/>
	<div class="flex gap-3 mt-3">
		<Button fill="line" size="auto" injClass="px-4" onclick={handleExternalClear}>External Clear</Button>
		<Button fill="base" size="auto" injClass="px-4" onclick={handleExternalConfirm}>External Get</Button>
	</div>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Export Different Formats</div>
<div class="mx-4 mb-3">
	<Tab labels={imageTypeLabels} active={imageTypeIndex} onclickTab={(i) => (imageTypeIndex = i)} />
</div>
<div class="mx-4">
	<Signature
		{imageType}
		imageQuality={0.8}
		clearText="Clear"
		confirmText="Confirm"
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Button Text</div>
<div class="mx-4">
	<Signature
		clearText="Re-sign"
		confirmText="Submit Signature"
		onclear={handleClear}
	/>
</div>

<div class="mx-4 mb-2 mt-10 text-lg font-bold">Custom Button Style</div>
<div class="mx-4">
	<Signature
		clearText="Clear"
		confirmText="Confirm"
		clearButton={{ state: 'error', fill: 'line' }}
		confirmButton={{ state: 'success', fill: 'base' }}
		onclear={handleClear}
	/>
</div>

<div class="h-20"></div>

<Toast bind:visible={showToast} message={toastMessage} duration={1500} />
