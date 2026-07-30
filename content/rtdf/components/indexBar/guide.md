## 说明

一般用于页面中信息快速检索，可以根据目录中的索引值快速找到所需的内容。

## data

此 Props 是索引项组组成的数组，基本结构为`{ index: 'x', title: 'xx', child: ['xx', 'xx'] }`，其中 index 用于显示右侧 Bar 内的文字（建议单个字符），title 为内容区域每一组索引的标题，child 为一组索引内的单项内容，具体使用请参考示例。

## height && top

由于索引的内容区域在 Y 轴滚动，需要内容区域的高度，同时需要结合内容区域距离文档顶部的距离，用于监听与设置内容区域的滚动位置等操作。

建议 data 长度较大时 height 请传入较大值，总不能整个索引内容显示区域还没右侧的滑动 Bar 区域高吧。当然也不能传入过大，导致滚动区域显示不全或出现多个滚动条问题。

## CSS 注入

IndexBar 支持在两个地方注入 Class，注入 titleInjClass 会在索引组标题生效，注入 textInjClass 会在索引项的文本处生效。可以参考示例中改变索引内容区域样式。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 Tailwind Important modifier。

## scrollAlign

当索引内容区域滚动结束时，通过 CSS 的 scroll-snap-align 模块，每组索引内容顶部都会自动吸附到内容区域顶部，当然如果觉得影响滚动体验或不需要的话也可以关闭。

关于 scroll-snap-align 可参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align)。
