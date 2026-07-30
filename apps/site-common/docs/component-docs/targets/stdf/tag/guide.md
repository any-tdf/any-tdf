## 状态类型

Tag 组件通过 `state` 属性控制标签的颜色状态，与 Button 组件保持一致，支持 `theme`、`success`、`warning`、`error`、`info`、`neutral` 六种状态，其中 `neutral` 为黑白透明，透明度更弱。

## 填充样式

通过 `fill` 属性可以设置标签的填充样式：

- `base`：实心样式，背景色填充
- `line`：描边样式，透明背景带边框
- `light`：浅色样式，浅色背景

## 标记样式

当 `mark` 属性为 `true` 时，标签左侧为直角，右侧为半圆角，常用于商品标签等场景。

## 可关闭标签

设置 `closable` 属性可以显示关闭按钮，点击关闭按钮会触发 `onclose` 事件。通常需要配合状态管理来实现标签的动态删除。

## 自定义内容

除了使用 `text` 属性设置文本外，还可以通过 `children` Snippet 传入自定义内容，如图标、图片等。

## CSS 注入

通过 `injClass` 参数可以向 Tag 组件内部注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性，示例中通过 `injClass` 实现了渐变背景、阴影等效果。

若注入的 class 没生效，请在注入的 class 名称前添加"!" ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
