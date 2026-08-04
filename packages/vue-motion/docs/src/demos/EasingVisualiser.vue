<script setup lang="ts">
import { Activity, Minus, Play, Plus, RotateCcw, Timer, Type as TypeIcon } from 'lucide-vue-next';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { easingFunctions, linear, type EasingFunction } from '@any-tdf/vue-motion/easing';
import { Tween } from '@any-tdf/vue-motion/motion';
import { uiText, type Locale } from '../content';

type EaseType = 'In' | 'Out' | 'InOut';
type EaseName = 'sine' | 'quad' | 'cubic' | 'quart' | 'quint' | 'expo' | 'circ' | 'back' | 'elastic' | 'bounce';
type EaseVariant = {
	fn: EasingFunction;
	shape: number[];
};
type EaseRecord = Record<EaseType, EaseVariant>;

const props = defineProps<{ locale: Locale }>();
const easeNames: EaseName[] = ['sine', 'quad', 'cubic', 'quart', 'quint', 'expo', 'circ', 'back', 'elastic', 'bounce'];
const typeOptions: Array<{ label: string; value: EaseType }> = [
	{ label: 'Ease In', value: 'In' },
	{ label: 'Ease Out', value: 'Out' },
	{ label: 'Ease In Out', value: 'InOut' }
];
const graphTicks = Array.from({ length: 8 }, (_, index) => (index + 1) * 200);
const verticalGridTicks = graphTicks.slice(0, 6);

const createShape = (easing: EasingFunction) => {
	const shape: number[] = [];
	for (let index = 0; index <= 1000; index += 1) shape.push(1000 - easing(index / 1000) * 1000);
	return shape;
};
const createEaseVariant = (name: EaseName, type: EaseType): EaseVariant => {
	const easing = easingFunctions[`${name}${type}` as keyof typeof easingFunctions];
	return { fn: easing, shape: createShape(easing) };
};
const createEaseMap = () =>
	new Map<EaseName, EaseRecord>(
		easeNames.map((name) => [
			name,
			{
				In: createEaseVariant(name, 'In'),
				Out: createEaseVariant(name, 'Out'),
				InOut: createEaseVariant(name, 'InOut')
			}
		])
	);
const shapeToPath = (shape: number[]) => {
	let path = `M0 ${shape[0]}`;
	for (let index = 1; index < shape.length; index += 1) path += ` L${index} ${shape[index]}`;
	return path;
};

const labels = computed(() => uiText[props.locale]);
const easeMap = createEaseMap();
const currentEase = ref<EaseName>('sine');
const currentType = ref<EaseType>('In');
const duration = ref(2000);
const playing = ref(false);
const current = computed(() => easeMap.get(currentEase.value)![currentType.value]);
const shape = ref(current.value.shape);
const time = ref(0);
const value = ref(1000);
const shapeTween = new Tween(shape.value);
const timeTween = new Tween(time.value);
const valueTween = new Tween(value.value);
const path = computed(() => shapeToPath(shape.value));
const unsubscribers = [
	shapeTween.subscribe((next) => (shape.value = next)),
	timeTween.subscribe((next) => (time.value = next)),
	valueTween.subscribe((next) => (value.value = next))
];
let runVersion = 0;

const runAnimations = async (selected: EaseVariant = current.value) => {
	const version = (runVersion += 1);
	playing.value = true;
	await valueTween.set(1000, { duration: 0 });
	await timeTween.set(0, { duration: 0 });
	await shapeTween.set(selected.shape);
	await Promise.all([
		timeTween.set(1000, { duration: duration.value, easing: linear }),
		valueTween.set(0, { duration: duration.value, easing: selected.fn })
	]);
	if (version === runVersion) playing.value = false;
};
const stepDuration = (amount: number) => {
	duration.value = Math.max(0, duration.value + amount);
};
const updateDuration = (event: Event) => {
	duration.value = Math.max(0, Number((event.currentTarget as HTMLInputElement).value));
};
const updateEase = (event: Event) => {
	currentEase.value = (event.currentTarget as HTMLSelectElement).value as EaseName;
};
const updateType = (event: Event) => {
	currentType.value = (event.currentTarget as HTMLSelectElement).value as EaseType;
};

watch(current, (selected) => void runAnimations(selected), { immediate: true });
onBeforeUnmount(() => {
	runVersion += 1;
	for (const unsubscribe of unsubscribers) unsubscribe();
});
</script>

