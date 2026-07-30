<script setup lang="ts">
import { ref } from 'vue';
import { Icon, Slider } from 'vtdf';

const value = ref(20);
const valueRange = ref<[number, number]>([50, 60]);
const valueBar = ref(70);

const randomArray = (min: number, max: number, length: number) =>
	Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);

const sortArray = (arr: number[], isAsc: boolean) => arr.sort((a, b) => (isAsc ? a - b : b - a));

const barList1 = sortArray(randomArray(2, 60, 20), true);
const barList2 = sortArray(randomArray(2, 60, 20), false);
const barList = [...barList1, ...barList2];
</script>

<template>
	<div class="space-y-6">
		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">基础用法</h2>
			<Slider />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">监听 value</h2>
			<Slider :value="value" @change="(nextValue) => (value = nextValue)" />
			<div class="text-sm text-text-secondary dark:text-text-dark/60">当前值：{{ value }}</div>
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">步长为 5</h2>
			<Slider :step="5" />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">显示档位（block 样式）</h2>
			<Slider :step="10" show-steps />
			<Slider :step="20" show-steps radius="full" />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">显示档位（break 样式）</h2>
			<Slider :step="10" show-steps steps-style="break" />
			<Slider :step="20" show-steps steps-style="break" radius="full" />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">显示档位（区间选择）</h2>
			<Slider :step="10" show-steps is-range :start-value="20" :end-value="70" />
			<Slider :step="20" show-steps steps-style="break" is-range :start-value="20" :end-value="80" radius="full" />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">档位标签</h2>
			<Slider :step="25" show-steps :value="50" :step-labels="['极慢', '慢', '中', '快', '极快']" />
			<Slider :step="20" show-steps steps-style="break" radius="full" :step-labels="['0%', '20%', '40%', '60%', '80%', '100%']" />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">步长为 0.1</h2>
			<Slider :step="0.1" :value="0.2" :min-range="0" :max-range="1" />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">设定可选范围（60-80）</h2>
			<Slider :value="68" :min-range="60" :max-range="80" />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">区间选择</h2>
			<Slider is-range />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">区间设定可选范围（40-80）</h2>
			<Slider
				is-range
				:min-range="40"
				:max-range="80"
				:start-value="valueRange[0]"
				:end-value="valueRange[1]"
				@change="(_, nextRange) => nextRange && (valueRange = nextRange)"
			/>
			<div class="text-sm text-text-secondary dark:text-text-dark/60">当前区间：{{ valueRange[0] }} - {{ valueRange[1] }}</div>
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">不同圆角</h2>
			<Slider radius="full" />
			<Slider radius="none" />
			<Slider is-range radius="full" />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">线框滑块</h2>
			<Slider line-block radius="full" />
			<Slider line-block is-range />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">一直显示 Tip</h2>
			<Slider show-tip="always" />
			<Slider show-tip="always" is-range />
			<Slider show-tip="always" radius="none" />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">不显示 Tip</h2>
			<Slider show-tip="never" />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">组合布局</h2>
			<div class="flex items-center gap-3">
				<Icon icon="ri-volume-mute-line" class="text-text-secondary dark:text-text-dark/60" />
				<div class="grow">
					<Slider />
				</div>
				<Icon icon="ri-volume-up-line" class="text-text-secondary dark:text-text-dark/60" />
			</div>
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">使用插槽</h2>
			<div class="px-6 pt-16">
				<Slider line-block show-tip="never" :value="valueBar" @change="(nextValue) => (valueBar = nextValue)">
					<div class="relative grow items-end">
						<div class="flex items-end justify-between overflow-hidden" style="transform: translateY(-30px)">
							<div
								v-for="(item, index) in barList"
								:key="index"
								:class="['w-1 rounded-full', index / 40 < valueBar / 100 ? 'bg-primary dark:bg-dark' : 'bg-gray-200 dark:bg-gray-500']"
								:style="{ height: `${item}px` }"
							/>
						</div>
					</div>
				</Slider>
			</div>
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">禁用</h2>
			<Slider disabled />
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-medium text-text-secondary dark:text-text-dark/60">只读</h2>
			<Slider readonly />
		</section>
	</div>
</template>
