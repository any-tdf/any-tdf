# @any-tdf/vite-plugin-svg-symbol

<!-- npm-readme-exclude:start -->

[简体中文](./README_CN.md)
<!-- npm-readme-exclude:end -->

A Vite and Rollup plugin that combines one or more folders of SVG files into reusable SVG symbol sprites.

## Install

```sh
bun add @any-tdf/vite-plugin-svg-symbol -D
```

## Usage

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

The same plugin can be used in a Rollup configuration. During Vite development it watches configured input folders and rebuilds the affected sprite after an SVG changes.

## Options

| Option     | Type      | Default                  | Description                                                    |
| ---------- | --------- | ------------------------ | -------------------------------------------------------------- |
| `inFile`   | `string`  | `src/lib/symbol`         | Folder containing source SVG files.                            |
| `outFile`  | `string`  | `public/fonts`           | Folder receiving the generated sprite.                         |
| `fileName` | `string`  | Last segment of `inFile` | Output filename without the `.svg` extension.                  |
| `simple`   | `boolean` | `true`                   | Replaces supported fill and stroke colors with `currentColor`. |

Multiple option objects can be passed to generate several sprites in one build.

## Standalone API

`createSvgSprite` can generate a sprite without starting Vite:

```ts
import { createSvgSprite } from '@any-tdf/vite-plugin-svg-symbol';

createSvgSprite([{ inFile: 'src/icons', outFile: 'public/fonts' }]);
```

## Source and License

- [Source](https://github.com/any-tdf/any-tdf/tree/main/packages/vite-plugin-svg-symbol)
- [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)
