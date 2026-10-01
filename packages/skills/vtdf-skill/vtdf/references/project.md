# VTDF Project Setup

Use this reference for installation, entry CSS, and minimal usage.

## Stack

- VTDF targets Vue 3.
- VTDF expects Tailwind CSS 4 when the application builds its theme CSS.
- Follow the application's package manager; these examples use `bun`.
- Package import: `vtdf`.
- Theme runtime helpers: `vtdf/theme`.
- Tailwind theme plugin: `vtdf/theme` (also supports `vtdf/theme/plugin`).
- Locale imports: `vtdf/lang`.
- Tailwind source registration: `vtdf/source.css`.

## Create A Project

Recommended:

```sh
bun create any-tdf my-app -f vue
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
@import 'vtdf/style.css';

@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=primary], [data-mode=primary] *):not([data-mode=dark], [data-mode=dark] *)));
```

Append a complete theme configuration generated from the skill root. Do not replace it with an abbreviated token block because VTDF components use the full primary, dark, background, text, functional, neutral, and radius namespaces.

```sh
bun scripts/generate-theme.mjs --preset ANYTDF --format both
```

Import `vtdf/style.css` even when compiling Tailwind classes: it supplies component animation and global styles. `vtdf/source.css` only registers source files.

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

For the complete framework-specific Vite configuration, CSS tokens, and package-manager commands, read [quick start](guides/quickStart.md).
