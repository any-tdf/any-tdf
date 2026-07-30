<!-- ButtonGroup Demo -->
<script lang="ts">
	import { ButtonGroup, Icon, Toast, Slider } from 'stdf';
	import type { ButtonGroupItemProps, ButtonGroupProps } from 'stdf/types';

	let visible = $state(false);

	// 圆角配置
	const radiusOptions: ButtonGroupProps['radius'][] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	const radiusLabels = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
	let radiusIndex = $state(2); // 默认 sm
	let currentRadius: ButtonGroupProps['radius'] = $derived(radiusOptions[radiusIndex]);

	// 基础按钮组数据
	const basicItems: ButtonGroupItemProps[] = [
		{ text: '应用', icon: { name: 'ri-apps-2-line', size: 18 } },
		{ text: '收藏', icon: { name: 'ri-star-line', size: 18 } },
		{ text: '分享', icon: { name: 'ri-share-forward-line', size: 18 }, onclick: () => (visible = true) }
	];

	// 仅文本
	const textOnlyItems: ButtonGroupItemProps[] = [
		{ text: '取消' },
		{ text: '确定', onclick: () => (visible = true) }
	];

	// 仅图标
	const iconOnlyItems: ButtonGroupItemProps[] = [
		{ icon: { name: 'ri-thumb-up-line', size: 20 } },
		{ icon: { name: 'ri-thumb-down-line', size: 20 } },
		{ icon: { name: 'ri-heart-line', size: 20 } }
	];

	// 带禁用
	const disabledItems: ButtonGroupItemProps[] = [
		{ text: '可用' },
		{ text: '禁用', disabled: true },
		{ text: '可用' }
	];

	// 左文字+图标，右仅图标
	const textIconAndIconItems: ButtonGroupItemProps[] = [
		{ text: '搜索', icon: { name: 'ri-search-line', size: 18 } },
		{ icon: { name: 'ri-filter-line', size: 20 } }
	];

	// 左仅图标，右文字+图标
	const iconAndTextIconItems: ButtonGroupItemProps[] = [
		{ icon: { name: 'ri-arrow-left-line', size: 20 } },
		{ text: '下一步', icon: { name: 'ri-arrow-right-line', size: 18 }, iconPosition: 'right' }
	];

	// 图标在文字左右不同位置
	const iconPositionItems: ButtonGroupItemProps[] = [
		{ text: '上一页', icon: { name: 'ri-arrow-left-s-line', size: 18 } },
		{ text: '下一页', icon: { name: 'ri-arrow-right-s-line', size: 18 }, iconPosition: 'right' }
	];

	// 复杂组合
	const complexItems: ButtonGroupItemProps[] = [
		{ icon: { name: 'ri-skip-back-line', size: 18 } },
		{ text: '播放', icon: { name: 'ri-play-line', size: 18 } },
		{ icon: { name: 'ri-skip-forward-line', size: 18 } }
	];
</script>

