[简体中文](https://github.com/any-tdf/vite-plugin-svg-symbol/blob/main/README_CN.md)

[![Public Status](https://github.com/any-tdf/vite-plugin-svg-symbol/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/vite-plugin-svg-symbol/actions/workflows/publish-npm.yml)

[![npm](https://img.shields.io/npm/v/@any-tdf/vite-plugin-svg-symbol?logo=npm&label=icon&style=for-the-badge&color=8cf2be&logoColor=D5FCE3&labelColor=01190C)](https://www.npmjs.com/package/@any-tdf/vite-plugin-svg-symbol)

# Introduction

A Vite plugin that combines all SVG files in specified folders (supports multiple) into a single [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol). It supports both Vite and Rollup.

As used by [STDF](https://stdf.dev).

# Installation

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

# Usage

Configure the plugin in vite.config.js or vite.config.ts:

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

For Rollup, register the same plugin in rollup.config.js and it will run during build (no dev watcher).

During development, simply place the SVG files you need in the specified input folder (default: `src/lib/symbol`). The plugin will automatically combine them into a single SVG symbol file and output it to the specified output folder (default: `public/fonts`). After building with Vite, the files in the public folder will be copied to the dist folder. Therefore, after building, the combined SVG symbol file will be located in the `dist/fonts` folder. Please refer to the [Vite Asset Handling](https://vitejs.dev/guide/assets.html#the-public-directory) documentation.

> Default parameters use `src/lib/symbol` and `public/fonts`. If you use SvelteKit's `static` directory or another layout, please modify the configuration in vite.config.js or vite.config.ts.

Generally, you can simply place the SVG files in the default input folder without the need for additional configuration.

If you need to modify the input/output folders and the filename of the combined file, or if you need to combine multiple folders, you can customize the configuration in vite.config.js or vite.config.ts:

```javascript
// ...
    svgSymbol([
        { inFile: 'src/lib/svgs', outFile: 'public/fonts', fileName: 'symbol' },
        { inFile: 'src/lib/icons', outFile: 'public/fonts', fileName: 'icon' },
    ]),
// ...
```

This configuration will combine two symbols. **When using the STDF Icon component, please update `path` to the corresponding `fonts/symbol.svg` or `fonts/icon.svg`**.

Note: **The parameter should be an array** representing the configuration for multiple folders. **Each folder configuration should be an object** with `inFile` as the folder where the SVG files to be combined are located, `outFile` as the output path for the combined SVG symbol file, and `fileName` as the filename of the combined SVG symbol file (if not passed, the last folder name of `inFile` will be used). Please ensure the correctness and avoid conflicts in paths and filenames.

In general, the use of symbols is to combine a series of small, single-color SVG files into one symbol. This allows for easy modification of attributes such as color, size, and opacity when using SVG in a project. Therefore, when default configuring @any-tdf/vite-plugin-svg-symbol, the color attributes of the SVG files themselves are removed. If you need to use multi-color SVG files and want to preserve the colors in the generated symbol, you just need to set the `simple` parameter to `false`.

# Array Configuration

| Parameter | Type      | Default            | Description                                                                                                   |
| --------- | --------- | ------------------ | ------------------------------------------------------------------------------------------------------------- |
| inFile    | `string`  | `'src/lib/symbol'` | The folder where all the SVG files to be merged are located.                                                  |
| outFile   | `string`  | `'public/fonts'`   | The output path for the merged SVG symbol file.                                                               |
| fileName  | `string`  | `'symbol'`         | The filename of the merged SVG symbol file (if not passed, the last folder name of `inFile` will be used).    |
| simple    | `boolean` | `true`             | Whether to use the simple mode, the simple mode will remove the color attributes of the SVG files themselves. |

# License

This project is licensed under the [MIT License](https://github.com/any-tdf/vite-plugin-svg-symbol/blob/main/LICENSE).
