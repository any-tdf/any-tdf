> Tip: All code or commands can be double-clicked to select the word, three clicks to select the line.

## 1. Use create-any-tdf (Recommended)

<!-- :::code-groups -->
<!-- bun -->

```sh
bun create any-tdf vtdf-app -f vue
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm create any-tdf vtdf-app -f vue
```

<!-- :: -->
<!-- npm -->

```sh
npm create any-tdf vtdf-app -- -f vue
```

<!-- :: -->
<!-- yarn -->

```sh
yarn create any-tdf vtdf-app -f vue
```

<!-- ::: -->

You can also pass template, prompt language, icon setup, theme mode, and initial built-in icon library options directly:

```sh
bun create any-tdf vtdf-app -f vue -t vrtt -l en_US -i iconify -m multi -b lucide
```

## 2. Self-built (Skip if you already have a project)

This section assumes an existing Vue 3.5 project built with Vite. For a new project, use the scaffold above. Install the framework runtime separately if it is missing; `vtdf` does not replace it.

2.1 Install VTDF

<!-- :::code-groups -->
<!-- bun -->

```sh
bun add vtdf
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm add vtdf
```

<!-- :: -->
<!-- npm -->

```sh
npm install vtdf
```

<!-- :: -->
<!-- yarn -->

```sh
yarn add vtdf
```

<!-- ::: -->

2.2 Install Tailwind CSS and Vite plugins.

Refer to the [Tailwind CSS documentation](https://tailwindcss.com/docs/installation/using-vite) to configure Tailwind CSS.

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

Register both the framework plugin and Tailwind CSS in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [vue(), tailwindcss()]
});
```

2.3 Import Tailwind CSS and `vtdf/source.css` in the entry CSS, configure dark mode, and declare the initial theme variables. The source entry registers both VTDF and its shared implementation for class detection.

The following are the default theme colors of VTDF, please modify them according to your needs. For more information, refer to [VTDF Guide - Color](/guide/color).

```css
/* app.css */
@import 'tailwindcss';
@import 'vtdf/style.css';
@import 'vtdf/source.css';

@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=primary], [data-mode=primary] *):not([data-mode=dark], [data-mode=dark] *)));

@theme {
	--color-primary-50: oklch(0.97 0.044 276.886);
	--color-primary-100: oklch(0.886 0.086 274.886);
	--color-primary-200: oklch(0.802 0.128 272.886);
	--color-primary-300: oklch(0.718 0.17 270.886);
	--color-primary-400: oklch(0.635 0.212 268.886);
	--color-primary-500: oklch(0.551 0.254 266.886);
	--color-primary: oklch(0.467 0.296 264.886);
	--color-primary-700: oklch(0.413 0.316 262.886);
	--color-primary-800: oklch(0.359 0.326 260.886);
	--color-primary-900: oklch(0.304 0.326 258.886);
	--color-primary-950: oklch(0.25 0.326 256.886);
	--color-dark-50: oklch(0.97 0.023 68.597);
	--color-dark-100: oklch(0.949 0.045 70.597);
	--color-dark-200: oklch(0.928 0.066 72.597);
	--color-dark-300: oklch(0.907 0.088 74.597);
	--color-dark-400: oklch(0.887 0.11 76.597);
	--color-dark-500: oklch(0.866 0.131 78.597);
	--color-dark: oklch(0.845 0.153 80.597);
	--color-dark-700: oklch(0.696 0.168 82.597);
	--color-dark-800: oklch(0.547 0.168 84.597);
	--color-dark-900: oklch(0.399 0.168 86.597);
	--color-dark-950: oklch(0.25 0.168 88.597);
	--color-bg-base: oklch(0.967 0.015 264.9);
	--color-bg-surface: oklch(0.985 0.005 80.6);
	--color-bg-overlay: oklch(0.955 0.005 80.6);
	--color-bg-highlight: oklch(0.98 0.009 264.9);
	--color-bg-base-dark: oklch(0.15 0.012 80.6);
	--color-bg-surface-dark: oklch(0.22 0.009 95.6);
	--color-bg-overlay-dark: oklch(0.19 0.008 80.6);
	--color-bg-highlight-dark: oklch(0.08 0.006 80.6);
	--color-text-primary: oklch(0.144 0.015 264.9);
	--color-text-dark: oklch(0.917 0.038 80.6);
	--color-text-on-primary: oklch(0.883 0.043 80.6);
	--color-text-on-dark: oklch(0.189 0.05 264.9);
	--color-success: oklch(0.704 0.142 167.084);
	--color-warning: oklch(0.558 0.153 47.186);
	--color-error: oklch(0.564 0.223 28.46);
	--color-info: oklch(0.482 0.14 261.518);
	--radius-box: 0.75rem;
	--radius-form: 0.5rem;
	--radius-small: 0.25rem;
}
```

These are the shared ANYTDF preset variables. `vtdf/style.css` also supplies global component styles and animations; the source entry alone only registers classes for detection. Import this CSS once from the application entry (src/main.ts). See [Theme Configuration](/guide/theme) for customization.

```ts
import './app.css';
```

2.4 Import and use components in Vue files.

```vue
<script setup lang="ts">
import { Button } from 'vtdf';
</script>

<template>
	<Button>Click me</Button>
</template>
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
