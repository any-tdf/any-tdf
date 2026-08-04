export type Locale = 'zh_CN' | 'en_US';
export type Theme = 'light' | 'dark' | 'auto';
export type DemoId =
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
export type SectionId = 'spread' | 'amount' | 'shape' | 'size' | 'timing' | 'color' | 'gravity' | 'multiple' | 'styling';

export type Example = {
	label: string;
	code: string;
	kind: string;
	relative?: boolean;
	toggleOnce?: boolean;
};

export type SectionCopy = {
	title: string;
	description: string;
	examples: Example[];
};

export type Copy = {
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
	vueAdditions: string;
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

export const colors = {
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
		'url(https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg)',
		'url(https://github.githubassets.com/favicons/favicon-dark.png)'
	]
};

export const packageCommands = {
	bun: 'bun add @any-tdf/vue-confetti',
	npm: 'npm install @any-tdf/vue-confetti',
	pnpm: 'pnpm add @any-tdf/vue-confetti',
	yarn: 'yarn add @any-tdf/vue-confetti'
};

export const snippets = {
	import: `import { Confetti } from '@any-tdf/vue-confetti';`,
	default: `<Confetti />`,
	lots: `<Confetti :amount="200" />`,
	few: `<Confetti :amount="10" />`,
	large: `<Confetti :size="20" />`,
	rounded: `<Confetti rounded :size="15" />`,
	colored: `<Confetti :color-array="['var(--primary)']" />`,
	multiColored: `<Confetti :color-array="['var(--primary)', 'white', 'green']" />`,
	images: `<Confetti
  :size="20"
  :color-array="[
    'url(https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg)',
    'url(https://github.githubassets.com/favicons/favicon-dark.png)',
  ]"
/>`,
	gradient: `<Confetti :size="20" :color-array="['linear-gradient(#c8102e, white, #003da5)']" />`,
	flag: `<template>
  <Confetti :y="[1.25, 1.5]" :x="[-1, 1]" :color-array="['#c8102e']" />
  <Confetti :y="[1, 1.25]" :x="[-1, 1]" :color-array="['white']" />
  <Confetti :y="[0.75, 1]" :x="[-1, 1]" :color-array="['#003da5']" />
</template>`,
	vertical: `<Confetti :y="[1, 2]" :x="[-0.25, 0.25]" />`,
	horizontal: `<Confetti :y="[0.25, 0.5]" :x="[-4, 4]" />`,
	cone: `<Confetti cone />`,
	allAround: `<Confetti :y="[-0.5, 0.5]" :x="[-0.5, 0.5]" />`,
	explosion: `<Confetti :y="[-1, 1]" :x="[-1, 1]" no-gravity :duration="750" />`,
	sparkles: `<Confetti
  :y="[-0.5, 0.5]"
  :x="[-0.5, 0.5]"
  :color-range="[30, 50]"
  :amount="20"
  fall-distance="0px"
  :duration="3000"
  :size="4"
/>`,
	spray: `<Confetti :delay="[0, 750]" />`,
	feathered: `<template>
  <Confetti cone :x="[-0.5, 0.5]" />
  <Confetti cone :amount="10" :x="[-1, -0.4]" :y="[0.25, 0.75]" />
  <Confetti cone :amount="10" :x="[0.4, 1]" :y="[0.25, 0.75]" />
</template>`,
	constant: `<Confetti infinite :amount="20" :delay="[0, 500]" />`,
	greenRange: `<Confetti :color-range="[75, 175]" />`,
	colorArray: `<Confetti :color-array="['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']" />`,
	differentValues: `<Confetti :color-array="['var(--primary)', 'rgba(0, 255, 0, 0.5)', 'white']" />`,
	docsGradient: `<Confetti :size="20" :color-array="['linear-gradient(var(--primary), blue)']" />`,
	randomColor: `<Confetti :color-array="[\`hsl(\${Math.floor(Math.random() * 360)}, 75%, 50%)\`]" />`,
	slowFall: `<Confetti fall-distance="50px" />`,
	fastFall: `<Confetti fall-distance="200px" />`,
	noFall: `<Confetti fall-distance="0px" />`,
	noGravity: `<Confetti no-gravity :duration="500" />`,
	noGravityExplosion: `<Confetti no-gravity :duration="500" :x="[-0.5, 0.5]" :y="[-0.5, 0.5]" />`,
	smallSpread: `<Confetti :x-spread="0.1" />`,
	largeSpread: `<Confetti :x-spread="0.4" />`,
	dutch: `<template>
  <Confetti :y="[1.25, 1.5]" :x="[-1, 1]" :color-array="['#c8102e']" />
  <Confetti :y="[1, 1.25]" :x="[-1, 1]" :color-array="['white']" />
  <Confetti :y="[0.75, 1]" :x="[-1, 1]" :color-array="['#3350ec']" />
</template>`,
	swedish: `<template>
  <Confetti :y="[0.75, 1.5]" :x="[-1, 1]" :color-array="['#3350ec']" :amount="100" />
  <Confetti :y="[1.05, 1.2]" :x="[-1, 1]" :color-array="['#ffcd00']" :amount="50" />
  <Confetti :y="[0.75, 1.5]" :x="[-0.5, -0.25]" :color-array="['#ffcd00']" :amount="20" />
</template>`,
	usa: `<template>
  <Confetti :y="[1.15, 1.5]" :x="[-1, -0.25]" :color-array="['#3350ec']" :amount="100" />
  <Confetti :y="[1.2, 1.45]" :x="[-0.95, -0.3]" :color-array="['white']" :size="5" />
  <Confetti :y="[1.45, 1.5]" :x="[-0.25, 1]" :color-array="['#bf0d3e']" :amount="70" />
</template>`,
	notFeathered: `<Confetti :amount="70" :x="[-0.5, 0.5]" />`,
	featheredNoCone: `<template>
  <Confetti :x="[-0.5, 0.5]" />
  <Confetti :amount="10" :x="[-0.75, -0.3]" :y="[0.15, 0.75]" />
  <Confetti :amount="10" :x="[0.3, 0.75]" :y="[0.15, 0.75]" />
</template>`,
	coneAmount: `<Confetti cone :amount="70" :x="[-0.5, 0.5]" />`,
	featheredCone: `<template>
  <Confetti cone :x="[-0.5, 0.5]" />
  <Confetti cone :amount="10" :x="[-0.75, -0.4]" :y="[0.15, 0.75]" />
  <Confetti cone :amount="10" :x="[0.4, 0.75]" :y="[0.15, 0.75]" />
</template>`,
	featheredDelayed: `<template>
  <Confetti :x="[-0.5, 0.5]" :delay="[0, 250]" />
  <Confetti :amount="10" :x="[-0.75, -0.3]" :y="[0.15, 0.75]" :delay="[0, 1000]" />
  <Confetti :amount="10" :x="[0.3, 0.75]" :y="[0.15, 0.75]" :delay="[0, 1000]" />
</template>`,
	animate: `<template>
  <Confetti cone :x="[-1, -0.25]" :color-range="[100, 200]" />
  <Confetti cone :x="[-0.35, 0.35]" :delay="[500, 550]" :color-range="[200, 300]" />
  <Confetti cone :x="[0.25, 1]" :delay="[250, 300]" :color-range="[100, 200]" />
  <Confetti cone :amount="20" :x="[-1, 1]" :y="[0, 1]" :delay="[0, 550]" :color-range="[200, 300]" />
</template>`,
	animateExplosion: `<template>
  <Confetti no-gravity :x="[-1, 1]" :y="[-1, 1]" :delay="[0, 50]" :duration="1000" :color-range="[0, 120]" />
  <Confetti no-gravity :x="[-1, 1]" :y="[-1, 1]" :delay="[550, 550]" :duration="1000" :color-range="[120, 240]" />
  <Confetti no-gravity :x="[-1, 1]" :y="[-1, 1]" :delay="[1000, 1050]" :duration="1000" :color-range="[240, 360]" />
</template>`,
	fullscreen: `<Teleport to="body">
  <div class="fullscreen-confetti">
    <Confetti
      :x="[-5, 5]"
      :y="[0, 0.1]"
      :delay="[500, 2000]"
      infinite
      :duration="5000"
      :amount="200"
      fall-distance="100vh"
    />
  </div>
</Teleport>`
};

