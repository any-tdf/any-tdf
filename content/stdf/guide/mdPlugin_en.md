[简体中文](./mdPlugin.md)

[![Public Status](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)

[![npm](https://img.shields.io/npm/v/@any-tdf/vite-plugin-md-ts?logo=npm&label=icon&style=for-the-badge&color=8cf2be&logoColor=D5FCE3&labelColor=01190C)](https://www.npmjs.com/package/@any-tdf/vite-plugin-md-ts)

## Introduction

This is a Vite and Rollup plugin that converts Markdown files to HTML strings, based on [marked](https://github.com/markedjs/marked).

The implementation idea is based on [rollup-plugin-md](https://github.com/xiaofuzi/rollup-plugin-md), adding TypeScript support.

The STDF doc site <https://stdf.dev> uses this plugin.

## Parameters

| Parameter | Type            | Default       | Description                                           |
| --------- | --------------- | ------------- | ----------------------------------------------------- |
| marked    | `MarkedOptions` | `{}`          | [marked](https://github.com/markedjs/marked) options. |
| include   | `string[]`      | `['**/*.md']` | The path of the Markdown file to include.             |
| exclude   | `string[]`      | `[]`          | The path of the Markdown file to exclude.             |

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

## Why Create

There are already many plugins that can implement similar functions, such as [vite-plugin-markdown](https://www.npmjs.com/package/vite-plugin-markdown), which do not convert the following characters when converting to-do lists, which is exactly the function needed in [STDF](https://stdf.dev).

```md
- [ ] TODO
- [x] DONE
```

## License

This project is licensed under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
