<!-- Mask Demo -->
<script lang="ts">
	import { Mask, Toast, Cell, Button, Popup } from 'stdf';

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

	let isClick = $state(false);
</script>

<div class="py-4">
	<Cell title="Basic usage" onclick={() => (visible1 = true)} />
	<Mask visible={visible1} onclickMask={() => (visible1 = false)} />

	<Cell title="Transparency is 0.1" onclick={() => (visible2 = true)} />
	<Mask visible={visible2} opacity="0.1" onclickMask={() => (visible2 = false)} />

	<Cell title="Transparency is 0.8" onclick={() => (visible3 = true)} />
	<Mask visible={visible3} opacity="0.8" onclickMask={() => (visible3 = false)} />

	<Cell title="Click through" detail="Please close manually" onclick={() => (visible4 = true)} />
	<Mask visible={visible4} clickable />
	<div class="flex">
		<div class="flex-1"><Button onclick={() => (isClick = !isClick)}>{isClick ? 'Click on me' : 'Click through'}</Button></div>
		<div class="flex-1"><Button onclick={() => (visible4 = false)}>Manual shutdown</Button></div>
	</div>

	<Cell title="Reverse color mask" onclick={() => (visible5 = true)} />
	<Mask visible={visible5} inverse onclickMask={() => (visible5 = false)} />

	<Cell title="Blur mask" onclick={() => (visible6 = true)} />
	<Mask visible={visible6} backdropBlur="xs" opacity="0" onclickMask={() => (visible6 = false)} />

	<Cell title="Increase ambiguity" onclick={() => (visible7 = true)} />
	<Mask visible={visible7} backdropBlur="xl" opacity="0" onclickMask={() => (visible7 = false)} />

	<Cell title="Increased the animation time" onclick={() => (visible8 = true)} />
	<Mask visible={visible8} duration={1000} onclickMask={() => (visible8 = false)} />

	<Cell title="Increased the duration of vanishing animation" onclick={() => (visible9 = true)} />
	<Mask visible={visible9} outDuration={1000} onclickMask={() => (visible9 = false)} />

	<Cell title="Toast Use in" onclick={() => (visible10 = true)} />
	<Toast bind:visible={visible10} message="Transparency is 0" />

	<Cell title="Popup Use in" onclick={() => (visible11 = true)} />
	<Popup bind:visible={visible11} />
</div>