export const topDemoKinds: DemoId[] = [
	'default',
	'lots',
	'few',
	'large',
	'rounded',
	'colored',
	'multiColored',
	'images',
	'gradient',
	'flag',
	'vertical',
	'horizontal',
	'cone',
	'allAround',
	'explosion',
	'sparkles',
	'spray',
	'feathered',
	'constant',
	'fullscreen'
];

const baseProps = [
	'size',
	'x',
	'y',
	'duration',
	'infinite',
	'delay',
	'colorRange',
	'colorArray',
	'amount',
	'iterationCount',
	'fallDistance',
	'rounded',
	'cone',
	'noGravity',
	'xSpread',
	'destroyOnComplete',
	'disableForReducedMotion',
	'className',
	'style'
];

const propDefaultValues: Record<string, string> = {
	size: '10',
	x: '[-0.5, 0.5]',
	y: '[0.25, 1]',
	duration: '2000',
	infinite: 'false',
	delay: '[0, 50]',
	colorRange: '[0, 360]',
	colorArray: '[]',
	amount: '50',
	iterationCount: '1',
	fallDistance: '100px',
	rounded: 'false',
	cone: 'false',
	noGravity: 'false',
	xSpread: '0.15',
	destroyOnComplete: 'true',
	disableForReducedMotion: 'false',
	className: "''",
	style: 'undefined'
};

