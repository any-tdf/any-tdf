## 使用

Mask 组件一般是用来结合 BottomSheet、Toast、Popup 等组件使用，用于遮挡下层内容，突出弹出层内容，或防止用户操作。

## 动画

遮罩动画效果为 fade，可参考 [svelte/transition/fade](https://svelte.dev/docs/svelte/svelte-transition#fade) 。

遮罩一般是放置于其他交互式组件下层，考虑到出现与消失不会太突兀，遮罩出现时有一个较短的动画（默认 150ms），一般与内容时长一样；而内容信息展示完后一般需要迅速关闭，所以退出动画默认为 0ms，当然也可以通过 `outDuration` 属性设置退出的动画时间。

## 点击穿透

Mask 可以通过 `clickable` 属性设置是否可点击穿透，当设置为 `true` 时，点击遮罩不会触发 `onclickMask` 事件。

## inverse

通常情况下，页面颜色是浅色系颜色，Mask 会使用黑色背景色，当页面使用暗模式时 Mask 会使用白色背景色。但在一些特殊场景可能会使用恰好相反的背景色，可以通过 inverse 来控制颜色，使其恰好与页面的亮暗模式相反，请参考示例。

Mask 可以通过 `inverse` 属性设置是否反色，当设置为 `true` 时，遮罩背景色为白色。

## zIndex

遮罩层是相对于浏览器窗口通过 fixed 定位的，默认的 `z-index` 为 500，可以通过 `zIndex` 属性设置。

使用到 Mask 的组件包括 BottomSheet、Toast、Popup 等，这些组件也有默认的 z-index，见下表。如果同时显示这些组件时请注意层级关系。

使用到 Mask 组件的默认 `z-index` 如下：

| 组件        | zIndex |
| ----------- | ------ |
| BottomSheet | 600    |
| Popup       | 600    |
| Toast       | 1000   |
