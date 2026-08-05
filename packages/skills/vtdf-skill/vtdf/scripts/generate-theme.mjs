#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, '..');
const themesPath = path.join(skillRoot, 'data/themes.json');
const themes = existsSync(themesPath) ? JSON.parse(readFileSync(themesPath, 'utf-8')) : [];

const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const neutralColors = {
	'--color-black': 'oklch(0 0 0)',
	'--color-white': 'oklch(1 0 0)',
	'--color-gray-50': 'oklch(0.961 0 0)',
	'--color-gray-100': 'oklch(0.925 0 0)',
	'--color-gray-200': 'oklch(0.845 0 0)',
	'--color-gray-300': 'oklch(0.767 0 0)',
	'--color-gray-400': 'oklch(0.683 0 0)',
	'--color-gray-500': 'oklch(0.6 0 0)',
	'--color-gray-600': 'oklch(0.51 0 0)',
	'--color-gray-700': 'oklch(0.42 0 0)',
	'--color-gray-800': 'oklch(0.321 0 0)',
	'--color-gray-900': 'oklch(0.218 0 0)',
	'--color-gray-950': 'oklch(0.159 0 0)',
	'--color-transparent': 'transparent'
};

const radiusOptions = {
	box: ['0', '0.25rem', '0.375rem', '0.5rem', '0.75rem', '1rem', '1.5rem', '2rem'],
	form: ['0', '0.25rem', '0.375rem', '0.5rem', '0.75rem', '1rem', '1.5rem', 'calc(infinity * 1px)'],
	small: ['0', '0.25rem', '0.375rem', '0.5rem', '0.75rem', '1rem', '1.5rem', 'calc(infinity * 1px)']
};

const parseArgs = (argv) => {
	const args = {};
	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		if (!arg.startsWith('--')) {
			continue;
		}
		const key = arg.slice(2);
		const next = argv[index + 1];
		if (!next || next.startsWith('--')) {
			args[key] = true;
			continue;
		}
		args[key] = next;
		index += 1;
	}
	return args;
};

const fail = (message) => {
	console.error(message);
	process.exit(1);
};

const parseOklch = (color) => {
	const match = String(color).match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\s*\)/i);
	if (!match) {
		fail(`Invalid OKLCH color: ${color}`);
	}
	return { l: Number(match[1]), c: Number(match[2]), h: Number(match[3]) };
};

const formatNumber = (value) => +value.toFixed(3);

const formatOklch = ({ l, c, h }) => `oklch(${formatNumber(l)} ${formatNumber(c)} ${formatNumber(h)})`;

const generateColorScale = (baseColor) => {
	const { l, c, h } = parseOklch(baseColor);
	const hueStep = 2;
	const lightSteps = 6;
	const darkSteps = 4;

	const getNewHue = (isLight, idx) => {
		const delta = hueStep * idx;
		const hue = h >= 60 && h <= 240 ? (isLight ? h - delta : h + delta) : isLight ? h + delta : h - delta;
		return ((hue % 360) + 360) % 360;
	};

	const getNewChroma = (isLight, idx) => {
		const minChroma = c * 0.15;
		return isLight ? c - ((c - minChroma) / 6) * idx : Math.min(c * 1.1, c + 0.02 * idx);
	};

	const getNewLightness = (isLight, idx) => {
		const maxL = l < 0.97 ? 0.97 : Math.min(0.99, l + Math.max((1 - l) * 0.6, 0.02));
		const minL = l > 0.25 ? 0.25 : Math.max(0.05, l - Math.max(l * 0.6, 0.04));
		return isLight ? l + ((maxL - l) / lightSteps) * idx : l - ((l - minL) / darkSteps) * idx;
	};

	const buildColor = (index) => {
		if (index === 6) {
			return formatOklch({ l, c, h });
		}
		const isLight = index < 6;
		const idx = isLight ? 6 - index : index - 6;
		return formatOklch({
			l: getNewLightness(isLight, idx),
			c: Math.max(0, getNewChroma(isLight, idx)),
			h: getNewHue(isLight, idx)
		});
	};

	return Object.fromEntries(steps.map((step, index) => [step, buildColor(index)]));
};

