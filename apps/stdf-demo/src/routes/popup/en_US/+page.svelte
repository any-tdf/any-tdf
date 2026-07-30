<!-- Popup Demo -->
<script lang="ts">
	import { Cell, Popup, Button, Icon, Tab, Slider } from 'stdf';
	import type { TabLabelProps, SvelteEasingProps } from 'stdf/types';
	import Aphorism from '../../components/Aphorism.svelte';

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
	let visible17 = $state(false);
	let visible18 = $state(false);
	let visible19 = $state(false);
	let visible20 = $state(false);

	const easeTypes: SvelteEasingProps[] = ['cubicOut', 'backOut', 'bounceOut', 'elasticOut'];
	const easeLabels: TabLabelProps[] = easeTypes.map((t) => ({ text: t.replace('Out', '') }));
	let easeTypeIndex = $state(0);
	let easeType = $derived(easeTypes[easeTypeIndex]);

	const durationModes = ['enter', 'exit'] as const;
	const durationLabels: TabLabelProps[] = [{ text: 'Enter' }, { text: 'Exit' }];
	let durationModeIndex = $state(0);
	let durationMode = $derived(durationModes[durationModeIndex]);

	let inDuration = $state(450);
	let outDuration = $state(240);
	let durationValue = $derived(durationMode === 'enter' ? inDuration : outDuration);
	const handleDurationChange = (value: number) => {
		if (durationMode === 'enter') {
			inDuration = value;
		} else {
			outDuration = value;
		}
	};
</script>

