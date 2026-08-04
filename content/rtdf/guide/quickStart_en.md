> Tip: All code or commands can be double-clicked to select the word, three clicks to select the line.

## 1. Use create-any-tdf (Recommended)

<!-- :::code-groups -->
<!-- bun -->

```sh
bun create any-tdf@latest rtdf-app -f react
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm create any-tdf@latest rtdf-app -f react
```

<!-- :: -->
<!-- npm -->

```sh
npm create any-tdf@latest rtdf-app -f react
```

<!-- :: -->
<!-- yarn -->

```sh
yarn create any-tdf@latest rtdf-app -f react
```

<!-- ::: -->

You can also pass template, prompt language, icon setup, theme mode, and initial built-in icon library options directly:

```sh
bun create any-tdf@latest rtdf-app -f react -t vrtt -l en_US -i iconify -m multi -b lucide
```

## 2. Self-built (Skip if you already have a project)

2.1 Install RTDF

```sh
bun add rtdf@0.0.0-alpha.0
```

2.2 Install Tailwind CSS and Vite plugins.

Refer to the [Tailwind CSS documentation](https://tailwindcss.com/docs/guides/vite) to configure Tailwind CSS.

<!-- :::code-groups -->
<!-- bun -->

```sh
bun add tailwindcss @tailwindcss/vite -D
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm i tailwindcss @tailwindcss/vite -D
```

<!-- :: -->
<!-- npm -->

```sh
npm i tailwindcss @tailwindcss/vite -D
```

<!-- :: -->
<!-- yarn -->

```sh
yarn add tailwindcss @tailwindcss/vite -D
```

<!-- ::: -->

2.3 In the project's entry CSS file, import Tailwind CSS, set the dark mode, add the initial color variables, and **use the `@source` directive to specify that Tailwind CSS automatically detects RTDF components**.

The following are the default theme colors of RTDF, please modify them according to your needs. For more information, refer to [RTDF Guide - Color](/guide/color).

```css
/* app.css */
@import 'tailwindcss';

@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));

@theme {
	/* Theme Colors */
	--color-primary-50: oklch(0.979 0.01 267.36);
	--color-primary-100: oklch(0.95 0.024 270.343);
	--color-primary-200: oklch(0.847 0.074 271.188);
	--color-primary-300: oklch(0.741 0.13 272.232);
	--color-primary-400: oklch(0.634 0.193 271.595);
	--color-primary-500: oklch(0.536 0.252 268.66);
	--color-primary: oklch(0.467 0.296 264.886);
	--color-primary-700: oklch(0.397 0.26 264.877);
	--color-primary-800: oklch(0.331 0.221 264.833);
	--color-primary-900: oklch(0.26 0.178 264.428);
	--color-primary-950: oklch(0.192 0.13 266.64);

	--color-dark-50: oklch(0.995 0.012 101.474);
	--color-dark-100: oklch(0.986 0.025 97.107);
	--color-dark-200: oklch(0.965 0.059 95.884);
	--color-dark-300: oklch(0.938 0.089 92.952);
	--color-dark-400: oklch(0.91 0.114 89.711);
	--color-dark-500: oklch(0.88 0.136 86.375);
	--color-dark: oklch(0.845 0.153 80.597);
	--color-dark-700: oklch(0.71 0.137 75.734);
	--color-dark-800: oklch(0.58 0.118 70.166);
	--color-dark-900: oklch(0.449 0.097 65.209);
	--color-dark-950: oklch(0.321 0.074 62.379);

	/* Functional Colors */
	--color-success: oklch(0.704 0.142 167.084);
	--color-warning: oklch(0.558 0.154 47.186);
	--color-error: oklch(0.564 0.223 28.46);
	--color-info: oklch(0.482 0.14 261.518);

	/* Extended Colors */
	--color-Twitter: oklch(0.703 0.149 235.059);
	--color-React: oklch(0.702 0.194 38.137);
	--color-Starbucks: oklch(0.482 0.107 161.212);

	/* Neutral Colors */
	--color-black: oklch(0 0 0);
	--color-white: oklch(1 0 0);
	--color-gray-50: oklch(0.961 0 0);
	--color-gray-100: oklch(0.925 0 0);
	--color-gray-200: oklch(0.845 0 0);
	--color-gray-300: oklch(0.767 0 0);
	--color-gray-400: oklch(0.683 0 0);
	--color-gray-500: oklch(0.6 0 0);
	--color-gray-600: oklch(0.51 0 0);
	--color-gray-700: oklch(0.42 0 0);
	--color-gray-800: oklch(0.321 0 0);
	--color-gray-900: oklch(0.218 0 0);
	--color-gray-950: oklch(0.159 0 0);
	--color-transparent: transparent;

	/* Background Colors - Light Mode */
	--color-bg-base: oklch(1 0 0);
	--color-bg-surface: oklch(0.98 0 0);
	--color-bg-overlay: oklch(0.99 0 0);
	--color-bg-highlight: oklch(0.99 0 0);

	/* Background Colors - Dark Mode */
	--color-bg-base-dark: oklch(0.15 0 0);
	--color-bg-surface-dark: oklch(0.2 0 0);
	--color-bg-overlay-dark: oklch(0.12 0 0);
	--color-bg-highlight-dark: oklch(0.08 0 0);

	/* Text Colors */
	--color-text-primary: oklch(0.15 0 0);
	--color-text-dark: oklch(0.95 0 0);
	--color-text-on-primary: oklch(1 0 0);
	--color-text-on-dark: oklch(0.1 0 0);

	/* Radius Variables */
	--radius-box: 0.5rem;
	--radius-form: 0.25rem;
	--radius-small: calc(infinity * 1px);
}
@source "../node_modules/rtdf/dist";
```

2.4 Import and use components in React files.

```tsx
import { Button } from 'rtdf';

const App = () => <Button>Click me</Button>;
```

2.5 Start the project.

<!-- :::code-groups -->
<!-- bun -->

```sh
bun dev
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm dev
```

<!-- :: -->
<!-- npm -->

```sh
npm run dev
```

<!-- :: -->
<!-- yarn -->

```sh
yarn dev
```

<!-- ::: -->
