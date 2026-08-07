import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { builtInIconLibraryLabelMap } from '@any-tdf/common/svg';
import { Gem, Palette, SlidersHorizontal, SunMoon, WandSparkles, Zap } from 'lucide-react';
import {
	Button,
	Switch,
	Avatar,
	Progress,
	ProgressLoop,
	Tab,
	Badge,
	Rate,
	Slider,
	Stepper,
	Loading,
	Radio,
	Checkbox,
	Card,
	NoticeBar,
	Cell,
	Icon,
	Input,
	Steps,
	Tag
} from 'rtdf/components';
import { themes as rtdfThemes, generateColorScale } from 'rtdf/theme';
import { themeLabels } from '../../data/homeData';
import { normalizeThemeName } from '../../utils/theme';
import { useAppContext } from '../../store/appStore';

// 生成亮色层样式：所有 dark 变量都用 primary 的值，背景色和文字色使用主题配置的值
const generateLightLayerStyles = (theme: (typeof rtdfThemes)[0]) => {
	if (!theme?.['color-primary'] || !theme?.['color-dark']) return '';
	const primaryScale = generateColorScale(theme['color-primary']);

	return `
		--color-primary-50: ${primaryScale[50]};
		--color-primary-100: ${primaryScale[100]};
		--color-primary-200: ${primaryScale[200]};
		--color-primary-300: ${primaryScale[300]};
		--color-primary-400: ${primaryScale[400]};
		--color-primary-500: ${primaryScale[500]};
		--color-primary: ${primaryScale[600]};
		--color-primary-700: ${primaryScale[700]};
		--color-primary-800: ${primaryScale[800]};
		--color-primary-900: ${primaryScale[900]};
		--color-primary-950: ${primaryScale[950]};
		--color-dark-50: ${primaryScale[50]};
		--color-dark-100: ${primaryScale[100]};
		--color-dark-200: ${primaryScale[200]};
		--color-dark-300: ${primaryScale[300]};
		--color-dark-400: ${primaryScale[400]};
		--color-dark-500: ${primaryScale[500]};
		--color-dark: ${primaryScale[600]};
		--color-dark-700: ${primaryScale[700]};
		--color-dark-800: ${primaryScale[800]};
		--color-dark-900: ${primaryScale[900]};
		--color-dark-950: ${primaryScale[950]};
		--color-bg-base: ${theme['color-bg-base']};
		--color-bg-surface: ${theme['color-bg-surface']};
		--color-bg-overlay: ${theme['color-bg-overlay']};
		--color-bg-highlight: ${theme['color-bg-highlight']};
		--color-bg-base-dark: ${theme['color-bg-base']};
		--color-bg-surface-dark: ${theme['color-bg-surface']};
		--color-bg-overlay-dark: ${theme['color-bg-overlay']};
		--color-bg-highlight-dark: ${theme['color-bg-highlight']};
		--color-text-primary: ${theme['color-text-primary']};
		--color-text-dark: ${theme['color-text-primary']};
		--color-text-on-primary: ${theme['color-text-on-primary']};
		--color-text-on-dark: ${theme['color-text-on-primary']};
		--color-success: ${theme['color-success']};
		--color-warning: ${theme['color-warning']};
		--color-error: ${theme['color-error']};
		--color-info: ${theme['color-info']};
		--radius-box: ${theme['radius-box']};
		--radius-form: ${theme['radius-form']};
		--radius-small: ${theme['radius-small']};
	`;
};

