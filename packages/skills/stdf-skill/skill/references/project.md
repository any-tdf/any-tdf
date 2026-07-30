# STDF Project Setup

Use this reference for installation, entry CSS, and minimal usage.

## Stack

- STDF targets Svelte 5.
- STDF expects Tailwind CSS 4.
- Use `bun` commands by default.
- Package import: `stdf`.
- Theme helpers import: `stdf/theme`.
- Locale imports: `stdf/lang`.

## Create A Project

Recommended:

```sh
bun create any-tdf@latest my-app -f svelte
```

Manual Svelte project setup:

```sh
bunx sv create
bun add tailwindcss @tailwindcss/vite -D
bun add stdf @any-tdf/common
```

## Required Entry CSS

In the application entry CSS, import Tailwind, configure dark mode, declare theme variables, and point Tailwind source detection at STDF and Common component classes:

```css
@import 'tailwindcss';

@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));

@theme {
	--color-primary: oklch(0.467 0.296 264.886);
	--color-dark: oklch(0.845 0.153 80.597);
	--color-success: oklch(0.704 0.142 167.084);
	--color-warning: oklch(0.558 0.154 47.186);
	--color-error: oklch(0.564 0.223 28.46);
	--color-info: oklch(0.482 0.14 261.518);
	--radius-box: 0.5rem;
	--radius-form: 0.25rem;
	--radius-small: calc(infinity * 1px);
}

@source "../node_modules/stdf/dist";
@source "../node_modules/@any-tdf/common/dist";
```

For production work, use the complete color variables from `references/theme.md` or generate them with `skill/scripts/generate-theme.mjs`.

## Basic Component Usage

```svelte
<script lang="ts">
	import { Button } from 'stdf';
</script>

<Button>Click me</Button>
```

## Implementation Notes

- Keep STDF app-wide theme variables in `src/app.css` or the project equivalent.
- Use `@source "../node_modules/stdf/dist";` and `@source "../node_modules/@any-tdf/common/dist";` so Tailwind CSS 4 can detect STDF and Common package classes.
- Do not introduce arbitrary Tailwind value classes when a shared token is appropriate.
