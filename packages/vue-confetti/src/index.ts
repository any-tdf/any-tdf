import {
	computed,
	defineComponent,
	h,
	onBeforeUnmount,
	onMounted,
	shallowRef,
	watch,
	type CSSProperties,
	type PropType,
	type StyleValue
} from 'vue';

type Range = [number, number];
type IterationCount = number | 'infinite' | 'initial' | 'inherit';

export interface ConfettiProps {
	size?: number;
	x?: Range;
	y?: Range;
	duration?: number;
	infinite?: boolean;
	delay?: Range;
	colorRange?: Range;
	colorArray?: string[];
	amount?: number;
	iterationCount?: IterationCount;
	fallDistance?: string;
	rounded?: boolean;
	cone?: boolean;
	noGravity?: boolean;
	xSpread?: number;
	destroyOnComplete?: boolean;
	disableForReducedMotion?: boolean;
	className?: string;
	style?: StyleValue;
}

type ConfettiCssProperties = CSSProperties & {
	[key: `--${string}`]: string | number;
};

type ConfettiPiece = {
	color: string;
	skew: string;
	rotationXyz: string;
	rotationDeg: string;
	translateYMultiplier: number;
	translateXMultiplier: number;
	scale: number;
	transitionDelay: string;
	transitionDuration: string;
};

type ConfettiPieceOptions = {
	xMin: number;
	xMax: number;
	yMin: number;
	yMax: number;
	duration: number;
	delayMin: number;
	delayMax: number;
	colorRangeMin: number;
	colorRangeMax: number;
	colorArray: string[];
	infinite: boolean;
};

const DEFAULT_X: Range = [-0.5, 0.5];
const DEFAULT_Y: Range = [0.25, 1];
const DEFAULT_DELAY: Range = [0, 50];
const DEFAULT_COLOR_RANGE: Range = [0, 360];

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const getColor = (colorArray: string[], colorRangeMin: number, colorRangeMax: number) => {
	if (colorArray.length) return colorArray[Math.round(Math.random() * (colorArray.length - 1))];
	return `hsl(${Math.round(randomBetween(colorRangeMin, colorRangeMax))}, 75%, 50%)`;
};

const createPiece = (options: ConfettiPieceOptions) => {
	const scale = 0.1 * randomBetween(2, 10);
	return {
		color: getColor(options.colorArray, options.colorRangeMin, options.colorRangeMax),
		skew: `${randomBetween(-45, 45)}deg,${randomBetween(-45, 45)}deg`,
		rotationXyz: `${randomBetween(-10, 10)}, ${randomBetween(-10, 10)}, ${randomBetween(-10, 10)}`,
		rotationDeg: `${randomBetween(0, 360)}deg`,
		translateYMultiplier: randomBetween(options.yMin, options.yMax),
		translateXMultiplier: randomBetween(options.xMin, options.xMax),
		scale,
		transitionDelay: `${randomBetween(options.delayMin, options.delayMax)}ms`,
		transitionDuration: options.infinite ? `calc(${options.duration}ms * var(--scale))` : `${options.duration}ms`
	} satisfies ConfettiPiece;
};

export const confettiStyles = `
@keyframes any-tdf-confetti-rotate {
	0% {
		transform: skew(var(--skew)) rotate3d(var(--full-rotation));
	}

	100% {
		transform: skew(var(--skew)) rotate3d(var(--rotation-xyz), calc(var(--rotation-deg) + 360deg));
	}
}

@keyframes any-tdf-confetti-translate {
	0% {
		opacity: 1;
	}

	8% {
		transform: translateY(calc(var(--translate-y) * 0.95)) translateX(calc(var(--translate-x) * (var(--x-spread) * 0.9)));
		opacity: 1;
	}

	12% {
		transform: translateY(var(--translate-y)) translateX(calc(var(--translate-x) * (var(--x-spread) * 0.95)));
		opacity: 1;
	}

	16% {
		transform: translateY(var(--translate-y)) translateX(calc(var(--translate-x) * var(--x-spread)));
		opacity: 1;
	}

	100% {
		transform: translateY(calc(var(--translate-y) + var(--fall-distance))) translateX(var(--translate-x));
		opacity: 0;
	}
}

@keyframes any-tdf-confetti-no-gravity-translate {
	0% {
		opacity: 1;
	}

	100% {
		transform: translateY(var(--translate-y)) translateX(var(--translate-x));
		opacity: 0;
	}
}

.any-tdf-confetti-holder {
	position: relative;
}

.any-tdf-confetti {
	--translate-y: calc(-200px * var(--translate-y-multiplier));
	--translate-x: calc(200px * var(--translate-x-multiplier));
	position: absolute;
	height: calc(var(--size) * var(--scale));
	width: calc(var(--size) * var(--scale));
	animation: any-tdf-confetti-translate var(--transition-duration) var(--transition-delay) var(--transition-iteration-count) linear;
	opacity: 0;
	pointer-events: none;
}

.any-tdf-confetti::before {
	--full-rotation: var(--rotation-xyz), var(--rotation-deg);
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	background: var(--color);
	background-size: contain;
	transform: skew(var(--skew)) rotate3d(var(--full-rotation));
	animation: any-tdf-confetti-rotate var(--transition-duration) var(--transition-delay) var(--transition-iteration-count) linear;
}

.any-tdf-confetti-holder.rounded .any-tdf-confetti::before {
	border-radius: 50%;
}

.any-tdf-confetti-holder.cone .any-tdf-confetti {
	--translate-x: calc(200px * var(--translate-y-multiplier) * var(--translate-x-multiplier));
}

.any-tdf-confetti-holder.no-gravity .any-tdf-confetti {
	animation-name: any-tdf-confetti-no-gravity-translate;
	animation-timing-function: ease-out;
}

@media (prefers-reduced-motion) {
	.any-tdf-confetti-holder.reduced-motion .any-tdf-confetti,
	.any-tdf-confetti-holder.reduced-motion .any-tdf-confetti::before {
		animation: none;
	}
}
`;

