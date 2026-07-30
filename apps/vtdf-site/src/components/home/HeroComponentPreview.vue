<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {
	Avatar,
	Badge,
	Button,
	Card,
	Checkbox,
	Input,
	Loading,
	NoticeBar,
	Pagination,
	Progress,
	ProgressLoop,
	Radio,
	Rate,
	Slider,
	Stepper,
	Swiper,
	Switch,
	Tab
} from 'vtdf/components';
import { switchTheme, themes } from 'vtdf/theme';
import {
	avatarImgs,
	avatarRadiusList,
	injPaginationRadiusMap,
	inputRadiusList,
	inputStyleList,
	paginationRadiusList,
	paginationTypeList,
	randomBool,
	randomPick,
	randomRange,
	sliderRadiusList,
	sliderShowTipList,
	switchInsideList,
	switchRadiusList,
	swiperData,
	swiperOptions,
	tabRadiusList,
	themeLabels
} from '../../data/homeData';
import { appState } from '../../store/appStore';

const isZh = computed(() => appState.lang === 'zh_CN');
const noticeTextList = computed(() =>
	isZh.value
		? ['欢迎使用 VTDF 移动组件库', '内置主题已准备完成', '组件配置支持实时预览']
		: ['Welcome to the VTDF mobile library', 'Built-in themes are ready', 'Component settings preview in real time']
);
const tabLabels = randomPick([
	[{ text: isZh.value ? '推荐' : 'For you' }, { text: isZh.value ? '关注' : 'Follow' }, { text: isZh.value ? '热门' : 'Hot' }],
	[{ text: isZh.value ? '组件' : 'Components' }, { text: isZh.value ? '主题' : 'Themes' }, { text: isZh.value ? '指南' : 'Guides' }],
	[{ text: isZh.value ? '最新' : 'Latest' }, { text: isZh.value ? '常用' : 'Popular' }, { text: isZh.value ? '收藏' : 'Saved' }]
]);
const inputSample = randomPick(
	isZh.value
		? [
				{ title: '内容', value: '移动组件预览' },
				{ title: '主题', value: '实时切换主题配置' },
				{ title: '搜索', value: '查找移动组件' }
			]
		: [
				{ title: 'Content', value: 'Mobile component preview' },
				{ title: 'Theme', value: 'Switch theme settings live' },
				{ title: 'Search', value: 'Find mobile components' }
			]
);
const avatarImage = randomPick(avatarImgs);
const avatarRadius = randomPick(avatarRadiusList);
const loadingType = `1_${randomRange(1, 53)}`;
const noticeRadius = randomPick(tabRadiusList);
// VTDF Switch 圆角仅支持 SmallAreaRadius，不支持 stdf 的 middle，取值范围收敛为 none/full
const switchRadius = randomPick(['none', 'full'] as const);
const switchInside = randomPick(switchInsideList);
const tabRadius = randomPick(tabRadiusList);
const tabLineType = randomBool();
const inputRadius = randomPick(inputRadiusList);
const inputStyle = randomPick(inputStyleList);
const inputClear = randomBool();
const rateValue = randomRange(2, 5);
const rateAnimation = randomPick(['current', 'active'] as const);
const progressValue = randomRange(48, 92);
const checkboxOptions = [{ name: 'sync', label: isZh.value ? '同步' : 'Sync' }];
const radioOptions = [{ name: 'auto', label: isZh.value ? '自动' : 'Auto' }];
const sliderRadius = randomPick(sliderRadiusList);
const sliderShowTip = randomPick(sliderShowTipList);
const paginationTotal = randomRange(60, 160);
const paginationCurrent = randomRange(1, Math.floor(paginationTotal / 10));
const paginationType = randomPick(paginationTypeList);
const paginationRadius = randomPick(paginationRadiusList);
const swiperOption = randomPick(swiperOptions);
const swiperIndicatePosition: 'inner' | null = randomBool() ? null : 'inner';
const buttonFill = randomPick(['base', 'lineState', 'textState', 'colorLight'] as const);
const buttonRadius = randomPick(tabRadiusList);
const inputValue = ref(inputSample.value);
const switchActive = ref(randomBool());
const checkedChoices = ref(['sync']);
const radioValue = ref('auto');
const tabActive = ref(0);
const sliderValue = ref(randomRange(20, 85));
const stepperValue = ref(randomRange(1, 8));
const swiperCellWidth = ref(240);
const swiperWidth = computed(() => Math.max(160, swiperCellWidth.value - 24));

const switchRandomTheme = () => {
	const availableThemes = themes.filter((theme) => theme.name !== appState.currentColor);
	const nextTheme = randomPick(availableThemes);
	appState.currentColor = nextTheme.name;
	localStorage.setItem('theme_color', nextTheme.name);
	switchTheme(nextTheme.name);
};

