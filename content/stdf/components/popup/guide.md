## Popup 与 BottomSheet

在 STDF 的设计思路内，BottomSheet 与 Popup 都属于界面内的浮动交互，一般用于在页面内进行一些二级操作场景，在组件使用上有一些相似之处。**但弹出层 Popup 是「层」的概念，而底部浮窗 BottomSheet 是「窗」的概念**。

Popup 作为弹出层，内部一般不宜做比较复杂步骤的交互，默认点击遮罩层就可以关闭，但可以自定义弹出的位置、大小、过渡动画、方向、样式等多项参数。**重样式轻逻辑。**

BottomSheet 作为底部浮窗，就只能从底部弹出。「浮」体现在可以通过滑动其内部的头部区域来控制其固定高度；而「窗」区别于「层」的是，BottomSheet 有自己的头部区域，可以自定义头部内容，并派发出关闭、返回、滑动等类似窗口交互的事件，可以用于一些相对复杂的交互场景，默认点击遮罩不可关闭。**重逻辑轻样式。**

## size

弹出层的大小由 size 决定，表示占据整个页面大小的百分比，当位置为 top、bottom、center 时表示弹出层的高占据视窗高度的比例，当位置为 left 和 right 时表示弹出层的宽占据视窗宽度的比例。值为 0 时弹出层不再固定宽高，而是由内部元素的宽或高决定。

## 动画

弹出层出现与退出的过渡动画类型由 easeType 决定，默认值为 cubicOut，可选值有 31 个（一个线性动画 linear 与下面 30 种非线性动画），具体值可参考 [svelte/easing](https://svelte.dev/docs#run-time-svelte-easing)，具体非线性动效可参考 [ease visualiser](https://svelte.dev/examples/easing)。而动画出现与退出的时间由 duration 与 outDuration 决定。

| ease    | in        | out        | inOut        |
| ------- | --------- | ---------- | ------------ |
| back    | backIn    | backOut    | backInOut    |
| bounce  | bounceIn  | bounceOut  | bounceInOut  |
| circ    | circIn    | circOut    | circInOut    |
| cubic   | cubicIn   | cubicOut   | cubicInOut   |
| elastic | elasticIn | elasticOut | elasticInOut |
| expo    | expoIn    | expoOut    | expoInOut    |
| quad    | quadIn    | quadOut    | quadInOut    |
| quart   | quartIn   | quartOut   | quartInOut   |
| quint   | quintIn   | quintOut   | quintInOut   |
| sine    | sineIn    | sineOut    | sineInOut    |

## 间距

当弹出层位置是 top、bottom、center 时，弹出层的宽度会占据整个视窗宽度，此时若需要弹出层的左右两侧有间距，则可通过 px 这个 Props 来设置。当弹出层位置是 left、right 时，弹出层的高度会占据整个视窗高度，此时若需要弹出层的上下两侧有间距，则可以通过 py 来设置。请参考示例。

## transitionDistance

一般来说，如果不确定弹出层内容的宽高（比如动态展示协议）或预计内容会很多，请尽量使用固定大小限制弹出层大小，使内部元素滚动展示。此时，弹出层出现时，会从页面可视区域外向可视区域内移入，移动距离就是弹出层的大小。

当弹出层内容的宽高确定时，可以设置弹出层的 size 为 0，弹出层大小由内部元素决定，但组件无法提前获悉弹出层的宽高，因此无法执行弹出层的动画效果，此时就需要外部传入 transitionDistance 即弹出层的宽或高（位置为 top 和 bottom 时需要传入高，位置为 left 和 right 时需要传入宽）来固定动画执行的距离，单位为 px。此值无需严格准确，只要保证动画执行的距离合适即可。

由于位置为 center 时动画效果为缩放，无论弹出层的宽高为多少都无需传入 transitionDistance。

## 背景色

弹出层的背景色会自动适配亮暗模式，当 transparent 为 true 时，弹出层的背景色为透明，可以满足其他不需要背景色的需求。

## 事件

弹出层默认点击遮罩会关闭，若不需要此功能，可以设置 maskClosable 为 false。另外支持通过 onclose 来监听弹出层退出事件，而 onclickMask 事件则是点击遮罩层时触发，即使 maskClosable 为 false 也会触发。

## 优化

由于移动端的 Safari、Chrome 或其他一些浏览器滚动页面时会动态显示工具栏或地址栏（多此一举），导致页面的高度也会动态变化，Popup 针对这一情况也做了优化。当 dynamicFixed 为 true 时滚动页面时会动态地更新页面高度，相对应地弹出层相对于页面的位置也会动态更新。

当然，这个滚动监听会有微弱的性能损失，如果你的项目中不需要此功能（比如在可控的 webview 内使用），可以设置 dynamicFixed 为 false 来关闭。
