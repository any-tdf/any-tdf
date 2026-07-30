<!-- FullKeyboard Demo -->
<script lang="ts">
	import { FullKeyboard, Cell, Toast, Slider } from 'stdf';
	import type { SmallAreaRadius } from 'stdf/types';
	import { Confetti } from 'svelte-confetti';

	// Key radius
	const radiusValues: SmallAreaRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(2);
	let currentRadius = $derived<SmallAreaRadius>(radiusValues[radiusIndex]);

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible7 = $state(false);
	let visible8 = $state(false);
	let visible9 = $state(false);
	let visible10 = $state(false);
	let visible11 = $state(false);
	let visible12 = $state(false);
	let visible13 = $state(false);
	let visible14 = $state(false);
	let visible15 = $state(false);
	let visible16 = $state(false);
	let visible17 = $state(false);
	let visible18 = $state(false);
	let visible19 = $state(false);
	let visible20 = $state(false);

	// Get value
	let value1 = $state('');

	// Listen click event
	let visibleToast = $state(false);
	let key = $state('');
	const clickFunc = (k: string) => {
		key = k;
		visibleToast = true;
	};

	// Disable done button + confetti effect
	let value9 = $state('');
	let helloDom: HTMLElement | null = $state(null);
	let helloDomBottom = 0;
	let top = $state(0);
	const openFunc = (height: number) => {
		helloDomBottom = window.innerHeight - (helloDom?.getBoundingClientRect().bottom || 0);
		top = helloDomBottom < height ? -(height - helloDomBottom) - 50 : 0;
	};
</script>

<Cell title="Basic Usage" subTitle="Default full mode" onclick={() => (visible1 = true)} />
<FullKeyboard bind:visible={visible1} />

<Cell title="Letter Only Mode" subTitle="mode='letter'" onclick={() => (visible12 = true)} />
<FullKeyboard bind:visible={visible12} mode="letter" />

<Cell title="Letter + Number Mode" subTitle="mode='letterNumber'" onclick={() => (visible13 = true)} />
<FullKeyboard bind:visible={visible13} mode="letterNumber" />

<Cell title="Full Mode" subTitle="mode='full'" onclick={() => (visible14 = true)} />
<FullKeyboard bind:visible={visible14} mode="full" />

<Cell title="Block Style" subTitle="type='block'" onclick={() => (visible19 = true)} />
<FullKeyboard bind:visible={visible19} type="block" />

<Cell title="Block Style + Letter Number Mode" subTitle="type='block' + mode='letterNumber'" onclick={() => (visible20 = true)} />
<FullKeyboard bind:visible={visible20} type="block" mode="letterNumber" />

<div class="px-4">Input: {value1}</div>
<Cell title="Get Value" onclick={() => (visible2 = true)} />
<FullKeyboard bind:visible={visible2} bind:value={value1} />

<Cell title="Hide Done Button" onclick={() => (visible3 = true)} />
<FullKeyboard bind:visible={visible3} done={false} />

<Cell title="Custom Done Text" onclick={() => (visible6 = true)} />
<FullKeyboard bind:visible={visible6} doneText="Send" />

<Cell title="Input Preview" onclick={() => (visible7 = true)} />
<FullKeyboard bind:visible={visible7} preview />

<Cell title="Preview with Mask" onclick={() => (visible8 = true)} />
<FullKeyboard bind:visible={visible8} preview previewMask />

<div
	class="bg-primary dark:bg-dark shadow-primary/30 dark:shadow-dark/30 relative mx-16 h-10 rounded-full text-center text-xl leading-10 text-white shadow-lg transition-all dark:text-black"
	style="top:{top}px"
	bind:this={helloDom}
>
	{value9}
	{#if value9.toLowerCase() === 'hello'}
		<span class="absolute left-1/2"><Confetti rounded amount={100} /></span>
	{/if}
</div>
<Cell title="Please input hello" onclick={() => (visible9 = true)} />
<FullKeyboard bind:visible={visible9} bind:value={value9} doneDisabled={value9.toLowerCase() !== 'hello'} onopen={openFunc} onclose={() => (top = 0)} />

<Cell title="Larger Key Radius" onclick={() => (visible10 = true)} />
<FullKeyboard bind:visible={visible10} radius="2xl" />

<Cell title="Custom Key Font" subTitle="Need to load font in CSS and configure in @theme" onclick={() => (visible15 = true)} />
<FullKeyboard bind:visible={visible15} keyClass="font-Trueno" />

<Cell title="Custom Transition" subTitle="Bounce animation" onclick={() => (visible16 = true)} />
<FullKeyboard bind:visible={visible16} popup={{ duration: 1000, easeType: 'bounceOut' }} />

<Cell title="Done Button Inject Class" onclick={() => (visible17 = true)} />
<FullKeyboard bind:visible={visible17} doneClass="stdf-demo-gradient-action" />

<Cell title="Panel & Key Inject Class" onclick={() => (visible18 = true)} />
<FullKeyboard
	bind:visible={visible18}
	panelClass="stdf-demo-gradient-primary"
	keyClass="!bg-transparent border border-white/40 !text-white"
/>

<Cell title="Listen Click Event" onclick={() => (visible11 = true)} />
<FullKeyboard bind:visible={visible11} onclick={clickFunc} />
<Toast bind:visible={visibleToast} duration={500} message={`Clicked ${key}`}></Toast>

<div class="px-4 py-2">Without Popup</div>
<div class="px-4 pb-2">
	<Slider bind:value={radiusIndex} maxRange={7} step={1} showSteps stepsStyle="break" stepLabels={radiusValues} />
</div>
<FullKeyboard popup={null} radius={currentRadius} />
