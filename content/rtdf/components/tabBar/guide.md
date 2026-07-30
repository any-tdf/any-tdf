## 说明

TabBar 通过绑定的 onChange 事件，传递出当前激活选项卡的索引值。

## labels

此参数决定了 TabBar 内部的选项卡内容，支持图标与文字自由搭配。数据类型为对象数组，内部对象由 text 和 icon、activeIcon 搭配组成。icon 和 activeIcon 使用 Icon 组件渲染，其中 activeIcon 表示 TabBar 激活时的 Icon。具体参数请参考 [Icon Props](/components?nav=icon&tab=1)。

## 底部线条

line 为 true 时激活的 TabBar 底部会显示线条，lineW 和 activeInjClass 只会在 line 为 true 时生效。线条宽度可由 lineW 控制，lineW 的值为线条宽度占当前 Tab 宽度的比例，默认值为 4，**lineW 的值越大线条越窄**。

## CSS 注入

TabBar 结构相对复杂，为了支持更灵活的自定义样式，内部支持四个地方注入 CSS，injClass 作用于 TabBar 最外层元素；tabInjClass 作用于内部的单项 tab；activeTabInjClass 作用于当前激活的 tab；activeInjClass 作用于 TabBar 底部的线条。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。

## 简单

相对于其他组件，TabBar 组件在应用中被使用的频率较低，一般一个应用就一个，而且一般都有针对自己品牌的专属 UI/UX 设计，复用性很低，因此 TabBar 组件在 API 设计上相对简单一些。
