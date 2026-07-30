## 使用场景

移动端的 Switch 组件一般来说都是搭配在 Cell 组件内使用，Cell 组件的 right 参数支持传入 Switch Props，请参考 Cell API。

当然，单独使用也是可以的。

## injClass

通过 injClass 参数可以向组件内部最外层元素注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性。因为 CSS 注入于最后，此时最外层元素若已有同属性 CSS 将会以 injClass 为准，这也是通过 injClass 实现自定义开关颜色的原因。

## inside & Snippet

inside 参数决定了开关内部显示内容，默认值是空字符，不显示任何内容。若传入字符 `'state’` 则会以竖线和圆形表示开关状态；若传入两项字符组成的数组，第一项和第二项将分别显示关闭与开启状态时的内部文字，建议传入单个文字；若传入字符 `'loading'` 则会以 Loading 图标渲染，且支持传入 Loading Props；若传入 falseChild 和 trueChild 则会以传入内容分别渲染开启与关闭时开关内部内容，请参考示例。

## 特别注意

在 Cell 组件内使用时，Switch 的 active 由 Cell Props 的 switchActive 决定，**请不要在 switch 内部再传入 active**。