const zhPropDescriptions: Record<string, string> = {
	size: '单个彩纸颗粒的最大尺寸，单位为 px。',
	x: '彩纸颗粒的最大水平范围。负数向左，正数向右。[-1, 1] 表示最多向左 200px、向右 200px。',
	y: '彩纸颗粒的最大垂直范围。负数向下，正数向上。[-1, 1] 表示最多向下 200px、向上 200px。',
	duration: '每个独立颗粒的动画时长。',
	infinite: '设为 true 时动画会无限播放。',
	delay: '用于给每个颗粒设置随机延迟。两个数字差距越大，喷射时间越长。',
	colorRange: 'HSL 色轮上的颜色范围。0 到 360 是完整 RGB，75 到 150 只会得到绿色系。',
	colorArray: '可以从数组中随机取色。只放一个元素就会得到单色。接受任何有效的 CSS background 属性，包括渐变和图片。',
	amount: '生成的颗粒数量。喷射范围越大，可能需要越多颗粒。数量太多可能影响性能。',
	iterationCount: '动画停止前播放的次数。会被 infinite 属性覆盖。',
	fallDistance: '每个颗粒下落的距离。接受 px、rem、vh 等任何 CSS 长度值，但不能只写 0。',
	rounded: '设为 true 时，每个彩纸颗粒会变成圆形。',
	cone: '设为 true 时，爆发会呈现更像锥形的形状，在大量颗粒时更真实。',
	noGravity: '设为 true 时，颗粒会以恒定速度移动，不再向下坠落，效果更像爆炸。',
	xSpread: '决定颗粒横向扩散程度的数字。值越低，最高点附近的 x 和结束位置附近的 x 越接近。',
	destroyOnComplete: '默认动画完成后会移除元素。设为 false 可以阻止这个行为。',
	disableForReducedMotion: '为偏好减少动态效果的用户禁用动画。',
	className: 'Vue 兼容能力：追加到 holder 的类名，同时支持 Vue 原生 class。',
	style: 'Vue 兼容能力：追加到 holder 的内联样式，同时支持 Vue 原生 style。'
};

