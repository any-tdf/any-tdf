## 基础用法

List 组件用于展示结构化列表内容，通过 `itemChild` Snippet 定义每个列表项的渲染内容。

## 间距、内边距和圆角

- 使用 `gap` 设置列表项之间的间距。
- 使用 `mx`、`my` 设置列表整体外边距。
- 使用 `itemPx`、`itemPy` 设置列表项内边距。
- 使用 `itemRadius` 设置列表项圆角。

设置 `divider` 为 `true` 可以启用分割线。分割线与间距可同时使用，如需更紧凑的样式，可以将 `gap` 设置为 `0`。

## 过渡动画

List 默认使用 `slideRight` 过渡动画。可以通过 `transition` 切换动画类型，设置为 `null` 可关闭动画。使用 `transitionDelay` 控制每项动画延迟时间。

动画在列表项进入和移除时都会生效：

- `slideRight`：从右侧滑入或滑出。
- `slideUp`：从下方滑入或滑出。
- `fadeScale`：淡入缩放并淡出缩放。
- `stagger`：奇偶项交错滑入并交错滑出。

## 批量选择

设置 `batchSelectable` 显示批量选择入口，支持以下能力：

- `batchMode`：批量选择模式，支持双向绑定。
- `batchSelected`：选中项 key 数组，支持双向绑定。
- `batchActions`：批量操作按钮配置。
- `onbatchChange`：选中项变化回调。

## 滑动操作

List 支持左滑显示操作按钮，最多 4 项。

- `swipeActions`：滑动操作按钮配置。
- `swipeHint`：提示显示模式，支持 `none`、`first`、`all`。
- `swipeThreshold`：滑动触发阈值（像素）。

`SwipeActionProps` 支持 `icon`、`text`、`bgColor`、`onclick`，其中 `bgColor` 支持 `theme`、`success`、`warning`、`error`、`info`，`primary` 作为 `theme` 的别名。

## 点击反馈与箭头

- `clickable`：启用点击反馈。
- `arrow`：显示右侧箭头指示器。
- `onclickItem`：列表项点击回调。

## 自定义头部和底部

通过 `headerChild` 和 `footerChild` Snippet 可以在列表顶部和底部添加自定义内容。

## 空状态处理

List 组件不处理空状态，请在外部判断数据并渲染对应内容。
