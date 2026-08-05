# VTDF Project Setup

Use this reference for installation, entry CSS, and minimal usage.

## Stack

- VTDF targets Vue 3.
- VTDF expects Tailwind CSS 4 when the application builds its theme CSS.
- Use `bun` commands by default.
- Package import: `vtdf`.
- Theme runtime helpers: `vtdf/theme`.
- Tailwind theme plugin: `vtdf/theme/plugin`.
- Locale imports: `vtdf/lang`.
- Tailwind source registration: `vtdf/source.css`.

## Create A Project

Recommended:

```sh
bun create any-tdf@alpha my-app -f vue
```

Manual Vite Vue project setup:

```sh
bun create vite my-app --template vue-ts
cd my-app
bun add vtdf
bun add tailwindcss @tailwindcss/vite -D
```

## Required Entry CSS

Import Tailwind and `vtdf/source.css`, then configure dark mode. The package source file registers VTDF and its shared dependency without hard-coded `node_modules` paths:

```css
@import 'tailwindcss';
@import 'vtdf/source.css';

@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));
```

Append a complete theme configuration generated from the skill root. Do not replace it with an abbreviated token block because VTDF components use the full primary, dark, background, text, functional, neutral, and radius namespaces.

```sh
bun scripts/generate-theme.mjs --preset ANYTDF --format both
```

If the application consumes the package's prebuilt CSS instead of compiling VTDF classes with Tailwind, import `vtdf/style.css` once in the application entry and preserve the project's existing theme strategy.

## Basic Component Usage

```vue
<script setup lang="ts">
import { Button } from 'vtdf';
</script>

<template>
	<Button>Click me</Button>
</template>
```

## Implementation Notes

- Keep VTDF app-wide theme variables in the project entry CSS file.
- Import `vtdf/source.css` instead of hard-coding paths into `node_modules` when the application compiles its own Tailwind CSS.
- Do not introduce arbitrary Tailwind value classes when a shared token is appropriate.
