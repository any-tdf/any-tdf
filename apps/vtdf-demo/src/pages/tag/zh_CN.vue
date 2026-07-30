<script setup lang="ts">
import { ref } from 'vue';
import { Cell, Tag } from 'vtdf/components';

const tags = ref(['标签一', '标签二', '标签三']);

const handleClose = (index: number) => {
	tags.value = tags.value.filter((_, tagIndex) => tagIndex !== index);
};
</script>

<template>
	<div class="pb-4 pt-1">
		<div class="mx-4 mt-8 text-lg font-bold">基础用法</div>
		<div class="flex flex-wrap gap-2 p-4">
			<Tag text="标签" />
			<Tag text="标签" state="success" />
			<Tag text="标签" state="warning" />
			<Tag text="标签" state="error" />
			<Tag text="标签" state="info" />
			<Tag text="标签" state="neutral" />
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">填充样式</div>
		<div class="flex flex-wrap gap-2 p-4">
			<Tag text="实心" fill="base" />
			<Tag text="描边" fill="line" />
			<Tag text="浅色" fill="light" />
		</div>
		<div class="flex flex-wrap gap-2 px-4">
			<Tag text="实心" fill="base" state="success" />
			<Tag text="描边" fill="line" state="success" />
			<Tag text="浅色" fill="light" state="success" />
			<Tag text="浅色" fill="light" state="neutral" />
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">不同尺寸</div>
		<div class="flex flex-wrap items-center gap-2 p-4">
			<Tag text="超小" size="xs" />
			<Tag text="小号" size="sm" />
			<Tag text="中号" size="md" />
			<Tag text="大号" size="lg" />
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">不同圆角</div>
		<div class="flex flex-wrap gap-2 p-4">
			<Tag text="无圆角" radius="none" />
			<Tag text="小圆角" radius="sm" />
			<Tag text="中圆角" radius="md" />
			<Tag text="大圆角" radius="lg" />
			<Tag text="全圆角" radius="full" />
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">标记样式</div>
		<div class="flex flex-wrap gap-2 p-4">
			<Tag text="标记" mark />
			<Tag text="标记" mark state="success" />
			<Tag text="标记" mark state="warning" />
			<Tag text="标记" mark state="error" />
			<Tag text="标记" mark state="info" />
			<Tag text="标记" mark state="neutral" />
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">可关闭标签</div>
		<div class="flex flex-wrap gap-2 p-4">
			<Tag v-for="(tag, index) in tags" :key="tag" :text="tag" closable @close="() => handleClose(index)" />
			<span v-if="tags.length === 0" class="text-sm text-gray-400">所有标签已关闭</span>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">禁用状态</div>
		<div class="flex flex-wrap gap-2 p-4">
			<Tag text="禁用" disabled />
			<Tag text="禁用" disabled fill="line" />
			<Tag text="禁用" disabled closable />
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">搭配 Cell 使用</div>
		<Cell title="商品名称">
			<template #detail>
				<Tag text="热销" size="sm" />
			</template>
		</Cell>
		<Cell title="订单状态" :line="false">
			<template #detail>
				<Tag text="已完成" size="sm" state="success" fill="light" />
			</template>
		</Cell>

		<div class="mx-4 mt-8 text-lg font-bold">自定义内容</div>
		<div class="flex flex-wrap gap-2 p-4">
			<Tag>
				<span class="flex items-center gap-1">
					<svg class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
						/>
					</svg>
					收藏
				</span>
			</Tag>
			<Tag fill="light" state="error">
				<span class="flex items-center gap-1">
					<svg class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
					</svg>
					精选
				</span>
			</Tag>
		</div>

		<div class="mx-4 mt-8 text-lg font-bold">自定义样式</div>
		<div class="flex flex-wrap gap-2 p-4">
			<Tag text="渐变" inj-class="!bg-linear-to-r !from-purple-500 !to-pink-500" />
			<Tag text="阴影" inj-class="shadow-md" />
			<Tag text="加粗" inj-class="font-bold" />
		</div>
	</div>
</template>