// 生成暗色层样式：所有 primary 变量都用 dark 的值，背景色和文字色使用主题配置的暗色值
const generateDarkLayerStyles = (theme: (typeof rtdfThemes)[0]) => {
	if (!theme?.['color-primary'] || !theme?.['color-dark']) return '';
	const darkScale = generateColorScale(theme['color-dark']);

	return `
		--color-primary-50: ${darkScale[50]};
		--color-primary-100: ${darkScale[100]};
		--color-primary-200: ${darkScale[200]};
		--color-primary-300: ${darkScale[300]};
		--color-primary-400: ${darkScale[400]};
		--color-primary-500: ${darkScale[500]};
		--color-primary: ${darkScale[600]};
		--color-primary-700: ${darkScale[700]};
		--color-primary-800: ${darkScale[800]};
		--color-primary-900: ${darkScale[900]};
		--color-primary-950: ${darkScale[950]};
		--color-dark-50: ${darkScale[50]};
		--color-dark-100: ${darkScale[100]};
		--color-dark-200: ${darkScale[200]};
		--color-dark-300: ${darkScale[300]};
		--color-dark-400: ${darkScale[400]};
		--color-dark-500: ${darkScale[500]};
		--color-dark: ${darkScale[600]};
		--color-dark-700: ${darkScale[700]};
		--color-dark-800: ${darkScale[800]};
		--color-dark-900: ${darkScale[900]};
		--color-dark-950: ${darkScale[950]};
		--color-bg-base: ${theme['color-bg-base-dark']};
		--color-bg-surface: ${theme['color-bg-surface-dark']};
		--color-bg-overlay: ${theme['color-bg-overlay-dark']};
		--color-bg-highlight: ${theme['color-bg-highlight-dark']};
		--color-bg-base-dark: ${theme['color-bg-base-dark']};
		--color-bg-surface-dark: ${theme['color-bg-surface-dark']};
		--color-bg-overlay-dark: ${theme['color-bg-overlay-dark']};
		--color-bg-highlight-dark: ${theme['color-bg-highlight-dark']};
		--color-text-primary: ${theme['color-text-dark']};
		--color-text-dark: ${theme['color-text-dark']};
		--color-text-on-primary: ${theme['color-text-on-dark']};
		--color-text-on-dark: ${theme['color-text-on-dark']};
		--color-success: ${theme['color-success']};
		--color-warning: ${theme['color-warning']};
		--color-error: ${theme['color-error']};
		--color-info: ${theme['color-info']};
		--radius-box: ${theme['radius-box']};
		--radius-form: ${theme['radius-form']};
		--radius-small: ${theme['radius-small']};
	`;
};

const getRadiusPreview = (value: string) => (value.includes('infinity') ? '9999px' : value);

// 把生成的 CSS 变量字符串解析为 React style 对象（-- 开头的自定义属性）
const parseCssVars = (cssText: string): React.CSSProperties => {
	const styles: Record<string, string> = {};
	for (const rule of cssText.split(';')) {
		const [prop, ...rest] = rule.split(':');
		const key = prop?.trim();
		const value = rest.join(':').trim();
		if (key && value) styles[key] = value;
	}
	return styles as React.CSSProperties;
};

