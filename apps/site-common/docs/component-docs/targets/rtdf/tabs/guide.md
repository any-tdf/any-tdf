## Tabs

Tabs 组件内部使用了 Tab 组件，而 Tabs Props 中的 tab 全部透传给 Tab，用于配置 Tab 不同的样式。

### Children

Tabs Props 的 transition 默认为 true，此时 Tabs 主体内容切换带有过渡效果。当 transition 为 false，或者 position 为 `l` 或 `r` 时，Tabs 主体内容将不会有过渡效果，此时可以通过 React 的 render props 传入内容。children 需要接收当前激活的 Tab 索引值 `{ active }`，再结合 TabContent 的 show 控制主体内容的显示与隐藏。通过暴露出的 active，你还可以自由使用其他方式控制主体区域内容的过渡效果。示例中展示了一种方式，请结合具体业务尝试其他切换效果。

### 选项卡位置

Tabs 通过 position（t：上、b：下、l：左、r：右）决定选项卡位置，而此参数又决定了其中 Tab 的布局方式 layout（h：水平、v：垂直）。

---

## Tab

Tab 组件可以单独使用，通过绑定的 onClickTab 事件，传递出当前激活选项卡的索引值。

### labels

此参数决定了 Tab 内部的选项卡内容，支持图标与文字自由搭配。数据类型为对象数组，内部对象由 text 和 icon 组成，而 icon 使用 Icon 组件渲染，具体参数请参考 [Icon Props](/components?nav=icon&tab=1)。

### 线性风格

当 Tab props 的 lineType 为 true 时，Tab 会使用线性风格，但若布局方式为 v（垂直）则线性风格不会生效。

### 溢出模式

由于移动设备横向空间有限，当横向布局且 Tab 数量较多或者动态无法确定时，可以开启溢出模式，此时 Tabs 会自动隐藏溢出的 Tab，通过滑动来查看隐藏的 Tab。开启溢出模式后，可以通过 `showNum` 控制显示的 Tab 数量，通过 `autoScroll` 控制是否开启自动滚动。

溢出模式时，可见区域内实际显示的 Tab 是 `showNum+0.5`，如此设计会在初始时将最后一个 Tab 隐藏一半，以便在不刻意提示的情况下，用户可以自然地意识到隐藏了 Tab，从而产生滑动的操作。

> Tip：如果 Tab 内容宽度过大时请适当减小 `showNum`，以免 Tab 内容溢出被隐藏。

### CSS 注入

Tab 结构相对复杂，为了支持更灵活的自定义样式，内部支持四个地方注入 CSS，injClass 作用于 Tab 最外层元素；tabInjClass 作用于内部的单项 tab；activeTabInjClass 作用于当前激活的 tab；activeInjClass 作用于 Tab 的指示器。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
