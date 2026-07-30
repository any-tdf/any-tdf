<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { PaginationProps } from '../types';
import {
	resolvePaginationDerived,
	resolvePaginationEllipsisToggleAction,
	resolvePaginationNavigateAction,
	resolvePaginationNextOmitSyncAction,
	resolvePaginationSecondPageDerived,
	resolvePaginationSecondPageStateOptions,
	resolvePaginationSelectAction,
	resolvePaginationStateOptions
} from '@any-tdf/common/derived/pagination';
import { arrowLeftSvg, arrowRightSvg, moreSmallSvg, moreSvg } from '@any-tdf/common/svg/common';
import { zh_CN } from '../lang';
import { useConfig } from './adapter/config';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<PaginationProps & {}>(), {
	pageSize: 10,
	current: 1,
	maxShowPage: 7,
	radius: '',
	type: 'bold',
	bg: 'gray',
	pageCol: 3,
	showNextOmitPage: false,
	showPreOmitPage: false,
	injClass: '',
	noDataText: undefined,
	onePageText: undefined,
	continuous: false
});

const emit = defineEmits<{
	change: [current: number];
	next: [current: number];
	pre: [current: number];
}>();

const config = useConfig();
const internalCurrent = ref(props.current);
const internalShowNextOmitPage = ref(props.showNextOmitPage);
const internalShowPreOmitPage = ref(props.showPreOmitPage);

const paginationLang = computed(() => config.locale?.pagination || zh_CN.pagination);
const commonLang = computed(() => config.locale?.common || zh_CN.common);
// 公共派生层接收分页 props 和内部状态，组件层只保留状态同步与事件派发。
// The common derivation layer receives pagination props and internal state; this component only keeps state sync and event dispatch.
const paginationState = computed(() =>
	resolvePaginationDerived(
		resolvePaginationStateOptions({
			props: {
				total: props.total,
				pageSize: props.pageSize,
				maxShowPage: props.maxShowPage,
				radius: props.radius,
				type: props.type,
				bg: props.bg,
				injClass: props.injClass,
				noDataText: props.noDataText,
				onePageText: props.onePageText
			},
			current: internalCurrent.value,
			showNextOmitPage: internalShowNextOmitPage.value,
			showPreOmitPage: internalShowPreOmitPage.value,
			defaults: { common: commonLang.value, pagination: paginationLang.value }
		})
	)
);

const nextSecondPageState = computed(() =>
	resolvePaginationSecondPageDerived(
		resolvePaginationSecondPageStateOptions({
			props: {
				bg: props.bg,
				maxShowPage: props.maxShowPage,
				pageCol: props.pageCol,
				pages: paginationState.value.nextEllipsisPages,
				placement: 'next'
			}
		})
	)
);
const preSecondPageState = computed(() =>
	resolvePaginationSecondPageDerived(
		resolvePaginationSecondPageStateOptions({
			props: {
				bg: props.bg,
				maxShowPage: props.maxShowPage,
				pageCol: props.pageCol,
				pages: paginationState.value.preEllipsisPages,
				placement: 'pre'
			}
		})
	)
);

const clickNextEllipsis = () => {
	const action = resolvePaginationEllipsisToggleAction({
		pageCount: paginationState.value.nextEllipsisPages.length,
		visible: internalShowNextOmitPage.value
	});
	if (action.shouldToggle) internalShowNextOmitPage.value = action.nextVisible;
};

const clickPreEllipsis = () => {
	const action = resolvePaginationEllipsisToggleAction({
		pageCount: paginationState.value.preEllipsisPages.length,
		visible: internalShowPreOmitPage.value
	});
	if (action.shouldToggle) internalShowPreOmitPage.value = action.nextVisible;
};

const applyCurrentAction = (action: ReturnType<typeof resolvePaginationSelectAction>) => {
	if (!action.shouldChange) return false;
	internalCurrent.value = action.nextCurrent;
	internalShowNextOmitPage.value = action.nextShowNextOmitPage;
	internalShowPreOmitPage.value = action.nextShowPreOmitPage;
	return true;
};

const nextPage = () => {
	// 公共 action 只返回页码状态，事件派发留在组件内。
	// Shared action only returns pagination state; event dispatch stays in the component.
	const action = resolvePaginationNavigateAction({
		current: internalCurrent.value,
		totalPage: paginationState.value.totalPage,
		direction: 'next'
	});
	if (!applyCurrentAction(action)) return;
	emit('next', action.nextCurrent);
	emit('change', action.nextCurrent);
};

const prePage = () => {
	const action = resolvePaginationNavigateAction({
		current: internalCurrent.value,
		totalPage: paginationState.value.totalPage,
		direction: 'pre'
	});
	if (!applyCurrentAction(action)) return;
	emit('pre', action.nextCurrent);
	emit('change', action.nextCurrent);
};

const clickPage = (page: number) => {
	const action = resolvePaginationSelectAction(page);
	if (applyCurrentAction(action)) emit('change', action.nextCurrent);
};

const clickSecondPage = (page: number) => {
	const action = resolvePaginationSelectAction(page);
	if (applyCurrentAction(action)) emit('change', action.nextCurrent);
};

watch(
	() => props.current,
	(nextCurrent) => {
		internalCurrent.value = nextCurrent;
	}
);

