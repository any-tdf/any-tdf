## 说明

由于移动端横向显示内容有限，Checkbox 默认为纵向布局，横向布局建议只用作简单使用。当选项较多、内容较长或显示内容较多时建议使用纵向布局，当 Checkbox 内的选项被点击时，通过 onchange 事件，可以获取到当前所有选定项标识符 name 组成的数组。

## icon && iconChecked

Checkbox Props 的 icon 默认值 `'default'` 会按照 Remix Icon 的 checkbox-line 以 Icon 组件形式渲染；传入字符 `null`，表示未选中选项图标区域不显示内容；也可以传入 Icon Props，未选中选项图标区域将会以传入的参数以 Icon 组件形式渲染。

iconChecked 与 icon 逻辑一样，对应的是选中选项的图标区域内容。

## Checkbox Snippet

当传入 checkboxChild 这个 Snippet 时，选项区域将会以传入的 Snippet 内容渲染，可自由设计选中与未选中的效果，获取数据逻辑等。

> 虽然有 Tailwind 写样式比较方便，但过多的自定义将会失去使用组件库的意义。

## 点击区域优化

为了优化体验，CheckboxItem 整个区域都可以点击，将会激活与之对应的选项，不仅仅只可以点击文字或图标区域。
