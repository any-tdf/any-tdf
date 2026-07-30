<!-- Accordion Demo -->
<script lang="ts">
	import { Accordion, Slider } from 'stdf';
	import type { AccordionItemProps, AccordionProps } from 'stdf/types';

	// 基础数据
	const basicItems: AccordionItemProps[] = [
		{ title: '什么是 STDF？', content: 'STDF 是一个基于 Svelte 和 Tailwind CSS 的移动端 UI 组件库，提供丰富的组件和主题定制能力。' },
		{ title: '如何安装？', content: '你可以通过 bun create any-tdf@latest my-app -f svelte 快速创建项目，或者手动安装 stdf 包到现有项目中。' },
		{ title: '支持哪些框架？', content: 'STDF 基于 Svelte 5 开发，可以在 SvelteKit、Vite + Svelte 等项目中使用。' }
	];

	// 带图标的数据
	const iconItems: AccordionItemProps[] = [
		{ title: '基础组件', content: '包含 Button、Icon、Mask、Popup 等基础组件。', icon: { name: 'ri-apps-2-line', size: 18 } },
		{ title: '表单组件', content: '包含 Input、Picker、Calendar、Switch 等表单组件。', icon: { name: 'ri-edit-line', size: 18 } },
		{ title: '反馈组件', content: '包含 Toast、Modal、Dialog、Loading 等反馈组件。', icon: { name: 'ri-discuss-line', size: 18 } }
	];

	// 带禁用项的数据
	const disabledItems: AccordionItemProps[] = [
		{ title: '可用项 1', content: '这是一个可用的手风琴项。' },
		{ title: '禁用项', content: '这个内容不会显示。', disabled: true },
		{ title: '可用项 2', content: '这是另一个可用的手风琴项。' }
	];

	// 圆角配置
	const radiusOptions: AccordionProps['radius'][] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
	const radiusLabels = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
	let radiusIndex = $state(2);
	let currentRadius: AccordionProps['radius'] = $derived(radiusOptions[radiusIndex]);

	// 状态
	let activeIndex1 = $state<number | undefined>(0);
	let activeIndex2 = $state<number[]>([0, 1]);
</script>

<div class="flex flex-col gap-8 px-2 py-4">
	<div>
		<div class="mb-4 font-bold">基础用法</div>
		<Accordion items={basicItems} bind:activeIndex={activeIndex1} />
	</div>

	<div>
		<div class="mb-4 font-bold">多项展开</div>
		<Accordion items={basicItems} multiple bind:activeIndex={activeIndex2} />
	</div>

	<div>
		<div class="mb-4 font-bold">默认展开第二项</div>
		<Accordion items={basicItems} activeIndex={1} />
	</div>

	<div>
		<div class="mb-4 font-bold">禁用某项</div>
		<Accordion items={disabledItems} />
	</div>

	<div>
		<div class="mb-4 font-bold">不同圆角</div>
		<div class="mb-4">
			<Slider
				value={radiusIndex}
				minRange={0}
				maxRange={7}
				step={1}
				showSteps
				stepLabels={radiusLabels}
				onchange={(v) => (radiusIndex = v)}
			/>
		</div>
		<Accordion items={basicItems} radius={currentRadius} />
	</div>

	<div>
		<div class="mb-4 font-bold">不同边框</div>
		<div class="flex flex-col gap-4">
			<Accordion items={basicItems.slice(0, 2)} border="solid" />
			<Accordion items={basicItems.slice(0, 2)} border="dashed" />
			<Accordion items={basicItems.slice(0, 2)} border="dotted" />
			<Accordion items={basicItems.slice(0, 2)} border="none" />
		</div>
	</div>

	<div>
		<div class="mb-4 font-bold">隐藏分割线</div>
		<Accordion items={basicItems} divider={false} />
	</div>

	<div>
		<div class="mb-4 font-bold">不同展开图标</div>
		<div class="flex flex-col gap-4">
			<Accordion items={basicItems.slice(0, 2)} expandIcon="arrow" />
			<Accordion items={basicItems.slice(0, 2)} expandIcon="plus" />
			<Accordion items={basicItems.slice(0, 2)} expandIcon={null} />
		</div>
	</div>

	<div>
		<div class="mb-4 font-bold">图标位置</div>
		<div class="flex flex-col gap-4">
			<Accordion items={basicItems.slice(0, 2)} iconPosition="right" />
			<Accordion items={basicItems.slice(0, 2)} iconPosition="left" />
		</div>
	</div>

	<div>
		<div class="mb-4 font-bold">带标题图标</div>
		<Accordion items={iconItems} />
	</div>

	<div>
		<div class="mb-4 font-bold">自定义内容</div>
		<Accordion items={basicItems}>
			{#snippet children(item, index)}
				<div class="rounded-md bg-black/5 p-3 dark:bg-white/5">
					<div class="mb-2 text-xs text-black/50 dark:text-white/50">问题 {index + 1}</div>
					<div>{item.content}</div>
				</div>
			{/snippet}
		</Accordion>
	</div>
</div>
