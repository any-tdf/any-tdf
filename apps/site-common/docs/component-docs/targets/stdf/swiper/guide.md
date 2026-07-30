## data

传入的数据 data 内部的 type 支持 `'img'` 和 `'component'`，其中 `img` 类型需要传入图片 url，`component` 类型时传入单文件组件，Swiper
内部将会根据 type 渲染对应内容。

## interval && duration

为了书写方便，注意间隔时间 interval 以秒为单位，过渡时间 duration 以毫秒为单位，同时需要注意传入的过渡时间必须小于间隔时间。

## indicateStyle

此参数配置指示器的样式，当 `indicateStyle` 为 `longLine` 时，激活的指示器会在 Swiper 停留时间内表示间隔进度，请参考示例。

## indicateInjClass

此参数可以对指示器 indicate 区域注入 CSS 名称（不仅限于 Tailwind CSS），比如示例中去除默认自带透明度的渐变色背景。

若注入的 class 没生效，请在注入的 class 名称前添加“!”
，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。

## aspectRatio && containerWidth && px&& py

containerWidth 若不传或为 0，Swiper 内部默认使用页面宽度作为此组件区域宽度。而此区域高度将通过 containerWidth 与
aspectRatio 计算出来。

注意，aspectRatio 仅仅决定容器的宽高比，所以只有当 px 和 py 一致时，每个容器内部显示区域宽高比才会与 aspectRatio 一致。

## 未激活容器偏移与旋转

通过对 X、Z 两个方向上的偏移值和 X、Y、Z 三个旋转轴旋转角度的设置，可以让未激活的容器在对应轴进行偏移与旋转，从而实现一些特殊的切换过渡效果，请参考示例。

注意，偏移值以像素（px）为单位，而旋转角度以度（deg）为单位。

## activeInjClass && notActiveInjClass

通过对激活和未激活的容器注入 Class，可以让不同状态的容器有不同的样式，

## radius && innerInjClass

这是对容器内部区域的圆角设置与注入 Class，请参考示例。

## onclick 事件

点击事件仅仅在传入图片时生效，传入组件时事件由传入的组件内部决定。

## 滑动事件

当手指或其他触摸设备在 Swiper 容器内滑动结束时，Swiper 会结合滑动距离与滑动速度判断本次滑动是否触发切换，若触发则会根据滑动方向切换到上一个或下一个容器。

- 当滑动距离小于某个阈值时，始终不触发切换。
- 当滑动距离大于某个阈值时，始终触发切换。
- 当滑动距离介于两个阈值之间时，会根据滑动速度判断是否触发切换，速度大于某个速度系数时会触发切换。

上述三种情况的阈值和速度系数可以通过 triggerLong、notTriggerLong 和 triggerSpeed 参数进行自定义。其中 triggerLong 和 notTriggerLong 为百分比，表示滑动距离占容器宽度的百分比；triggerSpeed 为 0-1 之间的小数，表示滑动速度系数。

## lazyplay

Swiper 自动轮播时有一系列过渡动画，当页面同时有大量过渡效果时，考虑到设备性能与动画帧率等问题，Swiper 默认会开启懒轮播，即
Swiper 组件**不在页面可视范围内时会暂停自动轮播**，当然你也可以单独设置。

下面两张图展示了极端情况下，同一个页面存在 30+ Swiper 同时轮播时，桌面端浏览器处理大量过渡动画时的性能监视图对比。

- 未开启懒轮播，同时会有 30+ 组过渡动画在进行时的性能监视图。
  <img src="lazyplay_no.png" style="width: 100%;" alt="lazyplay_no" title="未开启懒轮播性能监视图">

- 已开启懒轮播，同时只有 3-4 组过渡动画在进行时的性能监视图。
  <img src="lazyplay_yes.png" style="width: 100%;" alt="lazyplay_yes" title="已开启懒轮播性能监视图">