watch(
	() => props.showNextOmitPage,
	(nextValue) => {
		internalShowNextOmitPage.value = nextValue;
	}
);

watch(
	() => props.showPreOmitPage,
	(nextValue) => {
		internalShowPreOmitPage.value = nextValue;
	}
);

watch([() => paginationState.value.totalPage, () => props.maxShowPage], () => {
	const action = resolvePaginationNextOmitSyncAction({
		totalPage: paginationState.value.totalPage,
		maxShowPage: props.maxShowPage,
		showNextOmitPage: internalShowNextOmitPage.value
	});
	if (action.shouldSync) internalShowNextOmitPage.value = action.nextShowNextOmitPage;
});
</script>

<template>
	<div :class="paginationState.rootClass">
		<button type="button" :class="paginationState.preButtonClass" :disabled="!paginationState.canPre" aria-label="pre" @click="prePage">
			<!-- 公共 SVG 数据在 common 中维护，组件层只负责渲染图标。 / Shared SVG data lives in common; the component layer only renders the icon. -->
			<SvgIcon :svg="arrowLeftSvg" width="20" height="20" :class-name="paginationState.iconClass" />
		</button>

		<div v-if="paginationState.showNoData" :class="paginationState.textClass">
			{{ paginationState.texts.noDataText }}
		</div>
		<div v-else-if="paginationState.showOnePage" :class="paginationState.textClass">
			{{ paginationState.texts.onePageText }}
		</div>
		<template v-else-if="paginationState.showAllPages">
			<button
				v-for="item in paginationState.allPageItems"
				:key="item.page"
				type="button"
				:class="item.className"
				@click="!continuous && clickPage(item.page)"
			>
				{{ item.page }}
			</button>
		</template>
		<template v-else>
			<button type="button" :class="paginationState.firstPageItem.className" @click="!continuous && clickPage(1)">1</button>

			<button
				v-if="paginationState.showPreEllipsis"
				type="button"
				:class="paginationState.preEllipsisClass"
				@click="!continuous && clickPreEllipsis()"
			>
				<SvgIcon v-if="internalShowPreOmitPage" :svg="moreSvg" width="20" height="20" :class-name="paginationState.iconClass" />
				<SvgIcon v-else :svg="moreSmallSvg" width="20" height="20" :class-name="paginationState.mutedIconClass" />
			</button>

			<button
				v-for="item in paginationState.leadingPageItems"
				:key="`leading-${item.page}`"
				type="button"
				:class="item.className"
				@click="!continuous && clickPage(item.page)"
			>
				{{ item.page }}
			</button>

			<button
				v-for="item in paginationState.middlePageItems"
				:key="`middle-${item.page}`"
				type="button"
				:class="item.className"
				@click="!continuous && clickPage(item.page)"
			>
				{{ item.page }}
			</button>

			<button
				v-for="item in paginationState.trailingPageItems"
				:key="`trailing-${item.page}`"
				type="button"
				:class="item.className"
				@click="!continuous && clickPage(item.page)"
			>
				{{ item.page }}
			</button>

			<button
				v-if="paginationState.showNextEllipsis"
				type="button"
				:class="paginationState.nextEllipsisClass"
				@click="!continuous && clickNextEllipsis()"
			>
				<SvgIcon v-if="internalShowNextOmitPage" :svg="moreSvg" width="20" height="20" :class-name="paginationState.iconClass" />
				<SvgIcon v-else :svg="moreSmallSvg" width="20" height="20" :class-name="paginationState.mutedIconClass" />
			</button>

			<button type="button" :class="paginationState.lastPageItem.className" @click="!continuous && clickPage(paginationState.totalPage)">
				{{ paginationState.totalPage }}
			</button>
		</template>

		<button type="button" :class="paginationState.nextButtonClass" :disabled="!paginationState.canNext" aria-label="next" @click="nextPage">
			<SvgIcon :svg="arrowRightSvg" width="20" height="20" :class-name="paginationState.iconClass" />
		</button>

		<div
			v-if="internalShowNextOmitPage && nextSecondPageState.visible"
			:class="nextSecondPageState.containerClass"
			:style="nextSecondPageState.containerStyleValue"
		>
			<div :class="nextSecondPageState.contentClass" :style="nextSecondPageState.gridStyleValue">
				<button
					v-for="page in paginationState.nextEllipsisPages"
					:key="`next-more-${page}`"
					type="button"
					:class="paginationState.inactivePageClass"
					@click="clickSecondPage(page)"
				>
					{{ page }}
				</button>
			</div>
			<div :class="nextSecondPageState.arrowClass" />
		</div>

		<div
			v-if="internalShowPreOmitPage && preSecondPageState.visible"
			:class="preSecondPageState.containerClass"
			:style="preSecondPageState.containerStyleValue"
		>
			<div :class="preSecondPageState.contentClass" :style="preSecondPageState.gridStyleValue">
				<button
					v-for="page in paginationState.preEllipsisPages"
					:key="`pre-more-${page}`"
					type="button"
					:class="paginationState.inactivePageClass"
					@click="clickSecondPage(page)"
				>
					{{ page }}
				</button>
			</div>
			<div :class="preSecondPageState.arrowClass" />
		</div>
	</div>
</template>
