<script setup lang="ts">
defineProps<{
	construction?: boolean;
}>();

const guideLineClass = 'stroke-gray-400 dark:stroke-gray-600';
const gridLines = Array.from({ length: 9 }, (_, index) => index * 10);
</script>

<template>
	<svg :viewBox="construction ? '0 0 81 81' : '0 0 80 80'" fill="none" aria-hidden="true" focusable="false">
		<g :transform="construction ? 'translate(0 1)' : undefined">
			<path
				class="fill-primary dark:fill-dark"
				d="M40 0C54.8 0 67.7 8 74.6 20H30V30H40A10 10 0 0 1 40 50H30V80H10V20H0V0H40Zm38.7 30A40 40 0 0 1 40 80V60A20 20 0 0 0 57.3 30h21.4Z"
			/>
			<path
				class="tdf-vtdf-logo-check text-dark dark:text-primary"
				data-logo-layer="vtdf-mark"
				data-logo-shape="check"
				d="M11.6447 44.4975L32.858 65.7107L68.2133 30.3553"
				pathLength="1"
			/>
		</g>
		<template v-if="construction">
			<line
				v-for="line in gridLines"
				:key="`h-${line}`"
				:y1="line + 0.9"
				x2="80"
				:y2="line + 0.9"
				:class="guideLineClass"
				stroke-width="0.2"
				stroke-dasharray="2 2"
			/>
			<line
				v-for="line in gridLines"
				:key="`v-${line}`"
				:x1="line + 0.1"
				y1="1"
				:x2="line + 0.1"
				y2="81"
				:class="guideLineClass"
				stroke-width="0.2"
				stroke-dasharray="2 2"
			/>
			<circle cx="40" cy="41" r="39.9" :class="guideLineClass" stroke-width="0.2" stroke-dasharray="2 2" />
			<circle cx="40" cy="41" r="19.9" :class="guideLineClass" stroke-width="0.2" stroke-dasharray="2 2" />
			<circle cx="40" cy="41" r="9.9" :class="guideLineClass" stroke-width="0.2" stroke-dasharray="2 2" />
		</template>
	</svg>
</template>
