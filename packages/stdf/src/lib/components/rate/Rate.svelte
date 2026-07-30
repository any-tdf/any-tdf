<script lang="ts">
	import { getContext } from 'svelte';
	import type { RateProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import {
		resolveRateClickAction,
		resolveRateDerived,
		resolveRateStateOptions
	} from '@any-tdf/common/derived/rate';
	import { rateStarSvg } from '@any-tdf/common/svg/common';
	import SvgIcon from '../utils/SvgIcon.svelte';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const rateLang: LangProps['rate'] = currentLang.rate;

	let {
		value = $bindable(4),
		total = 5,
		height = 24,
		width = 24,
		opacity = '0.2',
		space = '3',
		half = false,
		zero = false,
		vertical = false,
		disabled = false,
		readonly = false,
		animation = 'current',
		children,
		onclick
	}: RateProps = $props();

	// 是否缩放
	// whether to scale
	let isScale = $state(false);

	// 点击索引
	// click index
	let clickIndex = $state(0);

	// 公共派生层统一 Rate 的 class、尺寸、象限状态和校验结果，组件层只处理事件和动画计时。
	// Common derivation unifies Rate class, size, quadrant state and validation results; the component layer only handles events and animation timing.
	let rateState = $derived(
		resolveRateDerived(
			resolveRateStateOptions({
				value,
				clickIndex,
				isScale,
				props: { total, half, width, height, space, disabled, animation, vertical, opacity }
			})
		)
	);

	// 对传入数据进行一些报错或警告处理
	// some error or warning processing for the incoming data
	$effect(() => {
		rateState.validationErrors.forEach((errorKey) => {
			console.error(rateLang[errorKey]);
		});
	});

	// 点击事件
	// click event
	const clickFun = (index: number) => {
		const action = resolveRateClickAction({ index, value, half, zero, disabled, readonly });
		if (!action.shouldChange) return;
		isScale = action.isScale;
		clickIndex = action.clickIndex;
		setTimeout(() => {
			isScale = action.resetIsScale;
		}, action.resetScaleDelay);
		value = action.nextValue;
		// 派发事件
		// dispatch event
		onclick?.(value);
	};
</script>

<div class={rateState.rootClass}>
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{#each rateState.items as item (item.index)}
		<button
			class={item.buttonClass}
			style={item.buttonStyleString}
			onclick={() => clickFun(item.index)}
		>
			{#each item.quadrants as quadrantItem (quadrantItem.quadrant)}
				<div
					class={quadrantItem.className}
					style={quadrantItem.styleString}
				>
					<div style={quadrantItem.starStyleString}>
						{#if children}
							{@render children?.()}
						{:else}
							<!-- 公共星形 SVG 数据在 common 中维护，评分事件仍在组件内处理。 / Shared star SVG data lives in common while rating events stay here. -->
							<SvgIcon svg={rateStarSvg} width={height} {height} class={rateState.starSvgClass} />
						{/if}
					</div>
				</div>
			{/each}
		</button>
	{/each}
</div>
