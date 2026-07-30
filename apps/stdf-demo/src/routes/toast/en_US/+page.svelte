<!-- Toast Demo -->
<script lang="ts">
	import { Toast, Cell, Button, Loading, Tab, Slider } from 'stdf';
	import type { TabLabelProps, SvelteEasingProps } from 'stdf/types';

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
	let visible22 = $state(false);
	let visible23 = $state(false);
	let visible24 = $state(false);
	let visible25 = $state(false);
	let visible26 = $state(false);
	let visible27 = $state(false);
	let visible30 = $state(false);
	let visible31 = $state(false);
	let visible32 = $state(false);

	let time = $state(4);
	let timer: ReturnType<typeof setInterval>;
	const useSnippetFun = () => {
		visible25 = true;
		timer = setInterval(() => {
			time--;
			if (time <= 0) {
				clearInterval(timer!);
				visible25 = false;
				time = 3;
			}
		}, 1000);
	};

	// Transition type control
	const transitionTypes = ['scale', 'fly', 'fade', 'blur'] as const;
	const transitionLabels: TabLabelProps[] = transitionTypes.map((t) => ({ text: t }));
	let transitionTypeIndex = $state(0);
	let transitionType = $derived(transitionTypes[transitionTypeIndex]);

	// Easing function control
	const easeTypes: SvelteEasingProps[] = ['cubicOut', 'bounceOut', 'elasticOut', 'backOut'];
	const easeLabels: TabLabelProps[] = easeTypes.map((t) => ({ text: t.replace('Out', '') }));
	let easeTypeIndex = $state(0);
	let easeType = $derived(easeTypes[easeTypeIndex]);

	// Animation duration control
	let inDuration = $state(300);
	let outDuration = $state(300);

	// fly animation params
	let flyY = $state(-100);

	// scale animation params
	let scaleStart = $state(0);

	// blur animation params
	let blurAmount = $state(5);

	// Generate transitionParams based on animation type
	const getTransitionParams = () => {
		const base = { duration: inDuration };
		if (transitionType === 'fly') {
			return { ...base, y: flyY };
		} else if (transitionType === 'scale') {
			return { ...base, start: scaleStart };
		} else if (transitionType === 'blur') {
			return { ...base, amount: blurAmount };
		}
		return base;
	};
</script>

