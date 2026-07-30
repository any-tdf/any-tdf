## 2.0.0

- [!tag|A|0|] 新增 `state` 属性，用于主题与状态色渲染。
- [!tag|O|0|] 移除 `theme` 属性，改用 `state="theme"`。

## 1.1.0

- [!tag|A|0|] 支持 [Iconify](https://iconify.design) 方式使用图标，通过新增的 `type` 属性设置，具体方法参考指南。
- [!tag|O|0|] 将所有组件中使用到的图标以 svg 的方式内置，项目不再需要手动内置 svg 文件。
- [!tag|A|0|] 新增 `width` 和 `height` 属性，支持设置图标宽度和高度。
- [!tag|O|0|] 修改透明度 `alpha` 属性为 `opacity`，更符合 CSS 直觉。
- [!tag|O|0|] 修改偏移量 `top` 属性为 `y`，更符合描述偏移量。

## 0.5.3

- [!tag|O|0|] 支持一次性配置全局 SVG symbol 路径。关联 [PR](https://github.com/any-tdf/stdf/pull/28)。[!contribute|zh1047842950|]

## 0.2.11

- [!tag|B|1|] Icon 组件区域不再是 `inline-block`。

## 0.2.5

- [!tag|O|0|] path 默认值由 `/assets/fonts/symbol.svg` 修改为 `fonts/symbol.svg`。
