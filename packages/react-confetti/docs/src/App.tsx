import { Fragment, type CSSProperties, type MouseEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { Confetti } from '@any-tdf/react-confetti';
import { createPortal, flushSync } from 'react-dom';
import {
	Braces,
	Code,
	ExternalLink,
	GitFork,
	Languages,
	Monitor,
	Moon,
	MousePointerClick,
	Package,
	Palette,
	Sparkles,
	Sun,
	TableProperties,
	Zap
} from 'lucide-react';

type Locale = 'zh_CN' | 'en_US';
type Theme = 'light' | 'dark' | 'auto';

type Copy = {
	titlePrefix: string;
	intro: string;
	links: {
		source: string;
		package: string;
		basedOn: string;
	};
	language: string;
	demoTitle: string;
	demoIntro: string;
	installTitle: string;
	installIntro: string;
	usageTitle: string;
	usageIntro: string;
	exampleTitle: string;
	propertiesTitle: string;
	propertiesIntro: string;
	reactAdditions: string;
	tableHeaders: {
		property: string;
		defaultValue: string;
		description: string;
	};
	clickBox: string;
	footer: string;
	theme: {
		label: string;
		light: string;
		dark: string;
		auto: string;
	};
	buttons: Record<DemoId, string>;
	sections: Record<SectionId, SectionCopy>;
	props: {
		name: string;
		defaultValue: string;
		description: string;
	}[];
};

type DemoId =
	| 'default'
	| 'lots'
	| 'few'
	| 'large'
	| 'rounded'
	| 'colored'
	| 'multiColored'
	| 'images'
	| 'gradient'
	| 'flag'
	| 'vertical'
	| 'horizontal'
	| 'cone'
	| 'allAround'
	| 'explosion'
	| 'sparkles'
	| 'spray'
	| 'feathered'
	| 'constant'
	| 'fullscreen';

type SectionId = 'spread' | 'amount' | 'shape' | 'size' | 'timing' | 'color' | 'gravity' | 'multiple' | 'styling';

type SectionCopy = {
	title: string;
	description: string;
	examples: {
		label: string;
		code: string;
		node: ReactNode;
		relative?: boolean;
		toggleOnce?: boolean;
	}[];
};

type ToggleConfettiProps = {
	children: ReactNode;
	className?: string;
	label: string;
	relative?: boolean;
	toggleOnce?: boolean;
};

type ClickConfetti = {
	id: number;
	x: number;
	y: number;
};

const colors = {
	react: ['#61dafb', '#58c4dc', '#149eca'],
	primary: ['var(--primary)'],
	multi: ['var(--primary)', 'white', 'green'],
	flag: ['#c8102e', 'white', '#003da5'],
	dutch: ['#c8102e', 'white', '#3350ec'],
	fiveColorArray: ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'],
	differentValues: ['var(--primary)', 'rgba(0, 255, 0, 0.5)', 'white'],
	sparkles: [30, 50] as [number, number],
	gradient: ['linear-gradient(#c8102e, white, #003da5)'],
	docsGradient: ['linear-gradient(var(--primary), blue)'],
	image: [
		'url(https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)',
		'url(https://github.githubassets.com/favicons/favicon-dark.png)'
	]
};

const packageCommands = {
	bun: 'bun add @any-tdf/react-confetti',
	npm: 'npm install @any-tdf/react-confetti',
	pnpm: 'pnpm add @any-tdf/react-confetti',
	yarn: 'yarn add @any-tdf/react-confetti'
};

const snippets = {
	import: `import { Confetti } from '@any-tdf/react-confetti';`,
	default: `<Confetti />`,
	lots: `<Confetti amount={200} />`,
	few: `<Confetti amount={10} />`,
	large: `<Confetti size={20} />`,
	rounded: `<Confetti rounded size={15} />`,
	colored: `<Confetti colorArray={['var(--primary)']} />`,
	multiColored: `<Confetti colorArray={['var(--primary)', 'white', 'green']} />`,
	images: `<Confetti
  size={20}
  colorArray={[
    'url(https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)',
    'url(https://github.githubassets.com/favicons/favicon-dark.png)',
  ]}
/>`,
	gradient: `<Confetti size={20} colorArray={['linear-gradient(#c8102e, white, #003da5)']} />`,
	flag: `<>
  <Confetti y={[1.25, 1.5]} x={[-1, 1]} colorArray={['#c8102e']} />
  <Confetti y={[1, 1.25]} x={[-1, 1]} colorArray={['white']} />
  <Confetti y={[0.75, 1]} x={[-1, 1]} colorArray={['#003da5']} />
</>`,
	vertical: `<Confetti y={[1, 2]} x={[-0.25, 0.25]} />`,
	horizontal: `<Confetti y={[0.25, 0.5]} x={[-4, 4]} />`,
	cone: `<Confetti cone />`,
	allAround: `<Confetti y={[-0.5, 0.5]} x={[-0.5, 0.5]} />`,
	explosion: `<Confetti y={[-1, 1]} x={[-1, 1]} noGravity duration={750} />`,
	sparkles: `<Confetti
  y={[-0.5, 0.5]}
  x={[-0.5, 0.5]}
  colorRange={[30, 50]}
  amount={20}
  fallDistance='0px'
  duration={3000}
  size={4}
/>`,
	spray: `<Confetti delay={[0, 750]} />`,
	feathered: `<>
  <Confetti cone x={[-0.5, 0.5]} />
  <Confetti cone amount={10} x={[-1, -0.4]} y={[0.25, 0.75]} />
  <Confetti cone amount={10} x={[0.4, 1]} y={[0.25, 0.75]} />
</>`,
	constant: `<Confetti infinite amount={20} delay={[0, 500]} />`,
	greenRange: `<Confetti colorRange={[75, 175]} />`,
	colorArray: `<Confetti colorArray={['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']} />`,
	differentValues: `<Confetti colorArray={['var(--primary)', 'rgba(0, 255, 0, 0.5)', 'white']} />`,
	docsGradient: `<Confetti size={20} colorArray={['linear-gradient(var(--primary), blue)']} />`,
	randomColor: `<Confetti colorArray={[\`hsl(\${Math.floor(Math.random() * 360)}, 75%, 50%)\`]} />`,
	slowFall: `<Confetti fallDistance='50px' />`,
	fastFall: `<Confetti fallDistance='200px' />`,
	noFall: `<Confetti fallDistance='0px' />`,
	noGravity: `<Confetti noGravity duration={500} />`,
	noGravityExplosion: `<Confetti noGravity duration={500} x={[-0.5, 0.5]} y={[-0.5, 0.5]} />`,
	smallSpread: `<Confetti xSpread={0.1} />`,
	largeSpread: `<Confetti xSpread={0.4} />`,
	dutch: `<>
  <Confetti y={[1.25, 1.5]} x={[-1, 1]} colorArray={['#c8102e']} />
  <Confetti y={[1, 1.25]} x={[-1, 1]} colorArray={['white']} />
  <Confetti y={[0.75, 1]} x={[-1, 1]} colorArray={['#3350ec']} />
</>`,
	swedish: `<>
  <Confetti y={[0.75, 1.5]} x={[-1, 1]} colorArray={['#3350ec']} amount={100} />
  <Confetti y={[1.05, 1.2]} x={[-1, 1]} colorArray={['#ffcd00']} amount={50} />
  <Confetti y={[0.75, 1.5]} x={[-0.5, -0.25]} colorArray={['#ffcd00']} amount={20} />
</>`,
	usa: `<>
  <Confetti y={[1.15, 1.5]} x={[-1, -0.25]} colorArray={['#3350ec']} amount={100} />
  <Confetti y={[1.2, 1.45]} x={[-0.95, -0.3]} colorArray={['white']} size={5} />
  <Confetti y={[1.45, 1.5]} x={[-0.25, 1]} colorArray={['#bf0d3e']} amount={70} />
  <Confetti y={[1.4, 1.45]} x={[-0.25, 1]} colorArray={['white']} amount={70} />
  <Confetti y={[1.35, 1.4]} x={[-0.25, 1]} colorArray={['#bf0d3e']} amount={70} />
  <Confetti y={[1.3, 1.35]} x={[-0.25, 1]} colorArray={['white']} amount={70} />
  <Confetti y={[1.25, 1.3]} x={[-0.25, 1]} colorArray={['#bf0d3e']} amount={70} />
  <Confetti y={[1.2, 1.25]} x={[-0.25, 1]} colorArray={['white']} amount={70} />
  <Confetti y={[1.15, 1.2]} x={[-0.25, 1]} colorArray={['#bf0d3e']} amount={70} />
  <Confetti y={[1.1, 1.15]} x={[-1, 1]} colorArray={['white']} amount={70} />
  <Confetti y={[1.05, 1.1]} x={[-1, 1]} colorArray={['#bf0d3e']} amount={70} />
  <Confetti y={[1, 1.05]} x={[-1, 1]} colorArray={['white']} amount={70} />
  <Confetti y={[0.95, 1]} x={[-1, 1]} colorArray={['#bf0d3e']} amount={70} />
  <Confetti y={[0.9, 0.95]} x={[-1, 1]} colorArray={['white']} amount={70} />
  <Confetti y={[0.85, 0.9]} x={[-1, 1]} colorArray={['#bf0d3e']} amount={70} />
</>`,
	notFeathered: `<Confetti amount={70} x={[-0.5, 0.5]} />`,
	featheredNoCone: `<>
  <Confetti x={[-0.5, 0.5]} />
  <Confetti amount={10} x={[-0.75, -0.3]} y={[0.15, 0.75]} />
  <Confetti amount={10} x={[0.3, 0.75]} y={[0.15, 0.75]} />
</>`,
	coneAmount: `<Confetti cone amount={70} x={[-0.5, 0.5]} />`,
	featheredCone: `<>
  <Confetti cone x={[-0.5, 0.5]} />
  <Confetti cone amount={10} x={[-0.75, -0.4]} y={[0.15, 0.75]} />
  <Confetti cone amount={10} x={[0.4, 0.75]} y={[0.15, 0.75]} />
</>`,
	featheredDelayed: `<>
  <Confetti x={[-0.5, 0.5]} delay={[0, 250]} />
  <Confetti amount={10} x={[-0.75, -0.3]} y={[0.15, 0.75]} delay={[0, 1000]} />
  <Confetti amount={10} x={[0.3, 0.75]} y={[0.15, 0.75]} delay={[0, 1000]} />
</>`,
	animate: `<>
  <Confetti cone x={[-1, -0.25]} colorRange={[100, 200]} />
  <Confetti cone x={[-0.35, 0.35]} delay={[500, 550]} colorRange={[200, 300]} />
  <Confetti cone x={[0.25, 1]} delay={[250, 300]} colorRange={[100, 200]} />
  <Confetti cone amount={20} x={[-1, 1]} y={[0, 1]} delay={[0, 550]} colorRange={[200, 300]} />
</>`,
	animateExplosion: `<>
  <Confetti noGravity x={[-1, 1]} y={[-1, 1]} delay={[0, 50]} duration={1000} colorRange={[0, 120]} />
  <Confetti noGravity x={[-1, 1]} y={[-1, 1]} delay={[550, 550]} duration={1000} colorRange={[120, 240]} />
  <Confetti noGravity x={[-1, 1]} y={[-1, 1]} delay={[1000, 1050]} duration={1000} colorRange={[240, 360]} />
</>`,
	fullscreen: `<div className='fullscreen-confetti'>
  <Confetti
    x={[-5, 5]}
    y={[0, 0.1]}
    delay={[500, 2000]}
    infinite
    duration={5000}
    amount={200}
    fallDistance='100vh'
  />
</div>`
};

const FlagConfetti = () => (
	<>
		<Confetti y={[1.25, 1.5]} x={[-1, 1]} colorArray={[colors.flag[0]]} />
		<Confetti y={[1, 1.25]} x={[-1, 1]} colorArray={[colors.flag[1]]} />
		<Confetti y={[0.75, 1]} x={[-1, 1]} colorArray={[colors.flag[2]]} />
	</>
);

const DutchFlagConfetti = () => (
	<>
		<Confetti y={[1.25, 1.5]} x={[-1, 1]} colorArray={[colors.dutch[0]]} />
		<Confetti y={[1, 1.25]} x={[-1, 1]} colorArray={[colors.dutch[1]]} />
		<Confetti y={[0.75, 1]} x={[-1, 1]} colorArray={[colors.dutch[2]]} />
	</>
);

const SwedishFlagConfetti = () => (
	<>
		<Confetti y={[0.75, 1.5]} x={[-1, 1]} colorArray={['#3350ec']} amount={100} />
		<Confetti y={[1.05, 1.2]} x={[-1, 1]} colorArray={['#ffcd00']} amount={50} />
		<Confetti y={[0.75, 1.5]} x={[-0.5, -0.25]} colorArray={['#ffcd00']} amount={20} />
	</>
);

const UsaFlagConfetti = () => (
	<>
		<Confetti y={[1.15, 1.5]} x={[-1, -0.25]} colorArray={['#3350ec']} amount={100} />
		<Confetti y={[1.2, 1.45]} x={[-0.95, -0.3]} colorArray={['white']} size={5} />
		<Confetti y={[1.45, 1.5]} x={[-0.25, 1]} colorArray={['#bf0d3e']} amount={70} />
		<Confetti y={[1.4, 1.45]} x={[-0.25, 1]} colorArray={['white']} amount={70} />
		<Confetti y={[1.35, 1.4]} x={[-0.25, 1]} colorArray={['#bf0d3e']} amount={70} />
		<Confetti y={[1.3, 1.35]} x={[-0.25, 1]} colorArray={['white']} amount={70} />
		<Confetti y={[1.25, 1.3]} x={[-0.25, 1]} colorArray={['#bf0d3e']} amount={70} />
		<Confetti y={[1.2, 1.25]} x={[-0.25, 1]} colorArray={['white']} amount={70} />
		<Confetti y={[1.15, 1.2]} x={[-0.25, 1]} colorArray={['#bf0d3e']} amount={70} />
		<Confetti y={[1.1, 1.15]} x={[-1, 1]} colorArray={['white']} amount={70} />
		<Confetti y={[1.05, 1.1]} x={[-1, 1]} colorArray={['#bf0d3e']} amount={70} />
		<Confetti y={[1, 1.05]} x={[-1, 1]} colorArray={['white']} amount={70} />
		<Confetti y={[0.95, 1]} x={[-1, 1]} colorArray={['#bf0d3e']} amount={70} />
		<Confetti y={[0.9, 0.95]} x={[-1, 1]} colorArray={['white']} amount={70} />
		<Confetti y={[0.85, 0.9]} x={[-1, 1]} colorArray={['#bf0d3e']} amount={70} />
	</>
);

const RandomColorConfetti = () => <Confetti colorArray={[`hsl(${Math.floor(Math.random() * 360)}, 75%, 50%)`]} />;

const FeatheredNoConeConfetti = () => (
	<>
		<Confetti x={[-0.5, 0.5]} />
		<Confetti amount={10} x={[-0.75, -0.3]} y={[0.15, 0.75]} />
		<Confetti amount={10} x={[0.3, 0.75]} y={[0.15, 0.75]} />
	</>
);

const FeatheredConfetti = () => (
	<>
		<Confetti cone x={[-0.5, 0.5]} />
		<Confetti cone amount={10} x={[-1, -0.4]} y={[0.25, 0.75]} />
		<Confetti cone amount={10} x={[0.4, 1]} y={[0.25, 0.75]} />
	</>
);

const FeatheredConeDocsConfetti = () => (
	<>
		<Confetti cone x={[-0.5, 0.5]} />
		<Confetti cone amount={10} x={[-0.75, -0.4]} y={[0.15, 0.75]} />
		<Confetti cone amount={10} x={[0.4, 0.75]} y={[0.15, 0.75]} />
	</>
);

const FeatheredDelayedConfetti = () => (
	<>
		<Confetti x={[-0.5, 0.5]} delay={[0, 250]} />
		<Confetti amount={10} x={[-0.75, -0.3]} y={[0.15, 0.75]} delay={[0, 1000]} />
		<Confetti amount={10} x={[0.3, 0.75]} y={[0.15, 0.75]} delay={[0, 1000]} />
	</>
);

const AnimateConfetti = () => (
	<>
		<Confetti cone x={[-1, -0.25]} colorRange={[100, 200]} />
		<Confetti cone x={[-0.35, 0.35]} delay={[500, 550]} colorRange={[200, 300]} />
		<Confetti cone x={[0.25, 1]} delay={[250, 300]} colorRange={[100, 200]} />
		<Confetti cone amount={20} x={[-1, 1]} y={[0, 1]} delay={[0, 550]} colorRange={[200, 300]} />
	</>
);

const AnimateExplosionConfetti = () => (
	<>
		<Confetti noGravity x={[-1, 1]} y={[-1, 1]} delay={[0, 50]} duration={1000} colorRange={[0, 120]} />
		<Confetti noGravity x={[-1, 1]} y={[-1, 1]} delay={[550, 550]} duration={1000} colorRange={[120, 240]} />
		<Confetti noGravity x={[-1, 1]} y={[-1, 1]} delay={[1000, 1050]} duration={1000} colorRange={[240, 360]} />
	</>
);

const SparklesConfetti = () => (
	<Confetti y={[-0.5, 0.5]} x={[-0.5, 0.5]} colorRange={colors.sparkles} amount={20} fallDistance="0px" duration={3000} size={4} />
);

const FullscreenConfetti = () => {
	if (typeof document === 'undefined') return null;
	return createPortal(
		<div className="fullscreen-confetti">
			<Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration={5000} amount={200} fallDistance="100vh" />
		</div>,
		document.body
	);
};

const t: Record<Locale, Copy> = {
	zh_CN: {
		titlePrefix: 'React',
		intro: '给你的 React 应用加一点彩纸氛围。它没有运行时依赖，体积很小。更好的是，它的初始 DOM 可以通过 SSR 渲染出来。',
		links: {
			source: '源码',
			package: '包',
			basedOn: '参考 svelte-confetti'
		},
		language: '语言',
		demoTitle: '示例',
		demoIntro: '点击这些按钮查看效果。大部分都不只是单个开关，而是多个属性的组合。别担心，页面下方会逐个讲到这些属性。',
		installTitle: '安装',
		installIntro: '可以使用 Bun、Yarn、NPM 或 PNPM 安装。',
		usageTitle: '用法',
		usageIntro: '把组件引入你的应用。这些示例里的按钮并不属于 Confetti，它们只是用来演示效果。组件最基础的形态如下。',
		exampleTitle: '示例',
		propertiesTitle: '属性',
		propertiesIntro: '下面列出全部可配置属性。React 版本保留上游核心属性，并额外支持 className 与 style。',
		reactAdditions: 'React 额外能力',
		tableHeaders: {
			property: '属性',
			defaultValue: '默认值',
			description: '说明'
		},
		clickBox: '点我',
		footer: 'Svelte 原版由 Mitchel Jager 制作。',
		theme: {
			label: '主题',
			light: '浅色',
			dark: '深色',
			auto: '自动'
		},
		buttons: {
			default: '默认',
			lots: '很多',
			few: '很少',
			large: '大颗粒',
			rounded: '圆形',
			colored: '单色范围',
			multiColored: '多色',
			images: '图片',
			gradient: '渐变',
			flag: '旗帜',
			vertical: '垂直',
			horizontal: '水平',
			cone: '锥形',
			allAround: '四周',
			explosion: '爆炸',
			sparkles: '闪光',
			spray: '喷射',
			feathered: '轻柔',
			constant: '持续',
			fullscreen: '全屏'
		},
		sections: {
			spread: {
				title: '扩散',
				description:
					'可以调整彩纸的扩散范围。x 和 y 属性用于决定彩纸扩散得多远。两个值都使用倍数，并以包含两个数字的数组传入，较小值在前。每个彩纸颗粒都会在这两个数字之间随机取值。数字越大，扩散越远。负数会影响方向。',
				examples: [
					{ label: '默认', code: snippets.default, node: <Confetti /> },
					{ label: '向左', code: `<Confetti x={[-1, -0.25]} y={[0, 0.5]} />`, node: <Confetti x={[-1, -0.25]} y={[0, 0.5]} /> },
					{ label: '向右', code: `<Confetti x={[0.25, 1]} y={[0, 0.5]} />`, node: <Confetti x={[0.25, 1]} y={[0, 0.5]} /> },
					{ label: '向上', code: `<Confetti x={[-0.25, 0.25]} y={[0.75, 1.5]} />`, node: <Confetti x={[-0.25, 0.25]} y={[0.75, 1.5]} /> },
					{
						label: '向下',
						code: `<Confetti x={[-0.25, 0.25]} y={[-0.75, -0.25]} />`,
						node: <Confetti x={[-0.25, 0.25]} y={[-0.75, -0.25]} />
					},
					{ label: '四周', code: snippets.allAround, node: <Confetti x={[-0.5, 0.5]} y={[-0.5, 0.5]} /> }
				]
			},
			amount: {
				title: '数量',
				description:
					'可以用 amount 属性调整发射的颗粒数量。它应该始终是整数。数量过高可能会影响性能，具体取决于设备和页面上其他消耗性能的元素，但建议保持在 500 以下。',
				examples: [
					{ label: '很少', code: snippets.few, node: <Confetti amount={10} /> },
					{ label: '默认', code: `<Confetti amount={50} />`, node: <Confetti amount={50} /> },
					{ label: '很多', code: snippets.lots, node: <Confetti amount={200} /> },
					{ label: '过多', code: `<Confetti amount={500} />`, node: <Confetti amount={500} /> }
				]
			},
			shape: {
				title: '形状',
				description:
					'如前面的按钮所示，彩纸整体会呈现比较方正的形状。使用 cone 属性可以稍微缓解这一点，让彩纸以更接近锥形的方式喷出，在大量颗粒时尤其好看。侧向发射时这个属性也很有效，不过需要用更大的 x 倍数来补偿。锥形仍然会有明显轮廓，后面的文档会展示如何弱化这种轮廓。',
				examples: [
					{ label: '默认', code: `<Confetti amount={200} />`, node: <Confetti amount={200} /> },
					{ label: '锥形', code: `<Confetti cone amount={200} />`, node: <Confetti cone amount={200} /> },
					{ label: '向右', code: `<Confetti x={[0.25, 1]} y={[0, 0.5]} />`, node: <Confetti x={[0.25, 1]} y={[0, 0.5]} /> },
					{
						label: '向右锥形',
						code: `<Confetti cone x={[1, 2.5]} y={[0.25, 0.75]} />`,
						node: <Confetti cone x={[1, 2.5]} y={[0.25, 0.75]} />
					}
				]
			},
			size: {
				title: '尺寸',
				description: '可以用 size 属性调整彩纸颗粒的尺寸。也可以用 rounded 属性调整彩纸颗粒的形状。',
				examples: [
					{ label: '细小', code: `<Confetti size={2} />`, node: <Confetti size={2} /> },
					{ label: '巨大', code: `<Confetti size={30} />`, node: <Confetti size={30} /> },
					{ label: '圆形巨大', code: `<Confetti rounded size={30} />`, node: <Confetti rounded size={30} /> }
				]
			},
			timing: {
				title: '时间',
				description:
					'默认情况下，所有彩纸几乎会在同一时间喷出。会有一点随机差异，但视觉上接近瞬间发射，这就是彩纸礼炮的效果。可以通过调整 delay 属性的范围来改变每个颗粒发射的时间，delay 使用毫秒。也可以设置 infinite 让动画无限播放，此时 delay 主要影响首次生成时的节奏。或者使用 iterationCount 让动画完整播放若干次后再结束，它接受数字，也可以是 "infinite"，本质上可以传入 CSS animation-iteration-count 支持的值。',
				examples: [
					{ label: '短延迟', code: `<Confetti delay={[0, 250]} />`, node: <Confetti delay={[0, 250]} /> },
					{ label: '长延迟', code: `<Confetti delay={[0, 1500]} />`, node: <Confetti delay={[0, 1500]} /> },
					{ label: '无限', code: `<Confetti infinite />`, node: <Confetti infinite />, toggleOnce: true },
					{
						label: '无限长延迟',
						code: `<Confetti infinite delay={[0, 1500]} />`,
						node: <Confetti infinite delay={[0, 1500]} />,
						toggleOnce: true
					},
					{
						label: '迭代无限',
						code: `<Confetti iterationCount="infinite" />`,
						node: <Confetti iterationCount="infinite" />,
						toggleOnce: true
					}
				]
			},
			color: {
				title: '颜色',
				description:
					'可以用多种方式调整彩纸颜色。colorRange 会在 HSL 色相上取值，饱和度为 75%，亮度为 50%。0-360 代表所有颜色，75-175 则只会得到绿色系。也可以用 colorArray 指定颜色数组，它接受任何 CSS background 属性可用的值，包括 RGB、HEX、HSL、渐变和图片。也可以在组件每次挂载时生成随机颜色。',
				examples: [
					{ label: '绿色范围', code: snippets.greenRange, node: <Confetti colorRange={[75, 175]} /> },
					{ label: '数组', code: snippets.colorArray, node: <Confetti colorArray={colors.fiveColorArray} /> },
					{ label: '不同值', code: snippets.differentValues, node: <Confetti colorArray={colors.differentValues} /> },
					{ label: '渐变', code: snippets.docsGradient, node: <Confetti size={20} colorArray={colors.docsGradient} /> },
					{ label: '图片', code: snippets.images, node: <Confetti size={20} colorArray={colors.image} /> },
					{ label: '随机', code: snippets.randomColor, node: <RandomColorConfetti /> }
				]
			},
			gravity: {
				title: '重力',
				description:
					'可以用 fallDistance 属性改变彩纸如何下落，让它下落得更快、更慢，或者完全不下落。这个属性接受任何有效的 CSS 长度值，但不能只写 0，应该写成 0px。也可以设置 noGravity 来禁用重力和空气阻力，让颗粒以恒定速度移动。xSpread 控制颗粒在最高点前后的横向扩散程度，通常取 0 到 1 之间的数字，但传入更高或更低的值也会产生一些特殊效果。',
				examples: [
					{ label: '慢速下落', code: snippets.slowFall, node: <Confetti fallDistance="50px" /> },
					{ label: '快速下落', code: snippets.fastFall, node: <Confetti fallDistance="200px" /> },
					{ label: '不下落', code: snippets.noFall, node: <Confetti fallDistance="0px" /> },
					{ label: '无重力', code: snippets.noGravity, node: <Confetti noGravity duration={500} /> },
					{
						label: '无重力爆炸',
						code: snippets.noGravityExplosion,
						node: <Confetti noGravity duration={500} x={[-0.5, 0.5]} y={[-0.5, 0.5]} />
					},
					{ label: '小扩散', code: snippets.smallSpread, node: <Confetti xSpread={0.1} /> },
					{ label: '大扩散', code: snippets.largeSpread, node: <Confetti xSpread={0.4} /> }
				]
			},
			multiple: {
				title: '多个组件',
				description:
					'可以组合多个 Confetti 组件来创造有趣效果。例如，可以把多个组件按不同颜色和不同区域组合成旗帜。旗帜很酷，但我们还能做更多事情。这个示例会把初始效果“羽化”，让形状没那么明确。默认效果会有比较清晰的轮廓，尤其在使用大量颗粒时会稍微破坏效果。也可以把多个组件组合成动画。',
				examples: [
					{ label: '荷兰', code: snippets.dutch, node: <DutchFlagConfetti /> },
					{ label: '瑞典', code: snippets.swedish, node: <SwedishFlagConfetti /> },
					{ label: '美国', code: snippets.usa, node: <UsaFlagConfetti /> },
					{ label: '未羽化', code: snippets.notFeathered, node: <Confetti amount={70} x={[-0.5, 0.5]} /> },
					{ label: '羽化', code: snippets.featheredNoCone, node: <FeatheredNoConeConfetti /> },
					{ label: '锥形', code: snippets.coneAmount, node: <Confetti cone amount={70} x={[-0.5, 0.5]} /> },
					{ label: '羽化锥形', code: snippets.featheredCone, node: <FeatheredConeDocsConfetti /> },
					{ label: '羽化延迟', code: snippets.featheredDelayed, node: <FeatheredDelayedConfetti /> },
					{ label: '动画', code: snippets.animate, node: <AnimateConfetti /> },
					{ label: '爆炸动画', code: snippets.animateExplosion, node: <AnimateExplosionConfetti /> }
				]
			},
			styling: {
				title: '更多样式',
				description:
					'现在已经看过所有不同属性了。因为这个效果只是 HTML 和 CSS，所以你可以继续按自己的方式设置样式。全屏效果不是一个简单开关，但只需要一小段 CSS。容器固定定位，并放在屏幕外一点，这样看不到彩纸生成的位置。fallDistance 设置为 100vh，所以彩纸会覆盖整屏。React 版本还会把 className 与 style 传到 holder 上。',
				examples: [
					{ label: '全屏', code: snippets.fullscreen, node: <FullscreenConfetti />, relative: false, toggleOnce: true },
					{
						label: '自定义 class',
						code: `<Confetti className="my-confetti" style={{ transform: 'translateX(2rem)' }} />`,
						node: <Confetti className="mover" style={{ transform: 'translateX(2rem)' }} />
					}
				]
			}
		},
		props: [
			{ name: 'size', defaultValue: '10', description: '单个彩纸颗粒的最大尺寸，单位为 px。' },
			{
				name: 'x',
				defaultValue: '[-0.5, 0.5]',
				description: '彩纸颗粒的最大水平范围。负数向左，正数向右。[-1, 1] 表示最多向左 200px、向右 200px。'
			},
			{
				name: 'y',
				defaultValue: '[0.25, 1]',
				description: '彩纸颗粒的最大垂直范围。负数向下，正数向上。[-1, 1] 表示最多向下 200px、向上 200px。'
			},
			{ name: 'duration', defaultValue: '2000', description: '每个独立颗粒的动画时长。' },
			{ name: 'infinite', defaultValue: 'false', description: '设为 true 时动画会无限播放。' },
			{ name: 'delay', defaultValue: '[0, 50]', description: '用于给每个颗粒设置随机延迟。两个数字差距越大，喷射时间越长。' },
			{
				name: 'colorRange',
				defaultValue: '[0, 360]',
				description: 'HSL 色轮上的颜色范围。0 到 360 是完整 RGB，75 到 150 只会得到绿色系。'
			},
			{
				name: 'colorArray',
				defaultValue: '[]',
				description: '可以从数组中随机取色。只放一个元素就会得到单色。接受任何有效的 CSS background 属性，包括渐变和图片。'
			},
			{ name: 'amount', defaultValue: '50', description: '生成的颗粒数量。喷射范围越大，可能需要越多颗粒。数量太多可能影响性能。' },
			{ name: 'iterationCount', defaultValue: '1', description: '动画停止前播放的次数。会被 infinite 属性覆盖。' },
			{
				name: 'fallDistance',
				defaultValue: '100px',
				description: '每个颗粒下落的距离。接受 px、rem、vh 等任何 CSS 长度值，但不能只写 0。'
			},
			{ name: 'rounded', defaultValue: 'false', description: '设为 true 时，每个彩纸颗粒会变成圆形。' },
			{ name: 'cone', defaultValue: 'false', description: '设为 true 时，爆发会呈现更像锥形的形状，在大量颗粒时更真实。' },
			{ name: 'noGravity', defaultValue: 'false', description: '设为 true 时，颗粒会以恒定速度加速，不再向下“坠落”，效果更像爆炸。' },
			{
				name: 'xSpread',
				defaultValue: '0.15',
				description: '决定颗粒横向扩散程度的数字。值越低，最高点附近的 x 和结束位置附近的 x 越接近。'
			},
			{ name: 'destroyOnComplete', defaultValue: 'true', description: '默认动画完成后会移除元素。设为 false 可以阻止这个行为。' },
			{ name: 'disableForReducedMotion', defaultValue: 'false', description: '为偏好减少动态效果的用户禁用动画。' },
			{ name: 'className', defaultValue: "''", description: 'React 额外能力：追加到 holder 的类名。' },
			{ name: 'style', defaultValue: 'undefined', description: 'React 额外能力：追加到 holder 的内联样式。' }
		]
	},
	en_US: {
		titlePrefix: 'React',
		intro:
			'Add a little bit of flair to your React app with some confetti. There are no runtime dependencies and it is tiny in size. Even better, the initial DOM can be rendered with SSR.',
		links: {
			source: 'Source',
			package: 'Package',
			basedOn: 'Based on svelte-confetti'
		},
		language: 'Language',
		demoTitle: 'Demo',
		demoIntro:
			'Click these buttons to see their effect. Most of these are not just a single toggle, they are a combination of multiple props. The documentation below goes through each one.',
		installTitle: 'Installation',
		installIntro: 'Install using Bun, Yarn, NPM, or PNPM.',
		usageTitle: 'Usage',
		usageIntro:
			'Include the component in your app. The buttons in these examples are not part of Confetti; they are only used to demonstrate the effect. The component in its most basic form is shown below.',
		exampleTitle: 'Examples',
		propertiesTitle: 'Properties',
		propertiesIntro:
			'This is a list of all configurable properties. The React version keeps the upstream core props and adds className plus style.',
		reactAdditions: 'React additions',
		tableHeaders: {
			property: 'Property',
			defaultValue: 'Default',
			description: 'Description'
		},
		clickBox: 'Click in me',
		footer: 'Original Svelte version made by Mitchel Jager.',
		theme: {
			label: 'Theme',
			light: 'Light',
			dark: 'Dark',
			auto: 'Auto'
		},
		buttons: {
			default: 'Default',
			lots: 'Lots',
			few: 'Few',
			large: 'Large',
			rounded: 'Rounded',
			colored: 'Colored',
			multiColored: 'Multi Colored',
			images: 'Images',
			gradient: 'Gradient',
			flag: 'Flag',
			vertical: 'Vertical',
			horizontal: 'Horizontal',
			cone: 'Cone',
			allAround: 'All around',
			explosion: 'Explosion',
			sparkles: 'Sparkles',
			spray: 'Spray',
			feathered: 'Feathered',
			constant: 'Constant',
			fullscreen: 'Fullscreen'
		},
		sections: {
			spread: {
				title: 'Spread',
				description:
					'The spread of confetti can be adjusted. The x and y props decide how far the confetti spreads. Both values are multipliers passed as a two-number array, with the smaller value first. Each piece gets a random value between those numbers. Higher numbers spread farther, and negative numbers affect direction.',
				examples: [
					{ label: 'Default', code: snippets.default, node: <Confetti /> },
					{ label: 'Left', code: `<Confetti x={[-1, -0.25]} y={[0, 0.5]} />`, node: <Confetti x={[-1, -0.25]} y={[0, 0.5]} /> },
					{ label: 'Right', code: `<Confetti x={[0.25, 1]} y={[0, 0.5]} />`, node: <Confetti x={[0.25, 1]} y={[0, 0.5]} /> },
					{ label: 'Up', code: `<Confetti x={[-0.25, 0.25]} y={[0.75, 1.5]} />`, node: <Confetti x={[-0.25, 0.25]} y={[0.75, 1.5]} /> },
					{
						label: 'Down',
						code: `<Confetti x={[-0.25, 0.25]} y={[-0.75, -0.25]} />`,
						node: <Confetti x={[-0.25, 0.25]} y={[-0.75, -0.25]} />
					},
					{ label: 'Everywhere', code: snippets.allAround, node: <Confetti x={[-0.5, 0.5]} y={[-0.5, 0.5]} /> }
				]
			},
			amount: {
				title: 'Amount',
				description:
					'The amount of particles that are launched can be adjusted with the amount property. It should always be an integer. Too many particles can affect performance depending on the device and the rest of the page, so try to keep it below 500.',
				examples: [
					{ label: 'Few', code: snippets.few, node: <Confetti amount={10} /> },
					{ label: 'Default', code: `<Confetti amount={50} />`, node: <Confetti amount={50} /> },
					{ label: 'Lots', code: snippets.lots, node: <Confetti amount={200} /> },
					{ label: 'Too many', code: `<Confetti amount={500} />`, node: <Confetti amount={500} /> }
				]
			},
			shape: {
				title: 'Shape',
				description:
					'As shown in the demo buttons, the confetti has a fairly square shape. The cone property mitigates that by launching pieces in a more cone-like shape, which looks especially good with many pieces. It also works well for sideward bursts, though a larger x multiplier helps compensate. The cone still has a visible shape; later examples show how to soften it.',
				examples: [
					{ label: 'Default', code: `<Confetti amount={200} />`, node: <Confetti amount={200} /> },
					{ label: 'Cone', code: `<Confetti cone amount={200} />`, node: <Confetti cone amount={200} /> },
					{ label: 'Right', code: `<Confetti x={[0.25, 1]} y={[0, 0.5]} />`, node: <Confetti x={[0.25, 1]} y={[0, 0.5]} /> },
					{
						label: 'Right Cone',
						code: `<Confetti cone x={[1, 2.5]} y={[0.25, 0.75]} />`,
						node: <Confetti cone x={[1, 2.5]} y={[0.25, 0.75]} />
					}
				]
			},
			size: {
				title: 'Size',
				description:
					'The size of the confetti pieces can be adjusted using the size property. The shape of the individual pieces can also be changed with the rounded property.',
				examples: [
					{ label: 'Tiny', code: `<Confetti size={2} />`, node: <Confetti size={2} /> },
					{ label: 'Huge', code: `<Confetti size={30} />`, node: <Confetti size={30} /> },
					{ label: 'Round', code: `<Confetti rounded size={30} />`, node: <Confetti rounded size={30} /> }
				]
			},
			timing: {
				title: 'Timing',
				description:
					'By default, all confetti pieces launch at about the same time. There is a small random difference, but visually it feels like an instant cannon. Change the delay range to control when each piece launches. Delay is measured in milliseconds. You can also set infinite to loop forever, or use iterationCount to play the full animation a set number of times before stopping.',
				examples: [
					{ label: 'Short delay', code: `<Confetti delay={[0, 250]} />`, node: <Confetti delay={[0, 250]} /> },
					{ label: 'Long delay', code: `<Confetti delay={[0, 1500]} />`, node: <Confetti delay={[0, 1500]} /> },
					{ label: 'Default', code: `<Confetti infinite />`, node: <Confetti infinite />, toggleOnce: true },
					{
						label: 'Long delay',
						code: `<Confetti infinite delay={[0, 1500]} />`,
						node: <Confetti infinite delay={[0, 1500]} />,
						toggleOnce: true
					},
					{
						label: 'Infinite',
						code: `<Confetti iterationCount="infinite" />`,
						node: <Confetti iterationCount="infinite" />,
						toggleOnce: true
					}
				]
			},
			color: {
				title: 'Color',
				description:
					'There are multiple ways to adjust the colors. colorRange chooses from the HSL hue wheel with 75% saturation and 50% lightness. 0 to 360 covers the full RGB range, while 75 to 175 gives green colors. colorArray can supply any value accepted by the CSS background property, including RGB, HEX, HSL, gradients, and images. You can also generate a random color each time the component mounts.',
				examples: [
					{ label: 'Green range', code: snippets.greenRange, node: <Confetti colorRange={[75, 175]} /> },
					{ label: 'Array', code: snippets.colorArray, node: <Confetti colorArray={colors.fiveColorArray} /> },
					{ label: 'Different values', code: snippets.differentValues, node: <Confetti colorArray={colors.differentValues} /> },
					{ label: 'Gradient', code: snippets.docsGradient, node: <Confetti size={20} colorArray={colors.docsGradient} /> },
					{ label: 'Images', code: snippets.images, node: <Confetti size={20} colorArray={colors.image} /> },
					{ label: 'Random', code: snippets.randomColor, node: <RandomColorConfetti /> }
				]
			},
			gravity: {
				title: 'Gravity',
				description:
					'Use fallDistance to change how the confetti falls: slower, faster, or not at all. The value accepts any valid CSS length, but use 0px instead of bare 0. noGravity disables gravity and air resistance so pieces move at a constant speed, which feels more like an explosion. xSpread controls how far the pieces drift horizontally around their highest point.',
				examples: [
					{ label: 'Slow fall', code: snippets.slowFall, node: <Confetti fallDistance="50px" /> },
					{ label: 'Fast fall', code: snippets.fastFall, node: <Confetti fallDistance="200px" /> },
					{ label: 'No fall', code: snippets.noFall, node: <Confetti fallDistance="0px" /> },
					{ label: 'No gravity', code: snippets.noGravity, node: <Confetti noGravity duration={500} /> },
					{
						label: 'No gravity explosion',
						code: snippets.noGravityExplosion,
						node: <Confetti noGravity duration={500} x={[-0.5, 0.5]} y={[-0.5, 0.5]} />
					},
					{ label: 'Small spread', code: snippets.smallSpread, node: <Confetti xSpread={0.1} /> },
					{ label: 'Large spread', code: snippets.largeSpread, node: <Confetti xSpread={0.4} /> }
				]
			},
			multiple: {
				title: 'Multiple components',
				description:
					'Multiple Confetti components can be combined to create interesting effects. For example, several components with different colors and ranges can form flags. The same approach can feather the initial shape so it feels less blocky, or stack delayed components into a simple animation.',
				examples: [
					{ label: 'Dutch', code: snippets.dutch, node: <DutchFlagConfetti /> },
					{ label: 'Swedish', code: snippets.swedish, node: <SwedishFlagConfetti /> },
					{ label: 'USA', code: snippets.usa, node: <UsaFlagConfetti /> },
					{ label: 'Not feathered', code: snippets.notFeathered, node: <Confetti amount={70} x={[-0.5, 0.5]} /> },
					{ label: 'Feathered', code: snippets.featheredNoCone, node: <FeatheredNoConeConfetti /> },
					{ label: 'Cone', code: snippets.coneAmount, node: <Confetti cone amount={70} x={[-0.5, 0.5]} /> },
					{ label: 'Feathered cone', code: snippets.featheredCone, node: <FeatheredConeDocsConfetti /> },
					{ label: 'Feathered and delayed', code: snippets.featheredDelayed, node: <FeatheredDelayedConfetti /> },
					{ label: 'Animate', code: snippets.animate, node: <AnimateConfetti /> },
					{ label: 'Animate explosion', code: snippets.animateExplosion, node: <AnimateExplosionConfetti /> }
				]
			},
			styling: {
				title: 'Styling further',
				description:
					'Now that all properties have been covered, the effect can be styled further because it is just HTML and CSS. The fullscreen example is not a single toggle; it uses a small fixed container placed slightly off screen so the spawn point is hidden. fallDistance is set to 100vh so the pieces cover the full viewport. The React port also applies className and style to the holder.',
				examples: [
					{ label: 'Fullscreen', code: snippets.fullscreen, node: <FullscreenConfetti />, relative: false, toggleOnce: true },
					{
						label: 'Custom class',
						code: `<Confetti className="my-confetti" style={{ transform: 'translateX(2rem)' }} />`,
						node: <Confetti className="mover" style={{ transform: 'translateX(2rem)' }} />
					}
				]
			}
		},
		props: [
			{ name: 'size', defaultValue: '10', description: 'Maximum size in pixels of individual confetti pieces.' },
			{
				name: 'x',
				defaultValue: '[-0.5, 0.5]',
				description:
					'Maximum horizontal range for the confetti pieces. Negative values move left and positive values move right. [-1, 1] means up to 200px left or right.'
			},
			{
				name: 'y',
				defaultValue: '[0.25, 1]',
				description:
					'Maximum vertical range for the confetti pieces. Negative values move down and positive values move up. [-1, 1] means up to 200px down or up.'
			},
			{ name: 'duration', defaultValue: '2000', description: 'Duration of the animation for each individual piece.' },
			{ name: 'infinite', defaultValue: 'false', description: 'If set to true, the animation plays indefinitely.' },
			{
				name: 'delay',
				defaultValue: '[0, 50]',
				description: 'Random delay for each piece. A larger difference between the two numbers creates a longer spray.'
			},
			{
				name: 'colorRange',
				defaultValue: '[0, 360]',
				description: 'Color range on the HSL wheel. 0 to 360 is the full RGB range, while 75 to 150 gives green colors.'
			},
			{
				name: 'colorArray',
				defaultValue: '[]',
				description:
					'Randomly selects colors from the array. A single element creates one color. Accepts any CSS background value, including gradients and images.'
			},
			{
				name: 'amount',
				defaultValue: '50',
				description: 'Amount of particles spawned. A larger spray may need more particles, but too many can affect performance.'
			},
			{ name: 'iterationCount', defaultValue: '1', description: 'How many times the animation plays. This is overwritten by infinite.' },
			{
				name: 'fallDistance',
				defaultValue: '100px',
				description: 'How far each piece falls. Accepts px, rem, vh, and other CSS length values, but not a bare 0.'
			},
			{ name: 'rounded', defaultValue: 'false', description: 'If set to true, every confetti piece becomes round.' },
			{
				name: 'cone',
				defaultValue: 'false',
				description: 'If set to true, the burst has a more cone-like shape, which looks more realistic with many pieces.'
			},
			{
				name: 'noGravity',
				defaultValue: 'false',
				description: 'If set to true, pieces move at a constant speed instead of falling downward, creating a more explosive effect.'
			},
			{
				name: 'xSpread',
				defaultValue: '0.15',
				description:
					'Controls horizontal spread around the highest point. Lower values keep the peak x position closer to the ending x position.'
			},
			{
				name: 'destroyOnComplete',
				defaultValue: 'true',
				description: 'Removes the DOM after the animation completes. Set to false to keep the elements mounted.'
			},
			{
				name: 'disableForReducedMotion',
				defaultValue: 'false',
				description: 'Disables the animation for users who prefer reduced motion.'
			},
			{ name: 'className', defaultValue: "''", description: 'React addition: class added to the holder.' },
			{ name: 'style', defaultValue: 'undefined', description: 'React addition: inline style added to the holder.' }
		]
	}
};

const getInitialLocale = (): Locale => {
	if (typeof window === 'undefined') return 'zh_CN';
	const params = new URLSearchParams(window.location.search);
	return params.get('lang') === 'en_US' ? 'en_US' : 'zh_CN';
};

const isTheme = (value: string | null): value is Theme => value === 'light' || value === 'dark' || value === 'auto';

const getInitialTheme = (): Theme => {
	if (typeof window === 'undefined') return 'auto';
	const savedTheme = window.localStorage.getItem('react-confetti-theme');
	return isTheme(savedTheme) ? savedTheme : 'auto';
};

const setLocaleQuery = (locale: Locale) => {
	const url = new URL(window.location.href);
	url.searchParams.set('lang', locale);
	window.history.replaceState(null, '', url);
};

const setDocumentTheme = (theme: Theme) => {
	document.documentElement.dataset.theme = theme;
	document.documentElement.style.colorScheme = theme === 'auto' ? 'light dark' : theme;
	window.localStorage.setItem('react-confetti-theme', theme);
};

const SectionTitle = ({ children, icon }: { children: ReactNode; icon: ReactNode }) => (
	<div className="section-heading">
		<span className="icon-chip">{icon}</span>
		<h2>{children}</h2>
	</div>
);

const SmallHeading = ({ children, icon }: { children: ReactNode; icon: ReactNode }) => (
	<div className="small-heading">
		<span className="icon-chip small">{icon}</span>
		<h3>{children}</h3>
	</div>
);

const ToggleConfetti = ({ children, className = '', label, relative = true, toggleOnce = false }: ToggleConfettiProps) => {
	const [active, setActive] = useState(false);
	const [version, setVersion] = useState(0);

	const handleClick = () => {
		if (toggleOnce) {
			setActive((current) => !current);
			return;
		}
		flushSync(() => setActive(false));
		setVersion((current) => current + 1);
		setActive(true);
	};

	return (
		<span className={`confetti-toggle ${relative ? 'relative' : ''} ${className}`} onClick={handleClick}>
			<button type="button">{label}</button>
			{active ? (
				<span key={version} className="confetti">
					{children}
				</span>
			) : null}
		</span>
	);
};

const DemoButton = ({
	label,
	children,
	relative = true,
	toggleOnce = false
}: {
	label: string;
	children: ReactNode;
	relative?: boolean;
	toggleOnce?: boolean;
}) => (
	<ToggleConfetti label={label} relative={relative} toggleOnce={toggleOnce}>
		{children}
	</ToggleConfetti>
);

const ConfettiOnClick = ({ label }: { label: string }) => {
	const [items, setItems] = useState<ClickConfetti[]>([]);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		const bounds = event.currentTarget.getBoundingClientRect();
		setItems((current) => [
			...current,
			{
				id: Date.now() + Math.random(),
				x: event.clientX - bounds.left,
				y: event.clientY - bounds.top
			}
		]);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setItems([]), 2000);
	};

	useEffect(
		() => () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		},
		[]
	);

	return (
		<div className="box" onClick={handleClick}>
			<span>{label}</span>
			{items.map((item) => {
				const style = {
					left: `${item.x}px`,
					top: `${item.y}px`
				} satisfies CSSProperties;
				return (
					<span key={item.id} className="click-confetti" style={style}>
						<Confetti amount={10} y={[-0.5, 0.5]} fallDistance="20px" duration={2000} />
					</span>
				);
			})}
		</div>
	);
};

