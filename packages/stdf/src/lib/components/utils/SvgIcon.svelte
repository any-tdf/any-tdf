<script lang="ts">
	import { getContext } from 'svelte';
	import type { BuiltInIconLibrary, SvgData } from '@any-tdf/common/svg';
	import { getSvgRenderableNodes, resolveBuiltInSvgFromData, resolveSvgNodeKey, resolveSvgRootAttrs } from '@any-tdf/common/svg';
	import { builtInIconLibraryContextKey, resolveContextBuiltInIconLibrary } from './builtInSvg.js';

	type SvgIconProps = {
		svg: SvgData;
		width?: string | number;
		height?: string | number;
		class?: string;
		fill?: string;
		stroke?: string;
		strokeWidth?: string | number;
		ariaHidden?: boolean;
	};

	let {
		svg,
		width = '1em',
		height = '1em',
		class: className = '',
		fill,
		stroke,
		strokeWidth,
		ariaHidden = true
	}: SvgIconProps = $props();

	// SVG 数据来自 common，这里只做框架渲染，不承载事件语义。
	// SVG data comes from common; this renderer only renders framework nodes without event semantics.
	const builtInIconLibraryContext = getContext<BuiltInIconLibrary | (() => BuiltInIconLibrary) | undefined>(builtInIconLibraryContextKey);
	const resolvedSvg = $derived(resolveBuiltInSvgFromData(svg, resolveContextBuiltInIconLibrary(builtInIconLibraryContext)));
	const nodes = $derived(getSvgRenderableNodes(resolvedSvg));
	const rootAttrs = $derived(resolveSvgRootAttrs({ svg: resolvedSvg, fill, stroke, strokeWidth }));
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{width}
	{height}
	viewBox={rootAttrs.viewBox}
	class={className}
	fill={rootAttrs.fill}
	stroke={rootAttrs.stroke}
	stroke-width={rootAttrs.strokeWidth}
	aria-hidden={ariaHidden}
>
	{#each nodes as node, index (resolveSvgNodeKey(node, index))}
		{#if node.type === 'path'}
			<path
				d={node.d}
				class={node.className}
				fill={node.fill}
				stroke={node.stroke}
				stroke-width={node.strokeWidth}
				stroke-linecap={node.strokeLinecap}
				stroke-linejoin={node.strokeLinejoin}
				stroke-dasharray={node.strokeDasharray}
				stroke-dashoffset={node.strokeDashoffset}
				pathLength={node.pathLength}
				fill-rule={node.fillRule}
				clip-rule={node.clipRule}
				opacity={node.opacity}
			/>
		{:else if node.type === 'circle'}
			<circle
				cx={node.cx}
				cy={node.cy}
				r={node.r}
				class={node.className}
				fill={node.fill}
				stroke={node.stroke}
				stroke-width={node.strokeWidth}
				stroke-dasharray={node.strokeDasharray}
				stroke-dashoffset={node.strokeDashoffset}
				pathLength={node.pathLength}
				opacity={node.opacity}
			/>
		{:else if node.type === 'rect'}
			<rect
				x={node.x}
				y={node.y}
				width={node.width}
				height={node.height}
				rx={node.rx}
				ry={node.ry}
				class={node.className}
				fill={node.fill}
				stroke={node.stroke}
				stroke-width={node.strokeWidth}
				stroke-dasharray={node.strokeDasharray}
				stroke-dashoffset={node.strokeDashoffset}
				pathLength={node.pathLength}
				opacity={node.opacity}
			/>
		{:else if node.type === 'line'}
			<line
				x1={node.x1}
				y1={node.y1}
				x2={node.x2}
				y2={node.y2}
				class={node.className}
				stroke={node.stroke}
				stroke-width={node.strokeWidth}
				stroke-linecap={node.strokeLinecap}
				opacity={node.opacity}
			/>
		{:else if node.type === 'polyline'}
			<polyline
				points={node.points}
				class={node.className}
				fill={node.fill}
				stroke={node.stroke}
				stroke-width={node.strokeWidth}
				stroke-linecap={node.strokeLinecap}
				stroke-linejoin={node.strokeLinejoin}
				opacity={node.opacity}
			/>
		{:else if node.type === 'polygon'}
			<polygon
				points={node.points}
				class={node.className}
				fill={node.fill}
				stroke={node.stroke}
				stroke-width={node.strokeWidth}
				stroke-linejoin={node.strokeLinejoin}
				opacity={node.opacity}
			/>
		{/if}
	{/each}
</svg>
