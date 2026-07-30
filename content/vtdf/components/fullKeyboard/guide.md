## 说明

FullKeyboard 组件是一个全功能的虚拟键盘，支持字母、数字和符号输入。采用 QWERTY 布局，适用于需要完整文本输入的场景。

## 键盘样式

通过 `type` 设置键盘样式：

- `button`（默认）：按钮式，有阴影、圆角、间距
- `block`：块式，无阴影、无圆角、紧凑布局

## 键盘模式

通过 `mode` 设置键盘模式：

- `letter`：纯字母
- `letterNumber`：字母 + 数字
- `full`（默认）：字母 + 数字 + 符号，可切换

## 按键

FullKeyboard 组件包含以下类型的按键：

- **字母键**：a-z，26 个字母按 QWERTY 布局排列
- **数字键**：0-9，在 `letterNumber` 和 `full` 模式下显示
- **符号键**：在 `full` 模式下通过 123 按钮切换显示
- **Shift 键**：切换大小写，激活时背景高亮
- **删除键**：删除最后一个输入字符
- **空格键**：输入空格
- **完成键**：确认输入并关闭键盘
- **关闭键**：仅关闭键盘，不触发完成事件
- **123/ABC 切换键**：在 `full` 模式下切换字母和数字符号布局

## doneDisabled

当 `doneDisabled` 为 `true` 时，完成按钮将会被禁用，此时完成按钮的文案将会变成半透明，且不可点击。可用于根据输入内容动态控制业务流程，比如验证输入长度是否符合要求。

## 键盘高度

移动端使用键盘时需要注意键盘的高度，因为键盘可能会遮盖掉页面上需要显示输入内容的区域。FullKeyboard 组件在打开的时候会自动计算键盘的高度，通过 `@open` 事件派发出去，开发者可以根据这个值来处理键盘遮挡的问题。

键盘高度会根据 `mode` 和 `preview` 参数动态变化：

- `letter` 模式基础高度较低
- `letterNumber` 和 `full` 模式因为多了数字行，高度会增加
- 开启 `preview` 后会增加预览区高度

## CSS 注入

通过 `injClass` 相关参数可以向 FullKeyboard 的三个地方注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性：

- `panelClass`：注入后作用到键盘面板
- `keyClass`：注入后作用到所有按键
- `doneClass`：注入后作用到完成按键

若注入的 class 没生效，请在注入的 class 名称前添加 "!"，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。

## preview

设置 `preview` 为 `true` 时，键盘顶部会显示一个输入预览区域，实时展示当前输入的内容。这对于需要确认输入内容的场景非常有用。`previewMask` 可将预览内容显示为圆点掩码，适用于密码输入场景。

## popup

FullKeyboard 是在 Popup 的基础上封装的，通过预先定义一些 Popup 的 Props 实现，因此可以通过传入 Popup 的属性来实现不同的效果。比如可以通过设置 `popup` 改变过渡动画和背景透明度。

如果不需要使用弹出层，可以将 `popup` 设置为 `null`，此时 FullKeyboard 将直接展示在页面上，不会以弹窗形式出现。