const CodeWell = ({ children }: { children: string }) => <code className="well">{children}</code>;

const PackageTabs = () => {
	const [manager, setManager] = useState<keyof typeof packageCommands>('bun');
	return (
		<div className="has-tabs">
			<div className="tabs" role="tablist" aria-label="Package manager">
				{Object.keys(packageCommands).map((key) => (
					<button
						key={key}
						type="button"
						className={manager === key ? 'tab active' : 'tab'}
						onClick={() => setManager(key as keyof typeof packageCommands)}
					>
						{key}
					</button>
				))}
			</div>
			<CodeWell>{packageCommands[manager]}</CodeWell>
		</div>
	);
};

const sectionIcons: Record<SectionId, ReactNode> = {
	spread: <Sparkles aria-hidden="true" size={18} />,
	amount: <Braces aria-hidden="true" size={18} />,
	shape: <Palette aria-hidden="true" size={18} />,
	size: <Code aria-hidden="true" size={18} />,
	timing: <Zap aria-hidden="true" size={18} />,
	color: <Palette aria-hidden="true" size={18} />,
	gravity: <MousePointerClick aria-hidden="true" size={18} />,
	multiple: <Sparkles aria-hidden="true" size={18} />,
	styling: <Code aria-hidden="true" size={18} />
};