const createPieces = (options: ConfettiPieceOptions & { amount: number }) =>
	Array.from({ length: options.amount }, () => createPiece(options));

export const Confetti = defineComponent({
	name: 'Confetti',
	inheritAttrs: false,
	props: {
		size: { type: Number, default: 10 },
		x: { type: Array as unknown as PropType<Range>, default: () => DEFAULT_X },
		y: { type: Array as unknown as PropType<Range>, default: () => DEFAULT_Y },
		duration: { type: Number, default: 2000 },
		infinite: { type: Boolean, default: false },
		delay: { type: Array as unknown as PropType<Range>, default: () => DEFAULT_DELAY },
		colorRange: { type: Array as unknown as PropType<Range>, default: () => DEFAULT_COLOR_RANGE },
		colorArray: { type: Array as PropType<string[]>, default: () => [] },
		amount: { type: Number, default: 50 },
		iterationCount: { type: [Number, String] as PropType<IterationCount>, default: 1 },
		fallDistance: { type: String, default: '100px' },
		rounded: { type: Boolean, default: false },
		cone: { type: Boolean, default: false },
		noGravity: { type: Boolean, default: false },
		xSpread: { type: Number, default: 0.15 },
		destroyOnComplete: { type: Boolean, default: true },
		disableForReducedMotion: { type: Boolean, default: false },
		className: { type: String, default: '' },
		style: { type: [String, Object, Array] as PropType<StyleValue>, default: undefined }
	},
	setup(props, { attrs }) {
		const complete = shallowRef(false);
		let mounted = false;
		let timer: ReturnType<typeof setTimeout> | undefined;

		const options = computed(() => {
			const [xMin, xMax] = props.x;
			const [yMin, yMax] = props.y;
			const [delayMin, delayMax] = props.delay;
			const [colorRangeMin, colorRangeMax] = props.colorRange;
			return {
				amount: props.amount,
				xMin,
				xMax,
				yMin,
				yMax,
				duration: props.duration,
				delayMin,
				delayMax,
				colorRangeMin,
				colorRangeMax,
				colorArray: props.colorArray,
				infinite: props.infinite
			};
		});

		const pieceKey = computed(() =>
			[
				props.amount,
				props.x[0],
				props.x[1],
				props.y[0],
				props.y[1],
				props.duration,
				props.delay[0],
				props.delay[1],
				props.colorRange[0],
				props.colorRange[1],
				props.colorArray.join('\u0000'),
				props.infinite
			].join('|')
		);

		const timerKey = computed(() => [pieceKey.value, props.destroyOnComplete, props.iterationCount].join('|'));

		const pieces = shallowRef(createPieces(options.value));

		const clearCompletionTimer = () => {
			if (!timer) return;
			clearTimeout(timer);
			timer = undefined;
		};

		const scheduleCompletion = () => {
			clearCompletionTimer();
			complete.value = false;
			if (!mounted || !props.destroyOnComplete || props.infinite || typeof props.iterationCount === 'string') return;
			timer = setTimeout(
				() => {
					complete.value = true;
				},
				(props.duration + props.delay[1]) * props.iterationCount
			);
		};

		watch(pieceKey, () => {
			pieces.value = createPieces(options.value);
			scheduleCompletion();
		});

		watch(timerKey, scheduleCompletion);

		onMounted(() => {
			mounted = true;
			scheduleCompletion();
		});

		onBeforeUnmount(clearCompletionTimer);

		return () => {
			if (complete.value) return null;
			const { class: attrClass, style: attrStyle, ...restAttrs } = attrs;
			const holderStyle: ConfettiCssProperties = {
				'--fall-distance': props.fallDistance,
				'--size': `${props.size}px`,
				'--x-spread': 1 - props.xSpread,
				'--transition-iteration-count': props.infinite ? 'infinite' : props.iterationCount
			};

			return h(
				'div',
				{
					...restAttrs,
					class: [
						'any-tdf-confetti-holder',
						props.rounded ? 'rounded' : '',
						props.cone ? 'cone' : '',
						props.noGravity ? 'no-gravity' : '',
						props.disableForReducedMotion ? 'reduced-motion' : '',
						props.className,
						attrClass
					],
					style: [holderStyle, props.style, attrStyle]
				},
				[
					h('style', confettiStyles),
					...pieces.value.map((piece, index) => {
						const pieceStyle: ConfettiCssProperties = {
							'--color': piece.color,
							'--skew': piece.skew,
							'--rotation-xyz': piece.rotationXyz,
							'--rotation-deg': piece.rotationDeg,
							'--translate-y-multiplier': piece.translateYMultiplier,
							'--translate-x-multiplier': piece.translateXMultiplier,
							'--scale': piece.scale,
							'--transition-delay': piece.transitionDelay,
							'--transition-duration': piece.transitionDuration
						};
						return h('div', { key: index, class: 'any-tdf-confetti', style: pieceStyle });
					})
				]
			);
		};
	}
});

export default Confetti;
