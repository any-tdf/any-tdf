import type { ThemeProps } from './switchTheme.js';

const ANYTDFTheme: ThemeProps = {
	name: 'ANYTDF',
	color: {
		primary: {
			50: 'oklch(0.979 0.01 267.36)',
			100: 'oklch(0.95 0.024 270.343)',
			200: 'oklch(0.847 0.074 271.188)',
			300: 'oklch(0.741 0.13 272.232)',
			400: 'oklch(0.634 0.193 271.595)',
			500: 'oklch(0.536 0.252 268.66)',
			default: 'oklch(0.467 0.296 264.886)',
			700: 'oklch(0.397 0.26 264.877)',
			800: 'oklch(0.331 0.221 264.833)',
			900: 'oklch(0.26 0.178 264.428)',
			950: 'oklch(0.192 0.13 266.64)'
		},
		dark: {
			50: 'oklch(0.995 0.012 101.474)',
			100: 'oklch(0.986 0.025 97.107)',
			200: 'oklch(0.965 0.059 95.884)',
			300: 'oklch(0.938 0.089 92.952)',
			400: 'oklch(0.91 0.114 89.711)',
			500: 'oklch(0.88 0.136 86.375)',
			default: 'oklch(0.845 0.153 80.597)',
			700: 'oklch(0.71 0.137 75.734)',
			800: 'oklch(0.58 0.118 70.166)',
			900: 'oklch(0.449 0.097 65.209)',
			950: 'oklch(0.321 0.074 62.379)'
		},
		primaryBlack: 'oklch(0.116 0.054 267.087)',
		primaryWhite: 'oklch(0.961 0.001 286.375)',
		darkBlack: 'oklch(0.183 0.035 86.634)',
		darkWhite: 'oklch(0.962 0.001 17.178)',
		functional: {
			success: 'oklch(0.704 0.142 167.084)',
			warning: 'oklch(0.558 0.154 47.186)',
			error: 'oklch(0.564 0.223 28.46)',
			info: 'oklch(0.482 0.14 261.518)'
		},
		extend: [
			{
				color: 'oklch(0.703 0.149 235.059)',
				alias: 'Twitter'
			},
			{
				color: 'oklch(0.702 0.194 38.137)',
				alias: 'Svelte'
			},
			{
				color: 'oklch(0.482 0.107 161.212)',
				alias: 'Starbucks'
			}
		]
	}
};

export { ANYTDFTheme };
export default ANYTDFTheme;