const ThemeSwitch = ({ copy, theme, onChange }: { copy: Copy; theme: Theme; onChange: (theme: Theme) => void }) => {
	const options = [
		{ value: 'light', label: copy.theme.light, icon: <Sun aria-hidden="true" size={15} /> },
		{ value: 'dark', label: copy.theme.dark, icon: <Moon aria-hidden="true" size={15} /> },
		{ value: 'auto', label: copy.theme.auto, icon: <Monitor aria-hidden="true" size={15} /> }
	] satisfies { value: Theme; label: string; icon: ReactNode }[];

	return (
		<div className="theme-switch" aria-label={copy.theme.label}>
			{options.map((option) => (
				<button key={option.value} type="button" className={theme === option.value ? 'active' : ''} onClick={() => onChange(option.value)}>
					{option.icon}
					<span>{option.label}</span>
				</button>
			))}
		</div>
	);
};

const Section = ({ id, section }: { id: SectionId; section: SectionCopy }) => (
	<div className="block">
		<SmallHeading icon={sectionIcons[id]}>{section.title}</SmallHeading>
		<p>{section.description}</p>
		{section.examples.map((example, index) => (
			<div key={`${section.title}-${example.label}-${index}`} className="button-code-group">
				<DemoButton label={example.label} relative={example.relative ?? true} toggleOnce={example.toggleOnce}>
					{example.node}
				</DemoButton>
				<CodeWell>{example.code}</CodeWell>
			</div>
		))}
	</div>
);