const createRandom = (seedValue) => {
	if (!seedValue) {
		return Math.random;
	}
	let state = 0;
	String(seedValue)
		.split('')
		.forEach((char) => {
			state = (state * 31 + char.charCodeAt(0)) >>> 0;
		});
	return () => {
		state = (state * 1664525 + 1013904223) >>> 0;
		return state / 0x100000000;
	};
};

const randomInRange = (random, min, max) => random() * (max - min) + min;

const randomOklch = (random, mode) => ({
	h: random() * 360,
	c: 0.12 + random() * 0.13,
	l: mode === 'light' ? 0.35 + random() * 0.2 : 0.7 + random() * 0.2
});

const generateBgColors = (primaryColor, darkColor) => {
	const primary = parseOklch(primaryColor);
	const dark = parseOklch(darkColor);
	return {
		'color-bg-base': `oklch(0.967 ${(primary.c * 0.05).toFixed(4)} ${primary.h.toFixed(1)})`,
		'color-bg-surface': `oklch(0.985 0.005 ${dark.h.toFixed(1)})`,
		'color-bg-overlay': `oklch(0.955 0.005 ${dark.h.toFixed(1)})`,
		'color-bg-highlight': `oklch(0.98 ${(primary.c * 0.03).toFixed(4)} ${primary.h.toFixed(1)})`,
		'color-bg-base-dark': `oklch(0.15 ${(dark.c * 0.08).toFixed(4)} ${dark.h.toFixed(1)})`,
		'color-bg-surface-dark': `oklch(0.22 ${(dark.c * 0.06).toFixed(4)} ${((dark.h + 15) % 360).toFixed(1)})`,
		'color-bg-overlay-dark': `oklch(0.19 ${(dark.c * 0.05).toFixed(4)} ${dark.h.toFixed(1)})`,
		'color-bg-highlight-dark': `oklch(0.08 ${(dark.c * 0.04).toFixed(4)} ${dark.h.toFixed(1)})`
	};
};

const generateTextColors = (primaryColor, darkColor) => {
	const primary = parseOklch(primaryColor);
	const dark = parseOklch(darkColor);
	return {
		'color-text-primary': `oklch(0.144 ${(primary.c * 0.05).toFixed(3)} ${primary.h.toFixed(1)})`,
		'color-text-dark': `oklch(0.917 ${(dark.c * 0.25).toFixed(3)} ${dark.h.toFixed(1)})`,
		'color-text-on-primary': `oklch(0.883 ${(dark.c * 0.28).toFixed(3)} ${dark.h.toFixed(1)})`,
		'color-text-on-dark': `oklch(0.189 ${(primary.c * 0.17).toFixed(3)} ${primary.h.toFixed(1)})`
	};
};

const buildCustomTheme = ({ name, primary, dark }) => ({
	name,
	'color-primary': primary,
	'color-dark': dark,
	'color-success': 'oklch(0.65 0.18 155)',
	'color-warning': 'oklch(0.72 0.18 45)',
	'color-error': 'oklch(0.55 0.24 15)',
	'color-info': 'oklch(0.55 0.18 260)',
	'radius-box': '0.75rem',
	'radius-form': '0.5rem',
	'radius-small': '0.25rem',
	...generateBgColors(primary, dark),
	...generateTextColors(primary, dark),
	extend: [
		{ color: 'oklch(0.6 0.2 250)', alias: 'blue' },
		{ color: 'oklch(0.6 0.2 300)', alias: 'purple' },
		{ color: 'oklch(0.7 0.18 50)', alias: 'orange' },
		{ color: 'oklch(0.7 0.15 190)', alias: 'cyan' }
	]
});

