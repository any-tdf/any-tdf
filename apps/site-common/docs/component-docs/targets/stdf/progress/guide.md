## Snippet

当传入 children 时，百分比内容不再使用默认百分比文字，而是使用传入的 children 渲染。

## overflowPercent

当 percentPosition 为 `'inner'` 且百分比数值较低时，百分比文字会溢出，overflowPercent 为溢出的阀值，当百分比小于该值时，百分比文字会放置于进度条右侧。

## CSS 注入

通过 injClass 和 trackInjClass 参数可以向组件内部的激活进度条和轨道条元素注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性，示例中通过 injClass 和 trackInjClass 实现了自定义进度条颜色。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
