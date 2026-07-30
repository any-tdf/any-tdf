## 说明

组件库开发中满足自定义与上手简单始终是不可兼得的。

Cell 作为移动端使用频率较高的组件，承载的使用场景也比较多，因此可以很明显地看出来 Props 比较多，支持的自定义选项也比较多。

## Snippet

Cell 组件支持 leftChild、rightChild 和 detailChild 三种 Snippet，当传入 leftChild 时 Cell 最左侧内容会被 leftChild 渲染，可参考示例自定义左侧图片；当传入 rightChild 时 Cell 最右侧内容会被 rightChild 渲染，可参考示例自定义右侧图片；当传入 detailChild 时 Cell 右侧详情内容会被 detailChild 渲染，可参考示例自定义右侧详情内容。

## left & right

left 参数支持使用 Icon Props，此时将使用 STDF 的 Icon 组件渲染。

考虑到 Cell 右侧区域使用箭头的场景非常多，组件默认 right 参数为 `'arrow'`，显示箭头。

right 也支持传入 Icon Props，考虑右侧使用开关的场景较多，为了区分是 Switch Props 还是其他 Icon Props，right 增加了一个 type 属性（可选 `'icon'` 和 `'switch'`）用于区分 Icon 和 Switch 组件。

优化：当右侧为 switch 时，点击整个 Cell 区域都会切换 Switch 的开关状态。

具体 Icon Props 与 Switch Props 请查看对应组件 API。

## clickAll

移动端考虑交互的友好性，Cell 默认点击整行都会触发事件，但是考虑场景的多样性，你可以通过将 clickAll 参数设置为 false 来禁用这个功能。只是在特定区域触发事件，比如示例中配合 Switch 组件使用，仅在点击 Switch 时触发事件。

## switchActive

switchActive 值仅在 right 的 type 为 switch 时生效，表示开关状态值。注意，此时 Cell 内部 Switch 的 active 由 switchActive 决定，**请不要在 switch 内部再传入 active**。

## 底部分割线

主要用于组合时，当 Cell 与 Cell 之间有间隔时，可以使用 line 参数控制是否显示底部分割线。

## 组合使用

Cell 组件支持组合使用，可以向 CellGroup 传入 Cell 来实现。为了不影响布局，注意配置单条 Cell 的 my、mx、radius、shadow、line 参数，请参考示例。

## 自定义

使用上下左右间距和顶部底部圆角参数，可以配置出多种 Cell 风格，如果还不能满足，可以使用注入 CSS（injClass）来实现更多自定义的样式，请参考示例。

## 左滑操作

Cell 组件支持左滑操作功能，通过 `swipeActions` 参数传入操作项数组即可实现，操作项最多支持 4 个。

每个操作项支持 `text`（文字）、`icon`（图标）、`state`（背景色状态）和 `onclick`（点击回调）属性。`state` 支持预设的 `'theme'`、`'success'`、`'warning'`、`'error'`、`'info'` 或自定义颜色值。

设置 `swipeOpen` 为 `true` 可使滑动操作初始展开。点击操作项后会自动关闭滑动。
