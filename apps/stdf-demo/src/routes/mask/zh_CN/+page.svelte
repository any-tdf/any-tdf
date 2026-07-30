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
	<Cell title="基础用法" onclick={() => (visible1 = true)} />
	<Mask visible={visible1} onclickMask={() => (visible1 = false)} />

	<Cell title="透明度为 0.1" onclick={() => (visible2 = true)} />
	<Mask visible={visible2} opacity="0.1" onclickMask={() => (visible2 = false)} />

	<Cell title="透明度为 0.8" onclick={() => (visible3 = true)} />
	<Mask visible={visible3} opacity="0.8" onclickMask={() => (visible3 = false)} />

	<Cell title="点击穿透" detail="请手动关闭" onclick={() => (visible4 = true)} />
	<Mask visible={visible4} clickable />
	<div class="flex">
		<div class="flex-1"><Button onclick={() => (isClick = !isClick)}>{isClick ? '已经点到我了' : '测试点击穿透'}</Button></div>
		<div class="flex-1"><Button onclick={() => (visible4 = false)}>手动关闭</Button></div>
	</div>

	<Cell title="反色遮罩" onclick={() => (visible5 = true)} />
	<Mask visible={visible5} inverse onclickMask={() => (visible5 = false)} />

	<Cell title="模糊遮罩" onclick={() => (visible6 = true)} />
	<Mask visible={visible6} backdropBlur="xs" opacity="0" onclickMask={() => (visible6 = false)} />

	<Cell title="加大模糊度" onclick={() => (visible7 = true)} />
	<Mask visible={visible7} backdropBlur="xl" opacity="0" onclickMask={() => (visible7 = false)} />

	<Cell title="增加出现动画时长" onclick={() => (visible8 = true)} />
	<Mask visible={visible8} duration={1000} onclickMask={() => (visible8 = false)} />

	<Cell title="增加消失动画时长" onclick={() => (visible9 = true)} />
	<Mask visible={visible9} outDuration={1000} onclickMask={() => (visible9 = false)} />

	<Cell title="Toast 中使用" onclick={() => (visible10 = true)} />
	<Toast bind:visible={visible10} message="透明度为 0" />

	<Cell title="Popup 中使用" onclick={() => (visible11 = true)} />
	<Popup bind:visible={visible11} />
</div>
