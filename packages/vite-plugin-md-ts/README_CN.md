# @any-tdf/vite-plugin-md-ts

[English](./README.md)

一个适用于 Vite 和 Rollup 的插件，用于把 Markdown 文件转换为 JavaScript 模块。模块会导出原始 Markdown 字符串，或者导出由 [marked](https://marked.js.org/) 生成的 HTML 字符串。

## 安装

```sh
bun add @any-tdf/vite-plugin-md-ts -D
```

## 使用

```ts
import { defineConfig } from 'vite';
import md from '@any-tdf/vite-plugin-md-ts';

export default defineConfig({
	plugins: [
		md({
			include: ['src/**/*.md'],
			exclude: ['src/private/**'],
			marked: {}
		})
	]
});
```

配置后可以把 Markdown 文件作为字符串导入：

```ts
import guide from './guide.md';
```

传入 `marked` 配置时，默认导出内容为 HTML；省略该配置时，默认导出内容为原始 Markdown。

## 参数

| 参数      | 类型            | 默认值        | 说明                                                 |
| --------- | --------------- | ------------- | ---------------------------------------------------- |
| `include` | `string[]`      | `['**/*.md']` | 插件需要包含的 glob 匹配规则。                       |
| `exclude` | `string[]`      | `undefined`   | 插件需要排除的 glob 匹配规则。                       |
| `marked`  | `MarkedOptions` | `undefined`   | 使用给定的 marked 配置启用 Markdown 到 HTML 的转换。 |

插件会忽略 Vite 查询参数，并使用真实的 `.md` 文件路径进行过滤。同一个插件也可以用于 Rollup 配置。

## 源码和许可证

- [源码](https://github.com/any-tdf/any-tdf/tree/main/packages/vite-plugin-md-ts)
- [MIT 许可证](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)
