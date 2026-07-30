import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

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
	style?: CSSProperties;
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
const DEFAULT_COLOR_ARRAY: string[] = [];

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

const confettiStyles = `
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

const ConfettiComponent = ({
	size = 10,
	x = DEFAULT_X,
	y = DEFAULT_Y,
	duration = 2000,
	infinite = false,
	delay = DEFAULT_DELAY,
	colorRange = DEFAULT_COLOR_RANGE,
	colorArray = DEFAULT_COLOR_ARRAY,
	amount = 50,
	iterationCount = 1,
	fallDistance = '100px',
	rounded = false,
	cone = false,
	noGravity = false,
	xSpread = 0.15,
	destroyOnComplete = true,
	disableForReducedMotion = false,
	className = '',
	style
}: ConfettiProps) => {
	const [complete, setComplete] = useState(false);
	const [xMin, xMax] = x;
	const [yMin, yMax] = y;
	const [delayMin, delayMax] = delay;
	const [colorRangeMin, colorRangeMax] = colorRange;
	const colorArrayKey = colorArray.join('\u0000');
	const pieces = useMemo(
		() =>
			Array.from({ length: amount }, () =>
				createPiece({
					xMin,
					xMax,
					yMin,
					yMax,
					duration,
					delayMin,
					delayMax,
					colorRangeMin,
					colorRangeMax,
					colorArray,
					infinite
				})
			),
		[amount, colorArrayKey, colorRangeMax, colorRangeMin, delayMax, delayMin, duration, infinite, xMax, xMin, yMax, yMin]
	);

	useEffect(() => {
		setComplete(false);
		if (!destroyOnComplete || infinite || typeof iterationCount === 'string') return;
		const timer = setTimeout(() => setComplete(true), (duration + delayMax) * iterationCount);
		return () => clearTimeout(timer);
	}, [delayMax, destroyOnComplete, duration, infinite, iterationCount]);

	if (complete) return null;

	const holderClass = [
		'any-tdf-confetti-holder',
		rounded ? 'rounded' : '',
		cone ? 'cone' : '',
		noGravity ? 'no-gravity' : '',
		disableForReducedMotion ? 'reduced-motion' : '',
		className
	]
		.filter(Boolean)
		.join(' ');
	const holderStyle: ConfettiCssProperties = {
		'--fall-distance': fallDistance,
		'--size': `${size}px`,
		'--x-spread': 1 - xSpread,
		'--transition-iteration-count': infinite ? 'infinite' : iterationCount,
		...style
	};

	return (
		<div className={holderClass} style={holderStyle}>
			<style>{confettiStyles}</style>
			{pieces.map((piece, index) => {
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
				return <div key={index} className="any-tdf-confetti" style={pieceStyle} />;
			})}
		</div>
	);
};

export const Confetti = ConfettiComponent as ((props: ConfettiProps) => any) & { displayName?: string };

Confetti.displayName = 'Confetti';

export default Confetti;