<div class="py-4">
	<Cell title="Basic usage" onclick={() => (visible1 = true)} />
	<Popup bind:visible={visible1} />

	<Cell title="Top position" onclick={() => (visible2 = true)} />
	<Popup bind:visible={visible2} position="top" />

	<Cell title="Left position" onclick={() => (visible3 = true)} />
	<Popup bind:visible={visible3} position="left" />

	<Cell title="Right side position" onclick={() => (visible4 = true)} />
	<Popup bind:visible={visible4} position="right" />

	<Cell title="Intermediate position" onclick={() => (visible5 = true)} />
	<Popup bind:visible={visible5} position="center" />

	<Cell title="Rounded corners at the top" onclick={() => (visible6 = true)} />
	<Popup bind:visible={visible6} radius="2xl" />

	<Cell title="Have rounded corners and spacing" onclick={() => (visible7 = true)} />
	<Popup bind:visible={visible7} radiusPosition="all" radius="3xl" px="4" py="4" />

	<Cell title="The center is spaced and rounded" onclick={() => (visible10 = true)} />
	<Popup bind:visible={visible10} position="center" radiusPosition="all" radius="xl" px="8" />

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">Easing (easeType: {easeType})</div>
		<Tab labels={easeLabels} active={easeTypeIndex} onclickTab={(v) => (easeTypeIndex = v)} />
	</div>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">
			Duration ({durationMode === 'enter' ? 'Enter' : 'Exit'}: {durationValue} ms)
		</div>
		<Tab labels={durationLabels} active={durationModeIndex} onclickTab={(v) => (durationModeIndex = v)} />
		<div class="mt-3">
			<Slider value={durationValue} minRange={0} maxRange={1000} step={50} onchange={handleDurationChange} />
		</div>
	</div>

	<Cell title="Custom easing and duration" onclick={() => (visible11 = true)} />
	<Popup
		bind:visible={visible11}
		{easeType}
		easeOutType={easeType}
		duration={inDuration}
		outDuration={outDuration}
	/>

	<Cell title="Different size" onclick={() => (visible8 = true)} />
	<Popup bind:visible={visible8} size={80} />

	<Cell title="The left side has different sizes" onclick={() => (visible9 = true)} />
	<Popup bind:visible={visible9} size={80} position="left" />

	<Cell title="The mask is completely transparent and fuzzy" onclick={() => (visible12 = true)} />
	<Popup bind:visible={visible12} position="center" radiusPosition="all" radius="xl" px="8" mask={{ opacity: '0', backdropBlur: 'sm' }} />

	<Cell title="Clicking the mask does not close" onclick={() => (visible13 = true)} />
	<Popup bind:visible={visible13} maskClosable={false}>
		<div class="flex h-full flex-col justify-center">
			<Button onclick={() => (visible13 = false)}>Shut down</Button>
		</div>
	</Popup>

	<Cell title="Size automatic" detail="Depends on internal elements" onclick={() => (visible14 = true)} />
	<Popup bind:visible={visible14} size={0} radiusPosition="all" radius="3xl" px="4" py="4" transitionDistance={353}>
		<div class="w-full text-center">
			<div class="py-6 text-xl font-bold">AirPods Pro connected</div>
			<div class="m-auto w-1/2">
				<img class="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
			</div>
			<div class="text-primary dark:text-dark flex justify-around py-6">
				<div>set</div>
				<div>music</div>
			</div>
		</div>
	</Popup>

	<Cell title="The left position is automatically sized" onclick={() => (visible20 = true)} />
	<Popup bind:visible={visible20} size={0} position="left" py="48" radiusPosition="right" radius="2xl" transitionDistance={80}>
		<div class="text-primary dark:text-dark flex h-full flex-col justify-around">
			<button class="p-6" onclick={() => (visible20 = false)}>Home</button>
			<button class="p-6" onclick={() => (visible20 = false)}>Setting</button>
			<button class="p-6" onclick={() => (visible20 = false)}>About</button>
		</div>
	</Popup>

	<Cell title="Size automatic background transparent" onclick={() => (visible17 = true)} />
	<Popup bind:visible={visible17} position="top" size={0} px="4" py="8" transparent transitionDistance={136}>
		<div class="flex w-full justify-between rounded-full bg-black p-3 text-white">
			<div class="flex">
				<div class="h-12 w-12 overflow-hidden rounded-full">
					<img class="w-full object-cover" src="/assets/images/avatar_1.jpg" alt="" />
				</div>
				<div class="flex flex-col justify-end pl-4">
					<div class="text-xs text-white/40">Mobile phone</div>
					<div>Hu Ge</div>
				</div>
			</div>
			<div class="flex space-x-3">
				<div class="flex h-12 w-12 flex-col items-center justify-center rounded-full stdf-demo-bg-danger" style="transform: rotate(135deg);">
					<Icon name="ri-phone-fill" />
				</div>
				<div class="flex h-12 w-12 flex-col items-center justify-center rounded-full stdf-demo-bg-success">
					<Icon name="ri-phone-fill" />
				</div>
			</div>
		</div>
	</Popup>

	<Cell title="The center position has a transparent background" onclick={() => (visible18 = true)} />
	<Popup bind:visible={visible18} size={0} position="center" transparent>
		<div class="flex flex-col justify-center">
			<div class="m-auto w-1/2">
				<img class="w-full object-cover" src="/assets/images/airpods-pro2.png" alt="" />
			</div>
		</div>
	</Popup>

	<Cell title="Reverse color mask" onclick={() => (visible15 = true)} />
	<Popup bind:visible={visible15} mask={{ inverse: true }} />

	<Cell title="Overflow roll" onclick={() => (visible19 = true)} />
	<Popup bind:visible={visible19} size={30} position="center">
		<Aphorism num={4} />
	</Popup>

</div>

<!-- Aphorism.svelte -->
<!--
<script lang="ts">
	// 引入数据
	// import data
	import { aphorisms } from '@any-tdf/site-common/data';

	/**
	 * @typedef {Object} Props
	 * @property {number} [num] - number of items to display
	 * @property {boolean} [compact] - whether to use compact mode
	 */
	/** @type {Props} */
	let { num = 0, compact = false } = $props();

	// 从 aphorisms 随机取出 num 条数据
	// get num items from aphorisms randomly
	const aphorismsList = aphorisms.sort(() => Math.random() - 0.5).slice(0, num);
</script>

<div class="{compact ? '' : 'px-4 py-8 '}divide-y divide-black/5 dark:divide-white/5">
	{#each aphorismsList as item}
		<div class:py-6={num > 1}>
			<div class="text-sm text-justify">{item.text}</div>
			<div class="text-right mt-1" class:italic={item.fromItalic}>{item.from}</div>
		</div>
	{/each}
</div>
-->
