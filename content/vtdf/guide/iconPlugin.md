[English](./iconPlugin_en.md)

[![Public Status](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)

[![npm](https://img.shields.io/npm/v/@any-tdf/vite-plugin-svg-symbol?logo=npm&label=icon&style=for-the-badge&color=8cf2be&logoColor=D5FCE3&labelColor=01190C)](https://www.npmjs.com/package/@any-tdf/vite-plugin-svg-symbol)

# 介绍

一个 Vite 插件，将指定文件夹（支持多个）内的所有 SVG 组合为一个 [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)。同时支持 Vite 和 Rollup。

如 VTDF 项目使用。

# 安装

<!-- :::code-groups -->
<!-- bun -->

```sh
bun add @any-tdf/vite-plugin-svg-symbol -D
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm i @any-tdf/vite-plugin-svg-symbol -D
```

<!-- :: -->
<!-- npm -->

```sh
npm i @any-tdf/vite-plugin-svg-symbol -D
```

<!-- :: -->
<!-- yarn -->

```sh
yarn add @any-tdf/vite-plugin-svg-symbol -D
```

<!-- ::: -->

# 使用

在 vite.config.js 或 vite.config.ts 中配置：

```js
// ...
import svgSymbol from '@any-tdf/vite-plugin-svg-symbol';

export default defineConfig({
	// ...
	plugins: [
		// ...
		svgSymbol()
		// ...
	]
	// ...
});
```

在 Rollup 的 rollup.config.js 中也可以使用相同插件配置，插件会在构建阶段执行（不包含 dev 监听）。

开发过程中只需要将用到的 SVG 文件放到指定的入口文件夹（默认 `src/lib/symbol`），插件会自动将其合并为一个 SVG symbol 文件，输出到指定的输出文件夹（默认 `public/fonts`）。Vite 构建之后 public 文件夹下的文件会被复制到 dist 文件夹下，所以在构建之后，合并的 SVG symbol 文件会出现在 `dist/fonts` 文件夹下。请参考 [Vite 配置](https://cn.vitejs.dev/guide/assets.html#the-public-directory)。

> 默认参数使用 `src/lib/symbol` 和 `public/fonts`。如果你使用自定义静态目录结构，请修改 vite.config.js 或 vite.config.ts 中的配置。

一般来说，按照默认配置将 SVG 文件放到入口文件夹即可，无需过多配置。

如果需要修改输入输出文件夹以及合并的文件名，或者同时需要合并多个文件夹，可以在 vite.config.js 或 vite.config.ts 中修改配置：

```javascript
// ...
    svgSymbol([
        { inFile: 'src/lib/svgs', outFile: 'public/fonts', fileName: 'symbol' },
        { inFile: 'src/lib/icons', outFile: 'public/fonts', fileName: 'icon' },
    ]),
// ...
```

此配置会合并两个 symbol。**此时使用 VTDF 的 Icon 组件时，请配合修改 `path` 为对应的 `fonts/symbol.svg` 或 `fonts/icon.svg`。**

注意：**传入参数为数组**，表示多个文件夹的配置。**每个文件夹的配置为一个对象**。对象中的 `inFile` 为将要被合并的 SVG 文件所在的文件夹，`outFile` 为合并后的 SVG symbol 文件的输出路径，`fileName` 为合并后的 SVG symbol 文件的文件名（如果不传则取 `inFile` 的最后一个文件夹名称）。请注意路径与文件名的正确性与冲突。

一般来说，使用 symbol 的场景是将一系列小的单色 SVG 合并为一个 symbol，可以方便项目使用 SVG 时修改颜色、大小、透明度等属性，所以默认配置下 @any-tdf/vite-plugin-svg-symbol 会去除掉 SVG 本身的颜色属性。如果需要使用多色 SVG，合成的 symbol 需要保留 SVG 本身的颜色，只需要将 `simple` 参数设置为 `false`。

# 数组配置

| 参数     | 类型      | 默认               | 描述                                                                             |
| -------- | --------- | ------------------ | -------------------------------------------------------------------------------- |
| inFile   | `string`  | `'src/lib/symbol'` | 将要被合并的所有 SVG 文件所在的文件夹。                                          |
| outFile  | `string`  | `'public/fonts'`   | 合并后的 SVG symbol 文件的输出路径。                                             |
| fileName | `string`  | `'symbol'`         | 合并后的 SVG symbol 文件的文件名（如果不传则取 `inFile` 的最后一个文件夹名称）。 |
| simple   | `boolean` | `true`             | 是否使用简单模式，简单模式会将 SVG 自带的颜色去除。                              |

# 许可证

本项目基于 [MIT 许可证](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)。
