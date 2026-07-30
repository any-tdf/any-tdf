## 默认样式

通过查看大量主流的移动端 UI 设计（包含原生与 web），发现在实际应用中，大块主题色按钮的使用频率比较高，因为它的突出性与品牌属性，非常适合用来引导用户操作。故而 STDF 没有跟随主流组件库的灰色边框按钮作为默认样式，而采用大块主题色填充按钮，应该可以减少使用时的书写代码量。其余样式基本上按照 Tailwind 的样式规则，只是对一些选项做了分类与限定，传入可选外的值将被按照默认值处理。

## 填充模式

填充模式中：

- `base`：实心填充按钮（默认），背景色跟随状态色
- `line`：线性按钮（幽灵按钮），无色边框，黑/白色文字
- `lineLight`：线性浅色按钮，淡色边框
- `lineState`：线性状态按钮，边框和文字颜色跟随状态色
- `text`：纯文本按钮，无色文字
- `textState`：纯文本状态按钮，文字颜色跟随状态色
- `colorLight`：浅色背景按钮，浅色背景 + 状态色文字

其中 `base`、`lineState`、`textState`、`colorLight` 会跟随 `state` 参数变化颜色，而 `line`、`lineLight`、`text` 为无色模式，不受 `state` 影响。

## 状态色

状态色对应着 STDF 颜色系统的成功、警告、错误、信息四种功能色，请确保在 Tailwind 的配置文件 tailwind.config.js 中已经配置了对应色值，当然也可以根据你的项目自行灵活配置。

## 尺寸

按钮尺寸为 full 和 big 表示块级元素，md、sm、xs 表示行内元素，auto 时按钮宽度由内部元素的宽度决定。

## 边框风格

边框风格（border）必须在填充模式（fill）为 `line`、`lineLight` 或 `lineState` 情况下才会生效。

## CSS 注入

通过 injClass 参数可以向组件内部 button 元素注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性，示例中通过 injClass 实现了自定义颜色。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。

## 按钮组

按钮组功能已独立为 [ButtonGroup](/components?nav=buttonGroup&tab=0) 组件，支持通过 `items` 数组或 `children` 自定义两种方式使用。

## 带图标或加载

通过 icon 参数可以向 Button 组件内容区域前注入图标，参数为 Icon 组件的 Props；通过 loading 参数可以向 Button 组件内容区域前注入加载，参数为 Loading 组件的 Props，当传入 loading 时按钮默认禁用，可通过 disabledLoading 参数控制。请参考示例。
