<!-- NumKeyboard Demo -->
<script lang="ts">
	import { NumKeyboard, Cell, Toast, Slider } from 'stdf';
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
	let visible21 = $state(false);
	let visible22 = $state(false);

	// Demo for click event listening
	let visibleToast = $state(false);
	let key = $state('');
	const clickFunc = (k: string) => {
		key = k;
		visibleToast = true;
	};

	// Demo for open and close event listening
	let loveDom: HTMLElement | null = $state(null);
	// Distance from loveDom to window bottom
	let loveDomBottom = 0;
	let value = $state('');
	let top = $state(0);
	const openFunc = (height: number) => {
		// If loveDom is less than keyboard height from window bottom, move loveDom up by keyboard height
		loveDomBottom = window.innerHeight - (loveDom?.getBoundingClientRect().bottom || 0);
		top = loveDomBottom < height ? -(height - loveDomBottom) - 50 : 0;
	};

	let value21 = $state('');
	// Demo for getting content
	let valueClear = $state('');
</script>

<Cell title="Basic Usage" onclick={() => (visible1 = true)} />
<NumKeyboard bind:visible={visible1} />

<div class="px-4">Content: {value21}</div>
<Cell title="Get Content" onclick={() => (visible21 = true)} />
<NumKeyboard bind:visible={visible21} bind:value={value21} />

<div class="px-4">Content: {valueClear}</div>
<Cell title="Clear Content When Open" onclick={() => (visible20 = true)} />
<NumKeyboard bind:visible={visible20} bind:value={valueClear} clear />

<Cell title="Hide Done Button" onclick={() => (visible2 = true)} />
<NumKeyboard bind:visible={visible2} done={false} />

<Cell title="Show Close Button" onclick={() => (visible3 = true)} />
<NumKeyboard bind:visible={visible3} close />

<Cell title="Show Close & Hide Done" subTitle="Must hide decimal point" onclick={() => (visible9 = true)} />
<NumKeyboard bind:visible={visible9} close dot={false} done={false} />

<Cell title="Reverse Number Order" onclick={() => (visible4 = true)} />
<NumKeyboard bind:visible={visible4} reverse />

<Cell title="Increase Key Height" onclick={() => (visible5 = true)} />
<NumKeyboard bind:visible={visible5} height="16" />

<Cell title="Increase Spacing" onclick={() => (visible6 = true)} />
<NumKeyboard bind:visible={visible6} space="4" p="4" />

<Cell title="Hide Decimal Point" onclick={() => (visible7 = true)} />
<NumKeyboard bind:visible={visible7} close dot={false} />

<Cell title="Hide All Optional Elements" onclick={() => (visible8 = true)} />
<NumKeyboard bind:visible={visible8} done={false} dot={false} />

<Cell title="Block Style" onclick={() => (visible10 = true)} />
<NumKeyboard bind:visible={visible10} type="block" height="14" p="0" />

<Cell title="Custom Done Text" onclick={() => (visible18 = true)} />
<NumKeyboard bind:visible={visible18} doneText="Transfer" />

<Cell title="Click Event Listening" onclick={() => (visible11 = true)} />
<NumKeyboard bind:visible={visible11} onclick={clickFunc} />
<Toast bind:visible={visibleToast} duration={500} message={`Clicked ${key}`}></Toast>

<div
	class="bg-primary dark:bg-dark shadow-primary/30 dark:shadow-dark/30 relative mx-16 h-10 rounded-full text-center text-xl leading-10 text-white shadow-lg transition-all dark:text-black"
	style="top:{top}px"
	bind:this={loveDom}
>
	{value}
	{#if value === '5201314'}
		<span class="absolute left-1/2"><Confetti rounded amount={100} /></span>
	{/if}
</div>
<Cell title="Please Enter 5201314" onclick={() => (visible12 = true)} />
<NumKeyboard bind:visible={visible12} doneDisabled={value !== '5201314'} bind:value onopen={openFunc} onclose={() => (top = 0)} />

<Cell title="Larger Key Border Radius" onclick={() => (visible13 = true)} />
<NumKeyboard bind:visible={visible13} radius="2xl" />

<Cell title="Inject Done Button Class" onclick={() => (visible14 = true)} />
<NumKeyboard bind:visible={visible14} doneClass="stdf-demo-gradient-action" />

<Cell title="Inject Panel & Key Class" onclick={() => (visible15 = true)} />
<NumKeyboard
	bind:visible={visible15}
	panelClass="stdf-demo-gradient-primary"
	keyClass="!bg-transparent border border-white/40 !text-white"
/>

<Cell title="Custom Transition" subTitle="Via popup" onclick={() => (visible16 = true)} />
<NumKeyboard bind:visible={visible16} popup={{ duration: 1000, easeType: 'bounceOut' }} />

<Cell title="Opaque Background When Active" subTitle="Via popup mask" onclick={() => (visible17 = true)} />
<NumKeyboard bind:visible={visible17} popup={{ mask: { opacity: '0.4' } }} />

<Cell title="Custom Key Font" subTitle="Need to load font in CSS and configure in @theme" onclick={() => (visible19 = true)} />
<NumKeyboard bind:visible={visible19} keyClass="font-Trueno" />

<Cell title="Input Preview" subTitle="Show input content at the top of keyboard" onclick={() => (visible22 = true)} />
<NumKeyboard bind:visible={visible22} preview />

<div class="px-4 py-2">Without Popup</div>
<div class="px-4 pb-2">
	<Slider bind:value={radiusIndex} maxRange={7} step={1} showSteps stepsStyle="break" stepLabels={radiusValues} />
</div>
<NumKeyboard popup={null} radius={currentRadius} />
