# STDF Project Setup

Use this reference for installation, entry CSS, and minimal usage.

## Stack

- STDF targets Svelte 5.
- STDF expects Tailwind CSS 4.
- Use `bun` commands by default.
- Package import: `stdf`.
- Theme helpers and Tailwind theme plugin: `stdf/theme`.
- Locale imports: `stdf/lang`.
- Tailwind source registration: `stdf/source.css`.

## Create A Project

Recommended:

```sh
bun create any-tdf@alpha my-app -f svelte
```

Manual Svelte project setup:

```sh
bunx sv create
bun add tailwindcss @tailwindcss/vite -D
bun add stdf
```

## Required Entry CSS

Import Tailwind and `stdf/source.css`, then configure dark mode. `stdf/source.css` registers both STDF and `@any-tdf/common` component sources:

```css
@import 'tailwindcss';
@import 'stdf/source.css';

@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));
```

Append a complete theme configuration generated from the skill root. Do not replace it with an abbreviated token block because STDF components use the full primary, dark, background, text, functional, neutral, and radius namespaces.

```sh
bun scripts/generate-theme.mjs --preset ANYTDF --format both
```

## Basic Component Usage

```svelte
<script lang="ts">
	import { Button } from 'stdf';
</script>

<Button>Click me</Button>
```

## Implementation Notes

- Keep STDF app-wide theme variables in `src/app.css` or the project equivalent.
- Import `stdf/source.css` instead of hard-coding paths into `node_modules`.
- Do not introduce arbitrary Tailwind value classes when a shared token is appropriate.