<div class="flex flex-col space-y-8 py-8">
	<div>
		<div class="p-4 font-bold">fill 与 state 结合</div>
		<ButtonGroup items={basicItems} />
		<ButtonGroup items={basicItems} state="success" />
		<ButtonGroup items={basicItems} state="warning" />
		<ButtonGroup items={basicItems} state="error" />
		<ButtonGroup items={basicItems} state="info" />
		<ButtonGroup items={basicItems} fill="line" />
		<ButtonGroup items={basicItems} fill="lineLight" />
		<ButtonGroup items={basicItems} fill="lineState" />
		<ButtonGroup items={basicItems} fill="lineState" state="success" />
		<ButtonGroup items={basicItems} fill="lineState" state="warning" />
		<ButtonGroup items={basicItems} fill="lineState" state="error" />
		<ButtonGroup items={basicItems} fill="lineState" state="info" />
		<ButtonGroup items={basicItems} fill="text" />
		<ButtonGroup items={basicItems} fill="textState" />
		<ButtonGroup items={basicItems} fill="textState" state="success" />
		<ButtonGroup items={basicItems} fill="textState" state="warning" />
		<ButtonGroup items={basicItems} fill="textState" state="error" />
		<ButtonGroup items={basicItems} fill="textState" state="info" />
		<ButtonGroup items={basicItems} fill="colorLight" />
		<ButtonGroup items={basicItems} fill="colorLight" state="theme" />
		<ButtonGroup items={basicItems} fill="colorLight" state="success" />
		<ButtonGroup items={basicItems} fill="colorLight" state="warning" />
		<ButtonGroup items={basicItems} fill="colorLight" state="error" />
		<ButtonGroup items={basicItems} fill="colorLight" state="info" />
	</div>
	<div>
		<div class="p-4 font-bold">两个按钮组合</div>
		<ButtonGroup items={textOnlyItems} />
		<ButtonGroup items={textIconAndIconItems} fill="lineState" />
		<ButtonGroup items={iconAndTextIconItems} fill="colorLight" />
		<ButtonGroup items={iconPositionItems} fill="lineState" />
	</div>
	<div>
		<div class="p-4 font-bold">图标位置</div>
		<ButtonGroup items={iconPositionItems} />
		<ButtonGroup items={iconPositionItems} fill="lineState" />
		<ButtonGroup items={iconPositionItems} fill="colorLight" />
	</div>
	<div>
		<div class="p-4 font-bold">复杂组合</div>
		<div class="flex flex-col items-center gap-2">
			<ButtonGroup items={complexItems} size="md" />
			<ButtonGroup items={complexItems} fill="lineState" size="md" />
			<ButtonGroup items={complexItems} fill="colorLight" size="md" />
		</div>
	</div>
	<div>
		<div class="p-4 font-bold">不同圆角风格</div>
		<div class="px-4 pb-4">
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
		<ButtonGroup items={textOnlyItems} radius={currentRadius} />
		<ButtonGroup items={textOnlyItems} radius={currentRadius} fill="lineState" />
		<ButtonGroup items={textOnlyItems} radius={currentRadius} fill="colorLight" />
	</div>
	<div>
		<div class="p-4 font-bold">不同尺寸</div>
		<ButtonGroup items={basicItems} size="full" />
		<ButtonGroup items={basicItems} size="big" />
		<ButtonGroup items={basicItems} size="md" />
		<ButtonGroup items={basicItems} size="auto" />
	</div>
	<div>
		<div class="p-4 font-bold">不同高度</div>
		<ButtonGroup items={textOnlyItems} heightIn="0" />
		<ButtonGroup items={textOnlyItems} heightIn="1" />
		<ButtonGroup items={textOnlyItems} heightIn="2" />
		<ButtonGroup items={textOnlyItems} heightIn="3" />
		<ButtonGroup items={textOnlyItems} heightIn="4" />
		<ButtonGroup items={textOnlyItems} fill="lineState" heightOut="0" />
		<ButtonGroup items={textOnlyItems} fill="lineState" heightOut="4" />
	</div>
	<div>
		<div class="p-4 font-bold">分割线高度</div>
		<ButtonGroup items={basicItems} fill="lineState" dividerHeight="full" />
		<ButtonGroup items={basicItems} fill="lineState" dividerHeight="mid" />
		<ButtonGroup items={basicItems} fill="lineState" dividerHeight="short" />
	</div>
	<div>
		<div class="p-4 font-bold">边框风格</div>
		<ButtonGroup items={basicItems} fill="lineState" border="solid" />
		<ButtonGroup items={basicItems} fill="lineState" border="dashed" />
		<ButtonGroup items={basicItems} fill="lineState" border="dotted" />
	</div>
	<div>
		<div class="p-4 font-bold">仅文本</div>
		<ButtonGroup items={textOnlyItems} />
		<ButtonGroup items={textOnlyItems} fill="lineState" />
	</div>
	<div>
		<div class="p-4 font-bold">仅图标</div>
		<ButtonGroup items={iconOnlyItems} size="sm" />
		<ButtonGroup items={iconOnlyItems} fill="lineState" size="sm" />
	</div>
	<div>
		<div class="p-4 font-bold">禁用某个按钮</div>
		<ButtonGroup items={disabledItems} />
		<ButtonGroup items={disabledItems} fill="lineState" />
	</div>
	<div>
		<div class="p-4 font-bold">children 自定义模式</div>
		<ButtonGroup fill="lineState" heightIn="0">
			<button class="border-primary dark:border-dark flex-1 border-r py-2 active:opacity-80">
				<Icon name="ri-apps-2-line" size={18} />
				应用
			</button>
			<button class="border-primary dark:border-dark flex-1 border-r py-2 active:opacity-80">
				<Icon name="ri-star-line" size={18} />
				收藏
			</button>
			<button class="flex-1 py-2 active:opacity-80" onclick={() => (visible = true)}>
				<Icon name="ri-share-forward-line" size={18} />
				分享
			</button>
		</ButtonGroup>
	</div>
</div>
<Toast bind:visible message="点击了按钮！" />