const swiperCellEl = ref<HTMLDivElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
	if (!swiperCellEl.value) return;
	swiperCellWidth.value = swiperCellEl.value.clientWidth;
	resizeObserver = new ResizeObserver((entries) => {
		swiperCellWidth.value = entries[0].contentRect.width;
	});
	resizeObserver.observe(swiperCellEl.value);
});

onBeforeUnmount(() => {
	resizeObserver?.disconnect();
});
</script>

<template>
	<div
		class="hero-component-preview"
		data-site-component-preview
		:data-theme="appState.currentColor"
		:data-mode="appState.currentThemeMode"
		:aria-label="isZh ? 'VTDF 组件预览' : 'VTDF component preview'"
	>
		<div class="hero-preview-grid">
			<div class="hero-preview-cell hero-preview-action">
				<Button size="full" :fill="buttonFill" state="theme" :radius="buttonRadius" @click="switchRandomTheme">
					{{ isZh ? '随机主题' : 'Random theme' }}
				</Button>
			</div>

			<div class="hero-preview-cell hero-preview-notice">
				<NoticeBar :text-list="noticeTextList" :right-icon="null" :radius="noticeRadius" vertical :interval="3" inj-class="w-full" />
			</div>

			<div class="hero-preview-cell hero-preview-profile">
				<div class="hero-preview-cluster">
					<div class="hero-preview-cluster-item">
						<div class="hero-preview-profile-main">
							<Badge text="NEW" radius="full">
								<Avatar v-if="avatarImage" size="md" :image="avatarImage" :radius="avatarRadius" />
								<Avatar v-else size="md" :radius="avatarRadius" />
							</Badge>
							<div class="hero-preview-profile-copy">
								<strong>{{ isZh ? '组件主题' : 'Component theme' }}</strong>
								<span>{{ isZh ? themeLabels[appState.currentColor] || appState.currentColor : appState.currentColor }}</span>
							</div>
						</div>
					</div>
					<div class="hero-preview-cluster-item">
						<Loading :type="loadingType" theme :lazy-animation="false" />
					</div>
				</div>
			</div>

			<div class="hero-preview-cell hero-preview-switch">
				<div class="hero-preview-cluster">
					<div class="hero-preview-cluster-item">
						<Switch v-model:active="switchActive" :radius="switchRadius" :inside="switchInside" />
					</div>
					<div class="hero-preview-cluster-item">
						<Rate :value="rateValue" :height="20" :width="20" :animation="rateAnimation" />
					</div>
				</div>
			</div>

			<div class="hero-preview-cell hero-preview-tab">
				<Tab :labels="tabLabels" :radius="tabRadius" :line-type="tabLineType" inj-class="w-full" mx="0" v-model:active="tabActive" />
			</div>

			<div class="hero-preview-cell hero-preview-input">
				<Card bg="gray" mx="0" my="0" p="2" shadow="none" inj-class="w-full">
					<Input
						:title="inputSample.title"
						v-model:value="inputValue"
						:radius="inputRadius"
						:input-style="inputStyle"
						:clear="inputClear"
					/>
				</Card>
			</div>

			<div class="hero-preview-cell hero-preview-rate">
				<div class="hero-preview-cluster hero-preview-rate-cluster">
					<div class="hero-preview-cluster-item">
						<div class="hero-preview-progress">
							<Progress :percent="progressValue" :percent-position="null" />
						</div>
					</div>
					<div class="hero-preview-cluster-item">
						<div class="hero-preview-progress-loop">
							<ProgressLoop :percent="progressValue" :stroke-width="4" />
						</div>
					</div>
				</div>
			</div>

			<div class="hero-preview-cell hero-preview-choice">
				<div class="hero-preview-cluster">
					<div class="hero-preview-cluster-item">
						<Checkbox layout="h" :data="checkboxOptions" v-model:checkeds="checkedChoices" />
					</div>
					<div class="hero-preview-cluster-item">
						<Radio layout="h" :data="radioOptions" v-model:value="radioValue" />
					</div>
				</div>
			</div>

			<div class="hero-preview-cell hero-preview-slider">
				<div class="hero-preview-slider-control">
					<Slider :value="sliderValue" :radius="sliderRadius" :show-tip="sliderShowTip" @change="sliderValue = $event" />
				</div>
				<div class="hero-preview-stepper-control">
					<Stepper :value="stepperValue" :min="1" :max="9" :padding="false" @change="stepperValue = $event" />
				</div>
			</div>

			<div class="hero-preview-cell hero-preview-pagination">
				<Pagination
					:total="paginationTotal"
					:current="paginationCurrent"
					:type="paginationType"
					:radius="paginationRadius"
					:inj-class="injPaginationRadiusMap[paginationRadius]"
				/>
			</div>

			<div class="hero-preview-cell hero-preview-swiper" ref="swiperCellEl">
				<Swiper
					v-bind="swiperOption"
					:data="swiperData"
					:container-width="swiperWidth"
					autoplay
					:interval="4"
					:indicate-position="swiperIndicatePosition"
					:aspect-ratio="[2, 1]"
				/>
			</div>
		</div>
	</div>
</template>
