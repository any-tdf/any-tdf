<script lang="ts">
	import { Avatar, Badge, Button, Card, Checkbox, Input, Loading, NoticeBar, Pagination, Progress, ProgressLoop, Radio, Rate, Slider, Stepper, Swiper, Switch, Tab } from 'stdf';
	import { switchTheme, themes } from 'stdf/theme';
	import { currentColorStore, currentThemeStore } from '../../store';
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
		swiperData,
		swiperOptions,
		switchInsideList,
		switchRadiusList,
		tabRadiusList,
		themeLabels
	} from '../../data/homeData';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const noticeTextList = isZh
		? ['欢迎使用 STDF 移动组件库', '内置主题已准备完成', '组件配置支持实时预览']
		: ['Welcome to the STDF mobile library', 'Built-in themes are ready', 'Component settings preview in real time'];
	const tabLabels = randomPick([
		[{ text: isZh ? '推荐' : 'For you' }, { text: isZh ? '关注' : 'Follow' }, { text: isZh ? '热门' : 'Hot' }],
		[{ text: isZh ? '组件' : 'Components' }, { text: isZh ? '主题' : 'Themes' }, { text: isZh ? '指南' : 'Guides' }],
		[{ text: isZh ? '最新' : 'Latest' }, { text: isZh ? '常用' : 'Popular' }, { text: isZh ? '收藏' : 'Saved' }]
	]);
	const inputSample = randomPick(
		isZh
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
	const switchRadius = randomPick(switchRadiusList);
	const switchInside = randomPick(switchInsideList);
	const tabRadius = randomPick(tabRadiusList);
	const tabLineType = randomBool();
	const inputRadius = randomPick(inputRadiusList);
	const inputStyle = randomPick(inputStyleList);
	const inputClear = randomBool();
	const rateValue = randomRange(2, 5);
	const rateAnimation = randomPick(['current', 'active'] as const);
	const progressValue = randomRange(48, 92);
	const checkboxOptions = [{ name: 'sync', label: isZh ? '同步' : 'Sync' }];
	const radioOptions = [{ name: 'auto', label: isZh ? '自动' : 'Auto' }];
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
	let inputValue = $state(inputSample.value);
	let switchActive = $state(randomBool());
	let checkedChoices = $state(['sync']);
	let radioValue = $state('auto');
	let sliderValue = $state(randomRange(20, 85));
	let stepperValue = $state(randomRange(1, 8));
	let swiperCellWidth = $state(240);
	let swiperWidth = $derived(Math.max(160, swiperCellWidth - 24));

	const switchRandomTheme = () => {
		const availableThemes = themes.filter((theme) => theme.name !== $currentColorStore);
		const nextTheme = randomPick(availableThemes);
		currentColorStore.set(nextTheme.name);
		localStorage.setItem('theme_color', nextTheme.name);
		switchTheme(nextTheme.name);
	};
</script>

<div
	class="hero-component-preview"
	data-site-component-preview
	data-theme={$currentColorStore}
	data-mode={$currentThemeStore}
	aria-label={isZh ? 'STDF 组件预览' : 'STDF component preview'}
>
	<div class="hero-preview-grid">
		<div class="hero-preview-cell hero-preview-action">
			<Button size="full" fill={buttonFill} state="theme" radius={buttonRadius} onclick={switchRandomTheme}>
				{isZh ? '随机主题' : 'Random theme'}
			</Button>
		</div>

		<div class="hero-preview-cell hero-preview-notice">
			<NoticeBar
				textList={noticeTextList}
				rightIcon={null}
				radius={noticeRadius}
				vertical
				interval={3}
				injClass="w-full"
			/>
		</div>

		<div class="hero-preview-cell hero-preview-profile">
			<div class="hero-preview-cluster">
				<div class="hero-preview-cluster-item">
					<div class="hero-preview-profile-main">
						<Badge text="NEW" radius="full">
							{#if avatarImage}
								<Avatar size="md" image={avatarImage} radius={avatarRadius} />
							{:else}
								<Avatar size="md" radius={avatarRadius} />
							{/if}
						</Badge>
						<div class="hero-preview-profile-copy">
							<strong>{isZh ? '组件主题' : 'Component theme'}</strong>
							<span>{isZh ? themeLabels[$currentColorStore] || $currentColorStore : $currentColorStore}</span>
						</div>
					</div>
				</div>
				<div class="hero-preview-cluster-item">
					<Loading type={loadingType} theme lazyAnimation={false} />
				</div>
			</div>
		</div>

		<div class="hero-preview-cell hero-preview-switch">
			<div class="hero-preview-cluster">
				<div class="hero-preview-cluster-item">
					<Switch bind:active={switchActive} radius={switchRadius} inside={switchInside} />
				</div>
				<div class="hero-preview-cluster-item">
					<Rate value={rateValue} height={20} width={20} animation={rateAnimation} />
				</div>
			</div>
		</div>

		<div class="hero-preview-cell hero-preview-tab">
			<Tab labels={tabLabels} radius={tabRadius} lineType={tabLineType} injClass="w-full" mx="0" />
		</div>

		<div class="hero-preview-cell hero-preview-input">
			<Card bg="gray" mx="0" my="0" p="2" shadow="none" injClass="w-full">
				<Input
					title={inputSample.title}
					value={inputValue}
					radius={inputRadius}
					{inputStyle}
					onchange={(value) => (inputValue = value)}
					clear={inputClear}
				/>
			</Card>
		</div>

		<div class="hero-preview-cell hero-preview-rate">
			<div class="hero-preview-cluster hero-preview-rate-cluster">
				<div class="hero-preview-cluster-item">
					<div class="hero-preview-progress">
						<Progress percent={progressValue} percentPosition={null} />
					</div>
				</div>
				<div class="hero-preview-cluster-item">
					<div class="hero-preview-progress-loop">
						<ProgressLoop percent={progressValue} strokeWidth={4} />
					</div>
				</div>
			</div>
		</div>

		<div class="hero-preview-cell hero-preview-choice">
			<div class="hero-preview-cluster">
				<div class="hero-preview-cluster-item">
					<Checkbox layout="h" data={checkboxOptions} bind:checkeds={checkedChoices} />
				</div>
				<div class="hero-preview-cluster-item">
					<Radio layout="h" data={radioOptions} bind:value={radioValue} />
				</div>
			</div>
		</div>

		<div class="hero-preview-cell hero-preview-slider">
			<div class="hero-preview-slider-control">
				<Slider bind:value={sliderValue} radius={sliderRadius} showTip={sliderShowTip} />
			</div>
			<div class="hero-preview-stepper-control">
				<Stepper bind:value={stepperValue} min={1} max={9} padding={false} />
			</div>
		</div>

		<div class="hero-preview-cell hero-preview-pagination">
			<Pagination
				total={paginationTotal}
				current={paginationCurrent}
				type={paginationType}
				radius={paginationRadius}
				injClass={injPaginationRadiusMap[paginationRadius]}
			/>
		</div>

		<div class="hero-preview-cell hero-preview-swiper" bind:clientWidth={swiperCellWidth}>
			<Swiper
				{...swiperOption}
				data={swiperData}
				containerWidth={swiperWidth}
				autoplay
				interval={4}
				indicatePosition={swiperIndicatePosition}
				aspectRatio={[2, 1]}
			/>
		</div>

	</div>
</div>
