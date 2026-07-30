import { useEffect, useMemo, useRef, useState } from 'react';
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
} from 'rtdf/components';
import { switchTheme, themes } from 'rtdf/theme';
import { useAppContext } from '../../store/appStore';
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
	tabRadiusList,
	themeLabels
} from '../../data/homeData';

const HeroComponentPreview = () => {
	const { lang, currentColor, setCurrentColor, themeMode, sysTheme } = useAppContext();
	const isZh = lang === 'zh_CN';
	const resolvedMode = themeMode === 'auto' ? sysTheme : themeMode;

	const noticeTextList = isZh
		? ['欢迎使用 RTDF 移动组件库', '内置主题已准备完成', '组件配置支持实时预览']
		: ['Welcome to the RTDF mobile library', 'Built-in themes are ready', 'Component settings preview in real time'];
	const tabLabels = useMemo(
		() =>
			randomPick([
				[{ text: isZh ? '推荐' : 'For you' }, { text: isZh ? '关注' : 'Follow' }, { text: isZh ? '热门' : 'Hot' }],
				[{ text: isZh ? '组件' : 'Components' }, { text: isZh ? '主题' : 'Themes' }, { text: isZh ? '指南' : 'Guides' }],
				[{ text: isZh ? '最新' : 'Latest' }, { text: isZh ? '常用' : 'Popular' }, { text: isZh ? '收藏' : 'Saved' }]
			]),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
	const inputSample = useMemo(
		() =>
			randomPick(
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
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
	const avatarImage = useMemo(() => randomPick(avatarImgs), []);
	const avatarRadius = useMemo(() => randomPick(avatarRadiusList), []);
	const loadingType = useMemo(() => `1_${randomRange(1, 53)}`, []);
	const noticeRadius = useMemo(() => randomPick(tabRadiusList), []);
	const switchRadius = useMemo(() => randomPick(['none', 'sm', 'full'] as const), []);
	const switchInside = useMemo(() => randomPick(switchInsideList), []);
	const tabRadius = useMemo(() => randomPick(tabRadiusList), []);
	const tabLineType = useMemo(() => randomBool(), []);
	const inputRadius = useMemo(() => randomPick(inputRadiusList), []);
	const inputStyle = useMemo(() => randomPick(inputStyleList), []);
	const inputClear = useMemo(() => randomBool(), []);
	const rateValue = useMemo(() => randomRange(2, 5), []);
	const rateAnimation = useMemo(() => randomPick(['current', 'active'] as const), []);
	const progressValue = useMemo(() => randomRange(48, 92), []);
	const checkboxOptions = [{ name: 'sync', label: isZh ? '同步' : 'Sync' }];
	const radioOptions = [{ name: 'auto', label: isZh ? '自动' : 'Auto' }];
	const sliderRadius = useMemo(() => randomPick(sliderRadiusList), []);
	const sliderShowTip = useMemo(() => randomPick(sliderShowTipList), []);
	const paginationTotal = useMemo(() => randomRange(60, 160), []);
	const paginationCurrent = useMemo(() => randomRange(1, Math.floor(paginationTotal / 10)), [paginationTotal]);
	const paginationType = useMemo(() => randomPick(paginationTypeList), []);
	const paginationRadius = useMemo(() => randomPick(paginationRadiusList), []);
	const swiperOption = useMemo(() => randomPick(swiperOptions), []);
	const swiperIndicatePosition: 'inner' | null = useMemo(() => (randomBool() ? null : 'inner'), []);
	const buttonFill = useMemo(() => randomPick(['base', 'lineState', 'textState', 'colorLight'] as const), []);
	const buttonRadius = useMemo(() => randomPick(tabRadiusList), []);

	const [inputValue, setInputValue] = useState(inputSample.value);
	const [switchActive, setSwitchActive] = useState(randomBool());
	const [checkedChoices, setCheckedChoices] = useState(['sync']);
	const [radioValue, setRadioValue] = useState('auto');
	const [sliderValue, setSliderValue] = useState(randomRange(20, 85));
	const [stepperValue, setStepperValue] = useState(randomRange(1, 8));
	const [swiperCellWidth, setSwiperCellWidth] = useState(240);
	const swiperCellRef = useRef<HTMLDivElement | null>(null);
	const swiperWidth = Math.max(160, swiperCellWidth - 24);

	// 监听 swiper 容器宽度
	useEffect(() => {
		const node = swiperCellRef.current;
		if (!node) return;
		const updateWidth = () => setSwiperCellWidth(node.clientWidth);
		updateWidth();
		if (typeof ResizeObserver === 'undefined') return;
		const observer = new ResizeObserver(updateWidth);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	const switchRandomTheme = () => {
		const availableThemes = themes.filter((theme) => theme.name !== currentColor);
		const nextTheme = randomPick(availableThemes);
		setCurrentColor(nextTheme.name);
		localStorage.setItem('theme_color', nextTheme.name);
		switchTheme(nextTheme.name);
	};

	return (
		<div
			className="hero-component-preview"
			data-site-component-preview
			data-theme={currentColor}
			data-mode={resolvedMode}
			aria-label={isZh ? 'RTDF 组件预览' : 'RTDF component preview'}
		>
			<div className="hero-preview-grid">
				<div className="hero-preview-cell hero-preview-action">
					<Button size="full" fill={buttonFill} state="theme" radius={buttonRadius} onClick={switchRandomTheme}>
						{isZh ? '随机主题' : 'Random theme'}
					</Button>
				</div>

				<div className="hero-preview-cell hero-preview-notice">
					<NoticeBar textList={noticeTextList} rightIcon={null} radius={noticeRadius} vertical interval={3} injClass="w-full" />
				</div>

				<div className="hero-preview-cell hero-preview-profile">
					<div className="hero-preview-cluster">
						<div className="hero-preview-cluster-item">
							<div className="hero-preview-profile-main">
								<Badge text="NEW" radius="full">
									{avatarImage ? (
										<Avatar size="md" image={avatarImage} radius={avatarRadius} />
									) : (
										<Avatar size="md" radius={avatarRadius} />
									)}
								</Badge>
								<div className="hero-preview-profile-copy">
									<strong>{isZh ? '组件主题' : 'Component theme'}</strong>
									<span>{isZh ? themeLabels[currentColor] || currentColor : currentColor}</span>
								</div>
							</div>
						</div>
						<div className="hero-preview-cluster-item">
							<Loading type={loadingType} theme lazyAnimation={false} />
						</div>
					</div>
				</div>

				<div className="hero-preview-cell hero-preview-switch">
					<div className="hero-preview-cluster">
						<div className="hero-preview-cluster-item">
							<Switch active={switchActive} onChange={setSwitchActive} radius={switchRadius} inside={switchInside} />
						</div>
						<div className="hero-preview-cluster-item">
							<Rate value={rateValue} height={20} width={20} animation={rateAnimation} />
						</div>
					</div>
				</div>

				<div className="hero-preview-cell hero-preview-tab">
					<Tab labels={tabLabels} radius={tabRadius} lineType={tabLineType} injClass="w-full" mx="0" />
				</div>

				<div className="hero-preview-cell hero-preview-input">
					<Card bg="gray" mx="0" my="0" p="2" shadow="none" injClass="w-full">
						<Input
							title={inputSample.title}
							value={inputValue}
							radius={inputRadius}
							inputStyle={inputStyle}
							onChange={(value) => setInputValue(value)}
							clear={inputClear}
						/>
					</Card>
				</div>

				<div className="hero-preview-cell hero-preview-rate">
					<div className="hero-preview-cluster hero-preview-rate-cluster">
						<div className="hero-preview-cluster-item">
							<div className="hero-preview-progress">
								<Progress percent={progressValue} percentPosition={null} />
							</div>
						</div>
						<div className="hero-preview-cluster-item">
							<div className="hero-preview-progress-loop">
								<ProgressLoop percent={progressValue} strokeWidth={4} />
							</div>
						</div>
					</div>
				</div>

				<div className="hero-preview-cell hero-preview-choice">
					<div className="hero-preview-cluster">
						<div className="hero-preview-cluster-item">
							<Checkbox layout="h" data={checkboxOptions} checkeds={checkedChoices} onChange={setCheckedChoices} />
						</div>
						<div className="hero-preview-cluster-item">
							<Radio layout="h" data={radioOptions} value={radioValue} onChange={setRadioValue} />
						</div>
					</div>
				</div>

				<div className="hero-preview-cell hero-preview-slider">
					<div className="hero-preview-slider-control">
						<Slider value={sliderValue} onChange={setSliderValue} radius={sliderRadius} showTip={sliderShowTip} />
					</div>
					<div className="hero-preview-stepper-control">
						<Stepper value={stepperValue} onChange={setStepperValue} min={1} max={9} padding={false} />
					</div>
				</div>

				<div className="hero-preview-cell hero-preview-pagination">
					<Pagination
						total={paginationTotal}
						current={paginationCurrent}
						type={paginationType}
						radius={paginationRadius}
						injClass={injPaginationRadiusMap[paginationRadius]}
					/>
				</div>

				<div className="hero-preview-cell hero-preview-swiper" ref={swiperCellRef}>
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
	);
};

export default HeroComponentPreview;
