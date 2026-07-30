export type Locale = 'zh' | 'en';
export type PageKey = 'home' | 'quick-start' | 'api' | 'demo/easing';

export const locales: Locale[] = ['zh', 'en'];
export const defaultLocale: Locale = 'zh';

export const pageKeys: PageKey[] = ['home', 'quick-start', 'api', 'demo/easing'];

export const navItems: Record<Locale, Array<{ key: PageKey; label: string }>> = {
	zh: [
		{ key: 'home', label: '首页' },
		{ key: 'quick-start', label: '快速开始' },
		{ key: 'api', label: 'API 对齐' },
		{ key: 'demo/easing', label: 'Easing Demo' }
	],
	en: [
		{ key: 'home', label: 'Home' },
		{ key: 'quick-start', label: 'Quick Start' },
		{ key: 'api', label: 'API Compatibility' },
		{ key: 'demo/easing', label: 'Easing Demo' }
	]
};

export const uiText = {
	zh: {
		brand: 'React Motion',
		tagline: '面向 React 的 Svelte 动画 API 复刻。',
		language: 'English',
		install: '安装',
		imports: '导入',
		ease: '缓动',
		type: '类型',
		duration: '时长',
		play: '播放',
		restart: '重新播放',
		theme: '主题',
		themeOptions: {
			auto: '自动',
			light: '浅色',
			dark: '深色'
		},
		durationShortcuts: '时长快捷操作',
		easingControls: '缓动控制',
		easingVisualiser: '缓动可视化',
		curveSuffix: '缓动曲线'
	},
	en: {
		brand: 'React Motion',
		tagline: 'Svelte-inspired animation APIs for React.',
		language: '中文',
		install: 'Install',
		imports: 'Imports',
		ease: 'Ease',
		type: 'Type',
		duration: 'Duration',
		play: 'Play',
		restart: 'Restart',
		theme: 'Theme',
		themeOptions: {
			auto: 'Auto',
			light: 'Light',
			dark: 'Dark'
		},
		durationShortcuts: 'Duration shortcuts',
		easingControls: 'Easing controls',
		easingVisualiser: 'Easing visualiser',
		curveSuffix: 'easing curve'
	}
} as const;

export const homeContent = {
	zh: {
		title: 'React Motion',
		description: '独立的 React 动画工具包，复刻 Svelte 的 easing、transition、animate 和 motion API。',
		actions: [
			{ key: 'quick-start' as PageKey, label: '开始使用' },
			{ key: 'demo/easing' as PageKey, label: '查看 Demo' }
		],
		features: [
			{ title: 'Svelte API 对齐', text: '保留同名函数、同名参数和接近的动画行为，降低从 Svelte 示例迁移到 React 的成本。' },
			{ title: 'React 组件与 Hook', text: '提供 `Transition`、`useTransition`、`FlipGroup`、`useTween` 和 `useSpring` 等 React 用法。' },
			{ title: 'SVG 与交互动效', text: '`draw` 支持 SVG 元素，motion 工具支持数字、数组、对象和 Date 插值。' }
		]
	},
	en: {
		title: 'React Motion',
		description: 'An independent React animation package that mirrors Svelte easing, transition, animate, and motion APIs.',
		actions: [
			{ key: 'quick-start' as PageKey, label: 'Get Started' },
			{ key: 'demo/easing' as PageKey, label: 'Open Demo' }
		],
		features: [
			{
				title: 'Svelte API parity',
				text: 'Keeps familiar function names, parameter names, and animation behavior for easier migration from Svelte examples.'
			},
			{
				title: 'React components and hooks',
				text: 'Includes `Transition`, `useTransition`, `FlipGroup`, `useTween`, and `useSpring` for React codebases.'
			},
			{
				title: 'SVG and interactive motion',
				text: '`draw` works with SVG elements, while motion utilities interpolate numbers, arrays, objects, and Date values.'
			}
		]
	}
} as const;