const buildRandomTheme = ({ name, seed }) => {
	const random = createRandom(seed);
	const primary = randomOklch(random, 'light');
	const dark = randomOklch(random, 'dark');
	const generateFunctionalColor = (hMin, hMax) => ({
		l: randomInRange(random, 0.55, 0.65),
		c: randomInRange(random, 0.15, 0.22),
		h: randomInRange(random, hMin, hMax)
	});

	const baseLightness = 0.92 + random() * 0.06;
	const bgHue = random() * 360;
	const bgChroma = 0.01 + random() * 0.03;
	const surfaceLightDiff = (0.02 + random() * 0.03) * (random() > 0.5 ? 1 : -1);
	const overlayLightDiff = (0.01 + random() * 0.02) * (random() > 0.5 ? 1 : -1);
	const surfaceHueOffset = (10 + random() * 20) * (random() > 0.5 ? 1 : -1);
	const surfaceHue = (((bgHue + surfaceHueOffset) % 360) + 360) % 360;

	const baseDarkLightness = 0.12 + random() * 0.1;
	const bgDarkHue = random() * 360;
	const bgDarkChroma = 0.01 + random() * 0.03;
	const surfaceDarkDiff = (0.05 + random() * 0.05) * (random() > 0.5 ? 1 : -1);
	const overlayDarkDiff = (0.03 + random() * 0.03) * (random() > 0.5 ? 1 : -1);
	const surfaceDarkHueOffset = (10 + random() * 20) * (random() > 0.5 ? 1 : -1);
	const surfaceDarkHue = (((bgDarkHue + surfaceDarkHueOffset) % 360) + 360) % 360;

	const textLightHue = random() * 360;
	const textDarkHue = random() * 360;
	const textLightChroma = 0.01 + random() * 0.03;
	const textDarkChroma = 0.01 + random() * 0.03;
	const extend = Array.from({ length: 4 }, (_, index) => ({
		color: formatOklch({ l: 0.5 + random() * 0.2, c: 0.12 + random() * 0.13, h: random() * 360 }),
		alias: `extend${index + 1}`
	}));

	return {
		name,
		'color-primary': formatOklch(primary),
		'color-dark': formatOklch(dark),
		'color-success': formatOklch(generateFunctionalColor(140, 160)),
		'color-warning': formatOklch(generateFunctionalColor(60, 85)),
		'color-error': formatOklch(generateFunctionalColor(20, 40)),
		'color-info': formatOklch(generateFunctionalColor(240, 270)),
		'radius-box': radiusOptions.box[Math.floor(random() * radiusOptions.box.length)],
		'radius-form': radiusOptions.form[Math.floor(random() * radiusOptions.form.length)],
		'radius-small': radiusOptions.small[Math.floor(random() * radiusOptions.small.length)],
		'color-bg-base': formatOklch({ l: baseLightness, c: bgChroma, h: bgHue }),
		'color-bg-surface': formatOklch({ l: Math.max(0.88, Math.min(1, baseLightness + surfaceLightDiff)), c: bgChroma, h: surfaceHue }),
		'color-bg-overlay': formatOklch({ l: Math.max(0.88, Math.min(1, baseLightness + overlayLightDiff)), c: bgChroma, h: bgHue }),
		'color-bg-highlight': formatOklch({ l: 0.96 + random() * 0.04, c: random() * 0.02, h: random() > 0.5 ? primary.h : random() * 360 }),
		'color-bg-base-dark': formatOklch({ l: baseDarkLightness, c: bgDarkChroma, h: bgDarkHue }),
		'color-bg-surface-dark': formatOklch({
			l: Math.max(0.05, Math.min(0.35, baseDarkLightness + surfaceDarkDiff)),
			c: bgDarkChroma,
			h: surfaceDarkHue
		}),
		'color-bg-overlay-dark': formatOklch({
			l: Math.max(0.04, Math.min(0.3, baseDarkLightness + overlayDarkDiff)),
			c: bgDarkChroma,
			h: bgDarkHue
		}),
		'color-bg-highlight-dark': formatOklch({ l: 0.04 + random() * 0.08, c: random() * 0.02, h: random() > 0.5 ? dark.h : random() * 360 }),
		'color-text-primary': formatOklch({ l: 0.15 + random() * 0.15, c: textLightChroma, h: textLightHue }),
		'color-text-dark': formatOklch({ l: 0.85 + random() * 0.1, c: textDarkChroma, h: textDarkHue }),
		'color-text-on-primary': formatOklch({ l: 0.92 + random() * 0.08, c: textLightChroma * 0.5, h: primary.h }),
		'color-text-on-dark': formatOklch({ l: 0.08 + random() * 0.12, c: textDarkChroma * 0.5, h: dark.h }),
		extend
	};
};

