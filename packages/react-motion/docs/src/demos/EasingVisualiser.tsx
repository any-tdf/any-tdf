import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import Activity from 'lucide-react/dist/esm/icons/activity.mjs';
import Minus from 'lucide-react/dist/esm/icons/minus.mjs';
import Play from 'lucide-react/dist/esm/icons/play.mjs';
import Plus from 'lucide-react/dist/esm/icons/plus.mjs';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw.mjs';
import Timer from 'lucide-react/dist/esm/icons/timer.mjs';
import TypeIcon from 'lucide-react/dist/esm/icons/type.mjs';
import { easingFunctions, linear, type EasingFunction } from '@any-tdf/react-motion/easing';
import { Tween } from '@any-tdf/react-motion/motion';
import type { Locale } from '../content';
import { uiText } from '../content';

type EaseType = 'In' | 'Out' | 'InOut';
type EaseName = 'sine' | 'quad' | 'cubic' | 'quart' | 'quint' | 'expo' | 'circ' | 'back' | 'elastic' | 'bounce';
type EaseVariant = {
	fn: EasingFunction;
	shape: number[];
};
type EaseRecord = Record<EaseType, EaseVariant>;

const easeNames: EaseName[] = ['sine', 'quad', 'cubic', 'quart', 'quint', 'expo', 'circ', 'back', 'elastic', 'bounce'];
const typeOptions: Array<{ label: string; value: EaseType }> = [
	{ label: 'Ease In', value: 'In' },
	{ label: 'Ease Out', value: 'Out' },
	{ label: 'Ease In Out', value: 'InOut' }
];
const graphTicks = Array.from({ length: 8 }, (_, index) => (index + 1) * 200);
const verticalGridTicks = graphTicks.slice(0, 6);

const createShape = (easing: EasingFunction) => {
	const shape: number[] = [];
	for (let index = 0; index <= 1000; index += 1) {
		shape.push(1000 - easing(index / 1000) * 1000);
	}
	return shape;
};

const createEaseVariant = (name: EaseName, type: EaseType): EaseVariant => {
	const easing = easingFunctions[`${name}${type}` as keyof typeof easingFunctions];
	return {
		fn: easing,
		shape: createShape(easing)
	};
};

const createEaseMap = () =>
	new Map<EaseName, EaseRecord>(
		easeNames.map((name) => [
			name,
			{
				In: createEaseVariant(name, 'In'),
				Out: createEaseVariant(name, 'Out'),
				InOut: createEaseVariant(name, 'InOut')
			}
		])
	);

const shapeToPath = (shape: number[]) => {
	let path = `M0 ${shape[0]}`;
	for (let index = 1; index < shape.length; index += 1) {
		path += ` L${index} ${shape[index]}`;
	}
	return path;
};

const useTweenedValue = <T,>(initial: T) => {
	const tweenRef = useRef<Tween<T> | null>(null);
	if (tweenRef.current === null) {
		tweenRef.current = new Tween(initial);
	}

	const tween = tweenRef.current;
	const [value, setValue] = useState(tween.current);

	useEffect(() => tween.subscribe(setValue), [tween]);

	return [value, tween] as const;
};

const Grid = ({ x, y }: { x: number; y: number }) => (
	<g className="easing-grid">
		<rect className="easing-grid-background" x="0" y="0" width="1400" height="1800" />
		{verticalGridTicks.map((tick) => (
			<line key={`vertical-${tick}`} className="easing-grid-line" x1={tick} y1="0" x2={tick} y2="1800" />
		))}
		{graphTicks.map((tick) => (
			<line key={`horizontal-${tick}`} className="easing-grid-line" x1="0" y1={tick} x2="1400" y2={tick} />
		))}
		<line
			className="easing-grid-line easing-grid-line-moving"
			x1="0"
			y1="0"
			x2="0"
			y2="1800"
			style={{ transform: `translateX(${x + 200}px)` }}
		/>
		<line
			className="easing-grid-line easing-grid-line-moving"
			x1="0"
			y1="400"
			x2="1400"
			y2="400"
			style={{ transform: `translateY(${y}px)` }}
		/>
		<rect className="easing-plot-frame" x="200" y="400" width="1000" height="1000" />
	</g>
);

