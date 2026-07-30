## 搭配使用

Badge 组件一般位于内容的右上角，所以常规使用时请将主体内容作为默认 Snippet 传入。同时 Badge 是相对于主体内容定位的，所以不会影响主体内容的布局。

但是一些特殊组件如 Cell，Badge 有可能位于组件内部指定位置，这时候可以使用 `isInner` 属性将 Badge 作为内部元素，放置位置由组件内部决定，请参考示例。

## offsetY 与 offsetX

Badge 组件默认位置是相对于主体内容右上角，左右和上下偏移量分别是 Badge 自身宽高的一半，但是由于内部内容的不确定性和复杂性，offsetY 与 offsetX 可以用来在原本基础上再调整 Badge 的位置，使其满足更多的需求。

## 叶形圆角

当 radius 为 `'leaf'` 时，Badge 圆角风格为叶形，同时叶形方向会与当前位置关联。

## CSS 注入

通过 injClass 参数可以向 Badge 组件内部注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性，示例中通过 injClass 实现了自定义背景色与边框。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
