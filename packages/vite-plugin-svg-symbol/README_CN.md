# @any-tdf/vite-plugin-svg-symbol

[English](./README.md)

一个适用于 Vite 和 Rollup 的插件，用于把一个或多个文件夹中的 SVG 文件合并为可复用的 SVG symbol 雪碧图。

## 安装

```sh
bun add @any-tdf/vite-plugin-svg-symbol -D
```

## 使用

```ts
import { defineConfig } from 'vite';
import svgSymbol from '@any-tdf/vite-plugin-svg-symbol';

export default defineConfig({
	plugins: [
		svgSymbol([
			{
				inFile: 'src/icons',
				outFile: 'public/fonts',
				fileName: 'icons'
			}
		])
	]
});
```

同一个插件也可以用于 Rollup 配置。在 Vite 开发模式下，插件会监听输入文件夹，并在 SVG 文件变化后重新生成对应雪碧图。

## 参数

| 参数       | 类型      | 默认值              | 说明                                          |
| ---------- | --------- | ------------------- | --------------------------------------------- |
| `inFile`   | `string`  | `src/lib/symbol`    | 存放源 SVG 文件的文件夹。                     |
| `outFile`  | `string`  | `public/fonts`      | 生成雪碧图的输出文件夹。                      |
| `fileName` | `string`  | `inFile` 的最后一段 | 不包含 `.svg` 扩展名的输出文件名。            |
| `simple`   | `boolean` | `true`              | 将支持的填充色和描边色替换为 `currentColor`。 |

传入多个参数对象即可在一次构建中生成多个雪碧图。

## 独立 API

不启动 Vite 时，可以使用 `createSvgSprite` 直接生成雪碧图：

```ts
import { createSvgSprite } from '@any-tdf/vite-plugin-svg-symbol';

createSvgSprite([{ inFile: 'src/icons', outFile: 'public/fonts' }]);
```

## 源码和许可证

- [源码](https://github.com/any-tdf/any-tdf/tree/main/packages/vite-plugin-svg-symbol)
- [MIT 许可证](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)