const enPropDescriptions: Record<string, string> = {
	size: 'Maximum size in pixels of individual confetti pieces.',
	x: 'Maximum horizontal range for the confetti pieces. Negative values move left and positive values move right. [-1, 1] means up to 200px left or right.',
	y: 'Maximum vertical range for the confetti pieces. Negative values move down and positive values move up. [-1, 1] means up to 200px down or up.',
	duration: 'Duration of the animation for each individual piece.',
	infinite: 'If set to true, the animation plays indefinitely.',
	delay: 'Random delay for each piece. A larger difference between the two numbers creates a longer spray.',
	colorRange: 'Color range on the HSL wheel. 0 to 360 is the full RGB range, while 75 to 150 gives green colors.',
	colorArray:
		'Randomly selects colors from the array. A single element creates one color. Accepts any CSS background value, including gradients and images.',
	amount: 'Amount of particles spawned. A larger spray may need more particles, but too many can affect performance.',
	iterationCount: 'How many times the animation plays. This is overwritten by infinite.',
	fallDistance: 'How far each piece falls. Accepts px, rem, vh, and other CSS length values, but not a bare 0.',
	rounded: 'If set to true, every confetti piece becomes round.',
	cone: 'If set to true, the burst has a more cone-like shape, which looks more realistic with many pieces.',
	noGravity: 'If set to true, pieces move at a constant speed instead of falling downward, creating a more explosive effect.',
	xSpread: 'Controls horizontal spread around the highest point. Lower values keep the peak x position closer to the ending x position.',
	destroyOnComplete: 'Removes the DOM after the animation completes. Set to false to keep the elements mounted.',
	disableForReducedMotion: 'Disables the animation for users who prefer reduced motion.',
	className: 'Vue compatibility: class added to the holder. Native Vue class is also supported.',
	style: 'Vue compatibility: inline style added to the holder. Native Vue style is also supported.'
};