const ApiTable = ({ copy }: { copy: Copy }) => (
	<div className="table">
		<strong>{copy.tableHeaders.property}</strong>
		<strong>{copy.tableHeaders.defaultValue}</strong>
		<strong>{copy.tableHeaders.description}</strong>
		{copy.props.map((prop) => (
			<Fragment key={prop.name}>
				<code>{prop.name}</code>
				<code>{prop.defaultValue}</code>
				<div>
					{prop.description}
					{prop.name === 'className' || prop.name === 'style' ? <mark>{copy.reactAdditions}</mark> : null}
				</div>
			</Fragment>
		))}
	</div>
);

const TopDemos = ({ copy }: { copy: Copy }) => (
	<div className="buttons">
		<DemoButton label={copy.buttons.default}>
			<Confetti />
		</DemoButton>
		<DemoButton label={copy.buttons.lots}>
			<Confetti amount={200} />
		</DemoButton>
		<DemoButton label={copy.buttons.few}>
			<Confetti amount={10} />
		</DemoButton>
		<DemoButton label={copy.buttons.large}>
			<Confetti size={20} />
		</DemoButton>
		<DemoButton label={copy.buttons.rounded}>
			<Confetti rounded size={15} />
		</DemoButton>
		<DemoButton label={copy.buttons.colored}>
			<Confetti colorArray={colors.primary} />
		</DemoButton>
		<DemoButton label={copy.buttons.multiColored}>
			<Confetti colorArray={colors.multi} />
		</DemoButton>
		<DemoButton label={copy.buttons.images}>
			<Confetti size={20} colorArray={colors.image} />
		</DemoButton>
		<DemoButton label={copy.buttons.gradient}>
			<Confetti size={20} colorArray={colors.gradient} />
		</DemoButton>
		<DemoButton label={copy.buttons.flag}>
			<FlagConfetti />
		</DemoButton>
		<DemoButton label={copy.buttons.vertical}>
			<Confetti y={[1, 2]} x={[-0.25, 0.25]} />
		</DemoButton>
		<DemoButton label={copy.buttons.horizontal}>
			<Confetti y={[0.25, 0.5]} x={[-4, 4]} />
		</DemoButton>
		<DemoButton label={copy.buttons.cone}>
			<Confetti cone />
		</DemoButton>
		<DemoButton label={copy.buttons.allAround}>
			<Confetti y={[-0.5, 0.5]} x={[-0.5, 0.5]} />
		</DemoButton>
		<DemoButton label={copy.buttons.explosion}>
			<Confetti y={[-1, 1]} x={[-1, 1]} noGravity duration={750} />
		</DemoButton>
		<DemoButton label={copy.buttons.sparkles}>
			<SparklesConfetti />
		</DemoButton>
		<DemoButton label={copy.buttons.spray}>
			<Confetti delay={[0, 750]} />
		</DemoButton>
		<DemoButton label={copy.buttons.feathered}>
			<FeatheredConfetti />
		</DemoButton>
		<DemoButton label={copy.buttons.constant} toggleOnce>
			<Confetti infinite amount={20} delay={[0, 500]} />
		</DemoButton>
		<DemoButton label={copy.buttons.fullscreen} relative={false} toggleOnce>
			<FullscreenConfetti />
		</DemoButton>
	</div>
);