<div class="py-4">
	<Cell title="Basic usage" onclick={() => (visible1 = true)} />
	<Toast bind:visible={visible1} message="Light hint" />

	<Cell title="Long text prompt" onclick={() => (visible2 = true)} />
	<Toast
		bind:visible={visible2}
		message="When the character count is too long, it is generally not recommended to display too much content here!"
	/>

	<Cell title="Do not block clicks" onclick={() => (visible3 = true)} />
	<Toast bind:visible={visible3} clickable message="The content below the mask can also be clicked" />

	<Cell title="Fixed display time" onclick={() => (visible4 = true)} />
	<Toast bind:visible={visible4} duration={6000} message="It turns off automatically after 6 seconds" />

	<Cell title="Non-automatic closing" onclick={() => (visible5 = true)} />
	<Toast
		bind:visible={visible5}
		duration={0}
		clickable
		message="This prompt will not automatically close, please click the button to close"
	/>

	<Cell title="Success message" onclick={() => (visible6 = true)} />
	<Toast bind:visible={visible6} type="success" message="Success message" />

	<Cell title="Failure prompt" onclick={() => (visible7 = true)} />
	<Toast bind:visible={visible7} type="error" message="Failure prompt" />

	<Cell title="Warning prompt" onclick={() => (visible8 = true)} />
	<Toast bind:visible={visible8} type="warning" message="Warning prompt" />

	<Cell title="Information prompt" onclick={() => (visible9 = true)} />
	<Toast bind:visible={visible9} type="info" message="Information prompt" />

	<Cell title="Load prompt" onclick={() => (visible30 = true)} />
	<Toast bind:visible={visible30} type="loading" message="Under load..." />

	<Cell title="Theme color loading prompt" onclick={() => (visible31 = true)} />
	<Toast bind:visible={visible31} type="loading" loading={{ theme: true }} message="Under load..." />

	<Cell title="Loading prompt for # 1_3" onclick={() => (visible32 = true)} />
	<Toast bind:visible={visible32} type="loading" loading={{ type: '1_3' }} message="Under load..." />

	<Cell title="Custom type" onclick={() => (visible27 = true)} />
	<Toast bind:visible={visible27} type="icon" icon={{ name: 'ri-thumb-up-fill' }} message="You are so good!" />

	<Cell title="The mask is opaque" onclick={() => (visible10 = true)} />
	<Toast bind:visible={visible10} mask={{ opacity: '0.3' }} message="Mask transparency is 0.3" />

	<Cell title="Reverse color mask" onclick={() => (visible11 = true)} />
	<Toast bind:visible={visible11} mask={{ inverse: true, opacity: '0.5' }} message="Reverse color mask" />

	<Cell title="Mask blur" onclick={() => (visible12 = true)} />
	<Toast bind:visible={visible12} mask={{ opacity: '0', backdropBlur: 'sm' }} message="The content below the mask is blurry" />

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">Animation Type (transitionType: {transitionType})</div>
		<Tab labels={transitionLabels} active={transitionTypeIndex} onclickTab={(v) => (transitionTypeIndex = v)} />
	</div>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">Easing Function (easeType: {easeType})</div>
		<Tab labels={easeLabels} active={easeTypeIndex} onclickTab={(v) => (easeTypeIndex = v)} />
	</div>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">Enter Animation Duration: {inDuration}ms</div>
		<Slider value={inDuration} minRange={0} maxRange={1000} step={50} onchange={(v) => (inDuration = v)} />
	</div>

	<div class="px-2 py-4">
		<div class="text-sm text-black/50 dark:text-white/50 mb-2">Exit Animation Duration: {outDuration}ms</div>
		<Slider value={outDuration} minRange={0} maxRange={1000} step={50} onchange={(v) => (outDuration = v)} />
	</div>

	{#if transitionType === 'fly'}
		<div class="px-2 py-4">
			<div class="text-sm text-black/50 dark:text-white/50 mb-2">fly Y Offset: {flyY}px</div>
			<Slider value={flyY} minRange={-200} maxRange={200} step={10} onchange={(v) => (flyY = v)} />
		</div>
	{:else if transitionType === 'scale'}
		<div class="px-2 py-4">
			<div class="text-sm text-black/50 dark:text-white/50 mb-2">scale Initial Scale: {scaleStart}</div>
			<Slider value={scaleStart} minRange={0} maxRange={1} step={0.1} onchange={(v) => (scaleStart = v)} />
		</div>
	{:else if transitionType === 'blur'}
		<div class="px-2 py-4">
			<div class="text-sm text-black/50 dark:text-white/50 mb-2">blur Amount: {blurAmount}px</div>
			<Slider value={blurAmount} minRange={0} maxRange={20} step={1} onchange={(v) => (blurAmount = v)} />
		</div>
	{/if}

	<Cell title="Custom Animation Effect" onclick={() => (visible13 = true)} />
	<Toast
		bind:visible={visible13}
		{transitionType}
		transitionParams={getTransitionParams()}
		{outDuration}
		{easeType}
		easeOutType={easeType}
		message="Adjust the controls above to see different animation effects"
	/>

	<Cell title="Top" onclick={() => (visible22 = true)} />
	<Toast bind:visible={visible22} position="top" message="Tips at the top" />

	<Cell title="Bottom" onclick={() => (visible23 = true)} />
	<Toast bind:visible={visible23} position="bottom" message="Tips at the bottom" />

	<Cell title="Top increase distance" onclick={() => (visible24 = true)} />
	<Toast bind:visible={visible24} position="top" py="40" message="The tip is at the top and the distance is increased" />

	<Cell title="Use Snippet" onclick={useSnippetFun} />
	<Toast bind:visible={visible25} duration={0}>
		<div class="flex flex-col space-y-4">
			<div>Customize the prompt content</div>
			<Loading inverse />
			<div>Close in {time} seconds</div>
		</div>
	</Toast>

	<Cell title="Different styles of rounded corners" onclick={() => (visible26 = true)} />
	<Toast bind:visible={visible26} radius="2xl" message="Rounded corners were added" />
</div>

<div class="sticky bottom-0 z-10 flex bg-white/50 backdrop-blur-sm dark:bg-black/50">
	<div class="flex-1">
		<Button fill="lineState" onclick={() => (visible5 = false)}>Manual shutdown</Button>
	</div>
</div>