export const t: Record<Locale, Copy> = {
	zh_CN: {
		titlePrefix: 'Vue',
		intro: '给你的 Vue 应用加一点彩纸氛围。它没有运行时依赖，体积很小。更好的是，它的初始 DOM 可以通过 SSR 渲染出来。',
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
		propertiesIntro: '下面列出全部可配置属性。Vue 版本保留上游核心属性，并支持 className、class 与 style。',
		vueAdditions: 'Vue 兼容能力',
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
					{ label: '默认', code: snippets.default, kind: 'default' },
					{ label: '向左', code: `<Confetti :x="[-1, -0.25]" :y="[0, 0.5]" />`, kind: 'left' },
					{ label: '向右', code: `<Confetti :x="[0.25, 1]" :y="[0, 0.5]" />`, kind: 'right' },
					{ label: '向上', code: `<Confetti :x="[-0.25, 0.25]" :y="[0.75, 1.5]" />`, kind: 'up' },
					{ label: '向下', code: `<Confetti :x="[-0.25, 0.25]" :y="[-0.75, -0.25]" />`, kind: 'down' },
					{ label: '四周', code: snippets.allAround, kind: 'allAround' }
				]
			},
			amount: {
				title: '数量',
				description:
					'可以用 amount 属性调整发射的颗粒数量。它应该始终是整数。数量过高可能会影响性能，具体取决于设备和页面上其他消耗性能的元素，但建议保持在 500 以下。',
				examples: [
					{ label: '很少', code: snippets.few, kind: 'few' },
					{ label: '默认', code: `<Confetti :amount="50" />`, kind: 'defaultAmount' },
					{ label: '很多', code: snippets.lots, kind: 'lots' },
					{ label: '过多', code: `<Confetti :amount="500" />`, kind: 'tooMany' }
				]
			},
			shape: {
				title: '形状',
				description:
					'如前面的按钮所示，彩纸整体会呈现比较方正的形状。使用 cone 属性可以稍微缓解这一点，让彩纸以更接近锥形的方式喷出，在大量颗粒时尤其好看。侧向发射时这个属性也很有效，不过需要用更大的 x 倍数来补偿。锥形仍然会有明显轮廓，后面的文档会展示如何弱化这种轮廓。',
				examples: [
					{ label: '默认', code: `<Confetti :amount="200" />`, kind: 'lots' },
					{ label: '锥形', code: `<Confetti cone :amount="200" />`, kind: 'coneLots' },
					{ label: '向右', code: `<Confetti :x="[0.25, 1]" :y="[0, 0.5]" />`, kind: 'right' },
					{ label: '向右锥形', code: `<Confetti cone :x="[1, 2.5]" :y="[0.25, 0.75]" />`, kind: 'rightCone' }
				]
			},
			size: {
				title: '尺寸',
				description: '可以用 size 属性调整彩纸颗粒的尺寸。也可以用 rounded 属性调整彩纸颗粒的形状。',
				examples: [
					{ label: '细小', code: `<Confetti :size="2" />`, kind: 'tiny' },
					{ label: '巨大', code: `<Confetti :size="30" />`, kind: 'huge' },
					{ label: '圆形巨大', code: `<Confetti rounded :size="30" />`, kind: 'round' }
				]
			},
			timing: {
				title: '时间',
				description:
					'默认情况下，所有彩纸几乎会在同一时间喷出。会有一点随机差异，但视觉上接近瞬间发射，这就是彩纸礼炮的效果。可以通过调整 delay 属性的范围来改变每个颗粒发射的时间，delay 使用毫秒。也可以设置 infinite 让动画无限播放，此时 delay 主要影响首次生成时的节奏。或者使用 iterationCount 让动画完整播放若干次后再结束，它接受数字，也可以是 "infinite"，本质上可以传入 CSS animation-iteration-count 支持的值。',
				examples: [
					{ label: '短延迟', code: `<Confetti :delay="[0, 250]" />`, kind: 'shortDelay' },
					{ label: '长延迟', code: `<Confetti :delay="[0, 1500]" />`, kind: 'longDelay' },
					{ label: '无限', code: `<Confetti infinite />`, kind: 'infinite', toggleOnce: true },
					{ label: '无限长延迟', code: `<Confetti infinite :delay="[0, 1500]" />`, kind: 'longDelayInfinite', toggleOnce: true },
					{ label: '迭代无限', code: `<Confetti iteration-count="infinite" />`, kind: 'iterationInfinite', toggleOnce: true }
				]
			},
			color: {
				title: '颜色',
				description:
					'可以用多种方式调整彩纸颜色。colorRange 会在 HSL 色相上取值，饱和度为 75%，亮度为 50%。0 到 360 代表所有颜色，75 到 175 则只会得到绿色系。也可以用 colorArray 指定颜色数组，它接受任何 CSS background 属性可用的值，包括 RGB、HEX、HSL、渐变和图片。也可以在组件每次挂载时生成随机颜色。',
				examples: [
					{ label: '绿色范围', code: snippets.greenRange, kind: 'greenRange' },
					{ label: '数组', code: snippets.colorArray, kind: 'colorArray' },
					{ label: '不同值', code: snippets.differentValues, kind: 'differentValues' },
					{ label: '渐变', code: snippets.docsGradient, kind: 'docsGradient' },
					{ label: '图片', code: snippets.images, kind: 'images' },
					{ label: '随机', code: snippets.randomColor, kind: 'randomColor' }
				]
			},
			gravity: {
				title: '重力',
				description:
					'可以用 fallDistance 属性改变彩纸如何下落，让它下落得更快、更慢，或者完全不下落。这个属性接受任何有效的 CSS 长度值，但不能只写 0，应该写成 0px。也可以设置 noGravity 来禁用重力和空气阻力，让颗粒以恒定速度移动。xSpread 控制颗粒在最高点前后的横向扩散程度，通常取 0 到 1 之间的数字，但传入更高或更低的值也会产生一些特殊效果。',
				examples: [
					{ label: '慢速下落', code: snippets.slowFall, kind: 'slowFall' },
					{ label: '快速下落', code: snippets.fastFall, kind: 'fastFall' },
					{ label: '不下落', code: snippets.noFall, kind: 'noFall' },
					{ label: '无重力', code: snippets.noGravity, kind: 'noGravity' },
					{ label: '无重力爆炸', code: snippets.noGravityExplosion, kind: 'noGravityExplosion' },
					{ label: '小扩散', code: snippets.smallSpread, kind: 'smallSpread' },
					{ label: '大扩散', code: snippets.largeSpread, kind: 'largeSpread' }
				]
			},
			multiple: {
				title: '多个组件',
				description:
					'可以组合多个 Confetti 组件来创造有趣效果。例如，可以把多个组件按不同颜色和不同区域组合成旗帜。旗帜很酷，但我们还能做更多事情。这个示例会把初始效果“羽化”，让形状没那么明确。默认效果会有比较清晰的轮廓，尤其在使用大量颗粒时会稍微破坏效果。也可以把多个组件组合成动画。',
				examples: [
					{ label: '荷兰', code: snippets.dutch, kind: 'dutch' },
					{ label: '瑞典', code: snippets.swedish, kind: 'swedish' },
					{ label: '美国', code: snippets.usa, kind: 'usa' },
					{ label: '未羽化', code: snippets.notFeathered, kind: 'notFeathered' },
					{ label: '羽化', code: snippets.featheredNoCone, kind: 'featheredNoCone' },
					{ label: '锥形', code: snippets.coneAmount, kind: 'coneAmount' },
					{ label: '羽化锥形', code: snippets.featheredCone, kind: 'featheredCone' },
					{ label: '羽化延迟', code: snippets.featheredDelayed, kind: 'featheredDelayed' },
					{ label: '动画', code: snippets.animate, kind: 'animate' },
					{ label: '爆炸动画', code: snippets.animateExplosion, kind: 'animateExplosion' }
				]
			},
			styling: {
				title: '更多样式',
				description:
					'现在已经看过所有不同属性了。因为这个效果只是 HTML 和 CSS，所以你可以继续按自己的方式设置样式。全屏效果不是一个简单开关，但只需要一小段 CSS。容器固定定位，并放在屏幕外一点，这样看不到彩纸生成的位置。fallDistance 设置为 100vh，所以彩纸会覆盖整屏。Vue 版本还会把 className、class 与 style 传到 holder 上。',
				examples: [
					{ label: '全屏', code: snippets.fullscreen, kind: 'fullscreen', relative: false, toggleOnce: true },
					{
						label: '自定义 class',
						code: `<Confetti class-name="my-confetti" class="mover" :style="{ transform: 'translateX(2rem)' }" />`,
						kind: 'customClass'
					}
				]
			}
		},
		props: baseProps.map((name) => ({
			name,
			defaultValue: propDefaultValues[name],
			description: zhPropDescriptions[name]
		}))
	},
	en_US: {
		titlePrefix: 'Vue',
		intro:
			'Add a little bit of flair to your Vue app with some confetti. There are no runtime dependencies and it is tiny in size. Even better, the initial DOM can be rendered with SSR.',
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
			'This is a list of all configurable properties. The Vue version keeps the upstream core props and supports className, class, and style.',
		vueAdditions: 'Vue compatibility',
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
		sections: {} as Record<SectionId, SectionCopy>,
		props: baseProps.map((name) => ({
			name,
			defaultValue: propDefaultValues[name],
			description: enPropDescriptions[name]
		}))
	}
};

