> 从 v1.1.0 开始，STDF 支持 [Iconify](https://iconify.design) 方式使用图标。

## SVG Sprites

STDF 图标组件的 `type` 默认为 `symbol`，即使用 SVG Sprites 技术使用图标，这样可以减少 HTTP 请求，提高页面性能。

STDF 的 SVG Sprites 是使用 [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)，大致原理类似于 CSS 中的 Sprite 技术，将项目中的 SVG 拼接在一个文件内，通过 SVG 中的 use 元素找到对应的图标来显示。

你可以把它类比看成是一种字体，只不过这种字体是由 SVG 组成的，而且可以通过 CSS 控制颜色、大小等属性。所以如果用到比较大或者有多种颜色等比较复杂的图标，建议单独引入 SVG 文件使用，不要放在 symbol 中。

兼容性方面也完全没问题。参考 [MDN symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol#browser_compatibility)。

STDF 开发了一个 Rollup／Vite 插件，用于将项目中的 SVG 文件合并成 SVG Sprites，具体使用请参考 [rollup-plugin-stdf-icon](https://www.npmjs.com/package/rollup-plugin-stdf-icon)。由于 SVG 格式的多样性，可能存在 rollup-plugin-stdf-icon 处理不准确的情况，请到 [GitHub](https://github.com/any-tdf/any-tdf/issues) 提 Issue，注明 SVG 文件的具体情况。

或使用其他 SVG Sprites 合成工具或手动合成，也可以请设计师提供设计物料时一并提供对应的 SVG Sprites。或类似 [Remix Icon](https://remixicon.com) 这样的图标库，可以直接将选定的多个图标下载为 SVG Sprites。

## Iconify

STDF 也可以通过设置 `type` 为 `iconify` 或 `iconify-color` 使用 [Iconify](https://iconify.design) 方式使用图标。

Iconify 有很多种使用方式，STDF 选择的是 Tailwind 4 插件的方式，这样对代码的侵入性最小，可参考 [Iconify for Tailwind CSS](https://iconify.design/docs/usage/css/tailwind/tailwind4)。在 STDF 中使用方式如下：

1. 安装 Tailwind 4 插件

<!-- :::code-groups -->
<!-- pnpm -->

```sh
pnpm i -D @iconify/tailwind4
```

<!-- :: -->
<!-- npm -->

```sh
npm i -D @iconify/tailwind4
```

<!-- :: -->
<!-- bun -->

```sh
bun i -D @iconify/tailwind4
```

<!-- :: -->
<!-- yarn -->

```sh
yarn add @iconify/tailwind4
```

<!-- ::: -->

2. 安装所需的开源图标库

> 非常不推荐安装 `@iconify/json`，这样全量图标库的体积非常大。

按需安装图标库，如使用以下命令安装 Solar 和 Carbon 图标库：

<!-- :::code-groups -->
<!-- pnpm -->

```sh
pnpm i -D @iconify-json/solar
```

<!-- :: -->
<!-- npm -->

```sh
npm i -D @iconify-json/solar
```

<!-- :: -->
<!-- bun -->

```sh
bun i -D @iconify-json/solar
```

<!-- :: -->
<!-- yarn -->

```sh
yarn add @iconify-json/solar
```

<!-- ::: -->

<!-- :::code-groups -->
<!-- pnpm -->

```sh
pnpm i -D @iconify-json/carbon
```

<!-- :: -->
<!-- npm -->

```sh
npm i -D @iconify-json/carbon
```

<!-- :: -->
<!-- bun -->

```sh
bun i -D @iconify-json/carbon
```

<!-- :: -->
<!-- yarn -->

```sh
yarn add @iconify-json/carbon
```

<!-- ::: -->

3. 项目的入口 CSS 文件中配置插件，并设置需要使用的图标库前缀，参考 [Clean selectors](https://iconify.design/docs/usage/css/tailwind/tailwind4/#clean-selectors)。

```css
@plugin "@iconify/tailwind4" {
	prefixes: solar, carbon;
}
```

4. 在组件中使用图标

```svelte
<Icon type="iconify" name="solar--cat-broken" />
```

使用 `iconify` 与 `iconify-color` 的区别在于，`iconify` 将图标渲染为蒙版图像，图标颜色为文本颜色，因此与使用 `symbol` 一样，可以设置 `theme` 属性控制图标跟随主题色，或者设置文本颜色自定义颜色，一般用于纯色图标。而 `iconify-color` 将图标渲染为背景图像，将无法设置 `theme` 属性，也无法设置文本颜色自定义颜色，一般用于多色图标，如 fluent-color 图标库，参考 [extra-class-name](https://iconify.design/docs/usage/css/tailwind/tailwind4/#extra-class-name)。

## 内置 SVG 图标库

STDF 的部分组件内部会使用内置 SVG，例如 `Alert`、`Toast`、`Checkbox`、`Radio`、`Pagination` 等。默认内置图标库是 `remix`，也可以切换为 `lucide`、`phosphor`、`tabler`、`iconoir` 或 `reicon`。如果希望这些组件内部图标切换为其他内置图标库，可以在 `ConfigProvider` 中设置 `builtInIconLibrary`。

```svelte
<ConfigProvider builtInIconLibrary="lucide">
	<App />
</ConfigProvider>
```

`builtInIconLibrary` 只影响组件内部使用的内置 SVG，不影响 `Icon` 组件自身的 `symbol`、`iconify` 和 `iconify-color` 用法。`iconPath` 仍然只用于配置外部 SVG Symbol 文件路径。

<!-- built-in-icon-gallery -->

## 选择哪种方式？

一般来说，在 STDF 项目中可以有以下几种使用 svg 图标方式。

1. 不对 svg 文件做任何处理，直接使用。可以不需要使用 Icon 组件，直接使用 svg 标签，但是会增加 HTTP 请求和工程体积，也不方便统一调整这些图标的属性。一般用来处理比较大比较复杂的 svg 图片，**处理小 svg 图标不推荐**。

2. 使用 [rollup-plugin-stdf-icon](https://www.npmjs.com/package/rollup-plugin-stdf-icon) 插件。将各个 svg 文件编译之后合并成 SVG symbol，但是要求 svg 文件符合常规标准，否则可能无法正确合并。**推荐使用**。

3. 使用 [Iconify](https://iconify.design)。Iconify 的优点是图标库非常丰富，省去了找图标的麻烦，但是需要手动安装图标库和配置插件，而且项目中可能会有一些冗余图标。**推荐使用**。

4. 已经有合并的 SVG symbol 文件。一些图标库本身就支持导出 SVG symbol 文件，还有一些其他工具支持合并 svg 为 SVG symbol 文件，或者设计师给的物料就是 SVG symbol 文件，那么可以不用 rollup-plugin-stdf-icon 和 Iconify，直接指定合并后的 SVG symbol 文件路径给 Icon 组件使用。**推荐视情况而定**。

当然，以上这些方式不是互斥的，一个工程中可能同时使用多种方式。