export const App = () => {
	const [locale, setLocale] = useState<Locale>(getInitialLocale);
	const [theme, setTheme] = useState<Theme>(getInitialTheme);
	const copy = t[locale];

	useEffect(() => {
		document.documentElement.lang = locale === 'zh_CN' ? 'zh-CN' : 'en';
		setLocaleQuery(locale);
	}, [locale]);

	useEffect(() => {
		setDocumentTheme(theme);
	}, [theme]);

	return (
		<div className="wrapper">
			<div className="header">
				<div className="title-stage">
					<span className="title-confetti">
						<Confetti infinite amount={10} x={[-0.5, -0.25]} y={[0.25, 0.5]} delay={[500, 2000]} colorArray={colors.primary} />
					</span>
					<h1>
						<mark>{copy.titlePrefix}</mark>&nbsp;Confetti
					</h1>
				</div>
				<p>{copy.intro}</p>
				<div className="links">
					<a href="https://github.com/any-tdf/any-tdf/tree/main/packages/react-confetti">
						<GitFork aria-hidden="true" size={15} />
						{copy.links.source}
					</a>
					<a href="https://www.npmjs.com/package/@any-tdf/react-confetti">
						<Package aria-hidden="true" size={15} />
						{copy.links.package}
					</a>
					<a href="https://mitcheljager.github.io/svelte-confetti/">
						<ExternalLink aria-hidden="true" size={15} />
						{copy.links.basedOn}
					</a>
				</div>
				<div className="controls">
					<div className="language-switch" aria-label={copy.language}>
						<Languages aria-hidden="true" size={15} />
						<button type="button" className={locale === 'zh_CN' ? 'active' : ''} onClick={() => setLocale('zh_CN')}>
							zh_CN
						</button>
						<button type="button" className={locale === 'en_US' ? 'active' : ''} onClick={() => setLocale('en_US')}>
							en_US
						</button>
					</div>
					<ThemeSwitch copy={copy} theme={theme} onChange={setTheme} />
				</div>
			</div>

			<div className="block demo-block">
				<SectionTitle icon={<MousePointerClick aria-hidden="true" size={20} />}>{copy.demoTitle}</SectionTitle>
				<p>{copy.demoIntro}</p>
				<TopDemos copy={copy} />
				<ConfettiOnClick label={copy.clickBox} />
			</div>

			<div className="block">
				<SectionTitle icon={<Package aria-hidden="true" size={20} />}>{copy.installTitle}</SectionTitle>
				<p>{copy.installIntro}</p>
				<PackageTabs />
			</div>

			<div className="block">
				<SectionTitle icon={<Code aria-hidden="true" size={20} />}>{copy.usageTitle}</SectionTitle>
				<p>{copy.usageIntro}</p>
				<CodeWell>{snippets.import}</CodeWell>
				<CodeWell>{snippets.default}</CodeWell>
			</div>

			<div className="section-title">
				<SectionTitle icon={<Sparkles aria-hidden="true" size={20} />}>{copy.exampleTitle}</SectionTitle>
			</div>
			{(Object.entries(copy.sections) as [SectionId, SectionCopy][]).map(([id, section]) => (
				<Section key={section.title} id={id} section={section} />
			))}

			<div className="block">
				<SectionTitle icon={<TableProperties aria-hidden="true" size={20} />}>{copy.propertiesTitle}</SectionTitle>
				<p>{copy.propertiesIntro}</p>
				<ApiTable copy={copy} />
			</div>
			<footer className="footer-note">
				<a href="https://mitcheljager.github.io/svelte-confetti/">{copy.footer}</a>
			</footer>
		</div>
	);
};