t.en_US.sections = {
	spread: {
		title: 'Spread',
		description:
			'The spread of confetti can be adjusted. The x and y props decide how far the confetti spreads. Both values are multipliers passed as a two-number array, with the smaller value first. Each piece gets a random value between those numbers. Higher numbers spread farther, and negative numbers affect direction.',
		examples: t.zh_CN.sections.spread.examples.map((item, index) => ({
			...item,
			label: ['Default', 'Left', 'Right', 'Up', 'Down', 'Everywhere'][index]
		}))
	},
	amount: {
		title: 'Amount',
		description:
			'The amount of particles that are launched can be adjusted with the amount property. It should always be an integer. Too many particles can affect performance depending on the device and the rest of the page, so try to keep it below 500.',
		examples: t.zh_CN.sections.amount.examples.map((item, index) => ({ ...item, label: ['Few', 'Default', 'Lots', 'Too many'][index] }))
	},
	shape: {
		title: 'Shape',
		description:
			'As shown in the demo buttons, the confetti has a fairly square shape. The cone property mitigates that by launching pieces in a more cone-like shape, which looks especially good with many pieces. It also works well for sideward bursts, though a larger x multiplier helps compensate. The cone still has a visible shape; later examples show how to soften it.',
		examples: t.zh_CN.sections.shape.examples.map((item, index) => ({ ...item, label: ['Default', 'Cone', 'Right', 'Right Cone'][index] }))
	},
	size: {
		title: 'Size',
		description:
			'The size of the confetti pieces can be adjusted using the size property. The shape of the individual pieces can also be changed with the rounded property.',
		examples: t.zh_CN.sections.size.examples.map((item, index) => ({ ...item, label: ['Tiny', 'Huge', 'Round'][index] }))
	},
	timing: {
		title: 'Timing',
		description:
			'By default, all confetti pieces launch at about the same time. There is a small random difference, but visually it feels like an instant cannon. Change the delay range to control when each piece launches. Delay is measured in milliseconds. You can also set infinite to loop forever, or use iterationCount to play the full animation a set number of times before stopping.',
		examples: t.zh_CN.sections.timing.examples.map((item, index) => ({
			...item,
			label: ['Short delay', 'Long delay', 'Default', 'Long delay', 'Infinite'][index]
		}))
	},
	color: {
		title: 'Color',
		description:
			'There are multiple ways to adjust the colors. colorRange chooses from the HSL hue wheel with 75% saturation and 50% lightness. 0 to 360 covers the full RGB range, while 75 to 175 gives green colors. colorArray can supply any value accepted by the CSS background property, including RGB, HEX, HSL, gradients, and images. You can also generate a random color each time the component mounts.',
		examples: t.zh_CN.sections.color.examples.map((item, index) => ({
			...item,
			label: ['Green range', 'Array', 'Different values', 'Gradient', 'Images', 'Random'][index]
		}))
	},
	gravity: {
		title: 'Gravity',
		description:
			'Use fallDistance to change how the confetti falls: slower, faster, or not at all. The value accepts any valid CSS length, but use 0px instead of bare 0. noGravity disables gravity and air resistance so pieces move at a constant speed, which feels more like an explosion. xSpread controls how far the pieces drift horizontally around their highest point.',
		examples: t.zh_CN.sections.gravity.examples.map((item, index) => ({
			...item,
			label: ['Slow fall', 'Fast fall', 'No fall', 'No gravity', 'No gravity explosion', 'Small spread', 'Large spread'][index]
		}))
	},
	multiple: {
		title: 'Multiple components',
		description:
			'Multiple Confetti components can be combined to create interesting effects. For example, several components with different colors and ranges can form flags. The same approach can feather the initial shape so it feels less blocky, or stack delayed components into a simple animation.',
		examples: t.zh_CN.sections.multiple.examples.map((item, index) => ({
			...item,
			label: [
				'Dutch',
				'Swedish',
				'USA',
				'Not feathered',
				'Feathered',
				'Cone',
				'Feathered cone',
				'Feathered and delayed',
				'Animate',
				'Animate explosion'
			][index]
		}))
	},
	styling: {
		title: 'Styling further',
		description:
			'Now that all properties have been covered, the effect can be styled further because it is just HTML and CSS. The fullscreen example is not a single toggle; it uses a small fixed container placed slightly off screen so the spawn point is hidden. fallDistance is set to 100vh so the pieces cover the full viewport. The Vue port also applies className, class, and style to the holder.',
		examples: t.zh_CN.sections.styling.examples.map((item, index) => ({ ...item, label: ['Fullscreen', 'Custom class'][index] }))
	}
};
