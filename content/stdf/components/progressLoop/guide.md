## 进度环大小与宽度

进度环 ProgressLoop 的大小由外层容器的宽度决定，组件内部使用了 24＊24 画布大小的 svg 渲染，铺满父容器。而宽度 strokeWidth 理论上支持 0-12 的任意数值，但宽度太大时圆环将会很不美观。

## Snippet

当传入 children 时，百分比内容不再使用默认百分比文字，而是使用传入的 children 渲染。

## CSS 注入

通过 injClass 和 trackInjClass 参数可以向组件内部的激活进度环和轨道环元素注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性，示例中通过 injClass 和 trackInjClass 实现了自定义进度环颜色。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
