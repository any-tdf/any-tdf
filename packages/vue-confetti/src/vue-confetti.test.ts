import { expect, test } from 'bun:test';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { Confetti } from './index';

const withRandomValues = async (values: number[], render: () => Promise<string>) => {
	const originalRandom = Math.random;
	let index = 0;
	Math.random = () => values[index++ % values.length] ?? 0;
	try {
		return await render();
	} finally {
		Math.random = originalRandom;
	}
};

const renderConfetti = (props = {}) => renderToString(createSSRApp({ render: () => h(Confetti, props) }));

test('renders svelte-confetti compatible default markup and styles', async () => {
	const html = await withRandomValues([0.5], () => renderConfetti({ destroyOnComplete: false }));
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

test('renders rounded amount markup without destroying during SSR', async () => {
	const html = await withRandomValues([0.5], () => renderConfetti({ rounded: true, amount: 3, destroyOnComplete: false }));
	expect(html).toContain('any-tdf-confetti-holder rounded');
	expect(html.match(/class="any-tdf-confetti"/g)?.length).toBe(3);
	expect(html).toContain('--transition-iteration-count:1');
	expect(html).toContain('--fall-distance:100px');
});

test('supports cone, noGravity, infinite, and reduced motion classes', async () => {
	const html = await withRandomValues([0.5], () =>
		renderConfetti({ cone: true, noGravity: true, infinite: true, disableForReducedMotion: true, amount: 1 })
	);
	expect(html).toContain('cone');
	expect(html).toContain('no-gravity');
	expect(html).toContain('reduced-motion');
	expect(html).toContain('--transition-iteration-count:infinite');
	expect(html).toContain('calc(2000ms * var(--scale))');
	expect(html).toContain('animation-name: any-tdf-confetti-no-gravity-translate');
	expect(html).toContain('animation: none');
});

test('uses colorArray before colorRange', async () => {
	const html = await withRandomValues([0.5], () =>
		renderConfetti({ amount: 1, colorArray: ['red', 'blue', 'green'], destroyOnComplete: false })
	);
	expect(html).toContain('--color:blue');
});

test('uses colorRange for HSL colors when colorArray is empty', async () => {
	const html = await withRandomValues([0], () => renderConfetti({ amount: 1, colorRange: [75, 150], destroyOnComplete: false }));
	expect(html).toContain('--color:hsl(75, 75%, 50%)');
});

test('supports complete API values and className/style passthrough', async () => {
	const html = await withRandomValues([0], () =>
		renderConfetti({
			amount: 2,
			size: 12,
			x: [-1, 1],
			y: [-0.5, 0.5],
			duration: 1500,
			delay: [100, 200],
			colorRange: [10, 20],
			iterationCount: 3,
			fallDistance: '5rem',
			rounded: true,
			cone: true,
			noGravity: true,
			xSpread: 0.4,
			destroyOnComplete: false,
			disableForReducedMotion: true,
			className: 'custom-confetti',
			style: { zIndex: 1 }
		})
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

test('merges Vue native class and style attrs onto the holder', async () => {
	const html = await withRandomValues([0.5], () =>
		renderConfetti({
			amount: 1,
			destroyOnComplete: false,
			className: 'class-name-value',
			class: 'native-class-value',
			style: [{ zIndex: 2 }, { position: 'absolute' }]
		})
	);
	expect(html).toContain('class-name-value');
	expect(html).toContain('native-class-value');
	expect(html).toContain('z-index:2');
	expect(html).toContain('position:absolute');
});
