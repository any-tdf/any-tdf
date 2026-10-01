[English](/guide/md?lang=en_US)

[![Public Status](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)

[![npm](https://img.shields.io/npm/v/@any-tdf/vite-plugin-md-ts?logo=npm&label=icon&style=for-the-badge&color=8cf2be&logoColor=D5FCE3&labelColor=01190C)](https://www.npmjs.com/package/@any-tdf/vite-plugin-md-ts)

## 介绍

一款 Vite 和 Rollup 插件，将 Markdown 文件作为字符串导入。传入 `marked` 配置对象时，使用 [marked](https://github.com/markedjs/marked) 转换为 HTML；不传该参数时，导出原始 Markdown 字符串。

实现思路参考 [rollup-plugin-md](https://github.com/xiaofuzi/rollup-plugin-md)，增加了 TypeScript 支持。

可同时用于 Vite 和 Rollup 的插件配置。

STDF 文档站点 <https://stdf.dev> 使用了此插件。

## 参数

| 参数    | 类型            | 默认          | 描述                                          |
| ------- | --------------- | ------------- | --------------------------------------------- |
| marked  | `MarkedOptions` | 未设置        | 传入时启用 HTML 转换，`marked: {}` 也会启用。 |
| include | `string[]`      | `['**/*.md']` | 要包含的 Markdown 文件路径。                  |
| exclude | `string[]`      | `[]`          | 要排除的 Markdown 文件路径。                  |

其中 include 和 exclude 是相对项目根目录（一般就是 vite.config.js 或 vite.config.ts 所在目录）的相对路径。

## 安装

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

## 使用

在 vite.config.js 或 vite.config.ts 中配置：

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

也可以在 rollup.config.js 或 rollup.config.ts 中使用。

### 导入并渲染

上方的 `marked: {}` 配置会导出 HTML。可以导入字符串，并使用当前框架的 HTML 渲染语法：

```svelte
<script lang="ts">
	import html from './intro.md';
</script>

<article>{@html html}</article>
```

TypeScript 项目还需要增加模块声明，例如 `src/markdown.d.ts`：

```ts
declare module '*.md' {
	const content: string;
	export default content;
}
```

## 为何创建

其实市面上已经有很多能实现类似功能的插件，比如 [vite-plugin-markdown](https://www.npmjs.com/package/vite-plugin-markdown)，这些基于 [markdown-it](https://www.npmjs.com/package/markdown-it) 的插件在转换待办事项列表时，并不会转换以下字符，而这个正好是 [STDF](https://stdf.dev) 中需要用到的功能。

```md
- [ ] 待办事项
- [x] 已完成事项
```

## 许可证

本项目基于 [MIT 许可证](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)。