<template>
	<section class="easing-visualiser" :aria-label="labels.easingVisualiser">
		<div class="easing-stage">
			<svg class="easing-svg" viewBox="0 0 1400 1802" role="img" :aria-label="`${currentEase}${currentType} ${labels.curveSuffix}`">
				<g class="easing-grid">
					<rect class="easing-grid-background" x="0" y="0" width="1400" height="1800" />
					<line
						v-for="tick in verticalGridTicks"
						:key="`vertical-${tick}`"
						class="easing-grid-line"
						:x1="tick"
						y1="0"
						:x2="tick"
						y2="1800"
					/>
					<line v-for="tick in graphTicks" :key="`horizontal-${tick}`" class="easing-grid-line" x1="0" :y1="tick" x2="1400" :y2="tick" />
					<line
						class="easing-grid-line easing-grid-line-moving"
						x1="0"
						y1="0"
						x2="0"
						y2="1800"
						:style="{ transform: `translateX(${time + 200}px)` }"
					/>
					<line
						class="easing-grid-line easing-grid-line-moving"
						x1="0"
						y1="400"
						x2="1400"
						y2="400"
						:style="{ transform: `translateY(${value}px)` }"
					/>
					<rect class="easing-plot-frame" x="200" y="400" width="1000" height="1000" />
				</g>
				<g class="easing-graph">
					<path class="easing-path" :d="path" />
					<path
						class="easing-marker"
						d="M0,23.647C0,22.41 27.014,0.407 28.496,0.025C29.978,-0.357 69.188,3.744 70.104,4.744C71.02,5.745 71.02,41.499 70.104,42.5C69.188,43.501 29.978,47.601 28.496,47.219C27.014,46.837 0,24.884 0,23.647Z"
						:style="{ transform: `translate(1060px, ${value - 24}px)` }"
					/>
					<circle class="easing-tracker" :cx="time" :cy="value" r="15" />
				</g>
			</svg>
		</div>

		<aside class="easing-controls" :aria-label="labels.easingControls">
			<div class="easing-control-block">
				<h2 class="icon-heading compact">
					<Activity class="heading-icon" :size="17" :stroke-width="2.1" aria-hidden="true" />
					<span>{{ labels.ease }}</span>
				</h2>
				<div class="easing-button-list desktop-controls">
					<button
						v-for="name in easeNames"
						:key="name"
						:class="{ selected: name === currentEase }"
						type="button"
						@click="currentEase = name"
					>
						{{ name }}
					</button>
				</div>
				<select class="mobile-controls" :value="currentEase" :aria-label="labels.ease" @change="updateEase">
					<option v-for="name in easeNames" :key="name" :value="name">{{ name }}</option>
				</select>
			</div>

			<div class="easing-control-block">
				<h2 class="icon-heading compact">
					<TypeIcon class="heading-icon" :size="17" :stroke-width="2.1" aria-hidden="true" />
					<span>{{ labels.type }}</span>
				</h2>
				<div class="easing-button-list desktop-controls">
					<button
						v-for="option in typeOptions"
						:key="option.value"
						:class="{ selected: option.value === currentType }"
						type="button"
						@click="currentType = option.value"
					>
						{{ option.label }}
					</button>
				</div>
				<select class="mobile-controls" :value="currentType" :aria-label="labels.type" @change="updateType">
					<option v-for="option in typeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
				</select>
			</div>

			<label class="duration-control">
				<span class="icon-heading compact">
					<Timer class="heading-icon" :size="17" :stroke-width="2.1" aria-hidden="true" />
					<span>{{ labels.duration }}</span>
				</span>
				<input min="0" step="100" type="number" :value="duration" @input="updateDuration" />
			</label>

			<div class="duration-buttons" :aria-label="labels.durationShortcuts">
				<button type="button" aria-label="-100 ms" @click="stepDuration(-100)">
					<Minus :size="16" :stroke-width="2.2" aria-hidden="true" />
				</button>
				<button type="button" aria-label="+100 ms" @click="stepDuration(100)">
					<Plus :size="16" :stroke-width="2.2" aria-hidden="true" />
				</button>
			</div>

			<button class="play-button" type="button" @click="runAnimations()">
				<RotateCcw v-if="playing" class="button-icon" :size="17" :stroke-width="2.2" aria-hidden="true" />
				<Play v-else class="button-icon" :size="17" :stroke-width="2.2" aria-hidden="true" />
				<span>{{ playing ? labels.restart : labels.play }}</span>
			</button>
		</aside>
	</section>
</template>