export const quickStartContent = {
	zh: {
		title: '快速开始',
		intro: '包名保持为 `@any-tdf/react-motion`。文档站使用包名导入本地源码，模拟真实项目的使用方式。',
		install: 'bun add @any-tdf/react-motion',
		examples: [
			{
				title: 'Easing',
				code: "import { cubicOut } from '@any-tdf/react-motion/easing';"
			},
			{
				title: 'Transition',
				code: 'import { Transition } from \'@any-tdf/react-motion/react\';\n\n<Transition visible={open} transition="fly" params={{ y: 24 }} />'
			},
			{
				title: 'Motion',
				code: "import { useTween } from '@any-tdf/react-motion/motion';\n\nconst value = useTween(progress, { duration: 400 });"
			}
		]
	},
	en: {
		title: 'Quick Start',
		intro:
			'The package name stays `@any-tdf/react-motion`. This documentation site imports local source through the package name, matching real project usage.',
		install: 'bun add @any-tdf/react-motion',
		examples: [
			{
				title: 'Easing',
				code: "import { cubicOut } from '@any-tdf/react-motion/easing';"
			},
			{
				title: 'Transition',
				code: 'import { Transition } from \'@any-tdf/react-motion/react\';\n\n<Transition visible={open} transition="fly" params={{ y: 24 }} />'
			},
			{
				title: 'Motion',
				code: "import { useTween } from '@any-tdf/react-motion/motion';\n\nconst value = useTween(progress, { duration: 400 });"
			}
		]
	}
} as const;

export const apiContent = {
	zh: {
		title: 'API 对齐',
		intro: 'React 无法复刻 Svelte 编译器指令语法，因此这里对齐的是函数名、参数名、返回形态和运行时行为。',
		rows: [
			['svelte/easing', '31 个 easing 函数', '@any-tdf/react-motion/easing'],
			['svelte/transition', 'blur、crossfade、draw、fade、fly、scale、slide', '@any-tdf/react-motion/transition'],
			['svelte/animate', 'flip', '@any-tdf/react-motion/animate'],
			['svelte/motion', 'Spring、Tween、spring、tweened、prefersReducedMotion', '@any-tdf/react-motion/motion']
		],
		notes: [
			'Svelte 使用 `transition:`、`in:`、`out:` 和 `animate:` 指令；React Motion 使用组件和 Hook。',
			'`Transition` 支持 HTML 和 SVG 元素，`draw` 可用于支持 `getTotalLength()` 的 SVG 节点。',
			'`spring()` 保留旧 store 的 `hard` / `soft` 语义；`Spring` class 保留新 API 的 `instant` / `preserveMomentum` 语义。',
			'`Spring.of()` 和 `Tween.of()` 只读取创建时的返回值；React 状态联动优先使用 `useSpring` 和 `useTween`。'
		]
	},
	en: {
		title: 'API Compatibility',
		intro:
			'React cannot copy Svelte compiler directives, so compatibility focuses on function names, parameter names, return shapes, and runtime behavior.',
		rows: [
			['svelte/easing', '31 easing functions', '@any-tdf/react-motion/easing'],
			['svelte/transition', 'blur, crossfade, draw, fade, fly, scale, slide', '@any-tdf/react-motion/transition'],
			['svelte/animate', 'flip', '@any-tdf/react-motion/animate'],
			['svelte/motion', 'Spring, Tween, spring, tweened, prefersReducedMotion', '@any-tdf/react-motion/motion']
		],
		notes: [
			'Svelte uses `transition:`, `in:`, `out:`, and `animate:` directives; React Motion uses components and hooks.',
			'`Transition` supports HTML and SVG elements, and `draw` works with SVG nodes that expose `getTotalLength()`.',
			'`spring()` keeps legacy store semantics for `hard` / `soft`; the `Spring` class keeps the newer `instant` / `preserveMomentum` semantics.',
			'`Spring.of()` and `Tween.of()` read the initial function value only; prefer `useSpring` and `useTween` for React state updates.'
		]
	}
} as const;

export const demoContent = {
	zh: {
		title: 'Easing Visualiser',
		intro: '这个交互示例参考 Svelte 官方 easing Playground，用 `Tween` 展示所有基础 easing 和类型组合的曲线效果。'
	},
	en: {
		title: 'Easing Visualiser',
		intro: 'This interactive demo follows the Svelte easing Playground and uses `Tween` to show each base easing and type combination.'
	}
} as const;
