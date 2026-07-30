import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { Confetti } from './index';

const withRandomValues = (values: number[], render: () => string) => {
	const originalRandom = Math.random;
	let index = 0;
	Math.random = () => values[index++ % values.length] ?? 0;
	try {
		return render();
	} finally {
		Math.random = originalRandom;
	}
};

test('renders svelte-confetti compatible default markup and styles', () => {
	const html = withRandomValues([0.5], () => renderToStaticMarkup(<Confetti destroyOnComplete={false} />));
	expect(html).toContain('any-tdf-confetti-holder');
	expect(html.match(/class="any-tdf-confetti"/g)?.length).toBe(50);
	expect(html).toContain('--transition-iteration-count:1');
	expect(html).toContain('--fall-distance:100px');
	expect(html).toContain('--size:10px');
	expect(html).toContain('--x-spread:0.85');
	expect(html).toContain('@keyframes any-tdf-confetti-rotate');
	expect(html).toContain('@keyframes any-tdf-confetti-translate');
	expect(html).toContain('@keyframes any-tdf-confetti-no-gravity-translate');
	expect(html).toContain('--translate-y: calc(-200px * var(--translate-y-multiplier))');
	expect(html).toContain('--translate-x: calc(200px * var(--translate-x-multiplier))');
});

test('renders rounded amount markup without destroying during SSR', () => {
	const html = withRandomValues([0.5], () => renderToStaticMarkup(<Confetti rounded amount={3} destroyOnComplete={false} />));
	expect(html).toContain('any-tdf-confetti-holder');
	expect(html).toContain('rounded');
	expect(html.match(/class="any-tdf-confetti"/g)?.length).toBe(3);
	expect(html).toContain('--transition-iteration-count:1');
	expect(html).toContain('--fall-distance:100px');
});

test('supports cone, noGravity, infinite, and reduced motion classes', () => {
	const html = withRandomValues([0.5], () => renderToStaticMarkup(<Confetti cone noGravity infinite disableForReducedMotion amount={1} />));
	expect(html).toContain('cone');
	expect(html).toContain('no-gravity');
	expect(html).toContain('reduced-motion');
	expect(html).toContain('--transition-iteration-count:infinite');
	expect(html).toContain('calc(2000ms * var(--scale))');
	expect(html).toContain('animation-name: any-tdf-confetti-no-gravity-translate');
	expect(html).toContain('animation: none');
});

test('uses colorArray before colorRange', () => {
	const html = withRandomValues([0.5], () =>
		renderToStaticMarkup(<Confetti amount={1} colorArray={['red', 'blue', 'green']} destroyOnComplete={false} />)
	);
	expect(html).toContain('--color:blue');
});

test('uses colorRange for HSL colors when colorArray is empty', () => {
	const html = withRandomValues([0], () => renderToStaticMarkup(<Confetti amount={1} colorRange={[75, 150]} destroyOnComplete={false} />));
	expect(html).toContain('--color:hsl(75, 75%, 50%)');
});

test('supports complete API values and React className/style passthrough', () => {
	const html = withRandomValues([0], () =>
		renderToStaticMarkup(
			<Confetti
				amount={2}
				size={12}
				x={[-1, 1]}
				y={[-0.5, 0.5]}
				duration={1500}
				delay={[100, 200]}
				colorRange={[10, 20]}
				iterationCount={3}
				fallDistance="5rem"
				rounded
				cone
				noGravity
				xSpread={0.4}
				destroyOnComplete={false}
				disableForReducedMotion
				className="custom-confetti"
				style={{ zIndex: 1 }}
			/>
		)
	);
	expect(html).toContain('custom-confetti');
	expect(html.match(/class="any-tdf-confetti"/g)?.length).toBe(2);
	expect(html).toContain('--size:12px');
	expect(html).toContain('--fall-distance:5rem');
	expect(html).toContain('--x-spread:0.6');
	expect(html).toContain('--transition-iteration-count:3');
	expect(html).toContain('--transition-duration:1500ms');
	expect(html).toContain('--transition-delay:100ms');
	expect(html).toContain('z-index:1');
});
