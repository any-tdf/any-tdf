> Tip: All code or commands can be double-clicked to select the word, three clicks to select the line.

## 1. Use create-any-tdf (Recommended)

<!-- :::code-groups -->
<!-- bun -->

```sh
bun create any-tdf stdf-app -f svelte
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm create any-tdf stdf-app -f svelte
```

<!-- :: -->
<!-- npm -->

```sh
npm create any-tdf stdf-app -- -f svelte
# or
npm init any-tdf stdf-app -- -f svelte
# or
npx create-any-tdf stdf-app -f svelte
```

<!-- :: -->
<!-- yarn -->

```sh
yarn create any-tdf stdf-app -f svelte
```

<!-- ::: -->

You can also pass template, prompt language, icon setup, theme mode, and initial built-in icon library options directly:

```sh
bun create any-tdf stdf-app -f svelte -t sktt -l en_US -i iconify -m multi -b lucide
```

## 2. Self-built

2.1 Use the [Svelte CLI](https://svelte.dev/docs/cli/sv-create) to create the project.

<!-- :::code-groups -->
<!-- bun -->

```sh
bunx sv create
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm dlx sv create
```

<!-- :: -->
<!-- npm -->

```sh
npx sv create
```

<!-- :: -->
<!-- yarn -->

```sh
yarn dlx sv create
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

Register Tailwind CSS in `vite.config.ts`. For SvelteKit:

```ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()]
});
```

For Vite Svelte, replace `sveltekit()` with `svelte()` from `@sveltejs/vite-plugin-svelte`.

2.3 Install STDF.

<!-- :::code-groups -->
<!-- bun -->

```sh
bun add stdf
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm i stdf
```

<!-- :: -->
<!-- npm -->

```sh
npm i stdf
```

<!-- :: -->
<!-- yarn -->

```sh
yarn add stdf
```

<!-- ::: -->

2.4 In the project's entry CSS file, import Tailwind CSS and `stdf/source.css`, set dark mode, and add the initial color variables. `stdf/source.css` automatically registers the Tailwind CSS source paths required by STDF components.

The following are the default theme colors of STDF, please modify them according to your needs. For more information, refer to [STDF Guide - Color](/guide/color).

```css
/* app.css */
@import 'tailwindcss';
@import 'stdf/source.css';

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

These are the shared ANYTDF preset variables. Import this CSS once from the application entry or SvelteKit root layout. See [Theme Configuration](/guide/theme) for customization.

For SvelteKit, import `src/app.css` inside the `<script>` of `src/routes/+layout.svelte`:

```ts
import '../app.css';
```

For Vite Svelte, use `import './app.css';` in `src/main.ts`.

2.5 Import and use components in Svelte files.

```svelte
<script lang="ts">
	import { Button } from 'stdf';
</script>

<Button>Click me</Button>
```

2.6 Start the project.

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
