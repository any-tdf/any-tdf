import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const docsSourceRoot = resolve(import.meta.dir, '../../../apps/runtime-docs/react-confetti/src');
const appSource = readFileSync(resolve(docsSourceRoot, 'App.tsx'), 'utf8');
const stylesSource = readFileSync(resolve(docsSourceRoot, 'styles.css'), 'utf8');

const expectSourceIncludes = (source: string, snippets: string[]) => {
	const missing = snippets.filter((snippet) => !source.includes(snippet));
	expect(missing).toEqual([]);
};

test('docs top demo keeps upstream svelte-confetti examples', () => {
	expectSourceIncludes(appSource, [
		'copy.buttons.default',
		'copy.buttons.lots',
		'copy.buttons.few',
		'copy.buttons.large',
		'copy.buttons.rounded',
		'copy.buttons.colored',
		'copy.buttons.multiColored',
		'copy.buttons.images',
		'copy.buttons.gradient',
		'copy.buttons.flag',
		'copy.buttons.vertical',
		'copy.buttons.horizontal',
		'copy.buttons.cone',
		'copy.buttons.allAround',
		'copy.buttons.explosion',
		'copy.buttons.sparkles',
		'copy.buttons.spray',
		'copy.buttons.feathered',
		'copy.buttons.constant',
		'copy.buttons.fullscreen',
		'<Confetti amount={200} />',
		'<Confetti amount={10} />',
		'<Confetti size={20} />',
		'<Confetti rounded size={15} />',
		'<Confetti colorArray={colors.primary} />',
		'<Confetti colorArray={colors.multi} />',
		'<Confetti size={20} colorArray={colors.image} />',
		'<Confetti size={20} colorArray={colors.gradient} />',
		'<FlagConfetti />',
		'<Confetti y={[1, 2]} x={[-0.25, 0.25]} />',
		'<Confetti y={[0.25, 0.5]} x={[-4, 4]} />',
		'<Confetti cone />',
		'<Confetti y={[-0.5, 0.5]} x={[-0.5, 0.5]} />',
		'<Confetti y={[-1, 1]} x={[-1, 1]} noGravity duration={750} />',
		'<SparklesConfetti />',
		'<Confetti delay={[0, 750]} />',
		'<FeatheredConfetti />',
		'<Confetti infinite amount={20} delay={[0, 500]} />',
		'<FullscreenConfetti />'
	]);
});

test('docs usage sections cover upstream long-form examples in both locales', () => {
	const englishLabels = [
		'Left',
		'Right',
		'Up',
		'Down',
		'Everywhere',
		'Too many',
		'Right Cone',
		'Tiny',
		'Huge',
		'Round',
		'Short delay',
		'Long delay',
		'Infinite',
		'Green range',
		'Array',
		'Different values',
		'Random',
		'Slow fall',
		'Fast fall',
		'No fall',
		'No gravity',
		'No gravity explosion',
		'Small spread',
		'Large spread',
		'Dutch',
		'Swedish',
		'USA',
		'Not feathered',
		'Feathered cone',
		'Feathered and delayed',
		'Animate',
		'Animate explosion',
		'Fullscreen'
	];
	const chineseLabels = [
		'向左',
		'向右',
		'向上',
		'向下',
		'四周',
		'过多',
		'向右锥形',
		'细小',
		'巨大',
		'圆形巨大',
		'短延迟',
		'长延迟',
		'迭代无限',
		'绿色范围',
		'数组',
		'不同值',
		'随机',
		'慢速下落',
		'快速下落',
		'不下落',
		'无重力',
		'无重力爆炸',
		'小扩散',
		'大扩散',
		'荷兰',
		'瑞典',
		'美国',
		'未羽化',
		'羽化锥形',
		'羽化延迟',
		'动画',
		'爆炸动画',
		'全屏'
	];
	expectSourceIncludes(
		appSource,
		englishLabels.map((label) => `label: '${label}'`)
	);
	expectSourceIncludes(
		appSource,
		chineseLabels.map((label) => `label: '${label}'`)
	);
	expectSourceIncludes(appSource, [
		'<Confetti colorRange={[75, 175]} />',
		'<Confetti colorArray={colors.fiveColorArray} />',
		'<Confetti colorArray={colors.differentValues} />',
		'<Confetti size={20} colorArray={colors.docsGradient} />',
		'<RandomColorConfetti />',
		"<Confetti fallDistance='50px' />",
		"<Confetti fallDistance='200px' />",
		"<Confetti fallDistance='0px' />",
		'<Confetti noGravity duration={500} />',
		'<Confetti noGravity duration={500} x={[-0.5, 0.5]} y={[-0.5, 0.5]} />',
		'<Confetti xSpread={0.1} />',
		'<Confetti xSpread={0.4} />',
		'<DutchFlagConfetti />',
		'<SwedishFlagConfetti />',
		'<UsaFlagConfetti />',
		'<FeatheredNoConeConfetti />',
		'<FeatheredConeDocsConfetti />',
		'<FeatheredDelayedConfetti />',
		'<AnimateConfetti />',
		'<AnimateExplosionConfetti />'
	]);
});

test('docs API table lists all svelte-confetti props plus React additions', () => {
	const props = [
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
	expectSourceIncludes(
		appSource,
		props.map((prop) => `name: '${prop}'`)
	);
});

test('docs helper behavior matches upstream helper components', () => {
	expectSourceIncludes(appSource, [
		'flushSync(() => setActive(false));',
		'setActive((current) => !current)',
		'createPortal(',
		'document.body',
		"className='fullscreen-confetti'",
		'x={[-5, 5]}',
		'y={[0, 0.1]}',
		'delay={[500, 2000]}',
		'duration={5000}',
		'amount={200}',
		"fallDistance='100vh'",
		'event.clientX - bounds.left',
		'event.clientY - bounds.top',
		'<Confetti amount={10} y={[-0.5, 0.5]} fallDistance="20px" duration={2000} />'
	]);
	expectSourceIncludes(stylesSource, [
		'.confetti-toggle.relative .confetti',
		'top: 50%;',
		'left: 50%;',
		'.fullscreen-confetti',
		'position: fixed;',
		'top: -50px;',
		'width: 100vw;',
		'height: 100vh;',
		'justify-content: center;',
		'overflow: hidden;',
		'pointer-events: none;',
		'.box',
		'height: 10rem;',
		'background: black;',
		'.box > span'
	]);
	expect(stylesSource).not.toContain(
		'.box {\n\tposition: relative;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\twidth: 100%;\n\theight: 10rem;\n\tmargin-top: 1rem;\n\tborder: 1px solid var(--border-color);\n\tborder-radius: 0.5rem;\n\tcolor: white;\n\tbackground: black;\n\tfont-weight: 700;\n\tuser-select: none;\n\tcursor: pointer;\n\toverflow: hidden;'
	);
});
