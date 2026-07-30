<script setup lang="ts">
import { computed } from 'vue';
import { Confetti } from '@any-tdf/vue-confetti';
import FullscreenConfetti from './FullscreenConfetti.vue';
import { colors } from '../data';

defineProps<{
	kind: string;
}>();

const randomColor = computed(() => [`hsl(${Math.floor(Math.random() * 360)}, 75%, 50%)`]);
</script>

<template>
	<Confetti v-if="kind === 'default'" />
	<Confetti v-else-if="kind === 'lots'" :amount="200" />
	<Confetti v-else-if="kind === 'few'" :amount="10" />
	<Confetti v-else-if="kind === 'large'" :size="20" />
	<Confetti v-else-if="kind === 'rounded'" rounded :size="15" />
	<Confetti v-else-if="kind === 'colored'" :color-array="colors.primary" />
	<Confetti v-else-if="kind === 'multiColored'" :color-array="colors.multi" />
	<Confetti v-else-if="kind === 'images'" :size="20" :color-array="colors.image" />
	<Confetti v-else-if="kind === 'gradient'" :size="20" :color-array="colors.gradient" />
	<template v-else-if="kind === 'flag'">
		<Confetti :y="[1.25, 1.5]" :x="[-1, 1]" :color-array="[colors.flag[0]]" />
		<Confetti :y="[1, 1.25]" :x="[-1, 1]" :color-array="[colors.flag[1]]" />
		<Confetti :y="[0.75, 1]" :x="[-1, 1]" :color-array="[colors.flag[2]]" />
	</template>
	<Confetti v-else-if="kind === 'vertical'" :y="[1, 2]" :x="[-0.25, 0.25]" />
	<Confetti v-else-if="kind === 'horizontal'" :y="[0.25, 0.5]" :x="[-4, 4]" />
	<Confetti v-else-if="kind === 'cone'" cone />
	<Confetti v-else-if="kind === 'allAround'" :y="[-0.5, 0.5]" :x="[-0.5, 0.5]" />
	<Confetti v-else-if="kind === 'explosion'" :y="[-1, 1]" :x="[-1, 1]" no-gravity :duration="750" />
	<Confetti
		v-else-if="kind === 'sparkles'"
		:y="[-0.5, 0.5]"
		:x="[-0.5, 0.5]"
		:color-range="colors.sparkles"
		:amount="20"
		fall-distance="0px"
		:duration="3000"
		:size="4"
	/>
	<Confetti v-else-if="kind === 'spray'" :delay="[0, 750]" />
	<template v-else-if="kind === 'feathered'">
		<Confetti cone :x="[-0.5, 0.5]" />
		<Confetti cone :amount="10" :x="[-1, -0.4]" :y="[0.25, 0.75]" />
		<Confetti cone :amount="10" :x="[0.4, 1]" :y="[0.25, 0.75]" />
	</template>
	<Confetti v-else-if="kind === 'constant'" infinite :amount="20" :delay="[0, 500]" />
	<Confetti v-else-if="kind === 'left'" :x="[-1, -0.25]" :y="[0, 0.5]" />
	<Confetti v-else-if="kind === 'right'" :x="[0.25, 1]" :y="[0, 0.5]" />
	<Confetti v-else-if="kind === 'up'" :x="[-0.25, 0.25]" :y="[0.75, 1.5]" />
	<Confetti v-else-if="kind === 'down'" :x="[-0.25, 0.25]" :y="[-0.75, -0.25]" />
	<Confetti v-else-if="kind === 'defaultAmount'" :amount="50" />
	<Confetti v-else-if="kind === 'tooMany'" :amount="500" />
	<Confetti v-else-if="kind === 'coneLots'" cone :amount="200" />
	<Confetti v-else-if="kind === 'rightCone'" cone :x="[1, 2.5]" :y="[0.25, 0.75]" />
	<Confetti v-else-if="kind === 'tiny'" :size="2" />
	<Confetti v-else-if="kind === 'huge'" :size="30" />
	<Confetti v-else-if="kind === 'round'" rounded :size="30" />
	<Confetti v-else-if="kind === 'shortDelay'" :delay="[0, 250]" />
	<Confetti v-else-if="kind === 'longDelay'" :delay="[0, 1500]" />
	<Confetti v-else-if="kind === 'infinite'" infinite />
	<Confetti v-else-if="kind === 'longDelayInfinite'" infinite :delay="[0, 1500]" />
	<Confetti v-else-if="kind === 'iterationInfinite'" iteration-count="infinite" />
	<Confetti v-else-if="kind === 'greenRange'" :color-range="[75, 175]" />
	<Confetti v-else-if="kind === 'colorArray'" :color-array="colors.fiveColorArray" />
	<Confetti v-else-if="kind === 'differentValues'" :color-array="colors.differentValues" />
	<Confetti v-else-if="kind === 'docsGradient'" :size="20" :color-array="colors.docsGradient" />
	<Confetti v-else-if="kind === 'randomColor'" :color-array="randomColor" />
	<Confetti v-else-if="kind === 'slowFall'" fall-distance="50px" />
	<Confetti v-else-if="kind === 'fastFall'" fall-distance="200px" />
	<Confetti v-else-if="kind === 'noFall'" fall-distance="0px" />
	<Confetti v-else-if="kind === 'noGravity'" no-gravity :duration="500" />
	<Confetti v-else-if="kind === 'noGravityExplosion'" no-gravity :duration="500" :x="[-0.5, 0.5]" :y="[-0.5, 0.5]" />
	<Confetti v-else-if="kind === 'smallSpread'" :x-spread="0.1" />
	<Confetti v-else-if="kind === 'largeSpread'" :x-spread="0.4" />
	<template v-else-if="kind === 'dutch'">
		<Confetti :y="[1.25, 1.5]" :x="[-1, 1]" :color-array="[colors.dutch[0]]" />
		<Confetti :y="[1, 1.25]" :x="[-1, 1]" :color-array="[colors.dutch[1]]" />
		<Confetti :y="[0.75, 1]" :x="[-1, 1]" :color-array="[colors.dutch[2]]" />
	</template>
	<template v-else-if="kind === 'swedish'">
		<Confetti :y="[0.75, 1.5]" :x="[-1, 1]" :color-array="['#3350ec']" :amount="100" />
		<Confetti :y="[1.05, 1.2]" :x="[-1, 1]" :color-array="['#ffcd00']" :amount="50" />
		<Confetti :y="[0.75, 1.5]" :x="[-0.5, -0.25]" :color-array="['#ffcd00']" :amount="20" />
	</template>
	<template v-else-if="kind === 'usa'">
		<Confetti :y="[1.15, 1.5]" :x="[-1, -0.25]" :color-array="['#3350ec']" :amount="100" />
		<Confetti :y="[1.2, 1.45]" :x="[-0.95, -0.3]" :color-array="['white']" :size="5" />
		<Confetti :y="[1.45, 1.5]" :x="[-0.25, 1]" :color-array="['#bf0d3e']" :amount="70" />
		<Confetti :y="[1.4, 1.45]" :x="[-0.25, 1]" :color-array="['white']" :amount="70" />
		<Confetti :y="[1.35, 1.4]" :x="[-0.25, 1]" :color-array="['#bf0d3e']" :amount="70" />
		<Confetti :y="[1.3, 1.35]" :x="[-0.25, 1]" :color-array="['white']" :amount="70" />
		<Confetti :y="[1.25, 1.3]" :x="[-0.25, 1]" :color-array="['#bf0d3e']" :amount="70" />
		<Confetti :y="[1.2, 1.25]" :x="[-0.25, 1]" :color-array="['white']" :amount="70" />
		<Confetti :y="[1.15, 1.2]" :x="[-0.25, 1]" :color-array="['#bf0d3e']" :amount="70" />
		<Confetti :y="[1.1, 1.15]" :x="[-1, 1]" :color-array="['white']" :amount="70" />
		<Confetti :y="[1.05, 1.1]" :x="[-1, 1]" :color-array="['#bf0d3e']" :amount="70" />
		<Confetti :y="[1, 1.05]" :x="[-1, 1]" :color-array="['white']" :amount="70" />
		<Confetti :y="[0.95, 1]" :x="[-1, 1]" :color-array="['#bf0d3e']" :amount="70" />
		<Confetti :y="[0.9, 0.95]" :x="[-1, 1]" :color-array="['white']" :amount="70" />
		<Confetti :y="[0.85, 0.9]" :x="[-1, 1]" :color-array="['#bf0d3e']" :amount="70" />
	</template>
	<Confetti v-else-if="kind === 'notFeathered'" :amount="70" :x="[-0.5, 0.5]" />
	<template v-else-if="kind === 'featheredNoCone'">
		<Confetti :x="[-0.5, 0.5]" />
		<Confetti :amount="10" :x="[-0.75, -0.3]" :y="[0.15, 0.75]" />
		<Confetti :amount="10" :x="[0.3, 0.75]" :y="[0.15, 0.75]" />
	</template>
	<Confetti v-else-if="kind === 'coneAmount'" cone :amount="70" :x="[-0.5, 0.5]" />
	<template v-else-if="kind === 'featheredCone'">
		<Confetti cone :x="[-0.5, 0.5]" />
		<Confetti cone :amount="10" :x="[-0.75, -0.4]" :y="[0.15, 0.75]" />
		<Confetti cone :amount="10" :x="[0.4, 0.75]" :y="[0.15, 0.75]" />
	</template>
	<template v-else-if="kind === 'featheredDelayed'">
		<Confetti :x="[-0.5, 0.5]" :delay="[0, 250]" />
		<Confetti :amount="10" :x="[-0.75, -0.3]" :y="[0.15, 0.75]" :delay="[0, 1000]" />
		<Confetti :amount="10" :x="[0.3, 0.75]" :y="[0.15, 0.75]" :delay="[0, 1000]" />
	</template>
	<template v-else-if="kind === 'animate'">
		<Confetti cone :x="[-1, -0.25]" :color-range="[100, 200]" />
		<Confetti cone :x="[-0.35, 0.35]" :delay="[500, 550]" :color-range="[200, 300]" />
		<Confetti cone :x="[0.25, 1]" :delay="[250, 300]" :color-range="[100, 200]" />
		<Confetti cone :amount="20" :x="[-1, 1]" :y="[0, 1]" :delay="[0, 550]" :color-range="[200, 300]" />
	</template>
	<template v-else-if="kind === 'animateExplosion'">
		<Confetti no-gravity :x="[-1, 1]" :y="[-1, 1]" :delay="[0, 50]" :duration="1000" :color-range="[0, 120]" />
		<Confetti no-gravity :x="[-1, 1]" :y="[-1, 1]" :delay="[550, 550]" :duration="1000" :color-range="[120, 240]" />
		<Confetti no-gravity :x="[-1, 1]" :y="[-1, 1]" :delay="[1000, 1050]" :duration="1000" :color-range="[240, 360]" />
	</template>
	<FullscreenConfetti v-else-if="kind === 'fullscreen'" />
	<Confetti v-else-if="kind === 'customClass'" class-name="my-confetti" class="mover" :style="{ transform: 'translateX(2rem)' }" />
	<Confetti v-else />
</template>