export const EasingVisualiser = ({ locale }: { locale: Locale }) => {
	const labels = uiText[locale];
	const easeMap = useMemo(createEaseMap, []);
	const [currentEase, setCurrentEase] = useState<EaseName>('sine');
	const [currentType, setCurrentType] = useState<EaseType>('In');
	const [duration, setDuration] = useState(2000);
	const [playing, setPlaying] = useState(false);
	const durationRef = useRef(duration);
	const current = easeMap.get(currentEase)![currentType];
	const [shape, shapeTween] = useTweenedValue(current.shape);
	const [time, timeTween] = useTweenedValue(0);
	const [value, valueTween] = useTweenedValue(1000);
	const path = useMemo(() => shapeToPath(shape), [shape]);

	useEffect(() => {
		durationRef.current = duration;
	}, [duration]);

	const runAnimations = useCallback(
		async (selected: EaseVariant) => {
			setPlaying(true);
			await valueTween.set(1000, { duration: 0 });
			await timeTween.set(0, { duration: 0 });
			await shapeTween.set(selected.shape);
			await Promise.all([
				timeTween.set(1000, { duration: durationRef.current, easing: linear }),
				valueTween.set(0, { duration: durationRef.current, easing: selected.fn })
			]);
			setPlaying(false);
		},
		[shapeTween, timeTween, valueTween]
	);

	useEffect(() => {
		void runAnimations(current);
	}, [current, runAnimations]);

	const updateDuration = (event: ChangeEvent<HTMLInputElement>) => {
		setDuration(Math.max(0, Number(event.currentTarget.value)));
	};

	const stepDuration = (amount: number) => {
		setDuration((currentDuration) => Math.max(0, currentDuration + amount));
	};

	return (
		<section className="easing-visualiser" aria-label={labels.easingVisualiser}>
			<div className="easing-stage">
				<svg className="easing-svg" viewBox="0 0 1400 1802" role="img" aria-label={`${currentEase}${currentType} ${labels.curveSuffix}`}>
					<Grid x={time} y={value} />
					<g className="easing-graph">
						<path className="easing-path" d={path} />
						<path
							className="easing-marker"
							d="M0,23.647C0,22.41 27.014,0.407 28.496,0.025C29.978,-0.357 69.188,3.744 70.104,4.744C71.02,5.745 71.02,41.499 70.104,42.5C69.188,43.501 29.978,47.601 28.496,47.219C27.014,46.837 0,24.884 0,23.647Z"
							style={{ transform: `translate(1060px, ${value - 24}px)` }}
						/>
						<circle className="easing-tracker" cx={time} cy={value} r="15" />
					</g>
				</svg>
			</div>

			<aside className="easing-controls" aria-label={labels.easingControls}>
				<div className="easing-control-block">
					<h2 className="icon-heading compact">
						<Activity className="heading-icon" size={17} strokeWidth={2.1} aria-hidden="true" />
						<span>{labels.ease}</span>
					</h2>
					<div className="easing-button-list desktop-controls">
						{easeNames.map((name) => (
							<button key={name} className={name === currentEase ? 'selected' : ''} type="button" onClick={() => setCurrentEase(name)}>
								{name}
							</button>
						))}
					</div>
					<select
						className="mobile-controls"
						value={currentEase}
						aria-label={labels.ease}
						onChange={(event) => setCurrentEase(event.currentTarget.value as EaseName)}
					>
						{easeNames.map((name) => (
							<option key={name} value={name}>
								{name}
							</option>
						))}
					</select>
				</div>

				<div className="easing-control-block">
					<h2 className="icon-heading compact">
						<TypeIcon className="heading-icon" size={17} strokeWidth={2.1} aria-hidden="true" />
						<span>{labels.type}</span>
					</h2>
					<div className="easing-button-list desktop-controls">
						{typeOptions.map((option) => (
							<button
								key={option.value}
								className={option.value === currentType ? 'selected' : ''}
								type="button"
								onClick={() => setCurrentType(option.value)}
							>
								{option.label}
							</button>
						))}
					</div>
					<select
						className="mobile-controls"
						value={currentType}
						aria-label={labels.type}
						onChange={(event) => setCurrentType(event.currentTarget.value as EaseType)}
					>
						{typeOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				<label className="duration-control">
					<span className="icon-heading compact">
						<Timer className="heading-icon" size={17} strokeWidth={2.1} aria-hidden="true" />
						<span>{labels.duration}</span>
					</span>
					<input min="0" step="100" type="number" value={duration} onChange={updateDuration} />
				</label>

				<div className="duration-buttons" aria-label={labels.durationShortcuts}>
					<button type="button" aria-label="-100 ms" onClick={() => stepDuration(-100)}>
						<Minus size={16} strokeWidth={2.2} aria-hidden="true" />
					</button>
					<button type="button" aria-label="+100 ms" onClick={() => stepDuration(100)}>
						<Plus size={16} strokeWidth={2.2} aria-hidden="true" />
					</button>
				</div>

				<button className="play-button" type="button" onClick={() => void runAnimations(current)}>
					{playing ? (
						<RotateCcw className="button-icon" size={17} strokeWidth={2.2} aria-hidden="true" />
					) : (
						<Play className="button-icon" size={17} strokeWidth={2.2} aria-hidden="true" />
					)}
					<span>{playing ? labels.restart : labels.play}</span>
				</button>
			</aside>
		</section>
	);
};
