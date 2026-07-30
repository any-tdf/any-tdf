<script setup lang="ts">
import { ref } from 'vue';
import { Cell, CellGroup, Toast } from 'vtdf/components';

const visible = ref(false);
</script>

<template>
	<div class="flex flex-col space-y-8 py-8">
		<div>
			<Cell title="Basic Usage" />
			<Cell title="With Detail" detail="Zeroing" />
			<Cell title="Detail with slot">
				<template #detail>
					<span class="text-xs text-primary dark:text-dark">I'm slot content</span>
				</template>
			</Cell>
			<Cell title="No Arrow" :right="null" />
			<Cell title="Display Only" :right="null" :click-all="false" />
			<Cell title="Click Event" detail="Click Me" @click="() => (visible = true)" />
			<Toast v-model:visible="visible" message="You clicked me!" />
			<Cell title="Detail without Arrow" detail="Zeroing" :right="null" />
			<Cell title="Switch (Click Row)" :right="{ type: 'switch' }" />
			<Cell title="Switch with Detail" detail="Description" :right="{ type: 'switch' }" />
			<Cell title="Switch with Text" :right="{ type: 'switch', switch: { inside: ['😭', '😄'] } }" />
			<Cell title="Rounded Switch" :right="{ type: 'switch', switch: { radius: 'full' } }" />
			<Cell title="Switch Only" :click-all="false" :right="{ type: 'switch' }" />
			<Cell title="Left Icon" :left="{ name: 'ri-bank-line', size: 20, state: 'theme' }" />
			<Cell title="Right Icon" :right="{ type: 'icon', icon: { name: 'ri-battery-charge-line', size: 20, state: 'theme' } }" />
			<Cell title="Left Image">
				<template #left>
					<div class="mr-1 shrink-0">
						<img class="h-6 w-6" src="/assets/images/icon_颁奖.png" alt="" />
					</div>
				</template>
			</Cell>
			<Cell title="Both Side Images">
				<template #left>
					<div class="mr-1 shrink-0">
						<img class="h-6 w-6" src="/assets/images/icon_评价.png" alt="" />
					</div>
				</template>
				<template #right>
					<div class="mr-1 shrink-0">
						<img class="h-6 w-6" src="/assets/images/icon_美食.png" alt="" />
					</div>
				</template>
			</Cell>
			<Cell title="Larger Image">
				<template #left>
					<div class="mr-1 shrink-0">
						<img class="h-10 w-10" src="/assets/images/icon_会员.png" alt="" />
					</div>
				</template>
			</Cell>
			<Cell title="With Subtitle" sub-title="I'm subtitle" />
			<Cell title="Subtitle and Detail" sub-title="I'm subtitle" detail="Zeroing" />
			<Cell title="Secondary Info" detail="Zeroing" info="Reboot" />
			<Cell title="Both Secondary" sub-title="I'm subtitle" detail="Zeroing" info="Reboot" />
			<Cell title="Both Secondary" sub-title="I'm subtitle" detail="With Arrow" info="Reboot" />
			<Cell
				title="Both Secondary"
				sub-title="With Left Icon"
				detail="With Arrow"
				info="Reboot"
				:left="{ name: 'ri-shopping-basket-line', theme: true }"
			/>
			<Cell title="All Features" sub-title="Left Custom Image" detail="Right Arrow" info="No Border">
				<template #left>
					<div class="mr-1 shrink-0">
						<img class="h-10 w-10" src="/assets/images/icon_火车票.png" alt="" />
					</div>
				</template>
			</Cell>
			<Cell
				title="Long title that wraps automatically when it exceeds the width of the container."
				sub-title="Long subtitle that also wraps automatically when it exceeds the width."
			/>
			<Cell
				title="Large image with long title that wraps automatically. Try other combinations yourself."
				sub-title="Short subtitle"
				:line="false"
			>
				<template #left>
					<div class="mr-1 shrink-0">
						<img class="h-20 w-20" src="/assets/images/icon_外卖.png" alt="" />
					</div>
				</template>
			</Cell>
		</div>

		<CellGroup>
			<Cell title="Group Usage" mx="0" my="0" shadow="none" line radius="none" />
			<Cell title="Group Usage" mx="0" my="0" shadow="none" radius="none" />
		</CellGroup>
		<CellGroup mx="0" radius="none">
			<Cell title="Group Usage" detail="No Margin" mx="0" my="0" shadow="none" line radius="none" />
			<Cell title="Group Usage" detail="No Radius" mx="0" my="0" shadow="none" radius="none" />
		</CellGroup>
		<CellGroup shadow="xl" radius="2xl">
			<Cell title="Group Usage" detail="Large Shadow" mx="0" my="0" shadow="none" line radius="none" />
			<Cell title="Group Usage" detail="Large Radius" mx="0" my="0" shadow="none" radius="none" />
		</CellGroup>

		<div>
			<Cell title="No Margin" mx="0" radius="none" />
			<Cell title="No Radius" radius="none" />
			<Cell title="Base Radius" radius="sm" />
			<Cell title="Medium Radius" radius="md" />
			<Cell title="Large Radius" radius="lg" />
			<Cell title="XL Radius" radius="xl" />
			<Cell title="2XL Radius" radius="2xl" />
			<Cell title="Full Radius" radius="4xl" />
			<Cell title="Large Shadow" shadow="lg" />
		</div>
		<div>
			<Cell title="Custom Text Color" inj-class="text-primary dark:text-dark" />
			<Cell title="Custom Background" inj-class="!bg-blue/20 active:!bg-purple/10" :line="false" />
		</div>
		<div>
			<Cell love title="Care Version" />
			<Cell love title="Care Version" detail="Care" />
			<Cell love title="Care Version" :left="{ name: 'ri-hand-heart-line', theme: true }" />
		</div>
	</div>
</template>
