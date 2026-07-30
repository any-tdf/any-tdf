<script setup lang="ts">
import { ref } from 'vue';
import { BottomSheet, Button, Cell, Toast } from 'vtdf';
import Aphorism from '../components/Aphorism.vue';

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const visible6 = ref(false);
const visible7 = ref(false);
const visible8 = ref(false);
const visible9 = ref(false);
const visible10 = ref(false);
const visible11 = ref(false);
const visible12 = ref(false);
const visible13 = ref(false);
const visible14 = ref(false);

const toastBackVisible = ref(false);
const toastCloseVisible = ref(false);
const stayHeightList = [40, 60, 80];
const currentHeight = ref(60);

const heightChangeFunc = (height: number) => {
	currentHeight.value = height;
};
</script>

<template>
	<div class="py-4">
		<Cell title="基础用法" @click="() => (visible1 = true)" />
		<BottomSheet v-model:visible="visible1" title="此区域支持滑动">
			<div class="flex h-full flex-col justify-center text-center">
				<div>这里是内容区域</div>
			</div>
		</BottomSheet>

		<Cell title="内容区域滚动" @click="() => (visible8 = true)" />
		<BottomSheet v-model:visible="visible8">
			<Aphorism :num="12" />
		</BottomSheet>

		<Cell title="有返回按钮" @click="() => (visible2 = true)" />
		<BottomSheet
			v-model:visible="visible2"
			show-back-icon
			title="点击返回与关闭可触发事件"
			@back="() => (toastBackVisible = true)"
			@close="() => (toastCloseVisible = true)"
		>
			<Aphorism :num="12" />
		</BottomSheet>
		<Toast v-model:visible="toastBackVisible" message="触发了 BottomSheet 返回事件！" />
		<Toast v-model:visible="toastCloseVisible" message="触发了 BottomSheet 关闭事件！" />

		<Cell title="初始高度为 90" @click="() => (visible3 = true)" />
		<BottomSheet v-model:visible="visible3" :stay-height-index="2">
			<Aphorism :num="12" />
		</BottomSheet>

		<Cell title="固定高度为 40/60/80" @click="() => (visible4 = true)" />
		<BottomSheet
			v-model:visible="visible4"
			:stay-height-list="stayHeightList"
			@height-change="heightChangeFunc"
			:title="`当前固定高度为 ${currentHeight}`"
		>
			<Aphorism :num="12" />
		</BottomSheet>

		<Cell title="点击遮罩可关闭" @click="() => (visible5 = true)" />
		<BottomSheet v-model:visible="visible5" mask-closable>
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="出现过渡时间为 1 秒" @click="() => (visible6 = true)" />
		<BottomSheet v-model:visible="visible6" :duration="1000">
			<Aphorism :num="12" />
		</BottomSheet>

		<Cell title="遮罩完全透明且模糊" @click="() => (visible7 = true)" />
		<BottomSheet v-model:visible="visible7" :mask="{ opacity: '0', backdropBlur: 'sm' }">
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="头部不显示任何内容" @click="() => (visible9 = true)" />
		<BottomSheet v-model:visible="visible9" :show-divider="false" close-content="" title="">
			<div class="flex h-full flex-col justify-around px-4 py-8 text-center">
				<div>头部区域</div>
				<div>标题</div>
				<div>返回与关闭图标</div>
				<div>分割线</div>
				<div>都不显示</div>
				<div>位置依旧保留作为滑动触控区域</div>
				<div class="mb-8">
					<Button @click="() => (visible9 = false)">关闭</Button>
				</div>
			</div>
		</BottomSheet>

		<Cell title="隐藏关闭图标且标题居中" @click="() => (visible10 = true)" />
		<BottomSheet v-model:visible="visible10" close-content="" title-align="center" mask-closable title="点击遮罩关闭">
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="另一种关闭图标" @click="() => (visible13 = true)" />
		<BottomSheet v-model:visible="visible13" close-content="closeIcon">
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="关闭区域自定义文字" @click="() => (visible14 = true)" />
		<BottomSheet v-model:visible="visible14" close-content="完成">
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="图标不同圆角风格" @click="() => (visible12 = true)" />
		<BottomSheet v-model:visible="visible12" radius="md" show-back-icon>
			<Aphorism :num="2" />
		</BottomSheet>

		<Cell title="可下滑到底部关闭" @click="() => (visible11 = true)" />
		<BottomSheet v-model:visible="visible11" :close-height="10" close-content="">
			<div class="p-4">将 closeHeight 设置为 10，如果滑动结束时位置距离页面底部小于页面高度的 10% 则自动关闭。</div>
		</BottomSheet>
	</div>
</template>