const ThemeSystem = () => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';
	const themeFeatureTags = [
		{ icon: Palette, text: isZh ? 'OKLCH 色彩空间' : 'OKLCH Color Space' },
		{ icon: Gem, text: isZh ? '42 套内置主题' : '42 Built-in Themes' },
		{ icon: SunMoon, text: isZh ? '亮暗双色配置' : 'Light & Dark Colors' },
		{ icon: SlidersHorizontal, text: isZh ? '丰富配置项' : 'Rich Configuration' },
		{ icon: Zap, text: isZh ? '实时主题切换' : 'Real-time Switch' },
		{ icon: WandSparkles, text: isZh ? '自定义主题生成' : 'Custom Theme Generator' }
	];

	// 从 RTDF 导入的内置主题，添加 label 用于显示
	const themes = rtdfThemes.map((t) => ({
		...t,
		label: isZh ? themeLabels[t.name] || t.name : t.name
	}));

	const [currentTheme, setCurrentTheme] = useState(normalizeThemeName(localStorage.getItem('theme_color')));
	const previewRef = useRef<HTMLDivElement | null>(null);
	const [sliderPos, setSliderPos] = useState(50);
	const [isDragging, setIsDragging] = useState(false);
	// 分割方向：x = 左右（宽容器），y = 上下（窄容器）
	const [splitAxis, setSplitAxis] = useState<'x' | 'y'>('x');

	// Loading 随机类型 - 保留 2 个不重复的紧凑示例
	const randomLoadingTypes = useMemo(() => {
		const types = Array.from({ length: 54 }, (_, i) => `1_${i}`);
		const shuffled = types.sort(() => Math.random() - 0.5);
		return shuffled.slice(0, 2);
	}, []);
	const checkboxData = [{ name: 'sync', label: isZh ? '同步' : 'Sync' }];
	const radioData = [{ name: 'auto', label: isZh ? '自动' : 'Auto' }];
	const themeSteps = [
		{ step: { title: isZh ? '选择' : 'Select' } },
		{ step: { title: isZh ? '配置' : 'Configure' } },
		{ step: { title: isZh ? '完成' : 'Done' } }
	];

	// 演示数据
	const [switchActive, setSwitchActive] = useState(true);
	const [cellSwitchActive, setCellSwitchActive] = useState(false);
	const [sliderValue, setSliderValue] = useState(65);
	const [stepperValue, setStepperValue] = useState(3);
	const [inputValue, setInputValue] = useState(isZh ? '主题预览' : 'Theme preview');
	const [checkedChoices, setCheckedChoices] = useState(['sync']);
	const [radioValue, setRadioValue] = useState('auto');

	// 键盘导航相关
	const sectionRef = useRef<HTMLElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	const selectTheme = (name: string) => {
		setCurrentTheme(name);
	};

	// 键盘导航：切换到上一个/下一个主题
	const navigateTheme = (direction: 'prev' | 'next') => {
		const currentIndex = themes.findIndex((t) => t.name === currentTheme);
		let newIndex: number;
		if (direction === 'prev') {
			newIndex = currentIndex <= 0 ? themes.length - 1 : currentIndex - 1;
		} else {
			newIndex = currentIndex >= themes.length - 1 ? 0 : currentIndex + 1;
		}
		setCurrentTheme(themes[newIndex].name);
	};

	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (!isVisible) return;
			// 事件目标在输入框等表单元素内时跳过，避免与组件内部的键盘操作冲突
			if ((e.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]')) return;
			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				navigateTheme('prev');
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				navigateTheme('next');
			}
		};
		// 监听键盘事件
		window.addEventListener('keydown', handleKeydown);

		// 监听区域可见性
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					setIsVisible(entry.isIntersecting);
				});
			},
			{ threshold: 0.3 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			window.removeEventListener('keydown', handleKeydown);
			observer.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible, currentTheme]);

	const currentThemeData = themes.find((t) => t.name === currentTheme) || themes[0];
	const currentThemeIndex = themes.findIndex((theme) => theme.name === currentTheme);

	// 焦点指示器：从当前主题按钮的实际布局位置计算，适配响应式列数
	const gridRef = useRef<HTMLDivElement | null>(null);
	const [themeFocusX, setThemeFocusX] = useState('0px');
	const [themeFocusY, setThemeFocusY] = useState('0px');
	const [themeFocusWidth, setThemeFocusWidth] = useState('0px');
	const [themeFocusHeight, setThemeFocusHeight] = useState('0px');

	const updateThemeFocus = useCallback(() => {
		const option = gridRef.current?.querySelectorAll<HTMLElement>('.theme-option')[currentThemeIndex];
		if (!option) return;
		setThemeFocusX(`${option.offsetLeft}px`);
		setThemeFocusY(`${option.offsetTop}px`);
		setThemeFocusWidth(`${option.offsetWidth}px`);
		setThemeFocusHeight(`${option.offsetHeight}px`);
	}, [currentThemeIndex]);

	useEffect(() => {
		updateThemeFocus();
		window.addEventListener('resize', updateThemeFocus);
		return () => {
			window.removeEventListener('resize', updateThemeFocus);
		};
	}, [updateThemeFocus]);

	// 派生当前主题的所有颜色（用于展示区域）
	const currentThemeColors = (() => {
		if (!currentThemeData?.['color-primary'] || !currentThemeData?.['color-dark']) {
			return {
				primary: '',
				dark: '',
				success: '',
				warning: '',
				error: '',
				info: '',
				bgBase: '',
				bgSurface: '',
				bgOverlay: '',
				bgHighlight: '',
				bgBaseDark: '',
				bgSurfaceDark: '',
				bgOverlayDark: '',
				bgHighlightDark: '',
				textPrimary: '',
				textDark: '',
				textOnPrimary: '',
				textOnDark: '',
				radiusBox: '',
				radiusForm: '',
				radiusSmall: ''
			};
		}
		return {
			// 主题色
			primary: currentThemeData['color-primary'],
			dark: currentThemeData['color-dark'],
			// 功能色
			success: currentThemeData['color-success'],
			warning: currentThemeData['color-warning'],
			error: currentThemeData['color-error'],
			info: currentThemeData['color-info'],
			// 背景色（亮色）- 直接使用主题配置的值
			bgBase: currentThemeData['color-bg-base'],
			bgSurface: currentThemeData['color-bg-surface'],
			bgOverlay: currentThemeData['color-bg-overlay'],
			bgHighlight: currentThemeData['color-bg-highlight'],
			// 背景色（暗色）- 直接使用主题配置的值
			bgBaseDark: currentThemeData['color-bg-base-dark'],
			bgSurfaceDark: currentThemeData['color-bg-surface-dark'],
			bgOverlayDark: currentThemeData['color-bg-overlay-dark'],
			bgHighlightDark: currentThemeData['color-bg-highlight-dark'],
			// 文字色 - 直接使用主题配置的值
			textPrimary: currentThemeData['color-text-primary'],
			textDark: currentThemeData['color-text-dark'],
			textOnPrimary: currentThemeData['color-text-on-primary'],
			textOnDark: currentThemeData['color-text-on-dark'],
			// 圆角（直接从主题配置读取）
			radiusBox: currentThemeData['radius-box'],
			radiusForm: currentThemeData['radius-form'],
			radiusSmall: currentThemeData['radius-small']
		};
	})();

	// 生成亮色层和暗色层各自的样式（完全独立，不受全局主题影响）
	const lightLayerStyles = generateLightLayerStyles(currentThemeData);
	const darkLayerStyles = generateDarkLayerStyles(currentThemeData);

	// 拖动控制
	const startDrag = (e: React.PointerEvent) => {
		setIsDragging(true);
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	};

	const onDrag = (e: React.PointerEvent) => {
		if (!isDragging || !previewRef.current) return;
		const rect = previewRef.current.getBoundingClientRect();
		// 根据分割方向计算百分比，移动端窄屏时扩大拖动范围
		const percent =
			splitAxis === 'y'
				? Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 100, 2), 98)
				: Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 2), 98);
		setSliderPos(percent);
	};

	const endDrag = () => {
		setIsDragging(false);
	};

	// 根据预览容器宽度切换分割方向：窄于 512px 时上下分割，否则左右分割
	useEffect(() => {
		const el = previewRef.current;
		if (!el) return;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setSplitAxis(entry.contentRect.width < 512 ? 'y' : 'x');
			}
		});
		observer.observe(el);
		// 设置初始值（observer 首次回调前兜底）
		setSplitAxis(el.getBoundingClientRect().width < 512 ? 'y' : 'x');
		return () => {
			observer.disconnect();
		};
	}, []);

	// 预览层内容（亮暗两层结构一致）
	const renderPreviewContent = (mode: 'light' | 'dark') => (
		<div className="flex justify-center p-3" style={{ color: mode === 'light' ? 'var(--color-text-primary)' : 'var(--color-text-dark)' }}>
			<div className="flex w-full max-w-100 flex-col gap-2">
				{/* 头部 */}
				<div data-theme-preview-header className="flex items-center gap-3 py-1">
					<Avatar size="sm" image="/assets/images/home/avatar_1.jpg" />
					<div className="flex-1">
						<div className="text-sm font-semibold">{mode === 'light' ? 'Light Mode' : 'Dark Mode'}</div>
						<div className="text-xs opacity-60">{currentThemeData.label}</div>
					</div>
					<Badge text="11">
						<div
							className={mode === 'light' ? 'bg-primary size-7' : 'bg-dark size-7'}
							style={{ borderRadius: 'var(--radius-small)' }}
						></div>
					</Badge>
				</div>

				{/* NoticeBar */}
				<NoticeBar
					textList={[
						isZh
							? '欢迎使用 RTDF 组件库，简单、快速、高效的移动端组件库。支持 React 19，基于 Tailwind CSS 4，祝您使用愉快！'
							: 'Welcome to RTDF, a simple, fast, and efficient mobile component library. Supports React 19, built on Tailwind CSS 4, Enjoy your development!'
					]}
					rightIcon={null}
				/>

				{/* Loading 与选择控件 */}
				<div data-theme-selection-controls className="grid grid-cols-3 items-center gap-2 py-2">
					<div className="flex items-center justify-around">
						{randomLoadingTypes.map((type) => (
							<Loading key={type} type={type} theme />
						))}
					</div>
					<div className="flex justify-center">
						<Checkbox layout="h" data={checkboxData} checkeds={checkedChoices} onChange={setCheckedChoices} />
					</div>
					<div className="flex justify-center">
						<Radio layout="h" data={radioData} value={radioValue} onChange={setRadioValue} />
					</div>
				</div>

				{/* Tab */}
				<Tab labels={[{ text: isZh ? '推荐' : 'For You' }, { text: isZh ? '关注' : 'Follow' }, { text: isZh ? '热门' : 'Hot' }]} />

				{/* Icon */}
				<div className="flex items-center justify-around py-2">
					<Icon name="ri-home-4-line" theme />
					<Icon name="ri-heart-line" theme />
					<Icon name="ri-star-line" theme />
					<Icon name="ri-message-3-line" theme />
					<Icon name="ri-share-forward-line" theme />
				</div>

				{/* Cell */}
				<div>
					<Cell title={isZh ? '个人信息' : 'Profile'} />
					<Cell
						title={isZh ? '消息通知' : 'Notifications'}
						right={{ type: 'switch', switch: { active: cellSwitchActive, onChange: setCellSwitchActive } }}
					/>
				</div>

				{/* 输入框 */}
				<Card
					mx="0"
					my="0"
					p="2"
					shadow="sm"
					border="solid"
					borderWidth="1"
					injClass={mode === 'light' ? 'border-black/5' : 'border-white/10'}
				>
					<Input title={isZh ? '主题名称' : 'Theme name'} value={inputValue} onChange={setInputValue} clear />
				</Card>

				{/* 开关和滑块 */}
				<div className="grid grid-cols-2 gap-2">
					<Card
						mx="0"
						my="0"
						p="3"
						shadow="sm"
						border="solid"
						borderWidth="1"
						injClass={mode === 'light' ? 'border-black/5' : 'border-white/10'}
					>
						<div className="flex justify-center">
							<Switch active={switchActive} onChange={setSwitchActive} />
						</div>
					</Card>
					<Card
						mx="0"
						my="0"
						p="3"
						shadow="sm"
						border="solid"
						borderWidth="1"
						injClass={mode === 'light' ? 'border-black/5' : 'border-white/10'}
					>
						<Slider value={sliderValue} onChange={setSliderValue} showTip="never" />
					</Card>
				</div>

				{/* 进度条与进度环 */}
				<Card
					mx="0"
					my="0"
					p="3"
					shadow="sm"
					border="solid"
					borderWidth="1"
					injClass={mode === 'light' ? 'border-black/5' : 'border-white/10'}
				>
					<div data-theme-progress-preview className="flex min-h-14 items-center justify-center gap-5">
						<div className="w-2/3 min-w-0">
							<Progress percent={75} percentPosition="block" />
						</div>
						<div className="size-14 shrink-0">
							<ProgressLoop percent={75} strokeWidth={4} />
						</div>
					</div>
				</Card>

				{/* 评分和数量 */}
				<div className="grid grid-cols-2 gap-2">
					<Card
						mx="0"
						my="0"
						p="3"
						shadow="sm"
						border="solid"
						borderWidth="1"
						injClass={mode === 'light' ? 'border-black/5' : 'border-white/10'}
					>
						<Rate value={4} height={16} />
					</Card>
					<Card
						mx="0"
						my="0"
						p="3"
						shadow="sm"
						border="solid"
						borderWidth="1"
						injClass={mode === 'light' ? 'border-black/5' : 'border-white/10'}
					>
						<div className="flex justify-center">
							<Stepper value={stepperValue} onChange={setStepperValue} min={1} max={10} />
						</div>
					</Card>
				</div>

				{/* 功能色标签 */}
				<div className="grid grid-cols-4 gap-2">
					<div className="flex justify-center">
						<Tag text={isZh ? '成功' : 'Success'} state="success" fill="light" size="sm" />
					</div>
					<div className="flex justify-center">
						<Tag text={isZh ? '警告' : 'Warning'} state="warning" fill="light" size="sm" />
					</div>
					<div className="flex justify-center">
						<Tag text={isZh ? '错误' : 'Error'} state="error" fill="light" size="sm" />
					</div>
					<div className="flex justify-center">
						<Tag text={isZh ? '信息' : 'Info'} state="info" fill="light" size="sm" />
					</div>
				</div>

				{/* 步骤条 */}
				<Card
					mx="0"
					my="0"
					p="2"
					shadow="sm"
					border="solid"
					borderWidth="1"
					injClass={mode === 'light' ? 'border-black/5' : 'border-white/10'}
				>
					<Steps steps={themeSteps} current={1} radius="full" />
				</Card>

				{/* 按钮组 */}
				<div className="grid grid-cols-2 gap-2">
					<Button fill="base" size="full">
						{isZh ? '确认' : 'Confirm'}
					</Button>
					<Button fill="lineState" size="full">
						{isZh ? '取消' : 'Cancel'}
					</Button>
				</div>
			</div>
		</div>
	);

	return (
		<section ref={sectionRef} className="relative overflow-hidden px-2 py-6 md:p-8">
			<div className="relative z-10 mx-auto">
				<div className="flex flex-col items-stretch gap-8 lg:flex-row lg:gap-8">
					{/* 主题选择器 */}
					<div className="flex w-full min-w-0 flex-1 flex-col gap-4">
						<div className="text-center lg:text-left">
							<div className="flex items-center justify-center gap-2 lg:justify-start">
								<span className="text-xl font-bold text-gray-800 dark:text-gray-200">{isZh ? '42 套内置主题' : '42 Built-in Themes'}</span>
								{/* 键盘提示图标 - 移动端隐藏 */}
								<div className="group relative hidden md:block">
									<svg
										className="size-4 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5H4ZM1 6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V6ZM6 13H8V15H6V13ZM10 13H14V15H10V13ZM16 13H18V15H16V13ZM5 9H7V11H5V9ZM9 9H11V11H9V9ZM13 9H15V11H13V9ZM17 9H19V11H17V9Z" />
									</svg>
									{/* Tooltip */}
									<div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-gray-700">
										{isZh ? '按 ← → 键切换主题' : 'Press ← → to switch themes'}
										<div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
									</div>
								</div>
							</div>
							<div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
								{isZh ? '点击选择，拖动对比亮暗效果' : 'Click to select, drag to compare light/dark'}
							</div>
						</div>

						{/* 主题网格 */}
						<div
							ref={gridRef}
							className="theme-option-grid relative grid grid-cols-3 border-l border-t border-(--site-divider) sm:grid-cols-4 md:grid-cols-6"
						>
							<div
								className="theme-option-focus"
								style={{
									['--theme-focus-x' as string]: themeFocusX,
									['--theme-focus-y' as string]: themeFocusY,
									width: themeFocusWidth,
									height: themeFocusHeight
								}}
								aria-hidden="true"
							>
								<span className="theme-option-corner theme-option-corner-top-left"></span>
								<span className="theme-option-corner theme-option-corner-top-right"></span>
								<span className="theme-option-corner theme-option-corner-bottom-left"></span>
								<span className="theme-option-corner theme-option-corner-bottom-right"></span>
							</div>
							{themes.map((theme) => (
								<button
									key={theme.name}
									onClick={() => selectTheme(theme.name)}
									onFocus={() => selectTheme(theme.name)}
									aria-pressed={currentTheme === theme.name}
									className="theme-option group relative flex flex-col items-center gap-1.5 border-b border-r border-(--site-divider) p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800/50"
									type="button"
								>
									{/* 圆角矩形 - 左浅色背景+亮色，右深色背景+暗色 */}
									<div className="relative flex h-6 w-full overflow-hidden">
										{/* 左侧：浅色背景 + 亮色圆点 */}
										<div className="flex w-1/2 items-center justify-center bg-gray-100">
											<div className="size-2.5 rounded-full" style={{ background: theme['color-primary'] }}></div>
										</div>
										{/* 右侧：深色背景 + 暗色圆点 */}
										<div className="flex w-1/2 items-center justify-center bg-gray-800">
											<div className="size-2.5 rounded-full" style={{ background: theme['color-dark'] }}></div>
										</div>
									</div>

									<span className="text-xs leading-tight text-gray-600 dark:text-gray-400">{theme.label}</span>
								</button>
							))}
						</div>

						{/* 当前主题信息 */}
						<div className="theme-token-panel border border-gray-200/50 bg-transparent p-3 dark:border-gray-700/30">
							{/* 主题色 */}
							<div className="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">{isZh ? '主题色' : 'Theme'}</div>
							<div className="mb-1.5 flex gap-1">
								<div className="h-6 flex-1" style={{ background: currentThemeColors.primary }}></div>
								<div className="h-6 flex-1" style={{ background: currentThemeColors.dark }}></div>
							</div>

							{/* 背景色 */}
							<div className="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">{isZh ? '背景色' : 'Background'}</div>
							<div className="mb-1.5 flex gap-1">
								<div
									className="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
									style={{ background: currentThemeColors.bgBase }}
								></div>
								<div
									className="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
									style={{ background: currentThemeColors.bgSurface }}
								></div>
								<div
									className="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
									style={{ background: currentThemeColors.bgOverlay }}
								></div>
								<div
									className="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
									style={{ background: currentThemeColors.bgHighlight }}
								></div>
								<div
									className="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500"
									style={{ background: currentThemeColors.bgBaseDark }}
								></div>
								<div
									className="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500"
									style={{ background: currentThemeColors.bgSurfaceDark }}
								></div>
								<div
									className="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500"
									style={{ background: currentThemeColors.bgOverlayDark }}
								></div>
								<div
									className="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500"
									style={{ background: currentThemeColors.bgHighlightDark }}
								></div>
							</div>

							{/* 文字色 */}
							<div className="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">{isZh ? '文字色' : 'Text'}</div>
							<div className="mb-1.5 flex gap-1">
								<div
									className="flex h-5 flex-1 items-center justify-center rounded text-xs font-medium"
									style={{ background: currentThemeColors.bgBase, color: currentThemeColors.textPrimary }}
								>
									Aa
								</div>
								<div
									className="flex h-5 flex-1 items-center justify-center rounded text-xs font-medium"
									style={{ background: currentThemeColors.primary, color: currentThemeColors.textOnPrimary }}
								>
									Aa
								</div>
								<div
									className="flex h-5 flex-1 items-center justify-center rounded text-xs font-medium"
									style={{ background: currentThemeColors.bgBaseDark, color: currentThemeColors.textDark }}
								>
									Aa
								</div>
								<div
									className="flex h-5 flex-1 items-center justify-center rounded text-xs font-medium"
									style={{ background: currentThemeColors.dark, color: currentThemeColors.textOnDark }}
								>
									Aa
								</div>
							</div>

							{/* 功能色 */}
							<div className="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">{isZh ? '功能色' : 'Functional'}</div>
							<div className="mb-1.5 flex gap-1">
								<div className="h-5 flex-1 rounded shadow-sm" style={{ background: currentThemeColors.success }}></div>
								<div className="h-5 flex-1 rounded shadow-sm" style={{ background: currentThemeColors.warning }}></div>
								<div className="h-5 flex-1 rounded shadow-sm" style={{ background: currentThemeColors.error }}></div>
								<div className="h-5 flex-1 rounded shadow-sm" style={{ background: currentThemeColors.info }}></div>
							</div>

							{/* 圆角 */}
							<div className="mb-1 text-center text-xs text-gray-500 dark:text-gray-400">{isZh ? '圆角' : 'Radius'}</div>
							<div className="grid grid-cols-3 gap-1.5">
								<div className="theme-radius-option">
									<div className="theme-radius-canvas">
										<div
											className="theme-radius-shape"
											data-site-component-preview
											style={{
												['--theme-radius-color' as string]: currentThemeColors.primary,
												borderRadius: getRadiusPreview(currentThemeColors.radiusBox)
											}}
										></div>
									</div>
									<div className="theme-radius-meta">
										<span>BOX</span>
										<small>{currentThemeColors.radiusBox}</small>
									</div>
								</div>
								<div className="theme-radius-option">
									<div className="theme-radius-canvas">
										<div
											className="theme-radius-shape"
											data-site-component-preview
											style={{
												['--theme-radius-color' as string]: currentThemeColors.primary,
												borderRadius: getRadiusPreview(currentThemeColors.radiusForm)
											}}
										></div>
									</div>
									<div className="theme-radius-meta">
										<span>FORM</span>
										<small>{currentThemeColors.radiusForm}</small>
									</div>
								</div>
								<div className="theme-radius-option">
									<div className="theme-radius-canvas">
										<div
											className="theme-radius-shape"
											data-site-component-preview
											style={{
												['--theme-radius-color' as string]: currentThemeColors.primary,
												borderRadius: getRadiusPreview(currentThemeColors.radiusSmall)
											}}
										></div>
									</div>
									<div className="theme-radius-meta">
										<span>SMALL</span>
										<small>{currentThemeColors.radiusSmall}</small>
									</div>
								</div>
							</div>

							{/* 内置图标方案 */}
							<div className="mt-1.5 text-center text-xs text-gray-500 dark:text-gray-400">{isZh ? '内置图标' : 'Built-in icons'}</div>
							<div
								data-theme-icon-library
								className="flex h-8 items-center justify-center border border-(--site-divider) font-mono text-xs tracking-wider text-(--site-text) uppercase"
							>
								{builtInIconLibraryLabelMap[currentThemeData['built-in-icon-library']!]}
							</div>
						</div>

						{/* 自定义主题链接 */}
						<Link
							to="/generator"
							className="hover:border-primary hover:bg-primary/5 dark:hover:border-dark dark:hover:bg-dark/5 group flex items-center justify-center gap-3 border border-dashed border-gray-200 bg-gray-50/50 p-3 transition-colors dark:border-gray-700 dark:bg-gray-800/50"
						>
							<div className="bg-primary dark:bg-dark flex size-8 items-center justify-center text-white dark:text-black">
								<svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z" />
								</svg>
							</div>
							<div className="flex-1 text-left">
								<div className="text-sm font-medium text-gray-800 dark:text-gray-200">
									{isZh ? '创建自定义主题' : 'Create Custom Theme'}
								</div>
								<div className="text-xs text-gray-500">{isZh ? '使用主题生成器' : 'Use theme generator'}</div>
							</div>
							<svg className="size-4 text-gray-400 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor">
								<path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
							</svg>
						</Link>
					</div>

					{/* 预览区域 - 亮暗对比（使用独立的内联样式，不受全局主题影响） */}
					<div
						ref={previewRef}
						data-site-component-preview
						role="presentation"
						className="relative w-full max-w-130 overflow-hidden border border-gray-200/30 dark:border-white/10"
						onPointerMove={onDrag}
						onPointerUp={endDrag}
						onPointerCancel={endDrag}
						onPointerLeave={endDrag}
					>
						{/* 亮色层 */}
						<div data-mode="light" style={{ ...parseCssVars(lightLayerStyles), backgroundColor: 'var(--color-bg-base)' }}>
							{renderPreviewContent('light')}
						</div>

						{/* 暗色层 */}
						<div
							data-mode="dark"
							className="dark absolute inset-0"
							style={{
								...parseCssVars(darkLayerStyles),
								backgroundColor: 'var(--color-bg-base-dark)',
								clipPath: splitAxis === 'y' ? `inset(${sliderPos}% 0 0 0)` : `inset(0 0 0 ${sliderPos}%)`
							}}
						>
							{renderPreviewContent('dark')}
						</div>

						{/* 分割线手柄 */}
						<div
							className={
								splitAxis === 'y'
									? 'absolute left-0 z-20 h-0.5 w-full -translate-y-1/2 cursor-ns-resize touch-none'
									: 'absolute top-0 z-20 h-full w-0.5 -translate-x-1/2 cursor-ew-resize touch-none'
							}
							style={splitAxis === 'y' ? { top: `${sliderPos}%` } : { left: `${sliderPos}%` }}
							onPointerDown={startDrag}
						>
							<div className="from-primary to-primary-700 absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-linear-to-br shadow-xl transition-transform duration-300 active:scale-110">
								<svg className={`size-4 text-white ${splitAxis === 'y' ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="currentColor">
									<path d="M8 5L3 12L8 19V5ZM16 5V19L21 12L16 5Z" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* 底部特性标签 */}
				<div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2">
					{themeFeatureTags.map((tag) => {
						const FeatureIcon = tag.icon;
						return (
							<span
								key={tag.text}
								className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
							>
								<FeatureIcon size={14} strokeWidth={1.75} absoluteStrokeWidth />
								{tag.text}
							</span>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default ThemeSystem;
