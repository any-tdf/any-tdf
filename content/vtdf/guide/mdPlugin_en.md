[简体中文](/guide/md?lang=zh_CN)

[![Public Status](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)

[![npm](https://img.shields.io/npm/v/@any-tdf/vite-plugin-md-ts?logo=npm&label=icon&style=for-the-badge&color=8cf2be&logoColor=D5FCE3&labelColor=01190C)](https://www.npmjs.com/package/@any-tdf/vite-plugin-md-ts)

## Introduction

A Vite and Rollup plugin that imports Markdown files as strings. Passing a `marked` options object enables conversion to HTML using [marked](https://github.com/markedjs/marked); without that option, the exported string contains the original Markdown.

The implementation idea is based on [rollup-plugin-md](https://github.com/xiaofuzi/rollup-plugin-md), adding TypeScript support.

The VTDF doc site uses this plugin.

## Parameters

| Parameter | Type            | Default       | Description                                                    |
| --------- | --------------- | ------------- | -------------------------------------------------------------- |
| marked    | `MarkedOptions` | Not set       | Enables HTML conversion when provided, including `marked: {}`. |
| include   | `string[]`      | `['**/*.md']` | The path of the Markdown file to include.                      |
| exclude   | `string[]`      | `[]`          | The path of the Markdown file to exclude.                      |

The `include` and `exclude` parameters are relative to the project root directory (usually the directory where vite.config.js or vite.config.ts is located).

## Installation

<!-- :::code-groups -->
<!-- bun -->

```sh
bun add @any-tdf/vite-plugin-md-ts -D
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm i @any-tdf/vite-plugin-md-ts -D
```

<!-- :: -->
<!-- npm -->

```sh
npm i @any-tdf/vite-plugin-md-ts -D
```

<!-- :: -->
<!-- yarn -->

```sh
yarn add @any-tdf/vite-plugin-md-ts -D
```

<!-- ::: -->

## Usage

Configure in vite.config.js or vite.config.ts:

```javascript
import { defineConfig } from 'vite';
import md from '@any-tdf/vite-plugin-md-ts';

export default defineConfig({
	// ...
	plugins: [
		// ...
		md({
			marked: {},
			include: ['./src/**/*.md']
		})
		// ...
	]
	// ...
});
```

It also works in rollup.config.js or rollup.config.ts with the same plugin.

### Import and Render

The `marked: {}` configuration above exports HTML. Import it and render it with the framework's HTML rendering syntax:

```vue
<script setup lang="ts">
import html from './intro.md';
</script>

<template>
	<article v-html="html" />
</template>
```

For TypeScript, add a module declaration such as `src/markdown.d.ts`:

```ts
declare module '*.md' {
	const content: string;
	export default content;
}
```

## Why Create

There are already many plugins that can implement similar functions, such as [vite-plugin-markdown](https://www.npmjs.com/package/vite-plugin-markdown), which do not convert the following characters when converting to-do lists, which is exactly the function needed in VTDF.

```md
- [ ] TODO
- [x] DONE
```

## License

This project is licensed under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