const resolveTheme = (args) => {
	if (args.random) {
		return buildRandomTheme({ name: args.name || 'new theme', seed: args.seed });
	}
	if (args.primary || args.dark) {
		if (!args.primary || !args.dark) {
			fail('Both --primary and --dark are required when configuring colors manually.');
		}
		parseOklch(args.primary);
		parseOklch(args.dark);
		return buildCustomTheme({ name: args.name || 'MyTheme', primary: args.primary, dark: args.dark });
	}
	const preset = args.preset || 'ANYTDF';
	const lookupPreset = preset === 'VTDF' ? 'ANYTDF' : preset;
	const theme = themes.find((item) => item.name === lookupPreset);
	if (!theme) {
		fail(`Unknown preset "${preset}". Available presets: ${themes.map((item) => item.name).join(', ')}`);
	}
	return { ...theme, extend: [] };
};

const renderPlugin = (theme) => {
	const keys = [
		'color-primary',
		'color-dark',
		'color-bg-base',
		'color-bg-surface',
		'color-bg-overlay',
		'color-bg-highlight',
		'color-bg-base-dark',
		'color-bg-surface-dark',
		'color-bg-overlay-dark',
		'color-bg-highlight-dark',
		'color-text-primary',
		'color-text-dark',
		'color-text-on-primary',
		'color-text-on-dark',
		'color-success',
		'color-warning',
		'color-error',
		'color-info',
		'radius-box',
		'radius-form',
		'radius-small'
	];
	return `@plugin "vtdf/theme/plugin" {
\tname: "${theme.name}";

${keys.map((key) => `\t${key}: ${theme[key]};`).join('\n')}
}`;
};

const toThemeVars = (theme) => {
	const primaryScale = generateColorScale(theme['color-primary']);
	const darkScale = generateColorScale(theme['color-dark']);
	const vars = {};
	steps.forEach((step) => {
		vars[step === 600 ? '--color-primary' : `--color-primary-${step}`] = primaryScale[step];
	});
	steps.forEach((step) => {
		vars[step === 600 ? '--color-dark' : `--color-dark-${step}`] = darkScale[step];
	});
	Object.entries(neutralColors).forEach(([key, value]) => {
		vars[key] = value;
	});
	[
		'color-bg-base',
		'color-bg-surface',
		'color-bg-overlay',
		'color-bg-highlight',
		'color-bg-base-dark',
		'color-bg-surface-dark',
		'color-bg-overlay-dark',
		'color-bg-highlight-dark',
		'color-text-primary',
		'color-text-dark',
		'color-text-on-primary',
		'color-text-on-dark',
		'color-success',
		'color-warning',
		'color-error',
		'color-info',
		'radius-box',
		'radius-form',
		'radius-small'
	].forEach((key) => {
		vars[`--${key}`] = theme[key];
	});
	(theme.extend || []).forEach((item) => {
		vars[`--color-${item.alias}`] = item.color;
	});
	return vars;
};

const renderTheme = (theme) => {
	const vars = toThemeVars(theme);
	return `@theme {
${Object.entries(vars)
	.map(([key, value]) => `\t${key}: ${value};`)
	.join('\n')}
}`;
};

const renderJson = (theme) => {
	const primaryScale = generateColorScale(theme['color-primary']);
	const darkScale = generateColorScale(theme['color-dark']);
	return JSON.stringify(
		{
			theme,
			primaryScale,
			darkScale,
			plugin: renderPlugin(theme),
			cssTheme: renderTheme(theme)
		},
		null,
		2
	);
};

const args = parseArgs(process.argv.slice(2));
const format = args.format || 'plugin';
const theme = resolveTheme(args);

if (format === 'plugin') {
	console.log(renderPlugin(theme));
} else if (format === 'theme') {
	console.log(renderTheme(theme));
} else if (format === 'both') {
	console.log(`${renderPlugin(theme)}\n\n${renderTheme(theme)}`);
} else if (format === 'json') {
	console.log(renderJson(theme));
} else {
	fail('Invalid --format. Use plugin, theme, both, or json.');
}
