/* RTDF_UNOCSS_ICON_IMPORT */

import presetWind4 from '@unocss/preset-wind4';
import { defineConfig } from 'unocss';
const rtdfSafeList = [
	'bg-success',
	'bg-warning',
	'bg-error',
	'bg-info',
	'bg-success/10',
	'bg-warning/10',
	'bg-error/10',
	'bg-info/10',
	'bg-success/30',
	'bg-warning/30',
	'bg-error/30',
	'bg-info/30',
	'text-success',
	'text-warning',
	'text-error',
	'text-info',
	'border-success',
	'border-warning',
	'border-error',
	'border-info',
	'border-t-success',
	'border-t-warning',
	'border-t-error',
	'border-t-info',
	'border-b-success',
	'border-b-warning',
	'border-b-error',
	'border-b-info',
	'border-l-success',
	'border-l-warning',
	'border-l-error',
	'border-l-info',
	'border-r-success',
	'border-r-warning',
	'border-r-error',
	'border-r-info',
	'bg-black/20',
	'dark:bg-white/20',
	'bg-primary/20',
	'dark:bg-dark/20',
	'w-full',
	'w-2',
	'w-4',
	'w-6',
	'w-8',
	'w-12',
	'w-16',
	'w-24',
	'w-32',
	'w-48',
	'w-64',
	'w-96',
	'h-1',
	'h-2',
	'h-4',
	'h-6',
	'h-8',
	'h-12',
	'h-16',
	'h-24',
	'h-32',
	'h-48',
	'h-64',
	'h-96',
	'p-0.5',
	'p-1',
	'p-2',
	'p-4',
	'p-8',
	'w-1/2',
	'w-1/3',
	'w-2/3',
	'w-1/4',
	'w-3/4',
	'w-2/5',
	'w-3/5',
	'w-4/5',
	'w-5/6',
	'!bg-black/10',
	'dark:!bg-white/10',
	'!bg-primary/10',
	'dark:!bg-dark/10',
	'!bg-success/10',
	'!bg-warning/10',
	'!bg-error/10',
	'!bg-info/10',
	'!text-black',
	'dark:!text-white',
	'!text-primary',
	'dark:!text-dark',
	'!text-success',
	'!text-warning',
	'!text-error',
	'!text-info',
	'!text-text-primary',
	'dark:!text-text-dark',
	'border-text-primary',
	'dark:border-text-dark',
	'border-text-primary/20',
	'dark:border-text-dark/30',
	'relative',
	'inline',
	'fill-current',
	'text-primary',
	'dark:text-dark',
	'text-text-on-primary',
	'dark:text-text-on-dark'
	/* RTDF_UNOCSS_ICON_SAFE_LIST */
];

const anyTdfContentInclude = [
	/\.(vue|svelte|[jt]sx?|mdx?|astro|html)($|\?)/,
	/(^|[/\\])(?:stdf|rtdf|vtdf|common|react-confetti|react-motion|vue-confetti|vue-motion)([/\\].*)?[/\\]dist[/\\].*\.(?:[cm]?js|[jt]sx?|svelte|vue)($|\?)/,
	/(^|[/\\])@any-tdf[/\\](?:common|react-confetti|react-motion|vue-confetti|vue-motion)[/\\]dist[/\\].*\.(?:[cm]?js|[jt]sx?|svelte|vue)($|\?)/
];

export default defineConfig({
	content: {
		filesystem: [
			'node_modules/rtdf/dist/**/*.{js,mjs,cjs,ts,tsx}',
			'node_modules/@any-tdf/common/dist/**/*.{js,mjs,cjs,ts}',
			'node_modules/@any-tdf/react-confetti/dist/**/*.{js,mjs,cjs,ts,tsx}',
			'node_modules/@any-tdf/react-motion/dist/**/*.{js,mjs,cjs,ts,tsx}'
		],
		pipeline: {
			include: anyTdfContentInclude
		}
	},
	presets: [
		presetWind4({
			dark: {
				dark: '[data-mode="dark"]',
				light: '[data-mode="primary"]'
			}
		})
		/* RTDF_UNOCSS_ICON_PRESET */
	],
	theme: {
		colors: {
			primary: {
				50: 'var(--color-primary-50)',
				100: 'var(--color-primary-100)',
				200: 'var(--color-primary-200)',
				300: 'var(--color-primary-300)',
				400: 'var(--color-primary-400)',
				500: 'var(--color-primary-500)',
				DEFAULT: 'var(--color-primary)',
				700: 'var(--color-primary-700)',
				800: 'var(--color-primary-800)',
				900: 'var(--color-primary-900)',
				950: 'var(--color-primary-950)'
			},
			dark: {
				50: 'var(--color-dark-50)',
				100: 'var(--color-dark-100)',
				200: 'var(--color-dark-200)',
				300: 'var(--color-dark-300)',
				400: 'var(--color-dark-400)',
				500: 'var(--color-dark-500)',
				DEFAULT: 'var(--color-dark)',
				700: 'var(--color-dark-700)',
				800: 'var(--color-dark-800)',
				900: 'var(--color-dark-900)',
				950: 'var(--color-dark-950)'
			},
			success: 'var(--color-success)',
			warning: 'var(--color-warning)',
			error: 'var(--color-error)',
			info: 'var(--color-info)',
			blue: 'var(--color-blue)',
			purple: 'var(--color-purple)',
			orange: 'var(--color-orange)',
			cyan: 'var(--color-cyan)',
			black: 'var(--color-black)',
			white: 'var(--color-white)',
			gray: {
				50: 'var(--color-gray-50)',
				100: 'var(--color-gray-100)',
				200: 'var(--color-gray-200)',
				300: 'var(--color-gray-300)',
				400: 'var(--color-gray-400)',
				500: 'var(--color-gray-500)',
				600: 'var(--color-gray-600)',
				700: 'var(--color-gray-700)',
				800: 'var(--color-gray-800)',
				900: 'var(--color-gray-900)',
				950: 'var(--color-gray-950)'
			},
			bg: {
				base: 'var(--color-bg-base)',
				surface: 'var(--color-bg-surface)',
				overlay: 'var(--color-bg-overlay)',
				highlight: 'var(--color-bg-highlight)',
				'base-dark': 'var(--color-bg-base-dark)',
				'surface-dark': 'var(--color-bg-surface-dark)',
				'overlay-dark': 'var(--color-bg-overlay-dark)',
				'highlight-dark': 'var(--color-bg-highlight-dark)'
			},
			text: {
				primary: 'var(--color-text-primary)',
				dark: 'var(--color-text-dark)',
				'on-primary': 'var(--color-text-on-primary)',
				'on-dark': 'var(--color-text-on-dark)'
			},
			transparent: 'transparent'
		},
		radius: {
			box: 'var(--radius-box)',
			form: 'var(--radius-form)',
			small: 'var(--radius-small)'
		}
	},
	safelist: rtdfSafeList
});
