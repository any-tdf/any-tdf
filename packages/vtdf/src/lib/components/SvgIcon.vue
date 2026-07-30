<script setup lang="ts">
import type { SvgData } from '@any-tdf/common/svg';
import { getSvgRenderableNodes, resolveBuiltInSvgFromData, resolveSvgNodeKey, resolveSvgRootAttrs } from '@any-tdf/common/svg';
import { computed } from 'vue';
import { useConfig } from './adapter/config';

const props = withDefaults(
	defineProps<{
		svg: SvgData;
		width?: string | number;
		height?: string | number;
		className?: string;
		fill?: string;
		stroke?: string;
		strokeWidth?: string | number;
		ariaHidden?: boolean;
	}>(),
	{
		width: '1em',
		height: '1em',
		className: '',
		ariaHidden: true
	}
);

// SVG 数据来自 common，事件和可访问性语义仍由具体组件决定。
// SVG data comes from common while events and accessibility semantics stay in each component.
const config = useConfig();
const resolvedSvg = computed(() => resolveBuiltInSvgFromData(props.svg, config.builtInIconLibrary));
const nodes = computed(() => getSvgRenderableNodes(resolvedSvg.value));
const rootAttrs = computed(() =>
	resolveSvgRootAttrs({
		svg: resolvedSvg.value,
		fill: props.fill,
		stroke: props.stroke,
		strokeWidth: props.strokeWidth
	})
);
</script>

<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		:viewBox="rootAttrs.viewBox"
		:class="className"
		:fill="rootAttrs.fill"
		:stroke="rootAttrs.stroke"
		:stroke-width="rootAttrs.strokeWidth"
		:aria-hidden="ariaHidden"
	>
		<template v-for="(node, index) in nodes" :key="resolveSvgNodeKey(node, index)">
			<path
				v-if="node.type === 'path'"
				:d="node.d"
				:class="node.className"
				:fill="node.fill"
				:stroke="node.stroke"
				:stroke-width="node.strokeWidth"
				:stroke-linecap="node.strokeLinecap"
				:stroke-linejoin="node.strokeLinejoin"
				:stroke-dasharray="node.strokeDasharray"
				:stroke-dashoffset="node.strokeDashoffset"
				:pathLength="node.pathLength"
				:fill-rule="node.fillRule"
				:clip-rule="node.clipRule"
				:opacity="node.opacity"
			/>
			<circle
				v-else-if="node.type === 'circle'"
				:cx="node.cx"
				:cy="node.cy"
				:r="node.r"
				:class="node.className"
				:fill="node.fill"
				:stroke="node.stroke"
				:stroke-width="node.strokeWidth"
				:stroke-dasharray="node.strokeDasharray"
				:stroke-dashoffset="node.strokeDashoffset"
				:pathLength="node.pathLength"
				:opacity="node.opacity"
			/>
			<rect
				v-else-if="node.type === 'rect'"
				:x="node.x"
				:y="node.y"
				:width="node.width"
				:height="node.height"
				:rx="node.rx"
				:ry="node.ry"
				:class="node.className"
				:fill="node.fill"
				:stroke="node.stroke"
				:stroke-width="node.strokeWidth"
				:stroke-dasharray="node.strokeDasharray"
				:stroke-dashoffset="node.strokeDashoffset"
				:pathLength="node.pathLength"
				:opacity="node.opacity"
			/>
			<line
				v-else-if="node.type === 'line'"
				:x1="node.x1"
				:y1="node.y1"
				:x2="node.x2"
				:y2="node.y2"
				:class="node.className"
				:stroke="node.stroke"
				:stroke-width="node.strokeWidth"
				:stroke-linecap="node.strokeLinecap"
				:opacity="node.opacity"
			/>
			<polyline
				v-else-if="node.type === 'polyline'"
				:points="node.points"
				:class="node.className"
				:fill="node.fill"
				:stroke="node.stroke"
				:stroke-width="node.strokeWidth"
				:stroke-linecap="node.strokeLinecap"
				:stroke-linejoin="node.strokeLinejoin"
				:opacity="node.opacity"
			/>
			<polygon
				v-else-if="node.type === 'polygon'"
				:points="node.points"
				:class="node.className"
				:fill="node.fill"
				:stroke="node.stroke"
				:stroke-width="node.strokeWidth"
				:stroke-linejoin="node.strokeLinejoin"
				:opacity="node.opacity"
			/>
		</template>
	</svg>
</template>
